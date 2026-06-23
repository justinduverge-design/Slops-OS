---
name: slops-learning-loop
description: Post-live learning workflow for understanding why Omen uses its current technology and improving it before the season ends. Parked until Omen is live and stable unless Justin explicitly invokes it; not for diagnosis or individualized medical or financial advice.
status: parked
skill_type: simple
layer: Layer 0
default_agent: Claude plans and teaches; Codex verifies technical practice when requested
trigger: after Omen is live teach me why we used this technology and how to improve it before season end
version: 0.2.0
upstream: Adapted from mattpocock/skills productivity/teach (MIT), inspected 2026-06-21
owner: SLOPS
---

# Slops Learning Loop

## Purpose

Turn a broad self-development goal into small demonstrated capabilities. The loop uses retrieval practice, deliberate practice, feedback, spacing, and interleaving; progress is based on evidence, not content consumed.

## When to Use

- Only after Omen satisfies Release Done and has a stable seven-day operating baseline, or when Justin explicitly overrides that gate.
- Learn or refresh a bounded capability.
- Create a practice plan across technical, financial-literacy, physical-health, emotional-health, or mental-health topics.
- Diagnose a knowledge gap through questions or a small task.
- Review retained knowledge and choose the next practice step.

## Do Not Use

- During the current pre-live Omen build unless Justin explicitly reactivates it.
- Medical or mental-health diagnosis, treatment, crisis response, exercise clearance, investment selection, tax advice, or promises of outcomes.
- Collecting sensitive health or financial records that are not needed for the learning goal.
- Replacing a qualified clinician, trainer, therapist, fiduciary, accountant, or attorney.

## Required Inputs

- Learning goal and why it matters.
- Current ability demonstrated by a retrieval question or small task.
- Available time, preferred medium, accessibility needs, and safety constraints.
- A concrete artifact or behavior that would demonstrate competence.

## Preconditions and Dependencies

- No runtime dependency; lessons may be plain Markdown. HTML or other assets are optional when they materially improve practice.
- Activation gate: Omen is live, Release Done evidence exists, and at least one seven-day `slops-product-pulse` report is available.
- Current, high-stakes health or financial claims require authoritative research before teaching.
- Stop and direct urgent health or safety concerns to appropriate professional or emergency support.

## Process Recipe

1. Convert the goal into one observable capability and a small success test.
2. Run a no-notes retrieval attempt or practical baseline; record what is known, uncertain, and missing.
3. Teach only the smallest concept needed for the next attempt, using an example tied to the learner's context.
4. Require an active response: explain, predict, calculate, debug, demonstrate, or produce an artifact.
5. Give specific feedback on the response, then repeat with a slightly varied problem until the success test passes.
6. Interleave a related prior concept so the learner must choose the right method, not imitate the latest example.
7. Schedule short reviews at increasing intervals; each review begins with retrieval before rereading.
8. Record evidence, misconceptions, safety caveats, and the next smallest capability.
9. Periodically prune goals or resources that no longer contribute to the learner's stated outcome.

## Output Contract

Produce a learning objective, baseline evidence, short lesson, active-practice task, feedback rubric, spaced-review schedule, source/safety notes, and next capability. For persistent plans, default to `Direction/roadmaps/<topic>-learning-plan.md`; reviews go to `Direction/reviews/` only when file writing is approved.

## Verification

- The learner completes the success test without copying the worked example.
- A later retrieval check shows what was retained and what needs relearning.
- Progress claims cite an artifact, answer, measurement, or observed behavior.
- High-stakes claims name current authoritative sources and uncertainty.

## DBS Routing

- Reusable procedure: this Layer 0 skill.
- Plans: `Direction/roadmaps/`; review evidence: `Direction/reviews/`; research: `References/research/`.
- Product implementation learned through practice still routes to the relevant product layer and build controls.

## Boundaries

- Ask for the minimum sensitive information needed and do not persist it by default.
- Keep health practice conservative and within stated ability; stop for pain, crisis, or red-flag symptoms.
- Teach financial concepts and decision frameworks, not personalized trades or guaranteed returns.
- External outreach, spending, accounts, subscriptions, and installs require separate approval.

## Failure Modes

- Measuring pages watched instead of ability demonstrated.
- Long lectures before finding the actual gap.
- Giving the answer before retrieval or practice.
- A rigid curriculum that ignores feedback, safety, or accessibility.
- Treating wellness education as diagnosis or financial literacy as investment advice.

## Prior-Use Review Loop

Read `notes/prior-use-review.md` when present. Update the next session from retention evidence and learner corrections, not from assumed completion.

## Changelog

- 0.2.0 — Parked until Omen is live and stable; narrowed first use to understanding Omen technology and improving it before season end.
- 0.1.0 — Initial SLOPS learning loop adapted from the upstream teach workflow with optional artifacts and health/financial safety boundaries.
