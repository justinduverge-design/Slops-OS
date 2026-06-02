# slops-os-markdown-critic-review

## Purpose

Store the critic output for the `slops-os-markdown` project.

This review captures risks, weak assumptions, and overbuilding warnings. It informs the reduced MVP Markdown decision and spec.

## What Looks Strong

### Context Budget Awareness

The research correctly recognizes that more context can make agents worse.

The "40% rule" and related context-window warnings are useful because they keep Slops OS from stuffing every file into every session.

### Source Integrity Principle

The strongest idea is to fix the source Markdown, not just the generated output.

When a mistake repeats, the correction should move upstream into the relevant source file after review.

### Procedure / Reference Separation

Keeping procedural instructions separate from background reference material is essential.

`SKILL.md` should remain action-oriented. Research patterns, examples, and long rationale belong in References or supporting files.

## Weak Assumptions

### Non-Technical Maintenance Is Not Free

Markdown is easier than code, but it still requires precision.

Small wording changes can alter agent behavior. Non-technical editing still needs review, conventions, and validation.

### Filesystem Orchestration Is Not Automatically Simple

Folders can make state visible, but they do not remove orchestration complexity.

Using files as a hidden state machine introduces risks around partial outputs, stale context, manual cleanup, and concurrent edits.

### Tool-Agnostic Context Has Limits

Markdown travels across tools, but each model and agent runtime interprets instructions differently.

Slops OS should prefer plain, explicit Markdown while avoiding claims that one file format guarantees identical behavior everywhere.

## Research Gaps

### Merge Conflicts And Concurrent Edits

The research does not explain how multiple people or agents should handle simultaneous edits to the same Markdown tree.

For MVP, avoid multi-agent concurrent writing.

### Maintenance Overhead

The research cites productivity gains but undercounts the time required to write, update, prune, and validate Markdown.

Markdown that is not maintained becomes context poison.

### Automation Threshold

The research does not define when a workflow should move from manual Markdown guidance to automated execution.

For MVP, keep human sign-off at decision points and do not automate transitions.

## Complexity Bias

### The Simple Folder Illusion

Folder structure can feel simple while hiding an ad hoc state machine.

Sequential numbered folders, implicit handoffs, and partial outputs can become fragile if treated as automation infrastructure.

### Factory Before Product

Building a full Markdown operating system before proving product value creates productivity theater.

The reduced MVP should help Slops OS build real products faster, not become the product.

## Overbuilding Warnings

Do not build:

- Full automation.
- File locking.
- Rollback systems.
- Multi-agent orchestration.
- A full five-layer context hierarchy.
- Monolithic workflow files.
- A complete Markdown governance program.

These may become useful later, but they are not needed for the MVP Markdown standard.

## Biggest Risk

The biggest risk is the maintenance death spiral.

The product changes, the Markdown falls behind, agents ingest stale guidance, output quality drops, and the human has to manually patch both the product and the docs.

## Missing Decision

The missing decision is the automation threshold.

Slops OS needs a clear default: Markdown guidance first, human review at boundaries, automation only after a workflow repeats and has obvious value.

## Recommended Reduction

Build now:

- A minimal Markdown authoring and routing standard.
- A pruning and validation habit.
- A lightweight authoring skill.
- A reusable Claude/Codex handoff prompt.

Reject now:

- Full automation.
- Multi-agent orchestration.
- File-system state machines.
- Markdown work that does not accelerate real product progress.

## DBS Routing

```text
References/patterns/slops-os-markdown-patterns.md
Direction/reviews/slops-os-markdown-critic-review.md
Direction/decisions/slops-os-markdown-decision.md
Blueprints/specs/slops-os-markdown.spec.md
Blueprints/skills/slops-markdown-authoring/SKILL.md
Blueprints/prompts/slops-os-markdown-claude-codex-handoff.md
```
