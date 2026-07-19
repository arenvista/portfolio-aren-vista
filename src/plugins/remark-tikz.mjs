import { visit } from 'unist-util-visit';

// Turn ```tikz fenced code blocks into <script type="text/tikz"> elements that
// the vendored (Obsidian-flavoured) TikZJax library renders client-side. The
// fence content is passed through verbatim — the notes already include the
// \usepackage{} / \begin{document} … \end{document} wrapper TikZJax expects.
export default function remarkTikz() {
  return (tree) => {
    visit(tree, 'code', (node, i, parent) => {
      if (!parent || i == null) return;
      if ((node.lang || '').toLowerCase() !== 'tikz') return;
      const src = node.value.trim();
      parent.children[i] = {
        type: 'html',
        value:
          '<div class="tikz-figure">' +
          '<script type="text/tikz" data-show-console="false">\n' +
          src +
          '\n</script></div>',
      };
    });
  };
}
