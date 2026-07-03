# pm-skills Harvested Patterns (reference-only)

**Source:** [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) — MIT licensed, harvested 2026-06-20.
**Status:** `reference-only`. These are research-derived patterns, NOT active SLOPS skills. Do not promote to `Blueprints/skills/` without a per-skill review (see `Blueprints/skills/_proposals/pm-skills-harvest-plan.md`).
**Why harvest, not adopt:** Justin already runs the `product-management:*` plugin. These patterns are kept as references because they name or structure things the installed plugin does not. Pair them with active SLOPS/plugin skills; do not fork PM doctrine.

## Contents

| File | Pairs with | Unique value |
|---|---|---|
| `pre-mortem.md` | `product-management:write-spec` | Tigers / Paper Tigers / Elephants risk classification + launch-blocking/fast-follow/track urgency. |
| `north-star-metric.md` | `product-management:metrics-review` | NSM + 3-5 input metrics; Attention/Transaction/Productivity business-game classification; 7-criteria validation. |
| `competitive-battlecard.md` | `product-management:competitive-brief` | Sales-ready format with objection handling + "landmines to plant" + win/loss patterns. |
| `gtm-strategy.md` | Omen launch comms (Phase 4) | Channel / messaging / metrics / phased-launch matrix. |
| `prioritization-and-wwa.md` | `product-management:write-spec`, `planning-pass` | Combined: 9 prioritization frameworks (Opportunity Score / ICE / RICE) + Why-What-Acceptance backlog format. |
| `strategy-red-team.md` | the relevant planning/review skill | Load-bearing assumptions, steelman/attack, `fails if`, evidence-this-week, kill criteria, and the cheapest disconfirming test. |

## Strategy-red-team reconciliation

The upstream `strategy-red-team` file was present again when checked on 2026-06-21. It is now represented by `strategy-red-team.md`. The earlier `prioritization-and-wwa.md` remains because prioritization/backlog formatting and adversarial strategy testing are different procedures; it is no longer labeled as a substitute.

## Source $ARGUMENTS note

Each file uses `$ARGUMENTS` as the source repo's invocation placeholder. When applying a pattern in SLOPS, substitute the actual product/context (Omen, Omen, Slops Saloon, etc.).
