# Always-read at L2

**The L2 read order lives in one place: `slops-saloon/omen/CLAUDE.md` § "Read in order before
pulling a task".** `omen/Blueprints/prompts/kickoff-l2.md` carries the identical list by contract,
and `omen/scripts/check-kickoff-drift.js` enforces it.

This module used to carry its own five-item order. It disagreed with both of them — a different
sequence, a different set, and no awareness of the 2026-09-12 revision that dropped
`decision_log.md` from the up-front read and split `current_sprint.md` and `known_issues.md`.
A second copy of a read order is a second source of truth for the same contract, and the copy is
the one that goes stale. *(Rewritten 2026-09-12.)*

## What this module still owns

Two L2 preconditions that sit **before** the read order and are not in it:

0. **Run `slops-repo-inspector` before planning.** Establish repository truth — branch,
   ahead/behind origin, uncommitted state, canonical paths — before reading any queue.
0.5. **`Direction/CUTOVER_STATE.md`** — if `STATE:` is anything other than `NONE`, a cutover is in
   progress; stop and confirm with the founder before pulling work.

**Multi-layer / cross-cutting tasks:** also consult the cross-layer knowledge graph — see
`graphify-hook.md`.
