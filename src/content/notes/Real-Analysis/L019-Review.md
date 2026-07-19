# Quiz Problems and Combination Theorems for Uniform Continuity

This lecture consolidates limit and continuity techniques through worked problems, then builds up a toolkit of ways to combine uniformly continuous functions — reciprocals, products, and piecewise gluing — culminating in a full analysis of $\sqrt{x}$ on $[0,\infty)$.

## Quiz Problem 1: A Polynomial Limit via Factoring

This is the polynomial analogue of the reciprocal and square-root $\varepsilon$–$\delta$ proofs from Lectures 13 and 16: factor out $(x-c)$, then bound the remaining factor on a restricted neighborhood.

> [!pf] $\lim_{x\to 2} (x^2+3x) $ — Correction and Method
> We illustrate the method using the factoring identity $x^3 - 8 = (x-2)(x^2+2x+4)$, which is the general technique for a cubic limit at $c=2$. Starting from the target inequality,
> $$
> |x^3+3x-14| < \epsilon.
> $$
> Wherever the expression factors as $(x-c)\cdot(\text{remaining polynomial})$, e.g.
> $$
> |(x-2)(x^2+2x+7)| < \epsilon \quad\Longleftrightarrow\quad |x^2+2x+7|\cdot|x-2| < \epsilon,
> $$
> the strategy is to bound the polynomial factor $|x^2+2x+7|$ by a constant $M$ on a restricted neighborhood of $x=2$, then solve for $\delta$.
>
> **Restrict $x$ first.** Impose $|x-2| < 1$, so $1 < x < 3$. On this range, the polynomial factor is bounded: $|x^2+2x+7| \le M$ for an explicit constant $M$ (e.g. $M = 22$, obtained by plugging in the endpoint $x=3$).
>
> **Combine the two restrictions.** Choose
> $$
> \delta := \min\left\{1,\ \frac{\epsilon}{M}\right\}.
> $$
> Then for $|x-2| < \delta$,
> $$
> |x^2+2x+7|\cdot|x-2| \le M|x-2| < M\cdot\frac{\epsilon}{M} = \epsilon.
> $$

> [!note] The general template
> This is the same two-step recipe used for $\sqrt{x}$ in Lecture 16: first impose a preliminary restriction (like $|x-2|<1$) to bound the "extra" factor by a constant $M$, then solve $M|x-c|<\epsilon$ for the fine-grained bound, and finally take $\delta$ to be the minimum of the two restrictions.

## Quiz Problem 2: Convergence via a Contraction Hypothesis on $f$

This example reduces to the Contractive Sequence Theorem of Lecture 12: rather than being handed a contractive bound on $|x_{n+1}-x_n|$ directly, we derive one from a Lipschitz-type hypothesis on the generating function $f$.

> [!pf] Setup and First Step
> Suppose $f: \mathbb{R} \to \mathbb{R}$ satisfies $|f(x)-f(y)| \le \tfrac13|x-y|$ for all $x,y \in \mathbb{R}$ (a Lipschitz condition with constant $C = 1/3$, in the language of Lecture 18), and define $x_{n+1} = f(x_n)$. Then
> $$
> |x_{n+2}-x_{n+1}| = |f(x_{n+1})-f(x_n)| \le C|x_{n+1}-x_n|,
> $$
> directly from the hypothesis on $f$, with $C = 1/3 \in (0,1)$.

> [!imp] Completing the argument
> This is exactly the contractive condition from Lecture 12, so $(x_n)$ is contractive and hence Cauchy, hence convergent by the Cauchy Convergence Criterion. Note the broader pattern: any function satisfying a Lipschitz bound with constant strictly less than $1$ (a **contraction mapping**) automatically generates a convergent iteration sequence — this is the one-dimensional case of the Banach Fixed Point Theorem.

## Quiz Problem 3: A Function Positive at a Point Stays Positive Nearby

This applies the $\varepsilon$–$\delta$ definition of continuity (Lecture 13) with a cleverly chosen $\varepsilon$ tied to the value $f(x_0)$ itself, rather than an arbitrary target.

> [!pf] Statement and Proof
> Given: $f$ is continuous at $x_0$ in the $\varepsilon$–$\delta$ sense. Suppose additionally $f: (a,b) \to \mathbb{R}$ is continuous at $x_0 \in (a,b)$ with $f(x_0) > 0$. We show there is an interval $I \ni x_0$, $I \subseteq (a,b)$, on which $f$ stays positive.
>
> Take $\epsilon = \dfrac{f(x_0)}{2} > 0$ (valid since $f(x_0)>0$). By continuity at $x_0$, there exists $\delta(\epsilon) > 0$ such that for all $x \in (a,b)$ with $|x-x_0| < \delta(\epsilon)$,
> $$
> |f(x)-f(x_0)| < \frac{f(x_0)}{2} \quad\Longrightarrow\quad \frac{f(x_0)}{2} < f(x) < \frac{3f(x_0)}{2}.
> $$
> In particular $f(x) > f(x_0)/2 > 0$ on this neighborhood. Taking
> $$
> I = \{x : |x-x_0| < \delta(\epsilon)\} \cap (a,b)
> $$
> gives the desired interval: $I \subseteq (a,b)$, $x_0 \in I$, and $f(x) > 0$ for all $x \in I$.

> [!note] Why halving $f(x_0)$ is the right choice
> Choosing $\epsilon = f(x_0)/2$ guarantees the resulting interval $\bigl(f(x_0)/2,\ 3f(x_0)/2\bigr)$ for $f(x)$ sits entirely above $0$ — any smaller multiple of $f(x_0)$ would work too, but half is the standard choice since it keeps the algebra clean. This is a common trick whenever continuity needs to preserve a strict sign, not just approximate a value.

## Quiz Problem 4: A Ratio Diverging to $-\infty$ with Bounded Numerator

This is the "reciprocal tends to zero" corollary from Lecture 13, adapted to a ratio of two sequences rather than a single properly divergent sequence — we give two proofs, one via the Squeeze Theorem and one via a direct $\varepsilon$–$N$ argument.

> [!pf] Statement
> Suppose $\lim_{n\to\infty} \dfrac{x_n}{y_n} = -\infty$ and $(x_n)$ is bounded. Show $\lim_{n\to\infty} y_n = 0$.

> [!pf] Proof via the Squeeze Theorem
> Since $x_n/y_n \to -\infty$, its reciprocal tends to $0$ (Reciprocal Tends to Zero, Lecture 13):
> $$
> \frac{y_n}{x_n} = \frac{1}{x_n/y_n} \to 0.
> $$
> Since $(x_n)$ is bounded, there exists $M>0$ with $|x_n| < M$ for all $n$. Writing $y_n = \dfrac{y_n}{x_n}\cdot x_n$,
> $$
> |y_n| = \left|\frac{y_n}{x_n}\right|\cdot|x_n| \le M\left|\frac{y_n}{x_n}\right|,
> $$
> so
> $$
> -M\left|\frac{y_n}{x_n}\right| \le y_n \le M\left|\frac{y_n}{x_n}\right|.
> $$
> Both bounds tend to $0$ (since $y_n/x_n \to 0$ and $M$ is fixed), so by the Squeeze Theorem, $y_n \to 0$.

> [!pf] Proof via $\varepsilon$–$N$ Directly
> Since $(x_n)$ is bounded, fix $M > 0$ with $|x_n| < M$ for all $n$. Given $\epsilon > 0$, set $\alpha = -M/\epsilon < 0$. Since $x_n/y_n \to -\infty$, there exists $N(\alpha)$ such that for all $n \ge N(\alpha)$,
> $$
> \frac{x_n}{y_n} < \alpha = -\frac{M}{\epsilon} \quad\Longrightarrow\quad \left|\frac{x_n}{y_n}\right| > \frac{M}{\epsilon} \quad\Longrightarrow\quad \frac{|x_n|}{|y_n|} > \frac{M}{\epsilon}.
> $$
> Since $|x_n| < M$, this gives $\dfrac{M}{|y_n|} > \dfrac{|x_n|}{|y_n|} > \dfrac{M}{\epsilon}$, so $|y_n| < \epsilon$. Hence $y_n \to 0$.

> [!note] Two routes to the same place
> The Squeeze Theorem proof is shorter because it reuses the Reciprocal Tends to Zero corollary as a black box; the direct $\varepsilon$–$N$ proof re-derives that fact from scratch in the course of the argument. Both are valid — the first favors reusing prior results, the second is self-contained.

---

## Combination Theorems for Uniform Continuity

We now return to uniform continuity (Lecture 18) and develop three ways of building new uniformly continuous functions from old ones: taking reciprocals, taking products, and gluing pieces together across a shared boundary point.

### Reciprocals of Uniformly Continuous Functions

The reciprocal map $t \mapsto 1/t$ is itself only Lipschitz (hence uniformly continuous) away from $0$ — precisely the obstruction seen with $f(x)=1/x$ near $0$ in Lecture 18. The theorem below shows that composing with a uniformly continuous $f$ bounded away from $0$ avoids this obstruction entirely.

> [!thm] Reciprocal of a Uniformly Continuous Function
> Let $f$ be uniformly continuous on $A \subseteq \mathbb{R}$, and suppose there exists $k > 0$ such that $|f(x)| \ge k$ for all $x \in A$. Then $g(x) := \dfrac{1}{f(x)}$ is uniformly continuous on $A$.

> [!note] The idea
> Taking reciprocals is only safe when the function stays away from $0$ — this is exactly what $|f(x)| \ge k$ guarantees. The identity
> $$
> \left|\frac{1}{f(x)} - \frac{1}{f(y)}\right| = \frac{|f(x)-f(y)|}{|f(x)f(y)|}
> $$
> converts control of $|f(x)-f(y)|$ (from uniform continuity of $f$) into control of the reciprocal difference, once the denominator is bounded below by $k^2$.

> [!pf]
> Let $\varepsilon > 0$. Since $f$ is uniformly continuous on $A$, apply the definition with target value $k^2\varepsilon > 0$: there exists $\delta > 0$ such that for all $x,y \in A$,
> $$
> |x-y| < \delta \implies |f(x)-f(y)| < k^2\varepsilon.
> $$
> Then for such $x,y$,
> $$
> \left|\frac{1}{f(x)}-\frac{1}{f(y)}\right| = \frac{|f(x)-f(y)|}{|f(x)||f(y)|} \le \frac{|f(x)-f(y)|}{k^2} < \frac{k^2\varepsilon}{k^2} = \varepsilon,
> $$
> using $|f(x)|,|f(y)| \ge k$ to bound the denominator below by $k^2$. Hence $g = 1/f$ is uniformly continuous on $A$.

> [!imp] The general pattern
> This is a composition argument: uniform continuity of $f$ supplies control on $|f(x)-f(y)|$ in terms of $|x-y|$; the lower bound $|f(x)| \ge k$ ensures $f(A)$ stays inside the region $(-\infty,-k]\cup[k,\infty)$, where $t\mapsto1/t$ is itself Lipschitz (with constant $1/k^2$, by the same computation as Example 2 of Lecture 18). Combining a uniformly continuous "inner" map with a Lipschitz "outer" map on the relevant range gives a uniformly continuous composition.

### Products of Uniformly Continuous Functions

Unlike the reciprocal, a product of two uniformly continuous functions is not automatically uniformly continuous — boundedness of both factors is needed as well, to control the cross terms that appear when expanding the difference of a product.

> [!thm] Product of Uniformly Continuous, Bounded Functions
> If $f,g$ are uniformly continuous **and** bounded on a common domain, then $fg$ is uniformly continuous.

> [!note] The idea
> Uniform continuity controls $|f(x)-f(y)|$ and $|g(x)-g(y)|$; boundedness controls the sizes of $|f(x)|$ and $|g(x)|$ that multiply those differences after expanding the product. Both ingredients are needed together.

> [!pf]
> Suppose $|f(x)| \le M$ and $|g(x)| \le M$ for all $x$ in the domain. Let $\epsilon > 0$. By uniform continuity of $f$ and $g$, choose $\delta_f, \delta_g > 0$ such that
> $$
> |x-y| < \delta_f \implies |f(x)-f(y)| < \frac{\epsilon}{2M}, \qquad |x-y| < \delta_g \implies |g(x)-g(y)| < \frac{\epsilon}{2M}.
> $$
> Let $\delta = \min\{\delta_f,\delta_g\}$. For $|x-y| < \delta$, insert and subtract a cross term — the same technique used in the Product Limit Law for sequences (Lecture 8):
> $$
> \begin{aligned}
> |f(x)g(x)-f(y)g(y)| &= |g(x)(f(x)-f(y)) + f(y)(g(x)-g(y))| \\
> &\le |g(x)|\,|f(x)-f(y)| + |f(y)|\,|g(x)-g(y)| \\
> &\le M\cdot\frac{\epsilon}{2M} + M\cdot\frac{\epsilon}{2M} = \epsilon.
> \end{aligned}
> $$
> Hence $fg$ is uniformly continuous.

> [!imp] Recognizing the recurring three-step pattern
> This proof follows the same three steps every time a product needs to be controlled: (1) rewrite the difference using the cross-term identity $f(x)g(x)-f(y)g(y) = g(x)(f(x)-f(y)) + f(y)(g(x)-g(y))$, (2) bound the coefficients $g(x), f(y)$ using boundedness, and (3) make the difference terms small using uniform continuity. This is exactly the structure of the Product Limit Law proof for sequences in Lecture 8 — uniform continuity is simply the function-level analogue of sequential convergence throughout.

### Gluing: Uniform Continuity of $\sqrt{x}$ on $[0,\infty)$

Neither the Lipschitz criterion (Lecture 18) nor the Uniform Continuity Theorem alone handles $\sqrt{x}$ on all of $[0,\infty)$: $\sqrt{x}$ is not Lipschitz near $0$ (its "derivative" $\tfrac{1}{2\sqrt x}$ is unbounded there), and $[0,\infty)$ is unbounded, so the Uniform Continuity Theorem of Lecture 18 doesn't directly apply either. The fix is to split the domain into a compact piece (handled by the Uniform Continuity Theorem) and a Lipschitz piece, then glue the two estimates together at the shared boundary point.

> [!thm] Uniform Continuity of $\sqrt{x}$ on $[0,\infty)$
> $f(x) = \sqrt{x}$ is uniformly continuous on $[0,\infty)$.

> [!pf]
> **Step 1: Lipschitz on $[a,\infty)$ for fixed $a>0$.** Using the Conjugate Trick (Lecture 6),
> $$
> |\sqrt{x}-\sqrt{y}| = \left|\frac{x-y}{\sqrt{x}+\sqrt{y}}\right| = \frac{|x-y|}{\sqrt{x}+\sqrt{y}}.
> $$
> If $x,y \in [a,\infty)$, then $\sqrt{x}+\sqrt{y} \ge 2\sqrt{a}$, so
> $$
> |\sqrt{x}-\sqrt{y}| \le \frac{1}{2\sqrt{a}}|x-y|.
> $$
> Thus $\sqrt{x}$ is Lipschitz on $[a,\infty)$ with constant $\tfrac{1}{2\sqrt a}$, hence uniformly continuous there (Lecture 18).
>
> **Step 2: Uniformly continuous on $[0,a]$.** Since $[0,a]$ is closed and bounded, and $\sqrt{x}$ is continuous on it, the Uniform Continuity Theorem (Lecture 18) directly applies: $\sqrt{x}$ is uniformly continuous on $[0,a]$.
>
> **Step 3: Glue the two pieces.** It remains to handle $x \in [0,a]$, $y \in [a,\infty)$ together. Insert the shared point $a$ and apply the triangle inequality:
> $$
> |f(x)-f(y)| = |f(x)-f(a) + f(a)-f(y)| \le |f(x)-f(a)| + |f(a)-f(y)|.
> $$
> Given $\epsilon > 0$: by uniform continuity on $[0,a]$, there is $\delta_1 > 0$ making $|f(x)-f(a)| < \epsilon/2$ whenever $|x-a| < \delta_1$; by uniform continuity (Lipschitz) on $[a,\infty)$, there is $\delta_2 > 0$ making $|f(a)-f(y)| < \epsilon/2$ whenever $|y-a| < \delta_2$. Taking $\delta = \min\{\delta_1,\delta_2\}$, if $|x-y| < \delta$ with $x\in[0,a]$, $y\in[a,\infty)$, then both $|x-a|<\delta$ and $|y-a|<\delta$ (since $x,a,y$ are ordered), so
> $$
> |f(x)-f(y)| < \frac{\epsilon}{2}+\frac{\epsilon}{2} = \epsilon.
> $$
>
> Combining all three cases ($x,y$ both in $[0,a]$; both in $[a,\infty)$; or split across the two), $f(x)=\sqrt{x}$ is uniformly continuous on all of $[0,\infty)$.

> [!imp] The gluing technique, in general
> This three-step pattern — establish uniform continuity separately on a compact piece and an unbounded-but-Lipschitz piece, then bound the cross-boundary case via the triangle inequality through the shared point — is a general method for extending uniform continuity from pieces of a domain to their union, whenever the pieces meet at a single point.

### Is $f(x) = \dfrac{1}{1+x^2}$ Uniformly Continuous on $\mathbb{R}$?

This final example uses the Mean Value Theorem connection from Lecture 18: bound $|f'(x)|$ uniformly, and Lipschitz continuity (hence uniform continuity) on all of $\mathbb{R}$ follows immediately.

> [!pf] Bounding the Derivative
> By the Quotient Rule, $f'(x) = \dfrac{-2x}{(1+x^2)^2}$. We claim $|f'(x)| \le 1$ for all $x$, i.e.
> $$
> \frac{2|x|}{(1+x^2)^2} \le 1.
> $$
> Note that $(|x|-1)^2 \ge 0$ expands to
> $$
> |x|^2 - 2|x| + 1 \ge 0 \quad\Longleftrightarrow\quad 1+x^2 \ge 2|x|.
> $$
> Dividing both sides by $(1+x^2)^2 > 0$ (and using $1+x^2 \ge 2|x|$, together with $1+x^2\ge 1$),
> $$
> \frac{2|x|}{(1+x^2)^2} \le \frac{1+x^2}{(1+x^2)^2} = \frac{1}{1+x^2} \le 1.
> $$
> Hence $|f'(x)| \le 1$ for all $x \in \mathbb{R}$.

> [!imp] Conclusion via the MVT connection
> By the Bounded Derivative Implies Lipschitz theorem (Lecture 18), $f(x) = \dfrac{1}{1+x^2}$ is Lipschitz on $\mathbb{R}$ with constant $k=1$, and therefore uniformly continuous on all of $\mathbb{R}$ — with no need to split the domain, unlike the $\sqrt{x}$ example above, precisely because the derivative here is bounded *globally* rather than just locally.
