---
id: L07
aliases: ["Gram–Schmidt", "Gram-Schmidt", "Gram–Schmidt Algorithm", "QR Factorization", "QR Decomposition"]
tags: []
---

# The Gram–Schmidt Algorithm and QR Factorization

The previous chapter closed with a lemma about [[Orthogonal Projector|orthogonal projectors]]: if $Q$ has orthonormal columns, then $P = QQ^{\mathsf T}$ projects any vector onto $R(Q)$. That lemma was stated for a $Q$ we already had in hand. This chapter answers the natural next question — given an arbitrary linearly independent set of vectors, how do we actually *build* such a $Q$? The answer is the Gram–Schmidt algorithm, and it turns out to be nothing more than repeated application of the projector idea: take a new vector, project out everything already covered by the vectors built so far, and normalize whatever remains. Carrying this out on the columns of a matrix $A$ produces exactly the $QR$ factorization promised back in our very first list of matrix factorizations — and, as we'll see, $QR$ gives us a numerically superior alternative to [[LU Factorization|$LU$]] for both solving square systems and tackling [[Least Squares|least-squares problems]].

## Objective and Orthogonal Projection

> Given a linearly independent set $B = \{x_1, x_2, \dots, x_n\}$ in an inner-product space (e.g., $\mathbb{R}^m$ with $\langle y,z\rangle = y^{\mathsf T}z$), construct an orthonormal set $U = \{u_1, u_2, \dots, u_n\}$ with $\operatorname{Span}(U) = \operatorname{Span}(B)$.

The tool we'll lean on throughout is the [[Orthogonal Projection|Fourier-expansion projection formula]] from the previous chapter, restated here for a general orthonormal set rather than a full basis.

> [!def] Orthogonal Projection (Fourier Expansion)
> If $\{u_1, \dots, u_k\}$ is an orthonormal set, then for any $x$,
> $$
> \operatorname{proj}_{\operatorname{span}\{u_1,\dots,u_k\}}(x) = \sum_{i=1}^k \langle u_i, x\rangle u_i.
> $$

## Classical Gram–Schmidt: Inductive Construction

The construction proceeds one vector at a time: normalize the first vector to get $u_1$, then repeatedly strip away the part of each new $x_k$ that already lies in the span of the $u_i$'s built so far, and normalize what's left.

> [!def] Base Case
> $$u_1 = \frac{x_1}{\|x_1\|}.$$

> [!def] Inductive Step
> Suppose $u_1, \dots, u_{k-1}$ are orthonormal and $\operatorname{Span}\{u_1,\dots,u_{k-1}\} = \operatorname{Span}\{x_1,\dots,x_{k-1}\}$. Define
> $$
> v_k = x_k - \sum_{i=1}^{k-1} \langle u_i, x_k\rangle u_i,
> \qquad
> u_k = \frac{v_k}{\|v_k\|} \quad (\text{assuming } v_k \ne 0).
> $$
>
> [!tip] Interpretation
> - $v_k$ is $x_k$ with its components along $u_1,\dots,u_{k-1}$ removed — the part of $x_k$ orthogonal to everything built so far.
> - If $v_k = \vec 0$, then $x_k$ was already inside $\operatorname{Span}\{x_1,\dots,x_{k-1}\}$, contradicting linear independence of $B$.

This process is what actually delivers on the objective stated above — it's worth confirming that it does.

> [!thm] Gram–Schmidt Orthonormalization
> Given a linearly independent set $\{x_1,\dots,x_n\}$, the construction above produces an orthonormal set $\{u_1,\dots,u_n\}$ with $\operatorname{Span}\{u_1,\dots,u_k\} = \operatorname{Span}\{x_1,\dots,x_k\}$ for every $k$.

> [!pf] Proof Sketch
> The base case is immediate. For the inductive step, $v_k$ is orthogonal to each $u_i$ ($i<k$) by construction, and normalizing gives $\|u_k\| = 1$. Span equality holds because $x_k = v_k + \sum_{i=1}^{k-1}\langle u_i,x_k\rangle u_i$, and $v_k \ne 0$ precisely when $x_k$ contributes a genuinely new direction.

## Matrix Notation and Projectors

Writing the same construction in matrix form connects it directly back to the projector lemma from the previous chapter. Let $U_{k-1} = [u_1 \; u_2 \; \cdots \; u_{k-1}] \in \mathbb{R}^{m\times(k-1)}$. Then:

- **Coefficients:** $\ r_{1:(k-1),\,k} = U_{k-1}^{\mathsf T}x_k$.
- **Projection onto $\operatorname{Span}\{u_1,\dots,u_{k-1}\}$:** $\ U_{k-1}\big(U_{k-1}^{\mathsf T}x_k\big) = \sum_{i=1}^{k-1}\langle u_i,x_k\rangle u_i$.
- **Orthogonal component and normalization:**
$$
v_k = (I - U_{k-1}U_{k-1}^{\mathsf T})x_k, \qquad u_k = \frac{v_k}{\|v_k\|}.
$$

> [!tip] Interpretation
> $U_{k-1}U_{k-1}^{\mathsf T}$ is exactly the orthogonal projector $P = QQ^{\mathsf T}$ from the previous chapter's lemma, applied to $Q = U_{k-1}$. Subtracting it off — as in $I - U_{k-1}U_{k-1}^{\mathsf T}$ — projects onto the *orthogonal complement* of $\operatorname{Span}\{u_1,\dots,u_{k-1}\}$, which is exactly the "remove what's already covered" step Gram–Schmidt needs at every iteration.

## Classical Gram–Schmidt (CGS): The Algorithm

Packaging the construction as pseudocode makes the sequence of operations explicit:

**Input:** linearly independent vectors $x_1,\dots,x_n \in \mathbb{R}^m$.

For $k = 1$ to $n$:
1. $v_k \leftarrow x_k$
2. For $i = 1$ to $k-1$: compute $r_{ik} \leftarrow u_i^{\mathsf T}x_k$
3. $v_k \leftarrow x_k - \sum_{i=1}^{k-1} r_{ik}\,u_i$
4. $r_{kk} \leftarrow \|v_k\|$
5. $u_k \leftarrow v_k / r_{kk}$

> [!imp] Numerical Stability
> Classical Gram–Schmidt can suffer a loss of orthogonality in finite-precision arithmetic, because every $r_{ik}$ in step 2 is computed against the *original* $x_k$ rather than an updated residual. We'll return to this issue — and its fix — after building the $QR$ factorization itself.

## QR Factorization via Gram–Schmidt

Applying Gram–Schmidt to the columns of a matrix, rather than an abstract vector set, produces one of the fundamental factorizations introduced back at the start of the course.

Let $A = [a_1\; a_2\; \cdots\; a_n] \in \mathbb{R}^{m\times n}$ with $m \ge n$ and linearly independent columns.

> [!thm] QR Factorization (Full Column Rank)
> There exist $Q \in \mathbb{R}^{m\times n}$ with orthonormal columns ($Q^{\mathsf T}Q = I_n$) and $R \in \mathbb{R}^{n\times n}$ upper triangular with positive diagonal, such that
> $$
> A = QR.
> $$
> The factorization is unique once we require $R$'s diagonal entries to be positive.

The construction is exactly Classical Gram–Schmidt applied to the columns of $A$, with the coefficients $r_{ik}$ collected directly into the matrix $R$:

- $q_1 = a_1 / \|a_1\|$.
- For $k = 2,\dots,n$:
  - $r_{ik} = q_i^{\mathsf T}a_k$ for $i = 1,\dots,k-1$,
  - $v_k = a_k - \sum_{i=1}^{k-1} r_{ik}\,q_i$,
  - $r_{kk} = \|v_k\| > 0$,
  - $q_k = v_k / r_{kk}$.

In matrix form,
$$
A = QR, \qquad
Q = [q_1\;q_2\;\cdots\;q_n], \qquad
R = \begin{bmatrix}
r_{11} & r_{12} & \cdots & r_{1n} \\
0      & r_{22} & \cdots & r_{2n} \\
\vdots & \ddots & \ddots & \vdots \\
0      & \cdots & 0      & r_{nn}
\end{bmatrix},
\qquad r_{ij} = q_i^{\mathsf T}a_j \ \ (i \le j).
$$

> [!tip] Interpretation
> For each $k$, column $a_k$ decomposes as $a_k = \sum_{i=1}^{k} r_{ik}\,q_i$ — a direct readout of the fact that $\operatorname{Span}\{q_1,\dots,q_k\} = \operatorname{Span}\{a_1,\dots,a_k\}$. Requiring $r_{kk} > 0$ pins down the sign ambiguity in each $q_k$, which is exactly what makes the factorization unique.

## Solving Systems with QR

With $A = QR$ in hand, solving linear systems reduces to a single triangular solve — and the same factorization handles both square systems and overdetermined least-squares problems.

**Square, nonsingular $A \in \mathbb{R}^{n\times n}$:**
$$
Ax = b \implies QRx = b.
$$
Left-multiplying by $Q^{\mathsf T}$ and using $Q^{\mathsf T}Q = I$ gives $Rx = Q^{\mathsf T}b$, an upper-triangular system solved directly by back substitution.

**Least squares, overdetermined ($m \ge n$, full column rank):**
The goal is to minimize $\|Ax - b\|$. Since $Q$ has orthonormal columns, it preserves length (from the previous chapter), so
$$
\|Ax - b\| = \|Q^{\mathsf T}(Ax-b)\| = \|Rx - Q^{\mathsf T}b\|.
$$
Minimizing this reduces to solving $Rx = Q^{\mathsf T}b$ — again by back substitution.

### QR vs. LU: A Quick Comparison

| Topic | QR | LU (without pivoting) |
|---|---|---|
| Existence | For $A$ with linearly independent columns ($m \ge n$) | For square $A$; may require pivoting |
| Shape | $A = Q\,(m\times n)\; R\,(n\times n)$, $R$ upper triangular | $A = LU$, $L$ lower, $U$ upper (square $A$) |
| Uniqueness | Unique if $\operatorname{diag}(R) > 0$ | Not unique (depends on pivoting/scaling) |
| Works for rectangular $A$ | Yes (full column rank) | No (typically square only) |
| Solve $Ax=b$ (square $A$) | One back substitution ($Rx = Q^{\mathsf T}b$) | Forward ($Ly=b$) + back ($Ux=y$) |
| Least squares (overdetermined) | Yes, natural via $Q^{\mathsf T}$ | Not standard |

## Modified Gram–Schmidt (MGS)

We flagged earlier that Classical Gram–Schmidt can lose orthogonality in floating-point arithmetic. The fix is a small but important reordering of the same computation: instead of computing every coefficient $r_{ik}$ against the original $x_k$, each subtraction updates $v_k$ immediately and the *next* coefficient is computed against that already-updated residual.

**Algorithm:**

For $k = 1$ to $n$:
1. $v_k \leftarrow a_k$
2. For $i = 1$ to $k-1$:
   - $r_{ik} \leftarrow q_i^{\mathsf T}v_k$
   - $v_k \leftarrow v_k - r_{ik}\,q_i$
3. $r_{kk} \leftarrow \|v_k\|$
4. $q_k \leftarrow v_k / r_{kk}$

> [!imp] Why This Helps
> Because each coefficient in MGS is computed against the current residual $v_k$ rather than the original $a_k$, small rounding errors from earlier subtractions get accounted for immediately, rather than compounding silently until the end. In exact arithmetic, CGS and MGS compute identical results — the difference is purely about how errors propagate under floating-point rounding.

## Projector Viewpoint for MGS

The claim that CGS and MGS agree in exact arithmetic is easiest to see through the projector language from earlier in this chapter. Define the rank-one projector onto the orthogonal complement of a unit vector $u_i$:
$$
E_i = I - u_i u_i^{\mathsf T}, \qquad \|u_i\| = 1.
$$
Applying $E_i$ to a vector removes its component along $u_i$. Chaining these projectors — which is what MGS does, one step at a time — gives
$$
v_k = \big(E_{k-1}E_{k-2}\cdots E_1\big)\,x_k.
$$

> [!lem] Product of Complement Projectors
> If $u_1,\dots,u_{k-1}$ are mutually orthonormal, then
> $$
> E_{k-1}E_{k-2}\cdots E_1 = I - \sum_{i=1}^{k-1} u_iu_i^{\mathsf T}.
> $$

> [!pf] Proof
> Expanding a single pair of factors,
> $$
> (I - u_ju_j^{\mathsf T})(I - u_iu_i^{\mathsf T}) = I - u_iu_i^{\mathsf T} - u_ju_j^{\mathsf T} + (u_ju_j^{\mathsf T})(u_iu_i^{\mathsf T}).
> $$
> The cross term vanishes: $(u_ju_j^{\mathsf T})(u_iu_i^{\mathsf T}) = u_j(u_j^{\mathsf T}u_i)u_i^{\mathsf T} = 0$ for $i\ne j$, since $u_j^{\mathsf T}u_i = 0$ by orthonormality. Every mixed term in the full product cancels the same way, and induction over $k$ gives the stated identity. $\blacksquare$

This is exactly what reconciles the projector view with the matrix-notation section earlier: with $U_{k-1} = [u_1\;\cdots\;u_{k-1}]$,
$$
E_{k-1}\cdots E_1 = I - U_{k-1}U_{k-1}^{\mathsf T},
\qquad
v_k = (I - U_{k-1}U_{k-1}^{\mathsf T})\,x_k,
\qquad
u_k = \frac{v_k}{\|v_k\|}.
$$
Removing components one at a time (MGS) and removing the entire projection at once (CGS) are, mathematically, the same operation — the lemma is exactly why. The two algorithms only diverge once rounding error enters the picture.

## Summary: Key Identities

- **Projection onto $\operatorname{Span}\{u_1,\dots,u_{k-1}\}$:**
  $$\operatorname{proj}_{\operatorname{span}}(x_k) = U_{k-1}U_{k-1}^{\mathsf T}x_k.$$
- **Orthogonal component:**
  $$v_k = (I - U_{k-1}U_{k-1}^{\mathsf T})x_k.$$
- **Normalization:**
  $$u_k = \frac{v_k}{\|v_k\|}.$$
- **QR entries:**
  $$r_{ik} = q_i^{\mathsf T}a_k \ \ (i\le k), \qquad r_{kk} = \|v_k\| > 0, \qquad A = QR.$$

> [!imp] Practical Notes
> - A full-column-rank $QR$ requires $m \ge n$ and linearly independent columns of $A$.
> - Enforcing $r_{kk} > 0$ is what makes $(Q,R)$ unique.
> - In practice, prefer Modified Gram–Schmidt — or, better still, Householder $QR$ — over Classical Gram–Schmidt for numerical stability.
