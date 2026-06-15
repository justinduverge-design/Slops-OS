# Claude Prompt — L1 + L2 Prompts Same-Shape Pass

**Layer:** 1 (slops-saloon) + 2 (Corvus)
**Type:** One-shot — fires once, then this file is itself archived.
**Date drafted:** 2026-06-13
**Posture:** File moves + README updates + PROMPTS_CHANGELOG entry at L2. No git push. Justin gates the commit and the L2 triage decisions.
**Authority:** Justin approved the "L0 + L2 same-shape pass" recommendation in the 2026-06-13 prompts-cleanup conversation by deferred call ("hold off" originally, this prompt is the holdback). Justin must re-approve the L2 triage table before moves execute.

---

## Goal

Bring L1 and L2 prompt directories into the same `_templates/ _pending/ _archive/` shape as L0. Two layers, very different work loads:

- **L1 (`slops-saloon/Blueprints/prompts/`)** has exactly 1 file — `agent-build-loop-template.md`, a template by name and content. Trivial pass: create `_templates/`, move the file, add a stub README.
- **L2 (`slops-saloon/corvus/Blueprints/prompts/`)** has 26 files flat. Needs **triage table → Justin approval → moves**. Much larger surface, more risk.

The two halves can run in the same session or be split — they're scoped independently.

## Current State (as of 2026-06-13)

### L1 — `slops-saloon/Blueprints/prompts/`

| File | Status |
| --- | --- |
| `agent-build-loop-template.md` | Template — pattern for spinning up new slops-saloon division products with Claude/Codex routing. Multi-fire by design. |

No README. No subfolders.

### L2 — `slops-saloon/corvus/Blueprints/prompts/`

26 files flat. Has its own `README.md` and `PROMPTS_CHANGELOG.md` at root. The README already classifies some files ("Active Build Loop Prompts," "Historical Rename Prompts," "Active Runtime Prompts") which gives us a starting triage.

Files (sorted, with my best initial classification — **verify each before moving**):

| File | Initial classification | Notes |
| --- | --- | --- |
| `HOW-TO-RUN-THE-LOOP.md` | root operational doc | Per L2 README: "operator guide for loading one task." Stays at root. |
| `PROMPTS_CHANGELOG.md` | root operational doc | Append-only log. Stays at root. |
| `README.md` | root operational doc | Stays at root, gets updated. |
| `kickoff-backend-codex.md` | template | Per L2 README: "copy-paste starter for Codex backend tasks." Multi-fire. |
| `kickoff-frontend-claude.md` | template | Per L2 README: "copy-paste starter for Claude frontend tasks." Multi-fire. |
| `manager_agent.md` | template (or root operational doc) | Per L2 README "Active Runtime Prompts." Read first lines to decide. |
| `sub_agents.md` | template (likely) | Companion to `manager_agent.md`. Read to confirm. |
| `prompt_playbook.md` | archive | L2 README explicitly says "superseded by the kickoff files above and remains only as historical context." |
| `emergency-brake.txt` | template (probably) — verify | Sounds reusable. Read first lines. |
| `codex-corvus-restructure.md` | archive | L2 README "Historical Rename Prompts." |
| `codex-slops-saloon-rename.md` | archive | L2 README "Historical Rename Prompts." |
| `codex-git-ssffmvp-clean-tree.md` | archive | L2 README "Historical Rename Prompts." |
| `codex-docs-commit.md` | archive | L2 README "Historical Rename Prompts." |
| `codex-docker-prove-out.md` | archive (likely) — verify | Sounds one-shot. Read first lines. |
| `codex-npm-audit-fix.md` | archive (likely) — verify | Sounds one-shot. |
| `codex-omen-path-canonicalize.md` | archive (likely) — verify | Sounds one-shot. |
| `codex-stripe-live-validation.md` | archive (likely) — verify | Sounds one-shot. |
| `codex-layer-2-frontend-build-fix-and-qa-2026-05-25.md` | archive | Dated 2026-05-25 in filename. Fired. |
| `codex-verify-trade-analyzer.txt` | archive (likely) — verify | Companion to Trade Analyzer work, likely fired. |
| `claude-homepage-trade-analyzer.txt` | archive (likely) — verify | Same era. |
| `claude-layer-2-frontend-build-fix-and-qa-2026-05-25.md` | archive | Dated. Fired. |
| `omen-mvp-move-development.md` | archive (likely) — verify | Omen development prompt. |
| `omen-mvp-move-frontend.md` | archive (likely) — verify | Omen development prompt. |
| `omen-mvp-move-llm-reasoning.md` | archive (likely) — verify | Omen development prompt. |
| `matchup-dvp-nflverse-development.md` | archive (likely) — verify | Development prompt. |
| `espn-recovery-playbook.md` | template (probably) — verify | "Playbook" implies reusable runbook. |
| `gemini-research-critic.txt` | template (probably) — verify | "Critic" implies reusable pattern. |

Counts: ~3 root operational, ~4-6 templates, ~16-18 archive, depending on verification.

## Step-by-Step

### Phase A — L1 (trivial, do first)

1. `mkdir slops-saloon/Blueprints/prompts/_templates/`.
2. `git mv slops-saloon/Blueprints/prompts/agent-build-loop-template.md slops-saloon/Blueprints/prompts/_templates/`. (Fall back to `mv` + `git add` if `git mv` errors on OneDrive.)
3. Write `slops-saloon/Blueprints/prompts/README.md` — short, 15-20 lines max. List `_templates/` contents and note that L1 currently has no `_pending/` or `_archive/` because the queue is empty. Reference the L0 `_templates/` for cross-cutting templates and the L2 `_templates/` for Corvus-specific ones.
4. Verify: `ls slops-saloon/Blueprints/prompts/` shows `README.md` + `_templates/` only.

### Phase B — L2 triage (stop for Justin)

5. For every file in the L2 "Current State" table above marked `verify`, read the first ~15 lines. Confirm or correct the classification.

6. **Produce a final triage table** with three columns: `File | Move to | Rationale (one line)`. Show it to Justin in chat. **Do not move any files until he approves.**

7. If Justin amends the table, apply his edits. If he says "looks good, go," proceed.

### Phase C — L2 moves

8. `mkdir slops-saloon/corvus/Blueprints/prompts/{_templates,_pending,_archive}`.

9. Execute moves per the approved triage table. Prefer `git mv`. Fall back to `mv` + `git add` if OneDrive blocks.

10. **Update L2 `README.md`:**
    - Replace the "Active Build Loop Prompts" / "Historical Rename Prompts" / "Active Runtime Prompts" sections with three new sections: `## Reusable templates (_templates/)`, `## Pending one-shots (_pending/)` (empty for now), `## Archived (_archive/)`. Each section has a one-line description and a table of files.
    - Keep the "Current Use" section (the path-anchor block) and the "Any change to a prompt in this folder must be recorded in `PROMPTS_CHANGELOG.md`" rule intact.

11. **Append to L2 `PROMPTS_CHANGELOG.md`** a single entry dated today summarizing the reorganization: which files moved where, why, and that no content was changed. Mirror the format of the existing entries (read the file before writing to match style).

### Phase D — Verify + commit

12. Verify:
    - `ls slops-saloon/Blueprints/prompts/` shows expected L1 shape (`README.md` + `_templates/`).
    - `ls slops-saloon/corvus/Blueprints/prompts/` shows expected L2 shape (root operational docs + `_templates/` + `_pending/` + `_archive/`).
    - `grep -rn "Blueprints/prompts/" slops-saloon/` — report any references to moved files that now point to old paths. Ask Justin whether to fix or leave.
    - L2 README and PROMPTS_CHANGELOG both reflect the new state.

13. Commit on `main` with a Conventional Commit message:

    ```
    chore(prompts): apply same-shape pass to L1 + L2

    L1 (slops-saloon/Blueprints/prompts/): create _templates/, move
    agent-build-loop-template.md into it, add a short README.

    L2 (slops-saloon/corvus/Blueprints/prompts/): create _templates/,
    _pending/, _archive/. Move <N> files per the approved triage:
    <X> templates, <Y> archived one-shots, <Z> root operational docs
    untouched. README restructured to mirror L0. PROMPTS_CHANGELOG
    entry logs the reorg.

    No content changes to moved files. No L0 changes — L0 ships in
    a separate commit via _pending/claude-cleanup-L0-prompts-archive.md.
    ```

    Do NOT push. Justin's gate.

14. **Report back** with: triage table as approved, files moved (counts per category), README diff summaries (one per layer), PROMPTS_CHANGELOG entry text, any broken refs found, commit hash. One short paragraph per layer.

## Hard Constraints

- File moves and three doc edits only (L1 README new, L2 README updated, L2 PROMPTS_CHANGELOG appended). No content edits to moved files.
- No `git push`. Justin's gate.
- Stop at the end of Phase B for triage approval. **Do not assume**; the L2 classifications above are starting points, not final calls.
- Do not touch L0. That has its own prompt at `_pending/claude-cleanup-L0-prompts-archive.md`.
- Do not delete anything. Archive ≠ delete. Empty out only `_archive/` after Justin explicitly says so in a future session.
- Prefer `git mv`; fall back to `mv` + `git add` if OneDrive `.git/index.lock` blocks.
- If a file's purpose is genuinely unclear from its first 15 lines (no header, no date, ambiguous name), put it in the **"unsure — Justin to call"** row of the triage table. Do not guess.
- After firing, delete this prompt from `_pending/` (it's done its one job).

## Related

- `_pending/claude-cleanup-L0-prompts-archive.md` — the L0 half. Independent of this one.
- L2 `PROMPTS_CHANGELOG.md` — read before writing the entry to match style.
- L2 `README.md` — read before updating to match section conventions.
