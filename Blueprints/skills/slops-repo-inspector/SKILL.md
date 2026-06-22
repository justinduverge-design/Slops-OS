---
name: slops-repo-inspector
description: Inspect SLOPS L0, Slops Saloon L1, and Corvus L2 repo truth before planning or editing. Use when an agent needs current paths, source-of-truth docs, git status, canonical skill authority, or stale-path cleanup.
status: active
skill_type: simple
layer: 0
default_agent: Codex
trigger: none
version: 0.2.1
upstream: none
owner: Justin
---

# Slops Repo Inspector

## Purpose

Establish the current SLOPS repo truth before planning, editing, committing, or handing work to another agent.

Use this skill to prevent stale-path drift, especially old pre-DBS instructions that point agents at root `roadmap.md`, root `manifesto.md`, or root `handoffs/` files.

## Canonical Paths

- L0 workspace: the path returned by `git rev-parse --show-toplevel`
- L1 Slops Saloon division: `<git-root>/slops-saloon/`
- L2 Corvus app repo: `<git-root>/slops-saloon/corvus/`
- Canonical SLOPS skills: `<git-root>/Blueprints/skills/<name>/SKILL.md`
- Codex-installed skills: `$HOME/.codex/skills/<name>/SKILL.md`
- Claude-installed skills: `$HOME/.claude/skills/<name>/SKILL.md`

Avoid archived, quarantined, imported, or old `ssffmvp` copies unless Justin explicitly asks to reconcile history.

## Source Of Truth

For L0 startup or OS/doctrine work, read in this order:

1. `AGENTS.md` or `CLAUDE.md`
2. `Direction/facts-of-record.md`
3. `Direction/decision_log.md`
4. `Blueprints/RESOURCES_INDEX.md`
5. `Blueprints/skills/SKILL_ROUTING.md`

When skill/source authority matters, also read:

- `Blueprints/skills/SLOPS_LIFECYCLE.md`
- `Blueprints/skills/<name>/SKILL.md`, if present
- `C:\Users\JDuve\.codex\skills\<name>\SKILL.md`, only after checking the canonical Blueprints copy

For Corvus app work, route to L2:

- Queue: `slops-saloon/corvus/Direction/current_sprint.md`
- Override slot: `slops-saloon/corvus/Direction/agent_inbox.md`
- Product handoffs: `slops-saloon/corvus/Blueprints/handoffs/`
- Done bar: `slops-saloon/corvus/Blueprints/definition-of-done.md`

## Stale Path Rule

Do not require or report these as missing startup files:

- root `roadmap.md`
- root `manifesto.md`
- root `handoffs/frontend-to-backend.md`
- root `handoffs/backend-to-frontend.md`
- root `handoffs/decisions.md`

Root `context.md` is a legacy orientation snapshot, not the active queue. Current L0 truth comes from `Direction/facts-of-record.md`, `Direction/decision_log.md`, `Blueprints/RESOURCES_INDEX.md`, and `Blueprints/skills/SKILL_ROUTING.md`.

## Inspection Workflow

1. Confirm the root and branch:
   - `Get-Location`
   - `git status --short`
   - `git branch --show-current`
   - `git rev-parse --show-toplevel`
2. If the task touches Corvus, confirm the app repo separately:
   - `git -C slops-saloon/corvus status --short`
   - `git -C slops-saloon/corvus branch --show-current`
   - `git -C slops-saloon/corvus rev-parse --show-toplevel`
3. Classify the DBS layer before reading broadly:
   - L0: cross-cutting doctrine, skills, agents, prompts, tools, operating rules.
   - L1: Slops Saloon division strategy, brand/content/marketing, future products.
   - L2: Corvus app source, backend, frontend, tests, deploy, product specs, app handoffs.
4. Read only the current source-of-truth files for that layer.
5. Name dirty worktree files before edits. Never revert user changes.
6. For skill work, edit `Blueprints/skills/<name>/SKILL.md` first when it exists, then sync installed copies. If no canonical source exists, say so before editing the installed copy.
7. Search for stale routing strings before and after a cleanup:
   - `roadmap.md`
   - `handoffs/frontend-to-backend.md`
   - `handoffs/backend-to-frontend.md`
   - `repo-inspector`
   - `current_sprint.md`
   - `agent_inbox.md`

## Safety Rules

- Do not touch app source code from an L0 inspection unless the user explicitly asked for app implementation work.
- Do not touch `.env`, secrets, cookies, DNS, SSL, deploy config, production infrastructure, package files, SQL, or migrations.
- Do not push, merge, deploy, delete, or move cross-layer files without explicit Justin approval.
- Treat `Archive/`, `_imported/`, old project copies, and historical migration reports as non-authoritative unless the task names them.

## Output

Report:

- Canonical repo and layer confirmed or not.
- Dirty files found.
- Relevant files inspected.
- Stale guidance found, separating historical records from live instructions.
- Files changed or recommended for a later pass.
- Smallest safe next action.

## Verification

- Run the required stale-reference search before and after any routing cleanup.
- Run `git diff --check` before committing repo-tracked changes.
- Stage explicit paths only.
- Confirm `git status --short` is clean after the commit when the task requires a commit.

## Change Log

- 0.2.1 - Replaced machine-specific workspace paths with Git-root-relative paths and added the Claude runtime mirror.
- 0.2.0 - Canonicalized in `Blueprints/skills`, updated L0/L1/L2 routing, removed pre-DBS root roadmap/manifesto/handoff read-list assumptions, and defined the installed-skill sync rule.
- 0.1.0 - Installed Codex-only repo inspection helper.
