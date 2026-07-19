---
id: L04
aliases: []
tags: []
---

# Cholesky Factorization, Block Matrices, and Fundamental Subspaces

So far every factorization we've built — $LU$, and its pivoted cousin $PA=LU$ — has worked on general square matrices, with no assumptions beyond invertibility. Many matrices that show up in practice, however, carry extra structure worth exploiting: they are symmetric, and every quadratic form they define is strictly positive. Such matrices arise constantly in applications (covariance matrices, for instance, always have this shape), and they admit a factorization that is both simpler and cheaper than general $LU$: the Cholesky factorization. To understand and manipulate factorizations like this one, it also helps to have a language for working with matrices in *blocks* rather than individual entries — a tool we develop in the second half of this chapter and immediately put to use inverting block matrices via the Schur complement. We then step back from square, invertible matrices altogether and ask what happens when $A$ isn't square at all, which leads us to the first of four fundamental subspaces associated with any matrix: the column space.

## Cholesky Factorization

Cholesky factorization is, in essence, an $LU$ factorization specialized to a particularly well-behaved class of matrices.

> [!def] Cholesky Factorization
> The Cholesky factorization applies to a nonsingular, *symmetric positive definite* (SPD) matrix $A \in \mathbb{R}^{n\times n}$.

Before defining the factorization itself, it's worth pinning down exactly what "symmetric" and "positive definite" mean, since both properties are what make Cholesky possible.

> [!def] Symmetric
> $A$ is **symmetric** if
> $$ A = A^{\mathsf T}. $$

> [!def] Positive Definite
> $A$ is **positive definite** if
> $$
> v^{\mathsf T}Av > 0 \qquad \forall\, v \in \mathbb{R}^n \setminus \{\vec 0\}.
> $$
> That is, the quadratic form $v^{\mathsf T}Av$ is strictly positive for every nonzero vector $v$.

Together, these two properties guarantee something that general square matrices don't: a factorization that needs no pivoting at all, and that uses a *single* triangular factor rather than two.

> [!thm] Existence of the Cholesky Factorization
> For any SPD matrix $A$, there exists a **unique** factorization
> $$
> A = R^{\mathsf T}R,
> $$
> where $R$ is upper triangular with strictly positive diagonal entries, $r_{i,i} > 0$.
>
> [!tip] $R$ is called the **Cholesky factor** of $A$.

## Block Matrices

To go further with factorizations like this — and, in particular, to reason about how they interact with matrix inversion — it's useful to be able to treat matrices not entry-by-entry, but as grids of smaller matrices, or *blocks*.

> [!def] Block Matrices
> A matrix can be partitioned into submatrices and multiplied blockwise, just as ordinary matrix multiplication works entrywise:
> $$
> \begin{bmatrix}
> A_{1,1} & A_{1,2} \\
> A_{2,1} & A_{2,2}
> \end{bmatrix}
> \begin{bmatrix}
> X_{1,1} & X_{1,2} \\
> X_{2,1} & X_{2,2}
> \end{bmatrix} =
> \begin{bmatrix}
> B_{1,1} & B_{1,2} \\
> B_{2,1} & B_{2,2}
> \end{bmatrix}
> $$
> Here $A$, $X$, and $B$ are each composed of *submatrices*.
>
> [!tip] The partitioning must be **conforming**: the dimensions of the submatrices being multiplied and added must match, exactly as if each block were a single number.

This blockwise view pays off immediately when we ask how to invert a matrix that has natural block structure. Three cases, of increasing generality, cover essentially everything we'll need.

### Inverting Block Matrices

> [!ex] Case A: Block Diagonal
> If $A$ and $B$ are each invertible,
> $$
> \begin{bmatrix}
> A & 0 \\
> 0 & B
> \end{bmatrix}^{-1} =
> \begin{bmatrix}
> A^{-1} & 0      \\
> 0      & B^{-1}
> \end{bmatrix}.
> $$
> With no interaction between blocks, the inverse simply inverts each block in place.

Once the two blocks are allowed to interact — as in a block *upper triangular* matrix — the inverse picks up a correction term that accounts for that interaction.

> [!ex] Case B: Block Upper Triangular
> $$
> \begin{bmatrix}
> A & C \\
> 0 & B
> \end{bmatrix}^{-1} =
> \begin{bmatrix}
> A^{-1} & -A^{-1}CB^{-1} \\
> 0      & B^{-1}
> \end{bmatrix}.
> $$
>
> > [!pf] Verification
> > Multiplying the proposed inverse against the original matrix confirms the formula:
> > $$
> > \begin{bmatrix}
> > A & C \\
> > 0 & B
> > \end{bmatrix}
> > \begin{bmatrix}
> > A^{-1} & -A^{-1}CB^{-1} \\
> > 0      & B^{-1}
> > \end{bmatrix} =
> > \begin{bmatrix}
> > AA^{-1} + C\cdot 0 & A(-A^{-1}CB^{-1}) + CB^{-1} \\
> > 0\cdot A^{-1} + B\cdot 0 & 0\cdot(-A^{-1}CB^{-1}) + BB^{-1}
> > \end{bmatrix} =
> > \begin{bmatrix}
> > I & 0 \\
> > 0 & I
> > \end{bmatrix}.
> > $$
> > The off-diagonal correction term $-A^{-1}CB^{-1}$ is exactly what's needed to cancel the cross-term $CB^{-1}$ introduced by the coupling block $C$.

The block diagonal and block triangular cases both benefit from a $0$ block that decouples part of the computation. The fully general case — no zero block anywhere — requires a genuinely new idea.

> [!ex] Case C: No Zero Block
> Consider a general partitioned matrix
> $$
> M = \begin{bmatrix} A & C \\ E & B \end{bmatrix}
> $$
> and ask: what is $M^{-1}$?
>
> > [!thm] Existence, and a Choice
> > A closed form for $M^{-1}$ exists whenever the relevant blocks are invertible. This raises a natural question: is it easier to work with $A^{-1}$, or with $B^{-1}$? Either choice works, and each leads to its own formula, built around a quantity called the **Schur complement**.
> >
> > > [!def] Schur Complement
> > > Define
> > > $$
> > > S = B - EA^{-1}C \qquad \text{(Schur complement of $A$ in $M$)}
> > > $$
> > > $$
> > > T = A - CB^{-1}E \qquad \text{(Schur complement of $B$ in $M$)}
> > > $$
> >
> > These two complements each lead to an equivalent, but differently organized, formula for $M^{-1}$:
> > $$
> > M^{-1} =
> > \begin{cases}
> > \begin{bmatrix}
> > A^{-1}+A^{-1}CS^{-1}EA^{-1} & -A^{-1}CS^{-1} \\
> > -S^{-1}EA^{-1}              & S^{-1}
> > \end{bmatrix} & \text{when $A$ is invertible} \\[2em]
> > \begin{bmatrix}
> > T^{-1}              & -T^{-1}CB^{-1} \\
> > -B^{-1}ET^{-1}       & B^{-1}+B^{-1}ET^{-1}CB^{-1}
> > \end{bmatrix} & \text{when $B$ is invertible}
> > \end{cases}
> > $$
> > In practice, whichever of $A$ or $B$ is smaller (or easier to invert) determines which form is more efficient to use.

## Rectangular Systems and Echelon Form

Every factorization so far has assumed $A$ is square. But the equation $Ax = b$ makes perfectly good sense when $A$ isn't square, and the *shape* of $A$ turns out to control how many solutions we should expect.

> [!case] Three Shapes: Square, Fat-Short, Tall-Skinny
> $$
> \underbrace{\begin{bmatrix} x & x \\ x & x \end{bmatrix}\begin{bmatrix} x \\ x \end{bmatrix}}_{\text{square}}
> \qquad\qquad
> \underbrace{\begin{bmatrix} x & x & x \end{bmatrix}\begin{bmatrix} x \\ x \\ x \end{bmatrix}}_{\text{fat-short}}
> \qquad\qquad
> \underbrace{\begin{bmatrix} x \\ x \\ x \end{bmatrix}\begin{bmatrix} x \end{bmatrix}}_{\text{tall-skinny}}
> $$
>
> 1. **Square** — assuming $A$ is non-singular, there is a unique solution, obtainable by Cholesky, LU factorization, iterative solvers, and the like.
> 2. **Fat-Short** (more columns than rows) — there are infinitely many solutions, since the system is under-determined.
> 3. **Tall-Skinny** (more rows than columns) — there is generally no exact solution at all, since the system is over-determined; the best we can do is find a *least-squares* approximation.

The tall-skinny case is where least-squares problems live, and we'll return to it in depth later in the course. For now, the key takeaway is that solvability depends fundamentally on shape, not just on the individual entries of $A$ — which is exactly the kind of structural question the *fundamental subspaces* of a matrix are designed to answer.

## Four Fundamental Subspaces

Every matrix has four subspaces naturally associated with it, each capturing a different structural question — what $A$ can produce, what maps to zero, and the analogous questions for $A^{\mathsf T}$. We begin with the first and most immediately useful of the four: the column space.

### Column Space

Recall from an earlier chapter that $\text{Col}(A)$ is the set of all linear combinations of $A$'s columns — equivalently, the set of all vectors $b$ for which $Ax = b$ has a solution. To find a *basis* for $\text{Col}(A)$ in practice, we row-reduce $A$ to echelon form and read off which columns end up containing pivots.

> [!def] Column Space
> Consider the matrix
> $$
> A =
> \begin{bmatrix}
> 1 & 2 & 1 & 3 & 3 \\
> 2 & 4 & 0 & 4 & 4 \\
> 1 & 2 & 3 & 5 & 5 \\
> 2 & 4 & 0 & 4 & 7
> \end{bmatrix}.
> $$
> Eliminating column 1 below the pivot ($R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$, $R_4 \leftarrow R_4 - 2R_1$) gives
> $$
> \begin{bmatrix}
> 1 & 2 & 1  & 3  & 3  \\
> 0 & 0 & -2 & -2 & -2 \\
> 0 & 0 & 2  & 2  & 2  \\
> 0 & 0 & -2 & -2 & 1
> \end{bmatrix}.
> $$
> Eliminating column 3 below its pivot ($R_3 \leftarrow R_3 + R_2$, $R_4 \leftarrow R_4 - R_2$), then swapping the resulting zero row to the bottom, produces the echelon form
> $$
> \text{Echelon}(A) =
> \begin{bmatrix}
> 1 & 2 & 1  & 3  & 3  \\
> 0 & 0 & -2 & -2 & -2 \\
> 0 & 0 & 0  & 0  & 3  \\
> 0 & 0 & 0  & 0  & 0
> \end{bmatrix}.
> $$
> The pivots are $\{1, -2, 3\}$, sitting in columns $1$, $3$, and $5$. A basis for $\text{Col}(A)$ is obtained by taking the *original* (not row-reduced) columns of $A$ at those same pivot positions:
> $$
> \text{Basis of } \text{Col}(A) =
> \left\{
> \begin{bmatrix} 1 \\ 2 \\ 1 \\ 2 \end{bmatrix},
> \begin{bmatrix} 1 \\ 0 \\ 3 \\ 0 \end{bmatrix},
> \begin{bmatrix} 3 \\ 4 \\ 5 \\ 7 \end{bmatrix}
> \right\}.
> $$

This example illustrates a general fact that holds for any matrix: the number of pivots produced by row reduction is not just an incidental byproduct of the computation — it *is* the rank, and it equals the dimension of the column space.

> [!thm] Rank and the Column Space
> For any matrix $A$,
> $$
> \operatorname{rank}(A)
> = \text{number of pivots}
> = \dim(\operatorname{Col}(A))
> = \text{number of nonzero rows in echelon form}
> = \text{number of basic (pivot) columns of } A.
> $$
> In the example above, all four quantities agree: there are $3$ pivots, $3$ nonzero rows in echelon form, and the $3$ pivot columns of $A$ form a basis of a $3$-dimensional column space.

The column space is only the first of the four fundamental subspaces — the row space, null space, and left null space each answer a related but distinct question about $A$, and we turn to them next.
