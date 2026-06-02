# DBS Index

This is the root navigation map for the active SLOPS folder system.

## Canonical Layers

```text
Layer 0 - SLOPS OS
Path: C:\Users\JDuve\OneDrive\Desktop\SLOPS

Layer 1 - Slops Saloon division
Path: C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon

Layer 2 - Corvus product repo
Path: C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus
```

Older docs may call these Layer 1, Layer 2, and Layer 3. Current routing should use Layer 0, Layer 1, and Layer 2.

When Justin says "Layer 3," treat that as the third layer in plain English: the current canonical Layer 2 Corvus product repo.

## Current Product Route

Corvus is the only active product.

```text
SLOPS/
  slops-saloon/
    corvus/
```

The old product subfolder path `slops-saloon/corvus/Corvus/` is retired.

## Layer Responsibilities

### Layer 0 - SLOPS OS

Owns:

- Operating context.
- DBS rules.
- Reusable skills.
- Reusable agents.
- Cross-division handoffs.
- Company-level decisions.

Read:

- `context.md`
- `Direction/context.md`
- `Direction/roadmap.md`
- `Blueprints/skills/README.md`
- `Blueprints/skills/SKILL_ROUTING.md`
- `Blueprints/agents/AGENT_INDEX.md`

### Layer 1 - Slops Saloon

Owns:

- Sports, music, and arts division context.
- Product portfolio notes.
- Future sibling product setup.
- Division-level naming and brand standards.

Read:

- `slops-saloon/context.md`
- `slops-saloon/DBS_INDEX.md`
- `slops-saloon/Direction/context.md`
- `slops-saloon/Direction/roadmap.md`

### Layer 2 - Corvus

Owns:

- App source.
- Backend.
- Frontend.
- Tests.
- Docker and deploy config.
- Product prompts.
- Product specs.
- Product handoffs.
- Corvus product decisions.

Read:

- `slops-saloon/corvus/DBS_INDEX.md`
- `slops-saloon/corvus/Direction/context.md`
- `slops-saloon/corvus/Direction/current_sprint.md`
- `slops-saloon/corvus/Direction/roadmap.md`
- `slops-saloon/corvus/Blueprints/handoffs/`

## DBS Folders

Use these meanings at every layer:

- `Direction/` - current context, roadmap, decisions, sprint notes, risks.
- `Blueprints/` - prompts, specs, skills, templates, playbooks, handoffs.
- `Solutions/` - finished outputs, reports, deliverables.
- `References/` - research, source captures, historical context.
- `Archive/` - superseded or parked material. Archive is not active truth.

## Baseline Entry Files

Every layer should expose these files at its layer root:

```text
context.md
DBS_INDEX.md
README.md
AGENTS.md
CLAUDE.md
```

On this Windows workspace, lowercase `agents.md` / `claude.md` references resolve to the canonical `AGENTS.md` / `CLAUDE.md` files.

Layer-specific detail can live in `Direction/`, but these root files must exist so Claude, Codex, and future agents do not need to guess where to start.

The Corvus app layer may add app-specific folders such as `src/`, `frontend/`, `test/`, `sql/`, `.github/`, and `scripts/`. Those do not replace the baseline DBS context files.

## Skills

Canonical SLOPS-authored skills live at:

```text
Blueprints/skills/
```

Skill lookup:

1. `Blueprints/skills/README.md`
2. `Blueprints/skills/SKILL_ROUTING.md`
3. `Blueprints/skills/<skill-name>/SKILL.md`

Do not create new SLOPS-authored skills inside `slops-saloon/` or `slops-saloon/corvus/` unless Justin explicitly changes that rule.

## Handoffs

Corvus frontend/backend handoffs live at:

```text
slops-saloon/corvus/Blueprints/handoffs/
```

Root handoffs are OS-level coordination only.

## Safety Boundary

Documentation cleanup may update markdown context files.

Do not edit secrets, `.env`, credentials, app source, package files, SQL, Docker, deployment config, production infrastructure, `.git`, or `node_modules` without explicit approval.
