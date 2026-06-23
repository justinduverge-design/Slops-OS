# Slops Saloon

Slops Saloon is the sports, music, and arts division inside SLOPS OS.

This is a division folder. The active product repo is `omen/`.

## Current Route

```text
C:\Users\JDuve\dev\SLOPS
  slops-saloon
    omen
```

## Layer Roles

- `SLOPS/` is the company operating system.
- `slops-saloon/` is the Slops Saloon division.
- `slops-saloon/omen/` is the Omen product git repo.

## Active Product

Omen - Fantasy Football MVP.

All engineering, code, tests, deploy config, product handoffs, product prompts, and product specs live in `omen/`.

## Read First

For division context:

1. `context.md`
2. `DBS_INDEX.md`
3. `AGENTS.md`
4. `CLAUDE.md`
5. `Direction/context.md`
6. `Direction/roadmap.md`
7. `Direction/decision_log.md`

For Omen work:

1. `omen/DBS_INDEX.md`
2. `omen/Direction/context.md`
3. `omen/Direction/current_sprint.md`
4. `omen/Blueprints/handoffs/frontend-to-backend.md`
5. `omen/Blueprints/handoffs/backend-to-frontend.md`

## Boundary

Do not touch secrets, production infrastructure, SQL, package files, deployment config, or app source from this layer.

## Baseline DBS Entry Files

Layer 1 mirrors the Layer 0 baseline:

- `context.md`
- `DBS_INDEX.md`
- `README.md`
- `AGENTS.md`
- `CLAUDE.md`

On this Windows workspace, lowercase `agents.md` / `claude.md` references resolve to the canonical `AGENTS.md` / `CLAUDE.md` files.
