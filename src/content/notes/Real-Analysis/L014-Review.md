---
id: L014
aliases: []
tags: []
---
# Review: Limsup/Liminf, p-Series, Iterative Sequences, and Subsequences

This lecture consolidates several threads from earlier material — limsup/liminf (Lecture 11), the p-series test and Cauchy criterion (Lectures 12–13), monotone and contractive convergence (Lecture 8, 12), and subsequences (Lecture 9) — through a set of worked examples in preparation for the quiz.

## Limsup/Liminf: Definitions and Basic Inequalities

We first recall the tail-based characterization of $\limsup$ and $\liminf$ from Lecture 11, since the remaining results in this section build directly on it.

> [!def] Limsup and Liminf via Tails
> Let $(x_n)$ be a real sequence and define the tail suprema and infima by
> $$s_n := \sup_{m\ge n} x_m, \qquad t_n := \inf_{m\ge n} x_m.$$
> Then
> $$\overline{\lim}_{n\to\infty} x_n = \lim_{n\to\infty} s_n, \qquad \underline{\lim}_{n\to\infty} x_n = \lim_{n\to\infty} t_n.$$

The subadditivity of $\limsup$ proved in Lecture 11 rested on a pointwise inequality for tail suprema; we restate that inequality here as a standalone lemma, since it is the reusable core of the argument.

> [!lem] Tailwise Subadditivity of Sup
> For every fixed $n \in \mathbb{N}$ and real sequences $(x_n), (y_n)$,
> $$
> \sup_{m\ge n}(x_m+y_m) \;\le\; \sup_{m\ge n} x_m + \sup_{m\ge n} y_m.
> $$

> [!pf] Proof Sketch
> For all $m \ge n$, $x_m \le \sup_{k\ge n} x_k$ and $y_m \le \sup_{k\ge n} y_k$; adding these and taking the supremum of the left side over $m \ge n$ preserves the inequality.

Passing this pointwise inequality to the limit — using the Tail Sup/Inf Characterization above to identify each limit with a $\limsup$ — recovers the subadditivity theorem from Lecture 11.

> [!thm] Subadditivity of Limsup
> For real sequences $(x_n)$ and $(y_n)$,
> $$
> \limsup_{n\to\infty}(x_n+y_n) \;\le\; \limsup_{n\to\infty} x_n + \limsup_{n\to\infty} y_n.
> $$

> [!pf] Proof
> Let $u_n := \sup_{m\ge n}(x_m+y_m)$, $s_n := \sup_{m\ge n} x_m$, $t_n := \sup_{m\ge n} y_m$. By the lemma, $u_n \le s_n + t_n$ for every $n$. Passing to the limit (using the Order Limit Law, Lecture 7, which preserves non-strict inequalities),
> $$
> \lim_{n\to\infty} u_n \le \lim_{n\to\infty} s_n + \lim_{n\to\infty} t_n,
> $$
> i.e. $\limsup_{n\to\infty}(x_n+y_n) \le \limsup_{n\to\infty} x_n + \limsup_{n\to\infty} y_n$.

The basic properties of Lecture 11 recorded that $\liminf x_n = -\limsup(-x_n)$; we now prove that identity, which also gives a second, equivalent formula for $\liminf$ purely in terms of infima.

> [!lem] Liminf Identities
> For any real sequence $(x_n)$,
> $$
> \underline{\lim}_{n\to\infty} x_n = -\overline{\lim}_{n\to\infty}(-x_n) = \lim_{n\to\infty} \inf_{m\ge n} x_m.
> $$

> [!pf] Proof
> Using the set identity $-\sup A = \inf(-A)$,
> $$
> \underline{\lim} x_n = -\overline{\lim}(-x_n) = -\lim_{n\to\infty}\sup_{m\ge n}(-x_m) = -\lim_{n\to\infty}\Bigl(-\inf_{m\ge n} x_m\Bigr) = \lim_{n\to\infty}\inf_{m\ge n} x_m.
> $$

---

## Convergence of p-Series Partial Sums (Special Case $p=2$)

Lecture 13 proved the p-series test using an integral tail bound combined with the Cauchy criterion. Here we revisit the monotone-boundedness route in more explicit detail, and specialize it to $p=2$ — a case whose convergence will later be needed without reference to its exact value.

> [!thm] Convergence of $\sum 1/n^p$ for $p>1$ via Integrals
> For $p > 1$, define
> $$
> S_n(p) := \sum_{k=1}^n \frac{1}{k^p}.
> $$
> Then $(S_n(p))$ is increasing and bounded above by
> $$
> S_n(p) \le 1 + \int_1^\infty \frac{dx}{x^p} = 1 + \frac{1}{p-1}.
> $$
> Hence $(S_n(p))$ converges.

> [!pf] Proof
> Since every term is positive, $S_n(p)$ is increasing. For $k \ge 2$, the function $f(x) = x^{-p}$ is decreasing, so on $[k-1,k]$ its minimum value is at $x=k$:
> $$
> \frac{1}{k^p} \le \int_{k-1}^k \frac{dx}{x^p}.
> $$
> Summing from $k=2$ to $n$,
> $$
> \sum_{k=2}^n \frac{1}{k^p} \le \int_1^n \frac{dx}{x^p} = \left[\frac{x^{1-p}}{1-p}\right]_1^n = \frac{1-n^{1-p}}{p-1} \le \frac{1}{p-1}.
> $$
> Therefore $S_n(p) \le 1 + \dfrac{1}{p-1}$, so $(S_n(p))$ is increasing and bounded above, hence convergent by the Monotone Convergence Theorem (Lecture 8).

> [!cor] Special Case $p=2$
> For $x_n = \sum_{k=1}^n \dfrac{1}{k^2}$, the bound above gives $x_n \le 1 + \int_1^\infty x^{-2}\,dx = 2$, so $(x_n)$ converges. (Its limit is $\zeta(2) = \pi^2/6$, though this exact value is not needed to establish convergence — only the bound $x_n \le 2$.)

---

## Monotone/Cauchy Criteria for the Iteration $x_{n+1} = \sqrt{2+x_n}$

This example is structurally identical to the recursive sequence $x_{n+1} = \sqrt{2x_n}$ analyzed in Lecture 8, and to the recursive square-root sequence of Lecture 12 — the same two-step recipe (establish monotonicity and boundedness, then solve the limiting equation) applies, and we additionally show the contractive route from Lecture 12 gives an independent proof.

> [!thm] Convergence and Limit of $x_{n+1} = \sqrt{2+x_n}$
> Let $x_1 \ge 0$ and define $x_{n+1} = \sqrt{2+x_n}$. Then $(x_n)$ converges to $2$.
> - If $x_1 \le 2$, then $(x_n)$ is monotone increasing and bounded above by $2$.
> - If $x_1 \ge 2$, then $(x_n)$ is monotone decreasing and bounded below by $2$.

> [!pf] Proof (Monotone + Bounded)
> **Monotonicity (case $x_1 \le 2$).** If $x_k \le x_{k+1}$, then $2+x_k \le 2+x_{k+1}$, and since $\sqrt{\cdot}$ is increasing on $[0,\infty)$, $x_{k+1} \le x_{k+2}$. Since $x_1 \le 2$ gives $x_1 \le x_2$ as the base case, induction shows $(x_n)$ is increasing.
>
> **Boundedness.** If $x_n \le 2$, then $x_{n+1} = \sqrt{2+x_n} \le \sqrt{4} = 2$. So $x_n \le 2$ for all $n$; the increasing sequence is bounded above, hence convergent by the Monotone Convergence Theorem.
>
> **Identifying the limit.** Any limit $L$ must satisfy $L = \sqrt{2+L}$ (passing to the limit in the recursion, as in Lecture 8), so $L^2 = L+2$, i.e.
> $$
> (L-2)(L+1) = 0.
> $$
> Since $x_n \ge 0$ for all $n$, the limit $L \ge 0$, ruling out $L=-1$. Hence $L = 2$.
>
> The case $x_1 \ge 2$ is analogous: one checks $x_{n+1} \le x_n$ and $x_n \ge 2$, so $(x_n)$ decreases to $2$.

### Alternative: Cauchy (Contraction) Argument

As an alternative to Monotone Convergence, the Conjugate Trick (Lecture 6) combined with the contractive-sequence machinery (Lecture 12) gives a direct Cauchy proof — this is the same computation as the recursive square-root example of Lecture 12, with $2+x_n$ in place of $x_n+2$.

> [!pf] Contraction of Successive Differences
> For all $n$,
> $$
> |x_{n+2}-x_{n+1}| = \left|\sqrt{2+x_{n+1}}-\sqrt{2+x_n}\right| = \frac{|x_{n+1}-x_n|}{\sqrt{2+x_{n+1}}+\sqrt{2+x_n}}.
> $$
> If $x_n \ge 0$, then $\sqrt{2+x_n} \ge \sqrt2$, so
> $$
> |x_{n+2}-x_{n+1}| \le \frac{1}{2\sqrt2}\,|x_{n+1}-x_n|.
> $$
> This is the contractive condition with $c = \tfrac{1}{2\sqrt2} \in (0,1)$, so $(x_n)$ is Cauchy and hence convergent (Lecture 12). The limit must again solve $L = \sqrt{2+L}$, giving $L=2$.

---

## A Divergent Monotone Sequence: $x_{n+1} = x_n + \frac{1}{x_n}$

Not every monotone sequence converges — this example uses the Divergence of Monotone Sequences theorem (Lecture 13) in the opposite direction from the previous examples: instead of bounding the sequence, we show it is unbounded and conclude proper divergence.

> [!lem] Monotonicity
> If $x_1 = a > 0$ and $x_{n+1} = x_n + \dfrac{1}{x_n}$, then $x_{n+1} - x_n = \dfrac{1}{x_n} > 0$, so $(x_n)$ is strictly increasing.

> [!thm] Divergence to $+\infty$
> The sequence $(x_n)$ is unbounded, and
> $$
> x_n \ge \sqrt{a^2 + 2(n-1)} \quad\Longrightarrow\quad x_n \to +\infty.
> $$

> [!pf] Proof
> Compute the difference of squares:
> $$
> x_{n+1}^2 - x_n^2 = \left(x_n + \frac{1}{x_n}\right)^2 - x_n^2 = 2 + \frac{1}{x_n^2} \ge 2.
> $$
> Summing this inequality from $1$ to $n-1$ (a telescoping sum),
> $$
> x_n^2 \ge x_1^2 + 2(n-1) = a^2 + 2(n-1),
> $$
> so $x_n \ge \sqrt{a^2+2(n-1)} \to \infty$ by the Archimedean property. Since $(x_n)$ is increasing and unbounded, the Divergence of Monotone Sequences theorem (Lecture 13) confirms $x_n \to \infty$.

> [!example] First Few Terms
> $$
> \begin{aligned}
> x_1 &= a,\\
> x_2 &= a + \frac1a,\\
> x_3 &= a + \frac1a + \frac{1}{a+\frac1a} = a + \frac1a + \frac{a}{a^2+1}.
> \end{aligned}
> $$

> [!note] Contrast with the previous example
> This sequence and $x_{n+1}=\sqrt{2+x_n}$ both add a positive quantity at each step, yet one converges and the other diverges. The difference is that $1/x_n$ does not shrink fast enough to keep the partial sums bounded (indeed $x_n^2$ grows linearly), whereas $\sqrt{2+x_n}$ is trapped below the fixed point $2$ once $x_1 \le 2$. This is a useful reminder that monotonicity alone never guarantees convergence — boundedness must be checked independently, exactly as the Monotone Convergence Theorem requires.

---

## Subsequence Approaching the Supremum

We close with a result connecting suprema (Lecture 3) back to subsequences (Lecture 9): even when the supremum of a bounded sequence's terms is never actually attained, some subsequence must still converge to it. This is a concrete instance of the Supremum Characterization from Lecture 4, translated into sequence language.

> [!thm] Subsequence Converging to the Supremum
> Let $(x_n)$ be a bounded real sequence and let $s = \sup\{x_n : n\in\mathbb{N}\}$. If $s \notin \{x_n : n\in\mathbb{N}\}$, then there exists a subsequence $(x_{n_k})$ such that $x_{n_k} \to s$.
> - The indices can be chosen strictly increasing: $n_1 < n_2 < \cdots$.
> - The subsequence satisfies $s - \tfrac1k < x_{n_k} \le s$ for all $k$, hence $x_{n_k} \to s$.

> [!pf] Proof
> For each $k \in \mathbb{N}$, the number $s - \tfrac1k$ is not an upper bound of $\{x_n\}$, since $s$ is the *least* upper bound (Supremum Characterization, Lecture 4). So we can pick some index with $x_{n_k} > s - \tfrac1k$. Choosing these indices inductively so that $n_{k+1} > n_k$ (always possible, since infinitely many terms must exceed $s-\tfrac1k$ — otherwise $s$ would not be approached) yields a genuine subsequence with
> $$
> s - \frac1k < x_{n_k} \le s \qquad \text{for all } k.
> $$
> Letting $k \to \infty$, both bounds converge to $s$, so $x_{n_k} \to s$ by the Squeeze Theorem.
>
> If $s$ is actually attained — say $x_{n_0} = s$ for some $n_0$ — the constant subsequence $x_{n_k} = s$ for all $k$ trivially converges to $s$ as well, so the conclusion holds regardless of whether the supremum is attained.
