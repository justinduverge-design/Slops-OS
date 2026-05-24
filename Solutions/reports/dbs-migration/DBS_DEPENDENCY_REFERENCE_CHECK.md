# DBS Dependency Reference Check

Date: 2026-05-22

Scope:
- SLOPS root: `C:\Users\JDuve\OneDrive\Desktop\SLOPS`
- Active app repo: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`
- Corvus product layer: `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus`

This was a reference and documentation cleanup pass only. No app development, deployment, commit, push, secret inspection, or source behavior change was performed.

## New Correct Paths

| Old Reference | New Correct Path | Notes |
| --- | --- | --- |
| `BRAND_STRATEGY.md` | `ssffmvp\Corvus\Brand\BRAND_STRATEGY.md` | Corvus brand material. `Corvus\Brand\positioning.md` also contains promoted brand positioning material. |
| `design.md` | `ssffmvp\Corvus\Blueprints\design.md` | Corvus design blueprint. Earlier DBS copies may exist under `Corvus\Blueprints\specs\design.md` and should be reviewed before consolidation. |
| `agent_handoff.md` | `ssffmvp\Blueprints\agent_handoff.md` | Active app coordination note. |
| `agent_inbox.md` | `ssffmvp\Direction\agent_inbox.md` | Current app work inbox. |
| `handoffs\` | `ssffmvp\Blueprints\handoffs\` | Active app engineering handoffs. Root OS handoffs live under `SLOPS\Blueprints\handoffs\`. |
| `prompts\` | `ssffmvp\Blueprints\prompts\` | Active app prompt docs. Runtime/eval references still need review before source/config changes. |
| `docs\` | `ssffmvp\Blueprints\specs\docs\` | ADRs and app docs moved into DBS specs/docs. |
| `audit_report.json` | `ssffmvp\Solutions\audit_report.json` | Output/report artifact. |
| `impeccable_baseline.json` | `ssffmvp\Solutions\impeccable_baseline.json` | Baseline output/quality reference. |
| `roadmap.md` | `SLOPS\Direction\roadmap.md` or `ssffmvp\Direction\roadmap.md` | Layer depends on context. Root loose roadmap was archived. |
| `Slops OS Global Context.md` | `SLOPS\Direction\global-context.md` | Root SLOPS OS context material. |

## Documentation References Updated

Safe documentation-only references were updated in:

| File | Update |
| --- | --- |
| `SLOPS\README.md` | Replaced stale app-style content with root SLOPS navigation and current DBS pointers. |
| `SLOPS\DBS_INDEX.md` | Updated canonical prompt, docs, and handoff locations after physical cleanup. |
| `SLOPS\Blueprints\workflows\AGENT.md` | Updated app handoff references to `ssffmvp\Blueprints\handoffs\`. |
| `SLOPS\Direction\AGENT.md` | Updated app handoff references to `ssffmvp\Blueprints\handoffs\`. |
| `SLOPS\Blueprints\playbooks\runbook_ai_workflow.md` | Updated app handoff references to `ssffmvp\Blueprints\handoffs\`. |
| `ssffmvp\README.md` | Updated project structure to point docs, prompts, and handoffs at DBS folders. |
| `ssffmvp\Blueprints\handoffs\decisions.md` | Updated canonical handoff references. |
| `ssffmvp\Direction\agent_inbox.md` | Updated canonical handoff folder reference. |
| `ssffmvp\Direction\decision_log.md` | Updated active decision from restoring old handoffs to reviewing compatibility shims. |
| `ssffmvp\Blueprints\prompts\manager_agent.md` | Updated file path header to DBS location. |
| `ssffmvp\Blueprints\prompts\sub_agents.md` | Updated file path header to DBS location. |
| `ssffmvp\Blueprints\prompts\PROMPTS_CHANGELOG.md` | Updated prompt changelog path references. |
| `ssffmvp\Corvus\Blueprints\design.md` | Updated canonical design path note. |
| `SLOPS\Blueprints\README.md` | Clarified root and app DBS prompt/handoff locations. |
| `SLOPS\References\README.md` | Clarified active app docs now live under `ssffmvp\Blueprints\specs\docs\`. |
| `SLOPS\Blueprints\handoffs\README.md` | Updated app handoff location. |
| `SLOPS\Blueprints\handoffs\decisions.md` | Updated app decision-log redirect. |
| `SLOPS\Blueprints\agents\handoffs\README.md` | Updated canonical app handoff and app agent file locations. |
| `SLOPS\Blueprints\agents\handoffs\decisions.md` | Updated ADR and handoff references. |
| `SLOPS\Blueprints\prompts\README.md` | Updated stale note about the old active `prompts\` folder. |
| `SLOPS\Blueprints\prompts\Codex_prompt_format.md` | Updated handoff references. |
| `SLOPS\Blueprints\prompts\codex_trade_analyzer_embed.md` | Updated handoff references. |
| `SLOPS\Blueprints\prompts\dbs-style_new_chat.md` | Updated app handoff and inbox references. |
| `SLOPS\Blueprints\agents\manager_agent.md` | Updated file path reference. |
| `SLOPS\Blueprints\agents\sub_agents.md` | Updated file path reference. |
| `SLOPS\Direction\00_FINAL_PLAN.md` | Updated old folder architecture references to DBS paths. |

## Old References Found

| Reference | Found In | Type | Risk | Recommended Update |
| --- | --- | --- | --- | --- |
| `../../prompts/manager_agent.md` and `prompts/` | `ssffmvp\src\services\agents.js` | Runtime/source dependency | high | Do not patch as part of cleanup. Review whether to update loader path to `Blueprints\prompts\manager_agent.md` or add a compatibility shim. |
| `prompts/` | `ssffmvp\src\ssffmvp_prompt_loader.js` | Source/comment or loader structure reference | medium | Review in implementation pass with `services\agents.js`. |
| `prompts/trade.txt`, `prompts/startSit.txt`, `prompts/mvpMove_stub.txt` | `ssffmvp\evals\promptfoo\promptfooconfig.yaml` and `promptfooconfig.mock.yaml` | Eval workflow dependency | high | Do not patch now. The referenced `.txt` files were not found under `Blueprints\prompts\`; confirm whether eval prompts were already stale or need to be restored intentionally. |
| `src/prompts/**` | `ssffmvp\.github\workflows\ai-evals.yml` | CI workflow path | medium | Do not edit GitHub Actions in cleanup. Review before the next CI/eval work. This may predate DBS cleanup. |
| `docs/` | `ssffmvp\.dockerignore` | Docker/deploy config ignore rule | low | Do not edit Docker config in cleanup. Harmless stale ignore rule unless Docker build context hygiene becomes a priority. |
| `BRAND_STRATEGY.md`, `design.md`, `agent_handoff.md`, `agent_inbox.md`, `audit_report.json`, `impeccable_baseline.json`, `handoffs\`, `prompts\`, `docs\`, `roadmap.md`, `Slops OS Global Context.md` | Historical DBS reports under `SLOPS\Solutions\reports\dbs-migration\`, archive docs, and cleanup plans | Historical documentation | low | Leave as historical records. They describe prior state and should not be rewritten unless Justin wants report normalization. |
| `ssffmvp\handoffs\...` | Old archived/superseded docs and backup artifacts | Historical documentation | low | Leave as archive/backups. Current docs now point at `ssffmvp\Blueprints\handoffs\`. |

## Package Script Check

No references to the moved paths were found in:

- `ssffmvp\package.json`
- `ssffmvp\package-lock.json`

No package script changes are recommended from this pass.

## Compatibility Notes

The most important possible breakage is the source-level prompt loader:

- Old expected folder: `ssffmvp\prompts\`
- Current DBS folder: `ssffmvp\Blueprints\prompts\`
- Confirmed current state:
  - `ssffmvp\prompts\` does not exist.
  - `ssffmvp\Blueprints\prompts\manager_agent.md` exists.
  - `ssffmvp\Blueprints\prompts\trade.txt` does not exist.

Recommended next technical decision:

1. Decide whether runtime prompt files belong in a source-adjacent runtime folder or in DBS `Blueprints`.
2. If runtime should load DBS docs directly, update `src\services\agents.js` in an explicit source-change pass.
3. If runtime should not depend on DBS folders, restore a minimal compatibility prompt folder or move runtime prompt assets to a dedicated implementation-safe location.
4. Review promptfoo eval config separately because the `.txt` prompt files referenced there were not found in the moved prompt docs.

## Oracle Cloud Sync Guidance

- Oracle should only receive the active `ssffmvp` app repo, not the full SLOPS OS folder.
- `Archive\quarantine` should never be copied to Oracle.
- `.env` files and key files should not be committed or copied through normal sync.
- If DBS docs inside `ssffmvp` are meant to help future agents, commit them intentionally as project documentation.
- If DBS docs are workspace-only, add them to `.gitignore` instead before committing.
- Do not change Oracle Cloud, deployment, DNS, SSL, Docker, Nginx, or production config without explicit deployment approval.

## Git Status Summary

`git status --short` inside `ssffmvp` currently shows:

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
?? Blueprints/
?? Corvus/
?? Direction/
?? Solutions/
```

This reflects the DBS physical cleanup plus safe documentation updates. No commit, push, or deployment was performed.

## Final Check

- No `.env` files or key files were opened or printed.
- No app source files were modified.
- No package files were modified.
- No Docker, GitHub Actions, SQL, scripts, tests, `node_modules`, or production config files were modified.
- `Archive\quarantine` was not inspected or changed.
- The broad search surfaced a `.git` metadata path despite the intended exclusion; no `.git` files were modified and it was not used for changes.
