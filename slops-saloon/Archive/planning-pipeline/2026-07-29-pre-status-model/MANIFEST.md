# MANIFEST — L1 planning pipeline, pre-status-model

**Archive date:** 2026-07-29
**Status: HISTORICAL ONLY** — nothing in this folder is active authority.
**Reason this archive exists:** the planning pipeline moved from a checkbox mechanic to the
status model in `../../../Blueprints/agent-modules/status-model.md`, and L1 had two competing
queues (`Direction/TODO.md` and `Direction/current_sprint.md`). One active queue per layer now
holds: L1's queue is `Direction/current_sprint.md`.

## Why some filenames end in `.archived.md`

`CLAUDE.md` and `AGENTS.md` are **auto-loading wrapper filenames** — agent tooling reads them
automatically based on the name alone. Archiving them under their original names would keep
them loading as if they were live doctrine. The filenames are therefore renamed **inert**; the
file contents are byte-identical to the originals and were moved with `git mv`. Filenames that
do not auto-trigger are preserved unchanged.

## Artifacts

### 1. `Direction/CLAUDE.md` → `Direction/CLAUDE.archived.md`

- **Type:** auto-loading agent wrapper (Claude)
- **Reason archived:** duplicated the division wrapper `slops-saloon/CLAUDE.md` one directory
  below it, creating a second L1 Claude-behavior authority.
- **Successor authority:** `slops-saloon/CLAUDE.md`, plus
  `../../../Blueprints/agent-modules/layer-1-rules.md`.
- **Prior active inbound references:** none found in active surfaces.

### 2. `Direction/AGENTS.md` → `Direction/AGENTS.archived.md`

- **Type:** auto-loading agent wrapper (Codex/generic)
- **Reason archived:** duplicated `slops-saloon/AGENTS.md` one directory below it. **It held
  better doctrine than the file above it** — its §5 stay-vs-route decision table was the only
  one in the repository. Per the doctrine-extraction gate, that table was extracted and
  verified live at both successors **before** this file was archived; it was not lost.
- **Successor authority:** `slops-saloon/AGENTS.md` **and** `slops-saloon/CLAUDE.md` — both now
  carry the extracted stay-vs-route decision table under "L1-specific routing".
- **Prior active inbound references:** none found in active surfaces.

### 3. `Direction/TODO.md` → `Direction/TODO.md` (filename preserved)

- **Type:** planning queue — not an auto-loading filename, so it is preserved unchanged
- **Reason archived:** L1 carried two queues. `Direction/current_sprint.md` is the real,
  groomed, lane-ordered queue an agent can pull from cold; `TODO.md` held standing rules
  restated as checkboxes ("Keep `omen/` as the only active product repo", "Keep future product
  ideas parked"), which are constraints, not tasks — they can never be completed and so can
  never leave the queue. Its remaining product-status tracking lines duplicated L2 facts.
- **Successor authority:** `Direction/current_sprint.md` for queued work;
  `Direction/facts-of-record.md` for the standing rules it restated; and
  `../../../Blueprints/agent-modules/hard-prohibitions.md` for its "Out Of Scope" section.
- **Prior active inbound references:** `Blueprints/prompts/kickoff-l1-claude.md` and
  `kickoff-l1-codex.md` both named it as the L1 queue at lines 26, 33, 36, 41, and 49. Both
  were repointed to `Direction/current_sprint.md` in this same change.
