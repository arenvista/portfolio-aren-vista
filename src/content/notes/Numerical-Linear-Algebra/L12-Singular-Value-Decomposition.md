---
id: L12
aliases: ["Singular Value Decomposition", "SVD", "Singular Values", "Singular Value", "Spectral Norm", "Condition Number"]
tags: []
---

# The Singular Value Decomposition

The previous chapter left off with a cliffhanger: eigenvalue decomposition is a beautiful way to understand how a matrix acts, but it only works for square matrices, and even then only for the well-behaved ones. This chapter resolves that limitation completely. The **Singular Value Decomposition (SVD)** is the factorization that works for *every* matrix — square or rectangular, symmetric or not, diagonalizable or not — and in doing so it becomes the single most useful decomposition in this course, tying together everything from projectors and QR factorization to condition numbers and least squares.

## The Limitations of the Eigenvalue Decomposition

Recall the [[Eigenvalue Decomposition|eigenvalue decomposition (EVD)]] from the previous chapter: if $A\in\mathbb{R}^{n\times n}$ is diagonalizable, then
$$A = X\Lambda X^{-1}.$$

A particularly nice case arose when $A$ was real and symmetric — there, the eigenvectors could always be chosen orthonormal, giving
$$A = Q\Lambda Q^T$$
with $Q$ orthogonal and $\Lambda$ diagonal.

> [!imp] Important refinement
> The factorization $A = Q\Lambda Q^T$ holds for **real symmetric** matrices. If $A$ is additionally **symmetric positive definite (SPD)**, all of its eigenvalues are strictly positive: $\lambda_i > 0$ for every $i$.

As clean as this is, it rests on three restrictive assumptions, and each one rules out matrices we care about:
* **$A$ must be square.** Least-squares problems, by their very nature, involve tall rectangular matrices — EVD has nothing to say about them directly.
* **Orthogonal diagonalization needs symmetry.** Most matrices in practice are not symmetric.
* **Even square matrices can fail to diagonalize.** So-called *defective* matrices simply don't have enough independent eigenvectors to build $X$ at all.

## The Necessity of SVD

What do we do when $A$ is rectangular, non-symmetric, or defective? This is exactly the gap the SVD fills — a factorization defined for **every** matrix $A \in \mathbb{R}^{n\times m}$, with no restrictions at all.

> [!imp] Two ways to motivate SVD
> 1. **Algebraic:** Every matrix, no matter how badly behaved, is orthogonally equivalent to a simple diagonal-like matrix.
> 2. **Geometric:** Any linear map sends the unit sphere to a hyperellipse; the SVD identifies that hyperellipse's principal axes and their lengths.

> [!def] Orthogonal equivalence
> Two matrices $A, B \in \mathbb{R}^{n\times m}$ are **equivalent** if there exist invertible matrices $X\in\mathbb{R}^{n\times n}$ and $Y\in\mathbb{R}^{m\times m}$ with $A = XBY$. If $X$ and $Y$ are both orthogonal, $A$ and $B$ are **orthogonally equivalent**.

The SVD is precisely the statement that every matrix is orthogonally equivalent to a rectangular diagonal matrix — no symmetry, no square shape, and no diagonalizability required.

## The Singular Value Decomposition: Formal Statement

> [!thm] Singular Value Decomposition
> Let $A\in\mathbb{R}^{n\times m}$ have rank $r$. There exist orthogonal matrices $U\in\mathbb{R}^{n\times n}$ and $V\in\mathbb{R}^{m\times m}$, and a rectangular diagonal matrix $\Sigma\in\mathbb{R}^{n\times m}$, such that
> $$A = U\Sigma V^T.$$
> The diagonal entries of $\Sigma$ are the **singular values** $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r > 0$, with all remaining diagonal entries equal to zero.

**The pieces of the decomposition.** $U$'s columns $u_1,\dots,u_n$ are the **left singular vectors**; $V$'s columns $v_1,\dots,v_m$ are the **right singular vectors**; $\Sigma$ holds the singular values in descending order along its diagonal. Transposing gives the equivalent form $A^T = V\Sigma^TU^T$ — the SVD of $A^T$ is just the SVD of $A$ with the roles of $U$ and $V$ swapped.

### Where the singular values come from

The SVD isn't a brand-new idea invented from scratch — it's built directly on top of the eigen-decomposition machinery from the previous chapter, applied to a pair of matrices constructed from $A$ that are *always* symmetric, no matter what $A$ looks like.

> [!thm] Singular values and eigenvalues
> For any $A\in\mathbb{R}^{n\times m}$:
> * $A^TA$ is symmetric positive semidefinite in $\mathbb{R}^{m\times m}$.
> * $AA^T$ is symmetric positive semidefinite in $\mathbb{R}^{n\times n}$.
> * $A^TA$ and $AA^T$ share the same nonzero eigenvalues.
> * Those shared nonzero eigenvalues are exactly the squared singular values $\sigma_1^2,\dots,\sigma_r^2$.

This is the resolution of last chapter's restriction: $A$ itself might not be symmetric or even square, but $A^TA$ and $AA^T$ *always* are — so the well-behaved spectral decomposition $Q\Lambda Q^T$ from the SPD case always applies to them, even when it can't be applied to $A$ directly.

Concretely: if $A^TAv_i = \sigma_i^2v_i$, then $v_i$ is a right singular vector, and for $\sigma_i>0$ the matching left singular vector is defined by $u_i = Av_i/\sigma_i$. This produces the pair of relations that govern everything else in this chapter:
$$Av_i = \sigma_iu_i, \qquad A^Tu_i = \sigma_iv_i.$$

## Geometric Interpretation of SVD

### A linear map in three steps

The factorization $A = U\Sigma V^T$ isn't just algebra — it's a recipe for what $A$ *does* to a vector, broken into three simple stages:

1. **$V^T$** — an orthogonal rotation or reflection in the input space $\mathbb{R}^m$.
2. **$\Sigma$** — a pure stretch or compression along the coordinate axes (no rotation at all).
3. **$U$** — an orthogonal rotation or reflection into the output space $\mathbb{R}^n$.

Every linear map, however complicated it looks in its original coordinates, is secretly just "rotate, stretch along axes, rotate again" once you view it through the right pair of orthonormal bases. This is a direct generalization of the [[Orthogonal Matrices|reflectors and rotators]] from earlier in the course — there, orthogonal matrices were built by hand to introduce zeros; here, $U$ and $V$ arise naturally as the coordinate systems in which $A$'s action becomes as simple as possible.

### The unit sphere becomes a hyperellipse

Let $S$ be the unit sphere in the domain $\mathbb{R}^m$. Applying $A$ to $S$ produces a **hyperellipse** in $\mathbb{R}^n$. The right singular vectors $v_i$ mark the principal axes in the input space; the singular values $\sigma_i$ set the lengths of the resulting semiaxes; and the left singular vectors $u_i$ set their directions in the output space. Since $Av_i = \sigma_iu_i$, each unit vector $v_i$ is mapped to a vector of length exactly $\sigma_i$, pointing along $u_i$ — the SVD literally reads off the shape of $A(S)$ axis by axis.

## SVD and the Four Fundamental Subspaces

One of the SVD's most powerful features is that it hands you explicit orthonormal bases for all four fundamental subspaces of $A$ at once — no extra work required beyond the factorization itself. The action on the singular vectors splits cleanly at index $r$ (the rank of $A$):

$$
Av_i = \begin{cases}\sigma_iu_i, & i=1,\dots,r\\ 0, & i=r+1,\dots,m\end{cases}
\qquad
A^Tu_i = \begin{cases}\sigma_iv_i, & i=1,\dots,r\\ 0, & i=r+1,\dots,n\end{cases}
$$

This immediately yields:
* **Column space / range of $A$:** $\operatorname{Range}(A) = \operatorname{span}\{u_1,\dots,u_r\}$
* **Null space of $A$:** $\operatorname{Null}(A) = \operatorname{span}\{v_{r+1},\dots,v_m\}$
* **Row space / range of $A^T$:** $\operatorname{Range}(A^T) = \operatorname{span}\{v_1,\dots,v_r\}$
* **Left null space:** $\operatorname{Null}(A^T) = \operatorname{span}\{u_{r+1},\dots,u_n\}$

This is exactly the same subspace structure that the *full* QR factorization revealed a chapter ago — there, $\hat Q$'s columns spanned $\operatorname{Range}(A)$ and the leftover columns of $Q$ spanned $\operatorname{Null}(A^T)$. SVD recovers that same picture, but now for *both* the row and column sides simultaneously, and with the added bonus of the singular values telling you exactly how much $A$ stretches each direction.

> [!imp] Fundamental subspace relations
> $$\operatorname{Range}(A) = \operatorname{Null}(A^T)^\perp, \qquad \operatorname{Range}(A^T) = \operatorname{Null}(A)^\perp$$

## Full, Reduced, and Truncated SVD

Not every application needs the complete matrices $U$ and $V$. The SVD comes in three practical sizes, each discarding a bit more of the "wasted" structure.

**Full SVD.** The complete decomposition $A = U\Sigma V^T$, with $U\in\mathbb{R}^{n\times n}$, $\Sigma\in\mathbb{R}^{n\times m}$, $V\in\mathbb{R}^{m\times m}$ — analogous to full QR, where $Q$ was padded out to be square even though only part of it was strictly needed.

**Reduced (economy) SVD.** If $\operatorname{rank}(A) = r$, the zero rows/columns of $\Sigma$ contribute nothing to the matrix product, so we can drop them along with the corresponding singular vectors:
$$A = U_r\Sigma_rV_r^T, \qquad U_r\in\mathbb{R}^{n\times r},\ \Sigma_r\in\mathbb{R}^{r\times r},\ V_r\in\mathbb{R}^{m\times r}.$$
This is the direct analogue of the *thin* QR factorization from two chapters ago — the same idea of keeping only the columns that actually participate in reconstructing $A$.

**Truncated rank-$k$ approximation.** Keeping only the $k \le r$ *largest* singular values (and discarding the rest, not just the zero ones) gives a lower-rank matrix that approximates $A$:
$$A \approx U_k\Sigma_kV_k^T.$$

> [!imp] Why truncation matters
> Truncated SVD is the foundation of PCA, data compression, low-rank approximation, and denoising. It gives the *best possible* rank-$k$ approximation of $A$, in both the spectral and Frobenius norms — no other rank-$k$ matrix can do better by either measure.

## Matrix Properties and Applications

### Matrix norms, revisited

Because orthogonal matrices preserve Euclidean length (the property used throughout every chapter since projectors were first introduced), the overall "size" of $A$ as a transformation is completely determined by its singular values.

> [!thm] Spectral norm and the largest singular value
> $$\|A\|_2 = \sigma_1$$

The Frobenius norm — introduced back when we first discussed matrix norms — also has a clean expression in terms of singular values, using the cyclic invariance of the trace together with the fact that orthogonal matrices leave the trace unchanged:
$$\|A\|_F = \big(\operatorname{trace}(A^TA)\big)^{1/2} = \sqrt{\sigma_1^2+\sigma_2^2+\cdots+\sigma_r^2}.$$

### Matrix condition number, revisited

Recall the condition number $\kappa_2(A) = \|A\|_2\|A^{-1}\|_2$ from the [[Numerical Stability|numerical-stability chapter]]. The SVD makes this quantity completely explicit. If $A = U\Sigma V^T$, then $A^{-1} = V\Sigma^{-1}U^T$, so the singular values of $A^{-1}$ are simply the reciprocals $1/\sigma_1,\dots,1/\sigma_n$ of those of $A$. This gives $\|A^{-1}\|_2 = 1/\sigma_n$, and therefore:

> [!thm] Condition number in terms of singular values
> $$\kappa_2(A) = \frac{\sigma_1}{\sigma_n}$$

> [!imp] Interpretation
> A large condition number means a large gap between the biggest and smallest singular values — geometrically, the hyperellipse $A(S)$ is extremely elongated along one axis and nearly flat along another. This near-degeneracy is exactly what makes the system numerically sensitive: small perturbations in the data can produce large changes in the solution.

### Least squares: why SVD and QR dominate the normal equations

This closes the loop all the way back to the [[Least Squares|least-squares chapters]]. Recall the [[Normal Equations|normal equations]] $A^TAx = A^Tb$, and the recurring warning that forming $A^TA$ explicitly is numerically dangerous. The SVD makes precisely *why* fully transparent: since the singular values of $A^TA$ are the squares of the singular values of $A$,
$$\kappa_2(A^TA) = \frac{\sigma_1^2}{\sigma_r^2} = \kappa_2(A)^2.$$

> [!imp] Numerical consequence
> Forming $A^TA$ squares the condition number, amplifying floating-point error exactly as the numerical-stability chapter warned. This is the precise, singular-value-level explanation for why **QR** and **SVD** are preferred over the normal equations in practice.

## Summary of Core Identities

| Concept | Equation |
|---|---|
| Factorization | $A = U\Sigma V^T$ |
| Vector mapping | $Av_i = \sigma_iu_i \quad\text{and}\quad A^Tu_i = \sigma_iv_i$ |
| Eigenvalue link | $A^TAv_i = \sigma_i^2v_i \quad\text{and}\quad AA^Tu_i = \sigma_i^2u_i$ |
| Spectral norm | $\|A\|_2 = \sigma_1$ |
| Conditioning | $\kappa_2(A) = \dfrac{\sigma_{\max}(A)}{\sigma_{\min}(A)}$ |

> [!imp] Main idea
> The SVD is the most general and most useful matrix decomposition in this course:
> * It works for **every** matrix — no square, symmetric, or diagonalizable requirement.
> * It reveals the geometry of a linear map as rotate–stretch–rotate.
> * It gives orthonormal bases for all four fundamental subspaces at once.
> * It explains matrix norms, conditioning, PCA, compression, and — closing the loop with the very first least-squares chapter — exactly why QR-based methods are the numerically safe choice.
