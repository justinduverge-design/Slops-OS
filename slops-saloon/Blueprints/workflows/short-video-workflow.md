# Short Video Workflow v1

**Date:** 2026-07-14
**Status:** v1 — operationalizes `content-strategy.md`'s 12-step Workflow list into a checklist with an
explicit done-when per step. Built per `current_sprint.md` CP2.
**Owner:** Claude + Codex (execute) / Justin (approves publish, resolves escalations)
**Scope:** Per-video procedure — the steps to take one Omen short from idea to published/archived.
**Reads first:** `omen-character-spec.md`, `short-video-format-spec.md`, `social-satire-boundaries.md`,
`content-tool-stack.md` (all four now exist per CP1 — this workflow is the thing that finally makes them
load-bearing instead of reference-only).
**Pairs with:** `content-production-pipeline.md` (the higher-level cadence/batching doc this workflow
plugs into).

---

## Cold-start test

A fresh agent should be able to read this file plus the four specs above and take one video from idea to
published without asking Justin what "done" means at any step. If a step below is vague, that's a bug in
this file — fix it, don't route around it.

## The 12 steps

### 1. Capture idea
- **Input:** any fantasy-football pain point, joke, or situation (yours, Justin's, or drawn from the
  OK-to-joke-about list in `social-satire-boundaries.md` §3).
- **Output:** one line in `Solutions/content/ideas/` (once CP3 scaffolds that folder — until then, note
  it in this workflow's own tracking or ask where to park it).
- **Done-when:** the idea is written down somewhere findable, not just in conversation.

### 2. Decide format
- Pick a runtime tier and production-ladder tier from `short-video-format-spec.md` §1–2. Pick which
  recurring world (if any) from `omen-character-spec.md` §5.
- **Done-when:** tier + world (or "no world, standalone bit") is named explicitly before writing starts.

### 3. Write short script
- Draft against `omen-character-spec.md` (voice, cast, delivery) and the chosen world's role split.
- **Done-when:** a full script/beat-sheet exists, with each beat's VO line as plain text if the format
  uses voice (matches the shape `slops-voiceover` expects as input).

### 4. Check content boundaries
- Run the script through every question in `social-satire-boundaries.md` §2 (all 9, not a vibe check).
- **Done-when:** each of the 9 questions has an explicit pass, and any borderline call is flagged to
  Justin per §4 of that spec rather than decided solo.

### 5. Create / reuse simple assets
- Screenshots, static art, backgrounds — per `content-tool-stack.md` (Remotion project structure,
  `public/captures/` for UI captures).
- **Done-when:** every asset the script needs exists at a known path, reused from a prior video where
  possible rather than re-authored.

### 6. Record / generate voice
- If the format uses VO: run `slops-voiceover` per its own SKILL.md — do not hand-wave this step, it has
  its own detection/precondition/process-recipe requirements (voicebox reachable, voice profile chosen).
- **Done-when:** audio file(s) exist at `<promo-project>/public/audio/vo/*.{wav,mp3}` with reported
  per-segment durations, per `slops-voiceover`'s Output Contract.

### 7. Edit video
- Build/update the Remotion composition (`src/index.jsx` or equivalent) — wire audio via
  `<Sequence>`+`<Audio>` per segment, timing rebuilt from real measured durations, not estimates (per the
  2026-07-14 content-usage-ledger entry on why estimated timing caused a prior defect).
- **Done-when:** a render exists at `<promo-project>/renders/*.mp4`.

### 8. Export draft + run QC
- Run the full `slops-content-ship` six-dimension pass (script, storyboard, footage, voiceover,
  captions, goal-communication) against the rendered draft.
- **Critical:** per `slops-content-ship`'s own `notes/prior-use-review.md` (2026-07-14), a self-
  administered goal-communication check via stills is a *proxy* only (readability, beat order, caption-
  to-audio timing) — it is not a substitute for Justin actually watching the cut. Do not mark
  goal-communication PASS from self-check alone.
- **Done-when:** every dimension has a logged row in `content-usage-ledger.md` (PASS/FAIL/SKIPPED with
  reason — never silently omitted), and goal-communication specifically has a human-watch verdict, not
  just a self-check.

### 9. Review for brand fit
- Separate from content-ship's dimensions: does this represent the brand the way `content-strategy.md`'s
  Content goals intend (funny, clean, connected to the product without feeling like an ad)?
- **Done-when:** one explicit note answering that question, logged alongside the ledger entry.

### 10. Publish or archive
- Justin approves publish — this step is never agent-autonomous (content production is agent work, but
  publishing is Justin's call per `content-strategy.md` Posture line).
- **Done-when:** either published (with the channel/date logged) or explicitly archived with a reason —
  never left in limbo with no status.

### 11. Track what worked
- After publishing, note engagement/reaction once available. File location: `Solutions/content/
  performance-reports/` (once CP3 scaffolds it).
- **Done-when:** a dated note exists, even if brief ("no data yet, too early" counts as a valid entry —
  don't skip the step because there's nothing to report yet).

### 12. Save lessons for next piece
- Any correction (a boundary near-miss, a QC gap, a format that didn't work) gets written back into the
  relevant spec or this workflow — same discipline as `slops-content-ship`'s prior-use-review loop.
- **Done-when:** either a spec/workflow file is updated, or an explicit note says "no correction needed
  this time."

## Escalation points (stop and ask Justin, don't guess)

- Step 4: any borderline boundaries call.
- Step 6: `slops-voiceover` reports voicebox unreachable, no voice profile, or any cloud-TTS fallback
  question (see `current_sprint.md` D2).
- Step 8: goal-communication can only be self-checked as a proxy — the real verdict needs Justin's watch.
- Step 10: publish is always Justin's explicit go, never assumed.

## Change log

- 2026-07-14: Created from `content-strategy.md`'s 12-step Workflow list, expanded with explicit
  done-when per step and QC/ledger wired into step 8 per CP2.
