# Valor Brain Bundle Adoption Handoff

## Files updated

- `Blueprints/agent-modules/layer-2-rules.md` — merged current-truth L2 boundaries from the bundle without adopting stale paths or vendor-keyed authority.
- `Blueprints/RESOURCES_INDEX.md` — corrected the kickoff-modules entry from live wiring to legacy review material.
- `Direction/reviews/2026-08-20-valor-brain-bundle-review.md` — recorded the quality review, disposition, source verification, conflicts, and pilot gate.
- `Archive/parked/2026-08-20-valor-brain-bundle/MANIFEST.md` — recorded provenance and non-authoritative status.
- `Archive/parked/2026-08-20-valor-brain-bundle/valor-brain-bundle_1.zip` — preserved the original 51,060-byte bundle; SHA-256 `701D8AE63399F7D3CE46543C241FC7E9EEADACF03E12BD6A8FBCEC9195C23964`.

## Files discussed

- Bundle proposals: `RESOLVER.md`, `brain-glossary.md`, `brain-page.schema.json`, a unified kickoff, `slops-domain-modeling`, `slops-wayfinder`, `resolver-conformance.js`, and three `CLAUDE.md` replacements. Source lineage: ICM (Jake Van Clief and David McDermott), Google Cloud OKF, Garry Tan's gstack/gbrain and Brain presentation, and Matt Pocock's domain-modeling/wayfinder work.
- Current authority: `AGENTS.md`, `Direction/facts-of-record.md`, `Direction/decision_log.md`, `Blueprints/RESOURCES_INDEX.md`, `Blueprints/skills/SKILL_ROUTING.md`, `Blueprints/skills/SLOPS_LIFECYCLE.md`, runtime policy, action posture, status model, current layer kickoffs, and Omen standalone facts.

## Decisions made

- Partial adoption only. Preserve the whole source bundle, merge only facts already supported by current doctrine, and keep the proposed brain architecture non-authoritative until a pilot resolves its status/risk/taxonomy conflicts.
- Keep an Omen-local kickoff for standalone clones, renamed to `Blueprints/prompts/kickoff.md`; do not adopt the proposed cross-repository unified kickoff or the stale Omen checker.
- Do not register or activate the two proposed skills yet.

## Unresolved questions

- Whether the brain resolver should create new `Direction/state/` and `Direction/maps/` folders or remain metadata over existing DBS locations.
- Whether `founder` and `checks` are accepted type names.
- Whether AAA is actually superseded.
- Whether domain modeling and wayfinding warrant separate skills after a real pilot.

## Blockers surfaced

- DBS vNext structure remains review-only.
- Brain-page status and risk fields conflict with current canonical vocabularies.
- The proposed Omen checker has no current harness and points at the wrong repository corpus.

## Last verified build/test result

- Documentation/archive task only; no app build applies.
- `git diff --check` passed.
- Omen working tree remained unchanged.
- Parked ZIP hash matched the source hash exactly.

## Next recommended pull

Run one review-only resolver pilot on a single existing Omen concept. Do not create canonical folders, register skills, change kickoffs, or add automation during the pilot.
