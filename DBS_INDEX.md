# DBS Index

This is the navigation map for the three-layer SLOPS folder system.

## Layers

Naming note: this root index uses human layer numbers (`Layer 1`, `Layer 2`, `Layer 3`). Skill and agent routing files may also use zero-based aliases (`0-OS`, `1-ssffmvp`, `2-Corvus`). They refer to the same three layers:

- `Layer 1` = `0-OS`
- `Layer 2` = `1-ssffmvp`
- `Layer 3` = `2-Corvus`

Layer 1: SLOPS OS

Path: `C:\Users\JDuve\OneDrive\Desktop\SLOPS`

Meaning: Justin / Slops Saloon / company-wide operating system / how Justin works.

Layer 2: ssffmvp

Path: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

Meaning: the first Slops Saloon department, the Fantasy Sports MVP Builder. This is also the active app repo.

Layer 3: Corvus

Path: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus`

Meaning: the Fantasy Football MVP product, and the first product inside ssffmvp.

## DBS Folders

Direction means context, roadmap, vision, priorities, decision logs, and current sprint notes.

Blueprints means specs, prompts, skills, workflows, templates, and playbooks.

Solutions means working outputs, deliverables, implementation-adjacent notes, assets, and results. Do not move active source code here without explicit approval.

References means supporting research, source material, comparison notes, and historical context that informs work but is not the current operating plan.

Archive means reviewed superseded, parked, stale, or quarantined material. Archive is preservation, not deletion.

## Context Files

- SLOPS OS context: `Direction\context.md`
- ssffmvp context: `ssffmvp\Direction\context.md`
- Corvus context: `ssffmvp\Corvus\Direction\context.md`

## Skills

All SLOPS-authored skills live under one canonical folder:

- `Blueprints\skills\`

Deterministic skill lookup:

1. Start at `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\`.
2. Read `Blueprints\skills\README.md`.
3. Read `Blueprints\skills\SKILL_ROUTING.md`.
4. Open the named skill folder and read its `SKILL.md`.

Do not create new SLOPS skills under `.codex\skills`, `Blueprints\prompts`, `ssffmvp\Blueprints`, or `ssffmvp\Corvus\Blueprints`.

Tool-installed external skills may still live where the tool installer expects them. Treat those as runtime dependencies, not canonical SLOPS-authored skills.

## Prompts

Root reusable prompts live or are indexed under:

- `Blueprints\prompts\`

App/product prompts now live under `ssffmvp\Blueprints\prompts\` after cleanup. Any code, eval, or workflow that still expects `ssffmvp\prompts\` needs explicit review before an app/config edit.

## Specs

ssffmvp app specs and docs live under:

- `ssffmvp\Blueprints\specs\`
- `ssffmvp\Blueprints\specs\docs\`

Corvus product specs live at:

- `ssffmvp\Corvus\Blueprints\specs\`

Do not change app source/config references to old spec/doc paths without an explicit implementation pass.

## Handoffs

Canonical engineering handoffs live at:

- `ssffmvp\Blueprints\handoffs\frontend-to-backend.md`
- `ssffmvp\Blueprints\handoffs\backend-to-frontend.md`
- `ssffmvp\Blueprints\handoffs\decisions.md`

Root handoffs are OS-level history or redirects unless a future workflow says otherwise.

## Brand Files

Corvus brand files live at:

- `ssffmvp\Corvus\Brand\`

Corvus assets live at:

- `ssffmvp\Corvus\Assets\`

Active implementation assets in `ssffmvp\frontend\public` and `ssffmvp\client\public` stay in place.

## Quarantine and Stale Folders

Quarantined stale workspace material lives at:

- `Archive\quarantine\`

Do not upload, commit, push, share, restore, inspect, or reorganize quarantine contents without a secrets-safe review.

Other stale or parked material is reviewed through:

- `Archive\`
- `_archive\`
- `_parked\`
- `.codex-artifacts\`

## Active App Warning

The active app repo is:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

Do not use old project copies as active source. Do not move source, deploy config, package files, SQL, scripts, tests, `.git`, `node_modules`, `.env`, secrets, keys, credentials, or active implementation assets during DBS cleanup.

## Naming Conventions

All SLOPS documentation follows strict naming conventions to ensure consistency, discoverability, and cross-referencing.

### Folder Naming

- **Canonical SLOPS folders** use lowercase with hyphens: `blueprints`, `skills`, `agents`, `tools`, `prompts`, `specs`, `direction`, `solutions`, `references`, `archive`
- **Deprecated folders** are noted where they still exist (e.g., old `Skills` with capital S — migrate references to `skills` with lowercase)

### File Naming

- **Skill files**: `SKILL.md` (not `skill.md`, not `skill-author.md`)
- **Index files**: ALL_CAPS_SNAKE (e.g., `SKILL_ROUTING.md`, `TOOLS_INDEX.md`, `AGENT_INDEX.md`, `DBS_INDEX.md`)
- **Regular markdown files**: kebab-case (e.g., `tool-permissions.md`, `platform-connection-ui.md`)
- **Skill folder names**: kebab-case (e.g., `slops-agent-author`, `slops-skill-author`, `slops-context-markdown`)
- **Support folders** inside skill/agent packages: underscore-prefixed kebab-case (e.g., `_references`, `_examples`, `_tests`, `_notes`, `_interface`)

### Examples

Correct naming:
- `Blueprints/skills/slops-prompt-generator/SKILL.md`
- `Blueprints/skills/slops-agent-author/_references/`
- `Blueprints/agents/AGENT_INDEX.md`
- `Blueprints/tools/tool-permissions.md`
- `ssffmvp/Blueprints/skills/README.md`
- `direction/context.md`
- `solutions/reports/dbs-migration/PHASES_2_4_COMPLETION.md`

Incorrect naming:
- `Blueprints/Skills/` ✗ (capitalized)
- `Blueprints/skills/my_skill/` ✗ (snake_case instead of kebab-case)
- `Blueprints/skills/slops-agent-author/__interface/` ✗ (double underscore)
- `Blueprints/agents/agent-index.md` ✗ (should be AGENT_INDEX.md)

### Folder Structure Convention

DBS layer folders maintain this structure:

```
direction/              (lowercase)
  decisions/
  reviews/
  roadmaps/

blueprints/            (lowercase)
  skills/
  agents/
  tools/
  prompts/
  specs/
  handoffs/

solutions/             (lowercase)
  deliverables/
  reports/

references/            (lowercase)
  research/
  patterns/
  examples/

archive/               (lowercase)
  superseded/
  imports/
```

### Cross-File Updates

When moving or renaming files, update all references in:
- DBS index files (`DBS_INDEX.md`, `SKILL_ROUTING.md`, `TOOLS_INDEX.md`, `AGENT_INDEX.md`)
- Canonical folder READMEs
- Skill and agent SKILL.md files
- Handoff and spec documents that reference paths
