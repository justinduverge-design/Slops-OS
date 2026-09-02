# Prior-use review — slops-figma-to-native

No runs yet. `draft`.

| Date | Frame | Drift found | Which side was right | Unmapped components | MCP tool-set change |
|---|---|---|---|---|---|

## Authoring notes

- The contract format is deliberately shared with `slops-canvas-to-code`. If the two ever
  diverge, downstream work has to know which design source a screen came from, and that is
  exactly the coupling worth avoiding.
- Prior routing notes record Figma as a no-op for Omen because no files existed. Verify
  that is still true before the first run — if it is, this skill stays parked rather than
  draft, and the canvas path is the only live one.
- The MCP server is hosted, so `upstream` cannot carry a version. Recording the observed
  tool set per run is the substitute; it is weaker, and worth revisiting if the server
  starts exposing a version.
