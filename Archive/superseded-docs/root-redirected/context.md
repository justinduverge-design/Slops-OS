# Omen Project Context

This file is the active source of truth for Omen.

All agents must read this file before planning, executing, or reviewing work.

---

## Current Mission

Omen is the active product and the main build focus.

The immediate priority is integrating and polishing the app backbone and app UI foundation so the team can build polished fantasy football tools on top of a stable, reusable product experience.

Omen must keep backbone stability ahead of feature expansion. Draft Assistant is the first-impression tool and will be free this year only, but it must be built on reusable Omen patterns. MVP Move / Omen of the Week remains the paid centerpiece and should use the same foundation.

---

## Current Build State - 2026-05-18

The Omen app backbone is implemented locally and is ready for polish/integration work.

Completed locally:

- `GET /api/session` session shell contract.
- `GET /api/dashboard/summary` authenticated dashboard/tool availability contract.
- `POST /api/draft-assistant/recommendations` mock Draft Assistant contract.
- `GET /api/optimizer/waiver` platform-centric Waiver Wire contract.
- `.env.example` documents `VITE_ESPN_ENABLED`.
- Claude Code wired the frontend to the session, dashboard summary, and Draft Assistant endpoints.
- Trade Analyzer and Start/Sit now use shared error/empty states.
- Omen UI handles nullable live Yahoo delta values.
- Mobile tab navigation and first-screen sizing received initial cleanup.

Verification state:

- Backend `npm test` last passed with 139 tests / 0 failures.
- Frontend `npm run build` last passed after Claude Code's 3A/3B/3C wiring.
- Current state is local dirty worktree only unless Justin explicitly confirms merge/deploy.

Active phase:

Phase 4 - live Omen polish and platform reconnection flow.

Next backend/frontend integration targets:

- Update `WaiverWire.jsx` to use `GET /api/optimizer/waiver` without a platform selector or `platform` query param.
- Add live Omen attribution such as `Live · Yahoo` when `mode === "live"` and `is_mock === false`.
- Add platform token-expired/re-auth recovery UI for Yahoo refresh failures.
- Evaluate whether the landing page should move from "Coming Soon" toward a live auth CTA.
- Fix the Start/Sit signal-weight display assumption: backend returns `high | medium | low`, not a numeric weight.

---

## Canonical App Repo

```text
C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp
```

Treat `SLOPS/` as the command center.

Treat `SLOPS/ssffmvp/` as the canonical app repo.

Do not use duplicate project folders unless Justin explicitly confirms a migration.

---

## Product Priority Order

### 0. App Backbone

Build and stabilize the shared foundation:

- routing
- authentication/session flow
- dashboard shell
- API contracts
- platform connection flow
- platform status contract
- reusable layout patterns
- reusable app UI components
- clear navigation
- loading/error/empty states
- environment safety
- deployment stability

### 1. Draft Assistant

Draft Assistant is the first-impression tool.

It is free this year only.

It must be polished, useful, and easy to understand.

It must use reusable Omen app patterns, not one-off code.

### 2. MVP Move / Omen of the Week

MVP Move / Omen of the Week is the paid centerpiece.

It is a personalized weekly recommendation engine.

It depends on the same app backbone used by Draft Assistant.

### 3. Supporting Fantasy Tools

Supporting tools include:

- Trade Analyzer
- Start/Sit
- Waiver Wire
- roster insights
- platform connection status

### 4. Lightweight Slops Saloon Landing Page

Slops Saloon is the umbrella brand.

For now, the landing page should be a simple doorway that points users to Omen.

Do not build a full media hub, CMS, blog, art gallery, podcast archive, or unrelated content system during this phase.

---

## Out Of Scope For Active Engineering Sessions

Do not build or plan unrelated future products unless Justin explicitly reactivates them.

Do not expand into non-football products during Omen app-backbone work.

Do not introduce league hosting into MVP scope.

Do not build a family or investment assistant into Omen.

Do not turn Slops Saloon into a full content platform until Omen has a stable app experience.

---

## Brand Architecture

Slops Saloon is the parent brand, mission site, and long-term product studio.

Omen is the first flagship product inside the Slops Saloon ecosystem.

Omen product line:

> Omen — See the winning move.

Slops Saloon is not a former name. It remains the umbrella brand and parent domain.

Do not rename repositories, routes, domains, packages, environment variables, database objects, or deployment config without a separate approved migration plan.

---

## Product Definition

Omen is a fantasy football decision layer.

It helps users make sharper roster and draft decisions across major fantasy football platforms.

Omen is not a general chatbot.

Omen is not trying to replace major fantasy platforms at launch.

Omen sits above them as the decision system.

---

## App UI Is In Scope

Claude Code and Codex are expected to help build the actual Omen application. This includes app UI, screen structure, dashboard layout, user flows, API contracts, and backend support.

The app UI is not a side task. It is part of the backbone.

Required app screens include:

- lightweight Slops Saloon landing page
- Omen entry/marketing page
- app shell/dashboard
- Draft Assistant
- MVP Move / Omen of the Week
- supporting tool pages
- platform connection/status states

The detailed app UI plan lives at:

```text
ssffmvp/APP_UI_PLAN.md
```

---

## Agent Roles

Justin is the product owner and final decision-maker.

Claude Chat is the planner, reviewer, architect, and prompt helper.

Claude Code is the front-end engineer for Omen.

Codex is the back-end engineer for Omen.

Claude Code and Codex must work through handoff files.

---

## Handoff Files

For app engineering work, the canonical handoffs are inside the app repo:

```text
ssffmvp/handoffs/frontend-to-backend.md
ssffmvp/handoffs/backend-to-frontend.md
ssffmvp/handoffs/decisions.md
ssffmvp/APP_UI_PLAN.md
```

Claude Code writes frontend needs into `frontend-to-backend.md`.

Codex writes completed backend contracts into `backend-to-frontend.md`.

Justin-approved durable decisions go into `decisions.md`.

---

## Safety Rules

- Do not touch `.env`, `.env.cloud`, private keys, or credentials unless Justin explicitly asks.
- Do not expose secrets in prompts, logs, screenshots, or commits.
- Do not wipe Docker volumes or databases.
- Do not edit auth, Stripe, Supabase migrations, Docker, DNS, SSL, or VPS deployment without explicit approval.
- Production changes require review and verification.
- No placeholder feature should be presented as live.

---

## Current Operating Rule

Backbone is now locally implemented.

Phase 4 polish and reconnection flow first.

Draft Assistant polish second.

MVP Move / Omen hardening third.

Everything else is parked.
