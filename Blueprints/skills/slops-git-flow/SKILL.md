---
name: slops-git-flow
description: Slops-native git workflow for the build loop. One scoped branch and one PR per sprint item, explicit-path commits (never `git add -A`/`.`), light stacking only when an item depends on an unmerged one, and push/merge gated to Justin. Use when starting, committing, or shipping a build-loop task; when an agent needs branch/commit/PR steps; "make a branch", "commit this", "open a PR", "ship this item"; or when replacing an external stacking tool. Prepares git steps and a PR; Justin approves the push and the merge. Never sweeps a dirty worktree into a commit.
---

# Slops Git Flow Skill

## Purpose

Map git onto the build loop so the unit of work is consistent end to end: **one sprint item =
one branch = one PR = one definition-of-done.** Replaces external stacking tools (e.g. gstack)
with a workflow that matches how Omen already builds, and bakes in the scoped-commit discipline
that keeps a known-dirty worktree from leaking unrelated files into a commit.

## When To Use

- Starting a build-loop item and you need a branch.
- Committing finished work, or preparing a PR for Justin to push/merge.
- An item depends on another that has not merged yet (needs light stacking).
- Any "make a branch / commit this / open a PR / ship this item" request.

## When Not To Use

- To push, merge, or deploy autonomously — those are Justin gates.
- To rewrite published history or force-push shared branches.
- To commit across multiple sprint items at once (one item per branch).

## Required Inputs To Review

- The active sprint item (lane + `P#`/`FP#`) from `Direction/current_sprint.md` or the pinned
  `Direction/agent_inbox.md`.
- `Blueprints/definition-of-done.md` (the merge bar).
- Current git state: `git status --short`, current branch, and whether the worktree is dirty.

## Steps

1. **Branch per item.** From `main`: `git switch -c {lane}/{p#}-{slug}` (e.g.
   `backend/p1-sleeper-live`, `frontend/fp1-signal-labels`). One item per branch — and a feature
   branch holds **only** its own item; unrelated or non-feature work never accumulates on it (that
   belongs on `main` or its own branch).
2. **Build to the bar.** Implement until every applicable `definition-of-done.md` box is true.
3. **Scoped commit — the core rule.** Stage **explicit paths only**. Never `git add -A`, `git add .`,
   or `git commit -a`. Then hard-verify before committing:
   - `git diff --cached --name-only` lists **exactly** the intended files and nothing else.
   - `git restore --staged <file>` anything extra until the set is exact.
   - `git diff --check` is clean.
4. **Commit message.** `type(scope): summary`, then a body stating what changed, why, and the
   verification (`npm test` count, build status). One logical change per commit.
5. **Push + PR are Justin gates.** Prepare the branch and a PR description that maps to the sprint
   item and restates the definition-of-done. Hand it to Justin to push/open/merge — do not push.
6. **Light stacking (only when needed).** If the item is `Blocked by P#` on an unmerged item,
   branch off that item's branch instead of `main`; note the base in the PR. When the base merges,
   rebase the stacked branch onto `main`. Otherwise always branch off `main` — no stacks by default.
7. **Close-out — keep the docs commit SEPARATE from the code commit.** The item's code/tests are the
   scoped commit above. Its doc updates — checking the item off in `current_sprint.md`, the
   `decision_log.md` entry, and the handoff — go in a **separate, explicitly-staged docs commit**,
   never bundled with code. Sprint / handoff / decision files are often already dirty with unrelated
   in-flight doctrine edits; bundling the whole file sweeps those in. If a doc file can't be cleanly
   isolated, leave it uncommitted and flag it rather than contaminate the code commit. A docs commit
   must also stage the **untracked companion files** its edits reference (new skills/specs/templates) —
   a doc edit pointing at an uncommitted file is a dangling reference. Each repo commits its own
   files; a doc that lives in two repos gets one commit per repo. (Learned on the P1 trial +
   worktree untangle, 2026-06-08.)

## Output

A scoped commit and a ready PR description — never an executed push or merge.

## Safety Rules

- Never `git add -A`/`.`/`-a`. Stage explicit paths and verify the staged set.
- Never push to `main`, merge, or deploy without Justin's explicit approval.
- Never force-push or rewrite shared history.
- Repair a polluted feature branch only via a **verified backup ref** taken *before* any `git reset`,
  and only while the branch is unpushed — never force-push to fix it.
- Leave unrelated dirty files in the worktree untouched.
- Never stage secrets, `.env`, keys, or build artifacts.

## Where This Operates

On the target product repo (e.g. `slops-saloon/omen`). This skill is `Layer 0` doctrine; the
branches/PRs it prepares live in the product repo.

## Change Log

- 2026-06-08: Created as the Slops-native replacement for external git-stacking tooling, derived
  from the build loop and the scoped-commit lesson (commit `cadd5f8`).
