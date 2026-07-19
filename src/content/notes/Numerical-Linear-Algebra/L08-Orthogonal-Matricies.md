---
id: L08
aliases: []
tags: []
---

# Orthogonal Matrices: Projectors, Reflectors, and Rotators

Orthogonal matrices are the workhorses of numerical linear algebra. What makes them so useful is a single beautiful property: they preserve length. If $Q$ is orthogonal ($Q^TQ = I$), then $\|Qx\| = \|x\|$ for every vector $x$. Multiplying by an orthogonal matrix never amplifies rounding error, which is exactly why these matrices show up everywhere numerical stability matters — especially in factorizations like QR.

This chapter builds up three families of orthogonal (or projection) matrices, in increasing order of what they *do* to a vector:

1. **Projectors** — collapse a vector onto a line or subspace.
2. **Reflectors** — mirror a vector across a hyperplane.
3. **Rotators** — spin a vector within a 2D plane.

All three share a common goal in this chapter: given a vector $x$, construct a matrix that pushes as much of $x$'s "mass" as possible onto a single coordinate axis, creating zeros everywhere else. This zero-creating trick is precisely the engine behind Householder and Givens QR factorization, covered at the end.

---

## 1. Elementary Orthogonal Projectors

Before we can reflect or rotate a vector, it helps to understand the simpler operation of *projecting* it. A projector decomposes a vector $x$ into two perpendicular pieces: one component lying along a chosen direction $u$, and one component lying in the space perpendicular to $u$. Every reflector we build later is really just "a projector, doubled and flipped" — so it's worth getting comfortable with this piece first.

> [!def] Elementary orthogonal projector
> Given a normalized column vector $u \in \mathbb{R}^{n\times 1}$ with $\|u\| = 1$:
> * The **projector onto $u$** (the component parallel to $u$) is
> $$P_u = uu^T$$
> * The **projector onto the orthogonal complement of $u$** (the component perpendicular to $u$, written $u_\perp$) is
> $$Q = I - uu^T$$

> [!important] If $u$ is not a unit vector
> The formulas above assume $\|u\|=1$. If $u$ is unnormalized, you must rescale by $u^Tu$:
> $$Q = I - \frac{uu^T}{u^Tu}, \qquad P_u = \frac{uu^T}{u^Tu}$$
> Intuitively, $u^Tu$ measures how "long" $u$ is, and dividing by it corrects for the fact that $uu^T$ alone overcounts the projection when $u$ isn't already length 1.

### Why this decomposition works

Any vector $x$ splits cleanly into these two pieces:
$$x = P_u x + Qx$$

The key fact that makes this a genuine *orthogonal* decomposition — not just an arbitrary split — is that the two pieces are perpendicular to each other:

> [!thm] Orthogonality of the components
> For any $x$, $\langle P_u x,\, Qx\rangle = 0$, i.e. $(P_u x) \perp (Qx)$.

Since the two pieces are perpendicular, they behave like the legs of a right triangle with $x$ as the hypotenuse — which is why the length of the projected piece has a clean formula:

> [!note] Length of the projection
> $$\|P_u x\| = |\langle u, x\rangle| = |u^Tx|$$
> This is just the familiar "shadow length" formula from geometry: the length of $x$'s shadow along direction $u$ is the absolute value of their dot product.

> [!tip] Remark: The "L" matrix is a different animal
> You may also encounter matrices of the form
> $$L = I - \alpha\, e_i e_j^T$$
> This *looks* similar to a projector but is **not** orthogonal — it's a **Gauss transform** (elementary elimination matrix). Where $Q$ and $R$ (below) are orthogonal matrices built for QR factorization, $L$ is a *lower triangular* matrix used to perform row operations (subtracting a multiple of row $j$ from row $i$). It's the foundation of **LU decomposition**, a completely different factorization strategy from the one this chapter builds toward.

---

## 2. Elementary Reflectors (Householder Reflectors)

A projector *flattens* a vector onto a subspace — information is lost, and the map isn't invertible. A **reflector** keeps all the information: it acts like a mirror, bouncing $x$ across the hyperplane perpendicular to $u$, without changing its length. Structurally, a reflector is just a projector with its formula doubled and shifted:

> [!def] Householder reflector
> $$R = I - 2uu^T \qquad (\|u\|=1)$$
> If $u$ is unnormalized: $R = I - 2\dfrac{uu^T}{u^Tu}$.

Notice the resemblance to $Q = I - uu^T$ from Section 1 — the reflector simply subtracts *twice* the projection instead of once. Subtracting the projection once removes the parallel component entirely (landing you *on* the mirror plane); subtracting it twice sends you *through* the plane and out the other side, which is exactly what a reflection does.

### Why reflectors are so useful numerically

> [!thm] Properties of Householder reflectors
> * **Orthogonal:** $R^TR = I$, so $R^T = R^{-1}$.
> * **Symmetric:** $R^T = R$.
> * **Involutory:** because $R$ is both symmetric and orthogonal, reflecting twice returns you to the start: $R^2 = I$.

These properties matter in practice: because $R$ is orthogonal, applying it never amplifies numerical error (recall the length-preservation property from the chapter introduction). Because $R^2 = I$, reflectors are trivially easy to undo.

### Using a reflector to create zeros

The single most important use of a Householder reflector is to take an arbitrary vector and collapse it onto a coordinate axis — turning most of its entries into zero. This is the mechanism that will drive the QR factorization in Section 4.

> [!thm] Sparsifying a vector with a reflector
> Given any vector $x$, let $e_1 = \begin{bmatrix}1 & 0 & \cdots & 0\end{bmatrix}^T$. Choose the reflection vector
> $$u = x \pm \|x\|e_1$$
> Then the resulting reflector $R$ maps $x$ entirely onto the first axis:
> $$Rx = \mp\|x\|e_1 = \begin{bmatrix}\mp\|x\| \\ 0 \\ \vdots \\ 0\end{bmatrix}$$

Geometrically: $x$ and $\mp\|x\|e_1$ have the same length, so there's a mirror plane exactly halfway between them that reflects one onto the other — $u$ is simply the normal vector to that mirror. In practice the sign is chosen to avoid catastrophic cancellation (typically $u = x + \operatorname{sign}(x_1)\|x\|e_1$), a detail that matters for numerical stability but doesn't change the underlying geometric idea.

---

## 3. Plane Rotators (Givens Rotations)

Where a reflector eliminates *many* entries of a vector in one shot, a **Givens rotation** takes a gentler, more surgical approach: it spins a vector within a single 2D coordinate plane, eliminating exactly *one* entry at a time.

### The 2D rotation

Everything starts from the familiar 2D rotation matrix:

> [!def] 2D rotator
> $$P = \begin{bmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{bmatrix}$$
> * $P$ rotates a vector counter-clockwise by angle $\theta$; $P^T$ rotates it clockwise.
> * $P$ is orthogonal: $P^TP = I$.

### Embedding the rotation in $n$ dimensions

To use this idea in higher dimensions, we embed the $2\times 2$ block into an otherwise-identity $n\times n$ matrix, acting only on coordinates $i$ and $j$ and leaving everything else untouched:

> [!def] Plane rotator $P_{i,j}$
> For $i < j$, with $c = \cos\theta,\ s=\sin\theta$:
> $$
> P_{i,j}(c,s) =
> \begin{bmatrix}
> I_{i-1} & & & & \\
> & c & \cdots & s & \\
> & \vdots & I & \vdots & \\
> & -s & \cdots & c & \\
> & & & & I
> \end{bmatrix}
> $$
> with the $2\times2$ rotation block sitting at the intersection of rows/columns $(i,j)$.

### Choosing the angle to create a zero

Just as the Householder reflector was built by choosing $u$ so that $Rx$ lands on an axis, a Givens rotation is built by choosing $c$ and $s$ so that one specific entry of $x$ becomes zero.

> [!thm] Zeroing a coordinate with a Givens rotation
> Given $x\in\mathbb{R}^n$ and indices $i<j$, set
> $$
> r = \sqrt{x_i^2+x_j^2}, \qquad
> c = \begin{cases}x_i/r, & r\neq 0\\ 1,& r=0\end{cases}, \qquad
> s = \begin{cases}x_j/r, & r\neq 0\\ 0,& r=0\end{cases}
> $$
> Then $P_{i,j}(c,s)x$ agrees with $x$ everywhere except positions $i$ and $j$:
> $$\text{position } i:\ r \qquad\qquad \text{position } j:\ 0$$

> [!pf] Direct calculation
> Restricting attention to the 2D subvector $[x_i,\ x_j]^T$ (all other coordinates are untouched by construction):
> $$
> \begin{bmatrix}c & s\\ -s & c\end{bmatrix}\begin{bmatrix}x_i\\x_j\end{bmatrix}
> = \begin{bmatrix}cx_i+sx_j\\ -sx_i+cx_j\end{bmatrix}
> = \begin{bmatrix}r\\0\end{bmatrix},
> $$
> since $cx_i+sx_j = (x_i^2+x_j^2)/r = r$ and $-sx_i+cx_j = 0$ by direct substitution.

### Chaining rotations to zero out an entire vector

A single Givens rotation only kills one entry. To fully collapse $x$ onto the first axis — mirroring what a single Householder reflector does in one step — we chain rotations together, working from the bottom of the vector up:

$$
\begin{aligned}
P_{1,2}\,x &= \begin{bmatrix}\sqrt{x_1^2+x_2^2}\\0\\x_3\\\vdots\end{bmatrix}, \\
P_{1,3}P_{1,2}\,x &= \begin{bmatrix}\sqrt{x_1^2+x_2^2+x_3^2}\\0\\0\\\vdots\end{bmatrix}, \\
&\ \ \vdots \\
P_{1,n}\cdots P_{1,2}\,x &= \begin{bmatrix}\|x\|\\0\\\vdots\\0\end{bmatrix}.
\end{aligned}
$$

Each step folds one more coordinate's length into the running total at position 1, until all the "length" of $x$ has accumulated there.

> [!tip] Reflectors vs. Rotators — when to use which
> **Householder reflectors** zero out many sub-diagonal entries of a column in a single matrix multiplication, which makes them computationally efficient for **dense** matrices (fewer flops, better use of vectorized/cached operations). **Givens rotators** touch only two rows (or columns) per application, making them the natural choice for **sparse or banded** matrices, where you want to introduce zeros without disturbing existing zero structure elsewhere.

---

## 4. Householder Reduction (QR Factorization)

We now connect Section 2's zero-creating trick to one of the central factorizations in linear algebra. The goal: given $A \in \mathbb{R}^{m\times n}$ (with $m \geq n$), find an orthogonal matrix $Q$ and an upper triangular matrix $R$ such that
$$A = QR.$$

The strategy is exactly the vector-sparsifying idea from Section 2, applied one column at a time, moving left to right across $A$.

> [!def] One-step Householder transform
> Write $A = \begin{bmatrix}a_1 & a_2 & \cdots & a_n\end{bmatrix}$.
> * Take $x$ to be the first column $a_1$ (or, in later steps, the remaining trailing subcolumn).
> * Form the reflection vector $u = x - \alpha e_1$, where $\alpha = -\operatorname{sign}(x_1)\|x\|$, and normalize: $v = u/\|u\|$.
> * Build the reflector $R_1 = I - 2vv^T$, sized to match $A$ (acting as identity on rows/columns not yet touched).

Applying $R_1$ to $A$ zeroes out the first column below the diagonal, exactly as in Section 2's sparsifying theorem:
$$
R_1 A = \begin{bmatrix} t_{1,1} & \ast \\ 0 & A_2\end{bmatrix}, \qquad t_{1,1} = \pm\|a_1\|
$$

### Repeating the process

The trick now is to *recurse*: treat the trailing submatrix $A_2$ as a brand-new matrix, and repeat. At step $k$, we construct a reflector $R_k$ that acts only on rows $k$ through $m$ (padded with an identity block in the untouched leading rows/columns), zeroing out everything below the diagonal in column $k$:

$$
R_2 R_1 A =
\left[\begin{array}{cc|cc}
t_{1,1} & * & & \vec{t_1}^T \\
0 & t_{2,2} & & \vec{t_2}^T \\
\hline
0 & 0 & & \\
\vdots & \vdots & & A_3 \\
0 & 0 & &
\end{array}\right]
$$

After $p = \min(m,n)$ such steps, every entry below the diagonal has been eliminated, and we're left with an upper triangular matrix:

$$
R_p \cdots R_2 R_1 A =
\begin{bmatrix}
t_{1,1} & t_{1,2} & \cdots & t_{1,n} \\
0 & t_{2,2} & \cdots & t_{2,n} \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & t_{p,n} \\
\vdots & \vdots & & \vdots
\end{bmatrix} = R
$$

### Assembling the factorization

Let $P = R_p \cdots R_2 R_1$, so that $PA = R$. Since each $R_k$ is orthogonal (Section 2), and a product of orthogonal matrices is itself orthogonal, $P$ is orthogonal too. Setting $Q = P^T$ then gives:

> [!thm] Householder QR Factorization
> $$A = QR, \qquad Q^TQ = I, \qquad R \text{ upper triangular}$$
> where $Q = P^T = (R_p\cdots R_2R_1)^T = R_1 R_2 \cdots R_p$ (since each $R_k$ is symmetric).

> [!imp] Notes and conventions
> * The sign convention on each diagonal entry of $R$ can be standardized (e.g., forced positive) by flipping the sign of the corresponding Householder vector; this only changes $Q$ by a column sign and doesn't affect the validity of the factorization.
> * If a Householder vector $u$ is left unnormalized, remember to use the scaled form from Section 2: $R_k = I - 2\dfrac{uu^T}{u^Tu}$.

> [!note] The Givens alternative
> Everything in this section could equally be done by replacing each $R_k$ with a *sequence* of Givens rotations (Section 3) instead of a single reflector. The result is the same factorization $A = QR$, just built from many small rotations rather than a few large reflections — the natural choice when $A$ is sparse and you want to avoid destroying that sparsity.

---

## Quick Summary Table

| Concept | Formula | Role |
|---|---|---|
| Projector onto $u^\perp$ | $Q = I - uu^T$ (unit $u$) | Splits off the component perpendicular to $u$ |
| Projector onto $u$ | $P_u = uu^T$ | Splits off the component parallel to $u$ |
| Householder reflector | $R = I - 2uu^T$ (unit $u$) | Mirrors $x$ across $u^\perp$; symmetric, orthogonal, $R^2=I$ |
| Givens rotation | $P_{i,j}(c,s)$, $c^2+s^2=1$ | Rotates within the $(i,j)$-plane, zeroing one entry |
| Vector annihilation (Householder) | $u = x\pm\|x\|e_1 \Rightarrow Rx = \mp\|x\|e_1$ | One step maps $x \mapsto \pm\|x\|e_1$ |
| Vector annihilation (Givens) | $P_{1,n}\cdots P_{1,2}\,x$ | Sequence of steps maps $x \mapsto \|x\|e_1$ |
| QR via Householder | $A = QR$ | $Q$ orthogonal, $R$ upper triangular, built by chaining reflectors |

**The throughline:** projectors teach us how to split a vector into orthogonal pieces; reflectors use that idea, doubled, to collapse a whole vector onto one axis in a single step; rotators achieve the same end more gradually, one coordinate at a time; and QR factorization is simply this zero-creating machinery applied column by column across an entire matrix.
