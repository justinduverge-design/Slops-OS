# SLOPS Root Context

## Purpose

This is the root context entry point for agents working anywhere inside the SLOPS workspace.

Use this file to choose the correct layer before opening project files.

## Canonical Layer Route

```text
C:\Users\JDuve\OneDrive\Desktop\SLOPS
  slops-saloon
    corvus
```

## Layers

- Layer 0 - SLOPS OS: `C:\Users\JDuve\OneDrive\Desktop\SLOPS`
- Layer 1 - Slops Saloon division: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon`
- Layer 2 - Corvus product repo: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus`

## Current Truth

- SLOPS is the company operating system.
- Slops Saloon is the sports, music, and arts division.
- Corvus is the active Fantasy Football MVP product.
- Corvus is the active git repo for app/product work.
- The old `Corvus/` subfolder inside the product repo is retired.
- The Oracle checkout path is `~/corvus`.
- The GitHub repo is `justinduverge-design/corvus`.

## Latest Corvus Resume Point — 2026-05-27

- Backend-safe frontend handoff requests 13-18 were worked locally in `slops-saloon/corvus/`.
- `npm test` passes locally with 216/216 backend tests.
- Live Omen now gates subscribed users with usable Yahoo, Sleeper, or ESPN league context as ready.
- `GET /api/system/current-week` and read-only `GET /api/stripe/prices` exist locally.
- Legacy compat routes listed by frontend now return explicit `410 legacy_route_retired` responses with canonical hints where available.
- Supabase waitlist and subscription date-column SQL is prepared in the Corvus SQL file, but no Supabase staging/prod migration has been applied.
- Next production-sensitive step requires Justin approval: apply prepared Supabase SQL to staging, verify, then production.

## Read First By Task

For SLOPS OS work:

1. `DBS_INDEX.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `Direction/context.md`
5. `Direction/roadmap.md`
6. `Blueprints/skills/README.md`
7. `Blueprints/skills/SKILL_ROUTING.md`

For Slops Saloon division work:

1. `slops-saloon/context.md`
2. `slops-saloon/DBS_INDEX.md`
3. `slops-saloon/AGENTS.md`
4. `slops-saloon/CLAUDE.md`
5. `slops-saloon/Direction/context.md`
6. `slops-saloon/Direction/roadmap.md`

For Corvus product work:

1. `slops-saloon/corvus/DBS_INDEX.md`
2. `slops-saloon/corvus/AGENTS.md`
3. `slops-saloon/corvus/CLAUDE.md`
4. `slops-saloon/corvus/Direction/context.md`
5. `slops-saloon/corvus/Direction/current_sprint.md`
6. `slops-saloon/corvus/Blueprints/handoffs/frontend-to-backend.md`
7. `slops-saloon/corvus/Blueprints/handoffs/backend-to-frontend.md`

## Routing Rule

If the task touches app code, backend, frontend, tests, SQL, Docker, deployment, package files, product handoffs, product prompts, or Corvus product decisions, work in `slops-saloon/corvus/`.

If the task is about the Slops Saloon division or future sibling products, work in `slops-saloon/`.

If the task is about reusable skills, agents, operating doctrine, or cross-division context, work at the SLOPS root.

## Safety Boundary

Do not touch secrets, `.env`, credentials, cookies, production infrastructure, DNS, SSL, Nginx, databases, package files, app source, or deployment config unless Justin explicitly approves that exact work.

Do not treat archive, imported agents, old project copies, or historical handoffs as active authority unless Justin explicitly says so.
