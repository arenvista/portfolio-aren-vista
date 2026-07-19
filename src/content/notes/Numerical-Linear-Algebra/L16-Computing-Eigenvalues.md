---
id: L16
aliases: ["Power Method", "Subspace Iteration", "Shifted Inverse Iteration", "Rayleigh Quotient", "Rayleigh Quotient Iteration", "QR Algorithm", "Hessenberg Matrix"]
tags: []
---
# Computing Eigenvalues: Iterative Methods and the QR Algorithm

The last few chapters treated [[Eigenvalues|eigenvalues and eigenvectors]] as objects that simply *exist*, guaranteed by theorems like the [[Spectral Theorem|spectral theorem]] and [[Schur Factorization|Schur factorization]]. This chapter asks the practical question those theorems sidestepped: given an actual matrix, how do you actually *find* its eigenvalues? Recall from the discussion of computing eigenvalues a few chapters back that root-finding on the [[Characteristic Polynomial|characteristic polynomial]] is both theoretically limited (no closed form for $n\ge5$, by Abel–Ruffini) and numerically unstable. Every method in this chapter avoids the characteristic polynomial entirely, working instead through repeated matrix multiplication or repeated linear solves.

We build up four iterative methods in order of increasing sophistication — each fixing a specific limitation of the one before — and then show how their common ancestor, repeated [[QR Factorization|QR factorization]], scales up into the algorithm actually used to compute the full spectrum of a dense matrix.

> [!note] Overview
> These methods target different parts of a matrix's spectrum:
>
> | Method | Main goal | Basic operation | Best for |
> |---|---|---|---|
> | Power method | Largest eigenvalue in magnitude | Multiply by $A$ | Dominant eigenpair |
> | Block power iteration | Several largest eigenvalues | Multiply by $A$ on a block of vectors | Dominant invariant subspace |
> | Inverse iteration | Smallest eigenvalue, or one near a target | Solve a linear system | Interior or smallest eigenpairs |
> | Rayleigh quotient iteration | Rapid refinement of one eigenpair | Solve shifted systems with adaptive shift | High-accuracy local convergence |

## The Power Method

> [!def] Eigenpair problem
> Given $A\in\mathbb{R}^{n\times n}$, an eigenpair $(\lambda,v)$ satisfies $Av=\lambda v$, $v\neq0$. The power method seeks the eigenpair with the largest-magnitude eigenvalue.

The method is especially clean when $A$ is symmetric (and cleanest of all when $A$ is SPD, recalling the spectral theorem from two chapters ago) — but the underlying idea works more generally, provided $A$ is diagonalizable.

### The basic idea

Repeatedly multiplying a vector by $A$ amplifies whichever eigen-direction has the largest eigenvalue, simply because that direction gets scaled the most at every step. Suppose $A$ has eigenvalues $|\lambda_1| > |\lambda_2|\ge\cdots\ge|\lambda_n|$ with eigenvectors $q_1,\dots,q_n$, and write the starting vector in this eigenbasis: $v^{(0)} = \sum_j c_jq_j$ with $c_1\neq0$. Then
$$
A^kv^{(0)} = \sum_{j=1}^n c_j\lambda_j^kq_j = \lambda_1^k\left(c_1q_1 + \sum_{j=2}^n c_j\left(\frac{\lambda_j}{\lambda_1}\right)^kq_j\right).
$$
Every term with $j\ge2$ carries a factor $(\lambda_j/\lambda_1)^k$, which shrinks to zero as $k$ grows precisely because $|\lambda_j/\lambda_1|<1$. After normalizing away the common $\lambda_1^k$ scale, what's left converges to a pure multiple of $q_1$ — the dominant eigenvector emerges automatically from repeated multiplication.

> [!def] Power method algorithm
> Choose $v^{(0)}$ with $\|v^{(0)}\|_2=1$. For $k=0,1,2,\dots$:
> $$w^{(k+1)} = Av^{(k)}, \qquad v^{(k+1)} = \frac{w^{(k+1)}}{\|w^{(k+1)}\|_2}, \qquad \lambda^{(k+1)} = (v^{(k+1)})^TAv^{(k+1)}.$$
> The scalar $\lambda^{(k+1)}$ is the **Rayleigh quotient** estimate of the eigenvalue — a quantity we'll return to and generalize later in this chapter.

> [!thm] Convergence of the power method
> If $A$ is diagonalizable with a unique dominant eigenvalue $|\lambda_1|>|\lambda_2|\ge\cdots$, and $v^{(0)}$ has nonzero component along $q_1$, then $v^{(k)}\to\pm q_1$ and $\lambda^{(k)}\to\lambda_1$.

The asymptotic rate is governed by $|\lambda_2/\lambda_1|$ — the same ratio that controlled how quickly the unwanted terms decayed in the derivation above.

> [!imp] Key limitation
> The power method finds only the largest-magnitude eigenvalue, and convergence stalls whenever $|\lambda_2|\approx|\lambda_1|$ — a near-tie at the top of the spectrum leaves almost nothing to separate the dominant direction from its closest competitor.

A standard convergence check computes the residual $r^{(k)} = Av^{(k)} - \lambda^{(k)}v^{(k)}$; when $\|r^{(k)}\|_2$ is small, $(\lambda^{(k)},v^{(k)})$ is trustworthy.

## Block Power Iteration

The single-vector power method only ever finds one eigenpair. What if you want the top $m$ eigenvectors at once? Restarting with deflation is one option, but the more natural extension is to evolve an entire subspace simultaneously — **block power iteration** (also called *subspace iteration*).

> [!def] Objective
> Given symmetric $A\in\mathbb{R}^{n\times n}$, find $V\in\mathbb{R}^{n\times m}$ with orthonormal columns ($V^TV=I_m$) approximating the invariant subspace spanned by the $m$ largest eigenvalues, typically with $m\ll n$.

The natural first instinct — multiply a whole block $V^{(0)}$ by $A$ repeatedly, the same way the single-vector method worked — runs into a problem: every column is being pulled toward the *same* dominant eigenvector $q_1$, so without correction the columns collapse together and the block loses rank. The fix is to re-orthonormalize after every multiplication, and QR factorization (from several chapters back) is exactly the tool for that.

> [!def] Block power iteration / subspace iteration
> Choose $V^{(0)}$ with orthonormal columns. For $k=0,1,2,\dots$:
> $$\widetilde V^{(k)} = AV^{(k)}, \qquad \widetilde V^{(k)} = Q^{(k+1)}R^{(k+1)}, \qquad V^{(k+1)} = Q^{(k+1)}.$$
> After convergence, form the projected matrix $B = V^TAV\in\mathbb{R}^{m\times m}$. The eigenvalues of $B$ are the **Ritz values**, approximating the leading eigenvalues of $A$.

> [!imp] A common misreading of $R$
> In the QR step $AV^{(k)} = Q^{(k+1)}R^{(k+1)}$, $R^{(k+1)}$ is upper triangular — but its diagonal entries are **not** eigenvalue approximations. The correct place to read off eigenvalues is the small projected matrix $B^{(k)} = V^{(k)T}AV^{(k)}$, not $R^{(k)}$.

### Rayleigh–Ritz refinement

Once the subspace $V$ is accurate, the individual eigenvectors within it can be sharpened by diagonalizing the small $m\times m$ matrix directly:
$$B = V^TAV = W\Theta W^T \quad\Longrightarrow\quad U = VW$$
gives columns approximating the dominant eigenvectors of $A$, with $\Theta$ holding the refined eigenvalue estimates. This is a direct application of the symmetric spectral theorem from earlier — $B$ is symmetric (since $A$ is), so it diagonalizes orthogonally, cheaply, because it's only $m\times m$ rather than $n\times n$.

A standard stopping criterion is the block residual $\|AV - V(V^TAV)\|_F$ — small values mean $\operatorname{Col}(V)$ is close to a genuine invariant subspace of $A$.

> [!note] Remarks
> Block power iteration is also called subspace or simultaneous iteration. It works best for symmetric or Hermitian matrices, is most useful when only a handful of dominant eigenpairs are needed, and can be accelerated with shifts, deflation, or Krylov-subspace techniques.

## Inverse Iteration

The power method only ever converges to the *largest* eigenvalue. What if the eigenvalue you actually want is the *smallest*, or lies somewhere in the middle of the spectrum? The trick is to run the power method not on $A$, but on a cleverly chosen function of $A$ that turns the eigenvalue you want into the dominant one.

> [!note] Basic observation
> If $Av=\lambda v$ and $A$ is invertible, then $A^{-1}v = \frac1\lambda v$. So $A^{-1}$ has eigenvalues $1/\lambda_1,\dots,1/\lambda_n$ — and the *smallest*-magnitude eigenvalue of $A$ becomes the *largest*-magnitude eigenvalue of $A^{-1}$, exactly the quantity the power method is built to find.

Shifting generalizes this further: if $Av=\lambda v$, then $(A-\sigma I)^{-1}v = \frac{1}{\lambda-\sigma}v$. Whichever eigenvalue $\lambda$ happens to be *closest* to the shift $\sigma$ produces the largest term $1/(\lambda-\sigma)$, and therefore becomes dominant under the power method applied to $(A-\sigma I)^{-1}$.

> [!def] Shifted inverse iteration
> Given a shift $\sigma$, choose $v^{(0)}$ with $\|v^{(0)}\|_2=1$. For $k=0,1,2,\dots$:
> $$(A-\sigma I)w^{(k+1)} = v^{(k)}, \qquad v^{(k+1)} = \frac{w^{(k+1)}}{\|w^{(k+1)}\|_2}.$$

With $\sigma=0$ this reduces to plain inverse iteration. More generally, if $\sigma$ sits close to some eigenvalue $\lambda_j$, the method converges to $q_j$ — and the closer $\sigma$ is to $\lambda_j$, the faster that convergence happens.

> [!thm] Convergence of shifted inverse iteration
> If $A$ is diagonalizable and $\sigma$ is strictly closer to $\lambda_j$ than to any other eigenvalue, then — given a starting vector with nonzero $q_j$ component — the iterates converge to $q_j$, at an asymptotic rate governed by $\left|\dfrac{\lambda_j-\sigma}{\lambda_\ell-\sigma}\right|$, where $\lambda_\ell$ is the second-closest eigenvalue to $\sigma$.

> [!important] A practical implementation note
> Inverse iteration never actually forms $(A-\sigma I)^{-1}$ explicitly — that would be both wasteful and numerically unnecessary. Instead, each step solves the linear system $(A-\sigma I)w=v$ directly (using, for instance, the LU or QR-based solves from earlier chapters). If the same shift is reused repeatedly, factoring $A-\sigma I = LU$ once and reusing that factorization across iterations is far more efficient than re-solving from scratch each time.

## Rayleigh Quotient Iteration

Shifted inverse iteration works well *if* you already know roughly where the target eigenvalue is — but what if you'd like the method to locate that shift for you, and sharpen it as it goes? That's exactly what happens when the shift is updated adaptively using the current iterate's own eigenvalue estimate, giving **Rayleigh quotient iteration (RQI)** — one of the fastest local methods available for symmetric eigenvalue problems.

> [!def] Rayleigh quotient
> For nonzero $v$, $\rho(v) = \dfrac{v^TAv}{v^Tv}$, simplifying to $\rho(v)=v^TAv$ when $\|v\|_2=1$. For symmetric $A$, this is an excellent eigenvalue estimate whenever $v$ is close to an eigenvector — the same quantity that appeared as $\lambda^{(k+1)}$ in the plain power method above.

> [!def] Rayleigh quotient iteration
> Choose $v^{(0)}$ with $\|v^{(0)}\|_2=1$ and set $\mu^{(0)} = (v^{(0)})^TAv^{(0)}$. For $k=0,1,2,\dots$:
> $$(A-\mu^{(k)}I)w^{(k+1)} = v^{(k)}, \qquad v^{(k+1)} = \frac{w^{(k+1)}}{\|w^{(k+1)}\|_2}, \qquad \mu^{(k+1)} = (v^{(k+1)})^TAv^{(k+1)}.$$

Each individual step is nothing more than shifted inverse iteration with $\sigma=\mu^{(k)}=\rho(v^{(k)})$ — but since the shift is recomputed from the *current* vector at every iteration, it becomes more accurate exactly as the vector itself does, and the two improve each other in a positive feedback loop.

> [!thm] Local convergence of RQI
> For symmetric $A$, if $v^{(0)}$ is sufficiently close to an eigenvector $q_j$, RQI converges to $(\lambda_j,q_j)$ **cubically**:
> $$\|v^{(k+1)}\mp q_j\| = O\big(\|v^{(k)}\mp q_j\|^3\big), \qquad |\mu^{(k+1)}-\lambda_j| = O\big(|\mu^{(k)}-\lambda_j|^3\big).$$

Cubic convergence is a striking upgrade over the linear rate of plain power iteration: each step doesn't just add a fixed number of accurate digits, it roughly *triples* the number of correct digits already achieved. The tradeoff is that RQI is purely a *local* method — good initialization matters, since the cubic guarantee only kicks in once $v^{(0)}$ is already reasonably close to an eigenvector.

> [!note] Remarks
> RQI is typically far faster than fixed-shift inverse iteration and is especially effective for symmetric or Hermitian matrices. The linear system $(A-\mu^{(k)}I)w=v^{(k)}$ tends to become increasingly ill-conditioned as $\mu^{(k)}\to\lambda_j$ — but this is not a failure mode here. Recall from the numerical-stability chapters that ill-conditioning normally *degrades* accuracy; near an eigenvalue, that same near-singularity is precisely what drives the rapid convergence, since the solve is essentially amplifying the component of $v^{(k)}$ along $q_j$ ever more strongly.

## From Iterative Methods to Dense Eigenvalue Algorithms

Every method so far targets a handful of eigenpairs — the largest, the smallest, or one nearest a chosen target. If instead you want **most or all** eigenvalues of a dense matrix, restarting one of these local methods many times with different shifts is possible but inefficient. The standard approach instead computes a full Schur factorization (recall this guarantee from two chapters ago: it exists for *every* square matrix, with no diagonalizability assumption needed) via the **QR algorithm**.

> [!def] Schur factorization, recalled
> For any $A\in\mathbb{C}^{n\times n}$, there is a unitary $U$ with $A=UTU^*$, $T$ upper triangular. Since $A$ and $T$ are similar, they share the same eigenvalues — and being triangular, $T$'s eigenvalues sit in plain sight on its diagonal.

For real matrices, this becomes the real Schur form $A=QTQ^T$ with $T$ quasi-upper-triangular: $1\times1$ diagonal blocks for real eigenvalues, $2\times2$ blocks for complex-conjugate pairs — the same compromise discussed in detail previously, forced by the fact that a real triangular matrix simply cannot hold a complex number on its diagonal.

### The core QR step

The QR algorithm produces this Schur form as the *limit* of a deceptively simple iterative process, built entirely out of the QR factorization from several chapters ago. Starting from $A_0=A$, at each step factor
$$A_k = Q_kR_k$$
and then multiply the factors back together in the *opposite* order:
$$A_{k+1} = R_kQ_k.$$
Since $R_k = Q_k^{-1}A_k = Q_k^TA_k$ (using orthogonality), swapping the order gives $A_{k+1} = Q_k^TA_kQ_k$ — a similarity transformation. So every $A_k$ in this sequence shares the same eigenvalues as the original $A$, and remarkably, as $k$ increases, $A_k$ converges toward Schur form on its own.

### A two-phase workflow

Running the QR algorithm directly on a general dense matrix is expensive, since QR factorization itself costs $O(n^3)$ per step. The standard practical pipeline reduces that cost dramatically by first simplifying $A$'s structure.

**Phase 1 — reduce to Hessenberg form.** Find an orthogonal $Q$ with $A = QHQ^*$, where $H$ has zeros below the first subdiagonal:
$$
H = \begin{bmatrix}x&x&x&x&x\\x&x&x&x&x\\0&x&x&x&x\\0&0&x&x&x\\0&0&0&x&x\end{bmatrix}.
$$

> [!def] Hessenberg matrix
> A matrix is upper Hessenberg if $h_{ij}=0$ whenever $i>j+1$ — upper triangular, but with one extra surviving subdiagonal.

This reduction is itself a similarity transform, so it preserves eigenvalues exactly, and it makes every subsequent QR step dramatically cheaper — Hessenberg structure is nearly triangular already, so factoring it costs far less than factoring a dense matrix from scratch.

**Phase 2 — QR iteration on the Hessenberg matrix.** Apply the same QR-then-swap process from above, now to $H$:
$$H_0 = H, \qquad H_k = Q_kR_k, \qquad H_{k+1} = R_kQ_k.$$
The iterates converge to Schur form — upper triangular in the complex case, quasi-upper-triangular in the real case — while Hessenberg structure is preserved at every step, keeping each iteration cheap.

> [!imp] The complete dense eigenvalue pipeline
> 1. Reduce $A$ to Hessenberg form (a one-time, exact similarity transform).
> 2. Run shifted QR iteration on the Hessenberg matrix until it converges to Schur form.
> 3. Read the eigenvalues off the diagonal (or diagonal blocks, in the real case) of the resulting triangular matrix.

### The symmetric special case

If $A$ is symmetric, this pipeline gets even cheaper: Hessenberg reduction of a symmetric matrix collapses further, all the way down to **tridiagonal** form (Hessenberg with the added constraint of symmetry forces almost everything off the tridiagonal band to vanish). A specialized symmetric QR algorithm then runs on this tridiagonal matrix — cheaper and more numerically stable than the general nonsymmetric pipeline, and a fitting return to the theme from earlier chapters that symmetric matrices are consistently the best-behaved case throughout this course.

## Summary of Methods

Matching the tool to the goal:

* **One dominant eigenpair** → power method.
* **Several dominant eigenpairs** → block power iteration / subspace iteration.
* **An eigenvalue near a chosen target $\sigma$** → shifted inverse iteration.
* **Very fast local convergence to a single eigenpair** → Rayleigh quotient iteration.
* **Most or all eigenvalues of a dense matrix** → Hessenberg reduction + QR iteration → Schur form.

> [!imp] Key ideas
> * Power iteration amplifies the dominant eigen-direction through repeated multiplication by $A$.
> * Inverse iteration amplifies whichever mode lies nearest a chosen shift, by solving linear systems instead of multiplying.
> * Rayleigh quotient iteration updates that shift adaptively using the current vector's own Rayleigh quotient, and converges cubically for symmetric matrices.
> * Modern dense eigensolvers do **not** rely on repeated power iteration at all — they reduce to Hessenberg form and apply QR iteration to reach Schur form, turning the same QR factorization used for least squares many chapters ago into the engine for computing an entire spectrum at once.
