---
name: slops-lore-review
description: Review-only check of animated-series copy and world-building for narrative coherence, cultural fit, and reference accuracy against the Slops Studio series canon. Collapses three candidate academic agents (narratologist + historian + anthropologist) into one skill. Review only — never rewrites copy (use slops-ux-copy for that).
status: parked-needs-series-concept
skill_type: simple
layer: 0
default_agent: Claude
trigger: "review lore | narrative coherence | cultural fit | check the world-building"
version: 0.1.0
owner: Justin
---

# Slops Lore Review (PARKED — needs series concept)

## Status: parked-needs-series-concept

**Scope correction (2026-06-20):** this skill is for the **Slops Studio animated series**, NOT the Corvus product. An earlier draft wrongly built a "lore canon" from Corvus feature/brand naming (and incorrectly called Omen paid — Omen is free). That doc was deleted.

**Blocker:** there is no series concept/bible yet. Seed material (Game of Zones tone, Ghibli style, OpenToonz tool) is captured in `series-seed.md`. Park until a real concept exists.

## Intent (when the series concept exists)

Replace the three candidate academic agents with one review-only skill that checks series scripts and world-building for: narrative coherence (consistent characters/voice/story rules), cultural/mythological fit, and accuracy of real-world references. Reviews against the future `slops-saloon/Direction/series-canon.md`. Review only — recommends fixes, hands rewrites to `slops-ux-copy`.

## Replaces / Complements (planned)

- Replaces candidate agents `academic-narratologist`, `academic-historian`, `academic-anthropologist` (role-only; imported sources stay reference).
- Complements `slops-ux-copy` (this reviews; that writes) and the future OpenToonz series pipeline.

## Next Step

Justin develops a series concept (premise, characters, setting, episode format) — see `series-seed.md` open items. Then draft `series-canon.md` and finish this skill around it.

## Changelog

- 0.1.0 — re-scoped to the animated series and re-parked (2026-06-20); deleted the incorrect product-based lore canon; saved series-seed.md.
- 0.0.1 — parked stub (2026-06-11).
