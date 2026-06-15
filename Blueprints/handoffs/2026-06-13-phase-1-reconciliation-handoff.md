# Handoff — Phase 1 Reconciliation + Sentry Prep

**Date:** 2026-06-13
**Layer:** 0 (this session was mostly L0 coordination, with three L2 file writes for the deploy reconcile + Phase 1.4 commit)
**Author:** Claude
**For:** The next SLOPS OS session.

---

## Why This Session Existed

Codex's Phase 1 restart pass stopped because the sprint file claimed `deploy/hostinger/docker-compose.prod.yml` was in the repo and it wasn't — the file lived only on KVM1. Reconciling that gap (plus a missed commit of Phase 1.4 schema files) was the priority before any Phase 1 forward work could continue. Reconciliation closed; Phase 1.2 backend prompt now staged.

## Decisions Made

- **Memory:** Phase 1.1 shipped 2026-06-12 (verified against sprint file line 58). The L2 pull-prep handoff trigger is now met. Memory entry `project_corvus_phase_1_1_status.md` updated to reflect that.
- **Memory:** New feedback memory `feedback_do_the_work_dont_route_to_codex.md` saved. Default for infra config, docs, scrubs, sprint edits, memory work = Claude does it directly. Codex routing only when (a) work is large enough to benefit from build-loop discipline, (b) needs tests/installs Claude can't run, (c) is application source code, or (d) Justin explicitly asks.
- **Deploy reconciliation:** Three KVM1-only files (`docker-compose.prod.yml`, `nginx-corvus.conf`, `DEPLOY-NOTES.md`) reconciled into the repo at `slops-saloon/corvus/deploy/hostinger/`. Plus new `deploy/hostinger/.gitignore` for defense-in-depth (repo root `.gitignore` already covers `.env.*`).
- **Scrub:** All three deploy files scrubbed for inline secrets — clean. No DSNs, tokens, cert contents, or hashed creds. Chat paste artifacts (autolinked hostnames) were stripped before write.
- **Phase 1.4:** Two untracked files (`sql/2026-06-12_phase1_adp_scoring_schema_review.sql` + `test/phase1SchemaReviewSql.test.js`) committed. The Codex Phase 1.4 report said "implemented locally" — that was literal; no commit had been made. Now committed.
- **Sprint file:** No wording fix needed. The existing dirty WIP restructure already documents Phase 1.1 accurately (including the compose file reference). With the deploy files now in the repo, that wording is honest. Justin's WIP doc changes (sprint, decision log, backend-to-frontend handoff) left untouched.
- **Doctrine:** A near-duplicate flag is still open — `Blueprints/skills/slops-context-markdown/` vs `Blueprints/skills/slops-markdown-authoring/`. Surfaced last session; not resolved. Justin's call.
- **Doctrine:** `hostinger-kvm1-deploy-runbook.md` referenced in `DEPLOY-NOTES.md` does not exist anywhere in the workspace. Softened the reference to "TBD" so the doc isn't lying.

## Commits Landed (this session)

| Hash | Branch | Files | Summary |
| --- | --- | --- | --- |
| `89a4a3a` | `main` | 4 (deploy/) | `chore(deploy): reconcile KVM1 deploy/hostinger files into repo` |
| `3daefe7` | `main` | 2 (sql/ + test/) | `feat(phase1.4): ADP + scoring config schema review SQL + tests` |

Neither pushed. Justin's gate.

Earlier in the day, Codex ran the Week 1 + 1.5 promotion (11 commits, `fa0223b..3f421eb`). Those were already on `main` at session start and were NOT touched in this session. Their post-promotion cleanup prompt remains staged at `Blueprints/prompts/_pending/codex-week-1-and-1.5-cleanup.md`.

## Files Discussed

- `slops-saloon/corvus/Direction/current_sprint.md` (read for Phase 1 state; left dirty as Justin's WIP)
- `slops-saloon/corvus/deploy/hostinger/` (4 files written + committed)
- `slops-saloon/corvus/sql/2026-06-12_phase1_adp_scoring_schema_review.sql` (committed untouched)
- `slops-saloon/corvus/test/phase1SchemaReviewSql.test.js` (committed untouched)
- `slops-saloon/corvus/.gitignore` (verified — covers `.env.*`)
- `slops-saloon/corvus/Blueprints/security-privacy.md` (read for Sentry scrubber spec)
- `slops-saloon/corvus/deploy/hostinger/ENV-INVENTORY.md` (read for Sentry DSN placement)
- `slops-saloon/corvus/src/server.js` (read first 80 lines for Sentry init point)
- `slops-saloon/corvus/src/corvus_tuesday_cron.js` (read first 60 lines for cron init point)
- `Blueprints/handoffs/2026-06-11-corvus-pull-prep-handoff.md` (re-read; trigger now met)
- `Blueprints/prompts/_pending/codex-corvus-phase-1.2-sentry-backend.md` (NEW — drafted this session)
- `Blueprints/prompts/_pending/codex-corvus-phase-1-restart.md` (existing — now stale; replaced by the Sentry prompt as the next move)
- `Blueprints/prompts/_pending/codex-week-1-and-1.5-cleanup.md` (existing — still pending Codex run)

## Unresolved Questions

1. **Sprint file restructure** — Justin's WIP edits to `Direction/current_sprint.md`, `Direction/decision_log.md`, and `Blueprints/handoffs/backend-to-frontend.md` are still uncommitted. He can commit when ready. No urgency, but they should land before the Phase 1.2 backend PR so the diff stays clean.
2. **Phase 1.1 restart prompt vs Phase 1.2 prompt** — the original restart prompt (`_pending/codex-corvus-phase-1-restart.md`) is now stale. Phase 1.1 + 1.4 are done; Phase 1.2 is the actual next step. The restart prompt should be deleted or marked superseded.
3. **`hostinger-kvm1-deploy-runbook.md`** — referenced as "TBD" in the committed `DEPLOY-NOTES.md`. Open whether to author it before paid launch or treat the deploy notes file as sufficient.
4. **markdown-skill near-duplicate** — `slops-context-markdown` vs `slops-markdown-authoring` both live in active at L0. Carried forward from previous session. Justin's call when to consolidate.
5. **OneDrive + git stability** — `.git/index.lock` regenerated during sandbox git operations because OneDrive's filesystem filter held it. Workaround: Justin runs git commits from PowerShell directly. Long-term consideration: excluding `.git/` from OneDrive sync or moving the repo off OneDrive. Not urgent.

## Recommended Next Prompt

Run the Phase 1.2 backend Sentry prompt at:

```
Blueprints/prompts/_pending/codex-corvus-phase-1.2-sentry-backend.md
```

It's drafted against the honest baseline (commit `3daefe7`), bakes in the exact PII scrubber spec from `Blueprints/security-privacy.md`, names the precise init points in `src/server.js` and `src/corvus_tuesday_cron.js`, and ends with a single-commit (or two-commit) plan. Verification gates: `npm test` baseline + 1 new smoke test, audit clean except pre-existing `hono`, `git diff --check` clean.

Frontend half of Phase 1.2 + iOS Safari Phase 1.3 are still queued behind that backend pass.

## Safest Next Step

Have Justin commit (or revert) his WIP doc changes on `current_sprint.md`, `decision_log.md`, and `backend-to-frontend.md` first. Then run the Phase 1.2 backend prompt against the now-fully-clean tree. That keeps the Phase 1.2 PR diff easy to review and avoids accidental bundling.

If Justin wants the cleanup-commit prompt (post-promotion fixes for the 8 Week 1+1.5 skills) run before Phase 1.2, that's fine too — it's L0, low risk, and unblocks no critical path. Either order works.

## Compaction Priorities (if context tightens)

1. Phase 1.1 shipped; Phase 1.2 backend is next via the staged prompt.
2. Justin runs git commits, not the sandbox (OneDrive filter blocks `.git/` writes).
3. `feedback_do_the_work_dont_route_to_codex` memory: defaults shifted — Claude does infra/docs/scrubs/sprints directly; Codex for app source.
4. Two new commits on `main` not pushed: `89a4a3a` (deploy) + `3daefe7` (Phase 1.4).
5. Pull-prep handoff trigger met; STRATEGY.md for Corvus now unblocked when Justin says so.
