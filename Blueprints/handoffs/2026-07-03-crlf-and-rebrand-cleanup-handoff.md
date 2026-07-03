# Handoff — SLOPS Root Repo Hygiene Cleanup Complete (CRLF Drift + Corvus → Omen Rebrand)

**Date:** 2026-07-03
**Layer:** L0 (SLOPS root repo — `justinduverge-design/Slops-OS`)
**Closes:** `Blueprints/handoffs/2026-07-03-crlf-and-corvus-rebrand-cleanup-reanchor.md` (task #20)
**Owner:** Justin (review + merge) / Claude (analysis + scoped commits)

---

## Outcome

`git status` at SLOPS root is clean except for 5 intentionally-uncommitted staging-folder files (see below). Two PRs landed:

**PR #3 — `docs/2026-07-03-crlf-rebrand-content-cleanup`** (merged as `be8e9a0`):

- `7db74b6` — `docs(doctrine): extend action-posture v2 - kickoff pointer, capability-check, close-out step, P0 stop-commit guidance`
- `db6225a` — `chore(config): drop redundant .gitignore legacy-folder entry, refresh CLAUDE.md graphify note`
- `179f2cd` — `docs(rebrand): corvus -> omen refs across Archive/` (18 files)
- `8072a73` — `docs(rebrand): corvus -> omen refs across Blueprints/ (excluding staging + doctrine)` (11 files)
- `c519ecd` — `docs(rebrand): corvus -> omen refs across Direction/, References/, Solutions/` (43 files)
- `2959bed` — `docs(rebrand): corvus -> omen refs across slops-saloon/` (8 files)

**PR #4 — `chore/normalize-line-endings`** (merged as `56d5a66`):

- `2d17fb6` — `chore: extend .gitattributes with missing binary and script rules`

No files were reverted. The only content correction (beyond straight rebrand text) was the `.gitignore` fix described below.

---

## Files left uncommitted on purpose

Per the reanchor doc's hard rule ("do not commit files under `_pending/`, `_proposals/`, `_old-prompts-for-analysis/` as rebrand fixes unless promoting them out of drafts"), these 5 files still show as modified and need your explicit call — promote, hand-edit, or discard:

- `Blueprints/prompts/_old-prompts-for-analysis/codex-corvus-phase-1-restart.md`
- `Blueprints/prompts/_pending/claude-code-omen-phase-1.3-ios-safari-sweep.md`
- `Blueprints/skills/_proposals/pm-skills-harvest-plan.md`
- `Blueprints/skills/_proposals/slops-lore-review/SKILL.md`
- `Blueprints/skills/_proposals/slops-lore-review/series-seed.md`

---

## Post-cleanup `git status` snapshot

```
On branch master
Your branch is up to date with 'origin/master'.
Changes not staged for commit:
        modified:   Blueprints/prompts/_old-prompts-for-analysis/codex-corvus-phase-1-restart.md
        modified:   Blueprints/prompts/_pending/claude-code-omen-phase-1.3-ios-safari-sweep.md
        modified:   Blueprints/skills/_proposals/pm-skills-harvest-plan.md
        modified:   Blueprints/skills/_proposals/slops-lore-review/SKILL.md
        modified:   Blueprints/skills/_proposals/slops-lore-review/series-seed.md
Untracked files:
        Blueprints/handoffs/2026-07-03-crlf-and-corvus-rebrand-cleanup-reanchor.md
```

`.gitattributes` at repo root now has the full binary/CRLF-preserved rule set. `core.autocrlf` is set to `input` locally (not tracked in git — needs setting again on any other machine that clones this repo).

---

## Surprises encountered (the reanchor doc's hypothesis was wrong on two points)

1. **CRLF was never actually separable from content.** The reanchor doc assumed most of the ~90 modified files were pure CRLF churn with the "rendered content... identical." Phase 1 testing (`git diff --name-only -w` vs. `git diff --name-only`) showed the *opposite*: all 91 modified files had real content differences even with whitespace ignored. `crlf-only.txt` came back empty. Every file was mid-rebrand (Corvus → Omen text swapped throughout prose, not just paths) — including files the doc expected to be stale historical drift, like `Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md`. This flipped the doc's prescribed order: content commits landed *before* the normalize commit instead of after, since normalizing first would have swept rebrand content into what was supposed to be a pure-whitespace commit.

2. **`.gitattributes` already existed.** Added 2026-06-21 (`2802c43`) with `* text=auto eol=lf` and several explicit rules — Phase 2 wasn't "create from scratch," it was "extend + actually fix `core.autocrlf`." The real root cause of the ongoing CRLF warnings was local `core.autocrlf=true`, which fights the `eol=lf` attribute on every Windows checkout. Because `eol=lf` still forces LF into the stored blob at commit time regardless of `autocrlf`, the 6 content commits from PR #3 already landed with clean LF content — `git add --renormalize .` on the dedicated normalize branch found nothing to stage beyond the `.gitattributes` edit itself. The remaining CRLF bytes some editors leave on local disks are cosmetic only, not a tracked discrepancy.

Other findings along the way:

- **`.gitignore` had a rebrand bug.** A blanket Corvus→Omen replace turned `slops-saloon/corvus/` into a duplicate of the `slops-saloon/omen/` line already above it, destroying the comment's original purpose (catching a lingering legacy folder after a rename). Per Justin's call ("corvus should no longer be used"), the redundant line was dropped rather than restored to `corvus/`.
- **The staging-folder exclusion list grew.** The reanchor doc only named `_pending/` and `_old-prompts-for-analysis/`; a full scan turned up 3 more files under `Blueprints/skills/_proposals/` that needed the same treatment.
- **Doctrine content hiding in the "rebrand" pile.** `AGENTS.md`, `action-posture.md`, `done-and-close.md`, and `safety-gates.md` all had genuine uncommitted doctrine extensions (kickoff pointer, capability-check rule, close-out step 9, P0-stop guidance) layered on top of what commit `2996cca` had already landed. Separated into their own commit instead of being swept into the rebrand batch.
- **Local `master` briefly looked like it had an orphaned unpushed commit** (`2996cca`). Investigation showed it wasn't orphaned — the doctrine branch (`docs/2026-07-03-fan-experience-doctrine`) had been cut from local `master` after that commit landed, so it rode along transitively into `origin/master` via PR #2. Local `master`'s branch pointer was just stale; fast-forwarding fixed it, no data was at risk.

---

## Next steps for Justin

1. Decide what to do with the 5 staging-folder files (promote / hand-edit / discard).
2. If you want the remaining cosmetic CRLF bytes gone from your local working tree, a fresh checkout of the repo (or `git rm -r --cached . && git reset --hard`) will pick up the now-correct `.gitattributes` rules — not required, purely cosmetic.
