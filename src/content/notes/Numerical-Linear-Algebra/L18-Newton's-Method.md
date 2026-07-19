---
id: L18
aliases: []
tags: []
---

# Solving Nonlinear Equations: Newton's Method in One and Many Dimensions

Every method in the previous chapters solved *linear* problems: $Ax=b$, eigenvalue equations, least squares. This chapter steps outside that world to ask a more general question — how do we solve $f(x)=0$ when $f$ isn't linear at all, and no algebraic formula for the solution exists? The strategy turns out to be the same idea used throughout calculus for approximating hard problems with easy ones: replace the nonlinear function, locally, with something linear — a tangent line, or in higher dimensions, a tangent plane — and solve *that* instead. Do this repeatedly, and (under the right conditions) the sequence of approximations races toward the true root. By the end of the chapter, solving a system of nonlinear equations will come down to repeatedly solving a linear system, bringing the entire toolkit from the earlier chapters — Gaussian elimination, LU, QR — back into play.

## The Root-Finding Problem

We want to solve
$$f(x) = 0.$$
For most functions that show up in practice, no closed-form solution exists, so we turn to **numerical methods** that approximate a root to any desired accuracy.

Before approximating anything, it helps to know a root actually *exists* in the region we're searching. That guarantee comes from a familiar calculus fact, restated here in the language of root-finding.

> [!thm] Intermediate Value Theorem
> Let $f:[a,b]\to\mathbb{R}$ be continuous. If $f(a)<0<f(b)$ or $f(a)>0>f(b)$ — that is, if $f$ changes sign across the interval — then there exists $c\in(a,b)$ with $f(c)=0$.

```tikz
\begin{document}
\begin{tikzpicture}[scale=2]
	\draw[->] (-0.5,0) -- (4.5,0) node[right] {};
	\draw[->] (0,-2.2) -- (0,2.2) node[above] {};
	\draw[thick] (0.5,0) -- (4,0);
	\draw[fill=black] (0.5,0) circle (1.5pt) node[below] {$a$};
	\draw[fill=black] (4,0) circle (1.5pt) node[below] {$b$};
	\draw[thick,blue,domain=0.5:4,smooth,samples=100] plot (\x, {2*sin((\x-0.5)*65)-1});
	\draw[dashed] (1.7,0) -- (1.7,-1.4);
	\draw[fill=red] (1.7,0) circle (1.5pt) node[above,left] {$x^*$};
	\draw[dashed] (0.5,0) -- (0.5,1.35);
	\draw[fill=black] (0.5,1.35) circle (1.5pt) node[left] {$f(a)$};
	\draw[dashed] (4,0) -- (4,-0.95);
	\draw[fill=black] (4,-0.95) circle (1.5pt) node[right] {$f(b)$};
	\node at (2.1,1.1) {$f(x)$};
\end{tikzpicture}
\end{document}
```

> [!note] Why this matters
> The IVT guarantees *existence* of a root wherever $f$ changes sign — it says nothing about the root's exact value. But that existence guarantee is the theoretical bedrock underneath many root-finding methods (bisection being the most direct example), and it's a useful sanity check even for the faster method this chapter focuses on: before iterating, it's worth confirming a root is actually there to find.

## Newton's Method

> [!def] Newton's method
> An iterative technique for approximating a solution of $f(x)=0$. Starting from an initial guess $x_0$, it produces a sequence $x_1,x_2,\dots$ intended to converge to a root $x^*$.

The central idea: replace $f$, locally, by its **tangent line** at the current iterate.

### Geometric picture

At the current point $(x_n, f(x_n))$: draw the tangent line to $f$'s graph there, find where that line crosses the $x$-axis, and use that crossing point as the next guess $x_{n+1}$. If the tangent line is a good local stand-in for $f$ — which it is, whenever $f$ is smooth and $x_n$ is reasonably close to a root — then $x_{n+1}$ lands closer to the true root than $x_n$ did, and repeating the process homes in on it.

> [!imp] Advantages and limitations
> **Advantages:** often converges very rapidly near a root; for a simple root, convergence is quadratic (defined precisely below); simple to implement once $f$ and $f'$ are available.
> **Limitations:** requires $f'(x)$ explicitly; fails or behaves erratically if $f'(x_n)=0$ or is very small; can diverge from a poor starting guess; behaves badly near multiple roots or inflection points.
>
> Newton's method is fundamentally a **local** method — it works well once started close enough to a root, but offers no guarantee of converging from an arbitrary starting point. This is exactly the same caveat that applied to Rayleigh quotient iteration a few chapters ago: both methods trade global reliability for extremely fast local convergence.

## Derivation of Newton's Method

The tangent-line picture above has a precise algebraic counterpart via Taylor's theorem. Expanding $f$ about the current iterate $x_n$:
$$f(x) = f(x_n) + f'(x_n)(x-x_n) + \frac12f''(\xi)(x-x_n)^2,$$
for some $\xi$ between $x$ and $x_n$. When $x$ is close to $x_n$, the quadratic term is small relative to the linear one, so we drop it:
$$f(x) \approx f(x_n) + f'(x_n)(x-x_n).$$
This is precisely the tangent-line approximation. Setting $x = x_{n+1}$ and demanding $f(x_{n+1})\approx0$ (i.e., asking the tangent line, not $f$ itself, to hit zero):
$$0 = f(x_n) + f'(x_n)(x_{n+1}-x_n) \quad\Longrightarrow\quad x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.$$

> [!def] Newton iteration formula
> $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.$$

> [!note] Reading each step
> Each Newton step: (1) evaluate $f(x_n)$ and $f'(x_n)$; (2) compute the correction $\Delta x_n = -f(x_n)/f'(x_n)$; (3) update $x_{n+1} = x_n+\Delta x_n$. Writing it this way — as a correction added to the current guess — is deliberate, since it's exactly the form that generalizes to systems later in this chapter.

## Error Analysis and Convergence

The tangent-line approximation was only approximate, so it's worth asking precisely how much error survives from one step to the next.

Let $x^*$ be a true root ($f(x^*)=0$), and define the error $e_n = x^*-x_n$. Applying Taylor's theorem to $f(x^*)$, expanded about $x_n$:
$$0 = f(x^*) = f(x_n) + f'(x_n)(x^*-x_n) + \frac12f''(\xi)(x^*-x_n)^2.$$
Dividing by $f'(x_n)$ (assuming it's nonzero) and rearranging:
$$x^* = x_n - \frac{f(x_n)}{f'(x_n)} - \frac12\frac{f''(\xi)}{f'(x_n)}(x^*-x_n)^2.$$
The first two terms on the right are exactly the Newton update $x_{n+1}$, so
$$x^* = x_{n+1} - \frac12\frac{f''(\xi)}{f'(x_n)}(x^*-x_n)^2 \quad\Longrightarrow\quad e_{n+1} = -\frac12\frac{f''(\xi)}{f'(x_n)}e_n^2.$$

This single equation is the entire story of Newton's method's speed: the *new* error is proportional to the *square* of the *old* error. If $f''$ stays bounded and $f'(x_n)$ stays away from zero near the root, the coefficient $-\frac12 f''(\xi)/f'(x_n)$ stays bounded too, giving $e_{n+1}\approx Me_n^2$ for some constant $M$ — the defining signature of **quadratic convergence**.

> [!thm] Local quadratic convergence of Newton's method
> Let $f\in C^2$ near a root $r$ with $f(r)=0$ and $f'(r)\neq0$. Then for $x_0$ sufficiently close to $r$, Newton's method converges to $r$ quadratically:
> $$\lim_{n\to\infty}\frac{e_{n+1}}{e_n^2} = \frac{f''(r)}{2f'(r)}, \qquad\text{so}\qquad |e_{n+1}| \approx \left|\frac{f''(r)}{2f'(r)}\right||e_n|^2 \text{ for large } n.$$

This is precisely the same flavor of result seen with Rayleigh quotient iteration — there, cubic convergence came from letting a shift adapt to the current iterate; here, quadratic convergence comes from letting the tangent line adapt to the current iterate. Both are local methods that trade global guarantees for a convergence rate where each step roughly *multiplies* the number of correct digits, rather than merely adding a fixed number of them.

> [!imp] Simple roots vs. multiple roots
> The hypothesis $f'(r)\neq0$ says $r$ is a **simple root** — the graph of $f$ actually crosses the axis there, rather than just touching it. At a multiple root, Newton's method can still converge, but generally loses its quadratic speed and degrades to merely linear convergence.

## Solving Systems of Nonlinear Equations

Everything above assumed a single unknown and a single equation. Real problems often involve $n$ nonlinear equations in $n$ unknowns simultaneously:
$$f_1(x_1,\dots,x_n)=0, \quad f_2(x_1,\dots,x_n)=0, \quad\dots,\quad f_n(x_1,\dots,x_n)=0.$$
Collect the unknowns into $X = \begin{bmatrix}x_1&\cdots&x_n\end{bmatrix}^T$ and the equations into $F(X) = \begin{bmatrix}f_1(X)&\cdots&f_n(X)\end{bmatrix}^T$, so that the problem becomes, compactly, $F(X)=0$ — formally identical to the scalar problem, just with vector-valued unknowns and outputs.

### From 1D Newton to multivariable Newton

Rewriting the scalar update $x_{k+1}=x_k-f(x_k)/f'(x_k)$ in terms of the correction $\Delta x = x_{k+1}-x_k$ gives
$$f'(x_k)\Delta x = -f(x_k)$$
— a form that generalizes directly, term by term:

| Scalar (1D) | System ($n$D) |
|---|---|
| Unknown $x$ | Vector unknown $X$ |
| Function $f(x)$ | Vector function $F(X)$ |
| Derivative $f'(x)$ | Jacobian matrix |
| Correction $\Delta x$ | Correction vector $\Delta X$ |

### The Jacobian matrix

> [!def] Jacobian matrix
> The Jacobian of $F$ at $X$ is the matrix of first partial derivatives:
> $$DF(X) = \begin{bmatrix}\dfrac{\partial f_1}{\partial x_1} & \cdots & \dfrac{\partial f_1}{\partial x_n}\\ \vdots & \ddots & \vdots\\ \dfrac{\partial f_n}{\partial x_1} & \cdots & \dfrac{\partial f_n}{\partial x_n}\end{bmatrix}.$$

The Jacobian is the direct multivariable analogue of $f'(x)$: it's the matrix that gives the best *linear* approximation to $F$ near a point, in exactly the sense that $f'(x_n)$ gave the best linear (tangent-line) approximation to $f$ in the scalar case.

### Newton's method for systems

Linearizing $F$ near $X_k$:
$$F(X_k+\Delta X) \approx F(X_k) + DF(X_k)\Delta X,$$
and demanding the next iterate approximately satisfy $F(X_{k+1})\approx0$ leads to
$$F(X_k) + DF(X_k)\Delta X = 0 \quad\Longrightarrow\quad DF(X_k)\Delta X = -F(X_k).$$

> [!def] Newton's method for systems
> Given $X_0$, repeat:
> 1. Solve the linear system $DF(X_k)\Delta X = -F(X_k)$ for $\Delta X$.
> 2. Update $X_{k+1} = X_k+\Delta X$.

Notice what this reduces to: solving a *nonlinear* system has been converted, one step at a time, into solving a sequence of *linear* systems — exactly the problem the earlier chapters of this course spent so much effort solving well.

### Why we do not explicitly invert the Jacobian

It's tempting to write $X_{k+1} = X_k - [DF(X_k)]^{-1}F(X_k)$ and read this as "compute the inverse, then multiply." That is almost never how Newton's method is implemented.

> [!imp] Numerical linear algebra principle
> Do **not** explicitly compute a matrix inverse unless there is a specific reason to. This is the same guiding principle that steered the least-squares chapters away from forming $A^TA$ explicitly, and toward QR or SVD instead.

The reasons carry over directly:
* **Computational cost.** Forming an explicit inverse is expensive, especially for large systems — far more work than simply solving one linear system.
* **Numerical stability.** Explicit inversion can amplify roundoff error badly when the Jacobian is close to singular — precisely the swamping and ill-conditioning concerns raised back in the numerical-stability chapters.
* **A better alternative exists.** It's more efficient and more stable to solve $DF(X_k)\Delta X = -F(X_k)$ directly, using the same tools built earlier in this course: Gaussian elimination, LU decomposition, QR-based solves, or — for large sparse problems — iterative linear solvers.

## Variants and Practical Remarks

Two common relaxations of full Newton's method trade some convergence speed for reduced cost per iteration — a tradeoff familiar from the shift-reuse tricks discussed with inverse iteration.

> [!cor] Inexact Newton iteration
> Rather than solving $DF(X_k)\Delta X=-F(X_k)$ exactly, solve it only approximately at each step. This is especially useful for large-scale problems where an exact linear solve is prohibitively expensive.

> [!cor] Frozen Jacobian method
> Rather than recomputing the Jacobian at every iteration, reuse a previously computed one for several steps. This lowers the cost of each iteration (skipping both the Jacobian evaluation and, if reusing a factorization, the linear solve setup), at the cost of slower convergence — directly mirroring the earlier advice to factor $A-\sigma I$ once and reuse it across repeated shifted-inverse-iteration steps.

## Summary

**Single equation.** For $f(x)=0$,
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)},$$
converging quadratically when started near a simple root.

**System of equations.** For $F(X)=0$,
$$DF(X_k)\Delta X = -F(X_k), \qquad X_{k+1} = X_k+\Delta X,$$
with the Jacobian playing the role of the derivative, and each step requiring a linear solve rather than a division.

> [!imp] The key idea
> In both the scalar and vector cases, Newton's method works by replacing a nonlinear problem with its best *local linear approximation*, solving that easier linear problem, and repeating. This is the same theme that has run through this entire course in reverse: where earlier chapters solved linear problems as directly and stably as possible, this chapter shows how that same linear machinery becomes the engine for solving nonlinear ones.
