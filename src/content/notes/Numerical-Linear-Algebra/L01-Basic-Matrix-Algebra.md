---
id: L01
aliases: ["Vectors", "Vector Space", "Dot Product", "Vector Norm", "Orthonormal Vectors", "Orthonormality", "Column Space", "Rank"]
tags: []
---
# Vectors, Vector Operations, and the Column Space of a Matrix

Before we can talk about factorizations like $A = LU$ or $A = QR$, we need a solid footing in the objects those factorizations act on: vectors and matrices. This section builds that foundation from the ground up. We start with what a vector *is* and what makes a collection of vectors a *vector space*. From there we develop the two operations — the dot product and the norm — that let us measure length and angle, which in turn gives us the idea of orthogonality, one of the most useful properties a pair of vectors can have. We then connect vectors to matrices through matrix–vector multiplication, and close by looking at how the columns of a matrix relate to each other through the ideas of column space and rank — concepts that will resurface constantly once we get to factorizations and the SVD.

## Vectors

We begin with the vector itself, the basic building block of everything that follows.

> [!def] **Definition: Vector**
> A vector is an object that has both a *direction* and a *magnitude*.
> Vectors can be denoted as:
> $$v = \begin{bmatrix} a \\ b \\ c \end{bmatrix}$$

A single vector is useful on its own, but most of what we do in linear algebra involves collections of vectors that behave consistently under addition and scaling. This motivates the notion of a *vector space*: a set closed under the two operations we most care about.

> [!def] **Definition: Vector Space Properties**
> $A$ is a vector space if the following properties are maintained:
> 1. **Vector Addition:** $u,v \in A \implies u+v \in A$
> 2. **Scalar Multiplication:** $u \in A, c \in \mathbb{R} \implies uc \in A$
> 3. **Zero Vector (Origin/Identity):** $\exists \vec{0} \in A$

### Vector Operations

Knowing that vectors can be added and scaled is a start, but to actually compare vectors — how long they are, how they're oriented relative to one another — we need a few more tools. The dot product is the first and most important of these; nearly every other operation in this section is built on top of it.

> [!def] **Definition: Dot Product**
> Consider $\vec{u} \cdot \vec{v}$. We can write this in the following ways:
> $$\vec{u} \cdot \vec{v} = \vec{u}^T \vec{v} = [u_1, u_2, u_3] \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix} = c$$
>
> *Note on Output:* Where $c \in \mathbb{R}$, recall that when computing a dot product the final output is a **scalar value**.

One immediate use of the dot product is measuring the length, or *norm*, of a vector — simply take the dot product of a vector with itself and square root the result.

> [!def] **Definition: Vector Norm**
> The norm of a vector, denoted as $||\vec{u}||$, is the same as the length of the vector:
> $$||\vec{u}|| = \sqrt{\vec{u} \cdot \vec{u}} = \sqrt{\vec{u}^T \vec{u}}$$

Beyond length, the dot product also encodes the *angle* between two vectors. This is where the geometric picture and the algebraic definition of the dot product meet.

> [!def] **Definition: Angle Between Vectors**
> Suppose we have vectors $\vec{w}$ and $\vec{v}$.
> Consider the relationship:
> $$\vec{v} \cdot \vec{w} = ||\vec{v}|| \, ||\vec{w}|| \cos(\theta)$$
> We can compute the angle between them as follows:
> $$\cos(\theta) = \frac{\vec{w} \cdot \vec{v}}{||\vec{w}|| \, ||\vec{v}||}$$
>
> > [!corr] *Corollary: Orthogonality*
> > If $\cos(\theta)$ between two vectors is zero, then we can say that they are orthogonal to each other.

Orthogonality turns out to be one of the most valuable properties two vectors can share, since orthogonal directions carry no redundant information about each other. When we additionally normalize orthogonal vectors to unit length, we get *orthonormal* vectors — the building blocks behind the $Q$ in the $QR$ factorization mentioned in the course overview.

> [!def] **Definition: Orthonormal Vectors**
> Simply, orthogonal vectors normalized to a magnitude of one unit.
> $$\begin{align*} ||v+w||^2 &= (v+w) \cdot (v+w) \\ &= v \cdot v + v \cdot w + w \cdot v + w \cdot w \\ &= ||v||^2 + ||w||^2 + 2(v \cdot w) \end{align*}$$

This expansion of $||v+w||^2$ leads naturally to a classic geometric fact: the length of a sum of vectors can never exceed the sum of their individual lengths.

> [!def] **Definition: Triangle Inequality**
> Observe (true by trigonometry):
> $$||v+w|| \leq ||v|| + ||w||$$

With vector operations established, we can move from single vectors to matrices, which act on vectors through multiplication. Matrix–vector multiplication is best understood not as a row-by-row bookkeeping exercise, but as taking a *linear combination* of the matrix's columns.

> [!def] **Definition: Matrix Multiplication**
> $$Ax = \begin{bmatrix} 2 & 5 \\ 3 & 7 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 2(1) + 5(1) \\ 3(1) + 7(1) \end{bmatrix} = \begin{bmatrix} 7 \\ 10 \end{bmatrix}$$
> Observe the output is the result of a linear combination of the columns of $A$:
> $$\begin{bmatrix} \vec{a_1} & \vec{a_2} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = x_1\vec{a_1} + x_2\vec{a_2}$$
> Specifically, $x_1\vec{a_1} + x_2\vec{a_2}$ is the linear combination of the columns of $A$.

## Column Space and Rank

Since $Ax$ is always a linear combination of $A$'s columns, it's natural to ask: what is the *set* of all vectors we can reach this way? That set is the column space of $A$, and it tells us exactly which vectors $b$ the equation $Ax = b$ can actually solve.

> [!def] **Definition: Column Space of A**
> $\text{Col}(A)$ = Column Space of $A$ = All possible linear combinations of the columns of $A$.

How "large" the column space is depends on whether the columns of $A$ are truly independent contributors or whether some are redundant — expressible as combinations of the others. A matrix with more columns than rows can never have fully independent columns, since there simply isn't room in a lower-dimensional space to fit that many independent directions.

> [!thm] **Theorem: Independence of Columns**
> $$A_2 = \begin{bmatrix} a & b & c \\ d & e & f \end{bmatrix}$$
> Observe this matrix:
> - Composed of vectors that exist in 2D (number of rows).
> - Needs a 3-dimensional vector (since it's $2 \times 3$) to be multiplied.
>
> Observe that the columns must be linearly dependent; there can be at most 2 independent vectors in 2D space.
> We say the columns of $A$ are independent if no column is a linear combination of the other columns.
>
> In other words: $Ax = 0$ only when $x = 0$.

Counting exactly how many independent columns (equivalently, independent rows) a matrix has gives us its *rank* — a single number that summarizes how much genuinely new information the matrix's columns carry, and a concept that will reappear throughout the course whenever we discuss factorizations and the SVD.

> [!def] **Definition: Rank**
> Rank = number of independent columns = number of independent rows.
> It follows that the columns are independent if and only if the rows are independent.
