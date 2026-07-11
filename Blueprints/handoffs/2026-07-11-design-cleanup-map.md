# Design Cleanup Map — 2026-07-11

Ruthless KEEP / SIMPLIFY / REBUILD / REMOVE audit of Slops OS design/branding/doctrine surface. Scope: root doctrine, `Blueprints/`, `Direction/`, `References/`, `Solutions/`, `slops-saloon/` (division-level design/branding doctrine), staging folders. `slops-saloon/omen/` does not exist in this checkout — Omen's own frontend/design files (`frontend/src/components/ui/`, `themeMode.js`, etc.) could not be inspected; see Open Questions in the companion actions file.

Founder priorities used as the decision filter: Omen shell first, team presence second; light teams may use light surfaces; team colors must not overpower the product; reduce repeated rework and page/component freelancing; preserve token foundation, verification culture, real design-system structure.

## Cleanup Table

| KEEP | SIMPLIFY | REBUILD | REMOVE |
|---|---|---|---|
| `AGENTS.md`, `CLAUDE.md` (root) — the L0 kickoff sequence is sound and actively used; only the two stale path references need fixing, not the structure. | `Blueprints/prompts/` (regular, non-underscore files) — many one-off dated task prompts (`phase-1-codex-nomenclature-rename.md`, `phase-1b-codex-title-case-cleanup.md`, etc.) that are done; useful as history but noisy as an active directory. | `Blueprints/agent-modules/graphify-hook.md` + its two upstream pointers in `CLAUDE.md`/`AGENTS.md` — the concept (cross-layer graph) is worth keeping, but it currently points at `References/graphify/graphify-out/graph.json`, which does not exist anywhere in the repo. Doctrine citing a phantom file is worse than no doctrine. | `References/graphify/` — cited by `CLAUDE.md` and `graphify-hook.md` as "read this one" but confirmed absent repo-wide. Either it was never committed or lives elsewhere; as written it's a broken authority pointer, not a real file — remove the claim until the graph exists. |
| `Blueprints/agent-modules/*` (all 13, except `graphify-hook.md`) — short, single-purpose, directly cited by root doctrine, no redundancy found. This is the strongest-structured part of the repo. | `Blueprints/specs/` design set (`design-md.spec.md`, `ux-ui-execution.spec.md`) — both solid (175 and 133 lines) but each covers process + content + examples in one file; splitting "what to write" from "how to write it" would reduce re-derivation on each pull. | `slops-saloon/Direction/decisions/corvus-ux-ui-direction-v1.md` (239 lines) — the only standalone UX/UI direction doc at division level, but it's pre-rebrand-named and its content has not been re-validated against the Omen rebrand. The doctrine underneath may still be correct; the file needs a rebrand pass and an owner decision on whether it's still live or superseded. | `Blueprints/agents/_imported/` (~90 files, `__design_division/`, `__engineering_division/`, etc.) — confirmed via diff that `__design_division/design-brand-guardian.md` is the raw pre-promotion source and `Blueprints/agents/design/design-brand-guardian.md` is the cleaned, promoted candidate. The imported tree is superseded staging output, not a second source of truth. |
| `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` (254 lines) — the actual authority for the founder's #1 design concern ("team colors must not overpower the product"). Well-scoped, division-specific, no competing doc. | `slops-saloon/Blueprints/specs/teams/*-colorway.md` (chiefs, cowboys, eagles) — legitimate per-team instances of the spec above, but as the roster grows this pattern needs a template + `_batch-tracking.md` discipline made explicit rather than ad hoc (see REBUILD note on batch tracking). | `Blueprints/prompts/` structure overall — regular prompts, `_pending/`, `_templates/`, `_old-prompts-for-analysis/` are four different lifecycle states sharing one flat directory with only underscore-naming as a signal. A `active/ pending/ templates/ archive/` structure would remove the guesswork. | `Blueprints/prompts/_old-prompts-for-analysis/` (`README.md`, `codex-corvus-phase-1-restart.md`) — explicitly named "for analysis," references pre-rebrand Corvus branding, superseded by the Corvus→Omen rebrand handoffs. Nothing here is cited as authoritative anywhere else. |
| `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` (152 lines) — the "team presence second" doctrine the founder wants preserved; well-scoped, no competitor. | `Direction/reviews/` design-relevant critic reviews (`design-division-import-review.md`, `design-md-optimization-critic-review.md`, `ux-ui-fundamentals-critic-review.md`) — valuable as process record but not discoverable; should be cross-linked from the specs they critique rather than living as orphaned reviews. | `slops-saloon/Blueprints/specs/teams/_batch-tracking.md` — a transitional tracking file doing real work (coordinating per-team colorway rollout) but living as an underscore-prefixed "temp" file. If team rollout is ongoing, this should be REBUILT as a proper tracked status doc, not treated as disposable. | `Blueprints/specs/brand-identity-digital-marketing.spec.md` — 0 bytes. An empty file with a design/branding-sounding name is actively misleading (looks authoritative, contains nothing). Either fill it or delete it; leaving it empty is the worst option. |
| `slops-saloon/Blueprints/handoffs/2026-07-03-design-doctrine-and-logo-swap-handoff.md` (140 lines) — the most recent, most directly relevant design-doctrine record in the repo; documents an actual logo/doctrine change. | `Blueprints/templates/design.md` (105 lines) + `Blueprints/skills/design-md-author/SKILL.md` — both wrap the same `design-md.spec.md` doctrine from different angles (template vs. skill). Worth keeping both but should explicitly cross-reference the spec as the single source instead of restating it, to prevent drift. | — | `Blueprints/prompts/_pending/claude-code-omen-phase-1.3-ios-safari-sweep.md` — an Omen-product-scoped prompt sitting in the L0 doctrine repo, but `slops-saloon/omen/` doesn't exist here. Either this belongs in the (missing) Omen repo and is a stray copy, or Omen hasn't been created yet and this is premature. Flag for founder; likely REMOVE-after-relocation. |
| `Blueprints/handoffs/2026-07-03-crlf-and-corvus-rebrand-cleanup-reanchor.md` + `2026-07-03-crlf-and-rebrand-cleanup-handoff.md` — confirmed a legitimate open/close pair (not duplicates), documents the Corvus→Omen rebrand cleanup itself; keep as the historical record other Corvus-named files should be checked against. | — | — | `Solutions/reports/dbs-migration/` (~27 files, DBS_PHASE_1–9 + completion/readiness reports) — a completed migration's paper trail, zero design content. Out of primary design scope but flagged because it's the single largest block of stale volume in the repo; archive on a separate pass. |
| `Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md` vs `slops-saloon/Blueprints/handoffs/2026-06-10-corvus-architecture-pivot.md` — diffed directly: these are **not duplicates**. Root file is the L0 breadcrumb ("no OS doctrine changed"), division file carries the actual division-level decisions. Correct use of the layer-breadcrumb pattern — keep both. | — | — | `Archive/corvus-root-direction-pre-dbs/`, `Archive/superseded-docs/brand-root-corvus-only/` — already living in an Archive folder; confirm nothing outside Archive still points to them, then they're candidates for deletion on a later pass (not this one). |

## Authority Model

Proposed hierarchy, root to leaf:

1. **Root doctrine** — `CLAUDE.md` / `AGENTS.md` (L0 entry point, routing only, no content duplication)
2. **Agent modules** — `Blueprints/agent-modules/*` (hard rules: prohibitions, action posture, layer scope)
3. **Cross-cutting specs** — `Blueprints/specs/*.spec.md` (design-md, ux-ui-execution — how doctrine gets written and executed at any layer)
4. **Division-level specs** — `slops-saloon/Blueprints/specs/*` (team-colorway-system-spec-v1.md is authoritative for anything color/branding at the team-presence layer; overrides nothing above it, but is the leaf authority for its topic)
5. **Division-level direction/decisions** — `slops-saloon/Direction/decisions/*` (fan-experience-doctrine-v1.md governs team-presence UX; corvus-ux-ui-direction-v1.md pending rebrand review)
6. **Templates & patterns** — `Blueprints/templates/*`, `References/patterns/*` (derived from specs above; must cite, not restate, the spec they implement)
7. **Handoffs** — point-in-time records, never authority. A handoff documents that a decision happened; it does not itself govern future work. Where a handoff and a spec disagree, the spec wins and the handoff should be updated to note supersession.
8. **Reviews** (`Direction/reviews/*`) — process artifacts explaining why a spec looks the way it does; supporting evidence, not authority.

Everything below layer 3 that conflicts with a spec above it loses. Handoffs and reviews should never be cited as the reason a decision stands — they should point up to the spec/decision doc that does.

## Truth Files

The minimal set that should be treated as load-bearing today:

- `Blueprints/agent-modules/hard-prohibitions.md`
- `Blueprints/agent-modules/action-posture.md`
- `Blueprints/agent-modules/layer-0-rules.md` (and its L1/L2 siblings)
- `Blueprints/specs/design-md.spec.md`
- `Blueprints/specs/ux-ui-execution.spec.md`
- `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md`
- `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md`
- `slops-saloon/Blueprints/handoffs/2026-07-03-design-doctrine-and-logo-swap-handoff.md` (most recent live design decision — treat as truth until folded into a spec)

Everything else in the design/branding space should trace back to one of these, either as an implementation (template, per-team instance) or a historical record (handoff, review).

## Files To Archive

- `Blueprints/agents/_imported/` (entire tree, ~90 files) — promotion confirmed complete for at least the design division via diff; verify remaining divisions the same way before archiving, but the pattern holds.
- `Blueprints/prompts/_old-prompts-for-analysis/` (2 files)
- `Solutions/reports/dbs-migration/` (~27 files) — separate pass, not design-scoped, but flagged as the largest stale block in the repo.
- `Blueprints/prompts/` completed one-off task prompts (nomenclature-rename, title-case-cleanup, etc.) once confirmed done.

## Files To Delete Later

(Deferred — no deletes in this pass per instructions. Candidates only, pending founder sign-off and a second confirmation pass:)

- `Blueprints/specs/brand-identity-digital-marketing.spec.md` (empty, 0 bytes) — delete unless someone intends to fill it this quarter.
- `Archive/corvus-root-direction-pre-dbs/`, `Archive/superseded-docs/brand-root-corvus-only/` — already archived once; delete once confirmed nothing references them.
- `Blueprints/agents/_imported/` — delete (not just archive) once every division's promotion is diff-confirmed, not just design.

## Execution Order

1. **Fix the two broken doctrine pointers first** (`slops-saloon/omen/` and `References/graphify/graphify-out/graph.json` references in `CLAUDE.md`/`AGENTS.md`/`graphify-hook.md`) — every other cleanup pass depends on knowing what's real, and right now root doctrine lies about what exists.
2. **Resolve the empty spec file** (`brand-identity-digital-marketing.spec.md`) — cheapest fix, highest confusion-per-byte.
3. **Confirm and archive `_imported/`** — biggest volume win, already validated for one division; extend the diff-check to the rest before moving.
4. **Rebrand-review `corvus-ux-ui-direction-v1.md`** and relocate/remove the stray Omen-scoped pending prompt — both are "is this still relevant" calls only the founder/owning agent can make quickly.
5. **Archive `_old-prompts-for-analysis/` and completed one-off prompts** — low-risk, no doctrine depends on them.
6. **Restructure `Blueprints/prompts/`** into explicit lifecycle folders (active/pending/templates/archive) — do this after step 5 so there's less to move.
7. **Cross-link templates/patterns/reviews back to their governing specs** — polish pass once the authority model above is real, not aspirational.
8. **Solutions/reports/dbs-migration/ archive** — lowest priority, unrelated to design, do whenever convenient.
