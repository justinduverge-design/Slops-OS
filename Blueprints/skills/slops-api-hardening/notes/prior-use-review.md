# Prior-use review — slops-api-hardening

No runs yet. `draft` until one route has been scored and re-scored after a fix.

| Date | Scope | Axis hardest to score | Finding that predicted a real incident | Fix that did not move the number |
|---|---|---|---|---|

## Authoring notes

- Omen's first natural scope is the three hot routes that already have rate limits and a
  load rehearsal (`S3`, `O4`) — recorded evidence exists there, so fewer axes land on
  `UNMEASURED` and the rubric gets a fair first calibration.
- `UNMEASURED` is deliberately a 0, not a blank. A blank invites optimism.
- Axis 7 (degradation) overlaps Omen's mock/live labeling work. If that overlap turns out
  to be total, cut axis 7 and cite the labeling gate instead of scoring it twice.
