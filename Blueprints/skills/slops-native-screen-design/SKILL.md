---
name: slops-native-screen-design
description: Decide what a native iOS or Android screen should BE — layout, spacing from the locked scale, which surface level each block earns, where badges and chips sit, and the exact words on every control and state — and emit it as a checkable screen contract. Use when a screen is approved but undesigned, when a CTA's spacing or wording is unsettled, when a pill or badge has no home, or when "make this screen look right" is the whole brief. The composing counterpart to slops-native-ui-audit, which grades a screen that already exists. Emits the same contract shape as slops-canvas-to-code and slops-figma-to-native, so the build step is source-agnostic. Produces a screen contract with a per-element acceptance checklist; it does not write app code.
status: draft
skill_type: package
layer: 0
default_agent: Claude composes; the build agent implements; founder ratifies the contract
trigger: "design this screen | what should this screen look like | CTA spacing | where does the pill go | what should this button say | screen is approved but undesigned"
version: 0.1.0
owner: Justin
---

# Slops Native Screen Design

## Purpose

Every design skill in the library **audits**: `slops-native-ui-audit` grades eleven axes,
`slops-ui-ux-audit` grades the web app, `design:design-critique` reacts to a draft. None of them
answers *what should this screen be*. That gap is why native screens stall at "we have some UI work
to do" — the work is real, and nothing turns it into a decision anyone can check.

This skill composes. It converts an approved screen with no design into a **screen contract**:
ordered blocks, a surface level per block, spacing drawn only from the locked scale, a named token
per colour, a resolved component per element, and the literal string for every control, state and
empty case. "Match this canvas" is not a checkable instruction. A contract is.

## When to Use

- A screen is approved in the M1 contracts but has no layout decision.
- CTA spacing, button wording, or badge placement is the open question.
- A screen exists and reads wrong, and the audit's findings need a target to move toward.
- A new state — empty, stale, disconnected, off-season — has no designed treatment.

## Do Not Use

- To grade a built screen. That is `slops-native-ui-audit`.
- To implement. This emits a contract; a build agent builds it.
- For the web app. That is `slops-ui-ux-audit` and the web component lock.
- To invent brand direction. Voice, palette and type come from `Brand/brand-system.md`; this skill
  applies them and reports where they are silent.
- When the screen's API or state contract is unratified. Design against a moving backend produces a
  contract that expires on contact. Flag the gap.

## Read-First Procedure

Read before composing. Stop and flag if a source is missing or two sources conflict.

1. `Blueprints/specs/mobile/omen-native-design-house-v1.md` — design hierarchy, surface levels,
   token architecture, component approval levels, platform rules.
2. `Blueprints/specs/design/component-lock-v1.md` — the locked component APIs and the **spacing
   scale**: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`. A value outside the scale does not exist.
3. `Blueprints/specs/design/team-theme-contract-v1.md` — which tokens a skin may override, and the
   contrast floor that survives the override.
4. `Brand/brand-system.md` — voice, copy anchors, the AAA framework.
5. The screen's ratified API and state contract, and any approved Figma frame.
6. `Blueprints/specs/mobile/omen-mobile-onboarding-connection-contract-v1.md` when the screen
   touches provider connection.

## Process Recipe

### Stage 1 — Establish the decision

Name, in one sentence, the single decision, result, or next useful task this screen delivers. The
design house is explicit: **decision first, evidence second.** A screen whose decision cannot be
stated in one sentence is not ready to design — return that finding instead of a layout.

### Stage 2 — Rank the blocks

List every block. Assign each a **surface level** from the design house's five:

1. page background · 2. grouped section · 3. standard surface · 4. elevated decision surface ·
5. high-attention action/recovery surface

*Not every container is a card.* A screen where every block is level 3 has no hierarchy, and
flatness reads as indecision. Exactly one block carries the decision. Justify any second level-4.

### Stage 3 — Place and space

For each block and each gap between blocks, name a value **from the locked scale**. Write the
number, not "comfortable" or "tight". Inside a control — a CTA's label-to-edge padding, the gap
between an icon and its text — the same rule holds.

Badges, chips and pills are placed by **what they modify**, never by available whitespace. State the
anchor: *"platform chip sits leading, baseline-aligned with the player name it qualifies"* beats
*"top right"*. A pill with no stated anchor is an unplaced pill.

Tap targets are **44×44 points** minimum, and spacing must prevent mis-taps — points, not pixels.

### Stage 4 — Resolve components and tokens

Map every element to an approved component at its level: Foundation, Omen composition, Campaign
module, or a Sanctioned exception that is documented and time-bounded. An element with no approved
component is a finding, not a licence to invent one.

Every colour is a **named semantic token**. No screen-level raw colours, ever. Where a team skin may
override the token, state the contrast floor that must survive the override. **Token drift is
reported, never silently resolved** — if the screen needs a token that does not exist, say so and
stop; do not approximate with a neighbour.

### Stage 5 — Write the words

Invoke `slops-ux-copy`. Every control, state and empty case gets its literal string:

- the CTA label, in the brand voice, saying exactly what happens when tapped;
- empty, loading, stale, disconnected, syncing, recovering, off-season and error copy;
- the error's cause **and** the next action.

**Status never hides.** Live, demo, mock, stale and unavailable are explicit in wording and
structure. Colour reinforces; it never carries the message alone. Honest mock/live labelling is
trust-critical and is always P0 — a screen whose contract does not say how mock data is labelled is
not designable, and the audit will fail it on axis 9 regardless of how it looks.

### Stage 6 — Emit the contract

Same shape as `slops-canvas-to-code` stage 1 and `slops-figma-to-native`, so downstream work is
source-agnostic. One row per element: block · surface level · component · tokens read · spacing
values · copy string · required states · platform delta (SwiftUI / Compose) · acceptance check.

## Output Contract

- **Screen contract** at `Blueprints/specs/mobile/screens/<screen>-contract-v<n>.md`, opted into
  `valor-brain/v1` with `authority: REVIEW_ONLY` until the founder ratifies it to `CANONICAL`.
- **Per-element acceptance checklist**, each line checkable by looking at a build.
- **Open questions** the specs do not answer — listed, never guessed.
- **Token and component gaps** — named, with what is missing.
- **Platform deltas** — where iOS and Android deliberately differ, and why.

## Verification

- Every spacing value is on the locked scale.
- Every colour is a named token; zero raw values.
- Exactly one block carries the decision, at surface level 4 or 5.
- Every interactive element states a tap target ≥ 44×44 points.
- Every control, state and empty case has a literal string — none deferred to the build agent.
- Mock/live labelling is stated explicitly.
- Every badge or chip states what it anchors to.
- Both platforms are addressed, or the contract states which is deferred and why.
- The contract validates: `node Blueprints/tools/valor-brain/validate.mjs`.
- Handing the contract to `slops-native-ui-audit` after the build produces findings that map to
  acceptance lines, not to unstated intent.

## Known spec conflicts — resolve, never assume

Read the source's own banner before citing it. Two live conflicts as of **2026-09-12**:

- `omen-native-design-house-v1.md` §8 names **DM Mono** for scores and numeric values. The
  one-typeface founder decision of **2026-09-07** retired DM Mono and superseded `W2-Typography`.
  The founder decision wins; the spec has not caught up. *(Falsified when §8 is amended.)*
- `omen-ux-ui-design-system-v1.md` is **partially superseded**. It is authoritative only for base
  palette hexes, dark-mode token names, and brand voice. Component APIs, tokens and state patterns
  belong to `component-lock-v1` and `team-theme-contract-v1`.

## Failure Modes

- **Composing before the decision is named.** Produces a pretty screen that buries its own point.
- **Spacing by feel.** "A bit more room" is unbuildable and unauditable. Name the rung.
- **Placing a pill in the gap.** Whitespace is not an anchor; the thing it qualifies is.
- **Deferring copy to the build agent.** Words written at build time are written without the voice
  doc open, and they are what the user actually reads.
- **Inventing a token to close a gap.** Report the gap. A silently approximated token is drift that
  ships.
- **Designing one platform and calling it done.** Both platforms ship the beta together.

## DBS Routing

Layer 0 skill; writes screen contracts into the target product's spec tree
(`slops-saloon/omen/Blueprints/specs/mobile/screens/`). It never edits app source, tokens, or the
locked component specs — a needed change to those is a finding routed through the loop.

## Prior Use Review Loop

After the first three real runs, write `notes/prior-use-review.md`: which stages produced findings
the audit later confirmed, which acceptance lines proved uncheckable in practice, and whether the
contract shape survived contact with the build agent unchanged.

## Changelog

- 0.1.0 — 2026-09-12. Authored to close the composing gap: every design skill in the library audits;
  none decides. Registered `draft` — it is promoted after its first real screen, not before.
