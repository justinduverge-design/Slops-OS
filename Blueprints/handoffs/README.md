# SLOPS Handoffs

This folder is for SLOPS OS-level handoffs and cross-agent coordination notes.

## Layer Routing

Use these paths:

- OS handoffs: `Blueprints/handoffs/`
- Slops Saloon division context: `slops-saloon/`
- Omen product handoffs: `slops-saloon/omen/Blueprints/handoffs/`

## Omen Handoffs

Active frontend/backend contracts live in:

```text
slops-saloon/omen/Blueprints/handoffs/
```

Do not put active Omen endpoint contracts in the root OS handoff folder.

## Current OS Handoff Files

- `claude-context-handoff.md` - OS documentation/context continuation.
- `decisions.md` - OS-level decision routing note.

## Boundary

Root handoffs should not edit app source, deployment config, secrets, SQL, package files, or production infrastructure.
