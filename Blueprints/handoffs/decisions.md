# Root Handoff Decisions

## Purpose

This file is for OS-level handoff routing decisions.

It is not the Corvus engineering decision log.

## Current Routing

- OS-level decisions: `Direction/`
- OS-level handoffs: `Blueprints/handoffs/`
- Slops Saloon division context: `slops-saloon/Direction/`
- Corvus product decisions: `slops-saloon/corvus/Direction/`
- Corvus engineering handoffs: `slops-saloon/corvus/Blueprints/handoffs/`

## Active Decision

Corvus frontend/backend contracts must be written in the Corvus repo:

```text
slops-saloon/corvus/Blueprints/handoffs/
```

Do not use root handoff files as active product contracts unless Justin explicitly scopes the task to SLOPS OS.
