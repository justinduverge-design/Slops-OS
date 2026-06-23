---
name: clean-up-checkpoint
description: Stop new work and create a rate-limit-safe shutdown checkpoint for SLOPS work. Use when Justin is near rate limit, ending a session, finishing a milestone, pausing work, preserving project context, recording decisions, or asking for the exact next prompt. Produces DBS checkpoint docs, updates stale context/tracking files, lists changed and missing files, records open questions, and avoids app code, secrets, deploy, production, and destructive work unless explicitly requested.
---

# Clean-Up Checkpoint Skill

## Purpose

Use this skill to stop active work and preserve the current project state before context is lost.

The output should let Justin or the next agent resume without guessing what happened.

## When To Use

- Justin says rate limit is near.
- Justin asks to stop, pause, checkpoint, clean up, or shut down.
- A milestone is finished and context needs to be preserved.
- A thread is about to end.
- Work changed direction and the next task needs a clean handoff.

## When Not To Use

- Do not use for normal feature implementation.
- Do not use as a reason to start new work.
- Do not use to deploy, commit, push, migrate, or refactor.
- Do not use to inspect secrets or production systems.

## Required Files To Review

Read only what is needed for the current repo or product layer.

For `slops-saloon`, prefer:

- `README.md`
- `DBS_INDEX.md`
- `Direction/context.md`
- `Direction/current_sprint.md`
- `Direction/decision_log.md`
- `Blueprints/handoffs/backend-to-frontend.md`
- `Blueprints/handoffs/frontend-to-backend.md`
- `Blueprints/handoffs/decisions.md`
- `Blueprints/security-privacy.md`
- `slops-saloon/omen/README.md`
- `slops-saloon/omen/Direction/context.md`
- `slops-saloon/omen/Direction/current_sprint.md`
- `slops-saloon/omen/Direction/decision_log.md`
- Relevant active specs, playbooks, prompts, and handoffs
- `probo.yaml` only when security/privacy tracking changed

If a required file is missing, record it in the checkpoint.

## Steps

1. Stop new implementation work.
2. Read only the minimum context needed to understand the current state.
3. Identify work completed in the session.
4. List files created, updated, and not found.
5. Update stale context/tracking files only when clearly needed.
6. Record decisions in the appropriate decision log.
7. Record security/privacy changes in the tracker when relevant.
8. Write the shutdown checkpoint.
9. Recommend the next task.
10. Provide the exact next prompt Justin should paste.
11. Do not run broad tests unless the user explicitly asks.

## Output Format

The checkpoint file should include:

- `## Current Project State`
- `## Work Completed This Session`
- `## Files Changed`
- `## Files Not Found`
- `## What Was Not Done`
- `## Current Risks / Open Questions`
- `## Recommended Next Step`
- `## Exact Next Prompt For Justin`

The final response should include:

- Files created.
- Files updated.
- Current project state in 5 bullets max.
- Exact next prompt.
- Confirmation that no app code, secrets, or deploy files were touched.

## Safety Rules

- Do not write app code unless Justin explicitly asks.
- Do not start new features.
- Do not deploy.
- Do not commit.
- Do not push.
- Do not touch `.env` files, secrets, keys, tokens, cookies, credentials, DNS, SSL, Nginx, production config, package files, SQL, scripts, tests, `node_modules`, `.git` folders, or `Archive/quarantine`.
- Do not move active source code.
- Do not delete files.
- Do not inspect quarantined material.
- Keep edits short and factual.

## Where To Store Outputs

For `slops-saloon` app checkpoints:

- `Blueprints/handoffs/rate-limit-shutdown-checkpoint.md`

For SLOPS-authored skills:

- `Blueprints/skills/`, resolved from the active Git root

For security/privacy tracking:

- `Blueprints/security-privacy.md`
- `probo.yaml` only when adding or updating compliance evidence pointers

## Context Save / Restore

This skill is also the home for saving and restoring working context (it absorbs the former
`context-save` / `context-restore`).

- **Save:** the checkpoint file *is* the saved context — current state, work completed, files
  changed, open questions, recommended next step, and the exact next prompt.
- **Restore:** to resume, read the latest checkpoint
  (`Blueprints/handoffs/rate-limit-shutdown-checkpoint.md`), then the files it references, then
  paste its "Exact Next Prompt". Do not start new work before restoring context.

## Change Log

- 2026-05-23: Created skill for rate-limit-safe SLOPS shutdown checkpoints.
