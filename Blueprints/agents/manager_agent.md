---
name: manager_agent
status: active (runtime)
layer: 1-slops-saloon
canonical-location: slops-saloon\corvus\Blueprints\prompts\manager_agent.md
---

# Manager Agent — Redirect Stub

> **This file is a redirect stub.** The Manager Agent is a runtime prompt
> defined at the `1-slops-saloon` project layer. It is not a global SLOPS OS agent
> and does not inherit the 0-OS authority model.

---

## Canonical Location

```text
slops-saloon\corvus\Blueprints\prompts\manager_agent.md
```

## Status

`active (runtime)` — Corvus fantasy football weekly recommendation engine.

Do not edit the canonical file without reading the Tuning Notes section inside it first.
Every change to the Manager Agent prompt affects every user's weekly recommendation.

## What This Agent Does

The Manager Agent receives structured intelligence from the six sub-agents and two
Math-Fact blocks (VORP and Positional Scarcity) and produces ONE weekly move
recommendation in strict JSON format.

## Related Files

- `slops-saloon\corvus\Blueprints\prompts\sub_agents.md` — the six sub-agent prompts
- `slops-saloon\corvus\Blueprints\prompts\PROMPTS_CHANGELOG.md` — tuning history
- `Blueprints\agents\AGENT_INDEX.md` — Section 3 (Project-Specific Agents)
- `Blueprints\agents\layer-handoff-protocol.md` — cross-layer communication rules

## Why This Stub Exists

`Blueprints\agents\` is the global SLOPS OS agent roster. The Manager Agent lives
one layer down at `1-slops-saloon` because it is product-specific runtime logic, not a
reusable OS-level role. This stub prevents confusion when browsing the global agent
directory.

See `layer-handoff-protocol.md` for the full 0-OS → 1-slops-saloon → 2-Corvus authority chain.
