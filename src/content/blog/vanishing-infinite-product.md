---
title: An infinite product that can't help but vanish
excerpt: Why the product of sin(x/i) over all i goes to zero — split off a finite head, then crush the tail geometrically.
date: 2026-02-13
tags: [math, analysis, problem-solving]
---

Week three's problem was an analysis one:

> For $x \in \mathbb{R}$, show that
> $$\prod_{i=1}^{\infty} \sin\!\left(\frac{x}{i}\right) = 0.$$

The intuition is quick: as $i \to \infty$, the arguments $x/i$ shrink to 0, so the factors $\sin(x/i)$ shrink to 0 too. You're multiplying by numbers arbitrarily close to zero, forever. The work is making that airtight, since "the terms go to 0" is not by itself a theorem about products.

**Step 1: the factors tend to zero.** For any $\epsilon > 0$, the Archimedean property gives an $N > |x|/\epsilon$, so $|x/i| < \epsilon$ for all $i \ge N$. Hence $x/i \to 0$, and by continuity of sine,

$$\lim_{i \to \infty} \sin\!\left(\frac{x}{i}\right) = \sin(0) = 0.$$

(If $x = 0$ every factor is already 0 and there's nothing to prove.)

**Step 2: split the product.** Because the factors tend to 0, there's an $M$ such that

$$\left|\sin\!\left(\frac{x}{i}\right)\right| \le \frac{1}{2} \quad \text{for all } i > M.$$

Write the partial product $P_n = \prod_{i=1}^{n} \sin(x/i)$ as a fixed head times a tail:

$$|P_n| = \underbrace{\left|\prod_{i=1}^{M} \sin\!\left(\frac{x}{i}\right)\right|}_{=\,C, \text{ a constant}} \cdot \left|\prod_{i=M+1}^{n} \sin\!\left(\frac{x}{i}\right)\right| \le C \cdot \left(\frac{1}{2}\right)^{n-M}.$$

**Step 3: squeeze.** The geometric bound dies:

$$0 \le \lim_{n \to \infty} |P_n| \le \lim_{n \to \infty} C \left(\tfrac{1}{2}\right)^{n-M} = 0,$$

so $P_n \to 0$ and the infinite product is 0. $\blacksquare$

The pattern — quarantine a finite, badly-behaved prefix into a constant, then beat the infinite tail with a geometric bound — shows up constantly in analysis. The head can be as ugly as it wants; only the tail's behavior decides the limit.
