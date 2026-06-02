# {{APP_NAME}}

{{ONE_LINER}}.

## DBS Navigation

This is the Layer 2 product repo inside {{DIVISION}}.

```text
Layer 0 - SLOPS OS      -> SLOPS/
Layer 1 - {{DIVISION}}  -> SLOPS/{{division-slug}}/
Layer 2 - {{APP_NAME}}  -> SLOPS/{{division-slug}}/{{app-slug}}/   (this repo)
```

## Start Here

1. `context.md` — product context entry point
2. `DBS_INDEX.md` — repo navigation map
3. `AGENTS.md` — agent ownership, handoffs, safety rules
4. `CLAUDE.md` — Claude-specific behavior

## Baseline DBS Entry Files

```text
context.md
DBS_INDEX.md
README.md
AGENTS.md
CLAUDE.md
```

## DBS Folders

- `Direction/` — current context, roadmap, sprint, decisions.
- `Blueprints/` — prompts, specs, skills, templates, handoffs.
- `Solutions/` — finished outputs and reports.
- `References/` — research and source captures.
- `Archive/` — superseded or parked material.

## Getting Started

(Replace with app setup: prerequisites, environment variables, build, and test steps.)

## Boundary

App source, secrets, infrastructure, and deploy config are owned by this layer only and changed only with explicit Justin approval.
