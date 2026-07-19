---
title: The nested radical that equals exactly 2
excerpt: Evaluating √(2 + √(2 + √(2 + ⋯))) the honest way — prove it converges first, then take the limit — plus a surprise cameo from cosine.
date: 2026-03-20
tags: [math, analysis, sequences]
---

A deceptively innocent-looking problem from the worksheet:

> Find the value of
> $$\sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{2 + \cdots}}}}$$

The tempting shortcut is to call the whole thing $L$, write $L = \sqrt{2 + L}$, solve $L^2 - L - 2 = 0$, and announce $L = 2$. But that argument silently assumes the limit exists — and nested-radical expressions are exactly the kind of object where that assumption can fail. So: convergence first.

**Set it up as a sequence.**

$$x_1 = \sqrt{2}, \qquad x_{n+1} = \sqrt{2 + x_n}.$$

The sequence is monotonically increasing, so by the Monotone Convergence Theorem it converges as long as it's bounded above.

**Bounded by 2, by induction.** Base case: $x_1 = \sqrt{2} < 2$. Inductive step: if $\sqrt{2} \le x_n < 2$, then

$$x_{n+1} = \sqrt{2 + x_n} < \sqrt{2 + 2} = 2, \qquad x_{n+1} = \sqrt{2 + x_n} \ge \sqrt{2}.$$

So $\sqrt{2} \le x_n < 2$ for all $n$. Bounded and increasing means convergent, and *now* the fixed-point argument is legitimate: the limit $L$ satisfies $L = \sqrt{2 + L}$, whose positive root is

$$L = 2.$$

**The trigonometric easter egg.** There's a lovely second way to see this via the half-angle identity $2\cos\theta = \sqrt{2 + 2\cos 2\theta}$. Unrolling it,

$$2\cos\!\left(\frac{\pi}{2^{m+1}}\right) = \underbrace{\sqrt{2 + \sqrt{2 + \cdots + \sqrt{2}}}}_{m \text{ radicals}},$$

so the $m$-fold nested radical is exactly $2\cos(\pi/2^{m+1})$. As $m \to \infty$ the angle goes to 0 and the expression goes to $2\cos(0) = 2$ — same answer, and as a bonus you get a closed form for every finite truncation, which is how those "compass-and-straightedge" formulas like $2\cos(\pi/16) = \sqrt{2+\sqrt{2+\sqrt{2}}}$ come about.

Two morals. First, "let $L$ be the value and solve for it" is the *last* step of a limit argument, never the first. Second, when a recursion involves $\sqrt{2 + (\cdot)}$, there's a decent chance a cosine is hiding in it.
