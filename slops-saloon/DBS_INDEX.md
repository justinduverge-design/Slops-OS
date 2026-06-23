# Slops Saloon DBS Index

Slops Saloon is Layer 1 of the SLOPS OS.

This folder is a division layer, not the active product git repo.

## Layer Structure

- Layer 0 - SLOPS OS: `C:\Users\JDuve\dev\SLOPS`
- Layer 1 - Slops Saloon division: `C:\Users\JDuve\dev\SLOPS\slops-saloon`
- Layer 2 - Omen product repo: `C:\Users\JDuve\dev\SLOPS\slops-saloon\omen`

## What Belongs Here

This layer holds division-level context for sports, music, and arts products.

Use this folder for:

- Division context.
- Division roadmap.
- Multi-product naming and brand direction.
- Future product slots under Slops Saloon.

Do not put Omen implementation work here. Omen code and product DBS files live in `omen/`.

## Active Product

Omen is the only active product right now.

- Product repo: `omen/`
- Product context: `omen/Direction/context.md`
- Product roadmap: `omen/Direction/roadmap.md`
- Product handoffs: `omen/Blueprints/handoffs/`
- Product prompts: `omen/Blueprints/prompts/`
- Product specs: `omen/Blueprints/specs/`
- Active task slot: `omen/Direction/agent_inbox.md`
- Build loop guide: `omen/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`
- Definition of Done: `omen/Blueprints/definition-of-done.md`

## Division Folders

```text
Direction/     Division-level context, roadmap, and decisions
Blueprints/    Division-level prompts, specs, or templates when needed
Solutions/     Division-level finished outputs and reports
References/    Division-level supporting research and source material
Archive/       Superseded or parked division material
omen/        Active Omen product git repo
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

For Omen product work:

1. `omen/DBS_INDEX.md`
2. `omen/Direction/context.md`
3. `omen/Direction/current_sprint.md`
4. `omen/Direction/agent_inbox.md`
5. `omen/Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`
6. `omen/Blueprints/definition-of-done.md`
7. `omen/Blueprints/handoffs/frontend-to-backend.md`
8. `omen/Blueprints/handoffs/backend-to-frontend.md`

## Routing Rule

If the work touches backend, frontend, tests, Docker, deploy, package files, SQL, source code, or product handoffs, route to `omen/`.

If the work is about Slops Saloon as a division or future products under the division, stay in this folder.

If Justin starts a second Slops Saloon product, copy the build loop pattern from
`Blueprints/prompts/agent-build-loop-template.md` into that product rather than
sharing Omen task files.
