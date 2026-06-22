# SLOPS Skills

This is the canonical folder for all SLOPS-authored skills.

Canonical path, resolved from the active Git root:

`Blueprints/skills/`

## Lookup Rule

When Justin calls on a skill, agents should resolve it in this order:

1. Resolve the active repository root with `git rev-parse --show-toplevel`, then start in `Blueprints/skills/`.
2. Read this `README.md`.
3. Read `SKILL_ROUTING.md`.
4. Open the named skill folder.
5. Read that skill's `SKILL.md`.
6. Load only referenced files needed for the task.

## Creation Rule

Create new SLOPS-authored skills only in this folder.

Do not create SLOPS-authored skills in:

- `.codex\skills`
- `Blueprints\prompts`
- `slops-saloon\Blueprints`
- `slops-saloon\corvus\Blueprints`
- old project copies

Tool-installed external skills may still live where their installer expects them. Treat those as external runtime dependencies, not canonical SLOPS skills.

## Tool Permissions

Every skill uses agents and tools. See `Blueprints\tools\tool-permissions.md` for tool tier policy.

Agent authority (including tool tier caps) is defined in `Blueprints\agents\AGENT_INDEX.md`.

## Current Index

See `SKILL_ROUTING.md` for the current skill map and skill-to-agent routing.
