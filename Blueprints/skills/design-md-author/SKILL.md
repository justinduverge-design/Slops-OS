---
name: design-md-author
description: Create, critique, normalize, and improve design.md files (Google DESIGN.md-format visual contracts) for Slops OS products. Use when Justin asks to create or update a design.md, convert brand/UX/team-identity doctrine into a design contract, or prepare Claude, Codex, Gemini, Cursor, or Stitch to generate brand-consistent UI. Do not use for full design systems, production UI code, or agent role files.
status: active
skill_type: package
layer: 0
default_agent: Claude first, Codex if writing files
trigger: create a design.md | review a design.md | design.md for <product> | design contract | AI design tokens
version: 1.2.0
upstream: none — references google-labs-code/design.md spec as reference material, not vendored
owner: Justin
---

# Design.md Authoring

## Purpose

Author and improve `design.md` files: reusable, machine-readable visual contracts that give Claude, Codex, Gemini, Cursor, Stitch, or local models enough design context to generate brand-consistent UI without re-reading every brand, UX, or Figma reference each session.

This skill authors the design contract. It does not build the UI itself, and it does not decide new brand direction — it compiles decisions that already exist (or are being made live with Justin) into the DESIGN.md shape.

## When to Use

- Create a new `design.md` for a Slops product.
- Edit or extend an existing `design.md`.
- Convert brand doctrine, a UX/UI design-system spec, or a team/entity identity audit into a design contract.
- Add or tighten negative constraints ("don'ts") to reduce generic AI-generated UI.
- Decide whether a product needs one `design.md` or a root file plus a companion per-entity data file (see `references/design-md-format-notes.md` §Multi-entity split).
- Critique an existing `design.md` for missing sections, uncited color values, or drift from source doctrine.

## Do Not Use

- Build production UI code or modify app components directly.
- Create a full design system from scratch (`slops-design-system-pack` and `slops-ui-ux-audit` own that ground) unless Justin explicitly asks this skill to.
- Create Figma files.
- Extract or reproduce a proprietary third-party brand system verbatim — summarize and cite, never copy licensed prose or code wholesale (see Boundaries).
- Add licensed font files.
- Configure CI/CD design linting.
- Wire up the Google `design.md` CLI toolkit (lint/diff/token-export automation) — reference-only until Justin explicitly approves adopting it as a wrapper skill.
- Add Stitch, Banani, or Figma live-sync workflows.
- Create agent role files or assign RBAC authority — use the agent-authoring skills.
- Replace feature specs, product specs, or implementation handoffs.

## Required Inputs

- The product and scope (whole product, one entity family like "32 teams," or a single page/component system).
- Existing brand/voice doctrine (e.g. `brand-system.md`-equivalent) if present.
- Existing UI/UX design-system spec, if present, for global tokens (color, type, spacing, components).
- Any per-entity identity data already audited (team/city/market identity tables, palette audits, motif specs) — this skill compiles, it does not re-derive fan-perceived colors or cultural anchors from scratch.
- Known open defects in current production values, so the contract encodes the corrected target, not a live bug.
- **The entity's existing live/shipped identity data, if any** (e.g. Omen's `frontend/src/data/nflTeams.js` per-team `palettes` array) — required whenever this skill is drafting or updating an entity that already has a shipped theming/identity implementation. Not optional and not deferred to a separate audit; see Process Recipe step 4a.

## Preconditions & Dependencies

- Runtime dependencies: none. Pure markdown/YAML authoring.
- Canonical root: `Blueprints/skills/design-md-author/`.
- Reference material: `references/design-md-format-notes.md` (this skill's package folder) — condensed notes on the Google Labs DESIGN.md spec shape, sourced from a 2026-07-08 research pull. Read before drafting a new file; skip if only editing an existing file that already follows the shape.
- **Sibling skill dependency:** `design-quality-bar` (`Blueprints/skills/design-quality-bar/`) — the mandatory self-critique rubric run at the end of every Process Recipe pass (step 7). Not optional, not folded into this skill's own files — read its `SKILL.md` and `references/vibe-coded-smells.md` before the first draft of a session.
- The Google `design.md` CLI toolkit is a detect-not-install external tool, out of scope for this skill (see Do Not Use). If Justin approves adopting it later, that becomes a separate `skill_type: wrapper` skill.

## Read-First Procedure

1. Read the user's request and identify product + scope.
2. Read `references/design-md-format-notes.md` for the target shape if drafting new.
3. Read the product's existing brand/UX doctrine and any per-entity identity audits (least privilege — only the files that feed this design.md).
4. Check whether a `design.md` already exists at the product root; if so, treat it as the base to edit, not to replace wholesale.
5. Note any known defects or pending fixes in source data so they aren't silently promoted into the contract.
6. **Check whether the entity already has a live/shipped identity implementation** (e.g. `nflTeams.js` for an Omen team pass) and read its current value for this entity before drafting — this is the reconciliation source for Process Recipe step 4a.

## Process Recipe

1. Confirm scope: whole-product contract, or one entity family (team/city/market) layered onto an existing contract.
2. Decide single-file vs. split-file (root `design.md` + companion data file) when the entity count is large enough to bloat single-file context — see `references/design-md-format-notes.md` §Multi-entity split. Flag the decision to Justin if it's not obvious; don't default silently.
3. Draft sections in the standard two-layer shape — YAML front matter for machine-readable tokens (hex values, type scale, spacing), Markdown prose for the human rationale behind each choice:
   - **Brand** — voice/character in UI terms, condensed from source doctrine, not the full doc.
   - **Color** — global palette, plus per-entity overrides where applicable. Every token cites its source (official brand hex, or a named cultural anchor with its own citation) — never an invented value.
   - **Type** — font lock and scale.
   - **Components** — core component rules, cross-referenced to the product's UX/UI spec rather than duplicated.
   - **Accessibility** — hard minimums (e.g. WCAG AA contrast ratios), not soft guidance. State them as constraints an agent must satisfy, not suggestions.
   - **Guardrails / Don'ts** — explicit negative constraints. This is the highest-leverage section; do not skip it. Include trademark or licensing limits when the product borrows cultural/visual references.
   - Product-specific extension sections (e.g. motif/ornament grammar) only when the product already has doctrine for them — don't invent new categories.
4. Where source data has open defects (colors under review, known contrast failures), mark that entry `status: pending-fix` with the corrected target noted, rather than encoding the current broken value as doctrine.
4a. **Reconcile against the entity's live/shipped identity data (Required Inputs), when one exists.** Compare the new draft's tokens and cultural anchor against what's actually in production for that entity. Three outcomes, and the draft must say which one applies, per entity:
   - **Duplicate/low-effort match** — the live alternate skin is the same colors as the primary skin (e.g. identical hex values with primary/secondary swapped) or otherwise adds no real distinction. The new research supersedes it; note in the draft that this replaces a duplicate, not an equally-valid alternative.
   - **Substantive match** — the live value already reflects genuine, cited research (not just an old value that happens not to conflict). Note the alignment; don't re-derive from scratch.
   - **Genuine conflict** — the live value and the new research name two different, both-plausible anchors for the same entity (e.g. two different real historical/cultural facts). This is not this skill's call to silently resolve — flag it explicitly as an open question and route it to Justin the same way an ungrounded Region Test claim would be (see `design-quality-bar` soft-fail #9). Do not overwrite the live value in the draft until it's resolved.
   This reconciliation happens inside the same per-entity authoring pass — it is not a separate standalone audit step, so it does not block or defer the rest of this entity's draft.
5. Place the file at the product repo root (`design.md`) so agents discover it the way they discover `CLAUDE.md`/`AGENTS.md`. Companion data files, if used, live alongside it in a `design/` folder at the same root.
6. Run the pruning pass: no invented tokens, no stale doctrine carried forward, no unrelated sections.
7. **Run the `design-quality-bar` rubric against the draft before returning it.** All 10 checks, pass/fail per item — do not skip this even for a small edit. Any hard fail (uncited token, toothless Guardrails section, re-encoded known defect, unverified cultural anchor, copied vendored system) means another pass, not a handoff.
8. Report source files used, sections drafted, quality-bar verdict (ready / needs another pass, with soft-fail count), open questions, and the next safe step.

## Output Contract

- Target path: product root `design.md` (plus companion data file path if split).
- Sections included and which source doc fed each.
- Every color/type token traced to a citation (official brand source or named cultural anchor).
- Explicit list of what was intentionally excluded or left as an open question for Justin.
- Next safe step (e.g. "ready to draft," "needs Justin's split-file call first," "source defect X must be fixed before this token locks").

## Verification

- **Smoke test:** the file parses as valid YAML front matter + Markdown body; every declared color/type token has a traceable source in the prose beside it.
- **Success signal:** a Guardrails/Don'ts section is present and non-empty; no token in the file lacks a citation; the file lives at the product root; `design-quality-bar` returns zero hard fails.
- **Escalation:** for a product-wide contract touching many entities (30+), confirm the single-file-vs-split decision with Justin before writing — don't self-resolve silently. If a draft fails the same `design-quality-bar` hard-fail category three revisions in a row, stop and flag that the source doctrine may be incomplete rather than continuing to redraft.

## DBS Routing

- The `design.md` file itself: product repo root (outside the `Blueprints/` tree — it's a runtime artifact agents read directly, like `CLAUDE.md`).
- Planning/compilation notes before drafting: `Blueprints/specs/` (product layer) or `Direction/reviews/` (source-mapping audits).
- This skill's own reference material: `Blueprints/skills/design-md-author/references/`.

## Boundaries

- Skills author workflows, not UI. This skill never edits app source.
- Do not grant design authority to an agent role — that's `slops-agent-author` territory.
- Do not reproduce a third-party brand system's proprietary assets or licensed prose verbatim; summarize with citation (same sovereignty rule `slops-design-system-pack` follows).
- Do not wire CLI automation, linting, or live-sync tooling without a separate approved wrapper skill.

## Failure Modes

- Inventing a color or type value with no citation.
- Encoding a known production defect as the target state instead of marking it `pending-fix`.
- Defaulting to a single bloated file for a large entity set without flagging the split-file question to Justin.
- Skipping the Guardrails/Don'ts section.
- Copying a competitor's DESIGN.md content verbatim instead of citing and adapting.
- Treating this skill as authority to decide new brand direction rather than compile existing doctrine.

## Prior-Use Review Loop

No prior-use notes yet. First full-template pass was informed by a live compilation exercise for Omen's 32-team identity system (`slops-saloon/omen/Blueprints/specs/design-md-plan.md`, 2026-07-08) — treat that file as a worked example of the Process Recipe, not as doctrine to copy into other products.

## Changelog

- 1.2.0 — Added mandatory reconciliation against the entity's live/shipped identity implementation (Required Inputs + Read-First step 6 + Process Recipe step 4a). Prompted by discovering, during a D4 review of Omen's 3-team pilot, that the pilot's `design.md`/`design/teams.yaml` had never been checked against `frontend/src/data/nflTeams.js`'s existing "Special" palettes — two of three pilot teams (Eagles, Cowboys) turned out to name a genuinely different cultural anchor than what was already shipped, and Cowboys' shipped "Special" was found to be a duplicate of Official (same two hex values, primary/secondary swapped). Reconciliation is folded into each entity's own authoring pass rather than run as a separate standalone audit, per Justin's direction.
- 1.1.0 — Wired `design-quality-bar` (new standalone sibling skill) into the Process Recipe as a mandatory step-7 self-critique gate before any draft returns to Justin. Added it to Preconditions & Dependencies and to the Verification success signal/escalation rule.
- 1.0.0 — Normalized from stub (frontmatter had only `name`/`description`) to full template shape: added status/skill_type/layer/default_agent/trigger/version/owner, Required Inputs, Preconditions, Read-First Procedure, Process Recipe, Output Contract, Verification, DBS Routing, Failure Modes, Prior-Use Review, Changelog. Added `references/design-md-format-notes.md` package folder summarizing the Google Labs DESIGN.md spec shape and multi-entity split-file guidance, sourced from 2026-07-08 research and the Omen team-identity compilation exercise.
- 0.1.0 — Initial stub (name + description + Purpose/When to Use/Do Not Use only; undated).
