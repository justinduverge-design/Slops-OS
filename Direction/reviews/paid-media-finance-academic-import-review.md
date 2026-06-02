# Paid Media, Finance, And Academic Import Review

Date: 2026-05-23
Reviewer: Codex / slops-onboarding-agent
Source folders:

- `Blueprints\agents\_imported\__paid_media_division`
- `Blueprints\agents\_imported\__finance_division`
- `Blueprints\agents\_imported\__academic_division`

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

## Paid Media Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `paid-media-creative-strategist.md` | candidate, restricted | yes | high | Useful for ad-copy briefs, creative test plans, and message-match reviews. Must not deploy ad variations, edit assets/extensions, access platform data, or make regulated ad claims. |
| `paid-media-search-query-analyst.md` | candidate, restricted | yes | high | Useful for analyzing user-provided/sanitized search query exports and drafting negative keyword recommendations. Must not connect to ad accounts or deploy negative keywords. |
| `paid-media-tracking-specialist.md` | candidate, restricted | yes, narrow | high | Useful for tracking architecture review checklists and measurement plans. Must not edit GTM, pixels, CAPI, server-side tags, event schemas, or customer data flows. |
| `paid-media-auditor.md` | candidate, restricted | yes, narrow | high | Useful for manual audit frameworks against screenshots/exports. Must not use Google/Microsoft/Meta APIs, pull live data, edit accounts, or certify performance lift. |
| `paid-media-paid-social-strategist.md` | reference-only | no for now | high | Heavy overlap with Marketing Social Media Strategist and paid platform operations. Keep as source material until a paid acquisition strategy is approved. |
| `paid-media-programmatic-buyer.md` | reference-only | no for now | high | Programmatic/DSP buying, partner media, ABM display, and managed placements imply external spend and contracts. Keep reference-only. |
| `paid-media-ppc-strategist.md` | do-not-activate | no | high | Explicitly says to execute campaign creation, bid changes, budget reallocation, and negative keyword deployment directly. Conflicts with Tier 5 ad spend/platform mutation controls. |

## Finance Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `finance-financial-analyst.md` | candidate, restricted | yes | high | Useful for sanitized financial model templates, variance analysis drafts, and decision-support memos. Must not access accounting systems, approve assumptions, or make official forecasts. |
| `finance-fpa-analyst.md` | candidate, restricted | yes | high | Useful for budget/planning templates and scenario framing. Must not set budgets, approve hiring plans, own forecasts, or change financial targets. |
| `finance-bookkeeper-controller.md` | reference-only | no for now | high | Accounting operations, reconciliations, close process, controls, journal entries, and audit readiness require real books and segregation of duties. |
| `finance-investment-researcher.md` | reference-only | no for now | high | Investment research can imply financial advice and portfolio decisions. Keep as reference for research structure only. |
| `finance-tax-strategist.md` | do-not-activate | no | high | Tax optimization, filings, elections, transfer pricing, audit defense, and jurisdiction-specific tax advice are regulated and high-stakes. Use only licensed human/professional review. |

## Academic Classification

| Imported agent | Recommended status | Wrapper decision | Risk level | Notes |
|---|---|---:|---|---|
| `academic-historian.md` | candidate | yes | low-medium | Useful for mythic/rebrand research, historical texture, source caveats, and anachronism checks. Must cite uncertainty and avoid invented authority. |
| `academic-anthropologist.md` | candidate | yes | low-medium | Useful for cultural coherence, ritual systems, belief structures, and avoiding shallow appropriation in the Slops mythic identity. Must not make claims about living cultures without sources/context. |
| `academic-narratologist.md` | candidate | yes | low | Useful for story structure, omen mythology, product narrative, and lore consistency. Low operational risk. |
| `academic-geographer.md` | reference-only | no for now | low | Useful for worldbuilding if the brand mythology expands, but not immediately necessary for current product/backend work. |
| `academic-psychologist.md` | reference-only | no for now | medium | Useful for fictional character motivation only. Clinical framing can drift into mental-health advice, diagnosis, or user profiling; keep reference-only. |

## RBAC And Overlap Risks

- Ad spend/platform mutation risk: Paid media agents mention Google Ads, Microsoft Ads, Meta, LinkedIn, TikTok, Amazon, DV360, DSPs, pixels, CAPI, budgets, bids, account structure, and campaign deployment. Wrappers must not access or mutate ad platforms.
- Financial impact risk: PPC, paid social, programmatic, and creative testing can burn money quickly. Budget allocation, bid strategy, buying, partner placements, and campaign activation require Justin approval.
- Tracking/privacy risk: Tracking Specialist, Paid Social Strategist, and Auditor touch pixels, GA4, GTM, Meta CAPI, LinkedIn Insight Tag, offline conversions, CRM uploads, and attribution. These affect privacy, consent, and customer-data handling.
- Regulated ad claims risk: Paid media creative and audit work can touch finance, healthcare, education, legal, gambling, or other regulated ad categories. Claims need brand/legal review.
- Finance authority risk: Finance agents assume access to books, bank/payment data, payroll, invoices, taxes, forecasts, budgets, and investment assumptions. Candidate wrappers must use user-provided sanitized inputs only.
- Tax/legal risk: Tax Strategist is too high-stakes to activate. Tax positions, filings, elections, entity structure, audit defense, and transfer pricing require qualified professional judgment.
- Investment advice risk: Investment Researcher can imply securities recommendations. It should not produce personalized investment advice, portfolio decisions, or trade recommendations.
- Academic source risk: Historian, Anthropologist, Geographer, and Psychologist can make claims about cultures, periods, people, or behavior. Wrappers must cite uncertainty, avoid stereotyping, and avoid clinical diagnosis.
- Overlap risk: Paid media overlaps Marketing and Analytics; Finance overlaps Support Finance Tracker; Academic overlaps Brand/Design/Marketing lore work. Prefer narrow wrappers rather than one broad division agent.

## Wrapper Queue

Recommended Paid Media wrappers:

1. `paid-media-creative-strategist` as `Blueprints\agents\paid-media\paid-media-creative-strategist.md`
2. `paid-media-search-query-analyst` as `Blueprints\agents\paid-media\paid-media-search-query-analyst.md`
3. `paid-media-tracking-specialist` as `Blueprints\agents\paid-media\paid-media-tracking-specialist.md`
4. `paid-media-auditor` as `Blueprints\agents\paid-media\paid-media-auditor.md`

Recommended Finance wrappers:

1. `finance-financial-analyst` as `Blueprints\agents\finance\finance-financial-analyst.md`
2. `finance-fpa-analyst` as `Blueprints\agents\finance\finance-fpa-analyst.md`

Recommended Academic wrappers:

1. `academic-historian` as `Blueprints\agents\academic\academic-historian.md`
2. `academic-anthropologist` as `Blueprints\agents\academic\academic-anthropologist.md`
3. `academic-narratologist` as `Blueprints\agents\academic\academic-narratologist.md`

Do not create wrappers for `paid-media-ppc-strategist` or `finance-tax-strategist`. Keep reference-only agents readable as source material only.

## Baseline Wrapper Constraints

All wrappers from this pass should start as `candidate`, Tier 2 max:

- Read, analyze, draft, and recommend only.
- May write draft markdown only when explicitly assigned.
- May write to `Blueprints\prompts\`, `Direction\reviews\`, and `Solutions\reports\`.
- Must not write to `slops-saloon\src\`, `slops-saloon\frontend\`, `slops-saloon\client\`, `slops-saloon\sql\`, `slops-saloon\scripts\`, `slops-saloon\test\`, `Archive\`, `.env`, `.key`, credentials, secrets, tokens, cookies, production, deployment, Docker, GitHub Actions, auth, payment, database, ad-platform, analytics-platform, accounting, payroll, or tax files.
- Must not access or mutate Google Ads, Microsoft Ads, Meta, LinkedIn, TikTok, Amazon Ads, DV360, DSPs, GTM, GA4, CRMs, accounting systems, bank accounts, payroll systems, tax software, portfolio tools, or customer-data systems.
- Must not launch ads, change budgets, change bids, deploy keywords, deploy pixels, upload audiences, submit tax filings, approve budgets, issue forecasts, recommend trades, send financial reports externally, or make final legal/tax/financial decisions.
- Escalates to Justin for spend, budget, financial, tax, legal, investment, regulated-claims, customer-data, public-communication, and platform-access decisions.
- Escalates to Claude for planning, doctrine, brand/lore review, and wrapper/index updates.
- Escalates to Codex only for separately approved implementation or file edits.

## Next Safe Step

Create the recommended wrapper files under their division folders, then update `AGENT_INDEX.md` only after Justin/Claude approval.
