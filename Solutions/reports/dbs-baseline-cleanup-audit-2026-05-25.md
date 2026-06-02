# DBS Baseline Cleanup Audit

Date: 2026-05-25

## Scope

Focused cleanup and audit for:

- Layer 0: `SLOPS/`
- Layer 1: `SLOPS/slops-saloon/`
- Corvus app layer: `SLOPS/slops-saloon/corvus/`

## Objective

Bring Layer 0 and Layer 1 to the same baseline DBS shape, give Corvus the same baseline context entry files, and reduce stale `ssffmvp` routing risk outside `Archive/quarantine`.

## Baseline Contract

Each layer should expose:

```text
context.md
DBS_INDEX.md
README.md
AGENTS.md
CLAUDE.md
Direction/
Blueprints/
References/
Solutions/
Archive/
```

On this Windows workspace, lowercase `agents.md` / `claude.md` references resolve to the canonical `AGENTS.md` / `CLAUDE.md` files.

Corvus may also contain app-specific folders such as `src/`, `frontend/`, `test/`, `sql/`, `.github/`, and `scripts/`.

## Completed

- Added missing Layer 0 root `AGENTS.md`.
- Added Layer 1 root `AGENTS.md` and `CLAUDE.md`.
- Added Layer 1 `Solutions/` baseline folder with README.
- Added Layer 1 `Direction/TODO.md` and `Direction/manifesto.md`.
- Added Layer 1 README files for `References/`, `Archive/`, and `Blueprints/handoffs/`.
- Added Corvus root `context.md`, `AGENTS.md`, and `CLAUDE.md`.
- Added Corvus README files for `Blueprints/`, `Blueprints/handoffs/`, `Blueprints/prompts/`, `References/`, `Solutions/`, and `Archive/`.
- Updated root and layer indexes to state the baseline entry-file contract.
- Updated active stale `ssffmvp` handoff references to the current `slops-saloon/corvus` route.
- Marked Corvus pre-rename prompts as historical/stale instead of active current instructions.

## Intentionally Not Touched

- `Archive/quarantine/`
- `.env`, `.env.*`, key-like files, cookies, and secrets
- package files
- Docker/deploy config
- SQL and migrations
- app source
- `.git`
- `node_modules`
- production infrastructure

## Remaining Historical References

Remaining `ssffmvp` references are expected in:

- archived pre-DBS docs
- superseded docs
- historical DBS migration reports
- historical pre-rename prompts
- app code/config areas that require a separate approved implementation task

These are not current routing authority.

## Next Safe Step

Review the Layer 0 and Layer 1 context files together, then decide whether historical migration reports should stay as-is or receive a standard historical banner.
