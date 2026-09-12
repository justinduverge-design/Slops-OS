---
name: slops-context-markdown
description: Create, update, normalize, route, and prune SLOPS DBS markdown across all layers in Justin's style. Use for context.md, README files, decision logs, reviews, handoffs, roadmap notes, specs, prompts, reference patterns, indexes, lightweight SKILL.md files, and documentation cleanup. Do not use for app code, secrets, SQL, package files, deployment, full automation, multi-agent orchestration, or feature implementation. (Canonical markdown skill; absorbed the retired slops-markdown-authoring.)
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

## Writing for agents

Before authoring or restructuring any document an agent reads, read
`References/patterns/writing-for-agents.md` — context pointers, the information hierarchy,
completion criteria, leading words, and pruning. Adapted from `mattpocock/skills` (MIT) and
extended with the SLOPS rule below.

**Every environmental claim carries a date and a falsifier.** An environmental claim asserts
something outside the repo: host machine, OS, installed tooling, a hardware limit, a vendor's
availability. Write the date it was true and the event that ends it, in the line itself or in
`freshness` on an opted-in page. `"Local Xcode is not viable (2017 Intel MacBook Air)"` outlived
its truth twice because it carried neither. A claim you cannot date or falsify is a claim without
evidence — say that instead.

## Valor Brain metadata

`valor-brain/v1` is the machine-readable contract for **knowledge pages** — decisions, reviews,
specs, resolvers, logs. It makes authority, state, provenance, relationships and freshness
checkable while explanation and history stay in Markdown. Canonical spec:
`Blueprints/specs/valor-brain-metadata-v1.md`. Field validation:
`Blueprints/specs/valor-brain-page.schema.json`.

Opt a page in when it will be read as authority — when an agent could route or act on it. A page
declares itself with one line and ordinary Markdown stays valid and ignored:

```yaml
---
metadata_profile: valor-brain/v1
```

An opted-in page then carries `page_id`, `page_type`, `layer`, `authority`, `owner`, `state`,
`sources`, `relationships`, `freshness`, `snapshot`, and a body with exactly one H1, a
`## Compiled truth` section, and an append-only `## Append-only timeline`. Compiled truth is
edited when the source changes; timeline entries are appended, never rewritten to make history
look cleaner.

**This is not the skill frontmatter contract.** A `SKILL.md` uses the harness contract — `name`
and `description` — which is what skill routing reads. Do not add `metadata_profile` to a
`SKILL.md`; the two contracts serve different readers and conflating them breaks discovery.

Validate before finishing:

```bash
node Blueprints/tools/valor-brain/validate.mjs
```

An invalid opted-in page is a P0 Truth Gate finding, because an agent could route on malformed
authority or state.

## Truth Gate

`Blueprints/tools/truth-gate/truth-gate.mjs` checks that the documentation layer agrees with
itself and with disk — dead headers on live files, broken and stale cited paths, missing baseline
entry files, sprint/git drift, registry drift, and Valor Brain validity. Read-only.

```bash
node Blueprints/tools/truth-gate/truth-gate.mjs --quiet          # P0 only
node Blueprints/tools/truth-gate/truth-gate.mjs --check=<name>   # one check
```

Run the checks your change touches before you report done. A suppression in
`truth-gate-ignore.txt` needs a reason — a suppression without one is a lie you tell yourself
later.

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

## Work Classification

Before authoring, classify the work so scope stays honest:

- `BUILD NOW` — create or update the file now.
- `SPEC ONLY` — define the standard/validation criteria, do not implement.
- `REVIEW ONLY` — critique and surface risks, produce no new canonical file.
- `REFERENCE ONLY` — capture research-derived pattern, no procedure.
- `DEFER` — not enough locked input; name what's missing and stop.

## Source Integrity Principle

Repeated corrections should update the source Markdown, not just the generated output.

When a mistake repeats:

1. Identify which source file led to the mistake.
2. Confirm that file is current authority.
3. Recommend a precise source update.
4. Apply the update only when Justin explicitly asks.
5. Check nearby context for contradictions.

Do not auto-edit this skill from its own prior-use findings.

## Pruning Rules

Recommend pruning when a file repeats a newer source, points to retired paths, mixes layers, carries broad background agents don't need, hides implementation inside reference, or slows real product work. Prefer shortening or rerouting before deletion. Archive only when replacing or superseding files, with approval. Never treat Markdown polish as product progress.

## Completion Checklist

Before finishing:

- [ ] Did I preserve DBS structure?
- [ ] Did I use least privilege?
- [ ] Did I separate current truth from references?
- [ ] Did I avoid app code and sensitive files?
- [ ] Did I provide or recommend the correct path?
- [ ] Did I state assumptions and next step?
- [ ] Does every environmental claim I wrote carry a date and a falsifier?
- [ ] If the page is read as authority, did I opt it into `valor-brain/v1` and validate it?
- [ ] Did I run the Truth Gate checks my change touches?
