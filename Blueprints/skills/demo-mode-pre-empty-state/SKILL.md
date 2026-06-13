---
name: demo-mode-pre-empty-state
description: Pattern + doctrine for what every Slops product shows before a user has connected real data. Sample dataset, mock/live badge, swap contract, and the "never silently mix demo + real" rule.
status: active
skill_type: simple
layer: 0
default_agent: Claude (pattern review), Codex (fixture generation)
trigger: "design first-run | cold start | pre-empty-state | demo league | sample data | mock vs live"
version: 0.1.0
owner: Justin
---

# Demo Mode Pre-Empty-State (PROPOSAL)

## When to Use
Designing any user-facing surface that has a "you haven't connected anything yet" state. Standard at Slops Saloon — every product must declare its demo mode before launch.

## Scope (one paragraph)
Define a reusable cold-start pattern: a clearly labeled sample dataset that lets a new user see real value before they connect their real league/account, plus a hard rule that demo data never silently mixes into real data once they switch over. The skill produces a per-product `demo-mode.md` covering: sample fixture shape, the visible "this is sample data" affordance (ties to `slops-ui-ux-audit` mock/live rule), the conversion CTA, and the swap-in moment.

## Required Inputs
- Product name + the entity model that needs sampling (for Corvus: league, roster, matchups, score).
- Brand-system mock/live badge spec.

## Outputs
- `<product>/Blueprints/demo-mode.md` — sample fixtures listed, swap-in contract spelled out, mock/live badge placement, conversion CTA copy direction.
- A shared pattern doc at `Blueprints/patterns/demo-mode.md` (Layer 0, reusable doctrine).

## Hard Rules
- Demo data must be visually marked at all times via the mock/live badge.
- The user must take an explicit action to swap to real data — no auto-merge, no silent fallback.
- Demo data must be deterministic (same fixtures every session) so support can reproduce reports.
- Demo data must never feed analytics events (PostHog/Umami) or LLM training prompts.

## Does NOT
- Generate the sample fixtures (Codex job, gated by product spec).
- Audit existing screens (that's `slops-ui-ux-audit`).
- Write the CTA copy (that's `slops-ux-copy`).

## Replaces / Complements
- **Net-new.** Complements `slops-ui-ux-audit` by giving the mock/live check a target pattern.
- Harvested from Corvus Phase 1 work; best authored AFTER Corvus ships its version so the pattern is real, not guessed.

## Verification
- Success signal: a `demo-mode.md` exists for the product; the audit confirms badge visibility on every demo-mode route.

## Changelog
- 0.1.0 — initial proposal scaffold (2026-06-11).
