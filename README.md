# Portfolio – Adam Baranyi

My personal portfolio website as a Frontend Developer, built from scratch with
plain HTML, CSS and JavaScript (no framework). It presents my skills, projects
and a working contact form, and is fully bilingual (German / English).

🔗 **Live:** [www.adambaranyi.xyz](https://www.adambaranyi.xyz)

## Features

- **Bilingual (DE/EN)** – language toggle in the header; the chosen language is
  remembered across pages via `localStorage`.
- **Horizontal scrolling** on desktop, vertical layout on mobile.
- **Responsive** down to small phones (breakpoints at 800 / 480 / 360 px).
- **Contact form** with on-blur validation, an enabled-only-when-valid submit
  button and server-side sending via PHP.
- **Legal page** (imprint & privacy policy), also available in both languages.

## Tech stack

- HTML5
- CSS3 (custom properties, grid, flexbox – split into modular partials)
- Vanilla JavaScript (ES6)
- PHP (contact form mail handler)

## Project structure

```
index.html          – main page
style.css            – imports the CSS partials + global styles
styles/              – modular CSS (layout, hero, sections, projects, contact, …)
script.js            – language toggle, navigation, horizontal scroll
scripts/             – translations + contact form logic
contact.php          – contact form mail handler
htmls/legal.html     – imprint & privacy policy
assets/              – images and fonts
```

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
