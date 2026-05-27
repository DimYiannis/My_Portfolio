<template>
  <div class="atrium-wrapper">
    <Transition name="fade">
      <div v-if="loading" class="loading-screen">
        <div class="loading-inner">
          <div class="greek-key-border"></div>
          <p class="loading-text">{{ loadingMessage }}</p>
          <div class="loading-bar"><div class="loading-fill" :style="{ width: loadProgress + '%' }"></div></div>
        </div>
      </div>
    </Transition>

    <canvas ref="canvasRef" class="atrium-canvas" />

    <Transition name="fade">
      <div v-if="!loading" class="hud">
        <span class="hud-hint">WASD / arrows to walk · drag to look · click a panel</span>
      </div>
    </Transition>

    <Transition name="slide-up">
      <div v-if="activeProject" class="project-modal" @click.self="closeModal">
        <div class="modal-inner">
          <button class="modal-close" @click="closeModal">✕</button>
          <h2 class="modal-title">{{ activeProject.title }}</h2>
          <div class="modal-tags">
            <span v-for="tag in activeProject.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="modal-preview">
            <img :src="activeProject.image" :alt="activeProject.title" />
          </div>
          <div class="modal-links">
            <a :href="activeProject.live" target="_blank" class="btn-live">View Live ↗</a>
            <a :href="activeProject.github" target="_blank" class="btn-github">GitHub</a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// ─── Projects ────────────────────────────────────────────────────
const projects = [
  { id: 'ema',          title: 'EMA — Real-Time Voice Intelligence', tags: ['Nuxt.js','TypeScript','Three.js','Whisper','Llama 3.3','Supabase'], live: 'https://ema-ii.vercel.app',                        github: 'https://github.com/DimYiannis/ema',                  image: '/previews/ema.jpg' },
  { id: 'artsy',        title: 'Artsy Gallery',                      tags: ['HTMX','JavaScript','Tailwind CSS'],                                  live: 'https://artsygallery.netlify.app',                    github: 'https://github.com/DimYiannis/Arts',                 image: '/previews/artsy.jpg' },
  { id: 'augusts',      title: "August's Clothing Store",            tags: ['Nuxt.js','Pinia','Tailwind CSS','Node.js'],                          live: 'https://augustsv2.netlify.app',                       github: 'https://github.com/DimYiannis/Augusts',              image: '/previews/augusts.jpg' },
  { id: 'academia',     title: 'Academia — Scientific Platform',     tags: ['Nuxt 3','Tailwind CSS','Node.js'],                                  live: 'https://academiav2.netlify.app',                      github: 'https://github.com/DimYiannis/academia_v2',          image: '/previews/academia.jpg' },
  { id: 'yummy',        title: 'YummyGreek — Digital Menu',          tags: ['Vue 3','Tailwind CSS'],                                             live: 'https://yumgreek.netlify.app',                        github: 'https://github.com/DimYiannis/YummyGreek',           image: '/previews/yummy.jpg' },
  { id: 'thessaloniki', title: 'Meet in Thessaloniki',               tags: ['Nuxt 3','Tailwind CSS'],                                            live: 'https://meet-in-thessaloniki.netlify.app',            github: 'https://github.com/DimYiannis/Meet-in-Thessaloniki', image: '/previews/thessaloniki.jpg' },
]

// ─── State ───────────────────────────────────────────────────────
const canvasRef     = ref<HTMLCanvasElement | null>(null)
const loading       = ref(true)
const loadProgress  = ref(0)
const activeProject = ref<typeof projects[0] | null>(null)
const loadingMessages = [
  'Quarrying Carrara marble...',
  'Raising the columns...',
  'Lighting the torches...',
  'Hanging your work on the walls...',
]
const loadingMessage = ref(loadingMessages[0])

// ─── Three.js internals ───────────────────────────────────────────
let renderer:  THREE.WebGLRenderer
let scene:     THREE.Scene
let camera:    THREE.PerspectiveCamera
let animId:    number

// Navigation
const keys: Record<string, boolean> = {}
const WALK_SPEED  = 0.06
const LOOK_SPEED  = 0.0018

// Room bounds — Y-up (X=width, Y=height fixed, Z=depth)
// GLB camera is at [0, 1.65, -10.5] looking toward +Z (north)
const WALK_Y  = 1.65   // eye height stays constant
const BOUNDS  = { minX: -4.5, maxX: 4.5, minZ: -10.5, maxZ: 10.5 }

// Mouse look
let isDragging  = false
let prevMouseX  = 0
let prevMouseY  = 0
let yaw         = 0     // 0 = looking toward +Z (north/into the hall)
let pitch       = 0

// Raycasting
const raycaster    = new THREE.Raycaster()
const mouse        = new THREE.Vector2()
const panelMeshes: THREE.Mesh[] = []
let hoveredPanel:  THREE.Mesh | null = null

// ─── Panel canvas texture ─────────────────────────────────────────
const ROMAN = ['I','II','III','IV','V','VI']

function buildPanelTexture(project: typeof projects[0], index: number): THREE.CanvasTexture {
  const W = 512, H = 700
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!

  // ── Background
  ctx.fillStyle = '#0B0804'
  ctx.fillRect(0, 0, W, H)

  // ── Outer gold frame
  ctx.strokeStyle = '#B8922E'; ctx.lineWidth = 2.5
  ctx.strokeRect(12, 12, W - 24, H - 24)
  ctx.strokeStyle = '#5A440E'; ctx.lineWidth = 1
  ctx.strokeRect(18, 18, W - 36, H - 36)

  // ── Image area with gradient overlay
  const imgY = 24, imgH = 260
  const imgX = 24, imgW = W - 48

  // Dark placeholder
  ctx.fillStyle = '#12100A'
  ctx.fillRect(imgX, imgY, imgW, imgH)

  // Decorative gradient over image area (visible before image loads)
  const grad = ctx.createLinearGradient(imgX, imgY, imgX, imgY + imgH)
  grad.addColorStop(0, 'rgba(30,20,8,0.0)')
  grad.addColorStop(1, 'rgba(11,8,4,0.95)')
  ctx.fillStyle = grad
  ctx.fillRect(imgX, imgY, imgW, imgH)

  // Roman numeral watermark in image area
  ctx.fillStyle = 'rgba(184,146,46,0.12)'
  ctx.font = `bold 130px Georgia, serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(ROMAN[index] ?? String(index + 1), W / 2, imgY + imgH / 2)

  // Load real image on top
  const tex = new THREE.CanvasTexture(c)
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    ctx.drawImage(img, imgX, imgY, imgW, imgH)
    // Re-apply gradient so title stays readable over image
    ctx.fillStyle = grad
    ctx.fillRect(imgX, imgY, imgW, imgH)
    tex.needsUpdate = true
  }
  img.src = project.image

  // ── Ornamental divider
  const divY = imgY + imgH + 18
  ctx.strokeStyle = '#B8922E'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(40, divY); ctx.lineTo(W - 40, divY); ctx.stroke()
  // Dot in center
  ctx.fillStyle = '#B8922E'
  ctx.beginPath(); ctx.arc(W / 2, divY, 3, 0, Math.PI * 2); ctx.fill()

  // ── Title
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#F2DC8A'
  ctx.textAlign = 'center'
  const words = project.title.split(' ')
  let line = '', ty = divY + 42
  ctx.font = 'bold 26px Georgia, serif'
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (ctx.measureText(test).width > W - 80) {
      ctx.fillText(line, W / 2, ty); line = word; ty += 34
    } else line = test
  }
  ctx.fillText(line, W / 2, ty)
  ty += 16

  // ── Tag pills
  ctx.font = '13px Georgia, serif'
  let tx = 32, tagY = ty + 22
  for (const tag of project.tags.slice(0, 5)) {
    const tw = ctx.measureText(tag).width + 18
    if (tx + tw > W - 32) { tx = 32; tagY += 28 }
    // Pill bg
    ctx.fillStyle = '#1E1508'
    roundRect(ctx, tx, tagY - 14, tw, 22, 4)
    ctx.fill()
    ctx.strokeStyle = '#B8922E'; ctx.lineWidth = 0.8
    roundRect(ctx, tx, tagY - 14, tw, 22, 4)
    ctx.stroke()
    ctx.fillStyle = '#C8A860'
    ctx.fillText(tag, tx + 9, tagY)
    tx += tw + 8
  }

  // ── Buttons
  const btnY = H - 62
  // Live button
  ctx.fillStyle = '#0D2010'
  roundRect(ctx, 32, btnY, 198, 40, 6); ctx.fill()
  ctx.strokeStyle = '#2E7A1A'; ctx.lineWidth = 1
  roundRect(ctx, 32, btnY, 198, 40, 6); ctx.stroke()
  ctx.fillStyle = '#5EC840'; ctx.font = 'bold 15px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('View Live  ↗', 131, btnY + 25)

  // GitHub button
  ctx.fillStyle = '#0A1228'
  roundRect(ctx, W - 230, btnY, 198, 40, 6); ctx.fill()
  ctx.strokeStyle = '#1E4A8A'; ctx.lineWidth = 1
  roundRect(ctx, W - 230, btnY, 198, 40, 6); ctx.stroke()
  ctx.fillStyle = '#4A8ADA'
  ctx.fillText('GitHub', W - 131, btnY + 25)

  return tex
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ─── Scene init ───────────────────────────────────────────────────
async function initScene() {
  const canvas = canvasRef.value!

  // Renderer — max quality
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled  = true
  renderer.shadowMap.type     = THREE.PCFShadowMap
  renderer.toneMapping        = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.9
  renderer.outputColorSpace   = THREE.SRGBColorSpace

  scene  = new THREE.Scene()
  // NO sky background — solid dark to never show outside
  scene.background = new THREE.Color(0x0A0806)
  // Subtle warm interior fog — enhances depth without showing outside
  scene.fog = new THREE.Fog(0x1A1208, 18, 28)

  // Camera — Y-up standard, matching GLB coordinates
  // GLB has Y=height, Z=depth. Start at south end (Z=-10.5), eye level (Y=1.65)
  camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 50)
  camera.position.set(0, WALK_Y, -10.5)
  updateCameraDirection()

  // Ambient fill — low, so panels and shadows read clearly
  scene.add(new THREE.AmbientLight(0xC8C0A8, 0.4))

  loadProgress.value = 15

  // ── Lights ───────────────────────────────────────────────────────

  // Primary sun shaft — warm gold from above-left
  const sun = new THREE.DirectionalLight(0xFFD080, 1.8)
  sun.position.set(-8, 10, -6)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.near   = 0.5
  sun.shadow.camera.far    = 40
  sun.shadow.camera.left   = -14
  sun.shadow.camera.right  =  14
  sun.shadow.camera.top    =  14
  sun.shadow.camera.bottom = -14
  sun.shadow.bias          = -0.001
  scene.add(sun)

  // Warm fill from opposite side — reduces harsh shadows
  const fill = new THREE.DirectionalLight(0xFFE8C0, 0.5)
  fill.position.set(6, 6, 4)
  scene.add(fill)

  // Cool bounce off ceiling
  const skyFill = new THREE.HemisphereLight(0xD0DCFF, 0x6A5A30, 0.35)
  scene.add(skyFill)

  // Gallery SpotLights — aimed at each panel from above
  // North wall panels (Y-up: Z≈10.5, X = -3, 0, +3)
  // East wall panels (Y-up: X≈4.5, Z = 5, 0, -5)
  const spotTargets = [
    { from: [-3.0, 5.5, 9.0],  at: [-3.0, 2.5, 10.8] },
    { from: [ 0.0, 5.5, 9.0],  at: [ 0.0, 2.5, 10.8] },
    { from: [ 3.0, 5.5, 9.0],  at: [ 3.0, 2.5, 10.8] },
    { from: [ 3.5, 5.5, 5.0],  at: [ 4.8, 2.5,  5.0] },
    { from: [ 3.5, 5.5, 0.0],  at: [ 4.8, 2.5,  0.0] },
    { from: [ 3.5, 5.5,-5.0],  at: [ 4.8, 2.5, -5.0] },
  ]
  spotTargets.forEach(({ from, at }) => {
    const spot = new THREE.SpotLight(0xFFD090, 2.5, 12, Math.PI / 7, 0.4, 2)
    spot.position.set(...from as [number, number, number])
    const tgt = new THREE.Object3D()
    tgt.position.set(...at as [number, number, number])
    scene.add(tgt)
    spot.target = tgt
    scene.add(spot)
  })

  // Warm floor bounce — keeps deep areas from going pitch black
  scene.add(new THREE.AmbientLight(0x5A3A18, 0.25))

  loadProgress.value = 30

  loadProgress.value = 40
  loadingMessage.value = loadingMessages[1]

  // ── Load GLB ─────────────────────────────────────────────────────
  const loader = new GLTFLoader()
  loader.load(
    '/models/atrium.glb',
    (gltf) => {
      loadProgress.value = 80
      loadingMessage.value = loadingMessages[3]

      gltf.scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return
        child.castShadow    = true
        child.receiveShadow = true

        const n = child.name

        // Floor — dark matte stone; high roughness prevents specular blowout from directional lights
        if (n === 'Floor') {
          child.material = new THREE.MeshStandardMaterial({
            color:            new THREE.Color(0x6A6E78),
            roughness:        0.85,
            metalness:        0.0,
            envMapIntensity:  0.0,
          })
          return
        }

        // All other meshes — upgrade to full PBR, keep Blender color but tone down brightness
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 0.4
          child.material.needsUpdate     = true
        }

        // Replace panel canvases with canvas textures
        if (child.userData.is_panel_canvas) {
          const pid     = child.userData.panel_id as string
          const idx     = projects.findIndex(p => p.id === pid)
          const project = idx >= 0 ? projects[idx] : null
          if (project) {
            child.material = new THREE.MeshStandardMaterial({
              map:               buildPanelTexture(project, idx),
              roughness:         0.3,
              metalness:         0.0,
              emissive:          new THREE.Color(0x1A1004),
              emissiveIntensity: 0.12,
            })
            panelMeshes.push(child)
          }
        }
      })

      // Strip any lights/cameras Blender baked into the GLB — we supply our own
      const toRemove: THREE.Object3D[] = []
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Light || child instanceof THREE.Camera) {
          toRemove.push(child)
        }
      })
      toRemove.forEach(obj => obj.removeFromParent())

      scene.add(gltf.scene)
      loadProgress.value = 100
      setTimeout(() => { loading.value = false }, 500)
    },
    (xhr) => {
      loadProgress.value = 40 + Math.round((xhr.loaded / xhr.total) * 40)
    },
    (err) => {
      console.error('GLB load error:', err)
      loading.value = false
    }
  )

  // ── Event listeners ───────────────────────────────────────────────
  window.addEventListener('resize',      onResize)
  window.addEventListener('keydown',     e => { keys[e.code] = true })
  window.addEventListener('keyup',       e => { keys[e.code] = false })
  canvas.addEventListener('mousedown',   onMouseDown)
  canvas.addEventListener('mousemove',   onMouseMove)
  canvas.addEventListener('mouseup',     () => { isDragging = false })
  canvas.addEventListener('mouseleave',  () => { isDragging = false })
  canvas.addEventListener('click',       onClick)

  // Touch support
  canvas.addEventListener('touchstart',  onTouchStart, { passive: true })
  canvas.addEventListener('touchmove',   onTouchMove,  { passive: true })
  canvas.addEventListener('touchend',    () => { isDragging = false })

  animate()
}

// ─── Camera direction from yaw/pitch (Y-up standard) ─────────────
function updateCameraDirection() {
  pitch = Math.max(-0.4, Math.min(0.4, pitch))
  // yaw=0 → looking +Z (north/into the hall), Y=height
  const dir = new THREE.Vector3(
    Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    Math.cos(yaw) * Math.cos(pitch)
  )
  camera.lookAt(camera.position.clone().add(dir))
}

// ─── Clamp position inside room (Y-up) ───────────────────────────
function clampPosition() {
  camera.position.x = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, camera.position.x))
  camera.position.y = WALK_Y  // keep eye height constant
  camera.position.z = Math.max(BOUNDS.minZ, Math.min(BOUNDS.maxZ, camera.position.z))
}

// ─── Animation loop ───────────────────────────────────────────────
function animate() {
  animId = requestAnimationFrame(animate)

  // WASD / arrow key walking (Y-up: X=width, Z=depth)
  if (!activeProject.value) {
    const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw)).normalize()
    const right   = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)).normalize()

    if (keys['KeyW'] || keys['ArrowUp'])    camera.position.addScaledVector(forward, WALK_SPEED)
    if (keys['KeyS'] || keys['ArrowDown'])  camera.position.addScaledVector(forward, -WALK_SPEED)
    if (keys['KeyA'] || keys['ArrowLeft'])  camera.position.addScaledVector(right, -WALK_SPEED)
    if (keys['KeyD'] || keys['ArrowRight']) camera.position.addScaledVector(right, WALK_SPEED)

    clampPosition()
    updateCameraDirection()
  }

  // Hover glow on panels
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(panelMeshes)
  if (hits.length > 0) {
    const hit = hits[0].object as THREE.Mesh
    if (hit !== hoveredPanel) {
      if (hoveredPanel) {
        (hoveredPanel.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.08
      }
      hoveredPanel = hit
      ;(hit.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.45
      document.body.style.cursor = 'pointer'
    }
  } else {
    if (hoveredPanel) {
      (hoveredPanel.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.08
      hoveredPanel = null
    }
    document.body.style.cursor = 'default'
  }

  renderer.render(scene, camera)
}

// ─── Mouse / touch handlers ───────────────────────────────────────
function onMouseDown(e: MouseEvent) {
  isDragging = true
  prevMouseX = e.clientX
  prevMouseY = e.clientY
}

function onMouseMove(e: MouseEvent) {
  // Update raycaster mouse position
  const rect = canvasRef.value!.getBoundingClientRect()
  mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
  mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1

  if (!isDragging) return
  yaw   -= (e.clientX - prevMouseX) * LOOK_SPEED
  pitch += (e.clientY - prevMouseY) * LOOK_SPEED
  prevMouseX = e.clientX
  prevMouseY = e.clientY
}

let touchStartX = 0, touchStartY = 0
function onTouchStart(e: TouchEvent) {
  isDragging  = true
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}
function onTouchMove(e: TouchEvent) {
  if (!isDragging) return
  yaw   -= (e.touches[0].clientX - touchStartX) * LOOK_SPEED * 1.5
  pitch += (e.touches[0].clientY - touchStartY) * LOOK_SPEED * 1.5
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onClick(e: MouseEvent) {
  if (Math.abs(e.clientX - prevMouseX) > 4) return  // was a drag, not a click
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(panelMeshes)
  if (hits.length > 0) {
    const pid = hits[0].object.userData.panel_id as string
    activeProject.value = projects.find(p => p.id === pid) ?? null
  }
}

function closeModal() { activeProject.value = null }

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// ─── Lifecycle ────────────────────────────────────────────────────
onMounted(() => initScene())
onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  renderer?.dispose()
  window.removeEventListener('resize',  onResize)
  window.removeEventListener('keydown', e => { keys[e.code] = true })
  window.removeEventListener('keyup',   e => { keys[e.code] = false })
})
</script>

<style scoped>
.atrium-wrapper { position: fixed; inset: 0; overflow: hidden; background: #0A0806; }
.atrium-canvas  { display: block; width: 100%; height: 100%; }

.loading-screen {
  position: absolute; inset: 0; z-index: 10;
  background: #0A0806;
  display: flex; align-items: center; justify-content: center;
}
.loading-inner  { text-align: center; width: 300px; }
.greek-key-border {
  width: 180px; height: 18px; margin: 0 auto 1.5rem;
  border-top: 2px solid #C8A860; border-bottom: 2px solid #C8A860;
  background: repeating-linear-gradient(90deg,#C8A860 0,#C8A860 2px,transparent 2px,transparent 8px,#C8A860 8px,#C8A860 10px);
  opacity: 0.5;
}
.loading-text {
  font-family: Georgia, serif; color: #C8A860;
  font-size: 0.9rem; letter-spacing: 0.1em; margin-bottom: 1rem;
}
.loading-bar  { height: 1px; background: #2A1A08; }
.loading-fill { height: 100%; background: #C8A860; transition: width 0.3s ease; }

.hud {
  position: absolute; bottom: 1.8rem; left: 50%; transform: translateX(-50%);
  background: rgba(10,8,6,0.75); border: 1px solid rgba(200,168,96,0.25);
  border-radius: 20px; padding: 0.45rem 1.4rem; pointer-events: none;
  backdrop-filter: blur(6px);
}
.hud-hint { font-family: Georgia, serif; color: #C8A860; font-size: 0.75rem; letter-spacing: 0.07em; }

.project-modal {
  position: absolute; inset: 0; z-index: 20;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: flex-end; justify-content: center;
  backdrop-filter: blur(4px);
}
.modal-inner {
  background: #0D0A05; border: 1px solid #C8A860; border-bottom: none;
  border-radius: 16px 16px 0 0; width: 100%; max-width: 640px;
  padding: 2rem 2rem 2.5rem; position: relative;
}
.modal-close {
  position: absolute; top: 1rem; right: 1rem;
  background: none; border: 1px solid #C8A040; color: #C8A860;
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 0.8rem;
}
.modal-title  { font-family: Georgia, serif; color: #F0D890; font-size: 1.5rem; margin: 0 0 0.7rem; }
.modal-tags   { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem; }
.tag {
  font-family: Georgia, serif; font-size: 0.7rem; color: #C8A860;
  border: 1px solid #604818; padding: 0.15rem 0.55rem;
  border-radius: 3px; background: #1A1005;
}
.modal-preview {
  width: 100%; aspect-ratio: 16/9; background: #1A1408;
  border-radius: 6px; overflow: hidden; margin-bottom: 1rem;
}
.modal-preview img { width: 100%; height: 100%; object-fit: cover; }
.modal-links  { display: flex; gap: 0.7rem; }
.btn-live, .btn-github {
  font-family: Georgia, serif; font-size: 0.85rem;
  padding: 0.55rem 1.4rem; border-radius: 5px; text-decoration: none;
}
.btn-live   { background: #1A3010; color: #7EC870; border: 1px solid #3A6020; }
.btn-github { background: #0A1830; color: #5090D0; border: 1px solid #1A3860; }

.fade-enter-active, .fade-leave-active           { transition: opacity 0.5s ease; }
.fade-enter-from,   .fade-leave-to               { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active   { transition: transform 0.35s ease, opacity 0.35s ease; }
.slide-up-enter-from,   .slide-up-leave-to       { transform: translateY(100%); opacity: 0; }
</style>
