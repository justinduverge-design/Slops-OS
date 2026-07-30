# SLOPS OS TODO

This file tracks root operating-system work only. It is the **L0 active queue** — one
active queue per layer.

Task states, `Blocked by:` types, and the selection rule are defined in
`Blueprints/agent-modules/status-model.md`. That module is authoritative; this file only
carries items.

## Active

### OS1 — Decide whether `Blueprints/agents/AGENT_INDEX.md` candidate statuses are approved current truth

- **Status:** READY
- **Blocked by:** FOUNDER_APPROVAL — whether the `candidate` rows in `AGENT_INDEX.md` are ratified as current truth or stay provisional
- **Priority:** P1
- **Cost:** small
- **Done when:** every `candidate` row in `AGENT_INDEX.md` is either ratified as active truth or explicitly marked provisional, and the file states which.
- **Do not touch:** agent activation, wrapper creation, or RBAC grants — those are separate approved steps.

### OS2 — Keep `README.md`, `DBS_INDEX.md`, and `Direction/context.md` aligned

- **Status:** READY
- **Blocked by:** None
- **Priority:** P2
- **Cost:** small
- **Done when:** the three files agree on current root structure and routing, with no contradicting path or layer claim.
- **Do not touch:** app code, deploy posture, secrets, or package files from L0.

### OS3 — Keep `Blueprints/skills/SKILL_ROUTING.md` and `Blueprints/tools/TOOLS_INDEX.md` aligned with agent authority

- **Status:** READY
- **Blocked by:** None
- **Priority:** P2
- **Cost:** small
- **Done when:** every skill/tool entry's stated authority matches `Blueprints/tools/tool-permissions.md`, with no entry claiming authority it does not have.
- **Do not touch:** granting new authority — alignment only; scope changes need approval.

## Next

### OS4 — Review archive candidates outside `Archive/quarantine/`

- **Status:** READY
- **Blocked by:** None
- **Priority:** P2
- **Cost:** medium
- **Done when:** each candidate outside `Archive/quarantine/` is either archived with a MANIFEST row naming its successor, or explicitly kept with a reason.
- **Do not touch:** `Archive/quarantine/` itself — inspection, movement, staging, and cleanup there remain separately gated.

## Parked

- Product-specific Omen tasks.
- App repo cleanup.
- Imported agent activation beyond approved status review.

## Parked — Truth Gate design inputs

Accepted as design inputs only. Truth Gate implementation is not yet authorized.

- Cross-reference alignment: define checks that active orientation and authority
  files agree on canonical paths, layer boundaries, inheritance, and sources of
  truth.

- Registry and authority alignment: define checks that AGENT_INDEX,
  SKILL_ROUTING, TOOLS_INDEX, tool-permissions, and on-disk artifacts agree.

Keep parked until FR-C technical design defines invocation points, failure
classes, warning/blocking thresholds, and rollout behavior.

## Removed during the 2026-07-29 planning-pipeline cutover

Removed because standing doctrine already covers them — a queue item that restates a
standing rule creates two sources of truth for the same constraint:

- Initial-commit staging, loose-root-file review, and "prepare the root initial commit after
  approval" — superseded; the root commit happened. Commit/push posture lives in
  `Blueprints/agent-modules/action-posture.md`.
- Omen backend status tracking and the Omen Supabase SQL approval gate — product facts, not
  L0 queue items. The gate is recorded at L2 in `omen/Direction/facts-of-record.md`.
- "Create a short OS-layer handoff before any next root cleanup pass" — covered by
  `Blueprints/agent-modules/session-handoff.md`, which already requires a dated handoff.
- The whole `## Blocked Without Justin Approval` section — covered by
  `Blueprints/agent-modules/action-posture.md`, `Blueprints/agent-modules/hard-prohibitions.md`,
  and `Blueprints/tools/tool-permissions.md`. Its "Git commit or push" line directly
  contradicted `action-posture.md` and was actively misleading.
- `Solutions/.codex-artifacts/` disposition — **confirmed settled before removal:** the path is
  gitignored at `.gitignore:27` and has zero tracked files. The question it asked is answered.
