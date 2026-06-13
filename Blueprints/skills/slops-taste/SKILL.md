---
name: slops-taste
description: Anti-slop frontend skill. Wraps Leonxlnx/taste-skill — tunable layout/motion/density dials, plus minimalist + soft + brutalist variants. Pairs with slops-design-system-pack and slops-image-prompt.
status: active
skill_type: wrapper
layer: 0
default_agent: Claude (selects variant + dials), Codex (applies to frontend)
trigger: "taste check | anti-slop | layout polish | typography pass | premium UI | minimalist UI | soft UI"
upstream: Leonxlnx/taste-skill@latest (install names: design-taste-frontend, high-end-visual-design, minimalist-ui, imagegen-frontend-web)
version: 0.1.0
owner: Justin
---

# Slops Taste (PROPOSAL)

## When to Use
- Generating new frontend UI from scratch (variant: `design-taste-frontend`).
- Polishing an existing screen that looks generic (variant: `redesign-existing-projects`).
- Producing image-only references before a code pass (variant: `imagegen-frontend-web` or `brandkit`).
- When `slops-ui-ux-audit` flags "looks AI-generated" findings.

## Scope
Wrap taste-skill's portable Agent Skills via the upstream installer. The Slops wrapper picks which variant fits the request and locks the three dials (VARIANCE / MOTION / DENSITY) per-product. Default Slops Saloon dials are documented in `slops-saloon/Brand/brand-system.md` (not edited here).

## Preconditions
- Justin runs: `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` (install boundary).
- Optional variants installed the same way: `high-end-visual-design`, `minimalist-ui`, `imagegen-frontend-web`, `brandkit`.

## Required Inputs
- Target product (Corvus default).
- Requested variant (or "auto" — wrapper picks).
- Dial overrides (optional; default: read from brand-system.md).

## Outputs
- Frontend code (via Codex) OR reference images (via image-gen variants).

## Does NOT
- Replace `slops-ui-ux-audit` (audit is separate from generation).
- Replace `slops-ux-copy` for text content.
- Decide brand identity (that's `design-brand-guardian` — still an active candidate agent).
- Override the AAA accessibility framework — taste rules apply ON TOP of accessibility, never beneath.

## Replaces / Complements
- Complements `slops-ui-ux-audit`, `slops-ux-copy`, proposed `slops-design-system-pack`, proposed `slops-image-prompt`.
- Net-new. Reduces "boring AI UI" failure mode.

## Verification
- Smoke test: run `design-taste-frontend` against the Corvus dashboard hero; confirm output respects brand palette and passes `slops-ui-ux-audit` baseline.
- Watch for hard em-dash bans and pre-flight check rules from taste-skill v2.

## Changelog
- 0.1.0 — initial proposal (2026-06-11), approved by Justin.
