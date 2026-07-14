# Cross-Layer Knowledge Graph (graphify) — consult before multi-layer tasks

**When to use:** only when a task bridges layers (L0 doctrine ↔ L1 Slops Saloon ↔ L2 Omen), traces a dependency across the stack, or asks "what governs this?" Single-layer tasks skip this — the graph is leverage for cross-cutting work, not overhead on every pull.

## Where it lives

- **Status: not currently buildable.** Neither `References/graphify/graphify-out/graph.json` nor repo-root `graphify-out/graph.json` exists in this repo (confirmed absent via repo-wide search, 2026-07-11). `References/graphify/` itself does not exist — don't attempt to read it as if it does.
- **Rebuild:** the `slops-graphify` skill (see `Blueprints/skills/SKILL_ROUTING.md`); requires `graphifyy` installed (`pip install graphifyy`). Once rebuilt, the curated cross-layer graph lands at `References/graphify/graphify-out/graph.json` (L0↔L1↔L2) with a full extraction at repo-root `graphify-out/graph.json`, and freshness/rebuild status at `References/graphify/REFRESH_REPORT_*.md`.
- **Until rebuilt:** treat cross-layer questions as requiring manual doc lookup — start at root doctrine (`AGENTS.md`/`CLAUDE.md`), follow explicit routing/citation links by hand instead of querying a graph that doesn't exist yet.

## Query pattern

1. **God nodes** (highest degree) — start here for context. Currently: Omen, then SLOPS OS, Skill system, Slops Saloon.
2. **Cross-layer edges** (L0↔L1, L1↔L2, L0↔L2) — trace constraints across layers.
3. **Shortest path** between two concepts — surface hidden relationships.

**Example:** before implementing a Omen (L2) feature, ask "what L0 doctrine governs this?" and follow the edge before pulling the task.
