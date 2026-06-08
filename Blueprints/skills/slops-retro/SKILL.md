---
name: slops-retro
description: Slops-native retrospective that turns a cycle's lessons into durable doctrine, so the OS gets smarter every cycle. Reviews what shipped, what was decided, what broke or slowed down, and converts each lesson into a decision_log entry, a doctrine update, or a proposed new skill/playbook/template. Use at the end of a sprint/batch, after an incident, after a ship, "run a retro", "what did we learn", or when replacing external learn/retro skills. Produces a retro summary plus concrete doctrine changes/new-artifact proposals. Writes notes and proposals only — no app code, no deploy.
---

# Slops Retro Skill

## Purpose

The compounding step. Every build cycle should leave the OS better than it found it — either a
confirmed practice or a new/updated artifact. This skill captures lessons and routes them into
durable doctrine instead of letting them evaporate. Replaces external `learn` + `retro`.

## When To Use

- End of a sprint or a batch of shipped items.
- After an incident, a rollback, or a notable surprise.
- After a ship, to capture what the release taught you.

## When Not To Use

- To preserve session state for resume — that is `clean-up-checkpoint`.
- To plan new feature work — that is `planning-pass`.

## Required Inputs To Review

- Sprint items closed since the last retro (`Direction/current_sprint.md`).
- `Direction/decision_log.md` entries since the last retro.
- Any `slops-canary` / `slops-investigate` findings from the cycle.
- What took longer than expected, broke, or felt fragile.

## Steps

1. **Gather** what happened this cycle: shipped, decided, broke, slowed.
2. **Assess** each notable item: what worked, what didn't, and why.
3. **Convert** every lesson into a durable home:
   - Confirmed practice → record in `decision_log.md` or fold into the relevant skill/playbook.
   - Recurring pain → propose a new skill/playbook/template (hand to `slops-skill-author` /
     `planning-pass`) and add it to `SLOPS_LIFECYCLE.md`.
   - One-off → just log it.
4. **Update** the affected doctrine and write a short retro summary to `decision_log.md`.

## Output

A retro summary plus a concrete list of doctrine updates and/or new-artifact proposals. The lessons
become reusable, not anecdotal.

## Safety Rules

- Notes, doctrine, and proposals only; no app code, secrets, or deploy.
- Be specific and evidence-based; a "lesson" with no change to make is just a note.

## Where This Operates

`Layer 0` doctrine; reads a product's `Direction/*`, writes lessons into `decision_log.md` and the
skill/playbook system. Pairs with `slops-skill-author`, `planning-pass`, and `SLOPS_LIFECYCLE.md`.

## Change Log

- 2026-06-08: Created (Wave 2) as the Slops-native replacement for `learn` + `retro`.
