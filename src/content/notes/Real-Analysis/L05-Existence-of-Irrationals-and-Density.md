---
id: L05
aliases: ["Density of the Rationals", "Density of the Irrationals", "Density", "Existence of √2", "Intervals", "Interval"]
tags: []
---
# Existence of √2, Density, and Intervals

## Existence of √2

The [[Archimedean Property|Archimedean property]] from the previous lecture showed that [[Completeness|completeness]] has real teeth — it lets us prove facts about $\mathbb{N}$ that field and order axioms alone cannot. We now put completeness to its most famous use: constructing a real number that $\mathbb{Q}$ provably lacks. Recall from Lecture 2 that [[Irrationality of √2|no rational squares to $2$]]; we now show a *real* number doing so does exist, and that it is unique.

> [!thm] Existence and Uniqueness of √2
> There exists a unique $x \in \mathbb{R}_{\ge 0}$ such that $x^2 = 2$.

The proof strategy is a model for how completeness gets used throughout analysis: build the candidate as a supremum of a cleverly chosen set, then rule out every alternative using trichotomy.

> [!lem] Trichotomy (Recall)
> For any $a,b \in \mathbb{R}$, exactly one of the following holds:
> $$a<b,\quad a=b,\quad a>b.$$

> [!pf] Existence via the Completeness Axiom
> Define
> $$S = \{\, s \in \mathbb{R} : s \ge 0 \text{ and } s^2 < 2 \,\}.$$
> **Goal:** show that $x = \sup S$ exists and that $x^2 = 2$.
>
> **Step 1: $S$ is nonempty and bounded above.**
> - *Nonempty:* $0 \in S$ since $0^2 = 0 < 2$. (Also $1 \in S$, since $1^2 = 1 < 2$.)
> - *Bounded above:* if $s \ge 2$, then $s^2 \ge 4 > 2$, contradicting $s^2 < 2$. Hence $2$ is an upper bound.
>
> By completeness, $x = \sup S$ exists.
>
> **Step 2: Show $x^2 = 2$ by trichotomy.** Exactly one of $x^2 < 2$, $x^2 > 2$, $x^2 = 2$ holds; we eliminate the first two, leaving only equality.
>
> > [!case] Case 1: Assume $x^2 < 2$ (contradiction)
> > We find $n \in \mathbb{N}$ such that $x + \tfrac{1}{n} \in S$, contradicting that $x$ is an upper bound of $S$. Expand:
> > $$
> > \left(x+\tfrac{1}{n}\right)^2 = x^2 + \tfrac{2x}{n} + \tfrac{1}{n^2}
> > < x^2 + \tfrac{2x}{n} + \tfrac{1}{n}
> > = x^2 + \tfrac{2x+1}{n}.
> > $$
> > Since $2 - x^2 > 0$, the Archimedean property lets us choose $n \in \mathbb{N}$ with
> > $$n > \frac{2x+1}{2-x^2}.$$
> > Then $\left(x+\tfrac{1}{n}\right)^2 < 2$, so $x + \tfrac1n \in S$ while $x + \tfrac1n > x$ — contradicting that $x$ is an upper bound. Hence $x^2 \not< 2$.
>
> > [!case] Case 2: Assume $x^2 > 2$ (contradiction)
> > We find $n \in \mathbb{N}$ such that $x - \tfrac1n$ is still an upper bound of $S$, contradicting the minimality of $x = \sup S$. Compute:
> > $$
> > \left(x-\tfrac1n\right)^2 = x^2 - \tfrac{2x}{n} + \tfrac{1}{n^2} > x^2 - \tfrac{2x}{n}.
> > $$
> > Choose $n \in \mathbb{N}$ with
> > $$n > \frac{2x}{x^2-2} \quad\text{and}\quad n > \frac1x.$$
> > Then $\left(x - \tfrac1n\right)^2 > 2$ and $x - \tfrac1n > 0$. For any $s \in S$, $s \ge 0$ and $s^2 < 2 < \left(x-\tfrac1n\right)^2$, so $s < x - \tfrac1n$ by monotonicity of squaring on $\mathbb{R}_{\ge0}$. Thus $x - \tfrac1n$ is an upper bound of $S$ smaller than $x$ — contradicting that $x = \sup S$. Hence $x^2 \not> 2$.
>
> Since both strict inequalities are impossible, $x^2 = 2$.

> [!pf] Uniqueness
> Suppose $x, y \in \mathbb{R}_{\ge 0}$ satisfy $x^2 = y^2 = 2$. Then
> $$(x-y)(x+y) = x^2 - y^2 = 0.$$
> By the Zero-Product Property (Lecture 2), $x = y$ or $x = -y$. Since $x, y \ge 0$ and not both zero, $x + y > 0$, ruling out $x=-y$ unless both vanish; either way $x - y = 0$, so $x = y$.
>
> The unique nonnegative solution is denoted $\sqrt{2}$.

> [!note] Where this leaves us
> Combined with Lecture 2's proof that $\sqrt{2} \notin \mathbb{Q}$, we now have a genuine element of $\mathbb{R} \setminus \mathbb{Q}$, constructed entirely from the completeness axiom. This is the payoff promised back when irrationality of $\sqrt2$ was first proved: $\mathbb{R}$ really does fill in the gaps that $\mathbb{Q}$ leaves behind.

---

## Density Theorem

Knowing that both $\mathbb{Q}$ and $\mathbb{R}\setminus\mathbb{Q}$ are nonempty is one thing; we now show both are *dense* — arbitrarily close to every real number. The rational case leans on the Archimedean property, while the irrational case will lean on the rational case together with $\sqrt2$ just constructed.

### Density of the Rationals

> [!thm] Density of the Rationals
> If $x, y \in \mathbb{R}$ with $x < y$, then there exists $r \in \mathbb{Q}$ such that $x < r < y$.

The idea is to stretch the interval $(x,y)$ by a large enough factor $n$ that it has length greater than $1$, guaranteeing an integer inside; then shrink back down by dividing by $n$.

> [!lem] Integer in a Long Interval
> If $\alpha, \beta \in \mathbb{R}$ with $\beta - \alpha > 1$, then there exists $m \in \mathbb{Z}$ with $\alpha < m < \beta$.

> [!pf] Proof
> Let $m = \lceil \alpha \rceil$. Then $m - 1 \le \alpha < m \le \alpha + 1 < \beta$, so $\alpha < m < \beta$.

> [!pf] Proof of Density of the Rationals
> Given $x < y$, use the Archimedean property to choose $n \in \mathbb{N}$ with
> $$n(y-x) > 1.$$
> Then $ny - nx > 1$, so by the lemma there exists $m \in \mathbb{Z}$ with
> $$nx < m < ny.$$
> Dividing by $n$ gives
> $$x < \frac{m}{n} < y,$$
> and $r = m/n \in \mathbb{Q}$ is the desired rational.

### Density of the Irrationals

> [!thm] Density of the Irrationals
> If $x, y \in \mathbb{R}$ with $x < y$, then there exists $z \in \mathbb{R}\setminus\mathbb{Q}$ such that $x < z < y$.

The strategy is to shrink the interval $(x,y)$ by dividing through by $\sqrt2$, find a rational inside the shrunken interval using the theorem just proved, then scale back up — the factor of $\sqrt2$ is exactly what turns that rational into an irrational.

> [!lem] Rational Times Irrational Is Irrational
> If $r \in \mathbb{Q}\setminus\{0\}$ and $s \in \mathbb{R}\setminus\mathbb{Q}$, then $rs \notin \mathbb{Q}$.

> [!pf] Proof of Density of the Irrationals
> Fix the irrational $\sqrt2 > 0$ from the theorem above. Since $\sqrt2 > 0$, dividing preserves order:
> $$\frac{x}{\sqrt2} < \frac{y}{\sqrt2}.$$
> By density of the rationals, there exists $r \in \mathbb{Q}$ with
> $$\frac{x}{\sqrt2} < r < \frac{y}{\sqrt2}.$$
> Multiplying by $\sqrt2$ gives
> $$x < r\sqrt2 < y.$$
> If $r \neq 0$, the lemma shows $r\sqrt2$ is irrational, giving the desired $z = r\sqrt2$. (If $r=0$ happened to be forced, density of the rationals lets us choose $r$ elsewhere in the interval instead, since the interval $(x/\sqrt2, y/\sqrt2)$ contains infinitely many rationals.)

> [!imp] The shared architecture of both density proofs
> Both theorems follow the same two-step pattern: transform the problem (scale by $n$, or divide by $\sqrt2$) into a setting where existence is easy to see, then transform back. Density of the irrationals in particular *depends on* density of the rationals — it is not an independent argument, but rather rationals viewed through a $\sqrt2$-scaled lens.

---

## Intervals

We close by giving a rigorous characterization of what an "interval" is, and showing that every interval must take one of the familiar forms $(a,b)$, $[a,b]$, etc. — using $\sup$ and $\inf$ to pin down the endpoints.

> [!def] Interval Notation
> $$(a,b), \quad [a,b], \quad [a,b), \quad (a,b]$$

> [!def] Interval (Convex Subset of $\mathbb{R}$)
> A set $S \subseteq \mathbb{R}$ is an **interval** if for all $x, y \in S$ with $x < y$, we have
> $$[x,y] \subseteq S.$$

This definition says nothing about boundedness or endpoints directly — it's purely a "no gaps" condition. The next theorem shows that this condition, together with completeness, forces every interval into one of four familiar shapes, depending on whether it is bounded above, below, both, or neither.

> [!thm] Interval Classification by Bounds
> Let $S \subseteq \mathbb{R}$ be a nonempty interval.
> - **Case 1:** $S$ is bounded above and below. Let $a = \inf S$, $b = \sup S$. Then
>   $$(a,b) \subseteq S \subseteq [a,b],$$
>   so $S$ is one of $(a,b),\ [a,b),\ (a,b],\ [a,b]$, depending on endpoint membership.
> - **Case 2:** $S$ is bounded above but not below. Let $b = \sup S$. Then $S$ is one of $(-\infty,b),\ (-\infty,b]$.
> - **Case 3:** $S$ is bounded below but not above. Let $a = \inf S$. Then $S$ is one of $(a,\infty),\ [a,\infty)$.
> - **Case 4:** $S$ is unbounded above and below. Then $S = \mathbb{R}$.

The heart of the theorem is Case 1; the remaining cases are proved the same way, simply omitting whichever bound doesn't exist.

> [!pf] Case 1: Bounded Above and Below
> Let $a = \inf S$, $b = \sup S$.
>
> **$S \subseteq [a,b]$:** for any $s \in S$, $a \le s \le b$ directly from the definitions of infimum and supremum.
>
> **$(a,b) \subseteq S$:** fix $y \in (a,b)$. Since $y < b = \sup S$, $y$ is not an upper bound of $S$, so there exists $s \in S$ with $y < s$. Since $a < y$, $y$ is not a lower bound of $S$ either, so there exists $s' \in S$ with $s' < y$. Since $S$ is an interval and $s' < y < s$, we get $[s',s] \subseteq S$, hence $y \in S$.
>
> Combining both inclusions, $(a,b) \subseteq S \subseteq [a,b]$; the exact form among $(a,b), [a,b), (a,b], [a,b]$ is then determined by whether $a$ and/or $b$ themselves belong to $S$.

> [!case] Summary of the Remaining Cases
> - **Case 2:** if $S$ has $\sup S = b$ and no infimum in $\mathbb{R}$, then $S = (-\infty,b)$ or $S=(-\infty,b]$.
> - **Case 3:** if $S$ has $\inf S = a$ and no supremum in $\mathbb{R}$, then $S = (a,\infty)$ or $S=[a,\infty)$.
> - **Case 4:** if $S$ has neither an infimum nor a supremum in $\mathbb{R}$, then $S = \mathbb{R}$.

> [!note] Why unboundedness forces $S = \mathbb{R}$
> Case 4 is really Case 1 pushed to its limit: with no finite $a$ or $b$ to bound the "gap-free" region, the same argument used to show $(a,b)\subseteq S$ runs for *every* pair of reals, so $S$ must contain all of $\mathbb{R}$.
