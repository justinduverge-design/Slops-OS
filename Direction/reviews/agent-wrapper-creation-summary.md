# Agent Wrapper Creation Summary

Date: 2026-05-23
Reviewer: Codex / slops-onboarding-agent

## Scope

Created wrapper files only for selected candidate imports from the Design, Marketing, Sales, Support, Specialized, Project Management, Engineering, Paid Media, Finance, and Academic review passes.

`Blueprints\agents\AGENT_INDEX.md` was not edited. Proposed index updates are listed below for review only.

## Files Created

Design:

- `Blueprints\agents\design\design-brand-guardian.md`
- `Blueprints\agents\design\design-ui-designer.md`
- `Blueprints\agents\design\design-image-prompt-engineer.md`
- `Blueprints\agents\design\design-whimsy-injector.md`
- `Blueprints\agents\design\design-ux-researcher.md`

Marketing:

- `Blueprints\agents\marketing\marketing-content-creator.md`
- `Blueprints\agents\marketing\marketing-social-media-strategist.md`
- `Blueprints\agents\marketing\marketing-reddit-community-builder.md`
- `Blueprints\agents\marketing\marketing-video-optimization-specialist.md`

Sales:

- `Blueprints\agents\sales\sales-discovery-coach.md`
- `Blueprints\agents\sales\sales-deal-strategist.md`
- `Blueprints\agents\sales\sales-outbound-strategist.md`
- `Blueprints\agents\sales\sales-proposal-strategist.md`
- `Blueprints\agents\sales\sales-pipeline-analyst.md`
- `Blueprints\agents\sales\sales-account-strategist.md`
- `Blueprints\agents\sales\sales-engineer-advisor.md`

Support:

- `Blueprints\agents\support\support-executive-summary-generator.md`
- `Blueprints\agents\support\support-analytics-reporter.md`
- `Blueprints\agents\support\support-support-responder.md`
- `Blueprints\agents\support\support-legal-compliance-checker.md`

Specialized:

- `Blueprints\agents\specialized\specialized-workflow-architect.md`
- `Blueprints\agents\specialized\compliance-auditor.md`
- `Blueprints\agents\specialized\specialized-developer-advocate.md`
- `Blueprints\agents\specialized\language-translator.md`

Project Management:

- `Blueprints\agents\project-management\project-management-project-shepherd.md`
- `Blueprints\agents\project-management\project-management-experiment-tracker.md`
- `Blueprints\agents\project-management\project-manager-senior.md`

Engineering:

- `Blueprints\agents\engineering\engineering-codebase-onboarding-engineer.md`
- `Blueprints\agents\engineering\engineering-code-reviewer.md`
- `Blueprints\agents\engineering\engineering-technical-writer.md`
- `Blueprints\agents\engineering\engineering-security-engineer.md`
- `Blueprints\agents\engineering\engineering-software-architect.md`
- `Blueprints\agents\engineering\engineering-backend-architect-advisor.md`
- `Blueprints\agents\engineering\engineering-ai-integration-advisor.md`
- `Blueprints\agents\engineering\engineering-data-engineer-advisor.md`
- `Blueprints\agents\engineering\engineering-sre-advisor.md`

Paid Media:

- `Blueprints\agents\paid-media\paid-media-creative-strategist.md`
- `Blueprints\agents\paid-media\paid-media-search-query-analyst.md`
- `Blueprints\agents\paid-media\paid-media-tracking-specialist.md`
- `Blueprints\agents\paid-media\paid-media-auditor.md`

Finance:

- `Blueprints\agents\finance\finance-financial-analyst.md`
- `Blueprints\agents\finance\finance-fpa-analyst.md`

Academic:

- `Blueprints\agents\academic\academic-historian.md`
- `Blueprints\agents\academic\academic-anthropologist.md`
- `Blueprints\agents\academic\academic-narratologist.md`

## Shared Guardrails Applied

- Status: `candidate`
- Tool tier cap: Tier 2 - read, analyze, draft, and recommend only.
- Approved SLOPS skills: limited to `slops-context-markdown`, `slops-prompt-generator`, and `pre-build-research` where appropriate.
- Write access: draft markdown only under `Blueprints\prompts\`, `Direction\reviews\`, and `Solutions\reports\`, with some engineering read-only wrappers narrowed further.
- Denied paths include app source, SQL, scripts, tests, secrets, credentials, production, deployment, auth, payment, database, infrastructure, and external platform systems.
- Escalation: Justin for final business/risk decisions, Claude for planning/doctrine, Codex for separately approved implementation or file edits.

## Proposed AGENT_INDEX.md Changes Only

Do not apply until Justin/Claude approve.

Suggested new section:

```markdown
## Candidate Division Agent Wrappers

| Agent | Division | Path | Status | Layer | Allowed Use | May Invoke Skills | Approval Required |
|---|---|---|---|---|---|---|---|
| `design-brand-guardian` | Design | `Blueprints\agents\design\design-brand-guardian.md` | candidate | Global Blueprint | Brand consistency review and voice notes | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public brand decisions, legal/trademark, activation |
| `design-ui-designer` | Design | `Blueprints\agents\design\design-ui-designer.md` | candidate | Global Blueprint | UI/design-system review | `slops-context-markdown`, `slops-prompt-generator` | Frontend implementation, activation |
| `design-image-prompt-engineer` | Design | `Blueprints\agents\design\design-image-prompt-engineer.md` | candidate | Global Blueprint | Image prompt drafting | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | External generation, final assets, activation |
| `design-whimsy-injector` | Design | `Blueprints\agents\design\design-whimsy-injector.md` | candidate | Global Blueprint | Microcopy and delight review | `slops-context-markdown`, `slops-prompt-generator` | User-facing copy or implementation, activation |
| `design-ux-researcher` | Design | `Blueprints\agents\design\design-ux-researcher.md` | candidate | Global Blueprint | Research plans and usability templates | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | User research, participant data, activation |
| `marketing-content-creator` | Marketing | `Blueprints\agents\marketing\marketing-content-creator.md` | candidate | Global Blueprint | Content drafts and briefs | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Publication, external send, activation |
| `marketing-social-media-strategist` | Marketing | `Blueprints\agents\marketing\marketing-social-media-strategist.md` | candidate | Global Blueprint | Social strategy drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Posting, account access, paid spend, activation |
| `marketing-reddit-community-builder` | Marketing | `Blueprints\agents\marketing\marketing-reddit-community-builder.md` | candidate | Global Blueprint | Reddit research and draft strategy | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Reddit action, public communication, activation |
| `marketing-video-optimization-specialist` | Marketing | `Blueprints\agents\marketing\marketing-video-optimization-specialist.md` | candidate | Global Blueprint | Video packaging drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Platform access, publishing, activation |
| `sales-discovery-coach` | Sales | `Blueprints\agents\sales\sales-discovery-coach.md` | candidate | Global Blueprint | Discovery templates and call prep | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Customer/prospect data, external calls, activation |
| `sales-deal-strategist` | Sales | `Blueprints\agents\sales\sales-deal-strategist.md` | candidate | Global Blueprint | Deal-risk and MEDDPICC drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Pricing, forecast, customer data, activation |
| `sales-outbound-strategist` | Sales | `Blueprints\agents\sales\sales-outbound-strategist.md` | candidate | Global Blueprint | ICP and sequence drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Outreach, CRM, prospect data, activation |
| `sales-proposal-strategist` | Sales | `Blueprints\agents\sales\sales-proposal-strategist.md` | candidate | Global Blueprint | Proposal narrative drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Proposal submission, pricing/legal, activation |
| `sales-pipeline-analyst` | Sales | `Blueprints\agents\sales\sales-pipeline-analyst.md` | candidate | Global Blueprint | Sanitized pipeline report drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | CRM/data access, official forecast, activation |
| `sales-account-strategist` | Sales | `Blueprints\agents\sales\sales-account-strategist.md` | candidate | Global Blueprint | Account planning templates | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Customer contact, renewals, pricing, activation |
| `sales-engineer-advisor` | Sales | `Blueprints\agents\sales\sales-engineer-advisor.md` | candidate | Global Blueprint | Demo and POC-scope drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | POC execution, security claims, implementation, activation |
| `support-executive-summary-generator` | Support | `Blueprints\agents\support\support-executive-summary-generator.md` | candidate | Global Blueprint | Executive summary drafts | `slops-context-markdown`, `slops-prompt-generator` | Binding commitments, activation |
| `support-analytics-reporter` | Support | `Blueprints\agents\support\support-analytics-reporter.md` | candidate | Global Blueprint | Sanitized analytics report drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Live data/dashboard access, activation |
| `support-support-responder` | Support | `Blueprints\agents\support\support-support-responder.md` | candidate | Global Blueprint | Support response drafts | `slops-context-markdown`, `slops-prompt-generator` | Customer communication/ticket access, activation |
| `support-legal-compliance-checker` | Support | `Blueprints\agents\support\support-legal-compliance-checker.md` | candidate | Global Blueprint | Compliance issue spotting | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Legal/compliance finalization, activation |
| `specialized-workflow-architect` | Specialized | `Blueprints\agents\specialized\specialized-workflow-architect.md` | candidate | Global Blueprint | Workflow specs and state maps | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Canonical registry or implementation, activation |
| `compliance-auditor` | Specialized | `Blueprints\agents\specialized\compliance-auditor.md` | candidate | Global Blueprint | Compliance readiness drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Evidence submission/certification, activation |
| `specialized-developer-advocate` | Specialized | `Blueprints\agents\specialized\specialized-developer-advocate.md` | candidate | Global Blueprint | DX audits and changelog drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public docs/community action, activation |
| `language-translator` | Specialized | `Blueprints\agents\specialized\language-translator.md` | candidate | Global Blueprint | Draft localization | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Regulated/public translation, activation |
| `project-management-project-shepherd` | Project Management | `Blueprints\agents\project-management\project-management-project-shepherd.md` | candidate | Global Blueprint | Project status/risk drafts | `slops-context-markdown`, `slops-prompt-generator` | Scope/budget/timeline commitments, activation |
| `project-management-experiment-tracker` | Project Management | `Blueprints\agents\project-management\project-management-experiment-tracker.md` | candidate | Global Blueprint | Experiment plan drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Live experiments/analytics, activation |
| `project-manager-senior` | Project Management | `Blueprints\agents\project-management\project-manager-senior.md` | candidate | Global Blueprint | Task breakdowns from approved specs | `slops-context-markdown`, `slops-prompt-generator` | Roadmap/scope commitments, activation |
| `engineering-codebase-onboarding-engineer` | Engineering | `Blueprints\agents\engineering\engineering-codebase-onboarding-engineer.md` | candidate | Global Blueprint | Read-only repo orientation | `slops-context-markdown` | Any edit/execution, activation |
| `engineering-code-reviewer` | Engineering | `Blueprints\agents\engineering\engineering-code-reviewer.md` | candidate | Global Blueprint | Advisory code review | `slops-context-markdown`, `slops-prompt-generator` | Code edits/GitHub actions, activation |
| `engineering-technical-writer` | Engineering | `Blueprints\agents\engineering\engineering-technical-writer.md` | candidate | Global Blueprint | Developer docs drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Publishing/docs CI, activation |
| `engineering-security-engineer` | Engineering | `Blueprints\agents\engineering\engineering-security-engineer.md` | candidate | Global Blueprint | Defensive security review drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Testing/secrets/auth/infra, activation |
| `engineering-software-architect` | Engineering | `Blueprints\agents\engineering\engineering-software-architect.md` | candidate | Global Blueprint | ADRs and architecture trade-offs | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Final architecture/implementation, activation |
| `engineering-backend-architect-advisor` | Engineering | `Blueprints\agents\engineering\engineering-backend-architect-advisor.md` | candidate | Global Blueprint | Backend architecture advice | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Migrations/API finalization, activation |
| `engineering-ai-integration-advisor` | Engineering | `Blueprints\agents\engineering\engineering-ai-integration-advisor.md` | candidate | Global Blueprint | AI integration planning | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Paid APIs/model changes/user data, activation |
| `engineering-data-engineer-advisor` | Engineering | `Blueprints\agents\engineering\engineering-data-engineer-advisor.md` | candidate | Global Blueprint | Data ingestion planning | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | ETL/database/provider access, activation |
| `engineering-sre-advisor` | Engineering | `Blueprints\agents\engineering\engineering-sre-advisor.md` | candidate | Global Blueprint | SLO/observability drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Production/alert/infra changes, activation |
| `paid-media-creative-strategist` | Paid Media | `Blueprints\agents\paid-media\paid-media-creative-strategist.md` | candidate | Global Blueprint | Ad creative drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Ad launch/platform access/spend, activation |
| `paid-media-search-query-analyst` | Paid Media | `Blueprints\agents\paid-media\paid-media-search-query-analyst.md` | candidate | Global Blueprint | Search-query export analysis | `slops-context-markdown`, `slops-prompt-generator` | Ad account access/keyword deployment, activation |
| `paid-media-tracking-specialist` | Paid Media | `Blueprints\agents\paid-media\paid-media-tracking-specialist.md` | candidate | Global Blueprint | Measurement plan drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Tags/pixels/customer-data flows, activation |
| `paid-media-auditor` | Paid Media | `Blueprints\agents\paid-media\paid-media-auditor.md` | candidate | Global Blueprint | Manual paid-media audit drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | API/live account access/spend, activation |
| `finance-financial-analyst` | Finance | `Blueprints\agents\finance\finance-financial-analyst.md` | candidate | Global Blueprint | Sanitized financial analysis drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Live financial systems/official forecasts, activation |
| `finance-fpa-analyst` | Finance | `Blueprints\agents\finance\finance-fpa-analyst.md` | candidate | Global Blueprint | Budget/scenario planning drafts | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Budget/hiring/forecast finalization, activation |
| `academic-historian` | Academic | `Blueprints\agents\academic\academic-historian.md` | candidate | Global Blueprint | Historical lore research | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public lore claims, activation |
| `academic-anthropologist` | Academic | `Blueprints\agents\academic\academic-anthropologist.md` | candidate | Global Blueprint | Cultural-coherence lore review | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Public living-culture references, activation |
| `academic-narratologist` | Academic | `Blueprints\agents\academic\academic-narratologist.md` | candidate | Global Blueprint | Narrative/lore structure review | `slops-context-markdown`, `slops-prompt-generator` | Public lore decisions, activation |
```

## Intentionally Not Touched

- `Blueprints\agents\AGENT_INDEX.md`
- Imported agent files under `Blueprints\agents\_imported\`
- App source under `slops-saloon\`
- Production, secrets, auth, payment, database, deployment, and infrastructure files

## Next Safe Step

Claude/Justin should review this summary, decide which candidate wrappers belong in `AGENT_INDEX.md`, and only then promote selected wrappers.
