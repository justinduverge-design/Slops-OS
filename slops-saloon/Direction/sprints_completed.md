# Slops Saloon — Sprints Completed (L1)

Closure record for the L1 content/marketing queue. Created 2026-07-29 during the
planning-pipeline cutover; the L1 queue previously had nowhere to place closed work.

This is a **record**. Rows are append-only and are never rewritten to match newer doctrine.
Active work lives in `Direction/current_sprint.md`; task states are defined in
`../Blueprints/agent-modules/status-model.md`.

| Task key | Title | Closure | Closure date | Evidence | Successor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| CP1 | Author the four missing content specs | COMPLETED | 2026-07-14 | `Blueprints/specs/omen-character-spec.md`, `Blueprints/specs/short-video-format-spec.md`, `Blueprints/specs/social-satire-boundaries.md`, `Blueprints/specs/content-tool-stack.md` — all four verified present 2026-07-29 | — |
| CP2 | Author the two missing workflow docs | COMPLETED | 2026-07-14 | `Blueprints/workflows/short-video-workflow.md`, `Blueprints/workflows/content-production-pipeline.md` — both verified present 2026-07-29 | — |
| CP3 | Scaffold the `Solutions/content/` working tree | COMPLETED | 2026-07-14 | All eight folders present under `Solutions/content/` (`ideas/`, `scripts/`, `storyboards/`, `voice/`, `art/`, `video-drafts/`, `published/`, `performance-reports/`), each with a step-linked README — verified 2026-07-29 | — |

## Notes

- CP1's `content-tool-stack.md` was corrected against ground truth during authoring — Remotion
  + voicebox/`slops-voiceover` + `slops-content-ship`, not the original Krita/Kdenlive wishlist,
  which is retained as an unused-optional reference.
- CP3 records that the existing `omen-coming-soon/` Remotion project deliberately stays at
  `omen/Brand/promos/omen-coming-soon/` rather than moving under `Solutions/content/` — moving
  it would break relative paths for no benefit. New video projects get sibling folders under
  `omen/Brand/promos/`.
