---
title: Maximizing a ratio by minimizing everything else
excerpt: Given a/b + b/c + c/a ≤ 5, how big can a/b get? A substitution collapses three variables into one cubic.
date: 2026-02-06
tags: [math, optimization, problem-solving]
---

Week two of the seminar:

> Suppose $a, b, c$ are positive reals with
> $$\frac{a}{b} + \frac{b}{c} + \frac{c}{a} \le 5.$$
> What is the largest possible value of $\frac{a}{b}$?

The first observation is that the three ratios aren't independent — they multiply to 1:

$$\frac{a}{b} \cdot \frac{b}{c} \cdot \frac{c}{a} = 1.$$

So set $x = a/b$, $y = b/c$, $z = c/a$ with $xyz = 1$, i.e. $z = \frac{1}{xy}$. The constraint becomes

$$x + y + \frac{1}{xy} \le 5.$$

Now the strategy is clear: to make $x$ as large as possible, give it as much room as possible by making $y + \frac{1}{xy}$ as small as possible. Fix $x$ and minimize over $y$. Setting the derivative $1 - \frac{1}{xy^2}$ to zero gives $y = \frac{1}{\sqrt{x}}$, and the second derivative $\frac{2}{xy^3} > 0$ confirms it's a minimum. Plugging back in:

$$y + \frac{1}{xy} = \frac{1}{\sqrt{x}} + \frac{\sqrt{x}}{x} = \frac{2}{\sqrt{x}}.$$

So the best-case constraint on $x$ alone is

$$x + \frac{2}{\sqrt{x}} \le 5.$$

Substituting $u = \sqrt{x}$ and multiplying through by $u > 0$:

$$u^3 - 5u + 2 \le 0.$$

By inspection $u = 2$ is a root, so the cubic factors as $(u - 2)(u^2 + 2u - 1)$, and the inequality holds on an interval whose right endpoint is $u = 2$. That gives

$$x = u^2 = 4.$$

So the answer is $\boxed{4}$, achieved for example at $(a, b, c) = (4, 1, 2)$: the ratios are $4 + \frac{1}{2} + \frac{1}{2} = 5$, hitting the constraint exactly.

What I liked here is the two-stage structure: an inner minimization (spend as little of the budget of 5 as possible on the other two terms) feeding an outer maximization. It's a baby version of how you'd reason about any resource-constrained optimum.
