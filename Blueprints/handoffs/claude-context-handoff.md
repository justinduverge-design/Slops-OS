# Claude Context Handoff

## Objective

Prepare Claude to continue SLOPS documentation, skill, agent, and DBS cleanup work from the current route.

## Current Route

```text
SLOPS/
  slops-saloon/
    corvus/
```

## Read First

For SLOPS OS work:

1. `context.md`
2. `DBS_INDEX.md`
3. `Direction/context.md`
4. `Direction/roadmap.md`
5. `Blueprints/skills/README.md`
6. `Blueprints/skills/SKILL_ROUTING.md`
7. `Blueprints/agents/AGENT_INDEX.md`

For Slops Saloon division work:

1. `slops-saloon/context.md`
2. `slops-saloon/DBS_INDEX.md`
3. `slops-saloon/Direction/context.md`
4. `slops-saloon/Direction/roadmap.md`

For Corvus product work:

1. `slops-saloon/corvus/DBS_INDEX.md`
2. `slops-saloon/corvus/Direction/context.md`
3. `slops-saloon/corvus/Direction/current_sprint.md`
4. `slops-saloon/corvus/Blueprints/handoffs/frontend-to-backend.md`
5. `slops-saloon/corvus/Blueprints/handoffs/backend-to-frontend.md`

## Current State

- SLOPS OS is the root operating layer.
- Slops Saloon is the division layer.
- Corvus is the active Fantasy Football MVP product repo.
- The old nested `Corvus/` product subfolder is retired.
- SLOPS-authored skills live under `Blueprints/skills/`.
- Imported agents remain reference-only unless reviewed, wrapped, indexed, and approved.

## Scope For Claude

Claude should help with documentation cleanup, DBS routing, agent review, prompt shaping, and handoff preparation.

Claude should not touch app source, secrets, cookies, auth, payments, SQL, production, deployment, or infrastructure unless Justin explicitly asks for that exact work.

## Open Follow-Up

Justin plans to rewrite the active agent files after this context route is in place.
