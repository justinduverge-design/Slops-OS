---
name: slops-canvas-to-code
description: Compile an approved design canvas artboard (.dc.html) into an unambiguous screen contract, emit a build prompt with a per-element acceptance checklist, then diff the built screen against the artboard. Use before handing any canvas screen to a build agent, when a built screen drifted from its design, or when a screen build burned retries on missing placements and icons. Removes the ambiguity that causes rebuild loops. Produces a contract and a diff report; it does not build the screen.
status: draft
skill_type: package
layer: 0
default_agent: Claude compiles the contract and runs the diff; the build agent builds against it
trigger: "build this screen from the canvas | canvas to code | screen contract | why did the build not match the design"
version: 0.1.0
upstream: none — reads Claude Design canvas artboards (.dc.html) produced in-repo
owner: Justin
---

# Slops Canvas to Code

## Purpose

A design canvas is a picture. A build agent needs a specification. Handing over the picture and
expecting the specification is what produces four rebuild attempts, dropped icons, and an
exhausted rate limit.

**The failure this exists to prevent, in the founder's words:** *"When I tried to build the pages
with codex I ran out of rate limits because I didn't do the job exactly like the canvas presented
it, forgot placements and icons. It was bad."*

The diagnosis is not that the build agent was careless. It is that **"match this canvas" is not a
checkable instruction.** Nothing in the handoff says the icon exists, where it sits, or what it is
called — so its absence is not a failure the agent can detect. This skill makes every element a
line an agent can check itself against before submitting.

Omen has 22 artboards across `design/app-rework-canvas/` and `design/command-center/`. Each is a
build waiting to go wrong the same way.

## When to Use

- Before handing any canvas screen to a build agent. **This is the intended entry point.**
- When a built screen drifted from its design and the difference needs naming.
- When a screen build is burning retries.
- When a canvas is updated and the built screen must catch up.

## Do Not Use

- To build the screen. This produces the contract and the diff; the build agent builds.
- To design or redesign. If the canvas is wrong, fix the canvas — the contract compiles what is
  there and never invents a placement.
- To audit quality. A screen can match its artboard exactly and still be inaccessible; that is
  `slops-native-ui-audit`.
- For a screen with no approved artboard. **Stop and say so** rather than compiling a contract
  from an unapproved source.

## Required Inputs

- The artboard: `design/<canvas>/<Screen>.dc.html`, plus its `canvas.json`.
- The design system authority for the target platform — for Omen native:
  `Blueprints/specs/design/component-lock-v1.md`, `team-theme-contract-v1.md`, and
  `Blueprints/specs/mobile/omen-native-design-house-v1.md`.
- The target: iOS SwiftUI, Android Compose, or web.
- Any existing screen contract for this screen. **Check first** — `omen/Blueprints/prompts/
  canvas-m1-screen-contracts.md` already contracts some M1 screens; extend it rather than
  producing a competing document.

## Preconditions and Dependencies

- Read access to the canvas files. No runtime, no install.
- Stage 3 (visual diff) needs a screenshot of the built screen. On native that comes from
  `slops-native-sim-drive`; without it, stage 3 degrades to a **structural** diff against the
  contract checklist and must say so rather than claiming a visual match.

## Read-First Procedure

1. The artboard `.dc.html` in full, and its `canvas.json` for layout and neighbours.
2. Any existing contract for this screen.
3. The component lock and theme contract — **before** naming any element, so the contract speaks
   in locked component and token names instead of inventing vocabulary.
4. The current implementation, only when diffing an already-built screen.
5. Not the whole design system. Only the components this screen uses.

## Process Recipe

### Stage 1 — Compile the contract

Walk the artboard **top to bottom, left to right, and enumerate every visual element.** Not the
notable ones. Every one. An element absent from the inventory is an element the build will drop,
and that is the documented failure.

For each element record:

- **Identity** — a stable name, and the locked component it maps to. If it maps to nothing in the
  component lock, that is a finding: either a missing component or an off-system design. **Flag
  it; do not silently invent one.**
- **Placement** — position relative to its container and siblings. Order, alignment, spacing in
  tokens. Never bare pixels where a spacing token exists.
- **Content** — exact copy, verbatim. Placeholder and empty states.
- **Icon** — **the icon's name, its source set, and its size.** Icons are the single most-dropped
  element class; an icon in the contract without a name will be dropped again.
- **Tokens** — colour, type scale, radius, elevation, by token name.
- **States** — default, pressed, disabled, loading, empty, error. A state the artboard does not
  show is an open question for the founder, not an invention.
- **Behaviour** — what it does on tap, and where it navigates.

Then the screen as a whole: navigation entry and exit, safe-area handling, scroll behaviour,
keyboard avoidance, and what happens with no data.

### Stage 2 — Emit the build prompt

Contract plus a **per-element acceptance checklist**, one checkbox per element, phrased so the
build agent can verify itself before submitting:

```
- [ ] Header: `OmenNavBar`, title "Command Center", left `chevron.left` (24pt, SF Symbols),
      right slot empty. Token `surface/raised`. Tapping left pops to League list.
```

The prompt states explicitly: **every box must be checked before the work is submitted, and an
element that cannot be built as specified is reported, not silently omitted.** That single
sentence is the difference between a drifted screen and a question.

### Stage 3 — Diff

Compare the built screen against the contract, element by element. Classify each difference:

- **MISSING** — in the contract, absent from the build. Always a defect.
- **MISPLACED** — present, wrong position or order.
- **OFF-TOKEN** — right element, hardcoded or wrong token.
- **DRIFT** — build is right and the canvas is stale. **A legitimate outcome** — the fix is to
  update the canvas, not the code.
- **UNDECIDED** — the artboard never specified it. A question for the founder.

Report severity-ranked, with the contract line each finding violates.

## Output Contract

- **Contract:** `Blueprints/specs/design/screen-contracts/<Screen>-v<N>.md` (Omen L2), or the
  existing contract file when one exists.
- **Build prompt:** `Blueprints/prompts/build-<screen>.md`.
- **Diff report:** `Direction/reviews/YYYY-MM-DD-<screen>-canvas-diff.md`.

Each states: artboard source and its hash or date, target platform, element count, unmapped
components, unspecified states, and what was deliberately not contracted.

## Verification

- **Smoke test:** compile one artboard, then have someone who has not seen the canvas rebuild the
  screen from the contract alone. Every difference is a hole in the contract.
- **Success signal:** element count in the contract equals element count in the artboard, and
  every element has a name, a placement, and — where applicable — a named icon.
- **The real signal, measured over runs:** rebuild attempts per screen trending toward one. That
  is the outcome this skill exists for; record it in prior-use.

Never report a contract complete while any element lacks a placement or any icon lacks a name.

## DBS Routing

Contracts are specifications → `Blueprints/specs/design/`. Prompts → `Blueprints/prompts/`.
Diffs are reviews → `Direction/reviews/`. An unmapped component is a design-system change and goes
to the founder via `slops-intent-capture` — never resolved inside a screen contract.

## Agent and RBAC Rules

This skill writes contracts, prompts, and reports. **It does not write application code** and does
not edit artboards. A canvas correction is the founder's.

## Failure Modes

- **Enumerating the notable elements instead of all of them.** The primary failure. A dropped icon
  in the contract is a dropped icon in the build.
- Naming an icon "the back arrow" instead of its symbol name and size.
- Inventing a component name absent from the component lock.
- Inventing a state the artboard never showed instead of raising it.
- Contracting against a stale artboard without checking it is current.
- Recording bare pixels where the system has a spacing token.
- Claiming a visual match from a structural diff when no screenshot existed.
- Producing a second contract for a screen that already has one.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: **rebuild attempts per screen** (the headline metric), which
element class was under-specified, and every DRIFT finding — a canvas that drifts repeatedly is a
canvas nobody is maintaining.

## Changelog

- 0.1.0 — initial. Three stages: compile, build-prompt, diff. Icons carry a named-symbol
  requirement because they are the documented drop class.
