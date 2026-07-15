# Portfolio

An Astro + TypeScript portfolio site. Dark theme built on the [Catppuccin Frappé](https://catppuccin.com/palette/) palette, with an interactive hero: a cursor-chasing dot that distorts a layered wave field drawn on canvas.

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  components/     Header, WaveHero, About, Projects, ProjectCard, Blog, Contact, Footer
  content/blog/    Markdown blog posts (Astro content collection)
  data/            site.ts (name, bio, skills, socials), projects.ts (project list)
  layouts/         Layout.astro (head, fonts, meta)
  scripts/wave.ts  Canvas engine for the hero wave field
  styles/          global.css — Catppuccin Frappé design tokens + base styles
```

## Customizing

- **Your info, bio, skills, socials** → `src/data/site.ts`
- **Projects** → `src/data/projects.ts`
- **Blog posts** → add a new `.md` file to `src/content/blog/` with the existing frontmatter shape (`title`, `excerpt`, `date`, `tags`, `draft`)
- **Colors** → CSS variables at the top of `src/styles/global.css`. Swapping the `--ctp-*` values to another Catppuccin flavor (Latte, Macchiato, Mocha) restyles the whole site.
- **Wave hero behavior** → tune `LAYERS`, `DISTORT_RADIUS`, `DISTORT_STRENGTH`, and `CHASE_EASE` in `src/scripts/wave.ts`.

## Notes

- The hero canvas respects `prefers-reduced-motion`: it renders a single static frame instead of animating.
- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts via `<link>` tags in `Layout.astro`. Swap for self-hosted fonts if you need to avoid the external request.
- All project/blog/contact content is placeholder — replace before deploying.
