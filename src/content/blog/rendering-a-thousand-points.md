---
title: Rendering a thousand points without dropping a frame
excerpt: Notes on keeping a canvas animation smooth once the point count, the listeners, and the resize handler all start fighting each other.
date: 2026-06-02
tags: [canvas, performance]
---

Most canvas slowdowns I've hit didn't come from the math — they came from allocation. Building a fresh array of points every frame, or recomputing a gradient object on every draw call, adds up fast once you're pushing sixty frames a second.

The fix is almost always the same: preallocate what you can, mutate in place, and keep anything that touches the DOM (like `getBoundingClientRect`) out of the render loop. Resize handlers should recompute layout once, not on every tick.

The other half is knowing when to stop animating. Respecting `prefers-reduced-motion` isn't just an accessibility checkbox — it's also a free performance win, since you can skip the whole loop and draw a single static frame instead.
