# CLAUDE.md — Yiannis Portfolio (My_Portfolio)

This file tells Claude Code exactly how this repo works so it can operate autonomously.

---

## Project identity

- **Repo**: https://github.com/DimYiannis/My_Portfolio
- **Live**: https://yiannis-portfolio.netlify.app
- **Owner**: Yiannis Dimitrakopoulos (Codam College — 42 Network, Amsterdam; login: ydimitra)
- **Contact**: yiannisdimitrakopoulos@yahoo.com · linkedin.com/in/dim-yiannis
- **Deploy**: Netlify (auto-deploy on push to main)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 |
| Language | TypeScript + Vue 3 (Composition API, `<script setup>`) |
| Styling | Tailwind CSS |
| Deploy | Netlify (static) |
| Package manager | npm |

---

## Design

Dark single-page portfolio (evolved from v2 branch design):

- Dark background (`#121212` / `dark-gray`), white text, Inter font, sky-blue hover accents
- Max-width `5xl`, sections: header nav (logo icons), hero (headline + profile photo + CTA buttons), projects grid (2-col), skills/webstack grid (Logos components), contact CTA, footer
- Project cards: `light-gray` (`#1E1E1E`) bg, screenshot, title, description, tag pills, View Live / GitHub buttons, lift on hover
- Subtle motion only (hover transitions) — no heavy animation, no 3D

> The previous "Ancient Greek Atrium" Three.js redesign was removed in June 2026.
> Three.js, the GLB model, HDRI textures and `AtriumScene.vue` are gone — do not reintroduce them.

---

## Folder structure

```
My_Portfolio/
├── components/
│   └── Logos/                 ← tech logo SVG components (Github, Vuejs, …)
├── layouts/
│   └── default.vue            ← white bg, neutral text wrapper
├── pages/
│   └── index.vue              ← entire portfolio (hero, projects, footer)
├── assets/
│   └── css/tailwind.css       ← base styles + scrollbar
├── public/
│   ├── previews/              ← project screenshots (ema, artsy, augusts, academia, yummy, thessaloniki)
│   ├── DimYiannis_CV.pdf
│   └── favicon.ico
├── nuxt.config.ts
├── tailwind.config.js
└── CLAUDE.md
```

---

## Projects data

Defined inline in `pages/index.vue`. Curated to 6 strongest (June 2026) —
older/simpler projects (Artsy, Augusts, YummyGreek, Thessaloniki, A-Maze-ing) were cut
and are reachable via the "View more on Github" link:

| id | Title | Live | GitHub |
|---|---|---|---|
| ema | EMA — Real-Time Voice Intelligence | https://ema-ii.vercel.app | https://github.com/DimYiannis/ema |
| call-me-maybe | call me maybe — LLM Function Calling | — | https://github.com/DimYiannis/call_me_maybe |
| medlake | Medlake Training — Website Redesign (freelance) | https://medlake.vercel.app | https://github.com/DimYiannis/medlake |
| codexion | Codexion — Concurrency Simulation (C) | — | https://github.com/DimYiannis/codexion |
| academia | Academia — AI Research Feed | https://academiav2.netlify.app | https://github.com/DimYiannis/academia_v2 |
| flyin | Fly-in — Drone Routing Simulation | — | https://github.com/DimYiannis/-Fly-in |

Screenshots live in `public/previews/{id}.jpg`. `live`, `image`, `snippet` are optional —
cards without `image` render a gradient card showing `snippet` in monospace; cards without `live` show only the GitHub button.

---

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run generate   # static generation (Netlify)
npm run preview    # preview production build
```

---

## Agent instructions

1. **Nuxt 3 + Vue 3 only** — Composition API with `<script setup>`, no Options API
2. **Tailwind for all styling** — avoid custom CSS unless Tailwind can't express it
3. **TypeScript** — all new `.ts` / `.vue` files typed
4. **Netlify static** — no server-side routes, no API routes, everything client-side
5. **Keep it minimal** — no heavy animation libraries, no 3D, no large dependencies without asking
6. **Auto-imported components** — `components.dirs` uses `pathPrefix: false`, so `Logos/Github.vue` is `<Github />`

---

*Last updated: June 2026*
