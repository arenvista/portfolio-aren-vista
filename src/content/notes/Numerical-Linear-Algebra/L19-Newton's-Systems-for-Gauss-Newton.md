---
id: L19u
aliases: ["Gauss–Newton", "Gauss-Newton", "Nonlinear Least Squares", "Newton's Method for Systems"]
tags: []
---
# Newton's Method for Systems, Vector Calculus, and Gauss–Newton

The previous chapter derived Newton's method for a single equation and sketched its generalization to systems. This chapter makes that generalization precise, tests it against two contrasting worked examples — one where it converges beautifully, one where it doesn't — and then builds the vector-calculus machinery needed to push the idea one step further: applying Newton's method not just to solve equations, but to *minimize* a sum of squared residuals. That last destination, the **Gauss–Newton method**, turns out to be nothing more than the least-squares normal equations from many chapters ago, reborn in a nonlinear setting.

## Linearization Idea

Suppose we want to solve $F(\vec x) = \vec 0$ for $F:\mathbb{R}^n\to\mathbb{R}^n$. Exactly as in the scalar case, linearize $F$ near the current iterate $\vec x_k$:
$$F(\vec x_k+\Delta\vec x) \approx F(\vec x_k) + DF(\vec x_k)\,\Delta\vec x.$$
Forcing this linear approximation to vanish gives the **Newton step**:
$$DF(\vec x_k)\,\Delta\vec x = -F(\vec x_k), \qquad \vec x_{k+1} = \vec x_k+\Delta\vec x.$$

> [!def] Newton's method for systems
> Given $\vec x_0$, repeat:
> 1. **Solve** $DF(\vec x_k)\,\Delta\vec x_k = -F(\vec x_k)$.
> 2. **Update** $\vec x_{k+1} = \vec x_k+\Delta\vec x_k$.
>
> Both $F(\vec x_k)$ and the Jacobian $DF(\vec x_k)$ must be recomputed at every iteration.

## Local Convergence Theorem

The scalar convergence theorem from the previous chapter — [[Quadratic Convergence|quadratic convergence]] near a simple root — has a direct multivariable analogue, with "$f'(r)\neq0$" replaced by the natural vector condition: the [[Jacobian]] at the root must be invertible.

> [!thm] Newton's method — local convergence
> Let $F\in C^1(D)$ on a bounded, closed, convex set $D\subset\mathbb{R}^n$. Suppose $\vec x^*\in D$ satisfies $F(\vec x^*)=\vec0$ and $\det(DF(\vec x^*))\neq0$. Then there exists $\varepsilon>0$ such that whenever $\|\vec x_0-\vec x^*\|<\varepsilon$, the iterates
> $$\vec x_{n+1} = \vec x_n - [DF(\vec x_n)]^{-1}F(\vec x_n)$$
> are well-defined and $\vec x_n \to \vec x^*$.

> [!note] Interpretation
> Newton's method remains a fundamentally **local** method in this setting too: sufficiently close initial guesses near a solution with invertible Jacobian converge, but the theorem offers no guarantee otherwise. If the Jacobian *at the solution* is singular, this theorem simply doesn't apply — a case worth taking seriously, as the second worked example below shows.

## Worked Example: A Nonlinear $2\times2$ System

Apply Newton's method to
$$\begin{cases}x^2+4x-2y-1=0,\\ x^2+5y-4=0.\end{cases} \qquad F(x,y) = \begin{bmatrix}x^2+4x-2y-1\\x^2+5y-4\end{bmatrix}.$$

**Jacobian.**
$$DF(x,y) = \begin{bmatrix}2x+4 & -2\\ 2x & 5\end{bmatrix}.$$

**Checking invertibility on a region.** On $D=[0,2]\times[0,0.8]$,
$$\det(DF(x,y)) = (2x+4)(5) - (-2)(2x) = 14x+20 > 0 \quad\text{for all }(x,y)\in D,$$
so the Jacobian is invertible throughout $D$ — exactly the hypothesis the convergence theorem needs, and it's worth checking *before* iterating rather than after, since it's what justifies trusting the process at all.

**First iteration.** Start at $\vec x_0=(0,0)$:
$$DF(\vec x_0) = \begin{bmatrix}4&-2\\0&5\end{bmatrix}, \qquad F(\vec x_0) = \begin{bmatrix}-1\\-4\end{bmatrix}.$$
Solving $DF(\vec x_0)\,\Delta\vec x_0 = -F(\vec x_0) = \begin{bmatrix}1\\4\end{bmatrix}$ by back-substitution (the system is already triangular): the second row gives $5\Delta y=4\Rightarrow\Delta y=0.8$; substituting into the first gives $4\Delta x - 1.6=1 \Rightarrow \Delta x=0.65$. So
$$\Delta\vec x_0 = \begin{bmatrix}0.65\\0.8\end{bmatrix}, \qquad \vec x_1 = \begin{bmatrix}0.65\\0.8\end{bmatrix}.$$

**Second iteration.** At $\vec x_1=(0.65,0.8)$:
$$F(\vec x_1) = \begin{bmatrix}0.4225\\0.4225\end{bmatrix}, \qquad DF(\vec x_1) = \begin{bmatrix}5.3&-2\\1.3&5\end{bmatrix}.$$
Solving gives $\Delta\vec x_1 \approx \begin{bmatrix}-0.1016\\-0.0581\end{bmatrix}$, so
$$\vec x_2 \approx \begin{bmatrix}0.5484\\0.7419\end{bmatrix}.$$

**Checking against the exact solution.** This system is simple enough to solve directly, which lets us confirm Newton's method is actually converging rather than just producing plausible-looking numbers. From the second equation, $y = (4-x^2)/5$; substituting into the first and clearing denominators gives $7x^2+20x-13=0$, with root in $D$ at
$$x^* = \frac{-20+\sqrt{764}}{14} \approx 0.5455, \qquad y^* = \frac{4-(x^*)^2}{5}\approx 0.7405.$$
The iterates $\vec x_1, \vec x_2$ are visibly closing in on $\vec x^*\approx(0.5455, 0.7405)$ — exactly the behavior the convergence theorem promised.

## Example: When the Jacobian Is Singular

Not every root is this well-behaved. Consider
$$\begin{cases}xy-1=0,\\ x^2+y^2-2=0.\end{cases} \qquad F(x,y)=\begin{bmatrix}xy-1\\x^2+y^2-2\end{bmatrix}, \qquad DF(x,y) = \begin{bmatrix}y&x\\2x&2y\end{bmatrix}.$$

At $\vec x^* = (1,1)$: $F(1,1) = \begin{bmatrix}0\\0\end{bmatrix}$, confirming this is a genuine root. But
$$DF(1,1) = \begin{bmatrix}1&1\\2&2\end{bmatrix}, \qquad \det(DF(1,1)) = 0.$$

> [!imp] Why this matters
> Since the Jacobian is singular exactly at the solution, the local convergence theorem simply does not apply here. Starting *exactly* at $(1,1)$ needs no iteration at all — but *near* $(1,1)$, the Newton step $DF(x,y)^{-1}F(x,y)$ becomes undefined or numerically unstable, since it requires inverting a matrix that is nearly singular right where accuracy matters most. The honest conclusion: **Newton's method is not guaranteed to behave well near a solution with a singular Jacobian**, and in practice it often doesn't.

Geometrically, this system describes the intersection of a hyperbola $xy=1$ (i.e. $y=1/x$) and a circle $x^2+y^2=2$:

```tikz
\begin{document}
\begin{tikzpicture}[scale=.5]
  \draw[->] (-1.5,0) -- (2,0) node[right] {$x$};
  \draw[->] (0,-1.5) -- (0,2) node[above] {$y$};
  \draw[blue, thick, domain=0:360, samples=100, variable=\t]
    plot ({sqrt(2)*cos(\t)}, {sqrt(2)*sin(\t)}) node[right] {$x^2+y^2=2$};
  \draw[red, thick, domain=0.2:2, samples=100] plot (\x, {1/\x});
  \draw[red, thick, domain=-2:-0.2, samples=100] plot (\x, {1/\x}) node[below left] {$xy=1$};
\end{tikzpicture}
\end{document}
```

The singular Jacobian corresponds exactly to the point where these two curves meet *tangentially* rather than crossing transversally — the hyperbola and circle graze each other at $(1,1)$ instead of cutting cleanly through, and it's precisely that tangency that makes the linearization degenerate.

## Vector Calculus Review

Pushing Newton's method further — toward minimizing a sum of squares rather than solving equations directly — requires a bit more vector-calculus vocabulary than the Jacobian alone.

> [!def] Scalar-valued function
> $f(x_1,\dots,x_n):\mathbb{R}^n\to\mathbb{R}$. Using the row-vector convention adopted here, its **gradient** is
> $$\nabla f = \begin{bmatrix}f_{x_1} & \cdots & f_{x_n}\end{bmatrix}.$$

> [!def] Vector-valued function
> $\vec F(x_1,\dots,x_n) = \begin{bmatrix}f_1(\vec x)\\\vdots\\f_m(\vec x)\end{bmatrix}$, $\vec F:\mathbb{R}^n\to\mathbb{R}^m$. Its **Jacobian** stacks the gradients of each component as rows:
> $$D\vec F = \begin{bmatrix}\nabla f_1\\\vdots\\\nabla f_m\end{bmatrix} = \begin{bmatrix}\dfrac{\partial f_1}{\partial x_1}&\cdots&\dfrac{\partial f_1}{\partial x_n}\\\vdots&\ddots&\vdots\\\dfrac{\partial f_m}{\partial x_1}&\cdots&\dfrac{\partial f_m}{\partial x_n}\end{bmatrix}.$$

This is exactly the Jacobian introduced in the previous chapter and used throughout this one — restated here in a form ($m$ possibly different from $n$) general enough to handle the residual vectors of the next section, which need not have as many components as there are unknowns.

Two product rules will be needed shortly, both direct generalizations of the familiar single-variable product rule:

> [!thm] Dot product rule
> For $\vec u,\vec v:\mathbb{R}^n\to\mathbb{R}^m$,
> $$\nabla(\vec u^T\vec v) = \vec v^TD\vec u + \vec u^TD\vec v.$$

> [!thm] Matrix–vector product rule
> If $A=A(\vec x)$ is matrix-valued and $\vec v=\vec v(\vec x)$ is vector-valued,
> $$D(A\vec v) = A\,D\vec v + \sum_{i=1}^m v_i\,D\vec a_i,$$
> where $\vec a_i$ is the $i$-th column of $A$.

> [!imp] Constant-matrix special case
> If $A$ doesn't depend on $\vec x$, every $D\vec a_i = 0$, and the rule collapses to the simple $D(A\vec v) = A\,D\vec v$ — the case that will actually apply below, when $A$ turns out to be constant in the linear least-squares setting.

## Nonlinear Least Squares and Gauss–Newton

Recall the linear [[Least Squares|least-squares problem]] from much earlier in this course: given an [[Overdetermined System|overdetermined]] $A\vec x\approx\vec b$, find $\bar{\vec x}$ minimizing $\|\vec b-A\vec x\|_2$, solvable via the [[Normal Equations|normal equations]], [[QR Factorization|QR]], or [[Singular Value Decomposition|SVD]]. What if the residual isn't linear in $\vec x$ at all?

> [!def] Nonlinear least squares setup
> Given residual functions $r_1(\vec x),\dots,r_m(\vec x)$, collect them as $\vec r(\vec x) = \begin{bmatrix}r_1(\vec x)\\\vdots\\r_m(\vec x)\end{bmatrix}$, and minimize
> $$E(\vec x) = \frac12\sum_{i=1}^mr_i(\vec x)^2 = \frac12\vec r(\vec x)^T\vec r(\vec x).$$

### First-order optimality

To minimize $E$, set its gradient to zero. Using the dot product rule with $\vec u=\vec v=\vec r$:
$$\nabla E(\vec x) = \nabla\left(\frac12\vec r^T\vec r\right) = \frac12\left(\vec r^TD\vec r + \vec r^TD\vec r\right) = \vec r^TD\vec r.$$
So the optimality condition is $\vec r^TD\vec r = \vec 0$; transposing gives the equivalent column-vector form. Writing $J(\vec x) := D\vec r(\vec x)$, this becomes the **nonlinear normal equations**:
$$J(\vec x)^T\vec r(\vec x) = \vec0.$$

The name is deliberate — this is the direct nonlinear generalization of the linear normal equations $A^T(A\vec x-\vec b)=0$ from the least-squares chapters, with $J$ playing the role that the constant matrix $A$ played there.

### Newton's method applied to the normal equations

The nonlinear normal equations are themselves a system of equations, $F(\vec x) := J(\vec x)^T\vec r(\vec x) = \vec 0$, so nothing stops us from applying Newton's method (from earlier in this chapter) directly to *them*. Doing so requires $DF$, which a standard calculation (using the matrix–vector product rule above, since $J$ depends on $\vec x$) gives as
$$DF(\vec x) = J(\vec x)^TJ(\vec x) + \sum_{i=1}^mr_i(\vec x)\,\nabla^2r_i(\vec x).$$
The exact Newton step then solves
$$\left(J_k^TJ_k + \sum_{i=1}^mr_i(\vec x_k)\,\nabla^2r_i(\vec x_k)\right)\vec p_k = -J_k^T\vec r(\vec x_k), \qquad J_k := J(\vec x_k).$$

### The Gauss–Newton approximation

That second-derivative term is expensive — it requires the full Hessian of every residual component. Near a good fit, though, the residuals $r_i(\vec x)$ themselves are small, so the whole sum $\sum_ir_i\nabla^2r_i$ tends to be small too (it's a sum of *small numbers* times curvature terms), and dropping it is often an excellent approximation:
$$DF(\vec x) \approx J(\vec x)^TJ(\vec x).$$

> [!def] Gauss–Newton method
> 1. Form the residual $\vec r(\vec x_k)$.
> 2. Form the Jacobian $J_k = D\vec r(\vec x_k)$.
> 3. Solve $J_k^TJ_k\,\vec p_k = -J_k^T\vec r(\vec x_k)$.
> 4. Update $\vec x_{k+1} = \vec x_k+\vec p_k$.

### Analogy with linear least squares

The name of this method is not a coincidence, and the connection can be made completely explicit. For a *linear* residual $\vec r(\vec x) = A\vec x-\vec b$, the Jacobian is simply the constant matrix $J(\vec x)=A$ (exactly the special case flagged in the constant-matrix product rule above). Substituting into the Gauss–Newton step:
$$A^TA\,\vec p_k = -A^T(A\vec x_k-\vec b).$$

> [!note] Gauss–Newton as a direct generalization
> This is precisely the normal-equations framework from the linear least-squares chapters, rearranged as an update rule rather than a one-shot solve. Gauss–Newton is, quite literally, what the normal equations look like once the residual is allowed to curve — every step re-linearizes the nonlinear residual and solves the resulting linear least-squares problem exactly as before.

## Summary

**Newton for systems.** Solve $DF(\vec x_k)\Delta\vec x_k=-F(\vec x_k)$, then update $\vec x_{k+1}=\vec x_k+\Delta\vec x_k$.

**Convergence.** Guaranteed locally near a root $\vec x^*$ if $F$ is sufficiently smooth and $DF(\vec x^*)$ is invertible; the theorem is silent — and the method often unreliable — when the Jacobian is singular at the root.

**Gauss–Newton.** To minimize $E(\vec x)=\frac12\|\vec r(\vec x)\|_2^2$, solve approximately $J_k^TJ_k\,\vec p_k=-J_k^T\vec r(\vec x_k)$, then update $\vec x_{k+1}=\vec x_k+\vec p_k$.

---

## Closing: Where the Two Halves of This Course Meet

It's worth stepping back to see what just happened, because it closes a loop that has been running under this entire course. The material began with strictly *linear* tools — projectors, reflectors, and rotators built to introduce zeros; QR and SVD factorizations built to solve $Ax=b$ and $\min\|Ax-b\|_2$ as stably as possible; eigenvalue and Schur decompositions built to understand what a fixed linear map *does*. Everything in that first half assumed the problem was linear from the start.

This chapter, and the one before it, took the opposite starting point — a genuinely nonlinear problem, $F(\vec x)=0$ or $\min\|\vec r(\vec x)\|_2^2$ — and showed that the *entire linear toolkit* comes right back into play, one tangent-plane at a time. Newton's method doesn't avoid linear algebra when the problem stops being linear; it leans on it harder, solving a fresh linear system $DF(\vec x_k)\Delta\vec x=-F(\vec x_k)$ at every single iteration. The warning against explicitly inverting the Jacobian is the same warning against explicitly inverting $A^TA$ from the least-squares chapters, restated in a moving target. And Gauss–Newton, the capstone of this unit, is nothing but the normal equations reappearing exactly where a course on linear algebra might least expect them: at the heart of an algorithm for problems that are, by definition, no longer linear.

The practical upshot is a genuine unification, not just an analogy: solving a nonlinear system or fitting a nonlinear model is, at every step, a linear algebra problem — the same $Ax=b$ and least-squares machinery built up from the very first chapter, called again and again, each time on a slightly better linear approximation of the true nonlinear world.
