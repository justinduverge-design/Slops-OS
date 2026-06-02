# {{APP_NAME}} Root Context

## Purpose

This is the product-layer context entry point for {{APP_NAME}}.

Use this file before opening app source, backend routes, frontend files, tests, SQL, deployment files, or product handoffs.

## Canonical Layer

{{APP_NAME}} is a Layer 2 product repo inside the {{DIVISION}} division.

Path:

```text
SLOPS/{{division-slug}}/{{app-slug}}
```

## Current Truth

- {{APP_NAME}} is {{ONE_LINER}}.
- This is the active app/product git repo (a separate git decision lane).
- Product DBS folders live at this repo root.
- Frontend/backend handoffs live in `Blueprints/handoffs/`.
- App source and config live here, not in the parent `{{division-slug}}/` layer.

## Latest Resume Point — YYYY-MM-DD

- (Replace with the most recent decision, deploy, or coordination state.)

## Read First

1. `DBS_INDEX.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `Direction/context.md`
5. `Direction/current_sprint.md`
6. `Direction/roadmap.md`
7. `Direction/decision_log.md`
8. `Blueprints/handoffs/frontend-to-backend.md`
9. `Blueprints/handoffs/backend-to-frontend.md`

## Safety Boundary

Do not edit `.env`, secrets, keys, cookies, DNS, SSL, Nginx, database migrations, payment production behavior, package files, Docker/deploy config, production infrastructure, `.git`, or `node_modules` without explicit Justin approval.
