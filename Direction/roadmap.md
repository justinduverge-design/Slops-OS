# SLOPS OS Roadmap

## Purpose

This roadmap tracks the operating-system layer only. Product and app work belongs inside `ssffmvp/` and `ssffmvp/Corvus/`.

## Now

- Keep `Direction/context.md` as the canonical SLOPS OS context.
- Keep `DBS_INDEX.md` as the root navigation index.
- Keep SLOPS-authored skills canonical under `Blueprints/skills/`.
- Keep root `ssffmvp/` ignored because it is a separate app repo.
- Finish root initial commit readiness after OS files are cleaned and reviewed.

## Next

- Review `Blueprints/agents/AGENT_INDEX.md` candidate statuses with Justin.
- Keep `Blueprints/skills/SKILL_ROUTING.md` aligned with `DBS_INDEX.md`.
- Keep `Blueprints/tools/TOOLS_INDEX.md` aligned with the agent authority model.
- Archive loose or historical OS-layer notes after review.
- Create small handoffs before any cross-layer cleanup pass.

## Later

- Promote imported agents only through reviewed, least-privilege wrappers.
- Add more SLOPS skills only when a workflow repeats enough to justify it.
- Keep root OS docs focused on reusable operating doctrine, not product-specific implementation.
- Let each app repo maintain its own code, tests, deployment, and product docs.

## Out Of Scope

- App code edits.
- `ssffmvp/` cleanup.
- Deployments, secrets, production config, or infrastructure.
- `Archive/quarantine/` inspection or staging.
