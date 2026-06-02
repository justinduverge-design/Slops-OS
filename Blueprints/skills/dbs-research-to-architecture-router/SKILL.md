---
name: dbs-research-to-architecture-router
description: Convert research packets and critic reviews into modular Slops OS DBS architecture outputs, including reference patterns, reviews, decisions, specs, skill drafts, and handoff prompts. Use when Justin asks to route research plus critique into DBS-ready files; do not use for app implementation, production changes, custom MCP setup, Composio/Rube setup, full-folder reorganization, or self-editing the skill.
---

# DBS Research To Architecture Router

## Purpose

Use this skill to convert research and critique into DBS-ready architecture artifacts.

The skill helps preserve useful research, capture critic warnings, make an explicit decision, write a flexible spec, and prepare a handoff prompt without collapsing everything into one monolithic workflow.

This skill does not execute the architecture it describes.

## Use This Skill For

- Turning research plus critic output into Slops OS DBS files.
- Creating `References/patterns/<topic>-patterns.md`.
- Creating `Direction/reviews/<topic>-critic-review.md`.
- Creating `Direction/decisions/<topic>-decision.md`.
- Creating `Blueprints/specs/<topic>.spec.md`.
- Creating scoped skill drafts under `Blueprints/skills/<skill-name>/SKILL.md`.
- Creating reusable Claude/Codex handoff prompts under `Blueprints/prompts`.

## Do Not Use This Skill For

- App code.
- Production infrastructure.
- Database migrations.
- Secrets, credentials, cookies, or private user data.
- Custom MCP servers.
- Composio/Rube setup.
- Full Slops OS folder scans.
- Folder reorganization.
- Solutions outputs unless Justin explicitly asks.
- Agent RBAC files.
- A monolithic "run the whole business" skill.
- Auto-editing this skill.

## Canonical Paths

Use existing Slops OS naming:

```text
Direction/decisions
Direction/reviews
Blueprints/specs
Blueprints/skills/<skill-name>/SKILL.md
Blueprints/prompts
References/patterns
```

DBS pillars use Title Case. Content folders use the existing lowercase or kebab-case convention. Skill package folders use kebab-case. Regular markdown files use kebab-case.

## Required Inputs

Minimum inputs:

- Topic name.
- Research packet or research summary.
- Critic review or critique summary.
- Locked decisions from Justin.
- Requested output paths.

Optional inputs:

- Existing related specs, decisions, patterns, skills, or prompts.
- Prior-use review notes.
- Naming constraints.
- Explicit exclusions.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Identify the DBS layer and requested file paths.
3. Read the named research and critic source files.
4. Check whether requested target files already exist.
5. Re-read an existing target file before editing it.
6. Read only nearby indexes or context if needed for naming and routing.
7. Do not scan the whole Slops OS folder unless Justin asks for an audit.

## Process Recipe

1. Classify the work:
   - `BUILD NOW`
   - `SPEC ONLY`
   - `REVIEW ONLY`
   - `DEFER`
2. Extract research patterns into a reference file.
3. Extract critique into a review file.
4. Record the decision separately.
5. Write an implementation-neutral spec.
6. Create a modular skill only if the workflow is repeatable.
7. Create a prompt only if another agent needs a runnable handoff.
8. Keep final outputs separate by layer.
9. Verify paths.
10. Report exclusions and next safe step.

## Artifact Rules

Reference pattern files should include:

- Research summary.
- Repeated patterns.
- Tool or data recommendations.
- Not-now findings.
- No implementation instructions.

Critic review files should include:

- Strengths.
- Weak assumptions.
- Research gaps.
- Complexity or overbuild risks.
- Missing decisions.
- Prior-use recommendations when relevant.

Decision files should include:

- Status.
- Classification.
- Decision.
- Rationale.
- Do now.
- Do later.
- Do not do yet.
- Guardrails.

Spec files should include:

- Objective.
- Scope.
- Out of scope.
- Dependencies.
- Security/privacy.
- UX/flow.
- Build order.
- Validation.

Prompt files should include:

- Objective.
- Read-first files.
- Scope.
- Exclusions.
- Required outputs.
- Completion report.

## Output Contract

When the skill is used, report:

- Files created or updated.
- Exact paths.
- Source files used.
- Assumptions.
- What was intentionally excluded.
- Index updates needed.
- Next safe step.

## DBS Routing

Route by purpose:

```text
References/patterns      Research-derived repeated patterns
Direction/reviews        Critic output, audits, and risk reviews
Direction/decisions      Accepted decisions and scope gates
Blueprints/specs         Flexible architecture specs
Blueprints/skills        Reusable workflows
Blueprints/prompts       Runnable handoffs
Solutions                Final outputs only when explicitly asked
Archive                  Superseded material only when replacing files
```

## Prior Use Review & Improvement Loop

Before editing this skill, check:

```text
Blueprints/skills/dbs-research-to-architecture-router/notes/prior-use-review.md
```

If it exists, look for repeated problems:

- Wrong DBS layer.
- Too many files read.
- Implementation instructions created too early.
- Research, decision, spec, skill, and prompt merged into one file.
- Skill became too broad.
- Critic warnings were softened or lost.
- Naming conventions drifted.

Recommend improvements when repeated issues appear.

Do not auto-edit this skill. Justin must explicitly approve updates to the skill file.

## Failure Modes

Avoid:

- Treating automatic discovery as guaranteed.
- Scanning the whole folder tree for a small routing task.
- Creating Composio/Rube setup from research notes.
- Creating custom MCP setup from research notes.
- Creating Solutions files when the user asked for architecture only.
- Creating a monolithic skill.
- Letting a skill revise itself.
- Turning critique into implementation before a decision exists.

## Completion Checklist

- [ ] Did I classify the work?
- [ ] Did I preserve modular DBS outputs?
- [ ] Did I read only relevant files?
- [ ] Did I preserve critic risks?
- [ ] Did I avoid implementation creep?
- [ ] Did I avoid custom MCP and connector setup?
- [ ] Did I keep the skill modular?
- [ ] Did I report index updates and next safe step?
