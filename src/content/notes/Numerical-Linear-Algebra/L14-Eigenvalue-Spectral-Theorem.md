---
id: L14
aliases: ["Eigenvalues", "Eigenvectors", "Eigenvalue", "Eigenvector", "Spectrum", "Spectral Radius", "Eigenspace", "Algebraic Multiplicity", "Geometric Multiplicity", "Characteristic Polynomial", "Spectral Theorem", "Diagonalizable"]
tags: []
---

# Eigenvalues, Eigenvectors, and the Spectral Theorem

We closed the previous chapter with the [[Pseudoinverse|pseudoinverse]], $x = A^\dagger b$ — a single formula that solves the [[Least Squares|least-squares problem]] for *any* matrix, rank-deficient or not. That result is worth restating briefly here as a bridge, before this chapter turns to a different question entirely: not "how do we solve $Ax\approx b$?" but "what does $A$ *do*, intrinsically, as a transformation?" That second question is where eigenvalues and eigenvectors, first introduced a few chapters back, get their full treatment — multiplicities, diagonalizability, similarity, and the spectral theorem that makes symmetric matrices so exceptionally well-behaved.

## Least Squares via SVD, Revisited

Recall the algorithm from the previous chapter for solving $Ax\approx b$ using $A = U\Sigma V^T$: compute $c = U^Tb$, divide each component by its corresponding singular value where possible, zero out the rest, and rotate back with $V$.

> [!thm] Least-Squares Solution via SVD
> The minimum-Euclidean-norm least-squares solution to $Ax\approx b$ is
> $$x = A^\dagger b, \qquad A^\dagger = V\Sigma^\dagger U^T,$$
> the Moore–Penrose pseudoinverse.

> [!pf]
> With $\operatorname{rank}(A) = r$, write $\Sigma = \begin{bmatrix}\hat\Sigma&0\\0&0\end{bmatrix}$ and $\Sigma^\dagger = \begin{bmatrix}\hat\Sigma^{-1}&0\\0&0\end{bmatrix}$, where $\hat\Sigma = \operatorname{diag}(\sigma_1,\dots,\sigma_r)$. Setting $c=U^Tb$, the construction gives $y = \begin{bmatrix}\hat\Sigma^{-1}\hat c\\0\end{bmatrix} = \Sigma^\dagger c$, so $x = Vy = V\Sigma^\dagger U^Tb = A^\dagger b$.

> [!note] Why the leftover components are zeroed
> When $\sigma_i = 0$, dividing by it is meaningless — and geometrically, those directions correspond to the null space of $A$, so they have no effect whatsoever on the residual $\|Ax-b\|$. Zeroing them out doesn't cost anything in terms of fit; it simply selects the smallest-norm solution among the (possibly infinite) family of equally good ones.

With that closed off, we turn to the deeper structural question this course has been building toward since eigenvectors first appeared: when, and how completely, can a matrix be understood through its eigenvalues alone?

## Eigenvalues and Eigenvectors: Basic Setup

> [!def] Eigenvalue and eigenvector
> Let $A\in\mathbb{R}^{m\times m}$ (or $\mathbb{C}^{m\times m}$). A scalar $\lambda$ is an **eigenvalue** of $A$ if there exists a nonzero vector $x$ with
> $$Ax = \lambda x.$$
> Any such nonzero $x$ is an **eigenvector** associated with $\lambda$.

Rearranging, $Ax=\lambda x$ is the same as $(A-\lambda I)x = 0$ — so $\lambda$ is an eigenvalue precisely when $A-\lambda I$ is singular (has a nontrivial null space). This single observation is what turns eigenvalue-hunting into a determinant computation later in this chapter.

> [!def] Spectrum and spectral radius
> The set of all eigenvalues of $A$ is its **spectrum**, $\sigma(A) = \{\lambda_1,\dots,\lambda_n\}$. The **spectral radius** is
> $$\rho(A) = \max_{\lambda\in\sigma(A)}|\lambda|.$$

Recall from a few chapters back that when $A$ has $n$ linearly independent eigenvectors, stacking them as columns of $X$ gives $AX=X\Lambda$ and, if $X$ is invertible, $A=X\Lambda X^{-1}$.

> [!imp] Existence is not automatic
> Not every matrix admits this eigenvalue decomposition. It exists exactly when $A$ has a full basis of eigenvectors — i.e. exactly when $A$ is diagonalizable. The rest of this chapter is largely about pinning down exactly when that happens.

## Multiplicities of Eigenvalues

To understand diagonalizability precisely, we need two different ways of counting "how much" a given eigenvalue shows up — and, crucially, these two counts don't always agree.

> [!def] Eigenspace and geometric multiplicity
> For an eigenvalue $\lambda$, the **eigenspace** is
> $$E_\lambda = \{x : (A-\lambda I)x=0\} = \mathcal N(A-\lambda I).$$
> Its dimension, $\dim E_\lambda$, is the **geometric multiplicity** of $\lambda$ — literally, the number of independent eigenvector directions available for that eigenvalue.

Because $x\in E_\lambda$ implies $Ax=\lambda x \in E_\lambda$, the eigenspace is an *invariant subspace*: $A$ maps it entirely back into itself.

> [!def] Algebraic multiplicity
> The **algebraic multiplicity** of $\lambda$ is its multiplicity as a root of the characteristic polynomial $\det(A-\lambda I)$ — how many times $\lambda$ shows up when you factor that polynomial.

These two numbers are related, but not identical:

> [!thm] Multiplicity ordering
> For every eigenvalue $\lambda$,
> $$1 \le \text{geometric multiplicity} \le \text{algebraic multiplicity}.$$

> [!def] Simple, defective, and diagonalizable
> * An eigenvalue is **simple** if its algebraic multiplicity is $1$ (in which case the two multiplicities automatically agree, since geometric multiplicity is always at least $1$).
> * An eigenvalue is **defective** if its geometric multiplicity is strictly *less than* its algebraic multiplicity — there are "missing" eigenvectors.
> * A matrix is **defective** if it has at least one defective eigenvalue.
> * A matrix is **diagonalizable** if it has $n$ linearly independent eigenvectors in total.

> [!cor] Criterion for diagonalizability
> $A\in\mathbb{C}^{n\times n}$ is diagonalizable if and only if, for *every* eigenvalue, geometric multiplicity equals algebraic multiplicity — equivalently, the eigenspaces together supply all $n$ independent eigenvectors needed to build an invertible $X$.

> [!thm] Conjugate pair property
> If $A$ is real and $\lambda=\alpha+i\beta$ is a nonreal eigenvalue, then $\bar\lambda = \alpha-i\beta$ is also an eigenvalue. This follows because the characteristic polynomial of a real matrix has real coefficients, and complex roots of real polynomials always occur in conjugate pairs.

### Two matrices, the same eigenvalue, very different geometry

The gap between algebraic and geometric multiplicity is easiest to see side by side, using two matrices that share an eigenvalue but behave completely differently.

**A scalar matrix.** Let $A = 2I_3$. Then $Av=\lambda v$ forces $2v=\lambda v$ for every nonzero $v$, so $\lambda=2$ is the only eigenvalue, with algebraic multiplicity $3$. But *every* nonzero vector in $\mathbb{R}^3$ satisfies this, so $E_2 = \mathbb{R}^3$ and the geometric multiplicity is also $3$. Algebraic and geometric multiplicities match perfectly — no surprise, since scalar matrices are about as diagonal as a matrix can get.

**A Jordan-type matrix.** Now let
$$B = \begin{bmatrix}2&1&0\\0&2&1\\0&0&2\end{bmatrix}.$$
Since $B$ is upper triangular, its eigenvalues are its diagonal entries — so $\lambda=2$ again has algebraic multiplicity $3$. But solving $(B-2I)v=0$ with
$$B-2I = \begin{bmatrix}0&1&0\\0&0&1\\0&0&0\end{bmatrix}$$
forces $v_2=v_3=0$, leaving only $v_1$ free. So every eigenvector is a multiple of $\begin{bmatrix}1&0&0\end{bmatrix}^T$ — a single direction. Geometric multiplicity is just $1$, far short of the algebraic multiplicity of $3$. $B$ is defective, and therefore *not* diagonalizable, even though it has "the same" eigenvalue as $2I_3$ with the same algebraic multiplicity.

> [!imp] The real lesson
> Having a repeated eigenvalue does **not**, by itself, cause any problem — $2I_3$ is repeated *and* perfectly diagonalizable. The issue is specifically whether there are enough independent eigenvectors to go around. $B$'s off-diagonal $1$'s are what "use up" the missing eigenvector directions.

## Similar Matrices

Diagonalization, when it exists, is really a special case of a broader relationship between matrices that represent the same transformation viewed through different coordinate systems.

> [!def] Similar matrices
> Square matrices $A$ and $B$ are **similar** if there is an invertible $X$ with $A = XBX^{-1}$. Similarity means $A$ and $B$ describe the *same* linear map, just expressed in two different bases — $X$ is the change-of-basis matrix connecting them.

This immediately explains why diagonalization is so useful: $A=X\Lambda X^{-1}$ says precisely that $A$ is similar to a diagonal matrix, meaning that in the coordinate system given by $A$'s eigenvectors, $A$'s action is nothing more than independent scaling along each axis.

> [!thm] Invariants under similarity
> If $A$ and $B$ are similar, they share: the same characteristic polynomial, minimal polynomial, eigenvalues, algebraic multiplicities, geometric multiplicities, trace, and determinant.

> [!pf]
> From $A = XBX^{-1}$, $A-\lambda I = X(B-\lambda I)X^{-1}$, so $\det(A-\lambda I) = \det(B-\lambda I)$ — identical characteristic polynomials. For the eigenspaces: $(A-\lambda I)x = 0 \iff X(B-\lambda I)X^{-1}x = 0$. Setting $y=X^{-1}x$ gives $(B-\lambda I)y=0$, so the null spaces of $A-\lambda I$ and $B-\lambda I$ are related by the invertible linear map $X$, hence isomorphic and of equal dimension — geometric multiplicities match too.

## Eigenvalue Decomposition and the Spectral Theorem

When $A$ is diagonalizable, $A = X\Lambda X^{-1}$ with the columns of $X$ as eigenvectors — but in general, $X$ need not be orthogonal. Recall from a few chapters ago that one special class of matrices does better.

> [!thm] Spectral theorem for real symmetric matrices
> If $A = A^T \in \mathbb{R}^{n\times n}$, there exist $U,D\in\mathbb{R}^{n\times n}$ with $U$ orthogonal ($U^TU=I$), $D$ real diagonal, and
> $$A = UDU^T.$$
> Consequently, $A$ has an orthonormal basis of real eigenvectors.

This is genuinely stronger than ordinary diagonalizability — every symmetric matrix is automatically diagonalizable *and* the change-of-basis matrix can always be chosen orthogonal, meaning no eigenvector directions are ever "missing" the way they were for the defective matrix $B$ above. This is exactly the fact used, back when SVD was first introduced, to guarantee that $A^TA$ and $AA^T$ always diagonalize nicely regardless of what $A$ itself looks like.

Symmetry turns out to be one instance of a more general sufficient condition.

> [!def] Normal matrix
> $A\in\mathbb{C}^{n\times n}$ is **normal** if $A^*A = AA^*$ (where $A^* = A^T$ for real matrices, and $A^*$ denotes the conjugate transpose in general).

> [!thm] Spectral theorem for normal matrices
> A complex matrix is normal if and only if it is unitarily diagonalizable: there exists a unitary $U$ with $A = U\Lambda U^*$.

> [!cor]
> Every real symmetric matrix is normal (since $A^T=A$ trivially commutes with itself), so this general spectral theorem recovers the real symmetric case above as a special instance.

## Computing Eigenvalues

Recall that $\lambda$ is an eigenvalue exactly when $A-\lambda I$ is singular — which, algebraically, means exactly when its determinant vanishes.

> [!def] Characteristic polynomial
> Eigenvalues are the roots of
> $$p(\lambda) = \det(A-\lambda I) = \lambda^n + a_{n-1}\lambda^{n-1} + \cdots + a_1\lambda + a_0.$$

> [!imp] The easy case
> For triangular matrices, the eigenvalues are exactly the diagonal entries — no determinant computation needed at all. This is precisely why the two examples earlier in this chapter ($2I_3$ and the Jordan-type $B$) were so easy to read off: both are triangular by construction.

In practice, though, this polynomial-root approach quickly runs into trouble for larger matrices:

> [!important] Why eigenvalues aren't computed this way in practice
> * There is no general formula by radicals for polynomial roots of degree $n\ge5$ (Abel–Ruffini theorem) — so for $n\times n$ matrices with $n\ge5$, there's no closed-form expression for the eigenvalues even in principle.
> * Root-finding for the characteristic polynomial is itself numerically unstable — small perturbations in the polynomial's coefficients can shift its roots dramatically, echoing the same swamping and conditioning concerns raised throughout the numerical-stability chapters of this course.
> * Practical algorithms instead compute eigenvalues *iteratively*, without ever forming the characteristic polynomial explicitly: the **QR algorithm** and its shifted variants, along with **power iteration** and **inverse iteration** for targeting specific eigenvalues, are the standard tools — a fitting return to the QR factorization that opened this whole unit.

## Key Takeaways

> [!imp] Main facts to remember
> * The SVD gives a numerically stable route to least-squares solutions via the pseudoinverse, $A^\dagger = V\Sigma^\dagger U^T$.
> * Eigenvalues satisfy $Ax=\lambda x \iff (A-\lambda I)x=0$, so they're the roots of $\det(A-\lambda I)=0$.
> * Algebraic multiplicity counts roots of the characteristic polynomial; geometric multiplicity counts independent eigenvectors — and geometric $\le$ algebraic always, with equality required for diagonalizability.
> * A matrix is diagonalizable exactly when it has $n$ independent eigenvectors in total; repeated eigenvalues are only a problem when they're *defective*.
> * Similar matrices represent the same linear map in different bases, and therefore share all spectral data: eigenvalues, multiplicities, trace, and determinant.
> * Real symmetric (and more generally normal) matrices are exceptionally well-behaved: they always admit an orthonormal eigenbasis, $A = UDU^T$ — the structural fact underlying the SVD itself.
