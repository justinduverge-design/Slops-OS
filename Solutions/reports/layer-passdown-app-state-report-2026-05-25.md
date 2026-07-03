# Layer Passdown And App State Report

Date: 2026-05-25

## Scope

This report answers:

- What Layer 0 should pass to Layer 1.
- What Layer 1 should pass to Layer 2.
- What Layer 2 should report back up to Layer 0.
- What backend and frontend development should focus on next.

`SLOP Buckets` is interpreted as the DBS buckets used across the workspace:

```text
Direction/
Blueprints/
References/
Solutions/
Archive/
```

No secrets, `.env` files, key-like files, production infrastructure, SQL, package files, or deploy config were edited.

## Bucket State

| Layer | Direction | Blueprints | References | Solutions | Archive | Read |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| Layer 0 - SLOPS OS | 26 files | 208 files | 9 files | 70 files | 26 files | Strong operating layer; rich but easy to over-pass downward. |
| Layer 1 - Slops Saloon | 9 files | 3 files | 1 file | 1 file | 1 file | Clean division shell; should stay intentionally light. |
| Layer 2 - Omen | 10 files | 54 files | 3 files | 3 files | 13 files | Active product layer; most implementation truth belongs here. |

## Current App State

Omen is the active product app at:

```text
SLOPS/slops-saloon/omen/
```

Current product surface:

- Public: `POST /api/trade/compare`, `/trade`.
- Public: Draft Assistant endpoints, `/draft`.
- Protected: `/account`, `/football`, `/omen`.
- Omen / MVP Move: `POST /api/omen/mvp-move`.
- Dashboard gate source: `GET /api/dashboard/summary`.
- Platform status source: `GET /api/platforms`.
- Stripe checkout and portal return to `/account`.

Verification:

- Backend tests: `npm test` passed, 199/199.
- Legacy `client/` Vite build: passed.
- Primary `frontend/` Vite build: failed.

Frontend build blocker:

```text
frontend/src/pages/Account.jsx:14
Expected "}" but found "t"
```

Cause: the single-quoted subscription description contains `won't`, which breaks the string. Because Docker builds both `client/` and `frontend/`, the production image build is currently blocked until this frontend syntax error is fixed.

Secondary frontend build warning:

```text
NODE_ENV=production is not supported in the .env file.
```

The env file was not opened or edited. Treat this as a follow-up configuration hygiene item after the syntax blocker is fixed.

## Layer 0 -> Layer 1 Passdown

Pass only durable operating context from SLOPS OS to Slops Saloon:

- Canonical route: `SLOPS/` -> `slops-saloon/` -> `omen/`.
- DBS bucket meanings and baseline file contract.
- Safety doctrine: approval before secrets, production, deploy, SQL, package, destructive, or infrastructure work.
- Agent ownership doctrine: Justin decides product direction; Codex owns backend; Claude owns frontend.
- Handoff doctrine: product contracts live in product handoffs, not root handoffs.
- Historical doctrine: Archive, imported agents, old `ssffmvp`, and old `Omen/` paths are reference-only.
- Reusable skill doctrine: root `Blueprints/skills/` is canonical; do not duplicate skills in Layer 1 unless a second product makes a division-level skill necessary.

Do not pass down:

- Full imported agent library.
- Full migration history.
- Old `ssffmvp` instructions.
- Root-level implementation guesses.
- Product-specific endpoint contracts.

Layer 1 should remain a clean division router, not a second app brain.

## Layer 1 -> Layer 2 Passdown

Pass product-relevant division context into Omen:

- Slops Saloon is the parent division for sports, music, and arts.
- Omen is the only active product.
- Future products stay out of Omen until Justin starts them.
- Omen product hierarchy:
  - Trade Analyzer is the front door.
  - Draft Assistant is the preparation tool.
  - Omen / MVP Move is the main event.
  - Start/Sit and waiver logic stay inside Omen unless Justin separates them.
- User-facing voice: plain-English reasoning over visible heavy math.
- Platform posture:
  - Yahoo, Sleeper, and ESPN all matter.
  - Yahoo is first live Omen source.
  - Sleeper and ESPN are connected-platform work, but live Omen engines remain incomplete or pending.
  - ESPN is high-value but fragile and needs careful recovery UI.
- Gate order for Omen: auth -> platform -> subscription -> live Omen.
- Product truth must be written in Omen `Direction/` and `Blueprints/handoffs/`.

Do not pass down:

- Division-level future product ideas as active Omen scope.
- Parent-brand homepage decisions unless Justin routes them to Omen.
- Broad Slops Saloon brand exploration that does not affect current app behavior.

## Layer 2 -> Layer 0 Report Back

Omen should report these facts back up:

- Backend tests are healthy: 199/199 passing.
- The primary frontend build is blocked by `frontend/src/pages/Account.jsx`.
- The legacy `client/` build passes, but Docker builds both frontend surfaces.
- The app has real backend contract movement: dashboard subscription summary, Stripe Account return flow, Yahoo-first Omen live route, Sleeper resolve/connect, and platform status contract.
- Paid launch confidence is not achieved yet.
- Production-sensitive work remains: Stripe live validation, load tests, ESPN recovery validation, final mock/live labeling, production secrets/Supabase settings review, and Tuesday scoring gate validation.
- App docs have some contract drift: older handoff sections still describe Omen as mock/fail-closed, while code/tests now include a Yahoo-first live Omen path.
- A separate SLOPS skill still references retired `ssffmvp` pathing and should be updated in a future OS cleanup pass.

## Backend Focus

1. Update Omen handoffs so `backend-to-frontend.md` reflects the current tested reality: Yahoo-first live Omen exists, Sleeper/ESPN live Omen remains pending, and dashboard gate state is the source of truth.
2. Validate Stripe live behavior end to end: checkout, trial, season plan, portal, webhook activation/deactivation, and Account subscription summary.
3. Load test `POST /api/omen/mvp-move` and `POST /api/trade/compare`.
4. Harden live Omen error states around Yahoo token expiration, missing league id, no lineup edge, and provider failures.
5. Decide whether `POST /api/optimizer/mvp-move` merges into `POST /api/omen/mvp-move`.
6. Decide the GDPR export/delete route mount and frontend contract before Account exposes privacy controls.
7. Keep ESPN behind explicit product approval or a controlled flag until recovery states are validated with real user flow.

## Frontend Focus

1. Fix the `Account.jsx` string syntax error, then rerun `npm run build` in `frontend/`.
2. Treat Account subscription UI as P0 because Omen is Pro-gated and Stripe returns to `/account`.
3. Use `GET /api/dashboard/summary.subscription` for Account state and Omen gating.
4. Build Connect League against `GET /api/platforms`, `POST /api/platforms/sleeper/resolve`, `POST /api/platforms/sleeper/connect`, Yahoo auth, and gated ESPN UI.
5. Keep Trade Analyzer public and not hidden behind `/football`.
6. Keep Draft Assistant public and visibly label mock/preview output where `is_mock` is true.
7. Keep Omen UI strict: no generic live advice unless dashboard says `tools.omen_of_the_week.status === "ready"`.
8. Do not present Google, Apple, or Discord as verified auth providers until Supabase provider config and frontend wiring are confirmed.

## Recommended Next Actions

1. Claude/frontend fixes the Account build blocker.
2. Codex/backend updates the Omen backend-to-frontend handoff to match the tested live Omen and Stripe contracts.
3. Run `npm test`, `npm run build` in `frontend/`, and `npm run build` in `client/` before any deploy conversation.
4. After build is green, do a browser QA pass on `/trade`, `/draft`, `/login`, `/account`, `/account/connect`, `/football`, and `/omen`.
5. Then choose between Stripe live validation or Omen load testing as the next paid-launch confidence step.
