# Content Tool Stack Spec v1

**Date:** 2026-07-14
**Status:** v1 — promoted from `content-strategy.md`'s Tool stack section into an actual setup/reference
doc, corrected against what has actually been used in production (Remotion + voicebox), not just the
original free/local-tool wishlist.
**Owner:** Justin (installs anything gated) / Claude + Codex (use what's already set up; flag gaps)
**Scope:** Slops Saloon L1 — tools for producing Omen content (video, static art, voice, editing).

---

## 1. What's actually in use today (ground truth, not aspirational)

| Tool | Role | Status |
|---|---|---|
| **Remotion** (React-based video framework) | Video composition/rendering — `omen/Brand/promos/omen-coming-soon/` is a Remotion project (`src/index.jsx`, `renders/*.mp4`) | Live, proven — both existing renders were built this way |
| **voicebox** (jamiepine/voicebox, MIT, local Tauri app) | AI voiceover generation, fronted by the `slops-voiceover` skill | Live, proven — native Windows `.msi` install, Kokoro engine (CPU-only), confirmed working 2026-07-13/14. Docker path is known-broken on Windows as of v0.5.0 — don't retry without re-testing |
| **`slops-content-ship` skill** | Six-dimension QC pass (script/storyboard/footage/VO/captions/goal-communication) | Live, proven — caught real defects (crossfade bug, caption pacing, missing VO) across two real runs |

This supersedes `content-strategy.md`'s original Krita/Kdenlive/Audacity-based starter stack — actual
production moved to a code-based pipeline (Remotion) instead, which fits this repo's agent-driven
production model better than manual drawing/editing tools.

## 2. voicebox setup (for anyone picking up VO work)

- Detect before using: `curl -sf http://127.0.0.1:17493/health` — if unreachable, voicebox isn't running.
- Install (already done once, 2026-07-13): native `.msi` from
  `github.com/jamiepine/voicebox/releases/v0.5.0`.
- Voice profiles are manual, one-time, per-voice: `GET /profiles/presets/kokoro` lists 50 curated preset
  voices; `POST /profiles` creates a usable `profile_id` from a chosen preset.
- Current preset in use: "Onyx" — being replaced per `current_sprint.md` D2 (more feminine voice,
  preset/service not yet chosen).
- Full operational detail lives in `slops-voiceover`'s own `SKILL.md` — this section is a pointer, not a
  duplicate.

## 3. Remotion project layout

- Project root: `omen/Brand/promos/omen-coming-soon/` (one Remotion project so far; future videos may
  warrant their own project folder or a shared components layer — not yet decided).
- `src/index.jsx` — composition source.
- `public/audio/vo/` — VO audio files land here (per `slops-voiceover`'s output contract).
- `public/captures/` — screenshot/UI capture assets consumed by compositions.
- `renders/` — exported `.mp4` output.
- `assets/` — supporting docs (storyboard, post-copy, publish-ready notes, sound credits) — this is
  effectively already doing part of the job `Solutions/content/` is meant to do canonically (see CP3);
  reconcile when CP3 is built rather than duplicating.

## 4. Optional / not yet used

Kept from the original wishlist in case a future format needs them — none has been used in a real
production yet, so don't assume setup exists:

- **Art:** Krita, GIMP, Inkscape, Blender (incl. Grease Pencil), OpenToonz, Synfig Studio.
- **Editing:** Kdenlive, Shotcut, OpenShot, Natron.
- **Voice alternative:** human recording (Justin or another human voice) if the AI-voice direction
  changes; Coqui-style TTS as a fallback if Kokoro/voicebox becomes unworkable.

## 5. Versioning / scripts

- Markdown for scripts and notes (unchanged from original stack).
- Git/GitHub for versioning (unchanged) — content lives in the same repo as app code, under
  `slops-saloon/omen/Brand/promos/` and (once CP3 lands) `Solutions/content/`.

## Change log

- 2026-07-14: Rewritten from `content-strategy.md`'s original wishlist stack to reflect what's actually
  been used in production (Remotion, voicebox/slops-voiceover, slops-content-ship), with the original
  optional tools kept as a reference list, not a claim they're set up.
