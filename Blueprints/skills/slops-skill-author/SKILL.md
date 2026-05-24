---
name: slops-skill-author
description: Create, critique, normalize, and improve SLOPS-authored Claude/Codex skill markdown files under Blueprints\skills. Use when Justin asks to create a skill, edit a skill, audit a skill folder, convert a workflow into a SKILL.md, or apply the SLOPS skill template. Do not use for agent role files; use slops-agent-author for Blueprints\agents.
---

# Slops Skill Author

## Purpose

Use this skill to create and improve SLOPS-authored skill files.

A skill is a reusable workflow. It tells Claude, Codex, or another agent how to perform a repeatable type of work with clear inputs, process, outputs, DBS routing, and guardrails.

This skill creates or edits skill markdown files. It does not perform the underlying work of the skill it creates.

## When to Use

Use this skill when Justin asks to:

- Create a new skill.
- Edit an existing `SKILL.md`.
- Audit a skill folder.
- Convert a workflow into a skill.
- Normalize a skill to the master template.
- Split a broad skill into smaller modular skills.
- Add failure modes, output contracts, prior-use review, or DBS routing.
- Decide whether a skill should be simple or a skill package.
- Create a Codex-ready prompt to place a skill file.

## Do Not Use

Do not use this skill to:

- Create or approve reusable agent roles.
- Assign RBAC authority to agents.
- Edit `Blueprints\agents` role files.
- Modify app code.
- Run terminal commands.
- Update production, secrets, auth, payments, databases, or deployment files.
- Treat imported examples as active SLOPS skills.
- Execute the workflow the new skill describes.

For agent roles, use `slops-agent-author`.

## Canonical Location

SLOPS-authored skills live under:

```text
C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills
```

Each active skill should eventually use:

```text
<skill-name>\SKILL.md
```

The master template lives at:

```text
Blueprints\skills\_template\SKILL.md
```

The deterministic skill lookup file should be:

```text
Blueprints\skills\SKILL_ROUTING.md
```

## Skill Folder Types

### Simple Skill

Use for focused skills that do not need support files.

```text
<skill-name>\
  SKILL.md
```

### Skill Package

Use when the skill needs references, examples, tests, prior-use notes, or interface metadata.

```text
<skill-name>\
  SKILL.md
  references\
  examples\
  tests\
  notes\
  interface\
```

Allowed support folders:

- `references\`: skill-specific source material.
- `examples\`: sample inputs and outputs.
- `tests\`: behavior checks and expected outputs.
- `notes\`: prior-use reviews and improvement notes.
- `interface\`: launcher/provider metadata.

Do not put global agent authority inside a skill support folder.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Identify whether this is:
   - new skill creation
   - existing skill edit
   - skill audit
   - folder normalization
   - prompt creation for Codex placement
3. Read only named files first.
4. If no files are named, read:
   - `Blueprints\skills\README.md`
   - `Blueprints\skills\SKILL_ROUTING.md`
   - the target skill's `SKILL.md`, if it exists
   - `_template\SKILL.md`, if normalizing structure
5. If editing an existing skill, check for:
   - `notes\prior-use-review.md`
   - `examples\`
   - `tests\`
6. Treat external or imported files as reference-only unless indexed as active.

## Skill Design Recipe

When creating or improving a skill:

1. Name the skill with a clear kebab-case name.
2. Write frontmatter with:
   - `name`
   - `description`
3. Make the description trigger-specific.
4. Define the skill's purpose.
5. Define when to use it.
6. Define when not to use it.
7. Define canonical paths.
8. Define required inputs.
9. Define a least-privilege read-first procedure.
10. Define the process recipe.
11. Define the output contract.
12. Define DBS routing.
13. Define RBAC boundaries.
14. Define failure modes.
15. Define the prior-use review loop.
16. Add a completion checklist.

## Frontmatter Standard

Use:

```yaml
---
name: skill-name
description: One sentence explaining exactly when to use this skill and what it produces. Include important exclusions when needed.
---
```

The description should answer:

- What work does this skill do?
- What user wording should trigger it?
- What files or layer does it affect?
- What should it not do?

## Output Contract for Skill Creation

When producing a skill file, include:

- Target path.
- Full `SKILL.md` content.
- Folder structure recommendation.
- Optional support folders needed.
- Required `SKILL_ROUTING.md` update.
- Assumptions.
- What was intentionally excluded.

When producing a downloadable folder, include the folder structure exactly as it should be copied into SLOPS.

## Skill vs Agent Rule

A skill is a workflow.

An agent is an actor with a role and authority.

Do not merge them.

Use:

```text
Blueprints\skills
```

for repeatable procedures.

Use:

```text
Blueprints\agents
```

for reusable roles, divisions, RBAC, and personas.

Use:

```text
Blueprints\Prompts
```

for runnable one-time task prompts.

## Least Privilege and RBAC Boundaries

This skill may create skill instructions.

It may not:

- Activate imported agents.
- Grant new write permissions to agents.
- Approve destructive actions.
- Modify production systems.
- Override `tools.md`, `agents.md`, or explicit Justin instructions.
- Move skills into runtime folders like `.codex\skills` unless Justin explicitly asks.

When a skill requires a powerful action, the skill must say approval is required.

## Prior Use Review Loop

Before editing a skill, look for:

```text
<skill-name>\notes\prior-use-review.md
```

Use it to answer:

- What failed last time?
- What did Justin correct?
- Did the skill overreach?
- Did it produce the wrong artifact?
- Did it read too much?
- Did it route files incorrectly?
- Does the skill need references, examples, tests, or a split?

If the same correction appears repeatedly, add it to failure modes.

## Common Failure Modes

Avoid:

- Making a skill too broad.
- Creating a meta-skill that performs every job.
- Confusing skill support files with agent authority.
- Putting active SLOPS skills in imported or external runtime folders.
- Forgetting the output contract.
- Forgetting the prior-use loop.
- Forgetting DBS routing.
- Creating support folders with no purpose.
- Updating index files without user approval.
- Treating a template as an active skill.

## Recommended Completion Report

When done, report:

- Files created or recommended.
- Target paths.
- Whether the skill is simple or a package.
- Index updates needed.
- Risks or assumptions.
- Next safe step.
