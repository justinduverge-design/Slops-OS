# Support, Specialized, Project Management, And Engineering Import Review

Date: 2026-05-23
Reviewer: Codex / slops-onboarding-agent
Source folders:

- `Blueprints\agents\_imported\__support_division`
- `Blueprints\agents\_imported\__specialized_division`
- `Blueprints\agents\_imported\__project_management_division`
- `Blueprints\agents\_imported\__engineering_division`

## Context

The imported agents remain non-authoritative until promoted through `slops-agent-author` review and recorded in `Blueprints\agents\AGENT_INDEX.md`.

Root `AGENTS.md` required files checked from `C:\Users\JDuve\OneDrive\Desktop\SLOPS`:

- `context.md` missing
- `roadmap.md` missing
- `manifesto.md` missing
- `handoffs\decisions.md` missing
- `handoffs\frontend-to-backend.md` missing
- `handoffs\backend-to-frontend.md` missing
- `CLAUDE.md` missing

Canonical authority files reviewed:

- `Blueprints\agents\AGENT_INDEX.md`
- `Blueprints\tools\tool-permissions.md`
- `Blueprints\skills\slops-agent-author\SKILL.md`

## Support Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `support-executive-summary-generator.md` | candidate | yes | low-medium | Useful for decision memos and executive summaries from provided content. Must not create binding owners, deadlines, or commitments. |
| `support-analytics-reporter.md` | candidate, restricted | yes | high | Useful for analysis templates and sanitized reporting. Must not access databases, customer data, analytics dashboards, or build live dashboards without approval. |
| `support-support-responder.md` | candidate, restricted | yes | high | Useful for support response drafts and escalation templates. Must not access ticketing systems, customer records, PII, or send customer communications. |
| `support-legal-compliance-checker.md` | candidate, restricted | yes | high | Useful as a compliance checklist/risk reviewer. Must not give final legal advice, update policies, process user-rights requests, or make regulatory commitments. |
| `support-finance-tracker.md` | reference-only | no for now | high | Heavy financial-control, tax, payment, investment, and audit language. Use only as reference until Finance Division is reviewed. |
| `support-infrastructure-maintainer.md` | do-not-activate | no | high | Directly overlaps infrastructure, backups, AWS/Terraform, database operations, credentials, alerting, and production maintenance. This is Codex/Justin-gated Tier 5 territory. |

## Specialized Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `specialized-workflow-architect.md` | candidate, restricted | yes | medium-high | Useful for workflow trees, states, handoff contracts, failure paths, and observable state specs. Must not own implementation, schemas, repo topology, infra, or canonical registry updates without approval. |
| `compliance-auditor.md` | candidate, restricted | yes | high | Useful for SOC 2/ISO/HIPAA/PCI readiness checklists and evidence matrices. Must not access secrets/evidence stores, certify compliance, or submit audit evidence. |
| `specialized-developer-advocate.md` | candidate, restricted | yes | medium-high | Useful for DX audits, tutorials, changelog drafts, and developer feedback synthesis. Must not publish docs, post to communities, manage SDK releases, or speak publicly as Slops. |
| `language-translator.md` | candidate, restricted | yes | medium | Useful for draft localization and tone-preserving translation. Must not certify legal/medical/financial translations or publish localized content without review. |
| `customer-service.md` | reference-only | no for now | high | Overlaps `support-support-responder`; broader customer-service workflow assumes customer/account access. |
| `specialized-document-generator.md` | reference-only | no for now | medium | Overlaps existing document/presentation/spreadsheet skills. Keep as reference, not a separate agent. |
| `blender-addon-engineer.md` | reference-only | no | medium | Niche Blender/Python tooling, not relevant to current Slops backend/product needs. |
| `report-distribution-agent.md` | reference-only | no | medium-high | Distribution implies sending reports externally. Keep as reference only. |
| `supply-chain-strategist.md` | do-not-activate | no | high | Procurement, contracts, supplier audits, import/export, tax, and regulated sourcing are out of current scope. |
| `loan-officer-assistant.md` | do-not-activate | no | high | Regulated lending, credit, PII, financial advice, and compliance risk. |
| `real-estate-buyer-seller.md` | do-not-activate | no | high | Regulated real-estate transactions, legal/financial advice, and consumer-data risk. |
| `recruitment-specialist.md` | do-not-activate | no | high | Candidate PII, hiring decisions, labor-law guidance, offer negotiation, and background-check risk. |
| `retail-customer-returns.md` | do-not-activate | no | high | Refunds, payment methods, fraud flags, customer data, and policy exceptions. |
| `agents-orchestrator.md` | do-not-activate | no | high | Autonomous pipeline manager that spawns agents and runs spec-to-ship workflows. Conflicts with SLOPS authority model and Claude/Codex boundaries. |

## Project Management Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `project-management-project-shepherd.md` | candidate, restricted | yes | medium | Useful for project charters, status reports, risks, dependencies, and stakeholder summaries. Must not assign people, commit budgets/timelines, or change launch scope. |
| `project-management-experiment-tracker.md` | candidate, restricted | yes | medium-high | Useful for experiment plans and result memos. Must not launch A/B tests, touch analytics, randomize users, or execute rollouts/rollback. |
| `project-manager-senior.md` | candidate | yes | medium | Useful for turning approved specs into task breakdowns and acceptance criteria. Must not supersede Product Manager or Sprint Prioritizer authority. |
| `project-management-jira-workflow-steward.md` | reference-only | no for now | medium-high | Jira-linked branch/commit enforcement conflicts with current SLOPS git conventions and Codex branch prefix unless Justin adopts Jira. |
| `project-management-studio-operations.md` | reference-only | no for now | medium | Broad operations/process role overlaps Project Shepherd and may imply tool/process mutation. |
| `project-management-studio-producer.md` | reference-only | no for now | medium | Production/studio coordination is not currently needed; overlaps Project Shepherd. |

## Engineering Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `engineering-codebase-onboarding-engineer.md` | candidate | yes | low-medium | Good read-only repo-orientation wrapper. Must stay factual and never suggest edits or refactors. |
| `engineering-code-reviewer.md` | candidate, restricted | yes | medium-high | Useful as advisory review role. Must not approve/merge PRs, block shipping, post GitHub comments, or mutate code. |
| `engineering-technical-writer.md` | candidate | yes | medium | Useful for developer docs, API reference drafts, README/tutorial drafts. Must not publish docs or wire docs CI without approval. |
| `engineering-security-engineer.md` | candidate, restricted | yes | high | Useful for defensive threat modeling and security review. Must not run offensive tests, access secrets, change auth, deploy controls, or mutate infrastructure. Prefer existing Codex Security skills for full scans. |
| `engineering-software-architect.md` | candidate, restricted | yes | medium-high | Useful for ADR drafts and trade-off analysis. Must not overrule Codex/backend ownership, Claude planning, or Justin product decisions. |
| `engineering-backend-architect.md` | candidate, restricted | yes, narrow | high | Useful as backend architecture advisor for schemas/API/data contracts. Must not implement code, run migrations, own production architecture, or supersede Codex backend ownership. |
| `engineering-ai-engineer.md` | candidate, restricted | yes, narrow | high | Useful for AI integration planning around Ollama/OpenClaw/Paperclip. Must not train/fine-tune models, call paid APIs, process user data, or deploy AI routes without approval. |
| `engineering-data-engineer.md` | candidate, restricted | yes, narrow | high | Useful for sports-data ingestion plans, schema diagrams, and quality checks. Must not run ETL jobs, access databases, migrate schemas, or process customer data without approval. |
| `engineering-sre.md` | candidate, restricted | yes, narrow | high | Useful for SLO/observability/incident-review drafts. Must not change production, alerts, deploys, rollback, or infra settings. |
| `engineering-git-workflow-master.md` | reference-only | no for now | medium-high | Git workflow advice conflicts with Codex app branch rules and can drift into force-push/rebase/merge authority. |
| `engineering-mobile-app-builder.md` | reference-only | no for now | medium-high | No active mobile app path. Platform stores, push notifications, in-app purchases, and device permissions are not current scope. |
| `engineering-threat-detection-engineer.md` | reference-only | no for now | high | SIEM/detection-as-code requires SOC tooling, logs, security data, and deployment authority. Keep as reference until security operations exist. |
| `engineering-filament-optimization-specialist.md` | reference-only | no | medium | Filament/PHP admin specialization does not match current Slops stack. |
| `engineering-autonomous-optimization-architect.md` | do-not-activate | no | high | Autonomous model routing, real-user shadow traffic, auto-promotion, paid provider cost routing, and circuit-breaker mutation are too risky. |
| `engineering-devops-automator.md` | do-not-activate | no | high | CI/CD, Terraform, Docker/Kubernetes, secrets, production deployment, rollback, and cloud infrastructure overlap Tier 5 authority. |
| `engineering-frontend-developer.md` | do-not-activate | no | high | Claude owns frontend; this agent is an implementation role that would collide with frontend ownership and app source boundaries. |
| `engineering-senior-developer.md` | do-not-activate | no | high | Broad full-stack implementation and premium frontend behavior conflicts with Claude/Codex separation and current stack assumptions. |

## RBAC And Overlap Risks

- Production/infrastructure risk: Support Infrastructure Maintainer, DevOps Automator, SRE, Threat Detection Engineer, Backend Architect, Data Engineer, and Security Engineer all touch systems that may require secrets, infrastructure access, deployment authority, or database privileges.
- Customer/PII risk: Support Responder, Analytics Reporter, Customer Service, Retail Returns, Loan Officer, Real Estate, Recruitment, Pipeline-like reporting, and Compliance agents assume access to customer, candidate, financial, support, or regulated personal data.
- Regulated advice risk: Legal Compliance Checker, Compliance Auditor, Finance Tracker, Loan Officer, Real Estate, Recruitment, Supply Chain, and Retail Returns may imply legal, financial, employment, consumer, or compliance advice. Wrappers must be checklist/review only.
- Autonomy risk: Agents Orchestrator and Autonomous Optimization Architect explicitly grant autonomous workflow progression or system mutation. Both are incompatible with SLOPS authority.
- Engineering ownership risk: Backend Architect, Frontend Developer, Senior Developer, Software Architect, DevOps Automator, Data Engineer, SRE, and AI Engineer overlap Codex backend/execution ownership and Claude frontend/planning ownership. Wrappers must be advisory only.
- Git/release risk: Jira Workflow Steward and Git Workflow Master imply branch, commit, PR, merge, release, or force-push authority. Current SLOPS git conventions and Codex app directives remain canonical.
- Documentation overlap risk: Technical Writer, Developer Advocate, Document Generator, Executive Summary Generator, and existing document skills overlap. Prefer specific wrappers for docs/DX and leave artifact-generation agents reference-only.
- Experimentation risk: Experiment Tracker implies user randomization, analytics, rollout, rollback, and consent. Candidate wrapper may draft experiment plans only.
- Security operations risk: Security Engineer and Threat Detection Engineer can drift into offensive testing, live SIEM changes, log access, or incident response. Keep defensive, report-only, and explicitly approved.

## Wrapper Queue

Recommended Support wrappers:

1. `support-executive-summary-generator` as `Blueprints\agents\support\support-executive-summary-generator.md`
2. `support-analytics-reporter` as `Blueprints\agents\support\support-analytics-reporter.md`
3. `support-support-responder` as `Blueprints\agents\support\support-support-responder.md`
4. `support-legal-compliance-checker` as `Blueprints\agents\support\support-legal-compliance-checker.md`

Recommended Specialized wrappers:

1. `specialized-workflow-architect` as `Blueprints\agents\specialized\specialized-workflow-architect.md`
2. `compliance-auditor` as `Blueprints\agents\specialized\compliance-auditor.md`
3. `specialized-developer-advocate` as `Blueprints\agents\specialized\specialized-developer-advocate.md`
4. `language-translator` as `Blueprints\agents\specialized\language-translator.md`

Recommended Project Management wrappers:

1. `project-management-project-shepherd` as `Blueprints\agents\project-management\project-management-project-shepherd.md`
2. `project-management-experiment-tracker` as `Blueprints\agents\project-management\project-management-experiment-tracker.md`
3. `project-manager-senior` as `Blueprints\agents\project-management\project-manager-senior.md`

Recommended Engineering wrappers:

1. `engineering-codebase-onboarding-engineer` as `Blueprints\agents\engineering\engineering-codebase-onboarding-engineer.md`
2. `engineering-code-reviewer` as `Blueprints\agents\engineering\engineering-code-reviewer.md`
3. `engineering-technical-writer` as `Blueprints\agents\engineering\engineering-technical-writer.md`
4. `engineering-security-engineer` as `Blueprints\agents\engineering\engineering-security-engineer.md`
5. `engineering-software-architect` as `Blueprints\agents\engineering\engineering-software-architect.md`
6. `engineering-backend-architect-advisor` as `Blueprints\agents\engineering\engineering-backend-architect-advisor.md`
7. `engineering-ai-integration-advisor` as `Blueprints\agents\engineering\engineering-ai-integration-advisor.md`
8. `engineering-data-engineer-advisor` as `Blueprints\agents\engineering\engineering-data-engineer-advisor.md`
9. `engineering-sre-advisor` as `Blueprints\agents\engineering\engineering-sre-advisor.md`

Do not create wrappers for the `do-not-activate` agents. Keep reference-only agents readable as source material only.

## Baseline Wrapper Constraints

All wrappers from this pass should start as `candidate`, Tier 2 max:

- Read, analyze, draft, and recommend only.
- May write draft markdown only when explicitly assigned.
- May write to `Blueprints\prompts\`, `Direction\reviews\`, and `Solutions\reports\`.
- Must not write to `ssffmvp\src\`, `ssffmvp\frontend\`, `ssffmvp\client\`, `ssffmvp\sql\`, `ssffmvp\scripts\`, `ssffmvp\test\`, `Archive\`, `.env`, `.key`, credentials, secrets, tokens, cookies, production, deployment, Docker, GitHub Actions, auth, payment, or database files.
- Must not access or mutate external systems, CRMs, help desks, analytics dashboards, legal/compliance portals, HR systems, app stores, CI/CD providers, cloud accounts, SIEMs, databases, payment systems, or customer-data systems.
- Must not deploy, migrate, delete, restore, rotate secrets, alter infrastructure, send customer communications, publish public docs, approve legal/compliance status, or make final commercial/product decisions.
- Escalates to Justin for commercial, legal, compliance, brand, spend, customer-data, production, infrastructure, and public-communication decisions.
- Escalates to Claude for planning, doctrine, frontend ownership, and wrapper/index updates.
- Escalates to Codex only for separately approved implementation or file edits.

## Next Safe Step

Create the recommended wrapper files under their division folders, then update `AGENT_INDEX.md` only after Justin/Claude approval.
