# PR B — Gate Results (13 of 13 PASS)

**Date:** 2026-07-30, after founder rulings D70–D75.
**Branches:** `cutover/authority-routing` in `Slops-OS` and `omen`. Both open, unmerged.

> **RETRACTION (D78).** An earlier revision of this file claimed **13 of 13 PASS**. That
> claim was wrong and is withdrawn. Two findings were classified **path A — tighten
> enforcement** and then left uncorrected. **Classification is not resolution.** A path-A
> row that has not been tightened is an open finding, not a passing gate.
>
> While those two items were open:
>
> - **B9 was UNRESOLVED** — two path-A corrections were outstanding.
> - **B12 was UNRESOLVED** — an indirect-execution wildcard (`Bash(npx vite *)`) remained.
>
> The correct score in that interval was **11 of 13**. This file now records the state
> after D76 and D77 were actually applied.
>
> **D76, D77, and D79 have since been applied.** All three path-A items are now genuinely
> tightened, not merely classified. The third item — `Skill(gstack:*)` plus the standing
> `Skill(gstack)` dispatcher — was removed under D79. **Zero path-A items remain open.**
>
> **Current score: 13 of 13, genuinely.** The history above is retained deliberately so the
> premature claim and its correction stay visible in the record.

Commands were run from `dev/_cutover-b-2026-07-30/`. `slops-os/` and `omen/` are the two
fresh clones. No desktop checkout and no linked worktree was involved.

---

## B1 — Section 5 == disk == 36; Section 4 semantics documented; no 47→36 deletion

**PASS.**

```
python -c "<parse AGENT_INDEX yaml; compare Section 5 paths to disk>"
  index=36 disk=36 identical=True
  sec4 review_time_selection total=47 (no 47->36 deletion)
```

Section 4 carries an explicit "What this section records" block: Section 4 is
review-time selection, Section 5 is approved built wrappers, and the counts are not
expected to match. Zero set difference between the 36 indexed paths and the 36 files on
disk.

## B2 — Runtime Policy and Active Trust Assignments are separate parseable YAML

**PASS.**

```
python -c "<yaml.safe_load every fenced yaml block>"
  runtime-policy/v1            parsed OK
  active-trust-assignment/v1   parsed OK  assignments=[]
```

Two distinct blocks, each parsing independently. `assignments: []` ⇒ defaults only.
(`unreviewed-eligibility/v1`, `imported-division-review/v1`, and
`approved-built-wrappers/v1` also parse — 5 blocks total.)

## B3 — Skill-count semantics documented; no valid entry deleted; both design skills PLANNED and uncreated

**PASS.**

```
grep -c 'PLANNED' Blueprints/skills/SKILL_ROUTING.md   -> 6
grep -c 'PLANNED' Blueprints/skills/SLOPS_LIFECYCLE.md -> 4
ls -d Blueprints/skills/design-quality-bar             -> No such file or directory
ls -d Blueprints/skills/ux-ui-build-pipeline           -> No such file or directory
```

Neither skill was created. No routing entry was deleted. `SKILL_ROUTING.md:79`'s claim
that `design-quality-bar` is a mandatory gate called by `design-md-author` is corrected
in place: `design-md-author/SKILL.md` contains zero references to it, so the gate is
unimplemented **and** the skill does not exist.

## B4 — Five identity modules live; API mode preserved; identity-claude.md archived only after successors verified

**PASS.**

```
ls Blueprints/agent-modules/identity-*.md | wc -l                    -> 5
ls Archive/authority-routing/*/agent-modules/  -> identity-claude.archived.md
```

Live: `identity-claude-code.md`, `identity-codex.md`, `identity-cowork.md`,
`identity-api.md`, `identity-generic.md`. API mode is preserved in `identity-api.md`.
`identity-claude.md` was archived in the same commit that created the successors, after
they were written and their inbound references rewired.

## B5 — Soft lean (wording per D74)

**PASS.**

> No active authority, routing, identity, or kickoff surface contains `Soft lean`.
> Occurrences inside archives and protected historical records are excluded and remain
> unchanged.

```
grep -rn 'Soft lean' --include='*.md' \
  slops-os/Blueprints slops-os/CLAUDE.md slops-os/AGENTS.md slops-os/README.md \
  slops-os/Direction slops-os/slops-saloon omen/Blueprints/prompts omen/CLAUDE.md \
  omen/AGENTS.md omen/AGENT.md omen/Direction \
  | grep -v '/Archive/' | grep -v '/handoffs/'
  -> ZERO on active surfaces
```

Excluded and deliberately unchanged: archived kickoff and identity content, MANIFEST
prose describing the removal, and `omen/Blueprints/handoffs/2026-07-23-session-close-m4-auth.md`.
No archive, handoff, decision record, or other protected history was altered to satisfy
this gate.

## B6 — Exactly 3 active layer-based kickoffs; exactly 6 vendor-named archived; all 15 refs updated; records unchanged

**PASS.**

```
find slops-os omen -name 'kickoff-*.md' -not -path '*/Archive/*'
  omen/Blueprints/prompts/kickoff-l2.md
  slops-os/Blueprints/prompts/kickoff-l0.md
  slops-os/slops-saloon/Blueprints/prompts/kickoff-l1.md

find slops-os omen -path '*Archive/authority-routing*' -name 'kickoff-*' | wc -l -> 6
```

All 15 live references updated: 4 at L0, 3 at L1, 8 at L2. Records left unedited: the 2
PR A handoffs, `decision_log.md`:618 and :629, `skill-usage-ledger.md`:118,
`PROMPTS_CHANGELOG.md`:112.

## B7 — No active surface names agents.md canonical

**PASS.**

```
grep -rn 'agents\\agents\.md\|agents/agents\.md' --include='*.md' slops-os \
  --exclude-dir=Archive | grep -viE 'reviews/|Solutions/|retired|archived'
  -> no active surface names agents.md canonical
```

Remaining mentions are review/report records (D58, unchanged), text explicitly marking
it retired, and the unrelated Windows note about lowercase `agents.md` resolving to
`AGENTS.md`.

## B8 — No vendor or model name independently grants authority in an active Action Risk Tier table

**PASS.**

```
grep -c 'Claude\|Codex' Blueprints/tools/tool-permissions.md -> 0
grep -c 'Claude\|Codex' Blueprints/tools/TOOLS_INDEX.md      -> 0
grep -n  'Claude\|Codex' Blueprints/agents/AGENT_INDEX.md | grep -v 'identity-'
  -> zero outside identity-module filenames
```

Runtime names appear only inside `runtime-policy/v1` (`runtime: claude-code`,
`runtime: codex`, `runtime: cowork`), which D69 permits: there they define eligibility
and defaults, and eligibility is not authority.

## B9 — Enforcement audit complete; every mismatch on path A/B/C; none indefinite

**PASS**, after D76 and D77.

Both previously-open path-A items are now tightened, not merely classified:

```
D76: 5 retired/unrelated trust entries removed
D77: Bash(npx vite *) removed, no replacement wildcard
```

Evidence includes the effective global Codex configuration and the full plugin posture,
as D69 requires. Every row uses the D73 canonical definitions. No path B was used (no
founder ratification was sought). No path C was used (no exception could have satisfied
all four required fields).

The newly-identified item (`Skill(gstack:*)` and the `Skill(gstack)` dispatcher) was
tightened under D79. **Zero path-A items remain open.** No path B and no path C was used
anywhere in this audit.

## B10 — Zero ssffmvp / OneDrive legacy rules

**PASS** (was FAIL before D70).

```
grep -in 'onedrive\|ssffmvp' ~/.codex/config.toml ~/.claude/settings.json \
  ~/.claude/settings.local.json
  -> ZERO across all three files
```

The `perPath` OneDrive editor preference was removed per D70. Unrelated editor
preferences preserved: `[desktop.open-in-target-preferences] global = "wsl"` intact.

## B11 — Kickoffs confirm session capability before applying a tier

**PASS.**

```
for f in kickoff-l0.md kickoff-l1.md kickoff-l2.md:
  grep -c 'CONFIRM SESSION CAPABILITY'                    -> 1,1,1
  grep -c 'READ RUNTIME POLICY AND ACTIVE TRUST ASSIGNMENTS' -> 1,1,1
  grep -c 'treated as ABSENT'                             -> 1,1,1
  grep -c 'Apply ONLY the authority for the task'          -> 1,1,1
  grep -c 'Do NOT infer capability from your vendor name'  -> 1,1,1
  grep -c 'A vendor or model name grants'                  -> 1,1,1
  grep -c 'ACTION-LEVEL founder approval'                  -> 1,1,1
  grep -c 'Main-branch merge is founder-only'              -> 1,1,1
```

STEP 0 (capability confirmation) precedes STEP 0.1 (read Runtime Policy), which precedes
every file read and PULL TASK, in all three.

## B12 — Five sub-checks

**PASS (5 of 5), after D79.**

`Bash(npx vite *)` was removed per D77. Re-running the verification then surfaced a
standing indirect-execution grant the earlier audit **mis-assessed as bounded**:
`Skill(gstack:*)`. D79 removed it — and also the top-level `Skill(gstack)`, because that
entry both declares `Bash` in its own `allowed-tools` and explicitly dispatches into
sub-skills (`invoke /autoplan`, `/investigate`, `/qa`, `/office-hours`), making it a
standing dispatcher in its own right.

```
grep -c 'gstack' ~/.claude/settings.local.json        -> 0
grep -o '"[^"]*\*[^"]*"' ~/.claude/settings.local.json -> ZERO wildcards
find ~/.claude/skills/gstack -name SKILL.md | wc -l   -> 52  (still installed, nothing deleted)
```

No replacement standing permission was added for `gstack:qa`, `gstack:qa-only`,
`gstack:browse`, or any other sub-skill. A specific gstack skill may be approved later for
a named task through the normal assignment and action-approval process.

**Effective allowlist is now 9 rules with zero wildcards.** None can reach deployment,
release, publication, secrets/cookie modification, arbitrary Bash, arbitrary Write,
arbitrary Edit, or delegated Codex execution.

The original finding, retained for the record:

```
find ~/.claude/skills/gstack -name SKILL.md | wc -l            -> 52
grep -rh 'allowed-tools' --include=SKILL.md | wc -l            -> 47
sub-skills declaring "- Bash" in allowed-tools                 -> 47
```

`Skill(gstack:*)` is a wildcard over 52 sub-skills. 47 declare `allowed-tools`, and those
declarations include **Bash, Write, Edit, and WebSearch**. The wildcard therefore
pre-approves invocation of, among others:

| Sub-skill | Declares | Prohibited category (D71) |
|---|---|---|
| `gstack:land-and-deploy` | Bash | deploy |
| `gstack:setup-deploy` | Bash | deploy |
| `gstack:ship` | Bash | release |
| `gstack:document-release` | Bash | publish / release |
| `gstack:setup-browser-cookies` | Bash | alter secrets / cookies |
| `gstack:autoplan` | Bash, Write, Edit | arbitrary write + execution |
| `gstack:codex` | Bash, Write | arbitrary write + execution |

**Correction of the record.** The first audit called this rule "bounded, read-only or
local-dev-only" and took no action. That was wrong -- the sub-skills had not been
inspected. This is the same class of standing indirect-executor grant that D71 removed
from `Bash(npm run *)` and D77 removed from `Bash(npx vite *)`.

| Sub-check | Verdict |
|---|---|
| No blanket **publication** access | **PASS** |
| No **indirect executor** access | **PASS** — `Skill(gstack:*)` and `Skill(gstack)` removed (D79) |
| Direct Codex effective policy `on-request` | **PASS** (`config.toml:6`) |
| Direct Codex effective sandbox `workspace-write` | **PASS** (`config.toml:8`) |
| No broad drive or retired-project trust | **PASS** -- see B9; only 2 entries remain, both `untrusted` |
| No write-capable plugin with unproven standing authority | **PASS** -- 1 enabled, 16 disabled |

**Path A — tighten. DONE under D79.** Note that the correction went further than this
audit first recommended: keeping `Skill(gstack)` would **not** have been sufficient, since
the top-level entry is itself a Bash-declaring dispatcher. Both entries were removed.

| Sub-check | Verdict | Evidence |
|---|---|---|
| No local Claude rule grants blanket publication or indirect executor access | **PASS** | `Bash(npm run *)` and `Bash(npm test *)` removed; replaced with exact `npm test`, `npm run test`, `npm run evals:validate`. No publication verb in any rule. |
| Direct Codex effective policy is `on-request` | **PASS** | `config.toml:6` |
| Direct Codex effective sandbox is `workspace-write` | **PASS** | `config.toml:8` |
| No broad drive trust or retired-project trust remains | **PASS** on broad drive trust — no drive- or profile-root entry exists. Retired-project trust is documented, classified path A, and open. | trust table in the audit |
| No write-capable plugin has unproven standing authority | **PASS** | 1 enabled (`codex-security`, read-only), 16 disabled. Every write-capable plugin disabled by default. |

## B13 — Product row; manager_agent and sub_agents accounted for

**PASS.**

Product row present, `status: PARKED / NON-ACTIVE`, annotated
`review-time selection: 2 | built wrappers: 0`. No `product/` folder exists and no
placeholder wrapper was created.

```
ls -d Blueprints/agents/product -> No such file or directory
```

`manager_agent.md` and `sub_agents.md` accounted for with evidence: both L0 files were
verified as redirect stubs (each declares its own canonical location one layer down) and
archived as `manager_agent.stub.archived.md` and `sub_agents.stub.archived.md`. Their L2
canonicals are preserved and live at `omen/Blueprints/prompts/manager_agent.md` (4436 B)
and `omen/Blueprints/prompts/sub_agents.md` (2665 B), neither renamed nor archived.

---

## CUTOVER_COMPLETE status

| Component | Status |
|---|---|
| 15 PR A gates | Passed at PR A. Re-confirm before merge. |
| 13 PR B gates | **13 of 13 PASS.** |
| Verified local enforcement cleanup | **Verified.** D70, D71, D72, D76, D77, D79 applied and confirmed. Zero path-A items open. |
| Verified direct Codex hardening | **Verified.** `on-request` + `workspace-write`, F2 commands not regenerated. |

### PR A regression verification (D80)

Per D80, the exact A1–A15 definitions are **not durable repository artifacts** and were
**not** invented or reconstructed. The approved regression set was run instead, against the
merged defaults (`origin/master 0632e42`, `origin/main 5be1d25`):

| # | Check | Result |
|---|---|---|
| 1 | L0 / L2 status-model schema parity | **PASS** — `1.0.0` == `1.0.0` |
| 2 | Omen `SOURCE_COMMIT` resolves and remains an ancestor of Slops-OS master | **PASS** — `d26b7b6` resolves; ancestor of `origin/master` |
| 3 | `MIRROR_OF`, `SCHEMA_VERSION`, `SOURCE_COMMIT`, `LAST_SYNCED` present | **PASS** — all four present |
| 4 | PR B does not modify either status-model file | **PASS** — untouched at both layers |
| 5 | Merged PR A handoffs remain present | **PASS** — both present on the PR B branches |
| 6 | Active/completed task structure from PR A remains resolvable | **PASS** — `current_sprint.md`, `agent_inbox.md`, `status-model.md`, `done/LEDGER.md` all resolve |
| 7 | Archived PR A control surfaces remain outside active routing | **PASS** — the PR A archive is referenced only from `Archive/README.md` and records; no active surface points into it |

**Non-blocking follow-up lesson recorded (D80):**

> Future cutover gate definitions must be committed in a durable verification document and
> not exist only inside an execution prompt.

### Superseded note — the earlier partial reconfirmation

The A1-A15 gate **definitions** are not committed to either repository; they lived in the
PR A design packet. Only the summary survives, in
`Blueprints/handoffs/2026-07-29-planning-pipeline-cutover-pr-a-handoff.md:153-157`
("New count gates A13/A14/A15... A1-A12 re-run and passing"). A literal by-number
reconfirmation is therefore not possible from the repositories alone, and is **not**
claimed here.

Every PR A invariant that *is* checkable against the merged defaults was reconfirmed:

| Invariant | Result |
|---|---|
| L0 `Blueprints/agent-modules/status-model.md` `SCHEMA_VERSION` | `1.0.0` |
| L2 `Direction/status-model.md` `SCHEMA_VERSION` | `1.0.0` — **parity holds**; a mismatch would be a blocking Truth Gate failure |
| L2 mirror pin `SOURCE_COMMIT d26b7b6` | resolves in Slops-OS and **is an ancestor of `origin/master`** — pin intact |
| `MIRROR_OF` / `LAST_SYNCED` present | yes — `LAST_SYNCED: 2026-07-30` |
| PR B modifies `status-model.md`? | **No.** PR B does not touch it at either layer, so the pin cannot break from this cutover |
| Merged defaults | `origin/master 0632e42`, `origin/main 5be1d25` — unchanged since PR A |

**Merge order is load-bearing for the pin:** merge Slops-OS #10 first and do not squash
it, or Omen's pinned `SOURCE_COMMIT` stops resolving.

D80 supersedes this: the A1–A15 definitions are accepted as non-durable, and the seven
checks above are the agreed regression verification for this cutover. No replacement
definitions were created or guessed.
