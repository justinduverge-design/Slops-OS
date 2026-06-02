---
name: slops-markdown-authoring
description: Create, route, prune, and validate Slops OS Markdown files across DBS. Use when Justin asks to create or clean Markdown operating packages, decisions, reviews, specs, prompts, reference patterns, handoffs, or lightweight skills; do not use for app code, full automation, file locking, rollback, multi-agent orchestration, or self-editing the skill.
---

# Slops Markdown Authoring

## Purpose

Use this skill to create and maintain practical Slops OS Markdown files.

The goal is to make Markdown help real product work move faster. This skill should not create productivity theater, monolithic workflows, or automation infrastructure.

## Use This Skill For

- Creating DBS Markdown packages.
- Routing Markdown files to the right DBS layer.
- Separating research, critique, decisions, specs, skills, and prompts.
- Pruning stale, duplicate, or overgrown Markdown.
- Applying the Source Integrity Principle after repeated corrections.
- Creating lightweight procedural `SKILL.md` files when Justin asks.

## Do Not Use This Skill For

- Application code.
- Production infrastructure.
- Database migrations.
- Secrets, credentials, cookies, tokens, or private user data.
- Full automation.
- File locking.
- Rollback systems.
- Multi-agent orchestration.
- Connector setup.
- A monolithic "run everything" workflow.
- Auto-editing this skill.

## Canonical Routing

Route by purpose:

```text
Direction/decisions   Accepted decisions and scope gates
Direction/reviews     Critique, risks, weak assumptions, audits
Blueprints/specs      Flexible standards and validation criteria
Blueprints/skills     Reusable procedural workflows
Blueprints/prompts    Runnable Claude/Codex handoffs
References/patterns   Research-derived repeated patterns
References/research   Raw research, when needed
Solutions             Finished outputs only when explicitly asked
Archive               Superseded files only when replacing
```

## Required Inputs

Minimum inputs:

- Topic or project name.
- Target file list or target DBS layer.
- Source material, if the file depends on research or critique.
- Locked decisions or exclusions from Justin.

Helpful inputs:

- Existing target files.
- Current context file.
- Relevant spec, decision, or handoff.
- Known repeated corrections.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Identify the target DBS layer and exact paths.
3. Read named source files first.
4. If no source files are named, read the nearest current context and existing target files.
5. Re-read a target file before editing it.
6. Avoid Archive, imported files, and broad folder scans unless Justin explicitly asks.
7. Do not read secrets, app source, deployment files, or private user data for Markdown-only work.

## Process Recipe

1. Classify the work:
   - `BUILD NOW`
   - `SPEC ONLY`
   - `REVIEW ONLY`
   - `REFERENCE ONLY`
   - `DEFER`
2. Decide the artifact type:
   - reference pattern
   - review
   - decision
   - spec
   - skill
   - prompt
   - handoff
   - index
3. Route the file to the matching DBS path.
4. Keep the file focused on one purpose.
5. Separate procedure from reference.
6. Add explicit exclusions where scope creep is likely.
7. Include validation criteria in specs.
8. Include a next safe step when useful.
9. Verify the path and read back critical files.
10. Report assumptions, exclusions, and index updates needed.

## Source Integrity Principle

Repeated corrections should update the source Markdown, not just the generated output.

When a mistake repeats:

1. Identify which source file led to the mistake.
2. Confirm that file is current authority.
3. Recommend a precise source update.
4. Apply the update only when Justin explicitly asks.
5. Check nearby context for contradictions.

Do not auto-edit this skill from its own prior-use findings.

## Pruning Rules

Recommend pruning when a file:

- Repeats a newer source.
- Points to retired paths.
- Mixes layers.
- Has broad background that agents do not need.
- Hides implementation inside reference.
- Hides research inside procedure.
- Slows real product work.

Prefer shortening or rerouting before deletion.

Archive only when replacing or superseding files with approval.

## Output Contract

When using this skill, report:

- Files created or updated.
- Exact paths.
- Source files used.
- Assumptions.
- What was intentionally excluded.
- Validation performed.
- Index updates needed.
- Next safe step.

## Prior-Use Review And Improvement Loop

Before editing this skill, check:

```text
Blueprints/skills/slops-markdown-authoring/notes/prior-use-review.md
```

If it exists, look for repeated issues:

- Wrong DBS routing.
- Overlong files.
- Monolithic workflow creation.
- Research placed inside a skill.
- Procedure placed inside References.
- Missing validation criteria.
- Stale source left unfixed.
- Markdown work that did not help product progress.

Recommend improvements when the same issue repeats.

Do not auto-edit this skill. Justin must explicitly approve skill updates.

## Failure Modes

Avoid:

- Creating docs because the folder feels incomplete.
- Treating Markdown polish as product progress.
- Reading the whole workspace for a small file task.
- Turning a spec into implementation.
- Turning a skill into an agent role.
- Creating automation when a small markdown standard is enough.
- Forgetting the Source Integrity Principle.

## Completion Checklist

- [ ] Did I preserve MVP simplicity?
- [ ] Did I route each file by purpose?
- [ ] Did I separate procedure from reference?
- [ ] Did I avoid app code and sensitive files?
- [ ] Did I include validation criteria where needed?
- [ ] Did I preserve or recommend source updates for repeated corrections?
- [ ] Did I avoid full automation and orchestration?
- [ ] Did I report next safe step?
