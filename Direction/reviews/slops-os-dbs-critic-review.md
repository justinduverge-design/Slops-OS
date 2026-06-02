# slops-os-dbs-critic-review

## Purpose

Store the critic output for the Slops OS DBS project.

This review informs the reduced MVP decision and routing spec. It does not authorize implementation.

## What Looks Strong

### Statefulness Shift

Moving from throwaway chat sessions to a disk-backed folder system is correct.

Local folders act as external memory, making AI work contextual and cumulative instead of session-bound.

### Scoped Architecture

Separating work into `Direction`, `Blueprints`, `Solutions`, `References`, and `Archive` creates useful semantic boundaries.

The structure helps prevent raw research, active decisions, reusable workflows, and final outputs from collapsing into one folder.

### Structured Prompting

Explicit structure in markdown, YAML, and selective tags can reduce instruction drift.

The value is in clarity and scoping, not in over-tagging everything.

## Weak Assumptions

### Automatic Discovery

The research overstates automatic discovery.

Claude or Codex can use file paths, skill metadata, and scoped folders when instructed, but they do not automatically monitor the entire filesystem, find every nested `SKILL.md`, and hot-swap instructions mid-task.

The MVP must use explicit read-first files and scoped prompts.

### Open Standard Claims

Markdown skills are portable as text, but not as identical runtime behavior.

Different agents interpret metadata, tools, permissions, and context loading differently. The safe standard is clear markdown plus explicit routing, not a claim that all models execute the same skill format.

## Research Gaps

### Token Bleed

Broad folder access can burn context quickly.

If an agent scans the entire DBS root, it may waste tokens on stale, archived, imported, or irrelevant files. The MVP needs least-privilege file reading and named source paths.

### State Conflict

A session can hold stale context after files change on disk.

The research does not define a refresh protocol for cases where a file changes after the agent has already loaded it. The reduced workflow should tell agents to re-read target files before editing and before final verification.

### Context Scoping Boundaries

The missing decision is how much of DBS an agent should see at once.

The answer for MVP is scoped visibility: read the root context and named source files, then expand only when necessary.

## Complexity Bias

### Composio/Rube Overbuild Risk

Composio/Rube may become useful later, but it is too much for the immediate workflow.

External connectors introduce OAuth scopes, token refreshes, changing tool schemas, silent connection failures, and operational complexity. That conflicts with the immediate goal: a local markdown router.

### Multi-Department Tree Overbuild

Creating a full Marketing, Finance, Sales, Operations, and Support tree before one workflow works adds organizational tax.

Validate one research-to-architecture routing loop first.

## Biggest Risk

Silent ignore or token exhaustion.

An agent may claim it read a file it did not truly inspect, or it may exhaust context by scanning too broadly. Both failures make the DBS system feel trustworthy while quietly drifting.

## Recommended Reduction

Build a local DBS router workflow now.

Do not build a fully automated multi-agent system now.

Do not create custom MCP servers now.

Do not add Composio/Rube setup now.

Do not reorganize the entire Slops OS tree now.

## Prior-Use Recommendations

Add a prior-use review loop to the new router skill.

That loop should ask:

- Did the skill route the files correctly?
- Did it read too many files?
- Did it merge decision, spec, review, pattern, prompt, and skill into one artifact?
- Did it create implementation instructions too early?
- Did it recommend improvements without auto-editing itself?

Repeated failures should become skill failure modes after Justin approves the update.

## DBS Routing

```text
References/patterns/slops-os-dbs-patterns.md
Direction/reviews/slops-os-dbs-critic-review.md
Direction/decisions/slops-os-dbs-decision.md
Blueprints/specs/slops-os-dbs-routing-and-skill-creation.spec.md
Blueprints/skills/dbs-research-to-architecture-router/SKILL.md
Blueprints/prompts/slops-os-dbs-claude-codex-handoff.md
```
