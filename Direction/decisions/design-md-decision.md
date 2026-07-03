# design-md-decision

## Status

Accepted

## Decision

Slops OS will create a lightweight `design.md` workflow now.

The workflow will include:

- A reusable `design.md` spec
- A reusable `design.md` template
- A `design-md-author` skill
- A Claude/Codex placement handoff
- Project-specific root-level `design.md` files when needed

This decision intentionally favors MVP simplicity over design-system infrastructure.

---

## Classification

BUILD NOW

---

## Why

The research and critique both support the same practical direction:

- AI agents need visual context to avoid generic UI.
- A repo-native `design.md` is low-friction.
- Semantic tokens help agents understand design intent.
- Negative constraints are especially useful for preventing drift.
- A lightweight root-level file is enough for MVP projects.
- Slops OS needs repeatable UI guidance across Claude, Codex, Gemini, and future local models.

This is useful now for Slops OS, Omen, and future app builds.

---

## What We Are Building

Build a lean documentation workflow, not a full design system.

Approved artifacts:

```text
Blueprints/specs/design-md.spec.md
Blueprints/templates/design.md
Blueprints/skills/design-md-author/SKILL.md
Blueprints/prompts/design-md-claude-codex-handoff.md
```

Optional supporting artifacts:

```text
References/patterns/design-md-patterns.md
Direction/reviews/design-md-optimization-critic-review.md
```

Project-specific design contracts should usually live at:

```text
<project-root>/design.md
```

Finished project-specific outputs may be copied to:

```text
Solutions/<project>/design.md
```

---

## What We Are Not Building Yet

Delay:

- CI/CD design linting
- Google `design.md` CLI integration
- Automated Figma syncing
- Stitch/Banani syncing workflows
- Multi-brand architecture
- Deep component schema infrastructure
- Full design-system governance
- AST parsing for design validation

These are overbuilt for the current stage.

---

## Key Architecture Decision

`design.md` is for appearance and visual consistency.

It should not replace:

- `CLAUDE.md`
- `AGENTS.md`
- Feature specs
- Product requirements
- Implementation handoffs
- Agent RBAC rules

It should describe visual intent and semantic tokens, then point agents toward the correct implementation layer.

---

## Framework Translation Standard

Each project-specific `design.md` must include a `Framework Mapping` section.

This section should state whether the project uses:

- Tailwind
- shadcn/ui
- CSS variables
- Raw CSS
- Component library files
- Unknown stack

If the stack is known, the file should name the expected mapping locations.

Examples:

```text
tailwind.config.js
app/globals.css
components/ui/*
```

If the stack is unknown, the file should say:

```text
Framework Mapping Needed:
The implementation stack has not been confirmed. Until confirmed, agents should treat these tokens as semantic design guidance and avoid framework-specific assumptions.
```

---

## DBS Routing

Research patterns:

```text
References/patterns/design-md-patterns.md
```

Critic review:

```text
Direction/reviews/design-md-optimization-critic-review.md
```

Decision:

```text
Direction/decisions/design-md-decision.md
```

Spec:

```text
Blueprints/specs/design-md.spec.md
```

Template:

```text
Blueprints/templates/design.md
```

Skill:

```text
Blueprints/skills/design-md-author/SKILL.md
```

Handoff prompt:

```text
Blueprints/prompts/design-md-claude-codex-handoff.md
```

Project implementation:

```text
Solutions/<project>/design.md
```

Archive:

```text
Archive/superseded-design-contracts/<file>
```

---

## Risks

### Design Drift

The `design.md` file can become outdated if the UI evolves but the file is not updated.

Mitigation:

- Review after major UI changes.
- Add repeated AI correction patterns back into the file.
- Avoid updating for one-off tweaks.

### Overbuilding

The workflow can become too heavy if it turns into a full design-system governance process.

Mitigation:

- Keep files short.
- Delay CI/CD and automation.
- Use the skill only for repeatable workflows.

### Framework Ambiguity

Agents may struggle if the file defines abstract tokens without implementation mapping.

Mitigation:

- Require the `Framework Mapping` section.
- Name Tailwind, shadcn/ui, CSS variable, or component paths when known.

### Accessibility Gaps

Agents may generate low-contrast or visually inaccessible UI.

Mitigation:

- Include contrast rules in `Never`.
- Require human review before production use.

---

## Success Criteria

This decision is successful if:

- New UI builds reference `design.md`.
- Claude/Codex generate fewer generic UI outputs.
- Design corrections become less repetitive.
- Project-specific visual guidance stays short and usable.
- Slops OS can reuse the workflow across projects without heavy overhead.

---

## Review Trigger

Revisit this decision when:

- More than three projects use `design.md`.
- The same framework mapping issue repeats.
- The same design drift issue repeats.
- Justin asks for multi-brand support.
- CI/CD validation becomes genuinely necessary.
