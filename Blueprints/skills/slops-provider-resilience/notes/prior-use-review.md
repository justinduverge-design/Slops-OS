# Prior-use review — slops-provider-resilience

No runs yet. `draft` until one provider has been audited and a finding has been fixed.

| Date | Provider | Row that caught a real failure | UNKNOWN left unresolved | "Connected" that did not mean data flows |
|---|---|---|---|---|

## Authoring notes

- Start with Yahoo. It has the documented health-vs-data failure, so the matrix gets
  calibrated against a case with a known answer.
- ESPN is the highest-risk and the least documented; audit it once the matrix has been
  calibrated somewhere cheaper.
- Row 9 (boundary conditions) exists because of the clamped-week incident: an off-season
  `raw_week: -1` floored to `week: 1` was read as evidence the season had started, and
  that claim survived in a sprint item for a day after being withdrawn elsewhere. Provider
  and time boundaries produce plausible-looking wrong values, which is worse than errors.
- Open question: whether row 10 (silent cron failure) belongs here or in an ops runbook.
  It is provider-shaped but ops-owned. Kept here until it finds a better home.
