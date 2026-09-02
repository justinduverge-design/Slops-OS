---
name: slops-figma-to-native
description: Pull an approved Figma frame through the Figma MCP server and emit SwiftUI or Compose scaffolding bound to locked design tokens, flagging any drift between the Figma source and the component lock. Use when a native screen's source of truth is a Figma frame rather than an HTML canvas, or to check whether Figma and the component lock still agree. Produces scaffolding and a drift report; the build agent completes the screen.
status: draft
skill_type: wrapper
layer: 0
default_agent: Claude pulls and scaffolds; the build agent completes against the screen contract
trigger: "figma to native | build this frame | is figma still in sync with the component lock | design token drift"
version: 0.1.0
upstream: Figma MCP server (hosted; version not pinnable locally — record the observed capability set per run)
owner: Justin
---

# Slops Figma to Native

## Purpose

The Figma MCP server is connected and **no SLOPS skill uses it.** Meanwhile the native delivery
workflow assumes approved Figma frames as an input. That gap means Figma frames are read by hand,
which is where token drift enters.

This closes the loop for the Figma half of the design pipeline. The HTML-canvas half is
`slops-canvas-to-code`; the two are siblings and must produce the same contract shape so downstream
work does not care which source a screen came from.

## When to Use

- A native screen whose approved source is a Figma frame.
- Checking whether Figma variables and the component lock still agree.
- Extracting design tokens from a Figma library into token definitions.

## Do Not Use

- When the approved source is an HTML canvas artboard — `slops-canvas-to-code`.
- To design in Figma, or to write back to a Figma file. **Read-only toward Figma.**
- To finish a screen. This scaffolds; the build agent completes it.
- When no approved frame exists. An unapproved frame is not a source of truth.

## Required Inputs

- The Figma file and node, and evidence it is approved.
- `component-lock-v1.md` and `team-theme-contract-v1.md`.
- Target platform.
- Any existing screen contract for this screen.

## Preconditions and Dependencies

- The Figma MCP server, connected and authorized. **Detect; never install or configure
  credentials.** If unavailable, stop and say so.
- Per the server's own guidance, load its `/figma-*` skill guidance before its tools where that
  guidance exists — do not treat the tool surface as self-explanatory.
- The MCP server is hosted and its version is not pinnable locally. **Record the observed tool set
  per run** so a capability change is visible as drift rather than as a mystery.

## Read-First Procedure

1. The frame's metadata and structure before its pixels — the layer tree is the specification.
2. `get_variable_defs` for the frame's tokens.
3. The component lock, to map Figma components onto locked ones.
4. Any existing screen contract.
5. Only the frame in scope.

## Process Recipe

1. Verify the server is available and the frame is approved.
2. Pull metadata, design context, and variable definitions.
3. **Map every Figma component to a locked component.** Unmapped is a finding, never an invention.
4. **Map every Figma variable to a design token.** A Figma variable with no token, or a token whose
   value disagrees with Figma, is **drift** — report it; do not silently prefer one side.
5. Emit a screen contract in the **same format** as `slops-canvas-to-code`, so downstream work is
   source-agnostic.
6. Emit scaffolding — structure, locked components, token bindings. **Not a finished screen.**
7. Report drift separately from the contract. Drift is a design-system decision, not a build detail.

## Output Contract

- Screen contract → `Blueprints/specs/design/screen-contracts/<Screen>-v<N>.md`, matching
  `slops-canvas-to-code/references/contract-format.md`.
- Scaffolding → the platform source tree, clearly marked incomplete.
- Drift report → `Direction/reviews/YYYY-MM-DD-figma-token-drift.md`.

## Verification

- **Smoke test:** pull one frame's metadata and variable definitions. If tokens come back and map,
  the connection and the mapping both work.
- **Success signal:** every Figma component and variable is either mapped or listed as drift. **A
  clean drift report with unmapped items is a false pass.**
- Scaffolding compiles.

## DBS Routing

Contracts → `Blueprints/specs/design/`. Drift → `Direction/reviews/`, and a resolution decision →
`decision_log.md`. Scaffolding → the app repo, and it is app work under app rules.

## Agent and RBAC Rules

**Read-only toward Figma.** Never writes to a Figma file. Scaffolding is app code and inherits app
approval gates. A drift resolution — whether Figma or the lock is right — is a founder decision.

## Failure Modes

- Writing to Figma.
- Silently preferring Figma over the component lock, or the reverse. **Drift is reported, not
  resolved.**
- Emitting a finished-looking screen that is scaffolding, so nobody completes it.
- Producing a contract in a different shape from the canvas skill's, splitting the downstream path.
- Treating an unapproved frame as a source of truth.
- Skipping the server's own skill guidance.
- Not recording the observed tool set, so a capability change looks like a bug.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: drift found and which side was right, unmapped components, and
observed MCP tool-set changes.

## Changelog

- 0.1.0 — initial. Emits the same contract shape as `slops-canvas-to-code` so the two design
  sources converge on one downstream path.
