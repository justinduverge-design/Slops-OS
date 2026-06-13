# Slops Saloon Blueprints

This folder is for division-level blueprints only.

It is intentionally light right now because Corvus is the only active product.

## Use This Folder For

- Division-level prompts.
- Division-level specs.
- Reusable patterns that apply to more than one Slops Saloon product.
- Future product setup templates.

## Reusable Agent Loop

Use this template when a second Slops Saloon product needs the same Claude/Codex
task routing pattern:

```text
Blueprints/prompts/agent-build-loop-template.md
```

Corvus already has its product-specific loop under `corvus/Blueprints/`.

## Do Not Use This Folder For

- Corvus product prompts.
- Corvus engineering specs.
- Corvus frontend/backend handoffs.
- Corvus deploy or source documentation.
- Global SLOPS skills.

## Current Product Blueprint Path

Corvus product blueprints live at:

```text
corvus/Blueprints/
```

Global SLOPS skills live at:

```text
..\Blueprints\skills\
```
