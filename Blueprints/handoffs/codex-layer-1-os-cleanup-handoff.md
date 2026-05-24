# Codex Layer 1 OS Cleanup Handoff

Date: 2026-05-24

## Scope

Layer 1 only: SLOPS OS at `C:\Users\JDuve\OneDrive\Desktop\SLOPS`.

Do not modify `ssffmvp/` from this handoff. It is a nested app repo and should be handled by a dedicated repo pass.

## Completed

- Merged the Universal AI Rules from `Direction/global-context.md` into `Direction/context.md`.
- Archived `Direction/global-context.md` to `Archive/global-context-pre-dbs.md`.
- Left outdated `Tool Specialization` and `What Not To Do Yet` content out of `Direction/context.md`.

## Current Canonical OS Context

- `Direction/context.md` is the SLOPS OS layer context file.
- `DBS_INDEX.md` remains the root navigation index.
- `Blueprints/handoffs/` is the OS-layer handoff location.
- `Archive/global-context-pre-dbs.md` is historical reference only.

## Remaining Layer 1 Work

1. Review root-level loose files and confirm whether each is canonical, redirect, or archive material:
   - `context.md`
   - `context_rec.md`
   - `README.md`
   - `DBS_INDEX.md`

2. Review OS-layer canonical markdown files for consistency:
   - `Direction/context.md`
   - `Direction/roadmap.md`
   - `Direction/manifesto.md`
   - `Direction/TODO.md`
   - `Direction/00_FINAL_PLAN.md`

3. Review OS-layer index/config/special files only:
   - `Blueprints/agents/AGENT_INDEX.md`
   - `Blueprints/skills/SKILL_ROUTING.md`
   - `Blueprints/tools/TOOLS_INDEX.md`
   - root `.gitignore`

4. Confirm the root repo does not stage or track nested app repo material:
   - `ssffmvp/`
   - `Archive/quarantine/`
   - secret-like files

## Safety Notes

- Do not open or print `.env`, `.key`, credential, token, cookie, or secret files.
- Do not deploy, push, or commit without explicit approval.
- Do not touch `Archive/quarantine/`.
- Do not modify `ssffmvp/`; it is out of scope for this Layer 1 handoff.

## Suggested Next Action

Run a root-only canonical file review for the SLOPS OS layer, then update or archive only OS-layer markdown/index/config files after Justin approves the exact changes.
