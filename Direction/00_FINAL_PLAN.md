# SLOPS OS Operating Plan

## Purpose

This plan keeps the root SLOPS layer focused on the operating system: context, reusable workflows, agent authority, skills, tools, reports, references, and archive policy.

Product strategy and app implementation belong in the app and product layers.

## Current Structure

```text
SLOPS/
  Direction/     current OS context, roadmap, doctrine, and work queue
  Blueprints/    reusable skills, agents, prompts, specs, workflows, handoffs
  Solutions/     reports, outputs, audits, and completed artifacts
  References/    source material and supporting research
  Archive/       superseded, parked, historical, and quarantined material
  ssffmvp/       nested app repo, ignored from root git
```

## Canonical Files

- `DBS_INDEX.md` is the root navigation map.
- `Direction/context.md` is the canonical OS context.
- `Direction/roadmap.md` is the OS-layer roadmap.
- `Direction/manifesto.md` is the OS doctrine.
- `Direction/TODO.md` is the active OS-layer work queue.
- `Blueprints/skills/SKILL_ROUTING.md` is the skill routing matrix.
- `Blueprints/agents/AGENT_INDEX.md` is the agent authority matrix.
- `Blueprints/tools/TOOLS_INDEX.md` is the tool permission index.

## Operating Rules

- Keep each decision in the highest reusable safe layer.
- Keep app code, tests, deployment, package files, SQL, and secrets inside app-specific workflows.
- Do not let archived or imported material override current context.
- Preserve history by archiving before replacing or deleting.
- Get Justin approval before commits, pushes, destructive operations, secrets, deployments, or infrastructure.

## Immediate Plan

1. Finish root-only doc cleanup.
2. Review the root staging list for secrets, nested repos, quarantine, and accidental app material.
3. Decide whether `Solutions/.codex-artifacts/` belongs in the initial root commit.
4. Commit the SLOPS OS foundation only after Justin approves the final staged list.
