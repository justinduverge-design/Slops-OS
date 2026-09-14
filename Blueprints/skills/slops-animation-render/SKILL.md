---
name: slops-animation-render
description: Remotion-based animation render pipeline (React-composed video, self-hosted on KVM1) for brand, marketing, social, and onboarding cuts that are NOT math explainers. Use when Justin asks to render an onboarding intro, social cut, OG-card animation, or brand video. Do not use for math-explainer content (use slops-explainer-cut) or cloud-only render farms.
status: active
skill_type: package
layer: 0
default_agent: Claude (plan), Codex (render)
trigger: "render the explainer | produce the animated cut | brand video | onboarding animation"
upstream: calesthio/OpenMontage (concepts, nothing vendored), remotion@4.0.487 (runtime)
license_note: >
  Remotion is NOT open source. Custom dual licence: free for individuals and for-profit
  organizations with UP TO 3 EMPLOYEES; a paid Company License is required above that. We are
  eligible today under facts-of-record #15 (sole owner, one person). THE ELIGIBILITY IS
  HEADCOUNT-CONDITIONAL: #15 is void "the moment anyone else works on this company", and Remotion's
  licence has the same trigger at four employees. Re-deriving #15 MUST re-derive this licence.
  Remotion 5.0 changes the licence terms — re-read before any major bump. Vetted 2026-09-14,
  see notes/prior-use-review.md
requires:
  - name: remotion
    node-module: remotion
    from: slops-saloon/omen/Brand/promos/omen-coming-soon
    install: npm --prefix slops-saloon/omen/Brand/promos/omen-coming-soon install
    note: Installed 2026-09-14 (remotion 4.0.487). This is the only Remotion project in the tree and is the de-facto project root; the skill text names KVM1 as the render host but never named a root, so this path is inferred and still wants founder confirmation.
version: 0.1.0
owner: Justin
---

# Slops Animation Render

## Purpose

Render non-math animated content — onboarding intros, social cuts, OG-card animations — as React compositions via Remotion, fully self-hosted on KVM1. Output is brand-locked and reviewable before it ships.

## When to Use

- Onboarding or feature-intro animation for Omen.
- Social/marketing cuts (vertical + horizontal).
- Animated OG cards / share assets.

Do NOT use for: math explainers (`slops-explainer-cut`), or any HyperFrames / cloud-only render
farm — **including Remotion Lambda**, which is Remotion's own hosted render product and is a
separate, paid, cloud path. Renders stay on our hardware.

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

Type: **Alegreya Sans** (display, titles, UI labels, buttons) + **Alegreya** (body). Source: `slops-saloon/omen/Brand/brand-system.md`.

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
