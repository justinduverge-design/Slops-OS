# Prior-use review — slops-founder-admin-runbook

No runs yet. `draft` until it has carried one real console sequence end to end.

## Record per run

| Date | Step | Reality vs. walkthrough | Lead time actual vs. estimated | Glossary gap hit at the screen |
|---|---|---|---|---|

## Authoring notes

- **This skill ships deliberately empty of requirements.** Structure only. Encoding store
  rules from training data is the failure mode it is built to prevent, so the first run
  researches every row live and stamps it.
- The state file lives in `Solutions/reports/` rather than this skill's folder so it is
  found where finished outputs live, and so the skill stays a workflow rather than a
  database.
- Open question: whether the state file should be per-release or one continuous document.
  Per-release is cleaner; continuous is what actually helps the second app. Unresolved.
