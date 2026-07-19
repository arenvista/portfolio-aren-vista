---
id: L12
aliases: ["Cauchy Sequence", "Cauchy Criterion", "Cauchy Convergence Criterion", "Contractive Sequence"]
tags: []
---
# The Cauchy Criterion

## Cauchy Sequences

So far, showing a sequence converges has always required knowing the limit in advance — the definition of $x_n \to x$ explicitly refers to $x$. The Cauchy criterion, developed in this lecture, will give a way to certify convergence using only the terms of the sequence themselves, with no candidate limit required.

> [!def] Cauchy Sequence
> A sequence $X = (x_n)$ is **Cauchy** if
> $$
> \forall\, \epsilon > 0,\ \exists\, h_\epsilon \in \mathbb{N} \text{ such that } \forall\, m,n \ge h_\epsilon,\quad |x_n - x_m| < \epsilon.
> $$

```tikz
\usepackage{tikz}
\usepackage{amsmath}

\begin{document}

\begin{tikzpicture}[x=0.7cm, y=2.5cm, >=stealth]

	\def\he{7}
	\def\eps{1.0}
	\def\limit{1.2}

	\fill[blue!10] (\he, \limit - \eps/2) rectangle (17.5, \limit + \eps/2);
	\draw[blue!60, dashed, thick] (\he, \limit - \eps/2) -- (17.5, \limit - \eps/2);
	\draw[blue!60, dashed, thick] (\he, \limit + \eps/2) -- (17.5, \limit + \eps/2);

	\draw[<->, blue, thick] (17.2, \limit - \eps/2) -- (17.2, \limit + \eps/2)
	node[midway, right] {$\epsilon$};

	\draw[->, thick] (-0.5, 0) -- (18, 0) node[right] {$n, m$};
	\draw[->, thick] (0, -0.2) -- (0, 2.2) node[above] {$x_n$};

	\draw[dashed, red, thick] (\he, 0) -- (\he, 2.0);
	\node[below, red, font=\large] at (\he, 0) {$h_\epsilon$};

	\foreach \n in {1, 2, ..., 17} {
			\pgfmathsetmacro{\y}{\limit + 2.5 * cos(\n * 137) / (\n * 0.8 + 0.5)}
			\fill[black] (\n, \y) circle (2pt);
		}

	\def\m{8}
	\def\n{12}

	\pgfmathsetmacro{\ym}{\limit + 2.5 * cos(\m * 137) / (\m * 0.8 + 0.5)}
	\pgfmathsetmacro{\yn}{\limit + 2.5 * cos(\n * 137) / (\n * 0.8 + 0.5)}

	\fill[red] (\m, \ym) circle (2.5pt);
	\fill[red] (\n, \yn) circle (2.5pt);
	\node[above, red, font=\small] at (\m, \ym+0.05) {$x_m$};
	\node[below, red, font=\small] at (\n, \yn-0.05) {$x_n$};

	\draw[dashed, red] (\m, \ym) -- (15.5, \ym);
	\draw[dashed, red] (\n, \yn) -- (15.5, \yn);
	\draw[<->, red, thick] (15.2, \ym) -- (15.2, \yn)
	node[midway, left, font=\small, fill=blue!10, inner sep=1pt] {$|x_n - x_m|$};

	\node[align=left, anchor=south west, fill=white, draw=gray, rounded corners, inner sep=5pt] at (7.5, 1.8) {
		For all $n, m \geq h_\epsilon$,\\
		$|x_n - x_m| < \epsilon$
	};
\end{tikzpicture}
\end{document}
```

> [!note] Reading the definition
> Informally: past some index $h_\epsilon$, *any two* terms of the sequence — not just consecutive ones — are within $\epsilon$ of each other. This is a stronger-looking condition than "consecutive terms get close," since it must hold for every pair $m,n \ge h_\epsilon$ simultaneously.

### Example: $(1/n)$ Is Cauchy

> [!example] $x_n = 1/n$ Is Cauchy
> We want $\left|\tfrac1n - \tfrac1m\right| < \epsilon$. By the triangle inequality,
> $$
> \left|\frac1n - \frac1m\right| \le \frac1n + \frac1m.
> $$
> It suffices to make each term less than $\epsilon/2$: if $n, m > 2/\epsilon$, then $\tfrac1n < \epsilon/2$ and $\tfrac1m < \epsilon/2$, so their sum is less than $\epsilon$. By the Archimedean property, some $h_\epsilon > 2/\epsilon$ exists; taking any $m,n \ge h_\epsilon$ then gives $\left|\tfrac1n-\tfrac1m\right| < \epsilon$. Hence $(1/n)$ is Cauchy.

### Negation: $((-1)^n)$ Is Not Cauchy

Negating the Cauchy condition follows the same pattern as negating convergence in Lecture 9: flip the quantifiers, and produce a single "bad" pair of indices for every threshold.

> [!def] Non-Cauchy (Negation)
> $X = (x_n)$ fails to be Cauchy if
> $$
> \exists\, \epsilon_0 > 0 \text{ such that } \forall\, k \in \mathbb{N},\ \exists\, m_k, n_k \ge k \text{ with } |x_{m_k} - x_{n_k}| \ge \epsilon_0.
> $$

> [!example] $x_n = (-1)^n$ Is Not Cauchy
> Note that $|(-1)^n - (-1)^{n+1}| = 2$ for every $n$, so any $\epsilon_0 < 2$ will witness non-Cauchyness. Take $\epsilon_0 = 1$. For any $k \in \mathbb{N}$, let $n_k = k$ and $m_k = k+1$; both satisfy $n_k, m_k \ge k$, and
> $$
> |x_{m_k} - x_{n_k}| = |(-1)^{k+1} - (-1)^k| = 2 > 1 = \epsilon_0.
> $$
> Hence $(-1)^n$ is not Cauchy.

## The Cauchy Convergence Criterion

We now come to the main result: being Cauchy is not merely necessary for convergence but *equivalent* to it. This is the payoff promised above — a way to certify convergence purely from the terms of the sequence.

> [!thm] Cauchy Convergence Criterion
> A sequence $(x_n)$ converges if and only if it is Cauchy.

The forward direction is a routine application of the triangle inequality, splitting $\epsilon$ into halves exactly as in the Addition Law proof (Lecture 7).

> [!pf] ($\Rightarrow$) Convergent Implies Cauchy
> Suppose $x_n \to x$. Given $\epsilon > 0$, choose $n_\epsilon$ such that $|x_n - x| < \epsilon/2$ for all $n \ge n_\epsilon$. Take $h_\epsilon = n_\epsilon$. Then for all $m, n \ge h_\epsilon$, the triangle inequality gives
> $$
> |x_n - x_m| = |(x_n - x) + (x - x_m)| \le |x_n - x| + |x_m - x| < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon.
> $$
> Hence $(x_n)$ is Cauchy.

The converse is the harder direction, and it is where the machinery from earlier lectures pays off: [[Bounded Sequence|boundedness]] (Lecture 7), [[Bolzano–Weierstrass Theorem|Bolzano–Weierstrass]] (Lecture 10), and the triangle inequality all combine in a three-step argument.

> [!pf] ($\Leftarrow$) Cauchy Implies Convergent
> **Step 1: $(x_n)$ is bounded.** Since $(x_n)$ is Cauchy, take $\epsilon = 1$: there exists $h_1$ such that $|x_n - x_m| < 1$ for all $m,n \ge h_1$. In particular, fixing $m = h_1$, we get $|x_n - x_{h_1}| < 1$ for all $n \ge h_1$. By the triangle inequality,
> $$
> |x_n| \le |x_n - x_{h_1}| + |x_{h_1}| < 1 + |x_{h_1}| \qquad \text{for all } n \ge h_1.
> $$
> Setting $M := \max\{|x_1|, \dots, |x_{h_1-1}|,\ 1+|x_{h_1}|\}$ gives $|x_n| \le M$ for all $n \in \mathbb{N}$ — exactly the same "bound the tail, then take a max over the finite start" argument used to show convergent sequences are bounded in Lecture 7.
>
> **Step 2: Extract a convergent subsequence.** Since $(x_n)$ is bounded, the Bolzano–Weierstrass theorem (Lecture 10) guarantees a convergent subsequence $(x_{n_k})$. Let $L = \lim_{k\to\infty} x_{n_k}$.
>
> **Step 3: Show the whole sequence converges to $L$.** Let $\epsilon > 0$. Since $(x_n)$ is Cauchy, there exists $h_{\epsilon/2}$ such that $|x_n - x_m| < \epsilon/2$ for all $m,n \ge h_{\epsilon/2}$. Since $x_{n_k} \to L$, there exists $k_{\epsilon/2}$ such that $|x_{n_k} - L| < \epsilon/2$ for all $k \ge k_{\epsilon/2}$. Choose $k$ large enough that both $k \ge k_{\epsilon/2}$ *and* $n_k \ge h_{\epsilon/2}$ (possible since $(n_k)$ is strictly increasing and unbounded). Then for any $n \ge h_{\epsilon/2}$, the triangle inequality gives
> $$
> |x_n - L| \le \underbrace{|x_n - x_{n_k}|}_{<\, \epsilon/2 \text{ (Cauchy)}} + \underbrace{|x_{n_k} - L|}_{<\, \epsilon/2 \text{ (subsequence)}} < \epsilon.
> $$
> Hence $x_n \to L$.

```tikz
\usepackage{tikz}
\usepackage{amsmath}
\usepackage{amssymb}
\usetikzlibrary{decorations.pathreplacing, arrows.meta}

\begin{document}

\begin{tikzpicture}[>=stealth, x=0.8cm, y=1.2cm]

    \node[anchor=west, font=\Large\bfseries] at (0, 4.5) {Part 1: Bounding the Cauchy Sequence};
    \node[anchor=west, text=black!70] at (0, 4.0) {Using $\epsilon=1$, the sequence is trapped after $h_1$. $M$ bounds the initial outliers.};

    \begin{scope}[yshift=0cm]
        \def\hone{5}
        \def\xhone{1.8}
        
        \fill[blue!10] (\hone, \xhone - 1) rectangle (16, \xhone + 1);
        \draw[blue, dashed] (\hone, \xhone - 1) -- (16, \xhone - 1);
        \draw[blue, dashed] (\hone, \xhone + 1) -- (16, \xhone + 1);
        \draw[blue, thick, dotted] (\hone, \xhone) -- (16, \xhone);
        
        \draw[<->, blue, thick] (15.5, \xhone) -- (15.5, \xhone+1) node[midway, right] {$\epsilon=1$};
        
        \draw[->, thick] (-0.5, 0) -- (16.5, 0) node[right] {$n$};
        \draw[->, thick] (0, -0.2) -- (0, 3.8) node[above] {$x_n$};
        
        \draw[red, thick] (-0.2, 3.4) -- (16.5, 3.4) node[right] {$M$};
        
        \draw[dashed, gray] (\hone, 0) -- (\hone, \xhone);
        \node[below, font=\large] at (\hone, 0) {$h_1$};
        
        \fill[black] (1, 3.4) circle (2.5pt) node[above] {$x_1$};
        \fill[black] (2, 0.5) circle (2.5pt) node[below] {$x_2$};
        \fill[black] (3, 2.8) circle (2.5pt) node[above] {$x_3$};
        \fill[black] (4, 1.1) circle (2.5pt) node[below] {$x_4$};
        
        \fill[blue] (\hone, \xhone) circle (3pt) node[above left, blue] {$x_{h_1}$};
        
        \foreach \n in {6,7,...,15} {
            \pgfmathsetmacro{\y}{\xhone + 0.8 * cos(\n * 137) / (\n*0.3 - 0.5)}
            \fill[black] (\n, \y) circle (2pt);
        }
        
        \draw[decorate, decoration={brace, amplitude=5pt}, red, thick] (-0.3, 0) -- (-0.3, 3.4) node[midway, left, xshift=-0.2cm, align=right] {$M = \max\{|x_1|, \dots,$\\$|x_{h_1-1}|, |x_{h_1}|+1\}$};
    \end{scope}

    \begin{scope}[yshift=-6cm]
        \node[anchor=west, font=\Large\bfseries] at (0, 4.0) {Part 2: Convergence via Bolzano-Weierstrass \& Triangle Inequality};
        \node[anchor=west, text=black!70] at (0, 3.5) {Subsequence $(x_{n_k}) \to L$. Triangle inequality binds $x_n$ to $L$.};

        \def\Limit{1.5}
        \def\he{8}
        \def\eps{1.2}
        \def\epsHalf{0.6}
        
        \fill[green!5] (0, \Limit - \eps) rectangle (16, \Limit + \eps);
        \draw[green!60!black, dashed] (0, \Limit - \eps) -- (16, \Limit - \eps);
        \draw[green!60!black, dashed] (0, \Limit + \eps) -- (16, \Limit + \eps);
        
        \fill[green!15] (\he, \Limit - \epsHalf) rectangle (16, \Limit + \epsHalf);
        \draw[green!60!black, thick, dotted] (\he, \Limit - \epsHalf) -- (16, \Limit - \epsHalf);
        \draw[green!60!black, thick, dotted] (\he, \Limit + \epsHalf) -- (16, \Limit + \epsHalf);
        
        \draw[green!50!black, thick] (0, \Limit) -- (16.5, \Limit) node[right, font=\large] {$L$};
        
        \draw[<->, green!50!black, thick] (15.5, \Limit) -- (15.5, \Limit+\epsHalf) node[midway, left] {$\epsilon/2$};
        \draw[<->, green!50!black, thick] (16.2, \Limit) -- (16.2, \Limit+\eps) node[midway, right] {$\epsilon$};
        
        \draw[->, thick] (-0.5, 0) -- (16.5, 0) node[right] {$n$};
        \draw[->, thick] (0, -0.2) -- (0, 3.0) node[above] {$x_n$};
        
        \draw[dashed, red] (\he, 0) -- (\he, 3);
        \node[below, red, font=\large] at (\he, 0) {$h_{\epsilon/2}$};
        
        \foreach \n in {1,2,...,7} {
            \pgfmathsetmacro{\y}{\Limit + 1.2 * cos(\n * 137)}
            \fill[gray] (\n, \y) circle (2pt);
        }
        
        \foreach \n in {8,9,10,12,13} {
            \pgfmathsetmacro{\y}{\Limit + 0.8 * cos(\n * 97) / (\n*0.2)}
            \fill[black] (\n, \y) circle (2pt);
        }
        
        \fill[orange, draw=black] (5, 2.5) circle (3pt) node[above] {$x_{n_1}$};
        \fill[orange, draw=black] (9, 1.9) circle (3pt) node[above right] {$x_{n_2}$};
        \fill[orange, draw=black] (11, 1.3) circle (3pt) node[below] {$x_{n_3}$};
        \fill[orange, draw=black] (14, 1.6) circle (3pt) node[above right] {$x_{n_k}$};
        
        \def\xnindex{15}
        \pgfmathsetmacro{\yn}{\Limit - 0.4}
        \fill[black] (\xnindex, \yn) circle (2.5pt) node[below right] {$x_n$};
        
        \draw[->, blue, thick] (\xnindex, \yn) -- (14, 1.6) node[midway, left, font=\footnotesize, fill=white, inner sep=1pt] {$< \epsilon/2$};
        \draw[->, purple, thick] (14, 1.6) -- (14, \Limit) node[midway, right, font=\footnotesize, fill=white, inner sep=1pt] {$< \epsilon/2$};
        
        \node[align=left, fill=white, draw=gray, rounded corners, inner sep=5pt] at (6, -1.8) {
            $\underbrace{|x_n - L|}_{<\epsilon} \leq \underbrace{|x_n - x_{n_k}|}_{\text{Cauchy: } < \epsilon/2} + \underbrace{|x_{n_k} - L|}_{\text{Subseq conv: } < \epsilon/2}$
        };
        
    \end{scope}

\end{tikzpicture}

\end{document}
```

> [!imp] Why this criterion is powerful
> Every earlier convergence proof (Lectures 7–8) required guessing the limit $L$ first, then verifying $|x_n - L| < \epsilon$. The Cauchy criterion sidesteps this entirely — it only inspects how the terms of the sequence relate to *each other*. This is especially valuable for proving **divergence**, since showing a sequence is *not* Cauchy requires no knowledge of a limit at all, as the next example shows.

### Application: The Harmonic Series Diverges

> [!example] $x_n = 1 + \tfrac12 + \tfrac13 + \cdots + \tfrac1n$ Diverges
> We show $(x_n)$ is not Cauchy. For $n > m$,
> $$
> x_n - x_m = \frac{1}{m+1} + \frac{1}{m+2} + \cdots + \frac{1}{n}.
> $$
> Take $n = 2m$. This difference has exactly $m$ terms, each at least $\tfrac{1}{2m}$ (since every denominator is at most $2m$), so
> $$
> x_{2m} - x_m \ge \underbrace{\frac{1}{2m} + \cdots + \frac{1}{2m}}_{m \text{ terms}} = m \cdot \frac{1}{2m} = \frac12.
> $$
> So with $\epsilon_0 = 1/2$, set $n_k = 2k$ and $m_k = k$: both are $\ge k$, and $|x_{n_k} - x_{m_k}| \ge 1/2 = \epsilon_0$ for every $k$. Hence $(x_n)$ is not Cauchy, and by the Cauchy Convergence Criterion, it does not converge — the harmonic series diverges.

## Contractive Sequences

The Cauchy criterion is often hard to verify directly, since it requires controlling $|x_n - x_m|$ for *arbitrary* pairs $m,n$. Contractive sequences are a special class where only *consecutive* differences need to be controlled, and where those differences shrink geometrically — making the Cauchy condition automatic.

> [!def] Contractive Sequence
> A sequence $(x_n)$ is **contractive** if there exists a constant $c$ with $0 < c < 1$ such that, for all sufficiently large $n$,
> $$
> |x_{n+2} - x_{n+1}| \le c\,|x_{n+1} - x_n|.
> $$

> [!example] A Recursively Averaged Sequence
> Let $x_1 = 1$, $x_2 = 2$, and $x_n = \tfrac12(x_{n-1} + x_{n-2})$ for $n \ge 3$. Then
> $$
> x_{n+2} - x_{n+1} = \frac12(x_{n+1}+x_n) - x_{n+1} = \frac12(x_n - x_{n+1}),
> $$
> so
> $$
> |x_{n+2} - x_{n+1}| = \frac12 |x_{n+1} - x_n|.
> $$
> This is exactly the contractive condition with $c = 1/2$.

> [!thm] Every Contractive Sequence Is Cauchy (Hence Convergent)
> If $(x_n)$ is contractive with constant $c \in (0,1)$, then $(x_n)$ is Cauchy, and therefore convergent by the Cauchy Convergence Criterion.

The proof has two ingredients: first, iterating the contractive inequality shows consecutive differences decay geometrically; second, summing a geometric series (via the finite geometric sum formula) bounds the distance between *any* two terms, however far apart.

> [!pf] Proof
> **Geometric decay of consecutive differences.** Iterating the contractive inequality,
> $$
> |x_{n+2}-x_{n+1}| \le c\,|x_{n+1}-x_n| \le c^2\,|x_n - x_{n-1}| \le \cdots \le c^{n-1}|x_2-x_1|.
> $$
>
> **Bounding $|x_n - x_m|$ for $n > m$.** Chaining the triangle inequality across consecutive terms,
> $$
> |x_n - x_m| \le |x_n - x_{n-1}| + |x_{n-1}-x_{n-2}| + \cdots + |x_{m+1}-x_m| \le c^{n-2}|x_2-x_1| + \cdots + c^{m-1}|x_2-x_1|.
> $$
> Factor out $c^{m-1}|x_2-x_1|$:
> $$
> |x_n - x_m| \le c^{m-1}|x_2-x_1|\left(1 + c + c^2 + \cdots + c^{n-m-1}\right).
> $$
> Using the finite geometric sum formula $1 + a + \cdots + a^k = \dfrac{1-a^{k+1}}{1-a}$ with $a = c$,
> $$
> |x_n-x_m| \le c^{m-1}|x_2-x_1| \cdot \frac{1-c^{n-m}}{1-c} = \frac{|x_2-x_1|}{1-c}\bigl(c^{m-1}-c^{n-1}\bigr) \le \frac{|x_2-x_1|}{1-c}\,c^{m-1},
> $$
> since $0 < c < 1$ makes $c^{n-1} > 0$. Because $0 < c < 1$, $c^{m-1} \to 0$ as $m \to \infty$ (this is the decaying geometric sequence result from Lecture 9). So given $\epsilon > 0$, choose $h_\epsilon$ large enough that $c^{m-1} < \dfrac{(1-c)\epsilon}{|x_2-x_1|}$ for all $m \ge h_\epsilon$ (possible whenever $x_1 \ne x_2$; if $x_1=x_2$ the sequence is eventually constant and trivially Cauchy). Then $|x_n - x_m| < \epsilon$ for all $n > m \ge h_\epsilon$, so $(x_n)$ is Cauchy.

> [!imp] Why contractive sequences are easier to handle
> This theorem converts a hard-to-check *global* condition (Cauchy: control $|x_n-x_m|$ for all pairs) into an easy-to-check *local* condition (contractive: control only consecutive differences). Verifying contractiveness is often a one-line computation, as the next example shows, while directly verifying the Cauchy condition for the same sequence would be far more work.

### Example: A Recursive Square-Root Sequence

> [!example] $x_1 = 1,\ x_{n+1} = \sqrt{x_n+2}$
> We show this sequence is contractive, using the Conjugate Trick from Lecture 6. For consecutive differences,
> $$
> |x_{n+2}-x_{n+1}| = \left|\sqrt{x_{n+1}+2}-\sqrt{x_n+2}\right| = \frac{|(x_{n+1}+2)-(x_n+2)|}{\sqrt{x_{n+1}+2}+\sqrt{x_n+2}} = \frac{|x_{n+1}-x_n|}{\sqrt{x_{n+1}+2}+\sqrt{x_n+2}}.
> $$
> Since $x_n \ge 0$ for all $n$ (an easy induction, as $x_{n+1} = \sqrt{x_n+2} \ge \sqrt{2} > 0$), each term in the denominator satisfies $\sqrt{x_k+2} \ge \sqrt2$, so
> $$
> |x_{n+2}-x_{n+1}| \le \frac{1}{2\sqrt2}\,|x_{n+1}-x_n|.
> $$
> This is the contractive condition with $c = \tfrac{1}{2\sqrt2} \in (0,1)$. By the theorem above, $(x_n)$ is Cauchy, hence convergent.
