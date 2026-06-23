# Root Handoff Decisions

## Purpose

This file is for OS-level handoff routing decisions.

It is not the Omen engineering decision log.

## Current Routing

- OS-level decisions: `Direction/`
- OS-level handoffs: `Blueprints/handoffs/`
- Slops Saloon division context: `slops-saloon/Direction/`
- Omen product decisions: `slops-saloon/omen/Direction/`
- Omen engineering handoffs: `slops-saloon/omen/Blueprints/handoffs/`

## Active Decision

Omen frontend/backend contracts must be written in the Omen repo:

```text
slops-saloon/omen/Blueprints/handoffs/
```

Do not use root handoff files as active product contracts unless Justin explicitly scopes the task to SLOPS OS.
