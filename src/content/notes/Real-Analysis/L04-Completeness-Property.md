---
id: L04
aliases: []
tags: []
---
# Completeness, Suprema of Transformed Sets, and the Archimedean Property

## Completeness Property

Lecture 3 introduced $\sup S$ and $\inf S$ via a two-part definition — upper bound, plus *least* upper bound. In practice, the second part is the hard one to verify directly, since it quantifies over every possible upper bound. We start by tightening this into a checkable criterion before putting suprema to work.

> [!def] Supremum (Least Upper Bound)
> Let $S \subseteq \mathbb{R}$ be nonempty. A number $u \in \mathbb{R}$ is the supremum of $S$, written $\sup S = u$, if:
> - $u$ is an upper bound of $S$: for all $s \in S$, $s \le u$, and
> - for every upper bound $v$ of $S$, $u \le v$.

To confirm a candidate $u$ actually equals $\sup S$, two things must be checked: that $u$ is an upper bound, and that it is the *least* one. A common way to verify the second condition is to instead show that no smaller number can be an upper bound — i.e., every $v < u$ fails to bound $S$ from above. This reformulation is captured precisely below.

> [!lem] Supremum Characterizations
> Let $S \subseteq \mathbb{R}$ be nonempty and $u \in \mathbb{R}$. The following are equivalent:
> 1. $u = \sup S$.
> 2. $u$ is an upper bound of $S$, and for all $v < u$, there exists $s \in S$ with $v < s \le u$.
> 3. $u$ is an upper bound of $S$, and for all $\varepsilon > 0$, there exists $s \in S$ with $u - \varepsilon < s \le u$.

> [!note] Relating (2) and (3)
> Condition (3) is just condition (2) with the substitution $v = u - \varepsilon$ for $\varepsilon > 0$. Phrasing it in terms of $\varepsilon$ is often more convenient in practice, since it makes "how close" $s$ must come to $u$ explicit.

## Shifted Set Supremum

With a workable characterization of $\sup S$ in hand, we can now ask how the supremum behaves under natural operations on $S$ itself — starting with translation.

> [!def] Translation of a Set
> Let $a \in \mathbb{R}$ and $S \subseteq \mathbb{R}$ be nonempty. Define $a + S = \{a + s : s \in S\}$.

> [!thm] Supremum of a Translated Set
> For any $a \in \mathbb{R}$ and nonempty $S \subseteq \mathbb{R}$,
> $$\sup(a+S) = a + \sup S.$$

> [!pf] Proof
> Let $u = \sup S$; we show $a + u = \sup(a+S)$ by checking both parts of the definition.
>
> **$a+u$ is an upper bound of $a+S$.** For any $s \in S$, $s \le u$. Adding $a$ preserves the inequality: $a + s \le a + u$. Hence $a + u$ bounds $a + S$ from above.
>
> **$a+u$ is the least upper bound.** Let $v$ be any upper bound of $a+S$. Then $a+s \le v$ for all $s \in S$, so $s \le v - a$. Thus $v - a$ is an upper bound of $S$, giving $u \le v - a$, i.e. $a + u \le v$.
>
> Since $a+u$ is an upper bound and no smaller upper bound exists, $\sup(a+S) = a + \sup S$.

## Scaled Set Supremum

Scaling by a constant is the natural next transformation to consider, but — as with the order properties in Lecture 3 — the sign of the constant matters: scaling by a negative number swaps the roles of supremum and infimum.

> [!def] Scaling of a Set
> Let $a \in \mathbb{R}$ and $S \subseteq \mathbb{R}$ be nonempty. Define $aS = \{as : s \in S\}$.

> [!thm] Supremum of a Scaled Set
> For nonempty $S \subseteq \mathbb{R}$ and $a \in \mathbb{R}$,
> $$
> \sup(aS) =
> \begin{cases}
> a \cdot \sup S, & \text{if } a > 0,\\
> a \cdot \inf S, & \text{if } a < 0,\\
> 0, & \text{if } a = 0 \ (\text{since } aS = \{0\}).
> \end{cases}
> $$

> [!pf] Proof
> **Case $a > 0$.** For all $s \in S$, $s \le \sup S$ implies $as \le a\sup S$ (order is preserved when multiplying by a positive, as in Lecture 3), so $a\sup S$ is an upper bound of $aS$. If $v$ is any upper bound of $aS$, then $as \le v$ for all $s \in S$; dividing by $a > 0$ gives $s \le v/a$, so $v/a$ is an upper bound of $S$. Hence $\sup S \le v/a$, i.e. $a\sup S \le v$. Thus $\sup(aS) = a \sup S$.
>
> **Case $a < 0$.** For all $s \in S$, $\inf S \le s$ implies $as \le a \inf S$ — the inequality reverses because $a$ is negative — so $a \inf S$ is an upper bound of $aS$. If $v$ is an upper bound of $aS$, then $as \le v$ for all $s \in S$; dividing by $a < 0$ reverses the inequality to $s \ge v/a$, so $v/a$ is a lower bound of $S$. Hence $v/a \le \inf S$, i.e. $v \ge a \inf S$. Thus $\sup(aS) = a \inf S$.
>
> **Case $a = 0$.** Then $aS = \{0\}$, so $\sup(aS) = 0$.

> [!imp] Why $\inf S$ appears when $a<0$
> This is the key subtlety of the theorem: multiplying by a negative number flips the direction of every inequality, which turns "upper bound" into "lower bound" and vice versa. The supremum of $aS$ is therefore governed by the *infimum* of $S$, not its supremum — a direct echo of the sign-flip behavior proved for order in Lecture 3.

## Order Relation Between Two Sets

Having seen how $\sup$ and $\inf$ interact with operations on a single set, we now compare suprema and infima *across* two sets, whenever every element of one dominates every element of the other.

> [!thm] Comparing $\sup A$ and $\inf B$
> If $A, B \subseteq \mathbb{R}$ are nonempty and $a \le b$ for all $a \in A$ and $b \in B$, then
> $$\sup A \le \inf B.$$

> [!pf] Proof
> Since $a \le b$ for all $a \in A$, $b \in B$, each fixed $a \in A$ is a lower bound of $B$. Hence $a \le \inf B$ for all $a \in A$, which makes $\inf B$ an upper bound of $A$. Therefore $\sup A \le \inf B$.

## Completeness Property of ℝ

The three results above all *assume* suprema and infima exist and study how they behave. Their existence in the first place is not a consequence of the field and order axioms — it is an independent axiom of $\mathbb{R}$, restated here from Lecture 3 for reference, since everything in the remainder of this lecture rests on it.

> [!def] Completeness (Least Upper Bound) Property
> Every nonempty subset $A \subseteq \mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$, and every nonempty subset that is bounded below has an infimum in $\mathbb{R}$.

## Archimedean Property and Consequences

As a first serious application of completeness, we prove that $\mathbb{N}$ is unbounded in $\mathbb{R}$ — a statement that sounds obvious but genuinely requires completeness to prove (it fails, for instance, in certain non-Archimedean ordered fields that satisfy all the same field and order axioms).

> [!thm] Archimedean Property
> For every $x \in \mathbb{R}$ there exists $n \in \mathbb{N}$ such that $n > x$. Equivalently, for every $x \in \mathbb{R}$ there exists $n \in \mathbb{N}$ with $x \le n$.

> [!pf] Proof
> Suppose, toward a contradiction, that some $x \in \mathbb{R}$ satisfies $x \ge n$ for all $n \in \mathbb{N}$ — that is, $x$ is an upper bound of $\mathbb{N}$. Then $\mathbb{N}$ is nonempty and bounded above, so by completeness it has a supremum $s = \sup \mathbb{N}$.
>
> Since $s - 1 < s$, $s-1$ is not an upper bound of $\mathbb{N}$ (by the Supremum Characterizations above), so there exists $m \in \mathbb{N}$ with $s - 1 < m \le s$. Adding $1$ gives $s < m+1$. But $m + 1 \in \mathbb{N}$, contradicting that $s$ is an upper bound of $\mathbb{N}$.
>
> Hence no real $x$ can bound $\mathbb{N}$ above, so for every $x \in \mathbb{R}$ there exists $n \in \mathbb{N}$ with $n > x$.

The Archimedean property is the engine behind several useful facts about how small $1/n$ can become, and about locating a real number among the integers. We collect these as corollaries.

> [!cor] Infimum of the Harmonic Sequence
> If $S = \{1/n : n \in \mathbb{N}\}$, then
> $$\inf S = 0.$$

> [!pf] Proof
> **0 is a lower bound.** For $n \in \mathbb{N}$, $n > 0$ implies $1/n > 0$, so every element of $S$ is positive; hence $0 \le 1/n$ for all $n$.
>
> **0 is the greatest lower bound.** Let $\varepsilon > 0$. By the Archimedean property, there exists $n \in \mathbb{N}$ with $n > 1/\varepsilon$, hence $1/n < \varepsilon$. So $\varepsilon$ cannot be a lower bound of $S$. Since no positive number is a lower bound, $0$ is the greatest lower bound.

> [!cor] Reciprocals Become Arbitrarily Small
> For every $t > 0$, there exists $n \in \mathbb{N}$ such that
> $$0 < \frac{1}{n} < t.$$

> [!note] This is the Archimedean property in disguise
> This corollary is essentially a restatement of $\inf\{1/n\} = 0$: since $0$ is the *greatest* lower bound, no positive $t$ can be a lower bound either, so some term of the sequence must dip below $t$.

> [!cor] Bounding a Real Number Between Consecutive Naturals
> For every $y \in \mathbb{R}$, there exists $n \in \mathbb{N}$ such that
> $$n - 1 \le y < n.$$

> [!pf] Proof
> Let $E = \{m \in \mathbb{N} : y < m\}$. By the Archimedean property, $E$ is nonempty. Let $n = \min E$. Then $y < n$ by definition of $E$, while $n - 1 \notin E$ (by minimality of $n$), so $y \ge n-1$. Therefore $n - 1 \le y < n$.
