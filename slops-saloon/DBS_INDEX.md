# Slops Saloon DBS Index

Slops Saloon is Layer 1 of the SLOPS OS.

This folder is a division layer, not the active product git repo.

## Layer Structure

- Layer 0 - SLOPS OS: `C:\Users\JDuve\OneDrive\Desktop\SLOPS`
- Layer 1 - Slops Saloon division: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon`
- Layer 2 - Corvus product repo: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus`

## What Belongs Here

This layer holds division-level context for sports, music, and arts products.

Use this folder for:

- Division context.
- Division roadmap.
- Multi-product naming and brand direction.
- Future product slots under Slops Saloon.

Do not put Corvus implementation work here. Corvus code and product DBS files live in `corvus/`.

## Active Product

Corvus is the only active product right now.

- Product repo: `corvus/`
- Product context: `corvus/Direction/context.md`
- Product roadmap: `corvus/Direction/roadmap.md`
- Product handoffs: `corvus/Blueprints/handoffs/`
- Product prompts: `corvus/Blueprints/prompts/`
- Product specs: `corvus/Blueprints/specs/`
- Active task slot: `corvus/Direction/agent_inbox.md`
- Build loop guide: `corvus/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`
- Definition of Done: `corvus/Blueprints/definition-of-done.md`

## Division Folders

```text
Direction/     Division-level context, roadmap, and decisions
Blueprints/    Division-level prompts, specs, or templates when needed
Solutions/     Division-level finished outputs and reports
References/    Division-level supporting research and source material
Archive/       Superseded or parked division material
corvus/        Active Corvus product git repo
```

## Baseline Entry Files

This layer should mirror the Layer 0 baseline:

```text
context.md
DBS_INDEX.md
README.md
AGENTS.md
CLAUDE.md
```

On this Windows workspace, lowercase `agents.md` / `claude.md` references resolve to the canonical `AGENTS.md` / `CLAUDE.md` files.

Layer-specific details live under `Direction/`, but these root files must exist so agents can start consistently.

## Read First

For division-level work:

1. `context.md`
2. `DBS_INDEX.md`
3. `AGENTS.md`
4. `CLAUDE.md`
5. `Direction/context.md`
6. `Direction/roadmap.md`
7. `Direction/decision_log.md`
8. `Blueprints/README.md`
9. `Blueprints/prompts/agent-build-loop-template.md` when setting up a future product loop

For Corvus product work:

1. `corvus/DBS_INDEX.md`
2. `corvus/Direction/context.md`
3. `corvus/Direction/current_sprint.md`
4. `corvus/Direction/agent_inbox.md`
5. `corvus/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`
6. `corvus/Blueprints/definition-of-done.md`
7. `corvus/Blueprints/handoffs/frontend-to-backend.md`
8. `corvus/Blueprints/handoffs/backend-to-frontend.md`

## Routing Rule

If the work touches backend, frontend, tests, Docker, deploy, package files, SQL, source code, or product handoffs, route to `corvus/`.

If the work is about Slops Saloon as a division or future products under the division, stay in this folder.

If Justin starts a second Slops Saloon product, copy the build loop pattern from
`Blueprints/prompts/agent-build-loop-template.md` into that product rather than
sharing Corvus task files.
