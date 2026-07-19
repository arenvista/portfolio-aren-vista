---
aliases: ["Uniform Continuity", "Continuity", "Lipschitz Function", "Lipschitz", "Nonuniform Continuity Criterion"]
tags: []
---
# Uniform Continuity

## Intuition: "One Size Fits All"

The Min-Max and Boundedness Theorems of the previous lecture showed that continuity on a closed, bounded interval has remarkably strong consequences. This lecture identifies another such consequence — but first, we need a strengthened notion of continuity itself, since ordinary continuity is not quite enough on its own to capture what makes closed, bounded intervals special.

Recall that ordinary continuity means a small change in the input $x$ produces a small change in the output $f(x)$. The catch is that "small" can mean something different depending on *where* on the graph you are standing. Uniform continuity insists that the same notion of "small" works everywhere at once.

> [!note] The "Steering Wheel" Analogy
> Imagine driving along a winding road, trying to stay within your lane (the lane width is your allowed error $\epsilon$).
> - **Ordinary continuity:** you can always stay in the lane, but how much you're allowed to wiggle the wheel (your $\delta$) depends on where you are. On a straight stretch, an inch of wiggle is fine; on a hairpin turn, even a millimeter sends you off the road.
> - **Uniform continuity:** the road is predictable enough that *one* safe wiggle room works for the entire trip — whatever margin keeps you safe on the worst turn keeps you safe everywhere.

> [!note] The Geometric Intuition: The Sliding Box
> Picture a small transparent box, $2\epsilon$ tall and $2\delta$ wide, centered on a point of the graph.
> - If $f$ is merely **continuous**, then for each point you can shrink the box's width until the graph exits only through the sides — but the required width may shrink as you move to different points.
> - If $f$ is **uniformly continuous**, one fixed box size works no matter where you slide it along the entire curve.
>
> A function that gets infinitely steep somewhere defeats any single box: as the graph steepens, the box must be narrowed further and further to keep the curve from poking out the top or bottom, so no single width ever works.

> [!example] Uniformly Continuous vs. Not
> - **$f(x) = 2x$:** a straight line with constant slope. Keeping $f(x)$ within $0.1$ only ever requires keeping $x$ within $0.05$ — this works identically at $x=0$, $x=100$, or $x=1{,}000{,}000$.
> - **$f(x) = \sin x$:** oscillates forever, but its slope never exceeds $1$ in magnitude — its steepness is capped, so a single sliding box works for the whole infinite wave.
> - **$f(x) = x^2$ on all of $\mathbb{R}$:** flat near $0$, but nearly vertical for large $x$. A wiggle room that works at $x=1$ fails catastrophically at $x=1{,}000{,}000$ — no single $\delta$ works everywhere.
> - **$f(x) = 1/x$ for $x>0$:** as $x \to 0^+$, the graph becomes infinitely steep. However small the sliding box, sliding it close enough to $0$ eventually pokes the curve out the top and bottom.

> [!imp] Summary
> Uniform continuity means a function is "well-behaved" everywhere at once — no sudden, infinitely steep drops or unpredictable spikes that force constant readjustment of the error margin.

## Ordinary vs. Uniform Continuity

We now make this precise, contrasting the two definitions side by side to isolate exactly where they differ.

> [!def] Continuity at a Point
> A function $f: A \to \mathbb{R}$ is **continuous at a point** $a \in A$ if
> $$
> \forall\, \epsilon>0,\ \exists\, \delta>0 \text{ such that } \forall\, x\in A,\ |x-a|<\delta \implies |f(x)-f(a)|<\epsilon.
> $$
> Here $\delta$ may depend on **both** $\epsilon$ *and* the point $a$ — often written $\delta = \delta(\epsilon,a)$.

> [!def] Uniform Continuity
> A function $f: A \to \mathbb{R}$ is **uniformly continuous** on $A$ if
> $$
> \forall\, \epsilon>0,\ \exists\, \delta(\epsilon)>0 \text{ such that } \forall\, x,u\in A,\ |x-u|<\delta(\epsilon) \implies |f(x)-f(u)|<\epsilon.
> $$

> [!imp] The Key Difference
> In uniform continuity, $\delta$ depends **only** on $\epsilon$ — never on the specific points $x,u \in A$. This is a genuinely stronger requirement: uniform continuity on $A$ implies continuity at every point of $A$, but the converse can fail, as the examples below show.

## Examples of Uniform Continuity

### $f(x) = 2x$ on $(0,\infty)$

> [!pf] Proof
> For any $x,u \in (0,\infty)$,
> $$
> |f(x)-f(u)| = |2x-2u| = 2|x-u|.
> $$
> To guarantee $|f(x)-f(u)| < \epsilon$, it suffices that $|x-u| < \epsilon/2$. So take
> $$
> \delta(\epsilon) = \frac{\epsilon}{2}.
> $$
> This single choice of $\delta$ works identically for every pair $x,u$, since the constant $2$ bounding the difference does not depend on where $x,u$ lie — the function changes at a constant rate everywhere.

### $f(x) = 1/x$ on $(a,\infty)$ for $a>0$

This example uses the same conjugate-style factoring seen in the reciprocal limit proof of Lecture 13, but now the bound must hold uniformly across the whole restricted domain rather than just near one point.

> [!pf] Proof
> For any $x,u \in (a,\infty)$,
> $$
> |f(x)-f(u)| = \left|\frac1x-\frac1u\right| = \frac{|x-u|}{|xu|}.
> $$
> Since $x,u > a$, we have $xu > a^2$, so
> $$
> |f(x)-f(u)| = \frac{|x-u|}{|xu|} < \frac{1}{a^2}|x-u|.
> $$
> To guarantee $|f(x)-f(u)|<\epsilon$, it suffices that $|x-u| < a^2\epsilon$. So take
> $$
> \delta(\epsilon) = a^2\epsilon.
> $$
> This works uniformly because, on $(a,\infty)$, the inputs never approach $0$ — the factor $1/(xu)$ is bounded above by the fixed constant $1/a^2$, independent of the specific $x,u$ chosen.

## Nonuniform Continuity

### The Nonuniform Continuity Criterion

Just as with sequential convergence (Lecture 9) and non-Cauchyness (Lecture 12), it is useful to have a sequential negation of uniform continuity — one that produces two sequences whose *inputs* merge together while their *outputs* stay apart.

> [!thm] Nonuniform Continuity Criterion
> The following are equivalent:
> 1. $f$ is **not** uniformly continuous on $A$.
> 2. There exists $\epsilon_0 > 0$ such that for every $\delta > 0$, there exist $x_\delta, u_\delta \in A$ with
> $$
> |x_\delta - u_\delta| < \delta \quad\text{and}\quad |f(x_\delta)-f(u_\delta)| \ge \epsilon_0.
> $$
> 3. There exists $\epsilon_0 > 0$ and two sequences $(x_n), (u_n) \subseteq A$ such that
> $$
> \lim_{n\to\infty}|x_n - u_n| = 0 \quad\text{and}\quad |f(x_n)-f(u_n)| \ge \epsilon_0 \text{ for all } n.
> $$

### Example: $f(x) = 1/x$ on $(0,\infty)$ Is Not Uniformly Continuous

Contrast this with the restricted domain $(a,\infty)$ above, where $1/x$ *was* uniformly continuous — the difference is entirely due to the behavior near $0$, which the restriction to $(a,\infty)$ excluded.

> [!pf] Proof
> Let $\epsilon_0 = 1$, and define
> $$
> x_n = \frac1n, \qquad u_n = \frac{1}{n+1}.
> $$
> Both sequences lie in $(0,\infty)$, and their distance vanishes:
> $$
> |x_n - u_n| = \left|\frac1n - \frac{1}{n+1}\right| = \frac{1}{n(n+1)} \to 0.
> $$
> But the outputs stay exactly $1$ apart:
> $$
> |f(x_n)-f(u_n)| = |n - (n+1)| = 1.
> $$
> By condition (3) of the Nonuniform Continuity Criterion, $f(x)=1/x$ is not uniformly continuous on $(0,\infty)$.

## The Uniform Continuity Theorem

We now arrive at the main result: on a closed, bounded interval, continuity — a purely local, pointwise condition — automatically upgrades to uniform continuity. The proof follows precisely the same three-step template as the [[Boundedness Theorem|Boundedness]] and [[Min-Max Theorem|Min-Max Theorems]] from the previous lecture: build a sequence witnessing the failure, extract a convergent subsequence via [[Bolzano–Weierstrass Theorem|Bolzano–Weierstrass]], then use sequential continuity to derive a contradiction.

> [!thm] Uniform Continuity Theorem
> Let $I$ be a closed and bounded interval. If $f: I \to \mathbb{R}$ is continuous on $I$, then $f$ is uniformly continuous on $I$.

> [!pf] Proof by Contradiction
> Suppose $f$ is continuous on $I$ but **not** uniformly continuous. By the Nonuniform Continuity Criterion, there exists $\epsilon_0 > 0$ and sequences $(x_n),(u_n) \subset I$ with
> $$
> \lim_{n\to\infty}|x_n-u_n| = 0 \quad\text{and}\quad |f(x_n)-f(u_n)| \ge \epsilon_0 \text{ for all } n.
> $$
>
> Since $(x_n) \subset I$ and $I$ is bounded, the Bolzano–Weierstrass Theorem (Lecture 10) gives a convergent subsequence $(x_{n_k})$, say $x_{n_k} \to x^*$. Since $I$ is closed, $x^* \in I$.
>
> **The corresponding $u$-subsequence shares the same limit.** Since $|x_n - u_n| \to 0$, the subsequence $|x_{n_k}-u_{n_k}| \to 0$ as well (Lecture 9), so
> $$
> |u_{n_k} - x^*| \le |u_{n_k}-x_{n_k}| + |x_{n_k}-x^*| \to 0
> $$
> by the triangle inequality, giving $u_{n_k} \to x^*$ too.
>
> **Continuity forces the outputs together.** Since $f$ is continuous at $x^* \in I$, the sequential criterion for continuity gives
> $$
> \lim_{k\to\infty} f(x_{n_k}) = f(x^*), \qquad \lim_{k\to\infty} f(u_{n_k}) = f(x^*).
> $$
> By the Subtraction Limit Law (Lecture 7),
> $$
> \lim_{k\to\infty} |f(x_{n_k})-f(u_{n_k})| = |f(x^*)-f(x^*)| = 0.
> $$
> But this contradicts $|f(x_n)-f(u_n)| \ge \epsilon_0 > 0$ for every $n$, which forces the same bound along the subsequence. Hence $f$ must be uniformly continuous on $I$.

> [!note] Same proof skeleton, new conclusion
> Compare this to the Boundedness Theorem (Lecture 15): both extract a bounded sequence, pass to a convergent subsequence via Bolzano–Weierstrass, land inside $I$ using closedness, and then invoke sequential continuity to force a contradiction. The only new ingredient here is tracking *two* sequences whose distance vanishes, so that both subsequences converge to the same limit point.

## Lipschitz Continuity

The Uniform Continuity Theorem guarantees uniform continuity exists on closed, bounded intervals, but gives no explicit $\delta(\epsilon)$. The Lipschitz condition below is a simple sufficient criterion that, when it holds, makes constructing $\delta(\epsilon)$ immediate — and it holds on *any* domain, not just closed, bounded ones (compare Example 1 above, $2x$ on all of $(0,\infty)$).

> [!def] Lipschitz Function
> Let $A \subseteq \mathbb{R}$ and $f: A \to \mathbb{R}$. Then $f$ is **Lipschitz** on $A$ if there exists a constant $k > 0$ such that
> $$
> \forall\, x,y \in A,\quad |f(x)-f(y)| \le k|x-y|.
> $$

> [!thm] Lipschitz Implies Uniformly Continuous
> If $f$ is Lipschitz on $A$, then $f$ is uniformly continuous on $A$.

> [!pf] Proof
> Given $\epsilon > 0$, choose $\delta(\epsilon) = \epsilon/k$. Then for any $x,u \in A$ with $|x-u| < \delta(\epsilon)$,
> $$
> |f(x)-f(u)| \le k|x-u| < k\cdot\frac{\epsilon}{k} = \epsilon.
> $$
> Hence $f$ is uniformly continuous on $A$.

> [!note] Recognizing the pattern
> This is exactly the same style of argument used in Examples 1 and 2 above ($2x$ and $1/x$): both proofs first bounded $|f(x)-f(u)|$ by a constant times $|x-u|$, then solved for $\delta$. The Lipschitz theorem simply packages that recurring technique into a single reusable criterion.

## Connection to the Mean Value Theorem

The Lipschitz condition can feel like it needs to be verified case by case, as in the examples above — but a bounded derivative gives an automatic, mechanical way to establish it, via the Mean Value Theorem (MVT).

Recall the MVT: if $f$ is differentiable, then for any $a,b$ there exists $c$ between them with
$$
f(a) - f(b) = f'(c)(a-b).
$$
Rearranging identifies $f'(c)$ with the secant slope between $a$ and $b$:
$$
\frac{f(a)-f(b)}{a-b} = f'(c).
$$
Taking absolute values, for any $x,y \in A$ there exists $\theta$ between $x$ and $y$ with
$$
\frac{|f(x)-f(y)|}{|x-y|} = |f'(\theta)|.
$$

> [!thm] Bounded Derivative Implies Lipschitz
> If $|f'(x)| \le k$ for all $x \in A$, then $f$ is Lipschitz on $A$ with constant $k$, and hence uniformly continuous on $A$.

> [!imp] Why this connects back to the sliding-box intuition
> A bounded derivative is precisely the algebraic version of "the slope is capped," which was exactly the informal criterion used earlier to explain why $\sin x$ is uniformly continuous while $x^2$ on all of $\mathbb{R}$ is not. The MVT makes this intuition rigorous: a global bound on $|f'|$ translates directly into a global Lipschitz constant.

## Examples of Lipschitz Functions

### $f(x) = 2x$ on $\mathbb{R}$

> [!example]
> Since $f'(x) = 2$ everywhere, $f$ is Lipschitz on all of $\mathbb{R}$ with $k=2$ — consistent with the direct computation in Example 1 above, now obtained instead from the derivative bound.

### $f(x) = x^2$ on a Bounded Interval $[a,b]$

Unlike $2x$, this function is *not* Lipschitz on all of $\mathbb{R}$, since its derivative $2x$ is unbounded — matching the earlier observation that $x^2$ fails to be uniformly continuous on all of $\mathbb{R}$. Restricting to a bounded interval fixes this.

> [!pf] Proof
> For $x,u \in [a,b]$,
> $$
> |x^2-u^2| = |x+u|\,|x-u|.
> $$
> By the triangle inequality, $|x+u| \le |x|+|u|$. Let $M = \max\{|a|,|b|\}$; since $x,u \in [a,b]$, $|x|,|u| \le M$. Hence
> $$
> |x^2-u^2| \le (|x|+|u|)|x-u| \le 2M|x-u|.
> $$
> So $f(x)=x^2$ is Lipschitz on $[a,b]$ with constant $k = 2\max\{|a|,|b|\}$, and therefore uniformly continuous there — consistent with the Uniform Continuity Theorem, which already guaranteed this since $[a,b]$ is closed and bounded and $f$ is continuous.
