---
name: slops-investigate
description: Slops-native root-cause investigation for bugs and incidents. Works a problem through reproduce -> isolate -> diagnose -> propose-fix -> define-verification, evidence-based and read-only against production. Use for a bug, a stack trace, "works in staging not prod", unexpected behavior, or when slops-canary recommends HOLD/ROLLBACK. Replaces external investigate. Diagnoses and proposes; the fix becomes a build-loop item (planning-pass) reviewed by slops-code-review. Never hot-patches production, never guesses a cause it has not evidenced.
---

# Slops Investigate Skill

## Purpose

A disciplined path from symptom to root cause that produces a fix proposal, not a guess. Replaces
external `investigate`. Often triggered by `slops-canary` (a HOLD/ROLLBACK) or a reported bug.

## When To Use

- A bug, stack trace, failed request, or data anomaly.
- "Works in staging but not prod" / behavior diverges from expected.
- A canary HOLD/ROLLBACK that needs a cause.

## When Not To Use

- To ship a fix directly — the fix is a separate, reviewed build item.
- To make production changes while investigating (read-only on prod).

## Required Inputs To Review

- The symptom: error text, repro steps, affected route/user, when it started.
- Relevant logs/signals and the touched code paths.
- Recent changes (what shipped just before it appeared).

## Steps

1. **Reproduce** — establish a reliable repro, or capture concrete evidence if it can't be reproduced
   yet. State plainly which it is.
2. **Isolate** — narrow to the layer/component (frontend, route, adapter, data, infra) by evidence.
3. **Diagnose** — name the root cause and cite the evidence for it. If unconfirmed, say so — never
   assert a cause you haven't shown.
4. **Propose fix** — hand a scoped fix to `planning-pass` as a loop item; it will be built and
   reviewed by `slops-code-review`.
5. **Define verification** — state how you'll know the fix worked (test, smoke, canary signal).

## Output

A root-cause writeup (or an honest "unconfirmed, here's the evidence and next probe") + a proposed,
scoped fix item + a verification plan. No production changes.

## Safety Rules

- Read-only against production; no hot-patches, no restarts, no data edits.
- Never expose secrets or cookie values in evidence.
- Distinguish confirmed cause from hypothesis explicitly.

## Where This Operates

On the target product repo + prod signals (read-only). `Layer 0` doctrine; pairs with `slops-canary`
(trigger), `planning-pass` (the fix), and `slops-code-review` (fix review).

## Change Log

- 2026-06-08: Created (Wave 3) as the Slops-native replacement for `investigate`.
