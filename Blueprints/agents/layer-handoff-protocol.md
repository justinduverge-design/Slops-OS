# Layer-to-Layer Handoff Protocol

**File**: `Blueprints\agents\layer-handoff-protocol.md`
**Status**: Active doctrine
**Layer**: 0-OS (Global Blueprint)
**Last updated**: 2026-05-23

---

## Purpose

This document defines how authority, context, and work pass between the three
SLOPS operating layers. Any agent, operator, or AI session that crosses a layer
boundary must follow this protocol.

---

## The Three Layers

| Layer | Name | Root | Scope |
|-------|------|------|-------|
| `0-OS` | SLOPS Saloon | `SLOPS\` | Founder OS — reusable doctrine, global skills, global agents, cross-product rules |
| `1-ssffmvp` | Fantasy Football MVP | `SLOPS\ssffmvp\` | Subsidiary/app — product strategy, app-wide prompts, runtime agents, implementation context |
| `2-Corvus` | Corvus Project | `SLOPS\ssffmvp\Corvus\` | Project runtime — Corvus feature logic, fantasy engine, project-specific implementation |

---

## What Each Layer Owns

### 0-OS — SLOPS Saloon (Global)

**Owns:**
- Naming conventions and DBS folder schema
- Canonical agent authority model (`AGENT_INDEX.md`)
- Global skills (`Blueprints\skills\`)
- Global agent roster (`Blueprints\agents\`)
- Cross-product tool permissions (`Blueprints\tools\tool-permissions.md`)
- Founder context, brand doctrine, and ADRs (`Direction\`)
- OS-level prompts and templates (`Blueprints\prompts\`)

**Does NOT own:**
- App-specific product decisions
- Runtime prompts for any one product
- Project-specific code, configs, or environment files

**Passes down to 1-ssffmvp:**
- Naming conventions (all sub-layers must follow DBS schema)
- Tool tier caps and RBAC guardrails
- Canonical skill definitions (sub-layers may invoke but not redefine)
- Founder doctrine and operating principles

**Escalates up to:** Justin (no layer above)

---

### 1-ssffmvp — Fantasy Football MVP (Subsidiary)

**Owns:**
- Product strategy documents (`ssffmvp\Direction\`)
- App-level Blueprints (`ssffmvp\Blueprints\`)
- Runtime agent prompts (`ssffmvp\Blueprints\prompts\`)
- App-wide solutions and reports (`ssffmvp\Solutions\`)
- Implementation context for the ssffmvp product

**Does NOT own:**
- Global naming conventions (inherits from 0-OS)
- Tool tier grants beyond what 0-OS authorizes
- Cross-product rules that affect the SLOPS OS

**Passes down to 2-Corvus:**
- Product context (roadmap, feature scope, launch criteria)
- Data contracts and API boundaries
- Sub-agent prompt definitions

**Escalates up to:** 0-OS Claude → Justin

---

### 2-Corvus — Corvus Project (Runtime)

**Owns:**
- Feature-specific runtime logic
- Fantasy football engine architecture
- Project-level notes and implementation details

**Does NOT own:**
- Authority to change app-level product decisions
- Tool grants beyond what 1-ssffmvp authorizes
- Runtime prompt definitions (those live at 1-ssffmvp)

**Escalates up to:** 1-ssffmvp layer → 0-OS Claude → Justin

---

## Agent Authority by Layer

| Layer | Who Has Authority | Scope |
|-------|------------------|-------|
| `0-OS` | Justin, Claude, Codex | Global — any file in `SLOPS\` with correct approval |
| `1-ssffmvp` | Product agents, Claude (scoped), Codex (scoped) | App files only — cannot touch 0-OS doctrine without Justin |
| `2-Corvus` | Project agents, Claude (scoped), Codex (scoped) | Project files only — cannot touch ssffmvp product strategy without ssffmvp approval |

**Key rule**: No agent at a lower layer may modify files at a higher layer without
explicit Justin approval and a logged decision.

---

## Handoff Chain

When work crosses a layer boundary, the chain is:

```
2-Corvus runtime request
  → escalate to 1-ssffmvp product layer
  → escalate to 0-OS Claude for planning/review
  → escalate to Justin for approval (if risk threshold exceeded)
  → decision flows back down the chain
```

Codex executes only after Claude approves the plan and Justin approves the risk.

---

## Where Runtime Prompts Live

Runtime prompts (agent system prompts that run in production) belong at the
**product or project layer**, not at 0-OS.

| Artifact | Correct Location | Reason |
|----------|-----------------|--------|
| `manager_agent.md` | `ssffmvp\Blueprints\prompts\` | Product-specific runtime logic |
| `sub_agents.md` | `ssffmvp\Blueprints\prompts\` | Product-specific runtime logic |
| Global skill files | `Blueprints\skills\` (0-OS) | Reusable across all products |
| Global agent roster | `Blueprints\agents\` (0-OS) | Authority index, not runtime content |

Runtime prompt stubs at `Blueprints\agents\` exist only to prevent navigation
confusion. They redirect to the canonical product-layer location and contain no
runtime content.

---

## Escalation Triggers

An agent must escalate to the layer above when the work involves:

- Editing files outside its authorized layer root
- Changing a product boundary, roadmap item, or ADR
- Touching auth, secrets, credentials, or environment files
- Modifying a runtime prompt that affects live users
- Any destructive operation (delete, move, overwrite) on files not in its layer
- A decision that contradicts existing doctrine

---

## DBS Layer Quick Reference

```
SLOPS\                          ← 0-OS: Global OS doctrine
  Blueprints\
    agents\                     ← Global agent roster + redirect stubs
    skills\                     ← Reusable skills
    tools\                      ← Tool permissions
    prompts\                    ← OS-level runnable prompts
  Direction\                    ← Founder doctrine, ADRs
  Solutions\                    ← Reports, audits, research
  References\                   ← External reference material

SLOPS\ssffmvp\                  ← 1-ssffmvp: App layer
  Blueprints\
    prompts\
      manager_agent.md          ← Runtime prompt (canonical here)
      sub_agents.md             ← Runtime prompt (canonical here)
  Direction\                    ← Product strategy
  Solutions\                    ← App reports and analysis

SLOPS\ssffmvp\Corvus\           ← 2-Corvus: Project layer
  (project-specific runtime)
```

---

## See Also

- `Blueprints\agents\AGENT_INDEX.md` — canonical agent authority matrix
- `Blueprints\tools\tool-permissions.md` — tool tier definitions
- `Blueprints\skills\SKILL_ROUTING.md` — when to use Claude vs. Codex vs. skills
- `Blueprints\agents\manager_agent.md` — redirect stub (points to ssffmvp layer)
- `Blueprints\agents\sub_agents.md` — redirect stub (points to ssffmvp layer)
