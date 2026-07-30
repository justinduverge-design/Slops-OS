# Handoff — Authority / Routing Cutover (PR B), L0 + L1

**Date:** 2026-07-30
**Branch:** `cutover/authority-routing` (pushed, PR opened, **not merged**)
**Companion:** the L2 half is on the same branch name in the `omen` repository.

## 1. Files updated

Worked in a fresh clone at `C:/Users/JDuve/dev/_cutover-b-2026-07-30/slops-os`. The
desktop checkout at `dev/SLOPS` was never written to, and no linked worktree was entered.

**`7ba1d9c` — runtime trust model + identity split**

- `Blueprints/agents/AGENT_INDEX.md` — became runtime policy + active assignments.
  Sections 8 (`runtime-policy/v1`, `unreviewed-eligibility/v1`) and 9
  (`active-trust-assignment/v1`, `assignments: []`) installed verbatim. Sections 4 and 5
  converted to fenced YAML first, then the authority blocks appended, per §1.5.
- `Blueprints/agent-modules/identity-claude-code.md`, `identity-api.md`,
  `identity-generic.md` — created.
- `Blueprints/agent-modules/identity-codex.md`, `identity-cowork.md` — rewritten off the
  broken peer-pair framing; `Soft lean` removed.

**`f2e6079` — one permission model**

- `Blueprints/tools/tool-permissions.md` — "Tier-Based Authorization Model" renamed
  **Action Risk Tiers**; declared canonical action/approval doctrine.
- `Blueprints/tools/TOOLS_INDEX.md` — declared a mirror, explicitly not a competing
  authority.

**`9c200e4` — kickoff migration + archives**

- Created `Blueprints/prompts/kickoff-l0.md`,
  `slops-saloon/Blueprints/prompts/kickoff-l1.md`.
- Updated 7 live L0/L1 kickoff references and 4 identity-module references.
- Archived 15 files to `Archive/authority-routing/2026-07-30-pre-runtime-trust/` with
  `MANIFEST.md` and an `Archive/README.md` index line.
- `SKILL_ROUTING.md`, `SLOPS_LIFECYCLE.md` — design skills set to `PLANNED`;
  vendor contract rekeyed; app-scaffold template inheritance documented.
- `layer-handoff-protocol.md`, `slops-agent-author/SKILL.md`, `agents/README.md`,
  `tools/README.md`, `README.md` — rewired off `agents.md` and off the archived stubs.
- `phases-2-4-claude-index-tools-skills.md` — HISTORICAL banner added; body unedited.

**`d0ede94` — enforcement audit**

- `Direction/reviews/2026-07-30-authority-cutover-enforcement-audit.md` — created.
- `AGENT_INDEX.md` — final vendor rekey of Section 2 and the promotion process.

## 2. Files discussed, not changed

`design-md-author/SKILL.md` (read to verify it has **zero** references to
`design-quality-bar` — it does); `omen/Blueprints/prompts/manager_agent.md` and
`sub_agents.md` (verified live, deliberately preserved); the 36 wrapper files under
`Blueprints/agents/<division>/` (verified against Section 5, untouched);
`~/.codex/config.toml` and `~/.claude/settings*.json` (read-only audit evidence).

## 3. Decisions made — for `decision_log.md`

1. **Section 4 vs Section 5 counts are not a defect.** Section 4 records review-time
   selection (47); Section 5 records approved built wrappers (36 == disk). No 47→36
   deletion was performed and none should be.
2. **The Product row is preserved, PARKED / NON-ACTIVE**, annotated
   `review-time selection: 2 | built wrappers: 0`. No `product/` folder and no
   placeholder wrappers were created.
3. **`runbook_ai_workflow.md` was verified before archiving (§8d required this).** Its
   Roles table assigned standing authority by vendor, so it is a retired
   authority/routing surface, not live operational guidance. Archived.
4. **B5 is scoped to active surfaces.** `grep -rn 'Soft lean'` cannot return 0 globally
   without violating record immutability (D58) and archive content-preservation. Zero on
   active surfaces; the surviving hits are archived content, MANIFEST prose describing
   the removal, and `omen/Blueprints/handoffs/2026-07-23-...` (a protected record).
5. **Global machine configuration was not modified.** The enforcement findings are
   founder-owned and outside both repos; no assignment covers editing global config.

## 4. Unresolved questions

- **D63's canonical A/B/C path definitions were not inlined in the packet.** The audit
  defines them as enforce-now / time-boxed-exception / retire and says so explicitly. If
  D63 differs, re-map the rows — the findings and severities do not change.
- `cutover/planning-pipeline` still exists on both remotes (it is PR A's merged branch).
  Left untouched; delete only if you want to.

## 5. Blockers surfaced

**CUTOVER_COMPLETE is not yet reachable.** It needs verified local enforcement cleanup,
and three path-A items are open, all founder-owned machine config:

1. `Bash(npm run *)` in `~/.claude/settings.local.json` — a standing indirect-executor
   grant. Replace the wildcard with explicit scripts.
2. `computer-use` and `sites` Codex plugins — write-capable, standing, no recorded
   assignment. Disable or record a time-boxed exception.
3. Path C cleanups: five retired-project trust entries and one OneDrive `perPath` line at
   `config.toml:117`.

## 6. Last verified result

No build or test suite applies — this cutover is doctrine-only, zero app source touched.

Verification run: all five YAML blocks in `AGENT_INDEX.md` parse under `yaml.safe_load`;
Section 5 is 36 entries matching 36 files on disk with zero set difference; zero vendor
names remain in `tool-permissions.md`, `TOOLS_INDEX.md`, or `AGENT_INDEX.md`; exactly 3
active layer-named kickoffs and exactly 6 archived vendor-named kickoffs across both
repos.

**11 of 13 gates PASS. B10 fails on one residual OneDrive UI preference (zero authority
impact, Path C). B12 passes 3 of 5 sub-checks with 2 findings.** Full detail in the
enforcement audit and the PR body.

## 7. Next recommended pull

Action the three Path A enforcement items above, then re-run B10 and B12. Those are the
only things standing between this branch and CUTOVER_COMPLETE. Do not merge either PR
until both are green and PR A's 15 gates are re-confirmed.
