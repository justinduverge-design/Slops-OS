# Prior-use review — slops-intent-capture

**Two runs on 2026-09-05, by different sessions, discovered late.** This note originally
claimed the photo intent was the skill's first run. That was wrong — corrected on
discovery. A concurrent Omen session captured
`Direction/intents/2026-09-05-league-aware-waiver-wire.md` on branch
`feat/league-aware-waiver-system` the same day. It was invisible from L0 because it lives
on an unpushed feature branch in a separate repo. **Carry forward: check the other repo's
unmerged branches before claiming an intent is the first, or the only one, for a
capability.** The skill's own Failure Modes warn that a negative search result is
unproven; this is that failure in a form the listed searches would not catch.

The `draft` status condition (one intent reaching a terminal routing state) is met by the
photo run. Whether that promotes the skill is a founder call, not something this note
decides.

## Record per run

| Date | Intent | What the originator corrected in the draft | Missing interview question | Routing state held? |
|---|---|---|---|---|
| 2026-09-05 | `intent.league-aware-waiver-wire` (Omen, L2) — **not captured by this session**; recorded here from the commit, not from watching the run | Unknown — the originator's corrections, if any, were not recorded. | Unknown. | **No — it has no terminal state.** `Status: DRAFT`, `State: _unset — pending founder review_`, founder-review line `no`. It was committed in `1c4557f` **together with a spec, a service, and tests** — the Design and Build stages ran on an intent that had not been reviewed or routed. Whether that was a deliberate founder-approved shortcut is not recorded anywhere and is not this note's call. Flagged for the founder. |
| 2026-09-05 | `intent.player-photo-in-omen-of-the-week` (Omen, L2) | **Scope, massively.** The agent's interview assumed "photos in Omen" meant an app-wide capability and asked which screens; the originator wanted **one surface only** — the Omen of the Week lead card. Everything else fell away in one sentence. Also **downgraded a cited source**: the founder's prior GPT research was disclaimed by him unprompted ("it hallucinates so much"), so it is recorded as non-evidence rather than as a source. **Routing:** he named two states at once — "we should defer this" *and* "put it in the sprint". Resolved against the `O1c` precedent (deferred item, listed, in no batch) rather than by asking again. | **"Which single surface?" was never asked directly.** The agent asked "which screens do you picture them on" — plural, and framed around a spec conflict — which invited a broad answer to a narrow want. Ask for the smallest surface first and widen only if pushed. Also unasked: **"has this ever gone wrong, or is it pre-emptive?"** The originator supplied strong correctness requirements (identity across trades and team changes) for a feature with zero incidents; that gap was inferred, not confirmed. | **Held.** DEFERRED, with `decision_log.md` 2026-09-05 (later) as the authority and sprint row `X1-PlayerPhotoOmenOfWeek` as the visible pointer. Re-check after `pre-build-research` lands — deferrals in this repo have a history of going stale silently (`known_issues.md:697`). |

## Open questions carried from authoring

- Does `Direction/intents/` survive a `RESOLVER.md` reading, or is it a parallel
  knowledge tree? Founder call. Until answered, the fallback is `agent_inbox.md`.
  **Still unanswered after run 1** — the directory was created under the skill's stated
  routing rule and the founder has not been asked to ratify it. Do not treat its
  existence as the answer.
- **New, from run 1: the skill has no guidance for a want that conflicts with a
  ratified spec.** Here, visual briefs §4.2's card anatomy has no photo element. The
  agent treated the amendment as an open question owned by the founder and refused to
  decide it, which seems right — but the skill should say so, because the tempting
  alternative (quietly writing the intent as though the spec permitted it) would have
  produced a clean-looking artifact built on an unratified change.
- **New, from run 1: a founder preference is not a finding.** "Free if we can avoid
  it" was captured as a preference with the feasibility left open, not as a premise.
  Worth stating in the skill — the failure mode is an intent that silently promotes a
  wish into a constraint the build stage then treats as settled.
- Should a research-derived intent be written by the researching agent at the moment
  of conclusion, or in a separate pass? Writing it in-session is cheaper; a separate
  pass is more honest about needing the originator. Unresolved.
- The sweep over `Direction/reviews/` will find old conclusions whose originator has
  moved on. There is no good answer for those yet — do not manufacture intents for them.
