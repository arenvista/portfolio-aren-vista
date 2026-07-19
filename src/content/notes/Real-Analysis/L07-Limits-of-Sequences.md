---
id: L07
aliases: []
tags: []
---
# Boundedness and the Algebra of Limits

## Limit of a Sequence

We recall the definition of convergence from the previous lecture, since everything in this lecture builds directly on manipulating this $\varepsilon$–$N$ statement algebraically.

> [!def] Limit of a Sequence
> A sequence $(x_n)$ converges to $x$ if
> $$\forall \epsilon > 0,\ \exists N(\epsilon) \in \mathbb{N} \text{ such that } \forall n \ge N(\epsilon),\ |x_n - x| < \epsilon.$$
> We write $x_n \to x$ as $n \to \infty$.

---

## Bounded Sequences

Before combining limits algebraically, it is useful to establish a basic structural fact: convergence forces a sequence to stay within some fixed range. This mirrors the notion of a bounded *set* from Lecture 3, applied now to the set of terms a sequence produces.

> [!def] Bounded Sequence
> A sequence $(x_n)$ is **bounded** if there exists $M > 0$ such that $|x_n| \le M$ for all $n \in \mathbb{N}$. Equivalently, the set $\{x_n : n \in \mathbb{N}\}$ is bounded.

### Convergent Sequences Are Bounded

The idea of the proof is simple: once $n$ is large enough, the tail of the sequence is trapped near the limit $x$ and hence automatically bounded; the only remaining concern is the finitely many terms before that point, which can always be bounded by taking a maximum.

> [!thm] Convergent Sequences Are Bounded
> Every convergent sequence $(x_n)$ is bounded.

> [!pf] Proof
> Let $x_n \to x$. Choose $\epsilon = 1$. Then there exists $N \in \mathbb{N}$ such that $|x_n - x| < 1$ for all $n \ge N$. By the triangle inequality (Lecture 3), for all $n \ge N$,
> $$|x_n| \le |x_n - x| + |x| < 1 + |x|.$$
> The finitely many terms before index $N$ are handled by simply including them in a maximum:
> $$M := \max\big\{|x_1|, |x_2|, \dots, |x_{N-1}|,\ 1 + |x|\big\}.$$
> Then $|x_n| \le M$ for all $n \in \mathbb{N}$, so $(x_n)$ is bounded.

> [!note] The converse fails
> Boundedness does not imply convergence — the sequence $\bigl((-1)^n\bigr)$ from Lecture 6 is bounded but does not converge, since it oscillates between two fixed values without settling near either. Boundedness is therefore a *necessary*, but not sufficient, condition for convergence.

---

## Algebra of Limits

With boundedness established as a basic tool, we now turn to the central computational engine of this lecture: showing that limits interact with the usual arithmetic operations exactly as one would hope.

> [!thm] Limit Laws for Sequences
> Suppose $x_n \to x$ and $y_n \to y$ as $n \to \infty$, and let $c \in \mathbb{R}$. Then:
> - **Addition:** $x_n + y_n \to x + y$.
> - **Subtraction:** $x_n - y_n \to x - y$.
> - **Scalar multiplication:** $c\,x_n \to c\,x$.
> - **Product:** $x_n y_n \to xy$.
> - **Reciprocal:** if $y \neq 0$ and $y_n \neq 0$ for all sufficiently large $n$, then $1/y_n \to 1/y$.
> - **Quotient:** if $y \neq 0$ and $y_n \neq 0$ for all sufficiently large $n$, then $x_n/y_n \to x/y$.

The reciprocal and quotient rules both carry a hypothesis — $y_n \neq 0$ eventually — that might look like it needs to be assumed separately for each application. In fact it is automatic whenever $y \neq 0$, which is worth recording before using these rules.

> [!imp] Note on Reciprocals and Quotients
> If $y \neq 0$ and $y_n \to y$, then there exists $N$ such that for all $n \ge N$,
> $$|y_n| \ge |y|/2 > 0,$$
> so $y_n \neq 0$ eventually. This is what justifies the reciprocal and quotient rules — the "eventually nonzero" hypothesis is not an extra assumption but a consequence of $y_n \to y \neq 0$, obtained by taking $\epsilon = |y|/2$ in the definition of convergence and applying the reverse triangle inequality (Lecture 3) to $|y_n| \ge |y| - |y_n - y|$.

### Proof of the Addition Law

The remaining limit laws are all proved by the same basic strategy — split the target error $\epsilon$ into pieces (typically $\epsilon/2$ or smaller fractions), control each piece using the convergence of $x_n$ and $y_n$ separately, then recombine via the triangle inequality. The addition law is the cleanest illustration of this pattern.

> [!pf] Addition
> Let $\epsilon > 0$. Since $x_n \to x$, there exists $N_x(\epsilon/2)$ such that for $n \ge N_x(\epsilon/2)$,
> $$|x_n - x| < \epsilon/2.$$
> Since $y_n \to y$, there exists $N_y(\epsilon/2)$ such that for $n \ge N_y(\epsilon/2)$,
> $$|y_n - y| < \epsilon/2.$$
> Set $N(\epsilon) = \max\{N_x(\epsilon/2), N_y(\epsilon/2)\}$. Then for all $n \ge N(\epsilon)$,
> $$
> \begin{aligned}
> |(x_n + y_n) - (x+y)| &= |(x_n - x) + (y_n - y)| \\
> &\le |x_n - x| + |y_n - y| \\
> &< \epsilon/2 + \epsilon/2 = \epsilon.
> \end{aligned}
> $$
> Thus $x_n + y_n \to x + y$.

> [!note] The template for the remaining laws
> Subtraction follows by the identical argument applied to $x_n + (-y_n)$. Scalar multiplication is even simpler: for $c \neq 0$, choose $N$ so that $|x_n - x| < \epsilon/|c|$, giving $|cx_n - cx| = |c||x_n-x| < \epsilon$ (the case $c=0$ is trivial). The product and quotient laws are more delicate — they additionally require the boundedness of convergent sequences proved above, since bounding a term like $|x_ny_n - xy|$ typically involves inserting and subtracting a cross term such as $x_ny_n - x_ny + x_ny - xy$, then bounding $x_n$ using its boundedness while $y_n - y$ and $x_n - x$ are made small.
