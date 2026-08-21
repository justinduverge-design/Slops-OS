# Valor Brain Bundle Adoption Review

**Status:** REVIEW / PARTIAL ADOPTION

**Reviewed:** 2026-08-20

**Source SHA-256:** `701D8AE63399F7D3CE46543C241FC7E9EEADACF03E12BD6A8FBCEC9195C23964`

## Outcome

The bundle contains strong, useful work, but it is not safe to copy into the repositories wholesale.

The core idea is worth keeping: give agents deterministic filing rules, preserve source-backed history, and distinguish resolved work from named uncertainty. The draft combines useful concepts from Interpretable Context Methodology (ICM), Google Cloud's Open Knowledge Format (OKF), Garry Tan's gstack/gbrain work, and Matt Pocock's domain-modeling and wayfinder workflows instead of proposing a blind install.

The bundle also crosses current SLOPS authority boundaries in several places. Its proposed resolver taxonomy, schema, skills, unified kickoff, and Omen checker are therefore parked as review evidence rather than activated.

## Adopted Now

### Layer 2 boundary improvements

`Blueprints/agent-modules/layer-2-rules.md` was updated with bundle-derived improvements that current repo truth already supports:

- Native SwiftUI and Kotlin/Compose are the primary surfaces.
- New web-only page work remains paused.
- Omen remains free indefinitely.
- Omen must work as a standalone repository and in CI.
- Store actions, credentials, production, package, migration, and deployment boundaries are explicit.
- Mock/live and ESPN-cookie truth rules are explicit.

The runtime-specific lane wording from the bundle was not retained because current authority is capability- and assignment-based, not vendor-based.

### Stale kickoff-module description

`Blueprints/RESOURCES_INDEX.md` was corrected. The five files under `Blueprints/prompts/kickoff-modules/` exist, but the current layer kickoffs do not import them. They are now described as legacy review material, not live wiring.

### Original bundle preservation

The original ZIP is preserved at:

`Archive/parked/2026-08-20-valor-brain-bundle/valor-brain-bundle_1.zip`

It remains non-authoritative. The archive preserves the full proposal and session record without turning placement into approval.

## Parked — Good Direction, Not Yet Authority

### `RESOLVER.md` and `brain-glossary.md` bundle proposals

The resolver pattern is sound, and the vocabulary work is valuable. It is not ready to become live L0 doctrine because:

- The glossary says `type` is metadata independent of physical DBS placement, while `RESOLVER.md` sends every typed page to `Direction/state/`.
- `founder` is explicitly unresolved but is included as a valid live type.
- `checks` claims to replace AAA, while current SLOPS routing still treats the AAA gate as active.
- `Direction/state/` and `Direction/maps/` are new structural commitments during an unresolved DBS vNext review.
- The draft has no first real pilot page proving the resolver creates less drift than the current system.

Recommended gate: ratify the vocabulary and run one review-only pilot page before creating new canonical folders.

### `brain-page.schema.json` bundle proposal

The schema uses JSON Schema Draft 2020-12 correctly at a basic structural level, but its semantics are not ratified:

- `status: draft|active|blocked|done|retired` conflicts with the canonical SLOPS task status model (`READY → IN_PROGRESS → VERIFIED → CLOSED`).
- `risk_tier: low|medium|high` creates a second risk vocabulary beside the existing Action Risk Tiers.
- Only `type` is required even though the proposed checker also depends on `last_reviewed`.
- The schema is not wired to a validator and has no fixtures or negative tests.

Recommended gate: decide whether brain-page metadata needs distinct field names, then validate a pilot corpus before registering a schema.

### `slops-domain-modeling` and `slops-wayfinder`

Both concepts are promising. Neither draft meets the current SLOPS skill activation contract:

- Both declare `status: active` before routing, lifecycle registration, trial evidence, or founder activation.
- Both say they are forks while declaring `upstream: none`; the exact upstream path/version and MIT attribution are required.
- Required sections are missing or incomplete: preconditions, read-first procedure, verification/success signal, failure modes, prior-use loop, and semantic changelog.
- `slops-wayfinder` points at L0 `Direction/current_sprint.md`, which is not the current L0 queue, and overlaps `planning-pass` without a tested boundary.
- The upstream wayfinder is a decision-ticket map, not a general backlog replacement. The draft needs to preserve that boundary.

Recommended gate: keep these as one bounded pilot proposal until a real use proves whether one or two skills are warranted.

## Rejected As Direct Replacements

### Unified `Blueprints/prompts/kickoff.md`

Do not adopt this bundle version.

- Omen's standalone clone and CI cannot rely on an L0-only kickoff.
- Current Omen facts explicitly name its local status mirror and `kickoff-l2.md` as the operative standalone flow.
- The bundle updates three `CLAUDE.md` files but leaves `AGENTS.md`, Omen `AGENT.md`, prompt READMEs, setup docs, facts, known issues, and handoffs pointing at the current kickoffs.
- It claims the old kickoffs are archived before the archive/migration has happened.
- The L2 rules path in the unified table is not valid from every checkout shape.

A future consolidation must preserve a local L2 entry point and migrate every live inbound reference atomically.

### `resolver-conformance.js`

Do not copy this checker into Omen.

- The named `scripts/check-sprint-staleness.js` harness and `scripts/checks/README.md` do not exist in current Omen.
- It runs relative to the Omen repo while the proposed pages live at L0, so it checks the wrong tree.
- It duplicates the schema enum by hand.
- It scans only top-level Markdown files, has no fixtures, accepts JavaScript date normalization, and does not flag future review dates.
- Its 90-day threshold is explicitly a placeholder, not a decision.

Any future validator belongs with the eventual canonical page corpus and should be derived from one schema source.

### Full-file `CLAUDE.md` replacements

Do not overwrite current files. Apply small, source-backed patches only after the underlying doctrine is ratified. The bundle's Omen replacement also contains an unrecorded 2026-08-14 Draft Assistant marketing exception that is absent from current facts and decision logs.

## Upstream Verification

- ICM's paper is *Interpretable Context Methodology: Folder Structure as Agentic Architecture* by Jake Van Clief and David McDermott: https://arxiv.org/abs/2603.16021
- Google Cloud's OKF specification defines a portable Markdown-and-YAML-frontmatter knowledge format for people and agents: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
- The supplied presentation is Garry Tan's *Every company should have a Brain*: https://www.youtube.com/watch?v=eBUyTS7SzV4
- GBrain's recommended schema uses a top-level `RESOLVER.md`, directory-local distinctions, and an inbox when nothing fits: https://github.com/garrytan/gbrain/blob/master/docs/GBRAIN_RECOMMENDED_SCHEMA.md
- GBrain is MIT licensed: https://github.com/garrytan/gbrain/blob/master/LICENSE
- Matt Pocock's domain-modeling workflow sharpens ubiquitous language against concrete scenarios: https://github.com/mattpocock/skills/blob/main/docs/engineering/domain-modeling.md
- Matt Pocock's wayfinder is for large, foggy efforts represented as decision tickets; it is upstream of specification/build tickets: https://github.com/mattpocock/skills/blob/main/docs/engineering/wayfinder.md
- Matt Pocock's skills repository is MIT licensed: https://github.com/mattpocock/skills/blob/main/LICENSE

## Founder follow-up — wrapper and kickoff naming cleanup

Justin subsequently approved a narrower cleanup that preserves standalone repositories:

- Each layer keeps its own locally valid `Blueprints/prompts/kickoff.md`.
- The `kickoff-l0.md`, `kickoff-l1.md`, and `kickoff-l2.md` filenames are retired.
- The bundle's single cross-repository kickoff is still not adopted; its broken standalone-Omen path assumptions remain rejected.
- `AGENTS.md` is the shared bootstrap, `CLAUDE.md` is the Claude adapter, and Omen's redundant singular `AGENT.md` is removed after useful safety and close-out rules are absorbed.

## Smallest Safe Next Step

Run one founder-reviewed pilot using a single existing Omen concept, without creating `Direction/state/`, changing kickoff authority, registering new skills, or adding automation. The pilot should answer:

1. Does the resolver reduce ambiguity compared with current DBS routing?
2. Can the page use current status/risk authority without inventing parallel vocabularies?
3. Does domain modeling need a reusable skill, or is it a procedure inside the pilot?
4. Does wayfinder add a distinct decision-map capability beyond `planning-pass`?
5. Which current quality gate, if any, is actually superseded?

Only after that evidence should the resolver, schema, skill packages, routing rows, lifecycle rows, or checker become active.
