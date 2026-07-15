# Short Video Format Spec v1

**Date:** 2026-07-14
**Status:** v1 — promoted from `content-strategy.md`'s Format direction + Production ladder sections.
**Owner:** Justin (format approval) / Claude + Codex (build against this spec)
**Scope:** Slops Saloon L1 — governs runtime, shot count, cost, and done-when for any Omen short-form
video, regardless of which recurring world or character content it uses.
**Inherits from:** `Direction/content-strategy.md`, `omen-character-spec.md`.
**Consumed by:** `content-production-pipeline.md` (CP2, pending), `slops-content-ship` (QC against the
finished output), `content-usage-ledger.md` (evidence log).

---

## 1. Runtime tiers

| Tier | Runtime | When to use |
|---|---|---|
| Early / default | 30–90 seconds | Every video until the format is proven repeatable and the app has real users |
| Standard | Under 3 minutes | Once early tier is proven; still one joke/conflict/situation, just more room |
| Not yet in scope | 3+ minutes, multi-character arcs | Explicitly future — do not build until Justin approves moving past the "learning what's funny" phase |

Rule of thumb: one video = one joke, one conflict, or one fantasy situation. If a script needs two, split
it into two videos.

## 2. Production ladder (cost/complexity tiers)

Each tier is a legitimate deliverable on its own — not every video needs to climb to the top.

| Tier | What it is | Cost | Best for |
|---|---|---|---|
| 1. Written bits | Scripts, fake quotes, monologues, league chat jokes — text only | Lowest | Practice, testing jokes before spending art/VO time |
| 2. Static visual posts | Quote cards, Omen recap cards, trade-verdict cards, fake league-announcement graphics | Low | Fast, repeatable, no video-editing overhead |
| 3. Voiceover shorts | Static art + captions + narration + basic SFX, 30–60s | Medium | **The best first real video format** — proven working (all-users reel) |
| 4. Limited animation | Blinks, head turns, mouth movement, one character reaction, reused backgrounds | Medium-high | Once tier 3 is proven and repeatable |
| 5. Full animated shorts | Multiple characters, recurring world, 2–3 minutes | Highest | Future goal — do not attempt as a first workflow |

Do not skip tiers to reach tier 4/5 before tier 3 is proven repeatable at low cost. Per
`content-strategy.md`'s working recommendation: do not try to become an animation studio before the app
has users.

## 3. Early formats (tier 1–3 shapes)

- Static art + voiceover
- Simple motion graphics
- Captioned fake league conversations
- Omen monologues
- Limited animation (once tier 3 is proven)
- One-scene sketches
- Trade courtroom scenes
- Waiver wire panic scenes
- Group chat drama scenes

## 4. Explicit done-when per tier

A video is not "done" until it clears its tier's bar below **and** passes the relevant
`slops-content-ship` dimensions (script, storyboard, footage, voiceover, captions, goal-communication)
logged in `content-usage-ledger.md`.

- **Tier 1 (written bits):** script reviewed against `social-satire-boundaries.md`; no production needed.
- **Tier 2 (static cards):** boundaries check + brand-fit check (`marketing:brand-review` or equivalent).
- **Tier 3 (voiceover shorts):** boundaries + full 6-dimension `slops-content-ship` pass, including a
  **human watch** for goal-communication — self-administered stills/frame checks are not sufficient on
  their own (see `slops-content-ship`'s `notes/prior-use-review.md` 2026-07-14 entry: a self-checked PASS
  on goal-communication missed 7 real issues a human watch caught).
- **Tier 4/5:** all of tier 3's bar, plus an explicit animation-quality review (not yet specified — write
  when tier 4 work is actually queued).

## 5. Cost ceiling

Per `content-strategy.md` cadence: one script per week, one simple video experiment per month, without
slowing app dev. A video that requires more than a handful of focused sessions to reach done-when at its
tier is over budget for this phase — cut scope or drop a tier, don't silently let it run long.

## 6. Cold-start check

Before starting a new video: which tier is this? What is the one joke/conflict/situation? Which
recurring world (if any, per `omen-character-spec.md` §5)? If any answer is unclear, write it down before
opening an editor.

## Change log

- 2026-07-14: Promoted from `content-strategy.md`'s Format direction + Production ladder sections; added
  explicit runtime tiers, per-tier done-when, and cost ceiling.
