---
title: The pigeonhole proof hiding in every list of numbers
excerpt: Any n natural numbers contain a consecutive block whose sum is divisible by n — and the proof is prefix sums plus pigeonhole.
date: 2026-02-27
tags: [math, combinatorics, pigeonhole]
---

This one made the rounds after Dunkin' put a math challenge on during the 2025 Super Bowl, but the underlying theorem is a combinatorics staple:

> Given any $n$ natural numbers $a_1, a_2, \dots, a_n$, there exist indices $0 \le j < k \le n$ such that
> $$n \mid \sum_{i=j+1}^{k} a_i.$$

In words: some *consecutive* block of the list sums to a multiple of $n$. Not just some subset — a contiguous run.

**Prefix sums.** Define

$$s_1 = a_1, \quad s_2 = a_1 + a_2, \quad \dots, \quad s_n = a_1 + \cdots + a_n.$$

That's exactly $n$ prefix sums.

**Case 1.** If some $s_k$ is divisible by $n$, we're done — take the block $a_1, \dots, a_k$.

**Case 2.** Suppose none of them is. Then each $s_i$ leaves a remainder in $\{1, 2, \dots, n-1\}$ when divided by $n$ — that's $n$ sums squeezed into only $n - 1$ possible remainders. By the pigeonhole principle, two prefix sums $s_j$ and $s_k$ (with $j < k$) share a remainder:

$$s_k \equiv s_j \pmod{n} \implies s_k - s_j \equiv 0 \pmod{n}.$$

But $s_k - s_j$ is precisely the consecutive sum $a_{j+1} + a_{j+2} + \cdots + a_k$. So

$$n \mid (a_{j+1} + \cdots + a_k). \qquad \blacksquare$$

A concrete check: take $n = 6$ and $A = \{11, 32, 19, 21, 3, 50\}$. The prefix sums are $11, 43, 62, 83, 86, 136$, with remainders mod 6 of $5, 1, 2, 5, 2, 4$. Both repeats work: $s_4 - s_1 = 32 + 19 + 21 = 72 = 6 \times 12$, and $s_5 - s_3 = 21 + 3 = 24 = 6 \times 4$.

What I find satisfying is that the proof is nonconstructive in spirit but constructive in practice: computing $n$ remainders and looking for a collision *is* the algorithm, and it runs in linear time. The pigeonhole principle usually gets billed as an existence tool, but here the pigeonholes are literally a hash table.
