# Omen — Product Roadmap

**Format:** Now / Next / Later
**Hard Deadline:** NFL Kickoff — September 10, 2026
**Weeks Remaining:** ~16 total / ~13 usable (buffer reserved for hardening + final deploy)
**Last Updated:** 2026-05-18 (Omen mock contract + live empty shell + Start/Sit signals local; 120 backend tests passing)
**Status key:** ✅ Done · 🔄 In Progress · ⚠️ Blocked · 🔲 Not Started

---

## Timeline Overview

| Phase | Window | Focus |
|---|---|---|
| **Now** | May 2026 | VORP v2 + Trade Analysis A+B, platform connections smoke test |
| **Next** | June–August 2026 | Intelligence Layer → MVP Move, Start/Sit, waiver wire |
| **Later** | August–September 2026 | Hardening, security, Stripe live, final deploy |
| **Hard stop** | September 10, 2026 | NFL Kickoff — must be live and stable |

---

## NOW — May 2026

*Goal: complete production deploy, wire all MVP Move intelligence signals, clean up technical debt.*

**Status: sessions 8–16 deployed to production. Session 17 Omen mock contract + live empty shell + Start/Sit signals are local and not yet merged/deployed. All four MVP Move signals live. 120 backend tests passing locally. GitHub Actions upgraded.**

---

### 20. VORP v2 + Trade Analysis A+B
**Status:** ✅ Deployed to production (PR #16, 2026-05-17)
**Owner:** Claude designs / Codex builds
**Effort:** 2–3 sessions
**Why it matters:** VORP is the mathematical core of Omen' differentiation claim: disciplined fantasy decisions from math, platform data, and clear reasoning. Trade Analyzer is free and always on, but its quality depends entirely on how well we model player value. The A+B model (win probability delta + positional scarcity) is the first defensible version.
**AAA check:** Calculations must be explainable (A1). No black-box recommendations.
**Depends on:** Yahoo adapter complete (done), normalized player shape (done)
**Done when:** `src/services/vorp.js` calculates positional VORP, `src/routes/trade.js` uses A+B model, values are unit-tested and defensible

**2026-05-15 note:** Local suite reports 88 passing / 0 failing. Trade Analyzer UI polish and scoring-format tests are included in the dirty working tree.

---

### 21. Platform connections — integration smoke test
**Status:** 🔄 Built locally; production exposure gated
**Owner:** Justin (manual) + Claude (review)
**Effort:** 30 min
**Why it matters:** Platform connection backend (Packet 2) and UI (Packet 3) are built and deployed. They need a real end-to-end smoke test: Yahoo OAuth flow, Sleeper username connect, ESPN cookie entry. Confirms the connection lifecycle works before we depend on it downstream.
**Done when:** At least one platform connected successfully by a real user (Justin), status reflected correctly in the UI

**2026-05-15 note:** ESPN user-facing form is now feature-flagged behind `VITE_ESPN_ENABLED === "true"` and must remain hidden until Claude/Justin approve the cookie flow.

---

### 22. Local security review fixes
**Status:** ✅ Deployed to production (PR #16, 2026-05-17)
**Scope shipped:** ESPN Vault-only roster route, ESPN UI feature flag, masked cookie inputs, Yahoo reconnect secret reuse, legacy v2 sanitized errors, requireAuth on all protected routes, DST scarcity threshold, Helmet CSP (Google Fonts + Supabase), ui-quality workflow path fix, 113 tests passing.

---

### 23. Omen brand + front-door polish review
**Status:** ✅ Landing migration complete (2026-05-17). Dark bg, Cormorant Garamond, gold accent, OmenCard (Example), honest CTAs. `client/` experiment absorbed into `frontend/src/pages/Landing.jsx`.
**Owner:** Justin decides / Claude reviews / Codex executes only after plan
**Effort:** 1 review session
**Direction:** Omen — See the winning move.
**Visual reference:** the local `client/` app on `localhost:3000` is stronger than the current canonical `frontend/` landing page and should guide the public website's look and feel.
**Constraint:** Do not rename repo, packages, domains, routes, database fields, env vars, or deploy config until a migration plan is approved.
**Accuracy constraint:** Do not copy claims from the `client/` prototype that are not production-true yet, such as live paid agents, proven results, or self-improving loop claims unless the implementation is actually ready.
**Done when:** Claude reviews the existing Omen UI/doc changes, separates safe visible-copy and visual design work from infrastructure migration, and authorizes the next Codex packet to make the canonical `frontend/` landing page presentation-worthy.

---

## NEXT — June / August 2026

*Goal: Build the Intelligence Layer — the reasoning engine that turns normalized data into actionable weekly recommendations.*

---

### 24. Intelligence Layer — MVP Move engine
**Status:** 🔄 All four external signals live and deployed (2026-05-17, sessions 8–15). Omen of the Week frontend-facing contract and live empty shell are ready locally (2026-05-18). Real roster-backed Omen personalization remains pending.
**Owner:** Claude designs / Codex builds / Hostinger Gemma reasons
**Supported move types:** lineup swap, waiver pickup, trade
**Depends on:** VORP v2 (item 20), all three platform adapters (done)
**Done when:** `GET /api/omen-of-the-week` returns a personalized ranked recommendation with reasoning, confidence score, and alternatives while preserving the Omen contract. Existing engine route remains `POST /api/optimizer/mvp-move`.

**2026-05-17 final signal status:**
- ✅ Weather: live via OpenWeatherMap (OPENWEATHER_API_KEY in Infisical) — dome-neutral
- ✅ Travel/Home-Away: live via ESPN scoreboard API + `nflStadiums.js`
- ✅ Game time/TV slate: live via ESPN scoreboard API (4-hour cache)
- ✅ Matchup DvP: live via nflverse-data GitHub releases CSV (MIT, no API key, 6-hour cache)
- ✅ Brand text: "SSFFMVP" → "Omen" in all agent prompts and inner-app copy
- ✅ 120 tests passing / 0 failing locally after Omen contract/live-shell and Start/Sit signal tests
- ✅ Graceful fallback on all signals — pipeline always produces a result
- ✅ Public mock preview: `GET /api/omen-of-the-week`
- ✅ Authenticated live empty shell: `GET /api/omen-of-the-week`
- 🔲 Real connected-roster Omen mapping pending
- 🔲 Sportradar upgrade path available post-budget approval (not launch-blocking)

---

### 25. Start/Sit endpoint with LLM reasoning
**Status:** ✅ Done
**Owner:** Codex builds / Hostinger Gemma narrates
**Effort:** 2 sessions
**Why it matters:** "Who do I start?" is the first question every user asks every week. If Omen answers correctly and explains why, it earns trust before the user has paid anything. This is the free-tier feature that drives word-of-mouth.
**Depends on:** VORP v2, normalized roster
**Done when:** Start/Sit endpoint returns ranked options with plain-English reasoning from Gemma

**Status note:** Backend signals + LLM fallback implemented in `startSit.js`. `signals` array (label/value/weight) returned on every response. `explanation` field populated by Gemma via Ollama with 8-second timeout graceful fallback. Frontend SignalsList added to ResultPanel.

---

### 26. Waiver wire optimization
**Status:** 🔲 Not Started
**Owner:** Codex
**Effort:** 2 sessions
**Why it matters:** The waiver wire is often where leagues are won. Available players are already fetched via `getAvailablePlayers()`. The optimization layer just needs to rank them against the user's roster by VORP delta.
**Depends on:** VORP v2, available players endpoint (done in yahoo.js)
**Done when:** Waiver endpoint returns top pickups ranked by positional need + projected impact

---

### 27. Dashboard polish — The Hall of Records
**Status:** 🔄 In Progress (Football.jsx + Trade Analyzer tab live, deeper views pending)
**Owner:** Codex
**Effort:** 2 sessions
**Scope:** Authenticated landing experience shows: connected platforms, roster overview, Start/Sit recommendations, trade analyzer access. Must feel clean, fast, and intentional (A3 — Aesthetic Integrity).
**Depends on:** Items 22–23 (decision engine + Start/Sit)
**Done when:** Authenticated user sees their roster from a connected platform, gets a weekly recommendation, can access trade analyzer. Meets AAA standard.

**2026-05-18 note:** Football.jsx renamed to Hall of Records. Omen of the Week added as primary tab. PlatformStatusBar live and reads Sleeper username from platform status. 3-state Omen handling implemented: `needs_platform_connection`, `live_pending` (connected but engine not yet personalized), and `empty` (no data). Omen UI state bug fixed in Session 18.

---

## LATER — August / September 2026

*Goal: Harden everything, validate security, swap to live keys, ship.*

---

### 13. Rate limiting + input validation
**Status:** ✅ Done (deployed PR #16, 2026-05-17)
**Scope shipped:** `generalRateLimit` (100 req/min) and `authRateLimit` (20 req/10min) active in `src/middleware/security.js`. All optimizer routes validate week bounds 1–18. Legacy v2 routes sanitize error messages.

---

### 14. Logging — Winston / Morgan
**Status:** ✅ Done
**Notes:** Structured JSON logging via `src/middleware/logging.js` is in production.

---

### 15. Security hardening — Zero Trust pass
**Status:** ✅ Done (deployed PR #16, 2026-05-17)
**Scope shipped:** Helmet CSP (Google Fonts, Supabase, no unsafe-eval), CORS default-deny, ESPN cookies Vault-only (no query param leakage), requireAuth on all protected routes, npm audit 0 findings, Yahoo reconnect secret reuse.
**Remaining:** ESPN cookie handling policy disclosure before enabling `VITE_ESPN_ENABLED` in production. Supabase RLS policy audit deferred.

---

### 16. Saddlebag free tier enforcement
**Status:** 🔲 Not Started
**Effort:** 1 session
**Scope:** Free tier = 10 trade comparisons/day per user. Enforce at API layer via Supabase usage tracking. Gate must be invisible until limit hit. Pricing copy already live on landing page — backend must match.

---

### 17. Stripe live key swap + payment flow validation
**Status:** 🔲 Not Started
**Effort:** 1 session — **requires Justin explicit approval per runbook**
**Scope:** Replace test Stripe keys with live keys in production. Validate subscription webhook, payment confirmation, and access gating end-to-end. Do not touch Stripe config without Justin sign-off.

---

### 18. Load testing + performance validation
**Status:** 🔲 Not Started
**Effort:** 1 session
**Scope:** Simulate season-opening traffic spike. Validate Oracle Cloud VPS capacity. Identify bottlenecks before they become incidents on opening weekend.

---

### 19. Final deploy + DNS / SSL validation
**Status:** 🔲 Not Started
**Effort:** 1 session
**Scope:** Full production deploy with deploy.yml pipeline. Nginx config, Certbot SSL renewal check, domain routing verified. slopssaloon.com must return 200, load under 2s, and pass basic functionality smoke test.
**Blocked by:** All items above
**Done when:** slopssaloon.com is live, stable, monitored, and ready for real users on September 10, 2026.

---

## Completed Work — Sessions 1–7

The following items were completed before the current sprint. Preserved here for traceability.

| Item | Description | Session | Commit range |
|---|---|---|---|
| 1 | Header.jsx route fix + frontend housekeeping | 1–2 | f81d6c7–c80c710 |
| 2 | Frontend/ replaces client/, wired to production via Nginx | 3–4 | c13a995 |
| 3 | Trade analyzer code review + commit (routes/trade.js, tradeValue.js) | 3 | c13a995 |
| 4 | deploy.yml + oracle-https-setup.sh sign-off and commit | 2 | — |
| 5 | brand_voice.md created | 2 | — |
| 6 | Infisical CI/CD integration, no .env on server | 4 | c030cb2 |
| 7 | LLM service (llm.js) wired to Ollama on Hostinger, graceful fallback | 4 | c13a995 |
| 8 | Supabase auth integrated into frontend | 3 | c13a995 |
| A | Yahoo OAuth replacement (ADR-004): axios replaces passport-yahoo-oauth2 | 5–6 | feat/platform-adapters |
| B | npm audit gate: 0 findings (48 packages removed, entire request chain gone) | 6 | feat/platform-adapters |
| C | Sleeper platform adapter (21 tests ✅) | 5 | feat/platform-adapters |
| D | ESPN platform adapter (7 tests ✅) + Vault-encrypted SWID | 5–6 | feat/platform-adapters |
| E | Platform connection backend API (/api/platforms/*) | 6 | feat/platform-adapters |
| F | Platform connection frontend UI (PlatformConnections.jsx, Account.jsx) | 6 | feat/platform-adapters |
| G | Yahoo adapter normalization — matches Sleeper/ESPN contract, player_key prefixed | 7 | feat/yahoo-adapter |
| H | platform_connections Supabase migration: UNIQUE(user_id, platform), swid_secret_id | 6 | feat/platform-adapters |

---

## Platform Adapter Status

| Platform | Adapter | Auth | Tests | Deployed |
|---|---|---|---|---|
| Yahoo | `src/adapters/yahoo.js` | OAuth 2.0 via yahooOAuth.js | ✅ | ✅ |
| Sleeper | `src/adapters/sleeper.js` | Username (no auth) | 21 ✅ | ✅ |
| ESPN | `src/adapters/espn.js` | Cookie (Vault-encrypted) | 7 ✅ | ✅ |

All three adapters produce identical normalized roster and player shapes. Downstream services are platform-agnostic.

---

## Risks and Dependencies

| Risk | Severity | Status |
|---|---|---|
| npm audit vulnerabilities blocking deploy | High | ✅ Resolved — 0 findings |
| Yahoo OAuth dependency on abandoned `request` package | High | ✅ Resolved — ADR-004 |
| ESPN cookie handling security | High | Mitigated — Vault-encrypted, no logging, no plaintext storage |
| VORP accuracy not defensible | Medium | Pending — document assumptions explicitly; frame as "model" not "oracle" |
| September deadline creates quality compromise pressure | High | Enforce AAA Framework strictly. Hide incomplete features — never ship partial |
| Oracle VPS insufficient for season load | Medium | Load test in item 18, upgrade plan ready if needed |

---

## Capacity Notes

One solo builder (Justin) + AI agents (Claude, Codex, Gemma on Hostinger).

Estimated usable sessions: ~28–32 sessions over 14 weeks (2–3 sessions/week).

Allocation:
- **Now phase:** ~4 sessions remaining
- **Next phase:** ~16 sessions (Intelligence Layer is the heaviest lift)
- **Later phase:** ~8 sessions

If capacity tightens, cut in this order:
1. Waiver optimization (Start/Sit is the MVP — Waiver is nice-to-have for v1)
2. Saddlebag enforcement (free tier can be honor-system for beta)
3. Load testing (reduce scope, not eliminate)

**Never cut:** Security hardening, VORP, Start/Sit, Stripe validation, ESPN security audit.

---

## What Comes Off When Something Is Added

Any new feature request must identify what it displaces. The roadmap is zero-sum against capacity. Bring additions to Claude for a routing plan before Codex touches anything.

---

## Session History

| Date | Milestone |
|---|---|
| 2026-05-09 | Session 1: AI OS established, runbook created, recon complete, TODO.md created, brand review completed, 2 frontend commits landed, roadmap created |
| 2026-05-10 | Session 2: Frontend wired to production, Infisical CI/CD, manual VPS deploy (c13a995), LLM service wired |
| 2026-05-11 | Session 3–4: Trade Analyzer launched, Supabase auth, freemium model ADR-003, SLOPS OS folder reorganized |
| 2026-05-12 | Session 5–6: Yahoo OAuth replacement (ADR-004), npm audit cleared (0 findings), all 3 platform adapters built, platform connection backend + frontend UI, Supabase migration applied |
| 2026-05-13 | Session 7: Yahoo adapter normalized to match platform contract, feat/yahoo-adapter deployed, Workflows folder created, .md files updated |
| 2026-05-15 | Session 8a: Full project review — 88 tests passing, external API integration plan designed, OpenWeatherMap key added to Infisical |
| 2026-05-16 | Session 8b: External API integration complete — nflStadiums.js, nflSchedule.js (ESPN public API), weatherService.js (OWM), agents.js stubs replaced, 99 tests passing / 0 failing |
| 2026-05-18 | Session 18: Omen UI state bug fixed (3-state handling), Start/Sit signals displayed, PlatformStatusBar Sleeper username, live Omen engine + waiver wire Codex specs written, 120 tests |
