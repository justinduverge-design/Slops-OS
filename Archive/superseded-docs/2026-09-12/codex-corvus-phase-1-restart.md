# Codex Prompt — Corvus Phase 1 Restart (Verification + Re-Anchor)

**Status: SUPERSEDED 2026-06-13.** The verification + re-anchor purpose has been satisfied by what actually shipped: PR #31 (`b0c12b7` Phase 1 foundation re-anchor — folded in the deploy reconcile + Phase 1.4 work), PR #33 (`cc14e79` Phase 1.2 backend Sentry — verified against the hand-drafted spec; 291/291 tests pass; no new audit advisories), and the doc re-anchor merge (`fcb4d82`) onto main. Do not re-run. Slated for `_archive/` whenever the L0 cleanup prompt fires.

**Layer:** 2 (Corvus)
**Date drafted:** 2026-06-13
**Posture:** Read-only verification + a single handoff document. NO code changes. NO deploy. NO push.
**Authority:** Justin's approval already granted in chat. The output is a report; Justin approves Phase 1.2 / 1.3 build prompts separately.

---

## Why

Phase 1.1 (CI/CD retarget to KVM1) shipped 2026-06-12. Phase 1.4 (ADP schema review SQL) shipped 2026-06-12. Phase 1.2 (Sentry both halves) and Phase 1.3 (iOS Safari mobile QA) are still open. Before continuing, we want a clean re-anchor pass to verify done-state, baseline the test suite, and surface any drift before more code lands. Minimizing errors > moving fast.

## What to Produce

ONE file: `corvus/Blueprints/handoffs/2026-06-13-phase-1-restart.md`

That handoff is the only deliverable. No code edits. No commits to source files.

## Steps

### 1. Re-read the canonical sources (do not summarize from memory)

- `slops-saloon/corvus/Direction/current_sprint.md`
- `slops-saloon/corvus/Direction/decision_log.md` (most recent entries only — last 30 days)
- `slops-saloon/corvus/Blueprints/handoffs/backend-to-frontend.md` (most recent)
- `Blueprints/handoffs/2026-06-11-corvus-pull-prep-handoff.md` (L0 perspective on what's available to pull)
- `slops-saloon/corvus/Blueprints/security-privacy.md` (Sentry PII scrubbing rules — required for Phase 1.2)

### 2. Verify done-state against the code (Phase 1.1 + Phase 1.4)

**Phase 1.1 evidence to confirm:**

- `slops-saloon/corvus/.github/workflows/deploy.yml` — confirm name is `Deploy to Hostinger KVM1`, secrets are `KVM1_HOST` / `KVM1_USER` / `KVM1_SSH_KEY`, working dir is `/opt/corvus/deploy/hostinger`, compose file is `docker-compose.prod.yml`, no infisical references, no `git pull` step.
- Existence: `slops-saloon/corvus/deploy/hostinger/docker-compose.prod.yml`
- Existence: `slops-saloon/corvus/deploy/hostinger/ENV-INVENTORY.md`

**Phase 1.4 evidence to confirm:**

- `slops-saloon/corvus/sql/2026-06-12_phase1_adp_scoring_schema_review.sql` — exists, tables match the sprint claim (`adp_sources`, `adp_player_rankings`, `league_scoring_configs`, `league_scoring_rules`, `league_roster_slots`, `league_scarcity_weights`), RLS clauses present.
- `slops-saloon/corvus/test/phase1SchemaReviewSql.test.js` — exists.
- `npm test` passes at 288/288 (or current count).

### 3. Run the baseline verification gates (no writes)

From `slops-saloon/corvus/`:

```bash
npm test
npm --prefix frontend run build
npm audit --audit-level=moderate
git status
git diff --check
```

Capture: pass/fail status, test count, frontend build status, audit findings (expect the pre-existing `hono` advisory; flag anything new), any uncommitted changes, any whitespace/conflict markers.

Do NOT run any command that writes to Supabase, deploys, pushes, or installs.

### 4. Inventory Phase 1.2 (Sentry) starting state

**Backend half:**
- Does `slops-saloon/corvus/package.json` already have `@sentry/node`? (`grep -c '"@sentry/node"' package.json`)
- Is there a `SENTRY_DSN` line in `slops-saloon/corvus/.env.example`?
- Is there a `SENTRY_DSN` line in `slops-saloon/corvus/deploy/hostinger/ENV-INVENTORY.md`?
- Where in `slops-saloon/corvus/src/server.js` should init happen? (early — before route mounts; identify line number.)
- Where in `slops-saloon/corvus/src/corvus_tuesday_cron.js` should init happen?

**Frontend half:**
- Does `slops-saloon/corvus/frontend/package.json` have `@sentry/react`?
- Where in `slops-saloon/corvus/frontend/src/main.jsx` should init happen?

**PII scrubbing — non-negotiable:**
- List the exact fields from `slops-saloon/corvus/Blueprints/security-privacy.md` that must be scrubbed before send (ESPN cookie material, user emails, anything the doctrine flags). Note the precise filter signatures Sentry SDKs use (`beforeSend`, `denyUrls`, etc.).

### 5. Inventory Phase 1.3 (iOS Safari mobile QA) starting state

- List the 15 routed pages from the sprint file's full-route audit reference. Pull the route list from `slops-saloon/corvus/src/routes/` or wherever the React router is defined — name each route.
- Identify the device matrix from `Blueprints/skills/mobile-first-qa-playbook/SKILL.md` (now active at L0). State which devices/browsers will be in scope.
- State whether real iOS device or BrowserStack will be used (Justin's call — leave a `Decision needed:` line).
- Flag dependencies: does Phase 1.3 block on anything (Sentry being live to capture mobile errors? demo route? other)?

### 6. Risk + dependency map

In the handoff, include a short risks table:

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Sentry DSN accidentally committed | low | high | DSN comes from env only; pre-commit grep for the DSN prefix |
| Backend init order breaks existing routes | medium | high | Init must run before route mounts; rerun 288/288 after each step |
| Mobile QA finds Phase-2 blockers | medium | medium | Triage in the handoff: launch-blocker vs post-launch fix |
| `hono` audit gets worse | low | low | Re-check after any package.json change; do not touch package files outside scope |

Expand as the verification surfaces actual risks.

### 7. Write the handoff

`corvus/Blueprints/handoffs/2026-06-13-phase-1-restart.md` with these sections:

1. **Posture** — one line: where Phase 1 stands.
2. **Verified Done (with evidence)** — Phase 1.1 + Phase 1.4 with file paths and what was checked.
3. **Baseline Gates** — test count, build status, audit, git state.
4. **Phase 1.2 Starting State** — backend + frontend inventory, init line numbers, PII fields.
5. **Phase 1.3 Starting State** — route list, device matrix, decision needed.
6. **Risks** — table from step 6.
7. **Recommended Next Codex Prompt** — propose the exact next prompt (Phase 1.2 backend first, isolated, with rollback notes). Do not run it.
8. **Open Questions for Justin** — bullet list. Anything that needs a decision before the next build prompt fires.

## Hard Constraints

- Read-only against L2 source code. No edits to `.env`, secrets, DNS, SSL, Nginx, Supabase, Stripe, or package files.
- Do not deploy. Do not push.
- Do not enable `CORVUS_CRON_SCORING_ENABLED`.
- ESPN cookie values must never be logged or quoted in the handoff.
- If any verification step fails (test regression, build break, unexpected git state), STOP and report — do not attempt to fix.

## Report Back

Two short paragraphs in chat:

1. Where Phase 1 actually stands after verification (matches sprint file? drift?).
2. Whether the handoff at `corvus/Blueprints/handoffs/2026-06-13-phase-1-restart.md` is ready for Justin to review, and whether the recommended next prompt is Phase 1.2-backend or something earlier.
