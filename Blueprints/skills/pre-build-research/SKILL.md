---
name: pre-build-research
description: Research external data sources, APIs, open-source options, and third-party integrations before Claude or Codex writes an implementation prompt. Use before any build task that depends on external data, API access, pricing, licensing, ToS, auth, rate limits, scraping risk, or vendor choice.
---

# Pre-Build Research

## Purpose

Use this skill before any code is written against an external service, data source, API, SDK, package, scraping target, or vendor.

The goal is to prevent Claude or Codex from building against the wrong source, discovering ToS or pricing blockers mid-build, or creating vague prompts that make the next agent guess.

This is the due diligence pass before implementation.

## When to Use

Use this skill when Justin asks:

- What API should we use?
- Find a free or open-source alternative.
- Research options for a data source.
- Compare sports data providers.
- Check what is available before Codex builds.
- Find an integration path.
- What is the best way to get this data?
- Create a Codex prompt that depends on an external API or third-party service.

Use it before writing a Codex prompt that touches:

- External APIs.
- Sports data.
- Weather data.
- Financial data.
- Authentication providers.
- OAuth providers.
- Vendor SDKs.
- Data ingestion.
- Scraping or reverse-engineered endpoints.
- Paid services or freemium services.
- Open-source packages that may have licensing or maintenance risk.

## Do Not Use

Do not use this skill to:

- Implement code.
- Run terminal commands.
- Modify app files.
- Choose a paid vendor without Justin approval.
- Recommend scraping when ToS prohibits it.
- Treat hobby/personal access as commercial approval.
- Skip pricing, ToS, auth, or rate-limit checks.
- Write the final implementation prompt before the research recommendation is complete.

## DBS Layer Routing

Default layer:

```text
0-OS
Blueprints\skills\pre-build-research\SKILL.md
```

Research outputs should be routed by scope:

```text
0-OS / Slops Saloon:
References\research
References\patterns
Direction\reviews
Blueprints\prompts

1-slops-saloon:
slops-saloon\References\research
slops-saloon\Direction\reviews
slops-saloon\corvus\Blueprints\prompts

Layer 2 (corvus):
slops-saloon\corvus\References\research
slops-saloon\corvus\Direction\reviews
slops-saloon\corvus\Blueprints\prompts
```

Use the lowest layer that safely contains the research.

If the research is reusable across future Slops Saloon products, route it to `0-OS`.

If it is specific to slops-saloon, route it to `1-slops-saloon`.

If it is specific to Corvus runtime behavior, route it to `2-Corvus`.

## Priority Order

Evaluate every candidate through this lens, in order:

1. **Open source / free**
   - No cost.
   - Permissive license.
   - No auth or simple API key.
   - Community-maintained data.
   - Commercial use is allowed or clearly low-risk.

2. **Best value**
   - Low cost relative to quality.
   - Reliable uptime.
   - Good coverage.
   - Reasonable rate limits.
   - Clear commercial ToS.

3. **Best overall**
   - Gold standard regardless of cost.
   - Useful as the ceiling, even if out of reach today.

## Research Process

### Step 1: Frame the Question

Extract or ask for:

- Exact data or capability needed.
- App/project layer: `0-OS`, `1-slops-saloon`, or `2-Corvus`.
- Current stack.
- Existing integrations that can be reused.
- Usage volume expectations.
- Required freshness.
- Commercial-use needs.
- Hard constraints such as no scraping, no paid tools, no OAuth, or no session cookies.

Use specific phrasing.

Prefer:

```text
ADP for fantasy football PPR leagues
```

over:

```text
sports data
```

### Step 2: Find Candidates

Search broadly before narrowing.

Look for:

- Official API docs.
- GitHub repos.
- Open datasets.
- SDKs and clients.
- Pricing pages.
- Terms of service.
- Rate-limit documentation.
- Developer community discussions.
- Known reliability issues.
- Maintenance signals for open-source options.

Aim for 5 to 8 candidates when possible.

Include:

- obvious options
- at least one underdog option
- at least one free/open option
- the best overall commercial option, even if it is not affordable now

### Step 3: Evaluate Each Candidate

For every candidate, determine:

| Field | What to Determine |
|---|---|
| Availability | Free, freemium, paid, quote-only, open source, scrape-only |
| Auth Required | None, API key, OAuth, session cookies, custom token |
| Commercial ToS | Explicitly permitted, unclear, restricted, prohibited |
| Pricing | Free tier, paid tier, custom quote, unknown |
| Rate Limits | Documented limit, unclear, risky, unlimited within reason |
| Data Coverage | Formats, scoring types, positions, leagues, geography, update cadence |
| Update Frequency | Real-time, daily, weekly, preseason only, manual, unknown |
| Technical Complexity | Easy, medium, hard |
| Maintenance Risk | Low, medium, high |
| Score | 1 to 5 |

### Complexity Guide

- **Easy**: documented REST endpoint, no auth or simple API key, stable schema.
- **Medium**: OAuth, batching, partial docs, SDK quirks, or adapter already partly built.
- **Hard**: scraping, reverse-engineered endpoints, session cookies, unclear rate limits, unstable schema, or ToS risk.

### Scoring Guide

- **5/5**: Free or cheap, documented, commercial ToS OK, easy to integrate, good coverage.
- **4/5**: One meaningful drawback.
- **3/5**: Paid, opaque pricing, moderate ToS risk, or notable complexity.
- **2/5**: Scrape-only, ToS concern, reverse engineering, or fragile access.
- **1/5**: No legitimate access path, active prohibition, unreliable, or not enough coverage.

Do not rate something highly because it is famous. Rate it on fit for the use case.

## Output Contract

Use this report structure:

```markdown
# <Topic> Integration Research

## Research Question

<Specific data/capability being researched.>

## Layer

0-OS | 1-slops-saloon | 2-Corvus

## Constraints

- <constraint>
- <constraint>

## Candidates Evaluated

### <Candidate Name>

- Availability:
- Auth required:
- Commercial ToS:
- Pricing:
- Rate limits:
- Data coverage:
- Update frequency:
- Technical complexity:
- Maintenance risk:
- Score:
- Notes:

## Ranked Summary

| Category | Winner | Runner-Up | Notes |
|---|---|---|---|
| Best open source / free | | | |
| Best value | | | |
| Best overall | | | |

## Actionable Recommendation

**Build against:** <specific source, endpoint, SDK, package, or API path>

**Skip:** <sources to avoid and why>

**Phase 1 now:** <lowest-risk first implementation>

**Phase 2 later:** <upgrade path when justified>

## Implementation Notes for Codex

- <endpoint/package/schema detail>
- <auth detail>
- <rate-limit/detail>
- <test fixture idea>
- <fallback behavior>

## Approval Required

- <commercial ToS approval, paid tier approval, scraping risk approval, etc.>

## Sources Checked

- <source name and link/path if available>
```

## What Not To Do

- Do not recommend prohibited scraping.
- Do not list paid services without pricing or quote-only status.
- Do not assume free means commercial-use allowed.
- Do not default to the most famous provider.
- Do not leave Codex with a vague recommendation.
- Do not skip auth, rate limits, or ToS.
- Do not bury the recommendation at the end without a clear build target.

## Corvus Context

Use this only when the research is for Corvus.

Corvus is a fantasy football decision app built on Node.js and Express.

Known context:

- Yahoo OAuth is already built.
- Sleeper public API has no auth.
- ESPN uses vault-encrypted cookies.
- ESPN cookie/session flows carry ToS and security risk.
- NFL draft season peaks August to September.
- Data freshness matters most in that window.
- Corvus is pre-revenue, so free/open options come first.
- Paid providers require Justin approval.

If the research is not for Corvus, do not force Corvus assumptions into the report.

## Prior Use Review Loop

Before updating this skill, check for:

```text
pre-build-research\notes\prior-use-review.md
```

If present, review:

- Bad recommendations from prior research.
- APIs that looked good but failed in implementation.
- ToS or pricing surprises.
- Missing fields Codex needed.
- Data sources Justin rejected.
- New preferred vendors or open-source options.

If a source repeatedly fails, add it to the skill's caution notes.

## Completion Checklist

Before finishing the research:

- [ ] Did I define the exact data need?
- [ ] Did I identify the DBS layer?
- [ ] Did I compare free/open, best value, and best overall?
- [ ] Did I check ToS/commercial use?
- [ ] Did I check auth and rate limits?
- [ ] Did I check pricing or quote-only status?
- [ ] Did I provide a specific build target?
- [ ] Did I list what to skip?
- [ ] Did I include implementation notes for Codex?
- [ ] Did I flag approvals needed?
