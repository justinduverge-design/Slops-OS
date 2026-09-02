---
name: slops-native-ui-audit
description: Audit a native iOS SwiftUI or Android Compose screen against the native design specs and platform accessibility standards — tap targets, Dynamic Type and font scale, VoiceOver and TalkBack, contrast under team-skin token overrides, reduce-motion, dark mode, and honest mock/live labeling. Use for a native screen review, design QA before handoff, or an app-wide accessibility sweep. The native counterpart to slops-ui-ux-audit, which targets the web app and a partially superseded spec. Produces severity-ranked findings; it does not edit app code.
status: draft
skill_type: simple
layer: 0
default_agent: Claude audits; fixes become loop items
trigger: "native ui audit | is this native screen ready | accessibility pass | voiceover talkback check | native design QA"
version: 0.1.0
upstream: none
owner: Justin
---

# Slops Native UI Audit

## Purpose

`slops-ui-ux-audit` audits against `omen-ux-ui-design-system-v1.md` — a spec Omen's own `CLAUDE.md`
marks **partially superseded**. Its checks are web checks: ARIA, WCAG on a page, 44 *pixels*.
Native has different authorities, different accessibility APIs, and different units.

This audits native screens against the specs that actually govern them, so a native screen stops
being reviewed with web instruments.

## When to Use

- Reviewing a native screen or component before handoff.
- An app-wide accessibility sweep across both native apps.
- After a design-system or team-theme change, to check what it broke.
- Checking a screen's honesty about mock, demo, stale, or unavailable data.

## Do Not Use

- For the web app — `slops-ui-ux-audit`.
- To edit app code. This reviews; fixes become loop items.
- To redesign, or to resolve a design-system gap. A missing component is a founder decision via
  `slops-intent-capture`.
- To check a screen against its artboard — that is `slops-canvas-to-code` stage 3. **This asks
  whether the screen is good; that asks whether it matches.** Both are needed and they are not the
  same question.

## Required Inputs

- The screen or component, by path, on each platform.
- The native design authorities: `omen-native-design-house-v1.md`, `component-lock-v1.md`,
  `team-theme-contract-v1.md`.
- `Brand/brand-system.md` for voice and the AAA framework.
- Screenshots and, where available, the accessibility tree — from `slops-native-sim-drive`.

## Preconditions and Dependencies

Read-only source access. No runtime.

Screenshots make this audit far stronger; without them it is **source-only** and must say so. A
source-only audit can find a missing accessibility label; it cannot find a contrast failure that
only appears under a particular team skin.

## Read-First Procedure

1. The screen source on both platforms — **both, always.** Parity failures are the most common
   native finding and are invisible from one side.
2. The three native specs, only the sections this screen touches.
3. `Brand/brand-system.md` for voice and AAA.
4. Screenshots and accessibility trees, if captured.
5. Not the whole design system.

## The audit axes

| # | Axis | What passes |
|---|---|---|
| 1 | **Tap targets** | Every interactive element ≥ 44×44 **points** (not pixels). Spacing prevents mis-taps. |
| 2 | **Dynamic Type / font scale** | Holds to the largest supported setting with no clipping, no truncated meaning, no overlap. Layout reflows rather than compressing. |
| 3 | **Screen readers** | VoiceOver and TalkBack traverse every primary flow in a sensible order. Every control has a meaningful label — not "button". No focus trap. State changes are announced. |
| 4 | **Contrast** | WCAG AA in light and dark **and under every team skin the theme contract permits.** A skin that can override a token can break contrast; the contract's bounds are the test. |
| 5 | **Reduce motion** | Honoured. No motion-dependent meaning. |
| 6 | **Dark mode** | Every token defined. No borrowed system default standing in for an undefined token. |
| 7 | **Component fidelity** | Uses locked components and tokens. No hardcoded values where a token exists. Off-lock usage is a finding. |
| 8 | **State completeness** | Default, loading, empty, error, offline, and disabled all designed and reachable. |
| 9 | **Honest labeling** | Mock, demo, stale, unverified, and unavailable data is visibly labeled and can never read as live advice. |
| 10 | **Platform parity** | iOS and Android deliver the same capability, each idiomatic to its platform. Divergence is deliberate and recorded, or it is a finding. |
| 11 | **Voice** | Copy matches `brand-system.md`. Errors say what happened and what to do next. |

**Axis 9 is trust-critical and outranks everything else.** Mislabeled mock output presented as live
fantasy advice is the one defect that costs credibility permanently. Any failure there is P0
regardless of the rest of the audit.

## Process Recipe

1. Scope one screen, or one axis app-wide. Not both at once.
2. Read both platforms.
3. Walk every axis. Cite a file and line, or a screenshot region.
4. Rank: P0 blocker, P1 ship-with-caveat, P2 polish. Axis 9 failures are always P0.
5. For each finding, name the smallest fix and the spec clause it satisfies.
6. State what could not be audited from source alone, and what evidence would settle it.
7. Route design-system gaps to the founder rather than resolving them.

## Output Contract

`Direction/reviews/YYYY-MM-DD-<screen>-native-ui-audit.md`: axis-by-axis results per platform,
severity-ranked findings with proposed fixes and their spec clause, unauditable items with the
evidence needed, and what was deliberately not audited.

## Verification

- **Smoke test:** audit one screen; every P0 must cite either a source line or a screenshot region.
- **Success signal:** every axis carries a result for **both** platforms, or an explicit reason it
  does not apply. A one-platform audit reporting as complete is a defect in the audit.
- Axis 3 (screen readers) cannot be fully proven from source. **A source-only pass on axis 3 is
  `PARTIAL`, never `PASS`** — human traversal remains required, as `F11` already assumes.

## DBS Routing

Reports → `Direction/reviews/`. Defects → `known_issues.md` or the sprint. Design-system gaps → an
intent. Accessibility findings feed the existing accessibility item rather than creating a parallel
track.

## Agent and RBAC Rules

Read-only. No app code edits, no design-system changes, no artboard edits. Recommends; the loop
implements.

## Failure Modes

- **Using web instruments on native** — pixels for points, ARIA for platform accessibility APIs,
  browser contrast tooling for a themed native surface. The whole reason this skill exists.
- Auditing one platform and reporting completeness.
- Passing axis 3 from source alone.
- Checking contrast only in the default theme, when the theme contract permits skin overrides.
- Treating a screen that matches its artboard as therefore good. Fidelity is not quality.
- Citing the superseded web design system.
- Ranking an axis 9 failure below a layout nit.
- Resolving a missing component instead of raising it.

## Prior Use Review Loop

`notes/prior-use-review.md`. Record: which axis found the most real defects, which needed a
screenshot to be findable at all, and any P0 that source-only review missed.

## Changelog

- 0.1.0 — initial. Eleven axes against the native specs; axis 9 designated trust-critical; axis 3
  cannot pass from source alone.
