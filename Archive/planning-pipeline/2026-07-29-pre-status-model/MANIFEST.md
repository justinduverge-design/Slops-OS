# MANIFEST — L0 planning pipeline, pre-status-model

**Archive date:** 2026-07-29
**Status: HISTORICAL ONLY** — nothing in this folder is active authority.
**Reason this archive exists:** the planning pipeline moved from a checkbox mechanic
(`- [ ]` / `- [x]`, "pull the next 5 unchecked items", "tick the item") to the status model
in `Blueprints/agent-modules/status-model.md`. These artifacts encode the retired mechanic or
duplicate authority that now lives in one place.

## Why some filenames end in `.archived.md`

`CLAUDE.md`, `AGENTS.md`, and `AGENT.md` are **auto-loading wrapper filenames** — agent
tooling reads them automatically based on the name alone. Archiving them under their original
names would keep them loading as if they were live doctrine. The filenames are therefore
renamed **inert**; the file contents are byte-identical to the originals and were moved with
`git mv`. Filenames that do not auto-trigger are preserved unchanged.

## Artifacts

### 1. `Direction/CLAUDE.md` → `Direction/CLAUDE.archived.md`

- **Type:** auto-loading agent wrapper (Claude)
- **Reason archived:** duplicated the root `CLAUDE.md` wrapper one directory below it, creating
  a second Claude-behavior authority whose routing and permissions could drift from root.
- **Successor authority:** `CLAUDE.md` (L0 root), plus
  `Blueprints/agent-modules/identity-claude.md` and
  `Blueprints/agent-modules/action-posture.md`.
- **Prior active inbound references:** none in active surfaces. One historical mention in
  `Solutions/reports/dbs-migration/DBS_PROMPT_2_FINALIZATION_REPORT.md:239`, which is a record
  and is left unedited.

### 2. `Direction/AGENTS.md` → `Direction/AGENTS.archived.md`

- **Type:** auto-loading agent wrapper (Codex/generic)
- **Reason archived:** duplicated the root `AGENTS.md` wrapper one directory below it. Its §5
  decision table was L0-scoped and is superseded by the root wrapper's L0-specific routing.
- **Successor authority:** `AGENTS.md` (L0 root), plus
  `Blueprints/agent-modules/layer-0-rules.md` and
  `Blueprints/agent-modules/hard-prohibitions.md`.
- **Prior active inbound references:** none in active surfaces. Same historical mention as
  above at `DBS_PROMPT_2_FINALIZATION_REPORT.md:239`.

### 3. `Blueprints/workflows/CLAUDE.md` → `Blueprints/workflows/CLAUDE.archived.md`

- **Type:** auto-loading agent wrapper (Claude)
- **Reason archived:** encoded hard vendor ownership ("Claude Code owns frontend and app
  experience… does not own backend by default"), which the ratified lane doctrine replaces —
  lanes are work areas, not agent assignments. Also carried stale product framing (Draft
  Assistant "free this year only", "MVP Move remains the paid centerpiece") that contradicts
  the standing fact that Omen is free indefinitely.
- **Successor authority:** `CLAUDE.md` (L0 root) and
  `Blueprints/agent-modules/identity-claude.md`; for lane posture, `omen/AGENT.md`.
- **Prior active inbound references:** none found in active surfaces.

### 4. `Blueprints/workflows/AGENT.md` → `Blueprints/workflows/AGENT.archived.md`

- **Type:** auto-loading agent wrapper (Codex)
- **Reason archived:** same hard vendor-ownership framing ("You are Codex, the back-end
  engineer… Claude Code owns the frontend"), plus handoff paths
  (`slops-saloon/Blueprints/handoffs/…`) that no longer resolve — those handoffs live in the
  Omen repo.
- **Successor authority:** `omen/AGENT.md`, which now carries the vendor-agnostic lane
  doctrine, and `Blueprints/agent-modules/identity-codex.md`.
- **Prior active inbound references:** none found in active surfaces.

### 5. `Blueprints/workflows/README.md` → `Blueprints/workflows/README.md` (filename preserved)

- **Type:** folder README — not an auto-loading filename, so it is preserved unchanged
- **Reason archived:** the folder it describes retires with this cutover; all three of its
  files are archived here. It documented a "redirect notes for compatibility" pattern that the
  agent-module system replaced.
- **Successor authority:** `Blueprints/agent-modules/` — the module system that replaced
  redirect-note wrappers — indexed from `Blueprints/RESOURCES_INDEX.md`.
- **Prior active inbound references:** none found in active surfaces.
