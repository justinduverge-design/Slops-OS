# Valor Brain metadata v1 handoff

## Outcome

The founder-approved metadata profile is ratified for all three DBS layers. L0 owns the canonical profile, schema, validator, decision, resolver, and Truth Gate integration. L1 uses the same package and has its own resolver/startup routing. L2 receives a standalone mirror in the Omen repository.

## Contract

- Opt-in selector: `metadata_profile: valor-brain/v1`.
- Required metadata: stable ID, type, layer, authority, owner, named state dimensions, sources, relationships, freshness, and snapshot.
- Required body: one H1, `Compiled truth`, `Append-only timeline`, and a dated timeline entry.
- Task state remains `READY`, `IN_PROGRESS`, `VERIFIED`, or `CLOSED`; other dimensions may use domain-specific uppercase values.
- DBS purpose chooses the folder. Metadata never creates a parallel state tree.

## Verification

- Canonical validator tests: 5/5, including invalid metadata, invalid body, opt-in filtering, and duplicate page IDs.
- Canonical tree: 1/1 opted-in page valid.
- Focused Truth Gate: PASS across 369 Markdown files with P0 0, P1 0, P2 0.
- Schema SHA-256: `C21296F3F6ADB1CD83A8770490B350DD689ADF0BE1E0426323668E4CDC4C3C2E`.
- Validator SHA-256: `49952F48F3FD3C7925541B998F71B111083678BCC57B610AA727A277B3FCC650`.

The Omen mirror reported the same hashes. Its real O2 page validated 1/1, its focused tests passed 2/2, and its full backend suite passed 572/572.

The legacy all-check Truth Gate is not green: it reports hundreds of pre-existing broken-path findings, amplified because this isolated L0 worktree does not contain the separately versioned Omen repository. The focused Valor Brain gate is the applicable new-work result; no broad path-integrity repair is claimed here.

## Boundaries and follow-up

No production, deployment, database, package, secret, or main-branch merge action occurred. Graphify output was stale and is explicitly not treated as v1 authority. The next useful proof is a second real opted-in concept in a different domain; automatic migration or Graphify ingestion should wait for that evidence.
