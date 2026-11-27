# Graph Report - Blueprints  (2026-06-25)

## Corpus Check
- 7 files · ~4,353 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 74 nodes · 67 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13483bf7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `Slops OS App Template Spec` - 16 edges
2. `Omen — Features & UX Roadmap Handoff` - 9 edges
3. `Omen App State — Layer 1 Report` - 7 edges
4. `Slops Saloon Handoff — Omen Architecture Pivot 2026-06-10` - 6 edges
5. `UX/UI Audit Gaps — Identified 2026-05-28 — ALL FIXED` - 6 edges
6. `Agent Build Loop Template` - 6 edges
7. `Slops Saloon Blueprints` - 5 edges
8. `What Is NOT Done` - 4 edges
9. `Three Features from the Original Prototype to Build Into Omen` - 4 edges
10. `What Is Working` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (9 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (17): Border Radius System, Component Primitives (required in every product), Data Transparency Rules, Future Template Notes, Handoff Protocol, Mobile Breakpoints, Page Shell Structure, Purpose (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (12): After Stripe, Backend — fully implemented, Decisions Locked, Frontend — all routes routed and building, Frontend loose ends (not blockers, but visible), Launch blockers, Omen App State — Layer 1 Report, Product gaps (post-launch OK, but limit who can get value) (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (11): 1. HITL Feedback Loop (Human-in-the-Loop), 2. Move History + Effectiveness Tracking, 3. League Standings Panel, Account + ConnectLeague — Pre-Audit Checklist, Implementation Order (when ready), Navigation — 2026-05-29, OAuth Status — Session 2026-05-28, Omen — Features & UX Roadmap Handoff (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.29
Nodes (6): Division Decisions Made, Future Product Ideas Parked, Open Questions, Recommended Next Prompt, Slops Saloon Handoff — Omen Architecture Pivot 2026-06-10, What Routes to Omen

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (6): Agent Build Loop Template, Current Omen Reference, Operating Flow, Product Entry Docs To Update, Product Files To Create, Purpose

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (6): Account.jsx, All pages, Landing.jsx, Login.jsx, OmenPage.jsx, UX/UI Audit Gaps — Identified 2026-05-28 — ALL FIXED

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (5): Current Product Blueprint Path, Do Not Use This Folder For, Reusable Agent Loop, Slops Saloon Blueprints, Use This Folder For

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (3): Auth Gate Pattern, Hard gate (for paid / personalized tools), Soft gate (preferred for free tools)

## Knowledge Gaps
- **54 isolated node(s):** `Use This Folder For`, `Reusable Agent Loop`, `Do Not Use This Folder For`, `Current Product Blueprint Path`, `Division Decisions Made` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Slops OS App Template Spec` connect `Community 0` to `Community 7`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `Omen — Features & UX Roadmap Handoff` connect `Community 2` to `Community 5`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `UX/UI Audit Gaps — Identified 2026-05-28 — ALL FIXED` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `Use This Folder For`, `Reusable Agent Loop`, `Do Not Use This Folder For` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._