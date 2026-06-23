---
name: sub_agents
status: active (runtime)
layer: 1-slops-saloon
canonical-location: slops-saloon\omen\Blueprints\prompts\sub_agents.md
---

# Sub-Agents — Redirect Stub

> **This file is a redirect stub.** The Sub-Agent prompts are runtime prompts
> defined at the `1-slops-saloon` project layer. They are not global SLOPS OS agents
> and do not inherit the 0-OS authority model.

---

## Canonical Location

```text
slops-saloon\omen\Blueprints\prompts\sub_agents.md
```

## Status

`active (runtime)` — Six specialized agents that run before the Manager Agent.

Do not edit the canonical file without reading the notes inside it first.
Each sub-agent output becomes part of the `signals` object passed to the Manager Agent.

## The Six Sub-Agents

1. Weather Agent — stadium weather impact on passing/running game
2. Injury Agent — player injury status and game-time decisions
3. Matchup Agent — defensive matchup grades
4. Trend Agent — recent target share and usage trends
5. Vegas Agent — game total, spread, and implied team totals
6. News Agent — beat reporter signals and insider notes

## Related Files

- `slops-saloon\omen\Blueprints\prompts\manager_agent.md` — the orchestrating Manager Agent
- `slops-saloon\omen\Blueprints\prompts\PROMPTS_CHANGELOG.md` — tuning history
- `Blueprints\agents\AGENT_INDEX.md` — Section 3 (Project-Specific Agents)
- `Blueprints\agents\layer-handoff-protocol.md` — cross-layer communication rules

## Why This Stub Exists

`Blueprints\agents\` is the global SLOPS OS agent roster. These sub-agents live
one layer down at `1-slops-saloon` because they are product-specific runtime logic for
the Omen fantasy football engine. This stub prevents confusion when browsing the
global agent directory.

See `layer-handoff-protocol.md` for the full 0-OS → 1-slops-saloon → 2-Omen authority chain.
