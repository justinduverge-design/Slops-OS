# {{APP_NAME}} DBS Index

This is the navigation map for the {{APP_NAME}} product repo (Layer 2).

## Canonical Path

```text
SLOPS/{{division-slug}}/{{app-slug}}
```

## Parent Layers

```text
Layer 0 - SLOPS OS            -> SLOPS/
Layer 1 - {{DIVISION}}        -> SLOPS/{{division-slug}}/
Layer 2 - {{APP_NAME}}        -> SLOPS/{{division-slug}}/{{app-slug}}/   (this repo)
```

## Current Truth

- {{APP_NAME}} is {{ONE_LINER}}.
- This repo owns app source, backend, frontend, tests, deploy config, product prompts, product specs, and product handoffs.
- This repo is a separate git lane from the SLOPS OS root.

## Product Folders

- `Direction/` - current context, roadmap, current sprint, decisions, risks.
- `Blueprints/` - product prompts, specs, skills, templates, playbooks, handoffs.
- `Solutions/` - finished outputs, reports, deliverables.
- `References/` - research, source captures, historical context.
- `Archive/` - superseded or parked material. Archive is not active truth.

App-specific folders (e.g. `src/`, `frontend/`, `sql/`, `scripts/`, `.github/`) may be added and do not replace these baseline context files.

## Baseline Entry Files

Every layer exposes these at its root:

```text
context.md
DBS_INDEX.md
README.md
AGENTS.md
CLAUDE.md
```

## Read First

1. `context.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `Direction/context.md`
5. `Direction/current_sprint.md`
6. `Direction/roadmap.md`

## Handoffs

```text
Blueprints/handoffs/frontend-to-backend.md
Blueprints/handoffs/backend-to-frontend.md
Blueprints/handoffs/decisions.md
```

## Source Boundary

App source, secrets, infrastructure, and package files are owned by this layer only and changed only with explicit Justin approval. Parent layers never edit them directly.
