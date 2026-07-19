---
id: L013
aliases: []
tags: []
---
# p-Series, Proper Divergence, and Limits of Functions

## p-Series Partial Sums

Lecture 12 showed the harmonic series diverges by proving its partial sums fail to be Cauchy. This raises a natural question: what happens if we weaken each term from $1/k$ to $1/k^p$? The answer turns out to hinge entirely on whether $p > 1$ or $p \le 1$.

> [!note] Recall: The Harmonic Series Diverges
> For the harmonic series partial sums
> $$
> x_n = \sum_{k=1}^n \frac1k,
> $$
> we showed in Lecture 12 (via the Cauchy criterion) that $x_n \to \infty$ — the series diverges.

> [!thm] p-Series Test (Partial Sums)
> For $p > 1$, the sequence of partial sums
> $$
> x_n(p) = \sum_{k=1}^n \frac{1}{k^p}
> $$
> is convergent. For $p \le 1$, it is divergent.

We give two independent proofs of convergence for $p>1$: one using the Monotone Convergence Theorem (Lecture 8) together with an integral bound, and one using the Cauchy criterion (Lecture 12) directly. Comparing them highlights why the Cauchy approach demands more care.

### Proof 1: Integral Comparison + Monotone Convergence

> [!pf] Proof
> **Monotonicity.** Since every term $1/k^p > 0$, the partial sums $x_n(p)$ are increasing.
>
> **Boundedness.** For the decreasing function $f(x) = x^{-p}$ with $p>1$, comparing the sum to an integral gives
> $$
> \sum_{k=1}^n \frac{1}{k^p} \le \frac{1}{1^p} + \int_1^n \frac{dx}{x^p} \le 1 + \int_1^\infty \frac{dx}{x^p}.
> $$
> Computing the improper integral,
> $$
> \int_1^\infty x^{-p}\,dx = \left[\frac{x^{1-p}}{1-p}\right]_1^\infty = \frac{1}{p-1}
> $$
> (finite precisely because $p > 1$, so $x^{1-p} \to 0$ as $x\to\infty$). Hence $x_n(p) \le 1 + \dfrac{1}{p-1}$, so $(x_n(p))$ is bounded above.
>
> By the Monotone Convergence Theorem (Lecture 8), an increasing sequence bounded above converges.

### Proof 2: Cauchy Criterion via Integral Tail Bound

A tempting shortcut for verifying the Cauchy condition directly is to bound the tail sum by its largest term times the number of terms. This fails, and understanding *why* motivates the correct approach.

> [!?] Why the Naive Bound Fails
> A tempting but incorrect step is
> $$
> \sum_{k=m+1}^n \frac{1}{k^p} \le \left(\frac{1}{(m+3)^p}\right)\cdot m.
> $$
> This fails for two reasons:
> - The number of terms in the sum is $n-m$, not $m$ — and it depends on $n$, which is exactly the dependence we need to eliminate for a Cauchy bound.
> - Since $1/k^p$ is decreasing, $\dfrac{1}{(m+3)^p}$ is *smaller* than most terms in the sum, so multiplying it by a term count *underestimates* the sum rather than bounding it from above. A valid upper bound for a decreasing sequence must instead replace each term by an earlier, larger one — but doing so naively still leaves a factor of $(n-m)$ depending on $n$.
>
> The correct fix is to bound the tail sum by an integral whose value depends only on $m$, not on $n$ — exactly the technique from Proof 1, now applied to a tail rather than the whole sum.

> [!pf] Proof (Cauchy)
> For $m < n$,
> $$
> |x_n(p) - x_m(p)| = \sum_{k=m+1}^n \frac{1}{k^p} \le \int_m^n \frac{dx}{x^p} \le \int_m^\infty \frac{dx}{x^p} = \frac{m^{1-p}}{p-1}.
> $$
> Given $\epsilon > 0$, choose $M$ so that $\dfrac{M^{1-p}}{p-1} < \epsilon$ — possible since $p > 1$ makes $m^{1-p} \to 0$ as $m \to \infty$. Then for all $m \ge M$ and $n > m$, $|x_n(p) - x_m(p)| < \epsilon$. Thus $(x_n(p))$ is Cauchy, and by the Cauchy Convergence Criterion (Lecture 12), it converges.

### Monotonicity in the Exponent

Having settled convergence for $p>1$ and divergence for $p\le 1$, it is worth noting how the partial sums themselves compare across different exponents — term by term, a smaller exponent always produces a larger sum.

> [!lem] Partial-Sum Ordering in $p$
> If $0 < p < q$, then for every $n$,
> $$
> \sum_{k=1}^n \frac{1}{k^p} \ge \sum_{k=1}^n \frac{1}{k^q}.
> $$
> In particular,
> $$
> \sum_{k=1}^n \frac{1}{k^{p<1}} \ge \sum_{k=1}^n \frac1k \ge \sum_{k=1}^n \frac{1}{k^{p>1}}.
> $$

> [!note] What this comparison does and doesn't tell us
> This ordering alone does not prove convergence or divergence — a sequence can be termwise larger than a divergent one and still diverge, or termwise smaller than a convergent one and still converge in general. Its value here is calibration: it confirms that $p=1$ sits exactly at the boundary suggested by the p-Series Test, with every $p<1$ case dominating the harmonic series (and hence also diverging) and every $p>1$ case dominated by it.

---

## Properly Divergent Sequences

Until now, "divergent" has simply meant "not convergent" — a catch-all category including oscillation, unboundedness, and more. We now isolate a well-behaved kind of divergence: sequences that grow (or shrink) without bound in a definite direction.

> [!imp] Monotonicity vs. "Tending to Infinity"
> A sequence may tend to $+\infty$ without being monotone. For example, $x_n = n + (-1)^n$ is not monotone (it alternately overshoots and undershoots), yet $\lim_{n\to\infty} x_n = \infty$.

### Definitions

> [!def] Proper Divergence
> Let $(x_n)$ be a real sequence.
> - $x_n \to \infty$ if for every $\alpha > 0$ there exists $N$ such that $n \ge N \implies x_n > \alpha$.
> - $x_n \to -\infty$ if $-x_n \to \infty$.
> - $(x_n)$ is **properly divergent** if $x_n \to \infty$ or $x_n \to -\infty$.

### Example: Exponential Growth

> [!thm] Exponential Sequences Diverge
> If $c > 1$, then $c^n \to \infty$.

This is the natural counterpart to the decaying geometric sequence result of Lecture 9 ($0 < b < 1 \implies b^n \to 0$); here the base exceeds $1$ instead, and Bernoulli's inequality supplies the needed lower bound.

> [!pf] Proof
> Write $c = 1+a$ with $a > 0$. By Bernoulli's inequality, $(1+a)^n \ge 1 + na > na$. Given any $\alpha > 0$, choose $n > \alpha/a$ (Archimedean property) to get
> $$
> c^n > (1+a)^n > na > \alpha.
> $$

> [!cor] Reciprocal Tends to Zero
> If $x_n \to \infty$ or $x_n \to -\infty$, and $x_n \neq 0$ eventually, then $\dfrac{1}{x_n} \to 0$.
>
> The converse need not hold: $x_n = (-1)^n n$ satisfies $1/x_n \to 0$ but is not properly divergent — it oscillates without bound rather than heading consistently toward $+\infty$ or $-\infty$.

### Divergence Tests

The exponential example above worked directly from the definition. The next three theorems give more efficient tools: reducing proper divergence to boundedness for monotone sequences, and comparing sequences against ones already known to diverge.

> [!thm] Divergence of Monotone Sequences
> A monotone sequence is properly divergent if and only if it is unbounded.

> [!pf] Proof
> If $(x_n)$ is increasing and unbounded, then for any $\alpha$ there exists $n$ with $x_n > \alpha$; monotonicity then gives $x_k \ge x_n > \alpha$ for all $k \ge n$, so $x_k \to \infty$. If $(x_n)$ is decreasing and unbounded below, symmetrically $x_k \to -\infty$.
>
> Conversely, if a monotone sequence tends to $\pm\infty$, it is immediate from the definition that it cannot be bounded.

> [!note] The other side of the Monotone Convergence Theorem
> This theorem completes the picture from Lecture 8: a monotone sequence either converges (if bounded) or is properly divergent (if unbounded) — there is no third possibility, unlike for general sequences, which can oscillate without any limiting behavior at all.

> [!thm] Direct Comparison (Divergent Form)
> Suppose $x_n \le y_n$ for all sufficiently large $n$.
> - If $x_n \to \infty$, then $y_n \to \infty$.
> - If $y_n \to -\infty$, then $x_n \to -\infty$.

> [!pf] Proof
> Fix $\alpha > 0$. If $x_n \to \infty$, then for large $n$, $x_n > \alpha$, so $y_n \ge x_n > \alpha$ as well, giving $y_n \to \infty$. The second case follows the same way after negating.

> [!thm] Limit Comparison (Divergent Form)
> If $\displaystyle\lim_{n\to\infty} \frac{x_n}{y_n} = L$ with $L > 0$, then $x_n \to \infty$ if and only if $y_n \to \infty$ (and similarly for $-\infty$, when signs are consistent).

> [!pf] Proof
> Take $\epsilon = L/2$ in the definition of the limit of $x_n/y_n$: there exists $N$ such that for $n \ge N$,
> $$
> \frac{L}{2} < \frac{x_n}{y_n} < \frac{3L}{2}.
> $$
> Multiplying through by $y_n$ (assuming $y_n>0$ eventually, which the ratio's convergence to $L>0$ forces) gives $\dfrac{L}{2}y_n < x_n < \dfrac{3L}{2}y_n$. If $y_n \to \infty$, the left inequality forces $x_n \to \infty$ by Direct Comparison. If $x_n \to \infty$, the right inequality forces $y_n \to \infty$ the same way.

---

## Limits of Functions

We now shift from sequences to functions, defining what it means for $f(x)$ to approach a limit as $x$ approaches a point $c$. The definition will closely mirror the $\varepsilon$–$N$ definition of sequential convergence, with $\delta$ playing the role that $N$ played before — but it first requires identifying exactly *which* points $c$ a limit can sensibly be defined at.

### Domain and Cluster Points

Consider $f$ defined on
$$
A = (0,\infty) \cup \{-1\}, \qquad f(x) = \begin{cases} 1/x, & x > 0, \\ 1, & x = -1. \end{cases}
$$

> [!?] Can We Define $\lim_{x\to -1/2} f(x)$?
> No. The point $c = -\tfrac12$ is not approached by any other points of the domain $A$ — nothing in $A$ lies arbitrarily close to $-\tfrac12$ besides possibly $-\tfrac12$ itself, which isn't even in $A$. Since no sequence of domain points other than $c$ can approach $c$, "the limit at $c$" has no meaningful content here.

This motivates isolating exactly the points where a limit *can* be meaningfully defined: points that domain elements accumulate near.

> [!def] Cluster Point
> Let $A \subseteq \mathbb{R}$. A point $c \in \mathbb{R}$ is a **cluster point** of $A$ if
> $$
> \forall\, \delta > 0,\ \exists\, x \in A \setminus \{c\} \text{ such that } |x - c| < \delta.
> $$

> [!example] Cluster Points of Various Sets
> - A finite set has no cluster points.
> - $A = \{n : n \in \mathbb{N}\}$ has no cluster points in $\mathbb{R}$ — consecutive integers never get arbitrarily close together.
> - $A = \{1/n : n \in \mathbb{N}\}$ has a single cluster point, $0$ (this is exactly the harmonic sequence from Lecture 4, whose infimum was shown to be $0$).
> - $A = (0,1)$ has cluster points filling $[0,1]$ — including the endpoints, even though they aren't in $A$ itself.
> - For $A = (0,\infty) \cup \{-1\}$ (our example above), the cluster points are $[0,\infty)$; in particular $-1$ is *isolated* and is not a cluster point, matching the earlier observation.

Just as with subsequences (Lecture 9), cluster points admit a convenient sequential characterization — often easier to verify than the raw $\delta$-definition.

> [!thm] Sequential Characterization of Cluster Points
> A point $c \in \mathbb{R}$ is a cluster point of $A \subseteq \mathbb{R}$ if and only if there exists a sequence $(a_n) \subset A \setminus \{c\}$ with $a_n \to c$.

> [!pf] Proof Sketch
> If $c$ is a cluster point, apply the definition with $\delta = 1/n$ for each $n$ to choose $a_n \in A\setminus\{c\}$ with $|a_n - c| < 1/n$; then $a_n \to c$ by the Archimedean property.
>
> Conversely, if such a sequence exists, then for any $\delta>0$, convergence of $(a_n)$ guarantees infinitely many terms within $\delta$ of $c$, so every $\delta$-neighborhood of $c$ meets $A\setminus\{c\}$.

### Limit of a Function at a Cluster Point

With cluster points identified as the legitimate domain for taking limits, we now define the limit of a function itself — structurally identical to sequential convergence, with $\delta$ controlling closeness in $x$ exactly as $N$ controlled largeness in $n$.

> [!def] Limit at a Cluster Point
> Let $A \subseteq \mathbb{R}$ and let $c$ be a cluster point of $A$. A number $L$ is the **limit** of $f: A \to \mathbb{R}$ at $c$ if
> $$
> \forall\, \epsilon > 0,\ \exists\, \delta > 0 \text{ such that } \forall\, x \in A,\ 0 < |x-c| < \delta \implies |f(x) - L| < \epsilon.
> $$
> We write $\lim_{x\to c} f(x) = L$.

> [!note] Why $0 < |x-c|$, not $|x-c|$
> The condition $0 < |x-c|$ deliberately excludes $x = c$ itself — the limit only concerns how $f$ behaves *near* $c$, not the value $f(c)$ (which may not even be defined). This is why the definition requires $c$ to be a cluster point of $A$: it guarantees points $x \ne c$ with $x \in A$ exist arbitrarily close to $c$, so the condition $0<|x-c|<\delta$ is never vacuous.

### Example: $\lim_{x\to c} \frac1x = \frac1c$ for $c \neq 0$

This example mirrors the reciprocal limit law for sequences (Lecture 8, Exercise 5) almost step for step — the key algebraic manipulation, bounding $|x|$ away from $0$, is identical.

> [!thm] Continuity of $x \mapsto 1/x$ Away from $0$
> If $c \neq 0$ and $A \subseteq \mathbb{R}\setminus\{0\}$ has $c$ as a cluster point, then
> $$
> \lim_{x\to c} \frac1x = \frac1c.
> $$

> [!pf] Proof
> For $x \neq 0$,
> $$
> \left|\frac1x - \frac1c\right| = \frac{|x-c|}{|xc|}.
> $$
> Choose
> $$
> \delta = \min\left\{\frac{|c|}{2},\ \frac{|c|^2\epsilon}{2}\right\}.
> $$
> If $0 < |x-c| < \delta \le |c|/2$, then by the reverse triangle inequality, $|x| \ge |c| - |x-c| \ge |c|/2$. Hence
> $$
> \left|\frac1x-\frac1c\right| = \frac{|x-c|}{|xc|} \le \frac{|x-c|}{(|c|/2)|c|} = \frac{2}{|c|^2}|x-c| < \frac{2}{|c|^2}\cdot\frac{|c|^2\epsilon}{2} = \epsilon.
> $$
> Therefore $\lim_{x\to c} 1/x = 1/c$.
