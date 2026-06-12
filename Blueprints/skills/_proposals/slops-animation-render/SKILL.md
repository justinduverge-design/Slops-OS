---
name: slops-animation-render
description: Remotion-based animation render pipeline. React-composed video, fully self-hostable on KVM1. For brand/marketing/onboarding cuts that are not math-explainers (use slops-explainer-cut for math).
status: parked-needs-raw-material
skill_type: package
layer: 0
default_agent: Claude (plan), Codex (render)
trigger: "render the explainer | produce the animated cut | brand video | onboarding animation"
upstream: calesthio/OpenMontage (concepts), remotion (runtime)
version: 0.0.1
owner: Justin
---

# Slops Animation Render (PARKED STUB)

## Status: parked-needs-raw-material

**Blocker:** Need brand-locked color palette + sound bed + one storyboard before scaffolding the render pipeline.

## Intent (when raw material arrives)
Wrap a Remotion render pipeline (React compositions) for non-math animated content: onboarding intros, social cuts, OG card animations. All self-hosted on KVM1.

## Does NOT (planned)
- Render math explainers (use `slops-explainer-cut`).
- Use HyperFrames or cloud-only render farms.

## Next Step
Justin provides: brand palette finalization + sound bed source + one storyboard.

## Changelog
- 0.0.1 — parked stub (2026-06-11). Awaiting raw material.
