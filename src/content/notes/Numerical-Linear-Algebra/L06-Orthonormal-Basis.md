---
id: L06
aliases: ["Fundamental Theorem of Linear Algebra", "Orthonormal Basis", "Orthogonal Projector", "Orthogonal Projection"]
tags: []
---

# The Fundamental Theorem of Linear Algebra, Orthonormal Bases, and Orthogonal Projectors

The previous chapter established that the [[Four Fundamental Subspaces|four fundamental subspaces]] of $A \in \mathbb{R}^{m\times n}$ pair up into two [[Orthogonal Complement|orthogonal complements]]: $R(A)^\perp = N(A^{\mathsf T})$ and $R(A^{\mathsf T})^\perp = N(A)$. This chapter puts that fact to work. We'll first repackage it as the **Fundamental Theorem of Linear Algebra** — a clean geometric picture of how $A$, viewed as a transformation, splits both its domain and codomain in two. From there we turn to a question that picture raises naturally: among all the possible bases for a subspace, is there a *best* one? The answer is yes — an orthonormal basis — and understanding why leads us through Fourier expansion, [[Orthogonal Matrices|orthogonal matrices]], and orthogonal projectors, the last of which is the essential tool behind the [[QR Factorization|$QR$ factorization]] we'll build in the next chapter.

## Recap: Orthogonal Complements of the Fundamental Subspaces

Before building on last chapter's result, it's worth recalling *why* it's true, since the same short argument will resurface throughout this chapter.

> [!thm] Orthogonal Complements (Recap)
> For $A \in \mathbb{R}^{m\times n}$,
> $$R(A)^\perp = N(A^{\mathsf T}) \qquad \text{and} \qquad R(A^{\mathsf T})^\perp = N(A).$$

> [!pf] Sketch
> Suppose $x \in R(A)^\perp$, i.e., $x$ is orthogonal to every vector $Ay \in R(A)$. Then for **all** $y \in \mathbb{R}^n$,
> $$
> 0 = \langle x, Ay\rangle = x^{\mathsf T}(Ay) = (A^{\mathsf T}x)^{\mathsf T}y = \langle A^{\mathsf T}x, y\rangle.
> $$
> An inner product that vanishes against every $y$ forces $A^{\mathsf T}x = \vec 0$, i.e., $x \in N(A^{\mathsf T})$. This proves $R(A)^\perp = N(A^{\mathsf T})$; applying the identical argument with $A$ replaced by $A^{\mathsf T}$ gives $R(A^{\mathsf T})^\perp = N(A)$.

## Linear Transformations and the Fundamental Theorem of Linear Algebra

Every matrix $A \in \mathbb{R}^{m\times n}$ can be viewed not just as a grid of numbers, but as a **linear transformation** carrying vectors in $\mathbb{R}^n$ to vectors in $\mathbb{R}^m$:
$$
x \in \mathbb{R}^n \xrightarrow{\ A\ } Ax \in \mathbb{R}^m, \qquad \operatorname{rank}(A) = r \le \min(m,n).
$$

Viewed this way, the orthogonal complement result from the previous section says something quite striking: it partitions the *domain* and the *codomain* of $A$ into orthogonal pieces, with the rank $r$ controlling the size of every piece. This is the **Fundamental Theorem of Linear Algebra**.

> [!thm] The Fundamental Theorem of Linear Algebra
> Recall that $\dim N(A) = (\text{number of columns of } A) - \operatorname{rank}(A)$, the nullity.
>
> **In the domain, $\mathbb{R}^n$:**
> $$R(A^{\mathsf T}) \perp N(A)$$
> - $\dim R(A^{\mathsf T}) = r$
> - $\dim N(A) = n - r$
> - Direct sum: $\mathbb{R}^n = R(A^{\mathsf T}) \oplus N(A)$
>
> **In the codomain, $\mathbb{R}^m$:**
> $$R(A) \perp N(A^{\mathsf T})$$
> - $\dim R(A) = r$
> - $\dim N(A^{\mathsf T}) = m - r$
> - Direct sum: $\mathbb{R}^m = R(A) \oplus N(A^{\mathsf T})$

In short: every vector in the domain decomposes uniquely into a "row-space part" and a "null-space part," and $A$ carries the row-space part faithfully into $R(A)$ while collapsing the null-space part to zero. This picture — two orthogonal splittings, one on each side of $A$ — is the geometric skeleton underneath everything else in this course, including the SVD later on.

## Orthonormal Bases and Fourier Expansion

The Fundamental Theorem tells us *which* subspaces matter. It says nothing yet about which *basis* to use for them. As it happens, one choice of basis makes every computation involving a subspace dramatically simpler.

> "The best basis is an orthonormal basis."

> [!def] Orthonormal Basis
> A set of vectors $B = \{u_1, u_2, \dots, u_n\}$ is an **orthonormal basis** for an inner product space if every vector is orthogonal to every other, and each has unit length:
> $$
> \langle u_i, u_j \rangle = u_i^{\mathsf T}u_j = \delta_{ij},
> $$
> where $\delta_{ij}$ is the Kronecker delta ($1$ if $i=j$, $0$ otherwise).

The payoff of orthonormality is immediate: because the basis vectors are mutually independent *and* already scaled to length one, the coefficients needed to write any vector $x$ in this basis can be read off directly, with no linear system to solve.

> [!thm] Generalized Fourier Expansion
> For an orthonormal basis $\{u_1,\dots,u_n\}$, any vector $x$ in the space decomposes as
> $$
> x = \langle u_1, x\rangle u_1 + \langle u_2, x\rangle u_2 + \cdots + \langle u_n, x\rangle u_n.
> $$
> Each scalar $\langle u_i, x\rangle$ is called a **Fourier coefficient** — geometrically, it is the length of $x$'s projection onto the direction of $u_i$.

## Orthogonal Matrices

Collecting an orthonormal basis into the columns of a matrix gives us a new, extremely well-behaved class of matrix.

> [!def] Orthogonal Matrices
> Place orthonormal vectors $u_1,\dots,u_n$ as the columns of a matrix
> $$
> Q = \begin{bmatrix} u_1 & u_2 & \cdots & u_n \end{bmatrix}.
> $$
> Because the columns are orthonormal, $Q^{\mathsf T}Q = I$:
> $$
> Q^{\mathsf T}Q =
> \begin{bmatrix} u_1^{\mathsf T} \\ u_2^{\mathsf T} \\ \vdots \\ u_n^{\mathsf T} \end{bmatrix}
> \begin{bmatrix} u_1 & u_2 & \cdots & u_n \end{bmatrix} = I.
> $$
>
> [!tip] Nomenclature Check
> - If $Q$ is **rectangular**, we say it "has orthonormal columns." Here $Q^{\mathsf T}Q = I$, but $QQ^{\mathsf T} \ne I$ in general.
> - If $Q$ is **square**, we call it an **orthogonal matrix**. Here $Q^{\mathsf T} = Q^{-1}$, so $Q^{\mathsf T}Q = QQ^{\mathsf T} = I$.

Orthogonal matrices have a property that makes them especially trustworthy in numerical computation: they never distort length.

> [!thm] Preservation of Length
> For an orthogonal matrix $Q$, $\|Qx\| = \|x\|$ for every vector $x$.

> [!pf] Proof
> $$
> \|Qx\|^2 = \langle Qx, Qx\rangle = (Qx)^{\mathsf T}(Qx) = x^{\mathsf T}Q^{\mathsf T}Qx = x^{\mathsf T}Ix = x^{\mathsf T}x = \|x\|^2. \qquad \blacksquare
> $$
> Rotations, reflections, and permutation matrices are all familiar examples of orthogonal matrices — and all three, geometrically, preserve size while possibly changing direction.

## Elementary Orthogonal Projectors

Orthonormal bases and orthogonal matrices both point toward the same underlying operation: projecting a vector onto a subspace. It's worth isolating that operation on its own, starting with the simplest possible case — projecting onto a single direction.

> [!def] Elementary Orthogonal Projector
> The orthogonal projector $P_u$ onto the direction of a vector $u$ takes any $x$ and flattens it onto the line spanned by $u$. If $u$ is a **unit** vector ($\|u\|=1$), the projector is the outer product
> $$
> P_u = uu^{\mathsf T}.
> $$
> If $u$ is not already normalized, divide by its squared length:
> $$
> P_u = \frac{uu^{\mathsf T}}{u^{\mathsf T}u}.
> $$

Applying this projector to a vector $x$ reveals exactly why it deserves the name "projection" — the result is nothing more than the Fourier-coefficient formula from earlier, applied to a single basis vector.

> [!pf] Action of the Projector
> Taking $u$ to be a unit vector,
> $$
> P_u x = (uu^{\mathsf T})x = u(u^{\mathsf T}x) = u\langle u, x\rangle = \langle u, x\rangle\, u,
> $$
> using associativity of matrix multiplication to regroup $u^{\mathsf T}x$ as the scalar $\langle u, x\rangle$. The result is a vector pointing in the direction of $u$, scaled by exactly the projection length of $x$ onto $u$ — precisely the single-term case of the Fourier expansion above.

The same idea extends immediately from a single direction to an entire subspace: if instead of one unit vector we have a whole matrix of orthonormal columns, the outer product $uu^{\mathsf T}$ generalizes to $QQ^{\mathsf T}$.

> [!lem] Projector onto a Subspace Spanned by Orthonormal Columns
> If $Q \in \mathbb{R}^{m\times k}$ has orthonormal columns, the orthogonal projector onto $R(Q)$ is
> $$
> P = QQ^{\mathsf T},
> $$
> which satisfies $P^{\mathsf T} = P$ and $P^2 = P$. Moreover, for any $x$, $QQ^{\mathsf T}x$ is the unique vector in $R(Q)$ closest to $x$ in Euclidean norm.

This lemma is more than a generalization for its own sake: it is the exact mechanism the $QR$ factorization relies on. Building $Q$ one orthonormal column at a time — via Gram–Schmidt — amounts to repeatedly projecting a new vector onto the space already spanned, and subtracting that projection away. That construction is where we turn next.
