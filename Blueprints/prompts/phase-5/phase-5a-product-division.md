# Phase 5A — Product Division Agent Review
## Prompt for: Claude (with slops-agent-author skill)
## Operation type: Review, select, and create SLOPS wrapper files
## Date drafted: 2026-05-23
## Prerequisite: Phases 1–3B must be complete (they are)

---

## Your Role

You are Claude operating as SLOPS Agent Author.

This is the first division in the Phase 5 imported agent promotion pipeline.

Your job is to:
1. Read all 5 agent files in the Product Division
2. Select the most relevant agents for current SLOPS/Corvus launch needs
3. Create SLOPS doctrine wrapper files for selected agents
4. Write a division review summary
5. Propose AGENT_INDEX.md updates (do not apply them yet — present for Justin approval)

---

## Read First

Before touching any agent file, read:

```text
Blueprints\agents\AGENT_INDEX.md
Blueprints\skills\slops-agent-author\SKILL.md
Solutions\reports\dbs-migration\PHASE_5_PLAN.md
```

---

## Division: Product

**Folder**: `Blueprints\agents\_imported\__product_division\`

**Files** (read all 5 before making any selection decisions):

```text
product-behavioral-nudge-engine.md
product-feedback-synthesizer.md
product-manager.md
product-sprint-prioritizer.md
product-trend-researcher.md
```

---

## Selection Criteria

For each agent, answer:

1. **Relevance**: Is this role directly useful for Corvus launch, ssffmvp MVP, or SLOPS OS build-out in the next 90 days?
2. **Risk**: Does this agent's role description imply write access to production, secrets, payments, auth, databases, or app source? If yes, flag it.
3. **Overlap**: Does Claude or an existing SLOPS skill already cover this work? If yes, defer.
4. **Wrapper feasibility**: Can a clear allowed/denied scope be written for this agent without ambiguity?

---

## Output Required

### Part 1: Division Review Summary

Write to:
```text
Solutions\reports\dbs-migration\phase-5-reviews\product-division-review.md
```

Include:
- Each agent reviewed
- Recommended status (candidate / do-not-activate / reference-only)
- Reason for recommendation
- Any RBAC flags or concerns

### Part 2: SLOPS Wrapper Files

For each agent selected as `candidate`, create the wrapper file at:

```text
Blueprints\agents\product\<agent-name>.md
```

Use the Required Agent File Shape from `slops-agent-author\SKILL.md`:

```markdown
---
name: <agent-name>
status: candidate
division: Product
source: Blueprints\agents\_imported\__product_division\<filename>.md
---

# <Agent Display Name>

## Status
candidate

## Division
Product

## DBS Layer
Global Blueprint

## Purpose
<what this agent is for in SLOPS context>

## Allowed Work
- <task>

## Denied Work
- No write access to ssffmvp\src\, sql\, .env, secrets, or credentials
- No production, deployment, auth, payments, or billing changes
- <role-specific denials>

## Required Read-First Files
- DBS_INDEX.md
- Blueprints\agents\AGENT_INDEX.md
- <relevant files per role>

## May Invoke Skills
- <only listed SLOPS canonical skills>

## Tool Tier Cap
Tier 2 (read + draft — no direct file writes without Claude or Codex approval)

## May Write To
- Blueprints\prompts\
- Direction\reviews\
- (drafts only — Codex applies approved changes)

## Must Not Write To
- ssffmvp\src\
- ssffmvp\sql\
- .env, .key, credentials
- Archive\
- Blueprints\agents\_imported\

## Approval Required For
- Any file edit outside Blueprints\prompts\ or Direction\reviews\
- Roadmap changes
- External vendor recommendations

## Escalates To
- Justin (product decisions, scope calls)
- Claude (planning review, RBAC questions)

## Notes
Source: Blueprints\agents\_imported\__product_division\<filename>.md
<import notes or limitations>
```

### Part 3: Proposed AGENT_INDEX.md Updates

Do NOT edit AGENT_INDEX.md yet. Instead, present the proposed changes for Justin's approval in your review summary.

Format:

```markdown
## Proposed AGENT_INDEX.md Changes

### Section 4 Status Updates
| Agent | Division | Current Status | Proposed Status | Reason |
|-------|----------|----------------|-----------------|--------|

### New Rows for Promoted Candidates
| Agent | Division | Path | Status | Layer | Allowed Use | May Invoke Skills | Approval Required |
|-------|----------|------|--------|-------|-------------|-------------------|-------------------|
```

---

## Scope Constraints

- Read only the files named above
- Do not open any `ssffmvp\src\`, `sql\`, `.env`, `.key`, or credential files
- Do not run any terminal commands
- Do not edit `AGENT_INDEX.md` until Justin approves the proposed changes
- Do not activate any agent — only promote to `candidate`
- Flag any agent whose source file describes broad write authority, production access, or payment capabilities as `do-not-activate` pending security review

---

## Completion Checklist

- [ ] All 5 product division agent files read
- [ ] Each agent assigned a recommended status with reasoning
- [ ] Division review summary written to `Solutions\reports\dbs-migration\phase-5-reviews\product-division-review.md`
- [ ] SLOPS wrapper files written for all `candidate` agents at `Blueprints\agents\product\`
- [ ] Proposed AGENT_INDEX.md changes presented (not applied)
- [ ] Any RBAC concerns flagged explicitly
- [ ] Justin review requested before proceeding to Phase 5B (Design Division)

---

## After This Prompt

**Wait for Justin's approval.**

Once approved:
- Apply the AGENT_INDEX.md changes
- Confirm wrapper file paths
- Proceed to Phase 5B (Design Division): `Blueprints\prompts\phase-5\phase-5b-design-division.md`

---

## Summary

| Division | Agents | Target Output | Next Step |
|----------|--------|---------------|-----------|
| Product | 5 | 2–5 candidate wrapper files + division review | Justin approval → Phase 5B |
