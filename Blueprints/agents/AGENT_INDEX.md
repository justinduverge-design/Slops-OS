# Agent Authority Matrix

This is the canonical **runtime policy and active-assignment** file for SLOPS OS.

Any runtime or operator resolves authority by reading this file first.

## Where authority actually comes from

There is **one** permission system, not two. It has three surfaces and they do not compete:

| Surface | Role |
|---|---|
| `Blueprints\tools\tool-permissions.md` | Canonical **action and approval doctrine** — the Action Risk Tiers and what each action requires. |
| `Blueprints\agents\AGENT_INDEX.md` (this file) | **Runtime policy** and **Active Trust Assignments**. |
| `Blueprints\tools\TOOLS_INDEX.md` | **Mirrors** the capability/gate mapping for lookup. It is **not** a competing authority. |

**Authorization requires all four of the following. Any one missing means the action is not authorized:**

1. The session actually has the capability.
2. The runtime has an active assignment for the specific task.
3. The applicable **Action Risk Tier** gate is satisfied.
4. Every founder, security, provider, and action-level approval is satisfied.

**Capability alone grants no authority.** Neither does a vendor name, a model name, or an identity module. Identity modules describe *possible* runtime profiles; every kickoff must confirm the session's *actual* capabilities before a trust assignment is applied. Missing or uncertain capability is treated as **ABSENT**.

---

## Status Legend

Status describes a **file's review state**. It is not a grant. Even `active` confers nothing without an Active Trust Assignment (§9).

| Status | Meaning | Authority | Action Risk Tier ceiling | Examples |
|---|---|---|---|---|
| **active** | Approved, doctrine-wrapped, callable | Only via an Active Trust Assignment | Per assigned trust tier | The founder role; any runtime under a current assignment |
| **candidate** | Reviewed, not yet doctrine-wrapped | None | Tier 1–2 only | The 36 built wrappers in Section 5 |
| ~~**reference-only**~~ | ~~Imported material, readable for inspiration~~ | — | — | **Retired 2026-08-05.** The `_imported\` staging tree was deleted; this class has no members. Recoverable from git history if a future import wave needs it. |
| **do-not-activate** | Flagged for security/RBAC concerns | None | None | (blocked until founder approval) |

---

## Section 1: Global Authorities (0-OS Level)

These are the canonical SLOPS roles. They define the operating system itself.

Roles are keyed to **function**, never to a vendor or model name. A runtime is eligible for a role only as recorded in Runtime Policy (§8) and holds it only via an Active Trust Assignment (§9).

| Role | Definition | Held by | Responsibilities |
|---|---|---|---|
| **Founder** | The founder is the sole authority to approve restricted actions and merge work. Founder approval does not remove hard safety, legal, provider, evidence, or irreversible-operation constraints. | Justin (person — no file) | Product vision, roadmap approval, risk acceptance, monetization, platform strategy, trust assignments, action-level approvals |
| **Planner** | Plans, reviews, documents, and routes. Proposes; does not self-authorize execution. | Any runtime eligible for `guarded-writer` or above, per an active assignment | Strategy, architecture, planning, review, markdown updates, risk assessment, prompt building, doctrine extraction |
| **Executor** | Implements an approved plan under an active assignment. | Any runtime eligible for `full-executor`, per an active assignment | Code generation, automation, file edits, terminal commands, tests, verification, feature-branch git operations |

A runtime may hold Planner and Executor at different times. Neither role is a standing property of any vendor.

### Interaction Rules

- **Planner ↔ Founder:** the planner challenges decisions that drift from doctrine; the founder makes final calls.
- **Planner ↔ Executor:** the planner writes plans; the executor implements only approved plans.
- **Executor ↔ Founder:** the executor escalates destructive, risky, or unclear work through the planner, then to the founder. Destructive, production, DB-write, deployment, and secrets actions require **action-level** founder approval — general task approval is not sufficient.
- **Main-branch merge is founder-only**, for every runtime, in every tier.
- **All:** follow the shared operating principles in `Blueprints\tools\tool-permissions.md` (Context First, No Hallucinations, Explicit Assumptions, Reversible Changes).

---

## Section 2: Active SLOPS Skills (0-OS Authored)

**Scope:** this is a curated OS-authoring subset; `Blueprints\skills\SKILL_ROUTING.md` is the complete registry. A skill absent from this section is not thereby inactive — check `SKILL_ROUTING.md` before concluding anything about a skill's status. The two lists have different purposes and their counts are not expected to match.

| Skill | File | Status | Capability required | Layer | Purpose |
|---|---|---|---|---|---|
| `slops-context-markdown` | `Blueprints\skills\slops-context-markdown\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Create, update, normalize, and route DBS markdown context files |
| `slops-prompt-generator` | `Blueprints\skills\slops-prompt-generator\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Convert audits, handoffs, specs, contracts, context into concrete runnable prompts |
| `slops-skill-author` | `Blueprints\skills\slops-skill-author\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Create, critique, normalize, and improve SLOPS-authored skill markdown files |
| `slops-agent-author` | `Blueprints\skills\slops-agent-author\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Create, critique, normalize, and improve SLOPS agent role files using RBAC and least privilege |
| `agent-wrapper-generator` | `Blueprints\skills\agent-wrapper-generator\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Generate least-privilege SLOPS agent wrapper files from approved review memos or explicit candidate selections |
| `agent-index-diff-builder` | `Blueprints\skills\agent-index-diff-builder\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Build proposed `AGENT_INDEX.md` additions or diffs from wrapper files without applying them |
| `rbac-risk-review` | `Blueprints\skills\rbac-risk-review\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Review agents, skills, prompts, plans, and proposed changes for RBAC, overlap, tool-tier, and high-risk authority concerns |
| `workflow-tree-spec` | `Blueprints\skills\workflow-tree-spec\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS or project | Produce workflow-tree specs with happy paths, branches, failure states, recovery paths, and observable state contracts |
| `security-privacy-evidence` | `Blueprints\skills\security-privacy-evidence\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS or project | Maintain security/privacy evidence notes, control mappings, data classification, consent boundaries, and approval records |
| `command-bridge-generator` | `Blueprints\skills\command-bridge-generator\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Generate approved command-bridge shim files for each runtime from `SKILL_ROUTING.md` and `AGENT_INDEX.md` |
| `pre-build-research` | `Blueprints\skills\pre-build-research\SKILL.md` | active | any runtime with network access; file-write requires `guarded-writer` or above | 0-OS or project | Research external APIs, data sources, and integrations before build prompts |
| `clean-up-checkpoint` | `Blueprints\skills\clean-up-checkpoint\SKILL.md` | active | any runtime; file-write requires `guarded-writer` or above | 0-OS | Stop new work and create a rate-limit-safe checkpoint with next prompt |

---

## Section 3: Project-Specific Agents (Not Global SLOPS)

These are agents defined at layer 1-Slops Saloon or layer 2-Omen. They are not reusable at 0-OS level.

| Agent | File | Layer | Status | Scope | Tool Access |
|---|---|---|---|---|---|
| **Manager Agent** | `slops-saloon\omen\Blueprints\prompts\manager_agent.md` | 1-Slops Saloon | active (runtime) | Omen fantasy football runtime orchestration | Per prompt definition |
| **Sub-Agents (6)** | `slops-saloon\omen\Blueprints\prompts\sub_agents.md` | 1-Slops Saloon | active (runtime) | Omen sub-agent prompts (fantasy engine) | Per prompt definition |

**Note:** These are runtime prompts, not SLOPS-level agents. They do not inherit 0-OS authority model. Each is defined in its own prompt file.

---

## Section 4: Imported Agent Library Review — CLOSED 2026-08-05

**The `_imported\` staging tree was deleted on 2026-08-05** (91 files). Every file
with a promoted counterpart differed from it, confirming the promoted copy in
`Blueprints\agents\<division>\` is the cleaned, authoritative version; the
remaining 58 were reviewed and never selected. Full contents recoverable from
git history.

The promotion pipeline this section described is closed. There is no dormant
import pool. The only agent files that exist are the promoted ones in
`Blueprints\agents\<division>\`, and their status is recorded in Section 5.

Reopen this section only if a new import wave is approved — and if so, restore
the tree from git rather than re-importing.

Historical review sources:

- `Direction\reviews\design-division-import-review.md`
- `Direction\reviews\marketing-sales-division-import-review.md`
- `Direction\reviews\paid-media-finance-academic-import-review.md`
- `Direction\reviews\support-specialized-project-engineering-import-review.md`
- `Direction\reviews\agent-wrapper-creation-summary.md`
- `Solutions\reports\dbs-migration\phase-5-reviews\product-division-review.md`

### What this section records

**Section 4 records REVIEW-TIME SELECTION. Section 5 records APPROVED BUILT WRAPPERS.**

These are two different facts about two different moments:

- A **review-time selection** is a reviewer's judgement that a role *could* justify a wrapper.
- A **built wrapper** is a file that exists on disk and appears in Section 5.

**The two counts are NOT expected to match, and a mismatch is not a defect.** Selection at review time (47) exceeds built wrappers (36) because selection is a proposal and building is a separate, later, founder-gated step. Do not "reconcile" these numbers by deleting review records. The review record is history and stays as written.

```yaml
schema: imported-division-review/v1
# REVIEW-TIME SELECTION ONLY. Not an inventory of built wrappers — see Section 5 for that.
# review_time_selection totals 47; built wrappers total 36. The gap is expected.
divisions:
  - division: __academic_division
    imported_file_count: 5
    review_time_selection: 3
    reference_only: 2
    do_not_activate: 0
    risk_level: low-medium
    notes: Lore, culture, narrative, and research support only
  - division: __design_division
    imported_file_count: 7
    review_time_selection: 5
    reference_only: 1
    do_not_activate: 1
    risk_level: medium
    notes: Design critique and draft guidance only; no implementation authority
  - division: __engineering_division
    imported_file_count: 17
    review_time_selection: 9
    reference_only: 4
    do_not_activate: 4
    risk_level: high
    notes: Advisory wrappers only; the assigned executor runtime remains implementation owner
  - division: __finance_division
    imported_file_count: 5
    review_time_selection: 2
    reference_only: 2
    do_not_activate: 1
    risk_level: high
    notes: Sanitized planning only; no books, tax, banking, or official forecasts
  - division: __marketing_division
    imported_file_count: 9
    review_time_selection: 4
    reference_only: 4
    do_not_activate: 1
    risk_level: medium-high
    notes: Draft strategy/copy only; no posting, account access, or paid spend
  - division: __paid_media_division
    imported_file_count: 7
    review_time_selection: 4
    reference_only: 2
    do_not_activate: 1
    risk_level: high
    notes: Audit/planning only; no ad account access, tracking changes, or spend
  - division: __product_division
    imported_file_count: 5
    review_time_selection: 2
    built_wrappers: 0
    reference_only: 1
    do_not_activate: 2
    risk_level: medium-high
    status: PARKED / NON-ACTIVE
    annotation: "review-time selection: 2 | built wrappers: 0"
    note: >
      no active Product division exists. This row is PRESERVED as a review record.
      There is no product/ folder and no placeholder wrappers, and none may be created
      to make this row look consistent. PRD and prioritization support only;
      the founder owns decisions.
  - division: __project_management_division
    imported_file_count: 6
    review_time_selection: 3
    reference_only: 3
    do_not_activate: 0
    risk_level: medium
    notes: Status, plans, and task breakdowns only
  - division: __sales_division
    imported_file_count: 9
    review_time_selection: 7
    reference_only: 1
    do_not_activate: 1
    risk_level: high
    notes: Draft sales strategy only; no outreach, CRM, pricing, or commitments
  - division: __specialized_division
    imported_file_count: 14
    review_time_selection: 4
    reference_only: 4
    do_not_activate: 6
    risk_level: high
    notes: Narrow wrappers only; regulated/customer-data roles blocked
  - division: __support_division
    imported_file_count: 6
    review_time_selection: 4
    reference_only: 1
    do_not_activate: 1
    risk_level: high
    notes: Draft response/report/checklist only; no customer systems
  - division: __handoffs
    imported_file_count: 1
    review_time_selection: 0
    reference_only: 1
    do_not_activate: 0
    risk_level: low
    notes: Reference templates only
```

### Promotion Process

Imported agents become active through this workflow:

1. A runtime holding at least `guarded-writer` reviews the imported file using `slops-onboarding-agent`, `slops-agent-author`, and `rbac-risk-review`.
2. Only clear, useful, least-privilege roles receive wrapper files under `Blueprints\agents\<division>\`.
3. Ambiguous roles stay `reference-only`.
4. High-risk roles become `do-not-activate`.
5. Justin approves or redirects.
6. `AGENT_INDEX.md` is updated with the wrapper file only, not the imported source file.
7. Candidate agents are still not active. Active promotion requires a later explicit Justin decision.

Wrappers shadowed by an active SLOPS skill are retired; see `Blueprints\handoffs\2026-06-11-skills-acquisition-handoff.md`.

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

```yaml
schema: approved-built-wrappers/v1
# APPROVED BUILT WRAPPERS. Every entry below exists as a file on disk.
# This section is canonical and MUST equal disk at 36 of 36.
# Section 4 records review-time selection (47). The two counts are not expected to match.
count: 36
status_note: >
  candidate only. These are not active autonomous agents and hold no
  Active Trust Assignment. Tier 2 max under the shared constraints above.
wrappers:
  - agent: academic-anthropologist
    division: "Academic"
    path: 'Blueprints\agents\academic\academic-anthropologist.md'
    status: candidate
    allowed_use: "Cultural-coherence lore review"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Public living-culture references"
      - "activation"
  - agent: academic-historian
    division: "Academic"
    path: 'Blueprints\agents\academic\academic-historian.md'
    status: candidate
    allowed_use: "Historical lore research"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Public lore claims"
      - "activation"
  - agent: academic-narratologist
    division: "Academic"
    path: 'Blueprints\agents\academic\academic-narratologist.md'
    status: candidate
    allowed_use: "Narrative and lore structure review"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
    approval_required:
      - "Public lore decisions"
      - "activation"
  - agent: design-brand-guardian
    division: "Design"
    path: 'Blueprints\agents\design\design-brand-guardian.md'
    status: candidate
    allowed_use: "Brand consistency review and voice notes"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Public brand decisions"
      - "legal/trademark"
      - "activation"
  - agent: design-image-prompt-engineer
    division: "Design"
    path: 'Blueprints\agents\design\design-image-prompt-engineer.md'
    status: candidate
    allowed_use: "Image prompt drafting"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "External generation"
      - "final assets"
      - "activation"
  - agent: design-ux-researcher
    division: "Design"
    path: 'Blueprints\agents\design\design-ux-researcher.md'
    status: candidate
    allowed_use: "Research plans and usability templates"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "User research"
      - "participant data"
      - "activation"
  - agent: engineering-ai-integration-advisor
    division: "Engineering"
    path: 'Blueprints\agents\engineering\engineering-ai-integration-advisor.md'
    status: candidate
    allowed_use: "AI integration planning"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Paid APIs"
      - "model changes"
      - "user data"
      - "activation"
  - agent: engineering-backend-architect-advisor
    division: "Engineering"
    path: 'Blueprints\agents\engineering\engineering-backend-architect-advisor.md'
    status: candidate
    allowed_use: "Backend architecture advice"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Migrations"
      - "API finalization"
      - "activation"
  - agent: engineering-data-engineer-advisor
    division: "Engineering"
    path: 'Blueprints\agents\engineering\engineering-data-engineer-advisor.md'
    status: candidate
    allowed_use: "Data ingestion planning"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "ETL"
      - "database/provider access"
      - "activation"
  - agent: finance-financial-analyst
    division: "Finance"
    path: 'Blueprints\agents\finance\finance-financial-analyst.md'
    status: candidate
    allowed_use: "Sanitized financial analysis drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Live financial systems"
      - "official forecasts"
      - "activation"
  - agent: finance-fpa-analyst
    division: "Finance"
    path: 'Blueprints\agents\finance\finance-fpa-analyst.md'
    status: candidate
    allowed_use: "Budget and scenario planning drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Budget"
      - "hiring"
      - "forecast finalization"
      - "activation"
  - agent: marketing-content-creator
    division: "Marketing"
    path: 'Blueprints\agents\marketing\marketing-content-creator.md'
    status: candidate
    allowed_use: "Content drafts and briefs"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Publication"
      - "external send"
      - "activation"
  - agent: marketing-reddit-community-builder
    division: "Marketing"
    path: 'Blueprints\agents\marketing\marketing-reddit-community-builder.md'
    status: candidate
    allowed_use: "Reddit research and draft strategy"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Reddit action"
      - "public communication"
      - "activation"
  - agent: marketing-social-media-strategist
    division: "Marketing"
    path: 'Blueprints\agents\marketing\marketing-social-media-strategist.md'
    status: candidate
    allowed_use: "Social strategy drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Posting"
      - "account access"
      - "paid spend"
      - "activation"
  - agent: marketing-video-optimization-specialist
    division: "Marketing"
    path: 'Blueprints\agents\marketing\marketing-video-optimization-specialist.md'
    status: candidate
    allowed_use: "Video packaging drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Platform access"
      - "publishing"
      - "activation"
  - agent: paid-media-auditor
    division: "Paid Media"
    path: 'Blueprints\agents\paid-media\paid-media-auditor.md'
    status: candidate
    allowed_use: "Manual paid-media audit drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "API/live account access"
      - "spend"
      - "activation"
  - agent: paid-media-creative-strategist
    division: "Paid Media"
    path: 'Blueprints\agents\paid-media\paid-media-creative-strategist.md'
    status: candidate
    allowed_use: "Ad creative drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Ad launch"
      - "platform access"
      - "spend"
      - "activation"
  - agent: paid-media-search-query-analyst
    division: "Paid Media"
    path: 'Blueprints\agents\paid-media\paid-media-search-query-analyst.md'
    status: candidate
    allowed_use: "Search-query export analysis"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
    approval_required:
      - "Ad account access"
      - "keyword deployment"
      - "activation"
  - agent: paid-media-tracking-specialist
    division: "Paid Media"
    path: 'Blueprints\agents\paid-media\paid-media-tracking-specialist.md'
    status: candidate
    allowed_use: "Measurement plan drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Tags"
      - "pixels"
      - "customer-data flows"
      - "activation"
  - agent: project-management-experiment-tracker
    division: "Project Management"
    path: 'Blueprints\agents\project-management\project-management-experiment-tracker.md'
    status: candidate
    allowed_use: "Experiment plan drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Live experiments"
      - "analytics"
      - "activation"
  - agent: project-management-project-shepherd
    division: "Project Management"
    path: 'Blueprints\agents\project-management\project-management-project-shepherd.md'
    status: candidate
    allowed_use: "Project status and risk drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
    approval_required:
      - "Scope"
      - "budget"
      - "timeline commitments"
      - "activation"
  - agent: project-manager-senior
    division: "Project Management"
    path: 'Blueprints\agents\project-management\project-manager-senior.md'
    status: candidate
    allowed_use: "Task breakdowns from approved specs"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
    approval_required:
      - "Roadmap or scope commitments"
      - "activation"
  - agent: sales-account-strategist
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-account-strategist.md'
    status: candidate
    allowed_use: "Account planning templates"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Customer contact"
      - "renewals"
      - "pricing"
      - "activation"
  - agent: sales-deal-strategist
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-deal-strategist.md'
    status: candidate
    allowed_use: "Deal-risk and MEDDPICC drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Pricing"
      - "forecast"
      - "customer data"
      - "activation"
  - agent: sales-discovery-coach
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-discovery-coach.md'
    status: candidate
    allowed_use: "Discovery templates and call prep"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Customer/prospect data"
      - "external calls"
      - "activation"
  - agent: sales-engineer-advisor
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-engineer-advisor.md'
    status: candidate
    allowed_use: "Demo and POC-scope drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "POC execution"
      - "security claims"
      - "implementation"
      - "activation"
  - agent: sales-outbound-strategist
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-outbound-strategist.md'
    status: candidate
    allowed_use: "ICP and sequence drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Outreach"
      - "CRM"
      - "prospect data"
      - "activation"
  - agent: sales-pipeline-analyst
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-pipeline-analyst.md'
    status: candidate
    allowed_use: "Sanitized pipeline report drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "CRM/data access"
      - "official forecast"
      - "activation"
  - agent: sales-proposal-strategist
    division: "Sales"
    path: 'Blueprints\agents\sales\sales-proposal-strategist.md'
    status: candidate
    allowed_use: "Proposal narrative drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Proposal submission"
      - "pricing/legal"
      - "activation"
  - agent: compliance-auditor
    division: "Specialized"
    path: 'Blueprints\agents\specialized\compliance-auditor.md'
    status: candidate
    allowed_use: "Compliance readiness drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Evidence submission"
      - "certification"
      - "activation"
  - agent: language-translator
    division: "Specialized"
    path: 'Blueprints\agents\specialized\language-translator.md'
    status: candidate
    allowed_use: "Draft localization"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Regulated/public translation"
      - "activation"
  - agent: specialized-developer-advocate
    division: "Specialized"
    path: 'Blueprints\agents\specialized\specialized-developer-advocate.md'
    status: candidate
    allowed_use: "DX audits and changelog drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Public docs"
      - "community action"
      - "activation"
  - agent: support-analytics-reporter
    division: "Support"
    path: 'Blueprints\agents\support\support-analytics-reporter.md'
    status: candidate
    allowed_use: "Sanitized analytics report drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Live data/dashboard access"
      - "activation"
  - agent: support-executive-summary-generator
    division: "Support"
    path: 'Blueprints\agents\support\support-executive-summary-generator.md'
    status: candidate
    allowed_use: "Executive summary drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
    approval_required:
      - "Binding commitments"
      - "activation"
  - agent: support-legal-compliance-checker
    division: "Support"
    path: 'Blueprints\agents\support\support-legal-compliance-checker.md'
    status: candidate
    allowed_use: "Compliance issue spotting"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
      - pre-build-research
    approval_required:
      - "Legal/compliance finalization"
      - "activation"
  - agent: support-support-responder
    division: "Support"
    path: 'Blueprints\agents\support\support-support-responder.md'
    status: candidate
    allowed_use: "Support response drafts"
    may_invoke_skills:
      - slops-context-markdown
      - slops-prompt-generator
    approval_required:
      - "Customer communication/ticket access"
      - "activation"
```

---

## Section 6: Tool Permission Reference

This section is keyed to **trust tier**, not to a vendor or model name. A runtime reaches a tier only through Runtime Policy eligibility (§8) plus an Active Trust Assignment (§9). Reading your runtime's name here would tell you nothing — there are no runtime names here.

Canonical action and approval doctrine lives in `Blueprints\tools\tool-permissions.md` (Action Risk Tiers). This section is a convenience summary of what each trust tier may touch.

### guarded-writer — Action Risk Tier 3 max

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

### full-executor — Action Risk Tier 5 (with approval gates)

Held **only** via an Active Trust Assignment scoped to one approved task. Never standing.

Permitted tools while the assignment is active:
- All Action Risk Tier 1–4 tools
- Terminal execution (npm, docker, tests, builds)
- File operations (read, write, edit, create)
- Git operations (status, log, diff, branch, commit) and **feature-branch push only**
- Database queries (read)

Restricted actions — each requires **action-level** founder approval. General task approval is not sufficient:
- Database migrations (Tier 5)
- Delete files (Tier 5)
- Force-push, reset (Tier 5)
- Deploy to production (Tier 5)
- Rotate secrets, modify `.env` (Tier 5)
- Credentials / API key access (Tier 5)
- Infrastructure changes (Tier 5)
- **Main-branch merge — founder-only, never delegated.**

Tier 4–5 work escalates through the planner to the founder.

### bounded-contributor — assignment profile, not a runtime

Applied to a real runtime or contributor for **one** founder-selected item. May read, investigate, test, and propose a PR. May **not** self-pull, merge, deploy, access secrets, or expand scope.

### read-only — Action Risk Tier 1 only

The default for every runtime until reviewed and assigned. Also the standing state of imported agents:

Until promoted:
- Read files only
- No write, edit, delete
- No bash execution
- No tool grants beyond reading

---

## Section 7: Authority Resolution Rules

When you are unsure whether an action is authorized, follow this checklist **in order**. Stop at the first failure.

1. **Confirm the session's actual capabilities.** Do not infer them from the runtime name, the model name, or an identity module. Missing or uncertain capability is treated as **ABSENT**.
2. **Find the runtime in Runtime Policy (§8).** If it is not listed, use `generic`: default `read-only`, `max_eligible_tier: UNREVIEWED`, no authority inferred.
3. **Find an Active Trust Assignment (§9) covering this specific task.** No assignment means no authority above the runtime's `default_tier`. An empty `assignments: []` list means defaults only.
4. **Check the assignment is valid.** `session_capability_confirmed` must be `true`; `tier` must be at or below the runtime's `max_eligible_tier`; the task must be in scope; it must not have expired.
5. **Check the Action Risk Tier gate** for the specific action in `Blueprints\tools\tool-permissions.md`.
6. **Check action-level approvals.** Destructive, production, DB-write, deployment, and secrets actions each need their own founder approval. General task approval is not sufficient. Main-branch merge is founder-only.

Uncertainty at any step escalates to the founder. It is never resolved by inference.

---

## See Also

- **Action Risk Tiers / action and approval doctrine:** `Blueprints\tools\tool-permissions.md`
- **Tool index (mirror, not an authority):** `Blueprints\tools\TOOLS_INDEX.md`
- **Runtime identity modules:** `Blueprints\agent-modules\identity-claude-code.md`, `identity-codex.md`, `identity-cowork.md`, `identity-api.md`, `identity-generic.md`
- **Skill routing matrix (complete skill registry):** `Blueprints\skills\SKILL_ROUTING.md`
- **Imported agent location:** none — the `_imported\` tree was deleted 2026-08-05 (see Section 4)

---

## Section 8: Runtime Policy

Eligibility only. This section grants no active authority to anyone.

```yaml
schema: runtime-policy/v1
# Eligibility only. Grants no active authority. Authority requires an Active Trust Assignment.
runtimes:
  - runtime: claude-code
    identity_module: Blueprints/agent-modules/identity-claude-code.md
    default_tier: read-only
    max_eligible_tier: full-executor
    standing_conditions:
      - "full-executor only via an Active Trust Assignment for one approved task"
      - "no standing branch, commit, or push authority"
  - runtime: codex
    identity_module: Blueprints/agent-modules/identity-codex.md
    default_tier: read-only
    max_eligible_tier: full-executor
    standing_conditions:
      - "full-executor only via an Active Trust Assignment for one approved task"
      - "no standing branch, commit, or push authority"
  - runtime: cowork
    identity_module: Blueprints/agent-modules/identity-cowork.md
    default_tier: guarded-writer
    max_standing_tier: guarded-writer
    max_eligible_tier: guarded-writer
    standing_conditions:
      - "planning and coordination role"
      - "no queue-wide self-pull authority"
      - "no standing branch, commit, or push authority"
      - "branch, commit, or feature-branch push require an explicit task-level assignment condition"
  - runtime: api
    identity_module: Blueprints/agent-modules/identity-api.md
    default_tier: read-only
    max_eligible_tier: UNREVIEWED
    standing_conditions:
      - "capabilities depend on the host and must be declared at invocation"
      - "assumes no terminal, filesystem, git, connector, or memory capability"
  - runtime: generic
    identity_module: Blueprints/agent-modules/identity-generic.md
    default_tier: read-only
    max_eligible_tier: UNREVIEWED
    standing_conditions:
      - "no authority inferred; unknown capability is treated as absent"
trust_tiers:
  founder:
    definition: >
      The founder is the sole authority to approve restricted actions and merge work.
      Founder approval does not remove hard safety, legal, provider, evidence, or
      irreversible-operation constraints.
  full-executor:
    definition: "All tiers per an approved task plan. Destructive operations still require action-level founder approval."
    assignment: per-task only; never standing
  guarded-writer:
    definition: "Tier 3 max. Read, tracked-context write with per-task approval, plan, review."
  bounded-contributor:
    definition: >
      An assignment profile, NOT a runtime. Applied to a real runtime or contributor for
      one founder-selected item. May read, investigate, test, and propose a PR. May NOT
      self-pull, merge, deploy, access secrets, or expand scope.
    assignment: per-item only, via Active Trust Assignments
  read-only:
    definition: "Tier 1 only until reviewed and assigned."
```

### UNREVIEWED eligibility

```yaml
schema: unreviewed-eligibility/v1
state: UNREVIEWED
meaning: >
  The runtime's maximum eligible tier has not been determined. This is not a permanent
  read-only cap; it is an unassessed state that preserves a safe default while leaving
  future capability-based use open.
rules:
  - "default_tier is read-only and applies until review completes"
  - "no elevation until actual host/runtime capabilities are declared"
  - "founder review determines max_eligible_tier"
  - "no authority exists until an Active Trust Assignment is recorded"
  - "declared capability alone never elevates the tier"
  - "unknown or undeclared capability is treated as absent"
  - "uncertainty escalates to the founder; it is never resolved by inference"
review_to_exit:
  - runtime declares its actual capabilities at invocation
  - founder reviews the declaration
  - founder sets max_eligible_tier in Runtime Policy
  - state moves UNREVIEWED -> REVIEWED
  - authority still requires a separate Active Trust Assignment
```

---

## Section 9: Active Trust Assignments

This is where authority actually lives. It is initialized **empty**.

```yaml
schema: active-trust-assignment/v1
# Empty list = defaults only. No assignment = no authority above runtime default_tier.
assignments:
  - assignment_id: ATA-20260825-02
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A7B-OwnedFootballDataPipelineImplementation
    granted_by: founder
    granted_at: 2026-08-25
    expires: 2026-08-25T22:19:24Z
    conditions:
      - "Implement and prove only A7B Phase 3 staging-shadow behavior: dedicated non-production primary/witness roots, correction/source-loss/schema-drift drills, KVM1-role recovery, Pi-role hash/freshness/disk evidence, and alerts"
      - "No production, publication, scoring enablement, database, SQL, dependency, secret, credential, remote-host mutation, service installation, timer, deployment, or ADP change"
      - "Actual KVM1 or Command Center Pi provisioning requires a separate exact-host action approval"
      - "Feature-branch git operations only; main-branch merge remains founder-only"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260825-01
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A7B-OwnedFootballDataPipelineImplementation
    granted_by: founder
    granted_at: 2026-08-25
    expires: 2026-08-25T22:03:41Z
    conditions:
      - "Implement only A7B Phase 2: canonical game/player/team identities, versioned offensive/kicker/DST facts, at least four varied historical replay weeks, and hard fail-closed quality gates"
      - "No staging, infrastructure, timer, database, SQL, publication, provider credential, deployment, production, scoring enablement, or ADP change"
      - "Feature-branch git operations only; main-branch merge remains founder-only"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260824-01
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A7B-OwnedFootballDataPipelineImplementation
    granted_by: founder
    granted_at: 2026-08-24
    expires: 2026-08-25T01:57:21Z
    conditions:
      - "Implement only A7B Phase 1: a local, non-production nflverse allowlisted raw snapshot/manifest collector and exact-manifest replay path"
      - "No timer, production storage, database, SQL, dependency, provider credential, deployment, production data, scoring enablement, or ADP change"
      - "Feature-branch git operations only; main-branch merge remains founder-only"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-10
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M4-CC-WaiverWatch
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "implement the approved native Waiver Watch composition only after the required mobile source and Figma contract gates are complete"
      - "no provider claims, live waiver-deadline data, backend, provider auth, credentials, deep-link configuration, package, SQL, deployment, or production changes"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-09
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B2-D
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "complete only the remaining canonical Omen engine work documented by B2-D; preserve provider truth and no-mock behavior"
      - "no provider credential inspection, deployment, production-data mutation, store configuration, package, or SQL changes"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-08
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: OPS-status-model-truth-gate
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "documentation-only reconciliation of the L0 status model, Omen status-model mirror, and stale Omen CI guidance"
      - "no app code, package, deployment, secret, database, or production changes"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260731-01
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A3
    granted_by: founder
    granted_at: 2026-07-31
    expires: on-task-close
    conditions:
      - "audit-preparation only; no secret values reviewed or displayed"
      - "no mutation to production database, DNS, Nginx, TLS, or environment variables"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260731-02
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A4
    granted_by: founder
    granted_at: 2026-07-31
    expires: on-task-close
    conditions:
      - "no-write Supabase dry-run against real nflverse data only"
      - "production flag flip explicitly excluded from this assignment; requires separate future approval"
      - "never log provider credentials or raw user data"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260731-03
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: F1
    granted_by: founder
    granted_at: 2026-07-31
    expires: on-task-close
    conditions:
      - "audit-preparation only; no production data or secret values reviewed or displayed"
      - "map every service-key route to query/scoping-column/test; unscoped queries become a P0 defect with a failing isolation test"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260731-04
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: F4
    granted_by: founder
    granted_at: 2026-07-31
    expires: on-task-close
    conditions:
      - "ESPN cookie values must never appear in logs, UI, URLs, or payloads"
      - "no production mutation; verification only"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260731-05
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M4-CC-WaiverWatch
    granted_by: founder
    granted_at: 2026-07-31
    expires: on-task-close
    conditions:
      - "Figma §3.2 proposal creation only; no implementation code until the proposal is founder-approved"
      - "no fabricated waiver deadlines or provider data in the proposal"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-01
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M4-CC-LedgerPreview
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "Figma §3.2 proposal creation only; no implementation code until the proposal is founder-approved"
      - "no fabricated ledger/outcome data in the proposal"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-02
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M4-CC-PlatformsCompact
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "Figma §3.2 proposal creation only; no implementation code until the proposal is founder-approved"
      - "no live provider connect flow, credentials, or deep-link config in the proposal"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-03
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: D1
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "research/pre-build-research phase only — evaluate paid live-ADP data source options, pricing, licensing, terms"
      - "no paid dependency, contract, API key, or spend commitment without a separate explicit approval"
      - "no code implementation under this assignment"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-04
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M3A-QA
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "sanitized QA matrix/checklist preparation only — no real device, no real credentials, no account actions"
      - "output must contain no real credentials, tokens, or account-specific data"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-05
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A3-live-access-followup
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "read-only production verification only — TLS handshake check, Supabase advisors/RLS query via existing Supabase MCP connection"
      - "no secret values, no mutation, no production data displayed beyond RLS/advisory metadata"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-06
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: D1-production-verification
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "read-only live GET request to the public /api/trade/pulse endpoint only — no mutation, no auth bypass"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-07
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M4-CC-LeaguePulse
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "Figma §3.2 proposal creation only; no implementation code until the proposal is founder-approved"
      - "no fabricated league-activity data; activity section must render as an honest empty state, matching the approved §1.6 brief"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260801-08
    runtime: claude-code
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: M4-Help-Support-Implementation
    granted_by: founder
    granted_at: 2026-08-01
    expires: on-task-close
    conditions:
      - "produce the missing Android TalkBack, font-scale, and compact/large-phone screenshot evidence for the already-merged PR #229 implementation only"
      - "no new API endpoints, provider credentials/cookies, account/store settings, analytics, deployment, or production changes"
      - "local emulator/device evidence only; no store account or release action"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-01
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B2-D3-S
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Sleeper trade-capability implementation only; no Yahoo/ESPN, credentials, SQL, dependencies, deployment, or public Trade Analyzer changes"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-02
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B3
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Replace Tuesday scoring's Sportradar read with public nflverse data and add a no-write dry-run only"
      - "Do not change OMEN_CRON_SCORING_ENABLED, production environment, credentials, SQL, dependencies, deployment, or production data"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-03
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: A4-preseason-deferral
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Implement issue #263 only: defer an unavailable pre-season nflverse season file without recording a failed move or performing Supabase/Redis writes"
      - "Do not change OMEN_CRON_SCORING_ENABLED, production environment, credentials, SQL, dependencies, deployment, or production data"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-04
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B2-D-E1-planning
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Planning-pass only: ratify the ESPN waiver-pool implementation task and its source-backed contract"
      - "No ESPN credential access, real-account request, application code, SQL, dependency, deployment, or production change"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-05
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B2-D-E1
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Implement and fixture-test only the ESPN waiver-pool adapter normalization and bounded pagination contract"
      - "Do not access or print ESPN credentials, make a real-account request, change SQL or dependencies, wire canonical Omen services or clients, deploy, or change production data"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-06
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B2-D-E2
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Wire the already-built ESPN waiver-pool adapter only into the selected-context canonical Omen recommendation path, with fixture-backed service and route tests"
      - "Do not access or print ESPN credentials, make a real-account request, change SQL or dependencies, alter the public Trade Analyzer or mobile clients, deploy, or change production data"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets

  - assignment_id: ATA-20260802-07
    runtime: codex
    session_capability_confirmed: true
    tier: full-executor
    scope_task_key: B2-D-E3
    granted_by: founder
    granted_at: 2026-08-02
    expires: on-task-close
    conditions:
      - "Perform read-only verification of the founder-connected drafted ESPN league using browser-origin provider requests or aggregate Supabase connection-readiness evidence"
      - "Report counts and booleans only; credentials and league context may be held in memory solely for the read-only provider request, but must never be printed, persisted, returned, or included in errors or logs"
      - "Do not write database data, execute provider transactions, publish E1 or E2, deploy, or change production behavior"
    action_level_approvals_required:
      - destructive
      - production
      - db-write
      - deployment
      - secrets
# Shape for a future founder-issued assignment:
#   - assignment_id: ATA-YYYYMMDD-NN
#     runtime: claude-code            # must exist in runtime-policy/v1
#     session_capability_confirmed: true   # kickoff-verified; false/absent => assignment void
#     tier: full-executor             # must be <= runtime.max_eligible_tier
#     scope_task_key: <sprint key>    # exactly one; never queue-wide
#     granted_by: founder
#     granted_at: <ISO 8601>
#     expires: <ISO 8601 | on-task-close>
#     conditions:
#       - "feature-branch push only; no main"
#     action_level_approvals_required:
#       - destructive
#       - production
#       - db-write
#       - deployment
#       - secrets
```
