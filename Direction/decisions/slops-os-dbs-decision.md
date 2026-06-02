# slops-os-dbs-decision

## Status

Accepted.

## Classification

BUILD NOW, reduced MVP.

## Decision

Build a local Slops OS DBS router workflow now.

The immediate build is a lightweight markdown workflow for converting research and critique into DBS-ready architecture outputs.

It is not a fully automated multi-agent system.

## Why Build Now

The research and critic review agree on the useful core:

- Persistent folder-based context is valuable.
- DBS layers reduce context confusion.
- Reusable skills can turn repeated work into durable workflows.
- Research, review, decisions, specs, skills, and prompts need separate homes.

The reduced MVP captures that value without adding automation too early.

## Do Now

- Create reference patterns from validated research.
- Create critic reviews from critique output.
- Create decision records for accepted direction.
- Create flexible specs for reusable architecture.
- Create scoped skills for repeated routing workflows.
- Create runnable Claude/Codex handoff prompts.
- Keep each artifact modular and short.
- Require explicit file paths and read-first instructions.
- Use least-privilege reading instead of broad folder scans.
- Add prior-use review loops to skills.

## Do Later

- Add index updates after the files prove useful.
- Add examples or tests to the router skill after repeated use.
- Add deterministic scripts only when a routing step becomes repetitive and brittle.
- Add connector workflows only after local markdown routing is stable.
- Consider broader skill discovery tooling only after scoping rules are proven.
- Consider Composio/Rube only when a specific external app workflow needs it.

## Do Not Do Yet

- Do not create custom MCP servers.
- Do not add Composio/Rube setup.
- Do not scan or reorganize the entire Slops OS folder.
- Do not create new naming conventions.
- Do not create Solutions files unless explicitly asked.
- Do not build a full autonomous multi-agent system.
- Do not create a monolithic "run the whole business" skill.
- Do not let a skill auto-edit itself.

## Guardrails

- DBS pillars use Title Case: `Direction`, `Blueprints`, `Solutions`, `References`, `Archive`.
- Single-word content folders use lowercase.
- Multi-word content folders use kebab-case.
- Skill packages use kebab-case.
- Skill files are named `SKILL.md`.
- Regular markdown files use kebab-case.
- Research and critique should inform implementation, not skip directly to implementation.
- Architecture is needed now; implementation comes later.

## Key Risk

The main risk is false automation confidence.

The workflow must not imply that agents automatically discover every skill, safely scan every folder, or correctly refresh stale file context without explicit prompts and verification.

## Related Files

```text
References/patterns/slops-os-dbs-patterns.md
Direction/reviews/slops-os-dbs-critic-review.md
Blueprints/specs/slops-os-dbs-routing-and-skill-creation.spec.md
Blueprints/skills/dbs-research-to-architecture-router/SKILL.md
Blueprints/prompts/slops-os-dbs-claude-codex-handoff.md
```

## Next Safe Step

Use the handoff prompt to review these files with Claude, then update indexes only after Justin approves the routing.
