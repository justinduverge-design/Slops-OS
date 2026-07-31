# Cross-Layer Knowledge Graph (graphify) — consult before multi-layer tasks

**When to use:** only when a task bridges layers (L0 doctrine ↔ L1 Slops Saloon ↔ L2 Omen), traces a dependency across the stack, or asks "what governs this?" Single-layer tasks skip this — the graph is leverage for cross-cutting work, not overhead on every pull.

## Where it lives

### Read this one

```
References/graphify/graphify-out/graph.json     ← CANONICAL
```

This is the published output contract defined by `Blueprints/skills/slops-graphify/SKILL.md`. The graph lives under `References/` because it is extracted structure over the corpus — not doctrine, not a spec — so it never reads as authoritative source for any layer.

Companions in the same folder: `GRAPH_REPORT.md` (human-readable — God Nodes, Surprising Connections, Suggested Questions), `manifest.json`, `graph.json.bak` (prior canonical, preserved on each publish).

Also worth reading: `References/graphify/REFRESH_REPORT_*.md` — dated rebuild history.

### Stray copies — ignore, safe to delete

graphify hardcodes its output to `graphify-out/` **in the current working directory**, so an unrouted run leaves a copy wherever it was invoked. Expect strays at the repo root, in `slops-saloon/`, in `slops-saloon/omen/`, and inside `.claude-worktrees/` / `.codex-worktrees/`.

**None of them are canonical.** Only the `References/graphify/` copy is published through the wrapper. If a stray is newer than canonical, that means someone ran graphify directly instead of through `slops_root_scan.py` — re-run properly rather than trusting the stray.

### Rebuild — SLOPS-root mode

From the repo root:

```powershell
python "Blueprints/skills/slops-graphify/slops_root_scan.py" --force
```

**Why this and not vanilla `graphify update`:** SLOPS spans three nested git repos (L0 `dev/SLOPS/`, L1 `slops-saloon/`, L2 `slops-saloon/omen/`), and L0's `.gitignore` deliberately excludes `slops-saloon/omen/`. graphify honours that and stops at the boundary — producing a graph with **zero L0↔L2 edges**, which defeats the entire purpose. The runner treats the three repos as one logical tree *for extraction only*; no git operations touch the nested repos, and no `.gitignore` on disk is modified.

**Acceptance signal — check before trusting a fresh graph:** all three layer pairs must show non-zero edges (L0↔L1 > 0, L0↔L2 > 0, L1↔L2 > 0). The 2026-06-21 baseline had **27 L0↔L2 edges**; treat that as the soft floor. Zero cross-layer edges means the nested-repo boundary wasn't crossed — re-run with `--include-nested-repos`.

### If you ever "can't find" the graph

`graphify-out/` is in `.gitignore` (line 14). **A git-tracked search returns nothing even though the files are right there.** That exact mistake produced a false "graph does not exist / not currently buildable" claim which sat in `CLAUDE.md` and this file from 2026-07-11 to 2026-07-18. Search the filesystem, not the git index.

## Query pattern

1. **God nodes** (highest degree) — start here for context. Currently: Omen, then SLOPS OS, Skill system, Slops Saloon.
2. **Cross-layer edges** (L0↔L1, L1↔L2, L0↔L2) — trace constraints across layers.
3. **Shortest path** between two concepts — surface hidden relationships.

**Example:** before implementing a Omen (L2) feature, ask "what L0 doctrine governs this?" and follow the edge before pulling the task.
