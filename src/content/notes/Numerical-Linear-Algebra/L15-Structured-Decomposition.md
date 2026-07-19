---
id: L15
aliases: ["Diagonalization", "Schur Factorization", "Real Schur Factorization", "Unitary Matrix", "Hermitian Matrix", "Normal Matrix", "Symmetric Positive Definite", "SPD", "SPSD"]
tags: []
---
# Structured Decompositions: Diagonalization, Schur Factorization, and the SVD Revisited

The previous chapter established the basic vocabulary of [[Eigenvalues|eigenvalues]] — algebraic vs. geometric multiplicity, diagonalizability, similarity. This chapter asks a more refined question: given that structure, what extra guarantees does a matrix get if it belongs to a special class (symmetric, positive definite, unitary, normal)? And what can we fall back on when a matrix *isn't* diagonalizable at all? The answer to the second question — Schur factorization — turns out to be a genuinely new tool: a decomposition that exists for *every* square matrix, no exceptions, making it the natural complement to the [[Singular Value Decomposition|SVD]]'s guarantee that *every* rectangular matrix factors nicely too. We close by watching the SVD get built by hand, tying the abstract $A^TA/AA^T$ machinery to concrete numbers.

## Diagonalization: General Form, Revisited

Recall the general diagonalization $A = X\Lambda X^{-1}$, where $\Lambda$ holds the eigenvalues and the columns of $X$ are eigenvectors.

> [!def] Diagonalizable matrix
> $A\in\mathbb{R}^{n\times n}$ (or $\mathbb{C}^{n\times n}$) is diagonalizable if it has a basis of eigenvectors — equivalently, if $A=X\Lambda X^{-1}$ for some invertible $X$.

The key subtlety, worth stating plainly before we specialize: diagonalizability alone says nothing about the *geometry* of $X$. A diagonalizable matrix has a complete set of linearly independent eigenvectors, but those eigenvectors need not be orthogonal — so in general $X^{-1}\neq X^T$. Getting orthogonality requires extra structure on $A$ itself, which is exactly what the next few results supply.

### Symmetric matrices

> [!thm] Spectral theorem for real symmetric matrices
> If $A\in\mathbb{R}^{n\times n}$ satisfies $A^T=A$, then $A$ is diagonalizable by an orthogonal matrix:
> $$A = Q\Lambda Q^T, \qquad Q^TQ=I,$$
> with orthonormal eigenvectors as the columns of $Q$, and all eigenvalues real.

So symmetry buys three things simultaneously: diagonalizability is *guaranteed* (no defective symmetric matrices), the eigenvectors can always be chosen orthonormal, and every eigenvalue is real — a much stronger statement than "diagonalizable" alone.

### Symmetric positive (semi-)definite matrices

Tightening the hypothesis further pins down the *sign* of the eigenvalues too.

> [!def] Symmetric positive definite (SPD)
> A real symmetric $A$ is **positive definite** if $x^TAx > 0$ for every nonzero $x$.

> [!cor] Eigenvalues of an SPD matrix
> If $A$ is SPD, every eigenvalue satisfies $\lambda_i > 0$.

> [!def] Symmetric positive semi-definite (SPSD)
> A real symmetric $A$ is **positive semi-definite** if $x^TAx\ge0$ for every $x$.

> [!cor] Eigenvalues of an SPSD matrix
> If $A$ is SPSD, every eigenvalue satisfies $\lambda_i\ge0$.

Both classes inherit the full spectral theorem — orthonormal eigenbasis, real eigenvalues — and simply add a sign constraint on top. This distinction between "positive" and "nonnegative" eigenvalues is not just bookkeeping: it's exactly what will resurface a few sections from now when we build the SVD out of $A^TA$, which is always SPSD (never merely symmetric) for *any* matrix $A$, rectangular or not.

## The Complex Domain: Hermitian, Unitary, and Normal Matrices

Everything above was stated over $\mathbb{R}$. Working over $\mathbb{C}$ requires one small but essential adjustment: ordinary transpose is replaced by **conjugate transpose**, since over the complex numbers, "preserving length" and "preserving inner products" require conjugation to behave correctly.

> [!def] Conjugate transpose
> For complex $A$, $A^* = (\overline A)^T$. This replaces $A^T$ in essentially every geometric statement once we move to $\mathbb{C}$.

> [!def] Unitary matrix
> $U$ is **unitary** if $U^*U = UU^* = I$, i.e. $U^{-1}=U^*$. Unitary matrices are the complex analogue of orthogonal matrices: they preserve lengths, inner products, and angles, and their columns form an orthonormal basis of $\mathbb{C}^n$.

> [!def] Hermitian matrix
> $A$ is **Hermitian** if $A^*=A$. Hermitian matrices play exactly the role over $\mathbb{C}$ that symmetric matrices play over $\mathbb{R}$ — and indeed, a real symmetric matrix is simply a Hermitian matrix with no imaginary part.

> [!def] Normal matrix
> $A$ is **normal** if $A^*A = AA^*$. This is the broadest of the three classes — it includes Hermitian matrices, unitary matrices, skew-Hermitian matrices, and in fact *any* matrix that is unitarily diagonalizable.

> [!thm] Spectral theorem for normal matrices
> A complex matrix $A$ is unitarily diagonalizable if and only if it is normal:
> $$A = U\Lambda U^*, \qquad U \text{ unitary}, \ \Lambda \text{ diagonal}.$$

The clean summary: over $\mathbb{C}$, **normal $\Longleftrightarrow$ unitarily diagonalizable** — a single algebraic condition ($A^*A=AA^*$) that completely characterizes when the "nicest possible" diagonalization is available. Real symmetric matrices are just the special case where everything happens to stay real.

## Schur Factorization

Diagonalization — even the weaker, non-orthogonal kind — can simply fail: a defective matrix has no full basis of eigenvectors to build $X$ from at all. What do we fall back on? This is where **Schur factorization** earns its place: it is a decomposition that exists for literally every square matrix, with no diagonalizability assumption whatsoever.

> [!thm] Schur factorization
> For every $A\in\mathbb{C}^{n\times n}$, there exists a unitary $Q$ such that
> $$A = QTQ^*,$$
> where $T$ is upper triangular.

The guarantee here is strictly stronger than diagonalization's: it works for *every* square complex matrix, defective or not. The diagonal entries of $T$ are still the eigenvalues of $A$ (recall from the previous chapter that eigenvalues of a triangular matrix are just its diagonal), and if $A$ happens to be normal, $T$ collapses all the way down to diagonal — recovering the spectral theorem above as a special case. In other words, Schur factorization is the "next best thing" whenever full diagonalization isn't available, and it quietly becomes the *same* thing whenever it is.

### Real Schur factorization

If $A$ is real, we'd like to stay in real arithmetic throughout — but a real matrix can still have complex eigenvalues (recall the [[Eigenvalues|conjugate-pair property]] from the previous chapter). A complex number simply cannot sit as a single entry on the diagonal of a *real* triangular matrix, so the real version of Schur's theorem has to compromise.

> [!thm] Real Schur factorization
> For every $A\in\mathbb{R}^{n\times n}$, there exists an orthogonal $Q$ such that
> $$A = QRQ^T,$$
> where $R$ is **quasi-upper triangular**: block upper triangular with $1\times1$ blocks for real eigenvalues and $2\times2$ blocks for complex conjugate eigenvalue pairs. For example:
> $$R = \begin{bmatrix}\lambda_1 & * & * & *\\ 0 & \lambda_2 & * & *\\ 0&0&a&b\\ 0&0&c&d\end{bmatrix}$$
> where $\lambda_1,\lambda_2$ are real eigenvalues and $\begin{bmatrix}a&b\\c&d\end{bmatrix}$ encodes a complex conjugate pair.

> [!note] Why the $2\times2$ blocks appear
> A real matrix's complex eigenvalues always arrive in conjugate pairs. Rather than break real arithmetic to place a single complex number on the diagonal, the real Schur form packages each conjugate pair into a $2\times2$ real block — a compromise that keeps every entry of $Q$ and $R$ real, at the cost of $R$ not being *fully* triangular in the strict sense.

## Algebraic vs. Geometric Multiplicity, Revisited

The previous chapter defined these two notions in detail and illustrated the gap between them with $2I_3$ versus a Jordan-type upper triangular matrix. The same criterion governs diagonalizability here:

> [!thm] Criterion for diagonalizability
> $A$ is diagonalizable if and only if it has $n$ linearly independent eigenvectors — equivalently, geometric multiplicity equals algebraic multiplicity for every eigenvalue.

> [!imp] Defective matrices
> If any eigenvalue's algebraic multiplicity exceeds its geometric multiplicity, $A$ is **defective** and cannot be diagonalized — though, crucially, it *always* still admits a Schur factorization, which is precisely the guarantee that makes Schur factorization useful in the first place.

To make this concrete, it's worth walking through the contrast once more, briefly, since it's the cleanest illustration available.

**Diagonalizable case.** $A = 2I_3$ has characteristic polynomial $(2-\lambda)^3$, so $\lambda=2$ has algebraic multiplicity $3$. Since $A-2I = 0$, *every* vector in $\mathbb{R}^3$ solves $(A-2I)x=0$, so the geometric multiplicity is also $3$. The multiplicities match, and $A$ — already diagonal — is trivially diagonalizable.

**Defective case.** For the Jordan-type matrix $B = \begin{bmatrix}2&1&0\\0&2&1\\0&0&2\end{bmatrix}$, triangularity again gives algebraic multiplicity $3$ for $\lambda=2$. But solving $(B-2I)x=0$ with $B-2I=\begin{bmatrix}0&1&0\\0&0&1\\0&0&0\end{bmatrix}$ forces $x_2=x_3=0$, leaving only a one-dimensional eigenspace spanned by $\begin{bmatrix}1&0&0\end{bmatrix}^T$. Geometric multiplicity is $1 < 3$: $B$ is defective and not diagonalizable — though it *does* still admit both a Schur factorization and a real Schur factorization, since those exist unconditionally.

## Singular Value Decomposition, Revisited

Recall the SVD from earlier chapters: for any $A\in\mathbb{R}^{m\times n}$,
$$A = U\Sigma V^T,$$
with $U,V$ orthogonal and $\Sigma$ rectangular-diagonal with $\sigma_1\ge\sigma_2\ge\cdots\ge0$. (Over $\mathbb{C}$, the analogous statement is $A=U\Sigma V^*$.) Two facts from before are worth having on hand for what follows: the fundamental relation $Av_i=\sigma_iu_i$ (and $A^Tu_i=\sigma_iv_i$), and the rank-one outer-product expansion $A = \sum_{i=1}^r\sigma_iu_iv_i^T$.

### Why the SVD comes from eigenvalues

This is the piece worth re-deriving carefully, since it's the bridge connecting *this* chapter's spectral theorems to the SVD directly.

Given any $A\in\mathbb{R}^{m\times n}$ — rectangular, non-symmetric, anything — form $A^TA\in\mathbb{R}^{n\times n}$ and $AA^T\in\mathbb{R}^{m\times m}$.

> [!pf] Why $A^TA$ is SPSD
> For any $x$, $x^TA^TAx = (Ax)^T(Ax) = \|Ax\|^2 \ge 0$. So $A^TA$ is symmetric positive semi-definite (and the identical argument shows $AA^T$ is too).

This is exactly the payoff promised earlier in this chapter: no matter how badly-behaved $A$ itself is — rectangular, non-normal, whatever — $A^TA$ and $AA^T$ are *always* SPSD, and therefore the spectral theorem guarantees they're always orthogonally diagonalizable with nonnegative real eigenvalues. Substituting $A=U\Sigma V^T$ confirms this directly:
$$A^TA = (U\Sigma V^T)^T(U\Sigma V^T) = V\Sigma^TU^TU\Sigma V^T = V(\Sigma^T\Sigma)V^T,$$
$$AA^T = (U\Sigma V^T)(U\Sigma V^T)^T = U\Sigma V^TV\Sigma^TU^T = U(\Sigma\Sigma^T)U^T.$$

Both are literal spectral decompositions: the columns of $V$ are eigenvectors of $A^TA$, the columns of $U$ are eigenvectors of $AA^T$, and both share eigenvalues $\sigma_i^2$.

> [!thm] Eigenvalue connection for the SVD
> The nonzero eigenvalues of $A^TA$ and $AA^T$ coincide, and equal $\sigma_1^2,\dots,\sigma_r^2$, the squared nonzero singular values of $A$.

> [!imp] A sizing subtlety
> $A^TA$ and $AA^T$ can be different sizes ($n\times n$ versus $m\times m$), so one may simply have more zero eigenvalues padding it out than the other. Their *nonzero* eigenvalues, however, always agree exactly.

### Building the SVD in practice

The derivation above is also a recipe. Two equivalent starting points:

**Starting from $A^TA$:** solve $A^TAv_i = \sigma_i^2v_i$, take the orthonormal eigenvectors as the columns of $V$, then for each $\sigma_i>0$ recover $u_i = Av_i/\sigma_i$.

**Starting from $AA^T$:** solve $AA^Tu_i = \sigma_i^2u_i$, take the orthonormal eigenvectors as the columns of $U$, then for each $\sigma_i>0$ recover $v_i = A^Tu_i/\sigma_i$.

> [!important] When $\sigma_i=0$
> Neither recovery formula works when $\sigma_i=0$ — division by zero. In that case, simply fill in the remaining columns of $U$ or $V$ with any orthonormal basis for the appropriate null space (recall from the SVD chapters that these directions correspond exactly to [[Null Space|$\operatorname{Null}(A)$]] or $\operatorname{Null}(A^T)$, so any orthonormal completion is valid).

## Worked Example: Computing an SVD by Hand

Let $A = \begin{bmatrix}3&0\\4&0\end{bmatrix}$. We build $A = U\Sigma V^T$ from scratch using the recipe above.

**Step 1 — compute $A^TA$.** With $A^T = \begin{bmatrix}3&4\\0&0\end{bmatrix}$,
$$A^TA = \begin{bmatrix}3&4\\0&0\end{bmatrix}\begin{bmatrix}3&0\\4&0\end{bmatrix} = \begin{bmatrix}25&0\\0&0\end{bmatrix}.$$
Its eigenvalues are $\lambda_1=25$, $\lambda_2=0$, so the singular values are $\sigma_1=5$, $\sigma_2=0$, giving
$$\Sigma = \begin{bmatrix}5&0\\0&0\end{bmatrix}.$$

**Step 2 — find $V$.** $A^TA$ is already diagonal, so its eigenvectors are simply the standard basis vectors: $v_1=\begin{bmatrix}1\\0\end{bmatrix}$, $v_2=\begin{bmatrix}0\\1\end{bmatrix}$, giving $V=I$.

**Step 3 — find $U$.** For $\sigma_1=5>0$:
$$u_1 = \frac{Av_1}{\sigma_1} = \frac15\begin{bmatrix}3&0\\4&0\end{bmatrix}\begin{bmatrix}1\\0\end{bmatrix} = \frac15\begin{bmatrix}3\\4\end{bmatrix} = \begin{bmatrix}3/5\\4/5\end{bmatrix}.$$
Since $\sigma_2=0$, the formula $u_2 = Av_2/\sigma_2$ is undefined — exactly the situation flagged above. We instead pick any unit vector orthogonal to $u_1$:
$$u_2 = \begin{bmatrix}-4/5\\3/5\end{bmatrix}, \qquad U = \begin{bmatrix}3/5 & -4/5\\ 4/5 & 3/5\end{bmatrix}.$$

**Step 4 — verify.**
$$U\Sigma V^T = \begin{bmatrix}3/5&-4/5\\4/5&3/5\end{bmatrix}\begin{bmatrix}5&0\\0&0\end{bmatrix}\begin{bmatrix}1&0\\0&1\end{bmatrix} = \begin{bmatrix}3&0\\4&0\end{bmatrix} = A. \checkmark$$

This small example makes visible exactly what the abstract machinery guarantees in general: $A^TA$'s eigenstructure hands you $V$ and $\Sigma$ directly, $A$ itself (via $Av_i/\sigma_i$) hands you as much of $U$ as the nonzero singular values allow, and any leftover directions — here, the entire null space of $A^T$ compressing the second output dimension — get filled in by hand with an orthonormal completion.

## Summary of the Big Picture

| Decomposition | Form | Requires | Always exists? |
|---|---|---|---|
| Eigenvalue decomposition | $A = X\Lambda X^{-1}$ | $n$ independent eigenvectors | No (fails for defective matrices) |
| Real symmetric spectral theorem | $A = Q\Lambda Q^T$ | $A^T=A$ | Yes, for symmetric $A$ |
| Complex normal spectral theorem | $A = U\Lambda U^*$ | $A^*A = AA^*$ | Yes, for normal $A$ |
| Complex Schur factorization | $A = QTQ^*$, $T$ upper triangular | none — any square $A$ | Always |
| Real Schur factorization | $A = QRQ^T$, $R$ quasi-upper triangular | none — any real square $A$ | Always |
| SVD | $A = U\Sigma V^T$ | none — any rectangular $A$ | Always |

The throughline: as the guarantees get stronger — orthogonal/unitary factors, guaranteed existence — the required structure on $A$ gets *weaker*. Full diagonalization by an orthogonal matrix needs the most (symmetry or normality); Schur factorization needs almost nothing (just being square); and the SVD, built from the always-SPSD matrices $A^TA$ and $AA^T$, needs nothing at all — not even a square shape. This is exactly why the SVD sits at the top of the hierarchy this course has been building toward: it is the one factorization every matrix, no matter how badly behaved, is guaranteed to have.
