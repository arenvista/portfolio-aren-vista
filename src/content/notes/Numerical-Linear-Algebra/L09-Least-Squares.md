---
id: L09
aliases: ["Least Squares", "Normal Equations", "Overdetermined System", "Residual", "SSE", "RMSE"]
tags: []
---

# Least Squares Approximation

Real-world data is messy. If you measure five points that are supposed to lie on a line, they almost never do — noise, rounding, and imperfect models mean a handful of data points rarely fit any tidy formula exactly. **Least squares** is the standard way to find the "best" approximate answer when no exact answer exists.

This chapter builds the idea in three passes. First, we motivate it geometrically as a projection problem. Second, we turn that geometry into an algebraic recipe (the normal equations) and apply it to concrete curve-fitting examples. Third — and this is where the previous chapter's machinery pays off — we revisit the problem using the QR factorization, which solves it in a numerically safer way than the normal equations alone.

---

## 1. The Overdetermined System

> [!def] Overdetermined system
> A linear system $Ax = b$ is **overdetermined** when there are more equations than unknowns: $A \in \mathbb{R}^{m\times n}$ with $m > n$. Geometrically, we are asking $n$ unknowns to simultaneously satisfy more constraints than degrees of freedom available to satisfy them.

For an overdetermined system, an exact solution $Ax = b$ typically does not exist — $b$ simply doesn't lie in the right place for that to happen. Instead of giving up, we ask a more modest question: what is the vector $\hat{x}$ that gets $A\hat{x}$ **as close as possible** to $b$?

### Geometric perspective

The columns of $A$ span a subspace of $\mathbb{R}^m$ called the **[[Column Space|column space]]**, $\operatorname{Col}(A)$. The equation $Ax = b$ has an exact solution only when $b$ happens to land inside this subspace. When it doesn't — which is the typical case — the best we can do is find the point in $\operatorname{Col}(A)$ that is *closest* to $b$.

That closest point has a name: it's the **[[Orthogonal Projection|orthogonal projection]]** of $b$ onto $\operatorname{Col}(A)$, an idea that connects directly back to the [[Orthogonal Projector|projector matrices]] from the previous chapter. Just as $P_u = uu^T$ projected a vector onto a single direction $u$, here we're projecting onto the entire span of $A$'s columns.

> [!important] Why orthogonality is the right criterion
> If $A\hat{x}$ is the closest point in $\operatorname{Col}(A)$ to $b$, then the leftover error — the **residual** $r = b - A\hat{x}$ — must be perpendicular to every vector in $\operatorname{Col}(A)$. If it weren't, you could tilt $A\hat{x}$ slightly toward $b$ along the column space and shrink the error further, contradicting that $A\hat{x}$ was already the closest point.

Writing "perpendicular to every vector in $\operatorname{Col}(A)$" algebraically: for every $x \in \mathbb{R}^n$,
$$(Ax)^T(b - A\hat{x}) = 0 \quad\Longrightarrow\quad x^TA^T(b-A\hat{x}) = 0.$$
Since this holds for *all* $x$, the vector $A^T(b-A\hat{x})$ itself must be zero — giving us the central result of this chapter.

> [!thm] Normal Equations (Projection Condition)
> Let $A \in \mathbb{R}^{m\times n}$ and $b\in\mathbb{R}^m$. A vector $\hat{x}$ minimizes $\|Ax-b\|_2$ if and only if the residual $r := b - A\hat{x}$ is orthogonal to $\operatorname{Col}(A)$:
> $$A^T(b - A\hat{x}) = 0 \quad\Longleftrightarrow\quad A^TA\,\hat{x} = A^Tb.$$
> If $A$ has full column rank, the solution is unique:
> $$\hat{x} = (A^TA)^{-1}A^Tb.$$

> [!pf] Proof sketch
> The condition $r \perp \operatorname{Col}(A)$ means $(Ax)^Tr = 0$ for every $x\in\mathbb{R}^n$, i.e. $x^TA^T(b-A\hat{x}) = 0$ for all $x$. This holds for every $x$ exactly when $A^T(b-A\hat{x}) = 0$, which rearranges to the normal equation $A^TA\hat{x} = A^Tb$.

---

## 2. Application: Fitting Data

The normal equations aren't just an abstract projection formula — they're the engine behind curve fitting. The idea: choose a model, express "how well the model fits" as a distance-minimization problem, and let the normal equations find the optimal parameters.

> [!def] Residual, SSE, RMSE
> For data $\{(x_i,y_i)\}_{i=1}^N$ and model predictions $\hat{y}_i$:
> * **Residual vector:** $r = b - A\hat{\theta}$
> * **Sum of Squared Errors (SSE):** $\|r\|_2^2 = \sum_i r_i^2$
> * **Root Mean Squared Error (RMSE):** $\sqrt{\dfrac{\mathrm{SSE}}{N}}$

Fitting a model amounts to choosing parameters $\theta$ to minimize $\mathrm{SSE}(\theta) = \sum_i (y_i - \hat{y}_i)^2 = \|A\theta - b\|_2^2$ — precisely the least-squares objective from Section 1, with $A$ built out of the data.

> [!def] Algorithm: Linear Least Squares via Normal Equations
> 1. Gather data $\{(x_i,y_i)\}_{i=1}^N$.
> 2. Choose a model that is **linear in its parameters** (e.g. $\hat y = ax+b$, or $\hat y = ax^2+bx+c$ — nonlinear in $x$ is fine, as long as it's linear in $a,b,c,\dots$).
> 3. Build the design matrix $A$ and right-hand side $b$ by substituting the data into the model.
> 4. Solve the normal equations $A^TA\,\theta = A^Tb$ for $\theta$.
> 5. Evaluate the fit with SSE / RMSE, and refine the model if needed.

The requirement that the model be *linear in its parameters* is what keeps this an ordinary least-squares problem — the unknowns $a, b, c,\dots$ appear only as coefficients multiplying known data-derived quantities, so the whole setup can still be written as $A\theta = b$ even when the underlying curve (a parabola, say) is not itself a straight line.

---

## 3. Worked Examples: Fitting a Line and a Parabola

Throughout, we use the data set $(-1,1),\ (0,0),\ (1,0),\ (2,-2)$.

### Best-fit line: $\hat y = ax+b$

Substituting each data point into the model gives one row of the system per point:
$$
A = \begin{bmatrix} -1 & 1\\ 0 & 1\\ 1 & 1\\ 2 & 1\end{bmatrix},\qquad
b = \begin{bmatrix}1\\0\\0\\-2\end{bmatrix}.
$$

Forming the normal equations $A^TA\,\theta = A^Tb$:
$$
\begin{bmatrix}6 & 2\\ 2 & 4\end{bmatrix}\begin{bmatrix}a\\b\end{bmatrix} = \begin{bmatrix}-5\\-1\end{bmatrix}
\quad\Longrightarrow\quad a = -0.9,\ b = 0.2.
$$

**Result:**
$$\hat y = -0.9x + 0.2$$

```tikz
\begin{document}
\begin{tikzpicture}[domain=-1.5:2.5]
	\draw[very thin,color=gray!30] (-1.5,-2.5) grid (2.5,1.5);
	\draw[->] (-1.5,0) -- (2.6,0) node[right] {$x$};
	\draw[->] (0,-2.6) -- (0,1.6) node[above] {$y$};
	\filldraw[black] (-1,1) circle (2.5pt) node[above left] {$(-1,1)$};
	\filldraw[black] (0,0) circle (2.5pt) node[above right] {$(0,0)$};
	\filldraw[black] (1,0) circle (2.5pt) node[above right] {$(1,0)$};
	\filldraw[black] (2,-2) circle (2.5pt) node[below right] {$(2,-2)$};
	\draw[color=red, thick] plot (\x,{-0.9*\x + 0.2}) node[right] {$\hat{y}=-0.9x+0.2$};
	\draw[dashed,blue] (-1,1) -- (-1,{-0.9*(-1) + 0.2});
	\draw[dashed,blue] (0,0) -- (0,{0.2});
	\draw[dashed,blue] (1,0) -- (1,{-0.9+0.2});
	\draw[dashed,blue] (2,-2) -- (2,{-1.8+0.2});
	\node at (1.6,1.2) {\small $r_i = y_i - \hat{y}_i$};
	\node at (1.3,-2.2) {\small Minimize $\sum r_i^2$};
\end{tikzpicture}
\end{document}
```

### Best-fit parabola: $\hat y = ax^2+bx+c$

Same data, richer model — now the design matrix has a column for $x^2$, $x$, and the constant term:
$$
A = \begin{bmatrix}1 & -1 & 1\\ 0 & 0 & 1\\ 1 & 1 & 1\\ 4 & 2 & 1\end{bmatrix},\qquad
b = \begin{bmatrix}1\\0\\0\\-2\end{bmatrix}.
$$

Solving the resulting normal equations gives:
$$a = -0.25,\quad b = -0.65,\quad c = 0.45 \quad\Longrightarrow\quad \hat y = -0.25x^2 - 0.65x + 0.45.$$

The residuals at $x=-1,0,1,2$ come out to $(0.15,\ -0.45,\ 0.45,\ -0.15)$, giving $\mathrm{SSE}=0.45$ and $\mathrm{RMSE} = \sqrt{0.45/4}\approx 0.335$. As expected, adding a degree of freedom (the quadratic term) lets the model track the data more closely than the line did.

```tikz
\begin{document}
\begin{tikzpicture}[domain=-1.5:2.5]
	\draw[very thin,color=gray!30] (-1.5,-2.8) grid (2.5,1.8);
	\draw[->] (-1.5,0) -- (2.6,0) node[right] {$x$};
	\draw[->] (0,-2.8) -- (0,1.8) node[above] {$y$};
	\filldraw[black] (-1,1) circle (2.5pt) node[above left] {$(-1,1)$};
	\filldraw[black] (0,0) circle (2.5pt) node[above right] {$(0,0)$};
	\filldraw[black] (1,0) circle (2.5pt) node[above right] {$(1,0)$};
	\filldraw[black] (2,-2) circle (2.5pt) node[below right] {$(2,-2)$};
	\draw[color=red, thick] plot (\x,{-0.25*\x*\x -0.65*\x +0.45}) node[right] {$\hat{y}=-0.25x^2-0.65x+0.45$};
	\draw[dashed,blue] (-1,1) -- (-1,{-0.25*(-1)*(-1)-0.65*(-1)+0.45});
	\draw[dashed,blue] (0,0) -- (0,{0.45});
	\draw[dashed,blue] (1,0) -- (1,{-0.25-0.65+0.45});
	\draw[dashed,blue] (2,-2) -- (2,{-0.25*4-0.65*2+0.45});
	\node at (1.6,1.4) {\small $r_i = y_i - \hat{y}_i$};
	\node at (1.3,-2.4) {\small Minimize $\sum r_i^2 = \|A\theta-b\|_2^2$};
\end{tikzpicture}
\end{document}
```

> [!note] Linear-in-parameters models, more generally
> Nothing above required $x$ itself to appear linearly — only the *parameters* had to. The same recipe works for any model of the form
> $$\hat y(t) = c_1\phi_1(t) + c_2\phi_2(t) + \cdots + c_p\phi_p(t)$$
> for arbitrary (even nonlinear) basis functions $\phi_j$ — trigonometric terms, powers, exponentials of a fixed rate, and so on. Build $A$ with entries $A_{ij} = \phi_j(t_i)$, and the normal equations apply exactly as before.

---

## 4. Data Linearization for Genuinely Non-Linear Models

Sometimes the parameters themselves enter *non*-linearly, and no amount of clever basis functions will turn the model into an $A\theta=b$ system directly. If the data is strictly positive, logarithms often come to the rescue by converting a multiplicative, nonlinear relationship into an additive, linear one.

> [!def] Exponential model
> $y = c_1 e^{c_2 t}$. Taking logs of both sides:
> $$\ln y = \ln c_1 + c_2 t.$$
> Substituting $Y = \ln y$ and $k = \ln c_1$ gives the linear model $Y = c_2 t + k$ — an ordinary line-fitting problem in the transformed variable $Y$. Recover $c_1 = e^k$ afterward.

> [!def] Power-law model
> $y = c_1 t^{c_2}$. Taking logs:
> $$\ln y = \ln c_1 + c_2 \ln t.$$
> Substituting $Y=\ln y$, $X = \ln t$, $k=\ln c_1$ gives $Y = c_2 X + k$ — again a line-fitting problem, now in $\ln t$ vs. $\ln y$ space.

> [!important] Caveat: this changes the objective
> Fitting a line to $(\ln t, \ln y)$ minimizes squared error in *log space*, not in the original $y$-space. This is a different (and not necessarily equivalent) notion of "best fit" from minimizing $\sum (y_i - \hat y_i)^2$ directly. Always keep domain restrictions in mind too — $y>0$ and $t>0$ are required for the logarithm to be defined.

---

## 5. Better Alternatives: QR and SVD

The normal-equations approach is conceptually clean, but it has a serious practical flaw, and this is where the previous chapter's QR factorization becomes directly useful.

> [!important] Remark on numerical stability
> Forming $A^TA$ squares the matrix's condition number:
> $$\kappa_2(A^TA) = \kappa_2(A)^2.$$
> A moderately ill-conditioned $A$ can become severely ill-conditioned once squared, amplifying rounding error and making $\hat x = (A^TA)^{-1}A^Tb$ unreliable in floating-point arithmetic — even though the formula is mathematically exact. This is precisely the failure mode that [[Orthogonal Matrices|orthogonal matrices]] are designed to avoid (recall: orthogonal transformations preserve length and don't amplify error).

### Solving least squares with QR — without ever forming $A^TA$

This is where the [[Householder QR|Householder QR factorization]] from the previous chapter pays off directly. Substitute $A = QR$ into the least-squares objective:
$$\min_x \|Ax-b\|_2 = \min_x \|QRx-b\|_2.$$

Because $Q$ is orthogonal, multiplying by $Q^T$ inside the norm doesn't change its value (this is the same length-preservation property that made reflectors and rotators safe to chain together in the previous chapter):
$$\|QRx-b\|_2 = \|Q^T(QRx-b)\|_2 = \|Rx - Q^Tb\|_2.$$

Let $d = Q^Tb$. Since $R$ is upper triangular, it has a nonzero block only in its top $n$ rows (an $n\times n$ block $R_1$), with zeros below. Splitting $d$ to match:
$$
\left\|\begin{bmatrix}R_1\\0\end{bmatrix}x - \begin{bmatrix}d_1\\d_2\end{bmatrix}\right\|_2
$$

The bottom block contributes $\|{-d_2}\|_2$ regardless of $x$ — there's no way to reduce it, since it's multiplied by a block of zeros. So the norm is minimized by making the top block vanish exactly:

> [!thm] Least squares via QR
> Solve $R_1 x = d_1$ by back-substitution (fast, since $R_1$ is triangular). The minimum achievable residual norm is $\|d_2\|_2$.

Notice what didn't happen here: at no point did we form $A^TA$, so we never squared the condition number. This is why numerical libraries prefer QR (or the related SVD-based approach below) over the normal equations whenever conditioning is a concern.

> [!note] The SVD alternative
> An even more robust (but more expensive) option is the singular value decomposition $A = U\Sigma V^T$, giving
> $$\hat x = A^+b = V\Sigma^+U^Tb,$$
> where $A^+$ is the Moore–Penrose pseudoinverse. SVD handles rank-deficient $A$ gracefully and returns the minimum-norm solution when the least-squares solution isn't unique — the most numerically robust option of the three, at the cost of more computation than QR.

---

## Summary

| Approach | Formula | Numerical behavior |
|---|---|---|
| Normal equations | $\hat x = (A^TA)^{-1}A^Tb$ | Simple, but $\kappa(A^TA) = \kappa(A)^2$ — can be unstable |
| QR factorization | Solve $R_1x = d_1$, $d = Q^Tb$ | Avoids forming $A^TA$; standard choice in practice |
| SVD | $\hat x = V\Sigma^+U^Tb$ | Most robust; handles rank deficiency; most expensive |

**The throughline:** least squares begins as a geometric projection problem (project $b$ onto $\operatorname{Col}(A)$), becomes an algebraic recipe (the normal equations) for fitting curves to data, and finally reconnects to the orthogonal-matrix toolkit of the previous chapter — QR factorization lets us solve the very same projection problem while sidestepping the numerical fragility of $A^TA$.
