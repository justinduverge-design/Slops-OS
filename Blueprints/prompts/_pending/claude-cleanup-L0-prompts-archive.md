# Claude Prompt — L0 Prompts Cleanup (Archive + dbs-style Move)

**Layer:** 0 (SLOPS OS)
**Type:** One-shot — fires once, then this file is itself archived.
**Date drafted:** 2026-06-13
**Posture:** File moves and README update only. No git push. Justin gates the commit.
**Authority:** Justin approved the `_archive/` + `dbs-style` move recommendations in the 2026-06-13 prompts-cleanup conversation, then said "hold off" on the broader pass. This prompt is the holdback, queued for whenever he greenlights it.

---

## Goal

Two-part L0 cleanup of `Blueprints/prompts/`:

1. **Create `_archive/`** and move historical / fired one-shot prompts into it. The L0 root currently mixes templates and historical run records — moving the run records out makes the active surface area visible at `ls` time.
2. **Move `dbs-style_new_chat.md` to `_templates/`** since it's a reusable boot prompt (fires more than once), same category as the other files already in `_templates/`.

Then update `Blueprints/prompts/README.md` to reflect the new structure.

## Current State (as of 2026-06-13)

`Blueprints/prompts/` root contains (besides README, `_templates/`, `_pending/`, `_old-prompts-for-analysis/`):

- `app-strategy-claude-codex-handoff.md`
- `claude-skills-playbooks-acquisition-session.md`
- `codex-doc-cleanup-archive.md`
- `codex-git-slops-initial-commit.md`
- `codex-post-deploy-context-update.md` ← **ambiguous** (see Triage)
- `codex-skill-migration.md`
- `codex_trade_analyzer_embed.md`
- `dbs-style_new_chat.md` ← **template**, not archive
- `design-md-claude-codex-handoff.md`
- `phase-1-codex-nomenclature-rename.md`
- `phase-1b-codex-title-case-cleanup.md`
- `phases-2-4-claude-index-tools-skills.md`
- `phase-5/` (folder containing `phase-5a-product-division.md`)
- `slops-os-dbs-claude-codex-handoff.md`
- `slops-os-markdown-claude-codex-handoff.md`

The README already classifies most of these as "Claude→Codex handoffs (OS projects)," "Codex operational prompts," and "Migration phase prompts (historical run records)" — meaning the historical / fired nature is established; only the physical organization needs to catch up.

## Triage

### To `_templates/` (reusable, multi-fire)

| File | Why |
| --- | --- |
| `dbs-style_new_chat.md` | Boot prompt for fresh-chat DBS context. Fires every new session. Same category as the 6 files already in `_templates/`. |

### To `_archive/` (historical, one-shot, already fired)

| File | Why |
| --- | --- |
| `app-strategy-claude-codex-handoff.md` | Implements the app-strategy direction (one-shot handoff). README lists under "Claude→Codex handoffs." |
| `claude-skills-playbooks-acquisition-session.md` | Dated session record (2026-06-13 timestamps in handoff). |
| `codex-doc-cleanup-archive.md` | Doc cleanup + archiving — already fired. |
| `codex-git-slops-initial-commit.md` | Initial commit prompt — fires once per repo, already fired. |
| `codex-skill-migration.md` | Skill migration prompt — one-shot. |
| `codex_trade_analyzer_embed.md` | Trade-analyzer embed work — superseded by current Trade Analyzer in `slops-saloon/omen`. |
| `design-md-claude-codex-handoff.md` | `design.md` template authoring — fired. |
| `phase-1-codex-nomenclature-rename.md` | DBS-migration Phase 1 — explicitly historical per README. |
| `phase-1b-codex-title-case-cleanup.md` | DBS-migration Phase 1b — explicitly historical per README. |
| `phases-2-4-claude-index-tools-skills.md` | DBS-migration Phases 2–4 — explicitly historical per README. |
| `phase-5/phase-5a-product-division.md` | DBS-migration Phase 5a — explicitly historical per README. Move the `phase-5/` folder whole. |
| `slops-os-dbs-claude-codex-handoff.md` | DBS spec implementation handoff — fired. |
| `slops-os-markdown-claude-codex-handoff.md` | Markdown operating package handoff — fired. |

### Ambiguous — ask Justin before moving

| File | Question |
| --- | --- |
| `codex-post-deploy-context-update.md` | README says "Update context files after a deploy." Is this a **reusable post-deploy ritual** (template) or a **one-time context update** that already fired (archive)? Open the file, look for date stamps or one-shot references. Report Justin's options and stop until he picks. |

### `_old-prompts-for-analysis/`

Leave it where it is. Has its own README. Separate concern — fold-or-delete decision deferred per Justin's call in the original conversation.

## Step-by-Step

1. **Read the ambiguous file** (`codex-post-deploy-context-update.md`) — first ~30 lines. Determine if it reads as a reusable ritual or a one-shot. Report your reading and stop. **Do not move it until Justin picks.**

2. **Create `_archive/`** under `Blueprints/prompts/`.

3. **Move the 13 archive files + the `phase-5/` folder** listed in the table above to `_archive/`. Use `mv` via bash. Preserve any subfolder structure (e.g., `phase-5/` moves as a folder, not flattened).

4. **Move `dbs-style_new_chat.md`** to `_templates/`.

5. **Update `Blueprints/prompts/README.md`:**
   - Add `_templates/dbs-style_new_chat.md` row to the templates table (it's currently a plain `dbs-style_new_chat.md` row).
   - Replace the "Claude→Codex handoffs (OS projects)" section + "Codex operational prompts" section + "Migration phase prompts (historical run records)" section with a single **"Archived (`_archive/`)"** section that lists all moved files in a single table, with a one-line note: *"Historical run records. Kept for context; do not re-run blindly. Some are superseded by current work in `slops-saloon/omen/`."*
   - Update the `## Subfolders` section to add `_archive/` (already added `_templates/` and `_pending/` rows in the prior pass).
   - Resolve Justin's decision on `codex-post-deploy-context-update.md` before final README write — its row goes in either `_templates/` or `_archive/` depending on the call.

6. **Verify:**
   - `ls Blueprints/prompts/` shows only: `README.md`, `_templates/`, `_pending/`, `_archive/`, `_old-prompts-for-analysis/`. Nothing else at root.
   - `ls Blueprints/prompts/_archive/` shows all 13 (or 14) moved files + the `phase-5/` subfolder.
   - `grep -rn "Blueprints/prompts/" Blueprints/` shows no broken references (or, if any references exist to moved files, list them and ask Justin whether to fix or leave).
   - `grep -rn "dbs-style_new_chat" Blueprints/` shows references either to `_templates/dbs-style_new_chat.md` or unqualified; flag any pointing to the old root path.

7. **Commit on `main` with a Conventional Commit message.** Do NOT push.

   ```
   chore(prompts): archive historical L0 one-shots + relocate dbs-style template

   Move 13 fired one-shot prompts and the phase-5/ subfolder into a new
   Blueprints/prompts/_archive/ folder. Move dbs-style_new_chat.md into
   _templates/ alongside the other reusable patterns. README.md updated
   to reflect the new shape: _templates/ for multi-fire, _pending/ for
   queued one-shots, _archive/ for fired one-shots.

   No content changes to any moved file. No L1 or L2 changes — this is
   the L0 half of the cleanup; L1+L2 ship separately.
   ```

8. **Report back** with: files moved, README diff summary, ambiguous-file decision Justin made, any broken refs you found, commit hash. One paragraph.

## Hard Constraints

- File moves and one README edit only. No content edits to moved files.
- No `git push`. Justin's gate.
- Do not touch `_pending/`, `_templates/`, or `_old-prompts-for-analysis/` contents — only the L0 root files listed in the Triage tables.
- Do not touch L1 (`slops-saloon/Blueprints/prompts/`) or L2 (`slops-saloon/omen/Blueprints/prompts/`). Those have their own prompt at `_pending/claude-cleanup-L1-L2-prompts-shape.md`.
- If `git mv` is available and clean, prefer it over `mv` so history follows the rename. If it errors on OneDrive (it sometimes does — `.git/index.lock` issue), fall back to `mv` + `git add`.
- After firing, delete this prompt from `_pending/` (it's done its one job).

## Related

- `_pending/claude-cleanup-L1-L2-prompts-shape.md` — the L1+L2 half. Fire whenever.
- Original conversation: 2026-06-13 prompts-cleanup discussion (handoff at `Blueprints/handoffs/2026-06-13-...` if written).
