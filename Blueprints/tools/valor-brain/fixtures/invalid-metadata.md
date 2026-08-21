---
metadata_profile: valor-brain/v1
page_id: omen.ops.o2.rollback
page_type: operational-state
layer: L2
authority: REVIEW_ONLY
owner: Justin Duverge
state:
  task: APPLIED
relationships:
  requires: []
  enables: []
  checks_against: []
freshness:
  reviewed_on: 2026-08-20
  triggers:
    - O2 status changes
snapshot:
  repository: justinduverge-design/omen
  commit: 5cf3597
---

# Invalid metadata fixture

## Compiled truth

The task status is invalid and provenance sources are missing.

## Append-only timeline

- **2026-08-20:** The fixture was created.
