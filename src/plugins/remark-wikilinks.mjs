import { visit } from 'unist-util-visit';

// Obsidian-style links:  [[Target]]  or  [[Target|Display text]].
// Resolved targets become internal <a class="wikilink"> links; unresolved ones
// render as a muted <span class="wikilink wikilink-unresolved"> so broken links
// are visible without breaking the page.
const WIKILINK = /\[\[([^\]]+)\]\]/g;

export default function remarkWikilinks(options = {}) {
  const resolve = typeof options.resolve === 'function' ? options.resolve : () => null;

  return (tree, file) => {
    const fromPath = file && (file.path || (file.history && file.history[0]));

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null || !node.value.includes('[[')) return;

      const value = node.value;
      const parts = [];
      let last = 0;
      let m;
      WIKILINK.lastIndex = 0;
      while ((m = WIKILINK.exec(value))) {
        if (m.index > last) parts.push({ type: 'text', value: value.slice(last, m.index) });

        const raw = m[1];
        const pipe = raw.indexOf('|');
        const target = (pipe >= 0 ? raw.slice(0, pipe) : raw).trim();
        const display = (pipe >= 0 ? raw.slice(pipe + 1) : raw).trim();
        const href = resolve(target, fromPath);

        if (href) {
          parts.push({
            type: 'link',
            url: href,
            data: { hProperties: { className: ['wikilink'] } },
            children: [{ type: 'text', value: display }],
          });
        } else {
          parts.push({
            type: 'emphasis',
            data: {
              hName: 'span',
              hProperties: {
                className: ['wikilink', 'wikilink-unresolved'],
                title: `Unresolved link: ${target}`,
              },
            },
            children: [{ type: 'text', value: display }],
          });
        }
        last = m.index + m[0].length;
      }
      if (!parts.length) return;
      if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });

      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}
