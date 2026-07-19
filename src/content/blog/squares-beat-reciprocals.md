---
title: When squares beat reciprocals
excerpt: A week-one seminar problem where the constraint abc = 1 turns an ugly inequality into a sum of squares.
date: 2026-01-30
tags: [math, inequalities, problem-solving]
---

First week of the problem solving seminar, and the warm-up already had a nice trick in it:

> Let $a, b, c$ be positive reals with $abc = 1$. Prove that
> $$a^2 + b^2 + c^2 \ge \frac{1}{a} + \frac{1}{b} + \frac{1}{c}.$$

The reciprocals on the right look like the hard part, but the constraint dissolves them immediately. Since $abc = 1$, dividing by any one variable gives

$$\frac{1}{a} = bc, \qquad \frac{1}{b} = ac, \qquad \frac{1}{c} = ab.$$

So the inequality is really just

$$a^2 + b^2 + c^2 \ge ab + bc + ca,$$

which is a classic. Move everything to one side, multiply by 2, and regroup:

$$2(a^2 + b^2 + c^2) - 2(ab + bc + ca) = (a-b)^2 + (b-c)^2 + (c-a)^2 \ge 0.$$

A sum of squares is nonnegative, and we're done — with equality exactly when $a = b = c = 1$.

The takeaway I wrote in my notes: a multiplicative constraint like $abc = 1$ is an invitation to trade reciprocals for products. Once the right side became $ab + bc + ca$, the problem stopped being about the constraint at all and became the standard "squares dominate cross terms" fact you can prove in one line.
