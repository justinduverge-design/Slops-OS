# slops-os-markdown-decision

## Status

Accepted.

## Classification

BUILD NOW, reduced MVP.

## Decision

Build a reduced MVP Markdown standard for Slops OS.

The standard should help create, route, prune, and validate Markdown files across DBS without becoming a full automation system.

Full automation is explicitly rejected for now.

## Why Build Now

Slops OS depends on Markdown as operational context.

Without a small standard, Markdown files can drift, duplicate, over-explain, or become stale enough to mislead agents.

The MVP standard is worth building now because it improves speed and safety for real product work:

- Agents know where files belong.
- Justin gets shorter, clearer handoffs.
- Repeated corrections can be fixed at the source.
- Research, review, decisions, specs, skills, and prompts stay separate.

## Reduced MVP

Do now:

- Define practical Markdown file routing.
- Keep files short and purpose-specific.
- Separate procedure from reference.
- Require validation criteria for specs.
- Add pruning rules for stale or duplicated Markdown.
- Add a lightweight reusable skill for Markdown authoring and DBS routing.
- Add a reusable Claude/Codex handoff prompt.
- Apply the Source Integrity Principle.

Do later:

- Add index updates after files prove useful.
- Add examples to the skill after repeated use.
- Add templates only for repeated file types.
- Add automation only after a workflow repeats and manual routing becomes a real bottleneck.

Do not do yet:

- Full automation.
- File locking.
- Rollback systems.
- Multi-agent orchestration.
- Large context hierarchy expansion.
- Monolithic workflows.
- Markdown governance theater.

## Source Integrity Principle

Future repeated corrections should update the source Markdown, not just the generated output.

If an agent makes the same mistake twice, review which source file should change:

- Context file.
- Decision file.
- Spec.
- Skill.
- Prompt.
- Reference pattern.

Do not auto-edit source files. Recommend the source update and apply it only when explicitly asked.

## Guardrails

- Preserve MVP simplicity.
- Create Markdown files only.
- Do not touch application code.
- Do not build automation.
- Do not create Solutions files unless explicitly asked.
- Do not put research patterns inside skills.
- Do not put procedure inside reference files.
- Do not treat Markdown polish as product progress.

## Success Criteria

This decision succeeds if Slops OS Markdown becomes:

- Easier to route.
- Easier to prune.
- Easier for agents to follow.
- Less likely to create stale context.
- More useful for building real products faster.

## Related Files

```text
References/patterns/slops-os-markdown-patterns.md
Direction/reviews/slops-os-markdown-critic-review.md
Blueprints/specs/slops-os-markdown.spec.md
Blueprints/skills/slops-markdown-authoring/SKILL.md
Blueprints/prompts/slops-os-markdown-claude-codex-handoff.md
```

## Next Safe Step

Use the spec and skill on one real Markdown package, then review whether any repeated correction belongs in a source file.
