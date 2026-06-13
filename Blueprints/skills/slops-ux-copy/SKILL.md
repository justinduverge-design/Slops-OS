---
name: slops-ux-copy
description: Write or review Corvus UX copy in the brand voice — CTAs, empty/error/disconnected/loading states, confirmations, onboarding, microcopy. Grounded in Brand/brand-system.md copy anchors and the sharp, recommendation-first, instinct-testing voice. Use to "write copy for", "what should this button say", "review this error/empty state", "name this CTA", or when replacing an external UX-copy skill. Returns copy options with rationale; never flatters the user's instinct, never presents mock data as live, never invents marketing or legal claims.
---

# Slops UX Copy Skill

## Purpose

Corvus's voice is specific — a sharp, observant analyst that tests instinct rather than flattering
it. Generic UX-copy guidance misses it. This skill writes and reviews on-product copy against
`Brand/brand-system.md` and the design-system voice rules so every surface sounds like Corvus.

## Voice Rules (from brand-system.md + design-system v1)

- Short and direct. Recommendation first, evidence second. Then it stops.
- Confidence and risk stay visible wherever a recommendation exists.
- Empty states **acknowledge** the situation; they do not apologize.
- Errors are honest and tell the user **what to do next**.
- Loading is contextual ("Analyzing your matchup…"), never generic.
- Corvus **tests instinct, it does not flatter it.** It is not a chatbot, dashboard, or news feed.

## Copy Anchors (do not reinvent)

- Use the approved lines from `brand-system.md` §2 (e.g. `Less guessing. Better moves.`,
  `The edge is in what you almost missed.`).
- Never use the listed "Do not use" lines (e.g. `Know your move before you make it.`).
- `Deus pascit corvos.` is lore/wordmark only — not a public marketing line.

## When To Use

- Writing or naming a CTA, button, confirmation, or onboarding step.
- Filling a loading / error / empty / disconnected state.
- Reviewing existing copy for voice, honesty, and clarity.

## When Not To Use

- To invent new taglines/positioning (that is a `brand-system.md` change).
- To make marketing or legal claims, or to soften a mock/live distinction.

## Required Inputs To Review

- The surface and its specific state.
- `Brand/brand-system.md` (anchors, voice, is/is-not, audience).
- `Blueprints/specs/corvus-ux-ui-design-system-v1.md` (state copy patterns).

## Steps

1. Identify the surface and the exact state being written.
2. Draft 2–3 options in voice (short, recommendation-first, honest).
3. Check each against the anchors and the "do not use" list.
4. Flag any honesty issue (mock shown as live, overstated confidence, flattery).
5. Recommend one with a one-line rationale.

## Output

Copy options + the recommended pick + why, with any mock/live or honesty notes. No app edits.

## Safety Rules

- Copy only; no app-code edits, no secrets, no deploy.
- Never present mock/placeholder data as live advice.
- Never invent legal, pricing, or performance claims.

## Where This Operates

On the target product's frontend. `Layer 0` doctrine.

## Change Log

- 2026-06-08: Created as the Slops-native UX-copy skill, grounded in `brand-system.md` voice and
  copy anchors and the design-system state patterns.
