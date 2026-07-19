---
id: L03
aliases: []
tags: []
---

# LU Factorization, Permutation Matrices, and Partial Pivoting

The previous chapter introduced the LU factorization from the outside: given $A = LU$, solving $Ax = b$ reduces to two easy triangular solves, $Lc = b$ followed by $Ux = c$. What we haven't yet addressed is where $L$ and $U$ actually come from. This chapter opens that black box. We'll build $L$ and $U$ directly through Gaussian elimination, watch what happens when that process runs into a zero pivot, and see how *permutation matrices* rescue the factorization by reordering rows. That rescue leads naturally to the more general factorization $PA = LU$, and to the practical strategy — partial pivoting — that keeps the whole computation numerically stable.

## Constructing $L$ and $U$ via Elimination Matrices

> [!def] LU Factorization
> **Goal:** Solve $Ax = b$.
> **Idea:** Transform the augmented system $[A \mid b]$, via row operations, into an equivalent system with the same solution: $[A \mid b] \rightarrow [U \mid y]$.
> $$
> \left.
> \begin{array}{l}
> Ax=b \\
> Ux=y
> \end{array}
> \right\} \text{share the same solution}
> $$
> In practice, we can use plain LU factorization (without row swaps) whenever **all leading principal submatrices of $A$ are non-singular** and $A$ is square.

The row operations that carry $A$ to $U$ can each be written as left-multiplication by a matrix $L_i$ that zeroes out one column below the diagonal. Applying $L_1$, then $L_2$, then $L_3$ in sequence progressively fills the lower triangle of the matrix with zeros, column by column, until only the upper triangle remains:

$$
\begin{aligned}
& \begin{bmatrix}
        x & x & x & x \\
        x & x & x & x \\
        x & x & x & x \\
        x & x & x & x
\end{bmatrix} \xrightarrow{L_1}
& \begin{bmatrix}
        x & x & x & x \\
        o & x & x & x \\
        o & x & x & x \\
        o & x & x & x
\end{bmatrix} \xrightarrow{L_2}
& \begin{bmatrix}
        x & x & x & x \\
        o & x & x & x \\
        o & o & x & x \\
        o & o & x & x
\end{bmatrix} \xrightarrow{L_3}
& \begin{bmatrix}
        x & x & x & x \\
        o & x & x & x \\
        o & o & x & x \\
        o & o & o & x
\end{bmatrix} \\
& A                                & L_1A & L_2L_1A & L_3L_2L_1A = U
\end{aligned}
$$

Each $L_i$ is unit lower triangular and therefore non-singular, so we may multiply both sides by their inverses to undo the elimination and recover $A$:
$$
A = L_1^{-1}L_2^{-1}\cdots L_{n-1}^{-1}\,U.
$$
This product of inverses is precisely what we call $L$ — so building $L$ is just a matter of tracking the elimination steps and inverting them.

### Worked Example: Building $L$ and $U$ by Hand

> [!pf] Example 1
> Consider
> $$
> A =
> \begin{bmatrix}
> 2 & 1 & 1 & 0 \\
> 4 & 3 & 3 & 1 \\
> 8 & 7 & 9 & 5 \\
> 6 & 7 & 9 & 5
> \end{bmatrix}
> $$
>
> **Step 1 (pivot $a_{11}=2$).** The multipliers needed to zero out column 1 below the pivot are $m_{21}=2$, $m_{31}=4$, $m_{41}=3$, giving
> $$
> L_1 =
> \begin{bmatrix}
> 1  & 0 & 0 & 0 \\
> -2 & 1 & 0 & 0 \\
> -4 & 0 & 1 & 0 \\
> -3 & 0 & 0 & 1
> \end{bmatrix},
> \qquad
> L_1A =
> \begin{bmatrix}
> 2 & 1 & 1 & 0 \\
> 0 & 1 & 1 & 1 \\
> 0 & 3 & 5 & 5 \\
> 0 & 4 & 6 & 5
> \end{bmatrix}.
> $$
>
> > [!cor] Quick Inverse Rule (Per Step)
> > For a single elimination step $L_k = I - v_k e_k^{\mathsf T}$, where $v_k$ collects the multipliers introduced in column $k$,
> > $$L_k^{-1} = I + v_k e_k^{\mathsf T},$$
> > i.e., flip the sign of every entry that step introduced below the diagonal.
> >
> > **Caution:** this rule applies to each elimination matrix $L_k$ individually — it does *not* mean "flip all signs below the diagonal" for a general lower triangular matrix.
>
> Applying the rule to $L_1$ gives its inverse immediately:
> $$
> L_1^{-1} =
> \begin{bmatrix}
> 1 & 0 & 0 & 0 \\
> 2 & 1 & 0 & 0 \\
> 4 & 0 & 1 & 0 \\
> 3 & 0 & 0 & 1
> \end{bmatrix}.
> $$
>
> **Step 2 (pivot $a_{22}^{(1)}=1$).** The multipliers are $m_{32}=3$, $m_{42}=4$:
> $$
> L_2=
> \begin{bmatrix}
> 1&0&0&0\\
> 0&1&0&0\\
> 0&-3&1&0\\
> 0&-4&0&1
> \end{bmatrix},
> \quad
> L_2L_1A=
> \begin{bmatrix}
> 2 & 1 & 1 & 0\\
> 0 & 1 & 1 & 1\\
> 0 & 0 & 2 & 2\\
> 0 & 0 & 2 & 1
> \end{bmatrix}.
> $$
>
> **Step 3 (pivot $a_{33}^{(2)}=2$).** The multiplier is $m_{43}=1$:
> $$
> L_3=
> \begin{bmatrix}
> 1&0&0&0\\
> 0&1&0&0\\
> 0&0&1&0\\
> 0&0&-1&1
> \end{bmatrix},
> \quad
> U=L_3L_2L_1A=
> \begin{bmatrix}
> 2 & 1 & 1 & 0\\
> 0 & 1 & 1 & 1\\
> 0 & 0 & 2 & 2\\
> 0 & 0 & 0 & -1
> \end{bmatrix}.
> $$
>
> Since each elimination matrix's inverse is just its multipliers with flipped signs, and since the multipliers from different steps land in different columns, the product $L = L_1^{-1}L_2^{-1}L_3^{-1}$ can be assembled directly by placing every multiplier $m_{ij}$ in position $(i,j)$:
> $$
> L=L_1^{-1}L_2^{-1}L_3^{-1}=
> \begin{bmatrix}
> 1&0&0&0\\
> 2&1&0&0\\
> 4&3&1&0\\
> 3&4&1&1
> \end{bmatrix}.
> $$
> One can check directly that $LU = A$, confirming the factorization.

## When Elimination Breaks Down: Permutation Matrices

The example above worked cleanly because every pivot we needed happened to be nonzero. That won't always be the case — sometimes the entry sitting on the diagonal at step $k$ is zero, even though the matrix as a whole is perfectly well-behaved. When that happens, elimination as described above simply cannot proceed, and we need a way to reorder rows before continuing.

> [!pf] Example 2: Why Pivoting May Be Necessary
> Try to factor
> $$
> A = \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix} = LU,
> \qquad L = \begin{bmatrix} 1 & 0 \\ a & 1 \end{bmatrix}, \qquad U = \begin{bmatrix} b & c \\ 0 & d \end{bmatrix}.
> $$
> Matching entries:
> $$
> (1,1): \quad 0 = b \;\Longrightarrow\; b = 0
> $$
> $$
> (2,1): \quad 1 = ab + 0 = ab \;\Longrightarrow\; ab = 1
> $$
> But $b = 0$ forces $ab = 0 \ne 1$ — a contradiction. No ordinary $LU$ factorization of $A$ exists.
>
> The fix is to swap the two rows before eliminating, i.e., replace $A$ with $PA$ for the swap matrix $P = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$:
> $$
> PA = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}.
> $$
> This is already upper triangular, so we may simply take $L = I$ and $U = PA$, giving $PA = LU$.

The matrix $P$ that performed this row swap is our first example of a **permutation matrix** — a matrix built purely to reorder rows or columns, with no other effect on the numbers involved.

> [!def] Permutation Matrices
> A permutation matrix $P$ is obtained by permuting the rows of the identity matrix $I$: each row and each column contains exactly one entry equal to $1$, and every other entry is $0$ (the $1$s need not lie on the diagonal). The simplest permutation matrix is $I$ itself.
>
> - Left-multiplying, $PA$, permutes the **rows** of $A$.
> - Right-multiplying, $AP$, permutes the **columns** of $A$.
>
> **Example** (a permutation sending row order $[1,2,3,4] \to [3,2,4,1]$):
> $$
> P=
> \begin{bmatrix}
> 0&0&1&0\\
> 0&1&0&0\\
> 0&0&0&1\\
> 1&0&0&0
> \end{bmatrix},
> \qquad
> PA=
> \begin{bmatrix}
> \text{row}_3(A)\\
> \text{row}_2(A)\\
> \text{row}_4(A)\\
> \text{row}_1(A)
> \end{bmatrix}.
> $$
> The same matrix used on the right, $AP$, would instead permute the columns of $A$ in the analogous way.

Because every row of a permutation matrix is a distinct standard basis vector, permutation matrices have a particularly clean algebraic property: their transpose is also their inverse.

> [!cor] Orthogonality of Permutation Matrices
> For any permutation matrix $P$,
> $$P^{-1}=P^{\mathsf T}, \qquad PP^{\mathsf T}=P^{\mathsf T}P=I.$$
> **Sketch:** $(PP^{\mathsf T})_{ij} = \sum_k P_{ik}P_{jk}$ is the dot product of row $i$ and row $j$ of $P$. Since distinct rows of $P$ are distinct standard basis vectors, this dot product is $1$ when $i=j$ and $0$ otherwise — so $(PP^{\mathsf T})_{ij} = \delta_{ij}$, and $PP^{\mathsf T}=I$. In the example above, this can be verified by inspection: each row of $P$ is orthogonal to every other row, since they place their single $1$ in different columns.

> [!def] Kronecker Delta
> $$
> \delta_{ij}=
> \begin{cases}
> 1, & i=j,\\
> 0, & i\ne j.
> \end{cases}
> $$

## Partial Pivoting

Knowing that permutation matrices *can* fix a zero pivot is only half the story — in practice, we swap rows even when the pivot isn't exactly zero, because a *very small* pivot is almost as dangerous: dividing by it amplifies rounding error. The standard remedy is partial pivoting.

> [!def] Partial Pivoting (Stability Heuristic)
> At step $k$, search column $k$ at and below the diagonal, and swap the current pivot row $k$ with whichever row $i \ge k$ has the largest $|a_{ik}|$. Choosing the largest available entry as the pivot minimizes the effect of rounding errors and preserves numerical stability.
>
> With row swaps folded into a single accumulated permutation matrix $P$, the factorization becomes
> $$
> PA = LU.
> $$

Because $P$ is applied to $A$ before elimination begins, solving $Ax = b$ has to account for it too: multiplying both sides of $Ax=b$ by $P$ gives $PAx = Pb$, and since $PA = LU$, this is the same as solving $LUx = Pb$. In other words, the permutation moves cleanly through to the right-hand side, and we solve the system exactly as before — just with $b$ replaced by $Pb$:

1. Compute $PA = LU$ via Gaussian elimination with partial pivoting.
2. Forward-substitute: solve $Ly = Pb$ for $y$.
3. Back-substitute: solve $Ux = y$ for $x$.

## Practical Notes and Summary

Pulling the chapter together, a few points are worth carrying forward into later factorizations:

- If all leading principal minors of $A$ are nonzero, plain $A = LU$ works directly — no pivoting is required.
- Otherwise, use the more general $PA = LU$, where $P$ accumulates whatever row swaps partial pivoting performs during elimination.
- $L$ is unit lower triangular, $U$ is upper triangular, and $P$ is a permutation matrix satisfying $P^{-1} = P^{\mathsf T}$.
- For multiple right-hand sides $b^{(1)}, \dots, b^{(m)}$ against the same $A$, compute $PA = LU$ **once** and reuse it — each additional solve costs only the two triangular substitutions, not a fresh factorization.

With $LU$ now fully built from the ground up, we're ready to move to a factorization suited to a different kind of problem — one where the matrix isn't square, or where least-squares fitting is the goal: the $QR$ factorization.
