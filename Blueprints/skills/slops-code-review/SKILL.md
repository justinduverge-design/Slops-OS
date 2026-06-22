---
name: slops-code-review
description: Review a branch, PR, commit, or diff before merge for correctness, security, simplicity, reliability, performance, tests, and scope. Use for merge readiness or security review; produces P0/P1/P2 findings and never edits the code.
status: active
skill_type: simple
layer: Layer 0
default_agent: Claude reviews; Codex or Justin acts on findings
trigger: review this PR, review this diff, is this safe to merge, security review
version: 1.0.0
upstream: Simplicity lens adapted from DietrichGebert/ponytail (MIT), inspected 2026-06-21
owner: SLOPS
---

# Slops Code Review

## Purpose

Provide one pre-merge verdict grounded in the task contract and target repository standards. The review protects user trust and also removes avoidable machinery.

## When to Use

- Review a branch, PR, commit, or working-tree diff before merge.
- Check merge readiness, security posture, or intended-versus-implemented behavior.
- Final review before `slops-ship`.

## Do Not Use

- To edit or fix code in place.
- To approve secrets, migrations, production changes, or deployment.

## Required Inputs

- Resolved change set and base.
- Task/specification, acceptance criteria, and relevant definition of done.
- Touched files in enough context to trace behavior and trust boundaries.
- Available test/build/security evidence.

## Preconditions and Dependencies

- Uses existing repository tools only; do not install dependencies.
- If the review scope or base is ambiguous, resolve it before giving a verdict.

## Review Lenses

1. **Contract and correctness:** intended behavior is implemented, edge cases are handled, and mock/live status is truthful.
2. **Security and privacy:** authorization, validation, injection/SSRF/SQL boundaries, webhook verification, secrets/cookies, personal data, least privilege, and existing controls are preserved.
3. **Reliability and errors:** failure envelopes are safe, recovery is explicit, and partial failure does not corrupt state.
4. **Performance:** no avoidable N+1, unbounded work, or expensive hot/LLM path; stable results are cached appropriately.
5. **Tests:** changed public behavior and important failure paths are covered; evidence is current.
6. **Scope:** the diff is task-focused, respects layer/agent ownership, and contains no unrelated sweep.
7. **Simplicity:** apply the ladder below without weakening trust boundaries.

## Simplicity Ladder

For each meaningful addition, ask in order:

1. **YAGNI:** Can this code, abstraction, configuration, or feature be deleted because the accepted behavior does not require it?
2. **Standard library:** Can maintained platform/library functionality replace custom code?
3. **Native framework/platform:** Can an existing framework primitive replace a bespoke layer?
4. **Existing dependency:** Can an already-installed, appropriate dependency do it without adding another package?
5. **Minimum custom code:** If code is necessary, is it the smallest clear implementation with the fewest states and indirections?

Never simplify away authentication, authorization, input validation, accessibility, observability needed for safe operation, data-loss prevention, or explicit acceptance criteria. Deletion is a recommendation only when behavior and safeguards remain intact.

## Process Recipe

1. Resolve scope/base and read the task before the diff.
2. Trace changed behavior from entry point through storage/external effects and back.
3. Apply every review lens, inspecting surrounding code where needed.
4. Compare implementation with tests and current command evidence.
5. Rank findings: **P0** blocks for broken/insecure/misleading changes; **P1** fixes before merge; **P2** follow-up.
6. For each finding, cite file/line, impact, evidence, and the smallest safe correction.
7. Separate optional simplification from correctness/security blockers.
8. Return **merge**, **fix-then-merge**, or **block** with the exact P0/P1 list.

## Output Contract

Produce scope/base, verdict, severity-ranked findings, positive verification evidence, test gaps, simplicity opportunities, assumptions, and actions intentionally not taken. No code changes.

## Verification

- Every P0/P1 cites a concrete location and reproducible or logically complete impact path.
- The task's acceptance criteria and every changed trust boundary were reviewed.
- Current test/build evidence is distinguished from unrun recommendations.
- The verdict follows mechanically from unresolved P0/P1 findings.

## DBS Routing

Operate on the target product repository. Pair with `slops-git-flow`, `slops-quality-baseline`, and `slops-tdd`; route fixes back through the build loop.

## Boundaries

- Review only; never edit, commit, push, merge, deploy, or change secrets.
- Treat exposed secrets and unscoped destructive changes as P0.
- Do not trade security, accessibility, or data integrity for fewer lines.

## Failure Modes

- Reviewing style while missing behavior or trust boundaries.
- Suggesting deletion without proving preserved behavior.
- Treating passing tests as sufficient security evidence.
- Reporting speculative findings without an impact path.
- Hiding uncertainty or approving an ambiguous diff.

## Prior-Use Review Loop

Read `notes/prior-use-review.md` when present. Add repeated misses as a narrow lens, test, or failure mode; do not expand this review into implementation.

## Changelog

- 1.0.0 — Added the Ponytail-derived simplicity ladder, safeguard exceptions, complete metadata, and checkable verdict rules.
- 0.1.0 — Initial SLOPS pre-merge code and security review.
