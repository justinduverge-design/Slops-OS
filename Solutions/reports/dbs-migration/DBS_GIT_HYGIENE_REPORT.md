# DBS Git Hygiene Report

Date: 2026-05-21

## Root Git Status Summary

Root `SLOPS` appears to be a Git working tree where most workspace items are untracked.

Current root status includes untracked DBS files/folders, root docs, root operating folders, archive folders, and the `ssffmvp` repo folder.

Phase 8 created a minimal root `.gitignore` for quarantine/secrets protection:

- `Archive/quarantine/`
- `.env`
- `.env.*`
- `*.key`
- `*.pem`
- `*.p12`
- `*.pfx`

This was done to reduce the risk of accidentally committing quarantined sensitive workspace material.

## ssffmvp Git Status Summary

Canonical app repo:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

Current `ssffmvp` status includes pre-existing modified files:

- `.gitignore`
- `agent_handoff.md`
- `agent_inbox.md`
- `current_sprint.md`
- `decision_log.md`
- `frontend/src/pages/Football.jsx`
- `frontend/src/pages/TradeAnalyzer.jsx`

DBS-related additions/changes include:

- `README.md`
- `Archive/`
- `Blueprints/`
- `Omen/`
- `Direction/`
- `References/`
- `Solutions/`

Existing untracked skill folders/files remain visible under `ssffmvp\skills`.

## Safe To Commit Later

Likely safe after Justin review:

- `DBS_INDEX.md`
- `DBS_*REPORT.md` and `DBS_*REVIEW.md` files that do not contain secrets
- `DBS_MIGRATION_PLAN.md`
- Root DBS folder README files
- Root `README.md`
- Root `AGENT.md` and `CLAUDE.md` DBS navigation additions
- `ssffmvp\README.md`
- `ssffmvp\Direction`, `Blueprints`, `Solutions`, `References`, `Archive` README/context docs
- `ssffmvp\Omen` product docs, brand docs, assets references, and archive notes, after app repo review
- Root `.gitignore` quarantine/secrets protection

## Should Not Be Committed

Do not commit:

- `Archive\quarantine\`
- Any `.env` file
- Any key-like, token-like, cookie, credential, or secret-bearing file
- `.git` folders
- `node_modules`
- Deployment secrets or local machine credentials

## Needs Review Before Commit

Review before committing:

- `.codex-artifacts`
- `_archive`
- `_parked`
- `Projects\AI_OPERATING_SYSTEM`
- root `agents`, `prompts`, and `skills`
- root `Archive\superseded-docs`
- app repo pre-existing modified source files
- app repo pre-existing modified `.gitignore`
- app repo untracked skill folders and screenshots

## Quarantine

Quarantine folders should remain uncommitted.

`Archive\quarantine\Projects-ssffmvp-sensitive-2026-05-21` was moved as a sealed unit in Phase 7 and may contain `.env` and key-like files. It should not be uploaded, committed, pushed, shared, restored, or inspected without a secrets-safe review.

## Recommended Git Hygiene

Keep the root `.gitignore` quarantine/secrets entries.

Before any commit, stage intentionally by file path. Do not use broad `git add .` from the SLOPS root while quarantine, archive, backup, old workspace, or artifact folders exist.

For app repo commits, separate DBS documentation commits from active app source commits.
