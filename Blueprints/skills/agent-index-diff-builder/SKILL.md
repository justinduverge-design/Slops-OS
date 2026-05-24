---
name: agent-index-diff-builder
description: Build proposed AGENT_INDEX.md additions or diffs from SLOPS agent wrapper files without applying them. Use when Justin wants reviewable activation/index changes; do not mutate AGENT_INDEX.md unless explicitly approved.
---

# Agent Index Diff Builder

## Purpose

Use this skill to turn reviewed agent wrappers into a proposed `AGENT_INDEX.md` change that Justin can inspect before activation.

The output is a review artifact, not an applied authority change. This skill protects SLOPS from accidentally making candidate agents callable.

## Skill Identity

- **Skill name:** `agent-index-diff-builder`
- **Primary user:** Justin
- **Primary agents:** Claude for review; Codex for file reads and summary creation when instructed.
- **DBS layer:** `Blueprints\skills`
- **Skill type:** simple skill
- **Status:** active

## When to Use

Use this skill when Justin asks to:

- Propose `AGENT_INDEX.md` entries from wrapper files.
- Build a review table for candidate agent promotion.
- Compare wrappers against the current authority matrix.
- Prepare an index diff while keeping the real index unchanged.
- Identify missing wrapper fields before activation.

Do not use this skill when:

- Justin asks to create wrappers; use `agent-wrapper-generator`.
- Justin asks for RBAC/security analysis only; use `rbac-risk-review`.
- Justin has not identified which wrappers or divisions should be considered.
- The task requires direct production, secrets, auth, payments, database, deployment, or infrastructure work.

## Required Inputs

Minimum inputs:

- Target wrapper files or division folders.
- Current `Blueprints\agents\AGENT_INDEX.md`.
- Desired output location, if a file should be written.
- Whether Justin wants table-only, patch-style diff, or both.

If no output path is named, place review summaries under:

```text
Direction\reviews
```

## Canonical Paths

Read:

```text
Blueprints\agents\AGENT_INDEX.md
Blueprints\agents\<division>\<agent>.md
Blueprints\tools\tool-permissions.md
Blueprints\skills\SKILL_ROUTING.md
```

Write review output, when requested, to:

```text
Direction\reviews
```

Do not write the actual index unless Justin explicitly says to apply the change.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Read the current `AGENT_INDEX.md`.
3. Read only the named wrapper files or selected division folders.
4. Read `tool-permissions.md` if tier caps need validation.
5. Read `SKILL_ROUTING.md` if skill names need validation.
6. Do not read imported source files unless a wrapper lacks provenance and the user approves.

## Process Recipe

1. Inventory the selected wrapper files.
2. Extract for each wrapper:
   - Agent name.
   - Division.
   - Path.
   - Status.
   - DBS layer.
   - Allowed use.
   - May invoke skills.
   - Tool tier cap.
   - Approval required.
3. Compare each wrapper to existing `AGENT_INDEX.md` entries.
4. Flag conflicts:
   - Duplicate names.
   - Conflicting status.
   - Missing tier cap.
   - Missing denied work.
   - Skill names not present in routing.
   - Candidate role implying active authority.
5. Build a proposed table using the current index column style.
6. If requested, build a patch-style section marked as proposed only.
7. Separate safe additions from blocked additions.
8. State exactly what was not applied.

## Proposed Index Table Shape

Use this table unless the current index has a more specific section format:

```markdown
| Agent | Division | Path | Status | Layer | Allowed Use | May Invoke Skills | Tool Tier Cap | Approval Required |
|---|---|---|---|---|---|---|---|---|
```

Status guidance:

- `candidate`: default for wrapper files that are useful but not active.
- `restricted`: use for high-risk roles with narrow scope.
- `active`: propose only when Justin explicitly approved activation.
- `reference-only`: no callable authority.
- `do-not-activate`: blocked from index promotion.

## Output Contract

When using this skill, produce:

- Target output path, if a review file was written.
- Source wrapper files used.
- Proposed `AGENT_INDEX.md` additions or diff.
- Conflicts and missing fields.
- Entries blocked from promotion.
- A clear statement that `AGENT_INDEX.md` was or was not edited.

## DBS Routing

- Proposed index reviews: `Direction\reviews\`
- Actual authority file: `Blueprints\agents\AGENT_INDEX.md`
- Wrapper files: `Blueprints\agents\<division>\`
- Do not route proposed authority changes into imported folders.

## RBAC Boundaries

This skill may propose authority changes.

It may not:

- Apply authority changes without explicit Justin approval.
- Promote imported agents directly from `_imported`.
- Hide missing approval gates.
- Convert broad role claims into write authority.
- Grant Tier 4 or Tier 5 access in a proposed row unless Justin has explicitly approved that tier.
- Propose access to secrets, auth, payments, user data, databases, deployment, infrastructure, ad accounts, email sending, or external account mutation without escalation.

## Failure Modes

Watch for:

- Accidentally editing `AGENT_INDEX.md`.
- Omitting existing conflicts.
- Proposing `active` status for candidate wrappers.
- Treating division folder membership as authority.
- Dropping tool tier caps from the proposed table.
- Ignoring missing denied work or missing escalation rules.
- Proposing skills that do not exist or are not routed.

## Prior Use Review Loop

Before changing this skill, check:

```text
Blueprints\skills\agent-index-diff-builder\notes\prior-use-review.md
```

If present, incorporate repeated corrections into failure modes or the process recipe.

## Completion Checklist

- Current index was read.
- Only selected wrappers were analyzed.
- Proposed changes are clearly marked as proposed.
- Activation status is conservative.
- RBAC gaps are flagged.
- `AGENT_INDEX.md` remains unchanged unless explicitly approved.
