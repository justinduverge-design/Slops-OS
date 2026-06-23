---
name: slops-explainer-cut
description: Produce 30-90s Manim explainer videos for the math behind Slops opinion features (Omen, Trade Analyzer, MVP Move, ADP). Dual purpose — sharpen/QA Omen's own math AND produce social "show your work" content (e.g. the weekly Omen of the Week). On-brand format that visualizes how the Slops opinion layer departs from the nflverse baseline. Use when Justin asks to explain a projection's math on video, make a Manim cut, build an Omen-of-the-Week clip, or turn an Omen/Trade verdict into a "show your work" explainer. Do not use for the hand-drawn animated series (future OpenToonz pipeline) or for writing the narrative beats (use slops-screenplay-loop first).
skill_type: package
layer: 0
default_agent: Claude (plan), Codex (render)
trigger: "explain the math | Manim cut | show your work video | Omen reasoning video"
upstream: HarleyCoops/Math-To-Manim (concepts), manimce (runtime)
version: 0.1.0
owner: Justin
---

# Slops Explainer Cut

## Purpose

Turn one Slops opinion-layer output (an Omen verdict, Trade Analyzer result, MVP Move lineup, or ADP delta) into a short Manim explainer that *shows the work*: the nflverse baseline, the opinion adjustment, and the "edge in what you almost missed." The brand promise — `Less guessing. Better moves.` — is delivered by making the math legible, not by hiding it.

## When to Use

- Justin wants a 30-90s video explaining why Omen disagreed with the consensus on a player.
- A Trade Analyzer or MVP Move result needs a visual "here's the math" cut for marketing or onboarding.
- A reusable explainer template is needed for a recurring feature (e.g. weekly Omen top-call).

Do NOT use for: live-action/brand/onboarding animation (`slops-animation-render`), or drafting the script/beats (`slops-screenplay-loop` runs first).

## Recurring Format: Omen of the Week

A standing social cut, not a one-off. Cadence: **Thursdays, 10:00 AM**. Each edition features **three "unlikely boom plays"**, branded **"The Almost-Missed"** (ties to the brand line: "the edge is in what you almost missed").

- One 30-90s cut: three players, each shown as baseline → Omen bump → the almost-missed edge → confidence label.
- Reuses the standard pipeline below; the only fixed parts are the cadence, the count (3), and the segment branding.
- Output feeds social channels (hand-off only — no auto-posting).
- When the Omen data feed is wired, this can be driven by a scheduled task (Thu 10:00); until then it's run on demand.

## Inputs

Required:

- One feature output to explain. See `examples/omen-sample.md` for the expected shape (baseline → opinion → confidence → almost-missed edge).
- The one-sentence claim the cut should land (the takeaway).
- A screenplay/beat sheet from `slops-screenplay-loop` (or Justin's rough beats).

Helpful: the proprietary-math doctrine (`Blueprints/playbooks/proprietary-math-stack-playbook.md`) so the cut never implies nflverse is the opinion.

## Pipeline

Adapted from the Math-To-Manim agent chain, collapsed to SLOPS stages:

1. **Intent** — restate the one-sentence claim; name the single math idea the cut illustrates (one per cut).
2. **Curriculum** — list the 2-4 quantities on screen (baseline, adjustment, confidence, margin). Cut anything that doesn't move the claim.
3. **Storyboard** — map beats to seconds; baseline first, opinion delta second, edge reveal third, takeaway last.
4. **SceneSpec** — for each beat: what's drawn, what animates, what label/confidence chip shows.
5. **ManimCode** — Codex writes `manim` (manimce) scene classes from the SceneSpec.
6. **StaticReview** — Claude checks math correctness + brand compliance before render (cheap gate).
7. **Render** — Codex renders MP4 on KVM1.
8. **VideoReview** — Justin reviews; never ship unreviewed.
9. **Publisher** — hand the MP4 + speaker-notes file to the destination (no auto-posting).

## Brand Lock

- Background Raven black `#0A0A0B`; surfaces Charcoal `#1C1C1E`; text Bone white `#F5F0E8`.
- Math/AI signal uses Omen accent **Electric violet `#5B2D8E`**; CTA/premium moments Antique gold `#B8952A`; risk Deep crimson `#8B1A1A`.
- Confidence always carries a label, never color alone (e.g. "71 — Medium-High Confidence"). WCAG AA contrast.
- Type: Alegreya Sans for titles/labels, Alegreya for any body lines.
- Tone: confident, never smug. The baseline is respected, then improved — never mocked.

## Does NOT

- Replace the screenplay step (`slops-screenplay-loop` first).
- Generate live-action footage (`slops-animation-render`).
- Imply the nflverse baseline is the Slops opinion (see proprietary-math doctrine).
- Ship without Justin's VideoReview sign-off.

## Output Contract

- One MP4 (30-90s) on KVM1.
- A `speaker-notes.md` (claim, on-screen quantities, sources, what was intentionally cut).
- A note of any math assumption that needs Justin's confirmation.

## Verification

- Numbers on screen trace back to the source output in `examples/` (or the real export).
- Baseline vs opinion are visually distinct and correctly attributed.
- Brand palette + confidence-label rule applied.
- Runtime within 30-90s.

## Changelog

- 0.1.0 — fleshed out from parked stub (2026-06-20): added representative Omen sample, full pipeline, brand lock, output contract. Ready for promotion.
- 0.0.1 — parked stub (2026-06-11).
