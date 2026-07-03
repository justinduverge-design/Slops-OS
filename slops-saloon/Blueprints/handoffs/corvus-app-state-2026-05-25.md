# Omen App State — Layer 1 Report

**Date:** 2026-05-25
**Author:** Claude Code / frontend audit pass
**Layer:** 1 (Slops Saloon division) ← report from Layer 2 (Omen)

---

## What This Is

A full frontend + backend audit of Omen as of 2026-05-25. Written for the Layer 1 owner (Justin / Slops Saloon) to understand what is done, what is not done, and what needs to happen before confident paid launch.

---

## What Is Working

### Backend — fully implemented

| Route | Auth | Status |
|---|---|---|
| `POST /api/trade/compare` | None | Live — VORP + LLM explanation |
| `POST /api/draft-assistant/recommendations` | None | Mock only (by design) |
| `GET /api/draft-assistant/adp` | None (optional Yahoo) | Mock in dev, live Yahoo ADP in prod with Redis |
| `POST /api/start-sit` | None | Live — VORP + LLM explanation |
| `GET /api/omen/mvp-move` | Auth + Subscription | Live for Yahoo users; `pending_live_engine` for Sleeper/ESPN |
| `GET /api/optimizer/lineup` | Auth + Subscription | Live (Yahoo only) |
| `GET /api/optimizer/waiver` | Auth + Subscription | Live with mock fallback (Yahoo only) |
| `GET /api/dashboard/summary` | Auth | Live — gate logic for all tools |
| `GET /api/platforms` | Auth | Live — Supabase Vault-backed |
| `POST /api/platforms/sleeper/connect` | Auth | Live |
| `POST /api/platforms/espn/connect` | Auth | Live — ESPN cookies stored in Vault |
| `GET /api/yahoo/auth` + `/callback` | Auth | Live — OAuth wired, redirects to `/account/connect?connected=yahoo` |
| `POST /api/stripe/checkout` | Auth | Implemented — **NOT live-validated** |
| `POST /api/stripe/portal` | Auth | Implemented — **NOT live-validated** |
| `GET /api/system/health` | None | Live |

### Frontend — all routes routed and building

| Route | Auth | State |
|---|---|---|
| `/` | None | Landing page |
| `/login` | None | Magic link + social buttons |
| `/trade` | None | Trade Analyzer (public) — now has AppLayout shell |
| `/draft` | None | Draft Assistant (public) — now has AppLayout shell |
| `/account/connect` | Self-gated | Platform connection onboarding |
| `/account` | Protected | Subscription + platform management |
| `/football` | Protected | Dashboard shell (Trade / Omen / Draft tabs) |
| `/omen` | Protected | Standalone Omen page |

Build: `✓ built in 1.52s` after fixes on 2026-05-25.

---

## What Is NOT Done

### Launch blockers

1. **Stripe live validation** — Justin's stated #1 priority. Checkout, portal, and webhook not tested with live Stripe keys. No user has paid yet. This is the single gate before confident paid launch.

2. **Load testing** — `POST /api/omen/mvp-move` (LLM + DvP pipeline) and `POST /api/trade/compare` under real concurrent load are untested.

### Product gaps (post-launch OK, but limit who can get value)

3. **Omen for Sleeper/ESPN users** — Only Yahoo has a live Omen path. Sleeper and ESPN users are gated at `pending_live_engine` and see "Platform connected — live recommendations are being prepared." They pay for Pro and get nothing from Omen. Requires wiring Sleeper/ESPN roster adapters into the Omen service.

4. **Sleeper auto week detection** — `GET /api/sleeper/roster` requires an explicit `week` param. No NFL current-week inference for Sleeper. Backend comment says "until Sleeper week detection is added."

5. **Optimizer waiver projections** — Yahoo's available-players endpoint doesn't include projections. VORP delta for waiver candidates is calculated against 0 as the player baseline, not real projections. Route includes a warning comment.

6. **Live Draft Assistant** — Always returns mock recommendations (`is_mock: true`). The mock banner is always shown. A live path requires season data + platform roster context. Deferred by design for now.

### Frontend loose ends (not blockers, but visible)

7. **DraftAssistant badge says "2025 Season"** — Hardcoded label in `DraftAssistant.jsx` line 331. Should be "2026 Season" or removed.

8. **MockBanner in DraftAssistant is permanently on** — Even when/if live data ships, the banner has no conditional path to hide. Needs a product decision: keep it as a permanent disclaimer or wire it to `is_mock`.

9. **`StartSit.jsx` and `WaiverWire.jsx` are unrouted** — Files exist, not accessible via any URL. Justin confirmed: leave orphaned (embedded only / no standalone routes). They are used as components inside Football.jsx's waiver tab area or as future embedded widgets.

---

## Decisions Locked

- Gate order is locked: **auth → platform → subscription → ready**. Cannot be changed without Justin's approval.
- `StartSit` and `WaiverWire` stay as embedded-only components — no standalone routes.
- `/trade` and `/draft` now have AppLayout shell when visited directly (fixed 2026-05-25).
- ESPN remains behind `VITE_ESPN_ENABLED=false` in production unless Justin enables it.
- Draft Assistant is mock-first by design. Live data is a future milestone.

---

## Recommended Next Action

**Stripe live validation** — this is the only thing between "the app works" and "users can pay."

Steps:
1. Switch to live Stripe keys in the production environment.
2. Run an end-to-end checkout on the Monthly plan.
3. Verify the webhook fires, `subscriptions` table updates, and dashboard summary shows `is_subscribed: true`.
4. Run an end-to-end portal session and confirm subscription management works.
5. Test cancel flow — confirm `cancelled=true` lands back on `/account`.

This requires Justin's production access — Claude cannot execute payment flows.

---

## After Stripe

Next highest-value backend work, in order:

1. Sleeper Omen — wire Sleeper roster into `POST /api/omen/mvp-move`. This unlocks the majority of non-Yahoo users.
2. ESPN Omen — wire ESPN credentials + roster into Omen. Smaller user segment, higher complexity.
3. NFL week auto-detection for Sleeper — smooth out the Sleeper UX.
4. Live Draft Assistant — this is a new feature, not a gap. Should be planned as a separate milestone.
