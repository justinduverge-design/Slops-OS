# Direction planning contract v1 proposal

> **Status:** DRAFT for founder review. This document and the companion schemas are a Solution, not Direction or Blueprint authority.
> **Issue owner:** Slops OS #15.
> **Proposed canonical owner after approval:** `justinduverge-design/Slops-OS/Blueprints/schemas/direction/v1/`.
> **Compatibility target:** OpenAI, Claude, other runtimes, humans, and deterministic validators.

## 1. Contract boundary

`Direction/` is the small, current command-and-control surface. It records accepted truth and active state; it does not store research, unapproved proposals, implementation detail, generated maps, or a transcript of every session.

The contract deliberately separates four things that are mixed today:

1. **Intake** records a request without promising execution.
2. **Sprint work** records an approved outcome and its lifecycle.
3. **Authority** records accepted facts and decisions with supersession.
4. **Continuity** records what a later human or runtime needs to resume safely.

Ordinary model improvements must not change these interfaces. A model may summarize or render them differently, but it must preserve required fields, IDs, statuses, links, and transition semantics.

## 2. Storage and serialization

### 2.1 Human-first Markdown record

Each record is one UTF-8 Markdown file with a YAML front matter object followed by optional prose. Front matter is the machine-checkable record. Prose explains context but cannot override the structured fields.

```markdown
---
schema_id: slops.direction.sprint-item
schema_version: 1.0.0
id: OMEN-SPR-20260804-001
repository: omen
title: Example outcome
status: READY
created_at: 2026-08-04
updated_at: 2026-08-04
links:
  decisions: []
  blueprints: []
  references: []
---

# Example outcome

Optional explanation. It cannot redefine `status` or any other front matter field.
```

One record per file gives each item a stable link, makes diffs reviewable, and avoids fragile parsing of giant Markdown tables. Small index files may render active records, but indexes are navigation views and may not contradict the records they link.

### 2.2 Proposed owner and derived cache

- Slops OS owns canonical schema sources under `Blueprints/schemas/direction/v1/` after an accepted decision.
- Omen consumes a provenance-pinned generated cache under `Blueprints/schema-cache/slops-os/direction-v1/` so standalone CI does not require a sibling checkout.
- The Omen cache must include the Slops OS commit, schema version, generation time, and checksum. It is generated; it is not independently edited.
- Until ratification, the companion files under this audit's `schemas/` directory are drafts only.

## 3. Proposed Direction tree

```text
Direction/
|-- README.md
|-- facts-of-record/
|   |-- index.md
|   `-- <FACT-ID>.md
|-- current-state.md
|-- agent-inbox/
|   |-- index.md
|   `-- <INBOX-ID>.md
|-- current-sprint/
|   |-- index.md
|   `-- <SPRINT-ID>.md
|-- roadmap.md
|-- decisions/
|   |-- index.md
|   `-- <DECISION-ID>.md
|-- known-issues/
|   |-- index.md
|   `-- <ISSUE-ID>.md
|-- continuation.md
`-- session-close.md
```

Only active intake, sprint, issue, state, and continuation records stay in Direction. Accepted or superseded decisions and facts stay while they are needed to interpret current truth. Closed work and prior session snapshots move to `Archive/direction-records/<year>/` with their IDs unchanged.

## 4. Common envelope

Every record has these fields unless an interface explicitly says otherwise.

| Field | Required | Rule |
| --- | --- | --- |
| `schema_id` | yes | Exact registered interface identifier. |
| `schema_version` | yes | Semantic version understood by the writer. |
| `id` | yes | Permanent repository-qualified ID; never reused. |
| `repository` | yes | `slops-os` or `omen`; future values require schema registration. |
| `created_at` | yes | ISO `YYYY-MM-DD` or full RFC 3339 timestamp. |
| `updated_at` | yes | ISO date/timestamp; cannot predate `created_at`. |
| `owner` | yes | Accountable repository, role, or named approver; never a model vendor by default. |
| `source` | yes | Founder request, issue, accepted decision, incident, or other provenance link. |
| `links` | yes | Typed canonical links; empty arrays are explicit. |
| `legacy_ids` | no | Prior identifiers retained only for resolution/migration. |
| `migrated_from` | no | Old path and source commit when converted from a legacy record. |

Unknown optional fields may be preserved by readers that support the same major version. Writers must not discard an unknown field merely because their model or adapter does not use it.

## 5. IDs and links

### 5.1 ID convention

```text
<REPOSITORY>-<TYPE>-<YYYYMMDD>-<SEQUENCE>
```

Repository codes are `SLOPS` and `OMEN`. Type codes are:

| Type | Code | Example |
| --- | --- | --- |
| Fact | `FACT` | `OMEN-FACT-20260804-001` |
| Inbox item | `IN` | `SLOPS-IN-20260804-001` |
| Sprint item | `SPR` | `OMEN-SPR-20260804-001` |
| Decision | `DEC` | `SLOPS-DEC-20260804-001` |
| Known issue or blocker | `ISS` | `OMEN-ISS-20260804-001` |
| Session close | `SES` | `SLOPS-SES-20260804-001` |
| Solution proposal | `SOL` | `SLOPS-SOL-20260804-001` |

The sequence is three digits and allocated per repository, type, and date. A rename or move never changes the ID. Existing meaningful IDs are retained as `legacy_ids`; records are not renumbered merely for visual consistency.

### 5.2 Canonical cross-repository links

Two URI forms avoid absolute workstation paths and ambiguous relative links:

```text
dbs://omen/id/OMEN-DEC-20260804-001
dbs://slops-os/path/Blueprints/schemas/direction/v1/decision.schema.json
```

- Use `/id/` for a stable record.
- Use `/path/` for a repository-owned artifact without a record ID.
- Use `https://` for external evidence and GitHub issues.
- A commit query such as `?ref=<sha>` may pin historical/reference evidence, but current Direction links normally resolve at the repository's current commit.
- Relative Markdown links may accompany a canonical URI for convenience, but the URI is the portable identity.
- A resolver must reject `..`, absolute filesystem paths, unknown repository aliases, missing IDs, and case-mismatched tracked paths.

## 6. Interface definitions

### 6.1 Facts of record v1

`schema_id: slops.direction.fact`

Required fields:

- `id`, `statement`, `status`, `effective_at`, `scope`, `source`, `owner`
- `supersedes`, `superseded_by`, `affected_artifacts`
- common envelope and typed links

Allowed statuses: `ACTIVE`, `SUPERSEDED`, `RETIRED`.

Only `ACTIVE` facts contribute current truth. `SUPERSEDED` requires a valid `superseded_by` decision or fact. `RETIRED` requires a reason and must not silently imply its opposite. Contradictory active facts are a validation failure, not something a model may reconcile by preference.

### 6.2 Current state v1

`schema_id: slops.direction.current-state`

This is one repository snapshot, not a backlog. Required fields:

- `as_of`, `product_or_system`, `summary`
- `active_outcomes` as sprint-item links
- `active_blockers` as issue links
- `operational_health` with evidence timestamps
- `next_checkpoint`, `source`, `owner`

Evidence-dependent claims must carry `observed_at` and an evidence link. A stale live/deploy/provider claim is labeled stale or unknown; fixtures and local tests cannot be promoted to live proof.

### 6.3 Agent inbox v1

`schema_id: slops.direction.agent-inbox-item`

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Stable inbox record ID. |
| `created_at` | yes | Intake date/time. |
| `source` | yes | Founder request, issue, handoff, audit, or incident. |
| `repository` / `product_scope` | yes | Owning repository and bounded product/system scope. |
| `request_or_problem` | yes | What was asked or observed; no inferred solution. |
| `desired_outcome` | yes | Observable outcome. |
| `priority` | yes | `P0`, `P1`, `P2`, or `P3`. |
| `status` | yes | Intake lifecycle below. |
| `classification` | yes | `EXECUTE_NOW`, `INVESTIGATE`, `PLAN`, `DEFER`, or `REJECT`. |
| `affected_system` | yes | Explicit boundary. |
| `dependencies` | yes | Typed links; empty is `[]`. |
| `linked_decisions` | yes | Decision IDs/links. |
| `required_blueprints` | yes | Contract links required before work. |
| `supporting_references` | yes | Evidence links. |
| `active_solution_or_plan` | no | At most one active proposal/plan link. |
| `assigned_owner` | no | Accountable owner; lane is a scheduling hint only. |
| `next_action` | yes | One concrete next action or `NONE`. |
| `closure` | no | Disposition, reason, date, and destination/link. |

Statuses and transitions:

```text
NEW -> TRIAGED -> PROMOTED -> CLOSED
          |          |
          +-> DEFERRED
          +-> REJECTED
DEFERRED -> TRIAGED
```

- `PROMOTED` requires a sprint-item or accepted-decision link.
- `REJECTED` requires rationale and an approver.
- `CLOSED` requires a closure object and is terminal; corrections create an amendment record.
- Inbox status does not grant execution authority. Authority is evaluated separately from the current runtime policy and founder instruction.

### 6.4 Current sprint item v1

`schema_id: slops.direction.sprint-item`

| Field | Required | Meaning |
| --- | --- | --- |
| `id`, `title`, `desired_outcome`, `why_now` | yes | Stable identity and outcome. |
| `status` | yes | Durable work lifecycle. |
| `scope`, `non_scope` | yes | Included and excluded boundaries. |
| `dependencies`, `blockers` | yes | Typed links; blockers point to issue records. |
| `applicable_blueprints`, `supporting_references` | yes | Contracts and evidence. |
| `destination` | yes | Expected code/output repository and path boundary. |
| `acceptance_criteria` | yes | Observable completion conditions. |
| `validation` | yes | Commands and/or evidence, each with environment and status. |
| `decision_links` | yes | Governing accepted decisions. |
| `next_action` | yes | One concrete action or `NONE`. |
| `closure_ref` | no | Required before `CLOSED`. |

Canonical status machine:

```text
READY -> IN_PROGRESS -> VERIFIED -> CLOSED
  ^           |            |
  +-----------+------------+
```

- `BLOCKED` is not a status. A blocker is an orthogonal open issue link and a blocked item retains its lifecycle status.
- `IN_PROGRESS -> READY` requires a transition reason.
- `VERIFIED -> IN_PROGRESS` is allowed only when evidence was invalidated or scope changed, with a reason.
- `CLOSED` is terminal and requires acceptance criteria, validation evidence, and a closure reference.
- Closure disposition is one of `COMPLETED`, `SUPERSEDED`, `DESCOPED`, `REJECTED`, or `DUPLICATE`.
- A better model cannot skip `VERIFIED`; it may produce evidence faster, but the evidence contract remains.

### 6.5 Roadmap v1

`schema_id: slops.direction.roadmap`

The roadmap contains outcome links, not duplicate task prose. Required fields are `as_of`, `north_star`, `now`, `next`, `later`, `parked`, `decision_links`, and `owner`. Each entry contains an ID/link, intended outcome, sequencing reason, and review trigger. Dates are commitments only when explicitly labeled; otherwise they are planning horizons.

### 6.6 Decision v1

`schema_id: slops.direction.decision`

| Field | Required | Meaning |
| --- | --- | --- |
| `id`, `date`, `status` | yes | Stable decision identity and lifecycle. |
| `decision` | yes | The accepted/rejected proposition in plain language. |
| `context`, `rationale` | yes | Why a decision was needed and why this result was chosen. |
| `alternatives` | yes | Material alternatives, or explicit `[]`. |
| `supersedes`, `superseded_by` | yes | Typed decision/fact links; empty is explicit. |
| `consequences` | yes | Expected constraints and follow-on work. |
| `affected_artifacts` | yes | Paths or record links that must agree. |
| `owner`, `approver` | yes | Accountable owner and acceptance authority. |

Statuses: `PROPOSED`, `ACCEPTED`, `SUPERSEDED`, `REJECTED`.

- A `PROPOSED` record lives in Solutions and is not authority.
- Only `ACCEPTED` and `SUPERSEDED` decision records live in Direction.
- `SUPERSEDED` requires `superseded_by`; the successor requires the inverse `supersedes` link.
- `REJECTED` proposals remain Solution/Archive provenance and cannot appear as accepted truth.
- Decision text is immutable after acceptance except for factual metadata corrections. A changed judgment creates a successor decision.

### 6.7 Blocker and known issue v1

`schema_id: slops.direction.issue`

Required fields: `id`, `title`, `status`, `severity`, `scope`, `observed_behavior`, `impact`, `evidence`, `owner`, `next_action`, `blocked_records`, `resolution`, and common envelope.

Statuses: `OPEN`, `MITIGATED`, `RESOLVED`, `WONT_FIX`, `DUPLICATE`.

`RESOLVED` requires evidence and a date. `DUPLICATE` requires the canonical issue link. Blockers are issues with non-empty `blocked_records`; free-text sprint blockers are invalid.

### 6.8 Session close v1

`schema_id: slops.direction.session-close`

| Field | Required | Meaning |
| --- | --- | --- |
| `id`, `objective`, `outcome` | yes | Session identity, requested objective, and result. |
| `decisions_made` | yes | Accepted decision links or explicit `[]`; chat conclusions alone do not count. |
| `work_completed` | yes | Result statements linked to evidence/commits. |
| `current_state` | yes | Truth at close, including partial state. |
| `superseded_assumptions` | yes | Old assumptions invalidated this session. |
| `unresolved_questions` | yes | Questions requiring future judgment. |
| `next_actions` | yes | Ordered, bounded actions with owner/readiness. |
| `files_and_sources_touched` | yes | Repository-qualified paths and sources. |
| `validation_evidence` | yes | Commands/evidence and observed outcomes. |
| `direction_updates_completed` | yes | Record IDs updated, or explicit `[]`. |
| `blueprint_updates_completed` | yes | Approved contract updates, or explicit `[]`. |

Outcomes: `COMPLETE`, `PARTIAL`, `BLOCKED`, `CANCELLED`.

The session-close record reports work; it cannot itself approve a decision, alter sprint status without updating the sprint record, or promote a Solution. Before the next close replaces `Direction/session-close.md`, the prior immutable record moves to `Archive/direction-records/<year>/sessions/<ID>.md`.

### 6.9 Continuation v1

`schema_id: slops.direction.continuation`

Required fields: `as_of`, `resume_objective`, `start_from`, `required_reads`, `do_not_repeat`, `open_blockers`, `next_actions`, `working_tree_state`, `last_session_close`, and `owner`.

Continuation is a bounded resume pointer, not a transcript or duplicate handoff. Each required read needs a reason. It is replaced when the resume point changes; prior versions are captured by the session-close/archive process.

## 7. Promotion from Solutions

Promotion is an explicit state transition, never a file-copy shortcut:

1. A proposal is created in Solutions with a Solution ID, `DRAFT` status, owner, scope, and evidence.
2. Review records acceptance, rejection, or requested changes.
3. An accepted decision identifies the canonical owner and exact artifact(s) to create or update.
4. The owner materializes the accepted content in Direction or Blueprints and adds `promoted_from`, decision ID, date, and source commit.
5. The Solution receives `promoted_to` and is retained as review provenance or archived. It does not remain a competing authority.
6. Validators reject active claims that exist only in Solutions and reject promoted artifacts without provenance.

Direction accepts current truth, priorities, accepted decisions, and state. Blueprints accept approved build/behavior contracts. Research stays References. Generated or unapproved work stays Solutions.

## 8. Versioning and migration rules

- **Major** (`2.0.0`): removes/renames a required field, changes a status or transition meaning, changes identity/link semantics, or makes a previously valid record invalid.
- **Minor** (`1.1.0`): adds optional fields or new separately registered interfaces without changing existing semantics.
- **Patch** (`1.0.1`): clarification, examples, or validator bug fix that does not change accepted records.
- Schema changes begin as Solutions, require an accepted Slops OS decision, and land in Blueprints with a changelog and migration guide.
- Consumers declare supported major versions. They reject unknown majors, preserve unknown optional fields in supported majors, and fail closed on unknown statuses.
- A major migration uses a defined dual-reader window. Writers switch only after both repositories validate; adapters translate legacy records rather than maintaining two manually edited truths.
- Every migrated record keeps its ID where possible, adds `migrated_from` with path and commit, and records validation evidence.
- Archived records keep the schema version they were written under. They are not mass-rewritten for cosmetic consistency.

## 9. Validation contract

A v1 validator must check:

1. YAML front matter parses and the declared schema exists.
2. Required fields, data types, enum values, dates, and IDs are valid.
3. IDs are unique across the workspace and filenames match record IDs where required.
4. Canonical links resolve with exact case and repository ownership.
5. Status transitions are legal and include required reason/evidence fields.
6. Supersession links are bidirectional and no two active facts contradict on the same fact key.
7. Sprint blockers resolve to open issue records; `BLOCKED` is rejected as a sprint status.
8. Closed records have closure evidence and are absent from active indexes.
9. Solution promotions have an accepted decision and reciprocal provenance links.
10. Omen's schema cache matches the pinned Slops OS source checksums.

The validator reports errors; it does not rewrite records automatically.

## 10. Ratification questions

Founder review is required for four choices before implementation:

1. Confirm one-record-per-file plus small index views as the permanent representation.
2. Confirm the canonical sprint lifecycle remains `READY -> IN_PROGRESS -> VERIFIED -> CLOSED` with blockers orthogonal.
3. Confirm portable `dbs://` links and repository aliases (`slops-os`, `omen`).
4. Confirm Slops-owned schemas plus a provenance-pinned Omen cache rather than mirrored hand-maintained copies.

No current Direction file should be converted until these choices are accepted and legacy-to-v1 mappings pass fixture validation.
