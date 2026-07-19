---
id: L10
aliases: []
tags: []
---
# The Bolzano–Weierstrass Theorem and Limit Superior/Inferior

## The Bolzano–Weierstrass Theorem

Lecture 9 showed that convergent sequences pass every property down to their subsequences, and that unbounded sequences necessarily diverge. A natural question remains: does *every* bounded sequence — even one that itself diverges, like $((-1)^n)$ — still contain some convergent subsequence hiding inside it? The Bolzano–Weierstrass theorem answers yes, using the Nested Intervals Property from Lecture 6 as its engine.

> [!thm] Bolzano–Weierstrass Theorem
> Every bounded sequence in $\mathbb{R}$ has a convergent subsequence.

The strategy is a repeated bisection: trap the sequence in an interval, then keep halving that interval, always keeping the half that still contains infinitely many terms of the sequence. This produces exactly the nested, shrinking intervals that Lecture 6 showed must collapse to a single point.

> [!pf] Proof (Bisection Argument)
> Let $(x_n)$ be a bounded sequence. Since it is bounded, there is a closed interval $I_1 = [a,b]$ with $x_n \in I_1$ for all $n$. Set $n_1 = 1$.
>
> Bisect $I_1$ into two equal closed subintervals. Since $I_1$ contains infinitely many terms of $(x_n)$ but is split into only two pieces, at least one piece must itself contain infinitely many terms — call it $I_2$. Choose $n_2 > n_1$ to be the smallest index with $x_{n_2} \in I_2$.
>
> Repeat: bisect $I_2$, let $I_3$ be whichever half still contains infinitely many terms, and choose $n_3 > n_2$ minimal with $x_{n_3} \in I_3$. Continuing inductively produces:
> - a nested sequence of closed, bounded intervals $I_1 \supset I_2 \supset \cdots$ with lengths $|I_k| = \dfrac{b-a}{2^{k-1}} \to 0$,
> - a strictly increasing sequence of indices $(n_k)$ with $x_{n_k} \in I_k$ for each $k$.
>
> By the Nested Intervals Property (Lecture 6), together with the vanishing-length corollary, there exists a *unique* point $\xi \in \bigcap_{k=1}^\infty I_k$.
>
> Since both $x_{n_k}$ and $\xi$ lie in $I_k$,
> $$
> |x_{n_k} - \xi| \le |I_k| = \frac{b-a}{2^{k-1}} \xrightarrow[k\to\infty]{} 0,
> $$
> so $x_{n_k} \to \xi$. Thus $(x_{n_k})$ is a convergent subsequence of $(x_n)$.

```tikz
\begin{document}
\begin{tikzpicture}[scale=3]
  % Draw the initial interval I_1
  \draw[thick] (0,1) -- (2,1) node[right] {$I_1=[a,b]$};
  \node[below left] at (0,1) {$a$};
  \node[below right] at (2,1) {$b$};
  % Bisect I_1 into I_1', I_1''
  \draw[dashed] (1,1.02) -- (1,0.68);
  \node[below] at (1,1) {};
  \node[above] at (1,1) {\small $m_1$};
  % Draw I_2 (choose right half)
  \draw[thick,blue] (1,0.8) -- (2,0.8) node[right,blue] {$I_2$};
  \node[below] at (1,0.8) {$m_1$};
  \node[below right] at (2,0.8) {$b$};
  % Bisect I_2
  \draw[dashed,blue] (1.5,0.82) -- (1.5,0.65);
  \node[above,blue] at (1.5,0.8) {\small $m_2$};
  % Draw I_3 (choose left half)
  \draw[thick,red] (1,0.6) -- (1.5,0.6) node[right,red] {$I_3$};
  \node[below] at (1,0.6) {$m_1$};
  \node[below] at (1.5,0.6) {$m_2$};
  % Nested ellipsis
  \node at (1.25,0.45) {\vdots};
  % xi, the unique point in all I_k
  \filldraw[black] (1.2,0.2) circle (0.015);
  \node[right] at (1.2,0.2) {$\xi$};
  % Indicate x_{n_1}, x_{n_2}, x_{n_3}
  \fill[black] (1.8,1) circle (0.008);
  \node[above right] at (1.8,1) {\scriptsize $x_{n_1}$};
  \fill[black] (1.9,0.8) circle (0.008);
  \node[right] at (1.9,0.8) {\scriptsize $x_{n_2}$};
  \fill[black] (1.1,0.6) circle (0.008);
  \node[above left] at (1.1,0.6) {\scriptsize $x_{n_3}$};
\end{tikzpicture}
\end{document}
```

The proof relies on a specialized version of the Nested Intervals Property, isolated here for reference — it's the vanishing-length corollary from Lecture 6, restated in terms of interval length rather than $\sup A$/$\inf B$.

> [!lem] Nested Interval Theorem (Specialized)
> If $(I_k)$ is a nested sequence of nonempty closed intervals with $|I_k| \to 0$, then $\bigcap_{k=1}^\infty I_k = \{\xi\}$ consists of exactly one point.

> [!note] The "pigeonhole" intuition
> Picture infinitely many pigeons (sequence terms) inside a fenced yard (a bounded interval). Cut the yard in half — at least one half must still contain infinitely many pigeons, by pigeonhole. Keep halving whichever half stays infinitely populated. The fences close in on a single spot, and picking one pigeon from each shrinking yard produces a subsequence converging to that spot.

---

## Limit Superior and Limit Inferior

Bolzano–Weierstrass guarantees *some* convergent subsequence exists, but a bounded, divergent sequence like $((-1)^n)$ can have many subsequential limits. Limsup and liminf are designed to capture the largest and smallest of these possible limits — and, as the convergence criterion below shows, comparing the two gives a complete test for convergence itself.

### Definitions

> [!def] Eventual Bounds and limsup/liminf
> Let $X = (x_n)$ be a real sequence.
>
> Define the set of **eventual upper bounds**
> $$
> V = \{v \in \mathbb{R} : x_n \le v \text{ for all but finitely many } n\}.
> $$
> The **limit superior** is
> $$
> \overline{\lim}\,x_n = \limsup_{n\to\infty} x_n = \inf V.
> $$
>
> Define the set of **eventual lower bounds**
> $$
> W = \{w \in \mathbb{R} : x_n \ge w \text{ for all but finitely many } n\}.
> $$
> The **limit inferior** is
> $$
> \underline{\lim}\,x_n = \liminf_{n\to\infty} x_n = \sup W.
> $$

Working directly with $V$ and $W$ is often awkward. An equivalent, more computable description comes from tracking the running supremum and infimum of the *tail* of the sequence — quantities that behave monotonically and so converge by the Monotone Convergence Theorem (Lecture 8).

> [!thm] Tail Sup/Inf Characterization
> For any real sequence $(x_n)$, define
> $$
> s_n = \sup_{k\ge n} x_k, \qquad i_n = \inf_{k\ge n} x_k.
> $$
> Then $(s_n)$ is nonincreasing and $(i_n)$ is nondecreasing, and
> $$
> \limsup_{n\to\infty} x_n = \inf_{n\in\mathbb{N}} s_n = \lim_{n\to\infty} s_n, \qquad
> \liminf_{n\to\infty} x_n = \sup_{n\in\mathbb{N}} i_n = \lim_{n\to\infty} i_n,
> $$
> with limits possibly in the extended reals. If $(x_n)$ is bounded, these limits are finite.

> [!note] Why $(s_n)$ is monotone
> Taking the supremum over a *shrinking* tail $\{x_k : k \ge n\}$ as $n$ increases can only decrease (or maintain) the supremum — hence $(s_n)$ is nonincreasing, and dually $(i_n)$ is nondecreasing. Since a nonincreasing sequence bounded below (or nondecreasing bounded above) converges by the Monotone Convergence Theorem, $\lim s_n$ and $\lim i_n$ are automatically well-defined whenever $(x_n)$ is bounded.

> [!lem] Basic Properties
> - $\displaystyle \liminf_{n\to\infty} x_n \le \limsup_{n\to\infty} x_n$.
> - $\displaystyle \liminf_{n\to\infty} x_n = -\limsup_{n\to\infty}(-x_n)$.

### Convergence Criterion via limsup/liminf

The real power of these two quantities is that they turn "does this sequence converge" into a simple equality check — no need to guess a candidate limit in advance.

> [!thm] Convergence Criterion
> A sequence $(x_n)$ converges to $L \in \mathbb{R}$ if and only if
> $$
> \liminf_{n\to\infty} x_n = \limsup_{n\to\infty} x_n = L.
> $$

> [!pf] Proof
> **($\Rightarrow$)** Suppose $x_n \to L$. For any $\epsilon > 0$, there exists $N$ such that $L - \epsilon \le x_n \le L+\epsilon$ for all $n \ge N$. Thus $L+\epsilon$ is an eventual upper bound and $L-\epsilon$ is an eventual lower bound, so
> $$
> \limsup x_n \le L+\epsilon, \qquad \liminf x_n \ge L - \epsilon.
> $$
> Letting $\epsilon \downarrow 0$ gives $\liminf x_n = \limsup x_n = L$.
>
> **($\Leftarrow$)** Suppose $\liminf x_n = \limsup x_n = L$ but, toward a contradiction, $x_n \nrightarrow L$. By the Characterizations of Non-Convergence (Lecture 9), there exists $\epsilon_0 > 0$ and a subsequence $(x_{n_k})$ with $|x_{n_k} - L| \ge \epsilon_0$ for all $k$. Then either infinitely many terms satisfy $x_{n_k} \ge L+\epsilon_0$, or infinitely many satisfy $x_{n_k} \le L - \epsilon_0$.
> - If infinitely many $x_{n_k} \ge L+\epsilon_0$, then $L+\epsilon_0$ fails to be an eventual upper bound, so $\limsup x_n \ge L+\epsilon_0 > L$ — contradicting $\limsup x_n = L$.
> - If infinitely many $x_{n_k} \le L-\epsilon_0$, then $L-\epsilon_0$ fails to be an eventual lower bound, so $\liminf x_n \le L-\epsilon_0 < L$ — contradicting $\liminf x_n = L$.
>
> Either case is a contradiction, so $x_n \to L$.

> [!example] $x_n = (-1)^n$
> Here
> $$
> \limsup_{n\to\infty} x_n = 1, \qquad \liminf_{n\to\infty} x_n = -1,
> $$
> and since these disagree, the Convergence Criterion confirms what we already knew from Lecture 9 (via the two-subsequences divergence test): the sequence does not converge.

> [!imp] Useful equalities, restated
> For any sequence $(x_n)$,
> $$
> \limsup_{n\to\infty} x_n = \lim_{n\to\infty}\Bigl(\sup_{k\ge n} x_k\Bigr), \qquad
> \liminf_{n\to\infty} x_n = \lim_{n\to\infty}\Bigl(\inf_{k\ge n} x_k\Bigr).
> $$
> This is just the Tail Sup/Inf Characterization above, worth keeping at hand as the go-to computational definition: rather than working with the sets $V$ and $W$ directly, compute the running tail sup/inf and take *its* limit — which, by the Monotone Convergence Theorem, is guaranteed to exist whenever the sequence is bounded.
