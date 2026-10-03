---
name: slops-graphify
description: Answer "what touches X", "how do A and B connect", or "where does this live" from a generated code graph instead of reading files. Use before a refactor, a cross-cutting change, or when orienting in an unfamiliar area of Omen. Builds and queries the graph with the graphify CLI; code only; no API cost.
---

# Slops Graphify Skill

## Purpose

Cheapest context we have: a graph of functions, classes, imports and files, queryable in one command. It
replaces reading ten files to learn which ones matter. It maps **code structure only**; it does not know
about decisions, specs or product rules (use the map's routing table for those).

## Preconditions

- `graphify` on PATH (`~/.local/bin`). If missing: `uv tool install graphifyy` (double y; the official
  package, Graphify-Labs/graphify). Ask before installing on a machine that is not the founder's.
- Omen's graph is **generated and not in git** (`graphify-out/` is gitignored). Scope lives in
  `.graphifyignore` at the Omen repo root (code only; docs, brand media, archives and build output are out).

## Steps

1. **Refresh** from the repo root: `graphify update .` (about a minute for Omen, AST only, no API cost).
   Skip if `graphify-out/GRAPH_REPORT.md` shows the commit you are on (`git rev-parse HEAD`).
2. **Ask**, narrowest first:
   - `graphify explain "<symbol or file>"` — what a node is and its neighbours.
   - `graphify path "<A>" "<B>"` — shortest connection between two nodes.
   - `graphify query "<question>"` — broader traversal; output can be large, so name specific symbols.
3. **Verify in the source.** The graph tells you where to look; read the file before relying on it. An
   `INFERRED` edge is a guess, an `EXTRACTED` edge is in the code.
4. Cite what you used in the PR or handoff: the command and what it surfaced.

## Limits

- Code only. `.sql` needs `graphifyy[sql]` (not installed), so the redo's SQL is not in the graph.
- A stale graph answers confidently and wrongly. Refresh after pulling or switching branches.
- Do not commit `graphify-out/`. Do not run `graphify hook install` without the founder (it writes to the
  shared `.git/hooks`).
