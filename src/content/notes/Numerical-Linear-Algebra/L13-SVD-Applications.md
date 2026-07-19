---
id: L13
aliases: ["Low-Rank Approximation", "Truncated SVD", "Compact SVD", "Eckart–Young Theorem", "Eckart-Young", "Moore–Penrose Pseudoinverse", "Pseudoinverse", "Numerical Rank"]
tags: []
---

# Working with the SVD: Low-Rank Approximation, Least Squares, and the Pseudoinverse

The previous chapter introduced the [[Singular Value Decomposition|singular value decomposition]] and used it to explain matrix norms, conditioning, and the [[Four Fundamental Subspaces|four fundamental subspaces]]. This chapter puts the SVD to work. We'll see that the factorization $A = U\Sigma V^T$ can be repackaged as a sum of simple rank-one pieces, that truncating this sum gives the *provably best possible* low-rank approximation of $A$, and that the whole machinery combines into a single formula — the Moore–Penrose pseudoinverse — that solves every [[Least Squares|least-squares problem]] this course has considered, even the ones with no unique solution.

We start by restating the definition precisely, since the exact shapes of $U$, $\Sigma$, $V$ matter for the algebra that follows.

> [!def] Singular Value Decomposition
> Let $A \in \mathbb{R}^{m\times n}$. Its singular value decomposition is
> $$A = U\Sigma V^T,$$
> where $U\in\mathbb{R}^{m\times m}$ and $V\in\mathbb{R}^{n\times n}$ are orthogonal ($U^TU = I_m$, $V^TV=I_n$), and $\Sigma\in\mathbb{R}^{m\times n}$ is rectangular-diagonal:
> $$
> \Sigma = \begin{bmatrix}\sigma_1 &&& 0\\ &\sigma_2&&\\ &&\ddots&\\ 0&&&\sigma_p\end{bmatrix}, \qquad p=\min(m,n),
> $$
> with $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_p\ge0$. The columns of $U$ are the **left singular vectors**, the columns of $V$ are the **right singular vectors**, and the nonzero diagonal entries of $\Sigma$ are the **singular values**.

If $\operatorname{rank}(A) = r$, only the first $r$ singular values are nonzero, so most of $U$ and $V$ is doing nothing in the product. Trimming away that dead weight gives a smaller, equally exact factorization:

> [!def] Compact SVD
> $$A = U_r\Sigma_rV_r^T,$$
> where $U_r\in\mathbb{R}^{m\times r}$ holds $u_1,\dots,u_r$, $V_r\in\mathbb{R}^{n\times r}$ holds $v_1,\dots,v_r$, and $\Sigma_r = \operatorname{diag}(\sigma_1,\dots,\sigma_r)$. This is the most useful form in computation, since it discards exactly the parts of $U,\Sigma,V$ that contribute nothing to $A$ — the same "thin" philosophy behind the reduced QR factorization from earlier in the course.

---

## SVD as a Sum of Rank-One Matrices

Matrix multiplication has an alternative reading that's easy to overlook: $U_r\Sigma_rV_r^T$ can be expanded column-by-column rather than treated as a single block product.

> [!def] Outer-product expansion
> From the compact SVD,
> $$A = \sum_{j=1}^r \sigma_j\,u_jv_j^T.$$
> Each term $u_jv_j^T$ is an outer product — a column times a row — and every outer product has rank exactly $1$ (when $\sigma_j\neq0$). So the SVD writes *any* matrix, no matter how complicated, as a weighted sum of the simplest possible building blocks: rank-one matrices.

Because the singular values are sorted in decreasing order, this sum is organized from "most important" to "least important" — $\sigma_1u_1v_1^T$ captures the single largest rank-one piece of $A$, $\sigma_2u_2v_2^T$ the next largest, and so on. That ordering is what makes truncation meaningful.

> [!def] Truncated SVD
> For $0\le\nu\le r$, define
> $$A_\nu = \sum_{j=1}^\nu \sigma_ju_jv_j^T.$$
> $A_\nu$ has rank at most $\nu$, and it keeps only the $\nu$ largest singular values together with their singular vectors. This is the standard way to build a low-rank approximation of $A$ — and, as we'll see shortly, it isn't just *a* good approximation, it's the *best possible* one.

---

## Singular Values, Rank, and the Fundamental Subspaces

The rank-one expansion also makes it easy to see exactly how $A$ and $A^T$ act on the singular vectors themselves.

> [!lem] Action of $A$ and $A^T$ on singular vectors
> If $A = U\Sigma V^T$ with $\operatorname{rank}(A)=r$, then for $1\le j\le r$,
> $$Av_j = \sigma_ju_j, \qquad A^Tu_j = \sigma_jv_j,$$
> while for $j > r$,
> $$Av_j = 0, \qquad A^Tu_j = 0.$$

> [!pf]
> Since $V^Tv_j = e_j$ (the $j$-th standard basis vector), $Av_j = U\Sigma V^Tv_j = U\Sigma e_j$. If $j\le r$, then $\Sigma e_j = \sigma_je_j$, giving $Av_j = \sigma_jUe_j = \sigma_ju_j$. If $j>r$, the $j$-th diagonal entry of $\Sigma$ is zero, so $\Sigma e_j = 0$ and $Av_j=0$. The argument for $A^Tu_j$ is identical, using $U^Tu_j = e_j$.

This lemma has two immediate consequences that echo results from the previous chapter — reproduced here because they follow so directly from the algebra above that it's worth seeing them fall out cleanly.

> [!thm] Rank equals the number of nonzero singular values
> $$\operatorname{rank}(A) = \#\{j : \sigma_j \neq 0\}.$$
> This is immediate: $\Sigma$ has exactly that many nonzero diagonal entries, and rank is preserved under multiplication by the invertible (in fact orthogonal) matrices $U$ and $V$.

> [!thm] Fundamental subspaces from the SVD
> With $\operatorname{rank}(A)=r$:
> $$\operatorname{Range}(A) = \operatorname{span}\{u_1,\dots,u_r\}, \qquad \operatorname{Range}(A^T) = \operatorname{span}\{v_1,\dots,v_r\},$$
> $$\operatorname{Null}(A) = \operatorname{span}\{v_{r+1},\dots,v_n\}, \qquad \operatorname{Null}(A^T) = \operatorname{span}\{u_{r+1},\dots,u_m\}.$$
> The columns of $U$ and $V$ together give orthonormal bases for all four fundamental subspaces at once.

*Why this holds:* for $j\le r$, $Av_j=\sigma_ju_j$ places each $u_j$ inside $\operatorname{Range}(A)$; since $u_1,\dots,u_r$ are orthonormal and there are exactly $r$ of them, they form a basis for it. For $j>r$, $Av_j=0$ places those $v_j$ in $\operatorname{Null}(A)$. The statements for $A^T$ follow by the same argument applied to the transpose relation.

---

## Best Low-Rank Approximation

We claimed earlier that truncating the rank-one sum gives the *best* rank-$\nu$ approximation of $A$. This is a genuine theorem, not just a reasonable-sounding heuristic, and it's one of the most consequential results built on the SVD.

> [!thm] Eckart–Young Theorem
> Let $A\in\mathbb{R}^{m\times n}$ have singular values $\sigma_1\ge\cdots\ge\sigma_r>0$, and let $A_\nu = \sum_{j=1}^\nu\sigma_ju_jv_j^T$ for $0\le\nu\le r$. Then $A_\nu$ minimizes the distance to $A$ over *every* matrix of rank at most $\nu$:
> $$\|A-A_\nu\|_2 = \inf_{\operatorname{rank}(B)\le\nu}\|A-B\|_2 = \sigma_{\nu+1}$$
> (with $\sigma_{r+1}:=0$ by convention). The same optimality holds in Frobenius norm:
> $$\|A-A_\nu\|_F^2 = \sum_{j=\nu+1}^r\sigma_j^2.$$

In other words: among *all* possible rank-$\nu$ matrices — not just other truncations of $A$'s own SVD — none can get closer to $A$ than $A_\nu$ does. Discarding the smallest singular values first is not merely convenient; it is provably optimal.

> [!note] Interpretation
> Since the terms $\sigma_ju_jv_j^T$ are sorted by size, truncated SVD keeps the most significant structure of $A$ first and discards the least significant last — $A_\nu$ is the optimal way to compress $A$ down to rank $\nu$. This is the mathematical foundation for PCA, image and data compression, and denoising.

The Eckart–Young theorem also has a robustness consequence: it tells you how much a matrix can be perturbed before its rank is forced to drop.

> [!cor] Full-rank stability
> Suppose $A$ has rank $r$ with smallest nonzero singular value $\sigma_r>0$. If $\|A-B\|_2 < \sigma_r$, then $\operatorname{rank}(B)\ge r$. In particular, if $A$ has full rank, so does any $B$ close enough to it.

> [!pf]
> If $\operatorname{rank}(B)\le r-1$, Eckart–Young says $\|A-B\|_2 \ge \sigma_r$ — since $B$ would then be a rank-$(r-1)$ matrix, and no such matrix can beat the optimal rank-$(r-1)$ approximation's error of $\sigma_r$. This contradicts $\|A-B\|_2 <\sigma_r$, so $\operatorname{rank}(B)\ge r$.

---

## Numerical Rank

In exact arithmetic, rank is unambiguous: it's the count of nonzero singular values. But recall from the numerical-stability chapter that floating-point computation never produces *exact* zeros — rounding error tends to leave tiny nonzero residues where a true zero should be. This means computed singular values that are "supposed to" be zero often show up instead as extremely small but nonzero numbers, which would make a naive rank calculation wildly overcount.

> [!def] Numerical rank
> The numerical rank of $A$ is the number of singular values significantly larger than a chosen computational tolerance. A common rule: find $k$ such that
> $$\sigma_k > \text{tol}, \qquad \sigma_{k+1}\le\text{tol},$$
> with the tolerance scaled to machine precision, typically
> $$\text{tol}\approx \max(m,n)\,\sigma_1\,\varepsilon_{\text{mach}}.$$

This is the same swamping concern from the floating-point chapter, now viewed through the lens of singular values: a "numerically zero" singular value is one that's small enough to be indistinguishable from rounding noise relative to the largest singular value $\sigma_1$.

> [!note] The spectral norm, revisited
> Recall from the previous chapter that $\sigma_1 = \|A\|_2$. This is worth restating here because it's exactly the reference scale used in the tolerance formula above — the numerical-rank cutoff is always measured *relative to* the matrix's own overall size.

---

## SVD vs. Eigenvalue Decomposition

It's worth directly contrasting the SVD with the eigenvalue decomposition (EVD) from two chapters ago, now that both are fully developed.

Recall: if a square $A\in\mathbb{R}^{n\times n}$ has $n$ linearly independent eigenvectors, it diagonalizes as $A = X\Lambda X^{-1}$ — but not every square matrix qualifies, so EVD in this form does not always exist.

| Feature | SVD | EVD |
|---|---|---|
| Applies to | Every matrix $A\in\mathbb{R}^{m\times n}$ | Square matrices only |
| Existence | Always exists | Requires diagonalizability |
| Bases used | Two orthogonal bases, $U$ and $V$ | One basis, $X$ |
| Orthogonality | Always orthogonal | Only in special cases (e.g. symmetric matrices) |
| Diagonal values | Nonnegative singular values | Eigenvalues, possibly negative or complex |

The two are not unrelated, though — the SVD is built directly from the EVD of a matrix that's always guaranteed to be well-behaved.

> [!thm] Singular values from $A^TA$
> The nonzero singular values of $A$ are the square roots of the nonzero eigenvalues of $A^TA$ (equivalently, of $AA^T$).

> [!pf]
> Starting from $A = U\Sigma V^T$:
> $$A^TA = (U\Sigma V^T)^T(U\Sigma V^T) = V\Sigma^TU^TU\Sigma V^T = V(\Sigma^T\Sigma)V^T.$$
> Since $V$ is orthogonal, this is literally an eigenvalue decomposition of $A^TA$, with eigenvalues equal to the diagonal entries of $\Sigma^T\Sigma$ — namely $\sigma_1^2,\sigma_2^2,\dots$. So the singular values are the square roots of those eigenvalues.

> [!important] Practical consequence
> $A^TA$ and $AA^T$ share the same nonzero eigenvalues, so singular values can be computed from either one — in practice, whichever is smaller. This is the same fact used two chapters ago to explain where SVD's singular values "come from" in the first place; here it becomes a concrete computational shortcut.

---

## Least Squares via the SVD

We now arrive at the payoff that ties this entire unit together. Recall the least-squares problem from several chapters back: given $A\in\mathbb{R}^{m\times n}$ and $b\in\mathbb{R}^m$, find
$$\min_{x\in\mathbb{R}^n}\|b-Ax\|_2.$$
If $A$ doesn't have full column rank, this minimizer isn't unique — infinitely many $x$ can achieve the same minimal residual. In that case we additionally want the *smallest* such $x$: $\min\|x\|_2$ among all minimizers. QR factorization (from the numerical-stability chapters) handled the full-rank case cleanly; the SVD handles *every* case, rank-deficient or not.

**Step 1 — insert the SVD.** Let $A = U\Sigma V^T$ with $\operatorname{rank}(A)=r$. Because multiplying by the orthogonal matrix $U^T$ never changes a vector's length (the same fact used throughout this course, from reflectors onward):
$$\|b-Ax\|_2 = \|U^T(b-Ax)\|_2 = \|U^Tb - \Sigma(V^Tx)\|_2.$$
Define $c = U^Tb$ and $y=V^Tx$; the problem becomes $\min_y\|c-\Sigma y\|_2$ — the same problem, just viewed in the coordinate system where $A$'s action is pure diagonal scaling.

**Step 2 — split by rank.** Partition $c = \begin{bmatrix}\hat c\\d\end{bmatrix}$, $y=\begin{bmatrix}\hat y\\z\end{bmatrix}$, and $\Sigma = \begin{bmatrix}\hat\Sigma&0\\0&0\end{bmatrix}$ where $\hat\Sigma = \operatorname{diag}(\sigma_1,\dots,\sigma_r)$. Then
$$\|c-\Sigma y\|_2^2 = \sum_{i=1}^r|\hat c_i - \sigma_i\hat y_i|^2 + \sum_{i=r+1}^m|d_i|^2.$$

**Step 3 — minimize.** The second sum doesn't involve $y$ at all — it's an unavoidable leftover residual. The first sum is minimized exactly, term by term, by choosing $\hat y_i = \hat c_i/\sigma_i$ for $i=1,\dots,r$. The remaining components $z$ of $y$ multiply only the zero block of $\Sigma$, so they have *zero effect* on the residual — they're completely free.

**Step 4 — break the tie with minimum norm.** Since $V$ is orthogonal, $\|x\|_2 = \|y\|_2$, so minimizing $\|x\|_2$ is the same as minimizing $\|y\|_2$. Since the free components $z$ don't affect the residual, the smallest-norm choice is simply $z=0$.

> [!def] Algorithm: Least squares via SVD
> 1. Compute $A = U\Sigma V^T$.
> 2. Compute $c = U^Tb$.
> 3. For $i=1,\dots,r$, set $y_i = c_i/\sigma_i$.
> 4. For $i=r+1,\dots,n$, set $y_i = 0$.
> 5. Recover $x = Vy$.

Notice that this algorithm degrades gracefully exactly where the normal equations and even plain QR can fail: if $A$ doesn't have full column rank, $A^TA$ isn't invertible and the normal equations break down entirely — but the SVD approach simply sets $y_i=0$ for the deficient directions and moves on.

---

## The Moore–Penrose Pseudoinverse

The four-step algorithm above can be packaged into a single matrix, giving a direct generalization of $A^{-1}$ that works even when $A$ isn't square or invertible.

> [!def] Moore–Penrose pseudoinverse
> If $A = U\Sigma V^T$ has rank $r$, its pseudoinverse is
> $$A^\dagger = V\Sigma^\dagger U^T,$$
> where $\Sigma^\dagger\in\mathbb{R}^{n\times m}$ replaces each nonzero singular value $\sigma_i$ with $1/\sigma_i$:
> $$\Sigma^\dagger = \begin{bmatrix}\hat\Sigma^{-1}&0\\0&0\end{bmatrix}.$$
> Equivalently, in rank-one form:
> $$A^\dagger = \sum_{i=1}^r \frac{1}{\sigma_i}v_iu_i^T.$$

> [!thm] Minimum-norm least-squares solution
> For any $A\in\mathbb{R}^{m\times n}$ and $b\in\mathbb{R}^m$, the unique vector that both minimizes $\|b-Ax\|_2$ and, among all such minimizers, has smallest norm $\|x\|_2$, is
> $$x = A^\dagger b.$$

> [!pf]
> From the derivation above, the least-squares minimizer in rotated coordinates is $y = \Sigma^\dagger c$ with $c=U^Tb$. Since $x=Vy$,
> $$x = V\Sigma^\dagger c = V\Sigma^\dagger U^Tb = A^\dagger b.$$

> [!imp] What the pseudoinverse generalizes
> * If $A$ is square and invertible, $A^\dagger = A^{-1}$ — the pseudoinverse reduces to the ordinary inverse exactly when one exists.
> * If $Ax=b$ is inconsistent (the overdetermined case from the least-squares chapters), $A^\dagger b$ gives the best least-squares fit.
> * If $Ax=b$ has infinitely many solutions (the rank-deficient case), $A^\dagger b$ selects the one of smallest Euclidean norm.

This closes the arc that began several chapters ago with the normal equations: what started as "solve $A^TA\hat x = A^Tb$, but watch out — it squares the condition number" has, by way of QR and now the SVD, become a single well-behaved formula, $x = A^\dagger b$, that works for every matrix regardless of shape or rank.

---

## Key Takeaways

> [!imp] Main facts to remember
> * Every matrix has an SVD, $A = U\Sigma V^T$, with no restrictions on shape, symmetry, or diagonalizability.
> * $\operatorname{rank}(A)$ equals the number of nonzero singular values, and the singular vectors give orthonormal bases for all four fundamental subspaces.
> * The truncated SVD $A_\nu = \sum_{j=1}^\nu \sigma_ju_jv_j^T$ is the *provably best* rank-$\nu$ approximation to $A$, in both spectral and Frobenius norm (Eckart–Young).
> * Singular values are the square roots of the eigenvalues of $A^TA$ — the SVD is, structurally, the EVD of a matrix that's always symmetric, applied to any matrix at all.
> * The minimum-norm least-squares solution to $Ax\approx b$, for any $A$, is $x = A^\dagger b$ — the single formula that generalizes everything this course has built toward solving $Ax=b$ approximately.
