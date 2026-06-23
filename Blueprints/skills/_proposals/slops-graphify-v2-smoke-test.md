# slops-graphify v2 Upstream Swap Plan (PROPOSAL)

**Status:** approved by Justin 2026-06-11. **Side-by-side smoke test first, then re-pin.**
**Current upstream:** `graphifyy@0.8.36`
**Candidate upstream:** [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) — MIT, 56.4k★, multi-platform.

## Why Swap

Understand-Anything is a fuller engine than graphify:
- Tree-sitter deterministic parsing + LLM semantic layer (vs graphify's single-layer).
- Multi-agent pipeline (5-6 agents) producing the same JSON graph + an interactive dashboard.
- Persona-adaptive UI (junior dev / PM / power user) — useful when Justin onboards a Slops Saloon contractor.
- Incremental updates via fingerprints (only re-analyzes changed files).
- Diff impact analysis (pre-commit ripple-effect map).
- Native Slops-wrapper-compatible shape: `skill_type: wrapper`, `upstream` field, install boundary, output-routing.

## The Smoke Test (BEFORE re-pinning)

Run BOTH tools on the SAME two targets, compare outputs side-by-side.

### Targets
- **Target A:** active Git root (`git rev-parse --show-toplevel`) — L0 doctrine pass.
- **Target B:** `slops-saloon/omen/` — L2 code pass (166 code files per the existing `slops-graphify` smoke test).

### Procedure
1. Justin runs: `/plugin marketplace add Egonex-AI/Understand-Anything && /plugin install understand-anything` (Claude Code), OR `bash install.sh codex` for Codex.
2. Inside SLOPS root: `/understand` (auto-detects scope) — output to `.understand-anything/knowledge-graph.json`.
3. Inside `omen/`: `/understand` — output to `omen/.understand-anything/knowledge-graph.json`.
4. Compare per-target:
   - **Node count parity:** Understand-Anything node count vs graphify node count. Difference should be ≤20%; either tool may legitimately find more.
   - **Edge accuracy:** spot-check 10 cross-file edges in each output. Score: correct / wrong / missing.
   - **Output usefulness:** which one gives Justin more "oh, I didn't know X imported Y" moments? Subjective but the decisive criterion.
   - **Persona-adaptive dashboard:** does the Understand-Anything dashboard actually help Justin re-anchor faster than the graphify HTML? Run a 10-minute re-anchor exercise on each.
   - **Update speed:** edit one file in each target, re-run, measure wall-clock.
5. Verify: no outbound calls to telemetry endpoints from Understand-Anything (audit step — sovereignty rule).

### Pass Criteria for the Swap
- All 3 of: node-count parity, edge accuracy ≥ graphify's, sovereignty audit clean.
- AT LEAST ONE of: meaningfully better re-anchor experience OR meaningfully faster incremental updates.

### Fail / Hold Criteria
- Telemetry leaks to third party.
- Worse edge accuracy (LLM hallucinations in node summaries that don't match the tree-sitter parse).
- Smaller node count without explanation.

## After Pass

1. Update `Blueprints/skills/slops-graphify/SKILL.md`:
   - `upstream: Egonex-AI/Understand-Anything@<commit hash>`
   - bump `version: 0.2.0`
   - changelog entry: "re-pinned upstream; side-by-side smoke test passed YYYY-MM-DD"
2. Output routing stays under `References/graphify/` for back-compat. (Even though the tool's default is `.understand-anything/`, Slops's wrapper rewrites the path.)
3. Add a `notes/prior-use-review.md` capturing the smoke-test findings — what each tool got right and wrong on the real two-target run.

## After Fail / Hold

Keep `graphifyy@0.8.36`. Park Understand-Anything as `reference-only` in `References/_imported/understand-anything/` with the failure note attached. Revisit if upstream addresses the failure mode.

## What This Plan DOES NOT Do

- Does not re-pin without the smoke test.
- Does not edit `slops-graphify` SKILL.md until pass criteria are met.
- Does not delete `graphifyy` install — it's the fallback during the test.

## Changelog
- 2026-06-11 — plan approved by Justin (side-by-side smoke test first, then re-pin).
