# Codex Prompt — SLOPS Root: Initial Commit
## Prompt for: Codex
## Operation type: Git — stage and commit OS foundation files
## Date drafted: 2026-05-23
## Date updated: 2026-05-24
## Repo: SLOPS root (`C:\Users\JDuve\OneDrive\Desktop\SLOPS`)

---

## Context

The SLOPS root repo is on branch `master` with no commits. All DBS OS files are
untracked. This prompt stages the full DBS OS foundation and creates the first
commit.

`slops-saloon/` is a nested git repo and must be excluded from SLOPS root tracking.
It is not yet in `.gitignore` — that must be fixed first.

---

## Scope Constraints

- Do NOT touch any files inside `slops-saloon/`
- Do NOT open or print any `.env`, `.key`, secrets, or credential files
- Do NOT run `git push` — commit only
- Do NOT stage `Archive/quarantine/` (already gitignored — verify this is working)
- Stop and report if anything unexpected appears in the staged list

---

## Step 1: Verify repo state

```bash
cd C:\Users\JDuve\OneDrive\Desktop\SLOPS
git status
git log --oneline -5
```

Confirm:
- Branch is `master`
- No commits yet
- `slops-saloon/` appears as untracked

---

## Step 2: Add `slops-saloon/` to `.gitignore`

Edit `.gitignore`. Add the following block at the bottom:

```
# slops-saloon is a separate git repo — do not track from SLOPS root
slops-saloon/

# Codex-generated artifact backups — do not track
Solutions/.codex-artifacts/
```

---

## Pre-flight: Confirm context_rec.md is absent

`context_rec.md` is a temporary recommendations file that Justin will delete before running this prompt. If it still exists at the SLOPS root, stop and ask Justin to delete it before proceeding. Do not stage it.

---

## Step 3: Dry-run stage to verify nothing unexpected is included

```bash
git add -n -A
```

Review the output. Confirm:
- `slops-saloon/` is NOT listed
- `Archive/quarantine/` is NOT listed
- `Solutions/.codex-artifacts/` is NOT listed
- `context_rec.md` is NOT listed
- No `.env`, `.key`, or secrets files are listed

If anything unexpected appears, stop and report before proceeding.

---

## Step 4: Stage all OS foundation files

```bash
git add .gitignore
git add Blueprints/
git add Direction/
git add Solutions/
git add References/
git add Archive/
git add DBS_INDEX.md
git add README.md
git add context.md
```

---

## Step 5: Verify staged files

```bash
git status
```

Confirm `slops-saloon/` is not staged. Confirm no secrets.

---

## Step 6: Commit

```bash
git commit -m "feat: initial commit — SLOPS OS DBS foundation

Establishes the SLOPS OS operating layer with full DBS structure:
- Blueprints: agents, skills, tools, prompts (Phases 1-6 complete)
- Direction: founder doctrine and ADRs
- Solutions: migration reports and audits
- References: external reference material
- Archive: superseded files
- DBS_INDEX.md and context.md

Phase summary: Phases 1-6 of the DBS normalization and agent promotion
pipeline are complete as of 2026-05-23."
```

---

## Step 7: Verify

```bash
git log --oneline -3
git status
```

Expected:
- One commit on master
- Working tree clean (except `slops-saloon/` which is now gitignored)

---

## Completion Checklist

- [ ] `slops-saloon/` added to `.gitignore`
- [ ] Dry-run confirmed no secrets or excluded folders staged
- [ ] All DBS OS files staged
- [ ] Commit created on `master`
- [ ] `git status` is clean after commit
- [ ] Report back the commit hash and file count

---

## Do NOT

- Do not `git push`
- Do not stage anything inside `slops-saloon/`
- Do not stage `Archive/quarantine/`
- Do not run any commands outside of git and file editing
