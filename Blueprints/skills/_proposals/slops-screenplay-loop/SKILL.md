---
name: slops-screenplay-loop
description: Script + beat sheet for animated explainer content. Director → screenwriter → storyboard handoff. Harvested from HKUDS/ViMax agent chain (concepts only, no inference).
status: draft
skill_type: simple
layer: 0
default_agent: Claude
trigger: "draft the script | beat sheet | screenplay for the animated explainer | storyboard handoff"
version: 0.1.0
owner: Justin
---

# Slops Screenplay Loop (PROPOSAL)

## When to Use
Producing animated explainer content for a Slops product feature (e.g. "why the Omen scored this lineup high"). Step 1 of the explainer pipeline; output feeds `slops-explainer-cut` (Manim) or `slops-animation-render` (Remotion).

## Scope
Three-step author pass: (1) Director — pick the angle and the one emotional beat. (2) Screenwriter — 30-90 second script in Slops voice. (3) Storyboard handoff — frame-by-frame description with the math overlay points marked for the Manim/Remotion stage. Output is markdown, not video.

## Required Inputs
- The feature being explained.
- The 1-sentence claim the cut should land.
- Brand voice anchors.

## Outputs
- `Solutions/deliverables/<topic>-screenplay.md` — director note + script + storyboard table.

## Does NOT
- Generate animation (that's `slops-explainer-cut` or `slops-animation-render`).
- Write copy that ships outside the cut (that's `slops-ux-copy`).

## Replaces / Complements
- Net-new. Harvested concept-only from `HKUDS/ViMax`. Pairs with `slops-explainer-cut`.

## Verification
- Signal: script fits a 30-90s narration; storyboard names the math-overlay points.

## Changelog
- 0.1.0 — initial proposal (2026-06-11).
