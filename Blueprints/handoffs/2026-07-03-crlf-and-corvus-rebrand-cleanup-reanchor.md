# Re-Anchor — SLOPS Root Repo Hygiene (CRLF Drift + Prior-Session Corvus → Omen Rebrand)

**Date logged:** 2026-07-03
**Task ID:** #20 in session task list (parked)
**Layer:** L0 (SLOPS root repo — `justinduverge-design/Slops-OS`)
**Owner:** Justin (approval + merge) / Claude (analysis + scoped commits) / Codex (bulk execution if needed)
**Kickoff estimate:** medium session (branching + normalize commit + N scoped content commits + verification)

---

## Why this exists

At the end of the 2026-07-03 fan-experience doctrine session, `git status` at `C:\Users\JDuve\dev\SLOPS\` (SLOPS root, L0 git repo — `justinduverge-design/Slops-OS`) showed **~90 files as modified** across `Archive/`, `Blueprints/`, `Direction/`, `References/`, `Solutions/`, `slops-saloon/`, plus root-level files (`.gitignore`, `AGENTS.md`, `CLAUDE.md`).

These 90+ modifications are NOT from that day's doctrine session — the doctrine work is already committed on branch `docs/2026-07-03-fan-experience-doctrine` (`0dafe75`) and shipped as PR2 on GitHub. The 90 files are pre-existing debt.

Two causes are intermixed. Both need to be resolved before the SLOPS root repo's `git status` is clean.

---

## Cause A — CRLF drift on every Windows checkout

Confirmed by `git diff` output during that session — virtually every diff on a text file emitted the warning:

> `warning: in the working copy of '<file>', CRLF will be replaced by LF the next time Git touches it`

That's Git detecting mixed line endings. On Windows, this typically means:

- `core.autocrlf` is unset or set to `false` — no automatic conversion, so files check out however they were committed.
- No `.gitattributes` file specifies `* text=auto eol=lf` — no normalization rule.
- The repo was originally committed on macOS/Linux with LF endings; Windows tooling (VSCode, GitHub Desktop, some editors) then converted to CRLF on save without warning.

**Result:** every text file in the working tree drifts to CRLF, and every `git diff` reports it as modified even though the *rendered* content is identical.

## Cause B — Real content changes never committed

At least one confirmed content-level change from prior sessions:

- `Archive/README.md` — the tree diagram was edited from `corvus/` → `omen/` (part of the 2026-06-22 rebrand). Not committed.

The 2026-06-22 rebrand touched every Corvus reference across `Archive/`, `Blueprints/`, `Direction/`, `References/`, `Solutions/`, and `slops-saloon/`. That's likely why so many files show as modified — the rebrand rename was applied broadly but never committed as a scoped commit.

Other possible content changes (need investigation):

- Direction/decisions/design-md-decision.md — historically-touched, may have real content deltas.
- Blueprints/agent-modules/action-posture.md — may have been edited during doctrine passes.
- CLAUDE.md and AGENTS.md — may have real content changes.

Each of these needs to be diffed against HEAD with a whitespace-ignore flag to separate CRLF-only churn from real content.

---

## Ground state before kickoff

Before starting this cleanup, verify:

- **Current branch:** whichever branch is checked out (likely `master` after PR2 merge). Confirm with `git branch --show-current`.
- **Uncommitted work:** run `git status` and eyeball. Should still show ~90 modified files. If it's fewer or different, someone did partial work in between — investigate before proceeding.
- **Recent commits already shipped:** `0dafe75` (L1 doctrine) on `master` (or on `docs/2026-07-03-fan-experience-doctrine` branch if not yet merged). Do NOT double-commit doctrine files.
- **Other uncommitted work:** `git log master..HEAD` and `git log origin/master..master` — check that nothing else is pending.
- **Lock file state:** `.git/HEAD.lock` and `.git/index.lock` should not exist. If they do, another git process is running (VSCode, GitHub Desktop) — close it or delete the lock files.

---

## Approach (recommended sequence)

### Phase 1 — Separate the causes

```bash
# See which files have REAL content changes (whitespace-ignore)
git diff --stat -w

# See ALL modifications including whitespace
git diff --stat

# Diff those two lists — files that appear in the second but not the first
# are CRLF-only. Files in both have real content changes.
```

**Deliverable:** two file lists — `crlf-only.txt` and `real-content.txt`. Do this by hand, don't automate — the eye-check catches surprises.

### Phase 2 — Normalize line endings (single scoped commit)

```bash
# Create a dedicated branch
git checkout -b chore/normalize-line-endings

# Add or update .gitattributes at repo root
# Content:
#   * text=auto eol=lf
#   *.bat text eol=crlf
#   *.cmd text eol=crlf
#   *.ps1 text eol=crlf
#   *.png binary
#   *.jpg binary
#   *.jpeg binary
#   *.gif binary
#   *.pdf binary
#   *.docx binary
#   *.xlsx binary
#   *.pptx binary
#   *.zip binary

# Set repo-local autocrlf
git config core.autocrlf input

# Renormalize the working tree
git add --renormalize .

# Commit — this commit's diff should be pure line-ending changes
git commit -m "chore: normalize line endings to LF via .gitattributes"

# Push
git push -u origin chore/normalize-line-endings
```

Justin merges via GitHub UI as its own PR. **This commit should be reviewed at a whitespace-diff level to confirm no accidental content changes slipped in.**

### Phase 3 — Commit the real content changes as scoped commits

Now that CRLF drift is gone, `git status` should show only files with real content differences. Group and commit them logically:

**Suggested commit groups (adjust based on what Phase 1 revealed):**

1. `docs(rebrand): corvus → omen file-path renames across Archive/` — the Archive folder rebrand refs.
2. `docs(rebrand): corvus → omen refs across Blueprints/ (excluding _pending, _proposals, _old-prompts-for-analysis)` — active blueprint docs.
3. `docs(rebrand): corvus → omen refs across References/ and Solutions/` — reference and solution docs.
4. `docs(rebrand): corvus → omen refs across slops-saloon/` — L1 division refs.
5. `docs(config): AGENTS.md + CLAUDE.md + .gitignore updates` — if these have real changes, commit their own scoped diff.
6. `chore(archive): retire out-of-date prior-session drafts` — if any file has changes that should actually be reverted rather than committed, do those as `git restore` calls documented in a decision-log entry, not as commits.

**Rule:** every commit is scoped by concern. **Never `git add .` or `git add -A`** for these — always explicit paths per `slops-git-flow` skill discipline.

### Phase 4 — Verify

```bash
# Should show nothing modified
git status

# Confirm .gitattributes is in place
cat .gitattributes

# Confirm core.autocrlf is set
git config --get core.autocrlf

# Regression check — make an edit and see that git treats it correctly
echo "test" >> Blueprints/handoffs/test.md
git status  # should show one modified file, no CRLF warning
git checkout Blueprints/handoffs/test.md  # revert the test
```

### Phase 5 — Handoff + decision log

Write a completion handoff to `Blueprints/handoffs/YYYY-MM-DD-crlf-and-rebrand-cleanup-handoff.md` naming:

- Which content commits landed (with commit hashes).
- Any files that were reverted (not committed) and why.
- The normalize commit hash + its PR.
- Post-cleanup `git status` snapshot showing clean state.
- Any surprises encountered.

Add a dated entry to `Direction/decision_log.md` at the L0 root.

---

## Do not

- **Do NOT `git add .` or `git add -A` at the SLOPS root** — sweeps CRLF churn and real changes together, muddying history irrecoverably. Per `slops-git-flow` skill discipline.
- **Do NOT run the normalize + content commits in a single PR** — mixing them makes review impossible and makes future diffs confusing (can't distinguish rebrand intent from LF conversion).
- **Do NOT normalize BEFORE separating causes** — you'll lose the ability to identify what was real content vs. what was CRLF-only.
- **Do NOT touch files under `Archive/superseded-docs/root-redirected/`** without explicit reason — those are historical redirects meant to be static.
- **Do NOT commit files under `_pending/`, `_proposals/`, `_old-prompts-for-analysis/`** as rebrand fixes unless the intent is to promote them out of drafts. Those folders are staging areas.
- **Do NOT force-push to `master`** at any point.

---

## Watch out for

- **Binary files being mis-treated as text.** `.png`, `.jpg`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, `.zip` — the `.gitattributes` above declares them `binary` explicitly. Verify no binary file ends up in the normalize commit's diff.
- **Files that intentionally need CRLF.** Windows batch scripts (`.bat`, `.cmd`, `.ps1`) must retain CRLF. Declared explicitly in the `.gitattributes` above.
- **Lock files reappearing during the session.** If `.git/HEAD.lock` or `.git/index.lock` come back mid-work, some background process (VSCode's git extension, GitHub Desktop, OneDrive sync) is interfering. Close all editors and sync tools before continuing.
- **The `docs/2026-07-03-fan-experience-doctrine` branch's untracked files.** If that branch hasn't been merged when this cleanup runs, some doctrine files may still be "untracked on master" — those are already committed on the doctrine branch, don't re-add them here.

---

## Success criteria

- `git status` at `C:\Users\JDuve\dev\SLOPS\` shows a clean working tree (or only intentional untracked files).
- `.gitattributes` at repo root with correct rules for text/binary/CRLF preservation.
- `core.autocrlf` set to `input` in repo config.
- `git log` shows: one normalize commit + N scoped content commits with clear messages. No mega-commits.
- Any future `git diff` on a text file emits zero CRLF warnings.
- Handoff written; L0 decision log has a dated entry summarizing the cleanup.

---

## Skills / tools to invoke

- **`slops-git-flow`** — explicit-path commits, scoped-per-concern discipline. Applies directly.
- **`slops-code-review`** — self-administered pre-merge review on the normalize commit AND on each content commit. The normalize commit especially needs an "am I sure this is only whitespace?" check.
- **`slops-repo-inspector`** — inspect L0 truth before planning; source-of-truth docs, DBS routing, git state, stale path cleanup. Fits the diagnostic phase.
- **`slops-context-markdown`** — the general markdown-doc care skill, applies to any doc that has real content changes needing normalization.
- **Do NOT invoke `slops-ship`** — this cleanup does not deploy anything.
- **Do NOT invoke `slops-canary`** — no runtime behavior changes.

---

## References

- Session that surfaced this: `slops-saloon/Blueprints/handoffs/2026-07-03-design-doctrine-and-logo-swap-handoff.md` (L1 handoff).
- L1 decision log entry: `slops-saloon/Direction/decision_log.md` under `## Decisions Added 2026-07-03 (Prod C Still Live + Design.md Skill Reorientation)`.
- Task tracking: task #20 in session task list.
- Related open work: task #19 (recreate 3 wiped Codex prompts) — same "session-work-got-lost" bucket; consider bundling into the same cleanup pass if the prompts can be re-derived from the L1 handoff.

---

## Cold-start read order (~5 minutes)

For a session picking this up cold:

1. This file.
2. `Direction/facts-of-record.md` at L0 root.
3. Last 3 entries of `Direction/decision_log.md` at L0 root.
4. `Blueprints/skills/slops-git-flow/SKILL.md` (or whatever the current path is).
5. `git status` and `git branch --show-current` in `C:\Users\JDuve\dev\SLOPS\`.

Then start Phase 1 above. Ask Justin before any destructive step (revert, force-push, `git restore`).