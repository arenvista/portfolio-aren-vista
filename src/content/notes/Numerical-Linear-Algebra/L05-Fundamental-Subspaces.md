---
id: L05
aliases: []
tags: []
---
# Parametric Solutions and the Four Fundamental Subspaces

The previous chapter introduced the column space as the first example of a subspace naturally attached to a matrix, and showed that its dimension — the rank — falls straight out of counting pivots in echelon form. This chapter finishes that story. We first show how the *free variables* left over after row reduction parametrize the full solution set of $Ax=b$, for both the homogeneous case ($b=\vec 0$) and the general case. That machinery then lets us define all **four** fundamental subspaces of a matrix — column space, row space, null space, and left null space — and, in the second half of the chapter, uncover a striking fact about them: they come in two orthogonal pairs.

## Echelon Form and Parametric Solutions

We start with the homogeneous system $Ax = \vec 0$, where $A \in \mathbb{R}^{2\times 4}$ has already been reduced to echelon form.

> [!ex] Example: Homogeneous System
> $$
> \begin{bmatrix}
> \mathbf{1} & 2 & 2           & 3  & \big| & 0 \\
> 0          & 0 & \mathbf{-3} & -3 & \big| & 0
> \end{bmatrix}
> $$
> The bolded entries $\mathbf{1}$ and $\mathbf{-3}$ are the pivots, sitting in columns $1$ and $3$. Every other column — $2$ and $4$ — is therefore *free*.
>
> Solving from the bottom row up:
> $$
> \begin{aligned}
> x_4 &= \text{free} \\
> x_3 &= -x_4 \\
> x_2 &= \text{free} \\
> x_1 &= -2x_2 - 2x_3 - 3x_4
> \end{aligned}
> $$
> Collecting terms by which free variable they multiply gives the **parametric vector form** of the solution set:
> $$
> \operatorname{Nul}(A) =
> x_2 \begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix} +
> x_4 \begin{bmatrix} -1 \\ 0 \\ -1 \\ 1 \end{bmatrix}.
> $$

Nothing about this process is specific to a $2\times 4$ matrix — the same pattern holds for any rectangular system.

> [!def] General Expression of Homogeneous Systems
> Let $A \in \mathbb{R}^{m\times n}$ with $\operatorname{rank}(A) = r$. Row reduction produces $r$ pivots and $n - r$ free variables, and the general solution to $Ax = \vec 0$ can always be written as
> $$
> x = x_{f_1}h_1 + x_{f_2}h_2 + \cdots + x_{f_{n-r}}h_{n-r},
> $$
> where each $h_i$ is a fixed vector (determined by back-substitution, exactly as above) and each $x_{f_i}$ is a free parameter.

A non-homogeneous system $Ax = b$ (with $b \ne \vec 0$) works the same way, with one addition: alongside the free-variable terms, a single *particular solution* — the specific values the basic variables take when every free variable is set to zero — gets added in.

> [!ex] Example: Non-Homogeneous System
> $$
> \begin{bmatrix}
> 1 & 2 & 0 & 1 & \big| & 2 \\
> 0 & 0 & 1 & 1 & \big| & 1
> \end{bmatrix}
> $$
> The pivots sit in columns $1$ and $3$, so $x_1$ and $x_3$ are basic, and $x_2, x_4$ are free:
> $$
> \begin{aligned}
> x_2 &= \text{free} \\
> x_4 &= \text{free} \\
> x_3 &= 1 - x_4 \\
> x_1 &= 2 - 2x_2 - x_4
> \end{aligned}
> $$
> which gives the parametric vector form
> $$
> x =
> \underbrace{\begin{bmatrix} 2 \\ 0 \\ 1 \\ 0 \end{bmatrix}}_{\text{particular solution}} +
> x_2 \begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix} +
> x_4 \begin{bmatrix} -1 \\ 0 \\ -1 \\ 1 \end{bmatrix}.
> $$
> The particular solution $\begin{bmatrix}2\\0\\1\\0\end{bmatrix}$ solves $Ax=b$ on its own (setting $x_2=x_4=0$); the remaining two terms are exactly the homogeneous solution from the previous example, since the coefficient matrix is identical. This is the general pattern: **solution = particular solution + homogeneous solution.**

## The Four Fundamental Subspaces

With parametric solutions in hand, we can now name four subspaces that live naturally alongside any matrix $A \in \mathbb{R}^{m\times n}$ — two associated with $A$ itself, and two with its transpose.

### Column Space and Row Space

> [!def] Column Space and Row Space
> $$
> \begin{aligned}
> \text{Column Space:} \quad & R(A) = \{\, Ax \mid x \in \mathbb{R}^n \,\} \subseteq \mathbb{R}^m \\
> \text{Row Space:} \quad & R(A^{\mathsf T}) = \{\, A^{\mathsf T}y \mid y \in \mathbb{R}^m \,\} \subseteq \mathbb{R}^n
> \end{aligned}
> $$
> Equivalently:
> $$
> \begin{aligned}
> b \in R(A) \equiv \operatorname{Col}(A) &\iff \exists\, x \text{ such that } b = Ax, \\
> a \in R(A^{\mathsf T}) \equiv \operatorname{Row}(A) &\iff \exists\, y \text{ such that } a = A^{\mathsf T}y.
> \end{aligned}
> $$

The row space is, quite literally, the column space of $A^{\mathsf T}$ — every definition and fact about column spaces from the previous chapter applies here, just transposed.

### Null Space and Left Null Space

The other two subspaces capture what $A$ (and $A^{\mathsf T}$) send to zero — exactly the parametric solution sets we built above.

> [!def] Null Space
> $$
> \operatorname{Nul}(A) = \{\, x \mid Ax = \vec 0 \,\} \subseteq \mathbb{R}^n
> $$

> [!def] Left Null Space
> $$
> \operatorname{Nul}(A^{\mathsf T}) = \{\, y \mid A^{\mathsf T}y = \vec 0 \,\} \subseteq \mathbb{R}^m
> $$
> It's called the *left* null space because $y \in \operatorname{Nul}(A^{\mathsf T})$ is equivalent to $y^{\mathsf T}A = \vec 0^{\mathsf T}$ — $y$ annihilates $A$ from the left.

### Spanning Sets

Each of these four subspaces has a spanning set that falls directly out of row reduction, tying this section back to the pivot-counting arguments from the column space discussion.

> [!cor] Spanning Sets for the Four Fundamental Subspaces
> $$
> \begin{aligned}
> \operatorname{Col}(A) \equiv R(A) &\;\longrightarrow\; \text{pivot columns of } A \\
> \operatorname{Nul}(A) &\;\longrightarrow\; \text{particular solutions of } Ax = \vec 0 \\
> \operatorname{Row}(A) \equiv R(A^{\mathsf T}) &\;\longrightarrow\; \text{pivot rows of the echelon form of } A \\
> \operatorname{Nul}(A^{\mathsf T}) &\;\longrightarrow\; \text{particular solutions of } A^{\mathsf T}y = \vec 0
> \end{aligned}
> $$
>
> [!tip] Finding $\operatorname{Nul}(A^{\mathsf T})$ from Row Reduction
> Recall the permutation matrix $P$ used when row-reducing $A$ to echelon form, and suppose $\operatorname{rank}(A) = r$. Split $P$ into its first $r$ rows and remaining $m-r$ rows:
> $$
> P = \begin{bmatrix} P_1 \\ P_2 \end{bmatrix}, \qquad P_1 \in \mathbb{R}^{r\times m},\ \ P_2 \in \mathbb{R}^{(m-r)\times m}.
> $$
> The rows of $P_2$ are exactly the combinations of the original rows of $A$ that vanished during elimination — i.e., the "$0 = 0$" rows. Since those combinations annihilate $A$, they lie in the left null space:
> $$
> \operatorname{Nul}(A^{\mathsf T}) = R(P_2^{\mathsf T}).
> $$

## Orthogonality of the Four Fundamental Subspaces

The four subspaces above weren't picked arbitrarily — they come in two pairs that are not just related, but **orthogonal complements** of one another. To make that claim precise, we first need to define what "orthogonal complement" means for a subspace, rather than just a single vector.

> [!def] Orthogonal Complement
> Let $V$ be a vector space and $M \subseteq V$ a subspace. The **orthogonal complement** of $M$ is
> $$
> M^{\perp} := \{\, x \in V \mid \langle m, x\rangle = 0 \ \ \forall\, m \in M \,\}.
> $$

> [!cor] Direct Sum
> The symbol $\oplus$ denotes a **direct sum**. For any subspace $M \subseteq V$,
> $$
> V = M \oplus M^{\perp}.
> $$
> This means every $v \in V$ can be written **uniquely** as
> $$
> v = m + m^{\perp}, \qquad m \in M,\ \ m^{\perp} \in M^{\perp}.
> $$

With orthogonal complements defined, we can now ask the motivating question directly: is there any orthogonality relationship *between* the four fundamental subspaces themselves? It turns out there is, and the standard (real) inner product $\langle x, y\rangle = x^{\mathsf T}y$ is all we need to uncover it.

> [!thm] Orthogonality of the Four Fundamental Subspaces
> For $A \in \mathbb{R}^{m\times n}$,
> $$
> R(A)^{\perp} = \operatorname{Nul}(A^{\mathsf T})
> \qquad \text{and} \qquad
> R(A^{\mathsf T})^{\perp} = \operatorname{Nul}(A).
> $$
> In words: the column space and the left null space are orthogonal complements of each other in $\mathbb{R}^m$, and the row space and the null space are orthogonal complements of each other in $\mathbb{R}^n$.

> [!pf] Proof
> Let $x \in \mathbb{R}^m$. By definition, $x \in R(A)^{\perp}$ iff $\langle x, Ay\rangle = 0$ for **every** $y \in \mathbb{R}^n$. Using the symmetry of the real inner product and the definition of the transpose:
> $$
> \langle x, Ay \rangle = (Ay)^{\mathsf T}x = y^{\mathsf T}A^{\mathsf T}x = \langle y, A^{\mathsf T}x \rangle.
> $$
> So $x \in R(A)^{\perp}$ iff $\langle y, A^{\mathsf T}x\rangle = 0$ for every $y$, which happens iff $A^{\mathsf T}x = \vec 0$ — that is, iff $x \in \operatorname{Nul}(A^{\mathsf T})$. This proves $R(A)^{\perp} = \operatorname{Nul}(A^{\mathsf T})$.
>
> The second identity follows by applying the first result to $A^{\mathsf T}$ in place of $A$:
> $$
> R(A^{\mathsf T})^{\perp} = \operatorname{Nul}\!\big((A^{\mathsf T})^{\mathsf T}\big) = \operatorname{Nul}(A). \qquad \blacksquare
> $$

Because each pair of subspaces forms an orthogonal complement, the direct sum decomposition from earlier applies immediately — splitting both $\mathbb{R}^m$ and $\mathbb{R}^n$ cleanly in two, and giving a dimension count that should look familiar from the rank–nullity theorem.

> [!cor] Consequences
> **Direct sum decompositions:**
> $$
> \mathbb{R}^m = R(A) \oplus \operatorname{Nul}(A^{\mathsf T}), \qquad
> \mathbb{R}^n = R(A^{\mathsf T}) \oplus \operatorname{Nul}(A).
> $$
> **Dimension counts (rank–nullity):**
> $$
> \dim R(A) + \dim \operatorname{Nul}(A^{\mathsf T}) = m, \qquad
> \dim R(A^{\mathsf T}) + \dim \operatorname{Nul}(A) = n.
> $$

Together, these four subspaces — and the orthogonality that pairs them up — form the complete geometric picture of what a matrix does: $R(A^{\mathsf T})$ and $\operatorname{Nul}(A)$ partition the input space $\mathbb{R}^n$, while $R(A)$ and $\operatorname{Nul}(A^{\mathsf T})$ partition the output space $\mathbb{R}^m$. This picture will resurface directly when we reach the SVD, which builds an orthonormal basis out of exactly these four pieces.
