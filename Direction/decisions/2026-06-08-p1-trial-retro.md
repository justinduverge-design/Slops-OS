# Retro — P1 Sleeper Live Omen, Slops Toolkit Trial (2026-06-08)

First end-to-end run of the new Slops skill family, using Omen **P1 — Sleeper live Omen** as the
test case. Produced via `slops-retro`. Backend committed at `25529ce` on `backend/p1-sleeper-live`
(code complete, smoke pending; not pushed).

## What we ran
`planning-pass` (pre-seeded) → kickoff → `slops-git-flow` (branch + scoped commit) →
build to `live-engine-spec.md` → `slops-quality-baseline` → `slops-verify` → `slops-code-review`
(Codex self + Claude independent) → STOP at commit gate.

## What worked
- **Scoped-commit discipline held.** Five code/test files committed; the dirty doc tree was left
  untouched. No repeat of the `cadd5f8` near-miss.
- **The honesty gate worked.** Codex refused to mark P1 done because the real-account smoke is unmet —
  exactly what `definition-of-done` + the live-engine spec require.
- **Quality ratcheted up:** 290 → 292 tests; `git diff --check` clean; the pre-existing `hono`/
  `promptfoo` moderate advisory correctly did **not** count as a new regression.
- The new skills layered cleanly and both agents carried the same versions (hash-matched).

## What was awkward → fixes
1. **Docs/code commit collision (primary lesson).** Product doc updates (`current_sprint.md`,
   `decision_log.md`, `backend-to-frontend.md`) were already dirty with in-flight doctrine edits, so
   they couldn't be committed with P1 without sweeping unrelated work in.
   **Fix applied:** `slops-git-flow` now mandates a **separate docs commit**, explicitly staged, never
   bundled with code.
2. **`slops-verify` couldn't run** — the local backend/API was down, so only the frontend build ran.
   **Fix applied:** `slops-verify` now states a running-instance **precondition** and requires
   reporting **BLOCKED (not pass)** when the app is unreachable.
3. **Per-provider smoke feasibility differs.** Sleeper's read API is **public** (no auth), so its
   real-data adapter smoke can run now with a public `league_id` — unlike Yahoo/ESPN which need a
   session. **Follow-up:** note this in `live-engine-spec.md` so Sleeper's DoD #6 isn't blocked on a
   connected account.

## Follow-ups (open)
- [ ] **Re-sync** the updated `slops-git-flow` + `slops-verify` to both agent dirs (Distribution rule).
- [ ] Run the **public-league Sleeper adapter smoke**; if green, close more of P1's DoD.
- [ ] Establish the **first `slops-quality-baseline`** file from this run (292 tests, build clean,
      1 known moderate advisory).
- [ ] Do the deferred **docs commit** that untangles this session's doctrine work from the
      product doc files.
- [ ] Verify the kept `codex` skill still loads post-quarantine; drop if broken.

## Net
The toolkit is sound on its first real run. One concrete doctrine sharpening (docs-commit lane) and
one precondition fix (verify) are already folded in — the flywheel produced durable improvements,
not just notes.
