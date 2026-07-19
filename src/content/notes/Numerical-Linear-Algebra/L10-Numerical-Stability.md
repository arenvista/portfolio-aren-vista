---
id: L10
aliases: ["Numerical Stability", "Conditioning", "Least Squares via QR"]
tags: []
---

# Least Squares via QR Factorization (Wrap-up)

Recall from previous notes that solving the [[Least Squares|least squares problem]] $\min \|Ax-b\|_2$ using the [[Normal Equations]] ($A^TAx = A^Tb$) can be numerically unstable. Using the [[QR Factorization|QR factorization]] ($A = QR$) provides a more stable approach.

Let $A \in \mathbb{R}^{m \times n}$ with $m \ge n$. Suppose $A$ has full column rank $n$ and admits a (thin) QR factorization

$$
	A = Q R, \quad Q \in \mathbb{R}^{m \times n}\ \text{with } Q^\top Q = I_n,\quad R \in \mathbb{R}^{n \times n}\ \text{upper triangular}.

$$

Since $Q$ is an orthogonal matrix, $Q^TQ = I$. The equation simplifies to:
$$R^TRx = R^TQ^Tb$$

Where $R$ is an upper triangular matrix:

$$

	R = \begin{bmatrix}
		r_{1,1} & \dots  & r_{1,n} \\
		0       & \ddots & \vdots  \\
		0       & \dots  & r_{n,n} \\
		0       & \dots  & 0
	\end{bmatrix}

$$

If all diagonal entries $r_{i,i} \neq 0$, then $R$ is **non-singular** (invertible). We can multiply both sides of our equation by the inverse transpose, $(R^T)^{-1} = R^{-T}$:

$$

	\begin{gather}
		R^{-T}R^TRx = R^{-T}R^TQ^Tb \\
		Ix = Q^Tb \\
		Rx = Q^Tb
	\end{gather}

$$

Because $R$ is upper triangular, the system $Rx = Q^Tb$ can now be easily solved using **backward substitution**.

---

# Floating Point Arithmetic

Computers cannot represent all real numbers precisely. They use a standardized floating-point representation:

$$fl(x) = \pm (d_1 . d_2 d_3 \dots d_t) \times \beta^e$$

**Components:**

- **Mantissa (Significand):** $d_1 . d_2 \dots d_t$ (determines precision)
- **Base:** $\beta$ (usually 2 for binary)
- **Exponent:** $e$ (determines range)

Due to rounding and truncation, standard algebraic rules do not always hold in computational arithmetic:

- $fl(x + y) \neq x + y$
- Associativity is lost: $fl(fl(x+y)+z) \neq fl(x+fl(y+z))$

### Example: Catastrophic Cancellation (Swamping)

Consider the system of equations:

$$

	\begin{array}{ccc}
		-10^{-4}x + y & = & 1 \\
		x + y         & = & 2
	\end{array}

$$

**Paper Calculation (Exact):**

$$

	\left[ \begin{array}{cc|c}
			-10^{-4} & 1 & 1 \\
			1        & 1 & 2
		\end{array} \right]
	\xrightarrow{R_2 = R_2 - (-10^4)R_1}
	\left[ \begin{array}{cc|c}
			-10^{-4} & 1     & 1     \\
			0        & 10001 & 10002
		\end{array} \right]

$$

This gives $y \approx 1$ and $x \approx 1$.

**Computer Calculation (Truncated):**
If a computer can only hold 3 significant digits, adding $10^4$ and $1$ simply yields $10^4$.

$$

	\left[ \begin{array}{cc|c}
			-10^{-4} & 1     & 1     \\
			0        & 10000 & 20000
		\end{array} \right]

$$

Solving this yields $y = 2$ and $x = 10000$. The small error in $y$ completely blew up the calculation for $x$.

> [!tip] **How do we fix this?**
> **Adjust the pivots!** This is why we use **Partial Pivoting** in Gaussian Elimination. Always swap rows so the largest absolute value in the column is used as the pivot, preventing tiny numbers from blowing up the arithmetic.

---

# Vector Norms

A norm is a function $\|\cdot\| : \mathbb{R}^n \to \mathbb{R}$ that gives a strictly positive "length" or "size" to a vector. To be a valid norm, it must satisfy three properties for all vectors $x,y$ and scalars $\alpha$:

1.  **Positive Definiteness:** $\|x\| \ge 0$, and $\|x\| = 0 \iff x = 0$
2.  **Absolute Homogeneity:** $\|\alpha x\| = |\alpha|\|x\|$
3.  **Triangle Inequality:** $\|x+y\| \le \|x\| + \|y\|$

### Common Vector Norms:

$$

	\begin{align}
		\|x\|_1      & = \sum_{i=1}^{n} |x_i|                                        &  & \text{(Manhattan / } \ell_1 \text{ norm)}              \\
		\|x\|_2      & = \left(\sum_{i=1}^{n} |x_i|^2\right)^{1/2} = \sqrt{x^\top x} &  & \text{(Euclidean / } \ell_2 \text{ norm)}              \\
		\|x\|_\infty & = \max_{1 \le i \le n} |x_i|                                  &  & \text{(Maximum / } \ell_\infty \text{ norm)}           \\
		\|x\|_p      & = \left(\sum_{i=1}^{n} |x_i|^p\right)^{1/p}                   &  & \text{(General } \ell_p \text{ norm, } p \ge 1\text{)}
	\end{align}

$$

---

# Matrix Norms

Matrix norms share the same core properties as vector norms, with an additional property for matrix multiplication:

- **Submultiplicativity:** $\|AB\| \le \|A\|\|B\|$

### Induced Matrix Norms

An induced matrix norm represents the maximum amount a matrix $A$ can "stretch" a vector $x$:
$$\|A\|_p = \sup_{x \neq 0} \frac{\|Ax\|_p}{\|x\|_p}$$

- **1-Norm (Maximum Absolute Column Sum):**
  $$\|A\|_1 = \max_{1 \le j \le n} \left( \sum_{i=1}^{m} |a_{ij}| \right)$$
- **$\infty$-Norm (Maximum Absolute Row Sum):**
  $$\|A\|_\infty = \max_{1 \le i \le m} \left( \sum_{j=1}^{n} |a_{ij}| \right)$$

### Frobenius Norm (Non-Induced)

The Frobenius norm treats the matrix like one giant vector. It is computationally easier to calculate than the induced 2-norm.

$$

	\|A\|_F = \left( \sum_{i=1}^{m} \sum_{j=1}^{n} |a_{ij}|^2 \right)^{\frac{1}{2}}

$$

It can also be written using the trace operation (the sum of the diagonal elements):
$$\|A\|_F = \sqrt{\text{tr}(A^TA)} = \sqrt{\text{tr}(AA^T)}$$

> [!imp] Takeaway
>
> - Avoid large multipliers in elimination: use (partial) pivoting.
> - Large intermediate numbers amplify rounding and truncation errors.
> - QR-based methods are often more stable for least-squares than forming normal equations $A^\top A$ explicitly.
>   \=======

# Condition Number of a Matrix

The condition number, $\kappa(A)$, measures how sensitive the solution of a linear system $Ax=b$ is to small changes (errors) in the data $b$. In other words, it measures how close a non-singular matrix is to being singular (having columns that are "almost" linearly dependent).

$$\kappa(A) = \|A\| \cdot \|A^{-1}\|$$

**Key Observations:**

1.  **Identity Matrix:** $\kappa(I) = 1$ (Perfectly conditioned).
2.  **Lower Bound:** $\kappa(A) \ge 1$ for any matrix.

**Proof that $\kappa(A) \ge 1$:**
Using the submultiplicative property of matrix norms:

$$

	\begin{gather}
		1 = \|I\| = \|A A^{-1}\| \\
		\|A A^{-1}\| \le \|A\| \|A^{-1}\| \\
		1 \le \|A\| \|A^{-1}\| \implies 1 \le \kappa(A)
	\end{gather}

$$

> [!note] Remark
> If $\kappa(A)$ is close to $1$, the matrix is **well-conditioned** (stable). If $\kappa(A)$ is very large, the matrix is **ill-conditioned**, meaning its rows/columns are nearly linearly dependent, and floating-point errors will be heavily magnified during computation.
