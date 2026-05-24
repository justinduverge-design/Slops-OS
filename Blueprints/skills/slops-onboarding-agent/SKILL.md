---
name: slops-onboarding-agent
description: Onboard imported SLOPS agent divisions before promotion. Use when reviewing one `_imported` agent division for Phase 5-style selection, RBAC triage, candidate wrapper planning, and handoff into `slops-agent-author`; do not use to activate agents, edit AGENT_INDEX.md, touch app source, or grant production/secrets/user-data authority.
---

# Slops Onboarding Agent

## Purpose

Use this skill to run the pre-wrapper onboarding pass for imported SLOPS agent divisions.

This skill answers: which imported agents are worth wrapping, which should stay reference-only, which must be blocked, and what exact wrapper constraints `slops-agent-author` should apply.

## Skill Identity

- Skill name: `slops-onboarding-agent`
- Primary user: Justin
- Primary agents: Claude for review and selection; Codex for approved markdown file creation
- DBS layer: `Blueprints\skills`
- Skill type: simple skill with optional interface metadata
- Status: candidate until Justin approves routing/index updates

## How This Works With `slops-agent-author`

Use `slops-onboarding-agent` first.

Then use `slops-agent-author` second.

Division review flow:

1. `slops-onboarding-agent` reads the division, applies the selection rubric, flags RBAC risk, and chooses candidate/reference/do-not-activate outcomes.
2. `slops-agent-author` turns selected candidates into doctrine wrapper files with allowed work, denied work, write boundaries, tool tier caps, approval gates, and escalation rules.
3. Justin reviews the proposed `AGENT_INDEX.md` changes before any index edit or activation.

This skill does not replace `slops-agent-author`. It prepares cleaner input for it.

## When To Use

Use this skill when Justin asks to:

- Review an imported agent division for Phase 5 or later promotion.
- Decide which imported agents deserve SLOPS wrapper files.
- Analyze a previous division review and standardize the remaining phases.
- Prepare a division-level review summary before `AGENT_INDEX.md` changes.
- Identify overlap between imported agents, Claude, Codex, existing SLOPS agents, and existing SLOPS skills.
- Flag imported agents that imply risky authority before anyone wraps or activates them.

## Do Not Use

Do not use this skill to:

- Activate an imported agent.
- Edit `AGENT_INDEX.md` without explicit Justin approval.
- Write final agent wrapper files without also applying `slops-agent-author`.
- Grant tool authority, production authority, secrets access, app source access, database access, payment authority, auth authority, or user-data access.
- Review multiple imported divisions in one pass unless Justin explicitly asks.
- Touch `ssffmvp` source, SQL, frontend, client, scripts, tests, evals, package files, `node_modules`, `.git`, secrets, production, deployment, DNS, SSL, Nginx, VPS, Docker, GitHub Actions, payments, auth, databases, or `Archive\quarantine`.

## Required Inputs

Minimum inputs:

- Division name.
- Imported division folder path.
- Current phase or review name.
- Output path for the division review summary.

Recommended inputs:

- `Blueprints\agents\AGENT_INDEX.md`
- `Blueprints\skills\slops-agent-author\SKILL.md`
- `Blueprints\skills\SKILL_ROUTING.md`
- `Blueprints\tools\tool-permissions.md`
- Current Phase 5 plan or migration plan.
- Prior division review summaries, especially Phase 5A when standardizing later phases.

## Read-First Procedure

Use least privilege.

1. Read the user request and confirm the division scope.
2. Read `Blueprints\agents\AGENT_INDEX.md`.
3. Read `Blueprints\skills\slops-agent-author\SKILL.md`.
4. Read `Blueprints\skills\SKILL_ROUTING.md`.
5. Read `Blueprints\tools\tool-permissions.md`.
6. Read the current phase plan, if named.
7. Read all imported agent files in the single requested division before making selection decisions.
8. Read prior review summaries only when the task asks to standardize or compare phases.
9. Do not inspect unrelated divisions, app source, secrets, production files, database files, package files, or quarantine.

## Selection Rubric

For each imported agent, assign exactly one recommended status:

- `candidate`
- `reference-only`
- `do-not-activate`

Evaluate each agent on:

- Relevance: Is this directly useful for SLOPS OS, ssffmvp MVP, Corvus launch, or the next 90 days?
- Risk: Does it imply production, secrets, payments, auth, databases, app source, external tool mutation, outbound messaging, user data, customer data, or paid systems?
- Overlap: Does Claude, Codex, an existing SLOPS skill, or an existing SLOPS agent already cover this work well enough?
- Wrapper feasibility: Can `slops-agent-author` write a clear least-privilege wrapper without ambiguity?

Default decisions:

- Choose `candidate` only when the agent has near-term usefulness and can be safely constrained to draft/review/recommendation work.
- Choose `reference-only` when the agent is useful inspiration but overlaps heavily or lacks immediate launch need.
- Choose `do-not-activate` when the imported source implies unsafe authority that cannot be clearly constrained without a deeper security, privacy, data, legal, or business review.

## Phase 5A Lessons To Reuse

Phase 5A created a useful pattern:

- Read every imported agent in the division before choosing winners.
- Promote only the few that Justin might actually call in the next 30-90 days.
- Treat original `tools: Read, Write, Edit, WebFetch, WebSearch` fields as non-authoritative.
- Candidate wrappers should be Tier 2 unless Justin explicitly approves more.
- Candidate wrappers should write draft markdown only.
- Risky user-data, feedback, behavioral profiling, outbound communication, paid tooling, analytics, and external customer-system access should usually become `do-not-activate` pending review.
- External research or trend agents often overlap `pre-build-research`; prefer `reference-only` unless there is a specific launch task.
- Do not edit `AGENT_INDEX.md`; propose exact changes for Justin approval.

## Process Recipe

1. Define the division scope.
   - Identify the folder, file count, phase label, and target review summary path.

2. Build the file list.
   - List all imported agent files in the division.
   - Read every file before selecting candidates.
   - Record any missing expected files.

3. Extract agent signals.
   - Role purpose.
   - Implied tools.
   - Implied write authority.
   - Implied external systems.
   - Implied user/customer data.
   - Launch relevance.
   - Existing SLOPS overlap.

4. Assign status.
   - Use `candidate`, `reference-only`, or `do-not-activate`.
   - Prefer fewer candidates over mass promotion.
   - Include the specific reason for each status.

5. Prepare wrapper intent for candidates.
   - Recommended wrapper path.
   - Purpose in SLOPS context.
   - Allowed work.
   - Denied work.
   - Required read-first files.
   - Allowed skills from `SKILL_ROUTING.md`.
   - Tool tier cap.
   - May write / must not write.
   - Approval gates.
   - Escalation path.

6. Hand candidate wrapper creation to `slops-agent-author`.
   - Apply the current required agent file shape.
   - Keep wrappers as governance files, not full persona copies.
   - Preserve imported files unchanged.

7. Identify skill creation opportunities.
   - Review repeated patterns across the imported agents.
   - Decide whether a repeated pattern should become a reusable SLOPS skill instead of an active agent.
   - Compare each pattern against existing SLOPS skills.
   - Recommend new skills only when the workflow is repeatable, useful, and safer as a skill than as an agent.
   - Do not create the skill during onboarding. Only recommend it.
   - Use `slops-skill-author` later if Justin approves.

8. Write the division review summary.
   - Include all required tables.
   - Include a `## Skill Creation Opportunities` section even if no new skills are recommended.
   - Include proposed `AGENT_INDEX.md` changes without applying them.
   - Include a completion checklist.

9. Report completion.
   - List agents reviewed, wrappers created, reference-only agents, blocked agents, skill opportunities, summary path, and files intentionally not touched.

## Division Review Summary Contract

For Phase 5-style reviews, produce:

```markdown
# Phase <phase> <Division> Agent Review

## Executive Summary

## Files Read

## Agent Review Table

| Agent | Source File | Recommended Status | Relevance | Risk | Overlap | Reason |
|---|---|---|---|---|---|---|

## Candidate Agents Selected

## Deferred / Reference-Only Agents

## Do-Not-Activate Agents

## RBAC Notes

## Wrapper Files Created

## Skill Creation Opportunities

This section is required for every division review, even when no new skills are recommended.

| Observed Agent Pattern | Existing Skill Coverage | Recommended New Skill | Priority | Reason |
|---|---|---|---|---|
| Multiple imported marketing agents suggest launch copy, campaign review, and audience positioning workflows | Partially covered by `slops-context-markdown` and `slops-prompt-generator` | `launch-copy-review` | Medium | Reusable workflow for reviewing landing pages, social posts, waitlist copy, and product positioning without activating multiple marketing agents. |

If no new skills are recommended, write:

```text
No new skill recommended. Existing skills cover the observed patterns.
```

**Rule:** Do not create the skill during onboarding. Only recommend it. Use `slops-skill-author` later if Justin approves.

## Proposed AGENT_INDEX.md Changes

### Section 4 Status Updates

| Agent | Division | Current Status | Proposed Status | Reason |
|---|---|---|---|---|

### New Rows for Promoted Candidates

| Agent | Division | Path | Status | Layer | Allowed Use | May Invoke Skills | Approval Required |
|---|---|---|---|---|---|---|---|

## Completion Checklist
```

## Candidate Wrapper Handoff Contract

For each `candidate`, hand `slops-agent-author`:

- Agent name and display name.
- Source file path.
- Division.
- Recommended wrapper path.
- Purpose in current SLOPS context.
- Allowed work as draft/review/recommendation tasks.
- Denied work copied from the phase safety rules plus role-specific denials.
- Required read-first files.
- May invoke skills, limited to canonical entries in `SKILL_ROUTING.md`.
- Tool tier cap, usually Tier 2.
- May write paths, usually draft markdown only.
- Must not write paths.
- Approval required for product, strategy, roadmap, external vendors, user data, paid tools, or active promotion.
- Escalates to Justin, Claude, and Codex with clear responsibilities.

## Skill Creation Opportunity Contract

Every division review must include a summary of reusable skills that may be worth creating based on imported agent patterns.

Use this table:

```markdown
## Skill Creation Opportunities

| Observed Agent Pattern | Existing Skill Coverage | Recommended New Skill | Priority | Reason |
|---|---|---|---|---|
| <pattern across multiple imported agents> | <existing skill or gap> | `<kebab-case-skill-name>` | High / Medium / Low | <why a skill is safer or more useful than activating agents> |
```

Rules:

- Recommend skills only. Do not create them during onboarding.
- Use `slops-skill-author` later if Justin approves.
- Prefer a skill when repeated imported-agent behavior is better expressed as a workflow than an actor.
- Prefer an agent wrapper when a durable role identity, responsibility boundary, and RBAC profile are needed.
- Mark priority as:
  - `High` when the skill would immediately reduce agent sprawl or support a near-term SLOPS/Corvus workflow.
  - `Medium` when useful soon but not blocking.
  - `Low` when useful later or mostly inspirational.
- If there are no useful skill opportunities, explicitly say: `No new skill recommended. Existing skills cover the observed patterns.`

## DBS Routing

- Division review summaries: `Solutions\reports\dbs-migration\phase-5-reviews\`
- Candidate wrapper files: `Blueprints\agents\<division-short-name>\`
- Proposed index changes: inside the review summary only until Justin approves.
- Reusable future prompts: `Blueprints\prompts\phase-5\`
- Do not route active source, runtime files, or implementation assets through this skill.

## RBAC Boundaries

This skill may recommend statuses and wrapper boundaries.

This skill may not grant authority.

Always deny imported agents:

- Secrets, credentials, tokens, cookies, `.env`, `.key`, `.pem`, `.cert`.
- Production, deployment, DNS, SSL, Nginx, VPS, Docker, GitHub Actions.
- Auth, payments, billing, subscriptions.
- Databases, SQL, migrations, RLS, customer data, user data.
- App source and runtime folders.
- External tool mutation, paid tools, vendor account changes, outbound email/SMS.
- File deletion, moves across DBS layers, git commit, git push, force push.

## Failure Modes

Avoid:

- Promoting too many imported agents because they sound useful.
- Treating imported source tool lists as approved SLOPS permissions.
- Wrapping an agent that still has ambiguous write authority.
- Letting a skill become an agent.
- Letting an onboarding review edit `AGENT_INDEX.md`.
- Reading unrelated imported divisions.
- Ignoring existing SLOPS skills that already cover the work.
- Creating wrappers that allow app source, secrets, production, payments, auth, databases, or user/customer data.
- Calling a blocked agent `reference-only` when the real reason is security or privacy risk.

## Prior-Use Review Loop

Before using or editing this skill, check:

```text
Blueprints\skills\slops-onboarding-agent\notes\prior-use-review.md
```

If it exists, extract:

- What the prior division review missed.
- Whether candidate selection was too broad or too narrow.
- Any RBAC mistakes Justin or Claude corrected.
- Any summary/table shape that caused confusion.
- Any repeated reason to update this skill.

If it does not exist, continue and note that no prior-use review was available.

## Completion Checklist

- [ ] One imported division reviewed, unless Justin explicitly requested more.
- [ ] All files in the division read before status decisions.
- [ ] Every agent assigned exactly one recommended status.
- [ ] Candidate choices are justified by near-term SLOPS/Corvus usefulness.
- [ ] Risky agents are marked `do-not-activate` with a specific RBAC reason.
- [ ] Heavy-overlap agents are marked `reference-only`.
- [ ] Candidate wrapper handoff is ready for `slops-agent-author`.
- [ ] `## Skill Creation Opportunities` is included, even if no new skills are recommended.
- [ ] Any recommended skills are routed to future `slops-skill-author` review, not created during onboarding.
- [ ] `AGENT_INDEX.md` changes are proposed but not applied.
- [ ] App source, secrets, production, deployment, SQL, package, test, `.git`, `node_modules`, and quarantine files were not touched.
- [ ] Justin review is named as the next gate.
