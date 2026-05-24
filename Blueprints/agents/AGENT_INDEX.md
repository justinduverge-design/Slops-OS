# Agent Authority Matrix

This is the canonical agent authority file for SLOPS OS.

It is the single source of truth that defines who has what status, permissions, and tool authority.

Any future agent or operator resolves authority by reading this file first.

---

## Status Legend

| Status | Meaning | Authority | Tool Access | Examples |
|---|---|---|---|---|
| **active** | Approved, doctrine-wrapped, callable | Full per role | Tier cap per role | Claude, Codex, Justin |
| **candidate** | Reviewed, not yet doctrine-wrapped | Limited | Tier 1–2 only | (TBD: awaits promotion) |
| **reference-only** | Imported material, readable for inspiration | None | Tier 1 only | Items in `_imported\` folders |
| **do-not-activate** | Flagged for security/RBAC concerns | None | None | (blocked until approval) |

---

## Section 1: Global Authorities (0-OS Level)

These are the canonical SLOPS roles. They define the operating system itself.

| Role | File | Status | Authority | Tool Tier Cap | Responsibilities |
|---|---|---|---|---|---|
| **Justin** | (person — no file) | active | Sole founder; final decision on all matters | Tier 5 (no limit) | Product vision, roadmap approval, risk acceptance, monetization, platform strategy, tool grant approval |
| **Claude** | `Blueprints\agents\agents.md` | active | Planning, review, documentation, routing | Tier 3 (write-guarded) | Strategy, architecture, planning, review, markdown updates, risk assessment, prompt building, doctrine extraction |
| **Codex** | `Blueprints\agents\agents.md` | active | Execution, implementation, verification | Tier 5 (all; requires approval for destructive) | Code generation, automation, file edits, terminal commands, tests, verification, git operations |

### Interaction Rules

- **Claude ↔ Justin:** Claude challenges decisions that drift from doctrine; Justin makes final calls.
- **Claude ↔ Codex:** Claude writes plans; Codex executes only approved plans.
- **Codex ↔ Justin:** Codex escalates destructive, risky, or unclear work to Claude first, then Justin.
- **All:** Follow shared principles in `agents.md` (Context First, No Hallucinations, Explicit Assumptions, Reversible Changes, etc.)

---

## Section 2: Active SLOPS Skills (0-OS Authored)

These are the canonical reusable skills built into the SLOPS OS.

| Skill | File | Status | Default Agent | Layer | Purpose |
|---|---|---|---|---|---|
| `slops-context-markdown` | `Blueprints\skills\slops-context-markdown\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Create, update, normalize, and route DBS markdown context files |
| `slops-prompt-generator` | `Blueprints\skills\slops-prompt-generator\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Convert audits, handoffs, specs, contracts, context into concrete runnable prompts |
| `slops-skill-author` | `Blueprints\skills\slops-skill-author\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Create, critique, normalize, and improve SLOPS-authored skill markdown files |
| `slops-agent-author` | `Blueprints\skills\slops-agent-author\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Create, critique, normalize, and improve SLOPS agent role files using RBAC and least privilege |
| `agent-wrapper-generator` | `Blueprints\skills\agent-wrapper-generator\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Generate least-privilege SLOPS agent wrapper files from approved review memos or explicit candidate selections |
| `agent-index-diff-builder` | `Blueprints\skills\agent-index-diff-builder\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Build proposed `AGENT_INDEX.md` additions or diffs from wrapper files without applying them |
| `rbac-risk-review` | `Blueprints\skills\rbac-risk-review\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Review agents, skills, prompts, plans, and proposed changes for RBAC, overlap, tool-tier, and high-risk authority concerns |
| `workflow-tree-spec` | `Blueprints\skills\workflow-tree-spec\SKILL.md` | active | Claude first, Codex if writing files | 0-OS or project | Produce workflow-tree specs with happy paths, branches, failure states, recovery paths, and observable state contracts |
| `security-privacy-evidence` | `Blueprints\skills\security-privacy-evidence\SKILL.md` | active | Claude first, Codex if writing files | 0-OS or project | Maintain security/privacy evidence notes, control mappings, data classification, consent boundaries, and approval records |
| `command-bridge-generator` | `Blueprints\skills\command-bridge-generator\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Generate approved Claude and Codex command-bridge shim files from `SKILL_ROUTING.md` and `AGENT_INDEX.md` |
| `pre-build-research` | `Blueprints\skills\pre-build-research\SKILL.md` | active | Claude / ChatGPT research first, Codex later | 0-OS or project | Research external APIs, data sources, and integrations before build prompts |
| `clean-up-checkpoint` | `Blueprints\skills\clean-up-checkpoint\SKILL.md` | active | Claude first, Codex if writing files | 0-OS | Stop new work and create a rate-limit-safe checkpoint with next prompt |

---

## Section 3: Project-Specific Agents (Not Global SLOPS)

These are agents defined at layer 1-ssffmvp or layer 2-Corvus. They are not reusable at 0-OS level.

| Agent | File | Layer | Status | Scope | Tool Access |
|---|---|---|---|---|---|
| **Manager Agent** | `ssffmvp\Blueprints\prompts\manager_agent.md` | 1-ssffmvp | active (runtime) | Corvus fantasy football runtime orchestration | Per prompt definition |
| **Sub-Agents (6)** | `ssffmvp\Blueprints\prompts\sub_agents.md` | 1-ssffmvp | active (runtime) | Corvus sub-agent prompts (fantasy engine) | Per prompt definition |

**Note:** These are runtime prompts, not SLOPS-level agents. They do not inherit 0-OS authority model. Each is defined in its own prompt file.

---

## Section 4: Imported Agent Library Review

All imported files under `Blueprints\agents\_imported\` remain non-authoritative source material.

**Important:** A division folder does not become callable. Only the reviewed wrapper files listed in Section 5 have `candidate` status. Imported source files that are not represented by a wrapper remain `reference-only` or `do-not-activate` according to the review notes.

Review sources:

- `Direction\reviews\design-division-import-review.md`
- `Direction\reviews\marketing-sales-division-import-review.md`
- `Direction\reviews\paid-media-finance-academic-import-review.md`
- `Direction\reviews\support-specialized-project-engineering-import-review.md`
- `Direction\reviews\agent-wrapper-creation-summary.md`
- `Solutions\reports\dbs-migration\phase-5-reviews\product-division-review.md`

| Division | Imported File Count | Candidate Wrappers | Reference-Only | Do-Not-Activate | Risk Level | Notes |
|---|---:|---:|---:|---:|---|---|
| `__academic_division` | 5 | 3 | 2 | 0 | low-medium | Lore, culture, narrative, and research support only |
| `__design_division` | 7 | 5 | 1 | 1 | medium | Design critique and draft guidance only; no implementation authority |
| `__engineering_division` | 17 | 9 | 4 | 4 | high | Advisory wrappers only; Codex remains implementation owner |
| `__finance_division` | 5 | 2 | 2 | 1 | high | Sanitized planning only; no books, tax, banking, or official forecasts |
| `__marketing_division` | 9 | 4 | 4 | 1 | medium-high | Draft strategy/copy only; no posting, account access, or paid spend |
| `__paid_media_division` | 7 | 4 | 2 | 1 | high | Audit/planning only; no ad account access, tracking changes, or spend |
| `__product_division` | 5 | 2 | 1 | 2 | medium-high | PRD and prioritization support only; Justin owns decisions |
| `__project_management_division` | 6 | 3 | 3 | 0 | medium | Status, plans, and task breakdowns only |
| `__sales_division` | 9 | 7 | 1 | 1 | high | Draft sales strategy only; no outreach, CRM, pricing, or commitments |
| `__specialized_division` | 14 | 4 | 4 | 6 | high | Narrow wrappers only; regulated/customer-data roles blocked |
| `__support_division` | 6 | 4 | 1 | 1 | high | Draft response/report/checklist only; no customer systems |
| `__handoffs` | 1 | 0 | 1 | 0 | low | Reference templates only |

### Promotion Process

Imported agents become active through this workflow:

1. Claude or Codex reviews the imported file using `slops-onboarding-agent`, `slops-agent-author`, and `rbac-risk-review`.
2. Only clear, useful, least-privilege roles receive wrapper files under `Blueprints\agents\<division>\`.
3. Ambiguous roles stay `reference-only`.
4. High-risk roles become `do-not-activate`.
5. Justin approves or redirects.
6. `AGENT_INDEX.md` is updated with the wrapper file only, not the imported source file.
7. Candidate agents are still not active. Active promotion requires a later explicit Justin decision.

---

## Section 5: Candidate Agent Wrappers

These wrappers are reviewed and approved as `candidate` only. They are not active autonomous agents.

Shared constraints for every candidate wrapper:

- Tier 2 max: read, analyze, draft, and recommend only.
- May write draft markdown only when explicitly assigned.
- No app source edits.
- No secrets, `.env`, credentials, tokens, or cookies.
- No production, deployment, infrastructure, auth, payment, database, SQL, or external account mutation.
- No outbound email, SMS, public posting, ad spend, CRM action, support ticket action, or customer-data access.
- Justin makes final business, roadmap, launch, spend, legal, security, and activation decisions.

| Agent | Division | Path | Status | Allowed Use | May Invoke Skills | Approval Required |
|---|---|---|---|---|---|---|
| `academic-anthropologist` | Academic | `Blueprints\agents\academic\academic-anthropologist.md` | candidate | Cultural-coherence lore review | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public living-culture references, activation |
| `academic-historian` | Academic | `Blueprints\agents\academic\academic-historian.md` | candidate | Historical lore research | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public lore claims, activation |
| `academic-narratologist` | Academic | `Blueprints\agents\academic\academic-narratologist.md` | candidate | Narrative and lore structure review | `slops-context-markdown`, `slops-prompt-generator` | Public lore decisions, activation |
| `design-brand-guardian` | Design | `Blueprints\agents\design\design-brand-guardian.md` | candidate | Brand consistency review and voice notes | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public brand decisions, legal/trademark, activation |
| `design-image-prompt-engineer` | Design | `Blueprints\agents\design\design-image-prompt-engineer.md` | candidate | Image prompt drafting | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | External generation, final assets, activation |
| `design-ui-designer` | Design | `Blueprints\agents\design\design-ui-designer.md` | candidate | UI and design-system review | `slops-context-markdown`, `slops-prompt-generator` | Frontend implementation, activation |
| `design-ux-researcher` | Design | `Blueprints\agents\design\design-ux-researcher.md` | candidate | Research plans and usability templates | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | User research, participant data, activation |
| `design-whimsy-injector` | Design | `Blueprints\agents\design\design-whimsy-injector.md` | candidate | Microcopy and delight review | `slops-context-markdown`, `slops-prompt-generator` | User-facing copy or implementation, activation |
| `engineering-ai-integration-advisor` | Engineering | `Blueprints\agents\engineering\engineering-ai-integration-advisor.md` | candidate | AI integration planning | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Paid APIs, model changes, user data, activation |
| `engineering-backend-architect-advisor` | Engineering | `Blueprints\agents\engineering\engineering-backend-architect-advisor.md` | candidate | Backend architecture advice | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Migrations, API finalization, activation |
| `engineering-code-reviewer` | Engineering | `Blueprints\agents\engineering\engineering-code-reviewer.md` | candidate | Advisory code review | `slops-context-markdown`, `slops-prompt-generator` | Code edits, GitHub actions, activation |
| `engineering-codebase-onboarding-engineer` | Engineering | `Blueprints\agents\engineering\engineering-codebase-onboarding-engineer.md` | candidate | Read-only repo orientation | `slops-context-markdown` | Any edit or execution, activation |
| `engineering-data-engineer-advisor` | Engineering | `Blueprints\agents\engineering\engineering-data-engineer-advisor.md` | candidate | Data ingestion planning | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | ETL, database/provider access, activation |
| `engineering-security-engineer` | Engineering | `Blueprints\agents\engineering\engineering-security-engineer.md` | candidate | Defensive security review drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Testing, secrets, auth, infrastructure, activation |
| `engineering-software-architect` | Engineering | `Blueprints\agents\engineering\engineering-software-architect.md` | candidate | ADRs and architecture trade-offs | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Final architecture, implementation, activation |
| `engineering-sre-advisor` | Engineering | `Blueprints\agents\engineering\engineering-sre-advisor.md` | candidate | SLO and observability drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Production, alerts, infrastructure, activation |
| `engineering-technical-writer` | Engineering | `Blueprints\agents\engineering\engineering-technical-writer.md` | candidate | Developer docs drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Publishing, docs CI, activation |
| `finance-financial-analyst` | Finance | `Blueprints\agents\finance\finance-financial-analyst.md` | candidate | Sanitized financial analysis drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Live financial systems, official forecasts, activation |
| `finance-fpa-analyst` | Finance | `Blueprints\agents\finance\finance-fpa-analyst.md` | candidate | Budget and scenario planning drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Budget, hiring, forecast finalization, activation |
| `marketing-content-creator` | Marketing | `Blueprints\agents\marketing\marketing-content-creator.md` | candidate | Content drafts and briefs | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Publication, external send, activation |
| `marketing-reddit-community-builder` | Marketing | `Blueprints\agents\marketing\marketing-reddit-community-builder.md` | candidate | Reddit research and draft strategy | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Reddit action, public communication, activation |
| `marketing-social-media-strategist` | Marketing | `Blueprints\agents\marketing\marketing-social-media-strategist.md` | candidate | Social strategy drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Posting, account access, paid spend, activation |
| `marketing-video-optimization-specialist` | Marketing | `Blueprints\agents\marketing\marketing-video-optimization-specialist.md` | candidate | Video packaging drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Platform access, publishing, activation |
| `paid-media-auditor` | Paid Media | `Blueprints\agents\paid-media\paid-media-auditor.md` | candidate | Manual paid-media audit drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | API/live account access, spend, activation |
| `paid-media-creative-strategist` | Paid Media | `Blueprints\agents\paid-media\paid-media-creative-strategist.md` | candidate | Ad creative drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Ad launch, platform access, spend, activation |
| `paid-media-search-query-analyst` | Paid Media | `Blueprints\agents\paid-media\paid-media-search-query-analyst.md` | candidate | Search-query export analysis | `slops-context-markdown`, `slops-prompt-generator` | Ad account access, keyword deployment, activation |
| `paid-media-tracking-specialist` | Paid Media | `Blueprints\agents\paid-media\paid-media-tracking-specialist.md` | candidate | Measurement plan drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Tags, pixels, customer-data flows, activation |
| `product-manager` | Product | `Blueprints\agents\product\product-manager.md` | candidate | PRDs, opportunity assessments, and product trade-off notes | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Roadmap, launch scope, monetization, activation |
| `product-sprint-prioritizer` | Product | `Blueprints\agents\product\product-sprint-prioritizer.md` | candidate | Prioritization notes and sprint framing | `slops-context-markdown`, `slops-prompt-generator` | Roadmap, launch scope, sprint commitments, activation |
| `project-management-experiment-tracker` | Project Management | `Blueprints\agents\project-management\project-management-experiment-tracker.md` | candidate | Experiment plan drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Live experiments, analytics, activation |
| `project-management-project-shepherd` | Project Management | `Blueprints\agents\project-management\project-management-project-shepherd.md` | candidate | Project status and risk drafts | `slops-context-markdown`, `slops-prompt-generator` | Scope, budget, timeline commitments, activation |
| `project-manager-senior` | Project Management | `Blueprints\agents\project-management\project-manager-senior.md` | candidate | Task breakdowns from approved specs | `slops-context-markdown`, `slops-prompt-generator` | Roadmap or scope commitments, activation |
| `sales-account-strategist` | Sales | `Blueprints\agents\sales\sales-account-strategist.md` | candidate | Account planning templates | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Customer contact, renewals, pricing, activation |
| `sales-deal-strategist` | Sales | `Blueprints\agents\sales\sales-deal-strategist.md` | candidate | Deal-risk and MEDDPICC drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Pricing, forecast, customer data, activation |
| `sales-discovery-coach` | Sales | `Blueprints\agents\sales\sales-discovery-coach.md` | candidate | Discovery templates and call prep | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Customer/prospect data, external calls, activation |
| `sales-engineer-advisor` | Sales | `Blueprints\agents\sales\sales-engineer-advisor.md` | candidate | Demo and POC-scope drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | POC execution, security claims, implementation, activation |
| `sales-outbound-strategist` | Sales | `Blueprints\agents\sales\sales-outbound-strategist.md` | candidate | ICP and sequence drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Outreach, CRM, prospect data, activation |
| `sales-pipeline-analyst` | Sales | `Blueprints\agents\sales\sales-pipeline-analyst.md` | candidate | Sanitized pipeline report drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | CRM/data access, official forecast, activation |
| `sales-proposal-strategist` | Sales | `Blueprints\agents\sales\sales-proposal-strategist.md` | candidate | Proposal narrative drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Proposal submission, pricing/legal, activation |
| `compliance-auditor` | Specialized | `Blueprints\agents\specialized\compliance-auditor.md` | candidate | Compliance readiness drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Evidence submission, certification, activation |
| `language-translator` | Specialized | `Blueprints\agents\specialized\language-translator.md` | candidate | Draft localization | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Regulated/public translation, activation |
| `specialized-developer-advocate` | Specialized | `Blueprints\agents\specialized\specialized-developer-advocate.md` | candidate | DX audits and changelog drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public docs, community action, activation |
| `specialized-workflow-architect` | Specialized | `Blueprints\agents\specialized\specialized-workflow-architect.md` | candidate | Workflow specs and state maps | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Canonical registry or implementation, activation |
| `support-analytics-reporter` | Support | `Blueprints\agents\support\support-analytics-reporter.md` | candidate | Sanitized analytics report drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Live data/dashboard access, activation |
| `support-executive-summary-generator` | Support | `Blueprints\agents\support\support-executive-summary-generator.md` | candidate | Executive summary drafts | `slops-context-markdown`, `slops-prompt-generator` | Binding commitments, activation |
| `support-legal-compliance-checker` | Support | `Blueprints\agents\support\support-legal-compliance-checker.md` | candidate | Compliance issue spotting | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Legal/compliance finalization, activation |
| `support-support-responder` | Support | `Blueprints\agents\support\support-support-responder.md` | candidate | Support response drafts | `slops-context-markdown`, `slops-prompt-generator` | Customer communication/ticket access, activation |

---

## Section 6: Tool Permission Reference

### Claude (Architect) — Tier 3 Max

Permitted tools:
- Read any file
- Search (grep, rg, find)
- Write to outputs/
- Edit markdown in shared context (Blueprints/, docs/) — requires per-task approval
- Git status, log, diff (read)
- Plan, review, draft, document
- Create markdown (skills, agents, specs, ADRs)
- No terminal execution
- No secrets access
- No destructive operations

Restricted tools:
- Bash execution
- Deploy
- Secrets / `.env` mutation
- File delete
- Force-push
- Infrastructure changes

### Codex (Engineer) — Tier 5 (with approval gates)

Permitted tools:
- All Tier 1–4 tools by default
- Terminal execution (npm, docker, tests, builds)
- File operations (read, write, edit, create)
- Git operations (status, log, diff, branch, commit, push)
- Database queries (read)

Restricted tools (require explicit approval):
- Database migrations (Tier 5)
- Delete files (Tier 5)
- Force-push, reset (Tier 5)
- Deploy to production (Tier 5)
- Rotate secrets, modify .env (Tier 5)
- Credentials / API key access (Tier 5)
- Infrastructure changes (Tier 5)

Codex escalates Tier 4–5 work to Claude, who escalates to Justin.

### Imported Agents — Tier 1 Only (read)

Until promoted:
- Read files only
- No write, edit, delete
- No bash execution
- No tool grants beyond reading

---

## Section 7: Authority Resolution Rules

When you are unsure about an agent's authority, follow this checklist:

1. **Find the agent in this file.** If it's not listed, it is not active.
2. **Check the status.** If not `active`, apply the reference-only restrictions.
3. **Check the tool tier cap.** This is the maximum tier the agent can use.
4. **Check the tool permissions policy.** See `Blueprints\tools\tool-permissions.md` for detailed tier rules.
5. **If tool tier is 4–5, escalate to Claude and Justin.** Codex cannot execute destructive work without approval.

---

## See Also

- **Tool permission policy:** `Blueprints\tools\tool-permissions.md`
- **Tool index and tiers:** `Blueprints\tools\TOOLS_INDEX.md`
- **Agent manifest:** `Blueprints\agents\agents.md`
- **Skill routing matrix:** `Blueprints\skills\SKILL_ROUTING.md`
- **Imported agent location:** `Blueprints\agents\_imported\`
