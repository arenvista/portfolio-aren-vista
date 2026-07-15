---
title: Type systems as documentation nobody has to update
excerpt: A narrow but strong argument for pushing invariants into types wherever the language will let you.
date: 2026-02-09
tags: [typescript, dx]
---

Comments drift. Types don't — the compiler won't let them. That's the whole argument, and it's stronger than it sounds once you notice how much of a codebase's tribal knowledge lives in comments nobody trusts anymore.

The practical version: when a function only makes sense for a non-empty array, type it as a non-empty array instead of writing `// assumes at least one item` above it. When a string is really a closed set of states, use a union instead of documenting the valid values in a wiki page. It's not free — narrow types cost design time — but the cost is paid once, at the boundary, instead of repeatedly by whoever reads the comment next.
