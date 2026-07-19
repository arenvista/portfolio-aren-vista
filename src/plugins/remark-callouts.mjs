import { visit } from 'unist-util-visit';

// Obsidian-style callouts:  > [!type]±  Optional title
// followed by the callout body (which may itself contain nested callouts).
//
// Each blockquote whose first line matches the marker is rewritten into
//   <div class="callout callout-<kind>" data-callout="<type>">
//     <div class="callout-title"> …title… </div>
//     <div class="callout-content"> …body… </div>
//   </div>
// Nested callouts are handled for free: they're nested blockquotes, and
// unist-util-visit walks the rewritten tree, transforming them in turn.

const META = {
  def: 'Definition',
  thm: 'Theorem',
  lem: 'Lemma',
  cor: 'Corollary',
  corr: 'Corollary',
  pf: 'Proof',
  proof: 'Proof',
  imp: 'Important',
  important: 'Important',
  note: 'Note',
  tip: 'Tip',
  example: 'Example',
  ex: 'Example',
  case: 'Case',
};

// Kinds that share a visual treatment collapse onto one class here.
const KIND = {
  corr: 'cor',
  proof: 'pf',
  important: 'imp',
  ex: 'example',
};

const MARKER = /^\s*\[!(\w+)\]([+-]?)[ \t]*/;

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const first = node.children && node.children[0];
      if (!first || first.type !== 'paragraph' || !first.children.length) return;
      const lead = first.children[0];
      if (!lead || lead.type !== 'text') return;
      const m = lead.value.match(MARKER);
      if (!m) return;

      const type = m[1].toLowerCase();
      const kind = KIND[type] || type;
      const label = META[type] || cap(type);
      const foldable = m[2] === '+' || m[2] === '-';
      const collapsed = m[2] === '-';

      // Drop the marker from the lead text node.
      lead.value = lead.value.slice(m[0].length);

      // Split the first paragraph's inline children into the title (everything
      // up to the first newline) and the remaining body inlines (after it).
      const titleInlines = [];
      const restInlines = [];
      let split = false;
      for (const child of first.children) {
        if (split) {
          restInlines.push(child);
          continue;
        }
        if (child.type === 'text' && child.value.includes('\n')) {
          const nl = child.value.indexOf('\n');
          const before = child.value.slice(0, nl);
          const after = child.value.slice(nl + 1);
          if (before) titleInlines.push({ type: 'text', value: before });
          if (after) restInlines.push({ type: 'text', value: after });
          split = true;
        } else {
          titleInlines.push(child);
        }
      }
      while (
        titleInlines.length &&
        titleInlines[0].type === 'text' &&
        !titleInlines[0].value.trim()
      ) {
        titleInlines.shift();
      }

      const hasTitle = titleInlines.some((n) => n.type !== 'text' || n.value.trim());
      const titleChildren = hasTitle ? titleInlines : [{ type: 'text', value: label }];

      const titleNode = {
        type: 'paragraph',
        data: { hName: 'div', hProperties: { className: ['callout-title'] } },
        children: titleChildren,
      };

      const bodyBlocks = [];
      if (restInlines.some((n) => n.type !== 'text' || n.value.trim())) {
        bodyBlocks.push({ type: 'paragraph', children: restInlines });
      }
      for (let i = 1; i < node.children.length; i++) bodyBlocks.push(node.children[i]);

      const contentNode = {
        type: 'blockquote',
        data: { hName: 'div', hProperties: { className: ['callout-content'] } },
        children: bodyBlocks,
      };

      const className = ['callout', `callout-${kind}`];
      if (foldable) className.push('is-foldable');
      if (collapsed) className.push('is-collapsed');

      node.data = {
        hName: 'div',
        hProperties: { className, 'data-callout': type },
      };
      node.children = [titleNode, contentNode];
    });
  };
}
