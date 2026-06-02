# Phase 1B — SLOPS OS Title Case Cleanup
## Prompt for: Codex
## Operation type: Folder renames only — no file content changes
## Date drafted: 2026-05-23
## Prerequisite: Phase 1 (nomenclature normalization) must be completed first

---

## Your Role

You are operating as a precise filesystem engineer on the SLOPS OS project.
This is a **rename-only** operation. Three non-DBS-pillar folders still use
Title Case when they should be lowercase. You will rename them and nothing else.

---

## SLOPS Canonical Naming Convention (reference)

**DBS pillars are always Title Case** — `Direction`, `Blueprints`, `Solutions`,
`References`, `Archive`. These are intentional and must NOT be changed.

Everything else under them follows this rule:
- Single-word content folders: lowercase (`agents`, `skills`, `tools`)
- Multi-word content folders and files: kebab-case (`dbs-migration`, `brand-assets`)
- Skill packages: kebab-case (`slops-context-markdown`, `pre-build-research`)
- Support subfolders: `_` prefix + kebab (`_interface`, `_references`)
- Import containers: `_` prefix + kebab (`_imported`)
- Import items: `__` prefix + snake_case (`__academic_division`) — only exception

The three folders below are **not DBS pillars**. They use Title Case incorrectly.

---

## Task 1 — Rename `Direction/Reviews`

**Location:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction`

| Current Name | New Name |
|---|---|
| `Reviews` | `reviews` |

This is a content subfolder of the Direction DBS pillar, not a DBS pillar itself.

---

## Task 2 — Rename `Corvus/Assets` and `Corvus/Brand`

**Location:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus`

| Current Name | New Name |
|---|---|
| `Assets` | `assets` |
| `Brand` | `brand` |

These are content subfolders of the Corvus product layer, not DBS pillars.
All files inside these folders stay exactly as-is — rename the folder only.

---

## Do Not Touch — Absolute

```
Direction\          ← DBS pillar — do NOT rename
Blueprints\         ← DBS pillar — do NOT rename
Solutions\          ← DBS pillar — do NOT rename
References\         ← DBS pillar — do NOT rename
Archive\            ← DBS pillar — do NOT rename, contents — do NOT touch
Corvus\Archive\     ← DBS pillar subfolder — do NOT rename
slops-saloon\corvus\src\
slops-saloon\corvus\frontend\
slops-saloon\corvus\client\
slops-saloon\corvus\scripts\
slops-saloon\corvus\sql\
slops-saloon\corvus\test\
slops-saloon\.env
slops-saloon\.env.cloud
slops-saloon\oraclepu.key
slops-saloon\.github\
slops-saloon\.git\
SLOPS\.git\
```

Do not read, print, or open any `.env`, `.key`, `.pem`, `.cert`, token, or credential file.
Do not run any install, build, test, migration, deploy, or git command.
Do not change any file contents — folder renames only.

---

## Verification Steps

**Step 1:** Confirm `Direction` subfolders.
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction"
```
Expected: `reviews` present (lowercase), `Reviews` absent.

**Step 2:** Confirm `Corvus` subfolders.
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus"
```
Expected: `assets` and `brand` present (lowercase), `Assets` and `Brand` absent.
DBS pillars `Archive`, `Blueprints`, `Direction`, `References`, `Solutions` still Title Case ✅.

**Step 3:** Git status at slops-saloon.
```
cd "C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon" && git status --short
```
Expected: No unexpected changes to app source files.

---

## Completion Note

Write this file:

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Solutions\reports\dbs-migration\PHASE_1B_RENAME_COMPLETION.md`

**Contents:**
- Date and time completed
- List of folders renamed (old → new)
- Git status output from slops-saloon
- Confirmation that no file contents were changed
- Confirmation that DBS pillar names remain Title Case

---

## Summary

| Task | Folder | Renamed |
|---|---|---|
| Task 1 | `Direction/Reviews` → `Direction/reviews` | 1 |
| Task 2 | `Corvus/Assets` → `Corvus/assets` | 1 |
| Task 2 | `Corvus/Brand` → `Corvus/brand` | 1 |
| **Total** | | **3** |

Zero file content changes. Zero app source touched.
