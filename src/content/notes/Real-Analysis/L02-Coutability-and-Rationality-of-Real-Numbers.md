---
id: L02
aliases: ["Countability", "Countable Set", "Countable", "Denumerable", "Field Axioms", "Irrationality of √2"]
tags: []
---
# Countability, the Real Numbers, and Order

## Countable Sets

Having established what it means for a set to be [[Finite and Infinite Sets|finite]] (Lecture 1), we now extend the classification scheme to infinite sets, distinguishing those infinite sets that can still be "listed" from those that cannot.

> [!def] Finite Set ($n$ elements)
> A set $S$ is said to have $n$ elements if there exists a bijection $\{1,2,\dots,n\} \to S$.

> [!def] Denumerable (Countably Infinite)
> A set $S$ is **denumerable** if it is infinite and there exists a bijection $\mathbb{N} \to S$, where $\mathbb{N} = \{1,2,3,\dots\}$.

> [!def] Countable Set
> A set $S$ is **countable** if it is either finite or denumerable.

> [!imp] Two ways to say "countable"
> "Countable" is the umbrella term: finite sets and denumerable sets are both countable, but denumerable specifically means infinite *and* in bijection with $\mathbb{N}$. Compare this to the $n$-element definition from Lecture 1, which bijects with the finite set $\{1,\dots,n\}$ rather than with $\mathbb{N}$ itself — the two definitions are parallel in form but apply to different regimes.

### Equivalent Characterizations

Directly verifying a bijection with $\mathbb{N}$ can be inconvenient. The next theorem gives two more flexible tests for countability.

> [!thm] Equivalent Characterizations of Countability
> For a set $S$, the following are equivalent:
> - $S$ is countable.
> - There exists a surjection $\mathbb{N} \twoheadrightarrow S$.
> - There exists an injection $S \hookrightarrow \mathbb{N}$.

The surjection and injection criteria are often easier to produce than an outright bijection, since we only need to hit every element of $S$ at least once (surjection) or embed $S$ injectively somewhere inside $\mathbb{N}$ (injection) — any such map can be repaired into a genuine bijection.

This immediately gives a subset test analogous to the Set Sizing theorem from Lecture 1:

> [!lem] Subsets of Countable Sets
> If $A$ is countable and $B \subseteq A$, then $B$ is countable.

> [!note] Why this follows quickly
> If $A$ is countable, fix an injection $A \hookrightarrow \mathbb{N}$. Restricting it to $B \subseteq A$ still gives an injection $B \hookrightarrow \mathbb{N}$, so by the equivalent characterization above, $B$ is countable. This is the "infinite-friendly" analogue of the fact that subsets of finite sets are finite.

### Closure Under Intersection and Union

> [!thm] Intersections and Unions of Countable Sets
> Let $S,T$ be sets.
> - If at least one of $S$ or $T$ is countable, then $S \cap T$ is countable.
> - If both $S$ and $T$ are countable, then $S \cup T$ is countable.

The intersection statement follows at once from the Subsets Lemma, since $S \cap T$ is a subset of whichever of $S,T$ is countable. The union statement is more delicate — it requires actually constructing a bijection — and is the content of the next theorem.

> [!thm] Bijection for the Union of Two Denumerable Sets
> If $S$ and $T$ are denumerable, then $S \cup T$ is denumerable.

> [!pf] Proof
> The obvious approach — interleaving an enumeration of $S$ with one of $T$ — fails when $S$ and $T$ overlap, since elements of $S \cap T$ would be listed twice and the resulting map would not be injective. The fix is to enumerate only the *new* elements $T$ contributes.
>
> Since $T\setminus S \subseteq T$, the Subsets Lemma guarantees $T \setminus S$ is countable. Let $f:\mathbb{N}\to S$ and $g:\mathbb{N}\to T\setminus S$ be bijections, and interleave them:
> $$
> h(n)=
> \begin{cases}
> f(k), & \text{if } n=2k \text{ (even)}\\
> g(k), & \text{if } n=2k-1 \text{ (odd)}.
> \end{cases}
> $$
> Because $S$ and $T\setminus S$ are disjoint by construction, $h$ hits every element of $S \cup T$ exactly once, so $h:\mathbb{N}\to S\cup T$ is a bijection. Explicitly, the sequence begins
> $$
> h(1)=g(1),\quad h(2)=f(1),\quad h(3)=g(2),\quad h(4)=f(2),\ \dots
> $$

### The Rationals Are Countable

As a first substantial application, we show that $\mathbb{Q}$ — despite being dense in $\mathbb{R}$ and therefore feeling much "bigger" than $\mathbb{N}$ — is in fact countable.

> [!thm] The Set of Rational Numbers is Countable
> $\mathbb{Q}$ is countable.

> [!pf]
> It suffices to show $\mathbb{Q}^+=\{m/n : m,n\in\mathbb{N}\}$ is countable: since $x \mapsto -x$ gives a bijection $\mathbb{Q}^+ \to \mathbb{Q}^-$, the Union Theorem above applied to $\mathbb{Q}^- \cup \{0\} \cup \mathbb{Q}^+$ then finishes the job.
>
> Arrange $\mathbb{Q}^+$ in a grid indexed by $(m,n)\in\mathbb{N}^2$:
>
> |   |   |   |   |   |
> |---|---|---|---|---|
> | 1/1 | 2/1 | 3/1 | 4/1 | … |
> | 1/2 | 2/2 | 3/2 | 4/2 | … |
> | 1/3 | 2/3 | 3/3 | 4/3 | … |
> | …   | …   | …   | …   | … |
>
> Traverse along diagonals (e.g., in order of constant $m+n$), listing each reduced fraction only the first time it appears and skipping duplicates such as $2/2 = 1/1$. This produces a bijection $\mathbb{N}\to\mathbb{Q}^+$, completing the proof.

### Countable Unions of Countable Sets

The diagonal-traversal idea used for $\mathbb{Q}^+$ is not a one-off trick — it generalizes to show that countability is preserved under taking countably many countable pieces at once, strictly extending the two-set Union Theorem above.

> [!thm] Countable Union of Countable Sets
> If each $A_n$ is countable, then $\bigcup_{n=1}^{\infty} A_n$ is countable.

> [!pf] Proof
> For each $n$, fix a surjection $f^{(n)}:\mathbb{N}\to A_n$ (possible since each $A_n$ is countable). Arrange the values $f^{(n)}(k)$ in a grid with rows indexed by $n$ and columns by $k$ — exactly as in the $\mathbb{Q}^+$ construction. Traversing this grid by diagonals and recording each element the first time it appears yields a surjection $\mathbb{N}\to \bigcup_{n\ge1} A_n$. By the Equivalent Characterizations theorem, a surjection from $\mathbb{N}$ suffices to conclude the union is countable.

> [!imp] The diagonal argument as a unifying technique
> Notice the same diagonal-traversal idea powers both the countability of $\mathbb{Q}$ and this general union theorem — enumerating $\mathbb{Q}^+$ is really just the special case $A_n = \{n/1, n/2, n/3, \dots\}$. Recognizing this shared machinery is more useful than memorizing each proof separately.

---

## Algebraic Properties of $\mathbb{R}$

Having studied *how many* elements various sets have, we now turn to the algebraic and order structure of $\mathbb{R}$ itself, starting from its defining axioms.

> [!def] Field Axioms for $\mathbb{R}$
> Two binary operations "$+$" (addition) and "$\cdot$" (multiplication) are defined on $\mathbb{R}$.
>
> - **Addition**
>   1. Commutativity: $a+b=b+a$
>   2. Associativity: $(a+b)+c=a+(b+c)$
>   3. Identity: $\exists\,0\in\mathbb{R}$ such that $a+0=a$
>   4. Inverses: $\forall a\in\mathbb{R}\ \exists\,(-a)\in\mathbb{R}$ with $a+(-a)=0$
> - **Multiplication**
>   1. Commutativity: $a\cdot b=b\cdot a$
>   2. Associativity: $(a\cdot b)\cdot c=a\cdot(b\cdot c)$
>   3. Identity: $\exists\,1\in\mathbb{R}$ such that $a\cdot 1=a$
>   4. Inverses: $\forall a\neq 0\ \exists\,a^{-1}\in\mathbb{R}$ with $a\cdot a^{-1}=1$
> - **Distributivity**
>   1. $a\cdot(b+c)=a\cdot b+a\cdot c$

> [!cor] Notes
> - Subtraction is addition of inverses: $a-b=a+(-b)$.
> - Division is multiplication by inverses: $a/b=a\cdot b^{-1}$ (for $b\neq 0$).

### Basic Consequences

Everything in this subsection is derived purely from the field axioms above — none of it is a new assumption. This is worth dwelling on: facts as "obvious" as $a \cdot 0 = 0$ actually require proof from more primitive axioms.

> [!thm] Additive Cancellation (Special Case)
> If $z,a\in\mathbb{R}$ and $z+a=a$, then $z=0$.

> [!pf] Proof
> $$
> \begin{aligned}
> z+a&=a\\
> (z+a)+(-a)&=a+(-a) && \text{add }-a\\
> z+(a+(-a))&=0 && \text{associativity and inverses}\\
> z+0&=0\\
> z&=0 && \text{since }z+0=z.
> \end{aligned}
> $$

The same "add the inverse, then simplify" pattern proves the multiplicative analogue:

> [!cor] Multiplicative Cancellation
> If $a\cdot b=a\cdot c$ and $a\neq 0$, then $b=c$.
>
> $$
> \begin{aligned}
> a\cdot b&=a\cdot c\\
> (a\cdot b)\cdot a^{-1}&=(a\cdot c)\cdot a^{-1}\\
> (a\cdot a^{-1})\cdot b&=(a\cdot a^{-1})\cdot c\\
> 1\cdot b&=1\cdot c\\
> b&=c.
> \end{aligned}
> $$

> [!thm] Multiplication by Zero
> For all $a\in\mathbb{R}$, $a\cdot 0=0$.

> [!pf] Proof
> $$
> \begin{aligned}
> a\cdot 0&=a\cdot(0+0)=a\cdot 0+a\cdot 0 && \text{distributivity}\\
> a\cdot 0&=0 && \text{add }-(a\cdot 0)\text{ to both sides.}
> \end{aligned}
> $$

With $a \cdot 0 = 0$ established, we can now characterize exactly when a product vanishes — a fact used constantly in algebra and, shortly, in the irrationality proof below.

> [!thm] Zero-Product Property
> If $a\cdot b=0$, then $a=0$ or $b=0$.

> [!pf] Proof
> If $a=0$ we are done. If $a\neq 0$, multiply $a\cdot b=0$ on the left by $a^{-1}$:
> $$
> \begin{aligned}
> a^{-1}\cdot(a\cdot b)&=a^{-1}\cdot 0\\
> (a^{-1}\cdot a)\cdot b&=0\\
> 1\cdot b&=0\\
> b&=0.
> \end{aligned}
> $$

### Rational Numbers and Irrationality

> [!def] Rational Numbers
> $$\mathbb{Q}=\left\{\frac{m}{n}\ \middle|\ m,n\in\mathbb{Z},\ n\neq 0\right\}.$$

Section 1.3 showed $\mathbb{Q}$ is countable — that is, "small" in a set-theoretic sense. The next theorem shows $\mathbb{Q}$ is also *incomplete* in an algebraic sense: it fails to contain solutions to equations as simple as $r^2 = 2$.

> [!thm] $\sqrt{2}$ is Irrational
> There is no $r\in\mathbb{Q}$ such that $r^2=2$.

> [!pf] Proof (by contradiction)
> Suppose $r=m/n$ in lowest terms with $m,n\in\mathbb{Z}$, $n\neq 0$, and $r^2=2$. Then
> $$
> \frac{m^2}{n^2}=2\ \Rightarrow\ m^2=2n^2.
> $$
> Thus $m^2$ is even, so $m$ is even: write $m=2k$. Substituting,
> $$
> 2n^2=m^2=(2k)^2=4k^2\ \Rightarrow\ n^2=2k^2,
> $$
> so $n$ is also even. Then $m$ and $n$ share the common factor $2$, contradicting that $m/n$ was in lowest terms. Therefore $\sqrt{2}\notin\mathbb{Q}$.

> [!note] Existence of irrationals, in context
> This theorem is the reason $\mathbb{R}$ cannot simply equal $\mathbb{Q}$: the reals must contain "gaps" like $\sqrt{2}$ that $\mathbb{Q}$ misses. Combined with the countability of $\mathbb{Q}$ established earlier, this sets up a natural question for later — just how much "bigger" is $\mathbb{R}$ than $\mathbb{Q}$? — though answering it requires tools (like the order axioms below and eventually completeness) beyond what we've built so far.

---

## Ordering Properties of $\mathbb{R}$

The field axioms alone say nothing about the order "$<$" on $\mathbb{R}$ — a field like $\mathbb{C}$ satisfies the same axioms but has no natural ordering. Order on $\mathbb{R}$ is therefore introduced as a *separate* structure, built from a distinguished subset of "positive" elements.

> [!def] Positive Set
> Let $P\subseteq\mathbb{R}$, $P\neq\varnothing$, be the set of positive real numbers. It satisfies:
> 1. If $a,b\in P$, then $a+b\in P$. *(closure under addition)*
> 2. If $a,b\in P$, then $a\cdot b\in P$. *(closure under multiplication)*
> 3. **Trichotomy**: For any $a\in\mathbb{R}$, exactly one of $a\in P$, $a=0$, or $-a\in P$ holds.

From this single set $P$, all the familiar order notation and its properties can be defined.

> [!def] Notation and Ordering
> - If $a\in P$, write $a>0$; if $-a\in P$, write $a<0$.
> - If $a\in P\cup\{0\}$, write $a\ge 0$; if $-a\in P\cup\{0\}$, write $a\le 0$.
> - Define $a>b$ iff $a-b\in P$; define $a\ge b$ iff $a-b\in P\cup\{0\}$.
> - For any $a,b\in\mathbb{R}$, exactly one of $a>b$, $a=b$, or $a<b$ holds (trichotomy).

> [!imp] Order is derived, not assumed piecewise
> Every order relation here ultimately reduces to a statement about membership in $P$: $a > b$ *means* $a - b \in P$, nothing more. This means any order fact you need to prove (e.g. transitivity of $>$, or that $a>b \Rightarrow a+c>b+c$) should be provable directly from the three properties of $P$ together with the field axioms from Section 2 — the two structures are designed to interact seamlessly.

