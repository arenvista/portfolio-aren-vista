---
id: L02
aliases: ["Matrix Multiplication", "Matrix–Vector Multiplication", "CR Factorization", "Invertible Matrix Theorem", "Solving Linear Systems"]
tags: []
---
# Matrix Multiplication, Factorization, and Solving Linear Systems

In the previous chapter we treated $Ax$ as a [[Column Space|linear combination of the columns]] of $A$. That single idea is the seed from which almost everything in this chapter grows. We first extend it from *matrix times vector* to *matrix times matrix*, viewing the result in two complementary ways — as a collection of inner products and as a sum of outer products. That second view turns out to be more than a curiosity: it hands us the key insight behind our first true matrix factorization, the CR factorization, which expresses any matrix in terms of its independent columns. From there we introduce the [[LU Factorization|LU factorization]], a tool purpose-built for solving $Ax = b$ efficiently, and close by formalizing what it means for a matrix to be invertible and how that concept relates back to solving linear systems in practice.

## Matrix–Vector Multiplication

We start by revisiting matrix–vector multiplication, this time paying close attention to *how* the output is built rather than just what it equals.

> [!def] Matrix–Vector Multiplication
> Given a matrix $A$ and a vector $x = \begin{bmatrix} v_1 \\ v_2 \end{bmatrix}$, the product $Ax$ is computed row by row:
> $$
> Ax =
> \begin{bmatrix}
> 2 & 5 \\
> 3 & 7
> \end{bmatrix}
> \begin{bmatrix}
> v_1 \\
> v_2
> \end{bmatrix} =
> \begin{bmatrix}
> 2v_1 + 5v_2 \\
> 3v_1 + 7v_2
> \end{bmatrix}
> $$
> For example, setting $v_1 = v_2 = 1$ gives $Ax = \begin{bmatrix} 7 \\ 10 \end{bmatrix}$.

This row-by-row computation is correct, but it obscures a more useful way of thinking about the product. If instead we group the terms by which column of $A$ they came from, we see that $Ax$ is nothing more than a weighted sum of $A$'s columns, with the entries of $x$ acting as the weights.

> [!def] Matrix–Vector Multiplication as a Linear Combination
> The same product can be written as a linear combination of the columns of $A$:
> $$
> Ax =
> \begin{bmatrix}
> 2 & 5 \\
> 3 & 7
> \end{bmatrix}
> \begin{bmatrix}
> v_1 \\
> v_2
> \end{bmatrix} =
> v_1 \begin{bmatrix} 2 \\ 3 \end{bmatrix} +
> v_2 \begin{bmatrix} 5 \\ 7 \end{bmatrix}
> $$
> With $v_1 = v_2 = 1$, this again gives $\begin{bmatrix} 7 \\ 10 \end{bmatrix}$, confirming the two views agree.

This "linear combination of columns" perspective is the one we will lean on for the rest of the chapter, because it generalizes cleanly once we move from multiplying a matrix by a single vector to multiplying two matrices together.

## Matrix–Matrix Multiplication

A matrix–matrix product $C = AB$ can be understood as many matrix–vector products stacked side by side: each column of $C$ is $A$ times the corresponding column of $B$. Written out entry by entry, this gives the familiar formula for each entry of $C$.

> [!def] Matrix–Matrix Multiplication
> Given matrices $A = [a_{i,k}]$ and $B = [b_{k,j}]$, their product $C = AB = [c_{i,j}]$ has entries
> $$
> c_{i,j} = \sum_k a_{i,k}\,b_{k,j}
> $$
> Each entry $c_{i,j}$ is the dot product of row $i$ of $A$ with column $j$ of $B$. This pattern continues across every entry of $C$: to fill in position $(i,j)$, pair row $i$ of the left matrix with column $j$ of the right matrix and sum the products.

This entrywise formula is really just the dot product in disguise, since each entry of $C$ is computed by taking the dot product of a row of $A$ with a column of $B$. It is worth seeing this play out with concrete numbers before moving to the more conceptual outer-product view.

> [!pf] Example: Inner Product View (Matrix × Matrix → Matrix)
> $$
> \begin{bmatrix}
> 1 & 2 \\
> 3 & 4
> \end{bmatrix}
> \begin{bmatrix}
> 5 & 7 \\
> 6 & 8
> \end{bmatrix} =
> \begin{bmatrix}
> (1)(5) + (2)(6) & (1)(7) + (2)(8) \\
> (3)(5) + (4)(6) & (3)(7) + (4)(8)
> \end{bmatrix} =
> \begin{bmatrix}
> 17 & 23 \\
> 39 & 53
> \end{bmatrix}
> $$

Row-times-column is the standard way to compute a matrix product by hand, but it isn't the only way to think about it — and it isn't the most illuminating one for our purposes. There is a second, equally valid way to build the same product: instead of combining rows of $A$ with columns of $B$, we can combine *columns* of $A$ with *rows* of $B$, one pair at a time, and add up the results. Each such pairing is an **outer product**, and it produces a full matrix rather than a scalar.

> [!pf] Example: Outer Product View (Vector × Vector → Matrix)
> Take the first column of $A$, $\begin{bmatrix}1\\3\end{bmatrix}$, and pair it with the first row of $B$, $\begin{bmatrix}5 & 7\end{bmatrix}$:
> $$
> \begin{bmatrix}
> 1 \\
> 3
> \end{bmatrix}
> \begin{bmatrix}
> 5 & 7
> \end{bmatrix} =
> \begin{bmatrix}
> 5  & 7  \\
> 15 & 21
> \end{bmatrix} = C_1
> $$
> Now take the second column of $A$, $\begin{bmatrix}2\\4\end{bmatrix}$, and pair it with the second row of $B$, $\begin{bmatrix}6 & 8\end{bmatrix}$:
> $$
> \begin{bmatrix}
> 2 \\
> 4
> \end{bmatrix}
> \begin{bmatrix}
> 6 & 8
> \end{bmatrix} =
> \begin{bmatrix}
> 12 & 16 \\
> 24 & 32
> \end{bmatrix} = C_2
> $$
> Adding the two outer products together recovers exactly the product we computed above:
> $$
> \begin{bmatrix}
> 5  & 7  \\
> 15 & 21
> \end{bmatrix} +
> \begin{bmatrix}
> 12 & 16 \\
> 24 & 32
> \end{bmatrix} =
> \begin{bmatrix}
> 17 & 23 \\
> 39 & 53
> \end{bmatrix} = C_1 + C_2 = C
> $$
>
> > [!cor] Corollary
> > $C_1$ and $C_2$ are each **rank-one matrices**, since each is built as the outer product of a single pair of vectors. This illustrates a general fact: *any* matrix product can be decomposed into a sum of rank-one pieces, one per shared dimension between the two factors.

The outer-product view is more than a computational trick — it reframes multiplication itself as a sum of simple, rank-one building blocks. That reframing is exactly what we need to start thinking about *factoring* a matrix, which is the subject of the rest of this chapter.

## Matrix Factorization Methods

All of the factorization methods introduced in this course exist for a single practical purpose: solving linear systems. Given a matrix $A$ and vector $b$, we want to find $x$ satisfying
$$
Ax = b.
$$
Rather than attacking this equation head-on, we will repeatedly break $A$ apart into a product of simpler matrices — triangular, orthogonal, or diagonal — each of which makes solving the system easier. The major factorizations we will encounter are:

$$
\begin{align}
& A=CR \\
& A=LU \\
& A=QR \\
& S=Q\Lambda Q^T \\
& A = U \Sigma V^T
\end{align}
$$

We begin with the simplest of these, the CR factorization, which follows directly from the outer-product idea above.

### CR Factorization

The outer-product decomposition showed that a matrix can be rebuilt from a sum of rank-one pieces. The CR factorization takes this one step further: rather than summing over every column, it isolates just the *independent* columns of $A$ and expresses every other column as a combination of them.

> [!def] CR Factorization
> **Goal:** Given a matrix $A$, factor it as
> $$
> A = CR
> $$
> **Process:**
> 1. Let $C$ contain the first $r$ linearly independent columns of $A$, where $r = \text{rank}(A)$.
> 2. Choose $R$ so that column $j$ of $A = CR$ reproduces column $j$ of $A$ as the corresponding linear combination of the columns of $C$.

Working through a concrete example makes the process concrete: we identify which columns of $A$ are independent, place them in $C$, and record the combinations needed to rebuild the remaining columns in $R$.

> [!pf] Example 1
> $$
> A =
> \begin{bmatrix}
> 1 & 2 & 4 \\
> 1 & 3 & 5
> \end{bmatrix} =
> \begin{bmatrix}
> \vec{a_1} & \vec{a_2} & \vec{a_3}
> \end{bmatrix}
> $$
> Observe the linear dependence of $\vec{a_3}$:
> $$
> \vec{a_3} = 2\vec{a_1} + \vec{a_2}
> $$
> There is no combination of $\vec{a_1}$ and $\vec{a_2}$ that produces the other, so these two columns are linearly independent — they form $C$. The matrix $R$ then records how every column of $A$ (including $\vec{a_1}$ and $\vec{a_2}$ themselves) is built from $C$:
> $$
> \underbrace{\begin{bmatrix} 1 & 2 & 4 \\ 1 & 3 & 5 \end{bmatrix}}_{A} =
> \underbrace{\begin{bmatrix} 1 & 2 \\ 1 & 3 \end{bmatrix}}_{C}
> \underbrace{\begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 1 \end{bmatrix}}_{R}
> $$

The example above involved a matrix of full column rank among $\vec a_1, \vec a_2$. It's also worth seeing what happens at the opposite extreme, where a matrix has rank as low as possible: rank one. This connects back to the corollary from the outer-product example.

> [!cor] Linking Rank and Products
> 1. Every rank-one matrix can be written as the outer product of exactly one pair of vectors (up to scaling).
> 2. Every rank-$r$ matrix can be written as the sum of $r$ rank-one matrices.

> [!pf] Example 2
> $$
> A =
> \begin{bmatrix}
> 2 & 4 & 6 \\
> 3 & 6 & 9
> \end{bmatrix}
> $$
> Here every column is a multiple of $\begin{bmatrix}2\\3\end{bmatrix}$, so $\text{rank}(A) = 1$ and $C$ consists of that single column. Writing each column of $A$ as a multiple of $C$ gives $R = \begin{bmatrix}1 & 2 & 3\end{bmatrix}$, and the CR factorization collapses to the single outer product
> $$
> A =
> \begin{bmatrix} 2 \\ 3 \end{bmatrix}
> \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}
> $$
> consistent with the corollary above: a rank-one matrix is exactly one outer product.

### LU Factorization

CR factorization organizes a matrix around its independent columns, which is useful for understanding structure but is not the most efficient route to solving $Ax = b$ when $A$ is square. For that purpose we turn to the LU factorization, which splits $A$ into a lower triangular and an upper triangular matrix — two forms that are each easy to solve against.

> [!def] LU Factorization
> Consider a square matrix $A$ factored as $A = LU$. The system $Ax = b$ becomes
> $$
> \begin{align}
> Ax & = b \\
> & \equiv \\
> L(Ux) & = b
> \end{align}
> $$
> **Process:**
> 1. Solve $Lc = b$ for $c$ (forward substitution, since $L$ is lower triangular).
> 2. Solve $Ux = c$ for $x$ (back substitution, since $U$ is upper triangular).
>
> > [!cor] Note: Cost of Computation
> > - Computing the $LU$ factorization itself costs $O(n^3)$, where $n$ is the number of rows (equivalently, columns) of $A$.
> > - Once $L$ and $U$ are known, back-substitution costs only $O(n^2)$.
> > - This asymmetry makes $LU$ especially attractive when we need to solve $Ax = b$ for **many different right-hand sides** $b$ but the same matrix $A$: the expensive $O(n^3)$ factorization is done once, and each new solve costs only $O(n^2)$.

## Solving Linear Systems

With CR and LU in hand, we can now return to the original question that motivates this whole chapter — solving $Ax = b$ — and ask when a *unique* solution is guaranteed to exist. The answer hinges on invertibility.

### Invertible Matrices

> [!def] Invertible Matrix Theorem
> A square matrix $A$ is invertible if and only if any (equivalently, all) of the following hold:
> - $A$ has no zero eigenvalues.
> - The only solution to $Ax = 0$ is the trivial solution $x = 0$.
> - $\text{rank}(A) = \text{(number of columns)} = \text{(number of rows)}$.

These conditions are different ways of saying the same thing: an invertible matrix wastes none of its rows or columns on redundant information, so no nonzero vector is ever mapped to zero. When this holds, we can formally solve $Ax = b$ by introducing the inverse $A^{-1}$, defined by $AA^{-1} = A^{-1}A = I$.

> [!def] Invertible Matrices and Solving $Ax = b$
> Suppose $A$ is a square, invertible matrix, so that $AB = BA = I$ for some matrix $B = A^{-1}$. We can solve $Ax = b$ as follows:
> 1. Start with $Ax = b$.
> 2. Multiply both sides on the left by $A^{-1}$.
> 3. This gives:
> $$
> A^{-1}Ax = A^{-1}b \;\Longrightarrow\; x = A^{-1}b.
> $$
> This identity defines the inverse and shows that the solution $x$ is unique whenever $A^{-1}$ exists.

It's tempting to treat $x = A^{-1}b$ as a recipe for computing solutions directly — form $A^{-1}$, then multiply. In practice, this is almost always the wrong approach.

> [!imp] Important Computational Note
> Avoid forming $A^{-1}$ explicitly in numerical computations. Solve $Ax = b$ instead via a factorization, such as $LU$ or $QR$. This approach is typically faster and substantially more numerically stable than explicitly computing and applying an inverse.

This closing point is what ties the whole chapter together: the factorizations we developed above — CR to expose structure, LU to solve efficiently — are not academic exercises. They are the practical alternative to the inverse, and the standard tools by which real linear systems are actually solved.
