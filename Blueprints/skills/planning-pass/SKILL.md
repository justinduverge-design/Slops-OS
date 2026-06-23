---
name: planning-pass
description: Turn a goal into ordered, buildable backlog items for the SLOPS build loop. Use when Justin says "plan the next work", "what should we build next and in what order", "groom the sprint", "add backlog items", "turn this goal into tasks", "create P-items", "break this down", or after a batch of work finishes / direction changes / an agent surfaces a follow-up. Produces priority-ordered lane items in the product's current_sprint.md, each pointing at a spec with an explicit done-when, with blocked items placed below their blockers. Plans and writes backlog only — never starts the build, and never touches app code, secrets, deploy, or production.
---

# Planning Pass Skill

## Purpose

Convert a goal or pile of discovered work into ordered, buildable items the build loop can pull
automatically. A good planning pass means an agent can later read the top unchecked item in its lane
and start cold — no clarifying questions, no scope guessing.

This is the deliberate, human-in-the-loop act that *creates* backlog. It is the counterpart to
`clean-up-checkpoint`, which only surfaces what is already next and never invents new work.

## When To Use

- Justin asks to plan, prioritize, groom, break down, or "figure out what's next and in what order."
- A batch of items finished and the lane is thin.
- New information, a decision, or a direction change reshapes priorities.
- An agent surfaced a follow-up that needs to become a real, ordered item.

## When Not To Use

- Do not use to start building — this skill writes the plan, not the code.
- Do not use to resume or preserve state at session end — that is `clean-up-checkpoint`.
- Do not use to author a skill, agent, or prompt file — those have their own skills.
- Do not deploy, commit, push, migrate, or touch secrets/production.

## Required Files To Review

Read only what is needed for the target product/layer:

- The product's `Direction/current_sprint.md` (the queue + lane order).
- The product's `Direction/decision_log.md` (settled decisions that constrain the plan).
- Any relevant `Blueprints/specs/*` (or note that a spec must be written first).
- `Direction/context.md` and the layer route (`AGENTS.md`) to classify each item's DBS layer.
- The loop operator doc (e.g. `Blueprints/prompts/HOW-TO-RUN-THE-LOOP.md`) if present.

## Steps — the five moves

1. **Name the goal in one line.** ("Make Omen trustworthy on all platforms.")
2. **Decompose into concrete work.** If any part is fuzzy, write or point to a **spec** first so
   "done" is definable. Classify each piece by DBS layer before placing it.
3. **Group by lane.** Backend / Frontend / Ops / Verify / Decision.
4. **Order by priority + dependency**, then number: `P1, P2…` (Backend), `FP1, FP2…` (Frontend).
   Highest first — that is what the agent pulls.
5. **Write each item in the required shape** and place blocked items *below* their blockers.

## Required P-Item Shape

```
- [ ] **P{n} — {imperative title}.** {what + the files/modules}. Spec: `{path}`. Done-when: {explicit, testable outcome}. {Blocked by P# — only if true.}
```

## Quality Bar

- **Cold-start test:** could a fresh agent start from this one line without asking anything? If not,
  it is missing a file path, a spec link, or a clearer done-when.
- **Good:** `P1 — Sleeper live Omen. Implement adapters/sleeper.fetchAndNormalizeRoster(...) -> normalized roster, wire into services/omen.js getLiveOmenForUser. Spec: Blueprints/specs/live-engine-spec.md. Done-when: spec DoD + fixture test + real-account smoke.`
- **Weak:** `Make Sleeper work.` — no files, no spec, no done-when; the agent guesses scope.
- One outcome per item. If a line hides two deliverables, split it.

## Dependency Rule

The loop's pull is dumb about dependencies. Keep a blocked item **below** an unblocked one in the
same lane and write `Blocked by P#` in the line, so the top-pull always lands on something runnable.

## Output Format

Write items into the product's `Direction/current_sprint.md` under "Next", in the correct lane,
in priority order. Update the "Last updated" line. Do not check anything off. The final response
should restate, in 5 bullets max: the goal, the new items by lane in order, any new spec created,
any dependency blocks, and the recommended first pull.

## Safety Rules

- Plan and write backlog only — never start the build.
- Classify each item's DBS layer; do not place app-specific items in Layer 0 or Layer 1.
- Do not write app code, edit secrets/`.env`, deploy, commit, push, migrate, or touch production.
- Ask Justin before adding items that imply destructive, cross-layer, or gated actions.
- Keep edits short and factual; one outcome per item.

## Where To Store Outputs

- Backlog items: the target product's `Direction/current_sprint.md`.
- Any supporting spec: that product's `Blueprints/specs/`.
- Reusable patterns discovered while planning: `Layer 0` `Blueprints/templates` or a new skill.

## Change Log

- 2026-06-08: Created from the Omen build-loop planning method (promoted from HOW-TO-RUN-THE-LOOP.md).
