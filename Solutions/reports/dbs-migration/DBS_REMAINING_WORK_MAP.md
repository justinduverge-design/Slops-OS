# DBS Remaining Work Map

Date: 2026-05-21

This is a safe placement map. It uses folder-level inspection and known DBS reports. It does not move files or inspect secret-like contents.

| Path | Layer | Classification | Recommended Action | Risk | Notes |
| --- | --- | --- | --- | --- | --- |
| `agents` | SLOPS OS | needs index only | Keep in place for now; later index into `Blueprints` | medium | Agent division folders likely belong conceptually under Blueprints, but tool/human references may still expect root path. |
| `prompts` | SLOPS OS | needs index only | Keep in place; optionally mirror/index under `Blueprints` later | medium | Root reusable prompts are low content risk but may be referenced by humans/tools. |
| `skills` | SLOPS OS | needs index only | Keep in place; `Blueprints\skills` can hold curated copies | medium | Existing root skill docs should not be moved without checking tool references. |
| `handoffs` | SLOPS OS | canonical location established | Keep root decisions/history; app handoffs remain canonical in `ssffmvp\handoffs` | low | Deprecated redirect stubs were archived earlier. |
| `Projects` | SLOPS OS | needs future review | Keep remaining `AI_OPERATING_SYSTEM` and `project_memory.md` until reviewed | medium | `Projects\ssffmvp` has been quarantined; remaining project memory may be useful OS reference. |
| `_archive` | SLOPS OS | needs future review | Keep in place; compare before consolidating into `Archive` | medium | Contains old sessions/planning/workspaces. Do not bulk move yet. |
| `_parked` | SLOPS OS | needs future review | Keep parked; review before moving to `Archive\parked` | medium | Parked homepage work may still have reference value. |
| `.codex-artifacts` | SLOPS OS | needs future review | Keep in place; archive only after recovery value expires | medium | Backups and design review artifacts. Do not delete. |
| `Direction` | SLOPS OS | canonical location established | Use as root OS direction | low | Contains root context, roadmap, manifesto, TODO, and plan snapshots. |
| `Blueprints` | SLOPS OS | canonical location established | Use for OS-level workflows, skills, prompts, templates, playbooks | low | Starter structure exists. |
| `Solutions` | SLOPS OS | canonical location established | Use for OS-level outputs and deliverables | low | Keep non-source outputs here. |
| `References` | SLOPS OS | canonical location established | Use for OS-level references and research | low | Starter structure exists. |
| `Archive` | SLOPS OS | canonical location established | Use for reviewed archive, superseded docs, and quarantine | medium | `Archive\quarantine` should remain sealed and uncommitted. |
| `Archive\quarantine` | SLOPS OS | quarantine | Keep sealed; do not inspect or commit | high | Contains stale workspace material that may include `.env` and key-like files. |
| `ssffmvp\Direction` | ssffmvp | canonical location established | Use for app/repo direction | low | Contains ssffmvp context and README. |
| `ssffmvp\Blueprints` | ssffmvp | canonical location established | Use for repo-level blueprints | low | Keep source/config elsewhere. |
| `ssffmvp\Solutions` | ssffmvp | canonical location established | Use for app-adjacent outputs, not active source | low | Starter folder only. |
| `ssffmvp\References` | ssffmvp | canonical location established | Use for app/repo references | low | Starter folder only. |
| `ssffmvp\Archive` | ssffmvp | canonical location established | Use for reviewed ssffmvp archive | medium | Do not archive source/config/secrets without explicit approval. |
| `ssffmvp\Omen` | Omen | canonical location established | Use as product layer | low | Product DBS folders and README now exist. |
| `ssffmvp\handoffs` | ssffmvp | keep in place | Keep as canonical engineering handoffs | medium | Active Claude/Codex coordination files. |
| `ssffmvp\skills` | ssffmvp | keep in place | Keep where tools expect; index later if needed | medium | App-local skills and screenshots are active workflow material. |
| `ssffmvp\specs` | ssffmvp / Omen | keep in place | Keep app specs; Omen copies can live in `Omen\Blueprints\specs` | medium | Do not move active spec-kit structure yet. |
| `ssffmvp\docs` | ssffmvp | keep in place | Keep app docs and ADRs | medium | App documentation may be referenced by repo workflows. |
| `ssffmvp\frontend`, `ssffmvp\client`, `ssffmvp\src` | ssffmvp | do not touch | No DBS cleanup moves | high | Active app source/implementation areas. |
| `ssffmvp\.env*`, key-like files, `.git`, `node_modules` | ssffmvp | do not touch | Do not inspect, move, or commit | high | Active secrets/tooling/runtime boundaries. |
