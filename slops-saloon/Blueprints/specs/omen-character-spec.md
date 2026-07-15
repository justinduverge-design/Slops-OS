# Omen Character Spec v1

**Date:** 2026-07-14
**Status:** v1 — promoted from `content-strategy.md`'s working character description, expanded into a
usable spec per `current_sprint.md` CP1.
**Owner:** Justin (final character read) / Claude + Codex (drafts, scripts, dialogue against this spec)
**Scope:** Slops Saloon L1 — governs Omen the character across all content (video, static cards, copy),
distinct from Omen the product feature (the in-app recommendation engine).
**Inherits from:** `Direction/content-strategy.md` (Omen character section, Boundaries).
**Resolved by:** `Direction/decision_log.md` 2026-07-14 D1 (cast includes human managers; tone leans
sitcom + sports-media, not further mythic).

---

## 1. Who Omen is

> Omen is a strange, observant fantasy-football bird who sees what everyone else almost missed. He is
> mythic, awkwardly sincere, funny without being crude, and honest without being cruel.

Three-part blend, in this weighting (per D1: tone leans sitcom + sports-media over mythic):

| Influence | What it contributes | Weight |
|---|---|---|
| Apollo / oracle figures | Prophetic framing device — Omen "sees" outcomes before they happen; symbolic without being solemn | Light — a framing device, not the dominant register |
| Huginn & Muninn (Odin's ravens) | Watchful, memory-driven — Omen has seen too much league nonsense and remembers every bad trade | Medium — grounds the "seen it all" personality |
| Pete Holmes (*Crashing*) | Sincere, awkwardly funny, clean, optimistic, a little too honest but never mean | Heaviest — this is the primary comedic register |

**Working shorthand:** if the mythic framing (a bird who sees fate) is the premise, the Pete Holmes
sincerity is the voice, and sports-media pacing (quick cuts, confident delivery, recap energy) is the
format.

## 2. Cast

Per D1 (2026-07-14): **Omen + human fantasy managers**, not Omen-only narration.

- **Omen** is the constant — present in every piece, either as narrator, on-screen character, or both.
- **Human fantasy managers** are recurring or one-off characters who bring the conflict: the manager
  defending a bad trade, the manager panic-claiming a waiver, the group chat piling on. They are
  archetypes (The Optimist, The Rage-Quitter, The One With A Plan That Never Works), not real named
  people — see `social-satire-boundaries.md` for the real-person-attack prohibition.
- Managers should feel like *someone's actual leaguemate* — recognizable fantasy-football behavior, not
  generic sitcom filler.

## 3. Voice and delivery

- **Sincere before funny.** Omen never mocks a manager to be cruel — the humor comes from Omen being
  awkwardly, almost painfully honest about what the data/situation actually says.
- **Confident, not frantic.** Sports-media pacing means clean delivery and quick cuts, not manic energy.
- **Never certain about outcomes it can't back up.** Omen's "prophecy" framing is a personality device,
  not a promise — content must stay inside the app's own honesty rules (no fake certainty; see
  `social-satire-boundaries.md`).
- **Spoken voice (current, 2026-07-14):** AI-generated via `slops-voiceover` (Kokoro engine). Preset is
  being changed from "Onyx" to a more feminine option — see `current_sprint.md` D2. This section should
  be updated once D2 lands a specific preset name.

## 4. What Omen is not

- Not a real-person parody or caricature of any actual streamer, analyst, or public figure.
- Not mean-spirited, crude, or political — see `social-satire-boundaries.md` for the full checklist.
- Not a certainty machine — Omen frames things as signals and reads, not guarantees.
- Not the in-app Omen recommendation feature's marketing mascot exclusively — the character can exist in
  content that isn't directly promoting a feature (pure world-building bits, e.g. Waiver Wire Tavern).

## 5. Recurring worlds (character's stage)

From `content-strategy.md` — Omen's character shows up differently depending on which world a piece is
set in:

| World | Omen's role | Manager's role |
|---|---|---|
| The League Court | Judge/witness reviewing a bad trade | Defendant explaining themselves |
| The Waiver Wire Tavern | Bartender/observer amid weekly panic | Patrons panicking over claims |
| The Group Chat Oracle | Silent/caption-based observer | The chat itself collapsing |
| The Omen Chamber | Central, reading signs directly to camera | Not present — Omen-only branding moments |
| The Trade Confessional | Supportive listener, Pete-Holmes-awkward | Confessing a terrible trade |

## 6. Cold-start check

Before writing a script or dialogue line for Omen, confirm: does this line sound like it could come from
a sincere-but-awkward observer who's seen it all, delivered with sports-media confidence — not a mythic
monologue, not a cruel joke, not a real-person impression? If unsure, re-read §1 weighting.

## Change log

- 2026-07-14: Promoted from `content-strategy.md`'s inline character description; added cast section
  (human managers now in scope per D1), weighting table, voice/delivery rules, and cold-start check.
