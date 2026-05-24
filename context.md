# SLOPS Root Context

## Purpose

This is the compatibility entry point for agents working in the SLOPS workspace.

The fuller live operating context lives at:

```text
Direction\context.md
```

Use this root file first when a tool or agent expects `context.md` at the workspace root, then follow the read-first list below.

## Current Workspace

SLOPS is Justin's company operating system for Slops Saloon, `ssffmvp`, and Corvus.

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS` is the SLOPS OS layer.
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp` is the active app repo.
- Corvus is the fantasy football product inside `ssffmvp`.

## Read First

For SLOPS OS work:

1. `DBS_INDEX.md`
2. `Direction\context.md`
3. `Direction\roadmap.md`
4. `Blueprints\skills\README.md`
5. `Blueprints\skills\SKILL_ROUTING.md`
6. `Blueprints\agents\AGENT_INDEX.md`

For app/backend work:

1. `ssffmvp\Direction\context.md`
2. `ssffmvp\Blueprints\handoffs\frontend-to-backend.md`
3. `ssffmvp\Blueprints\handoffs\backend-to-frontend.md`
4. `ssffmvp\Blueprints\handoffs\decisions.md`

## Live Context vs Reference Material

Current operating truth belongs in:

- `Direction\`
- `Blueprints\`
- `ssffmvp\Direction\`
- `ssffmvp\Blueprints\`
- `ssffmvp\Corvus\`

Reference, imported, stale, or parked material is not authoritative by default:

- `_imported`
- `_archive`
- `_drafts`
- `Archive\`
- `Archive\quarantine`
- `References\`

Do not treat imported agents, archived notes, or old project copies as active authority unless Justin explicitly says so.

## Safety Boundary

Documentation cleanup may update markdown files.

Do not modify app source, package files, SQL, migrations, tests, deployment config, `.env`, secrets, cookies, credentials, production settings, `.git`, `node_modules`, or active implementation assets without explicit approval.

## Active Skills and Agents

SLOPS-authored skills live at:

```text
Blueprints\skills
```

Resolve skills through:

```text
Blueprints\skills\README.md
Blueprints\skills\SKILL_ROUTING.md
```

Agent authority lives at:

```text
Blueprints\agents\AGENT_INDEX.md
```

Division folders, imported files, and wrapper files do not grant authority by themselves.

## Current Documentation Task Notes

Recent work created and routed these active SLOPS skills:

- `agent-wrapper-generator`
- `agent-index-diff-builder`
- `rbac-risk-review`
- `workflow-tree-spec`
- `security-privacy-evidence`

Recent work also created candidate agent wrappers under `Blueprints\agents\<division>\`. Those wrappers are not active unless indexed and approved through `AGENT_INDEX.md`.

## Next Safe Step

For future documentation cleanup, start by deciding the DBS layer:

- Direction for current decisions, context, roadmap, and reviews.
- Blueprints for reusable skills, agents, prompts, specs, templates, and handoffs.
- References for source material and research.
- Solutions for finished outputs and reports.
- Archive for superseded, parked, or quarantined material.
