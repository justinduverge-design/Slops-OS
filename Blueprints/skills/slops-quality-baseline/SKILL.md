---
name: slops-quality-baseline
description: Slops-native code-health baseline and gate. Records the objective signals behind the definition-of-done — backend test count, npm audit level, frontend build, git diff --check — as a comparable baseline, then gates merges/deploys against it so quality can only hold or improve (ratchet). Use to "record a quality baseline", "check for regressions", "is this safe to merge/deploy", or before a release. Replaces external baseline tooling (e.g. impeccable). Measures and reports; Justin approves deploy. Never edits app code to force a pass.
---

# Slops Quality Baseline Skill

## Purpose

Turn the definition-of-done's pass/fail boxes into a **measured, comparable, non-regressing**
baseline. `definition-of-done.md` says tests pass, build is clean, and there are no new
vulnerabilities; this skill records the actual numbers and enforces that they only hold or improve.
It is the evidence layer beneath the self-check and the gate beneath a deploy. Replaces external
"baseline" artifacts (e.g. `impeccable_baseline.json`) with a Slops-owned, in-repo equivalent.

## When To Use

- Recording or refreshing a code-health baseline for a product repo.
- Checking a candidate (branch/PR) for regressions before merge.
- A pre-deploy gate: "is this safe to ship?"
- After a green build, to ratchet the baseline up.

## When Not To Use

- To deploy — deploy stays a Justin gate.
- To "fix" a failing check by weakening tests, lint, or audit thresholds, or by editing app code
  purely to make the gate pass. A failure is a signal to report, not to silence.

## Required Inputs To Review

- The target product repo and its `Blueprints/definition-of-done.md`.
- The existing baseline file if one exists (`Blueprints/quality/baseline.json`).

## Signals (from definition-of-done §2)

- Backend `npm test` — passing/total count.
- `npm audit --audit-level=moderate` — count of advisories at/above moderate.
- Frontend `npm --prefix frontend run build` — clean / fails.
- `git diff --check` — clean / has whitespace or conflict markers.
- (Optional context: commit SHA, date, node version.)

## Steps — Snapshot mode

1. Run all signals above; capture exact results.
2. Record them with the commit SHA and date into `Blueprints/quality/baseline.json`, with a short
   human-readable `Blueprints/quality/baseline.md` summary.

## Steps — Gate mode

3. Run the same signals on the candidate.
4. Compare to baseline:
   - test count **>=** baseline (a drop = regression),
   - **no new** audit advisories at/above the threshold,
   - build clean,
   - `git diff --check` clean.
5. **PASS** -> optionally ratchet the baseline up (record the better numbers). **FAIL** -> report
   exactly which signal regressed and by how much; the item is not done and must not be deployed.

## Ratchet Rule

The baseline only moves up — more tests passing, fewer vulnerabilities. A decrease is a regression
to explain and fix, never a silent new baseline.

## Output

A baseline file plus a plain pass/fail report naming any regressions. No deploy, no code changes.

## Where To Store Outputs

- `Blueprints/quality/baseline.json` (machine) and `Blueprints/quality/baseline.md` (human) in the
  target product repo. Do **not** reuse the retired `impeccable_baseline.json` name or location.

## Safety Rules

- Measure and report only; never deploy.
- Never weaken tests/lint/audit thresholds or edit app code to force a pass.
- Never touch secrets, `.env`, migrations, or production.
- Treat any regression as a stop-and-report, not a new normal.

## Change Log

- 2026-06-08: Created as the Slops-native replacement for external quality-baseline tooling,
  derived from `definition-of-done.md` and the deploy gates.
