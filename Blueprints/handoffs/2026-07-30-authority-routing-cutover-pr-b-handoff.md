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

## 4c. Founder rulings D76–D78 — applied

Backup first: `dev/_enforcement-backup-d76-d77-2026-07-30T220024/`.

- **D76** — removed all five retired/unrelated Codex trust entries (four dated session
  folders, one Palworld directory). **Zero trusted project entries now remain**; the only
  two entries left are `dev\slops` and `dev\slops\slops-saloon\omen`, both `untrusted`.
  Forbidden-pattern sweep: `documents.codex` 0, `palworld` 0, `onedrive` 0, `ssffmvp` 0,
  `corvus` 0, no broad-drive entry. **The underlying directories were not deleted or
  modified** — all four verified still present on disk.
- **D77** — removed `Bash(npx vite *)`. No replacement wildcard, no standing Vite
  permission. Allowlist is now 11 rules.
- **D78** — the premature "13 of 13" claim is retracted in the tracked gate report.
  Classification is not resolution; a path-A row that has not been tightened is an open
  finding, not a passing gate. The correct score for that interval was 11 of 13.

## 4d. Founder rulings D79–D81 — applied

Backup first: `dev/_enforcement-backup-d79-2026-07-30T220948/`.

- **D79** — removed `Skill(gstack:*)` **and** the top-level `Skill(gstack)`. The top-level
  entry had to go as well: it declares `Bash` in its own `allowed-tools` and explicitly
  dispatches into sub-skills (`invoke /autoplan`, `/investigate`, `/qa`, `/office-hours`),
  making it a standing dispatcher in its own right. **gstack was not uninstalled and no
  gstack skill was deleted** — all 52 `SKILL.md` files remain on disk. No replacement
  standing permission was added for any sub-skill.
- **D80** — the A1–A15 definitions are accepted as non-durable and were **not** invented or
  reconstructed. The approved seven-check regression set was run instead; all seven pass.
- **D81** — full re-verification, then conditional merge.

**Effective allowlist: 9 rules, zero wildcards.** No remaining rule can reach deployment,
release, publication, secrets/cookie modification, arbitrary Bash, arbitrary Write,
arbitrary Edit, or delegated Codex execution.

## 5. Blockers surfaced

**None. Zero path-A enforcement items remain open.**

Every path-A row is now tightened, not merely classified: D70 (OneDrive preference),
D71 (`npm` wildcards), D72 (write-capable plugin posture), D76 (retired trust entries),
D77 (`npx vite` wildcard), D79 (gstack standing authority).

**CUTOVER_COMPLETE is supportable.**

### Follow-up lesson recorded (D80, non-blocking)

> Future cutover gate definitions must be committed in a durable verification document and
> not exist only inside an execution prompt.

PR A's A1–A15 lived only in an execution prompt, so a literal by-number reconfirmation was
impossible. D80 replaced it with a seven-check regression set. This should not recur.

## 6. Last verified result

No build or test suite applies — this cutover is doctrine-only, zero app source touched.

Verification run: all five YAML blocks in `AGENT_INDEX.md` parse under `yaml.safe_load`;
Section 5 is 36 entries matching 36 files on disk with zero set difference; zero vendor
names remain in `tool-permissions.md`, `TOOLS_INDEX.md`, or `AGENT_INDEX.md`; exactly 3
active layer-named kickoffs and exactly 6 archived vendor-named kickoffs across both
repos.

**13 of 13 gates PASS**, genuinely. B9 moved to PASS once D76/D77 tightened the first two
path-A rows; B12 moved to PASS once D79 removed the gstack standing authority. Per-gate
commands and output are in `Direction/reviews/2026-07-30-pr-b-gate-results.md`.

The score history — 11/13, a premature 13/13, a retraction, 12/13, and now a genuine
13/13 — is retained deliberately in the tracked evidence so the error and its correction
stay visible.

**PR A regression verification (D80) — all 7 checks PASS**, against the merged defaults
(`origin/master 0632e42`, `origin/main 5be1d25`): schema parity `1.0.0 == 1.0.0`; the L2
mirror pin `SOURCE_COMMIT d26b7b6` resolves and **is an ancestor of `origin/master`**;
`MIRROR_OF` / `SCHEMA_VERSION` / `SOURCE_COMMIT` / `LAST_SYNCED` all present; PR B modifies
neither status-model file; both merged PR A handoffs present; the PR A task structure
(`current_sprint.md`, `agent_inbox.md`, `status-model.md`, `done/LEDGER.md`) resolves; and
the archived PR A control surfaces sit outside active routing.

## 7. Next recommended pull

Both PRs merged under D81 with normal merge commits, in order, **not squashed and not
rebased** — for traceability and because Omen's `status-model.md` pins
`SOURCE_COMMIT d26b7b6` from Slops-OS.

Next session: resume the normal queue. Your kickoff is now `Blueprints/prompts/kickoff-l0.md`,
which will ask you to confirm your session's actual capabilities and read Runtime Policy
before applying any authority. `assignments: []` means you start at your runtime's
`default_tier` until the founder issues an Active Trust Assignment.
