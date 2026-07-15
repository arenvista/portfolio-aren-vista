---
title: Local-first is a UX decision, not just an architecture one
excerpt: Why building Ledgerline around a CRDT sync layer changed how the interface behaves, not just how the backend is structured.
date: 2026-04-18
tags: [architecture, product]
---

When I started on Ledgerline, "local-first" was a backend decision: keep a SQLite file as the source of truth, sync it opportunistically. It didn't take long to realize the interface had to change too.

If a save can never fail — because it's just a local write — you stop needing loading spinners on most actions. Undo becomes trivial, because you're replaying operations rather than fighting a server's idea of the current state. The hard part moved from "how do we handle a slow network" to "how do we show the user that sync is still catching up," which is a much friendlier problem to have.
