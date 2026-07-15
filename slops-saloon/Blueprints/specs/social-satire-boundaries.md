# Social/Satire Boundaries Spec v1

**Date:** 2026-07-14
**Status:** v1 — promoted from `content-strategy.md`'s Boundaries list into an explicit pass/fail
checklist, same shape as `content-usage-ledger.md`'s QC dimensions.
**Owner:** Justin (final call on any borderline item) / Claude + Codex (self-check every script/cut
against this list before it's marked ready for the next production step).
**Scope:** Slops Saloon L1 — applies to every piece of Omen content (script, static card, video, social
copy), not just video.
**Inherits from:** `Direction/content-strategy.md` Boundaries + OK-to-joke-about lists.
**Consumed by:** `content-production-pipeline.md` (CP2, pending — step "check content boundaries"),
`slops-content-ship`'s script-writing dimension.

---

## 1. How to use this checklist

Run every script/cut through the table below **before** it moves to the next production step (per
`content-strategy.md`'s Workflow step 4, "check content boundaries"). Any single FAIL below stops the
piece from advancing — it does not get "mostly clean" credit. Log the check (pass/fail + one-line
reason) the same way `content-usage-ledger.md` logs QC dimensions; a new ledger row for "Boundaries
check" is the natural home once `content-production-pipeline.md` wires this in.

## 2. Hard prohibitions (any one FAILs the whole piece)

| # | Prohibition | Check question |
|---|---|---|
| 1 | Political satire | Does this reference real political figures, parties, or hot-button political events? |
| 2 | Cussing | Does the script/copy contain profanity? |
| 3 | Inappropriate scenes | Is there any sexual, violent, or otherwise adult content? |
| 4 | Explicit jokes | Does a joke rely on crude/explicit content to land? |
| 5 | Harassment | Could this read as targeting or piling on a specific type of person/group? |
| 6 | Real-person attacks | Does this name, caricature, or clearly imply a real, identifiable person (streamer, analyst, celebrity, or actual leaguemate)? See `omen-character-spec.md` §4 — human managers must stay archetypes, not real-person parody. |
| 7 | Gambling-style promises | Does anything imply guaranteed winnings, betting odds, or DFS-style promises? |
| 8 | Fake fantasy certainty | Does Omen's "prophecy" framing cross from personality device into an actual guaranteed-outcome claim? Cross-check against the app's own mock-vs-live labeling rules (`facts-of-record.md` in the Omen repo) — content must not claim more certainty than the product itself claims. |
| 9 | Mean-spirited content | Would a fantasy manager watching this feel mocked rather than seen? Sincerity-before-funny per `omen-character-spec.md` §3 is the tell — if the joke only works by being cruel, it fails here. |

## 3. OK-to-joke-about list (safe territory, still subject to §2)

These are fair game as long as they don't trip a §2 prohibition:

- Bad trades
- Panic starts
- Waiver wire desperation
- Overconfident managers
- Group chat chaos
- Draft regret
- Ignoring good advice
- Name-value bias (drafting/starting based on reputation over production)
- League drama
- Managers pretending they had a plan

## 4. Borderline-call escalation

If a script/cut is funny specifically *because* it's close to a §2 line (common with trade-shaming or
group-chat-drama bits), flag it to Justin explicitly rather than making the call solo. Document the
specific line and which prohibition it's close to.

## 5. Cold-start check

Read the script once for the joke, then read it again against §2's 9 questions specifically — don't
trust a single "feels fine" read to catch all nine at once.

## Change log

- 2026-07-14: Promoted from `content-strategy.md`'s inline Boundaries + OK-to-joke-about lists into an
  explicit numbered checklist with escalation guidance.
