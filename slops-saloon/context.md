# Slops Saloon Context

## Purpose

This is the division-level context entry point for Slops Saloon.

Slops Saloon is the sports, music, and arts division inside SLOPS OS.

## Current Layer

Path:

```text
C:\Users\JDuve\dev\SLOPS\slops-saloon
```

This folder is not the Omen git repo. It is the division parent for Omen and future Slops Saloon products.

## Current Product

Omen is the only active product.

Path:

```text
C:\Users\JDuve\dev\SLOPS\slops-saloon\omen
```

Omen owns:

- App source.
- Backend.
- Frontend.
- Tests.
- Docker and deploy config.
- Product handoffs.
- Product prompts and specs.
- Product roadmap and current sprint.

## Division Job

This layer should answer:

- What is Slops Saloon?
- Which products exist under it?
- Which product is active?
- Where should agents go next?

It should not duplicate Omen implementation context.

## Active Routing

Use this layer for division-level naming, product portfolio decisions, and future product setup.

Use `omen/` for all current app and product work.

New Claude or Codex chats for Omen execution should route into:

```text
omen/
```

Then use the Omen build loop:

```text
omen/Direction/agent_inbox.md
omen/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md
omen/Blueprints/definition-of-done.md
```

For future Slops Saloon products, copy the reusable pattern from
`Blueprints/prompts/agent-build-loop-template.md` into that product.

## Latest Omen Status — 2026-05-27

- Omen remains the only active Slops Saloon product.
- Backend/frontend handoff Requests 13-18 were advanced locally in `omen/`.
- Local backend test baseline is 216/216 passing.
- Prepared Supabase launch SQL remains approval-gated; it has not been applied to staging or production.
- Legacy Omen compatibility endpoints now return `410 legacy_route_retired`; canonical frontend routes remain the source of truth.
- Do not perform Supabase, Stripe live, deploy, DNS, SSL, Nginx, or VPS work from this division layer without explicit Justin approval.

## Read First

1. `DBS_INDEX.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `Direction/context.md`
5. `Direction/roadmap.md`
6. `Direction/decision_log.md`
7. `Blueprints/README.md`
8. `Blueprints/prompts/agent-build-loop-template.md` when setting up a future product loop
9. `omen/DBS_INDEX.md` when moving into product work

## Safety Boundary

Do not modify Omen source, tests, deploy config, package files, SQL, Docker, Stripe, or Supabase from this division layer. Do not perform deploy, DNS, SSL, Nginx, or VPS work without explicit Justin approval. Route all product execution to `omen/`.
