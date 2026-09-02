# Prior-use review — slops-agent-docs-refresh

| Date | Files forgotten | Drift check caught | Core size before → after |
|---|---|---|---|

## Authoring notes

- Known defects at authoring, to be fixed by the first run: `omen/AGENT.md` and
  `omen/AGENTS.md` both exist with only one referenced; Windows absolute paths are
  canonical in both `DBS_INDEX.md` files; Omen's `CLAUDE.md` orders a 12-file read plus a
  7-file native gate before any task; the on-demand list cites
  `omen-ux-ui-design-system-v1.md`, which the same file marks partially superseded; at
  least one dangling citation exists (`2026-07-05-espn-community-api-and-extension-research.md`,
  referenced by two Direction files, absent from the repo).
- The drift check has no natural home yet. Omen has `scripts/check-*.js`; L0 has
  `Blueprints/tools/`. Cross-repo is the hard part — the same problem `valor-brain` solved
  by mirroring a validator into each repo. Follow that precedent rather than inventing one.
