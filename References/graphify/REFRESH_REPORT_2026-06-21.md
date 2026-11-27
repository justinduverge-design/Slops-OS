# SLOPS Graphify Refresh Report

**Date:** 2026-06-21
**Status:** PASS — targeted skill-playbook refresh

## Scope

Refreshed the stable Markdown procedures added for Corvus skill activation without scanning Claude's in-progress application edits.

- L0 startup, routing, lifecycle, plan-approval, and closeout doctrine
- L2 Corvus Definition of Done, sprint, build-loop instructions, Done gates, and four skill playbooks
- Canonical cross-layer graph: `References/graphify/graphify-out/`
- Corvus-local graph: `slops-saloon/corvus/graphify-out/`

The refresh used graphify's deterministic Markdown extractor. It made no LLM calls, used no paid API, and consumed zero model tokens.

## Result

| Graph | Nodes | Edges | Communities |
|---|---:|---:|---:|
| Canonical L0↔L2 | 228 | 224 | 23 |
| Corvus local | 3,077 | 3,950 | 229 |

Additional verification:

- Canonical graph contains 27 L0↔L2 edges.
- Both graphs contain the company-baseline playbook, skill-activation invocation procedure, skill-usage ledger, procedure-receipt gate, and first pilot concept.
- The Corvus-local graph removed 187 nodes and 174 incident edges sourced from `Archive/`, which is excluded by the SLOPS graph contract.
- The broad query `How are Claude and Codex required to select and record skills for Corvus tasks?` now reaches the live enforcement chain in both graphs.
- `graphify explain "Invocation Procedure"` resolves to `Blueprints/playbooks/skill-activation-runbook.md` in both graphs.

## Queryable Enforcement Chain

The refreshed graph connects:

1. L0 Skills / Corvus
2. Corvus kickoff skill enforcement
3. Claude and Codex skill selection and recording
4. Corvus company-baseline playbook
5. Skill-activation invocation procedure
6. Procedure receipt
7. Skill-usage ledger
8. First company-baseline skill-receipt pilot

Every manually added bridge records a source file and location. Direct document requirements are marked `EXTRACTED`; the L0 Skills→Corvus and Corvus→kickoff navigation bridges are marked `INFERRED`.

## Remaining Gap

The canonical curated graph still reports 52 legacy validation warnings because older edges lack `source_file`. They predate this refresh and do not prevent querying, but a later curation pass should attach evidence or remove those edges. A full semantic rebuild was intentionally not run while Claude was actively editing and no approved local semantic backend was available for this run.

## Safety

- No application source, secrets, environment files, dependencies, deployment configuration, or production systems were changed.
- Timestamped pre-refresh graph backups were written under the local temporary directory.
- Claude's current dirty frontend work was not scanned into this targeted refresh.
