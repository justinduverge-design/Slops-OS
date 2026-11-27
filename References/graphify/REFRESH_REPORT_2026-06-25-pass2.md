# SLOPS Graphify Refresh Report — Pass 2

**Date:** 2026-06-25 (pass 2 of the day)
**Status:** PASS — single-pass cross-layer rebuild via new SLOPS-root mode.

## Why this pass exists

Pass 1 (logged earlier today) used `graphify merge-graphs` because vanilla `graphify update` at the SLOPS root honoured the L0 `.gitignore` and stopped at `slops-saloon/omen/` — the deliberate boundary that keeps L0 git from tracking app source. The merged result had 8,440 nodes but **zero** L0↔L2 edges, which defeats the whole point of a cross-layer graph.

Decision (2026-06-25): keep the three nested repos. Fix the tool, not the layout. This pass adds SLOPS-root mode to the slops-graphify wrapper and rebuilds.

## What changed in the tool

- **New file:** `Blueprints/skills/slops-graphify/slops_root_scan.py` — runner that auto-detects the SLOPS root (signature: contains `slops-saloon/` and `References/graphify/`), monkey-patches `graphify.detect._load_graphifyignore` in-process to drop ignore-pattern lines targeting nested git repos, calls `graphify.watch._rebuild_code`, then runs a deterministic markdown-link enrichment pass.
- **Updated:** `Blueprints/skills/slops-graphify/SKILL.md` documents the new mode, the auto-detect heuristic, the `--include-nested-repos` flag, and the warning "do not use this flag against an unrelated parent repo — it deliberately ignores the standard git boundary." Version bumped to 0.1.3.
- **No disk-state changes** — no `.gitignore` files were modified, no git operations were issued against any nested repo, no upstream graphify package files were edited. The ignore-loader override lives only inside the running Python process.
- **Default behaviour preserved** — outside of SLOPS-root auto-detect or the explicit `--include-nested-repos` flag, vanilla `graphify update` is unchanged.

## Result

| Graph | Nodes | Edges | Communities |
|---|---:|---:|---:|
| Canonical L0↔L1↔L2 (single-pass) | 10,140 | 10,743 | 792 |

Per-layer node breakdown (derived by file-path prefix):

| Layer | Nodes |
|---|---:|
| L0 (`SLOPS/...`) | 5,887 |
| L1 (`slops-saloon/...` excl. omen) | 280 |
| L2 (`slops-saloon/omen/...`) | 3,973 |

### Edges by layer pair

| Pair | Edges | Gate | Verdict |
|---|---:|---|---|
| L0↔L1 | 39 | > 0 | PASS |
| L0↔L2 | 145 | ≥ 27 (2026-06-21 baseline floor) | PASS |
| L1↔L2 | 28 | > 0 | PASS |

All three acceptance gates met.

### Spot-check (omen → L0)

The task asked to verify that an L2 markdown file's L0 references now resolve as L2→L0 edges. The omen-side `CLAUDE.md` was rewritten during the rename to be omen-self-contained — it no longer inlines `../../Blueprints/` references — so it is not a useful witness. Spot-check used `slops-saloon/omen/Blueprints/playbooks/skill-activation-runbook.md`, which still inlines L0 references via `../../`:

- `slops-saloon/omen/Blueprints/playbooks/skill-activation-runbook.md` → `Blueprints/skills/SKILL_ROUTING.md` (L2→L0 `references`, `_origin: slops_root_scan.md_link`).

`grep -ln "../../Blueprints" slops-saloon/omen` finds 6 L2 markdown files inlining L0 paths; the enrichment pass resolved their references to existing L0 file nodes, contributing to the 145-edge L0↔L2 total.

### Rename verification (Corvus → Omen)

40 nodes still carry "corvus" in their label. Sampled and confirmed legitimate: historical handoff filenames in `Blueprints/handoffs/`, pre-rename prompts in `_old-prompts-for-analysis/`, the `omen-operational-rename-cutover.md` spec describing the cutover, and decision-log entries documenting the rename. No stray live code paths.

## Diagnosis trace (kept for the audit trail)

The walker change alone produced only 3 spurious L0↔L2 edges (Python `Path` symbol unification from the new runner script itself — the deterministic AST extractor unifies common type names across files). The deterministic markdown extractor in this graphify version does **not** emit edges for inline `[text](path)` or backtick-quoted markdown references. The 2026-06-21 baseline's 27 L0↔L2 edges came from a now-stale `DBS_INDEX.md` listing pattern that the renamed corpus no longer matches. Without the enrichment pass the gate would have failed even with the walker fix. The enrichment pass is therefore a required part of "the slops way of graphify" — it converts the structural intent that the doctrine docs encode (relative markdown paths) into graph edges the underlying extractor never produces.

## Files Written

- `References/graphify/graphify-out/graph.json` — single-pass canonical graph (clustered, link-enriched)
- `References/graphify/graphify-out/GRAPH_REPORT.md` — graphify's auto-generated report
- `References/graphify/graphify-out/graph.json.bak` — pass-1 (merge-graphs) snapshot
- `References/graphify/graphify-out/graph.json.bak-2026-06-21` — pre-pass-1 snapshot
- This file: `References/graphify/REFRESH_REPORT_2026-06-25-pass2.md`
- `Blueprints/skills/slops-graphify/slops_root_scan.py` — new runner
- `Blueprints/skills/slops-graphify/SKILL.md` — SLOPS-root mode docs, changelog 0.1.3

## Files Intentionally Not Touched

No `.gitignore`, no `.github/workflows/`, no nested-repo source, no deploy config, no upstream `graphify` package files. No git commits, pushes, or merges issued from any layer.
