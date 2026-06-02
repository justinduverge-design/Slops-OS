# slops-os-dbs-patterns

## Purpose

Store validated research patterns for the Slops OS DBS project.

This is reference material. It informs decisions, specs, skills, and prompts, but it does not contain implementation instructions.

## Research Summary

The research supports moving from temporary chat prompting into a persistent folder-based operating system.

The useful core is the DBS structure:

- `Direction`: current truth, decisions, roadmaps, reviews, and operating priorities.
- `Blueprints`: reusable prompts, specs, skills, templates, agents, tools, workflows, and handoffs.
- `Solutions`: finished outputs, reports, and deliverables.
- `References`: research, examples, source captures, and repeated patterns.
- `Archive`: superseded, parked, imported, or historical material.

The research is strongest when it treats DBS as a local routing discipline and reusable knowledge system.

The research is weakest when it promises automatic skill discovery, broad agent autonomy, or instant external-app orchestration.

## Repeated Patterns

### Persistent Context Beats Ephemeral Chat

Useful work should not live only in chat history.

Repeated decisions, prompts, specs, and workflows should become small markdown files in the correct DBS layer so future sessions can restart from current truth.

### Skills Should Stay Small

Skills work best as focused workflows.

Avoid one giant "run the whole business" skill. Prefer composable skills that handle one repeatable job, such as research-to-architecture routing, prompt generation, design.md authoring, or workflow-tree specs.

### Metadata Matters, But It Is Not Magic

Skill names, descriptions, and folder paths help agents discover what to read.

They do not create a background daemon, autonomous filesystem monitor, or guaranteed hot-swap behavior. Agents still need explicit scoping, named files, or a clear task prompt.

### Context Scoping Is A Feature

DBS should reduce context noise.

Agents should read the smallest useful set of files: current context first, named source files next, references only when needed, and archive only when explicitly requested.

### Markdown And YAML Are Practical Defaults

Markdown is good for human-readable doctrine, handoffs, specs, and reviews.

YAML is useful for structured tokens, metadata, or compact data when a tool expects it.

Do not over-tag simple prompts or turn every note into a schema.

### Prior-Use Review Improves Skills

After a skill is used, repeated mistakes should be captured in prior-use notes or failure modes.

The loop should recommend improvements, but a skill should not auto-edit itself.

## Tool And Data Recommendations

Recommended now:

- Local folder-based DBS routing.
- Markdown for decisions, reviews, specs, prompts, and skill instructions.
- YAML only where structure is needed.
- Small reusable skills under `Blueprints/skills`.
- Explicit file paths in handoffs and prompts.
- Manual review before promoting repeated patterns into skills.

Useful later:

- Scripts for deterministic tasks once a workflow repeats.
- Index updates after the target files prove useful.
- Connector tooling only after local workflows are stable.
- Skill prior-use notes after multiple real uses.

Use caution with:

- Broad CoWork-style folder access, because it can cause token bleed.
- Large imported folders, because they can blur authority.
- External app connectors, because OAuth scopes and changing schemas add operational risk.
- Auto-generated skill updates, because they can introduce regressions.

## Not Now Findings

Do not build custom MCP servers now.

Do not set up Composio/Rube now.

Do not scan or reorganize the full Slops OS tree for this workflow.

Do not create a multi-agent autonomous routing system now.

Do not create a full departmental tree before one local workflow works.

Do not rely on automatic discovery of deeply nested skills without explicit prompting.

Do not let a skill auto-edit itself.

Do not create Solutions files unless Justin explicitly asks for finished outputs.
