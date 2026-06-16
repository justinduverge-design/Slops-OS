# Cross-Layer Knowledge Graph (graphify) — consult before multi-layer tasks

**When to use:** only when a task bridges layers (L0 doctrine ↔ L1 Slops Saloon ↔ L2 Corvus), traces a dependency across the stack, or asks "what governs this?" Single-layer tasks skip this — the graph is leverage for cross-cutting work, not overhead on every pull.

## Where it lives

- **Curated cross-layer graph (read this one):** `References/graphify/graphify-out/graph.json` — L0↔L1↔L2
- **Full extraction (all files, large):** `graphify-out/graph.json` at repo root
- **Freshness / rebuild status:** latest `References/graphify/REFRESH_REPORT_*.md`
- **Rebuild:** the `slops-graphify` skill (see `Blueprints/skills/SKILL_ROUTING.md`); requires `graphifyy` installed (`pip install graphifyy`)

## Query pattern

1. **God nodes** (highest degree) — start here for context. Currently: Corvus, then SLOPS OS, Skill system, Slops Saloon.
2. **Cross-layer edges** (L0↔L1, L1↔L2, L0↔L2) — trace constraints across layers.
3. **Shortest path** between two concepts — surface hidden relationships.

**Example:** before implementing a Corvus (L2) feature, ask "what L0 doctrine governs this?" and follow the edge before pulling the task.
