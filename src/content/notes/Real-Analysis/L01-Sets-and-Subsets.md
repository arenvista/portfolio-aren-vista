---
id: L01
aliases: []
tags: []
---
# Finite and Infinite Sets

## Basic Definitions

We begin by making precise what it means for a set to have a certain number of elements, and then extend this idea to the infinite case.

> [!def] Empty Set
> The **empty set**, denoted $\emptyset$, is the unique set containing zero elements.

> [!def] $n$-Element Set (Cardinality $n$)
> A set $S$ has **$n$ elements** (equivalently, $|S| = n$) if there exists a bijection
> $$f:\{1,2,\dots,n\}\to S.$$

The empty set and the notion of an $n$-element set together let us define finiteness in general.

> [!def] Finite and Infinite Sets
> - A set $S$ is **finite** if it is empty, or if there exists $n\in\mathbb{N}$ and a bijection $f:\{1,2,\dots,n\}\to S$.
> - A set is **infinite** if it is not finite.

> [!imp] Terminology note on "countable"
> Be careful not to conflate this with the term *countable*. In many texts, "countable" means "finite or countably infinite," and "countably infinite" means "in bijection with $\mathbb{N}$." By contrast, the definition of an $n$-element set above uses a bijection with the finite set $\{1,2,\dots,n\}$, **not** with $\mathbb{N}$ itself. Keeping these bijections straight — finite sets biject with initial segments $\{1,\dots,n\}$, countably infinite sets biject with all of $\mathbb{N}$ — will matter once we compare sizes of infinite sets.

## Subsets of Finite Sets; Supersets of Infinite Sets

With finiteness defined via bijections, a natural question is how it behaves under taking subsets. Intuitively, a piece of a finite collection should still be finite, and anything containing an infinite collection should itself be infinite. The following theorem confirms this intuition and, notably, shows the second bullet follows immediately from the first by contraposition.

> [!thm] Set Sizing
> Suppose $T\subseteq S$.
> - If $S$ is finite, then $T$ is finite.
> - If $T$ is infinite, then $S$ is infinite.

> [!pf] Proof
> **First bullet**, by induction on $n = |S|$.
>
> *Base case* ($n=0$): If $S=\emptyset$, then $T\subseteq S$ forces $T=\emptyset$, which is finite by definition.
>
> *Inductive step*: Assume the claim holds for every set of size $k$, and let $|S| = k+1$. Fix a bijection $f:\{1,2,\dots,k+1\}\to S$, and set $s = f(k+1)$. Removing this element, let $S' = S \setminus \{s\}$, so that $|S'| = k$ and the inductive hypothesis applies to $S'$.
>
> Now take any $T \subseteq S$. There are two cases, depending on whether $T$ contains the distinguished element $s$.
>
> - *Case 1: $s \notin T$.* Then $T \subseteq S'$ directly, so $T$ is finite by the inductive hypothesis.
> - *Case 2: $s \in T$.* Then $T \setminus \{s\} \subseteq S'$, so by the inductive hypothesis $T\setminus\{s\}$ is finite — say $g:\{1,2,\dots,m\}\to T\setminus\{s\}$ is a bijection. Extend $g$ by appending $s$ at the end: define $g_a:\{1,2,\dots,m+1\}\to T$ by
> $$
> g_a(i) =
> \begin{cases}
> g(i), & 1 \le i \le m, \\
> s, & i = m+1.
> \end{cases}
> $$
> Since $g$ is a bijection onto $T\setminus\{s\}$ and $s\notin T\setminus\{s\}$, $g_a$ is a bijection onto $T$, so $T$ is finite.
>
> In either case $T$ is finite, completing the inductive step and hence the proof of the first bullet.
>
> **Second bullet**, by contrapositive of the first: if $S$ were finite, the first bullet would force every subset $T \subseteq S$ — in particular our given $T$ — to be finite, contradicting the assumption that $T$ is infinite. Hence $S$ must be infinite. $\blacksquare$

> [!note] Why the two bullets are "the same fact"
> The second bullet isn't an independent result — it's the contrapositive of the first, restated in terms of infinite sets. This is a pattern worth internalizing: statements about infinite sets are frequently proved by assuming finiteness and deriving a contradiction with a finite-set result you already have.
