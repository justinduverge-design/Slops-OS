# slops-os-markdown-patterns

## Purpose

Distill research patterns for the `slops-os-markdown` project.

This file is reference material only. It records repeated findings, tensions, and risk signals. It does not define implementation steps.

## Research Summary

Markdown is useful for Slops OS because it makes agent context portable, readable, reviewable, and easy to version.

The best use of Markdown is not more documentation everywhere. The best use is small, current, source-level guidance that helps agents act with less guessing.

The research points toward a reduced MVP standard:

- Keep Markdown files short enough to load without crowding the context window.
- Separate procedure from reference.
- Prefer progressive disclosure over giant all-in-one files.
- Route files by purpose inside DBS.
- Fix repeated agent mistakes at the source Markdown layer.
- Prune stale context before it becomes context poison.

## Repeated Patterns

### Progressive Disclosure

Agents perform better when they receive immediate instructions first, with paths to deeper reference files only when needed.

Large context dumps can reduce reasoning quality by crowding the model's working space.

### Hierarchical Context

Markdown context works best when it follows a hierarchy:

- OS-level rules.
- Division-level context.
- Product-level context.
- Feature or workflow-specific instructions.

Lower-level files should add specificity without silently contradicting higher-level decisions.

### Procedure And Reference Separation

Procedural files should tell an agent what to do.

Reference files should explain background, examples, research, and patterns.

For skills, `SKILL.md` should stay procedural. Research patterns belong in `References`, not inside the skill.

### Source Integrity Principle

Repeated corrections should update the source Markdown, not just the generated output.

If an agent keeps making the same mistake, the fix belongs in the relevant decision, spec, skill, prompt, or context file after review.

### Context Budget Discipline

More Markdown is not automatically better.

Research flags a quality drop when too much of the context window is consumed by background material. Short, current files beat exhaustive but stale files.

### Human Review At The Edges

Human judgment matters most at the beginning and end:

- Beginning: set direction, scope, constraints, and source files.
- End: validate output, detect drift, and decide whether source Markdown needs updates.

The middle can be more agent-assisted, but only when scope is clear.

## Tensions And Tradeoffs

### Manual Craft vs Auto-Generation

Auto-generated Markdown can create fast scaffolds, but it often becomes bloated.

Human-edited files usually stay sharper, but they require discipline and periodic pruning.

### Standardization vs Flexibility

Standard sections make files easier for agents to parse.

Too much standardization can create form-filling theater where files look complete but do not help the product move faster.

### Interpretability vs State Overhead

Filesystem-based workflows are easy to inspect.

They can become fragile when used as implicit state machines with file locking, partial failures, or concurrent edits.

For MVP, Markdown should support clarity, not become orchestration infrastructure.

## Risk Signals

### Context Poisoning

Outdated paths, stale decisions, and copied historical notes can mislead agents with high confidence.

### Overexploration

Agents may spend too much time reading broad context instead of acting on the task.

### Trajectory Poisoning

Repeated corrections inside one session can train the interaction into a failure pattern. A fresh context or source update may be safer than continuing to patch output.

### Maintenance Death Spiral

If the product changes faster than the docs are pruned, Markdown becomes a liability.

### Productivity Theater

Polishing folder systems, templates, and workflows can feel productive while delaying real product progress.

## Not Now Findings

Do not build full automation around Markdown yet.

Do not build file locking, rollback, or multi-agent orchestration yet.

Do not create a full five-layer context hierarchy before the MVP standard proves useful.

Do not treat Markdown as a substitute for product validation.

Do not put research patterns inside procedural skill files.
