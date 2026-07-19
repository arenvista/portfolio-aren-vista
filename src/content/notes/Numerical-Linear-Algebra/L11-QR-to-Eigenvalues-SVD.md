---
id: L11
aliases: ["Full QR Factorization", "Similar Matrices", "Eigenvalue Decomposition", "EVD"]
tags: []
---
# From QR to Eigenvalues: Full QR, Diagonalization, and the Road to SVD

The last few chapters built the [[QR Factorization|QR factorization]] as a tool for solving [[Least Squares|least-squares problems]] stably. This chapter does two things. First, it fills in a detail we glossed over: QR actually comes in two flavors — "thin" and "full" — and understanding the difference reveals something structural about the [[Four Fundamental Subspaces|four fundamental subspaces]] of $A$. Second, it pivots toward an entirely new question: instead of factoring $A$ to solve $Ax=b$, can we factor $A$ to understand how it *acts* as a transformation — stretching space along certain special directions? That question leads to eigenvalues, diagonalization, and ultimately the [[Singular Value Decomposition|singular value decomposition (SVD)]], which generalizes eigen-decomposition to matrices that aren't even square.

---

## Full QR Factorization

Every factorization we've built so far — reflectors chained together, Givens rotations chained together — produced a **square** orthogonal matrix $Q$, even when $A$ itself was rectangular. For a tall, skinny matrix $A \in \mathbb{R}^{m\times n}$ with $m > n$, this means $Q \in \mathbb{R}^{m\times m}$ has more columns than $A$ does. What are those extra columns *for*?

> [!def] Full QR Factorization
> For $A \in \mathbb{R}^{m\times n}$ (tall and skinny, $m > n$):
> $$A = QR, \qquad Q \in \mathbb{R}^{m\times m} \text{ orthogonal}, \qquad R \in \mathbb{R}^{m\times n} \text{ upper triangular (with an all-zero bottom block)}.$$

Because $R$'s bottom $m-n$ rows are entirely zero, we can split both $Q$ and $R$ into blocks and discard the part of the product that multiplies against zero:
$$
A = QR = \begin{bmatrix}\hat Q & \tilde Q\end{bmatrix}\begin{bmatrix}\hat R \\ 0\end{bmatrix} = \hat Q\hat R + \tilde Q\cdot 0 = \hat Q\hat R.
$$

Here $\hat Q \in \mathbb{R}^{m\times n}$ consists of the first $n$ columns of $Q$, and $\hat R\in\mathbb{R}^{n\times n}$ is the nonzero top block of $R$ — square and upper triangular. This smaller factorization, $A = \hat Q\hat R$, is exactly the **thin QR factorization** used throughout the least-squares chapter: it's all you need to solve $\min_x\|Ax-b\|_2$, since the extra columns $\tilde Q$ never interacted with $R$ in the first place.

So the "full" factorization isn't a different answer — it's the same $\hat Q\hat R$ padded out with extra orthogonal columns $\tilde Q$ so that $Q$ is square. Those extra columns turn out to have a precise geometric meaning.

> [!cor] What the extra columns represent
> * The columns of $\hat Q$ form an orthonormal basis for $\operatorname{Col}(A)$ (also called $\operatorname{Range}(A)$) — the same column space that least squares projects $b$ onto.
> * The remaining columns $q_j$ for $j > n$ are orthogonal to every column of $\hat Q$, and therefore orthogonal to all of $\operatorname{Range}(A)$. Assuming $A$ has full column rank, these columns form a basis for $\operatorname{Nul}(A^T)$ — the left null space of $A$.

This is a nice structural payoff: the single matrix $Q$, built purely from reflectors or rotators with no reference to null spaces at all, ends up encoding *both* fundamental subspaces of $A$ (its column space and its left null space) as two orthogonal blocks. This is a preview of a theme that will return with full force in the SVD at the end of this chapter: factorizations built from orthogonal matrices tend to reveal a matrix's underlying subspace structure "for free."

---

## Eigenvalues and Eigenvectors

QR factorization answers "how do I solve $Ax=b$ stably?" A completely different question is: does $A$, acting as a linear transformation, have any special directions that it simply *stretches* rather than rotates or distorts? That's the question eigenvectors answer.

> [!def] Eigenvalue / Eigenvector
> A nonzero vector $\vec x$ is an **eigenvector** of $A$, with corresponding **eigenvalue** $\lambda$, if
> $$A\vec x = \lambda \vec x.$$
> In words: multiplying $\vec x$ by $A$ doesn't change its direction — it only scales it by the factor $\lambda$.

> [!lem] Uniqueness (and non-uniqueness)
> For a fixed eigenvector $\vec x$, the eigenvalue $\lambda$ it produces is unique — there's only one scaling factor associated with that direction. Eigenvector*s*, however, are **not** unique: any nonzero scalar multiple of $\vec x$ is also a valid eigenvector with the same eigenvalue $\lambda$, and more generally the set of all eigenvectors sharing a given $\lambda$ (together with the zero vector) forms a subspace called the **eigenspace** of $\lambda$.

---

## Eigenvalue Decomposition

If a matrix has enough eigenvectors, we can package all of them into a single factorization that describes $A$'s action completely.

> [!def] Eigenvalue Decomposition
> Collect the eigenvectors as columns of a matrix, and the eigenvalues as a diagonal matrix:
> $$
> X = \begin{bmatrix}\vec x_1 & \vec x_2 & \cdots & \vec x_n\end{bmatrix}, \qquad
> \Lambda = \begin{bmatrix}\lambda_1 & & & \\ & \lambda_2 & & \\ & & \ddots & \\ & & & \lambda_n\end{bmatrix}.
> $$
> If $A$ has $n$ linearly independent eigenvectors (equivalently, the number of independent eigenvalue directions equals $\operatorname{rank}(A) = n$), then
> $$AX = X\Lambda \quad\Longleftrightarrow\quad A = X\Lambda X^{-1},$$
> and we say $A$ is **diagonalizable** — or equivalently, that $A$ is **similar** to the diagonal matrix $\Lambda$.

Why is $AX=X\Lambda$ equivalent to stacking up the eigenvector equations? Multiplying $A$ by the matrix $X$ column-by-column just applies $A\vec x_j = \lambda_j\vec x_j$ to each column simultaneously — so $AX = X\Lambda$ is nothing more than a compact way of writing "all $n$ eigenvector equations at once."

> [!def] Similar matrices
> Two matrices $A, B$ are **similar** if there exists an invertible matrix $M$ such that
> $$A = MBM^{-1}.$$
> Similar matrices represent the *same* linear transformation, just expressed in different coordinate systems (bases) — $M$ is the change-of-basis matrix. Diagonalizability says precisely that $A$'s transformation looks like simple axis-scaling once you view it in the coordinate system given by its eigenvectors.

> [!important] Not every matrix is diagonalizable
> The decomposition $A = X\Lambda X^{-1}$ requires $X$ to be invertible, which requires $n$ *linearly independent* eigenvectors. Some matrices simply don't have enough — repeated eigenvalues can come with an eigenspace that's "too small," in which case no such $X$ exists and $A$ is not diagonalizable at all.

### A well-behaved special case: symmetric positive definite matrices

For one important class of matrices, diagonalizability is guaranteed, and even better, the eigenvector matrix can be chosen to be *orthogonal* — directly reconnecting this section to the [[Orthogonal Matrices|reflectors and rotators]] built earlier in the course.

> [!cor] Spectral decomposition of SPD matrices
> If $A$ is symmetric positive definite (SPD), its eigenvectors can be chosen orthonormal, and the decomposition can be written as a sum of rank-one pieces:
> $$A = \sum_{i=1}^n \lambda_i\, q_iq_i^T \qquad \text{(a sum of rank-one matrices)}$$
> where $\{q_i\}$ is an orthonormal eigenvector basis. Each term $\lambda_i q_iq_i^T$ should look familiar: it's exactly the projector $P_{q_i} = q_iq_i^T$ from the very first chapter of this course, scaled by $\lambda_i$. So an SPD matrix is, structurally, nothing more than a weighted sum of orthogonal projections onto its eigenvector directions.

---

## Singular Value Decomposition (SVD)

Eigenvalue decomposition has a hard requirement built into its definition: $A$ must be square, since $A\vec x$ and $\lambda\vec x$ have to live in the same space for the equation $A\vec x=\lambda\vec x$ to even make sense. But most of the matrices in this course — the tall, skinny $A\in\mathbb{R}^{m\times n}$ from least squares and full QR — are not square at all. The **singular value decomposition** generalizes the same underlying idea (find special directions that $A$ acts on simply) to matrices of any shape.

> [!def] Singular Value Decomposition
> For any $A \in \mathbb{R}^{m\times n}$ (no requirement that $m=n$):
> $$A = U\Sigma V^T$$
> where $U\in\mathbb{R}^{m\times m}$ and $V\in\mathbb{R}^{n\times n}$ are orthogonal, and $\Sigma\in\mathbb{R}^{m\times n}$ is diagonal (in the generalized, rectangular sense):
> $$
> \Sigma = \begin{bmatrix}\sigma_1 & & & \\ & \sigma_2 & & \\ & & \ddots & \\ & & & \sigma_r \\ & & & & 0\end{bmatrix},
> $$
> padded with zero rows or columns as needed to match the shape of $A$.

The relationship between SVD and eigen-decomposition is direct rather than coincidental: the columns of $V$ are eigenvectors of $A^TA$, the columns of $U$ are eigenvectors of $AA^T$, and the singular values satisfy $\sigma_i = \sqrt{\lambda_i(A^TA)}$. In other words, SVD is what you get by applying eigen-decomposition to the *square, symmetric* matrices $A^TA$ and $AA^T$ built from $A$ — which brings the discussion full circle back to the SPD spectral decomposition above, since $A^TA$ is always symmetric positive semi-definite.

> [!note] Why this matters going forward
> Recall from the [[Least Squares|least-squares chapters]] that forming $A^TA$ is exactly the numerically dangerous step we worked hard to avoid, because it squares the [[Condition Number|condition number]]. SVD is the tool that lets us understand and work with $A^TA$'s eigenstructure *without* ever forming that unstable product directly — which is precisely why SVD was flagged earlier as the most numerically robust (if most expensive) way to solve least-squares problems, and why it will be the natural next topic to develop in full.
