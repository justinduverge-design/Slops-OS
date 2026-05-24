# Phase 5A Product Division Agent Review

## Executive Summary

Phase 5A reviewed all five imported Product Division agents against SLOPS OS, ssffmvp MVP, and Corvus launch needs. Two agents are recommended as `candidate` with SLOPS doctrine wrappers: `product-manager` and `product-sprint-prioritizer`. Both are useful in the next 90 days if constrained to Tier 2 draft documentation, prioritization, and recommendation work.

`product-trend-researcher` is left `reference-only` because its useful work is already largely covered by the canonical `pre-build-research` skill and it references external paid intelligence systems. `product-behavioral-nudge-engine` and `product-feedback-synthesizer` are marked `do-not-activate` pending review because they imply user data, behavioral profiling, outbound messaging, external feedback systems, or customer-data access.

## Files Read

- `Blueprints\agents\AGENT_INDEX.md`
- `Blueprints\skills\slops-agent-author\SKILL.md`
- `Solutions\reports\dbs-migration\PHASE_5_PLAN.md`
- `Blueprints\agents\_imported\__product_division\product-behavioral-nudge-engine.md`
- `Blueprints\agents\_imported\__product_division\product-feedback-synthesizer.md`
- `Blueprints\agents\_imported\__product_division\product-manager.md`
- `Blueprints\agents\_imported\__product_division\product-sprint-prioritizer.md`
- `Blueprints\agents\_imported\__product_division\product-trend-researcher.md`
- `DBS_INDEX.md`
- `Blueprints\skills\SKILL_ROUTING.md`
- `Blueprints\tools\tool-permissions.md`

Missing read-first files from root AGENTS instructions:

- `context.md`
- `roadmap.md`
- `manifesto.md`
- `handoffs\decisions.md`
- `handoffs\frontend-to-backend.md`
- `handoffs\backend-to-frontend.md`
- `CLAUDE.md`

## Agent Review Table

| Agent | Source File | Recommended Status | Relevance | Risk | Overlap | Reason |
|---|---|---|---|---|---|---|
| Behavioral Nudge Engine | `Blueprints\agents\_imported\__product_division\product-behavioral-nudge-engine.md` | do-not-activate | Medium for future onboarding/retention, low for immediate Corvus launch | High | Medium with product/UX planning | Implies behavioral profiling, user preferences, communication channels, SMS/email nudges, memory, engagement optimization, and opt-out architecture. Needs privacy, consent, user-data, and outbound-message review before any wrapper. |
| Feedback Synthesizer | `Blueprints\agents\_imported\__product_division\product-feedback-synthesizer.md` | do-not-activate | Medium once real users/support channels exist | High | Medium with Claude review and future support workflows | Original agent includes WebFetch/WebSearch/Read/Write/Edit plus surveys, support tickets, reviews, social media monitoring, NPS, dashboards, and customer feedback systems. This touches user/customer data and external systems. |
| Product Manager | `Blueprints\agents\_imported\__product_division\product-manager.md` | candidate | High for Corvus launch, ssffmvp MVP, PRDs, scope control, and launch planning | Medium, reduced by wrapper | Medium with Claude product planning | Useful for draft PRDs, opportunity assessments, non-goals, metrics, and trade-off docs. Wrapper limits it to Tier 2 markdown drafts and recommendations with Justin approval for roadmap or launch decisions. |
| Sprint Prioritizer | `Blueprints\agents\_imported\__product_division\product-sprint-prioritizer.md` | candidate | High for near-term launch prioritization and backlog discipline | Medium, reduced by wrapper | Medium with Product Manager and Claude planning | Useful for sprint framing, RICE scoring, dependencies, and scope trade-off notes. Wrapper denies release, deployment, feature flag, and capacity authority. |
| Trend Researcher | `Blueprints\agents\_imported\__product_division\product-trend-researcher.md` | reference-only | Medium for market and competitor analysis | Medium-high | High with `pre-build-research` | Valuable as research inspiration, but overlaps the canonical `pre-build-research` skill and references paid/external tools, social listening, competitive intelligence, and regulatory monitoring. Keep reference-only until a specific approved research task needs an agent wrapper. |

## Candidate Agents Selected

- `product-manager`: selected because Corvus launch and ssffmvp MVP need clear PRDs, opportunity assessments, non-goals, success metrics, and product trade-off documentation. The wrapper removes any binding decision authority.
- `product-sprint-prioritizer`: selected because the next 90 days need disciplined launch backlog review, sprint framing, and scope control. The wrapper keeps it draft-only and denies execution or delivery-system control.

## Deferred / Reference-Only Agents

- `product-trend-researcher`: useful reference material for market and competitor analysis, but not selected because `pre-build-research` already covers external research workflows and the imported agent references paid intelligence tools and broad monitoring systems.

## Do-Not-Activate Agents

- `product-behavioral-nudge-engine`: blocked because it implies behavioral profiling, persistent preference memory, SMS/email/in-app outbound nudges, opt-out logic, and engagement optimization. This requires privacy, consent, user-data, and outbound communication review.
- `product-feedback-synthesizer`: blocked because it implies access to surveys, support tickets, reviews, social media, NPS, customer satisfaction systems, analytics dashboards, and user/customer feedback data. This requires customer-data, privacy, and external-tool RBAC review.

## RBAC Notes

- Candidate wrappers are capped at Tier 2: read, analyze, draft, and recommend only.
- Candidate wrappers may write only draft markdown in `Blueprints\prompts\`, `Direction\reviews\`, and `Solutions\reports\` when explicitly assigned.
- Candidate wrappers must not write to app source, app runtime, SQL, tests, evals, scripts, `Archive\`, imported agent source files, or production/deployment/auth/payment/database files.
- Candidate wrappers may not access secrets, `.env`, keys, credentials, tokens, cookies, private files, customer data systems, analytics systems, paid tools, external APIs, or vendor accounts.
- Candidate wrappers may not make final roadmap, launch scope, monetization, pricing, sprint commitment, feature flag, rollback, or product strategy decisions.
- Any roadmap, launch, monetization, customer-data, paid-tool, external-vendor, or promotion decision escalates to Justin.
- Claude should review doctrine, planning, RBAC, and product-boundary questions before any candidate is promoted to `active`.
- Codex should only be used for approved filesystem edits or implementation tasks after product direction is approved.

## Wrapper Files Created

- `Blueprints\agents\product\product-manager.md`
- `Blueprints\agents\product\product-sprint-prioritizer.md`

## Proposed AGENT_INDEX.md Changes

Do not apply these changes. Present them for Justin approval only.

### Section 4 Status Updates

| Agent | Division | Current Status | Proposed Status | Reason |
|---|---|---|---|---|
| Behavioral Nudge Engine | Product | reference-only | do-not-activate | Behavioral profiling, user preference memory, outbound SMS/email/in-app nudges, and consent/privacy risk require review. |
| Feedback Synthesizer | Product | reference-only | do-not-activate | Customer/user feedback data, support tickets, reviews, surveys, social monitoring, analytics, and external-tool risk require review. |
| Product Manager | Product | reference-only | candidate | Strong near-term use for Corvus launch docs, PRDs, non-goals, success metrics, and product trade-off recommendations under Tier 2. |
| Sprint Prioritizer | Product | reference-only | candidate | Strong near-term use for backlog discipline, sprint framing, RICE scoring, dependency notes, and launch scope control under Tier 2. |
| Trend Researcher | Product | reference-only | reference-only | Useful reference, but overlaps `pre-build-research` and references paid/external market intelligence tools. |

### New Rows for Promoted Candidates

| Agent | Division | Path | Status | Layer | Allowed Use | May Invoke Skills | Approval Required |
|---|---|---|---|---|---|---|---|
| Product Manager | Product | `Blueprints\agents\product\product-manager.md` | candidate | Global Blueprint | Draft PRDs, opportunity assessments, non-goals, metrics, product trade-off notes, and implementation handoff prompts. | `slops-context-markdown`, `slops-prompt-generator`, `pre-build-research` | Roadmap, launch scope, monetization, pricing, product strategy, external vendors, user data, analytics, paid tools, active promotion. |
| Product Sprint Prioritizer | Product | `Blueprints\agents\product\product-sprint-prioritizer.md` | candidate | Global Blueprint | Draft prioritization notes, sprint goals, RICE scoring, dependency notes, scope trade-off recommendations, and approved implementation prompts. | `slops-context-markdown`, `slops-prompt-generator` | Roadmap, launch scope, monetization, pricing, product strategy, external vendors, user data, analytics, paid tools, active promotion. |

## Completion Checklist

- [x] All 5 product division agent files read
- [x] Each agent assigned a recommended status
- [x] Wrapper files created for all candidates
- [x] AGENT_INDEX.md not edited
- [x] RBAC concerns flagged
- [x] Justin review required before Phase 5B
