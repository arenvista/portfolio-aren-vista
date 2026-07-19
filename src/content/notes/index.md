---
title: welcome
---

## to the Math-o-nomicon

<div class="hero-scene" aria-hidden="true">
<div class="blob blob-rose"></div>
<div class="blob blob-teal"></div>
<div class="blob blob-main">
<span class="eye eye-l"></span>
<span class="eye eye-r"></span>
<span class="cheek cheek-l"></span>
<span class="cheek cheek-r"></span>
<span class="smile"></span>
</div>
</div>

Notes taken during a lecture are optimised for keeping up, not for being read later. They fragment across courses, lose their cross-references, and go stale the moment the semester ends — which is exactly when you start needing them, whether that's for a qualifying exam or for explaining a proof to someone at a tutoring desk.

The Math-o-nomicon rewrites them as one document with a single voice, a single set of conventions, and links that hold across chapters.

> [!def] Math-o-nomicon
> _n._ What lecture notes become when they are made to answer to a reader instead of a clock.

---

### what's in it

The spine runs from numerical linear algebra through analysis, with the numerical material carrying most of the weight so far:

- [[Orthogonal Matrices and QR Factorization|Orthogonal matrices, QR factorization]], and [[Least Squares|least squares]].
- [[Conditioning and Numerical Stability|Conditioning and numerical stability]] — where the error actually comes from.
- [[The Singular Value Decomposition|The SVD]], Eckart–Young, and the pseudoinverse.
- [[The Spectral Theorem|The spectral theorem]], [[Schur Factorization|Schur factorization]], and [[Iterative Eigenvalue Methods|iterative eigenvalue methods]].
- [[Newton's Method|Newton's method]] and [[Gauss–Newton|Gauss–Newton]], tied back to the linear machinery underneath.
- [[Real Analysis|Real analysis]], as the foundation the numerical chapters keep quietly borrowing from.

---

### the conventions

Consistency is the whole feature. Definitions, theorems, proofs, and asides each get a fixed treatment, so a reader learns the visual grammar once and never has to decode it again — you've already met one, in fact: the definition block above renders exactly the way every definition in the book does. Diagrams are drawn in TikZ rather than pasted as images, which keeps them editable and keeps the type matching the body text.

Every chapter closes by pointing forward: the section on QR says what it's setting up for least squares, and the section on Gauss–Newton says which earlier chapter it's standing on. A theorem in isolation is trivia — the throughline is what makes it a book.

---

### start exploring

The natural place to begin is [[Orthogonal Matrices and QR Factorization|the first chapter]] — everything downstream leans on it.

The full chapter list lives in the explorer on the left (or behind the menu, if you're on mobile), arranged in reading order. If you'd rather see the structure than the sequence, the graph view shows the cross-references directly: the throughline, drawn as an actual line.

---

### what I took away

Writing something down for a stranger is a different operation from writing it down for yourself, and it surfaces every place you were relying on a gap you'd stopped noticing. More than one chapter got rewritten because typesetting the proof made it obvious I couldn't actually justify a step I'd been waving through for two years.
