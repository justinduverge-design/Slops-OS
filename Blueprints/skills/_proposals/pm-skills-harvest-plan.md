# pm-skills Harvest Plan (PROPOSAL)

**Source:** [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) — MIT, 12.2k★, 9 plugins.
**Approved by Justin:** 2026-06-11 (harvest, not adopt).

## Why harvest, not adopt

Installing all 9 plugins duplicates the `product-management:*` plugin Justin already has. Two competing PM doctrines fragments operator brain. Harvest the 5 skills clearly better than what's installed; install one plugin standalone for its unique scope.

## The 5 Harvested Patterns

Copied into `References/patterns/pm-skills/` as `reference-only` (do not promote to active skills without a per-skill review).

| Source skill | Target path | Why |
|---|---|---|
| `pm-execution/strategy-red-team` | `References/patterns/pm-skills/strategy-red-team.md` | Adversarial stress-test pattern; finer-grained than `product-management:write-spec`'s built-in critique. |
| `pm-execution/pre-mortem` | `References/patterns/pm-skills/pre-mortem.md` | Tigers / Paper Tigers / Elephants risk classification — names risks in a way the existing PM plugin doesn't. |
| `pm-marketing-growth/north-star-metric` | `References/patterns/pm-skills/north-star-metric.md` | NSM + input metrics + business game classification. Pairs with `product-management:metrics-review`. |
| `pm-go-to-market/competitive-battlecard` | `References/patterns/pm-skills/competitive-battlecard.md` | Sales-ready format with objection handling. No equivalent in the plugin. |
| `pm-go-to-market/gtm-strategy` | `References/patterns/pm-skills/gtm-strategy.md` | Channel/messaging/launch matrix. Will inform Corvus launch comms when Phase 4 arrives. |

## The 1 Plugin Installed Standalone

**`pm-ai-shipping`** (2 skills + 5 commands: `/ship-check`, `/document-app`, `/derive-tests`, `/security-audit-static`, `/performance-audit-static`).

- Install path: as a Claude/Codex plugin alongside the existing `product-management:*` plugin. No conflicts (`pm-ai-shipping` has its own slash-command namespace).
- Use case: pre-launch documentation pass for Corvus when Phase 1.x is far enough along to ship — produces architecture/permission/test-coverage docs that auditors and reviewers expect.
- Pairs with `compliance-by-template` (legal docs) for the full pre-launch package.

## What to Skip

The other 7 pm-skills plugins (product-discovery, product-strategy, execution, market-research, data-analytics, marketing-growth, go-to-market, toolkit) duplicate scope already covered by the installed `product-management:*` plugin. Skip them. The 5 harvested patterns above are the parts the installed plugin is missing.

## Codex Procedure (when approved)

1. `git clone --depth 1 https://github.com/phuryn/pm-skills.git References/_imported/pm-skills/` (read-only reference).
2. Copy the 5 SKILL.md files from `pm-skills/pm-execution/skills/` and `pm-skills/pm-marketing-growth/skills/` and `pm-skills/pm-go-to-market/skills/` to `References/patterns/pm-skills/` with status frontmatter set to `reference-only`.
3. Install `pm-ai-shipping` per its README install instructions on Justin's machine (not via Codex).
4. Add a one-line note to `SKILL_ROUTING.md` § "Special Routing Rules" pointing at `References/patterns/pm-skills/` for PM workflow patterns not covered by the installed plugin.

## Changelog
- 2026-06-11 — plan approved by Justin.
