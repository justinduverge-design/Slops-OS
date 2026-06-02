# Codex Prompt — Post-Deploy Context Update (All Three Layers)
## Prompt for: Codex
## Skill: slops-context-markdown
## Operation type: Markdown update only — no code, no secrets, no deploy
## Date: 2026-05-24
## Layers: 0-OS SLOPS · 1-Slops Saloon · 2-Corvus

---

## What Happened (Ground Truth)

As of 2026-05-24, Corvus is live on Oracle. Here is the complete factual record:

- Omen canonical path migration complete — `OmenOfTheWeek.jsx` calls `POST /api/omen/mvp-move` ✅
- npm audit fix — 0 vulnerabilities, 175/175 tests pass ✅
- npm 10 lockfile regenerated for Docker compatibility (`b444e01`) ✅
- Doc pass complete — agent files, redirect stubs, archive cleanup, context normalization ✅
- Stripe live keys validated — `sk_live_*`, `whsec_*`, both price IDs resolve in live account ✅
  - Monthly: $9.00 | Season: $49.00/year
- Docker build clean — both `api` and `cron` images built successfully ✅
- Oracle deploy complete — GitHub Actions green, containers healthy ✅
  - `slops-saloon_api` — Up, healthy
  - `slops-saloon_cron` — Up
  - `GET /api/health` → `{"status":"ok"}`
- SLOPS root initial commit — 270 files on master (`1c86e32`) ✅
- slops-saloon main synced with origin/main — clean tree ✅

**Remaining post-deploy tasks:**
- Load test `POST /api/omen/mvp-move` and `POST /api/trade/compare` under concurrent users
- Register Stripe webhook endpoint in Stripe Dashboard:
  - URL: `https://slopssaloon.com/api/stripe/webhook`
  - Events: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`

---

## Scope Constraints

- Edit markdown files only
- Do NOT touch `.env`, secrets, Infisical, source code, Docker, SQL, or deployment files
- Do NOT move or delete files
- Do NOT push or commit — report all changes made; Justin will commit
- Do NOT edit `Archive/`, `_imported/`, `Blueprints/prompts/manager_agent.md`, or `sub_agents.md`
- Do NOT modify the Guardrails sections of any file
- Stop and report if a file is missing or its content differs significantly from what is described below

---

## Layer 1 — Slops Saloon

### File 1: `Direction/current_sprint.md`

Rewrite the entire file. Replace with:

```markdown
# Slops Saloon Current Sprint

**Last updated**: 2026-05-24

## Focus

Corvus is deployed and live on Oracle. Post-deploy verification in progress.

## Completed

- Trade Analyzer — live, tested ✅
- Start/Sit with LLM reasoning — live, tested ✅
- Waiver wire optimizer — live, tested ✅
- Platform adapters (Yahoo, Sleeper, ESPN) — live, tested ✅
- Platform connection UI — live, tested ✅
- Supabase auth + Vault encryption — live ✅
- Structured logging — live ✅
- Security middleware (helmet, rate limiting) — live ✅
- ESPN recovery Account page — all 8 states verified ✅
- Matchup DvP — live via nflverse-data ✅
- LLM reasoning — live via Gemma/Ollama in POST /api/omen/mvp-move ✅
- SLOPS OS DBS migration — all phases (1–6) complete ✅
- Omen canonical path migration — OmenOfTheWeek.jsx → POST /api/omen/mvp-move ✅
- npm audit fix — 0 vulnerabilities, 175/175 tests pass ✅
- npm 10 lockfile fix — Docker build compatible ✅
- Stale doc cleanup — agent files, redirect stubs, archive ops, context normalization ✅
- Stripe live key validation — sk_live_*, both price IDs confirmed in live account ✅
- Docker prove-out — both images build clean ✅
- Oracle deploy — Corvus live at slopssaloon.com, containers healthy ✅

## Post-Deploy Remaining

| Priority | Task | Notes |
|----------|------|-------|
| 🔴 1 | Stripe webhook registration | Stripe Dashboard → add endpoint `https://slopssaloon.com/api/stripe/webhook` with 3 events |
| 🟡 2 | Load test | POST /api/omen/mvp-move and POST /api/trade/compare under concurrent users |

## Git State

- slops-saloon: clean, synced with origin/main
- SLOPS root: initial commit on master (1c86e32, 270 files)

## Guardrails

No deploys, production changes, secrets work, or app behavior changes without explicit Justin approval.
```

---

### File 2: `Direction/roadmap.md`

Rewrite the entire file. Replace with:

```markdown
# Slops Saloon Roadmap

**Last updated**: 2026-05-24

## Now — Post-Deploy

Corvus is live on Oracle. Two tasks remain before launch is fully stable:

- Stripe webhook registration (Stripe Dashboard — not a code change)
- Load test: POST /api/omen/mvp-move and POST /api/trade/compare

## Next — Post-Launch Polish

- optimizer/omen tier merge decision: Does POST /api/optimizer/mvp-move merge into
  POST /api/omen/mvp-move as a Pro enrichment tier, or stay as a separate route?
- Hall of Records dashboard polish
- Draft Assistant season content
- Recovery analytics shipping gate decision
- Retire or keep getOmenOfTheWeekMock() in systemContracts.js

## Later — Expansion

Return to platform breadth and feature depth only after post-launch polish is stable
and Justin explicitly approves the next scope.

## Scope Boundary

Do not expand into unrelated sports, media, finance, family, or broad agent products
unless Justin explicitly reactivates that scope.
```

---

### File 3: `Direction/decision_log.md`

Read the file first. Append a new section at the end:

```markdown
## Decisions Added 2026-05-24 (Deploy)

- **Oracle deploy complete**: Corvus live at slopssaloon.com as of 2026-05-24.
  Both slops-saloon_api and slops-saloon_cron containers healthy. GitHub Actions pipeline green.

- **npm 10 lockfile**: Local npm 11 generated a lockfile Docker's npm 10 rejected.
  Regenerated using `npx npm@10 ci --frozen-lockfile`. Committed as b444e01.
  Future: pin npm version in CI to match local dev environment.

- **Stripe prices confirmed live**:
  - Monthly plan: $9.00 one-time (price_1TSmrS...) — mode: subscription in checkout
  - Season plan: $49.00/year (price_1TSmrr...) — mode: payment in checkout
  - Price type vs. checkout mode mismatch was identified and resolved by Justin.

- **Stripe webhook pending**: Webhook endpoint not yet registered in Stripe Dashboard.
  Must be registered at https://slopssaloon.com/api/stripe/webhook before Pro
  subscriptions are fully functional (activate on checkout, deactivate on cancel/failure).

- **APP_BASE_URL**: Was missing from production env. Added to docker-compose.yml and
  Infisical. Committed as 8ce92e2. Required for Stripe success/cancel redirect URLs.
```

---

## Layer 2 — Corvus

### File 4: `Corvus/Direction/current_sprint.md`

Rewrite the entire file. Replace with:

```markdown
# Corvus Current Sprint

**Last updated**: 2026-05-24

## Focus

Corvus is deployed and live on Oracle at slopssaloon.com.

Post-deploy tasks: Stripe webhook registration and load test.

## What Is Live

| Item | Status |
|------|--------|
| Trade Analyzer | ✅ Live, tested |
| Draft Assistant | ✅ Live |
| Start/Sit with LLM reasoning | ✅ Live, tested |
| Waiver wire optimizer | ✅ Live, tested |
| Platform adapters (Yahoo, Sleeper, ESPN) | ✅ Live, tested |
| Platform connection UI | ✅ Live, tested |
| Supabase auth + Vault encryption | ✅ Live |
| Structured logging | ✅ Live |
| Security middleware (helmet, rate limiting) | ✅ Live |
| ESPN recovery Account page | ✅ Complete — all 8 states verified |
| Matchup DvP via nflverse-data | ✅ Live |
| LLM reasoning via Gemma/Ollama | ✅ Live — POST /api/omen/mvp-move |
| Omen canonical path | ✅ OmenOfTheWeek.jsx → POST /api/omen/mvp-move |
| npm audit | ✅ 0 vulnerabilities, 175/175 tests pass |
| Docker build on Oracle | ✅ Both images clean |
| Stripe live keys | ✅ Validated — sk_live_*, both price IDs confirmed |
| Oracle deploy | ✅ Live, containers healthy |
| Stripe webhook registered | 🔴 Not yet — requires Stripe Dashboard action |
| Load test | 🟡 Post-deploy — not yet run |

## Post-Deploy Remaining

1. **Stripe webhook** — register `https://slopssaloon.com/api/stripe/webhook` in
   Stripe Dashboard with events: `checkout.session.completed`,
   `customer.subscription.deleted`, `invoice.payment_failed`.
   Without this, Pro subscriptions activate on checkout but cancellations and
   payment failures are not caught.

2. **Load test** — verify POST /api/omen/mvp-move and POST /api/trade/compare
   hold up under concurrent users before publicizing the site.

## Guardrails

- Keep Start/Sit and waiver logic inside Omen / MVP Move.
- Treat ESPN as essential but fragile.
- Route ESPN recovery through Account with safe state/query context only.
- Do not auto-rerun Omen after recovery — require user click.
- Keep Yahoo and Sleeper in scope.
- Prefer plain-English reasoning over visible math.
- No deploys, production changes, or secrets work without explicit Justin approval.
```

---

### File 5: `Corvus/Direction/roadmap.md`

Rewrite the entire file. Replace with:

```markdown
# Corvus Roadmap

**Last updated**: 2026-05-24

## What Is Live

All core features built, tested (175/175), and deployed to slopssaloon.com on Oracle:

- Trade Analyzer ✅
- Draft Assistant ✅
- Omen of the Week / MVP Move — canonical path (`POST /api/omen/mvp-move`) ✅
- Start/Sit inside Omen ✅
- Waiver logic inside Omen ✅
- Platform adapters: Yahoo, Sleeper, ESPN ✅
- ESPN recovery Account page — all 8 states verified ✅
- Matchup DvP via nflverse-data ✅
- LLM reasoning via Gemma/Ollama ✅
- Supabase auth + Vault encryption ✅
- Stripe backend — live keys validated, webhook registration pending

## Now — Post-Deploy

| Item | Status |
|------|--------|
| Stripe webhook registration | 🔴 Stripe Dashboard action — not a code change |
| Load test (omen + trade under concurrent users) | 🟡 Not yet run |

## Next — Post-Launch Polish

- **optimizer/omen tier merge**: Decide whether `POST /api/optimizer/mvp-move`
  (Pro six-agent pipeline: Manager + Weather/Injury/Matchup/Trend/Vegas/News)
  merges into `POST /api/omen/mvp-move` as a tier enrichment layer, or stays
  as a separate route. Deferred to post-launch.
- Hall of Records dashboard polish
- Draft Assistant season content
- Recovery analytics shipping gate decision
- `getOmenOfTheWeekMock()` in systemContracts.js — retire or keep as fallback

## Later — Expansion

Platform breadth and feature depth after post-launch polish is stable.

## Guardrails

- No deploys, production changes, or secrets work without explicit Justin approval.
- ESPN is essential but fragile — treat recovery flows as production-critical.
- Keep Start/Sit and waiver logic inside Omen / MVP Move.
- Plain-English reasoning over visible math.
```

---

### File 6: `Corvus/Direction/decision_log.md`

Read the file first. Append a new section at the end:

```markdown
## Decisions Added 2026-05-24 (Deploy)

- **Corvus deployed**: Live at slopssaloon.com on Oracle VPS as of 2026-05-24.
  Both API and cron containers healthy. GitHub Actions pipeline green.
  GET /api/health → {"status":"ok"}.

- **Stripe price confirmation**: Monthly $9.00, Season $49.00/year. Both price IDs
  resolve in the live Stripe account. Checkout mode mismatch was identified and
  resolved before going live.

- **Stripe webhook not yet registered**: Known gap. Subscriptions will activate on
  checkout but cancellation and payment failure events won't be handled until the
  webhook is registered in Stripe Dashboard.

- **npm 10 lockfile**: Docker build requires npm 10. Local dev used npm 11.
  Regenerated lockfile with npm 10 — canonical going forward.
  Consider pinning npm version in CI.

- **APP_BASE_URL now in docker-compose.yml**: Was absent from compose env passthrough.
  Added in 8ce92e2. Required for Stripe redirect URLs and any future URL-generation logic.
```

---

## Completion Checklist

- [ ] `slops-saloon/Direction/current_sprint.md` — rewritten as "Slops Saloon Current Sprint", deploy complete reflected
- [ ] `slops-saloon/Direction/roadmap.md` — rewritten as "Slops Saloon Roadmap", post-deploy framing
- [ ] `slops-saloon/Direction/decision_log.md` — deploy decisions appended
- [ ] `Corvus/Direction/current_sprint.md` — rewritten, all items updated
- [ ] `Corvus/Direction/roadmap.md` — rewritten, Now/Next/Later updated
- [ ] `Corvus/Direction/decision_log.md` — deploy decisions appended
- [ ] No source code, secrets, or deployment files touched
- [ ] Report all files modified

---

## Do NOT

- Do not edit source code, routes, services, tests, or frontend files
- Do not touch `.env`, Infisical, Docker, SQL, or deployment config
- Do not edit `Blueprints/prompts/manager_agent.md` or `sub_agents.md`
- Do not delete or archive any file
- Do not push or commit — Justin review