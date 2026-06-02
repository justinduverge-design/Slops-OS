# Corvus Backend Finish Audit

Date: 2026-05-26

Owner: Codex / backend

Layer: Slops Saloon Layer 1 report about active product `corvus/`

## Current App State

Corvus backend is materially stronger after the finish pass, but not production-validated.

Local verification:

- `npm test`: 207/207 passing.
- `npm audit --audit-level=moderate`: 0 vulnerabilities.
- `npm --prefix frontend run build`: passed and emitted `frontend/dist`.
- `git diff --check`: passed before implementation.

Current backend surface:

- Express API with health, readiness, dashboard summary, public Trade Analyzer, public Draft Assistant, platform connections, Stripe, Omen, privacy routes, and legacy compatibility routes.
- `POST /api/omen/mvp-move` is Pro/paid, auth-gated, subscription-gated, and platform-gated.
- Live Omen v1 now covers Yahoo, Sleeper, and ESPN start/sit MVP moves when platform data is usable.
- Draft Assistant remains public and now avoids fictional recommendations when ADP rows are supplied.
- Privacy export/consent/delete routes are mounted under `/api/user`.

## What Is Good

- The core API contracts are stable enough for Claude/frontend to build against.
- Trade Analyzer remains public and payload-bounded.
- Omen no longer returns generic fake advice from live calls.
- Stripe return URLs and dashboard subscription shape support Account UI.
- Supabase Vault is used for Yahoo/ESPN secrets; user exports redact tokens and Vault ids.
- Cron scoring remains disabled by default.
- Backend tests are broad for the current solo-founder stage.

## What Still Blocks "Backend Finished"

- Stripe checkout/portal/webhook validation must be run in test mode and documented.
- Production Stripe validation requires Justin approval.
- Supabase production schema changes for subscription metadata columns must be reviewed/applied with approval.
- Google, Apple, and Discord Supabase provider configuration must be confirmed.
- Yahoo/Sleeper/ESPN live Omen needs real-account staging QA before public all-platform claims.
- ESPN remains fragile because it relies on user-copied cookies.
- Load-test evidence has not been collected yet.
- `POST /api/optimizer/mvp-move` and canonical `POST /api/omen/mvp-move` need a merge/retire decision.
- Legacy mounted routes need final compatibility/retirement inventory.

## Ordered Backend Task List

1. Run Stripe test-mode validation for checkout, portal, subscription webhook, cancellation, trial, and payment failure.
2. Apply or schedule the approved Supabase schema update for subscription metadata columns.
3. QA real Yahoo, Sleeper, and ESPN connected-account Omen flows.
4. Run `scripts/load-corvus-routes.js` against local/staging with auth token evidence.
5. Inventory legacy mounted routes and mark active, compatibility-only, retired, or internal.
6. Decide optimizer-vs-Omen route ownership.
7. Add staging evidence for ESPN recovery states with no cookie logging.
8. Keep cron scoring disabled until Sportradar/provider and move-followed data are proven.

## Claude Owns

- Account subscription UI using `GET /api/dashboard/summary.subscription`.
- Omen gate UI from dashboard status and live route recovery states.
- Mock/live labels for Draft Assistant and Omen.
- Login/connect UX copy and provider-button error handling.
- Frontend visual QA for `/account`, `/omen`, `/trade`, `/draft`, and `/account/connect`.

## Codex Owns

- Backend API contracts, tests, validation, and route hardening.
- Stripe webhook backend behavior.
- Platform adapters and Omen service truthfulness.
- Privacy route safety.
- Load-test scripts and backend evidence.
- Backend-to-frontend handoffs.

## Requires Justin Approval

- Production deploy.
- Stripe live-mode actions or production webhook changes.
- Supabase production migrations/data changes.
- Secrets, `.env`, DNS, SSL, Nginx, Oracle service config, or Docker production changes.
- Enabling `CORVUS_CRON_SCORING_ENABLED=true`.
- Publicly claiming all-platform Omen is launch-ready before real-account QA evidence exists.

## Must Not Be Touched Without Approval

- `.env`, keys, cookies, or credential files.
- Production Stripe settings.
- Supabase production data or migrations.
- DNS, SSL, Nginx, Oracle service configuration.
- `Archive/quarantine`.
- Any destructive account/data action outside explicit test scope.

## Recommendation

Treat Corvus backend as locally hardened and frontend-unblocked, not launch-finished. The next founder-grade move is evidence collection: Stripe test mode, real platform QA, load script output, and a short legacy-route retirement decision.
