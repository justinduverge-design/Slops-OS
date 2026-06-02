# design-md.spec

## Purpose

Define the MVP contract for a lightweight `design.md` file in Slops OS.

This spec is reusable guidance. It is not a project-specific design contract, feature spec, component library, or production UI plan.

## Status

MVP guidance.

Use now. Keep small. Expand only after repeated project need.

## What design.md Is

A `design.md` file is visual guidance for agents and humans.

It should help Claude, Codex, Gemini, Cursor, Stitch, local models, or future agents understand the intended look, feel, interaction states, and visual guardrails for a layer, division, product, feature, or interface.

It should reduce generic AI UI output without becoming a full design system.

## Required Contents

An MVP `design.md` must include:

- YAML front matter for machine-readable tokens.
- Markdown prose for human-readable rationale.
- Scope: layer, product, feature, owner, status, and implementation boundary.
- Design goal: one short explanation of what the interface should help users feel, understand, or do.
- Semantic tokens: names based on intent, not raw appearance.
- Exact values when implementation needs them.
- Do, Avoid, and Never sections.
- Framework mapping for Tailwind, CSS variables, shadcn/ui, raw CSS, or unknown stack.
- Interaction states when relevant: default, loading, empty, error, disconnected, unauthorized, locked, success, and recovery.
- Handoff boundaries for design planning, implementation, product decisions, and backend/API support.
- Open questions and one next safe step.

## Token Rules

Prefer semantic names:

```yaml
tokens:
  color:
    surface.primary: "#0f172a"
    text.muted: "#94a3b8"
    action.primary: "#f8c15c"
```

Avoid names that only describe raw appearance:

```yaml
tokens:
  color:
    darkBlue: "#0f172a"
    grayText: "#94a3b8"
    yellowButton: "#f8c15c"
```

Exact values are required when an implementer needs them. If values are not approved, mark them as draft or unresolved instead of pretending they are final.

## Constraint Rules

`Do` describes preferred behavior.

`Avoid` describes patterns that are usually wrong for the project.

`Never` describes load-bearing constraints. Agents must treat `Never` rules as hard boundaries unless Justin explicitly changes them.

## Framework Mapping

Every project-specific `design.md` must include a framework mapping section.

If the stack is known, name the files or systems where tokens should map, such as:

```text
tailwind.config.js
app/globals.css
components/ui/*
frontend/src/lib/theme.js
```

If the stack is unknown, say:

```text
Framework Mapping Needed:
The implementation stack has not been confirmed. Until confirmed, agents should treat these tokens as semantic design guidance and avoid framework-specific assumptions.
```

## Behavior

Agents should use `design.md` as visual guidance before building or modifying UI.

Agents should not treat `design.md` as permission to:

- Change production code.
- Override feature specs.
- Override product decisions.
- Override `AGENTS.md`, `CLAUDE.md`, `SKILL_ROUTING.md`, or explicit Justin instructions.
- Change auth, payments, secrets, database, deployment, infrastructure, or backend architecture.

## Out Of Scope

Do not add these for the MVP workflow:

- Google `design.md` CLI.
- CI/CD design linting.
- Figma automation.
- Stitch automation.
- Banani automation.
- Multi-brand schema.
- Production component code.
- Agent RBAC rules.
- New runtime agent folders.
- Full design-system governance.

## DBS Placement

Reusable spec:

```text
Blueprints/specs/design-md.spec.md
```

Reusable template:

```text
Blueprints/templates/design.md
```

Reusable authoring skill:

```text
Blueprints/skills/
```

Runnable handoff prompt:

```text
Blueprints/prompts/design-md-claude-codex-handoff.md
```

Decision record:

```text
Direction/decisions/design-md-decision.md
```

Final project-specific `design.md` outputs do not belong in `Blueprints`.

## Success Validation

The MVP workflow is successful when:

- The `design.md` is short enough for agents to follow in one pass.
- YAML front matter exists and contains machine-readable tokens.
- Markdown explains why the design choices matter.
- Semantic token names are used.
- Exact values are present where implementation needs them.
- Do, Avoid, and Never sections are present.
- Framework mapping is present.
- `Never` constraints are specific enough to prevent drift.
- The file stays visual and does not become a feature spec.
- No production UI, CI/CD linting, syncing, or external design tooling is added.

## Review Triggers

Review the workflow when:

- More than three projects use `design.md`.
- Agents repeatedly ignore the same visual constraint.
- Framework mapping becomes a recurring source of mistakes.
- Justin asks for multi-brand design support.
- CI/CD validation becomes clearly useful instead of speculative.
