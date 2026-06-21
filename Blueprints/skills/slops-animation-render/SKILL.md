---
name: slops-animation-render
description: Remotion-based animation render pipeline (React-composed video, self-hosted on KVM1) for brand, marketing, social, and onboarding cuts that are NOT math explainers. Use when Justin asks to render an onboarding intro, social cut, OG-card animation, or brand video. Do not use for math-explainer content (use slops-explainer-cut) or cloud-only render farms.
skill_type: package
layer: 0
default_agent: Claude (plan), Codex (render)
trigger: "render the explainer | produce the animated cut | brand video | onboarding animation"
upstream: calesthio/OpenMontage (concepts), remotion (runtime)
version: 0.1.0
owner: Justin
---

# Slops Animation Render

## Purpose

Render non-math animated content — onboarding intros, social cuts, OG-card animations — as React compositions via Remotion, fully self-hosted on KVM1. Output is brand-locked and reviewable before it ships.

## When to Use

- Onboarding or feature-intro animation for Corvus.
- Social/marketing cuts (vertical + horizontal).
- Animated OG cards / share assets.

Do NOT use for: math explainers (`slops-explainer-cut`), or any HyperFrames / cloud-only render farm.

## Inputs

Required:

- One storyboard (beats → seconds). See `assets/storyboard-template.md`.
- Copy/CTA text (run `slops-ux-copy` if it needs writing).

Locked (no longer blockers — captured below): brand palette, typography, sonic direction.

## Brand Palette (locked)

| Hex | Name | Role |
|---|---|---|
| `#0A0A0B` | Raven black | Primary background |
| `#1C1C1E` | Charcoal | Card / panel surfaces |
| `#F5F0E8` | Bone white | Primary text, light surfaces |
| `#B8952A` | Antique gold | Accent, CTA, premium moments |
| `#8B1A1A` | Deep crimson | Risk indicators, warnings |
| `#5B2D8E` | Electric violet | AI signal, Omen accent moments |

Type: **Alegreya Sans** (display, titles, UI labels, buttons) + **Alegreya** (body). Source: `slops-saloon/corvus/Brand/brand-system.md`.

## Sonic Direction (spec, not an asset)

No bundled audio file — this defines what a sound bed must be; source royalty-free (e.g. Uppbeat, Epidemic Sound under license) or commission, then drop into `assets/`.

- **Mood:** composed, premium, a little ominous — "the quiet before a smart move." Never hype-y or EDM-drop.
- **Tempo:** 85-105 BPM; restrained.
- **Instrumentation:** sparse low piano or felt keys + soft sub-bass + one tasteful percussive tick for beat hits. A single low corvid-call-adjacent texture is on-brand if subtle.
- **Stinger:** one gold "confirm" tone reserved for the CTA/edge-reveal beat only.
- **Loudness:** target -14 LUFS integrated for social; leave headroom for captions/VO.
- **Licensing:** capture the license + source URL in `assets/sound-credits.md` before any publish.

## Pipeline

1. **Storyboard** — beats → seconds (from `assets/storyboard-template.md`).
2. **CompositionSpec** — Remotion `<Composition>` list: dimensions, fps, durationInFrames per cut (vertical 1080×1920, horizontal 1920×1080).
3. **Build** — Codex writes React compositions using the locked palette/type tokens.
4. **StaticReview** — Claude checks brand compliance + accessibility (contrast, caption legibility).
5. **Render** — Codex renders on KVM1 (Remotion renderer).
6. **Review** — Justin reviews; never ship unreviewed.
7. **Publisher** — hand off the MP4 + credits file (no auto-posting).

## Does NOT

- Render math explainers (`slops-explainer-cut`).
- Use HyperFrames or cloud-only render farms.
- Publish audio without a recorded license in `assets/sound-credits.md`.
- Ship without Justin's review.

## Output Contract

- MP4(s) at the specified dimensions on KVM1.
- `assets/sound-credits.md` (track, license, source).
- Note of any copy still needing `slops-ux-copy`.

## Verification

- Palette + type tokens match the locked brand system.
- Captions legible; color never the sole signal (WCAG AA).
- Audio license recorded.
- Dimensions/fps match target platforms.

## Changelog

- 0.1.0 — fleshed out from parked stub (2026-06-20): locked palette + type from brand-system.md, added sonic-direction spec and storyboard template. Ready for promotion.
- 0.0.1 — parked stub (2026-06-11).
