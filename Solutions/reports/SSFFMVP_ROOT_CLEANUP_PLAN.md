# ssffmvp Root Cleanup Plan

Date: 2026-05-21

Scope: visible root cleanup for `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`.

No files had been moved for this repo-scoped cleanup before this plan was created.

| Item | Current Path | Recommended Location | Action | Risk | Reason |
| --- | --- | --- | --- | --- | --- |
| `.aiprompts` | `.aiprompts` | root | do not touch | high | Tool/runtime prompt folder; explicitly protected. |
| `.claude` | `.claude` | root | do not touch | high | Tool settings/workflow folder; explicitly protected. |
| `.dockerignore` | `.dockerignore` | root | do not touch | high | Runtime/deploy-adjacent config; explicitly protected. |
| `.env` | `.env` | root | do not touch | high | Secret/env file; protected. |
| `.env.cloud` | `.env.cloud` | root | do not touch | high | Secret/env file; protected. |
| `.env.example` | `.env.example` | root | do not touch | high | Env example; explicitly protected in this pass. |
| `.env.local-backup-20260502` | `.env.local-backup-20260502` | root | do not touch | high | Secret/env backup; protected. |
| `.git` | `.git` | root | do not touch | high | Git metadata. |
| `.github` | `.github` | root | do not touch | high | GitHub Actions/workflows; explicitly protected. |
| `.gitignore` | `.gitignore` | root | do not touch | high | Explicitly protected. |
| `agent_handoff.md` | `agent_handoff.md` | root, with DBS reference copy | keep at root | medium | Active coordination baton. Moving could break agent workflow. |
| `agent_inbox.md` | `agent_inbox.md` | root, with DBS reference copy | keep at root | medium | Active task inbox. Moving could break agent workflow. |
| `agent_rules.md` | `agent_rules.md` | `Blueprints\workflows\agent_rules.md` | move to Blueprints | low | Static workflow rules doc. Leave root redirect. |
| `AGENT.md` | `AGENT.md` | `Blueprints\workflows\AGENT.md` | move to Blueprints | medium | Agent instruction file; leave root redirect because tools may look here. |
| `Archive` | `Archive` | root | keep at root | low | DBS layer folder. |
| `Blueprints` | `Blueprints` | root | keep at root | low | DBS layer folder. |
| `BRAND_STRATEGY.md` | `BRAND_STRATEGY.md` | `Omen\Brand\positioning.md` | keep redirect at root | low | Already promoted/archived; current file is redirect. |
| `CLAUDE.md` | `CLAUDE.md` | `Blueprints\workflows\CLAUDE.md` | move to Blueprints | medium | Agent instruction file; leave root redirect because tools may look here. |
| `client` | `client` | root | do not touch | high | Active app/client folder; explicitly protected. |
| `context.md` | `context.md` | `Direction\context.md` | keep redirect at root | low | Already redirected. |
| `Omen` | `Omen` | root | keep at root | low | Product DBS layer. |
| `current_sprint.md` | `current_sprint.md` | `Direction\current_sprint.md` | keep redirect at root | low | Already redirected. |
| `decision_log.md` | `decision_log.md` | `Direction\decision_log.md` | keep redirect at root | low | Already redirected. |
| `Direction` | `Direction` | root | keep at root | low | DBS layer folder. |
| `docker-compose.hostinger.yml` | `docker-compose.hostinger.yml` | root | do not touch | high | Deployment config; explicitly protected. |
| `docker-compose.yml` | `docker-compose.yml` | root | do not touch | high | Deployment config; explicitly protected. |
| `Dockerfile` | `Dockerfile` | root | do not touch | high | Deployment/runtime file; explicitly protected. |
| `Dockerfile.cron` | `Dockerfile.cron` | root | do not touch | high | Deployment/runtime file; explicitly protected. |
| `docs` | `docs` | `References\docs` or keep indexed | needs user review | medium | ADR/docs folder may be referenced by repo workflows. Inventory before moving. |
| `evals` | `evals` | root | do not touch | high | Active evaluation/runtime folder; explicitly protected. |
| `frontend` | `frontend` | root | do not touch | high | Active frontend source; explicitly protected. |
| `handoffs` | `handoffs` | root canonical active handoffs | keep at root | medium | README marks this as canonical engineering handoff folder. |
| `node_modules` | `node_modules` | root | do not touch | high | Dependency runtime folder; explicitly protected. |
| `oraclepu.key` | `oraclepu.key` | root | do not touch | high | Key-like file; protected. |
| `package-lock.json` | `package-lock.json` | root | do not touch | high | Package lock; explicitly protected. |
| `package.json` | `package.json` | root | do not touch | high | Package file; explicitly protected. |
| `probo.yaml` | `probo.yaml` | root | do not touch | high | Config/deploy-adjacent file; explicitly protected. |
| `prompt_playbook.md` | `prompt_playbook.md` | `Blueprints\playbooks\prompt_playbook.md` | keep redirect at root | low | Already redirected. |
| `prompts` | `prompts` | `Blueprints\prompts` if unreferenced | needs user review | medium | Prompt files may be workflow inputs. Check references before moving. |
| `README.md` | `README.md` | root | keep at root | low | Root repo navigation file. |
| `References` | `References` | root | keep at root | low | DBS layer folder. |
| `roadmap.md` | `roadmap.md` | `Direction\roadmap.md` | keep redirect at root | low | Already redirected. |
| `scripts` | `scripts` | root | do not touch | high | Active scripts folder; explicitly protected. |
| `skills` | `skills` | keep indexed or `Blueprints\skills` only if safe | keep in place | medium | Active workflow skills and screenshots; may be referenced by tooling. |
| `Solutions` | `Solutions` | root | keep at root | low | DBS layer folder. |
| `specs` | `specs` | `Blueprints\specs` if unreferenced | needs user review | medium | Spec-kit style folders may be referenced by tools. Check references before moving. |
| `sql` | `sql` | root | do not touch | high | Active SQL folder; explicitly protected. |
| `src` | `src` | root | do not touch | high | Active backend source; explicitly protected. |
| `test` | `test` | root | do not touch | high | Active tests; explicitly protected. |
