# Omen Project Context

This file is the active source of truth for the current state of Omen.

All agents must read this file before planning, executing, or reviewing work.

---

## Current Verified State

**Last updated:** 2026-05-18 (Session 18 complete)

The canonical app repo is:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

**Test count:** 120 passing / 0 failing

**Production deploy history:**

- **PR #16** (`feat/session-8-10`) merged 2026-05-17. SHA: `6d505917`. Sessions 8–10: external API, security hardening, brand/bug fixes, Helmet CSP.
- **PR #17** (`chore/node24-actions`) merged 2026-05-17. SHA: `6ccb971`. GitHub Actions upgraded: `docker/setup-buildx-action@v4`, `docker/login-action@v4`, `docker/build-push-action@v6`, `node-version: '22'`. Deploy run: 25994031933. Health: `{"status":"ok"}`.
- **PR #18** (`feat/session-15-matchup-dvp`) merged 2026-05-17. SHA: `291c914`. Matchup DvP live via nflverse-data. Deploy run: 25994062638. Health: `{"status":"ok"}`.
- **PR #19** (`feat/title-espn-enable`) merged 2026-05-17. Session 16: `<title>Omen</title>`, ESPN storage disclosure, `VITE_ESPN_ENABLED` wired through Dockerfile `ARG/ENV` and `deploy.yml` build-args. ESPN card remains hidden until `VITE_ESPN_ENABLED=true` is set as a GitHub Actions repository secret.
- **Session 18 in progress:** Omen UI states, Start/Sit signals, docs sync. No PR opened yet.

**Current production HEAD:** sessions 8–16. All four MVP Move signals live. 119 tests. Title tag `<title>Omen</title>`. VITE_ESPN_ENABLED wired. Remote branches: `origin/main` only.

**To enable ESPN for all users:** Add `VITE_ESPN_ENABLED=true` as a GitHub Actions repository secret at https://github.com/justinduverge-design/SlopsSaloon-Fantasy-Football-MVP/settings/secrets/actions and trigger a redeploy.

**Production verified live at `slopssaloon.com` (2026-05-17 post PR #18):**
  - Health: `{"status":"ok","service":"ssffmvp-api","uptime":44.829567421}`
  - All four protected routes return `401 Missing bearer token`
  - Helmet CSP active: Google Fonts, Supabase `*.supabase.co`, no `unsafe-eval`
  - Browser check: Omen landing page loads, no console errors

The working tree is dirty and must be reviewed before any production move. It contains:

- **Session 18 frontend changes (2026-05-18):** Omen of the Week 3-state UI handling (`needs_platform_connection`, `live_pending`, `empty`), Start/Sit SignalsList added to ResultPanel, PlatformStatusBar wired to show Sleeper username, Omen UI state bug fixed.
- frontend layout and UI polish fixes
- local Antigravity/Omen brand experiment files under `client/` and frontend config
- **External API integration for MVP Move (session 8, 2026-05-16):**
  - `src/data/nflStadiums.js` — all 32 team stadium coordinates + dome flags (new)
  - `src/services/nflSchedule.js` — ESPN public scoreboard API, 4-hour cache (new)
  - `src/services/weatherService.js` — OpenWeatherMap /forecast API, 6-hour cache (new)
  - `src/services/agents.js` — 3 of 4 stubs replaced with real async data; all prompts renamed to Omen (modified)
  - `src/config/index.js` — `openWeatherApiKey` optional env var added (modified)
  - `test/nflSchedule.test.js` — 4 new tests (new)
  - `test/weatherService.test.js` — 3 new tests (new)
- **Brand text and backend bug fixes (session 9, 2026-05-16):**
  - `src/services/agents.js` — 6 SUB_AGENT_PROMPTS + manager fallback renamed SSFFMVP → Omen
  - `src/services/tradeValue.js` — imports `normalizePosition` from vorp.js, removes local duplicate
  - `src/services/vorp.js` — exports `normalizePosition` as canonical; adds DST scarcity threshold
  - `src/routes/optimizer.js` — `parseWeek` sentinel added; all three routes reject week outside 1–18
  - `frontend/src/components/layout/Footer.jsx` — "Slops OS" → "Slops Saloon. All rights reserved."
  - `frontend/src/components/layout/Header.jsx`, `pages/Football.jsx`, `pages/NotFound.jsx`, `components/platforms/PlatformConnections.jsx` — inner-app brand copy cleaned
  - `test/tradeValue.test.js` — DST alias normalization coverage added
  - `test/optimizerRoute.test.js` — week bounds rejection test added
- **Security hardening and weather accuracy (session 10, 2026-05-16):**
  - `src/ssffmvp_api_v2.js` — `requireAuth` added to 4 legacy routes; caller-supplied userId eliminated
  - `src/routes/espn.js` — ESPN cookies now pulled from Supabase Vault only (not query params)
  - `src/services/yahooAuth.js` — reuses existing Vault secrets on Yahoo reconnect
  - `src/middleware/security.js` — Helmet CSP re-enabled
  - `.github/workflows/ui-quality.yml` — dead `src/frontend` path removed
  - `src/services/weatherService.js` — switched from `/weather` to `/forecast` endpoint; `precip_chance` now reads real `pop` value (was always 0)
  - `test/ssffmvpApiV2.test.js` — 5 new auth-boundary tests (new)

**MVP Move external data status (as of 2026-05-17 — all signals live in production):**

| Signal | Source | Status |
|---|---|---|
| Weather | OpenWeatherMap (key in Infisical) | **Live** — dome games return weather-neutral |
| Travel / Home-Away | ESPN scoreboard API + `nflStadiums.js` distance lookup | **Live** |
| Game time / TV slate | ESPN scoreboard API | **Live** |
| Matchup DvP | nflverse-data GitHub releases CSV (MIT, no API key) | **Live** — PR #18 deployed |

All four MVP Move external signals are live in production. During offseason, ESPN returns no events and DvP sample falls below threshold; all signals fall back gracefully. Pipeline always produces a result. Sportradar is the paid upgrade path post-budget approval.

**Landing page visual migration status (confirmed 2026-05-16):**

The `client/` experiment directory no longer exists in the repo. The premium dark Omen visual language has been absorbed directly into `frontend/src/pages/Landing.jsx`. The canonical landing page already has:

- `#050505` dark background with gold (`#C9A44C`) Omen accent
- Cormorant Garamond serif headline (`CORVUS` in large tracked letters)
- "Deus pascit corvos" tagline
- Accurate "Coming Soon" positioning — no false live-feature claims
- OmenCard (labeled "Example") — honest product preview
- "Notify Me" → `mailto:hello@slopssaloon.com` — simple, truthful CTA
- Alegreya Sans body font; Cormorant Garamond headings via tailwind.config.js

The `tailwind.config.js` still defines `slops.*` color tokens (vestigial — not used in Landing.jsx). Rename in a future brand/naming cleanup pass, not during launch execution.

**The landing-page migration decision is resolved.** The canonical `frontend/` already looks like the `localhost:3000` prototype. No separate migration PR needed.

Claude must review the full diff before authorizing merge or deploy.

---

## Brand Architecture

Slops Saloon is the parent company, mission, and long-term product studio.

Omen is the first flagship product inside the Slops Saloon ecosystem.

Omen product line:

> Omen — See the winning move.

Justin has approved Omen as the fantasy football product name.

Slops Saloon is not a former name. It remains the umbrella brand and parent domain. Do not rename repositories, routes, domains, packages, environment variables, database objects, or deployment config without a separate approved migration plan.

---

## Active Product

Omen is a fantasy football decision layer.

It helps users make sharper weekly roster decisions across major fantasy football platforms.

Omen is not a chatbot.

Omen is not a generic league-hosting platform at launch.

Omen sits above existing fantasy platforms and helps users act with better information.

---

## Rebrand Status

Omen is the active fantasy football product name as of 2026-05-15.

Slops Saloon remains the parent company/site and current production domain.

The product architecture update must not interrupt launch execution or security hardening.

Brand migration notes belong in `brand/rebrand_notes.md`.

The product standard does not change.

---

## Product Doctrine

### Omen does not promise outcomes

Sports are unpredictable.

Omen does not promise guaranteed wins, guaranteed trades, guaranteed projections, or certainty.

Omen promises disciplined decision support: real data, structured analysis, clear recommendations, and honest explanation.

### Omen is not a chatbot

Ask Slops has been removed from the product permanently.

The LLM is backend-only.

Users do not type prompts to the model.

The model narrates deterministic football math. It does not replace product logic or interface design.

### Trade Analyzer is always free

Trade Analyzer remains free.

No authentication is required.

It exists to build trust, spread naturally, and demonstrate the Omen decision standard.

Trade Analyzer answers:

> Is this trade fair or useful?

### MVP Move is the paid centerpiece

MVP Move is the core paid feature.

It surfaces the single best action a user can take for their team this week.

Supported move types:

- lineup swap
- waiver pickup
- trade

MVP Move answers:

> Is this the best move for my actual team, in my actual league, this week?

---

## Launch Platform Requirement

MVP Move cannot launch as a paid product until the full launch platform set is supported.

Launch platform set:

- Yahoo
- Sleeper
- ESPN

Paid users should not receive a partial product.

All launch platforms must feed the same normalized decision system.

ESPN is launch-critical and security-critical because it requires cookie-based access.

---

## Platform Strategy

Launch platforms:

- Yahoo
- Sleeper
- ESPN

Post-launch platforms:

- Fantrax
- NFL Fantasy

"Sack the market" means entering the market from an unexpected angle and winning through better execution.

Omen does not win by becoming every platform.

Omen wins by becoming the best decision layer across every platform.

---

## Core Architecture

### Platform adapter pattern

Each platform adapter must produce the same normalized roster and player shapes.

Downstream services should not know whether data came from Yahoo, Sleeper, ESPN, or any future platform.

Platforms are inputs.

Omen owns the decision system.

### Normalized roster shape

```js
{
  week,
  league_key,
  team_key,
  slots: {
    starters,
    bench,
    ir
  },
  source
}
```

### Normalized player shape

```js
{
  player_key,        // prefixed: "yahoo:{id}", "sleeper:{id}", "espn:{id}"
  player_id,
  name,
  position,
  eligible_positions,
  selected_position,
  team,
  opponent,
  status,
  projected_points,
  actual_points,
  image_url,
  is_starter,
  yahoo_id,          // cross-platform IDs — null if not the source platform
  espn_id,
  gsis_id
}
```

---

## Current Constraints

- No placeholder features ship.
- No user-facing Ask Slops feature returns.
- No paid dependency is added without Justin approval.
- ESPN cookie handling requires security review before production use.
- Auth, payments, secrets, cookies, deployment, and production infrastructure require explicit approval.
- Documentation must be direct, institutional, human, serious, and unpadded.

---

## Active Infrastructure Notes

- `slopssaloon.com` is production-facing and live.
- Oracle VPS hosts the public app under the former Slops Saloon branding (current HEAD: feat/yahoo-adapter, deployed 2026-05-13).
- GitHub Actions deployment is active. Do not change without explicit approval.
- Docker is in production. API container runs healthy.
- Infisical is used for production secret injection — no `.env` on the server.
- Supabase: `xyudxfhqejbwvjngiwhw` — platform_connections table live, UNIQUE(user_id, platform) constraint active, SWID via Vault.
- Upstash Redis: active for roster caching (5-min TTL, cache key scoped to teamKey).
- npm audit: 0 findings as of 2026-05-14 after promptfoo pin/tooling cleanup.
- All three platform adapters (Yahoo, Sleeper, ESPN) are in production and produce identical normalized output.
- Local app security hardening is ahead of production and pending Claude review: ESPN UI feature flag, ESPN route Vault-only credential lookup, sanitized legacy v2 route errors, Yahoo reconnect secret reuse, MVP Move scoringFormat/record validation, Helmet CSP.

---

## Current Launch Direction

The launch path is MVP Move.

**Current active priority:** Four-commit grouping of the dirty worktree onto a feature branch, followed by PR and browser QA. All code changes are reviewed and approved. The landing-page visual migration is the next design decision after the PR is open.

Platform adapters are complete. Start/Sit, VORP v2, Trade Analyzer polish, and security hardening are built locally and verified, but not production-deployed from this working tree.

The next work must protect:

- VORP accuracy and defensibility (A1 — no guessy behavior)
- ESPN cookie security (never logged, never stored plaintext, Vault-only)
- LLM reasoning quality (narrates math, never invents facts)
- paid launch completeness (all three platforms must feed the same decision system)
- privacy and user trust

No roadmap drift should interrupt the launch path.
