# Design Cleanup Actions — 2026-07-11

Companion to `2026-07-11-design-cleanup-map.md`. No moves, merges, archives, or deletes have been executed — this is the proposed action sheet for founder/owner sign-off. Nothing here touches package files, env files, DNS, SSL, Stripe, Supabase migrations, or infra config.

## Proposed File Moves

| From | To | Why |
|---|---|---|
| `Blueprints/agents/_imported/` (entire tree) | `Blueprints/Archive/agents-imported-staging-2026-07/` | Confirmed via diff (design division) that this is raw pre-promotion source superseded by `Blueprints/agents/<division>/`. Move, don't delete yet, in case other divisions weren't fully promoted. |
| `Blueprints/prompts/_old-prompts-for-analysis/` | `Blueprints/Archive/prompts-old-corvus-era/` | Explicitly named "for analysis," pre-rebrand Corvus content, nothing else in the repo cites it. |
| `Blueprints/prompts/_pending/claude-code-omen-phase-1.3-ios-safari-sweep.md` | TBD — likely `slops-saloon/omen/Blueprints/prompts/` once that repo/directory exists; if it already exists elsewhere, delete this stray copy instead of moving | This is Omen-product-scoped work sitting in the L0 doctrine repo, but `slops-saloon/omen/` doesn't exist in this checkout. Needs a founder call, not an automatic move. |
| `Blueprints/prompts/` completed one-off prompts (`phase-1-codex-nomenclature-rename.md`, `phase-1b-codex-title-case-cleanup.md`, `design-md-claude-codex-handoff.md`, and similar dated/completed items) | `Blueprints/Archive/prompts-completed/` | Done work cluttering an active-looking directory; keep for history, remove from the working set. |
| `Solutions/reports/dbs-migration/` (~27 files) | `Solutions/Archive/dbs-migration-2026/` | Completed migration's paper trail, no design content, largest stale volume block in repo. |

## Proposed Merges

- `slops-saloon/Direction/decisions/corvus-ux-ui-direction-v1.md` — do not silently merge. Two options for founder to pick between:
  1. Rename to an Omen-branded filename and re-validate content against the current rebrand, keeping it as the live UX/UI direction doc for the division.
  2. Explicitly mark it superseded (add a one-line "superseded, see X" header) and archive alongside the other Corvus-era docs if a replacement already exists elsewhere (none was found in this audit).
- `Blueprints/templates/design.md`, `References/patterns/design-md-patterns.md`, `Direction/reviews/design-md-optimization-critic-review.md` — not a content merge, but each should gain a one-line "implements/critiques `Blueprints/specs/design-md.spec.md`" cross-reference at the top so the authority chain is visible without tribal knowledge. Same treatment for the `ux-ui-fundamentals` triad (`ux-ui-execution.spec.md` / `ux-ui-fundamentals-patterns.md` / `ux-ui-fundamentals-critic-review.md`).

## Proposed Archive Targets

- `Blueprints/Archive/agents-imported-staging-2026-07/` (new folder, mirrors existing `Archive/` convention already used at root, e.g. `Archive/corvus-root-direction-pre-dbs/`)
- `Blueprints/Archive/prompts-old-corvus-era/` (new)
- `Blueprints/Archive/prompts-completed/` (new)
- `Solutions/Archive/dbs-migration-2026/` (new, mirrors `Solutions/reports/` structure)

## Proposed Deletions (deferred — not this pass)

- `Blueprints/specs/brand-identity-digital-marketing.spec.md` — empty file. Delete unless someone commits to filling it within the current quarter; an empty spec with a branding-sounding name is worse than no file.
- `Archive/corvus-root-direction-pre-dbs/`, `Archive/superseded-docs/brand-root-corvus-only/` — already archived once; safe to hard-delete once confirmed nothing (including handoffs) still links to them.
- `Blueprints/agents/_imported/` — delete outright (not just archive) once every division's promotion is diff-confirmed the way design was in this audit.

## Doctrine Fixes (not file moves — content edits to existing authority files)

- `CLAUDE.md`, `AGENTS.md`: routing line `Omen app code (frontend, backend, deploy, tests) → slops-saloon/omen/` points at a directory that does not exist in this checkout. Either the directory needs to be created, or the line needs a note that it's forward-looking/not-yet-provisioned.
- `CLAUDE.md`, `Blueprints/agent-modules/graphify-hook.md`: both cite `References/graphify/graphify-out/graph.json` as "read this one" — the entire `References/graphify/` directory is absent repo-wide. Fix by either restoring the graph, or rewriting the hook to say the graph is not yet built and give the actual rebuild command (`pip install graphifyy`, run the `slops-graphify` skill) as the primary instruction instead of a phantom read path.

## Checklist — Do First / Do Second / Do Last

**Do first (unblocks everything else, low risk):**
1. Fix the two broken doctrine pointers in `CLAUDE.md` / `AGENTS.md` / `graphify-hook.md` (content edit, not a file move).
2. Delete or fill `Blueprints/specs/brand-identity-digital-marketing.spec.md`.

**Do second (structural, needs one confirmation step each):**
3. Diff-confirm promotion completeness for the remaining `_imported/__*_division` folders (engineering, marketing, sales, etc.) the same way design was confirmed here, then move the whole `_imported/` tree to Archive.
4. Founder decision on `corvus-ux-ui-direction-v1.md`: rebrand-and-keep vs. mark-superseded-and-archive.
5. Founder decision on the stray `claude-code-omen-phase-1.3-ios-safari-sweep.md`: relocate to Omen repo vs. delete as premature.

**Do last (low risk, no doctrine depends on these, can happen anytime):**
6. Archive `_old-prompts-for-analysis/` and completed one-off prompts.
7. Restructure `Blueprints/prompts/` into explicit `active/ pending/ templates/ archive/` folders.
8. Add cross-reference headers to templates/patterns/reviews pointing at their governing specs.
9. Archive `Solutions/reports/dbs-migration/`.
10. Hard-delete already-archived Corvus-era folders once link-checked.

## Risks and Open Questions

- **`slops-saloon/omen/` does not exist in this checkout.** The audit prompt asked to inspect Omen's own frontend (`frontend/src/components/ui/`, `themeMode.js`, `themeResolver.js`, `teamTheme.js`, `index.css`, bespoke page UI). None of that could be done here — either Omen lives in a separate repo not attached to this session, or it hasn't been scaffolded yet. **Founder should clarify where Omen's code actually lives** so a follow-up audit can cover it; until then, this cleanup map only covers doctrine, not implementation drift.
- **`_imported/` promotion was only diff-confirmed for the design division** (one file: `design-brand-guardian.md`). The same check should be run for engineering/marketing/sales/etc. divisions before archiving the whole tree — don't assume the pattern holds without checking, even though it's likely.
- **Corvus-naming may be intentional in some places.** Not every "corvus" reference is a bug — some are correctly-preserved historical records (the rebrand handoff pair, for instance, should keep "corvus" in its own filename since it documents that exact transition). Only `corvus-ux-ui-direction-v1.md` and `_old-prompts-for-analysis/codex-corvus-phase-1-restart.md` are flagged as needing action; don't blanket-rename every Corvus mention.
- **`slops-saloon/Blueprints/specs/teams/_batch-tracking.md`** is doing live coordination work under a "temporary" naming convention. If team-colorway rollout is still active, this should be promoted to a proper tracked doc rather than archived — confirm rollout status before touching it.
- **No destructive action has been taken.** This document and the cleanup map are proposals only; execution requires explicit founder go-ahead per item, especially for anything in the "Proposed Deletions" section.
