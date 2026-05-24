# Blueprints

Use this folder for ssffmvp blueprints: agent rules, workflow instructions, playbooks, templates, and reference snapshots.

After DBS cleanup, root SLOPS workflow folders live here:

- `Blueprints/prompts/`
- `Blueprints/skills/`
- `Blueprints/specs/`
- `Blueprints/handoffs/`

All SLOPS-authored skills live only in `Blueprints/skills/`. When a user calls a skill, agents should resolve it from that folder through `Blueprints/skills/README.md` and `Blueprints/skills/SKILL_ROUTING.md`.

Tool permissions policy lives at `Blueprints/tools/tool-permissions.md`. See `Blueprints/tools/README.md` for the policy layer structure.

Agent authority matrix lives at `Blueprints/agents/AGENT_INDEX.md`. See `Blueprints/agents/README.md` for agent lookup rules.

Inside `ssffmvp`, app-specific handoffs, prompts, docs, and specs now live under `ssffmvp/Blueprints/`.

## Naming Conventions

### File and Folder Casing

- **Folder names**: lowercase with hyphens where needed (e.g., `skills`, `tools`, `agents`, `my-feature`)
- **SKILL.md files**: Always `SKILL.md` (no suffix)
- **Index files**: ALL_CAPS_SNAKE (e.g., `SKILL_ROUTING.md`, `TOOLS_INDEX.md`, `AGENT_INDEX.md`)
- **Regular markdown files**: kebab-case (e.g., `platform-connection-ui.md`, `tool-permissions.md`)
- **Support folders inside skill/agent packages**: kebab-case prefixed with underscore (e.g., `_references`, `_examples`, `_tests`, `_notes`, `_interface`)

### Examples

Correct:
- `Blueprints/skills/slops-agent-author/` (kebab-case skill folder)
- `Blueprints/skills/slops-agent-author/SKILL.md` (canonical skill file)
- `Blueprints/skills/slops-agent-author/_references/` (support folder)
- `Blueprints/tools/tool-permissions.md` (regular kebab-case file)
- `Blueprints/agents/AGENT_INDEX.md` (index file)

Incorrect:
- `Blueprints/Skills/` ✗ (capitalized folder)
- `Blueprints/skills/MySkill.md` ✗ (not SKILL.md)
- `Blueprints/skills/my_skill/` ✗ (snake_case instead of kebab-case)
- `Blueprints/skills/my-skill/__interface/` ✗ (double underscore instead of single)

### When Moving Files

If you move or rename blueprints files, update all cross-references in:
- `DBS_INDEX.md` — folder routing and index lookups
- `SKILL_ROUTING.md` — skill path references
- `SKILL.md` files — internal path references
- `README.md` files — canonical location descriptions
