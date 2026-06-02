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

| Layer | Name | Org Role | Root | Scope |
|-------|------|----------|------|-------|
| Layer 0 (`0-OS`) | SLOPS | Parent company / OS | `SLOPS\` | Founder OS — reusable doctrine, global skills, global agents, cross-product rules |
| Layer 1 (`1-slops-saloon`) | Slops Saloon | Subsidiary | `SLOPS\slops-saloon\` | Subsidiary — fantasy sports product strategy, division naming/brand, future product slots. No app implementation. |
| Layer 2 (`2-corvus`) | Corvus | First app | `SLOPS\slops-saloon\corvus\` | App runtime — Corvus feature logic, fantasy engine, app-specific implementation |

---

## What Each Layer Owns

### Layer 0 (0-OS) — SLOPS (Parent Company / Global)

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

**Passes down to 1-slops-saloon:**
- Naming conventions (all sub-layers must follow DBS schema)
- Tool tier caps and RBAC guardrails
- Canonical skill definitions (sub-layers may invoke but not redefine)
- Founder doctrine and operating principles

**Escalates up to:** Justin (no layer above)

---

### Layer 1 (1-slops-saloon) — Slops Saloon (Subsidiary)

**Owns:**
- Product strategy documents (`slops-saloon\Direction\`)
- App-level Blueprints (`slops-saloon\Blueprints\`)
- Runtime agent prompts (`slops-saloon\corvus\Blueprints\prompts\`)
- App-wide solutions and reports (`slops-saloon\Solutions\`)
- Implementation context for the slops-saloon product

**Does NOT own:**
- Global naming conventions (inherits from 0-OS)
- Tool tier grants beyond what 0-OS authorizes
- Cross-product rules that affect the SLOPS OS

**Passes down to 2-corvus:**
- Product context (roadmap, feature scope, launch criteria)
- Data contracts and API boundaries
- Sub-agent prompt definitions

**Escalates up to:** 0-OS Claude → Justin

---

### Layer 2 (2-corvus) — Corvus (First App / Runtime)

**Owns:**
- Feature-specific runtime logic
- Fantasy football engine architecture
- Project-level notes and implementation details

**Does NOT own:**
- Authority to change app-level product decisions
- Tool grants beyond what 1-slops-saloon authorizes
- Runtime prompt definitions (those live at 1-slops-saloon)

**Escalates up to:** 1-slops-saloon layer → 0-OS Claude → Justin

---

## Agent Authority by Layer

| Layer | Who Has Authority | Scope |
|-------|------------------|-------|
| `0-OS` | Justin, Claude, Codex | Global — any file in `SLOPS\` with correct approval |
| `1-slops-saloon` | Product agents, Claude (scoped), Codex (scoped) | App files only — cannot touch 0-OS doctrine without Justin |
| `2-corvus` | Project agents, Claude (scoped), Codex (scoped) | Project files only — cannot touch slops-saloon product strategy without slops-saloon approval |

**Key rule**: No agent at a lower layer may modify files at a higher layer without
explicit Justin approval and a logged decision.

---

## Handoff Chain

When work crosses a layer boundary, the chain is:

```
2-corvus runtime request
  → escalate to 1-slops-saloon product layer
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
| `manager_agent.md` | `slops-saloon\corvus\Blueprints\prompts\` | Product-specific runtime logic |
| `sub_agents.md` | `slops-saloon\corvus\Blueprints\prompts\` | Product-specific runtime logic |
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

SLOPS\slops-saloon\                  ← 1-slops-saloon: App layer
  Blueprints\
    prompts\
      manager_agent.md          ← Runtime prompt (canonical here)
      sub_agents.md             ← Runtime prompt (canonical here)
  Direction\                    ← Product strategy
  Solutions\                    ← App reports and analysis

SLOPS\slops-saloon\corvus\           ← Layer 2 (corvus): App layer
  (project-specific runtime)
```

---

## See Also

- `Blueprints\agents\AGENT_INDEX.md` — canonical agent authority matrix
- `Blueprints\tools\tool-permissions.md` — tool tier definitions
- `Blueprints\skills\SKILL_ROUTING.md` — when to use Claude vs. Codex vs. skills
- `Blueprints\agents\manager_agent.md` — redirect stub (points to slops-saloon layer)
- `Blueprints\agents\sub_agents.md` — redirect stub (points to slops-saloon layer)
