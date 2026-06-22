# pm-skills Harvest Plan (EXECUTED 2026-06-20; RECONCILED 2026-06-21)

> **RECONCILED 2026-06-21:** Six patterns are now retained under `References/patterns/pm-skills/`. The upstream `strategy-red-team` file exists again and has its own adapted reference. `prioritization-and-wwa` remains as a distinct prioritization/backlog pattern, not a substitute. `pm-ai-shipping` is not installed; only its intended-versus-implemented review method remains a future harvest candidate because the full plugin overlaps SLOPS review and quality gates.

**Source:** [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) — MIT, 12.2k★, 9 plugins.
**Approved by Justin:** 2026-06-11 (harvest, not adopt).

## Why harvest, not adopt

Installing all 9 plugins duplicates the `product-management:*` plugin Justin already has. Two competing PM doctrines fragments operator brain. Harvest the 5 skills clearly better than what's installed; install one plugin standalone for its unique scope.

## The 6 Harvested Patterns

Adapted into `References/patterns/pm-skills/` as `reference-only` (do not promote to active skills without a per-skill review).

| Source skill | Target path | Why |
|---|---|---|
| `pm-execution/strategy-red-team` | `References/patterns/pm-skills/strategy-red-team.md` | Adversarial stress-test pattern; finer-grained than `product-management:write-spec`'s built-in critique. |
| `pm-execution/pre-mortem` | `References/patterns/pm-skills/pre-mortem.md` | Tigers / Paper Tigers / Elephants risk classification — names risks in a way the existing PM plugin doesn't. |
| `pm-marketing-growth/north-star-metric` | `References/patterns/pm-skills/north-star-metric.md` | NSM + input metrics + business game classification. Pairs with `product-management:metrics-review`. |
| `pm-go-to-market/competitive-battlecard` | `References/patterns/pm-skills/competitive-battlecard.md` | Sales-ready format with objection handling. No equivalent in the plugin. |
| `pm-go-to-market/gtm-strategy` | `References/patterns/pm-skills/gtm-strategy.md` | Channel/messaging/launch matrix. Will inform Corvus launch comms when Phase 4 arrives. |

## Plugin decision

**`pm-ai-shipping` is not installed.**

- Its intended-versus-implemented review idea may be harvested later into existing SLOPS review/definition-of-done procedures.
- The full plugin overlaps `slops-code-review`, `slops-quality-baseline`, Codex Security, and existing Corvus done gates.
- Any future installation requires a new explicit approval and overlap review.

## What to Skip

The other 7 pm-skills plugins (product-discovery, product-strategy, execution, market-research, data-analytics, marketing-growth, go-to-market, toolkit) duplicate scope already covered by the installed `product-management:*` plugin. Skip them. The 5 harvested patterns above are the parts the installed plugin is missing.

## Codex Procedure (when approved)

1. `git clone --depth 1 https://github.com/phuryn/pm-skills.git References/_imported/pm-skills/` (read-only reference).
2. Copy the 5 SKILL.md files from `pm-skills/pm-execution/skills/` and `pm-skills/pm-marketing-growth/skills/` and `pm-skills/pm-go-to-market/skills/` to `References/patterns/pm-skills/` with status frontmatter set to `reference-only`.
3. Do not install `pm-ai-shipping`; harvest a bounded method only if a verified gap remains.
4. Keep a one-line note in `SKILL_ROUTING.md` § "Special Routing Rules" pointing at the strategy red-team reference.

## Changelog
- 2026-06-21 — restored the upstream strategy-red-team reference, retained prioritization/WWA separately, and recorded the no-install decision for pm-ai-shipping.
- 2026-06-11 — plan approved by Justin.
