---
id: SLOPS-AUDIT-DBSVNEXT-METADATA-001
title: Metadata architecture — fields, levels, IDs, aliases, relationships
artifact_type: solution
status: proposed
authority: proposed
repository: slops-os
owner: founder
scope:
  - dbs-vnext
  - metadata
  - retrieval
created: 2026-08-04
last_reviewed: 2026-08-04
supersedes: []
superseded_by: []
related:
  - SLOPS-AUDIT-DBSVNEXT-KEYSTONE-001
  - SLOPS-AUDIT-DBSVNEXT-CATALOG-001
tags:
  - front-matter
  - stable-ids
  - controlled-vocabulary
schema_version: 0.1.0-draft
---

# Metadata architecture

> **Status:** PROPOSAL for founder review. No file has had front matter added.
> **Governing sources:** Slops OS #14 (metadata amendment), Slops OS #15, Omen #278.
> The front matter on this file and its siblings is a working demonstration of the reduced level.

## 1. The problem this solves, measured

Codex measured Omen's mandated root startup union at **559,090 bytes / 7,491 lines across 18 sources**
before any task-specific reading. Independently re-measuring the 12 files named directly in Omen's
`CLAUDE.md` read-in-order plus `AGENTS.md` gives **324,441 bytes / 2,024 lines** — the same order of
magnitude, with the difference explained by which further sources are counted as mandated.

The sharper finding is *where* that weight sits:

| File | Bytes | Share of mandated startup set |
| --- | ---: | ---: |
| `Direction/decision_log.md` | 233,983 | **72.1%** |
| `Direction/current_sprint.md` | 28,416 | 8.8% |
| `Direction/agent_inbox.md` | 16,333 | 5.0% |
| `Direction/facts-of-record.md` | **3,509** | **1.1%** |
| all 8 others | 42,200 | 13.0% |

An append-only history file is **67× larger than the standing-constraints file**, and both are mandatory
reading at every session start. The artifact that says what is *true* is drowned by the artifact that
says what *happened*. That is the entire problem in one table: agents reach current truth by reading a
large fixed set and hoping the freshest-looking file is authoritative.

The native-mobile gate compounds it — Codex measured **55,522 bytes / 1,074 lines** for the six named
specs, and the mobile spec directory as a whole holds 271,611 bytes / 4,403 lines across 21 files.

Across both repositories there are **1,278 inventoried artifacts**. Nothing in them carries an
identifier, an authority level, or a machine-readable relationship. Authority is asserted in prose, and
`executive-findings.md` documents the consequence: routing files that "can authorize opposite behavior."

Metadata is the fix. It is not decoration — it is what lets an agent read *five* relevant files instead
of eighteen mandated ones.

## 2. What Codex captured, and what is missing

Codex's inventory records 22 fields per artifact. Against the amendment's required set:

| Required | Codex | Note |
| --- | --- | --- |
| `artifact_type` | ✅ | 20-value heuristic taxonomy, not the amendment's controlled vocabulary |
| `status` | ⚠️ proxy | values like `"operational or unclear"` — not a lifecycle state |
| `authority` | ⚠️ proxy | `authority_claim`, e.g. `"none explicit"` — describes what the file *claims*, not what it *is* |
| `repository` | ⚠️ proxy | `owning_repository` as a GitHub slug |
| `id`, `aliases`, `title`, `owner`, `scope`, `tags`, `created`, `updated`, `last_reviewed`, `supersedes`, `superseded_by`, `related`, `depends_on`, `governed_by`, `implements`, `generated`, `generated_from`, `schema_version` | ❌ | **18 fields absent** |

**Codex captured 4 of 22 required fields, all as proxies.** The absent 18 are precisely the identity,
relationship, and lifecycle fields — the ones that make retrieval work. This is the single largest gap
between the delivered work and the amended target.

What Codex captured *instead* is genuinely valuable and has no equivalent in the amendment:
`inbound_references` / `outbound_references` with paths, `apparent_duplicates`, `auto_load_behavior`,
`risk_of_moving`, `last_meaningful_relevance`. These are **derived** signals — the catalog should keep
computing them, not ask a human to type them.

That distinction is the core design rule below.

## 3. Design rule: author intent, derive everything else

A human should type only what a machine cannot know.

| Authored by hand | Derived by the catalog builder |
| --- | --- |
| `id`, `aliases`, `title`, `artifact_type`, `status`, `authority`, `owner`, `scope`, `tags` | `repository` (from the file's repo) |
| `supersedes`, `superseded_by`, `governed_by`, `depends_on`, `implements`, `related` | `updated` (from Git), `path`, `line_count`, `content_hash` |
| `created`, `last_reviewed`, `review_after`, `schema_version` | `inbound_references`, `outbound_references`, `apparent_duplicates`, orphan status, staleness |

This roughly halves the hand-maintained surface and makes drift impossible for the derived half.
`repository` and `updated` appear in the amendment's field list; both are strictly derivable and should
be **generated into the catalog, not typed into front matter.**

## 4. Metadata levels

Article 10 forbids stamping identical front matter onto 1,278 files. Applying the amendment's three
levels to the actual inventory:

| Level | Count | Fields | Applies to |
| --- | ---: | --- | --- |
| **Full** | ~61 + triage | id, aliases, title, artifact_type, status, authority, owner, scope, tags, created, last_reviewed, review_after, supersedes, superseded_by, related, governed_by, schema_version | Keystone docs, Direction records, accepted decisions, approved Blueprints, facts of record, provider/design/security/deploy contracts, reusable workflows |
| **Reduced** | ~559 | id, title, artifact_type, status, authority, created, related | References, audits, investigations, proposals, reports, migration docs, handoffs |
| **None** | ~274 | — | Source code, package manifests, CI config, generated caches, build outputs, images, scratch |
| **Triage required** | **384** | — | Everything Codex typed only as "Markdown knowledge artifact" (225 Slops OS + 159 Omen) |

Per repository: Slops OS 28 full / 247 reduced / 5 none / 225 triage;
Omen 33 full / 312 reduced / 269 none / 159 triage.

**The 384-file triage bucket is the real migration work.** It is not mechanical, cannot be scripted
safely, and is why bulk migration must not start before founder approval. Everything else is either
obvious or exempt.

Generated artifacts get a fourth, minimal shape — `generated: true`, `generated_from`, `generator`,
`generated_at`, `source_hash` — emitted by the generator, never typed.

## 5. Stable IDs — an unresolved conflict requiring a decision

Two incompatible conventions are on the table.

| | Codex (`direction-schema-v1-proposal.md` §5.1) | Amendment (#14, #15, #278) |
| --- | --- | --- |
| Grammar | `<REPO>-<TYPE>-<YYYYMMDD>-<SEQ>` | `<REPO>-<TYPE>-<DOMAIN>-<NUMBER>` |
| Example | `OMEN-DEC-20260804-001` | `OMEN-BP-ESPN-001` |
| Allocation | Trivial — date + counter, never collides | Requires a domain taxonomy and a per-domain counter |
| Readability | Low — tells you when, not what | High — tells you what it is about |
| Stability risk | None | **An artifact whose domain or type changes has a lying ID** |

The amendment's form is more useful to a human and is what the founder wrote three times. Codex's form
is more robust. The conflict is real and should not be papered over.

### Recommendation: adopt the amendment's grammar, with an explicit freeze rule

Use `<REPO>-<TYPE>-<DOMAIN>-<NUMBER>` — readable, and it is what the governing issues specify — plus
one constitutional clarification that removes the stability risk:

> **An ID is a mnemonic frozen at allocation, not a live claim.** The `TYPE` and `DOMAIN` segments
> record what the artifact was when created. They are never recomputed. If an artifact's type, domain,
> repository, or scope later changes, the **metadata changes and the ID does not.**

So an artifact allocated `OMEN-BP-ESPN-001` that is later reclassified keeps that ID forever, while its
`artifact_type` field becomes the truth. This satisfies Article 4 exactly — identity survives change —
and preserves the founder's readable form. The alternative (renumbering to match new semantics) is
explicitly forbidden by Article 4 and by all three issues.

Corollary: **agents and validators must never parse meaning out of an ID.** The ID is for lookup;
`artifact_type` and `scope` are for meaning. This must be stated in `Metadata-Standard.md`, or the
freeze rule will silently erode.

Number allocation is per `(REPO, TYPE, DOMAIN)`, zero-padded to 3. Registry of allocated IDs is
generated from the catalog, so collisions are a validation error, not a bookkeeping chore.

## 6. Aliases — preserving what already exists

Article 4 and all three issues forbid renumbering for cosmetic consistency. Identifier families already
in the wild that must survive as aliases:

- **Omen ADR numbers** (`ADR-002`) — named explicitly in #14 and #278 as must-preserve.
- **Slops OS founder decision IDs** (`D70`–`D80`, seen across the authority-routing cutover).
- **Omen sprint/milestone codes** — `B2D`, `B2D-E1`, `B3`, `M1P-P2`, `M4`, `P1`, `phase1-5g2`, and similar.
- **Spec version tags** — `component-lock-v1`, `team-theme-contract-v1`, `LEGAL-V1`.
- **GitHub issue and PR numbers** — external, resolved as `https://` links, never re-minted.

Rule: `aliases` is a list of strings, each globally resolvable. The catalog builds an alias table; a
lookup on any alias returns the canonical record. An alias may never resolve to two records — that is a
blocking validation failure.

## 7. Controlled vocabularies

Adopt the amendment's lists verbatim, **lowercase**. Codex's schemas use uppercase (`ACTIVE`,
`SUPERSEDED`, `RETIRED`); the amendment uses lowercase; the amendment is later and matches YAML idiom.
This is a mechanical fix to four schema files.

**`artifact_type`** (14) — `fact`, `state`, `inbox-item`, `sprint`, `decision`, `blueprint`, `workflow`,
`reference`, `solution`, `audit`, `handoff`, `runtime-prompt`, `generated`, `archive-record`.

**`authority`** (5) — `authoritative`, `supporting`, `proposed`, `historical`, `generated`.

**`status`** (9) — `draft`, `proposed`, `active`, `accepted`, `blocked`, `completed`, `superseded`,
`archived`, `generated`.

Per-type narrowing is expected: a `decision` may not be `blocked`; a `fact` may only be `active`,
`superseded`, or `archived`. That narrowing belongs in the per-type JSON Schema, not the base vocabulary.

**Note for review:** 9 statuses × 14 types is a large matrix and a plausible over-specification. The
narrowing rules will show whether every value earns its place. Recommend ratifying the vocabulary but
treating unused values as candidates for removal at first review, rather than defending them
permanently.

## 8. Relationships — author flat, query as a graph

Codex used a single typed `links` array. The amendment lists nine discrete relationship names. Both work;
they optimize for different things.

**Recommendation: discrete named fields in front matter, one normalized table in the catalog.**

```yaml
governed_by: [SLOPS-KEYSTONE-CONSTITUTION-001]
supersedes:  [OMEN-BP-ESPN-000]
depends_on:  [OMEN-BP-PROVIDER-CORE-001]
related:     [OMEN-ADR-PROVIDER-003]
```

Discrete fields are greppable, diff-readable, and individually schema-validatable — which matters because
a human maintains them. The catalog then flattens all of them into one `relationships(from, type, to)`
table, so traversal, cycle detection, and reverse lookup are single queries. This is Article 12 applied
to relationships: authored once in the readable form, generated into the queryable form.

Supported types: `supersedes`, `superseded_by`, `implements`, `governed_by`, `supported_by`,
`depends_on`, `blocks`, `related_to`, `generated_from`.

**Inverse consistency is generated, not typed.** If A declares `supersedes: [B]`, the catalog derives
B's `superseded_by: [A]`. Requiring both to be typed by hand guarantees they will disagree. Where a file
does declare both, mismatch is a validation error.

Cross-repository links are just IDs — `OMEN-BP-ESPN-001` referenced from Slops OS resolves through the
workspace catalog without either repo copying the other's content.

## 9. Keep Codex's `dbs://` URI scheme

Codex invented a portable link form that solves a real problem — absolute Windows paths and fragile
relative links — and that no amendment supersedes:

```text
dbs://omen/id/OMEN-DEC-20260804-001      # stable record
dbs://slops-os/path/Blueprints/README.md  # repo-owned artifact with no ID
```

Rules already specified by Codex and worth adopting as written: `https://` for external evidence;
optional `?ref=<sha>` to pin historical evidence; relative Markdown links may accompany but never replace
the URI; a resolver must reject `..`, absolute filesystem paths, unknown repository aliases, missing IDs,
and case-mismatched tracked paths (the last one matters on Windows).

**Disposition: KEEP verbatim.** This is the strongest single piece of design in the Codex package.

## 10. Front matter mechanics

- YAML front matter delimited by `---`, first bytes of the file, UTF-8.
- Markdown-only. YAML records (`.yml`) carry the same fields as top-level keys instead.
- Absent front matter means "no metadata level required" — it is not an error by itself. Whether a given
  path *requires* metadata is decided by the catalog config, so the rule lives in one reviewable place
  rather than being implicit in 1,278 files.
- Repos use CRLF handling via `.gitattributes`; the parser must tolerate `\r\n` in front matter. Slops OS
  has prior CRLF-normalization branches in its history, so this is a live concern, not theoretical.

## 11. Cost, honestly stated

| Work | Volume | Nature |
| --- | ---: | --- |
| Full metadata authored | ~61 + a share of triage | Genuine review — authority and relationships are judgment calls |
| Reduced metadata authored | ~559 | Largely scriptable from existing type/date signals, then spot-checked |
| Exempt | ~274 | No work |
| **Triage** | **384** | **The real cost. Founder or reviewed-agent classification.** |

Ongoing cost after migration is bounded: new artifacts get front matter at creation (a template),
derived fields never need touching, and `context health` reports drift rather than requiring audits.

The honest risk is that metadata rots — `last_reviewed` dates going stale is the most likely failure.
Mitigation is `review_after` plus a staleness report, and accepting that a stale date is *visible*
rot, which is strictly better than today's invisible rot.

## 12. Decisions requested

1. **ID grammar** — adopt `<REPO>-<TYPE>-<DOMAIN>-<NUMBER>` with the freeze rule in §5, superseding
   Codex's date-based form? (Recommended.)
2. **Confirm** IDs are never parsed for meaning — lookup only.
3. **Vocabularies** — ratify the three lowercase lists in §7, and accept that unused values get pruned
   at first review rather than defended.
4. **Relationships** — discrete front-matter fields, normalized into one catalog table, inverses derived? (Recommended.)
5. **Author/derive split** — confirm `repository` and `updated` are derived, not typed.
6. **`dbs://`** — adopt as the canonical portable link form.
7. **Triage** — authorize classification of the 384 unclassified Markdown artifacts as a distinct,
   reviewable work item before any bulk metadata write.
