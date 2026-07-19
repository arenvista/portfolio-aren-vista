---
aliases: ["Geometrically-Bounded Cauchy Criterion"]
tags: []
---
# Finding $\delta$ for $\sqrt{x}$, and a Geometrically-Bounded Cauchy Criterion

## Finding $\delta$ for a Square Root Limit

Having established the $\varepsilon$–$\delta$ definition of a [[Cluster Point|limit at a cluster point]] (Lecture 13), we now work a concrete example: finding an explicit $\delta$ that makes $|\sqrt{x}-2|<\tfrac12$ follow from $|x-4|<\delta$. Two different strategies are given below — one solves for the exact boundary directly, the other uses the [[L06|Conjugate Trick]] (Lecture 6) to bound a factor. Both are valid; they simply produce different (equally correct) values of $\delta$.

### Problem Statement

Determine a $\delta$ for $|x-4| < \delta$ that guarantees
$$
|\sqrt{x} - 2| < \frac12.
$$

### Method 1: Direct Algebraic Manipulation

This method works backward from the target inequality to find the exact interval of valid $x$, then reads off the largest symmetric $\delta$ that fits inside it.

> [!pf] Proof
> **Step 1: Isolate $x$.**
> $$
> |\sqrt{x}-2| < \frac12 \quad\Longleftrightarrow\quad -\frac12 < \sqrt{x}-2 < \frac12 \quad\Longleftrightarrow\quad \frac32 < \sqrt{x} < \frac52.
> $$
>
> **Step 2: Square all parts.** Since every term is positive, squaring preserves the inequality (Multiplication and Order, Lecture 3):
> $$
> \frac94 < x < \frac{25}{4}.
> $$
>
> **Step 3: Center at $4 = \tfrac{16}{4}$.**
> $$
> \frac94 - \frac{16}{4} < x-4 < \frac{25}{4}-\frac{16}{4} \quad\Longrightarrow\quad -\frac74 < x-4 < \frac94.
> $$
>
> **Step 4: Choose $\delta$.** The interval for $x-4$ is asymmetric: it extends $7/4$ to the left of $0$ but $9/4$ to the right. To guarantee $x-4$ stays within *both* bounds simultaneously via a single symmetric condition $|x-4|<\delta$, we must take the smaller of the two distances:
> $$
> \delta = \frac74.
> $$
> This guarantees $-\tfrac74 < x-4 < \tfrac74$, which is safely contained in the required interval $\left(-\tfrac74, \tfrac94\right)$.

### Method 2: Bounding a Factor (The Conjugate Method)

This method mirrors the reciprocal limit proof from Lecture 13: multiply by the conjugate to isolate a factor of $|x-4|$, then bound the remaining factor by restricting $x$ to a preliminary neighborhood of $4$.

> [!pf] Proof
> **Step 1: Multiply by the conjugate.**
> $$
> |\sqrt{x}-2| = \left|\frac{(\sqrt{x}-2)(\sqrt{x}+2)}{\sqrt{x}+2}\right| = \frac{|x-4|}{\sqrt{x}+2}.
> $$
>
> **Step 2: Restrict to bound the denominator.** Impose a preliminary restriction $|x-4| < 2$ (an arbitrary but convenient first cutoff), giving $2 < x < 6$. In particular $x>2$, so $\sqrt{x} > \sqrt2$, and hence
> $$
> \sqrt{x}+2 > \sqrt2+2 \quad\Longrightarrow\quad \frac{1}{\sqrt{x}+2} < \frac{1}{\sqrt2+2}.
> $$
>
> **Step 3–4: Solve for $|x-4|$.** Substituting this bound,
> $$
> |\sqrt{x}-2| < \frac{|x-4|}{\sqrt2+2} < \frac12 \quad\Longrightarrow\quad |x-4| < \frac{\sqrt2+2}{2}.
> $$
>
> **Step 5: Combine restrictions.** Since Step 2's bound is only valid under the preliminary restriction $|x-4|<2$, the final $\delta$ must be the minimum of the two:
> $$
> \delta = \min\left\{2,\ \frac{\sqrt2+2}{2}\right\}.
> $$
> Since $\dfrac{\sqrt2+2}{2}\approx 1.707 < 2$, the binding constraint is the second one:
> $$
> \delta = \frac{\sqrt2+2}{2} \approx 1.707.
> $$

> [!note] Two Valid Answers, Two Philosophies
> Method 1 gives the *exact* largest valid $\delta = 1.75$, obtained by solving the inequality precisely. Method 2 gives a smaller, more conservative $\delta \approx 1.707$, obtained by first crudely bounding one factor and then solving for the other. Both correctly satisfy the required implication — the $\varepsilon$–$\delta$ definition only demands *some* $\delta$ works, not the largest one. Method 2's approach generalizes far better to limits where isolating $x$ exactly (as in Method 1) is impractical, which is why it is the standard technique for more complicated functions.

---

## A Cauchy Criterion from a Geometric Difference Bound

We now turn to a sequence convergence problem where the hypothesis is phrased purely in terms of consecutive differences — inviting comparison with the Monotone Convergence Theorem (Lecture 8) and the Contractive Sequence Theorem (Lecture 12). Neither tool actually applies here, which is instructive: it is what forces a direct Cauchy argument, generalizing the contractive-sequence proof technique to a case where the ratio $c$ is not fixed but decays geometrically in $n$.

### Preliminary Analysis: Why the Usual Tools Don't Apply

> [!imp] Ruling Out the Standard Shortcuts
> - **Monotone Convergence Theorem?** Cannot be used. The hypothesis bounds the *distance* between consecutive terms, but says nothing about *direction* — the sequence could oscillate rather than move consistently in one direction.
> - **Contractive Sequence Theorem?** Cannot be directly cited either. Contractiveness (Lecture 12) requires $|x_{n+2}-x_{n+1}| \le c\,|x_{n+1}-x_n|$ for a single fixed constant $c \in (0,1)$ — a *relative* bound comparing consecutive differences to each other. Here we are instead given an *absolute* bound $|x_{n+1}-x_n| < r^n$ on each difference individually, with no direct comparison between consecutive differences.
> - **Conclusion:** Since neither theorem applies directly, we must verify the Cauchy condition (Lecture 12) from its definition. Since every Cauchy sequence of reals converges (the Cauchy Convergence Criterion), establishing the Cauchy property will be enough.

### Proof: The Sequence Is Cauchy

> [!thm] Convergence via Geometric Difference Bound
> Let $(x_n)$ be a sequence with $0 < r < 1$ such that $|x_{n+1}-x_n| < r^n$ for all $n \in \mathbb{N}$. Then $(x_n)$ is Cauchy, and hence convergent.

The proof structure closely parallels the Contractive Sequence Theorem's proof in Lecture 12: telescope the difference $x_m - x_n$ into consecutive terms, bound each via the hypothesis, then sum the resulting geometric series.

> [!pf] Proof
> Without loss of generality, assume $m > n$.
>
> **Step 1: Telescope.** Write
> $$
> x_m - x_n = (x_m - x_{m-1}) + (x_{m-1}-x_{m-2}) + \cdots + (x_{n+1}-x_n).
> $$
>
> **Step 2: Apply the triangle inequality and the hypothesis.** By the triangle inequality (Lecture 3),
> $$
> |x_m-x_n| \le |x_m-x_{m-1}| + |x_{m-1}-x_{m-2}| + \cdots + |x_{n+1}-x_n| < r^{m-1}+r^{m-2}+\cdots+r^n.
> $$
>
> **Step 3: Sum the geometric series.** Factor out $r^n$:
> $$
> |x_m-x_n| < r^n\left(1+r+r^2+\cdots+r^{m-n-1}\right).
> $$
> Using the finite geometric sum formula $1+r+\cdots+r^k = \dfrac{1-r^{k+1}}{1-r}$ (Lecture 12),
> $$
> |x_m-x_n| < r^n\left(\frac{1-r^{m-n}}{1-r}\right).
> $$
>
> **Step 4: Simplify to an absolute bound.** Since $0<r<1$ and $m>n$, $r^{m-n} > 0$, so $1-r^{m-n} < 1$. Dropping this factor only increases the bound:
> $$
> |x_m - x_n| < \frac{r^n}{1-r}.
> $$
>
> **Step 5: Conclude via $\varepsilon$–$N$.** Let $\varepsilon > 0$. Since $0<r<1$, $r^n \to 0$ as $n\to\infty$ (Lecture 9), so there exists $N$ such that $r^n < \varepsilon(1-r)$ for all $n \ge N$ — here $\varepsilon(1-r)$ plays the role of an arbitrary fixed positive target. Then for all $m > n \ge N$,
> $$
> |x_m - x_n| < \frac{r^n}{1-r} < \varepsilon.
> $$
> Hence $(x_n)$ is Cauchy, and by the Cauchy Convergence Criterion (Lecture 12), $(x_n)$ converges. $\blacksquare$

> [!note] Relation to the contractive-sequence bound
> This proof is structurally identical to the Contractive Sequence Theorem's proof in Lecture 12, with one difference: there, consecutive differences decayed as $c^{n-1}|x_2-x_1|$ for a *fixed* ratio $c$; here they are bounded directly by $r^n$, a hypothesis rather than a derived consequence. The telescoping and geometric-series-summation machinery is otherwise exactly the same — this is a useful pattern to recognize whenever a sequence's consecutive differences are controlled by any summable bound, not just a strictly contractive one.
