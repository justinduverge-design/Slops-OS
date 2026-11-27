# SLOPS Graphify Refresh Report
**2026-06-16 (automated run)**

## Status: PRECONDITION FAILURE — Graphify Not Installed

**Summary:** The scheduled refresh was triggered, but `graphifyy` is not installed on this system. The wrapper skill (`slops-graphify/SKILL.md`) requires graphify to be present before running. Since this is an automated task, I have completed a **manual staleness analysis** instead and flagged the graph for immediate rebuild once graphify is installed.

### Installation Status
```
❌ graphify module not available (ModuleNotFoundError: No module named 'graphify')
```

To install, run:
```powershell
python -m pip install graphifyy
graphify install
```

---

## Current Graph State (as of last build: 2026-06-13)

### Metrics
- **Nodes:** 73
- **Edges:** 142
- **Communities:** 8
- **Extraction quality:** 87% EXTRACTED · 13% INFERRED

### Cross-Layer Bridges ✓
All three boundaries are represented:
- **L0↔L1:** 1 edge (present)
- **L1↔L2:** 1 edge (present)
- **L0↔L2:** 1 edge (present)

### God Nodes (Top 10)
1. Corvus (Layer 2) — 24 edges
2. SLOPS OS (Layer 0) — 14 edges
3. Skill system — 12 edges
4. Slops Saloon (Layer 1) — 10 edges
5. Business Launch Foundation (Corvus go-live) — 10 edges
6. Slops OS App Template Spec (Corvus = reference impl) — 9 edges
7. slops-graphify wrapper — 8 edges
8. Sleeper monetization — 7 edges
9. MVP Move (paid) — 7 edges
10. Corvus UX/UI Direction v1 (approved) — 7 edges

---

## Staleness Analysis — Changes Since 2026-06-13

### Change Volume
- **Total files changed:** 136
- **Files in L0/L1/L2 scope:** 135 (99% of corpus touched)
  - **New files:** 99
  - **Modified files:** 22
  - **Deleted files:** 11

### Critical Changes — New Doctrine & Strategy

**Agent Modules (14 new files)**
- `Blueprints/agent-modules/identity-claude.md` — Cowork-specific Claude identity
- `Blueprints/agent-modules/identity-codex.md` — Codex agent rules
- `Blueprints/agent-modules/identity-cowork.md` — Cowork addendum
- `Blueprints/agent-modules/action-posture.md` — Agent action boundaries
- `Blueprints/agent-modules/layer-0-rules.md`, `-layer-1-rules.md`, `-layer-2-rules.md` — Layer-specific constraints
- `Blueprints/agent-modules/hard-prohibitions.md` — System-level guardrails
- `Blueprints/agent-modules/session-handoff.md` — Session continuity rules
- `Blueprints/agent-modules/files-to-read-first-L0.md` — Layer 0 entry points (new!)
- `Blueprints/agent-modules/files-to-read-first-L1.md` — Layer 1 entry points (new!)
- `Blueprints/agent-modules/files-to-read-first-L2.md` — Layer 2 entry points (new!)

**Handoffs (7 new files, ~60 KB)**
- `2026-06-10-corvus-architecture-pivot.md`
- `2026-06-11-corvus-pull-prep-handoff.md`
- `2026-06-11-skills-acquisition-handoff.md`
- `2026-06-11-slops-saloon-inheritance-handoff.md`
- `2026-06-13-phase-1-reconciliation-handoff.md`
- `corvus-launch-readiness-handoff.md`
- `hermes-v1-setup-handoff.md`

**Playbooks & Patterns (5 new files, ~40 KB)**
- `Blueprints/playbooks/app-cutover-playbook.md`
- `Blueprints/playbooks/proprietary-math-stack-playbook.md`
- `Blueprints/playbooks/vps-hardening-plan.md`
- `Blueprints/patterns/README.md`
- `Blueprints/patterns/STRATEGY-md-pattern.md`

**Executive Office & Division Agents (8 new files)**
- `00_Executive_Office/agents.md`, `cep_operator.md`
- `01_Operations_COO/agents.md`
- `02_Engineering_CTO/agents.md`
- `03_Security_CISO/agents.md`
- `04_Brand_CMO/agents.md`
- `AGENTS.md` (root, updated)
- `slops-saloon/AGENTS.md` (updated)

**Key Modified Files**
- `AGENTS.md` — agent system restructured around divisions
- `CLAUDE.md` — updated identity & layer rules
- `Blueprints/RESOURCES_INDEX.md` — new centralized resource reference
- `slops-saloon/Direction/context.md`, `decision_log.md` — L1 strategy updates
- `slops-saloon/CLAUDE.md` — L1 agent rules

### Largest New Additions (Impact)
1. **slops-saloon/Direction/business-launch-foundation.md** (14.4 KB) — Corvus go-live playbook
2. **Blueprints/playbooks/vps-hardening-plan.md** (13.1 KB) — Infrastructure security doctrine
3. **Blueprints/prompts/_pending/** (31 KB across 3 files) — Queued prompt improvements
4. **Blueprints/skills/SLOPS_LIFECYCLE.md** (9.7 KB) — Skill lifecycle & execution model
5. **Blueprints/handoffs/corvus-launch-readiness-handoff.md** (8.6 KB) — Deployment gates

---

## Graph Curation Assessment

### What the Graph Covers (Current)
- ✅ Core three-layer hierarchy (L0 OS, L1 Saloon, L2 Corvus)
- ✅ Skill system as cross-cutting concern
- ✅ Monetization strategy (Sleeper, Stripe gated, free-tier positioning)
- ✅ Specification nodes (app template, provider adapter, UX direction)
- ✅ Operational domains (hosting, ESPN cookie auth, business entity)
- ✅ Team/decision structure (Justin, Claude, Codex, graphify roles)

### What's NEW and Missing from Graph (Requires Refresh)

**Agent System Restructuring**
- The agent system has been reorganized around executive divisions
- Each division (Operations, Engineering, Security, Brand) now has its own agent specs
- The graph currently shows generic "Agent system / RBAC" but lacks this division hierarchy
- **Impact:** 8+ new nodes needed; edges to each division's strategy

**Doctrine Expansion**
- 14 new agent-module files establish hard layer-separation rules and identity docs per agent type
- Graph currently has generic "Identity" concepts; should reflect Claude/Codex/Cowork distinctions
- **Impact:** 10+ new nodes; edges to layer rules, identity boundaries

**Operational Playbooks**
- 5 new playbooks (app-cutover, proprietary-math-stack, vps-hardening, patterns, lifecycle)
- Graph has no "Playbook" abstraction or links to infrastructure doctrine
- **Impact:** 5+ new nodes; cross-links to Corvus backend, business launch, hosting

**Handoff & Transition Records**
- 7 detailed handoff documents spanning Jun 10-13 record decisions, architecture pivots, phase reconciliation
- These bridge between strategic direction and implementation
- Graph currently has no "Handoff" nodes or temporal markers
- **Impact:** 7+ new nodes; edges showing decision flow over time

**Executive Office**
- New 00_Executive_Office folder with CEO/CTO operator specs
- Represents a new top-level governance layer
- **Impact:** 1-2 new layer nodes (might revise L0 structure)

---

## Recommended Next Steps

### Immediate (Manual Curation Priority)
1. **Install graphify** (precondition) — see Installation Status above
2. **Re-run graphify build** on the full corpus (use `--update` mode if incremental is preferred)
3. **Verify L0↔L1↔L2 bridges are still > 0** — the three-layer structure is load-bearing
4. **Check god-node centrality** — Corvus should remain a top bridge; SLOPS OS should anchor L0

### Expected Graph Changes Post-Refresh
- **Node count:** 73 → ~95–110 (new agent specs, playbooks, handoffs, executive office)
- **Edge count:** 142 → ~180–210 (new cross-references)
- **Community count:** 8 → possibly 10–12 (divisions may form sub-clusters)
- **Extraction %:** 87% → likely hold (most new files are markdown, not ambiguous)

### Known Issues to Verify After Refresh
- **Isolated nodes (6 currently):** These should drop once new handoff/playbook nodes are added
- **Inferred edges (13% current):** New playbooks and handoffs may shift some inferred→extracted as relationships become explicit
- **Layer definitions:** With Executive Office and new agent modules, the layer node definitions themselves may need refinement

---

## Verification Checklist

After graphify is installed and refresh completes:

- [ ] Graph builds successfully (no errors, `graph.json` non-empty)
- [ ] L0↔L1 edge count > 0
- [ ] L1↔L2 edge count > 0
- [ ] L0↔L2 edge count > 0
- [ ] God nodes: Corvus and SLOPS OS remain top-2 connectors
- [ ] New agent/division nodes appear in output
- [ ] Handoff/playbook nodes are present
- [ ] Isolated node count decreases from 6
- [ ] GRAPH_REPORT.md reflects new communities/structure

---

## Notes for Future Runs

- **Build window:** 136 files changed in 3 days (Jun 13→16) — this rate suggests weekly (or bi-weekly) refresh cadence is appropriate
- **Scope:** The corpus is growing but remains manageable (~200-250 source files); size guard should not trip
- **Curation vs. automation:** The current 73 nodes are hand-curated (not auto-extracted). Post-refresh, evaluate whether new nodes (agent specs, playbooks) should be curated or auto-extracted via graphify
- **Archive bloat:** Confirmed that Archive/ is properly excluded; run remains clean

---

**Report generated:** 2026-06-16 02:15 UTC  
**Next scheduled run:** 2026-06-20 (or on-demand after graphify install)  
**Owner:** Justin (install required before next automated run)
