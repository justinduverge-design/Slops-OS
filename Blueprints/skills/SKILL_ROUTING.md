# Agent Skill Matrix

This file categorizes SLOPS capabilities so Justin knows which agent, skill, and DBS layer to use for each type of work.

This is not a `SKILL.md` file. It is the routing matrix for Claude, Codex, SLOPS-authored skills, and SLOPS-authored agents.

Canonical location:

```text
C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\SKILL_ROUTING.md
```

Related files:

```text
Blueprints\skills\README.md
Blueprints\tools\README.md
Blueprints\tools\tool-permissions.md
Blueprints\tools\TOOLS_INDEX.md
Blueprints\agents\README.md
Blueprints\agents\AGENT_INDEX.md
Blueprints\agents\agents.md
```

## Core Rule

> **Lifecycle map:** `Blueprints/skills/SLOPS_LIFECYCLE.md` maps every build phase to its skill/playbook and status, and holds the gstack keep/replace/drop record. Consult it when choosing what to build or retire.

When unsure, start with Claude.

Claude plans, critiques, structures, and reviews.

Codex executes approved file changes, code changes, terminal commands, tests, and verification.

Skills are reusable workflows.

Agents are reusable roles with permissions.

Prompts are runnable task instructions.

## DBS Layer Model

SLOPS uses three operating layers. This matches the company structure: a parent company, a subsidiary, and the subsidiary's first app. The layer numbers here are canonical and match `context.md` and the root `DBS_INDEX.md`.

| Layer | Name | Org Role | Meaning | Typical Root |
|---|---|---|---|---|
| Layer 0 | SLOPS | Parent company / operating system | Company-level operating doctrine, reusable skills, reusable agents, cross-division handoffs, founder context. Everything below inherits from here. | `C:\Users\JDuve\OneDrive\Desktop\SLOPS` |
| Layer 1 | Slops Saloon | Subsidiary | The subsidiary that builds fantasy sports apps. Division strategy, product portfolio, brand/naming standards, future product slots. No app implementation. | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon` |
| Layer 2 | Corvus | First app | The first app shipped by Slops Saloon. App source, backend, frontend, tests, Docker/deploy, product specs, handoffs, prompts, and product runtime logic. | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus` |

Use the highest reusable layer that is safe.

Do not place app-specific runtime instructions in Layer 0 (SLOPS) unless Justin explicitly promotes them.

Do not place reusable company doctrine inside a subsidiary or app folder unless it is only an implementation copy.

Do not place app implementation work in Layer 1 (Slops Saloon). The division layer stays lean.

## Skill / Agent / Prompt Split

| Artifact | Purpose | Canonical Layer |
|---|---|---|
| Skill | Repeatable workflow. Explains how work is done. | `Blueprints\skills` |
| Agent | Actor role with permissions, denied work, status, and escalation. | `Blueprints\agents` |
| Prompt | One-time runnable task for Claude, Codex, or another agent. | `Blueprints\prompts` |
| Tool permissions | Guardrails for what agents may do. | `Blueprints\tools\tool-permissions.md` |
| Imported agents | External references that are not active until reviewed. | `Blueprints\agents\_imported` |

## Current SLOPS Skills

| Skill | Default Agent | Layer | Purpose |
|---|---|---|---|
| `slops-context-markdown` | Claude first, Codex if writing files | `Layer 0` | Create, update, normalize, and route DBS markdown context files. |
| `design-md-author` | Claude first, Codex if writing files | `Layer 0` | Create, critique, normalize, and improve SLOPS `design.md` files from the canonical design template without editing app source or granting design-agent authority. |
| `slops-prompt-generator` | Claude first, Codex if writing files | `Layer 0` | Convert audits, handoffs, specs, contracts, and context into concrete runnable prompts. |
| `slops-skill-author` | Claude first, Codex if writing files | `Layer 0` | Create, critique, normalize, and improve SLOPS-authored skill markdown files. |
| `slops-agent-author` | Claude first, Codex if writing files | `Layer 0` | Create, critique, normalize, and improve SLOPS agent role files using RBAC and least privilege. |
| `slops-onboarding-agent` | Claude first, Codex if writing files | `Layer 0` | Review imported agent divisions before promotion, classify candidates, flag RBAC risk, and prepare wrapper handoffs for `slops-agent-author`. |
| `agent-wrapper-generator` | Claude first, Codex if writing files | `Layer 0` | Generate least-privilege SLOPS agent wrapper files from approved review memos or explicit candidate selections. |
| `agent-index-diff-builder` | Claude first, Codex if writing files | `Layer 0` | Build proposed `AGENT_INDEX.md` additions or diffs from wrapper files without applying them. |
| `rbac-risk-review` | Claude first, Codex if writing files | `Layer 0` | Review agents, skills, prompts, plans, and proposed changes for RBAC, overlap, tool-tier, and high-risk authority concerns. |
| `workflow-tree-spec` | Claude first, Codex if writing files | `Layer 0` or project layer when scoped | Produce workflow-tree specs with happy paths, branches, failure states, recovery paths, and observable state contracts. |
| `security-privacy-evidence` | Claude first, Codex if writing files | `Layer 0` or project layer when scoped | Maintain security/privacy evidence notes, control mappings, data classification, consent boundaries, and approval records. |
| `command-bridge-generator` | Claude first, Codex if writing files | `Layer 0` | Generate approved Claude and Codex command-bridge shim files from `SKILL_ROUTING.md` and `AGENT_INDEX.md`. |
| `pre-build-research` | Claude / ChatGPT research first, Codex later | `Layer 0` or project layer when scoped | Research external APIs, data sources, and integrations before any build prompt. |
| `clean-up-checkpoint` | Claude first, Codex if writing files | `Layer 0` | Stop new work and create a rate-limit-safe checkpoint with next prompt. |
| `dbs-research-to-architecture-router` | Claude first, Codex if writing files | `Layer 0` | Convert research packets and critic reviews into modular DBS outputs: reference patterns, reviews, decisions, specs, skill drafts, and handoff prompts. |
| `slops-markdown-authoring` | Claude first, Codex if writing files | `Layer 0` | Create, route, prune, and validate SLOPS Markdown files across DBS — operating packages, decisions, reviews, specs, prompts, patterns, handoffs, and lightweight skills. |
| `planning-pass` | Claude first, Codex if writing files | `Layer 0` (writes into target product queue) | Turn a goal into ordered, buildable backlog items (P#/FP#) in a product's `current_sprint.md`, each with a spec link and explicit done-when; respects dependencies. Plans only — never builds. |
| `slops-git-flow` | Claude plans, Codex/Justin execute | `Layer 0` (operates on product repo) | One scoped branch + PR per sprint item, explicit-path commits (never `git add -A`), light stacking for blocked items; push/merge gated to Justin. Replaces external stacking tools. |
| `slops-quality-baseline` | Claude plans, Codex runs checks | `Layer 0` (operates on product repo) | Record code-health signals (tests, audit, build, diff --check) as a ratcheting baseline and gate merges/deploys against it. Replaces external baseline tooling. |
| `slops-ui-ux-audit` | Claude (frontend) reviews | `Layer 0` (audits product frontend) | Audit screens/components against the AAA framework, `brand-system.md`, and design-system v1 — states, 44px, motion-reduce, ARIA, contrast, token consistency, voice, mock/live. Severity-ranked findings; fixes route through the loop. Replaces `ui-ux-pro-max`. |
| `slops-ux-copy` | Claude (frontend) writes/reviews | `Layer 0` (product frontend) | Write/review Corvus UX copy (CTAs, states, onboarding) in the brand voice and copy anchors; honest about mock/live. Replaces external ux-copy skills. |
| `slops-code-review` | Claude reviews; Codex/Justin act | `Layer 0` (reviews product repo) | Pre-merge code + security review (authz, secrets, SY0-701, errors, perf, tests, scope) with P0/P1/P2 verdict. Replaces review + cso. |
| `slops-canary` | Claude measures; Justin rolls back | `Layer 0` (watches deployed product) | Post-deploy health watch (health/ready, route smoke, error/latency vs baseline) -> pass/hold/rollback tied to the cutover playbook. Replaces canary + landing-report. |
| `slops-ship` | Claude orchestrates; Justin merges/deploys | `Layer 0` (releases product) | Sequence review -> quality gate -> merge -> deploy -> canary -> close-out; reuses the other skills + cutover playbook. Replaces land-and-deploy/ship/setup-deploy. |
| `slops-retro` | Claude writes doctrine | `Layer 0` (writes lessons + proposes artifacts) | Turn a cycle's lessons into decision_log entries, doctrine updates, and proposed new skills. The compounding step. Replaces learn + retro. |
| `slops-investigate` | Claude diagnoses; fix via loop | `Layer 0` (read-only on prod) | Reproduce -> isolate -> diagnose -> propose fix (as a loop item) -> verification plan. No hot-patches. Replaces investigate. |
| `slops-verify` | Claude verifies via driver | `Layer 0` (runs against the app) | Functional/real-account QA via the run-slops-saloon driver; states, mock/live, no cookie logging. Replaces browse/qa/qa-only. |
| `slops-graphify` | Claude orchestrates; Justin runs install/runs | `Layer 0` (graphs across L0↔L2) | Wrapper around the external graphify tool: build one cross-layer knowledge graph so SLOPS OS (L0) and Corvus (L2) see each other. Detects-not-installs; output routed to `References/graphify/`. Net-new capability, not a replacement. |
| `slops-legal-spot-check` | Claude | `Layer 0` | Pre-counsel triage on a draft document, copy, or product behavior — flag compliance risk before it ships. Converted from agent support-legal-compliance-checker. |
| `mobile-first-qa-playbook` | Claude (audit), Codex (fixes via the loop) | `Layer 0` | Phone-first QA sweep — iOS Safari + Android Chrome viewport matrix, touch targets, safe-area insets, keyboard avoidance, scroll lock, share sheet, motion-reduce. Severity-ranked findings. Closes Corvus launch gap #8 (mobile blocker). |
| `self-hosted-observability-runbook` | Claude first, Codex if writing files or running install commands | `Layer 0` | Wire self-hosted observability (sentry-self-hosted + Umami + Vector log shipping) on KVM1 for any Slops product. Replaces SaaS Sentry/Plausible/Datadog. Closes Corvus launch gaps #10 (no error monitoring) and #14 (no analytics). |
| `compliance-by-template` | Claude (draft), Justin (review), Codex (file writes) | `Layer 0` | Draft launch-required legal docs (ToS, Privacy Policy, DPA, NDA, GDPR/CCPA pages) using open-agreements templates + AI-drafted custom paragraphs. Self-hosted, signable DOCX output. Replaces Termly for the Slops sovereignty rule. |
| `demo-mode-pre-empty-state` | Claude (pattern review), Codex (fixture generation) | `Layer 0` | Pattern + doctrine for what every Slops product shows before a user has connected real data. Sample dataset, mock/live badge, swap contract, and the "never silently mix demo + real" rule. |
| `slops-headroom` | Claude (governs invocation), Justin (runs install) | `Layer 0` | Compress tool outputs, logs, RAG chunks, and large file reads before they hit the LLM. 60-95% token reduction, local-only, MCP-native. Wraps chopratejas/headroom. |
| `slops-markitdown` | Claude (plans), Codex (runs conversion) | `Layer 0` | Convert PDF/PPTX/DOCX/XLSX/HTML/audio/images/EPUB → Markdown for LLM consumption. Wraps microsoft/markitdown. Local-only by default; Azure CU and Doc Intelligence forbidden by sovereignty rule. |
| `slops-taste` | Claude (selects variant + dials), Codex (applies to frontend) | `Layer 0` | Anti-slop frontend skill. Wraps Leonxlnx/taste-skill — tunable layout/motion/density dials, plus minimalist + soft + brutalist variants. Pairs with slops-design-system-pack and slops-image-prompt. |

## Analytical Skills

**Invoke: Claude**

Claude should be used when the task requires reasoning, planning, review, documentation, doctrine, or architectural judgment.

### Context Mapping

- **Agent**: Claude
- **Use Case**: Analyzing long files, project structure, markdown docs, architecture notes, and planning documents.
- **Examples**:
  - reviewing `context.md`
  - understanding project priorities
  - mapping dependencies
  - explaining what a file does
  - identifying missing documentation
  - finding stale roadmap language

### Policy Drafting

- **Agent**: Claude
- **Use Case**: Updating operating rules, project boundaries, and agent behavior documentation.
- **Examples**:
  - updating `coo.md`
  - updating `agents.md`
  - creating skill files
  - writing standard operating procedures
  - creating Claude/Codex handoff prompts

### Structure Refactoring

- **Agent**: Claude
- **Use Case**: Improving markdown documentation clarity, organization, folder routing, and prompt structure.
- **Examples**:
  - reorganizing project docs
  - turning scattered notes into structured files
  - creating reusable templates
  - cleaning confusing instructions
  - splitting live context from deep doctrine
  - identifying which DBS layer a file belongs in

### Risk Assessment

- **Agent**: Claude
- **Use Case**: Identifying what could go wrong before implementation.
- **Examples**:
  - checking whether a task could break production
  - reviewing destructive commands
  - identifying missing backups
  - flagging unclear requirements
  - identifying auth, payment, cookie, user-data, database, or deployment risk

### Prompt Building

- **Agent**: Claude
- **Use Case**: Creating structured prompts for Claude, Codex, or other AI agents.
- **Examples**:
  - Claude planning prompts
  - Codex implementation prompts
  - review prompts
  - debugging prompts
  - skill-specific prompts
  - documentation update prompts
  - folder audit prompts

### Review and Validation

- **Agent**: Claude
- **Use Case**: Reviewing completed code changes, markdown changes, or terminal results.
- **Examples**:
  - reviewing Codex summaries
  - checking whether the task matched the plan
  - identifying follow-up fixes
  - creating next-step recommendations
  - flagging scope creep
  - checking whether docs need updates

### Doctrine Extraction

- **Agent**: Claude
- **Use Case**: Turning Justin's raw founder thoughts into clear operating rules.
- **Examples**:
  - converting interview answers into product doctrine
  - defining permanent product rules
  - identifying which decisions deserve ADRs
  - separating ambition from launch scope
  - preserving founder intent without padding

### ADR Writing

- **Agent**: Claude
- **Use Case**: Capturing permanent product, architecture, business, or security decisions.
- **Examples**:
  - removing Ask Slops permanently
  - making Trade Analyzer free
  - making MVP Move paid
  - defining ESPN cookie-auth risk
  - adopting the platform adapter pattern
  - defining launch deadline decisions

### Security Review Planning

- **Agent**: Claude first, Codex second
- **Use Case**: Any work touching auth, cookies, secrets, payments, user data, dependency risk, production access, or external data rights.
- **Examples**:
  - ESPN cookie handling
  - Supabase auth changes
  - Stripe subscription changes
  - npm audit findings
  - privacy policy updates
  - user data deletion rules
  - commercial ToS risk for third-party data

### Product Boundary Definition

- **Agent**: Claude
- **Use Case**: Deciding what belongs in the product, what is deferred, and what should be removed.
- **Examples**:
  - removing Ask Slops
  - keeping Start/Sit as a sub-engine
  - deciding Trade Analyzer free limits
  - deciding MVP Move launch requirements
  - deciding when waiver brief can be deferred

### Brand Doctrine

- **Agent**: Claude
- **Use Case**: Defining product voice, naming standards, and rebrand exploration rules.
- **Examples**:
  - updating `brand_voice.md`
  - maintaining `rebrand_notes.md`
  - reviewing product copy
  - preventing chatbot-like language
  - preventing generic fantasy-app positioning
  - preserving institutional but human voice

### Founder Interview Mode

- **Agent**: Claude
- **Use Case**: Asking hard questions when product direction, identity, monetization, roadmap priorities, or folder authority are unclear.
- **Examples**:
  - defining launch scope
  - clarifying founder doctrine
  - deciding what gets cut
  - challenging drift
  - turning instinct into rules
  - deciding whether a file belongs at `Layer 0` (SLOPS), `Layer 1` (Slops Saloon), or `Layer 2` (Corvus)

## Execution Skills

**Invoke: Codex**

Codex should be used when the task requires writing code, editing files, running commands, testing, or interacting with the project repository.

Codex should not be used to make unapproved business, security, architectural, or folder-authority decisions.

### Code Generation

- **Agent**: Codex
- **Use Case**: Writing application code, components, API routes, scripts, and config files.
- **Examples**:
  - React/Vite components
  - Express routes
  - API clients
  - utility functions
  - database scripts
  - Docker files
  - adapter files

### Automated Procedures

- **Agent**: Codex
- **Use Case**: Running repeatable terminal-based workflows.
- **Examples**:
  - installing dependencies
  - running migrations
  - running Docker builds
  - running lint checks
  - running tests
  - starting local dev servers
  - checking npm audit

### Git Operations

- **Agent**: Codex
- **Use Case**: Handling version-control workflows after the task is approved.
- **Examples**:
  - checking repo status
  - creating branches
  - reviewing diffs
  - preparing commits
  - comparing files
  - finding accidental root files
  - checking whether files were deleted

### Debugging

- **Agent**: Codex, with Claude support if needed
- **Use Case**: Diagnosing and fixing errors from logs, stack traces, failed builds, or broken routes.
- **Examples**:
  - npm errors
  - Docker errors
  - missing dependency errors
  - broken imports
  - failed routes
  - environment variable issues
  - failing tests

### File Editing

- **Agent**: Codex
- **Use Case**: Applying specific approved changes to files.
- **Examples**:
  - updating `package.json`
  - editing `.env.example`
  - adding components
  - updating API routes
  - creating markdown files
  - moving files into correct folders
  - restoring deleted documentation files

### Verification

- **Agent**: Codex
- **Use Case**: Running commands that prove work is correct.
- **Examples**:
  - `npm test`
  - `npm run build`
  - `npm run lint`
  - `docker compose config`
  - route smoke tests
  - adapter unit tests
  - npm audit checks
  - `git status`
  - `git diff`

## Shared Workflows

Some tasks require Claude and Codex working together.

### Feature Development

- **Planning Agent**: Claude
- **Execution Agent**: Codex
- **Workflow**:
  1. Claude defines the feature scope.
  2. Claude writes a Codex-ready implementation plan.
  3. Codex implements the safe unit of work.
  4. Codex runs verification.
  5. Claude reviews results.

### Documentation Updates

- **Planning Agent**: Claude
- **Execution Agent**: Codex, if files must be edited directly
- **Workflow**:
  1. Claude drafts or reviews the document content.
  2. Justin approves or adjusts.
  3. Codex writes the file.
  4. Codex reports changed files.
  5. Claude reviews for clarity and consistency.

### Skill Creation or Skill Editing

- **Planning Agent**: Claude
- **Skill**: `slops-skill-author`
- **Execution Agent**: Codex, if files must be written locally
- **Workflow**:
  1. Claude determines whether the request is a new skill, skill edit, audit, split, or normalization.
  2. Claude uses the master template.
  3. Claude drafts the skill file.
  4. Justin approves.
  5. Codex writes the skill file and updates index paths only if approved.

### Agent Creation or Agent Editing

- **Planning Agent**: Claude
- **Skill**: `slops-onboarding-agent` for imported division review, then `slops-agent-author` for wrapper creation and RBAC normalization
- **Execution Agent**: Codex, if files must be written locally
- **Workflow**:
  1. Claude uses `slops-onboarding-agent` to review one imported division, assign recommended statuses, and flag RBAC risks.
  2. Claude uses `slops-agent-author` to create or normalize candidate wrapper files with least-privilege permissions.
  3. Claude proposes `AGENT_INDEX.md` updates but does not apply them without Justin approval.
  4. Justin approves.
  5. Codex writes or moves files only after approval.

### Pre-Build Research

- **Planning / Research Agent**: Claude or ChatGPT
- **Skill**: `pre-build-research`
- **Execution Agent**: Codex only after research is complete
- **Workflow**:
  1. Research external APIs, data sources, or third-party integrations.
  2. Compare open/free, best value, and best overall options.
  3. Identify ToS, auth, pricing, rate limits, complexity, and implementation risk.
  4. Recommend the specific source to build against.
  5. Then write a Codex-ready implementation prompt.

### Infrastructure Changes

- **Planning Agent**: Claude
- **Execution Agent**: Codex
- **Approval**: Justin required
- **Workflow**:
  1. Claude identifies risks.
  2. Claude creates a cautious plan.
  3. Justin approves.
  4. Codex executes only approved commands.
  5. Codex reports terminal results.
  6. Claude reviews next steps.

### Security / Privacy Changes

- **Planning Agent**: Claude
- **Execution Agent**: Codex
- **Approval**: Justin required
- **Workflow**:
  1. Claude identifies user-data risk.
  2. Claude defines the security question.
  3. Codex inspects implementation details.
  4. Claude reviews findings.
  5. Justin approves the direction.
  6. Codex implements only the approved change.
  7. Verification is required.

### Product Doctrine Updates

- **Planning Agent**: Claude
- **Execution Agent**: Codex, if file edits are needed
- **Workflow**:
  1. Justin explains intent.
  2. Claude asks hard questions if needed.
  3. Claude extracts doctrine.
  4. Claude identifies affected files.
  5. Codex applies the approved edits.
  6. Claude reviews for consistency.

## Skill Routing Rules

Use Claude when the task starts with:

- "Plan..."
- "Review..."
- "Explain..."
- "Design..."
- "Create a prompt..."
- "Analyze..."
- "What should we do..."
- "Help me think through..."
- "Make this clearer..."
- "Turn my thoughts into doctrine..."
- "Update the OS docs..."
- "Create an ADR..."
- "Challenge this decision..."
- "Define the product boundary..."
- "Help me decide what belongs in launch..."
- "Review this for founder drift..."
- "Create a skill..."
- "Create an agent..."
- "Classify this folder..."
- "Which layer should this live in..."

Use Codex when the task starts with:

- "Install..."
- "Run..."
- "Fix this error..."
- "Edit this file..."
- "Create this component..."
- "Commit..."
- "Move these files..."
- "Check the repo..."
- "Start the server..."
- "Apply these documentation updates..."
- "Create these files..."
- "Run the tests..."
- "Fix the audit issue..."
- "Update the adapter..."
- "Verify the build..."
- "Restore this deleted file..."

When unsure, start with Claude.

## Special Routing Rules

| Trigger phrase | Route | Note |
|---|---|---|
| `baseline math \| nflverse \| proprietary math \| ADP math \| Omen math` | `Blueprints/playbooks/proprietary-math-stack-playbook.md` | Approved doctrine: nflverse owns baseline math; Slops owns the opinion layer. |
| `STRATEGY.md \| product strategy anchor` | `Blueprints/patterns/STRATEGY-md-pattern.md` | Reusable product strategy anchor pattern; not an active skill. |

### Auth, Payment, Secrets, Cookies, or User Data

Start with Claude.

Justin approval required before Codex executes.

### Production or Deployment

Start with Claude.

Justin approval required before Codex executes.

### Paid Dependencies

Start with Claude.

Justin approval required.

### External APIs, Data Sources, or Third-Party Integrations

Start with `pre-build-research`.

Do not write the Codex implementation prompt until the research identifies the recommended source, ToS situation, auth requirements, pricing/rate limits, and implementation gotchas.

### ESPN Cookie Auth

Start with Claude.

Security review required.

Justin approval required.

### Skills and Agents

Start with Claude.

Use `slops-skill-author` for skills.

Use `slops-onboarding-agent` before `slops-agent-author` when reviewing imported agent divisions for promotion.

Use `slops-agent-author` for agents.

Imported agents are not active until reviewed and indexed.

### Folder Moves Across DBS Layers

Start with Claude.

Codex may audit and recommend moves.

Codex may execute moves only after Justin and ChatGPT/Claude approve the recommendation.

### MVP Move

Start with Claude.

Do not build end-to-end in one task.

### Trade Analyzer

Start with Claude for product logic.

Use Codex for implementation and verification.

### Rebrand Work

Start with Claude.

Do not let rebrand exploration interrupt launch execution.

### Knowledge Graph / Cross-Layer Map

Start with `slops-graphify` when the request is to map how things connect, build a knowledge graph, see Corvus from SLOPS OS (or vice versa), or cut re-anchoring cost with a persistent map.

graphify is an external tool: detect-not-install. Justin runs the install; output routes to `References/graphify/`.

### Design Documentation

Start with `design-md-author` when creating or reviewing `design.md` files.

Use `slops-context-markdown` for general DBS cleanup.

Use `slops-prompt-generator` only after the design direction is approved and a runnable implementation prompt is needed.
