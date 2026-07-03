# Phase 1 — SLOPS OS Nomenclature Normalization
## Prompt for: Codex
## Operation type: Filesystem renames only — no file content changes
## Date drafted: 2026-05-23

---

## Your Role

You are operating as a precise filesystem engineer on the SLOPS OS project.
This is a **rename-only** operation. You will rename folders to match the canonical
SLOPS naming convention. You will not edit any file contents, move files between
parent directories, or touch anything outside the specified paths.

---

## SLOPS Canonical Naming Rules (commit these to memory for this task)

| Rule | Pattern | Example |
|---|---|---|
| Support/container subfolder | `_single_underscore` prefix | `_imported`, `_interface`, `_references`, `_template` |
| Items inside a container | `__double_underscore` prefix | `__academic_division`, `__handoffs` |
| All folder names | lowercase, words joined by `_` | `__project_management_division` |
| Skill package support subfolders | `_single_underscore` only | `_interface`, `_references` |

---

## Task 1 — Rename `_imported` Division Folders

**Location:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents\_imported`

Rename each folder below. Folder contents stay exactly as-is — rename the folder only.

| Current Name | New Name |
|---|---|
| `__academic division` | `__academic_division` |
| `Design Division` | `__design_division` |
| `Engineering Division` | `__engineering_division` |
| `Finance Division` | `__finance_division` |
| `Marketing Division` | `__marketing_division` |
| `Paid Media Division` | `__paid_media_division` |
| `Product Division` | `__product_division` |
| `Project Management Division` | `__project_management_division` |
| `Sales Division` | `__sales_division` |
| `Specialized Division` | `__specialized_division` |
| `Support Division` | `__support_division` |
| `handoffs` | `__handoffs` |

**Expected result:** 12 folders, all prefixed `__`, all lowercase with underscores, no spaces.

---

## Task 2 — Fix Skill Package Support Folder Naming

**Location:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\slops-prompt-generator`

One naming inconsistency exists: this skill package uses `__interface` (double underscore)
while the canonical pattern for skill support subfolders is `_interface` (single underscore).

Rename:

| Current | New |
|---|---|
| `Blueprints\skills\slops-prompt-generator\__interface` | `Blueprints\skills\slops-prompt-generator\_interface` |

**Note:** `_references` in the same skill package is already correct — do not rename it.

---

## Do Not Touch — Absolute

```
slops-saloon\omen\src\
slops-saloon\omen\frontend\
slops-saloon\omen\client\
slops-saloon\omen\scripts\
slops-saloon\omen\sql\
slops-saloon\omen\test\
slops-saloon\evals\
slops-saloon\.env
slops-saloon\.env.cloud
slops-saloon\.env.local-backup-20260502
slops-saloon\oraclepu.key
slops-saloon\.github\
slops-saloon\Dockerfile
slops-saloon\Dockerfile.cron
slops-saloon\docker-compose.yml
slops-saloon\package.json
slops-saloon\package-lock.json
slops-saloon\node_modules\
slops-saloon\.git\
SLOPS\.git\
SLOPS\Archive\
SLOPS\slops-saloon\Archive\
```

Do not read, print, or open any `.env`, `.key`, `.pem`, `.cert`, token, or credential file.
Do not run any install, build, test, migration, deploy, or git commit command.

---

## Verification Steps (run after all renames)

**Step 1:** List `_imported` folder contents and confirm output.
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents\_imported"
```
Expected: 12 folders, all start with `__`, no spaces in names.

**Step 2:** List `slops-prompt-generator` contents and confirm.
```
dir "C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\slops-prompt-generator"
```
Expected: `_interface` (single underscore) present, `__interface` absent.

**Step 3:** Git status at SLOPS root.
```
cd "C:\Users\JDuve\OneDrive\Desktop\SLOPS" && git status --short
```
Expected: Only rename entries (`R`). No unexpected modifications or deletions.

**Step 4:** Git status inside slops-saloon.
```
cd "C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon" && git status --short
```
Expected: No changes from this operation (we only touched SLOPS root layer).

---

## Completion Note

After verification, write this file:

**Path:** `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Solutions\reports\dbs-migration\PHASE_1_RENAME_COMPLETION.md`

**Contents to include:**
- Date and time completed
- Full list of folders renamed (old name → new name)
- Git status output from both locations (SLOPS root and slops-saloon)
- Any issues encountered or deviations from the plan
- Confirmation that no file contents were changed

---

## Summary

| Task | Scope | Files Changed | Folders Renamed |
|---|---|---|---|
| Task 1 | `_imported` division naming | 0 | 12 |
| Task 2 | `slops-prompt-generator` support folder | 0 | 1 |
| **Total** | | **0** | **13** |
