---
id: L09
aliases: ["Subsequence", "Subsequences", "Divergence Criteria"]
tags: []
---
# Subsequences and Their Role in Convergence and Divergence

## Definitions and Notation

A subsequence picks out infinitely many terms of a sequence, in order, while discarding the rest. This idea will turn out to be exactly the right tool for both confirming convergence and, more usefully, for *proving divergence* — since a single "bad" subsequence is often easier to exhibit than to analyze the whole sequence directly.

> [!def] Sequence and Subsequence
> - A real sequence is a function $X:\mathbb{N}\to\mathbb{R}$, written $X=(x_n)_{n\in\mathbb{N}}$ with $x_n = X(n)$.
> - A **subsequence** of $X$ is any sequence of the form $(x_{n_k})_{k\in\mathbb{N}}$ where $(n_k)_{k\in\mathbb{N}}$ is a strictly increasing sequence in $\mathbb{N}$ (i.e. $n_1 < n_2 < \cdots$).
> - Functionally, if $A = \{n_k : k\in\mathbb{N}\} \subset \mathbb{N}$, then $X|_A : A \to \mathbb{R}$ is the restriction of $X$ to $A$. Reindexing by $k \mapsto n_k$ yields the subsequence $(x_{n_k})$.

> [!example] Even-Indexed Terms of $(1/n)$
> Let $x_n = \frac{1}{n}$. The subsequence with even indices is
> $$
> x_{2n} = \frac{1}{2n} = \tfrac12\cdot\frac{1}{n},
> $$
> i.e. $1/2,\ 1/4,\ 1/6,\ 1/8,\dots$. Here $(x_{2n})$ happens to coincide termwise with the scaled sequence $\bigl(\tfrac12 x_n\bigr)$ — but this is a coincidence of this particular example, not a general fact: a scaled sequence need not be a subsequence of the original.

## Basic Property of Subsequences

The single most useful fact about subsequences is that they inherit convergence from the parent sequence. Intuitively, once the tail of $(x_n)$ is trapped near $L$, any subsequence — which only ever moves *forward* through the indices — is eventually trapped there too.

> [!thm] Subsequence of a Convergent Sequence
> If $x_n \to L \in \mathbb{R}$, then every subsequence $x_{n_k}$ also converges to $L$.

> [!pf] Proof
> Let $\varepsilon > 0$. Since $x_n \to L$, there exists $N \in \mathbb{N}$ such that $|x_n - L| < \varepsilon$ for all $n \ge N$.
>
> The index sequence $(n_k)$ is strictly increasing (hence unbounded in $\mathbb{N}$, by the Archimedean property), so there exists $K$ such that $n_k \ge N$ for all $k \ge K$. Hence for all $k \ge K$, $|x_{n_k} - L| < \varepsilon$. Therefore $x_{n_k} \to L$.

Taking the contrapositive of this theorem converts it into a divergence tool: exhibiting just *one* subsequence that misbehaves is enough to rule out convergence to $L$.

> [!cor] Contrapositive
> If $x_n \not\to L$, then there exists a subsequence $(x_{n_k})$ that does not converge to $L$ — indeed, one that stays at least some fixed distance from $L$ infinitely often.

> [!imp] A Common Misreading to Avoid
> The statement "if *some* subsequence of $X$ converges to $L$, then $x_n \to L$" is **false**. The correct direction is: if *every* subsequence of $X$ converges to $L$, then $x_n \to L$. A single well-behaved subsequence proves nothing about the whole sequence — this asymmetry is exactly what makes subsequences useful for disproving convergence but not, on their own, for proving it.

## Characterizations of Non-Convergence to a Given Limit

The corollary above asserted that a "bad" subsequence exists when $x_n \not\to L$; we now make this precise by giving three logically equivalent ways to express non-convergence, moving from the raw negated definition to an explicit subsequence.

> [!thm] Equivalent Forms of Non-Convergence to $L$
> Let $X = (x_n)$ be a sequence and $L \in \mathbb{R}$. The following are equivalent:
> 1. $x_n \not\to L$.
> 2. There exists $\varepsilon_0 > 0$ such that for every $k \in \mathbb{N}$ there exists $n_k \ge k$ with $|x_{n_k} - L| \ge \varepsilon_0$.
> 3. There exist $\varepsilon_0 > 0$ and a subsequence $(x_{n_k})$ of $X$ such that $|x_{n_k} - L| \ge \varepsilon_0$ for all $k \in \mathbb{N}$.

> [!pf] Proof
> **(1 ⇒ 2)** Negating the definition of limit: since $x_n \not\to L$, there exists $\varepsilon_0 > 0$ such that for every $N$ there exists $n \ge N$ with $|x_n - L| \ge \varepsilon_0$. Taking $N = k$ and choosing such $n = n_k$ gives (2).
>
> **(2 ⇒ 3)** Choose the indices in (2) successively beyond the previous one, so that $(n_k)$ is strictly increasing; the resulting $(x_{n_k})$ is a genuine subsequence satisfying $|x_{n_k}-L| \ge \varepsilon_0$ for all $k$.
>
> **(3 ⇒ 1)** If $x_n \to L$, the Subsequence Theorem above would force every subsequence — including $(x_{n_k})$ from (3) — to converge to $L$. But (3) gives a subsequence staying at least $\varepsilon_0$ away from $L$, a contradiction.

## Boundedness and Unboundedness

Before applying these ideas to divergence, we restate [[Bounded Sequence|boundedness]] from the previous lecture and give its natural negation, phrased in a form that will feed directly into the construction below.

> [!def] Bounded and Unbounded Sequences
> - **Bounded:** $X$ is bounded if there exists $M > 0$ such that $|x_n| \le M$ for all $n \in \mathbb{N}$.
> - **Unbounded:** $X$ is unbounded if for every $M > 0$ there exists $n \in \mathbb{N}$ with $|x_n| > M$. Equivalently, for each $k \in \mathbb{N}$ there exists $n_k \in \mathbb{N}$ with $|x_{n_k}| > k$.

## From Unboundedness to a Reciprocal-Null Subsequence

Unboundedness lets us extract a subsequence that grows past every threshold $k$ — and, just as importantly, we can always arrange the indices to be strictly increasing, so the result really is a subsequence.

> [!lem] Constructing a Rapidly Growing Subsequence
> If $X = (x_n)$ is unbounded, then there exists a strictly increasing sequence $(n_k)$ such that
> $$
> |x_{n_k}| > k \quad\text{for all } k \in \mathbb{N}.
> $$

> [!pf] Proof
> By unboundedness, for $k=1$ choose $n_1$ with $|x_{n_1}| > 1$. Having chosen $n_k$, apply unboundedness again (with $M = k+1$, restricted to indices beyond $n_k$ — possible since only finitely many terms lie at or before $n_k$) to pick $n_{k+1} > n_k$ with $|x_{n_{k+1}}| > k+1$. This produces a strictly increasing $(n_k)$ with $|x_{n_k}| > k$ for every $k$.

The growth bound $|x_{n_k}| > k$ is exactly strong enough to force the reciprocal subsequence to vanish in the limit — a useful trick for showing sequences like $1/x_n$ converge even when $(x_n)$ itself does not.

> [!cor] Reciprocals Converge to 0
> With $(n_k)$ as above, the subsequence $\bigl(1/x_{n_k}\bigr)$ is well-defined and satisfies
> $$
> \lim_{k\to\infty} \frac{1}{x_{n_k}} = 0.
> $$

> [!pf] Proof
> Since $|x_{n_k}| > k \ge 1$, each $x_{n_k} \neq 0$, so the reciprocal is defined. Then
> $$
> \left|\frac{1}{x_{n_k}}\right| \le \frac{1}{k}.
> $$
> Given $\varepsilon > 0$, choose $K > 1/\varepsilon$ (Archimedean property). For all $k \ge K$, $\left|\frac{1}{x_{n_k}}\right| \le \frac1k \le \frac1K < \varepsilon$.

> [!imp] Checklist for the Construction
> To find such a subsequence explicitly, it suffices to arrange
> $$
> |x_{n_k}| > k \quad \text{for all } k \in \mathbb{N}, \qquad\text{which implies}\qquad 0 < \frac{1}{|x_{n_k}|} < \frac1k.
> $$
> This single growth condition is the only thing that needs verifying — everything else in the corollary above follows mechanically.

## Sufficient Criteria for Divergence

The Contrapositive and Reciprocal corollaries above are really special cases of a general principle: subsequence behavior can certify divergence outright. We collect the two most common criteria here.

> [!thm] Divergence Criteria (Sufficient Conditions)
> A sequence $X = (x_n)$ is divergent (has no finite limit) if at least one of the following holds:
> - there exist two subsequences $x_{n_k}$ and $x_{m_k}$ with different limits;
> - $X$ is unbounded.

> [!note] Why both criteria work
> The first criterion is immediate from the Subsequence Theorem: if $x_n \to L$, *every* subsequence converges to $L$, so two subsequences with different limits are incompatible with convergence. The second follows since every convergent sequence is bounded (Lecture 7) — an unbounded sequence cannot possibly converge.

## Example: Geometric Sequences with $0 < b < 1$

As a capstone example, we combine the Monotone Convergence Theorem (Lecture 8) with the Subsequence Theorem to pin down the limit of a geometric sequence — a case where monotonicity alone gives existence of a limit, but identifying its *value* requires a subsequence trick.

> [!thm] Limit of a Decaying Geometric Sequence
> If $0 < b < 1$, then
> $$
> \lim_{n\to\infty} b^n = 0.
> $$

> [!pf] Proof
> The sequence $x_n = b^n$ is decreasing (since $0<b<1$) and bounded below by $0$, hence convergent by the Monotone Convergence Theorem. Let $\lim x_n = x \ge 0$.
>
> Now $(b^{2n})$ is a subsequence of $(b^n)$ — taking indices $n_k = 2k$ — so by the Subsequence Theorem it converges to the same limit $x$. But also $b^{2n} = (b^n)^2$, so by the Product Limit Law (Lecture 7), $\lim b^{2n} = x^2$.
>
> Comparing the two expressions for this limit: $x = x^2$, so $x(x-1) = 0$, giving $x \in \{0,1\}$. Since $0 < b < 1$, we have $x_n = b^n \le b < 1$ for all $n \ge 1$, so $x \le b < 1$, ruling out $x = 1$. Therefore $x = 0$.

> [!imp] The subsequence trick as a general method
> This proof illustrates a powerful technique: when a recursive or self-similar relationship exists between a sequence and one of its own subsequences (here, $b^{2n} = (b^n)^2$), the Subsequence Theorem lets us set up an algebraic equation for the limit — exactly as passing to the limit in a recursion did for the sequence $x_{n+1}=\sqrt{2x_n}$ in Lecture 8. Monotone Convergence guarantees the limit *exists*; the subsequence relation then pins down its *value*.
