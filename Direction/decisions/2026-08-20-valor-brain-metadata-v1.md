---
metadata_profile: valor-brain/v1
page_id: slops.os.valor-brain.metadata-v1
page_type: architecture-decision
layer: L0
authority: CANONICAL
owner: Justin Duverge
state:
  decision: RATIFIED
  rollout: LIMITED
sources:
  - Direction/reviews/2026-08-20-valor-brain-bundle-review.md
  - Blueprints/specs/slops-os-markdown.spec.md
  - Blueprints/agent-modules/status-model.md
relationships:
  requires:
    - omen.ops.o2.rollback
  enables:
    - valor-brain-schema-validation
    - valor-brain-l0-l1-l2-adoption
  checks_against:
    - Blueprints/tools/truth-gate/README.md
    - Blueprints/specs/slops-os-dbs-routing-and-skill-creation.spec.md
freshness:
  reviewed_on: 2026-08-20
  triggers:
    - metadata profile version changes
    - DBS layer routing changes
    - status model vocabulary changes
    - validator behavior changes
snapshot:
  repository: justinduverge-design/Slops-OS
  commit: 85f54d8
  compiled_by: Codex
---

# Decision — ratify Valor Brain metadata v1 as a limited cross-layer contract

## Compiled truth

Valor Brain metadata v1 is ratified for explicit opt-in pages across SLOPS L0, Slops Saloon L1, and Omen L2.

This is a limited activation:

- L0 owns the canonical profile, schema, validator, and cross-layer resolver rules.
- L1 uses the L0 package because it is part of the same repository.
- L2 carries byte-identical local schema and validator mirrors so a standalone Omen clone remains valid.
- Physical DBS placement continues to follow the page's purpose. Metadata never creates a parallel `Direction/state/` tree.
- Existing task status authority remains unchanged. The profile may reflect `READY`, `IN_PROGRESS`, `VERIFIED`, or `CLOSED`; it does not define transitions or closure evidence.
- Only Markdown pages declaring `metadata_profile: valor-brain/v1` are governed by the profile.

The first O2 pilot demonstrated the value of independent state dimensions: the deploy change advanced to `APPLIED` while O2 stayed `IN_PROGRESS` and the founder exercise stayed `NOT_RUN`.

## Decision

Build and enforce the smallest portable contract:

1. Canonical Markdown specification.
2. Draft 2020-12 JSON Schema.
3. Zero-dependency schema-driven validator.
4. Positive and negative fixtures.
5. Truth Gate integration for opted-in pages.
6. Layer-local resolver entry points.

Do not activate automatic rewriting, whole-corpus conversion, new state folders, Graphify ingestion, or a new reusable skill in v1.

## Authority boundary

- `CANONICAL` pages are ratified authority within their declared scope.
- `COMPILED` pages are derived; their named sources win on conflict.
- `REVIEW_ONLY` pages are evidence and evaluation, not doctrine.
- `REFERENCE_ONLY` pages are non-authoritative context.

L0 controls the profile contract. Each layer controls its own product or division truth. A cross-layer metadata profile does not let L0 overwrite Omen product facts or let an L2 page redefine L0 doctrine.

## Append-only timeline

- **2026-08-20:** The Valor Brain bundle review approved one bounded Omen pilot before schema or resolver activation.
- **2026-08-20:** The O2 pilot completed one real state transition without conflating task, change, and exercise state.
- **2026-08-20:** Justin approved continuing across all three layers; metadata v1 entered limited ratified rollout.
