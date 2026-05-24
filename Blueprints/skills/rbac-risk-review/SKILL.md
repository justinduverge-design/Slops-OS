---
name: rbac-risk-review
description: Review SLOPS agents, skills, prompts, plans, or proposed file changes for RBAC, overlap, tool-tier, secrets, auth, payments, user-data, database, deployment, and destructive-operation risk. Use before promotion or activation; do not fix files unless separately instructed.
---

# RBAC Risk Review

## Purpose

Use this skill to identify permission, overlap, and escalation risks before SLOPS agents, skills, prompts, plans, or proposed changes are activated.

The review should make authority legible: what can read, what can write, what it can invoke, what it must never touch, what overlaps with existing roles, and what requires Justin's approval.

## Skill Identity

- **Skill name:** `rbac-risk-review`
- **Primary user:** Justin
- **Primary agents:** Claude for risk review; Codex for file inspection and report writing when instructed.
- **DBS layer:** `Blueprints\skills`
- **Skill type:** simple skill
- **Status:** active

## When to Use

Use this skill when Justin asks to:

- Flag RBAC or overlap risks.
- Review agent wrappers before promotion.
- Review imported agents for dangerous scope.
- Review skills or prompts for authority drift.
- Check tool tier caps against role responsibilities.
- Identify escalation rules for secrets, auth, payments, user data, databases, deployment, infrastructure, paid media, finance, legal, or external accounts.

Do not use this skill when:

- The task is to create wrappers; use `agent-wrapper-generator`.
- The task is to create proposed index rows; use `agent-index-diff-builder`.
- The user wants code implementation or production changes.
- The user asks for a full application security scan; use a dedicated security scan workflow.

## Required Inputs

Minimum inputs:

- Files, folders, or plan to review.
- Intended status or use, if known.
- Existing authority source, usually `AGENT_INDEX.md` or `SKILL_ROUTING.md`.
- Tool tier policy.

If intended use is missing, assume the reviewed item is not active and flag any activation question as unresolved.

## Canonical Paths

Read as needed:

```text
Blueprints\agents\AGENT_INDEX.md
Blueprints\skills\SKILL_ROUTING.md
Blueprints\tools\tool-permissions.md
Blueprints\agents\<division>\<agent>.md
Blueprints\skills\<skill-name>\SKILL.md
Blueprints\prompts
```

Write review reports, when requested, to:

```text
Direction\reviews
```

Do not modify reviewed files unless Justin separately asks for fixes.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Read the authority file relevant to the artifact:
   - Agents: `AGENT_INDEX.md`.
   - Skills: `SKILL_ROUTING.md`.
   - Tools: `tool-permissions.md`.
3. Read only the named files or folders.
4. Search before opening large folders.
5. Treat `_imported`, `_archive`, `_drafts`, and old project copies as non-authoritative unless Justin says otherwise.
6. Do not inspect secrets or `.env` files; flag them as approval-required instead.

## Process Recipe

1. Identify each reviewed artifact and its claimed purpose.
2. Determine the intended status:
   - active
   - candidate
   - restricted
   - reference-only
   - do-not-activate
   - unknown
3. Extract authority claims:
   - Read permissions.
   - Write permissions.
   - Skill invocation.
   - Tool tier cap.
   - External systems.
   - Escalation rules.
4. Compare claims against the canonical authority files.
5. Flag high-risk domains:
   - Secrets and credentials.
   - Auth, OAuth, sessions, cookies, ESPN cookies.
   - Payments, Stripe, billing, subscriptions.
   - User data, privacy, consent, deletion, exports.
   - Databases, SQL, migrations, RLS.
   - Production, deployment, DNS, SSL, VPS, Docker, CI/CD.
   - Paid media spend or campaign activation.
   - Email, SMS, customer contact, support ticket mutation.
   - Legal/compliance claims or binding advice.
   - Destructive file, git, or infrastructure operations.
6. Flag overlap risks:
   - Duplicate ownership with an active SLOPS agent.
   - Skill performing agent authority.
   - Agent performing a workflow better suited to a skill.
   - Prompt acting like a standing role.
   - Project-specific authority drifting into global SLOPS.
7. Assign a risk level:
   - Low: read-only or drafting with clear boundaries.
   - Medium: writes to Blueprint/Direction files, external references, or role overlap.
   - High: privileged domains, ambiguous write authority, external systems, or customer impact.
   - Blocked: secrets, destructive actions, production mutation, or authority with no approval path.
8. Recommend one of:
   - approve as candidate
   - restrict and wrap
   - reference-only
   - do-not-activate
   - needs Justin decision

## Output Contract

When using this skill, produce:

- Reviewed files or folders.
- Source authority files used.
- Classification or risk level for each artifact.
- RBAC risks.
- Overlap risks.
- Missing fields or unclear authority.
- Required approval gates.
- Recommended next action.
- What was intentionally not reviewed or modified.

Use concise tables for multi-file reviews.

## Review Table Shape

```markdown
| Artifact | Status/Risk | RBAC Risk | Overlap Risk | Approval Needed | Recommendation |
|---|---|---|---|---|---|
```

## DBS Routing

- Risk reviews: `Direction\reviews\`
- Agent authority source: `Blueprints\agents\AGENT_INDEX.md`
- Skill authority source: `Blueprints\skills\SKILL_ROUTING.md`
- Tool policy source: `Blueprints\tools\tool-permissions.md`
- Do not route review findings into app source or runtime prompts unless specifically requested.

## RBAC Boundaries

This skill reviews authority. It does not grant authority.

It may not:

- Activate agents.
- Edit `AGENT_INDEX.md`.
- Edit `SKILL_ROUTING.md`.
- Change tool permissions.
- Read secrets or `.env` files.
- Approve production, deployment, database, auth, payment, cookie, or external-account changes.
- Perform destructive actions.

Escalate to Justin for any Tier 4 or Tier 5 action, any ambiguous high-risk authority, or any role that claims permission to mutate external systems.

## Failure Modes

Watch for:

- Treating absence of a denied path as permission.
- Missing overlap with active Claude/Codex authority.
- Ignoring project-vs-global scope drift.
- Calling something low-risk because it only writes markdown while the markdown grants authority.
- Reviewing imported files as if they are active.
- Failing to distinguish recommendation from approval.
- Reading secrets instead of flagging them.

## Prior Use Review Loop

Before changing this skill, check:

```text
Blueprints\skills\rbac-risk-review\notes\prior-use-review.md
```

If present, incorporate repeated corrections into failure modes or the process recipe.

## Completion Checklist

- Relevant authority files were checked.
- Reviewed scope is explicit.
- Risk levels are assigned.
- RBAC and overlap risks are separated.
- Approval gates are named.
- No authority files were changed unless separately approved.
