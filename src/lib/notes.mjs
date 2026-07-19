// ---------------------------------------------------------------------------
// Notes index — the structural source of truth for the /notes section.
//
// This module scans src/content/notes on disk (synchronously, at module load)
// and derives: the topic → note tree used by the sidebar, a flat reading-order
// sequence used for prev/next paging, and a resolver that turns Obsidian-style
// [[wikilink]] targets into URLs.
//
// Everything keys off the raw relative path `<Topic>/<Filename-without-ext>`,
// which is *also* what the [...slug] route uses for its params. Deriving both
// from the same string guarantees sidebar links, wikilinks, and routes match.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Anchored on the project root (cwd) rather than import.meta.url: this module
// is imported both from astro.config.mjs and from bundled page chunks, and the
// bundled location would otherwise resolve to dist/ where the sources aren't.
const NOTES_DIR = path.join(process.cwd(), 'src', 'content', 'notes');

// Preferred topic order; anything not listed falls to the end, alphabetically.
const TOPIC_ORDER = ['Numerical-Linear-Algebra', 'Real-Analysis'];

// Curated aliases for the concept names used in index.md that don't map
// cleanly onto a filename. Keys are matched after normalisation. Extend freely.
const CONCEPT_ALIASES = {
  'Orthogonal Matrices and QR Factorization': 'Numerical-Linear-Algebra/L08-Orthogonal-Matricies',
  'The Singular Value Decomposition': 'Numerical-Linear-Algebra/L12-Singular-Value-Decomposition',
  'Conditioning and Numerical Stability': 'Numerical-Linear-Algebra/L10-Numerical-Stability',
  'The Spectral Theorem': 'Numerical-Linear-Algebra/L14-Eigenvalue-Spectral-Theorem',
  'Schur Factorization': 'Numerical-Linear-Algebra/L15-Structured-Decomposition',
  'Iterative Eigenvalue Methods': 'Numerical-Linear-Algebra/L16-Computing-Eigenvalues',
  'Gauss–Newton': "Numerical-Linear-Algebra/L19-Newton's-Systems-for-Gauss-Newton",
  'Real Analysis': 'Real-Analysis/L01-Sets-and-Subsets',
};

function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/[–—]/g, '-') // en/em dash → hyphen
    .replace(/[’`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function humanizeFilename(base) {
  return base.replace(/^L0*\d+[-_]?/i, '').replace(/[-_]+/g, ' ').trim();
}

function humanizeTopic(name) {
  return name.replace(/[-_]+/g, ' ');
}

// Leading lecture number (L02 → 2, L013 → 13) for natural sort within a topic.
function lectureNum(base) {
  const m = base.match(/^L0*(\d+)/i);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data = {};
  let body = raw;
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (fm) {
    try {
      data = yaml.load(fm[1]) || {};
    } catch {
      data = {};
    }
    body = raw.slice(fm[0].length);
  }
  const h1 = body.match(/^#\s+(.+?)\s*$/m);
  return { data, title: h1 ? h1[1].trim() : null };
}

function build() {
  const topics = [];
  let entries = [];

  const dirs = fs
    .readdirSync(NOTES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => {
      const ia = TOPIC_ORDER.indexOf(a);
      const ib = TOPIC_ORDER.indexOf(b);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 1e9 : ia) - (ib === -1 ? 1e9 : ib);
      return a.localeCompare(b);
    });

  for (const topic of dirs) {
    const dir = path.join(NOTES_DIR, topic);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort((a, b) => lectureNum(a) - lectureNum(b) || a.localeCompare(b));

    const notes = files.map((file) => {
      const base = file.replace(/\.md$/, '');
      const slug = `${topic}/${base}`;
      const { data, title } = parseFile(path.join(dir, file));
      return {
        slug,
        base,
        topic,
        topicLabel: humanizeTopic(topic),
        id: data.id != null ? String(data.id) : null,
        aliases: Array.isArray(data.aliases) ? data.aliases : [],
        title: title || humanizeFilename(base) || base,
      };
    });

    topics.push({ name: topic, label: humanizeTopic(topic), notes });
    entries = entries.concat(notes);
  }

  // Resolver map: normalised key → [slug, ...]. Multiple notes can share a key
  // (e.g. the id "L02" exists in two topics); we keep them all and disambiguate
  // by the referring file's topic at lookup time.
  const map = new Map();
  const add = (key, slug) => {
    if (!key) return;
    const nk = normalize(key);
    if (!nk) return;
    const arr = map.get(nk) || [];
    if (!arr.includes(slug)) arr.push(slug);
    map.set(nk, arr);
  };

  for (const n of entries) {
    add(n.title, n.slug);
    add(n.base, n.slug);
    add(humanizeFilename(n.base), n.slug);
    add(n.slug, n.slug);
    if (n.id) add(n.id, n.slug);
    for (const a of n.aliases) add(a, n.slug);
  }
  for (const [concept, slug] of Object.entries(CONCEPT_ALIASES)) add(concept, slug);

  function resolve(target, fromPath) {
    if (!target) return null;
    const hits = map.get(normalize(target));
    if (!hits || !hits.length) return null;
    let slug = hits[0];
    if (hits.length > 1 && fromPath) {
      const topic = path.basename(path.dirname(String(fromPath)));
      const same = hits.find((h) => h.startsWith(`${topic}/`));
      if (same) slug = same;
    }
    return `/notes/${slug}`;
  }

  return { topics, flat: entries, resolve };
}

const index = build();

export const notesIndex = index;
export const getTopics = () => index.topics;
export const getFlatNotes = () => index.flat;
export const resolveLink = (target, fromPath) => index.resolve(target, fromPath);
