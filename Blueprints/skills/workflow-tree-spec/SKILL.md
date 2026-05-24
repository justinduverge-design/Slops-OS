---
name: workflow-tree-spec
description: Produce SLOPS workflow-tree specifications for product, backend, support, or agent workflows, including happy paths, branches, failure states, recovery paths, and observable state contracts. Use before implementation or handoff; do not edit app code unless separately instructed.
---

# Workflow Tree Spec

## Purpose

Use this skill to turn a feature, process, or agent workflow into a clear workflow tree that another agent can implement, review, or hand off.

A workflow tree makes the sequence of actions visible: entry points, decisions, states, failure modes, recovery paths, ownership, and outputs.

## Skill Identity

- **Skill name:** `workflow-tree-spec`
- **Primary user:** Justin
- **Primary agents:** Claude for planning and product flow review; Codex for file creation when instructed.
- **DBS layer:** `Blueprints\skills`
- **Skill type:** simple skill
- **Status:** active

## When to Use

Use this skill when Justin asks to:

- Map a feature workflow before build.
- Define happy path, branch paths, and failure states.
- Turn product notes into implementation-neutral flow specs.
- Prepare backend/frontend handoff states.
- Clarify agent orchestration before creating prompts or code.
- Create workflow trees for Omen of the Week, platform connection, onboarding, support, billing, or sports-data flows.

Do not use this skill when:

- The user asks for direct implementation without a spec.
- The work is only RBAC/security review; use `rbac-risk-review`.
- The work is a backend API contract only; use a handoff or contract-writing workflow if available.
- The work requires production, secrets, auth, payments, user data, databases, deployment, or infrastructure changes.

## Required Inputs

Minimum inputs:

- Workflow name.
- Intended user or actor.
- Entry trigger.
- Desired end state.
- Known constraints or decisions.
- Target output path, if a file should be written.

Helpful inputs:

- Existing feature notes, handoffs, decisions, or route/API docs.
- Current frontend/backend states.
- Known error cases.
- Existing agent responsibilities.

## Canonical Paths

Workflow specs usually belong under:

```text
Blueprints\specs
Direction\reviews
Direction\roadmaps
ssffmvp\Blueprints\handoffs
```

Use the highest reusable DBS layer that is safe. Do not place project-specific runtime instructions in global `Blueprints` unless Justin explicitly promotes them.

## Read-First Procedure

Use least privilege.

1. Read Justin's request.
2. Read only named source files first.
3. If no files are named, read the relevant Blueprint/handoff index before searching broadly.
4. Prefer current files over `_archive`, `_drafts`, `_imported`, or stale copies.
5. Do not read secrets, `.env`, production configs, or private user data.
6. If auth, payments, cookies, or external accounts appear in the flow, mark them approval-required instead of expanding scope.

## Process Recipe

1. Name the workflow and define its scope.
2. Identify actors:
   - user
   - frontend
   - backend
   - AI/agent
   - external provider
   - support/admin
3. Define entry conditions and exit conditions.
4. Write the happy path as numbered steps.
5. Add decision branches using clear condition labels.
6. Add failure states and recovery paths.
7. Add observable state contracts:
   - UI state
   - API/request state
   - data state
   - agent state
   - logging or audit state, if relevant
8. Identify ownership for each step.
9. Separate launch scope from deferred scope.
10. List open questions and approval gates.

## Workflow Tree Shape

Use this structure unless Justin asks for another format:

```markdown
# <Workflow Name>

## Purpose

## Actors

## Entry Conditions

## Exit Conditions

## Happy Path

1. <step>

## Branches

| Branch | Condition | Path | Owner | Result |
|---|---|---|---|---|

## Failure States

| Failure | Detection | User/Agent State | Recovery | Escalation |
|---|---|---|---|---|

## Observable State Contract

| State | Meaning | Source of Truth | Consumer |
|---|---|---|---|

## Data and Permission Boundaries

## Approval Gates

## Deferred Scope

## Open Questions
```

## Output Contract

When using this skill, produce:

- Target path, if a file is written.
- Source files used.
- Workflow name and scope.
- Happy path.
- Branches.
- Failure states.
- Recovery paths.
- Observable state contract.
- Approval gates.
- Deferred scope and open questions.

## DBS Routing

- Reusable workflow templates: `Blueprints\specs`
- Product or planning reviews: `Direction\reviews`
- Roadmap sequencing: `Direction\roadmaps`
- App-specific frontend/backend handoffs: `ssffmvp\Blueprints\handoffs`
- Do not write runtime code, secrets, production configs, or database migrations from this skill alone.

## RBAC Boundaries

This skill may describe workflows. It does not grant authority to execute them.

It may not:

- Approve auth, payment, cookie, user-data, database, deployment, or infrastructure changes.
- Define secret values or credential handling beyond approval gates.
- Activate agents or modify `AGENT_INDEX.md`.
- Change `SKILL_ROUTING.md`.
- Write implementation code unless Justin separately instructs Codex to implement.

Escalate to Justin for Tier 4 or Tier 5 work, external-account mutation, production-impacting flows, or user-data handling decisions.

## Failure Modes

Watch for:

- Writing vague flow diagrams without failure states.
- Mixing implementation code into the spec.
- Forgetting who owns each step.
- Treating mock/stub/live states as interchangeable.
- Omitting recovery paths.
- Hiding approval gates inside prose.
- Putting project-specific runtime instructions in global folders.

## Prior Use Review Loop

Before changing this skill, check:

```text
Blueprints\skills\workflow-tree-spec\notes\prior-use-review.md
```

If present, incorporate repeated corrections into failure modes or the process recipe.

## Completion Checklist

- Scope and actors are explicit.
- Happy path is numbered.
- Branches and failure states are tabled.
- Recovery paths and escalation rules are present.
- Observable states have sources of truth.
- Approval gates are named.
- Output is routed to the correct DBS layer.
