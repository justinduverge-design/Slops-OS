# Slops Saloon Content — Current Sprint

Last updated: 2026-07-29 (migrated to the status model during the planning-pipeline cutover;
no item scope changed — only state representation). Originally created via `planning-pass` —
first ordered backlog for the Omen content/marketing role. Prior to this file, content work
was tracked only ad hoc across `content-usage-ledger.md`, `Direction/decision_log.md`, and
Justin's live feedback — no queue existed that a fresh agent could pull from cold.

## How this feeds the loop

This is the **L1 active queue** — one active queue per layer. Task states, `Blocked by:`
types, and the selection rule live in `../Blueprints/agent-modules/status-model.md`; that
module is authoritative and this file only carries items.

Select the top `Status: READY` item whose `Blocked by:` is `None`, ordered by the selection
rule. On completion set `Status: VERIFIED` with an `Evidence:` pointer; on closure set
`Status: CLOSED` with a `Closure:` value and add the row to `Direction/sprints_completed.md`.
Log the decision in `Direction/decision_log.md`.

Content QC evidence (script/storyboard/footage/VO/captions/goal-communication per asset)
stays in `omen/Blueprints/playbooks/content-usage-ledger.md` — don't duplicate it here.

## Current State

- `Direction/content-strategy.md` (v1, valid-as-of 2026-06-15) is the only content doctrine
  that exists. Its own "Folder layout (canonical)" section named five specs, two workflow
  docs, three prompt files, and a `Solutions/content/` working tree — the specs, workflow
  docs, and working tree now exist (CP1–CP3).
- One real asset has moved through production:
  `omen/Brand/promos/omen-coming-soon/renders/omen-all-users-reel-vertical.mp4`. It has a full
  ledger history (script/storyboard/footage/captions/VO all reached PASS across three
  iterations) but **goal-communication failed on first human watch 2026-07-14** with 7
  concrete notes, plus an 8th (VO/music mix balance). Tracked as CP4.
- A second render exists —
  `omen/Brand/promos/omen-coming-soon/renders/omen-trade-flow-reel-vertical.mp4` — with **zero
  rows in `content-usage-ledger.md`**. Unclear if it was QC'd at all. Tracked as CP5.

## Active queue

### Decisions — Justin

#### D1 — Resolve `content-strategy.md`'s remaining open questions

- **Status:** READY
- **Blocked by:** FOUNDER_APPROVAL — the minimum-viable-post bar, and which recurring setting goes first
- **Blocked by:** FOUNDER_APPROVAL — D2 follow-up: pick a Kokoro voice preset, or explicitly approve evaluating a cloud TTS alternative
- **Priority:** P1
- **Cost:** small
- **Resolved 2026-07-14 (partial):** art style varies by format; cast is Omen + human managers;
  tone is sitcom + sports-media; voice stays AI, but the "Onyx" preset is being swapped for a
  more feminine one. Logged in `decision_log.md` and `content-strategy.md`.
- **Still open:** minimum-viable-post bar; which recurring setting goes first; the D2 preset
  choice. D2 needs a session with voicebox running locally to browse
  `GET /profiles/presets/kokoro`'s 50 options and audition a feminine-leaning one — or an
  explicit go-ahead to evaluate a cloud service instead.
- **Done when:** both remaining questions are decided and logged, and a preset/service is
  chosen with a fresh profile created via `POST /profiles` per `slops-voiceover`'s Process
  Recipe step 1.
- **Do not touch:** cloud TTS without explicit approval — `slops-voiceover`'s no-cloud-fallback
  doctrine holds until Justin says otherwise.

### Production — per-asset, recurring

#### CP4 — Close the open feedback items on `omen-all-users-reel-vertical.mp4`

- **Status:** READY
- **Blocked by:** None
- **Priority:** P1
- **Cost:** medium
- **Scope — buildable now (6 of 9):** (1) device-framing opener, (2) Trade Analyzer live-typing
  animation, (4) stronger weekly-beat pan, (5) three text-card rewrites, (6) end-card trim,
  (7) ambient background motion. Full build handoff:
  `Blueprints/prompts/codex-all-users-reel-feedback-polish.md`. This is multi-file Remotion
  edit work. The Draft text-card line is confirmed:
  `"Draft day panic? Omen already read the board."`
- **Explicitly deferred, do not attempt in this pass:** (3) multi-team trade capture — needs a
  real account setup, tracked as a Sandbox-environment dependency; see
  `omen/Blueprints/specs/sandbox-environment-spec-v1.md`. (8) audio mix — needs a live
  listening session to identify per-segment levels, not a blind change. (9) voice preset swap
  — waits on D1's D2 follow-up.
- **Done when:** the 6 unblocked items are built and re-QC'd through `slops-content-ship`, and
  the 3 deferred items remain openly recorded rather than silently dropped.
- **Do not touch:** the deferred trio; publishing without Justin's explicit go.

#### CP5 — QC `omen-trade-flow-reel-vertical.mp4`

- **Status:** READY
- **Blocked by:** None
- **Priority:** P2
- **Cost:** medium
- **Scope:** no `content-usage-ledger.md` rows exist for this render at all — unknown whether
  it was ever checked.
- **Done when:** a full six-dimension `slops-content-ship` pass is logged in the ledger, the
  same as the all-users reel got.
- **Do not touch:** publishing without Justin's explicit go.

### Verify

#### V-content1 — Ledger completeness audit

- **Status:** READY
- **Blocked by:** None
- **Priority:** P2
- **Cost:** small
- **Scope:** confirm every asset under `omen/Brand/promos/*/renders/` has at least one full row
  set in `content-usage-ledger.md`; currently `omen-trade-flow-reel-vertical.mp4` has none
  (see CP5).
- **Done when:** a table of asset → ledger-row-status exists, and any gap found becomes a new
  item here, not silently skipped.
- **Do not touch:** the ledger's existing rows — this audits, it does not backfill.

## Closed this cycle

Full rows with evidence live in `Direction/sprints_completed.md`.

#### CP1 — Author the four missing content specs

- **Status:** CLOSED
- **Closure:** COMPLETED
- **Evidence:** `Blueprints/specs/omen-character-spec.md`, `short-video-format-spec.md`,
  `social-satire-boundaries.md`, `content-tool-stack.md` (all four verified present
  2026-07-29). Closed 2026-07-14.

#### CP2 — Author the two missing workflow docs

- **Status:** CLOSED
- **Closure:** COMPLETED
- **Evidence:** `Blueprints/workflows/short-video-workflow.md` and
  `content-production-pipeline.md` (both verified present 2026-07-29). Closed 2026-07-14.

#### CP3 — Scaffold the `Solutions/content/` working tree

- **Status:** CLOSED
- **Closure:** COMPLETED
- **Evidence:** all eight folders present under `Solutions/content/` (`ideas/`, `scripts/`,
  `storyboards/`, `voice/`, `art/`, `video-drafts/`, `published/`, `performance-reports/`),
  each with a README tying back to the matching `short-video-workflow.md` step (verified
  2026-07-29). Closed 2026-07-14.

## Guardrails

- Content production is agent work (Claude/Codex produce); Justin directs — per
  `content-strategy.md` Posture line. Don't publish anything without Justin's explicit go.
- Stay inside `content-strategy.md` Boundaries (no political satire, cussing, explicit jokes,
  harassment, real-person attacks, gambling-style promises, fake fantasy certainty,
  mean-spirited content), now formalized as a checklist in `social-satire-boundaries.md`.
- Do not use the provisional marketing pillars (DETECT THE SIGNAL / ANALYZE THE DATA / PREDICT
  THE OUTCOME / WIN WITH CONFIDENCE) in any shipped content — still parked per
  `omen/Direction/decision_log.md` 2026-07-12.
- This file is Layer 1 (division/content). Do not put Omen app-code items here — those stay in
  `omen/Direction/current_sprint.md`.
