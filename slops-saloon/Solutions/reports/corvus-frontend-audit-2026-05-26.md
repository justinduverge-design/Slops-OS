# Omen Frontend Audit

Date: 2026-05-26

Owner: Claude Code / frontend

Layer: Slops Saloon Layer 1 report about active product `omen/`

## Current App State

Omen frontend builds cleanly and all routes are wired. No production browser QA has been performed.

Local verification:

- `npm --prefix frontend run build`: passed, `✓ built in ~1.52s`, 100 modules transformed.
- All 8 routes accounted for and routed in `frontend/src/routes/index.jsx`.
- Build fix: unescaped apostrophe in `Account.jsx` PLAN_OPTIONS string resolved 2026-05-25.
- Route fix: `/trade` and `/draft` now wrapped in `AppLayout` so the nav shell shows when visited directly.

Current frontend surface:

- Eight routed pages: `/` (Landing), `/login`, `/trade`, `/draft`, `/account/connect`, `/account`, `/football`, `/omen`.
- `Football.jsx` is the protected dashboard shell with Trade Analyzer, Omen of the Week, and Draft Assistant tabs.
- `OmenPage.jsx` is a standalone protected Omen page at `/omen` that mirrors the Football tab gate logic.
- Gate order is locked: auth → platform → subscription → ready. `OmenOfTheWeek.jsx` handles all backend states including `needs_platform`, `needs_subscription`, `pending_live_engine`, `ready`, ESPN recovery, and error.
- Account page has full subscription UI: plan picker, active subscription state, Stripe checkout and portal redirect, `?subscribed=true` and `?cancelled=true` return handling, `?upgrade=true` scroll-to-section.
- `ConnectLeague.jsx` handles Yahoo OAuth, Sleeper username/league resolve, and ESPN cookie connect.
- `StartSit.jsx` and `WaiverWire.jsx` exist as components but are not routed — orphaned by design (embedded only).

## What Is Good

- All eight routes build and render to their correct page components.
- Gate logic mirrors the backend status contract exactly — no fake live advice shown.
- Mock banners are present in Draft Assistant and Waiver Wire output so users know what is real.
- Error, empty, loading, and disconnected states are implemented across every feature.
- Account page upgrade flow is fully wired: `UpgradeState` → `/account?upgrade=true` → subscription section auto-scroll.
- Stripe return param handling (`?subscribed=true`, `?cancelled=true`) is in place.
- Platform status bar in Football dashboard reads `GET /api/dashboard/summary.platforms` directly — no second fetch.
- `apiFetch` auto-serializes request bodies and attaches the Supabase auth token; all call sites are consistent.
- Yahoo token-expired state is handled in Football dashboard status bar and Waiver Wire with a reconnect CTA.

## What Still Blocks "Frontend Finished"

- **Browser QA** — build passes but no route has been visually verified in a browser against the live backend. All eight routes and their sub-states need a QA pass before any launch confidence claim.
- **Google, Apple, and Discord login buttons** — present in `Login.jsx` but Supabase provider configuration is unconfirmed. If these providers are not wired in Supabase, the buttons will fail at runtime. A product decision is needed: gate them with an inline error, label them "coming soon," or remove until confirmed.
- **Draft Assistant "2025 Season" badge** — `DraftAssistant.jsx` hardcodes `"Free · 2025 Season"`. Should be `2026 Season` or removed entirely if the season label is not meaningful before live data ships.
- **MockBanner in Draft Assistant is always-on** — the banner shows regardless of `is_mock` value. There is no conditional path to remove it once live recommendations ship. Product decision needed: keep as a permanent preview disclaimer or wire to `result.is_mock`.
- **Trade Analyzer at `/trade` has no page heading** — when visited as a standalone page the form renders without an `h1`. Acceptable for embedded use, but thin as a product page. Minor, but visible.
- **ESPN connect UX copy** — ESPN is currently behind `VITE_ESPN_ENABLED=false`. If enabled, the connect card copy should frame ESPN as a manual/guided flow (user copies cookies) rather than suggesting a normal OAuth. Copy review needed before the flag is flipped.
- **Sleeper/ESPN Omen visual QA** — Codex has wired the live Omen path for Sleeper/ESPN in the backend finish pass. The frontend gate logic is already correct, but a real-account QA pass is needed to verify the full state flow end-to-end.

## Ordered Frontend Task List

1. Run a full browser QA pass across all eight routes and document which gate states were verified.
2. Make the product decision on Google/Apple/Discord login buttons (inline error, "coming soon" label, or remove).
3. Fix the `"2025 Season"` badge in `DraftAssistant.jsx` to `"2026 Season"`.
4. Make the product decision on the Draft Assistant MockBanner (permanent or conditional).
5. Add a page-level heading to Trade Analyzer for the `/trade` standalone route if it will be linked publicly.
6. Review ESPN connect card copy before enabling `VITE_ESPN_ENABLED=true`.
7. Perform Sleeper and ESPN Omen visual QA once Codex confirms the live backend path is staged.

## Claude Owns

- All frontend pages, routing, and component logic.
- Gate UI behavior from dashboard summary status.
- Mock/live labeling in Draft Assistant and Omen.
- Login UX copy and provider-button error handling.
- Account subscription section and Stripe return param handling.
- `ConnectLeague` platform onboarding UX.
- AppLayout shell for all public and protected routes.

## Codex Owns

- Backend API contracts, route truthfulness, and test coverage.
- Platform adapter correctness (Yahoo, Sleeper, ESPN roster normalization).
- Omen service truthfulness — no fake live advice from real calls.
- Stripe webhook backend behavior.
- `GET /api/dashboard/summary` gate logic and status values.
- Backend-to-frontend handoff documentation.

## Requires Justin Approval

- Enabling `VITE_ESPN_ENABLED=true` in production.
- Publicly claiming all-platform Omen is launch-ready before real-account browser QA.
- Social login provider decisions (Google, Apple, Discord).
- Any frontend deploy to production.
- Production Stripe or Supabase changes that affect frontend behavior.

## Must Not Be Touched Without Approval

- `.env`, API keys, secrets, or credential files.
- Backend source, database schema, auth logic, or payment logic.
- Production Stripe settings.
- Supabase production data or migrations.
- DNS, SSL, Nginx, Oracle service configuration.
- `Archive/quarantine`.

## Recommendation

Treat the Omen frontend as structurally complete and unblocked, not QA-verified. The next move is evidence collection: a full browser QA pass across all eight routes, a product decision on social login buttons and the MockBanner strategy, and visual confirmation of Sleeper/ESPN Omen once the backend live path is staged. These are short tasks, not rebuilds.
