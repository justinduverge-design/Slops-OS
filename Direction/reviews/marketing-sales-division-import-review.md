# Marketing And Sales Division Import Review

Date: 2026-05-23
Reviewer: Codex / slops-onboarding-agent
Source folders:

- `Blueprints\agents\_imported\__marketing_division`
- `Blueprints\agents\_imported\__sales_division`

## Context

The imported Marketing and Sales Division files remain non-authoritative until promoted through `slops-agent-author` review and recorded in `Blueprints\agents\AGENT_INDEX.md`.

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

## Marketing Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `marketing-content-creator.md` | candidate | yes | medium | Useful for launch copy, editorial calendars, scripts, brand storytelling, and content briefs. Must not publish, impersonate users, run campaigns, or make final brand claims. |
| `marketing-social-media-strategist.md` | candidate | yes | medium-high | Useful as the umbrella social strategy wrapper. Must not post, buy ads, send InMail, activate employee advocacy, or run crisis comms without approval. |
| `marketing-reddit-community-builder.md` | candidate, restricted | yes | medium-high | Good fit for fantasy-football community strategy and subreddit research. Must not post, comment, vote, DM, manipulate karma, run Reddit ads, or handle reputation incidents autonomously. |
| `marketing-video-optimization-specialist.md` | candidate | yes | medium | Useful for YouTube/video packaging, retention notes, titles, descriptions, chapters, and thumbnail concepts. Must not access YouTube Studio, publish, monetize, or edit live metadata. |
| `marketing-app-store-optimizer.md` | reference-only | no for now | medium | Mobile/app-store specific. Keep as reference until Slops has an app store launch path. ASO analytics, store listings, and A/B testing would require external-account approval. |
| `marketing-instagram-curator.md` | reference-only | no for now | medium-high | Overlaps Social Media Strategist and Design/Brand agents. Commerce, shopping tags, influencer work, and posting make it too platform-operational for now. |
| `marketing-tiktok-strategist.md` | reference-only | no for now | medium-high | Overlaps Social Media Strategist and Video Optimization. Creator partnerships, TikTok ads, trend use, and brand-safety risk need later approval. |
| `marketing-twitter-engager.md` | reference-only | no for now | medium-high | Overlaps Social Media Strategist. Real-time engagement, crisis response, and posting on Justin/founder voice are too risky without explicit operating rules. |
| `marketing-carousel-growth-engine.md` | do-not-activate | no | high | Directly conflicts with RBAC: autonomous publishing, Gemini/API credentials, Upload-Post API, analytics fetching, self-scheduling, public posts, and "zero confirmation" behavior. Salvage only as reference for a non-publishing carousel brief generator. |

## Sales Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `sales-discovery-coach.md` | candidate | yes | medium | Useful for discovery question design, call prep, and qualification templates. Must not join calls, access recordings, or process prospect/customer data without approval. |
| `sales-deal-strategist.md` | candidate, restricted | yes | medium-high | Useful for MEDDPICC scoring, deal-risk review, and win-plan drafts. Must not alter forecasts, commit deals, direct reps, or make pricing/legal commitments. |
| `sales-outbound-strategist.md` | candidate, restricted | yes | high | Useful for ICP, signal taxonomy, and sequence design. Must not scrape leads, send outreach, enroll prospects, use CRM, use LinkedIn/InMail, or automate follow-ups. |
| `sales-proposal-strategist.md` | candidate, restricted | yes | medium-high | Useful for proposal structure, win themes, executive summaries, and boilerplate critique. Must not submit proposals, quote pricing, negotiate terms, or make legal/compliance representations. |
| `sales-pipeline-analyst.md` | candidate, restricted | yes | high | Useful for pipeline-health templates and analysis of approved/exported data. Must not connect to CRM, mutate stages, forecast official revenue, or process customer data without approval. |
| `sales-account-strategist.md` | candidate, restricted | yes | high | Useful later for QBR templates, account health review, expansion planning, and churn-risk framing. Must not access customer usage data, contact customers, negotiate renewals, or recommend contract/pricing changes without approval. |
| `sales-engineer.md` | candidate, restricted | yes, narrow | high | Useful as a technical sales/advisory wrapper for demo narratives and POC scoping drafts only. Must not own solution architecture, implementation, security approval, API/integration design, POC execution, or engineering commitments. |
| `sales-coach.md` | reference-only | no for now | medium | Strong methodology, but no sales team/rep management layer exists yet. Overlaps Discovery Coach, Deal Strategist, and Pipeline Analyst. Keep as reference until sales leadership workflows exist. |
| `sales-outreach.md` | do-not-activate | no | high | Broadly operationalizes cold emails, LinkedIn touches, calls, voicemail, proposal sending, pipeline stages, and contracts. Use `sales-outbound-strategist` for safe strategy instead. |

## RBAC And Overlap Risks

- External-account risk: Marketing channel agents imply LinkedIn, Twitter/X, Reddit, Instagram, TikTok, YouTube, app stores, Upload-Post, Gemini, and analytics accounts. No wrapper should receive credentials or external write access by default.
- Publishing risk: Marketing agents must draft calendars, briefs, copy, scripts, and strategy only. Posting, commenting, voting, sending DMs, changing metadata, or publishing public content requires explicit Justin approval.
- Paid-spend risk: Social ads, Reddit ads, LinkedIn ads, TikTok ads, influencer spend, app-store A/B testing, and creator partnerships are financial/external mutations. Treat as Tier 5 until approved.
- Brand/voice risk: Social Media Strategist, Twitter Engager, Reddit Community Builder, TikTok Strategist, Instagram Curator, and Content Creator all can speak as the brand. Justin remains final brand voice authority; Design/Brand wrappers should review brand-sensitive claims.
- Crisis/reputation risk: Twitter Engager, Reddit Community Builder, TikTok Strategist, and Social Media Strategist include crisis response. Crisis comms should be escalation-only, never autonomous.
- Privacy/customer-data risk: Sales agents often assume CRM, call recordings, account usage data, customer contacts, prospect lists, and pipeline data. Wrappers must operate on user-provided/sanitized exports only unless Justin approves data access.
- Outreach/spam risk: Sales Outreach and Outbound Strategist include cold email, LinkedIn, calls, voicemail, and sequences. Drafting is safe; sending or enrolling prospects is not.
- Revenue authority risk: Deal Strategist, Pipeline Analyst, Account Strategist, and Proposal Strategist imply forecasts, pricing, renewals, commitments, and negotiation. They can recommend; Justin retains commercial decision authority.
- Engineering overlap risk: Sales Engineer crosses into solution architecture, integrations, security review, API design, and POC execution. Any wrapper must be advisory and route implementation/architecture to Codex and approved backend/frontend owners.
- Role overlap risk: Marketing channel agents overlap with `marketing-social-media-strategist`; Sales Coach overlaps with Discovery Coach, Deal Strategist, and Pipeline Analyst. Prefer fewer umbrella wrappers first.

## Wrapper Queue

Recommended Marketing wrappers:

1. `marketing-content-creator` as `Blueprints\agents\marketing\marketing-content-creator.md`
2. `marketing-social-media-strategist` as `Blueprints\agents\marketing\marketing-social-media-strategist.md`
3. `marketing-reddit-community-builder` as `Blueprints\agents\marketing\marketing-reddit-community-builder.md`
4. `marketing-video-optimization-specialist` as `Blueprints\agents\marketing\marketing-video-optimization-specialist.md`

Do not create wrappers yet for App Store Optimizer, Instagram Curator, TikTok Strategist, or Twitter Engager. Their useful ideas can flow through the Social Media Strategist wrapper. Do not activate Carousel Growth Engine.

Recommended Sales wrappers:

1. `sales-discovery-coach` as `Blueprints\agents\sales\sales-discovery-coach.md`
2. `sales-deal-strategist` as `Blueprints\agents\sales\sales-deal-strategist.md`
3. `sales-outbound-strategist` as `Blueprints\agents\sales\sales-outbound-strategist.md`
4. `sales-proposal-strategist` as `Blueprints\agents\sales\sales-proposal-strategist.md`
5. `sales-pipeline-analyst` as `Blueprints\agents\sales\sales-pipeline-analyst.md`
6. `sales-account-strategist` as `Blueprints\agents\sales\sales-account-strategist.md`
7. `sales-engineer-advisor` as `Blueprints\agents\sales\sales-engineer-advisor.md`

Do not create wrappers yet for Sales Coach. Do not activate Sales Outreach.

## Baseline Wrapper Constraints

All Marketing and Sales wrappers should start as `candidate`, Tier 2 max:

- Read, analyze, draft, and recommend only.
- May write draft markdown only when explicitly assigned.
- May write to `Blueprints\prompts\`, `Direction\reviews\`, and `Solutions\reports\`.
- Must not write to `ssffmvp\src\`, `ssffmvp\frontend\`, `ssffmvp\client\`, `ssffmvp\sql\`, `ssffmvp\scripts\`, `ssffmvp\test\`, `Archive\`, `.env`, `.key`, credentials, secrets, tokens, cookies, production, deployment, Docker, GitHub Actions, auth, payment, or database files.
- Must not access or mutate external accounts, CRMs, ad platforms, social accounts, app stores, analytics dashboards, email tools, contact databases, call recordings, payment systems, or customer-data systems.
- Must not send emails, DMs, comments, posts, ads, proposals, contracts, invoices, or public statements.
- Must not make final decisions on brand voice, launch scope, pricing, discounts, revenue forecasts, customer commitments, legal terms, compliance claims, or platform strategy.
- Escalates to Justin for commercial, brand, legal, spend, customer-data, and public-communication decisions.
- Escalates to Claude for strategy, planning, design/brand review, and wrapper doctrine.
- Escalates to Codex only for separately approved implementation or file edits.

## Next Safe Step

Create the recommended Marketing and Sales wrapper files under `Blueprints\agents\marketing\` and `Blueprints\agents\sales\`, then update `AGENT_INDEX.md` only after Justin/Claude approval.
