---
metadata_profile: valor-brain/v1
page_id: omen.ops.o2.rollback-body-invalid
page_type: operational-state
layer: L2
authority: REVIEW_ONLY
owner: Justin Duverge
state:
  task: IN_PROGRESS
sources:
  - Direction/current_sprint.md#o2
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

# Invalid body fixture

This page deliberately omits both required body sections.
