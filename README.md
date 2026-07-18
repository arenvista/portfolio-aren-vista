# Portfolio

An Astro + TypeScript portfolio site in a warm coastal palette,
with a wodniack.dev-style work showcase: as you scroll, each project takes
over the viewport as a full-bleed frame playing **live canvas footage** — a
real Conway simulation, a chess opening that plays itself, a TinyOS boot
sequence — and clicking any frame opens the project.

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
  components/          Header, WaveHero, WorkShowcase, About, Experience,
                       Recognition, Blog, Contact, Footer, Preloader,
                       CustomCursor, CommandPalette
  content/blog/        Markdown blog posts (Astro content collection)
  data/                site.ts (name, bio, skills, socials, nav),
                       projects.ts (project list + showcase flags),
                       recognition.ts
  layouts/             Layout.astro (head, fonts, meta)
  scripts/
    showcase.ts        Pinned-scroll logic for the work frames
    previews.ts        The live canvas scenes (one per project)
    wave.ts            Hero contour-wave engine
    ...                cursor, reveal, marquee helpers, etc.
  styles/global.css    Design tokens + base styles
```

## Customizing

- **Your info, bio, skills, socials, nav** → `src/data/site.ts`
- **Projects** → `src/data/projects.ts`
  - `showcase: true` puts a project in the scroll showcase
  - `preview: '<scene>'` picks its live canvas scene
    (`life`, `waveform`, `keys`, `boot`, `chess`, `math`, `clock`,
    `browser`, `form`, `edit` — see `src/scripts/previews.ts`)
  - `video: '/previews/<slug>.mp4'` — drop real footage into `public/`
    and set this; the showcase will use the video instead of the canvas
- **Blog posts** → add a `.md` file to `src/content/blog/`
- **Colors** → the palette variables at the top of `src/styles/global.css`
  (`--apricot`, `--coral`, `--steel`, `--rose`, `--teal`, `--slate`,
  `--deep-sea`). The hero canvas and all previews read them at runtime, so
  changing the palette restyles the animations too.

## Notes

- Every animation (hero canvas, showcase, previews, marquees, preloader,
  cursor) respects `prefers-reduced-motion`: static frames, discrete
  transitions, no scroll hijacking.
- Fonts (Bricolage Grotesque, Public Sans, IBM Plex Mono) load from Google
  Fonts via `<link>` in `Layout.astro`.
