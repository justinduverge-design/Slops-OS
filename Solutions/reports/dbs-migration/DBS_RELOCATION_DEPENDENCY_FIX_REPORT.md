# DBS Relocation Dependency Fix Report

Date: 2026-05-22

Scope:
- Active repo: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`
- Source report: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Solutions\reports\dbs-migration\DBS_DEPENDENCY_REFERENCE_CHECK.md`

Option A decision applied: DBS docs inside `ssffmvp` are intended to be committed with the app repo and used by future agents.

## References Fixed

| Old Reference | New Reference | File Changed | Result |
| --- | --- | --- | --- |
| `../../prompts/manager_agent.md` | `..\..\Blueprints\prompts\manager_agent.md` | `ssffmvp\src\services\agents.js` | Runtime manager prompt loading now points at the DBS prompt location. |
| `src\..\prompts\manager_agent.md` and `src\..\prompts\sub_agents.md` | `src\..\Blueprints\prompts\manager_agent.md` and `src\..\Blueprints\prompts\sub_agents.md` | `ssffmvp\src\ssffmvp_prompt_loader.js` | Shared prompt loader now reads prompt markdown from DBS `Blueprints\prompts`. |
| Inline folder structure comment showing root `prompts\` | Inline folder structure comment showing `Blueprints\prompts\` | `ssffmvp\src\ssffmvp_prompt_loader.js` | Developer guidance now matches the repo layout. |

## Files Changed

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\src\services\agents.js`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\src\ssffmvp_prompt_loader.js`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Solutions\reports\dbs-migration\DBS_RELOCATION_DEPENDENCY_FIX_REPORT.md`

## Prompt Files Checked

Runtime prompt files:

| File | Status |
| --- | --- |
| `ssffmvp\Blueprints\prompts\manager_agent.md` | Found |
| `ssffmvp\Blueprints\prompts\sub_agents.md` | Found |
| `ssffmvp\Blueprints\prompts\PROMPTS_CHANGELOG.md` | Found |

Promptfoo eval prompt files:

| File | Status |
| --- | --- |
| `ssffmvp\evals\promptfoo\prompts\trade.txt` | Found |
| `ssffmvp\evals\promptfoo\prompts\startSit.txt` | Found |
| `ssffmvp\evals\promptfoo\prompts\mvpMove_stub.txt` | Found |

## Missing Prompt Files

No promptfoo prompt files are missing from their eval-local location.

The previous concern was that these files were not under `Blueprints\prompts`; however, the promptfoo YAML files live in `evals\promptfoo\` and reference the local `prompts\` folder beside those configs. That layout appears intentional and was not changed.

## Promptfoo Eval References

Reviewed:

- `ssffmvp\evals\promptfoo\promptfooconfig.yaml`
- `ssffmvp\evals\promptfoo\promptfooconfig.mock.yaml`

Current references:

```yaml
prompts:
  - prompts/trade.txt
  - prompts/startSit.txt
  - prompts/mvpMove_stub.txt
```

Decision: left unchanged.

Reason: the referenced files exist under `ssffmvp\evals\promptfoo\prompts\`. Changing these to DBS paths would mix app-agent prompt docs with eval fixture prompts and could break promptfoo's config-relative path behavior.

## CI/Docker References Reviewed

| File | Reference | Action | Risk | Notes |
| --- | --- | --- | --- | --- |
| `ssffmvp\.github\workflows\ai-evals.yml` | `src/prompts/**` | Not changed | medium | This controls CI trigger behavior. Recommended future update: decide whether CI should watch `Blueprints/prompts/**`, `evals/promptfoo/prompts/**`, or both. Needs Justin review because it changes GitHub Actions behavior. |
| `ssffmvp\.dockerignore` | `docs/` | Not changed | low | Stale ignore entry after DBS cleanup, but harmless. Docker/deploy config was not edited in this pass. |

## Needs Justin Review

1. Decide whether the GitHub Actions prompt eval workflow should watch:
   - `Blueprints/prompts/**`
   - `evals/promptfoo/prompts/**`
   - both paths

2. Decide whether `.dockerignore` should later ignore DBS documentation folders such as `Blueprints/`, `Direction/`, `References/`, and `Solutions/`, or whether they should remain in the Docker build context for now.

3. Decide whether promptfoo fixture prompts should stay in `evals\promptfoo\prompts\` long term. This report recommends keeping them there because they are eval fixtures, not agent operating docs.

## Runtime Prompt Loading Verdict

Runtime prompt loading should now work with the DBS layout.

Verification performed:

- `ssffmvp_prompt_loader.getPromptMetadata()` successfully read `Blueprints\prompts\manager_agent.md`.
- `node --check src/services/agents.js` passed.
- `node --check src/ssffmvp_prompt_loader.js` passed.
- `npm test` passed.

## Promptfoo Eval Verdict

Promptfoo eval references should remain valid because the YAML references point to files present under `evals\promptfoo\prompts\`.

Promptfoo itself was not run in this pass. The normal app test suite was run and passed.

## Test Result

Command:

```powershell
npm test
```

Result:

```text
113 tests passed
0 failed
```

## Git Status

`git status --short` inside `ssffmvp` after the dependency fixes:

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

## Safety Confirmation

- No `.env` files were opened or printed.
- No key files or secret-like files were opened or printed.
- No deployment happened.
- No commit happened.
- No push happened.
- No unrelated app source was modified.
- `node_modules`, `.git`, and `Archive\quarantine` were not modified.
