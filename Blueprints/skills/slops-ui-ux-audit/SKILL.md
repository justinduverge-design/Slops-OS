---
name: slops-ui-ux-audit
description: Slops-native UI/UX audit for Corvus screens and components. Audits against the AAA framework (Accuracy, Accessibility, Aesthetic Integrity), Brand/brand-system.md, and the design-system v1 — required states, 44px touch targets, motion-reduce, ARIA/keyboard, WCAG AA contrast, design-token consistency, brand voice, and mock/live labeling. Use to "audit a page/component", "ui/ux review", "design QA before handoff", "is this screen ready", or when replacing an external UX-audit skill. Produces a severity-ranked findings report with before/after fixes; it reviews, it does not edit app code (fixes route back through the build loop).
---

# Slops UI/UX Audit Skill

## Purpose

Replace a generic UX audit with one grounded in Corvus's own standards: the **AAA framework**
(`Blueprints/definition-of-done.md`), `Brand/brand-system.md`, and
`Blueprints/specs/corvus-ux-ui-design-system-v1.md`. The output is a findings report an agent can
turn into build-loop items — not edited code.

## When To Use

- Auditing a routed page or shared component before handoff or launch.
- A "ui/ux review", "design QA", or "is this screen ready" request.
- Sweeping the app for token/state/accessibility consistency.

## When Not To Use

- To edit app code — this skill reviews; fixes become loop items (use `planning-pass`).
- To redesign or invent new patterns — that is a design-system change, not an audit.

## Required Inputs To Review

- The screen(s)/component(s) in scope (file paths or routes).
- `Brand/brand-system.md` (palette, type, voice, copy anchors).
- `Blueprints/specs/corvus-ux-ui-design-system-v1.md` (tokens, state patterns).
- `Blueprints/definition-of-done.md` (AAA bar).

## Audit Checklist

**Accuracy**
- Recommendation first, evidence second.
- No stub/mock shown as live; mock vs. live clearly labeled.
- When a recommendation exists, **confidence and risk are both visible**.

**Accessibility**
- WCAG AA contrast; visible focus states; fully keyboard-navigable; correct ARIA.
- Touch targets >= 44px.
- Risk/confidence carry **text labels, not color alone**.
- `motion-reduce` respected for animation.

**Aesthetic Integrity**
- Brand tokens only — no hardcoded color/space/type values.
- Palette and type per `brand-system.md` (Cormorant Garamond display / Alegreya Sans body /
  DM Mono data; raven black / charcoal / bone / antique gold / crimson / electric violet roles).
- Deliberate hierarchy and spacing; feels intentional.

**Required states** (each must exist and behave)
- Loading — contextual ("Analyzing your matchup…"), not generic "Loading…".
- Error — honest, tells the user what to do next.
- Empty — acknowledges the situation; does not apologize.
- Disconnected-platform — clear recovery CTA.

**Voice**
- Short, direct; recommendation-first; it stops (no padding). Tests instinct, never flatters it.

## Steps

1. Enumerate the routes/components in scope.
2. Audit each against the checklist above.
3. Rank each finding `P0` (broken/inaccessible/misleading), `P1` (off-brand/missing state),
   `P2` (polish).
4. For each finding give a concrete **before → after** fix.
5. Summarize per-screen readiness and the top P0/P1 items.

## Output

A severity-ranked findings report with before/after fixes. Fixes are handed to `planning-pass`
to become ordered frontend loop items — not applied here.

## Safety Rules

- Review only; no app-code edits, no secrets, no deploy.
- Do not change the design system; flag system gaps as findings instead.

## Where This Operates

On the target product's frontend (e.g. `slops-saloon/corvus/frontend`). `Layer 0` doctrine.

## Change Log

- 2026-06-08: Created as the Slops-native replacement for the external `ui-ux-pro-max` audit,
  grounded in the AAA framework, `brand-system.md`, and design-system v1.
