<template>
  <div class="atrium-wrapper">
    <!-- Loading screen -->
    <Transition name="fade">
      <div v-if="loading" class="loading-screen">
        <div class="loading-inner">
          <div class="greek-key-border"></div>
          <p class="loading-text">{{ loadingMessage }}</p>
          <div class="loading-bar"><div class="loading-fill" :style="{ width: loadProgress + '%' }"></div></div>
        </div>
      </div>
    </Transition>

    <!-- Three.js canvas -->
    <canvas ref="canvasRef" class="atrium-canvas" />

    <!-- HUD -->
    <Transition name="fade">
      <div v-if="!loading" class="hud">
        <span class="hud-hint">click a panel to explore · drag to look around</span>
      </div>
    </Transition>

    <!-- Project modal -->
    <Transition name="slide-up">
      <div v-if="activeProject" class="project-modal" @click.self="closeModal">
        <div class="modal-inner">
          <button class="modal-close" @click="closeModal">✕</button>
          <div class="modal-content">
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
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// ─── Projects data ───────────────────────────────────────────────
const projects = [
  {
    id: 'ema',
    title: 'EMA — Real-Time Voice Intelligence',
    tags: ['Nuxt.js', 'TypeScript', 'Three.js', 'Whisper', 'Llama 3.3', 'Supabase'],
    live: 'https://ema-ii.vercel.app',
    github: 'https://github.com/DimYiannis/ema',
    image: '/previews/ema.jpg',
  },
  {
    id: 'artsy',
    title: 'Artsy Gallery',
    tags: ['HTMX', 'JavaScript', 'Tailwind CSS', 'HTML5'],
    live: 'https://artsygallery.netlify.app',
    github: 'https://github.com/DimYiannis/Arts',
    image: '/previews/artsy.jpg',
  },
  {
    id: 'augusts',
    title: "August's Clothing Store",
    tags: ['Nuxt.js', 'Pinia', 'Tailwind CSS', 'Node.js'],
    live: 'https://augustsv2.netlify.app',
    github: 'https://github.com/DimYiannis/Augusts',
    image: '/previews/augusts.jpg',
  },
  {
    id: 'academia',
    title: 'Academia — Scientific Platform',
    tags: ['Nuxt 3', 'Tailwind CSS', 'Node.js'],
    live: 'https://academiav2.netlify.app',
    github: 'https://github.com/DimYiannis/academia_v2',
    image: '/previews/academia.jpg',
  },
  {
    id: 'yummy',
    title: 'YummyGreek — Digital Menu',
    tags: ['Vue 3', 'Tailwind CSS'],
    live: 'https://yumgreek.netlify.app',
    github: 'https://github.com/DimYiannis/YummyGreek',
    image: '/previews/yummy.jpg',
  },
  {
    id: 'thessaloniki',
    title: 'Meet in Thessaloniki',
    tags: ['Nuxt 3', 'Tailwind CSS'],
    live: 'https://meet-in-thessaloniki.netlify.app',
    github: 'https://github.com/DimYiannis/Meet-in-Thessaloniki',
    image: '/previews/thessaloniki.jpg',
  },
]

// ─── State ───────────────────────────────────────────────────────
const canvasRef    = ref<HTMLCanvasElement | null>(null)
const loading      = ref(true)
const loadProgress = ref(0)
const activeProject = ref<typeof projects[0] | null>(null)
const loadingMessages = [
  'Quarrying Carrara marble...',
  'Raising the columns...',
  'Lighting the torches...',
  'Hanging your work on the walls...',
]
const loadingMessage = ref(loadingMessages[0])

// ─── Three.js refs ────────────────────────────────────────────────
let renderer: THREE.WebGLRenderer
let scene:    THREE.Scene
let camera:   THREE.PerspectiveCamera
let controls: OrbitControls
let animId:   number
const panelMeshes: THREE.Mesh[] = []
const raycaster = new THREE.Raycaster()
const mouse     = new THREE.Vector2()
let hoveredPanel: THREE.Mesh | null = null

// ─── Canvas texture builder ───────────────────────────────────────
function buildPanelTexture(project: typeof projects[0]): THREE.CanvasTexture {
  const W = 512, H = 682
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Background — deep dark
  ctx.fillStyle = '#0D0A05'
  ctx.fillRect(0, 0, W, H)

  // Inner border (gold)
  ctx.strokeStyle = '#C8A040'
  ctx.lineWidth = 3
  ctx.strokeRect(14, 14, W - 28, H - 28)
  ctx.strokeStyle = '#A07820'
  ctx.lineWidth = 1
  ctx.strokeRect(20, 20, W - 40, H - 40)

  // Project image placeholder (grey until real images load)
  const imgH = 280
  ctx.fillStyle = '#1A1408'
  ctx.fillRect(28, 28, W - 56, imgH)

  // Try loading project image
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 28, 28, W - 56, imgH)
    tex.needsUpdate = true
  }
  img.src = project.image

  // Title area
  ctx.fillStyle = '#C8A860'
  ctx.font = 'bold 26px "Georgia", serif'
  ctx.textAlign = 'center'
  // Word-wrap title
  const words = project.title.split(' ')
  let line = '', y = 340
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (ctx.measureText(test).width > W - 60) {
      ctx.fillText(line, W / 2, y)
      line = word
      y += 32
    } else {
      line = test
    }
  }
  ctx.fillText(line, W / 2, y)

  // Divider
  ctx.strokeStyle = '#C8A040'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(60, y + 20)
  ctx.lineTo(W - 60, y + 20)
  ctx.stroke()

  // Tags
  ctx.fillStyle = '#8A7A50'
  ctx.font = '16px "Georgia", serif'
  let tagX = 40, tagY = y + 45
  for (const tag of project.tags.slice(0, 4)) {
    const tw = ctx.measureText(tag).width + 20
    if (tagX + tw > W - 40) { tagX = 40; tagY += 28 }
    ctx.fillStyle = '#1E180A'
    ctx.fillRect(tagX, tagY - 16, tw, 22)
    ctx.strokeStyle = '#C8A040'
    ctx.lineWidth = 0.5
    ctx.strokeRect(tagX, tagY - 16, tw, 22)
    ctx.fillStyle = '#C8A860'
    ctx.fillText(tag, tagX + 10, tagY)
    tagX += tw + 8
  }

  // Bottom buttons
  const btnY = H - 55
  ctx.fillStyle = '#1A3010'
  ctx.fillRect(40, btnY, 180, 36)
  ctx.strokeStyle = '#40A030'
  ctx.lineWidth = 1
  ctx.strokeRect(40, btnY, 180, 36)
  ctx.fillStyle = '#70C050'
  ctx.font = 'bold 18px "Georgia", serif'
  ctx.fillText('View Live ↗', 130, btnY + 23)

  ctx.fillStyle = '#0A1830'
  ctx.fillRect(W - 220, btnY, 180, 36)
  ctx.strokeStyle = '#3070C0'
  ctx.lineWidth = 1
  ctx.strokeRect(W - 220, btnY, 180, 36)
  ctx.fillStyle = '#5090D0'
  ctx.fillText('GitHub', W - 130, btnY + 23)

  const tex = new THREE.CanvasTexture(canvas)
  return tex
}

// ─── Scene setup ─────────────────────────────────────────────────
async function initScene() {
  const canvas = canvasRef.value!

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace

  scene  = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xF5EED8, 0.018)

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 10.5, 1.65)
  camera.lookAt(0, -5, 1.65)

  // Controls
  controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 0, 1.65)
  controls.minPolarAngle = Math.PI * 0.25
  controls.maxPolarAngle = Math.PI * 0.75
  controls.minDistance   = 2
  controls.maxDistance   = 18
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.rotateSpeed   = 0.5

  // HDRI environment (download from polyhaven.com/a/kloofendal_48d_partly_cloudy)
  // If you don't have it yet, comment this block out and use the fallback below
  try {
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const rgbeLoader = new RGBELoader()
    const hdrTexture = await new Promise<THREE.DataTexture>((resolve, reject) => {
      rgbeLoader.load('/textures/sky.hdr', resolve, undefined, reject)
    })
    const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture
    scene.environment = envMap
    scene.background  = envMap
    hdrTexture.dispose()
    pmremGenerator.dispose()
  } catch {
    // Fallback gradient sky
    scene.background = new THREE.Color(0x87CEEB)
    const ambientFallback = new THREE.AmbientLight(0xC8D8FF, 1.5)
    scene.add(ambientFallback)
  }

  loadProgress.value = 20
  loadingMessage.value = loadingMessages[1]

  // Load GLTF
  const loader = new GLTFLoader()
  loader.load(
    '/models/atrium.glb',
    (gltf) => {
      loadProgress.value = 70
      loadingMessage.value = loadingMessages[3]

      scene.add(gltf.scene)

      // Find panel canvases and apply project textures
      let panelIdx = 0
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow    = true
          child.receiveShadow = true

          // Check custom property exported from Blender
          const userData = child.userData
          if (userData.is_panel_canvas && panelIdx < projects.length) {
            const project = projects[panelIdx]
            const tex = buildPanelTexture(project)
            child.material = new THREE.MeshStandardMaterial({
              map: tex,
              roughness: 0.3,
              metalness: 0.0,
              emissive: new THREE.Color(0x2A1F05),
              emissiveIntensity: 0.05,
            })
            child.userData.projectId = project.id
            child.userData.projectIndex = panelIdx
            panelMeshes.push(child)
            panelIdx++
          }
        }
      })

      loadProgress.value = 100
      setTimeout(() => { loading.value = false }, 600)
    },
    (xhr) => {
      const progress = 20 + (xhr.loaded / xhr.total) * 50
      loadProgress.value = Math.round(progress)
      const msgIdx = Math.floor((progress / 70) * (loadingMessages.length - 1))
      loadingMessage.value = loadingMessages[Math.min(msgIdx, loadingMessages.length - 1)]
    },
    (err) => {
      console.error('GLTF load error:', err)
      loading.value = false
    }
  )

  // Lights (supplement baked lighting)
  const sun = new THREE.DirectionalLight(0xFFD580, 2.0)
  sun.position.set(-8, 6, -5)
  sun.castShadow = true
  sun.shadow.mapSize.width  = 2048
  sun.shadow.mapSize.height = 2048
  sun.shadow.camera.near = 0.5
  sun.shadow.camera.far  = 50
  sun.shadow.camera.left = sun.shadow.camera.bottom = -15
  sun.shadow.camera.right = sun.shadow.camera.top = 15
  scene.add(sun)

  // Panel point lights (subtle warm glow)
  projects.forEach((_, i) => {
    const light = new THREE.PointLight(0xFFD580, 0.3, 4)
    const isNorth = i < 3
    light.position.set(
      isNorth ? (i - 1) * 3.0 : 4.5,
      isNorth ? -11.5 : (i - 3 - 1) * 6.0,
      2.5
    )
    scene.add(light)
  })

  // Events
  window.addEventListener('resize', onResize)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('click', onClick)

  animate()
}

// ─── Animation loop ───────────────────────────────────────────────
function animate() {
  animId = requestAnimationFrame(animate)
  controls.update()

  // Hover detection
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(panelMeshes)

  if (intersects.length > 0) {
    const hit = intersects[0].object as THREE.Mesh
    if (hit !== hoveredPanel) {
      // Reset previous
      if (hoveredPanel) {
        const mat = hoveredPanel.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = 0.05
      }
      hoveredPanel = hit
      const mat = hit.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.35
      document.body.style.cursor = 'pointer'
    }
  } else {
    if (hoveredPanel) {
      const mat = hoveredPanel.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.05
      hoveredPanel = null
    }
    document.body.style.cursor = 'default'
  }

  renderer.render(scene, camera)
}

// ─── Event handlers ───────────────────────────────────────────────
function onMouseMove(e: MouseEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
  mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
}

function onClick(e: MouseEvent) {
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(panelMeshes)
  if (intersects.length > 0) {
    const hit = intersects[0].object
    const idx = hit.userData.projectIndex
    if (idx !== undefined) {
      activeProject.value = projects[idx]
      // Move camera toward panel
      moveCameraToPanel(hit as THREE.Mesh)
    }
  }
}

function moveCameraToPanel(panel: THREE.Mesh) {
  const worldPos = new THREE.Vector3()
  panel.getWorldPosition(worldPos)
  // Move camera 3 units in front of panel, same height
  const normal = new THREE.Vector3(0, 1, 0)
  panel.getWorldDirection(normal)
  const target = worldPos.clone().add(normal.multiplyScalar(3))
  // Simple lerp via setTimeout chain (no GSAP dependency)
  const startPos = camera.position.clone()
  const startTarget = controls.target.clone()
  let t = 0
  const step = () => {
    t += 0.04
    if (t >= 1) return
    camera.position.lerpVectors(startPos, target, easeInOut(t))
    controls.target.lerpVectors(startTarget, worldPos, easeInOut(t))
    controls.update()
    requestAnimationFrame(step)
  }
  step()
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function closeModal() {
  activeProject.value = null
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// ─── Lifecycle ────────────────────────────────────────────────────
onMounted(() => { initScene() })
onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  renderer?.dispose()
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.atrium-wrapper {
  position: fixed; inset: 0; overflow: hidden; background: #0D0A05;
}
.atrium-canvas {
  display: block; width: 100%; height: 100%;
}

/* Loading */
.loading-screen {
  position: absolute; inset: 0; z-index: 10;
  background: #0D0A05;
  display: flex; align-items: center; justify-content: center;
}
.loading-inner { text-align: center; width: 320px; }
.loading-text {
  font-family: 'Georgia', serif;
  color: #C8A860; font-size: 1rem; margin: 1.5rem 0 1rem;
  letter-spacing: 0.08em;
}
.loading-bar {
  height: 2px; background: #2A200A; border-radius: 2px; overflow: hidden;
}
.loading-fill {
  height: 100%; background: #C8A860;
  transition: width 0.4s ease; border-radius: 2px;
}

/* Greek key border (CSS-only) */
.greek-key-border {
  width: 200px; height: 20px; margin: 0 auto;
  border-top: 2px solid #C8A860;
  border-bottom: 2px solid #C8A860;
  background: repeating-linear-gradient(
    90deg,
    #C8A860 0px, #C8A860 2px,
    transparent 2px, transparent 8px,
    #C8A860 8px, #C8A860 10px
  );
  opacity: 0.5;
}

/* HUD */
.hud {
  position: absolute; bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  background: rgba(13, 10, 5, 0.7);
  border: 1px solid rgba(200, 168, 96, 0.3);
  border-radius: 20px; padding: 0.5rem 1.5rem;
  pointer-events: none;
}
.hud-hint {
  font-family: 'Georgia', serif;
  color: #C8A860; font-size: 0.8rem; letter-spacing: 0.06em;
}

/* Modal */
.project-modal {
  position: absolute; inset: 0; z-index: 20;
  background: rgba(0, 0, 0, 0.65);
  display: flex; align-items: flex-end; justify-content: center;
}
.modal-inner {
  background: #0D0A05;
  border: 1px solid #C8A860;
  border-bottom: none;
  border-radius: 16px 16px 0 0;
  width: 100%; max-width: 680px;
  padding: 2rem;
  position: relative;
}
.modal-close {
  position: absolute; top: 1.2rem; right: 1.2rem;
  background: none; border: 1px solid #C8A040;
  color: #C8A860; width: 32px; height: 32px;
  border-radius: 50%; cursor: pointer; font-size: 0.85rem;
}
.modal-title {
  font-family: 'Georgia', serif;
  color: #E8D080; font-size: 1.6rem; margin: 0 0 0.75rem;
}
.modal-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
.tag {
  font-family: 'Georgia', serif; font-size: 0.72rem;
  color: #C8A860; border: 1px solid #604818;
  padding: 0.2rem 0.6rem; border-radius: 4px;
  background: #1A1005;
}
.modal-preview {
  width: 100%; aspect-ratio: 16/9;
  background: #1A1408; border-radius: 8px; overflow: hidden;
  margin-bottom: 1rem;
}
.modal-preview img { width: 100%; height: 100%; object-fit: cover; }
.modal-links { display: flex; gap: 0.75rem; }
.btn-live, .btn-github {
  font-family: 'Georgia', serif; font-size: 0.9rem;
  padding: 0.6rem 1.5rem; border-radius: 6px;
  text-decoration: none; cursor: pointer;
}
.btn-live {
  background: #1A3010; color: #7EC870;
  border: 1px solid #3A6020;
}
.btn-github {
  background: #0A1830; color: #5090D0;
  border: 1px solid #1A3860;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.4s ease, opacity 0.4s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>
