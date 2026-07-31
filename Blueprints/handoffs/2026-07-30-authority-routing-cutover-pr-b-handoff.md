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

- ~~D63's canonical A/B/C path definitions were not inlined in the packet.~~
  **RESOLVED by D73.** The canonical definitions are A = tighten enforcement,
  B = founder-ratify existing behavior and update doctrine, C = time-limited exception
  with owner, reason, expiry, and follow-up task key. Every audit row has been remapped.
  Every finding resolved to **A**. No B was used (no ratification sought); no C was used
  (no exception could satisfy all four fields).
- `cutover/planning-pipeline` still exists on both remotes (it is PR A's merged branch).
  Left untouched; delete only if you want to.

## 4b. Founder rulings D70–D75 — applied

Backup taken first: `dev/_enforcement-backup-d70-d72-2026-07-30T195706/`. The two
pre-existing backup directories were not touched.

- **D70** — removed the `perPath` OneDrive editor preference from `config.toml`.
  Unrelated editor preferences preserved (`global = "wsl"` intact). Zero OneDrive and
  zero `ssffmvp` entries now remain across all three config files. **B10 now PASSES.**
- **D71** — removed `Bash(npm run *)` and `Bash(npm test *)`. Replaced with exact
  `Bash(npm test)`, `Bash(npm run test)`, `Bash(npm run evals:validate)`. Script
  inventory drove the decision: `start`, `dev`, and `cron` all launch servers or cron and
  were denied; `evals:mock` was denied as unbounded. No npm wildcard remains.
- **D72** — disabled all 8 write-capable-or-ambiguous plugins in the default profile,
  including `computer-use` and `sites`. Posture is now **1 enabled, 16 disabled**; the
  only enabled plugin is the read-only `codex-security`. No credentials, connections, or
  installations deleted — only `enabled` flags changed. No secret printed or modified.
- **D73** — canonical A/B/C definitions restored and every row remapped.
- **D74** — B5 wording replaced; verified on active surfaces only.
- **D75** — all 13 gates rerun; evidence tracked in
  `Direction/reviews/2026-07-30-pr-b-gate-results.md`.

## 5. Blockers surfaced

**CUTOVER_COMPLETE is now reachable.** All 13 PR B gates pass, local enforcement cleanup
is verified, and direct Codex hardening is verified. Re-confirm PR A's 15 gates before
merging.

Two **path-A** items remain open. Neither blocks a gate. Neither was actioned because no
ruling covered it, and acting anyway would be the scope expansion this cutover exists to
eliminate:

1. **Five retired-project trust entries** in `config.toml` — four dated Codex session
   folders plus a Palworld directory. Narrow, but stale.
2. **`Bash(npx vite *)`** — the last wildcard in the Claude allowlist. Not an npm rule,
   so outside D71's scope.

Both are one edit each on founder-owned machine config.

## 6. Last verified result

No build or test suite applies — this cutover is doctrine-only, zero app source touched.

Verification run: all five YAML blocks in `AGENT_INDEX.md` parse under `yaml.safe_load`;
Section 5 is 36 entries matching 36 files on disk with zero set difference; zero vendor
names remain in `tool-permissions.md`, `TOOLS_INDEX.md`, or `AGENT_INDEX.md`; exactly 3
active layer-named kickoffs and exactly 6 archived vendor-named kickoffs across both
repos.

**13 of 13 gates PASS** after D70–D72. B10 moved FAIL → PASS once the OneDrive preference
was removed; B12 moved 3/5 → 5/5 once the npm wildcard was removed and the write-capable
plugins were disabled. Per-gate commands and output are in
`Direction/reviews/2026-07-30-pr-b-gate-results.md`.

## 7. Next recommended pull

Founder review of both PRs. If the two open path-A items are wanted, they are one edit
each. Merge order is **Slops-OS #10, then Omen #247** — L2's `kickoff-l2.md` points at
L0's `AGENT_INDEX.md` §§8–9, so merging L2 first would leave those pointers dangling.
Re-confirm PR A's 15 gates before merging. Do not merge until then.
