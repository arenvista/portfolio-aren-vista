# Order, Absolute Value, and Completeness of ℝ

## Ordering Properties of ℝ

Section 3 of the previous lecture introduced the positive set $P$ as the foundation for order on $\mathbb{R}$. We now build out its consequences systematically, moving from the basic order axiom[[L02]]s to their arithmetic interactions, and finally to the special behavior of squares, positivity, and products.

> [!def] Positive Set and Induced Order
> Let $P \subseteq \mathbb{R}$, $P \neq \varnothing$, be the set of positive real numbers. Assume:
> 1. If $a, b \in P$, then $a + b \in P$.
> 2. If $a, b \in P$, then $a \cdot b \in P$.
> 3. **Trichotomy**: For every $a \in \mathbb{R}$, exactly one of $a \in P$, $a = 0$, or $-a \in P$ holds.
>
> **Notation:**
> - $a \in P$ means $a > 0$ (a is positive).
> - $-a \in P$ means $a < 0$ (a is negative).
> - $a \in P \cup \{0\}$ means $a \ge 0$ (a is nonnegative).
> - $-a \in P \cup \{0\}$ means $a \le 0$ (a is nonpositive).
>
> **Induced order:**
> - $a > b$ if and only if $a - b \in P$.
> - $a \ge b$ if and only if $a - b \in P \cup \{0\}$.
> - For any $a, b \in \mathbb{R}$, exactly one of $a > b$, $a = b$, $a < b$ holds.

### Basic Order Properties

Since every order statement reduces to membership in $P$, the two closure properties of $P$ translate directly into the two most fundamental facts about $>$: it is transitive, and it is preserved under translation.

> [!thm] Transitivity
> If $a, b, c \in \mathbb{R}$ with $a > b$ and $b > c$, then $a > c$.

> [!pf] Proof
> Since $a - b \in P$ and $b - c \in P$, Property 1 gives $(a-b) + (b-c) = a - c \in P$, hence $a > c$.

> [!thm] Addition Preserves Order
> If $a > b$, then for every $c \in \mathbb{R}$, $a + c > b + c$.

> [!pf] Proof
> $a > b \iff a - b \in P$. Then $(a+c) - (b+c) = a - b \in P$, so $a + c > b + c$.

Multiplication is more delicate than addition, since multiplying by a negative number reverses an inequality. This asymmetry traces directly back to Property 2 of $P$: multiplying two positives stays positive, but multiplying a positive difference by a negative number lands outside $P$.

> [!thm] Multiplication and Order
> Let $a, b, c \in \mathbb{R}$.
> - If $a > b$ and $c > 0$, then $ac > bc$.
> - If $a > b$ and $c < 0$, then $ac < bc$.

> [!pf] Proof
> If $a > b$, then $a - b \in P$. If $c > 0$, then $c \in P$, and by Property 2, $(a-b)c \in P$, i.e. $ac - bc \in P$, so $ac > bc$.
>
> If $c < 0$, then $-c \in P$. Since $(a-b)(-c) \in P$, we have $bc - ac \in P$, i.e. $ac < bc$.

### Squares and Positivity

A first payoff of these order properties is that we can now say something that field axioms alone cannot: squares are never negative. This is a genuinely *order-theoretic* fact — nothing in the field axioms from Lecture 2 forces it.

> [!thm] Squares Are Nonnegative
> If $a \in \mathbb{R}$, then $a^2 \ge 0$, and if $a \neq 0$ then $a^2 > 0$.

> [!pf] Proof
> By trichotomy, either $a \in P$, $a = 0$, or $-a \in P$.
> - If $a = 0$, then $a^2 = 0$.
> - If $a \in P$, then $a \cdot a \in P$ by Property 2, so $a^2 > 0$.
> - If $-a \in P$, then $(-a)\cdot(-a) \in P$ by Property 2, and $(-a)(-a) = a^2$, so $a^2 > 0$.

Since $1 = 1^2$ and $1 \neq 0$, this theorem immediately pins down the sign of $1$ — a fact we might otherwise have taken for granted.

> [!thm] 1 Is Positive
> $1 > 0$.

> [!pf] Proof
> In $\mathbb{R}$, $1 \neq 0$. By the Squares theorem, $1^2 > 0$, hence $1 > 0$.

> [!cor] Natural Numbers Are Positive
> Every $n \in \mathbb{N}$ is positive.

> [!pf] Proof
> *Base case:* $1 > 0$. *Inductive step:* if $k > 0$, then $k, 1 \in P$, so $k + 1 \in P$ by Property 1. By induction, every $n \in \mathbb{N}$ is positive.

### Signs of a Product

Having settled when a single element is positive, we turn to products of two elements — generalizing the sign rule everyone learns informally ("negative times negative is positive") into a proven theorem.

> [!thm] Sign of a Product
> For $a, b \in \mathbb{R}$:
> - $ab > 0$ if and only if either ($a > 0$ and $b > 0$) or ($a < 0$ and $b < 0$).
> - $ab < 0$ if and only if either ($a > 0$ and $b < 0$) or ($a < 0$ and $b > 0$).

> [!pf] Proof
> If $a > 0$ and $b > 0$, then $ab \in P$ by Property 2, so $ab > 0$. If $a < 0$ and $b < 0$, then $(-a), (-b) \in P$, so $(-a)(-b) \in P$; since $(-a)(-b) = ab$, we get $ab > 0$.
>
> Conversely, if $ab > 0$ and $a > 0$, then $b$ must be $> 0$ — otherwise $b \le 0$ would force $ab \le 0$, a contradiction. If $ab > 0$ and $a < 0$, then $b < 0$ by the same reasoning.
>
> The second statement follows the same way: if $a > 0, b < 0$ (or vice versa), then $ab < 0$; conversely, if $ab < 0$, the factors must have opposite signs by trichotomy.

> [!note] Sign table
> | $a$ | $b$ | $ab$ |
> |---|---|----|
> | + | + |  + |
> | + | − |  − |
> | − | + |  − |
> | − | − |  + |

---

## Absolute Values

With order fully in place, we can define a single quantity — the absolute value — that measures magnitude independent of sign. Everything that follows is really about relating $|\cdot|$ back to the order properties just established.

> [!def] Absolute Value
> For $a \in \mathbb{R}$, define
> $$
> |a| =
> \begin{cases}
> a, & a > 0, \\
> 0, & a = 0, \\
> -a, & a < 0.
> \end{cases}
> $$

### Multiplicative Properties

> [!thm] Product Rule
> For all $a, b \in \mathbb{R}$, $|ab| = |a|\cdot|b|$.

> [!pf] Proof
> Consider cases by the signs of $a$ and $b$:
> - If $a, b \ge 0$: $|ab| = ab = |a||b|$.
> - If $a \ge 0, b \le 0$: $|ab| = -ab = a(-b) = |a||b|$.
> - If $a \le 0, b \ge 0$: similarly $|ab| = (-a)b = |a||b|$.
> - If $a, b \le 0$: $|ab| = ab = (-a)(-b) = |a||b|$.

Since $a^2$ is a special case of a product ($a \cdot a$), the Product Rule immediately tells us how $|\cdot|$ interacts with squaring.

> [!thm] Square Rule
> For all $a \in \mathbb{R}$, $|a|^2 = a^2$.

> [!pf] Proof
> By the Product Rule, $|a|^2 = |a||a| = |a^2|$. Since $a^2 \ge 0$ (by the Squares theorem above), $|a^2| = a^2$.

### Order Properties and the Triangle Inequality

The next result is the key bridge between absolute value and order: it converts a single statement "$|a| \le c$" into a two-sided inequality, which is exactly the form needed to *add* inequalities together — the technique the triangle inequality relies on below.

> [!thm] Order Bound Characterization
> If $c \ge 0$, then $|a| \le c$ if and only if $-c \le a \le c$.

> [!pf] Proof
> ($\Rightarrow$) If $|a| \le c$, then $-|a| \le a \le |a|$ implies $-c \le a \le c$.
>
> ($\Leftarrow$) If $-c \le a \le c$, then checking cases on the sign of $a$ directly gives $|a| \le c$.

> [!thm] Basic Bound
> For all $a \in \mathbb{R}$, $-|a| \le a \le |a|$.

> [!pf] Proof
> This is the previous theorem with $c = |a|$.

We now have exactly the tool needed to prove the single most important inequality in analysis: the triangle inequality. The strategy is to apply the Basic Bound to $a$ and to $b$ separately, then add the two two-sided inequalities.

> [!thm] Triangle Inequality
> For all $a, b \in \mathbb{R}$, $|a + b| \le |a| + |b|$.

> [!pf] Proof
> From $-|a| \le a \le |a|$ and $-|b| \le b \le |b|$, add componentwise:
> $$
> -(|a|+|b|) \le a+b \le |a|+|b|.
> $$
> By the Order Bound Characterization, this gives $|a+b| \le |a|+|b|$.

> [!thm] Two Useful Consequences
> For all $a, b \in \mathbb{R}$:
> 1. $|a-b| \le |a| + |b|$.
> 2. $\big||a| - |b|\big| \le |a - b|$.

> [!pf] Proof
> **(1)** Apply the triangle inequality to $a + (-b)$:
> $$
> |a-b| = |a + (-b)| \le |a| + |{-b}| = |a| + |b|.
> $$
> **(2)** Apply the triangle inequality to $(a-b) + b$:
> $$
> |a| = |(a-b)+b| \le |a-b| + |b| \implies |a| - |b| \le |a-b|.
> $$
> Swapping $a$ and $b$ gives $|b| - |a| \le |a-b|$. Combining the two,
> $$
> \big||a|-|b|\big| \le |a-b|.
> $$

> [!imp] The pattern behind both consequences
> Both parts reduce to a single application of the triangle inequality to a cleverly rewritten sum ($a + (-b)$, or $(a-b)+b$). This is a recurring proof technique: many "variant" inequalities are not new results at all, but the triangle inequality applied to a disguised sum.

---

## Completeness of ℝ

Everything so far — field axioms, order, absolute value — is also satisfied by $\mathbb{Q}$. Yet we proved earlier that $\sqrt{2} \notin \mathbb{Q}$, so $\mathbb{Q}$ has "gaps" that $\mathbb{R}$ does not. The property that finally distinguishes $\mathbb{R}$ from $\mathbb{Q}$ is **completeness**, which we develop now.

> [!def] Upper and Lower Bounds; Bounded Sets
> Let $S \subseteq \mathbb{R}$ be nonempty.
> - $S$ is **bounded above** if there exists $u \in \mathbb{R}$ such that $s \le u$ for all $s \in S$. Any such $u$ is an **upper bound** of $S$.
> - $S$ is **bounded below** if there exists $w \in \mathbb{R}$ such that $s \ge w$ for all $s \in S$. Any such $w$ is a **lower bound** of $S$.
> - $S$ is **bounded** if it has both an upper and a lower bound; otherwise it is **unbounded**.

An upper bound need not be unique — if $u$ works, so does $u+1$. This motivates asking for the *best possible* bound.

> [!def] Supremum and Infimum
> Let $S \subseteq \mathbb{R}$ be nonempty.
> - $u$ is the **supremum** (least upper bound) of $S$, written $u = \sup S$, if:
>   1. $u$ is an upper bound of $S$, and
>   2. for every upper bound $v$ of $S$, $u \le v$.
> - $w$ is the **infimum** (greatest lower bound) of $S$, written $w = \inf S$, if:
>   1. $w$ is a lower bound of $S$, and
>   2. for every lower bound $t$ of $S$, $t \le w$.

The definition of supremum only tells us what it means to *be* a least upper bound — it says nothing about whether one always exists. That existence is not provable from the field and order axioms alone; it must be taken as an additional axiom, and it is precisely this axiom that $\mathbb{Q}$ fails to satisfy (e.g. $S = \{r \in \mathbb{Q} : r^2 < 2\}$ has no rational supremum).

> [!thm] Least Upper Bound Property (Completeness)
> Every nonempty subset $S \subseteq \mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$.
>
> Dually, every nonempty subset $S \subseteq \mathbb{R}$ that is bounded below has an infimum in $\mathbb{R}$.

In practice, verifying that a specific $u$ equals $\sup S$ directly from the definition can be awkward, since condition 2 quantifies over *all* upper bounds. The following characterization replaces that quantifier with a more workable $\varepsilon$-statement.

> [!lem] Characterization of the Supremum
> Let $S \subseteq \mathbb{R}$ be nonempty and $u \in \mathbb{R}$. Then $u = \sup S$ if and only if:
> 1. For all $s \in S$, $s \le u$.
> 2. For every $\varepsilon > 0$, there exists $s_\varepsilon \in S$ such that $u - \varepsilon < s_\varepsilon$.

> [!note] Reading condition 2
> Condition 2 says exactly that no number smaller than $u$ can be an upper bound of $S$: for any proposed "smaller candidate" $u - \varepsilon$, some element of $S$ slips past it. This is the practical, checkable substitute for "$u \le v$ for every upper bound $v$" in the original definition, and it is usually how $\sup S = u$ is verified in practice.
