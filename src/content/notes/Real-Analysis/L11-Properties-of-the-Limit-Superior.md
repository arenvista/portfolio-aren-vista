---
id: L11
aliases: []
tags: []
---
# Properties of the Limit Superior

## Limit Superior as the Limit of Suprema

Lecture 10 introduced $\limsup a_n$ two ways: as $\inf V$ over the set of eventual upper bounds, and via the tail suprema $s_n = \sup_{m\ge n} a_m$, asserting that the two coincide. We now prove this equivalence directly, which is what makes $\limsup$ tractable to compute and manipulate in practice.

> [!thm] Limit Superior as the Limit of Suprema
> For a sequence $(a_n)$, the limit superior equals the limit of its tail suprema:
> $$
> \overline{\lim}\, a_n = \lim_{n\to\infty} s_n, \qquad \text{where } s_n := \sup_{m\ge n} a_m.
> $$

> [!pf] Proof
> By definition,
> $$
> \overline{\lim}\, a_n = \inf V, \qquad \text{where } V := \{v \in \mathbb{R} : a_n \le v \text{ for all but finitely many } n\}.
> $$
> We show $\lim s_n = \inf V$ by establishing $\lim s_n \le \inf V$ and ruling out strict inequality.
>
> **$\lim s_n \le \inf V$, by contradiction.** Suppose instead $\inf V < \lim s_n$. Then there exists $v \in V$ with $v < \lim s_n$. Since $v \in V$, $a_n \le v$ for all but finitely many $n$ — say there exists $M$ such that $a_n \le v$ for all $n \ge M$.
>
> Fix any $n \ge M$. Since every $m \ge n$ also satisfies $m \ge M$, we have $a_m \le v$ for all $m \ge n$, so $v$ is an upper bound of $\{a_m : m \ge n\}$. By definition of supremum, $s_n \le v$. Since this holds for all $n \ge M$, taking the limit gives
> $$
> \lim_{n\to\infty} s_n \le v.
> $$
> But this contradicts $v < \lim s_n$. Hence no such $v$ exists, and $\lim s_n \le \inf V$.
>
> Combined with the reverse inequality (obtained the same way, by showing any $v > \lim s_n$ fails to lie below every element of $V$), this gives $\lim s_n = \inf V = \overline{\lim}\, a_n$. $\blacksquare$

> [!note] Why this characterization matters
> This theorem is what justifies treating $\limsup$ as a genuinely computable quantity: rather than searching through the abstract set $V$ of eventual upper bounds, we only ever need to compute the tail supremum $s_n$ — a nonincreasing sequence guaranteed to converge by the Monotone Convergence Theorem (Lecture 8) — and take its limit. Everything that follows relies on this reformulation.

## Subadditivity of the Limit Superior

With $\limsup$ recast as an ordinary limit of suprema, we can now study how it interacts with addition. Unlike ordinary limits, where $\lim(x_n+y_n) = \lim x_n + \lim y_n$ holds with equality (Lecture 7), $\limsup$ only satisfies an inequality — a consequence of the fact that the two sequences need not attain their tail suprema at the same index.

> [!thm] Subadditivity of the Limit Superior
> For any two sequences $(x_n)$ and $(y_n)$,
> $$
> \overline{\lim}\,(x_n + y_n) \;\le\; \overline{\lim}\, x_n + \overline{\lim}\, y_n.
> $$

> [!pf] Proof
> By the Limit of Suprema theorem above, it suffices to show
> $$
> \lim_{n\to\infty} \sup_{m\ge n}\{x_m+y_m\} \;\le\; \lim_{n\to\infty}\sup_{m\ge n}\{x_m\} + \lim_{n\to\infty}\sup_{m\ge n}\{y_m\}.
> $$
> Fix $n$, and consider any $m \ge n$. By definition of supremum,
> $$
> x_m \le \sup_{m\ge n}\{x_m\}, \qquad y_m \le \sup_{m\ge n}\{y_m\}.
> $$
> Adding these,
> $$
> x_m + y_m \le \sup_{m\ge n}\{x_m\} + \sup_{m\ge n}\{y_m\} \qquad \text{for every } m \ge n.
> $$
> So the right-hand side is an upper bound for $\{x_m+y_m : m \ge n\}$, and taking the supremum of the left-hand side over $m\ge n$ preserves the inequality:
> $$
> \sup_{m\ge n}\{x_m+y_m\} \;\le\; \sup_{m\ge n}\{x_m\} + \sup_{m\ge n}\{y_m\}.
> $$
> This holds for every $n$. Taking $n \to \infty$ on both sides (each side converges, by the Limit of Suprema theorem applied to $x_n$, $y_n$, and $x_n+y_n$ separately) gives
> $$
> \lim_{n\to\infty}\sup_{m\ge n}\{x_m+y_m\} \le \lim_{n\to\infty}\sup_{m\ge n}\{x_m\} + \lim_{n\to\infty}\sup_{m\ge n}\{y_m\},
> $$
> i.e. $\overline{\lim}\,(x_n+y_n) \le \overline{\lim}\, x_n + \overline{\lim}\, y_n$. $\blacksquare$

> [!imp] Why equality can fail
> The inequality can be strict. Take $x_n = (-1)^n$ and $y_n = (-1)^{n+1} = -x_n$: then $\overline{\lim}\,x_n = \overline{\lim}\,y_n = 1$, so the right side equals $2$, but $x_n+y_n = 0$ for all $n$, so $\overline{\lim}\,(x_n+y_n)=0$. The gap arises because $x_n$ and $y_n$ achieve values close to their respective tail suprema at *different* indices $m$ — the single inequality $x_m+y_m \le \sup x_m + \sup y_m$ used in the proof need not be tight for any common $m$.
