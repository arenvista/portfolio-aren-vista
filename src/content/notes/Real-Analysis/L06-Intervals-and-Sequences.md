---
id: L06
aliases: []
tags: []
---
# Nested Intervals and the Foundations of Sequences

## Intervals

### Nested Intervals

Having classified what intervals look like in the previous lecture, we now ask a dynamic question: if we shrink through an infinite chain of intervals, each contained in the last, what — if anything — survives in the intersection?

> [!def] Nested Intervals
> A sequence of intervals $(I_n)_{n\in\mathbb{N}}$ is **nested** (decreasing) if
> $$
> I_{n+1} \subseteq I_n \subseteq \cdots \subseteq I_2 \subseteq I_1.
> $$
> We are interested in the intersection
> $$
> \bigcap_{n=1}^\infty I_n \;=\;?
> $$

### Examples: Open vs. Closed Endpoints

The answer turns out to depend delicately on whether the intervals are open or closed — even though the two examples below are nested in exactly the same "shrinking" way.

> [!thm] Example: Closedness Matters
> $$
> \begin{aligned}
> & I_n = \bigl(0,\tfrac{1}{n}\bigr) \quad \Rightarrow \quad (I_n) \text{ is nested}, \quad \bigcap_{n=1}^{\infty} I_n = \varnothing. \\
> & I_n = \bigl[0,\tfrac{1}{n}\bigr] \quad \Rightarrow \quad (I_n) \text{ is nested}, \quad \bigcap_{n=1}^{\infty} I_n = \{0\}.
> \end{aligned}
> $$
> This shows that to guarantee a nonempty intersection, closed endpoints can be essential: dropping the single point $0$ from each interval in the first family is enough to empty out the intersection entirely.

### Boundedness Is Also Needed

Closedness alone is not sufficient, however — the intervals must also be bounded, or the same failure can occur for a different reason.

> [!imp] Closedness Alone Is Not Enough
> Consider $I_n = [n,\infty)$, which are closed and nested (decreasing). Then
> $$
> \bigcap_{n=1}^\infty I_n = \varnothing,
> $$
> since by the Archimedean Property, for any $a \in \mathbb{R}$ there exists $n \in \mathbb{N}$ with $a < n$, hence $a \notin [n,\infty)$. So the classical nested intervals result requires **both** closedness and boundedness.

### Nested Intervals Property

With both necessary conditions identified, we now show they are also sufficient — closed, bounded, nested intervals always have nonempty intersection, and in fact that intersection is itself a closed interval built from a supremum and an infimum.

> [!thm] Nested Intervals Property
> Let $I_n = [a_n, b_n]$ be a nested sequence of nonempty closed and bounded intervals in $\mathbb{R}$:
> $$
> [a_{n+1},b_{n+1}] \subseteq [a_n,b_n] \quad \text{for all } n.
> $$
> Then the intersection is nonempty:
> $$
> \bigcap_{n=1}^{\infty} I_n \neq \varnothing.
> $$
> In fact, if $A = \{a_n : n\in\mathbb{N}\}$ and $B = \{b_n : n\in\mathbb{N}\}$, then
> $$
> \alpha := \sup A \le \inf B =: \beta, \qquad \bigcap_{n=1}^{\infty} I_n = [\alpha,\beta].
> $$

> [!pf] Proof
> Since $a_n \le b_n \le b_1$ for all $n$, the set $A = \{a_n\}$ is nonempty and bounded above; by completeness, $\xi := \sup A$ exists.
>
> **Goal: $\xi \le b_n$ for all $n$.** Suppose, for contradiction, that $b_m < \xi$ for some $m$. Then:
> $$
> \begin{cases}
> \text{if } i \le m, & a_i \le a_m \le b_m \text{ (nestedness)},\\[2pt]
> \text{if } i > m, & \text{nestedness gives } b_i \le b_m,\text{ and } a_i \le b_i \le b_m.
> \end{cases}
> $$
> Either way, $a_i \le b_m$ for every $i$, so $b_m$ is an upper bound of $A$ — contradicting $\xi = \sup A > b_m$. Hence $\xi \le b_n$ for all $n$. Also $a_n \le \xi$ for all $n$, directly from $\xi = \sup A$. So $\xi \in I_n$ for every $n$, giving $\xi \in \bigcap_{n=1}^\infty I_n$.
>
> Finally, let $\alpha := \sup A$ and $\beta := \inf B$ (this is exactly the "comparing $\sup A$ and $\inf B$" situation from Lecture 4, since $a_n \le b_m$ for all $n,m$, so $\alpha \le \beta$). For any $x$ with $\alpha \le x \le \beta$, we have $a_n \le \alpha \le x \le \beta \le b_n$ for every $n$, so $x \in I_n$ for all $n$. Hence the intersection equals exactly $[\alpha,\beta]$.

The supremum-infimum gap $\beta - \alpha$ measures how much "room" is left in the intersection. When that room shrinks to nothing, the limiting set must collapse to a single point.

> [!cor] Uniqueness Under Vanishing Length
> If $I_n = [a_n,b_n]$ are nested and
> $$
> \inf_{n\in\mathbb{N}}(b_n - a_n) = 0 \qquad \bigl(\text{equivalently, } \lim_{n\to\infty}(b_n-a_n)=0\bigr),
> $$
> then the intersection is a singleton:
> $$
> \bigcap_{n=1}^{\infty} I_n = \{\xi\}, \quad \text{for a unique } \xi \in \mathbb{R}.
> $$

> [!note] Why vanishing length forces a single point
> If $\beta - \alpha > 0$, that gap itself would be a lower bound on $b_n - a_n$ for every $n$ — for example, $b_n - a_n \ge \beta - \alpha$ always holds — contradicting $\inf(b_n-a_n)=0$. So $\alpha = \beta$, and $[\alpha,\beta]$ collapses to the single point $\{\xi\}$.

---

## Sequences

### Definition

The nested-intervals construction naturally produced a sequence of endpoints $(a_n)$ and $(b_n)$. We now make the notion of "sequence" itself precise, as the central object of study for the rest of the course.

> [!def] Sequence
> A **sequence** of real numbers is a function
> $$
> X : \mathbb{N} \to \mathbb{R}, \qquad n \mapsto X(n) = x_n.
> $$
> Notation: $X$, $(x_n)$, or $\{x_n : n \in \mathbb{N}\}$.
>
> **Examples:**
> - $\bigl((-1)^n\bigr)$
> - $\bigl(\tfrac{1}{n}\bigr)$
> - $\bigl(\tfrac{1}{2n}\bigr)$
>
> Some sequences are defined recursively — for instance, the Fibonacci sequence:
> $$
> x_1 = 1, \quad x_2 = 1, \quad x_{n+2} = x_{n+1} + x_n \quad (n \in \mathbb{N}).
> $$

### Limit of a Sequence

#### Convergence

The central question about a sequence is whether its terms settle down near some fixed value as $n$ grows. The formal definition captures "settles down near" using the same $\varepsilon$-language that appeared in the Supremum Characterizations of Lecture 4.

> [!def] Convergence
> A sequence $(x_n)$ **converges** to $x \in \mathbb{R}$ if for every $\epsilon > 0$ there exists $N(\epsilon) \in \mathbb{N}$ such that for all $n \ge N(\epsilon)$,
> $$
> |x_n - x| < \epsilon.
> $$
> Equivalently, for all sufficiently large $n$,
> $$
> x - \epsilon < x_n < x + \epsilon,
> $$
> i.e. $x_n$ lies in the $\epsilon$-neighborhood $N_\epsilon(x) := (x-\epsilon, x+\epsilon)$.
>
> Notation: $\lim_{n\to\infty} x_n = x$, or $x_n \to x$ as $n \to \infty$. If a limit exists, the sequence **converges**; otherwise it **diverges**.

> [!case] Visualizing Convergence of $a_n = 1 + \frac{(-1)^n}{n}$
> ```tikz
> \begin{document}
>   \begin{tikzpicture}[xscale=1.2, yscale=2]
>     \draw[very thin, color=gray!30] (-0.2,-0.2) grid (10.5, 2.2);
>     \draw[->] (-0.2,0) -- (11,0) node[right] {$n$};
>     \draw[->] (0,-0.2) -- (0,2.5) node[above] {$a_n$};
>     \draw[thick, color=blue, dashed] (0,1) -- (11,1) node[right] {$L=1$};
>     \draw[thin, color=blue!50, dotted] (0,1.3) -- (11,1.3) node[right, font=\tiny] {$L+\epsilon$};
>     \draw[thin, color=blue!50, dotted] (0,0.7) -- (11,0.7) node[right, font=\tiny] {$L-\epsilon$};
>     \foreach \n in {1,...,10} {
>         \pgfmathsetmacro{\val}{1 + ((-1)^\n)/\n}
>         \filldraw[color=red] (\n, \val) circle (1.5pt);
>     }
>     \node[right, color=red] at (3, 2.2) {$a_n = 1 + \frac{(-1)^n}{n}$};
>     \draw[->, thick, color=black] (4, -0.1) -- (4, 0) node[below=5pt] {$N$};
>   \end{tikzpicture}
> \end{document}
> ```
> For a given $\epsilon > 0$, there exists $N(\epsilon)$ such that all $a_n$ with $n \ge N(\epsilon)$ lie in the band $(L-\epsilon, L+\epsilon)$. This illustrates $|a_n - L| < \epsilon$ for large $n$.

#### Uniqueness of Limits

Before computing any limits, it is worth confirming the definition behaves sensibly: a sequence cannot converge to two different values at once.

> [!thm] Limits Are Unique
> If $(x_n) \to L_1$ and $(x_n) \to L_2$, then $L_1 = L_2$.

> [!pf] Proof
> Suppose $L_1 \neq L_2$, and set $\epsilon = \tfrac12 |L_1 - L_2| > 0$. There exist $N_1, N_2$ such that $|x_n - L_1| < \epsilon$ for all $n \ge N_1$, and $|x_n - L_2| < \epsilon$ for all $n \ge N_2$. For $n \ge N := \max\{N_1, N_2\}$, the triangle inequality (Lecture 3) gives
> $$
> |L_1 - L_2| \le |L_1 - x_n| + |x_n - L_2| < \epsilon + \epsilon = |L_1 - L_2|,
> $$
> a contradiction. Hence $L_1 = L_2$.

### Examples of Convergence

The definition of convergence is existential in $N(\epsilon)$ but must hold for *every* $\epsilon$, so proving a limit typically means producing an explicit formula for $N(\epsilon)$ — almost always via the Archimedean property.

> [!pf] Example: Convergence of $\bigl(\tfrac{1}{n}\bigr)$
> Claim: $\displaystyle\lim_{n\to\infty} \frac{1}{n} = 0$.
>
> Let $\epsilon > 0$. By the Archimedean property, there exists $N(\epsilon) \in \mathbb{N}$ with $N(\epsilon) > \tfrac{1}{\epsilon}$. Then for all $n \ge N(\epsilon)$,
> $$
> \frac{1}{n} \le \frac{1}{N(\epsilon)} < \epsilon,
> $$
> i.e. $\bigl|\tfrac1n - 0\bigr| < \epsilon$. Therefore $\tfrac1n \to 0$.

A second example requires an algebraic trick — multiplying by the conjugate — to turn a difference of square roots into a form the Archimedean property can control.

> [!lem] Conjugate Trick
> For $a, b \ge 0$,
> $$
> \sqrt{a} - \sqrt{b} = \frac{(\sqrt{a}-\sqrt{b})(\sqrt{a}+\sqrt{b})}{\sqrt{a}+\sqrt{b}} = \frac{a-b}{\sqrt{a}+\sqrt{b}}.
> $$

> [!pf] Example: Convergence of $\bigl(\sqrt{n+1}-\sqrt{n}\bigr)$
> Claim: $\displaystyle\lim_{n\to\infty}\bigl(\sqrt{n+1}-\sqrt{n}\bigr) = 0$.
>
> Applying the Conjugate Trick with $a = n+1$, $b = n$:
> $$
> \sqrt{n+1}-\sqrt{n} = \frac{(n+1)-n}{\sqrt{n+1}+\sqrt{n}} = \frac{1}{\sqrt{n+1}+\sqrt{n}} \le \frac{1}{2\sqrt{n}}.
> $$
> Given $\epsilon > 0$, by the Archimedean property there exists $N(\epsilon) \in \mathbb{N}$ with $N(\epsilon) > \bigl(\tfrac{1}{2\epsilon}\bigr)^2$. Then for all $n \ge N(\epsilon)$,
> $$
> 0 \le \sqrt{n+1}-\sqrt{n} \le \frac{1}{2\sqrt{n}} < \epsilon,
> $$
> so the sequence converges to $0$.

### Divergence

Convergence is a "for every $\epsilon$" statement; negating it correctly means finding a *single* $\epsilon_0$ that repeatedly fails, no matter how far out in the sequence we look.

> [!def] Divergence
> A sequence $(x_n)$ **does not converge** to $x \in \mathbb{R}$ if there exists $\epsilon_0 > 0$ such that for every $N \in \mathbb{N}$ there exists $m \ge N$ with
> $$
> |x_m - x| \ge \epsilon_0.
> $$
> A sequence **diverges** (in $\mathbb{R}$) if there is no $x \in \mathbb{R}$ to which it converges.

### Tails of Sequences

Since convergence only cares about *eventual* behavior, discarding any finite number of initial terms should have no effect on whether — or to what — a sequence converges. The next definition and lemma make this precise.

> [!def] Tail of a Sequence
> For a sequence $X = (x_1, x_2, \dots)$ and $m \in \mathbb{N}$, the **$m$-tail** of $X$ is the sequence
> $$
> X_m := \{x_{m+n} : n \in \mathbb{N}\} = (x_{m+1}, x_{m+2}, \dots).
> $$

> [!lem] Tails Preserve Limits
> $X$ converges to $x$ if and only if $X_m$ converges to $x$ for any (equivalently, for some) $m \in \mathbb{N}$.

> [!pf] Proof
> ($\Rightarrow$) If $x_n \to x$, then for any $\epsilon > 0$ there exists $N(\epsilon)$ such that $|x_n - x| < \epsilon$ for all $n \ge N(\epsilon)$. For the tail, take $N'(\epsilon) := \max\{N(\epsilon), m\}$; then $|x_{m+n} - x| < \epsilon$ whenever $m + n \ge N'(\epsilon)$.
>
> ($\Leftarrow$) If $x_{m+n} \to x$, then for any $\epsilon > 0$ there exists $K(\epsilon)$ such that $|x_{m+n} - x| < \epsilon$ for all $n \ge K(\epsilon)$. Set $N(\epsilon) := m + K(\epsilon)$. Then for any $k \ge N(\epsilon)$, write $k = m+n$ with $n \ge K(\epsilon)$, so $|x_k - x| < \epsilon$. Therefore $x_n \to x$.

> [!imp] Why tails matter going forward
> This lemma is what justifies phrases like "for all sufficiently large $n$" throughout convergence proofs: it doesn't matter *which* tail you look at, or how many terms you throw away at the start — convergence and its limit are entirely tail properties. This will be used repeatedly once sequences are combined algebraically (sums, products, quotients) in later lectures.
