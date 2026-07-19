---
id: L015
aliases: ["Boundedness Theorem", "Bounded Function", "Min-Max Theorem", "Extreme Value Theorem", "Absolute Maximum", "Absolute Minimum"]
tags: []
---
# Continuous Functions on Intervals

## Concept Check

### Question 1: The Recursion $x_1 = \tfrac14,\ x_{n+1} = x_n^2 + \tfrac14$

We analyze this sequence two ways — first via Monotone Convergence (Lecture 8), then by checking whether the Contractive Sequence criterion (Lecture 12) also applies, which turns out to be instructive precisely because it *fails*.

#### Method 1: Monotone Convergence

**Step 1: The sequence is increasing.** First check the base case:
$$
x_2 = \left(\frac14\right)^2 + \frac14 = \frac{5}{16} > \frac14 = x_1.
$$
For the inductive step, suppose $x_k < x_{k+1}$. Then
$$
x_{k+2} - x_{k+1} = \left(x_{k+1}^2 + \frac14\right) - \left(x_k^2 + \frac14\right) = x_{k+1}^2 - x_k^2 = (x_{k+1}-x_k)(x_{k+1}+x_k).
$$
Since $x_{k+1} > x_k$ by the inductive hypothesis, and both terms are positive (shown in Step 2 below), this product is positive, so $x_{k+2} > x_{k+1}$. By induction, $(x_n)$ is increasing.

**Step 2: The sequence is bounded above by $\tfrac12$.** *Base case:* $x_1 = \tfrac14 < \tfrac12$. *Inductive step:* suppose $x_k < \tfrac12$. Then $x_k^2 < \tfrac14$, so
$$
x_{k+1} = x_k^2 + \frac14 < \frac14 + \frac14 = \frac12.
$$
By induction, $x_n < \tfrac12$ for all $n$.

**Step 3: Apply Monotone Convergence and solve for the limit.** Since $(x_n)$ is increasing and bounded above, it converges by the Monotone Convergence Theorem (Lecture 8). Let $x = \lim x_n$. Passing to the limit in the recursion,
$$
x = x^2 + \frac14 \quad\Longrightarrow\quad x^2 - x + \frac14 = 0 \quad\Longrightarrow\quad \left(x - \frac12\right)^2 = 0,
$$
so $x = \tfrac12$.

#### Method 2: Why the Contraction Approach Fails

It is tempting to try showing $(x_n)$ is contractive, following the template of Lecture 12. Expanding consecutive differences,
$$
|x_{n+1} - x_n| = \left|\left(x_n^2+\tfrac14\right) - \left(x_{n-1}^2+\tfrac14\right)\right| = |x_n^2 - x_{n-1}^2| = |x_n + x_{n-1}|\cdot|x_n - x_{n-1}|.
$$
This has the right *shape* for the contractive inequality $|x_{n+1}-x_n| \le c\,|x_n-x_{n-1}|$, with $c$ playing the role of $|x_n+x_{n-1}|$.

> [!imp] Why This Does Not Establish Contractiveness
> The contractive definition (Lecture 12) requires a single constant $c \in (0,1)$ that works for *every* $n$. Here the coefficient $|x_n+x_{n-1}|$ genuinely depends on $n$ — it is not a fixed number. Although Step 2 above shows $x_n < \tfrac12$ for all $n$, so $x_n + x_{n-1} < 1$ strictly, the sequence increases *toward* $\tfrac12$, meaning $x_n + x_{n-1} \to 1$ as $n\to\infty$. No fixed $c < 1$ can bound this ratio for all sufficiently large $n$, since the coefficients themselves approach $1$. Hence this sequence, despite converging, is **not** contractive in the technical sense — a useful reminder that boundedness of consecutive-difference ratios is not enough; contractiveness demands a ratio bounded *away* from $1$ by a fixed margin.

### Question 2: Submultiplicativity of Limsup for Positive Sequences

This result parallels the Subadditivity of Limsup proved in the previous lecture, with the sum replaced by a product — and the proof follows the identical tailwise strategy, now using that both sequences are positive to justify multiplying inequalities.

> [!thm] Submultiplicativity of Limsup
> Let $(a_n)$ and $(b_n)$ be bounded sequences of positive real numbers. Then
> $$
> \limsup_{n\to\infty}(a_nb_n) \;\le\; \left(\limsup_{n\to\infty} a_n\right)\left(\limsup_{n\to\infty} b_n\right).
> $$

> [!pf] Proof
> As in the previous lecture, write the [[Limit Superior|limsups]] as limits of tail suprema:
> $$
> \limsup a_n = \lim_{n\to\infty} s_n^a, \quad s_n^a := \sup\{a_k : k\ge n\}; \qquad
> \limsup b_n = \lim_{n\to\infty} s_n^b, \quad s_n^b := \sup\{b_k : k\ge n\};
> $$
> $$
> \limsup(a_nb_n) = \lim_{n\to\infty} s_n^{ab}, \quad s_n^{ab} := \sup\{a_kb_k : k\ge n\}.
> $$
> **Key pointwise inequality.** Fix $n$. For any $k \ge n$, $a_k \le s_n^a$ and $b_k \le s_n^b$. Since $a_k, b_k > 0$, multiplying these inequalities preserves them:
> $$
> a_kb_k \le s_n^a \cdot s_n^b \qquad \text{for every } k \ge n.
> $$
> So $s_n^a \cdot s_n^b$ is an upper bound for $\{a_kb_k : k\ge n\}$; taking the supremum of the left side over $k \ge n$ gives
> $$
> s_n^{ab} \le s_n^a \cdot s_n^b \qquad \text{for every } n.
> $$
> **Passing to the limit.** Both $(s_n^a)$ and $(s_n^b)$ converge (they are nonincreasing and bounded below, since $(a_n),(b_n)$ are bounded — Lecture 11), so the Product Limit Law (Lecture 7) applies:
> $$
> \lim_{n\to\infty} s_n^{ab} \le \lim_{n\to\infty}\left(s_n^a \cdot s_n^b\right) = \left(\lim_{n\to\infty} s_n^a\right)\left(\lim_{n\to\infty} s_n^b\right),
> $$
> i.e. $\limsup(a_nb_n) \le (\limsup a_n)(\limsup b_n)$.

> [!note] Why positivity matters here
> Multiplying an inequality $a_k \le s_n^a$ by $b_k$ only preserves the direction when $b_k \ge 0$ — this is exactly the Multiplication and Order theorem from Lecture 3. Without the positivity hypothesis, the argument breaks down at the step $a_kb_k \le s_n^a\cdot s_n^b$, and indeed the inequality can fail for sequences with mixed signs.

### Question 3: A Sequence with Distinct Subsequential Limits

This example applies the Divergence Criteria of Lecture 9 (two subsequences with different limits $\Rightarrow$ divergence), reformulated using the limsup/liminf language of Lectures 11 and 14.

Consider
$$
x_n = 1 + (-1)^n \frac{n^2}{n^2-n+1}.
$$

> [!pf] Even and Odd Subsequences
> **Even indices** ($n=2m$): since $(-1)^{2m}=1$,
> $$
> x_{2m} = 1 + \frac{(2m)^2}{(2m)^2-2m+1} \xrightarrow[m\to\infty]{} 1 + 1 = 2,
> $$
> since $\dfrac{(2m)^2}{(2m)^2-2m+1} \to 1$ by the Limit Comparison ideas of Lecture 13 (both numerator and denominator are dominated by their leading term $4m^2$).
>
> **Odd indices** ($n=2m+1$): since $(-1)^{2m+1}=-1$,
> $$
> x_{2m+1} = 1 - \frac{(2m+1)^2}{(2m+1)^2-(2m+1)+1} \xrightarrow[m\to\infty]{} 1 - 1 = 0,
> $$
> by the same reasoning applied to the odd-indexed subsequence.
>
> Since these two subsequences converge to different limits ($2 \ne 0$), the sequence $(x_n)$ does not converge, by the Divergence Criteria of Lecture 9. Moreover,
> $$
> \limsup_{n\to\infty} x_n = 2, \qquad \liminf_{n\to\infty} x_n = 0,
> $$
> consistent with the Convergence Criterion of Lecture 10: convergence would require these two quantities to agree.

---

## Continuous Functions on Intervals

We now turn to a new topic: how continuity interacts with closed, bounded intervals. The two theorems below — the Boundedness Theorem and the Min-Max Theorem — both work by the same underlying mechanism: extract a sequence approaching the "bad" behavior (unboundedness, or the supremum), use Bolzano–Weierstrass (Lecture 10) to pass to a convergent subsequence, then use continuity to transport that convergence to the function values.

### Bounded and Unbounded Functions

> [!def] Bounded Function
> A function $f : A \to \mathbb{R}$ is **bounded** on $A$ if there exists $M > 0$ such that
> $$
> |f(x)| \le M \qquad \text{for all } x \in A.
> $$

Just as with sequences (Lecture 7), it is useful to phrase the negation sequentially rather than via the raw $\forall M$ statement.

> [!def] Unbounded Function
> A function $f : A \to \mathbb{R}$ is **not bounded** on $A$ if there exists a sequence $(x_n) \subset A$ such that
> $$
> \lim_{n\to\infty} |f(x_n)| = \infty.
> $$

### The Boundedness Theorem

The theorem below is the reason closed, bounded intervals are special: continuity alone is not enough to guarantee boundedness on an arbitrary set (as the examples following the proof show), but it *is* enough on $[a,b]$.

> [!thm] Boundedness Theorem
> Let $I = [a,b]$ be a closed and bounded interval, and let $f : I \to \mathbb{R}$ be continuous on $I$. Then $f$ is bounded on $I$.

> [!pf] Proof
> Suppose, toward a contradiction, that $f$ is *not* bounded on $I$. Then by the definition above, there exists a sequence $(x_n) \subset I$ with $\lim_{n\to\infty}|f(x_n)| = \infty$.
>
> Since $I$ is bounded and $(x_n) \subset I$, the sequence $(x_n)$ is itself bounded. By the Bolzano–Weierstrass Theorem (Lecture 10), there exists a convergent subsequence $(x_{n_k})$ with $x_{n_k} \to x^*$ for some $x^*$. Since $I$ is closed, $x^* \in I$ (a closed interval contains all its limit points, by the Interval Classification of Lecture 5).
>
> Since $f$ is continuous on $I$ and $x^* \in I$, $f$ is continuous at $x^*$. By the sequential criterion for continuity, $x_{n_k} \to x^*$ implies
> $$
> \lim_{k\to\infty} f(x_{n_k}) = f(x^*).
> $$
> But $(x_{n_k})$ is a subsequence of $(x_n)$, and $|f(x_n)| \to \infty$ forces $|f(x_{n_k})| \to \infty$ as well (a subsequence of a properly divergent sequence is properly divergent — Lecture 13). This contradicts $f(x_{n_k}) \to f(x^*) \in \mathbb{R}$, a finite value.
>
> Hence $f$ must be bounded on $I$.

> [!example] Why Every Hypothesis Is Necessary
> Each of the following shows the Boundedness Theorem fails if one hypothesis is dropped:
> - $f(x) = 1/x$ on $(0,1]$: continuous, but the interval is not closed (missing $0$), and $f$ is unbounded near $0$.
> - $f(x) = x$ on $[0,\infty)$: continuous, but the interval is not bounded, and $f$ is unbounded.
> - $f(x) = 1/|x|$ for $x \in [-1,1]\setminus\{0\}$, with $f(0) = 0$: defined on a closed, bounded interval, but $f$ is **not continuous at $0$**, and $f$ is unbounded near $0$.
>
> In each case, exactly one hypothesis of the theorem is missing, and boundedness fails as a result — confirming that closedness, boundedness of the interval, *and* continuity are all essential.

### Absolute Maxima and Minima

Boundedness alone only guarantees $f(I)$ has a supremum and infimum (by completeness) — it does not guarantee these values are actually *attained* by $f$ at some point of $I$. The next definition isolates this stronger property.

> [!def] Absolute Maximum and Minimum
> Let $f : A \to \mathbb{R}$. Then $f$ has an **absolute maximum** on $A$ if there exists $x^* \in A$ such that
> $$
> f(x) \le f(x^*) \qquad \text{for all } x \in A,
> $$
> and an **absolute minimum** on $A$ if there exists $x_* \in A$ such that
> $$
> f(x) \ge f(x_*) \qquad \text{for all } x \in A.
> $$

> [!cor] Relation to Supremum and Infimum
> These conditions say exactly that
> $$
> f(x^*) = \sup f(A), \qquad f(x_*) = \inf f(A).
> $$
> In particular, having an absolute maximum/minimum is strictly stronger than $f(A)$ merely having a supremum/infimum in $\mathbb{R}$ (guaranteed by completeness whenever $f(A)$ is bounded) — it additionally requires that value to be *achieved* by some point of the domain, rather than merely approached.

### The Min-Max Theorem

Combining the Boundedness Theorem with the "subsequence approaching the supremum" construction from the previous lecture's quiz review, we now show that continuous functions on closed, bounded intervals do attain both an absolute maximum and minimum.

> [!thm] Min-Max Theorem
> Let $I = [a,b]$ be a closed, bounded interval and let $f : I \to \mathbb{R}$ be continuous on $I$. Then $f$ has an absolute maximum and an absolute minimum on $I$.

> [!pf] Proof
> By the Boundedness Theorem, $f(I)$ is bounded. By completeness (Lecture 3–4), $\sup f(I)$ and $\inf f(I)$ exist in $\mathbb{R}$. We show the supremum is attained; the infimum follows by the identical argument applied to $-f$.
>
> **Constructing an approximating sequence.** For each $n \in \mathbb{N}$, since $\sup f(I) - \tfrac1n$ is not an upper bound of $f(I)$ (Supremum Characterization, Lecture 4), there exists $x_n \in I$ with
> $$
> \sup f(I) - \frac1n \le f(x_n) \le \sup f(I).
> $$
> By the Squeeze Theorem, $\lim_{n\to\infty} f(x_n) = \sup f(I)$ — this is exactly the "subsequence approaching the supremum" construction from the previous lecture, applied here to the values $f(x_n)$ rather than to a sequence directly.
>
> **Extracting a convergent subsequence of the domain points.** Since $(x_n) \subset I$ and $I$ is bounded, Bolzano–Weierstrass gives a subsequence $(x_{n_k})$ with $x_{n_k} \to x^*$ for some $x^*$; since $I$ is closed, $x^* \in I$.
>
> **Transporting the limit via continuity.** By the sequential criterion for continuity, $f(x_{n_k}) \to f(x^*)$ as $k \to \infty$. But $(f(x_{n_k}))$ is a subsequence of $(f(x_n))$, which converges to $\sup f(I)$ — so by the Subsequence Theorem (Lecture 9), $(f(x_{n_k}))$ must converge to the *same* limit:
> $$
> f(x^*) = \lim_{k\to\infty} f(x_{n_k}) = \sup f(I).
> $$
> Hence $x^* \in I$ is a point at which $f$ attains its supremum, so $f$ has an absolute maximum at $x^*$.

> [!imp] The shared architecture of both theorems
> Both the Boundedness Theorem and the Min-Max Theorem follow the exact same three-step template: (1) construct a sequence in $I$ witnessing the extreme behavior (unboundedness, or approach to the supremum), (2) invoke Bolzano–Weierstrass to extract a convergent subsequence landing inside $I$ — using closedness — and (3) invoke sequential continuity to transport that convergence to the function values, producing either a contradiction or the desired maximum. This is the standard method for proving *existence* results about continuous functions on closed, bounded intervals, and it will reappear when studying uniform continuity and the Intermediate Value Theorem.
