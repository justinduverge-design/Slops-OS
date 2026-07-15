# Content Production Pipeline v1

**Date:** 2026-07-14
**Status:** v1 — the operating-cadence layer above `short-video-workflow.md`. Built per `current_sprint.md`
CP2, the second of the two missing workflow docs named in `content-strategy.md`'s Folder layout.
**Owner:** Justin (cadence, prioritization, publish approval) / Claude + Codex (execute against the
backlog).
**Scope:** How the content role runs over time — cadence, backlog, batching, and how a piece of content
becomes a sprint item — as distinct from `short-video-workflow.md`'s per-video procedure.

---

## 1. What this doc answers that the per-video workflow doesn't

`short-video-workflow.md` answers "how do I take one video from idea to published." This doc answers "how
does the content role stay a repeatable operation instead of a series of one-off asks" — the exact gap
Justin flagged: "a way to plan the whole role out, not just piecemeal video/audio creation."

## 2. Cadence

Per `content-strategy.md`'s Working recommendation (unchanged, still the standing target):

- **One script per week** (tier 1, written-bits — cheap, keeps the idea pipeline full).
- **One simple video experiment per month** (tier 3, voiceover shorts — the proven format).
- Do not let content cadence slow app dev. If a week's app-dev backlog is heavy, the script still gets
  written (it's cheap); the monthly video can slip a cycle without breaking the cadence.

## 3. How work enters the backlog

Content work lives in `slops-saloon/Direction/current_sprint.md` (this file's sibling), same lane/P-item
convention as the Omen product sprint. Three ways an item gets there:

1. **Planned via `planning-pass`** — Justin names a goal ("plan the next batch of scripts"), an agent
   decomposes it into ordered items. This is how the Foundation lane (CP1–CP3) itself was created.
2. **Surfaced during production** — a `short-video-workflow.md` step 12 correction, a `slops-content-ship`
   finding, or a ledger gap (like the missing QC rows on `omen-trade-flow-reel-vertical.mp4`, tracked as
   CP5) becomes a new backlog item rather than a silent fix.
3. **Justin pins directly** — same override convention as the Omen sprint's `agent_inbox.md`, though
   content doesn't have its own inbox file yet; until one exists, Justin naming a specific ask in-session
   is the pin.

## 4. Batching guidance

- **Scripts (tier 1):** batch-write several at once when in a writing session — cheap, low-risk, doesn't
  need Justin in the loop until the boundaries check (per `short-video-workflow.md` step 4).
- **Videos (tier 3+):** one at a time, end-to-end through the full workflow, before starting the next —
  per-video QC (step 8) and Justin's publish approval (step 10) are real gates, not batchable checkpoints.
- **Spec/doctrine work** (like CP1–CP3 themselves): batch when related (all four CP1 specs were written
  in one pass since they're small and interdependent); don't batch unrelated doctrine changes together.

## 5. Where evidence lives (don't duplicate)

- **Per-asset QC evidence:** `omen/Blueprints/playbooks/content-usage-ledger.md`.
- **Backlog / what's next:** `Direction/current_sprint.md` (this pipeline doc doesn't restate it).
- **Decisions:** `Direction/decision_log.md`.
- **Doctrine/specs:** `Blueprints/specs/*` (character, format, boundaries, tool stack).
- **Raw working files:** `Solutions/content/*` once CP3 scaffolds it (ideas/scripts/storyboards/voice/
  art/video-drafts/published/performance-reports).

## 6. Review cadence for this pipeline itself

Revisit this doc and `short-video-workflow.md` whenever a `slops-content-ship` prior-use-review entry or
a step-12 correction (from the per-video workflow) implies the *process* is wrong, not just the asset.
Two such corrections already exist and should inform any future revision here:
- Goal-communication cannot be self-verified from stills alone — needs a human watch (2026-07-14).
- Estimated audio/scene timing caused a real render defect — always rebuild timing from measured
  durations (2026-07-14).

## Change log

- 2026-07-14: Created as the second of two missing workflow docs (CP2), pairing with
  `short-video-workflow.md`. Established cadence, backlog-entry paths, batching guidance, and the
  evidence-location map so this doc doesn't duplicate the ledger or sprint file.
