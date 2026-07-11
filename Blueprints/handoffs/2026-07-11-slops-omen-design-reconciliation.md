# Slops-OS ↔ Omen Design Reconciliation — 2026-07-11

Cross-repo synthesis of `2026-07-11-design-cleanup-map.md`/`-actions.md` (Slops-OS doctrine audit) and `2026-07-11-omen-implementation-audit.md`/`-cleanup-actions.md` (Omen implementation audit, evidence-graded with quoted line numbers and grep counts). This file lives in Slops-OS because cross-cutting reconciliation between doctrine and product-layer implementation is L0's job — but every implementation claim below is only as true as what the Omen audit actually verified in code, not what Slops-OS doctrine hoped was true.

## 1. What Slops-OS Got Right

- **The two broken doctrine pointers.** Slops-OS flagged `slops-saloon/omen/` and `References/graphify/graphify-out/graph.json` as citing paths that don't exist in the Slops-OS checkout. Confirmed still true — Omen lives in its own separate repo (`justinduverge-design/omen`), not under `slops-saloon/`. This wasn't paranoia; it's a real structural fact about how the repos are actually organized.
- **The general shape of the authority-drift problem.** Slops-OS predicted (correctly, per the Omen audit) that design specs would be ahead of shipped code, that a components/agents "_imported" staging pattern would leave superseded copies lying around, and that root doctrine files would drift from whatever the current spec actually is. The Omen audit independently found the same *shape* of problem inside Omen: `CLAUDE.md` citing a partially-superseded spec, two new 2026-07-10 specs correctly diagnosing a real bug the code hadn't caught up to yet.
- **Treating handoffs/audits as evidence, not authority.** Both audits converged independently on the same authority model principle: specs govern, audits/reviews diagnose, handoffs record. Slops-OS proposed this model without seeing Omen's code; Omen's audit validated it works in practice (the 2026-07-10 audit trio genuinely produced the two current specs, in that order).
- **Flagging `_old-prompts-for-analysis`/Corvus-era cruft as archival candidates**, sight unseen for Omen — this pattern (pre-rebrand naming surviving in doctrine) turned out to also apply inside Omen's own `Blueprints/prompts/`, though Omen has its own README-based self-classification for it rather than underscore folders.

## 2. What Omen Implementation Proves or Disproves

**Proves:**
- The founder's #1 complaint ("team colors overpower the product") is real and precisely located: `themeMode.js:347–407`, `applyTeamTokens()`, unconditional writes to `--color-bg`/`--color-surface-*`/`--color-border*`/`--color-accent*` with zero contrast check — confirmed by direct read, not assumed from the spec's description of the bug.
- `component-lock-v1.md`'s Card-shell spec is not being "under-enforced" — it's unimplemented from zero. Confirmed via full export-grep: no Card/Section/Panel/Shell primitive exists anywhere, no shadcn/Radix/cva installed. This is a stronger and more specific finding than the Slops-OS pass's generic "primitives should be enforced more."
- `theme.js` is genuinely dead (confirmed twice — static and dynamic import checks). Slops-OS-style audits often flag orphan files speculatively; this one is confidently correct.

**Disproves / corrects:**
- Slops-OS's audit prompt assumed theme files named `themeResolver.js` and `teamTheme.js` existed. They don't. The real files are `themeMode.js`, `teamTemplate.js`, and `frontend/src/data/nflTeams.js` (notably **not** under `lib/`). Any doctrine written against the assumed filenames would be inert.
- The prior (first-pass) Omen cleanup map called `DisconnectedState.jsx` and `EmptyState.jsx` "fully clean, token-only primitives." Direct read found each has one hardcoded Tailwind utility (`hover:bg-amber-400/20`). Minor, but the claim of full cleanliness was wrong.
- The assumption that `CLAUDE.md`'s pointer to `omen-ux-ui-design-system-v1.md` is simply "stale" is too blunt. The file's own banner shows it's *partially* superseded — it still owns live palette hexes and voice guidance. The correct fix is additive (cite three docs), not a swap (cite only the new ones). Doctrine-level thinking underestimated the nuance actual code/docs contained.
- `output/phase4-design-verification*` and `output/phase4-team-depth-fix*`, referenced as if they might contain evidence, do not exist anywhere in the repo — confirmed by explicit search. The only real verification evidence is a markdown doc with real WCAG math (`2026-07-10-team-theme-contract-verification.md`), which itself found a live gap (card-vs-shell contrast fails for 3 named teams). Doctrine can't assume screenshot/JSON evidence exists just because a phase name suggests it should.

## 3. Where Doctrine and Implementation Are Aligned

- **Token foundation.** `frontend/src/index.css` is confirmed to be the single real token source, with no competing definitions except the one known shadow palette (§4). Slops-OS's instinct to "preserve the token foundation" as a strength is validated — it's genuinely solid, not aspirational.
- **Verification culture.** `team-theme-contract-v1.md` was revised in place the same day it was drafted after a doctrinal conflict with `slops-saloon`'s fan-experience doctrine was caught. This is exactly the kind of self-correction Slops-OS's doctrine assumes happens — and it demonstrably did, with a paper trail.
- **Semantic-state token isolation.** Risk/tier/data-quality tokens (`--color-risk-*`, `--color-tier-*`, `--color-data-*`) are confirmed untouched by team theming — the boundary between "team presence" and "product meaning" that Slops-OS's founder priorities call for ("team presence second") is actually intact in the token architecture, even though it's violated at the shell-token layer.
- **The audit → spec → (pending) implementation pipeline.** Doctrine says audits should produce specs which should drive code. Omen's 2026-07-10 trio (app-wide-ux-audit → component-lock-v1 + team-theme-contract-v1) is that pipeline working correctly up through the spec stage. The break is specifically at spec → code, not earlier.

## 4. Where Doctrine and Implementation Are in Conflict

- **"Team colors must not overpower the product" (founder priority) vs. shipped code.** The doctrine is right and the code doesn't do it yet. This isn't a doctrine problem — the spec (`team-theme-contract-v1.md`) already says the correct thing. It's an unshipped-fix problem.
- **Slops-OS's implicit assumption that primitives exist and are being ignored vs. reality that they don't exist yet.** This changes the nature of the fix from "governance/enforcement" (a doctrine-layer intervention — linting, code review policy) to "build the missing thing" (an engineering task). Doctrine can't enforce compliance with a primitive that was never built.
- **Root doctrine file completeness.** `AGENTS.md` cites zero design specs at all (confirmed by direct read of its "reads on demand" section) while `CLAUDE.md` cites one, incompletely. The two root doctrine files in the same repo disagree with each other about what the design authority even is — a genuine authority-layer conflict, not implementation drift.
- **Marketing palette exceptionalism.** `Landing.jsx`/`OmenLanding.jsx` hardcode an entirely separate palette. No doctrine anywhere (Slops-OS or Omen) explicitly permits or forbids this. It's not that doctrine and implementation disagree — it's that doctrine is silent, and implementation filled the silence unilaterally.

## 5. Which Repo Should Own Each Truth Going Forward

| Truth | Owning repo | Why |
|---|---|---|
| Component API/tokens (Button, Input, Card, Type scale, Spacing) | **Omen** (`Blueprints/specs/design/component-lock-v1.md`) | This is implementation-adjacent doctrine — it only means something in the context of Omen's actual shadcn/Radix-based build. Slops-OS should not duplicate or restate it. |
| Team-skin override contract (which tokens a team may touch, contrast rules) | **Omen** (`Blueprints/specs/design/team-theme-contract-v1.md`), informed by **Slops-Saloon** | The contrast/shell rules are Omen-specific engineering constraints. The *cultural* content they draw from (which colors, which cultural variants, chant/fan-copy voice) correctly originates in `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` and `slops-saloon-fan-experience-doctrine-v1.md` — confirmed as direct citations inside Omen's own `nflTeams.js` doc comments. This is the one place a three-repo chain (Slops-OS priority → Slops-Saloon cultural spec → Omen engineering contract) is working as designed. |
| Base palette hexes, dark-mode token names, brand voice | **Omen** (`omen-ux-ui-design-system-v1.md`, trimmed) | Still-live product content; belongs where the product is. |
| "Team presence second, product shell first" as a priority ordering | **Slops-OS** | This is a founder-level cross-cutting priority, not implementation detail — Slops-OS should keep stating it, Omen should keep being the place it gets enforced in code. |
| Whether Landing.jsx's marketing palette is intentional brand exception | **Founder decision, recorded wherever it's decided** — likely Omen once resolved, since it's implementation-scoped, but the *decision itself* needs a human, not either repo's existing doctrine. | Neither repo currently has doctrine covering marketing-page exceptions to the token system. |
| Repo-level routing (Omen lives outside Slops-OS, at `justinduverge-design/omen`) | **Slops-OS** | This is exactly the kind of cross-repo pointer Slops-OS's root `CLAUDE.md`/`AGENTS.md` exist to maintain — and where the two stale-pointer bugs were found. |

## 6. Final Authority Hierarchy

Combined, root to leaf, across both repos:

1. **Slops-OS root doctrine** (`CLAUDE.md`/`AGENTS.md`) — cross-cutting priorities, repo routing. Must be corrected first (fix the `slops-saloon/omen/` and `References/graphify/` stale pointers) since everything downstream trusts these pointers to be true.
2. **Slops-Saloon division doctrine** (`team-colorway-system-spec-v1.md`, `slops-saloon-fan-experience-doctrine-v1.md`) — cultural/brand content for team presence. Confirmed as actually consumed by Omen code (cited in `nflTeams.js` doc comments) — this is real, working cross-repo authority, not aspirational.
3. **Omen product specs** (`component-lock-v1.md`, `team-theme-contract-v1.md`) — current, correctly-scoped, pre-implementation. This is where "how team color reaches the shell" and "what a Card looks like" actually get decided.
4. **Omen legacy spec, trimmed** (`omen-ux-ui-design-system-v1.md`) — still authoritative for what its own banner says it's still authoritative for (palette hexes, voice). Not fully retired.
5. **Omen token source of truth** (`frontend/src/index.css`) — the only place a CSS custom property should be declared. Confirmed clean except for the two shadow-palette pages.
6. **Omen team-surface logic** (`themeMode.js` + `teamTemplate.js` + `data/nflTeams.js`) — should be the only place team color is computed and applied. Currently true at the data/consumption layer, not yet true at the shell-application layer (the contrast-guard gap).
7. **Audits/reviews (both repos)** — diagnostic evidence, never authority. Confirmed working correctly as an input to specs in Omen's 2026-07-10 cycle.
8. **Handoffs/prompts (both repos)** — point-in-time records or execution instructions. Never authority, in either repo.

## 7. Top 10 Founder Decisions or Cleanup Actions

Ranked by leverage, spanning both repos:

1. **Ship the `themeMode.js` shell-token contrast guard.** (Omen) The single highest-leverage fix in the entire combined audit — extends already-proven WCAG logic from text tokens to shell tokens. Directly fixes the founder's #1 named priority.
2. **Build the Card/Section primitive from `component-lock-v1.md`.** (Omen) Zero scaffolding exists; unlocks simplification of 7 pages (152 combined inline-style instances) by adoption rather than per-page rewrites.
3. **Fix Slops-OS's two broken doctrine pointers** (`slops-saloon/omen/`, `References/graphify/`). (Slops-OS) Cheap, and every cross-repo claim in this reconciliation depends on Slops-OS's own pointers being trustworthy.
4. **Make `CLAUDE.md`'s Omen design-spec citation complete** (all three specs, by scope) and **give `AGENTS.md` a design-spec section it currently lacks entirely.** (Omen) Fixes the internal doctrine self-contradiction found in §4.
5. **Founder decision: `Landing.jsx`/`OmenLanding.jsx`'s marketing palette** — formalize as a documented exception or fold into main tokens. (Omen, decision needed from founder) Currently undocumented silence, not a doctrine violation — needs an explicit call either way.
6. **Delete `frontend/src/lib/theme.js`.** (Omen) Zero-risk, confirmed dead twice over.
7. **Sweep hardcoded colors in `components/ui/`** (`ErrorState`, `MockBanner`, `Spinner`, `UpgradeState`, plus the two near-clean hover-class leaks in `DisconnectedState`/`EmptyState`). (Omen) Mechanical, low-risk, closes the gap between "claimed clean" and "actually clean."
8. **Relocate `HelpButton.jsx`** out of `components/ui/` to a feature-level directory. (Omen) No content change, just correct its classification.
9. **Establish the marketing-palette precedent as doctrine** once the founder decides (#5) — write it down in whichever repo owns the decision, so the next marketing page doesn't reinvent the same ambiguity. (Cross-repo, follow-on from #5)
10. **Reconcile Slops-OS's `_imported/` agent-staging archival plan against Omen's own prompt/audit archival needs** — both repos independently found "completed work living in an active-looking directory" as a pattern; worth a single shared convention (e.g. both adopt the same `Archive/` naming discipline) rather than solving it twice, differently, per repo. (Cross-repo, lowest urgency)

## Blunt Final Verdict

**This is primarily an implementation problem wearing an authority-problem costume.**

The doctrine is mostly right. `component-lock-v1.md` and `team-theme-contract-v1.md` correctly diagnose real bugs and prescribe correct fixes — verified by reading the actual code, not by trusting the specs' self-description. The authority chain, once you trace it (Slops-OS priority → Slops-Saloon cultural spec → Omen engineering contract), genuinely works and is genuinely followed in at least one real place (`nflTeams.js`'s own doc comments cite the upstream doctrine by path). Verification culture is real, not aspirational — the same-day self-correction of `team-theme-contract-v1.md` is proof, not a claim.

What's actually broken is narrower and more mechanical than "doctrine is confused" or "nobody knows what's authoritative": one function in one file doesn't do for four CSS tokens what it already correctly does for one (`applyTeamTokens`, text vs. shell), and one entire category of component (Card/Section) was speced before it was built. Both are normal, bounded engineering backlog items, not systemic doctrine failure.

The one place a real *authority* problem exists is small and specific: Omen's own two root doctrine files (`CLAUDE.md`, `AGENTS.md`) disagree with each other about what the design authority even is — one cites an incomplete pointer, the other cites none. That's worth fixing (item #4 above), but it's a doc-hygiene fix, not evidence that the authority model itself is wrong.

Fix the shell-token guard, build the missing primitive, and complete the two doctrine pointers — in that order — and this system stops "suffering" from anything. It's closer to done than either audit, read in isolation, made it sound.
