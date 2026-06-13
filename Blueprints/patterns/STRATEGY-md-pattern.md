# STRATEGY.md Pattern (PROPOSAL)

**Source:** harvested from [`EveryInc/compound-engineering-plugin`](https://github.com/EveryInc/compound-engineering-plugin)'s `/ce-strategy`.
**Approved by Justin:** 2026-06-11.

## The Pattern

Every Slops Saloon product gets a single `STRATEGY.md` at its repo root. It is the durable anchor that ideate / brainstorm / plan / spec / retro all read as grounding when present.

## Contents

```markdown
# <Product> Strategy

## Target Problem
One paragraph. What specific problem does this product solve, for whom?

## Approach
One paragraph. How are we solving it differently from alternatives?

## Persona
One paragraph. Who specifically uses this? Not "everyone." A specific person.

## Key Metrics
- North Star: <one metric>
- Input metrics: <2-3 metrics that move the NSM>
- Guardrails: <metrics that, if they break, override everything>

## Tracks
The 2-3 simultaneous workstreams the product is on. Each track is one sentence.

## What This Product Will NOT Do
The bounds. As important as what it will do.

## Last Updated
YYYY-MM-DD by <who>
```

## Why This Pattern

Corvus today has direction spread across `Direction/current_sprint.md`, `Direction/roadmap.md`, the launch-readiness handoff, the architecture-pivot handoff, and several smaller docs. None of them serve as the one-pager an agent reads to ground itself before doing the next thing.

STRATEGY.md is that one-pager. It does not replace the sprint or roadmap — it grounds them.

## How Slops Skills Use It

When present, the following skills must read `<product>/STRATEGY.md` as part of their read-first procedure:

- `planning-pass` — before adding backlog items.
- `slops-prompt-generator` — before generating runnable prompts.
- `slops-retro` — before extracting doctrine.
- `slops-ui-ux-audit` — when assessing if the UI matches the strategy's persona.
- `slops-code-review` — when assessing whether a change matches the strategy's "Will NOT Do" bounds.
- Future `slops-product-pulse` — anchors the pulse report against current strategy.

When absent, the skills proceed without it (no failure), but Claude should suggest creating one if the workflow keeps re-deriving the same context.

## Adoption Order

- **Slops OS (L0):** no STRATEGY.md — SLOPS is the operating system, not a product. Doctrine lives in `CLAUDE.md` + `AGENTS.md`.
- **Slops Saloon (L1):** create a one-page `slops-saloon/STRATEGY.md` covering the division — what apps it ships, what aesthetic, what monetization rule.
- **Corvus (L2):** create `slops-saloon/corvus/STRATEGY.md` after Phase 1.1 ships. Do NOT add it mid-phase — let the existing sprint finish.
- **Future products (Corvus #2, etc.):** STRATEGY.md is a Day-1 file, written before any code.

## Does NOT

- Replace `Direction/roadmap.md` or `current_sprint.md`.
- Get edited mid-sprint (touched only at strategy moments — initial write, after major retros, on pivot).
- Live anywhere except the product repo root.

## Changelog
- 2026-06-11 — pattern approved by Justin. Adoption order set; Corvus does NOT get STRATEGY.md until after Phase 1.1.
