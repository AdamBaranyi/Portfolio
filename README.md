# Portfolio Modern – Adam Baranyi

Modernized version of my personal portfolio as a Frontend Developer —
rebuilt with React, TypeScript and a live 3D background that reacts to
scrolling and mouse movement. The previous vanilla version lives on in
the `Portfolio` folder and stays online until this one replaces it.

🔗 **Live (current version):** [www.adambaranyi.xyz](https://www.adambaranyi.xyz)

## Features

- **3D particle scene** (three.js via react-three-fiber) fixed behind the
  whole page — rotates with scroll velocity, drifts with the mouse and the
  wireframe icosahedron travels along while you scroll.
- **Smooth scrolling** with Lenis + section reveal animations with GSAP
  ScrollTrigger.
- **Bilingual (DE/EN)** — language toggle in the navbar, persisted in
  `localStorage`.
- **Projects** Join, El Pollo Loco and Pokedex with tilt-on-hover 3D cards.
- **Contact form** with on-blur validation and server-side sending via the
  same `contact.php` as before (lives in `public/`).
- **Legal pages** (imprint & privacy policy) on a tiny hash router
  (`#/imprint`, `#/privacy`) — no extra dependency needed.
- **Performance aware** — the three.js chunk is lazy-loaded, small screens
  get a lighter particle scene, and `prefers-reduced-motion` disables the
  3D scene and animations entirely.

## Tech stack

React 19 · TypeScript · Vite · Bun · three.js / react-three-fiber ·
GSAP ScrollTrigger · Lenis

## Development

```bash
bun install
bun dev        # dev server
bun run build  # production build into dist/
```

The build uses relative paths (`base: './'`), so the content of `dist/`
can be uploaded to the webhost root or any subfolder.
