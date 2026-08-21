# Valor Brain metadata profile v1

## Purpose

Define one portable metadata contract for selected SLOPS knowledge pages across L0, L1, and L2.

The contract makes authority, state, provenance, relationships, and freshness machine-readable while leaving explanation and history in Markdown.

## Scope

The profile applies only when a Markdown file begins with:

```yaml
---
metadata_profile: valor-brain/v1
```

Ordinary Markdown remains valid and is ignored by the Valor Brain validator.

Layer ownership:

- L0 owns this specification, `valor-brain-page.schema.json`, the canonical validator, and cross-layer resolution rules.
- L1 inherits the canonical package from L0 because both layers share one Git repository.
- L2 mirrors the schema and validator locally so Omen remains valid in a standalone clone and CI checkout.

## Metadata contract

The JSON Schema at `Blueprints/specs/valor-brain-page.schema.json` is canonical for field validation.

| Field | Meaning |
| :--- | :--- |
| `metadata_profile` | Exact profile selector: `valor-brain/v1`. |
| `page_id` | Stable lowercase dotted or kebab identifier. It is not a filesystem path. |
| `page_type` | Describes the information shape; it never selects a folder. |
| `layer` | Owning DBS layer: `L0`, `L1`, or `L2`. |
| `authority` | `CANONICAL`, `COMPILED`, `REVIEW_ONLY`, or `REFERENCE_ONLY`. |
| `owner` | Named human or accountable team. |
| `state` | One or more named state dimensions. |
| `sources` | Non-empty provenance list using repository-relative paths and optional anchors. |
| `relationships` | Explicit `requires`, `enables`, and `checks_against` lists. Empty lists are allowed. |
| `freshness` | Last review date and events that make the page stale. |
| `snapshot` | Repository and source commit used to compile or ratify the page. |

## State rules

State dimensions prevent unrelated facts from collapsing into one overloaded status.

```yaml
state:
  task: IN_PROGRESS
  change: APPLIED
  exercise: NOT_RUN
```

- Dimension names use lower snake case.
- Values use uppercase snake case.
- If the `task` dimension is present, it must use the existing SLOPS lifecycle: `READY`, `IN_PROGRESS`, `VERIFIED`, or `CLOSED`.
- The profile reflects task state; it does not replace `Claim:`, typed blockers, evidence, closure, or append-only unblock rules in the canonical status model.
- Domain-specific dimensions such as `change` and `exercise` are allowed without adding them to the task lifecycle.

## Body contract

Every opted-in page contains:

- Exactly one H1.
- A `## Compiled truth` section.
- A `## Append-only timeline` section.
- At least one timeline entry beginning `- **YYYY-MM-DD:**`.

Compiled truth may be edited when the source changes. Timeline entries are appended; prior entries are not rewritten to make history look cleaner.

## Resolution rules

1. Route the file by DBS purpose before considering metadata.
2. Validate it with the local layer's Valor Brain validator.
3. Apply the page's declared authority.
4. For `COMPILED`, `REVIEW_ONLY`, and `REFERENCE_ONLY` pages, named canonical sources win on conflict.
5. For `CANONICAL` pages, higher-layer doctrine governs only cross-layer contracts; local product facts remain owned by their local layer.
6. If no current route fits, stop and use the layer resolver's inbox/fallback rule. Do not invent a folder.

## Validation

Canonical command from L0:

```powershell
node Blueprints/tools/valor-brain/validate.mjs
```

Focused Truth Gate command:

```powershell
node Blueprints/tools/truth-gate/truth-gate.mjs --check=valor-brain
```

Standalone Omen command:

```powershell
node scripts/check-valor-brain.mjs
```

An invalid opted-in page is a P0 Truth Gate finding because an agent could route or act on malformed authority/state metadata. Ordinary Markdown is unaffected.

## Portability and mirrors

The L2 schema and validator mirrors must be byte-identical to their L0 canonical sources. A profile change is incomplete until both repositories are updated and their focused tests pass.

The schema is Draft 2020-12. The zero-dependency validator intentionally implements only the schema keywords used by v1. Adding a new schema keyword requires a failing fixture and validator support in the same change.

Frontmatter uses a deliberately small YAML subset: two-space nested maps, scalar values, scalar lists, and inline empty `[]` or `{}` values. YAML anchors, tags, multiline scalars, inline comments, and lists of maps are outside v1. This keeps the local validator deterministic without a package install.

## Exclusions

Version 1 does not:

- Convert existing Markdown automatically.
- Require frontmatter on every file.
- Create `Direction/state/`, `Direction/maps/`, or another parallel DBS tree.
- Replace the existing Direction or sprint schemas.
- Create a domain-modeling or Wayfinder skill.
- Refresh or trust the stale Graphify outputs.
- Build automatic extraction, event ledgers, databases, or background writers.
- Grant production, deployment, database, secret, or merge authority.

## Versioning

- Additive clarification that does not change validation may update this spec without changing the profile identifier.
- A field requirement, enum, body rule, or authority semantic change requires a new profile version.
- Old profile versions remain readable until an explicit migration decision retires them.
