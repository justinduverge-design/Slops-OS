---
name: slops-investigate
description: Diagnose a reproducible bug, incident, failed check, or environment divergence through evidence-first isolation. Use before proposing a fix; requires a fast deterministic red-capable feedback command when feasible and never hot-patches production.
status: active
skill_type: simple
layer: Layer 0
default_agent: Claude diagnoses; Codex runs approved read-only checks
trigger: investigate this bug, root cause this failure, works in staging not production, canary hold or rollback
version: 1.0.0
upstream: Adapted from mattpocock/skills diagnosing-bugs (MIT), inspected 2026-06-21
owner: SLOPS
---

# Slops Investigate

## Purpose

Move from symptom to evidenced root cause and a scoped fix proposal. Investigation is read-only against production; implementation returns to the build loop.

## When to Use

- A bug, stack trace, failed request, data anomaly, or unexpected behavior.
- Staging and production behave differently.
- `slops-canary` recommends HOLD or ROLLBACK.

## Do Not Use

- To hot-patch, restart, deploy, mutate data, or expose credentials.
- When the task is already a validated fix request; route that through the build loop.

## Required Inputs

- Exact symptom, expected behavior, affected scope, timing, and reproduction steps.
- Relevant code, tests, logs/signals, environment differences, and recent changes.

## Preconditions and Dependencies

- Runtime depends on the target repository's existing test and diagnostic tools.
- Do not install packages or add telemetry during diagnosis without approval.
- Production access remains read-only and secret-safe.

## Feedback-Loop Gate

Before forming root-cause hypotheses, identify and run one command that is:

- **Tight:** finishes quickly enough to run after each meaningful change or probe.
- **Deterministic:** the same state produces the same result, or known variance is bounded.
- **Exact:** exercises the reported symptom or its smallest faithful reproduction.
- **Red-capable:** demonstrably fails when the defect is present; a command that can only pass is not evidence.

Record the command, observed failing signal, duration, and environment. If no safe command can be created, document why and define the smallest concrete observation that substitutes for it. Do not claim a confirmed cause without a red signal or equivalent direct evidence.

## Process Recipe

1. Restate expected versus observed behavior and establish the feedback-loop gate.
2. Reproduce the failure, or label it unreproduced and preserve the strongest available evidence.
3. Minimize the reproduction while retaining the same failure.
4. Partition the system by layer and test one boundary at a time: client, route, service, adapter, data, infrastructure.
5. Compare recent changes and environment/configuration differences without exposing values.
6. Form ranked hypotheses only after evidence exists; name one discriminating probe per hypothesis.
7. Run the cheapest probe, update the ranking, and repeat until evidence identifies the cause or the next missing observation.
8. State the cause as confirmed, likely, or unconfirmed and cite the evidence.
9. Propose the smallest fix as a `planning-pass` item and define regression and operational verification.

## Output Contract

Produce a root-cause note containing the feedback command and red signal, evidence timeline, isolated component, confirmed/likely/unconfirmed cause, rejected hypotheses, scoped fix proposal, verification plan, and actions intentionally not taken.

## Verification

- Another agent can run the recorded command and observe the same red signal or documented bounded variance.
- Each causal claim points to evidence; correlation is labeled as such.
- The proposed regression check would fail before the fix and pass after it.
- No production mutation or secret value appears in the evidence.

## DBS Routing

- Reusable method: this Layer 0 skill.
- Product incident evidence: the target product's `Direction/reviews/` or approved incident location.
- Fix work: target product backlog through `planning-pass`; review through `slops-code-review`.

## Boundaries

- Read-only against production; no hot-patches, restarts, data edits, or deploys.
- Redact tokens, cookies, personal data, and environment values.
- Stop for approval when the next probe is destructive, costly, externally visible, or requires new access.

## Failure Modes

- Hypothesizing before establishing a faithful failing signal.
- Using a broad, flaky suite as the only loop.
- Changing multiple variables per probe.
- Treating disappearance of a symptom as proof of cause.
- Fixing in place and losing the regression signal.

## Prior-Use Review Loop

Read `notes/prior-use-review.md` when present. Promote recurring missing probes, unsafe evidence patterns, or false-positive causes into this procedure without broadening it into implementation.

## Changelog

- 1.0.0 — Added the tight, deterministic, exact, red-capable feedback-loop gate and complete skill metadata.
- 0.1.0 — Initial SLOPS investigation workflow.
