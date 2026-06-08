---
name: slops-ship
description: Slops-native release orchestrator. Sequences a built item from merge to live — review verdict, quality gate, scoped merge, deploy, and post-deploy canary — tying together slops-code-review, slops-quality-baseline, slops-git-flow, the cutover playbook, and slops-canary. Use to "ship this", "land and deploy", "release this item", or when replacing land-and-deploy/ship/setup-deploy. Orchestrates and gates; Justin approves the merge and the deploy, and executes the deploy steps. Never deploys or merges on its own.
---

# Slops Ship Skill

## Purpose

One ordered path from "built" to "live" that reuses the rest of the Slops loop instead of
re-implementing it. Replaces external `land-and-deploy` / `ship` / `setup-deploy` with an
orchestrator that calls the existing gates in the right order and stops at Justin's approval points.

## When To Use

- Releasing a finished, reviewed item to production.
- A "ship it / land and deploy" request.
- First-time deploy setup for a product (the `setup-deploy` case), via the deploy runbook.

## When Not To Use

- Before review and quality pass — run those first; ship does not skip gates.
- To deploy autonomously — merge and deploy are Justin gates.

## Required Inputs To Review

- The item's branch/PR and its `slops-code-review` verdict.
- `slops-quality-baseline` result; `Blueprints/definition-of-done.md`.
- The deploy procedure: `Blueprints/playbooks/app-cutover-playbook.md` + the product's deploy runbook.
- The cutover checkpoint (rollback target).

## Steps

1. **Gate check.** Confirm `slops-code-review` verdict is *merge* and `slops-quality-baseline` is
   *PASS*. If either fails, stop — the item is not shippable.
2. **Merge.** Via `slops-git-flow` (scoped), Justin approves the merge.
3. **Build artifact.** Confirm CI built/published the image(s); note the commit/tag.
4. **Deploy.** Follow `app-cutover-playbook` / the deploy runbook. Justin executes the gated steps
   (pull images, restart, env). Prepare the exact step list; do not run them yourself.
5. **Watch.** Run `slops-canary` across the stability window. PASS / HOLD / ROLLBACK.
6. **Close out.** On PASS: check the sprint item off, log the decision, and ratchet the
   `slops-quality-baseline`. On ROLLBACK: hand Justin the cutover rollback steps.

## Output

An ordered, gated release plan with each gate's status — not an executed merge or deploy.

## Safety Rules

- Never merge or deploy without Justin; prepare the steps and stop at the gate.
- Never skip review or the quality gate to ship faster.
- Never touch secrets/env directly; reference the runbook.

## Where This Operates

On the target product repo + its deploy target. `Layer 0` doctrine; orchestrates
`slops-code-review`, `slops-quality-baseline`, `slops-git-flow`, `app-cutover-playbook`, `slops-canary`.

## Change Log

- 2026-06-08: Created (Wave 2) as the Slops-native replacement for `land-and-deploy` / `ship` /
  `setup-deploy`.
