# slops-os-dbs Claude/Codex Handoff

## Purpose

Use this handoff when Claude or Codex needs to place Slops OS DBS research, critique, decision, spec, skill, and prompt files.

Architecture is needed now.

Implementation comes later.

## Task

Create or update the DBS routing and skill creation files for the `slops-os-dbs` project.

Use existing Slops OS naming conventions:

- DBS pillars use Title Case: `Direction`, `Blueprints`, `Solutions`, `References`, `Archive`.
- Single-word content folders use lowercase.
- Multi-word folders use kebab-case.
- Skill packages use kebab-case.
- Skill files are named `SKILL.md`.
- Regular markdown files use kebab-case.

## Read First

```text
Direction/context.md
Blueprints/skills/README.md
Blueprints/skills/SKILL_ROUTING.md
References/patterns/slops-os-dbs-patterns.md
Direction/reviews/slops-os-dbs-critic-review.md
```

## Files To Create Or Update

```text
References/patterns/slops-os-dbs-patterns.md
Direction/reviews/slops-os-dbs-critic-review.md
Direction/decisions/slops-os-dbs-decision.md
Blueprints/specs/slops-os-dbs-routing-and-skill-creation.spec.md
Blueprints/skills/dbs-research-to-architecture-router/SKILL.md
Blueprints/prompts/slops-os-dbs-claude-codex-handoff.md
```

## Required Decisions To Preserve

- Decision is `BUILD NOW, reduced MVP`.
- Immediate build is a local DBS router workflow.
- Immediate build is not a fully automated multi-agent system.
- Preserve modularity.
- Keep MVP simplicity.
- Do not create a monolithic workflow.
- Do not create new naming conventions.
- Do not create Solutions files unless explicitly asked.

## Critic Warnings To Preserve

- Automatic skill discovery is not magic.
- Broad folder access causes token bleed.
- Sessions can hold stale file state after disk changes.
- Composio/Rube is an overbuild risk for the MVP.
- Context scoping boundaries must be explicit.

## Exclusions

Do not:

- Create custom MCP servers.
- Add Composio/Rube setup.
- Scan or reorganize the entire Slops OS folder.
- Create production implementation tasks.
- Touch app code.
- Touch secrets, auth, payments, databases, or infrastructure.
- Auto-edit the router skill after creating it.

## Completion Report

Report:

- Files created or updated.
- Exact paths.
- Source files used.
- Assumptions.
- What was intentionally excluded.
- Index updates needed.
- Next safe step.

## Next Safe Step

Review the created files with Claude for routing clarity, then update indexes only after Justin approves.
