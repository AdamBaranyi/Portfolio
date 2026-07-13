# Portfolio – Adam Baranyi

My personal portfolio website as a Frontend Developer, rebuilt from the ground
up with React, TypeScript and a live 3D space scene that reacts to scrolling
and mouse movement. It presents my skills, projects and a working contact
form, and is fully bilingual (German / English).

🔗 **Live:** [www.adambaranyi.xyz](https://www.adambaranyi.xyz)

## Features

- **Live 3D background** (three.js via react-three-fiber) – a star field and a
  wireframe icosahedron that rotate with the scroll speed and drift with the
  mouse. The two orbiting planets are named after my whippets: Jupiter and
  Kepler. 🐕🐕
- **Smooth scrolling** with Lenis and scroll-triggered reveal animations with
  GSAP ScrollTrigger.
- **Bilingual (DE/EN)** – language toggle in the header; the chosen language
  is remembered via `localStorage`.
- **Projects with 3D tilt cards** – the full screenshot stays visible thanks
  to a blurred-fill technique instead of cropping.
- **Skill grid** with brand-colored logos and a per-brand glow hover effect.
- **Contact form** with on-blur validation, an enabled-only-when-valid submit
  button and server-side sending via PHP.
- **Legal pages** (imprint & privacy policy) on a tiny hash router, also
  available in both languages.
- **Performance aware** – the three.js bundle is lazy-loaded, small screens
  get a lighter scene and `prefers-reduced-motion` disables the animations
  entirely. Responsive down to 320 px.

## Tech stack

- React 19 + TypeScript
- Vite (build tool) + Bun (runtime / package manager)
- three.js / react-three-fiber (3D scene)
- GSAP ScrollTrigger + Lenis (scroll animations)
- CSS custom properties, grid, flexbox (one stylesheet per component)
- PHP (contact form mail handler)

## Project structure

```
index.html           – Vite entry page
src/main.tsx         – app bootstrap (+ a little console easter egg)
src/App.tsx          – hash router, reveal animations, page layout
src/sections/        – Hero, WhyMe, Skills, Projects, Contact (+ styles)
src/components/      – Navbar, Footer, TiltCard, icons, …
src/three/           – 3D scene and procedural planet textures
src/i18n/            – translations (DE/EN) + language context
src/data/            – projects, skills and contact data
src/pages/           – imprint & privacy policy
public/contact.php   – contact form mail handler
public/assets/       – images and fonts
```

## Development

```bash
bun install
bun dev          # dev server
bun run build    # production build into dist/
```

The build uses relative paths, so the content of `dist/` can be uploaded to
the webhost root or any subfolder.

## Projects featured

| Project | Description | Live |
|---------|-------------|------|
| Join | Kanban-style task manager (group project) | [join.adambaranyi.xyz](https://join.adambaranyi.xyz) |
| El Pollo Loco | Object-oriented jump-and-run game | [polloloco.adambaranyi.xyz](https://polloloco.adambaranyi.xyz) |
| Pokédex | Pokémon library using the PokéAPI | [pokedex.adambaranyi.xyz](https://pokedex.adambaranyi.xyz) |

## Contact

- 🌐 [www.adambaranyi.xyz](https://www.adambaranyi.xyz)
- 💼 [LinkedIn](https://www.linkedin.com/in/adam-baranyi123)
- 📍 Lucerne, Switzerland
