# DBS Phase 4B Medium-Risk Move/Archive Report

Created: 2026-05-21

## Scope

Phase 4B handled medium-risk docs only after checking DBS copies and references.

No files were deleted, deployed, committed, pushed, or overwritten. No `.env` files, secrets, keys, tokens, cookies, credentials, DNS, SSL, Nginx, Docker, GitHub Actions, production config, active app source code, package files, SQL, scripts, tests, `node_modules`, `.git` folders, or active implementation assets under `frontend/public` or `client/public` were touched.

## Files Archived

| Original Path | Archive Path | Canonical/Review Copy | Reason |
| --- | --- | --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\draft_assistant_spec.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Archive\superseded-docs\draft_assistant_spec.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Omen\Blueprints\specs\draft_assistant_spec.md` | DBS copy existed and matched by SHA-256; no active old-path workflow references found. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\handoffs\handoffsfrontend-to-backend.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Archive\superseded-docs\handoffs\handoffsfrontend-to-backend.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\handoffs\frontend-to-backend.md` | File was a deprecated redirect stub; canonical app handoff exists. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\handoffs\handoffsbackend-to-frontend.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Archive\superseded-docs\handoffs\handoffsbackend-to-frontend.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\handoffs\backend-to-frontend.md` | File was a deprecated redirect stub; canonical app handoff exists. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\handoffs\handoffsREADME.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Archive\superseded-docs\handoffs\handoffsREADME.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\handoffs\README.md` | File was a deprecated redirect stub; canonical root handoff README exists. |

## Files Moved

None outside archive moves listed above.

## Files Skipped

| Candidate | Action | Reason |
| --- | --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\brand\brand_voice.md` | skipped | Referenced by `skills\skills.md`; keep until references are updated or redirect plan is approved. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\brand\rebrand_notes.md` | skipped | Referenced by `skills\skills.md`; keep until references are updated or redirect plan is approved. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\design.md` | skipped | Referenced by root planning/docs including `README.md`, `00_FINAL_PLAN.md`, and copied Direction/Archive planning docs. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\prompts` | skipped | Folder has multiple files and many active references. No complete DBS copy/index exists yet. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\skills` | skipped | Folder has active workflow references and contains OS-level docs. No complete DBS copy/index exists yet. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\agents` | skipped | Large persona library with many references and duplicate-like overlap with app prompts. Needs reconciliation before archive. |

## References Found

- `brand_voice.md` and `rebrand_notes.md` are referenced in `C:\Users\JDuve\OneDrive\Desktop\SLOPS\skills\skills.md`.
- `design.md` is referenced by root `README.md`, root `00_FINAL_PLAN.md`, copied `Direction\00_FINAL_PLAN.md`, and archived planning docs.
- `prompts`, `skills`, and `agents` have broad references across root docs, app handoffs, app prompt loader docs, app prompt folders, and prior archive snapshots.
- Deprecated handoff redirect-style files are referenced only as deprecated examples in decisions docs; the files themselves contained explicit "Deprecated" redirect copy.

## Still Needs Justin Review

- Whether `brand\brand_voice.md` and `brand\rebrand_notes.md` should get redirect notes later or remain as root brand workspace files.
- Whether `design.md` should stay as a root convenience doc or become a redirect to `ssffmvp\Omen\Blueprints\specs\design.md`.
- Whether root `prompts`, `skills`, and `agents` should be copied/indexed into `Blueprints` before any archive decision.
- Whether `agents\manager_agent.md` and `agents\sub_agents.md` should be reconciled against `ssffmvp\prompts\manager_agent.md` and `ssffmvp\prompts\sub_agents.md`.

## Confirmation

Phase 4B archived only one matched doc duplicate and three deprecated handoff redirect stubs. Active app source, secrets, deployment config, package files, SQL, scripts, tests, `.git` folders, and active implementation assets were untouched.
