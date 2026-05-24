# DBS Markdown Style

## Voice

Write like a working operating note for future agents.

The voice is clear, direct, practical, and lightly formal. It should feel like current truth, not a brainstorm.

Use:

- Short paragraphs.
- Simple headings.
- Concrete paths.
- Current priorities.
- Explicit safety boundaries.
- Plain-English product language.

Avoid:

- Long narrative history unless history changes today's decision.
- Migration archaeology as active context.
- Dense technical language when a simpler contract would work.
- Hype, slogans, or decorative prose.
- Moving source, secrets, deploy config, package files, SQL, tests, or active assets during DBS cleanup.

## Common Shapes

Context files usually answer:

1. What layer is this?
2. What is active now?
3. What rules or boundaries govern work here?
4. What should future agents do next?

Roadmaps usually answer:

1. Now
2. Next
3. Later
4. Scope boundary

Navigation files usually answer:

1. What folder system is this?
2. Which files are canonical?
3. Which folders are safe to use?
4. Which folders are stale, parked, or dangerous?

Handoffs usually answer:

1. Purpose
2. Active context
3. Current request or response
4. Contract details
5. State handling
6. Known limitations
7. Frontend or backend action needed

## DBS Folder Meanings

Direction means context, roadmap, vision, priorities, decision logs, and current sprint notes.

Blueprints means specs, prompts, skills, workflows, templates, and playbooks.

Solutions means working outputs, deliverables, implementation-adjacent notes, assets, and results.

References means supporting research, source material, comparison notes, and historical context.

Archive means reviewed superseded, parked, stale, or quarantined material. Archive is preservation, not deletion.

## Slops Product Rules

For Corvus and `ssffmvp`, preserve these rules unless Justin changes them:

- Corvus is the active Fantasy Football MVP product.
- Trade Analyzer is the front door.
- Draft Assistant is the preparation and seasonal tool.
- Omen of the Week / MVP Move is the main event.
- Start/Sit lives inside Omen / MVP Move.
- Waiver logic lives inside Omen / MVP Move unless explicitly separated later.
- Yahoo, Sleeper, and ESPN all matter.
- ESPN is essential but risky and needs recovery playbooks.
- Users need plain-English reasoning, not heavy math.

## Editing Checklist

- Read nearest `DBS_INDEX.md` and `Direction/context.md`.
- Check for layer-specific `README.md` and roadmap files.
- Preserve existing canonical paths unless the task is explicitly to change them.
- Label live, stub, mock, future, and unknown states.
- Add the smallest next action when the file is meant to guide work.
