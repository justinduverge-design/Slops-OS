# SLOPS OS DBS Migration — Phases Master Plan

**Date**: 2026-05-23
**Scope**: All phases of the SLOPS OS DBS normalization and agent promotion effort
**Status**: All phases complete. ✅

---

## How to Read This Document

Each phase entry includes:

- **What it does** — the scope and goal
- **Who runs it** — Claude, Codex, or both
- **SLOPS skills invoked** — native SLOPS OS skills used to execute the phase
- **Cowork skills to have ready** — available Claude Cowork skills that support the work
- **MCP connectors to obtain** — external tool integrations that make this phase more effective
- **Status** — complete, planned, or pending

---

## Phase Completion Summary

| Phase | Name | Status |
|-------|------|--------|
| Phase 1 | `_imported` folder renames (12 folders) | ✅ Complete |
| Phase 1B | Title case non-pillar folder renames (3 folders) | ✅ Complete |
| Phases 2–4 | Tools layer, agent matrix, path normalization | ✅ Complete |
| Phase 3B | Residual path casing fixes (in-session) | ✅ Complete |
| Phase 5A | Product Division agent review | ✅ Complete |
| Phase 5B | Design Division agent review | ✅ Complete |
| Phase 5C | Marketing Division agent review | ✅ Complete |
| Phase 5D | Sales Division agent review | ✅ Complete |
| Phase 5E | Support Division agent review | ✅ Complete |
| Phase 5F | Specialized Division agent review | ✅ Complete |
| Phase 5G | Project Management Division agent review | ✅ Complete |
| Phase 5H | Engineering Division agent review | ✅ Complete |
| Phase 5I | Paid Media Division agent review | ✅ Complete |
| Phase 5J | Finance Division agent review | ✅ Complete |
| Phase 5K | Academic Division agent review | ✅ Complete |
| Phase 5L | Handoffs review | ✅ Complete |
| Phase 6 | Manager agent disposition + handoff documentation | ✅ Complete |

---

## Phase 1 — `_imported` Folder Renames ✅

**Goal**: Rename 12 division folders under `Blueprints\agents\_imported\` to the canonical `__lowercase_division` pattern. Fix `slops-prompt-generator\__interface` → `_interface`.

**Executor**: Codex
**Prompt**: `Blueprints\prompts\phase-1-codex-nomenclature-rename.md`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| None | Rename-only operation — no skill needed |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| None | Rename-only operation |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None | Filesystem operation only | — |

---

## Phase 1B — Title Case Non-Pillar Folder Renames ✅

**Goal**: Rename `Direction\Reviews → reviews`, `Omen\Assets → assets`, `Omen\Brand → brand`.

**Executor**: Codex
**Prompt**: `Blueprints\prompts\phase-1b-codex-title-case-cleanup.md`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| None | Rename-only operation |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| None | Rename-only operation |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None | Filesystem operation only | — |

---

## Phases 2–4 — Tools Layer, Agent Matrix, Path Normalization ✅

**Goal**: Create `Blueprints\tools\` layer, `AGENT_INDEX.md`, `TOOLS_INDEX.md`, normalize 8 cross-reference files, document naming conventions, create app-layer READMEs.

**Executor**: Claude (with `slops-context-markdown` skill)
**Prompt**: `Blueprints\prompts\phases-2-4-claude-index-tools-skills.md`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-context-markdown` | Create and normalize all DBS markdown files |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `anthropic-skills:docx` | Useful if any output needs to be a Word document for sharing |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None | Documentation work only | — |

---

## Phase 3B — Residual Path Casing Fixes ✅

**Goal**: Fix 3 remaining stale `Blueprints\Skills` / `Blueprints\Agents` capitalization issues in SKILL_ROUTING.md, pre-build-research/SKILL.md, and _template/SKILL.md.

**Executor**: Claude (in-session edits)
**Output**: `Solutions\reports\dbs-migration\PHASE_3B_COMPLETION.md`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-context-markdown` | Inline path normalization |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| None | Small targeted edits |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None | Inline edit only | — |

---

## Phase 5A — Product Division Agent Review 🟡

**Goal**: Review 5 product agents, select candidates, create SLOPS wrapper files.
**Folder**: `_imported\__product_division\`
**Agents**: product-manager, product-feedback-synthesizer, product-sprint-prioritizer, product-behavioral-nudge-engine, product-trend-researcher

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5a-product-division.md`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review agents, assign status, write SLOPS doctrine wrappers |
| `slops-prompt-generator` | Convert product manager outputs into runnable prompts |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `product-management:write-spec` | Supports promoted product-manager agent workflows |
| `product-management:sprint-planning` | Supports promoted product-sprint-prioritizer workflows |
| `product-management:roadmap-update` | Supports product-manager roadmap work |
| `product-management:metrics-review` | Supports product-trend-researcher and feedback-synthesizer |
| `product-management:product-brainstorming` | Supports product-behavioral-nudge-engine |
| `product-management:synthesize-research` | Supports product-feedback-synthesizer |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Linear** | Issue tracking, sprint management — supports product-sprint-prioritizer | High |
| **Amplitude** | Product analytics — supports product-trend-researcher and metrics-review | High |
| **Intercom** | Customer feedback — supports product-feedback-synthesizer | Medium |

---

## Phase 5B — Design Division Agent Review 🟡

**Goal**: Review 7 design agents, select candidates for UX/brand/visual work.
**Folder**: `_imported\__design_division\`
**Agents**: design-brand-guardian, design-image-prompt-engineer, design-ui-designer, design-ux-architect, design-ux-researcher, design-visual-storyteller, design-whimsy-injector

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5b-design-division.md` *(to be created)*

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review agents, write wrappers |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `design:design-critique` | Supports design-ux-architect and design-ui-designer workflows |
| `design:ux-copy` | Supports design-ux-architect and design-ui-designer |
| `design:accessibility-review` | Supports design-ux-researcher outputs |
| `design:user-research` | Supports design-ux-researcher workflows |
| `design:research-synthesis` | Supports design-ux-researcher synthesis work |
| `design:design-system` | Supports design-brand-guardian consistency enforcement |
| `design:design-handoff` | Supports design-ui-designer → Codex handoffs |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Figma** | Design file access for design-ux-architect, design-ui-designer, and brand-guardian | High |

---

## Phase 5C — Marketing Division Agent Review 🟡

**Goal**: Review 9 marketing agents, select candidates for launch narrative and content.
**Folder**: `_imported\__marketing_division\`
**Agents**: marketing-app-store-optimizer, marketing-carousel-growth-engine, marketing-content-creator, marketing-instagram-curator, marketing-reddit-community-builder, marketing-social-media-strategist, marketing-tiktok-strategist, marketing-twitter-engager, marketing-video-optimization-specialist

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5c-marketing-division.md` *(to be created)*

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |
| `pre-build-research` | Validate platform API options before agents touch external services |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `marketing:content-creation` | Supports marketing-content-creator workflows |
| `marketing:draft-content` | Supports marketing-social-media-strategist and channel drafting |
| `marketing:campaign-plan` | Supports marketing-social-media-strategist campaign planning |
| `marketing:brand-review` | Supports marketing-content-creator brand consistency |
| `marketing:email-sequence` | Supports launch drip workflows |
| `marketing:seo-audit` | Supports marketing-app-store-optimizer and SEO work |
| `marketing:performance-report` | Supports performance review across channels |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Canva** | Visual asset creation — supports marketing-content-creator | Medium |
| **HubSpot** | Email and CRM workflows — supports launch campaigns | High |
| **Klaviyo** | Email sequences for fantasy app waitlist and launch | High |
| **Ahrefs** | SEO and keyword research for marketing-app-store-optimizer | Medium |

---

## Phase 5D — Sales Division Agent Review 🟡

**Goal**: Review 9 sales agents, select candidates for monetization and pipeline work.
**Folder**: `_imported\__sales_division\`
**Agents**: sales-account-strategist, sales-coach, sales-deal-strategist, sales-discovery-coach, sales-engineer, sales-outbound-strategist, sales-outreach, sales-pipeline-analyst, sales-proposal-strategist

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5d-sales-division.md` *(to be created)*

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |
| `slops-prompt-generator` | Convert sales workflows into runnable prompts for Justin |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `marketing:competitive-brief` | Supports sales-deal-strategist competitive positioning |
| `product-management:product-brainstorming` | Supports sales-discovery-coach discovery frameworks |
| `operations:process-doc` | Supports sales-pipeline-analyst pipeline documentation |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **HubSpot** | CRM — pipeline tracking for sales-pipeline-analyst | High |

---

## Phase 5E — Support Division Agent Review 🟡

**Goal**: Review 6 support agents, select candidates for customer experience work. High caution on agents that could touch user data.
**Folder**: `_imported\__support_division\`
**Agents**: support-analytics-reporter, support-executive-summary-generator, support-finance-tracker, support-infrastructure-maintainer, support-legal-compliance-checker, support-support-responder

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5e-support-division.md` *(to be created)*

**⚠ Caution**: `support-infrastructure-maintainer` and `support-finance-tracker` likely describe elevated tool access. Review carefully. Assign `do-not-activate` if scope is ambiguous.

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `operations:runbook` | Supports support-infrastructure-maintainer SOP work |
| `operations:status-report` | Supports support-executive-summary-generator |
| `legal:compliance-check` | Supports support-legal-compliance-checker review work |
| `data:analyze` | Supports support-analytics-reporter |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Intercom** | Customer support — supports support-support-responder | High |

---

## Phase 5F — Specialized Division Agent Review 🟡

**Goal**: Review 14 specialized agents. Highly selective — most are domain-specific (legal, compliance, real estate, loan) and not relevant to current scope.
**Folder**: `_imported\__specialized_division\`
**Agents**: agents-orchestrator, blender-addon-engineer, compliance-auditor, customer-service, language-translator, loan-officer-assistant, real-estate-buyer-seller, recruitment-specialist, report-distribution-agent, retail-customer-returns, specialized-developer-advocate, specialized-document-generator, specialized-workflow-architect, supply-chain-strategist

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5f-specialized-division.md` *(to be created)*

**⚠ Caution**: `agents-orchestrator` may describe broad multi-agent authority. Review very carefully. `compliance-auditor` may have access assumptions that conflict with SLOPS RBAC. Do not promote `loan-officer-assistant` or `real-estate-buyer-seller` — not relevant to current scope.

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap selected agents |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `legal:compliance-check` | Supports compliance-auditor and support-legal-compliance-checker |
| `legal:review-contract` | Supports specialized-document-generator contract workflows |
| `operations:process-doc` | Supports specialized-workflow-architect SOP documentation |
| `engineering:documentation` | Supports specialized-developer-advocate docs work |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None required at this time | Most relevant agents are documentation/workflow focused | — |

---

## Phase 5G — Project Management Division Agent Review 🟡

**Goal**: Review 6 project management agents, select candidates for execution coordination.
**Folder**: `_imported\__project_management_division\`
**Agents**: project-management-experiment-tracker, project-management-jira-workflow-steward, project-management-project-shepherd, project-management-studio-operations, project-management-studio-producer, project-manager-senior

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5g-project-management-division.md` *(to be created)*

**Note**: `project-management-jira-workflow-steward` assumes Jira. SLOPS uses Linear as the preferred tracker. Map the role to Linear in the wrapper.

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |
| `slops-prompt-generator` | Convert project workflows into runnable prompts |
| `clean-up-checkpoint` | Used by project-manager-senior to create safe handoff checkpoints |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `operations:capacity-plan` | Supports project-manager-senior capacity planning |
| `operations:change-request` | Supports project-management-project-shepherd change tracking |
| `operations:status-report` | Supports project-manager-senior stakeholder updates |
| `operations:process-doc` | Supports project-management-studio-operations SOP work |
| `product-management:sprint-planning` | Supports project-management-experiment-tracker sprint coordination |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Linear** | Issue tracking — core to all project management agents | High |
| **Asana** (optional) | Alternative PM tool if Linear isn't the primary | Low |

---

## Phase 5H — Engineering Division Agent Review 🟡

**Goal**: Review 17 engineering agents. Highest-risk division. Very selective. No agent with deployment, infra, or secrets authority should be promoted without explicit security review.
**Folder**: `_imported\__engineering_division\`
**Agents**: engineering-ai-engineer, engineering-autonomous-optimization-architect, engineering-backend-architect, engineering-code-reviewer, engineering-codebase-onboarding-engineer, engineering-data-engineer, engineering-devops-automator, engineering-filament-optimization-specialist, engineering-frontend-developer, engineering-git-workflow-master, engineering-mobile-app-builder, engineering-security-engineer, engineering-senior-developer, engineering-software-architect, engineering-sre, engineering-technical-writer, engineering-threat-detection-engineer

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5h-engineering-division.md` *(to be created)*

**⚠ High Risk Flags**:
- `engineering-devops-automator` — likely describes deployment/infra authority → assign `do-not-activate` until security review
- `engineering-sre` — likely describes production monitoring authority → assign `do-not-activate` until security review
- `engineering-threat-detection-engineer` — broad security scanning authority → review carefully
- `engineering-autonomous-optimization-architect` — "autonomous" in the name → flag for scope review
- `engineering-security-engineer` — powerful, useful, but must be `candidate` only with tight RBAC
- Safe to promote with careful RBAC: `engineering-code-reviewer`, `engineering-codebase-onboarding-engineer`, `engineering-technical-writer`, `engineering-frontend-developer`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |
| `pre-build-research` | Research tools and libraries before engineering agents recommend external dependencies |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `engineering:code-review` | Supports engineering-code-reviewer workflows |
| `engineering:architecture` | Supports engineering-software-architect and engineering-backend-architect |
| `engineering:debug` | Supports engineering-senior-developer and engineering-sre |
| `engineering:documentation` | Supports engineering-technical-writer and codebase-onboarding-engineer |
| `engineering:system-design` | Supports engineering-software-architect |
| `engineering:testing-strategy` | Supports engineering-backend-architect and senior-developer |
| `engineering:tech-debt` | Supports engineering-senior-developer and codebase-onboarding-engineer |
| `engineering:deploy-checklist` | Supports engineering-sre (when promoted) |
| `engineering:incident-response` | Supports engineering-sre and engineering-threat-detection-engineer |
| `product-tracking-skills:product-tracking-audit-current-tracking` | Supports engineering-data-engineer analytics work |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **GitHub** | Code access — core to engineering-code-reviewer, git-workflow-master, senior-developer | High |
| **Datadog / PagerDuty** | Monitoring and incident response — supports engineering-sre | Medium |
| **Supabase** | Database access — supports engineering-data-engineer and backend-architect | High |

---

## Phase 5I — Paid Media Division Agent Review 🟡

**Goal**: Review 7 paid media agents. High financial risk — agents that touch ad spend or tracking pixels need careful RBAC.
**Folder**: `_imported\__paid_media_division\`
**Agents**: paid-media-auditor, paid-media-creative-strategist, paid-media-paid-social-strategist, paid-media-ppc-strategist, paid-media-programmatic-buyer, paid-media-search-query-analyst, paid-media-tracking-specialist

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5i-paid-media-division.md` *(to be created)*

**⚠ High Risk Flags**:
- `paid-media-programmatic-buyer` — describes active ad spend authority → assign `do-not-activate` until Justin approves explicit spend controls
- `paid-media-ppc-strategist` — may describe campaign creation authority → review carefully
- Safe to promote: `paid-media-auditor`, `paid-media-creative-strategist`, `paid-media-search-query-analyst`

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |
| `pre-build-research` | Research ad platform APIs and data access options before agents are activated |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `marketing:performance-report` | Supports paid-media-auditor performance analysis |
| `marketing:seo-audit` | Supports paid-media-search-query-analyst |
| `data:analyze` | Supports paid-media-auditor data analysis |
| `data:statistical-analysis` | Supports paid-media-tracking-specialist attribution analysis |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Supermetrics** | Cross-channel paid media reporting — supports paid-media-auditor | Medium |
| **Ahrefs** | Search query and keyword analysis — supports paid-media-search-query-analyst | Medium |
| **SimilarWeb** | Competitive research — supports paid-media-creative-strategist | Low |

---

## Phase 5J — Finance Division Agent Review 🟡

**Goal**: Review 5 finance agents. Financial data risk — no agent should have write access to payment systems or ledgers.
**Folder**: `_imported\__finance_division\`
**Agents**: finance-bookkeeper-controller, finance-financial-analyst, finance-fpa-analyst, finance-investment-researcher, finance-tax-strategist

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5j-finance-division.md` *(to be created)*

**⚠ Caution**: `finance-bookkeeper-controller` and `finance-tax-strategist` may assume accounting software write access. Assign `do-not-activate` for any agent that describes initiating payments, recording transactions, or modifying ledgers.

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap agents |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `data:analyze` | Supports finance-financial-analyst and finance-fpa-analyst data work |
| `data:statistical-analysis` | Supports finance-fpa-analyst forecasting |
| `anthropic-skills:xlsx` | Financial models and reporting — supports finance-financial-analyst |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None required at this time | Finance agents are analysis-focused; no payment tool integration needed until launch | — |

---

## Phase 5K — Academic Division Agent Review 🟡

**Goal**: Review 5 academic agents. Lowest priority — reference and research use case. Most will stay `reference-only`.
**Folder**: `_imported\__academic_division\`
**Agents**: academic-anthropologist, academic-geographer, academic-historian, academic-narratologist, academic-psychologist

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5k-academic-division.md` *(to be created)*

**Note**: These agents are low risk and potentially useful for founder interview mode, doctrine extraction, and product narrative work. `academic-psychologist` and `academic-narratologist` may be valuable for brand voice and user research synthesis.

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Review and wrap selected agents |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `design:research-synthesis` | Supports academic-psychologist user research synthesis |
| `product-management:synthesize-research` | Supports academic-narratologist and academic-psychologist |
| `marketing:brand-review` | Supports academic-narratologist brand voice review |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None | Academic agents are research/analysis only | — |

---

## Phase 5L — Handoffs Review 🟡

**Goal**: Review the `__handoffs` README and any handoff documentation templates. Low risk, documentation-only.
**Folder**: `_imported\__handoffs\`
**Files**: README.md

**Executor**: Claude (with `slops-agent-author` skill)
**Prompt**: `Blueprints\prompts\phase-5\phase-5l-handoffs.md` *(to be created)*

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-context-markdown` | Normalize handoff documentation to DBS structure |
| `slops-agent-author` | Review handoff process for SLOPS compliance |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `anthropic-skills:docx` | Convert handoff templates to Word documents if needed |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| None | Documentation only | — |

---

## Phase 6 — Manager Agent Disposition + Layer-to-Layer Handoff Documentation ⬜

**Goal**: Decide final home for `manager_agent.md` and `sub_agents.md`. Document the communication protocol between 0-OS, 1-ssffmvp, and 2-Omen layers so future agents can follow the handoff chain without ambiguity.

**Executor**: Claude (with `slops-agent-author` + `slops-context-markdown` skills)
**Prompt**: `Blueprints\prompts\phase-6-handoff-documentation.md` *(to be created)*

**Prerequisite**: Phase 5 must be substantially complete so the active agent roster is known before the handoff protocol is written.

**Key decisions Phase 6 must make**:
1. Confirm `manager_agent.md` and `sub_agents.md` stay at `ssffmvp\Blueprints\prompts\` (project-level, not global)
2. Add redirect stubs at `Blueprints\agents\` root pointing to the project-level location
3. Define the 0-OS → 1-ssffmvp → 2-Omen handoff protocol document
4. Document what each layer owns, what it passes down, and what escalates up

### SLOPS Skills Invoked
| Skill | Purpose |
|-------|---------|
| `slops-agent-author` | Finalize manager agent disposition and RBAC boundaries |
| `slops-context-markdown` | Write layer-to-layer handoff documentation |
| `slops-prompt-generator` | Create canonical handoff prompt template |

### Cowork Skills to Have Ready
| Skill | Purpose |
|-------|---------|
| `operations:process-doc` | Document the inter-layer communication process formally |
| `anthropic-skills:docx` | Optional: produce a Word doc version of the handoff protocol for sharing |

### MCP Connectors to Obtain
| Connector | Purpose | Priority |
|-----------|---------|----------|
| **Linear** | If sprint/project handoffs are tracked in Linear, the handoff doc should reference it | Medium |

---

## Cross-Phase Tools and Skills Summary

This table consolidates everything that should be set up or obtained across the full migration:

### Priority MCP Connectors (by urgency)

| Connector | Phases That Use It | Priority | Why |
|-----------|-------------------|----------|-----|
| **Linear** | 5A, 5G, 6 | 🔴 High | Sprint management, issue tracking — core to product and PM agents |
| **GitHub** | 5H | 🔴 High | Code access — required for engineering agents to function |
| **Supabase** | 5H | 🔴 High | Database access — required for backend and data engineering agents |
| **HubSpot** | 5C, 5D | 🔴 High | CRM and marketing email — core to sales and marketing agents |
| **Klaviyo** | 5C | 🔴 High | Email sequences — waitlist and launch campaigns |
| **Figma** | 5B | 🔴 High | Design file access — required for design agents |
| **Amplitude** | 5A | 🟡 Medium | Product analytics — supports product-trend-researcher |
| **Intercom** | 5A, 5E | 🟡 Medium | Customer feedback and support |
| **Canva** | 5C | 🟡 Medium | Visual asset creation |
| **Ahrefs** | 5C, 5I | 🟡 Medium | SEO and keyword research |
| **Supermetrics** | 5I | 🟢 Low | Paid media reporting |
| **SimilarWeb** | 5I | 🟢 Low | Competitive research |
| **Datadog / PagerDuty** | 5H | 🟢 Low | Monitoring — not needed until SRE agent is activated |
| **Asana** | 5G | 🟢 Low | Alternative PM tool — only if Linear isn't primary |

### Priority Cowork Skills (already available — confirm installed)

| Skill Bundle | Phases That Use It | Already Available |
|-------------|-------------------|-----------------|
| `product-management:*` | 5A, 5D, 5G | ✅ Yes |
| `design:*` | 5B | ✅ Yes |
| `marketing:*` | 5C, 5D, 5I | ✅ Yes |
| `engineering:*` | 5H | ✅ Yes |
| `operations:*` | 5E, 5F, 5G, 6 | ✅ Yes |
| `data:*` | 5E, 5I, 5J | ✅ Yes |
| `legal:*` | 5E, 5F | ✅ Yes |
| `anthropic-skills:docx` | 5L, 6 | ✅ Yes |
| `anthropic-skills:xlsx` | 5J | ✅ Yes |
| `product-tracking-skills:*` | 5H | ✅ Yes |

---

## Deferred Items (Not in Phase 1–6)

These items are tracked but not yet scheduled:

| Item | Description | Risk |
|------|-------------|------|
| `ssffmvp` root loose-file cleanup | ~10 files (BRAND_STRATEGY.md, agent_handoff.md, etc.) need to move to DBS homes | Low |
| `oraclepu.key` security review | Key file at ssffmvp repo root — verify gitignored, consider moving out of repo | Medium |
| `Archive\` full audit | Some items in Archive may need re-routing; not touched during migration | Low |
| `SKILL_INDEX.md` archive | Old redirect stub can be archived to `Archive\superseded\` if no live references | Low |

---

**Document Status**: Complete — all phases executed. 2026-05-23.
**Canonical location**: `Solutions\reports\dbs-migration\PHASES_MASTER_PLAN.md`
