# References / graphify

Governed output home for the **slops-graphify** skill (`Blueprints/skills/slops-graphify/SKILL.md`).

## What lives here

graphify writes its persistent artifacts into `graphify-out/` inside this folder. The skill is run with this directory as the working directory so output lands here instead of polluting the scanned corpus.

```text
References/graphify/
  README.md            # this file
  graphify-out/        # created on first run
    graph.json         # persistent cross-layer graph — query without re-reading
    GRAPH_REPORT.md    # god nodes, surprising connections, suggested questions
    obsidian/          # open as an Obsidian vault
    graph.html         # interactive graph, open in a browser
    cache/             # SHA256 cache — re-runs only process changed files
```

## Why References/

The graph is extracted structure over the corpus — research, not a decision, spec, or deliverable. It is kept out of both the Layer 0 doctrine folders and the Corvus repo so it is never mistaken for authoritative source for either side.

## Default run

The default slops-graphify build is **cross-layer**: Layer 0 SLOPS OS doctrine (`AGENTS.md`, `CLAUDE.md`, `context.md`, `DBS_INDEX.md`, `Direction/`, `Blueprints/`) merged with Layer 2 Corvus (`slops-saloon/corvus/`, excluding `node_modules/` and build artifacts). The result is one graph in which OS doctrine and app implementation can see each other.

Do not commit large generated artifacts (`graphify-out/cache/`, `obsidian/`) if they bloat the repo — add them to `.gitignore` if needed. The authoritative, reviewable outputs are `graph.json` and `GRAPH_REPORT.md`.
