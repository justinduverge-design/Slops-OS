---
name: slops-explainer-cut
description: Produce 30-90s Manim explainer videos for the math behind Slops opinion features (Omen, Trade Analyzer, MVP Move, ADP). Dual purpose — sharpen/QA Omen's own math AND produce social "show your work" content (e.g. the weekly Omen of the Week). On-brand format that visualizes how the Slops opinion layer departs from the nflverse baseline. Use when Justin asks to explain a projection's math on video, make a Manim cut, build an Omen-of-the-Week clip, or turn an Omen/Trade verdict into a "show your work" explainer. Do not use for the hand-drawn animated series (future OpenToonz pipeline) or for writing the narrative beats (use slops-screenplay-loop first).
skill_type: package
layer: 0
default_agent: Claude (plan), Codex (render)
trigger: "explain the math | Manim cut | show your work video | Omen reasoning video"
upstream: HarleyCoops/Math-To-Manim (concepts, nothing vendored), ManimCommunity/manim (runtime, MIT, requires-python >=3.11). Vetted 2026-09-14 — see notes/prior-use-review.md
status: active
requires:
  - name: manim
    bin: manim
    min_version: 0.19.0
    install: uv tool install --python 3.12 manim
    note: Installed 2026-09-14 on pinned Python 3.12 (manim 0.21.0). System deps via brew — ffmpeg 9.0.1, plus cairo/pango/pkgconf that pycairo builds against. LaTeX IS installed (TinyTeX) and a real MathTex scene renders. Renders run locally, not on KVM1.
  - name: ffmpeg
    bin: ffmpeg
    install: brew install ffmpeg
  - name: pkg-config (pycairo build dep)
    bin: pkg-config
    install: brew install pkgconf cairo pango
    note: manim depends on pycairo, which BUILDS FROM SOURCE and needs cairo, pango and pkgconf present first. pip cannot supply them, so a pip-only install line for manim fails with an opaque build error. Declared here so the checker names the cause before the build does.
  - name: latex (Tex/MathTex scenes)
    bin: latex
    install: "sh <(curl -fsSL https://tinytex.yihui.org/install-bin-unix.sh) --no-path  # then: tlmgr option sys_bin ~/.local/bin && tlmgr install standalone preview doublestroke ms setspace rsfs relsize ragged2e fundus-calligra microtype wasysym physics dvisvgm jknapltx wasy cm-super babel-english gnu-freefont mathastext everysel && tlmgr path add"
    note: TinyTeX (rstudio/tinytex, user-scoped, ~64MB) rather than BasicTeX/MacTeX — the cask installers need root, TinyTeX does not. Installed and proved 2026-09-14 by rendering a real MathTex scene. Without LaTeX, manim renders Text scenes fine and fails every Tex/MathTex scene, which is most of a math-explainer's content.
  - name: dvisvgm
    bin: dvisvgm
    install: comes with TinyTeX; manim uses it to convert LaTeX output to SVG
version: 0.1.0
owner: Justin
---

# Slops Explainer Cut

## Purpose

Turn one Slops opinion-layer output (an Omen verdict, Trade Analyzer result, MVP Move lineup, or ADP delta) into a short Manim explainer that *shows the work*: the nflverse baseline, the opinion adjustment, and the "edge in what you almost missed." The brand promise — `The edge is in what you almost missed.` — is delivered by making the math legible, not by hiding it. (Corrected 2026-09-14: this read `Less guessing. Better moves.`, retired with the Corvus name per `brand-system.md` §2. The replacement is the line this skill's own recurring format, "The Almost-Missed", is already named after.)

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
7. **Render** — render locally on the workstation. See § Render host.
8. **VideoReview** — Justin reviews; never ship unreviewed.
9. **Publisher** — hand the MP4 + speaker-notes file to the destination (no auto-posting).

## Render host — corrected 2026-09-14

**Renders run on the workstation, not on KVM1.** This skill previously said *"Codex renders MP4 on
KVM1"*, and `slops-animation-render` said the same.

`AGENT.md` § Infrastructure Boundary: **KVM1 is the live app hosting lane** — `/opt/omen/deploy/hostinger`,
containers `omen_api` and `omen_cron`, serving `https://slopssaloon.com/api/health`. It is the
production API host, not a render farm. Manim and Remotion renders saturate CPU for minutes at a
time; putting them on the box serving live traffic risks the production service to save a file copy.

Nobody caught it because it was prose that had never been executed — the tools were never installed,
so the instruction was never tested against what KVM1 actually is.

Local rendering is proved: a `MathTex` scene renders here with TinyTeX (2026-09-14). If a render
ever genuinely needs more machine than the workstation, that is a **new host decision** for the
founder, and KVM1 is not the candidate.

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

- One MP4 (30-90s), rendered locally.
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
