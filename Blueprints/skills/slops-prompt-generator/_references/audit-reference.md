# Audit Reference

Use this reference when a prompt is being generated after an audit, correction, or missed expectation.

## Observed Failure

Justin expected a concrete next development prompt.

Codex produced docs and contracts, but no prompt artifact.

The gap was not that the contract was wrong. The gap was that the next agent still did not have a runnable task prompt.

## Root Cause

Codex over-indexed on the explicit write targets and treated documentation as the final deliverable.

The correct behavior was to convert the contract into a concrete next development prompt and write it to the appropriate prompts folder.

## Prevention Rule

When Justin asks for a prompt, next task, development prompt, corrective prompt, or handoff-to-agent prompt:

- create the prompt artifact
- give it a stable path
- make it runnable by the next agent
- include read-first files
- include scope and exclusions
- include acceptance criteria
- include test expectations
- include final report requirements

Do not make the next agent infer the task from docs alone.

## Corrective Prompt Pattern

```text
Create a concrete next development prompt for <feature/task>.

Do not implement <feature/task> yet.

Read only:
- <source file>
- <source file>

Write the prompt to:
<path>

The prompt should instruct <agent> to:
- <required implementation or analysis step>
- <required state/edge case>
- <required test/documentation expectation>

Keep the prompt practical, implementation-ready, and scoped to <ownership boundary>.
```
