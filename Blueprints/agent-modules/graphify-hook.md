# Cross-Layer Knowledge Graph (graphify) — consult before multi-layer tasks

**When to use:** only when a task bridges layers (L0 doctrine ↔ L1 Slops Saloon ↔ L2 Omen), traces a dependency across the stack, or asks "what governs this?" Single-layer tasks skip this — the graph is leverage for cross-cutting work, not overhead on every pull.

## Where it lives

- **The graph artifact is generated, not tracked.** `graphify-out/` is gitignored (`.gitignore:14`), so the graph exists on a workstation only after someone builds it. It is **absent from every clean clone by design** — that is expected, not a defect.

- **A git-index search cannot tell you whether it exists.** `git ls-files` and `git grep` return nothing for ignored paths even when the file is sitting on disk. **Check the filesystem, not the index.** This exact mistake produced a false "not currently buildable / does not exist" status in this file that survived from 2026-07-11 to 2026-07-31 and caused at least one wasted audit pass.

- **Current workstation state (verified 2026-07-31):** `References/graphify/graphify-out/graph.json` and repo-root `graphify-out/graph.json` are both present and **byte-identical** — 8,494,477 bytes, SHA-256 `B2CE73AF406E7…`. They are one artifact written to two locations, not two artifacts. Smaller partial extractions also exist at `slops-saloon/Blueprints/graphify-out/` (52,666 bytes) and `slops-saloon/omen/graphify-out/` (2,954,506 bytes); those are separate, narrower scans. `References/graphify/GRAPH_REPORT.md` does **not** exist — do not cite it.

- **A clean clone must generate or restore the artifact before any graphify-dependent work can run.** Install with `pip install graphifyy`, then from the repo root:

  ```
  python "Blueprints/skills/slops-graphify/slops_root_scan.py" --force
  ```

  Vanilla `graphify update` stops at the nested-repo boundary and yields zero L0↔L2 edges, which defeats the purpose. Use the runner.

- **If the artifact is absent and you cannot build it:** treat cross-layer questions as manual doc lookup — start at root doctrine (`AGENTS.md` / `CLAUDE.md`) and follow explicit routing and citation links by hand. Report the graph as *not currently built on this machine*, never as permanently unavailable or non-existent.

## Query pattern

1. **God nodes** (highest degree) — start here for context. Currently: Omen, then SLOPS OS, Skill system, Slops Saloon.
2. **Cross-layer edges** (L0↔L1, L1↔L2, L0↔L2) — trace constraints across layers.
3. **Shortest path** between two concepts — surface hidden relationships.

**Example:** before implementing an Omen (L2) feature, ask "what L0 doctrine governs this?" and follow the edge before pulling the task.
