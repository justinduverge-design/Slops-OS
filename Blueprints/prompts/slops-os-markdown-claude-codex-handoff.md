# slops-os-markdown Claude/Codex Handoff

## Purpose

Use this handoff to create or update the MVP Markdown operating package for `slops-os-markdown`.

Architecture is needed.

Implementation is not needed.

Markdown files only.

## Task

Create the MVP Markdown operating package:

```text
References/patterns/slops-os-markdown-patterns.md
Direction/reviews/slops-os-markdown-critic-review.md
Direction/decisions/slops-os-markdown-decision.md
Blueprints/specs/slops-os-markdown.spec.md
Blueprints/skills/slops-markdown-authoring/SKILL.md
Blueprints/prompts/slops-os-markdown-claude-codex-handoff.md
```

## Read First

```text
Direction/context.md
Blueprints/skills/README.md
Blueprints/skills/SKILL_ROUTING.md
References/patterns/slops-os-markdown-patterns.md
Direction/reviews/slops-os-markdown-critic-review.md
```

If the kebab-case patterns file already exists, prefer it over the underscore draft:

```text
References/patterns/slops-os-markdown-patterns.md
```

## Decisions To Preserve

- Classification: `BUILD NOW, reduced MVP`.
- Build a minimal Markdown standard.
- Reject full automation for now.
- Preserve MVP simplicity.
- Separate procedure from reference.
- Keep `SKILL.md` procedural.
- Put research patterns in References, not inside the skill.
- Include validation criteria in the spec.
- Include a prior-use review and improvement loop in the skill.
- Apply the Source Integrity Principle.

## Source Integrity Principle

Future repeated corrections should update the source Markdown, not just the generated output.

Recommend source updates when repeated mistakes appear.

Do not auto-edit source files unless Justin explicitly asks.

## Exclusions

Do not:

- Implement app code.
- Build automation.
- Build file locking.
- Build rollback.
- Build multi-agent orchestration.
- Create monolithic workflows.
- Create Solutions files unless explicitly asked.
- Put implementation steps in reference patterns.
- Put research patterns inside the skill.

## Completion Report

Report:

- Files created or updated.
- Exact paths.
- Source files used.
- Assumptions.
- What was intentionally excluded.
- Validation performed.
- Index updates needed.
- Next safe step.

## Next Safe Step

Use this package on one real Markdown task and update the source Markdown only if the same correction repeats.
