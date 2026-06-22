---
name: slops-prompt-generator
description: Generate concrete, implementation-ready Slops Saloon prompts from audits, handoffs, specs, contracts, roadmaps, or context markdown. Use when Justin asks for a next development prompt, Claude/Codex handoff prompt, repo task prompt, implementation prompt, audit-to-action prompt, or prompt artifact under SLOPS Blueprints prompts.
---

# Slops Prompt Generator

## Overview

Use this skill to turn current Slops context into a prompt another agent can run without guessing. The prompt should be practical, scoped, file-aware, and clear about what not to touch.

## Workflow

1. Identify the target agent:
   - Codex for backend, APIs, contracts, data, tests, infrastructure support, and implementation prompts.
   - Claude for frontend, UI, UX, visual integration, and component wiring prompts.
   - Either agent only when the task is explicitly cross-functional.
2. Read only the source files the user names. If the user does not name files, read the nearest current context, roadmap, handoff, spec, and README files before writing.
3. Separate three things:
   - Source truth: what the current files say.
   - Task: what the next agent should do.
   - Boundaries: what the next agent must not touch.
4. Produce a concrete prompt artifact when the user asks for a next prompt. Do not stop at docs, contracts, or analysis.
5. Put prompt artifacts in the relevant prompts folder:
   - Root reusable prompts: `Blueprints/prompts/`
   - Active app prompts: `slops-saloon/corvus/Blueprints/prompts/`
6. Use a filename that names the feature and action, such as `omen-mvp-move-development.md`.
7. Include the exact files to read first, the exact deliverable, constraints, test expectations, documentation expectations, and completion report.
8. If the user wants old prompts preserved for later analysis, place them under `Blueprints/prompts/_old-prompts-for-analysis/` only after explicit move/copy approval.

## Audit Lesson

The audit that led to this skill found a recurring failure mode: Codex created docs and contracts but did not create the concrete next development prompt Justin expected.

Prevent that failure by checking:

- Did the user ask for a prompt, next prompt, dev prompt, Claude prompt, Codex prompt, or task prompt?
- Is there a prompt file path or prompts folder in the request or DBS index?
- Does the final artifact tell the next agent exactly what to read, do, avoid, test, and report?
- Would another agent know where to write code or docs without asking Justin again?

## Prompt Shape

Use this structure unless the user provides a better one:

````markdown
# <Feature / Task> Prompt

Use this prompt for <next agent / next pass>.

```text
You are <agent role>.

Objective:
<One concrete outcome.>

Read first:
- <file>
- <file>

Scope:
- <included work>
- <excluded work>

Required behavior:
- <specific requirement>
- <specific requirement>

Testing:
- <focused tests or verification>

Documentation:
- <handoff/spec/doc update rule>

Completion report:
- files changed
- commands run
- known limitations
- next recommended step
```
````

## Quality Bar

- Make the prompt executable as-is.
- Keep the prompt scoped to the requested layer.
- Prefer backend/frontend ownership boundaries already present in Slops docs.
- Include "Do not" constraints for secrets, deployment, production, auth, payments, databases, and frontend redesign when relevant.
- Require tests when the prompt asks for implementation.
- Require handoff updates only when the implementation changes the agreed contract.
- Clearly label mock, stub, live, unavailable, future, and unknown data states.

## References

Read `references/audit-reference.md` when generating prompts from audits, missed expectations, or corrective follow-up tasks.
