# DBS Final Folder Tree Review
**Generated:** 2026-05-22  
**Inspector:** Claude Cowork (read-only — no files were changed)  
**Scope:** SLOPS root · ssffmvp · Omen

---

## Part 1 — Actual Folder Trees

### 1A — SLOPS Root

```
SLOPS/
├── .claude/                          [local tool state — settings.local.json]
├── .git/                             [do not touch]
├── Archive/
│   ├── README.md
│   ├── parked/                       [not expanded]
│   ├── quarantine/                   [not expanded]
│   └── superseded-docs/              [not expanded]
├── Blueprints/
│   ├── README.md
│   ├── agents/
│   │   ├── README.md
│   │   ├── agents.md
│   │   ├── manager_agent.md
│   │   ├── sub_agents.md
│   │   ├── handoffs/
│   │   │   ├── README.md
│   │   │   └── decisions.md
│   │   ├── Academic Division/        (5 agent .md files)
│   │   ├── Design Division/          (7 agent .md files)
│   │   ├── Engineering Division/     (15 agent .md files)
│   │   ├── Finance Division/         (5 agent .md files)
│   │   ├── Marketing Division/       (9 agent .md files)
│   │   ├── Paid Media Division/      (7 agent .md files)
│   │   ├── Product Division/         (5 agent .md files)
│   │   ├── Project Management Division/ (6 agent .md files)
│   │   ├── Sales Division/           (9 agent .md files)
│   │   ├── Specialized Division/     (14 agent .md files)
│   │   └── Support Division/         (6 agent .md files)
│   ├── handoffs/                     ⚠️ duplicate of agents/handoffs/
│   │   ├── README.md
│   │   └── decisions.md
│   ├── playbooks/
│   │   └── runbook_ai_workflow.md
│   ├── prompts/
│   │   ├── README.md
│   │   ├── Claude_prompt_format.md
│   │   ├── Codex_prompt_format.md
│   │   ├── codex_trade_analyzer_embed.md
│   │   ├── dbs-style_new_chat.md
│   │   ├── simple_prompt_system_claude.md
│   │   └── simple_prompt_system_codex.md
│   ├── skills/
│   │   ├── README.md
│   │   ├── pre-build-research.skill
│   │   ├── skills.md
│   │   └── tools.md
│   ├── specs/
│   │   └── README.md                 (empty — placeholder only)
│   └── workflows/
│       ├── README.md
│       ├── AGENT.md
│       └── CLAUDE.md
├── Direction/
│   ├── README.md
│   ├── 00_FINAL_PLAN.md
│   ├── AGENT.md
│   ├── CLAUDE.md
│   ├── TODO.md
│   ├── context.md
│   ├── manifesto.md
│   └── roadmap.md
├── References/
│   └── README.md                     (empty — placeholder only)
├── Solutions/
│   ├── README.md
│   ├── .codex-artifacts/             [auto-generated backups — do not move]
│   │   ├── backups/                  (8 timestamped backup sets)
│   │   └── design-review-20260517/   (6 screenshot .png files)
│   └── reports/
│       ├── SSFFMVP_ROOT_CLEANUP_PLAN.md
│       └── dbs-migration/
│           ├── DBS_CANONICAL_REVIEW.md
│           ├── DBS_FOLDER_SCHEMA.md
│           ├── DBS_GIT_HYGIENE_REPORT.md
│           ├── DBS_INTEGRITY_REPAIR_REPORT.md
│           ├── DBS_MOVE_ARCHIVE_SUMMARY.md
│           ├── DBS_PHASE_2_COPY_REPORT.md
│           ├── DBS_PHASE_4A_LOW_RISK_REPORT.md
│           ├── DBS_PHASE_4B_MEDIUM_RISK_REPORT.md
│           ├── DBS_PHASE_4C_HIGH_RISK_REVIEW.md
│           ├── DBS_PHASE_5_CONTEXT_BRAND_REPORT.md
│           ├── DBS_PHASE_6_PROJECTS_SSFFMVP_REVIEW.md
│           ├── DBS_PHASE_7_QUARANTINE_REPORT.md
│           ├── DBS_PHASE_8_FINALIZATION_REPORT.md
│           ├── DBS_PHASE_9_PHYSICAL_CLEANUP_REPORT.md
│           ├── DBS_PROJECTS_SSFFMVP_COMPARISON.md
│           └── DBS_REMAINING_WORK_MAP.md
├── _archive/                         ⚠️ empty lowercase duplicate of Archive/
├── DBS_INDEX.md
├── README.md
├── "Slops OS Global Context.md"      ⚠️ loose — not in a DBS folder
└── roadmap.md                        ⚠️ loose — duplicates Direction/roadmap.md
```

---

### 1B — ssffmvp

```
ssffmvp/
├── .aiprompts/                       [empty — local tool state]
├── .claude/                          [local tool state — settings.local.json + skills/]
├── .dockerignore                     [active app — do not move]
├── .env                              [sensitive — not opened]
├── .env.cloud                        [sensitive — not opened]
├── .env.example                      [active app — do not move]
├── .env.local-backup-20260502        [sensitive — not opened] ⚠️ backup env at root
├── .git/                             [do not touch]
├── .github/                          [do not touch]
├── .gitignore                        [active app — do not move]
├── Archive/                          (empty)
├── Blueprints/                       ⚠️ EMPTY — no content
├── Omen/                           → see Layer 3 tree
├── Direction/
│   ├── context.md
│   ├── current_sprint.md
│   ├── decision_log.md
│   └── roadmap.md
├── Dockerfile                        [active app — do not move]
├── Dockerfile.cron                   [active app — do not move]
├── References/                       ⚠️ EMPTY — no content
├── Solutions/                        ⚠️ EMPTY — no content
├── agent_handoff.md                  ⚠️ loose — DBS candidate (Direction or Blueprints)
├── agent_inbox.md                    ⚠️ loose — DBS candidate (Direction)
├── audit_report.json                 ⚠️ loose — Solutions candidate
├── BRAND_STRATEGY.md                 ⚠️ loose — belongs in Omen/Brand or Omen/Blueprints
├── client/                           [active app — do not move]
│   └── (React app — App.jsx, AuthApp.jsx, vite.config.js, dist/, etc.)
├── design.md                         ⚠️ loose — DBS candidate (Omen/Blueprints or Blueprints)
├── docker-compose.yml                [active app — do not move]
├── docs/
│   ├── ADR-004-yahoo-oauth-replacement.md   ⚠️ loose — Blueprints/specs candidate
│   └── ADR-005-vorp-v2-trade-analysis.md    ⚠️ loose — Blueprints/specs candidate
├── evals/                            [active app — do not move]
│   └── promptfoo/ (configs, fixtures, prompts)
├── frontend/                         [active app — do not move]
│   └── (Vite/React app — index.html, src/, dist/, etc.)
├── handoffs/                         ⚠️ loose — Blueprints candidate
│   ├── backend-to-frontend.md
│   ├── decisions.md
│   └── frontend-to-backend.md
├── impeccable_baseline.json          ⚠️ loose — References or Solutions candidate
├── node_modules/                     [do not touch]
├── oraclepu.key                      [sensitive — not opened] ⚠️ SECURITY: key at repo root
├── package.json                      [active app — do not move]
├── package-lock.json                 [active app — do not move]
├── probo.yaml                        [active app — do not move]
├── prompts/
│   ├── PROMPTS_CHANGELOG.md          ⚠️ loose — Blueprints/prompts candidate
│   ├── manager_agent.md              ⚠️ loose — Blueprints/agents candidate
│   └── sub_agents.md                 ⚠️ loose — Blueprints/agents candidate
├── README.md                         [modified in git — M status]
├── scripts/                          [active app — do not move]
├── sql/                              [active app — do not move]
├── src/                              [active app — do not move]
│   └── (adapters, config, data, middleware, routes, services, server.js, etc.)
└── test/                             [active app — do not move]
```

---

### 1C — Omen

```
Omen/
├── Archive/                          (empty)
├── Assets/                           ⚠️ EMPTY — non-standard DBS folder
├── Blueprints/
│   └── specs/
│       └── omen-mvp-move.md
├── Brand/                            ⚠️ non-standard DBS folder (not in DBS model)
│   ├── brand.md
│   └── positioning.md
├── Direction/
│   ├── context.md
│   ├── current_sprint.md
│   ├── decision_log.md
│   └── roadmap.md
├── References/                       (empty)
├── Solutions/                        (empty)
└── README.md
```

---

## Part 2 — Actual vs Intended DBS Comparison

---

## Layer 1 — SLOPS OS

### Intended

```
SLOPS/
├── Direction/        context, roadmap, priorities, decisions, current phase
├── Blueprints/       skills, prompts, specs, templates, workflows, playbooks, agents
├── Solutions/        finished reports, deliverables, completed outputs
├── References/       raw research, screenshots, notes, examples, source material
├── Archive/          old, superseded, parked, retired, quarantined material
├── DBS_INDEX.md      index/control file
└── README.md         layer readme
```

### Actual

All five DBS buckets exist and are populated. Direction and Blueprints are well-developed. Solutions has 16+ DBS migration reports. References is nearly empty (README only). Archive has three sub-categories.

Two notable loose items remain at root: `roadmap.md` and `"Slops OS Global Context.md"`. An empty `_archive/` directory (lowercase) is a leftover artifact.

### Gaps

- `References/` — only a README; no actual reference material filed here yet
- `Blueprints/specs/` — README placeholder only; no specs filed at SLOPS OS level

### Extra / Loose Items

| Item | Note |
|---|---|
| `roadmap.md` (root) | Duplicates `Direction/roadmap.md` — should be consolidated or removed |
| `"Slops OS Global Context.md"` (root) | Context doc with no DBS home — belongs in `Direction/` |
| `_archive/` (root) | Empty lowercase duplicate of `Archive/` — can be deleted |
| `Blueprints/handoffs/` | Appears to duplicate `Blueprints/agents/handoffs/` — likely consolidation candidate |

### Recommendation

**Needs light cleanup.** Core DBS structure is solid. Three small items to resolve: consolidate roadmap.md, move Slops OS Global Context.md into Direction/, delete empty _archive/.

---

## Layer 2 — ssffmvp

### Intended

```
ssffmvp/
├── Direction/        dept-level context, sprint, decisions, roadmap
├── Blueprints/       dept prompts, handoffs, specs, agent configs, ADRs
├── Solutions/        audit reports, completed deliverables, baselines
├── References/       research notes, source material
├── Archive/          retired dept material
├── Omen/           product layer (DBS sub-tree)
│
│   [active app repo — do not move]
├── src/              backend source
├── frontend/         frontend source
├── client/           client source
├── scripts/          utility scripts
├── sql/              database scripts
├── test/             test suite
├── evals/            AI eval suite
├── .env*             environment config [sensitive]
├── Dockerfile*       container config
├── docker-compose.yml
├── package.json
├── .gitignore / .github/
└── README.md
```

### Actual

`Direction/` is well-populated (4 files). `Blueprints/`, `Solutions/`, and `References/` are ALL EMPTY despite having content that clearly belongs in them (handoffs/, prompts/, docs/, audit_report.json, etc.) sitting loose at root.

Active app folders (src/, frontend/, client/, scripts/, sql/, test/, evals/) are correctly in place.

### Gaps

| Missing | Where it belongs |
|---|---|
| `Blueprints/` has no content | `handoffs/`, `prompts/`, `docs/` content belongs here |
| `Solutions/` has no content | `audit_report.json`, `impeccable_baseline.json` belong here |
| `References/` has no content | Any raw reference/research material |

### Extra / Loose Items

| Item | Current Location | Recommended DBS Home |
|---|---|---|
| `BRAND_STRATEGY.md` | ssffmvp root | `Omen/Brand/` or `Omen/Blueprints/` |
| `agent_handoff.md` | ssffmvp root | `ssffmvp/Blueprints/` or `ssffmvp/Direction/` |
| `agent_inbox.md` | ssffmvp root | `ssffmvp/Direction/` |
| `audit_report.json` | ssffmvp root | `ssffmvp/Solutions/` |
| `design.md` | ssffmvp root | `Omen/Blueprints/` |
| `impeccable_baseline.json` | ssffmvp root | `ssffmvp/Solutions/` or `ssffmvp/References/` |
| `handoffs/` (folder) | ssffmvp root | `ssffmvp/Blueprints/handoffs/` |
| `prompts/` (folder) | ssffmvp root | `ssffmvp/Blueprints/prompts/` |
| `docs/` (folder, ADRs) | ssffmvp root | `ssffmvp/Blueprints/specs/` |
| `.env.local-backup-20260502` | ssffmvp root | `Archive/` or delete — ⚠️ backup env at root |
| `oraclepu.key` | ssffmvp root | ⚠️ SECURITY REVIEW: key file at repo root — Justin's decision |
| `.aiprompts/` (empty) | ssffmvp root | Delete or keep as local tool state |

### Do Not Move

```
src/                    backend application source
frontend/               frontend application source
client/                 client application source
scripts/                utility scripts
sql/                    database scripts
test/                   test suite
evals/                  AI evaluation suite
.env / .env.cloud       environment files [sensitive]
.env.example            documentation — ok at root
Dockerfile / Dockerfile.cron
docker-compose.yml
package.json / package-lock.json
probo.yaml
.gitignore / .github/
README.md
```

### Git Status Note

These ssffmvp files are **untracked** in Git (shown as `??`):
`.claude/`, `Omen/`, `Direction/`, `agent_handoff.md`, `agent_inbox.md`, `design.md`, `handoffs/`

`README.md` shows as modified (`M`). The DBS folders and loose docs are not committed — this is expected if they are intentionally gitignored or not yet staged.

### Recommendation

**Needs major cleanup.** Direction is the only populated DBS bucket. Blueprints/Solutions/References are empty shells. ~10 files/folders are loose at root waiting to be filed. Most moves are low-risk (doc files only). The `oraclepu.key` at root is a security concern that needs Justin's review.

---

## Layer 3 — Omen

### Intended

```
Omen/
├── Direction/        product context, sprint, decisions, roadmap
├── Blueprints/       specs, prompts, templates, playbooks, feature designs
├── Solutions/        completed product deliverables, shipped feature reports
├── References/       raw research, competitor examples, source material
├── Archive/          retired product material
└── README.md
```

### Actual

`Direction/` is fully populated (4 files). `Blueprints/specs/` has one spec (omen-mvp-move.md). `Solutions/`, `References/`, and `Archive/` are all empty.

Two non-standard folders exist: `Brand/` (has brand.md, positioning.md) and `Assets/` (empty). Neither is part of the DBS model.

### Gaps

| Missing | Note |
|---|---|
| `Blueprints/prompts/` | No prompt files here — product-level prompts may exist in ssffmvp/prompts |
| `Blueprints/workflows/` | No workflow files — may belong here |
| `Solutions/` content | No completed deliverables filed |
| `References/` content | No research material filed |

### Extra / Loose Items

| Item | Note |
|---|---|
| `Brand/` folder | Non-standard DBS folder — could be folded into `Blueprints/brand/` or kept as named sub-folder in Blueprints |
| `Assets/` folder | Non-standard, empty — Justin's decision: keep for future assets or remove |
| `BRAND_STRATEGY.md` (at ssffmvp root) | Belongs in Omen — probably in `Brand/` or `Blueprints/` |
| `design.md` (at ssffmvp root) | Likely a Omen/Blueprints doc |

### Recommendation

**Needs light cleanup.** Direction is clean. The `Brand/` folder is a useful named extension of Blueprints — consider formalizing it as `Blueprints/brand/` or keeping `Brand/` with a note in README. `Assets/` is empty and can be removed or kept as a placeholder. Main action: migrate the loose Omen-related docs from ssffmvp root.

---

## Part 3 — Cleanup Recommendation Table

| Path | Layer | Current Status | Recommended Action | Risk | Notes |
|---|---|---|---|---|---|
| `SLOPS/roadmap.md` | SLOPS | Duplicate of Direction/roadmap.md | Move to Archive or delete after confirming Direction/roadmap.md is current | low | Confirm Direction copy is up to date first |
| `SLOPS/"Slops OS Global Context.md"` | SLOPS | Loose context doc at root | Move to Direction/ | low | Rename to context.md or global-context.md |
| `SLOPS/_archive/` | SLOPS | Empty lowercase duplicate folder | Delete | low | Already empty |
| `SLOPS/Blueprints/handoffs/` | SLOPS | Appears to duplicate agents/handoffs/ | Needs user review — consolidate or clarify purpose | low | Check if content differs from agents/handoffs/ |
| `SLOPS/References/` | SLOPS | Empty (README only) | Keep — populate over time | low | Placeholder is fine |
| `ssffmvp/BRAND_STRATEGY.md` | ssffmvp | Loose brand doc at repo root | Move to Omen/Brand/ | low | Pure doc — safe to move |
| `ssffmvp/agent_handoff.md` | ssffmvp | Loose agent doc at repo root | Move to ssffmvp/Blueprints/ | low | Untracked in git |
| `ssffmvp/agent_inbox.md` | ssffmvp | Loose inbox doc at repo root | Move to ssffmvp/Direction/ | low | Untracked in git |
| `ssffmvp/design.md` | ssffmvp | Loose design doc at repo root | Move to Omen/Blueprints/ | low | Untracked in git |
| `ssffmvp/audit_report.json` | ssffmvp | Loose report at repo root | Move to ssffmvp/Solutions/ | low | Pure output artifact |
| `ssffmvp/impeccable_baseline.json` | ssffmvp | Loose baseline at repo root | Move to ssffmvp/Solutions/ or References/ | low | Needs user review on classification |
| `ssffmvp/handoffs/` | ssffmvp | Loose folder at repo root | Move to ssffmvp/Blueprints/handoffs/ | low | Untracked in git — 3 .md files |
| `ssffmvp/prompts/` | ssffmvp | Loose folder at repo root | Move to ssffmvp/Blueprints/prompts/ | low | 3 files — untracked in git |
| `ssffmvp/docs/` | ssffmvp | ADR docs at repo root | Move to ssffmvp/Blueprints/specs/ | low | 2 ADR files |
| `ssffmvp/.env.local-backup-20260502` | ssffmvp | Env backup at repo root | Needs user review — move to Archive/ or delete | medium | ⚠️ Backup env file — may contain real secrets |
| `ssffmvp/oraclepu.key` | ssffmvp | Private key at repo root | Needs user review — SECURITY | high | ⚠️ Key file at repo root — verify gitignored, confirm no exposure |
| `ssffmvp/.aiprompts/` | ssffmvp | Empty local tool folder | Keep or delete — local tool state | low | Empty, no content |
| `ssffmvp/Blueprints/` | ssffmvp | Empty DBS bucket | Keep — populate after moving handoffs/, prompts/, docs/ | low | Will be filled by moves above |
| `ssffmvp/Solutions/` | ssffmvp | Empty DBS bucket | Keep — populate after moving audit_report.json | low | — |
| `ssffmvp/References/` | ssffmvp | Empty DBS bucket | Keep — populate over time | low | — |
| `Omen/Brand/` | Omen | Non-standard folder (not in DBS model) | Needs user review — fold into Blueprints/brand/ or keep named | low | brand.md + positioning.md are well-placed here |
| `Omen/Assets/` | Omen | Non-standard, empty folder | Needs user review — keep as placeholder or remove | low | Empty |
| `Omen/Solutions/` | Omen | Empty DBS bucket | Keep — populate over time | low | — |
| `Omen/References/` | Omen | Empty DBS bucket | Keep — populate over time | low | — |
| `SLOPS/Solutions/.codex-artifacts/` | SLOPS | Auto-generated backups | Do not touch | low | Codex-managed — leave in place |
| `ssffmvp/src/` | ssffmvp | Active app backend | Do not touch | high | Core app source |
| `ssffmvp/frontend/` | ssffmvp | Active app frontend | Do not touch | high | Core app source |
| `ssffmvp/client/` | ssffmvp | Active app client | Do not touch | high | Core app source |
| `ssffmvp/scripts/` | ssffmvp | Active app scripts | Do not touch | high | — |
| `ssffmvp/sql/` | ssffmvp | Active app SQL | Do not touch | high | — |
| `ssffmvp/evals/` | ssffmvp | Active eval suite | Do not touch | medium | Eval configs and fixtures |
| `ssffmvp/.env` | ssffmvp | Live environment config | Do not touch | high | [sensitive — not opened] |
| `ssffmvp/.env.cloud` | ssffmvp | Cloud environment config | Do not touch | high | [sensitive — not opened] |
| `ssffmvp/.github/` | ssffmvp | CI/CD config | Do not touch | high | — |
| `ssffmvp/Dockerfile*` | ssffmvp | Container config | Do not touch | high | — |

---

## Part 4 — Git Status Snapshot

### SLOPS Root (as of 2026-05-22)

```
?? .claude/
?? Archive/
?? Blueprints/
?? DBS_INDEX.md
?? Direction/
?? README.md
?? References/
?? "Slops OS Global Context.md"
?? Solutions/
?? roadmap.md
?? ssffmvp/
```

**Note:** Everything at SLOPS root is untracked. The SLOPS git repo appears to have no staged or committed files. This is expected if SLOPS is a local-only OS layer. No action required unless you intend to commit the SLOPS layer.

### ssffmvp (as of 2026-05-22)

```
 M README.md
?? .claude/
?? Omen/
?? Direction/
?? agent_handoff.md
?? agent_inbox.md
?? design.md
?? handoffs/
```

**Notes:**
- `README.md` has unstaged modifications — review before committing
- All DBS folders/files (`Omen/`, `Direction/`, loose docs, `handoffs/`) are untracked
- If these DBS folders are intentionally excluded from the app repo, they should be added to `.gitignore`
- If they should be committed, they need to be staged

---

## Part 5 — Specific Next Safe Actions

These are ordered from safest to most considered:

### Safe to act on immediately (low risk, no app impact)

1. **Delete `SLOPS/_archive/`** — it is empty and a duplicate of `Archive/`
2. **Move `SLOPS/roadmap.md`** → confirm `Direction/roadmap.md` is current, then archive or delete root copy
3. **Move `SLOPS/"Slops OS Global Context.md"`** → `SLOPS/Direction/global-context.md` or `context.md`
4. **Move `ssffmvp/BRAND_STRATEGY.md`** → `ssffmvp/Omen/Brand/BRAND_STRATEGY.md`
5. **Move `ssffmvp/design.md`** → `ssffmvp/Omen/Blueprints/design.md`
6. **Move `ssffmvp/agent_handoff.md`** → `ssffmvp/Blueprints/agent_handoff.md`
7. **Move `ssffmvp/agent_inbox.md`** → `ssffmvp/Direction/agent_inbox.md`
8. **Move `ssffmvp/audit_report.json`** → `ssffmvp/Solutions/audit_report.json`
9. **Move `ssffmvp/handoffs/` folder** → `ssffmvp/Blueprints/handoffs/`
10. **Move `ssffmvp/prompts/` folder** → `ssffmvp/Blueprints/prompts/`
11. **Move `ssffmvp/docs/` folder** → `ssffmvp/Blueprints/specs/`

### Needs Justin's review before acting

12. **`ssffmvp/impeccable_baseline.json`** — classify as Solutions or References, then move
13. **`ssffmvp/.env.local-backup-20260502`** — is this still needed? If not, delete. If yes, confirm it is gitignored and not committed
14. **`ssffmvp/oraclepu.key`** — ⚠️ Security: verify this is in `.gitignore`, never committed, and consider moving out of the repo entirely
15. **`Omen/Brand/`** — decide: keep as named extension of Blueprints (fine as-is) or fold into `Blueprints/brand/`
16. **`Omen/Assets/`** — keep empty as placeholder or remove
17. **`SLOPS/Blueprints/handoffs/` vs `agents/handoffs/`** — are these the same content? Consolidate if so
18. **ssffmvp git decision** — should DBS folders (`Direction/`, `Omen/`, etc.) be committed to the app repo or added to `.gitignore`?

---

## Part 6 — Items That Should NOT Be Touched

```
ssffmvp/src/
ssffmvp/frontend/
ssffmvp/client/
ssffmvp/scripts/
ssffmvp/sql/
ssffmvp/test/
ssffmvp/evals/
ssffmvp/.env
ssffmvp/.env.cloud
ssffmvp/.env.example
ssffmvp/.github/
ssffmvp/Dockerfile
ssffmvp/Dockerfile.cron
ssffmvp/docker-compose.yml
ssffmvp/package.json
ssffmvp/package-lock.json
ssffmvp/probo.yaml
ssffmvp/node_modules/
ssffmvp/.git/
SLOPS/.git/
SLOPS/Solutions/.codex-artifacts/
SLOPS/Archive/ (contents — not expanded)
ssffmvp/Archive/ (contents — not expanded)
```

---

## Part 7 — Summary

| Layer | Status | Biggest Issue | Recommendation |
|---|---|---|---|
| **SLOPS** | 🟡 Needs light cleanup | `roadmap.md` loose at root, `"Slops OS Global Context.md"` not filed, `_archive/` empty duplicate | 3 quick moves/deletes, then clean |
| **ssffmvp** | 🔴 Needs major cleanup | Blueprints/Solutions/References all empty; ~10 items loose at root; `oraclepu.key` security concern | File loose docs into DBS buckets; security review for key |
| **Omen** | 🟡 Needs light cleanup | Brand/ and Assets/ are non-standard; Solutions/References empty | Clarify Brand/ convention, migrate loose Omen docs from ssffmvp root |

**Biggest remaining mess:** ssffmvp root — approximately 10 loose files/folders that belong in DBS buckets, plus a key file that needs a security review.

**Recommended next safe cleanup step:** Start with the 11 low-risk ssffmvp root items (steps 1–11 above). All are untracked doc or JSON files. No app source or config is involved.

---

*Report generated by Claude Cowork (inspection only). No files were modified during this inspection except this report file.*
