# Redesign changelog

Reference: https://wodniack.dev/ · Palette: the six swatches you provided (plus the printed #30525C used as the dark "deep sea" band; note the coral swatch renders #FA6E81 while its label reads #30525C — I used the visible coral for the accent).

## The work section (the big one)
`WorkShowcase.astro` + `src/scripts/showcase.ts` + `src/scripts/previews.ts`

- Section is (N+1) viewports tall; a sticky child pins to the screen.
- Each unit of scroll = one project: ~55% dwell, then a scrub-controlled
  bottom-up wipe reveals the next frame (reversible, tied to scroll position
  exactly like the reference).
- **In place of videos** (none exist in the repo), every frame plays a live
  canvas simulation of the project itself: Conway's Life actually runs,
  ChessC++ plays the Italian Game, TinyOS types its boot log, SnapDaemon
  demos last-input-wins on A/D lanes, the audio recommender animates
  waveform + embedding clusters, Math-o-nomicon draws rose curves, etc.
  Add `video: '/previews/<slug>.mp4'` to any project to swap in real footage.
- Clicking a frame opens the project (repo / case study / live site); the
  custom cursor becomes a golden "View" badge over frames.
- Side rail: clickable dots + rolling 01/06 counter. Full keyboard access
  (frames are anchors), and reduced-motion gets static frames + discrete cuts.
- Below it: a filterable "Archive" index of every project (FLIP-animated
  rows replace the old card grid).

## Bugs fixed
1. `index.astro` used `site.role`, which doesn't exist → page title rendered
   "Aren Vista — undefined". Now `site.roles[0]`.
2. `/projects/snapdaemon` was an **empty file** → blank page. Now a real
   case-study page (copy drafted from your resume line — edit freely).
3. `projects.ts` had six "update this description" placeholders and several
   projects pointing at the *textedit* repo (copy/paste artifact). Restored
   real descriptions + repo links from `resume.astro` (BotCT, ASCAutoPayroll,
   AudioRecomendation). TinyOS/Math-o-nomicon still have no public repo, so
   they point at your GitHub profile — update when published.
4. Header nav vanished under 640px with **no mobile menu** → added a
   full-screen overlay menu (burger, Esc to close, scroll lock).
5. Footer "RSS" linked to `/rss.xml`, which 404s (no feed exists) → socials
   now link to your real GitHub / GitLab / LinkedIn.
6. `wave.ts` distortion gate `pointerActive || reduceMotion === false` was
   always true on animated devices — ran distance math against a dot parked
   at (-9999,-9999) every frame. Now gated on `pointerActive`.
7. Recognition stat dots were rendered but never lit → the rotator now
   syncs the active dot.
8. Anchor links scrolled section headings **under the sticky header** →
   `scroll-padding-top` added.
9. `reveal.ts` was initialized three times on the same page (three
   components), stacking IntersectionObservers → module-level guard.
10. Nav underline parked under "About" even when no section was active →
    hides until hover / an active hash exists.
11. Header imported binary icon assets (white-on-dark PNGs/SVGs, absent from
    this snapshot, wrong for a light theme) → inline `currentColor` SVGs.
12. `About.astro`: unused `experience` import + ~90 lines of dead timeline
    CSS (the timeline moved to `Experience.astro` long ago) → removed.
13. Bio copy referenced "sections and pages over on the left" and a "start
    here" link — UI this site doesn't have → those sentences removed
    (everything else untouched; see `src/data/site.ts`).
14. `astro.config.mjs` site was `https://example.com` → your real domain.
15. Command palette project entries all pointed at `#projects` → now deep-link
    to each project's actual destination.
16. `resume.css` bullet lists rendered without markers on the resume page
    (global reset stripped them) → restored disc markers scoped to `.content`.

## Improvements
- New identity: Bricolage Grotesque display / Public Sans body / IBM Plex
  Mono labels; giant outlined hero name; roles marquee band; paper-grain
  overlay; petal-tick eyebrows; coral selection color; dark bands in the
  printed #30525C deep sea.
- Hero canvas rethemed as slate/teal/rose contour lines with a coral chaser —
  and it now reads colors from CSS variables, so palette edits restyle it.
- Preloader with a 0→100 counter (once per session; skipped entirely under
  reduced motion).
- Contact: dark band with giant outlined marquee behind a magnetic email CTA.
- Footer: live Baltimore clock + back-to-top.
- Filter buttons, tags, buttons, focus states, blog pages all rethemed via
  tokens.

## Left alone on purpose
- `/resume` stays a white print-style page (it reads as intentional).
- Note: the resume lists `arenvista1@gmail.com` while the site uses
  `arenv1@umbc.edu` — I didn't touch either; unify if that's unintentional.
- Your `src.up/` backup folder isn't included in this archive.
