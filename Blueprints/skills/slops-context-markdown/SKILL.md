---
name: slops-context-markdown
description: Create, update, normalize, and route SLOPS DBS markdown context files in Justin's style. Use for context.md, README files, decision logs, handoffs, roadmap notes, specs, indexes, and documentation cleanup. Do not use for app code, secrets, SQL, package files, deployment, or feature implementation.
---

# Slops Context Markdown

## Purpose

Use this skill to create, update, clean, and normalize SLOPS markdown context files while preserving the DBS folder system.

This skill keeps Slops OS readable, current, and safe for Claude, Codex, and future agents.

It is a documentation and context workflow skill. It is not a code implementation skill.

## When to Use

Use this skill when Justin asks to:

- Create or update `context.md`.
- Clean up markdown documentation.
- Normalize README files, indexes, handoffs, specs, roadmaps, or decision notes.
- Convert rough project notes into structured DBS files.
- Prepare a handoff for Claude, Codex, Gemini, NotebookLM, or another agent.
- Separate live context from stale, archived, imported, or reference material.
- Route documentation into the correct SLOPS folder.

Use it for files such as:

- `context.md`
- `README.md`
- `SKILL_ROUTING.md`
- `AGENT_INDEX.md`
- handoff files
- decision logs
- roadmap notes
- security/privacy trackers
- project-state files
- markdown specs

## Do Not Use

Do not use this skill to:

- Edit app source code.
- Change SQL, migrations, RLS policies, or database schemas.
- Modify `.env`, Infisical, Stripe, Supabase, auth, cookies, payments, DNS, SSL, Nginx, VPS, or deployment files.
- Rewrite package files.
- Run terminal commands.
- Move or delete files without explicit approval.
- Make final business decisions.
- Treat archived or imported material as authoritative.

If the task requires implementation, use this skill only to prepare the documentation or handoff, then route execution to Codex through an approved prompt.

## Style Standard

Write in Justin's Slops style:

- Practical.
- Plain English.
- Direct.
- Structured.
- Founder-aware.
- Handoff-ready.
- No corporate filler.
- No fake certainty.
- No unnecessary abstraction.

Prefer short sections and clear bullets.

Do not bury decisions in paragraphs.

## Read-First Procedure

Use least privilege.

1. Read the user request.
2. Identify the target DBS layer.
3. Read only the files named by Justin.
4. If no files are named, read the nearest current:
   - `context.md`
   - `README.md`
   - index file
   - roadmap
   - handoff
   - spec
5. Search before reading large files.
6. Prefer current files over archive, imported, copied, or stale files.
7. Treat `_imported`, `_archive`, `_drafts`, and external examples as non-authoritative unless Justin says otherwise.

## DBS Routing Rules

Route markdown by purpose.

```text
direction/
  decisions/       Permanent product, architecture, security, business, or scope decisions.
  reviews/         Critiques, audits, risk reviews, and planning-session analysis.
  roadmaps/        Sequencing, launch plans, milestones, and priorities.

blueprints/
  skills/          Reusable skill workflows.
  agents/          Reusable agent roles, RBAC, divisions, and personas.
  prompts/         Runnable prompts for Claude, Codex, or other agents.
  templates/       Reusable file shapes.
  specs/           Implementation-neutral requirements and contracts.

references/
  research/        Raw research and source captures.
  patterns/        Repeated source patterns and extracted lessons.
  examples/        Inspiration and non-authoritative examples.

solutions/
  deliverables/    Final outputs meant to be used or shared.
  reports/         Completed analysis reports or final summaries.

archive/
  superseded/      Old files replaced by newer decisions.
  imports/         External dumps preserved for reference.
```

## Markdown Normalization Rules

When editing or creating context markdown:

- Use one H1 title.
- Use clear H2 sections.
- Keep sections short.
- Prefer lists for decisions, constraints, and next steps.
- Separate facts, decisions, assumptions, risks, and next actions.
- Include target paths when relevant.
- Preserve user language when it captures founder intent.
- Remove duplicated instructions only when the newer source is clear.
- Mark uncertain items as open questions.
- Do not turn temporary brainstorms into permanent doctrine without approval.

## Output Contract

When producing analysis only, include:

- What the file or folder is for.
- What looks correct.
- What is risky or unclear.
- Recommended routing.
- Next safe step.

When producing a markdown file, include:

- Target path.
- Full file content or patch-ready content.
- Source files used.
- Assumptions.
- What was intentionally not touched.
- Next recommended action.

When creating a handoff, include:

- Objective.
- Read-first files.
- Scope.
- Exclusions.
- Acceptance criteria.
- Completion report requirements.

## Least Privilege Rules

This skill may recommend edits to documentation only.

It may not grant agents permission to:

- Delete files.
- Touch production.
- Modify secrets.
- Modify auth, payments, cookies, or user data.
- Run database commands.
- Deploy.
- Push to main.
- Override Justin's explicit instructions.

If a documentation change affects those areas, flag the risk and require approval before execution.

## Prior Use Review Loop

Before updating this skill or using it for a recurring cleanup, check for:

```text
slops-context-markdown/notes/prior-use-review.md
```

If present, review:

- Prior cleanup mistakes.
- Files that were over-edited.
- Folders that were routed incorrectly.
- User corrections.
- New folder conventions.
- New DBS routing rules.

If the same mistake appears twice, recommend adding it to this skill's failure modes.

## Common Failure Modes

Avoid:

- Mixing current context with archive material.
- Treating GitHub-imported agents as active SLOPS authority.
- Editing more files than requested.
- Rewriting Justin's founder intent into generic startup language.
- Creating broad doctrine from a temporary planning note.
- Moving project-specific files into global Blueprints without checking scope.
- Producing a summary when Justin asked for a file.
- Producing a file when Justin asked for analysis only.
- Forgetting to name the target path.

## Completion Checklist

Before finishing:

- [ ] Did I preserve DBS structure?
- [ ] Did I use least privilege?
- [ ] Did I separate current truth from references?
- [ ] Did I avoid app code and sensitive files?
- [ ] Did I provide or recommend the correct path?
- [ ] Did I state assumptions and next step?
