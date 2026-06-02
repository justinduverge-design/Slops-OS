# {{APP_NAME}} Agent Context

## 1. Identity & Scope

{{APP_NAME}} is {{ONE_LINER}}, the active product repo inside {{DIVISION}}.

This is the product/app layer (canonical Layer 2):

```text
SLOPS/{{division-slug}}/{{app-slug}}/
```

## 2. Required Files To Read First

Before product work, read these files if present:

1. `context.md`
2. `DBS_INDEX.md`
3. `Direction/context.md`
4. `Direction/current_sprint.md`
5. `Direction/roadmap.md`
6. `Direction/decision_log.md`
7. `Blueprints/handoffs/frontend-to-backend.md`
8. `Blueprints/handoffs/backend-to-frontend.md`
9. `Blueprints/handoffs/decisions.md`
10. `CLAUDE.md`

If a file is missing, continue and mention that it was missing.

## 3. Ownership Boundaries

Codex owns backend implementation, API contracts, backend services, platform adapters, validation, backend tests, and backend handoffs.

Claude owns frontend implementation, UX/UI structure, page polish, and frontend handoffs unless Justin explicitly assigns otherwise.

Justin owns product decisions, deployment approval, secrets, production infrastructure, and final naming direction.

## 4. Handoff Workflow

```text
Frontend -> backend:  Blueprints/handoffs/frontend-to-backend.md
Backend -> frontend:  Blueprints/handoffs/backend-to-frontend.md
Shared decisions:     Blueprints/handoffs/decisions.md
```

## 5. Safety Rules

- Do not touch `Archive/quarantine`.
- Do not expose secrets.
- Do not edit `.env`, keys, cookies, or credential files.
- Do not deploy, push, migrate, or change production infrastructure without explicit Justin approval.
- Do not change payment production behavior, database migrations, DNS, SSL, Nginx, Docker, or package files unless Justin explicitly approves that exact work.
- Mock data must be clearly labeled and must not be presented as live product output.

## 6. Current Product Priority

(Replace with the current top product priority — e.g. stable contracts, a named milestone, or the active sprint goal.)
