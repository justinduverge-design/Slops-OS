# DBS Commit Readiness Report

Date: 2026-05-22

Repo:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

Purpose: prepare a safe commit plan after DBS physical cleanup and relocation dependency repair. No commit, push, deploy, delete, or staging was performed.

## 1. Current Git Status

`git status --short`:

```text
 M .gitignore
 D BRAND_STRATEGY.md
 M README.md
 D audit_report.json
 D docs/ADR-004-yahoo-oauth-replacement.md
 D docs/ADR-005-vorp-v2-trade-analysis.md
 D impeccable_baseline.json
 D prompts/PROMPTS_CHANGELOG.md
 D prompts/manager_agent.md
 D prompts/sub_agents.md
 M src/services/agents.js
 M src/ssffmvp_prompt_loader.js
?? Blueprints/
?? Omen/
?? Direction/
?? Solutions/
```

Expanded untracked DBS destinations:

```text
?? Blueprints/agent_handoff.md
?? Blueprints/handoffs/backend-to-frontend.md
?? Blueprints/handoffs/decisions.md
?? Blueprints/handoffs/frontend-to-backend.md
?? Blueprints/prompts/PROMPTS_CHANGELOG.md
?? Blueprints/prompts/manager_agent.md
?? Blueprints/prompts/sub_agents.md
?? Blueprints/specs/docs/ADR-004-yahoo-oauth-replacement.md
?? Blueprints/specs/docs/ADR-005-vorp-v2-trade-analysis.md
?? Omen/Blueprints/design.md
?? Omen/Blueprints/specs/omen-mvp-move.md
?? Omen/Brand/BRAND_STRATEGY.md
?? Omen/Brand/brand.md
?? Omen/Brand/positioning.md
?? Omen/Direction/context.md
?? Omen/Direction/current_sprint.md
?? Omen/Direction/decision_log.md
?? Omen/Direction/roadmap.md
?? Omen/README.md
?? Direction/agent_inbox.md
?? Direction/context.md
?? Direction/current_sprint.md
?? Direction/decision_log.md
?? Direction/roadmap.md
?? Solutions/audit_report.json
?? Solutions/impeccable_baseline.json
```

## 2. Files Safe To Stage

Safe after Justin review:

| Path | Why Safe |
| --- | --- |
| `.gitignore` | Safety ignore additions for local tool/build state. |
| `README.md` | Repo navigation updated for DBS layout. |
| `Blueprints/` | DBS docs, prompt docs, handoffs, and specs moved from old locations. |
| `Omen/` | Omen product layer docs, brand material, and product direction. |
| `Direction/` | ssffmvp department context, roadmap, sprint, decisions, and inbox. |
| `Solutions/audit_report.json` | Moved report artifact from repo root. |
| `Solutions/impeccable_baseline.json` | Moved baseline output/reference from repo root. |
| `src/services/agents.js` | Minimal runtime path fix for `Blueprints/prompts/manager_agent.md`. |
| `src/ssffmvp_prompt_loader.js` | Minimal prompt-loader path fix for `Blueprints/prompts`. |

Safe old-path removals to stage with their DBS destinations:

| Old Path | New Path |
| --- | --- |
| `BRAND_STRATEGY.md` | `Omen/Brand/BRAND_STRATEGY.md` |
| `audit_report.json` | `Solutions/audit_report.json` |
| `impeccable_baseline.json` | `Solutions/impeccable_baseline.json` |
| `docs/ADR-004-yahoo-oauth-replacement.md` | `Blueprints/specs/docs/ADR-004-yahoo-oauth-replacement.md` |
| `docs/ADR-005-vorp-v2-trade-analysis.md` | `Blueprints/specs/docs/ADR-005-vorp-v2-trade-analysis.md` |
| `prompts/PROMPTS_CHANGELOG.md` | `Blueprints/prompts/PROMPTS_CHANGELOG.md` |
| `prompts/manager_agent.md` | `Blueprints/prompts/manager_agent.md` |
| `prompts/sub_agents.md` | `Blueprints/prompts/sub_agents.md` |

## 3. Files That Should Not Be Staged

Do not stage, now or later, unless Justin explicitly changes policy:

- `.env`
- `.env.*`
- `oraclepu.key`
- any key/token/cookie/credential file
- `.claude/`
- `.aiprompts/` unless intentionally reviewed as repo material
- `node_modules/`
- `.git/`
- `Archive/quarantine/`
- build outputs such as `dist/`

None of those sensitive paths appear in the current visible `git status --short`.

## 4. Files Needing Justin Review

| Path | Reason |
| --- | --- |
| `README.md` | Human-facing repo navigation changed; Justin should approve wording. |
| `.gitignore` | Safe additions, but still repo-policy material. |
| `Omen/Brand/brand.md`, `Omen/Brand/positioning.md`, `Omen/Brand/BRAND_STRATEGY.md` | Brand positioning is product-sensitive and should get Justin review before commit. |
| `Omen/Direction/*` | Product direction docs should be approved for repo permanence. |
| `Direction/*` | Department-level context and direction should be reviewed before becoming canonical. |
| `Blueprints/handoffs/*` | Active handoff docs may be used by agents; check current content before commit. |
| `src/services/agents.js` and `src/ssffmvp_prompt_loader.js` | Source changes are small and tested, but they intentionally make DBS prompt docs runtime-readable. |
| `.github/workflows/ai-evals.yml` | Not modified. Still references `src/prompts/**`; needs later review if CI should watch DBS/eval prompt paths. |
| `.dockerignore` | Not modified. Still contains stale `docs/`; harmless but should be reviewed later if Docker build context matters. |

## 5. Suggested Commit Groups

### Group A: README/.gitignore Updates

Stage:

```text
.gitignore
README.md
```

Suggested message:

```text
docs: update ssffmvp navigation for DBS layout
```

Notes: safe and small. This can be separate.

### Group B: DBS Documentation And Folder Structure

Stage:

```text
BRAND_STRATEGY.md
audit_report.json
impeccable_baseline.json
docs/ADR-004-yahoo-oauth-replacement.md
docs/ADR-005-vorp-v2-trade-analysis.md
prompts/PROMPTS_CHANGELOG.md
prompts/manager_agent.md
prompts/sub_agents.md
Blueprints/
Omen/
Direction/
Solutions/
```

Suggested message:

```text
docs: organize ssffmvp and Omen docs into DBS folders
```

Notes: stage old deletes and new DBS files together so Git can recognize these as moves where possible.

### Group C: Prompt Relocation Dependency Fix

Stage:

```text
src/services/agents.js
src/ssffmvp_prompt_loader.js
```

Suggested message:

```text
fix: load agent prompts from DBS blueprint folder
```

Notes: if every commit must be runnable, combine Group B prompt-file moves and Group C source fixes into one commit. A commit that moves `prompts/manager_agent.md` without the loader fix may temporarily break runtime prompt loading.

## 6. Suggested Commit Messages

Recommended two-commit path:

1. `docs: organize ssffmvp docs into DBS structure`
2. `fix: load agent prompts from DBS blueprint folder`

Recommended one-commit path for maximum safety:

```text
chore: finalize DBS repo organization and prompt paths
```

Why one commit may be cleaner: the runtime fix depends on the prompt docs moving to `Blueprints/prompts`.

## 7. Remaining Path/Reference Risk

| Risk | Status | Recommendation |
| --- | --- | --- |
| Runtime manager prompt path | fixed | `src/services/agents.js` now reads `Blueprints/prompts/manager_agent.md`. |
| Shared prompt loader path | fixed | `src/ssffmvp_prompt_loader.js` now reads `Blueprints/prompts`. |
| Promptfoo prompt paths | okay | Eval YAML references local `evals/promptfoo/prompts/*.txt`, and those files exist. |
| GitHub Actions trigger path | needs review | `.github/workflows/ai-evals.yml` still watches `src/prompts/**`; decide later whether to watch `Blueprints/prompts/**` and/or `evals/promptfoo/prompts/**`. |
| Docker ignore stale docs path | low risk | `.dockerignore` still ignores `docs/`; harmless but stale after DBS move. |
| DBS docs used at runtime | intentional | Option A means DBS docs in `ssffmvp` should be committed and used by future agents; runtime now reads prompt docs there. |

## 8. Test Status

From `DBS_RELOCATION_DEPENDENCY_FIX_REPORT.md`:

```text
npm test
113 tests passed
0 failed
```

Additional validation already completed in the dependency repair pass:

- `node --check src/services/agents.js` passed.
- `node --check src/ssffmvp_prompt_loader.js` passed.
- `ssffmvp_prompt_loader.getPromptMetadata()` successfully read `Blueprints/prompts/manager_agent.md`.

## 9. Safe To Commit After Justin Review?

Verdict: **yes, safe after Justin review**.

The commit is safe if Justin approves:

- DBS docs being versioned with the app repo.
- README wording.
- Brand/product direction docs becoming repo material.
- Runtime prompt loading from `Blueprints/prompts`.

No secret-like files are visible in the current status, and tests are passing.

## 10. Final Safety Notes

- No commit was made.
- No push was made.
- No deploy was made.
- No files were deleted.
- No secrets, `.env` files, key files, `.git`, `node_modules`, or `Archive/quarantine` contents were touched.
- This report is outside the `ssffmvp` repo under `SLOPS\Solutions\reports\dbs-migration\`, so it is not part of the `ssffmvp` commit unless Justin separately commits the SLOPS root workspace.
