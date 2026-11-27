# Handoff — Three-Layer Knowledge Graph (slops-graphify)

**Date:** 2026-06-09
**Owner:** Justin
**Layer route:** Layer 0 (skill + output are governed OS artifacts; graph *content* spans all layers)
**Goal:** One graphify graph containing all THREE layers — L0 SLOPS OS, L1 Slops Saloon, L2 Omen — so every layer sees the others.

## Decisions made

- Installed graphify (PyPI `graphifyy@0.8.36`; CLI/skill `graphify`) on Justin's machine (via Codex) and in the Cowork Linux sandbox (via `pip install graphifyy --break-system-packages`).
- Built a governed wrapper skill `slops-graphify` (skill_type: wrapper) against the upgraded `_template`. It detects-not-installs, routes output to `References/graphify/`, and defines the cross-layer corpus.
- Output home is `References/graphify/` (a Layer 0 governed location). Created with its own README.
- Registered `slops-graphify` in `SKILL_ROUTING.md` (Current SLOPS Skills table + a "Knowledge Graph / Cross-Layer Map" routing rule) and refined its row in `SLOPS_LIFECYCLE.md` ("Auxiliary OS capabilities", status `have`).
- Current graph (curated, sourced from real files — NOT a full extraction): **46 nodes, 69 edges, 6 communities, 17 L0↔L2 bridges.** Omen is the top god node. Files in `References/graphify/graphify-out/`.

## Files discussed / touched

- `Blueprints/skills/_template/SKILL.md` — upgraded (frontmatter schema, wrapper type, preconditions, verification, versioning).
- `Blueprints/skills/slops-graphify/SKILL.md` — the wrapper.
- `References/graphify/README.md` + `graphify-out/{graph.json, GRAPH_REPORT.md, graph.html}` — output.
- `Blueprints/skills/SKILL_ROUTING.md`, `Blueprints/skills/SLOPS_LIFECYCLE.md` — registration.

## Unresolved questions / open follow-ups

- **Layer 1 (Slops Saloon) is barely in the graph** — one stub node. This handoff exists to fix that.
- Wrapper frontmatter `status:` is still `draft`; both runs passed, so it may be promoted to `active`.
- The graph has TWICE flagged that "SLOPS OS governs Omen" is only an INFERRED edge — no explicit doctrine statement. A one-line addition to `AGENTS.md` would close it.
- Known graphify bug: its merge (`build_from_json` + `G.update`) silently drops edges whose endpoints aren't both in the new node set — kills cross-layer bridges. Workaround: add bridge edges directly to the merged graph with `G.add_edge(...)`.
- Codex is rate-limited until **2026-06-10 9:13 PM** — solo (Claude + Justin) until then.

## Safest next step

Run the Layer 1 enrichment solo from the Cowork sandbox (read-only over the corpus, output stays in `References/graphify/`). Curated/sourced enrichment by default; warn before any full hundreds-of-files extraction.

## Recommended next prompt (paste into a fresh Cowork chat)

```text
Continue a SLOPS knowledge-graph task. Goal: ONE graphify knowledge graph containing all THREE layers — Layer 0 (SLOPS OS), Layer 1 (Slops Saloon division), and Layer 2 (Omen app) — so every layer can see the others. Right now the graph has L0 and L2 well represented but Layer 1 is a single stub node. Your job is to populate Layer 1 from its real files and merge it in.

CONTEXT / CURRENT STATE
- Workspace folder: C:\Users\JDuve\OneDrive\Desktop\SLOPS (mounted; your bash sandbox sees it under its /sessions/<id>/mnt/SLOPS path — check your own system prompt for the exact mount).
- A governed wrapper skill already exists: Blueprints/skills/slops-graphify/SKILL.md (skill_type: wrapper, upstream graphifyy@0.8.36). Read it first — it defines corpus scoping, the output location, and the install boundary.
- The external tool "graphify" (PyPI package "graphifyy") is installed on Justin's machine AND in this Cowork Linux sandbox. In the sandbox, verify with: python3 -c "import graphify". If the sandbox rebooted and it's gone, reinstall: pip install graphifyy --break-system-packages -q
- Existing graph output is at: References/graphify/graphify-out/ (graph.json, GRAPH_REPORT.md, graph.html). Current graph: 46 nodes, 69 edges, 6 communities, 17 L0<->L2 bridge edges. It is a CURATED graph (nodes/edges authored from real source files), not a full file-by-file extraction.
- Layer model (canonical, from SKILL_ROUTING.md): L0 = SLOPS root doctrine; L1 = slops-saloon/ (division strategy, product portfolio, brand/naming standards, future product slots — NO app implementation); L2 = slops-saloon/corvus/ (the app).
- Existing node ids you'll attach to: slops_os (Layer 0), slops_saloon (Layer 1 stub), corvus (Layer 2), sleeper, skills_sys.

KNOWN BUG TO AVOID
graphify's merge (build_from_json then G.update) SILENTLY DROPS any edge whose two endpoints aren't both inside the new node set — this kills cross-layer bridges. So: build new NODES via build_from_json, but add every cross-layer EDGE directly to the merged graph with G.add_edge(u, v, relation=..., confidence=..., weight=1.0) after the update, guarding that both ids exist.

STEPS
1. Read Blueprints/skills/slops-graphify/SKILL.md, then detect the Layer 1 corpus: run graphify.detect on slops-saloon/ but EXCLUDE slops-saloon/corvus/ (that's L2) and node_modules/, .git/, build artifacts. Report file/word counts.
2. Actually READ the key Layer 1 files (division strategy, brand/naming, product portfolio, future-product slots, any slops-saloon Direction/decisions). Build real, sourced nodes — tag each edge EXTRACTED if the file states it, INFERRED if reasoned, AMBIGUOUS if unsure. Cite source_file on every node.
3. Load References/graphify/graphify-out/graph.json (networkx json_graph.node_link_graph(data, edges="links")). Add the new L1 nodes, then add edges directly (per the bug note): L1 nodes UP to slops_os (governed_by / inherits) and DOWN to corvus (e.g. slops_saloon ships corvus; brand/naming -> corvus_brand; product slots -> future products).
4. Re-cluster, auto-label communities by highest-degree node, and regenerate graph.json, GRAPH_REPORT.md, graph.html in place. Keep all output in References/graphify/graphify-out/.
5. VERIFY (this is the success signal): count edges crossing each boundary and print them — L0<->L1, L1<->L2, L0<->L2. Confirm Slops Saloon now connects BOTH up to SLOPS OS and down to Omen. A run with zero L1<->L2 or zero L0<->L1 edges has failed the three-layer goal.
6. Present graph.html and GRAPH_REPORT.md to me, and summarize the new god nodes, the three bridge counts, and any doctrine gaps the graph flags (e.g. INFERRED governance edges).

CONSTRAINTS
- Codex is rate-limited until 2026-06-10 9:13 PM, so do this SOLO from the sandbox (do not route to Codex). Justin-gated actions (git push/merge, deploy, migrations, touching the running app) stay off-limits.
- Read-only over the corpus — never edit scanned files. Output stays in References/graphify/ (a Layer 0 governed location); a graph whose CONTENT spans layers is fine — it's a read-only analytical artifact, not a file move.
- This is curated/sourced enrichment by default. If I ask for the exhaustive 300+ file extraction instead, warn me about cost/time before starting.
```
