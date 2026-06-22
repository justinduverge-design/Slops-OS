---
name: agent-wrapper-generator
description: Generate least-privilege SLOPS agent wrapper files under Blueprints\agents from approved review memos or explicit candidate selections. Use when Justin asks to create wrapper files for selected agents; do not activate agents or edit AGENT_INDEX.md unless separately approved.
---

# Agent Wrapper Generator

## Purpose

Use this skill to create SLOPS agent wrapper files from reviewed candidate agents.

A wrapper is not an activation. It is a controlled role file that preserves the useful function of a candidate while adding SLOPS boundaries: status, division, allowed work, denied work, read-first files, tool tier cap, approved skills, writable paths, denied paths, and escalation rules.

## Skill Identity

- **Skill name:** `agent-wrapper-generator`
- **Primary user:** Justin
- **Primary agents:** Claude for selection and review; Codex for file creation when instructed.
- **DBS layer:** `Blueprints\skills`
- **Skill type:** simple skill
- **Status:** active

## When to Use

Use this skill when Justin asks to:

- Create agent wrapper files from selected candidates.
- Convert an imported-agent review memo into `Blueprints\agents\<division>\<agent>.md` files.
- Add least-privilege permissions to candidate agent roles.
- Preserve imported source notes while preventing accidental activation.
- Create wrappers without updating `AGENT_INDEX.md`.

Do not use this skill when:

- The task is only classification; use an imported-agent review workflow instead.
- The task is to update `AGENT_INDEX.md`; use `agent-index-diff-builder` first.
- The task is to create a skill; use `slops-skill-author`.
- The task requires app source code, production, secrets, auth, payments, user data, databases, deployment, or infrastructure changes.

## Required Inputs

Minimum inputs:

- Candidate agent name.
- Target division.
- Source or review memo path.
- Classification decision: usually `candidate`, `restricted`, or `reference-only`.
- Intended purpose and allowed work.
- Denied work and denied paths.
- Tool tier cap.
- Approved SLOPS skills, if any.
- Escalation owner.

If the review memo is missing, create only from Justin's explicit selections and mark uncertainty in `## Notes`.

## Canonical Paths

Wrapper files live under:

```text
Blueprints/agents/
```

Imported source files remain quarantined under:

```text
Blueprints\agents\_imported
```

Review summaries usually belong under:

```text
Direction\reviews
```

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Read the named review memo or selected source files only.
3. Read `Blueprints\agents\AGENT_INDEX.md` to avoid conflicting names and authority.
4. Read `Blueprints\tools\tool-permissions.md` for tier caps.
5. Read `Blueprints\skills\SKILL_ROUTING.md` only if assigning approved skills.
6. Do not bulk-read unrelated imported divisions.

## Process Recipe

1. Confirm each selected candidate has a clear role, division, and target path.
2. Normalize the filename to kebab-case.
3. Set status conservatively:
   - `candidate` for useful but not active roles.
   - `restricted` for useful roles with high-risk scope.
   - `reference-only` only when Justin still wants a wrapper but no callable use.
4. Set DBS layer:
   - `Global Blueprint` for reusable SLOPS roles.
   - `Project Blueprint` for app-specific roles.
   - `Direction Review` for review-only wrappers.
   - `Reference Only` for non-callable material.
5. Define allowed work as narrow, observable tasks.
6. Define denied work before write permissions.
7. Apply a tool tier cap:
   - Tier 1 for read-only/reference roles.
   - Tier 2 for safe drafting and analysis outputs.
   - Tier 3 only for guarded writes to approved Blueprint/Direction paths.
   - Tier 4 or 5 only when Justin explicitly approves.
8. Add approved skills only when the skill is relevant and already authored or explicitly requested.
9. Add escalation rules for every high-risk boundary.
10. Preserve source provenance in `## Notes`.

## Required Wrapper Shape

Use this structure:

```markdown
# <Agent Name>

## Status

candidate | active | restricted | reference-only | archived

## Division

<Division name>

## DBS Layer

Global Blueprint | Project Blueprint | Direction Review | Reference Only | Runtime Candidate

## Purpose

<One or two sentences.>

## Allowed Work

- <allowed task>

## Denied Work

- <denied task>

## Required Read-First Files

- <path>

## May Invoke Skills

- <skill-name>

## Tool Tier Cap

Tier <n> - <reason>

## May Write To

- <path>

## Must Not Write To

- <path>

## Approval Required For

- <action>

## Escalates To

- Justin
- Claude planner
- Codex executor
- Security reviewer
- Product owner

## Notes

<Source and limitations.>
```

## Output Contract

When using this skill, produce:

- Wrapper files at the requested paths.
- A short review summary listing created files.
- Any proposed `AGENT_INDEX.md` changes as text only unless Justin explicitly asks to apply them.
- A list of intentionally excluded candidates.
- Assumptions and source files used.

## DBS Routing

- Agent wrappers: `Blueprints\agents\<division>\<agent>.md`
- Wrapper creation summaries: `Direction\reviews\`
- Imported references: leave in `Blueprints\agents\_imported\`
- Do not write to `.codex\skills`, app code, secrets, production, database, deployment, or runtime prompt folders.

## RBAC Boundaries

This skill may create wrapper files only when requested.

It may not:

- Activate an agent by editing `AGENT_INDEX.md` without explicit approval.
- Grant production, secrets, auth, payments, database, deployment, VPS, DNS, SSL, email-send, ad-spend, or external-account authority.
- Move or delete imported files.
- Expand tool permissions beyond the reviewed role.
- Convert broad imported claims into SLOPS authority.

Escalate to Justin before any Tier 4 or Tier 5 action.

## Failure Modes

Watch for:

- Creating wrappers for unselected candidates.
- Treating wrapper creation as activation.
- Forgetting denied paths.
- Giving all agents the same generic purpose.
- Assigning a tool tier cap that exceeds the role.
- Allowing writes into app source or runtime folders without approval.
- Omitting source provenance.
- Updating `AGENT_INDEX.md` when Justin asked for summary-only changes.

## Prior Use Review Loop

Before changing this skill, check:

```text
Blueprints\skills\agent-wrapper-generator\notes\prior-use-review.md
```

If present, incorporate repeated corrections into failure modes or the process recipe.

## Completion Checklist

- Target wrapper paths exist.
- Every wrapper has status, division, DBS layer, allowed work, denied work, tier cap, write boundaries, and escalation rules.
- Imported files were not modified.
- `AGENT_INDEX.md` was not edited unless explicitly approved.
- Summary names proposed index changes separately from applied file changes.
