---
name: security-privacy-evidence
description: Maintain SLOPS security and privacy evidence notes, control mappings, data classification, consent boundaries, and approval records. Use for compliance-ready evidence summaries; do not inspect secrets or change production/security settings.
---

# Security Privacy Evidence

## Purpose

Use this skill to collect and structure security/privacy evidence for SLOPS decisions, controls, and product workflows.

Evidence means documented facts and source references that show what SLOPS does, what data it touches, what controls exist, what remains unresolved, and what requires Justin's approval.

## Skill Identity

- **Skill name:** `security-privacy-evidence`
- **Primary user:** Justin
- **Primary agents:** Claude for policy/evidence review; Codex for file creation and source inspection when instructed.
- **DBS layer:** `Blueprints\skills`
- **Skill type:** simple skill
- **Status:** active

## When to Use

Use this skill when Justin asks to:

- Build privacy or security evidence notes.
- Map data categories, consent boundaries, and retention assumptions.
- Summarize security controls from existing docs.
- Prepare compliance-style evidence without making legal claims.
- Review product flows for privacy evidence gaps.
- Document decisions around ESPN cookies, auth, Supabase, Stripe, Ollama, OpenClaw, VPS, logging, user data, or support handling.

Do not use this skill when:

- The user asks for a full code security scan; use a security scan workflow.
- The user asks to fix a vulnerability; use an implementation/security-fix workflow.
- The task requires reading secrets, tokens, `.env` files, private customer records, or production credentials.
- The task requires changing auth, payments, database, deployment, DNS, SSL, VPS, or production settings.
- The task asks for formal legal advice.

## Required Inputs

Minimum inputs:

- Evidence topic or system area.
- Source files, decisions, handoffs, specs, or policies to review.
- Desired output path, if a file should be written.
- Intended audience: internal, handoff, compliance prep, support, or founder review.

If source files are missing, produce an evidence gap note instead of inventing facts.

## Canonical Paths

Evidence notes usually belong under:

```text
Direction\reviews
Direction\decisions
References\research
Blueprints\specs
```

Use app-specific handoff paths only when Justin explicitly scopes the evidence to `slops-saloon`.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Read only named source files first.
3. Read relevant authority files only if permissions are part of the evidence:
   - `Blueprints\agents\AGENT_INDEX.md`
   - `Blueprints\skills\SKILL_ROUTING.md`
   - `Blueprints\tools\tool-permissions.md`
4. Search for policy, handoff, or decision references before reading large folders.
5. Do not open `.env`, credential stores, raw cookies, private user exports, billing exports, or production secrets.
6. If evidence depends on a secret or production-only fact, mark it as "requires authorized human verification."

## Process Recipe

1. Define evidence scope and audience.
2. Inventory source files used.
3. Identify data categories:
   - account/profile data
   - fantasy platform data
   - league/team/player data
   - payment/billing data
   - support communications
   - logs/telemetry
   - AI prompts and outputs
   - secrets/tokens/cookies
4. Identify system boundaries:
   - frontend
   - backend/API
   - database
   - external providers
   - local AI services
   - VPS/infrastructure
   - support/admin workflows
5. Extract existing controls and cite their source file paths.
6. Separate facts from assumptions.
7. Mark gaps, unknowns, and required approvals.
8. Add evidence confidence:
   - `confirmed` when directly supported by source files.
   - `inferred` when logically derived from source files.
   - `unknown` when source support is missing.
9. Recommend the next safe evidence action.

## Evidence Note Shape

Use this structure unless Justin asks for another format:

```markdown
# <Evidence Topic>

## Scope

## Sources Reviewed

## Confirmed Evidence

| Control / Claim | Evidence | Source | Confidence |
|---|---|---|---|

## Data Classification

| Data Type | Sensitivity | Source / Flow | Notes |
|---|---|---|---|

## Consent and User Expectations

## Access and RBAC Notes

## External Systems

## Gaps and Unknowns

## Approval Required

## Recommended Next Safe Step
```

## Output Contract

When using this skill, produce:

- Target path, if a file is written.
- Evidence topic and scope.
- Source files reviewed.
- Confirmed evidence table.
- Data classification table.
- Consent/user expectation notes.
- RBAC/access notes.
- External system notes.
- Gaps and unknowns.
- Approval gates.
- Recommended next safe step.

## DBS Routing

- Evidence reviews: `Direction\reviews`
- Permanent security/privacy decisions: `Direction\decisions`
- Raw research or source summaries: `References\research`
- Implementation-neutral requirements: `Blueprints\specs`
- Do not write secrets, production configs, credentials, cookies, or raw user data.

## RBAC Boundaries

This skill documents evidence. It does not grant or change security authority.

It may not:

- Read or print secrets, tokens, cookies, `.env` values, or private customer records.
- Change auth, payments, database, RLS, deployment, DNS, SSL, VPS, Docker, CI/CD, or production settings.
- Approve a privacy/security risk on Justin's behalf.
- Make formal legal compliance claims.
- Send evidence to third parties.
- Modify `AGENT_INDEX.md`, `SKILL_ROUTING.md`, or tool permissions unless separately instructed.

Escalate to Justin for any Tier 4 or Tier 5 action, any evidence that depends on private credentials or production-only access, and any public/legal/compliance statement.

## Failure Modes

Watch for:

- Inventing controls that are not in source files.
- Treating assumptions as confirmed evidence.
- Reading secrets instead of documenting the need for human verification.
- Overstating compliance readiness.
- Mixing security evidence with implementation changes.
- Omitting data classification.
- Forgetting user consent expectations.
- Failing to record source file paths.

## Prior Use Review Loop

Before changing this skill, check:

```text
Blueprints\skills\security-privacy-evidence\notes\prior-use-review.md
```

If present, incorporate repeated corrections into failure modes or the process recipe.

## Completion Checklist

- Scope and audience are clear.
- Sources reviewed are listed.
- Evidence is separated from assumptions.
- Data categories are classified.
- Access/RBAC notes are included.
- Gaps and approvals are explicit.
- No secrets or private user data were read or written.
