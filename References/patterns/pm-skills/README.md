# pm-skills Harvested Patterns (reference-only)

**Source:** [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) — MIT licensed, harvested 2026-06-20.
**Status:** `reference-only`. These are research-derived patterns, NOT active SLOPS skills. Do not promote to `Blueprints/skills/` without a per-skill review (see `Blueprints/skills/_proposals/pm-skills-harvest-plan.md`).
**Why harvest, not adopt:** Justin already runs the `product-management:*` plugin. These 4 patterns are kept as reference because they name or structure things the installed plugin doesn't. Pair them with the plugin's skills; don't fork PM doctrine.

## Contents

| File | Pairs with | Unique value |
|---|---|---|
| `pre-mortem.md` | `product-management:write-spec` | Tigers / Paper Tigers / Elephants risk classification + launch-blocking/fast-follow/track urgency. |
| `north-star-metric.md` | `product-management:metrics-review` | NSM + 3-5 input metrics; Attention/Transaction/Productivity business-game classification; 7-criteria validation. |
| `competitive-battlecard.md` | `product-management:competitive-brief` | Sales-ready format with objection handling + "landmines to plant" + win/loss patterns. |
| `gtm-strategy.md` | Corvus launch comms (Phase 4) | Channel / messaging / metrics / phased-launch matrix. |
| `prioritization-and-wwa.md` | `product-management:write-spec`, `planning-pass` | Combined: 9 prioritization frameworks (Opportunity Score / ICE / RICE) + Why-What-Acceptance backlog format. |

## Substitute for the removed strategy-red-team slot

The original 2026-06-11 plan listed `strategy-red-team`, which **no longer exists** in the source repo. Per Justin (2026-06-20), harvested `prioritization-frameworks` + `wwas` (Why-What-Acceptance) combined into `prioritization-and-wwa.md` instead. (`wwas` is a backlog-item format, not adversarial framing — note for future red-team needs.)

## Source $ARGUMENTS note

Each file uses `$ARGUMENTS` as the source repo's invocation placeholder. When applying a pattern in SLOPS, substitute the actual product/context (Corvus, Omen, Slops Saloon, etc.).
