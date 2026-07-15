# Slops Saloon Content — Current Sprint

Last updated: 2026-07-14 (D1 resolved same-day — art style, cast, and tone decided; voice partially
resolved with a new follow-up D2 for the actual preset choice. Originally created via `planning-pass` —
first ordered backlog for the Omen content/marketing role. Prior to this file, content work was tracked
only ad hoc across `content-usage-ledger.md`, `Direction/decision_log.md`, and Justin's live feedback —
no queue existed that a fresh agent could pull from cold. Triggered by Justin's session-close ask: "a way
to plan the whole role out, not just piecemeal video/audio creation.")

## How this feeds the loop

Same convention as `omen/Direction/current_sprint.md`: `Next` is the queue, grouped by lane, checkbox
items, priority-ordered within each lane. Agents pull the top unchecked item. Blocked items sit below
their blocker. When an item finishes, move it to a `sprints_completed.md` (create if needed) with
evidence, and log the decision in `Direction/decision_log.md`.

Content QC evidence (script/storyboard/footage/VO/captions/goal-communication per asset) stays in
`omen/Blueprints/playbooks/content-usage-ledger.md` — don't duplicate it here.

## Current State

- `Direction/content-strategy.md` (v1, valid-as-of 2026-06-15) is the only content doctrine that exists.
  Its own "Folder layout (canonical)" section names five specs, two workflow docs, three prompt files,
  and a `Solutions/content/` working tree — **none of these exist yet.** The strategy is aspirational
  scaffolding, not an operating pipeline.
- One real asset has moved through production: `omen/Brand/promos/omen-coming-soon/renders/
  omen-all-users-reel-vertical.mp4`. It has a full ledger history (script/storyboard/footage/captions/VO
  all reached PASS across three iterations) but **goal-communication failed on first human watch
  2026-07-14** with 7 concrete notes, plus an 8th (VO/music mix balance) flagged in this session's
  close-out. None of the 8 are fixed yet.
- A second render exists — `omen/Brand/promos/omen-coming-soon/renders/omen-trade-flow-reel-vertical.mp4`
  — with **zero rows in `content-usage-ledger.md`**. Unclear if it was QC'd at all.
- `content-strategy.md` still carries 7 unresolved open questions (art style, Omen-only vs. human
  managers, tone register, voice approach, minimum-viable-post bar, publishing cadence, which recurring
  world to build first) that block writing the downstream specs precisely.

## Next

### Decisions (Justin — needed before Foundation specs can be written precisely)
- [x] **D1 — Resolve `content-strategy.md`'s open questions (2026-07-14, partial).** Art style: vary by
  format. Cast: Omen + human managers. Tone: sitcom + sports-media. Voice: AI stays, but the "Onyx"
  preset is being swapped for a more feminine one — exact preset/service not yet chosen, and whether
  "online" means a cloud TTS service needs Justin's explicit approval per `slops-voiceover`'s no-cloud-
  fallback doctrine before that path is used. Logged in `decision_log.md` and `content-strategy.md`.
  Still open: minimum-viable-post bar, which recurring setting goes first. New follow-up: **D2 — pick a
  Kokoro voice preset (or approve a cloud TTS alternative).** Blocked on a session with voicebox running
  locally to browse `GET /profiles/presets/kokoro`'s 50 options and audition a feminine-leaning one, or
  an explicit go-ahead to evaluate a cloud service instead. Cost: small. Done-when: a preset/service is
  chosen and logged, and a fresh profile exists via `POST /profiles` per `slops-voiceover`'s Process
  Recipe step 1.

### Foundation (write once, unblocks everything downstream)
- [x] **CP1 — Authored the four missing content specs (2026-07-14).** All four now exist at
  `Blueprints/specs/`: `omen-character-spec.md` (character blend + weighting, cast now includes human
  managers per D1, recurring-worlds table, cold-start check), `short-video-format-spec.md` (runtime
  tiers, production-ladder cost/complexity table, per-tier explicit done-when, cost ceiling),
  `social-satire-boundaries.md` (9-item hard-prohibition checklist + OK-to-joke-about list + escalation
  guidance), `content-tool-stack.md` (corrected against ground truth — Remotion + voicebox/
  `slops-voiceover` + `slops-content-ship`, not the original Krita/Kdenlive wishlist, which is kept as an
  unused-optional reference). `content-strategy.md`'s Folder layout section otherwise still names two
  workflow docs and a `Solutions/content/` tree that don't exist yet — see CP2/CP3 below.
- [x] **CP2 — Authored the two missing workflow docs (2026-07-14).** `Blueprints/workflows/
  short-video-workflow.md` (per-video, all 12 steps expanded with explicit done-when, `slops-voiceover`
  wired into step 6, `slops-content-ship`+ledger wired into step 8 with the human-watch caveat on
  goal-communication carried forward, escalation points called out explicitly) and
  `content-production-pipeline.md` (the cadence/backlog layer above it — one script/week, one video/
  month, three ways work enters the backlog, batching guidance, an evidence-location map so it doesn't
  duplicate the ledger or sprint file). This is the piece that actually turns "piecemeal creation" into a
  repeatable loop a fresh agent could run cold.
- [x] **CP3 — Scaffolded the `Solutions/content/` working tree (2026-07-14).** All eight folders exist
  (`ideas/`, `scripts/`, `storyboards/`, `voice/`, `art/`, `video-drafts/`, `published/`,
  `performance-reports/`), each with a README tying it back to the matching `short-video-workflow.md`
  step. `video-drafts/README.md` explicitly documents that the existing `omen-coming-soon/` Remotion
  project stays in place at `omen/Brand/promos/omen-coming-soon/` rather than being moved (would break
  relative paths, no real benefit), and sets the convention that new video projects get sibling folders
  under `omen/Brand/promos/` rather than living under `Solutions/content/` directly.

### Production (per-asset, recurring — pull after Foundation lands or in parallel if urgent)
- [~] **CP4 — Close the 9 open feedback items on `omen-all-users-reel-vertical.mp4` (in progress,
  2026-07-14).** Walked the full list with Justin and got the missing specifics needed to build 6 of 9
  items now: audio-mix diagnosis (music-too-loud + inconsistent-across-segments, not one uniform gain
  problem), multi-team asset status (needs a fresh capture — none exists), and the Draft text-card line
  (confirmed: `"Draft day panic? Omen already read the board."`), plus proposed-but-unlocked Platform/Turn
  lines. Full build handoff written to `Blueprints/prompts/codex-all-users-reel-feedback-polish.md` for
  Codex/Claude Code — this is multi-file Remotion edit work, outside Cowork's implementation lane. Ready
  to build: (1) device-framing opener, (2) Trade Analyzer live-typing animation, (4) stronger weekly-beat
  pan, (5) three text-card rewrites, (6) end-card trim, (7) ambient background motion. Explicitly blocked,
  do not attempt: (3) multi-team trade capture — needs a real account setup first, **now tracked as a
  Sandbox-environment dependency**, see `omen/Blueprints/specs/sandbox-environment-spec-v1.md` and the
  matching Decisions-lane item in `omen/Direction/current_sprint.md` (access-model decision pending;
  Phase A fixture expansion would unblock this item once built); (8) audio mix fix —
  needs a live listening session to identify per-segment levels, not a blind change; (9) voice preset
  swap — blocked on D2. Priority: P1. Next step: hand `codex-all-users-reel-feedback-polish.md` to
  Codex/Claude Code for the 6 unblocked items.
- [ ] **CP5 — QC `omen-trade-flow-reel-vertical.mp4`.** No `content-usage-ledger.md` rows exist for this
  render at all — unknown whether it was ever checked. Cost: medium. Done-when: full six-dimension
  `slops-content-ship` pass logged in the ledger, same as the all-users reel got.

### Verify
- [ ] **V-content1 — Ledger completeness audit.** Confirm every asset under `omen/Brand/promos/*/renders/`
  has at least one full row set in `content-usage-ledger.md`; currently `omen-trade-flow-reel-vertical.mp4`
  has none (see CP5). Cost: small. Done-when: a table of asset → ledger-row-status exists, and any gap
  found becomes a new item here, not silently skipped.

## Guardrails

- Content production is agent work (Claude/Codex produce); Justin directs — per `content-strategy.md`
  Posture line. Don't publish anything without Justin's explicit go.
- Stay inside `content-strategy.md` Boundaries (no political satire, cussing, explicit jokes, harassment,
  real-person attacks, gambling-style promises, fake fantasy certainty, mean-spirited content) until
  `social-satire-boundaries.md` (CP1) formalizes this into a checklist.
- Do not use the provisional marketing pillars (DETECT THE SIGNAL / ANALYZE THE DATA / PREDICT THE
  OUTCOME / WIN WITH CONFIDENCE) in any shipped content — still parked per `omen/Direction/decision_log.md`
  2026-07-12.
- This file is Layer 1 (division/content). Do not put Omen app-code items here — those stay in
  `omen/Direction/current_sprint.md`.
