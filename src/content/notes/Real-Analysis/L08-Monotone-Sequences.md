---
id: L08
aliases: []
tags: []
---
# Algebraic Facts, Limit Laws in Practice, and Monotone Convergence

## Bounded Sequences

Recall from the previous lecture that boundedness is a basic structural property every convergent sequence must satisfy. We restate the definition here since it plays a supporting role throughout this lecture, particularly in the product and quotient limit laws below.

> [!def] Bounded Sequence
> A sequence $X = (x_n)$ of real numbers is **bounded** if there exists $M > 0$ such that $|x_n| \le M$ for all $n \in \mathbb{N}$.

---

## Algebraic Facts and Limit Laws

Before returning to sequences, it is worth pausing to nail down some algebraic facts that are often used without proof — sign rules and exponent comparisons — since these same techniques (multiplying by inverses, bounding via cases) reappear immediately afterward in the limit law proofs.

> [!?] Exercise 1. Prove: $(-1)\cdot(-1) = 1$.

> [!pf] Proof
> Using distributivity and $1 + (-1) = 0$:
> $$
> 0 = 0\cdot(-1) = \bigl(1+(-1)\bigr)\cdot(-1) = 1\cdot(-1) + (-1)\cdot(-1).
> $$
> Since $1\cdot(-1) = -1$, this reads $0 = -1 + (-1)\cdot(-1)$, so $(-1)\cdot(-1) = 1$.

> [!?] Exercise 2. If $a \in \mathbb{R}\setminus\{0\}$, prove $\dfrac{1}{-a} = -\left(\dfrac{1}{a}\right)$.

> [!pf] Proof
> Let $b = -\left(\dfrac{1}{a}\right)$. Then
> $$
> (-a)\cdot b = (-a)\cdot\left(-\frac{1}{a}\right) = a\cdot\frac{1}{a} = 1,
> $$
> using Exercise 1's sign rule. Since multiplicative inverses are unique, $b$ must equal $\dfrac{1}{-a}$.

The next exercise establishes that exponentiation by an integer preserves order exactly when the base exceeds $1$ — a fact that will later justify comparing rates of growth.

> [!?] Exercise 3. If $C > 1$ and $m,n \in \mathbb{Z}$, prove
> $$
> C^m > C^n \quad\Longleftrightarrow\quad m > n.
> $$

> [!lem] Auxiliary Lemma
> For $C > 1$ and $k \in \mathbb{Z}$:
> - $k > 0 \implies C^k > 1$,
> - $k = 0 \implies C^k = 1$,
> - $k < 0 \implies C^k < 1$.

> [!pf] Proof of Lemma
> If $k \ge 1$, then $C^k = C \cdot C^{k-1} > \cdots > C > 1$ by induction. If $k = 0$, $C^0 = 1$. If $k < 0$, write $k = -\ell$ with $\ell > 0$; then $C^k = 1/C^\ell < 1$, since $C^\ell > 1$.

> [!pf] Proof of Exercise 3
> If $m > n$, let $k = m - n > 0$. Then $C^m = C^{n+k} = C^n \cdot C^k > C^n \cdot 1 = C^n$ by the lemma.
>
> Conversely, if $C^m > C^n$, divide both sides by $C^n > 0$ to get $C^{m-n} > 1$. By the lemma (contrapositive of the third case), this forces $m - n > 0$, i.e. $m > n$.

We now return to sequences and prove the product and reciprocal limit laws stated without proof in the previous lecture. Both follow the same $\varepsilon$-splitting strategy used for the addition law, but require the boundedness of convergent sequences to control an extra factor that addition didn't produce.

> [!?] Exercise 4. Let $x_n \to x$ and $y_n \to y$. Prove $\displaystyle\lim_{n\to\infty}(x_ny_n) = xy$.

> [!pf] Proof
> The key is to insert and subtract a cross term, splitting the error into two pieces that each involve only one sequence's convergence:
> $$
> |x_ny_n - xy| = \bigl|x_n(y_n-y) + y(x_n-x)\bigr| \le |x_n|\,|y_n-y| + |y|\,|x_n-x|.
> $$
> Since $x_n \to x$, it is bounded (by the theorem from the previous lecture): there exists $N_1$ such that for $n \ge N_1$, $|x_n - x| < 1$, hence $|x_n| \le |x|+1 =: M$.
>
> Given $\epsilon > 0$, choose:
> - $N_2$ so that for $n \ge N_2$, $|y_n - y| < \dfrac{\epsilon}{2M}$,
> - $N_3$ so that for $n \ge N_3$, $|x_n - x| < \dfrac{\epsilon}{2(|y|+1)}$.
>
> Then for all $n \ge N := \max\{N_1,N_2,N_3\}$,
> $$
> |x_ny_n - xy| \le M\cdot\frac{\epsilon}{2M} + |y|\cdot\frac{\epsilon}{2(|y|+1)} \le \frac{\epsilon}{2}+\frac{\epsilon}{2} = \epsilon.
> $$
> Hence $x_ny_n \to xy$.

> [!case] Specializing when $y = 0$
> If $y = 0$, the same estimate simplifies to $|x_ny_n| \le |x_n|\cdot|y_n|$. Since $(x_n)$ is bounded, say $|x_n|\le M$, and $y_n \to 0$, choose $N$ so that $|y_n| < \epsilon/M$ for $n \ge N$, giving $|x_ny_n| < \epsilon$ directly — the general argument above reduces to this simpler case.

> [!?] Exercise 5. Suppose $y_n \to y$ with $y \neq 0$. Prove $\displaystyle\lim_{n\to\infty}\frac{1}{y_n} = \frac{1}{y}$.

> [!pf] Proof
> This makes precise the "eventually nonzero" claim flagged in the previous lecture's note on reciprocals. Since $y \neq 0$, choose $N_1$ so that $|y_n - y| < \dfrac{|y|}{2}$ for $n \ge N_1$. By the reverse triangle inequality (Lecture 3),
> $$
> |y_n| \ge \bigl|\,|y| - |y_n - y|\,\bigr| \ge |y| - \frac{|y|}{2} = \frac{|y|}{2}.
> $$
> Hence for $n \ge N_1$,
> $$
> \left|\frac{1}{y_n}-\frac{1}{y}\right| = \frac{|y_n-y|}{|y_n||y|} \le \frac{2}{|y|^2}\,|y_n-y|.
> $$
> Given $\epsilon > 0$, choose $N_2$ so that $|y_n - y| < \dfrac{|y|^2}{2}\epsilon$ for $n \ge N_2$. Then for $n \ge N := \max\{N_1,N_2\}$,
> $$
> \left|\frac{1}{y_n}-\frac{1}{y}\right| \le \frac{2}{|y|^2}\cdot\frac{|y|^2}{2}\epsilon = \epsilon.
> $$
> Therefore $\dfrac{1}{y_n} \to \dfrac{1}{y}$.

---

## Monotone Sequences

The limit laws above let us compute limits once we already suspect what they are. But how do we know a limit exists in the first place, without guessing it? For an important class of sequences — those that move consistently in one direction — boundedness alone turns out to be enough to guarantee convergence, echoing the way boundedness and completeness combined earlier to produce suprema.

> [!def] Monotone Sequence
> Let $X = (x_n)$ be a sequence.
> - $X$ is **increasing** if $x_1 \le x_2 \le \cdots \le x_n \le \cdots$.
> - $X$ is **decreasing** if $x_1 \ge x_2 \ge \cdots \ge x_n \ge \cdots$.
> - $X$ is **monotone** if it is either increasing or decreasing.

> [!thm] Monotone Convergence Theorem
> Let $X = (x_n)$ be a monotone sequence.
> - If $X$ is increasing and bounded above, then $\displaystyle\lim_{n\to\infty} x_n = \sup\{x_n : n\in\mathbb{N}\}$.
> - If $X$ is decreasing and bounded below, then $\displaystyle\lim_{n\to\infty} x_n = \inf\{x_n : n\in\mathbb{N}\}$.
>
> Moreover, since any convergent sequence is bounded (Lecture 7), a monotone sequence converges **if and only if** it is bounded.

The proof is a direct translation of the Supremum Characterization from Lecture 4 into $\varepsilon$–$N$ language: the supremum is an upper bound (giving the upper half of the $\varepsilon$-inequality), and it is the *least* upper bound, so something must eventually get within $\varepsilon$ of it — and monotonicity carries that closeness forward to all later terms.

> [!pf] Increasing, Bounded Above ⇒ Limit Is the Supremum
> Let $x = \sup\{x_n : n\in\mathbb{N}\}$. Since $x$ is an upper bound, $x_n \le x < x+\epsilon$ for all $n$. Since $x - \epsilon$ is not an upper bound (Supremum Characterization, Lecture 4), there exists $N$ with $x_N > x-\epsilon$. By monotonicity, for all $n \ge N$:
> $$
> x-\epsilon < x_N \le x_n \le x < x+\epsilon,
> $$
> i.e. $|x_n - x| < \epsilon$. Hence $x_n \to x$.

The decreasing case follows immediately by flipping signs, turning it into an instance of the increasing case just proved — another example of the "reduce to a previous case via $-1$" pattern seen with $\inf$ and $\sup$ in Lecture 4.

> [!pf] Decreasing, Bounded Below ⇒ Limit Is the Infimum
> Let $y_n := -x_n$. Then $(y_n)$ is increasing and bounded above, so by the previous case,
> $$
> \lim_{n\to\infty} y_n = \sup\{y_n : n\in\mathbb{N}\}.
> $$
> Multiplying by $-1$ (using the Scalar Multiplication limit law from Lecture 7) gives
> $$
> \lim_{n\to\infty} x_n = \inf\{x_n : n\in\mathbb{N}\}.
> $$

### Example: A Recursive Monotone Sequence

We now see the Monotone Convergence Theorem in action on a sequence defined recursively — exactly the kind of sequence where no closed-form limit is visible in advance, and boundedness plus monotonicity is the only route to establishing convergence at all.

Let $x_1 = 1$ and $x_{n+1} = \sqrt{2x_n}$ for $n \in \mathbb{N}$. We show $\displaystyle\lim_{n\to\infty} x_n = 2$.

**Step 1: $(x_n)$ is bounded above by $2$.** We show $1 \le x_n \le 2$ for all $n$ by induction.
- *Base case:* $x_1 = 1 \in [1,2]$.
- *Inductive step:* if $1 \le x_k \le 2$, then
$$
\sqrt{2} \le x_{k+1} = \sqrt{2x_k} \le \sqrt{4} = 2,
$$
so $x_{k+1} \in [1,2]$ (in particular $x_{k+1}\ge 1$, maintaining the bound needed for the next step).

**Step 2: $(x_n)$ is increasing.** For $x_k \in (0,2]$,
$$
x_{k+1} \ge x_k \iff \sqrt{2x_k} \ge x_k \iff 2x_k \ge x_k^2 \iff x_k(2-x_k) \ge 0,
$$
which holds since $x_k \in (0,2]$ by Step 1. Hence $(x_n)$ is increasing.

**Step 3: Apply the Monotone Convergence Theorem.** Since $(x_n)$ is increasing and bounded above, it converges; let $x = \lim x_n$. Passing to the limit on both sides of the recursion $x_{n+1} = \sqrt{2x_n}$ (using continuity of $\sqrt{\cdot}$),
$$
x = \sqrt{2x} \quad\Longrightarrow\quad x^2 = 2x \quad\Longrightarrow\quad x(x-2) = 0.
$$
Because $x_n \ge 1$ for all $n$, the limit cannot be $0$ (a limit of a sequence bounded below by $1$ must itself be $\ge 1$). Hence $x = 2$.

> [!imp] The two-step recipe for recursive sequences
> This example is a template worth remembering: to find the limit of a recursively defined sequence, first prove boundedness and monotonicity by induction (which only guarantees a limit *exists*, via the Monotone Convergence Theorem), and only then pass to the limit in the recursive formula to solve for its actual value. Attempting the algebra in Step 3 without first justifying convergence in Steps 1–2 would be invalid — the limit must be known to exist before its value can be legitimately computed this way.
