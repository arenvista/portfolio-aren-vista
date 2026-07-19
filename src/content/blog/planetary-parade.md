---
title: "Planetary Parade: turning a probability nightmare into Euler's formula"
excerpt: Jane Street's March 2026 puzzle about spotting six alien planets at once. Conditional probabilities are hopeless — but counting regions on a sphere is not.
date: 2026-03-13
tags: [math, puzzles, probability, geometry]
---

Jane Street's March 2026 puzzle, *Planetary Parade*, is a great example of a problem where the "obvious" approach is a trap and the right approach feels like cheating.

**The setup.** An alien on the spherical planet Pyrknot lives in a system with a star and six other planets whose positions each night are independently uniform in the sky. If, at a given moment, *somewhere* on Pyrknot all six planets are visible at once (with the star below the horizon — it has to be night), what's the probability $\alpha$ that our alien's particular spot can see them all too? And if they build a tower that effectively extends their horizon by a surface distance $r \ll R$, the new probability is $\alpha + \beta \cdot (r/R)$ — find $\beta$.

**Why the direct route fails.** Each celestial body is visible from exactly half the planet — the hemisphere on its side, bounded by a great circle. So you want

$$P(\text{parade}) = P(\neg s) \cdot P(c_1 \mid \neg s) \cdot P(c_2 \mid c_1, \neg s) \cdots$$

and every conditional term is the area of an increasingly weird spherical polygon. After two or three planets this is unmanageable.

**The reframe.** Forget probabilities; count regions. Seven bodies (six planets + the star) means seven great circles drawn on the sphere. These circles carve the surface into patches, and every point inside a given patch sees the *exact same* set of bodies — cross an edge and exactly one body rises or sets. A parade region, if it exists, is one specific patch. So conditioned on a parade being possible somewhere, the alien needs to be standing in that one patch, and by symmetry the answer is $1/(\text{number of patches})$.

Euler's formula for the sphere, $V - E + F = 2$, does the counting:

- **Vertices:** any two great circles cross at 2 antipodal points, so $V = 2\binom{7}{2} = 42$.
- **Edges:** each circle is crossed by the other 6 circles at 12 points, cutting it into 12 arcs, so $E = 7 \times 12 = 84$.
- **Faces:** $F = 2 + E - V = 2 + 84 - 42 = 44$.

$$\alpha = \frac{1}{44}.$$

**The tower.** Raising your viewpoint pushes each visibility boundary outward by (to first order) a strip of width $r$. That's good news six times and bad news once: the six planet horizons expand your valid region, but the star's terminator moving means daylight encroaches — seeing the star kills the parade. Net weight: $\frac{6}{7} - \frac{1}{7} = \frac{5}{7}$ of the boundary is working for you.

The total length of all seven great circles is $7 \times 2\pi R = 14\pi R$, and each arc borders two faces, so the expected perimeter of a face is $\frac{1}{44} \cdot 2 \cdot 14\pi R = \frac{7}{11}\pi R$. The expected area gained is then

$$\Delta A \approx \frac{5}{7} \cdot \frac{7}{11}\pi R \cdot r = \frac{5}{11}\pi R r,$$

and as a fraction of the planet's surface area $4\pi R^2$:

$$\beta \cdot \frac{r}{R} = \frac{\frac{5}{11}\pi R r}{4\pi R^2} = \frac{5}{44} \cdot \frac{r}{R} \implies \beta = \frac{5}{44}.$$

**Answers:** $\alpha = \dfrac{1}{44}$, $\beta = \dfrac{5}{44}$.

The lesson I keep relearning from these puzzles: when a probability question is secretly a geometry question, uniformity plus symmetry lets you replace integration with counting. Euler characteristic as a probability tool was not on my bingo card, but here we are.
