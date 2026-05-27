# Portfolio — Atrium Scene Progress

## Status: Scene rendering ✓ (confirmed working in browser)

---

## Completed

### Component setup
- `nuxt.config.ts` — added `components: { dirs: [{ path: '~/components', pathPrefix: false }] }` so `<AtriumScene />` resolves (was `SceneAtriumScene` with path prefix on)
- `pages/index.vue` — wrapped `<AtriumScene />` in `<ClientOnly>` for SSR safety

### Coordinate system fix (critical)
- GLB uses Y-up standard (Y=height, Z=depth), but code assumed Z-up (Z=height, Y=depth)
- Camera was positioned at Y=9.5 (9.5m above the 7m ceiling) — scene rendered white
- Fixed: camera at `(0, 1.65, -10.5)` — Y=1.65m eye height, Z=-10.5m south end
- Updated `updateCameraDirection()`, `clampPosition()`, WASD vectors for Y-up
- Panel light positions updated to Y-up coordinates

### Import / deprecation fixes
- Removed `RGBELoader` (deprecated) — `sky.hdr` doesn't exist, replaced with direct ambient fallback
- Removed `SSAOPass` — caused white canvas output (depth buffer issue with postprocessing)
- Changed `PCFSoftShadowMap` → `PCFShadowMap` (deprecated warning)
- Removed `OrbitControls` (not needed — using first-person WASD)

### Asset fixes
- Created placeholder images in `public/previews/` for all 6 projects (1x1 PNG, stops 404s)
- `public/textures/sky.hdr` — not present; code uses ambient light fallback (no error)

### Post-processing
- Removed `EffectComposer` entirely — bloom + OutputPass both caused all-white output with ACESFilmic tone mapping at high exposure on marble walls
- Using `renderer.render(scene, camera)` directly — clean, no postprocessing overhead
- Background: `scene.background = new THREE.Color(0x0A0806)` — dark, no sky visible

---

## Pending

- [ ] Replace placeholder preview images with real screenshots
- [ ] Tune camera start position (currently south wall, some geometry gaps visible at edges)
- [ ] Test panel click → modal flow
- [ ] Add `medlake` project to the scene (currently only 6 GLB panel slots)
- [ ] Mobile touch controls (touchstart/touchmove implemented, needs testing)
- [ ] `public/textures/sky.hdr` — optional, download from Polyhaven for PBR reflections
- [ ] About section (south wall or central plinth)
- [ ] Performance audit (LOD, texture compression)
- [ ] Netlify deploy + smoke test
