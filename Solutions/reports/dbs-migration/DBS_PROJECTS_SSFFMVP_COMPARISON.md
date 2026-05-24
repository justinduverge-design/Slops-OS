# DBS Projects ssffmvp Comparison

Date: 2026-05-21

## Scope

Compared:

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Projects\ssffmvp`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

This was a comparison-only pass. No files were moved, deleted, archived, committed, pushed, deployed, or overwritten.

## Repository Check

| Item | Projects\ssffmvp | Canonical ssffmvp |
| --- | --- | --- |
| Exists | yes | yes |
| Contains `.git` | yes | yes |
| Git HEAD | `c80c710` | `a058f6c` |
| Current branch | `main` | `feat/title-espn-enable` |
| Remote | `origin` -> `https://github.com/justinduverge-design/SlopsSaloon-Fantasy-Football-MVP` | `origin` -> `https://github.com/justinduverge-design/SlopsSaloon-Fantasy-Football-MVP` |

## Branch / Remote Notes

`Projects\ssffmvp` appears to have only:

- `main`
- `remotes/origin/main`

Canonical `ssffmvp` has multiple local branches and remote tracking for `origin/main` and `origin/feat/title-espn-enable`.

This suggests `Projects\ssffmvp` is older or less active than the canonical app repo, but it should not be archived automatically because it contains secret-like files and one unique private-key-like file.

## File Comparison

Comparison excluded `.git` and `node_modules`.

| Metric | Result |
| --- | --- |
| `Projects\ssffmvp` file count | 30 |
| Canonical `ssffmvp` file count | 261 |
| Files present in `Projects\ssffmvp` but not canonical `ssffmvp` | 2 |
| Same-relative-path docs/assets newer in `Projects\ssffmvp` | 0 |

Files present in `Projects\ssffmvp` but not canonical `ssffmvp`:

| Relative Path | Bytes | Last Modified |
| --- | ---: | --- |
| `client\dist\assets\index-umayTVZG.js` | 217616 | 2026-05-03 11:43:03 |
| `oraclepr.key` | 1675 | 2026-04-30 18:10:08 |

## Package / Source Check

`Projects\ssffmvp` contains package files:

- `package.json`
- `package-lock.json`
- `client\package.json`
- `client\package-lock.json`

It also contains source-like files. This reinforces that it is a repo/workspace copy, not a simple document archive.

## Secrets / Env Check

Secret-like or env-like files were detected by filename only. Contents were not read.

Detected paths:

- `.env`
- `.env.cloud`
- `.env.example`
- `.env.local-backup-20260502`
- `client\.env.example`
- `oraclepr.key`
- `oraclepu.key`

Because this folder contains `.env` and key-like files, it should not be moved or archived by a general DBS cleanup pass.

## Newer Docs / Assets

No same-relative-path markdown, text, image, or PDF assets were newer in `Projects\ssffmvp` than in canonical `ssffmvp`.

## Safety Decision

`Projects\ssffmvp` is not safe to archive in this phase.

Reasons:

- It contains `.git`.
- It contains `.env` and secret/key-like files.
- It contains package files and source-like files.
- It has a different Git HEAD than canonical `ssffmvp`.
- It has one private-key-like file not present in canonical `ssffmvp`.

## Recommended Archive Action

Recommended next action: `needs user review`.

Before any archive move:

1. Justin should approve how to handle `.env` and key-like files without exposing or deleting them.
2. Confirm whether `oraclepr.key` has any recovery value or should be handled through a secrets-safe process.
3. Confirm `client\dist\assets\index-umayTVZG.js` is only a stale built asset.
4. Confirm whether the `c80c710` state contains anything Justin wants preserved outside normal Git history.
5. If approved, archive the entire folder later to a clearly named location such as:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\Archive\old-workspaces\Projects-ssffmvp-archive-after-secret-review`

Do not split, delete, or clean individual files from this folder without a separate approval.
