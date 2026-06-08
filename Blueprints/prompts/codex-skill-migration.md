# Codex Skill Migration Prompt

Paste to Codex to finish the gstack -> Slops skill migration and install the shared Slops skills
for BOTH agents. Governed by `Blueprints/skills/SLOPS_LIFECYCLE.md` (Keep/Replace/Drop record).
Codex has already completed Step 0 (backup) and Step 1 (inventory).

```text
ROLE: Codex skill-environment migration, continuing from Step 2. SAFE PASS.
AUTHORITY: Blueprints/skills/SLOPS_LIFECYCLE.md is the governing record. Do not remove any
gstack-latest skill marked KEEP-pending or REPLACE-not-yet-built there. No broad commits.

PRECONDITIONS (already done — confirm, don't redo):
- Backup exists at ~/.codex-skills-backup-20260608-121152 (verified).
- gstack-latest inventory captured.

STEP 2 — FIX THE REPO-INSPECTOR
- Update Codex's repo-inspector skill so the canonical app repo is
  C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus  (NOT SLOPS\ssffmvp).
- Show the before/after diff.

STEP 3 — INSTALL THE SHARED SLOPS SKILLS FOR BOTH AGENTS
- Source of truth: C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\<name>\SKILL.md
- Confirm both target dirs first and report them:
    Codex:  C:\Users\JDuve\.codex\skills\
    Claude: %USERPROFILE%\.claude\skills\   (confirm the actual Claude Code skills dir before writing)
- Copy each of these skill folders into BOTH target dirs:
    planning-pass, slops-git-flow, slops-quality-baseline,
    slops-ui-ux-audit, slops-ux-copy, clean-up-checkpoint,
    slops-code-review, slops-canary
- Verify each resolves/loads in Codex, and that the files are present in the Claude dir.

STEP 4 — VERIFY BEFORE ANY REMOVAL
- Confirm the six skills load for Codex AND exist in the Claude dir.
- Re-read SLOPS_LIFECYCLE.md Keep/Replace/Drop.

STEP 5 — QUARANTINE ONLY WHAT THE MAP ALLOWS
- MOVE (do not delete) into the backup/quarantine folder ONLY gstack-latest skills in the DROP list,
  plus KEEP-list skills whose Slops replacement you just installed and verified.
- DO NOT touch gstack-latest skills in the REPLACE-not-yet-built set
  (land-and-deploy/ship/setup-deploy, investigate, learn/retro, browse/qa). Leave them until
  their Slops versions exist. NOTE: code-review/cso and canary/landing-report are now BUILT —
  quarantine them once slops-code-review and slops-canary are installed.
- Re-verify Codex still has every skill the map says to keep.

STEP 6 — REPORT, DO NOT BROAD-COMMIT
- Report: inspector diff, both target dirs, skills installed to each, what was quarantined,
  what was intentionally kept (REPLACE-not-yet-built).
- Do NOT `git add -A`. Both SLOPS and corvus worktrees are intentionally dirty. If committing the
  inspector fix or skill copies, use slops-git-flow: explicit paths, verify staged set, Justin
  approves push.

STOP AND ASK IF
- The Claude skills dir can't be confirmed.
- Any DROP/KEEP decision is ambiguous against the map.
- A step would require a broad commit or touching secrets/app source.
```
