---
name: slops-explainer-cut
description: Manim-based explainer videos for the math behind Slops opinion features (Omen, Trade Analyzer, MVP Move, ADP). On-brand "show your work" video format. Harvested from HarleyCoops/Math-To-Manim agent chain.
status: parked-needs-raw-material
skill_type: package
layer: 0
default_agent: Claude (plan), Codex (render)
trigger: "explain the math | Manim cut | show your work video | Omen reasoning video"
upstream: HarleyCoops/Math-To-Manim (concepts), manimce (runtime)
version: 0.0.1
owner: Justin
---

# Slops Explainer Cut (PARKED STUB)

## Status: parked-needs-raw-material

**Blocker:** Justin needs to provide one sample Omen output (or Trade Analyzer output, or MVP Move lineup) that he'd want explained on video. Once one exists, the rest is mechanical — the agent chain is well-trodden.

## Intent (when raw material arrives)
Wrap a Manim render pipeline (Intent → Prereq → Curriculum → Math → Storyboard → SceneSpec → ManimCode → StaticReview → Render → VideoReview → Publisher) to produce 30-90s explainers of Slops opinion-layer math. Input: a screenplay from `slops-screenplay-loop` + the math the cut should illustrate. Output: an MP4 + speaker-notes file.

## Does NOT (planned)
- Replace the screenplay step (`slops-screenplay-loop` runs first).
- Generate live-action footage (Remotion-side, `slops-animation-render`).
- Ship without Justin reviewing the cut.

## Next Step
Justin provides: one real Omen output + the one-sentence claim he'd want the cut to land. Then this stub becomes a proposal.

## Changelog
- 0.0.1 — parked stub (2026-06-11). Awaiting raw material.
