---
name: slops-canary
description: Slops-native post-deploy health watch. After a deploy or cutover, polls the live health/ready endpoints over HTTPS, smokes the product's key routes, and checks error rate and p95 latency against a known-good baseline for a defined window, then recommends pass / hold / rollback. Use after shipping, "watch the deploy", "is prod healthy", "should we roll back", or when replacing external canary/landing-report skills. Measures and recommends only — Justin executes any rollback using the cutover playbook. Never deploys, never rolls back on its own, read-only against production.
---

# Slops Canary Skill

## Purpose

The watch after a ship. Corvus went live with no monitoring; this skill checks that a fresh deploy
is actually healthy before you trust it, and gives a clear rollback call when it is not. Replaces
external `canary` + `landing-report`, grounded in the health/ready verification ladder and the
rollback notes in `Blueprints/playbooks/app-cutover-playbook.md`.

## When To Use

- Immediately after a deploy/cutover, during the stability window.
- "Is prod healthy?" / "should we roll back?" checks.
- As the final stage of `slops-ship`.

## When Not To Use

- To deploy or to execute a rollback — those are Justin gates.
- As a substitute for pre-merge review (`slops-code-review`) or the quality gate.

## Required Inputs To Review

- The deployed hostname(s) (root + `www`).
- The cutover checkpoint (for the rollback target / old IP) — see the cutover template.
- A known-good baseline (prior healthy latency/error levels; `slops-quality-baseline` if available).

## Signals

- `GET /api/health` -> ok and `GET /api/ready` -> ready over HTTPS, on root and `www`.
- Key-route smoke (authenticated where needed): the product's critical paths
  (e.g. Omen, dashboard summary, trade compare).
- HTTP status mix / error rate during the window.
- p95 latency vs. baseline (Omen is the known slow path — judge against its baseline, not zero).
- TLS intact: HTTP 301 -> HTTPS, HSTS present, no SSL warning.

## Steps

1. Capture the deploy target and the rollback record from the cutover checkpoint.
2. Poll health/ready and smoke the key routes at intervals across the watch window
   (e.g. the first N minutes post-deploy).
3. Classify against baseline: **healthy**, **degraded**, or **failing**.
4. Verdict:
   - **PASS** — stable across the window; safe to trust.
   - **HOLD** — name the concern and keep watching; do not declare done.
   - **ROLLBACK** — name the trigger and point Justin to the cutover playbook's DNS/image rollback
     steps to execute.

## Output

A short health report and a pass/hold/rollback verdict. No deploy and no rollback execution.

## Safety Rules

- Measure and report only; never deploy, restart, or roll back (Justin executes).
- Read-only against production; never expose secrets or cookie values.
- A failing health/ready or a key route down is an automatic ROLLBACK recommendation, not a HOLD.

## Where This Operates

On the deployed product (ops). `Layer 0` doctrine; pairs with `app-cutover-playbook` (rollback)
and `slops-ship`.

## Change Log

- 2026-06-08: Created (Wave 1) as the Slops-native replacement for external `canary` +
  `landing-report`, grounded in the health/ready ladder and the cutover rollback notes.
