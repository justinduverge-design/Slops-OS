# SLOPS resolver

Use this file when an agent needs to decide where knowledge belongs, which source wins, or how an opted-in Valor Brain page is validated.

## Resolve the layer first

- Cross-layer operating doctrine, metadata contracts, skills, agents, and DBS rules → L0.
- Slops Saloon division strategy, brand custody, content, marketing, and future products → L1 under `slops-saloon/`.
- Omen product facts, code, tests, delivery, and operations → L2 in the standalone Omen repository.

## Resolve the physical path by purpose

- Accepted decision → `Direction/decisions/`
- Review, audit, or pilot → `Direction/reviews/`
- Implementation-neutral contract → `Blueprints/specs/`
- Runnable procedure → existing playbook, prompt, tool, or skill route
- Source research → `References/`
- Completed deliverable → `Solutions/`
- Superseded material → `Archive/` only when replacement is approved

Metadata never creates a folder. If no route fits, stop and use the current layer's inbox or decision process instead of inventing `Direction/state/`, `Direction/maps/`, or another taxonomy.

## Resolve Valor Brain pages

Only pages declaring `metadata_profile: valor-brain/v1` use the v1 contract.

1. Validate with `node Blueprints/tools/valor-brain/validate.mjs`.
2. Read `authority`, `sources`, named state dimensions, relationships, and freshness triggers.
3. `CANONICAL` is ratified authority for its declared scope.
4. For `COMPILED`, `REVIEW_ONLY`, and `REFERENCE_ONLY`, the named canonical sources win on conflict.
5. L0 owns the cross-layer metadata contract. L1 and L2 retain authority over their local facts.
6. A stale or invalid page is not silently repaired during unrelated work; report it or update it within the assigned scope.

Canonical contract: `Blueprints/specs/valor-brain-metadata-v1.md`.

## Graph boundary

Current Graphify outputs are stale and non-authoritative. They may aid discovery, but they do not resolve truth or freshness until their rebuild path is separately repaired and verified.
