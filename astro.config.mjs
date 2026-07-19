import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkTikz from './src/plugins/remark-tikz.mjs';
import remarkCallouts from './src/plugins/remark-callouts.mjs';
import remarkWikilinks from './src/plugins/remark-wikilinks.mjs';
import { notesIndex } from './src/lib/notes.mjs';

export default defineConfig({
  site: 'https://portfolio.arenvista.me',
  output: 'static',
  compressHTML: true,
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkTikz,
      remarkCallouts,
      [remarkWikilinks, { resolve: (target, from) => notesIndex.resolve(target, from) }],
    ],
    rehypePlugins: [rehypeKatex],
  },
});
