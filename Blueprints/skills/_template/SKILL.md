---
name: slops-skill-template
description: Master template for SLOPS-authored Claude/Codex skill markdown files. Use as the required structure when creating or normalizing skills under Blueprints\skills. This template is reference material, not an active operational skill.
---

# SLOPS Skill Template

## Purpose

This file defines the standard shape for SLOPS-authored skills.

A skill is a reusable workflow. It explains how a type of work should be performed, what context must be read, what outputs are expected, what boundaries must be respected, and how the result should be routed through the DBS folder system.

This template is not itself a callable production skill. Copy its structure when creating or upgrading skill files.

## Skill Identity

Replace this section with the specific identity of the skill.

- **Skill name:** `<skill-name>`
- **Primary user:** Justin
- **Primary agents:** Claude for planning/review; Codex for file edits, commands, and verification when instructed.
- **DBS layer:** `Blueprints\skills`
- **Skill type:** simple skill or skill package
- **Status:** draft, active, restricted, reference-only, or archived

## When to Use

Use the skill when:

- The user request directly matches the skill purpose.
- The requested output is repeatable and should follow a standard workflow.
- The work belongs in the skill's declared DBS layer.
- The agent needs guardrails to avoid scope creep.

Do not use the skill when:

- The task belongs to a different skill.
- The task requires broad project decisions that should start in `Direction`.
- The task requires code execution before a plan exists.
- The task would touch secrets, payments, auth, production, user data, databases, or deployment without explicit approval.

## Required Inputs

Before doing work, identify the minimum context needed.

Required inputs may include:

- User request.
- Current file path or target folder.
- Existing source files.
- Relevant DBS index files.
- Relevant handoff, spec, audit, or decision files.
- Prior-use notes for the skill, if present.

If required context is missing, make the smallest safe assumption only when the task is low-risk and reversible. Otherwise, ask for the missing file or clarify the boundary.

## Read-First Procedure

Use least privilege.

1. Read only the files needed for the current task.
2. Prefer current files over archived files.
3. Treat `_archive`, `_imported`, `_drafts`, and stale copies as non-authoritative unless the user says otherwise.
4. Search before reading large files.
5. Do not load unrelated project folders.
6. Do not use external runtime dependencies as canonical SLOPS-authored skills.

## Process Recipe

Replace this section with exact steps for the skill.

A good recipe should be concrete enough that another agent can follow it without guessing.

Recommended structure:

1. Confirm the task type.
2. Identify the DBS layer.
3. Identify the authoritative source files.
4. Extract the relevant facts, decisions, constraints, and open questions.
5. Produce the required output.
6. Route the output to the correct folder or recommend the exact path.
7. Report assumptions, exclusions, and next steps.

Avoid vague steps such as “analyze deeply” unless the skill defines what analysis means.

## Output Contract

Every skill must define what it produces.

Possible outputs:

- Markdown file.
- Prompt artifact.
- Skill file.
- Agent role file.
- Audit report.
- Decision record.
- Handoff.
- Review summary.
- Patch plan.
- Folder structure recommendation.

The output must include:

- Target path.
- Purpose.
- Source files used.
- What changed or should change.
- What was intentionally not touched.
- Next safe step.

When a user asks for “no edit yet,” provide analysis only.

## DBS Routing

Use this routing model unless the skill defines a narrower rule.

```text
Direction/
  decisions/       Permanent decisions and ADR-style choices.
  reviews/         Human/agent reviews, critiques, risk notes, and audits.
  roadmaps/        Strategy, priorities, release plans, and timelines.

Blueprints/
  skills/          Reusable workflows and skill packages.
  agents/          Reusable agent roles, RBAC, divisions, and personas.
  prompts/         Runnable task prompts for Claude, Codex, or other agents.
  templates/       Reusable document shapes.
  specs/           Implementation-neutral requirements and contracts.

References/
  research/        Raw source material and extracted research notes.
  patterns/        Repeated findings, source patterns, competitive patterns.
  examples/        Non-authoritative examples and inspiration.

Solutions/
  deliverables/    Final outputs intended to be used or shared.
  reports/         Completed summaries and finished reports.

Archive/
  superseded/      Old material replaced by newer decisions.
  imports/         External source dumps kept for reference.
```

## Skill Package Structure

Simple skills may contain only:

```text
<skill-name>/
  SKILL.md
```

Skill packages may include:

```text
<skill-name>/
  SKILL.md
  references/
  examples/
  tests/
  notes/
  interface/
```

Folder meanings:

- `references/`: skill-specific source material.
- `examples/`: sample inputs and outputs.
- `tests/`: expected behavior and validation cases.
- `notes/`: prior-use reviews and improvement ideas.
- `interface/`: launcher or provider metadata, not global agent authority.

Do not use a local skill support folder to grant broad project authority.

## Agent and RBAC Rules

Skills are workflows, not actors.

A skill may recommend an agent, but it must not grant broad permissions.

Use this split:

- `Blueprints\skills`: how work is done.
- `Blueprints\agents`: who does the work and what authority they have.
- `Blueprints\prompts`: what the next agent should do now.

Permission principles:

- Least privilege.
- Read only what is needed.
- Write only to approved target paths.
- Destructive actions require explicit approval.
- Production, payments, auth, secrets, user data, database migrations, DNS, SSL, VPS, and deployment changes require explicit approval.

## Failure Modes

Each skill should list likely mistakes.

Common failure modes:

- Over-editing beyond the request.
- Treating references as current decisions.
- Mixing skills, agents, and prompts into one file.
- Creating a prompt when the user asked for analysis only.
- Creating analysis when the user asked for a runnable prompt.
- Moving imported files into active authority without review.
- Ignoring DBS routing.
- Ignoring least privilege.
- Failing to state source files used.
- Failing to produce a target path.

## Prior Use Review Loop

Before editing a skill, check whether the skill has a prior-use file.

Recommended path:

```text
<skill-name>/notes/prior-use-review.md
```

If present, review:

- What worked last time.
- What failed.
- What the user corrected.
- What assumptions were wrong.
- What should be added to the skill.
- Whether a new support file, test, example, or routing rule is needed.

When improving a skill, do not silently mutate its purpose. Preserve the skill's identity unless the user approves a rename or split.

## Claude/Codex Placement Prompt Pattern

When a skill file must be created or placed by Codex, use a prompt like:

```text
You are Codex working in the local SLOPS folder.

Objective:
Create or update the skill file at:
<target path>

Read first:
- <relevant source file>
- <relevant index file>

Rules:
- Do not edit app source code.
- Do not edit secrets, deployment files, package files, or database files.
- Do not move files unless explicitly instructed.
- Preserve DBS folder structure.
- Use least privilege.
- Report files changed and assumptions.

Deliverable:
Write the approved markdown content exactly to the target path.
```

## Quality Checklist

Before finalizing a skill, verify:

- [ ] Frontmatter has `name` and `description`.
- [ ] Description clearly explains when to use the skill.
- [ ] The skill has a narrow purpose.
- [ ] Required inputs are clear.
- [ ] Read-first rules are least-privilege.
- [ ] Process steps are concrete.
- [ ] Output contract is explicit.
- [ ] DBS routing is defined or referenced.
- [ ] RBAC boundaries are clear.
- [ ] Failure modes are listed.
- [ ] Prior-use review loop is included.
- [ ] The skill does not grant unauthorized execution authority.
