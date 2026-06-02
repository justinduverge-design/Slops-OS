# design-md Claude/Codex Handoff

## Task

Create the Slops OS `design.md` MVP documentation files using the approved DBS structure.

This is a documentation and architecture placement task.

Do not build production UI.

Do not create a full design system.

Do not add CI/CD linting, automated syncing, or external design tooling.

---

## Files to Create

Create these files:

```text
Blueprints/specs/design-md.spec.md
Blueprints/prompts/design-md-claude-codex-handoff.md
Direction/decisions/design-md-decision.md
```

Justin already has:

```text
Blueprints/templates/design.md
Blueprints/skills/design-md-author/SKILL.md
```

Justin also still has the Notebook and Gemini research outputs, so do not recreate research unless explicitly asked.

---

## Layer Placement

### Spec Layer

Create:

```text
Blueprints/specs/design-md.spec.md
```

Purpose:

Define what an MVP `design.md` should contain, how it should behave, what is out of scope, and how success is validated.

This file is reusable guidance.

It should not be a project-specific design contract.

---

### Prompt Layer

Create:

```text
Blueprints/prompts/design-md-claude-codex-handoff.md
```

Purpose:

Give Claude/Codex a runnable instruction for placing and maintaining the `design.md` system files.

This is a handoff prompt, not a permanent design contract.

---

### Decision Layer

Create:

```text
Direction/decisions/design-md-decision.md
```

Purpose:

Record the decision to build the lightweight `design.md` workflow now and delay heavier design-system infrastructure.

This should explain:

- Why this is BUILD NOW
- Why this is MVP-only
- What is excluded
- What risks exist
- What success looks like

---

## Architecture Rules

Follow these rules:

- Preserve modularity.
- Keep files short and agent-readable.
- Do not create monolithic workflows.
- Do not merge spec, skill, template, and decision into one file.
- Do not put reusable skills in `Solutions`.
- Do not put final project outputs in `Blueprints`.
- Do not create archive files unless replacing existing files.
- Do not modify production code.

---

## Design.md Rules to Preserve

The `design.md` workflow should preserve these decisions:

1. Use YAML front matter for machine-readable tokens.
2. Use Markdown prose for human-readable rationale.
3. Prefer semantic token names over raw appearance names.
4. Include exact values when implementation needs them.
5. Include Do / Avoid / Never sections.
6. Treat `Never` constraints as load-bearing.
7. Include framework mapping.
8. Keep the file short enough for agents to follow.
9. Treat `design.md` as visual guidance, not a feature spec.
10. Delay CI/CD and automation until clearly needed.

---

## Required DBS Paths

Use these exact paths:

```text
Blueprints/specs/design-md.spec.md
Blueprints/prompts/design-md-claude-codex-handoff.md
Direction/decisions/design-md-decision.md
```

Optional future paths, do not create unless asked:

```text
References/patterns/design-md-patterns.md
Direction/reviews/design-md-optimization-critic-review.md
Solutions/<project>/design.md
Archive/superseded-design-contracts/<file>
```

---

## Expected Output

After creating the files, report:

1. Files created
2. Exact paths
3. Any assumptions made
4. What was intentionally excluded
5. Any index updates needed
6. Next safe step

---

## Assumptions

Assume Justin already has:

- A `design.md` template
- The `design-md-author` skill
- Notebook research
- Gemini critique/research

Do not recreate those unless Justin explicitly asks.

---

## Exclusions

Do not add:

- Google `design.md` CLI
- CI/CD design linting
- Figma automation
- Stitch automation
- Banani automation
- Multi-brand schema
- Production component code
- Agent RBAC rules
- New runtime agent folders

---

## Completion Report Format

Use this format:

```md
## Files Created

- `Blueprints/specs/design-md.spec.md`
- `Blueprints/prompts/design-md-claude-codex-handoff.md`
- `Direction/decisions/design-md-decision.md`

## Assumptions

- Justin already has the reusable template and skill.
- Existing Notebook/Gemini research should remain as reference material.

## Intentionally Excluded

- CI/CD linting
- Automated design syncing
- Production UI changes
- Full design-system infrastructure

## Index Updates Needed

- Add `design-md.spec.md` to the relevant specs index if one exists.
- Add `design-md-claude-codex-handoff.md` to prompt routing if one exists.
- Add `design-md-decision.md` to decision index if one exists.

## Next Safe Step

Use the handoff to place the files inside the Slops OS DBS tree.
```
