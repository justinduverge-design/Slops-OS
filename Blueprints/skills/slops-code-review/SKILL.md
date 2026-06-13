---
name: slops-code-review
description: Slops-native pre-merge code and security review. Reviews a branch, PR, or diff for correctness, security (authz on new routes, input validation, secrets/cookie leakage, the SY0-701 control mappings the codebase already uses, preserved webhook signature verification), error handling, performance (N+1, hot/LLM paths), test coverage, and scope/boundary against the definition-of-done. Use to "review this PR", "is this safe to merge", "security review", before landing a branch, or when replacing external review/cso skills. Produces severity-ranked findings (P0/P1/P2) with concrete fixes and a merge verdict. Reviews only — never edits code; Justin/Codex act on the findings.
---

# Slops Code Review Skill

## Purpose

A pre-merge gate grounded in Corvus's own standards. Replaces external `review` + `cso` with one
review that checks correctness, security, and quality against `Blueprints/definition-of-done.md`
and the security-control comments the codebase already carries (SY0-701 mappings). Pairs with
`slops-git-flow` (the PR) and `slops-quality-baseline` (the measured gate).

## When To Use

- Reviewing a branch/PR/diff before merge.
- A "is this safe to merge" / "security review" request.
- Final check before `slops-ship`.

## When Not To Use

- To edit or fix code — this reviews and recommends; fixes are a separate build step.
- To deploy, or to approve secrets/migrations (Justin gates).

## Required Inputs To Review

- The diff / PR / branch and the task it implements.
- `Blueprints/definition-of-done.md` and any relevant `Blueprints/handoffs/*` contract.
- The touched files in context.

## Review Lenses

**Correctness**
- Implements the task; edge cases handled; no partial feature shipped as done.
- No stub/mock presented as live; mock vs. live labeled.

**Security**
- Every new/changed route has the right auth (`requireAuth` / `requireSubscription` where due).
- Input validated; output safe (no injection / SSRF / unsafe SQL).
- No secrets, tokens, `.env`, or cookie values in code or logs (ESPN cookie rule).
- Webhook signature verification and other existing controls preserved.
- Honors the SY0-701 control comments already in the module; least privilege.

**Error handling**
- Failures return clean envelopes, not crashes; truthful degradation; no internal leakage.

**Performance**
- No N+1; hot and LLM paths watched (Omen latency); cache where the result is weekly/stable.

**Tests**
- New/changed logic is covered; `npm test` green (confirm with `slops-quality-baseline`).

**Scope / boundary**
- Stayed in lane (Codex backend / Claude frontend); no secrets/deploy/migration.
- Diff is scoped — no unrelated files swept in (`slops-git-flow`).

## Steps

1. Read the diff and the task it claims to implement.
2. Run every lens above against the change.
3. Rank findings: **P0** (block — broken, insecure, or misleading), **P1** (fix before merge),
   **P2** (follow-up).
4. Give a concrete fix for each finding.
5. Verdict: **merge** / **fix-then-merge** / **block**, with the P0/P1 list.

## Output

A severity-ranked findings report and a merge verdict. No code changes.

## Safety Rules

- Review only; never edit app code, secrets, or deploy.
- Flag issues; do not fix them in place.
- Treat any unscoped diff or secret exposure as an automatic P0.

## Where This Operates

On the target product repo. `Layer 0` doctrine; pairs with `slops-git-flow` and
`slops-quality-baseline`.

## Change Log

- 2026-06-08: Created (Wave 1) as the Slops-native replacement for external `review` + `cso`,
  grounded in `definition-of-done.md` and the codebase's SY0-701 control mappings.
