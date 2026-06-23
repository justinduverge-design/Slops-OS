---
name: slops-verify
description: Slops-native functional and real-account QA. Drives the app through its key flows using the run-slops-saloon driver (route smoke, screenshots, Omen, ESPN recovery), checks that required states render, and confirms mock/live labeling — without ever logging cookie values. Use to "QA this flow", "verify the app", "run the smoke", real-account platform QA, or when replacing external browse/qa/qa-only skills. Formalizes the existing run-slops-saloon harness into a repeatable verification step. Reports pass/fail per flow; reviews behavior, does not edit app code.
---

# Slops Verify Skill

## Purpose

The functional verification layer of the loop: prove a flow actually works in the running app, not
just that the code compiles. Formalizes the existing `run-slops-saloon` driver into a repeatable
skill. Replaces external `browse` / `qa` / `qa-only`.

## When To Use

- Before declaring a flow done, or as a pre-ship functional check.
- Real-account QA of platform flows (Yahoo / Sleeper / ESPN), including ESPN recovery.
- "Run the smoke" / "verify the app" requests.

## When Not To Use

- To fix code — this verifies and reports; fixes route through the loop.
- As a substitute for `slops-quality-baseline` (tests/build) or `slops-code-review`.

## Required Inputs To Review

- The flow(s) in scope and the running app (local or the deployed target).
- **Precondition:** a reachable running instance (local backend + frontend, or a deployed target). Without it the driver cannot exercise live flows — a passing *frontend build* alone is not verification.
- The driver: `slops-saloon/omen/.claude/skills/run-slops-saloon/` —
  `driver.cjs`, `driver_omen.cjs`, `driver_espn_recovery.cjs`, `espn-verify.cjs`.
- `Blueprints/definition-of-done.md` (the behavior bar).

## Steps

1. Run the appropriate driver against the target flow; capture route results and screenshots.
2. Confirm the required states render (loading / error / empty / disconnected) and behave.
3. For platform flows, do real-account QA **without logging or displaying cookie values** (ESPN rule).
4. Confirm mock vs. live is labeled and no stub is shown as live advice.
5. Report pass/fail per flow with evidence (screenshots, status codes); flag regressions.

## Output

A QA report: pass/fail per flow with evidence. No app-code edits.

## Safety Rules

- Verify and report only; never edit app code, secrets, or deploy.
- Never log, store, or display ESPN cookie values or any secret.
- Label mock/live honestly; a stub shown as live is an automatic fail.
- If the app/API is unavailable, report the flow **BLOCKED**, never *pass*. A build-only run has verified nothing functional. (Learned on the P1 trial, 2026-06-08.)

## Where This Operates

On the target product's running app. `Layer 0` doctrine; wraps the `run-slops-saloon` driver and
pairs with `definition-of-done.md`.

## Change Log

- 2026-06-08: Created (Wave 3) as the Slops-native replacement for `browse` / `qa` / `qa-only`,
  formalized from the `run-slops-saloon` driver.
