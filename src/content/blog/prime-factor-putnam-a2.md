---
title: Finding a prime factor of a number you'll never compute
excerpt: Putnam 2015 A2 asks for an odd prime factor of a₂₀₁₅. The trick is a divisibility relation that lets you swap 2015 for 5.
date: 2026-02-20
tags: [math, putnam, number-theory]
---

This week's problem was a Putnam classic (2015, A2):

> Let $a_0 = 1$, $a_1 = 2$, and $a_n = 4a_{n-1} - a_{n-2}$ for $n \ge 2$. Find an odd prime factor of $a_{2015}$.

The number $a_{2015}$ is astronomically large — the sequence grows like $(2+\sqrt{3})^n$ — so the only hope is structure, not computation.

**Closed form.** The characteristic equation $y^2 - 4y + 1 = 0$ has roots

$$\alpha = 2 + \sqrt{3}, \qquad \beta = 2 - \sqrt{3},$$

and matching initial conditions gives

$$a_n = \frac{\alpha^n + \beta^n}{2}.$$

A nice bonus, using $\alpha\beta = 1$: extending the recurrence backwards gives $a_{-1} = 4a_0 - a_1 = 2 = a_1$, and in general $a_{-n} = a_n$ — the sequence is symmetric around 0.

**The key divisibility.** For odd $k$, the sum $\alpha^{kn} + \beta^{kn}$ factors over $\alpha^n + \beta^n$ (it's the odd-exponent sum-of-powers factorization):

$$\frac{\alpha^{kn} + \beta^{kn}}{\alpha^n + \beta^n} = \alpha^{(k-1)n} - \alpha^{(k-2)n}\beta^{n} + \cdots + \beta^{(k-1)n},$$

and using $\alpha\beta = 1$ this quotient is a symmetric integer expression. So for odd $k$,

$$a_n \mid a_{kn}.$$

**Cashing it in.** Since $2015 = 5 \times 403$ and $403$ is odd, take $n = 5$, $k = 403$:

$$a_5 \mid a_{2015}.$$

So any prime factor of $a_5$ is automatically a prime factor of $a_{2015}$, and $a_5$ is small enough to just compute:

$$a_2 = 4(2) - 1 = 7,\quad a_3 = 4(7) - 2 = 26,\quad a_4 = 4(26) - 7 = 97,\quad a_5 = 4(97) - 26 = 362.$$

Factor it: $362 = 2 \times 181$, and $181$ is prime. Therefore **181 divides $a_{2015}$**.

The move that makes this problem is refusing to engage with $a_{2015}$ directly. The divisibility relation $a_n \mid a_{kn}$ is a lever: it converts a question about the 2015th term into a question about the 5th, and from there it's arithmetic you can do in the margin.
