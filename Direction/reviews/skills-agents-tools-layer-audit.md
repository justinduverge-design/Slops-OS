# Skills, Agents, and Tools Layer Audit

Date: 2026-05-23

Scope:

- Root: `C:\Users\JDuve\OneDrive\Desktop\SLOPS`
- 0-OS layer: SLOPS operating system
- 1-slops-saloon layer: Fantasy Sports MVP Builder app/subsidiary
- 2-Corvus layer: Fantasy Football MVP product/project

This was an audit and recommendation pass only. No files were moved, renamed, deleted, activated, or rewritten. The only file written was this report. `Direction\Reviews\` was created because the requested report folder did not already exist.

## Executive Summary

The SLOPS skills layer is mostly coherent. `Blueprints\skills` is already the right 0-OS home for reusable SLOPS-authored workflows, and the active skill files mostly follow a useful frontmatter, purpose, workflow, output, and safety pattern.

The agents layer is not yet deterministic. `Blueprints\agents\agents.md` is a useful global agent manifesto, but there is no `AGENT_INDEX.md`, the `README.md` is only a redirect, and `manager_agent.md` plus `sub_agents.md` are not global agent role files. They are Corvus/slops-saloon runtime prompt artifacts and should stay project-specific unless Justin explicitly promotes a generalized version.

The imported agent library under `Blueprints\agents\_imported` should remain candidate/reference-only. It contains many useful role examples, but several imported files include broad `Write`, `Edit`, `Bash`, deployment, database, credential, paid-media, and infrastructure instructions that do not fit SLOPS least-privilege rules without review and wrapping.

`tools.md` is important but misfiled. It is not a skill. It should eventually become a 0-OS tool-permission/RBAC document under a dedicated `Blueprints\tools` folder, with links from `Blueprints\agents` and `Blueprints\skills`.

The biggest cleanup need is not physical movement yet. The next safe pass should update indexes and README files so future agents can resolve authority deterministically before any folder moves happen.

## Files and Folders Inspected

Primary folders inspected:

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\agents\_imported`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus`

Read-first files inspected:

- `Blueprints\skills\README.md`
- `Blueprints\skills\SKILL_INDEX.md`
- `Blueprints\skills\skills.md`
- `Blueprints\skills\tools.md`
- `Blueprints\skills\_template\SKILL.md`
- `Blueprints\skills\slops-context-markdown\SKILL.md`
- `Blueprints\skills\slops-skill-author\SKILL.md`
- `Blueprints\skills\slops-agent-author\SKILL.md`
- `Blueprints\skills\pre-build-research\SKILL.md`
- `Blueprints\skills\slops-prompt-generator\SKILL.md`
- `Blueprints\skills\clean-up-checkpoint\SKILL.md`
- `Blueprints\agents\README.md`
- `Blueprints\agents\manager_agent.md`
- `Blueprints\agents\sub_agents.md`
- `Blueprints\agents\agents.md`

Additional inspection:

- Folder trees for `Blueprints\skills`, `Blueprints\agents`, `slops-saloon\Blueprints`, and `slops-saloon\corvus`
- Markdown references to `SKILL_INDEX`, `AGENT_INDEX`, `tools.md`, `skills.md`, `manager_agent.md`, `sub_agents.md`, `_imported`, and current prompt/agent paths
- Imported-agent risk terms including tools, write, delete, deploy, production, secret, credential, database, migration, git, Docker, VPS, API key, and env
- Git status at root and inside `slops-saloon`

## Current Map

| Current Path | Artifact Type | Current Role | Risk / Issue | Notes |
|---|---|---|---|---|
| `Blueprints\skills\README.md` | Index/readme | Canonical lookup rule for SLOPS-authored skills | Low | Correctly says SLOPS skills live under `Blueprints\skills`. |
| `Blueprints\skills\SKILL_INDEX.md` | Skill index | Deterministic skill lookup map | Medium | Paths mix `skills` and `Skills`, and use `skill.md` while actual files are `SKILL.md`. Windows resolves this, but agents should not rely on case ambiguity. |
| `Blueprints\skills\skills.md` | Routing matrix/reference | Agent/skill/prompt routing doctrine | Low/medium | Valuable, but not itself a skill. Could be renamed to `SKILL_ROUTING.md` or `agent-skill-matrix.md`. |
| `Blueprints\skills\tools.md` | Tool-permission/RBAC doc | Defines which tools agents may use | Medium | Important but not a skill. It belongs in a tool/RBAC policy location, not inside the skill folder long-term. |
| `Blueprints\skills\_template\SKILL.md` | Template | Master skill file template | Low | Correctly marked as reference material, not active skill. |
| `Blueprints\skills\slops-context-markdown\SKILL.md` | True skill | Markdown cleanup/context workflow | Low | Good 0-OS skill. Has least-privilege rules and DBS routing. |
| `Blueprints\skills\slops-context-markdown\agents\openai.yaml` | Interface metadata | Provider/launcher metadata | Medium | Folder name `agents` is confusing inside a skill package. Consider `interface\openai.yaml`. |
| `Blueprints\skills\slops-context-markdown\references\dbs-style.md` | Skill reference | DBS style reference for the skill | Low | Correct support file. |
| `Blueprints\skills\slops-skill-author\SKILL.md` | True skill | Creates/critiques SLOPS skill files | Low | Good 0-OS skill. |
| `Blueprints\skills\slops-agent-author\SKILL.md` | True skill | Creates/critiques SLOPS agent role files | Low | Good 0-OS skill. Strongly states imported agents are non-authoritative. |
| `Blueprints\skills\pre-build-research\SKILL.md` | True skill | External API/vendor/data source due diligence | Low | Good 0-OS skill, with route-down rules for project-specific research. |
| `Blueprints\skills\slops-prompt-generator\SKILL.md` | True skill | Creates runnable implementation prompts | Low/medium | Useful. Its `agents\openai.yaml` support folder has same naming ambiguity as above. |
| `Blueprints\skills\slops-prompt-generator\references\audit-reference.md` | Skill reference | Source material for audit-to-prompt generation | Low | Correct support file. |
| `Blueprints\skills\clean-up-checkpoint\SKILL.md` | True skill | Rate-limit/session checkpoint workflow | Low/medium | Useful. It routes slops-saloon output to `Blueprints\handoffs`, so it is global but heavily app-aware. |
| `Blueprints\agents\README.md` | Readme/redirect | Says canonical agents live at `Blueprints\agents` | Medium | Too thin and self-referential. Needs real agent lookup, status, and imported-agent warnings. |
| `Blueprints\agents\AGENT_INDEX.md` | Missing index | Deterministic agent authority map | High | Not present. Without it, imported agents and active roles are ambiguous. |
| `Blueprints\agents\agents.md` | Global agent manifesto | Defines Justin, Claude, Codex roles and authority | Low/medium | Useful 0-OS doctrine, but not a deterministic index. Consider `AGENT_MANIFEST.md` or keep with clear README. |
| `Blueprints\agents\manager_agent.md` | Prompt artifact, not global agent role | Corvus/slops-saloon Manager Agent system prompt copy | High if treated as global agent | Header says file belongs to `slops-saloon/Blueprints/prompts/manager_agent.md`. This is Corvus runtime prompt material, not a reusable SLOPS agent role. |
| `Blueprints\agents\sub_agents.md` | Prompt artifact, not global agent role | Corvus/slops-saloon sub-agent prompt copy | High if treated as global agent | Header says file belongs to `slops-saloon/Blueprints/prompts/sub_agents.md`. Corvus-specific. |
| `Blueprints\agents\_imported\*` | Imported agent examples | External candidate/reference agent library | High if activated | Many files include broad tool or execution language. Keep candidate/reference-only until reviewed. |
| `Blueprints\agents\_imported\handoffs\*` | Imported/legacy handoff docs | Reference-only handoff notes | Medium | Could confuse with active handoffs. Keep non-authoritative. |
| `slops-saloon\Blueprints\prompts\manager_agent.md` | Runtime prompt artifact | Current app prompt loaded by source | Medium | App runtime now reads from this path. Treat as 1-slops-saloon canonical until a Corvus-specific runtime path is approved. |
| `slops-saloon\Blueprints\prompts\sub_agents.md` | Runtime prompt artifact | Current app sub-agent prompt source | Medium | Same as above. Corvus-specific in content, but app-runtime canonical today. |
| `slops-saloon\Blueprints\skills` | Empty folder | Potential app-specific skill folder | Low | Keep empty unless app-specific skills are needed. Do not duplicate global skills. |
| `slops-saloon\corvus\Blueprints\playbooks\espn-recovery.md` | Corvus playbook | Product-specific recovery playbook | Low/medium | Correct 2-Corvus placement. |
| `slops-saloon\corvus\Blueprints\specs\omen-mvp-move.md` | Corvus spec | Product-specific spec | Low | Correct 2-Corvus placement. |

Imported agent library map:

| Current Path | Artifact Type | Current Role | Risk / Issue | Notes |
|---|---|---|---|---|
| `Blueprints\agents\_imported\Academic Division\*.md` | Imported agent examples | Academic/research persona candidates | Medium | Keep reference-only until reviewed. |
| `Blueprints\agents\_imported\Design Division\*.md` | Imported agent examples | Design persona candidates | Medium | Some may be useful for future brand/design review, but not active. |
| `Blueprints\agents\_imported\Engineering Division\*.md` | Imported agent examples | Engineering persona candidates | High | Contains backend, DevOps, SRE, security, CI/CD, deployment-style instructions. Needs strict RBAC before use. |
| `Blueprints\agents\_imported\Finance Division\*.md` | Imported agent examples | Finance persona candidates | Medium/high | Financial/accounting advice should stay reference-only until reviewed. |
| `Blueprints\agents\_imported\Marketing Division\*.md` | Imported agent examples | Marketing persona candidates | Medium/high | Some files mention credentials, platform publishing, APIs, and content automation. |
| `Blueprints\agents\_imported\Paid Media Division\*.md` | Imported agent examples | Paid media persona candidates | High | Several files list `Bash` or ad-account mutation workflows. Do not activate without explicit paid-media RBAC. |
| `Blueprints\agents\_imported\Product Division\*.md` | Imported agent examples | Product persona candidates | Medium | Potentially useful as reference, but needs Slops doctrine wrapper. |
| `Blueprints\agents\_imported\Project Management Division\*.md` | Imported agent examples | PM persona candidates | Medium/high | Some workflow/git material could conflict with SLOPS current git rules. |
| `Blueprints\agents\_imported\Sales Division\*.md` | Imported agent examples | Sales persona candidates | Medium | Future go-to-market reference only. |
| `Blueprints\agents\_imported\Specialized Division\*.md` | Imported agent examples | Mixed specialized persona candidates | High | Includes orchestrator, compliance, workflow, document-generation, and domain-specific agents. Needs per-file review. |
| `Blueprints\agents\_imported\Support Division\*.md` | Imported agent examples | Support/ops persona candidates | High | Infrastructure, legal/compliance, and analytics files can imply sensitive authority. Keep reference-only. |

## Recommended DBS Layer Map

| Current Path | Recommended Layer | Recommended Destination | Action | Reason |
|---|---|---|---|---|
| `Blueprints\skills\README.md` | 0-OS | `Blueprints\skills\README.md` | keep | Correct canonical skill entrypoint. |
| `Blueprints\skills\SKILL_INDEX.md` | 0-OS | `Blueprints\skills\SKILL_INDEX.md` | index | Keep but normalize path casing and `SKILL.md` filenames. |
| `Blueprints\skills\skills.md` | 0-OS | `Blueprints\skills\SKILL_ROUTING.md` or `Blueprints\skills\agent-skill-matrix.md` | rename | It is a routing matrix, not a skill. Rename after dependency updates. |
| `Blueprints\skills\tools.md` | 0-OS | `Blueprints\tools\tool-permissions.md` | move | Tool permissions are cross-cutting RBAC policy, not a skill. |
| `Blueprints\skills\_template\SKILL.md` | 0-OS | `Blueprints\skills\_template\SKILL.md` | keep | Correct reference template. |
| `Blueprints\skills\slops-context-markdown\SKILL.md` | 0-OS | `Blueprints\skills\slops-context-markdown\SKILL.md` | keep | True reusable SLOPS skill. |
| `Blueprints\skills\slops-context-markdown\agents\openai.yaml` | 0-OS | `Blueprints\skills\slops-context-markdown\interface\openai.yaml` | rename | `agents` support folder can be confused with agent authority. |
| `Blueprints\skills\slops-context-markdown\references\dbs-style.md` | 0-OS | `Blueprints\skills\slops-context-markdown\references\dbs-style.md` | keep | Correct skill reference file. |
| `Blueprints\skills\slops-skill-author\SKILL.md` | 0-OS | `Blueprints\skills\slops-skill-author\SKILL.md` | keep | True reusable SLOPS skill. |
| `Blueprints\skills\slops-agent-author\SKILL.md` | 0-OS | `Blueprints\skills\slops-agent-author\SKILL.md` | keep | True reusable SLOPS skill for agent authoring. |
| `Blueprints\skills\pre-build-research\SKILL.md` | 0-OS | `Blueprints\skills\pre-build-research\SKILL.md` | keep | True reusable SLOPS skill. Outputs route down by scope. |
| `Blueprints\skills\slops-prompt-generator\SKILL.md` | 0-OS | `Blueprints\skills\slops-prompt-generator\SKILL.md` | keep | True reusable SLOPS skill. |
| `Blueprints\skills\slops-prompt-generator\agents\openai.yaml` | 0-OS | `Blueprints\skills\slops-prompt-generator\interface\openai.yaml` | rename | Same support-folder ambiguity as above. |
| `Blueprints\skills\slops-prompt-generator\references\audit-reference.md` | 0-OS | `Blueprints\skills\slops-prompt-generator\references\audit-reference.md` | keep | Correct support reference. |
| `Blueprints\skills\clean-up-checkpoint\SKILL.md` | 0-OS | `Blueprints\skills\clean-up-checkpoint\SKILL.md` | keep | True reusable skill, but note app-aware defaults. |
| `Blueprints\agents\README.md` | 0-OS | `Blueprints\agents\README.md` | index | Replace redirect with real lookup rules, status model, and import warnings. |
| `Blueprints\agents\AGENT_INDEX.md` | 0-OS | `Blueprints\agents\AGENT_INDEX.md` | index | Create later. This is the missing authority map. |
| `Blueprints\agents\agents.md` | 0-OS | `Blueprints\agents\AGENT_MANIFEST.md` or keep `agents.md` with index links | rename | It is a global manifesto, not a folder index. |
| `Blueprints\agents\manager_agent.md` | 2-Corvus | `slops-saloon\Blueprints\prompts\manager_agent.md` now; later consider `slops-saloon\corvus\Blueprints\prompts\manager_agent.md` | review only | It is Corvus runtime prompt material. Do not keep as global agent authority. Moving later requires source path review. |
| `Blueprints\agents\sub_agents.md` | 2-Corvus | `slops-saloon\Blueprints\prompts\sub_agents.md` now; later consider `slops-saloon\corvus\Blueprints\prompts\sub_agents.md` | review only | Same as manager prompt. |
| `Blueprints\agents\_imported\**\*.md` | 0-OS Reference | `Blueprints\agents\_imported\<Division>\<file>.md` | keep | Keep candidate/reference-only until reviewed. |
| `Blueprints\agents\_imported\handoffs\*` | 0-OS Reference | `Blueprints\agents\_imported\handoffs\*` or `Archive\imports\agents-handoffs\*` | review only | Non-authoritative; do not mix with active handoffs. |
| `slops-saloon\Blueprints\prompts\manager_agent.md` | 1-slops-saloon now, 2-Corvus long-term | Keep current path until runtime path strategy is decided | keep | Current runtime source reads here after dependency repair. |
| `slops-saloon\Blueprints\prompts\sub_agents.md` | 1-slops-saloon now, 2-Corvus long-term | Keep current path until runtime path strategy is decided | keep | Current runtime source reads here after dependency repair. |
| `slops-saloon\Blueprints\skills` | 1-slops-saloon | `slops-saloon\Blueprints\skills` | no action | Empty app-specific skill bucket. Use only if a skill is not reusable at 0-OS. |
| `slops-saloon\corvus\Blueprints\playbooks\espn-recovery.md` | 2-Corvus | `slops-saloon\corvus\Blueprints\playbooks\espn-recovery.md` | keep | Product-specific playbook. |
| `slops-saloon\corvus\Blueprints\specs\omen-mvp-move.md` | 2-Corvus | `slops-saloon\corvus\Blueprints\specs\omen-mvp-move.md` | keep | Product-specific spec. |

## Skills Recommendations

| Skill Name | Recommended Path | Status | Edits Needed | Index Update Needed |
|---|---|---|---|---|
| `slops-context-markdown` | `Blueprints\skills\slops-context-markdown\SKILL.md` | active | Optional: rename support folder `agents` to `interface`. | Yes, only if support folder is renamed. |
| `slops-prompt-generator` | `Blueprints\skills\slops-prompt-generator\SKILL.md` | active | Optional: rename support folder `agents` to `interface`; clarify output paths for 2-Corvus prompts. | Yes, only if support folder is renamed or Corvus prompt routing is added. |
| `clean-up-checkpoint` | `Blueprints\skills\clean-up-checkpoint\SKILL.md` | active | Add note that app-specific defaults are examples, not hardcoded global authority. | No immediate index change unless description changes. |
| `pre-build-research` | `Blueprints\skills\pre-build-research\SKILL.md` | active | No urgent edits. Strong ToS/pricing/rate-limit structure. | Normalize path casing in `SKILL_INDEX.md`. |
| `slops-skill-author` | `Blueprints\skills\slops-skill-author\SKILL.md` | active | No urgent edits. | Normalize path casing in `SKILL_INDEX.md`. |
| `slops-agent-author` | `Blueprints\skills\slops-agent-author\SKILL.md` | active | No urgent edits. Already flags manager/sub as project-specific if Corvus runtime. | Normalize path casing in `SKILL_INDEX.md`. |
| `_template` | `Blueprints\skills\_template\SKILL.md` | reference-only | Keep as template. Do not list as callable active skill unless clearly marked template. | Optional: add template row under a separate "Reference Templates" section. |
| `skills.md` matrix | `Blueprints\skills\SKILL_ROUTING.md` | reference/routing doc | Rename or keep with clearer name. | Update links after approval. |
| `tools.md` | `Blueprints\tools\tool-permissions.md` | policy/RBAC doc | Move later; split by tool risk and agent role. | Update links from skills and agents docs after approval. |

## Agents Recommendations

| Agent Name | Division | Recommended Status | Recommended Layer | Approved/Candidate/Reference-Only Recommendation | Global or Project-Specific |
|---|---|---|---|---|---|
| Justin / CEO | Founder authority | active | 0-OS | Approved as global authority in `agents.md`. | Global |
| Claude / Architect | Planning/review | active | 0-OS | Approved as global planning role, subject to current tool permissions. | Global |
| Codex / Engineer | Execution/verification | active | 0-OS with repo-specific constraints | Approved as global execution role, but repo-specific instructions still control each task. | Global |
| Manager Agent prompt | Corvus fantasy football runtime | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Keep canonical runtime prompt under `slops-saloon\Blueprints\prompts` for now. Do not treat root copy as global agent. | Project-specific |
| Weather Agent prompt | Corvus sub-agent | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Part of `sub_agents.md`; project-specific runtime prompt. | Project-specific |
| Travel Agent prompt | Corvus sub-agent | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Part of `sub_agents.md`; project-specific runtime prompt. | Project-specific |
| Game Time Agent prompt | Corvus sub-agent | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Part of `sub_agents.md`; project-specific runtime prompt. | Project-specific |
| Roster Agent prompt | Corvus sub-agent | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Part of `sub_agents.md`; project-specific runtime prompt. | Project-specific |
| Performance Agent prompt | Corvus sub-agent | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Part of `sub_agents.md`; project-specific runtime prompt. | Project-specific |
| Matchup Agent prompt | Corvus sub-agent | active prompt, not active global agent | 1-slops-saloon now, 2-Corvus long-term | Part of `sub_agents.md`; project-specific runtime prompt. | Project-specific |
| Academic Division imported agents | Academic Division | reference-only by default | 0-OS Reference | Keep candidate/reference-only. | Global candidates only after review |
| Design Division imported agents | Design Division | candidate/reference-only | 0-OS Reference | Potential future design/brand reviewers, but no active authority yet. | Global candidates only after review |
| Engineering Division imported agents | Engineering Division | reference-only until strict RBAC | 0-OS Reference | High-risk because of implementation, security, infrastructure, and deployment language. | Global candidates only after review |
| Finance Division imported agents | Finance Division | reference-only | 0-OS Reference | Keep non-authoritative because finance/tax content needs review. | Global candidates only after review |
| Marketing Division imported agents | Marketing Division | reference-only | 0-OS Reference | Some mention credentials/API publishing; do not activate. | Global candidates only after review |
| Paid Media Division imported agents | Paid Media Division | reference-only | 0-OS Reference | High-risk because of ad-account mutation and `Bash` mentions. | Global candidates only after review |
| Product Division imported agents | Product Division | candidate/reference-only | 0-OS Reference | Could be useful, but must be wrapped in Slops doctrine. | Global candidates only after review |
| Project Management Division imported agents | Project Management Division | candidate/reference-only | 0-OS Reference | Some git/workflow rules may conflict with current SLOPS git process. | Global candidates only after review |
| Sales Division imported agents | Sales Division | reference-only | 0-OS Reference | Future GTM reference, not launch-critical. | Global candidates only after review |
| Specialized Division imported agents | Specialized Division | reference-only | 0-OS Reference | Mixed domain agents; several need high-risk review. | Global candidates only after review |
| Support Division imported agents | Support Division | reference-only | 0-OS Reference | Infrastructure/legal/analytics roles can imply sensitive authority. | Global candidates only after review |

Recommended immediate agent-layer deliverables for later:

1. Create `Blueprints\agents\AGENT_INDEX.md`.
2. Replace `Blueprints\agents\README.md` with real lookup and status rules.
3. Add explicit note: files under `_imported` are not callable unless indexed as active or restricted.
4. Decide whether root `manager_agent.md` and `sub_agents.md` should be archived as stale duplicates or replaced with redirect notes.

## Tools Recommendations

Reviewed:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\tools.md`

Recommendation:

Move later to:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\tools\tool-permissions.md`

Reason:

- It is not a skill. It does not describe a repeatable workflow.
- It is not an agent. It does not define a persona or actor.
- It is a cross-cutting RBAC and tool-permission policy.
- A dedicated `Blueprints\tools` folder makes least-privilege policy easier to find from both skills and agents.

Recommended later structure:

```text
Blueprints\tools\
  README.md
  tool-permissions.md
  approval-gates.md
  risk-levels.md
```

Minimum edits needed if moved:

- Update `Blueprints\skills\skills.md`
- Update `Blueprints\agents\agents.md`
- Update `Blueprints\agents\README.md`
- Update `Blueprints\skills\README.md` if it mentions tool permissions
- Update any future `AGENT_INDEX.md`

Do not expand tool permissions during the move. First preserve current rules, then improve RBAC in a separate pass.

## Markdown Dependency Updates Needed

If the recommendations are approved, these references need updates:

| File | Current Reference | Recommended Reference |
|---|---|---|
| `Blueprints\skills\SKILL_INDEX.md` | `skill.md`, mixed `Skills`/`skills` casing | Use actual `SKILL.md` and actual lowercase folder paths, e.g. `Blueprints\skills\pre-build-research\SKILL.md`. |
| `Blueprints\skills\skills.md` | `Blueprints\Skills\tools.md` | `Blueprints\tools\tool-permissions.md` after approval. |
| `Blueprints\skills\skills.md` | `Blueprints\Agents\AGENT_INDEX.md` | Keep concept, but create actual `Blueprints\agents\AGENT_INDEX.md` first and normalize casing. |
| `Blueprints\skills\slops-skill-author\SKILL.md` | `Blueprints\Skills\...`, `Blueprints\Agents\...` | Normalize to actual lowercase path style if Justin wants deterministic path casing. |
| `Blueprints\skills\slops-agent-author\SKILL.md` | `Blueprints\Agents`, `Blueprints\Skills`, `slops-saloon\Blueprints\agents` | Normalize casing; confirm whether project agents should be `slops-saloon\Blueprints\agents` or prompts remain under `slops-saloon\Blueprints\prompts`. |
| `Blueprints\skills\pre-build-research\SKILL.md` | `Blueprints\Skills\pre-build-research\SKILL.md` | Normalize to `Blueprints\skills\pre-build-research\SKILL.md` if standardizing lowercase. |
| `Blueprints\agents\agents.md` | `skills.md` and `tools.md` | Update to `Blueprints\skills\SKILL_ROUTING.md` and `Blueprints\tools\tool-permissions.md` if renamed/moved. |
| `Blueprints\agents\manager_agent.md` | Header says `slops-saloon/Blueprints/prompts/manager_agent.md` | If keeping root copy, replace with redirect note. If archiving, update indexes to point to `slops-saloon\Blueprints\prompts\manager_agent.md`. |
| `Blueprints\agents\sub_agents.md` | Header says `slops-saloon/Blueprints/prompts/sub_agents.md` | Same as manager prompt. |
| `slops-saloon\Blueprints\prompts\PROMPTS_CHANGELOG.md` | `Blueprints/prompts/manager_agent.md`, `Blueprints/prompts/sub_agents.md` | Current relative path is okay inside `slops-saloon`; update only if moving to Corvus. |
| `slops-saloon\src\services\agents.js` | Runtime path to `Blueprints\prompts\manager_agent.md` | Do not change unless prompt files move again. |
| `slops-saloon\src\slops-saloon_prompt_loader.js` | Runtime path to `Blueprints\prompts` | Do not change unless prompt files move again. |
| `Blueprints\skills\tools.md` | `agents from github` | Replace with current `Blueprints\agents\_imported` wording. |

## Risk Notes

Least-privilege risks:

- Imported agents often declare broad tool access such as `Write`, `Edit`, `Bash`, or API mutation behavior.
- Division folders can imply authority if there is no `AGENT_INDEX.md`.
- A file named `manager_agent.md` under global `Blueprints\agents` can be mistaken for an approved global manager agent.
- Skill support folders named `agents` can be confused with actual agent authority.

RBAC risks:

- There is no deterministic `AGENT_INDEX.md` yet.
- `tools.md` grants broad categories but does not yet define per-agent write paths or per-layer permissions.
- Imported agents do not carry SLOPS status fields such as `candidate`, `active`, `restricted`, `reference-only`, or `archived`.

Imported-agent risks:

- Engineering imported agents include security, DevOps, CI/CD, SRE, and deployment-like material.
- Paid media imported agents mention account mutation and platform actions.
- Support/infrastructure imported agents include database backup, production, and delete examples.
- Marketing imported agents mention API credentials and publishing automation.
- None should be activated without per-file review and explicit index entry.

Secrets and production risks:

- Do not let imported agents read or write `.env`, keys, tokens, cookies, credentials, DNS, SSL, Nginx, VPS, production config, databases, migrations, or payment/auth files by default.
- Tool permission policy should explicitly say imported agents have no execution authority until wrapped by an approved SLOPS role.

Database risks:

- Imported engineering/support agents contain database/migration/backup language. Treat as reference-only.
- Any database authority must require Justin approval and an explicit Codex implementation prompt.

File-move risks:

- Moving `slops-saloon\Blueprints\prompts\manager_agent.md` or `sub_agents.md` will affect runtime prompt loading.
- Moving `tools.md` requires dependency updates in `skills.md`, `agents.md`, and future agent README/index files.
- Renaming `skills.md` requires link updates.
- Archiving root `Blueprints\agents\manager_agent.md` and `sub_agents.md` is safe only after confirming no root workflows still use those paths.

## Proposed Execution Plan for Later

Do not execute this plan until Justin approves it.

### Phase 1: Safe Docs/Index Updates

1. Create `Blueprints\agents\AGENT_INDEX.md`.
2. Replace `Blueprints\agents\README.md` with real lookup, status, and import rules.
3. Normalize `Blueprints\skills\SKILL_INDEX.md` path casing and `SKILL.md` filenames.
4. Add a note to `Blueprints\skills\README.md` that `tools.md` is pending migration to `Blueprints\tools`.
5. Add imported-agent status language: default `reference-only` unless indexed.

### Phase 2: Folder Moves

1. Create `Blueprints\tools`.
2. Move `Blueprints\skills\tools.md` to `Blueprints\tools\tool-permissions.md`.
3. Rename `Blueprints\skills\skills.md` to `Blueprints\skills\SKILL_ROUTING.md` or keep it after Justin decides.
4. Rename skill support folders `agents` to `interface` where they only contain provider metadata.
5. Decide whether root `Blueprints\agents\manager_agent.md` and `sub_agents.md` become redirect notes, archive copies, or are removed from global agents.

### Phase 3: Markdown Dependency Rewrites

1. Update all references from old `tools.md` path to `Blueprints\tools\tool-permissions.md`.
2. Update all references from `skills.md` if renamed.
3. Update `manager_agent.md` and `sub_agents.md` references based on approved canonical location.
4. Update `AGENT_INDEX.md` and `SKILL_INDEX.md`.
5. Update root `DBS_INDEX.md` if tool/agent paths change.

### Phase 4: Verification

1. Run `rg` for old paths.
2. Run `git status`.
3. Run `git diff`.
4. If runtime prompt paths are touched, run targeted Node syntax checks and `npm test` inside `slops-saloon`.
5. Confirm no secrets, production, deploy, package, SQL, scripts, tests, `.git`, `node_modules`, or quarantine files were touched.

### Phase 5: Cleanup/Archive

1. Archive stale root copies only after dependency checks.
2. Keep imported agents under `_imported` unless a specific role is approved and wrapped.
3. Add import review notes by division.
4. Create a future candidate shortlist for useful SLOPS-specific roles.

## Questions for Justin

1. Should path casing be standardized as lowercase (`Blueprints\skills`, `Blueprints\agents`) because that is the actual folder casing?
2. Should `tools.md` move to a new `Blueprints\tools\tool-permissions.md` folder, or should it stay in `Blueprints\skills` until the agent index exists?
3. Should `skills.md` be renamed to `SKILL_ROUTING.md`, or do you prefer keeping the simpler current filename?
4. Should root `Blueprints\agents\manager_agent.md` and `sub_agents.md` become redirect notes, archive copies, or be deleted later after confirmation?
5. Should Corvus runtime prompts eventually move from `slops-saloon\Blueprints\prompts` to `slops-saloon\corvus\Blueprints\prompts`, knowing that source paths must change too?
6. Which imported-agent divisions are worth reviewing first: Engineering, Product, Design, Marketing, or Support?
7. Do you want imported agents to default to `reference-only` or `candidate` in the future `AGENT_INDEX.md`?

## Completion Report

Commands run:

- `dir`
- `dir Blueprints`
- `dir Direction`
- `dir Blueprints\skills`
- `dir Blueprints\agents`
- `dir Blueprints\agents\_imported`
- `dir slops-saloon`
- `dir slops-saloon\corvus`
- `dir Direction\Reviews`
- `tree Blueprints\skills /F`
- `tree Blueprints\agents /F`
- `tree slops-saloon\Blueprints /F`
- `tree slops-saloon\corvus /F`
- `rg --files Blueprints\skills Blueprints\agents`
- `rg --files slops-saloon\Blueprints slops-saloon\corvus\Blueprints slops-saloon\corvus\Direction slops-saloon\corvus\Brand`
- `rg` searches for path dependencies and imported-agent risk terms
- `git status --short` at SLOPS root
- `git status --short` inside `slops-saloon`
- A PowerShell conditional read check was used once for optional `Blueprints\agents\AGENT_INDEX.md`; it produced no content because the file was not present.
- `mkdir Direction\Reviews` was run only because the requested report folder did not exist.

Files read:

- `Blueprints\skills\README.md`
- `Blueprints\skills\SKILL_INDEX.md`
- `Blueprints\skills\skills.md`
- `Blueprints\skills\tools.md`
- `Blueprints\skills\_template\SKILL.md`
- `Blueprints\skills\slops-context-markdown\SKILL.md`
- `Blueprints\skills\slops-skill-author\SKILL.md`
- `Blueprints\skills\slops-agent-author\SKILL.md`
- `Blueprints\skills\pre-build-research\SKILL.md`
- `Blueprints\skills\slops-prompt-generator\SKILL.md`
- `Blueprints\skills\clean-up-checkpoint\SKILL.md`
- `Blueprints\agents\README.md`
- `Blueprints\agents\manager_agent.md`
- `Blueprints\agents\sub_agents.md`
- `Blueprints\agents\agents.md`

Report path written:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction\Reviews\skills-agents-tools-layer-audit.md`

Recommendations count:

- 32 actionable recommendations in the main tables and execution plan.
- 11 imported-agent division recommendations.
- 7 Justin decision questions.

Known limitations:

- I did not read every imported agent file end to end. I mapped them with `tree` and `rg --files`, then searched risk terms across the imported library.
- I did not inspect secrets, `.env` files, keys, `node_modules`, `.git`, or quarantine.
- I did not run builds, tests, installs, migrations, Docker commands, or deployment commands.
- I did not update indexes, move files, activate imported agents, or rewrite existing docs.
