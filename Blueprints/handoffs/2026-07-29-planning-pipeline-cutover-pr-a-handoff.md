# 2026-07-29 — Planning-pipeline cutover, PR A (L0 + L1)

**Branch:** `cutover/planning-pipeline` (cut from `origin/master`, commit `d25560c`)
**Exit state:** **NOT** `CUTOVER_PREPARED` — 2 of 12 gates fail. See Blockers.
**Workspace:** fresh clone at `C:/Users/JDuve/dev/_cutover-2026-07-29/slops-os`. The desktop
checkout at `C:/Users/JDuve/dev/SLOPS` was read only and never written to.

## Files updated

**Doctrine-extraction gate (§0.7) — done first, verified live before any archiving**

- `slops-saloon/AGENTS.md`, `slops-saloon/CLAUDE.md` — received the stay-vs-route decision
  table extracted from `slops-saloon/Direction/AGENTS.md` §5 (the only such table in the repo).

**Tier 0 corrections (§1)**

- `slops-saloon/Direction/facts-of-record.md` — L0 inherit path `../Direction/…` → `../../Direction/…`.
- `CLAUDE.md`, `AGENTS.md` — corrected the Omen-location claim: nested at `slops-saloon/omen/`
  but gitignored (`.gitignore:24`, verified as exactly `slops-saloon/omen/`).
- `Blueprints/prompts/kickoff-l0-claude.md`, `kickoff-l0-codex.md` — added required step 0
  (`slops-repo-inspector`); migrated PULL TASK and DONE & CLOSE off checkbox language.
- `slops-saloon/Blueprints/prompts/kickoff-l1-claude.md`, `kickoff-l1-codex.md` — added step 0;
  repointed the queue `Direction/TODO.md` → `Direction/current_sprint.md` at all five sites.

**Retired-mechanic sites (§2)**

- `Blueprints/prompts/kickoff-modules/pull-task.md` — 5-unchecked-items pull → `Status: READY`
  selection by the selection rule; `Blocked by [ ]` → `Blocked by:` types.
- `Blueprints/prompts/kickoff-modules/done-and-close.md` — tick-the-box → `Status: VERIFIED` + `Evidence:`.
- `Blueprints/skills/planning-pass/SKILL.md` — **the generator.** No longer emits
  `- [ ] **P{n}…**`; emits the status-model field block. Change-log entry added.

**New doctrine (§5) and scaffolding (§6)**

- `Blueprints/agent-modules/status-model.md` — **new.** The §5 status model, verbatim in
  substance. The spec defined the model but named no file; placed with the other agent-modules,
  which is where every layer's wrapper already routes. Flag if you want it elsewhere.
- `Direction/CUTOVER_STATE.md` — **new, inactive scaffolding.** `STATE: NONE`.

**Read-first modules (§4.2)**

- `files-to-read-first-L0.md` — item 0 (repo truth), step 0.5 (CUTOVER_STATE), status-model
  entry, `SLOPS_LIFECYCLE.md` added read-when-relevant.
- `files-to-read-first-L1.md` — item 0, step 0.5, and **now names its queue**
  (`Direction/current_sprint.md`); `TODO.md` deliberately absent.
- `files-to-read-first-L2.md` — item 0, step 0.5, item 4 → select by `Status: READY`, record
  the claim in `agent_inbox.md`.

**Queues (§4.1, §4.4-L1, §4.6)**

- `Direction/TODO.md` — migrated to the status model as 4 tasks (OS1–OS4). Deleted the six
  named lines and the whole `## Blocked Without Justin Approval` section (its "Git commit or
  push" line directly contradicted `action-posture.md`). Line 18 confirmed-then-deleted:
  `Solutions/.codex-artifacts/` is gitignored at `.gitignore:27` with 0 tracked files, so the
  question it asked is answered. `## Parked` kept. Removals recorded with rationale in-file.
- `slops-saloon/Direction/current_sprint.md` — migrated: **4 READY / 0 IN_PROGRESS /
  0 VERIFIED / 3 CLOSED-COMPLETED = 7**, matching the approved L1 counts exactly.
- `slops-saloon/Direction/sprints_completed.md` — **new.** CP1/CP2/CP3 rows; all three
  evidence paths verified present on disk before being written as evidence.
- `Direction/00_FINAL_PLAN.md` — historical banner only. `context.md`, `roadmap.md`,
  `manifesto.md`, root `README.md` deliberately untouched.

**Archive (§3)** — 8 artifacts moved by `git mv`; git recorded all as pure renames (`R`).

- L0 → the `2026-07-29-pre-status-model` archive root: `Direction/CLAUDE.md`,
  `Direction/AGENTS.md`, `Blueprints/workflows/{CLAUDE,AGENT}.md` (renamed `.archived.md`), and
  `Blueprints/workflows/README.md` (name preserved). `Blueprints/workflows/` retires entirely.
- L1 → the L1 `2026-07-29-pre-status-model` archive root:
  `Direction/{CLAUDE,AGENTS}.md` (renamed inert) and `Direction/TODO.md` (name preserved).
- `MANIFEST.md` at both archive roots; one index line added to each `Archive/README.md`.

## Files discussed (read, not changed)

`Direction/reviews/2026-07-28-planning-architecture-audit.md` and
`2026-07-28-planning-capability-map.yaml` — read **read-only from the desktop checkout**, where
they are untracked local work. They carry the ratified direction (FR-A…FR-D, tiers, approval
status) but **not** the per-row migration tables. Records left unedited per §0.6:
`Solutions/reports/dbs-migration/DBS_PROMPT_2_FINALIZATION_REPORT.md:239`.

## Decisions made

- The status model lives at `Blueprints/agent-modules/status-model.md` (file location was a
  judgment call; content was specified).
- The L0 kickoffs' checkbox language was migrated even though §1.4 asked only for step 0 —
  gate A2 scans all active surfaces and would otherwise fail on them.
- The extracted decision table drops one accidental duplicate token ("Omen, fantasy football,
  Omen") from a prior rebrand. Every distinct concept is preserved.

## Unresolved questions

- Does the status model belong in `agent-modules/`, or somewhere you'd rather?

## Blockers surfaced

**Two approved artifacts referenced by the spec do not exist anywhere I can find** — not in
either clone, not in the audit, not in the capability map, not in the desktop checkout:

1. **§4.4 L2 status table** (34 rows: 15 READY / 0 / 3 VERIFIED / 16 CLOSED). §4.4 says "apply
   the approved tables exactly. Do not infer states." My own enumeration of the L2 file yields
   35 rows, not 34, and the READY/VERIFIED/DESCOPED split is unspecified per item.
2. **§4.1 `## Parked — Truth Gate design inputs`**, to be appended *verbatim*.

L1 was **not** blocked: its counts plus the explicit CP1/CP2/CP3 naming pin all 7 rows exactly.

## Last verified result

Gate sweep run in-clone. **10 of 12 PASS**: A1, A2, A4, A5, A6, A7, A8, A9, A11, A12.
**A3 and A10 FAIL** — L0 and L1 satisfy both; L2 cannot until the table above is supplied.
Per §7, any FAIL halts the PR: branch committed and pushed, **PR not opened**.

## Next recommended pull

Supply the two artifacts above, then finish §4.4-L2 and §4.3 (`agent_inbox.md`, which depends
on the L2 READY set) and re-run A3/A10. Do not begin PR B.

---

# Second pass — 2026-07-30, founder rulings applied

Both blockers resolved. Applied additively; no amend, reset, rebase, or force-push.

## Files updated at L0

- `Blueprints/agent-modules/status-model.md` — now declares `SCHEMA_VERSION 1.0.0`,
  `ROLE: canonical source`, and `MIRRORED_BY: omen/Direction/status-model.md`. Adds the
  **`Claim:` rule** (`IN_PROGRESS` requires a current named claimant actively advancing the
  work; never inferred from partial implementation, a merged PR, or a deleted branch — no
  valid claim means `READY`), explicit **`Evidence:` requirements** (exact PR/commit/path/run
  id only, never a broad range; a merged PR alone does not satisfy `VERIFIED`), and the
  **mirror-synchronization contract**. There is deliberately **no silent "L0 wins" rule**:
  when both copies are available, any schema-version or operational-content difference is a
  blocking Truth Gate failure — halt and report. In a standalone Omen checkout the mirror is
  operative.
- `Direction/TODO.md` — the approved `## Parked — Truth Gate design inputs` section appended
  verbatim (cross-reference alignment; registry and authority alignment; parked until FR-C
  technical design defines invocation points, failure classes, thresholds, and rollout).

## Why the mirror exists — path-resolution proof

`Blueprints/agent-modules/status-model.md` resolves from L0 (`Blueprints/…`), L1
(`../Blueprints/…`), and L2 **only in the nested desktop arrangement** (`../../Blueprints/…`).
It does **not** resolve in a standalone Omen clone or in CI, where `actions/checkout` yields
only the Omen tree — and Omen is gitignored from L0 (`.gitignore:24`) with its own remote, so
standalone is the normal case for all 8 workflows. The first-pass L2 references pointed at an
unreachable path; that defect is now fixed and the three L2 references repoint to the mirror.

## L1 unchanged this pass

L1 remains 4 `READY` / 0 / 0 / 3 `CLOSED` = 7, as approved in the first pass.

## Gates

New count gates A13/A14/A15 validate the L2 active-sprint counts, completed-history
additions, and the combined 35-disposition reconciliation. A1–A12 re-run and passing. A11 is
rebaselined: 12 linked Omen worktrees, desktop Omen on `chore/legal-valor-ventures-footer`,
`main` `09ecec2`, `origin/main` `90f6376`, all documented local changes preserved. The
legal-footer branch and worktree are expected parallel work from the Apple Developer
organization migration; they were listed only, never entered, and are excluded from PR A.

## Next recommended pull

Run `planning-pass` on the two Omen planning-intake items. Do not begin PR B.
