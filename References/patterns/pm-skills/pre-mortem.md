<!-- reference-only | source: phuryn/pm-skills (MIT) pm-execution/skills/pre-mortem | harvested 2026-06-20 | pairs with product-management:write-spec -->

# Pre-Mortem: Risk Analysis for Product Launch

## Purpose

Conduct a pre-mortem on `$ARGUMENTS`: imagine launch failure and work backward to identify real risks, distinguish them from perceived worries, and create action plans to mitigate launch-blocking issues.

## Context

A pre-mortem is a structured risk-identification exercise that forces critical thinking about what could go wrong before launch, while there's still time to act. By assuming failure, you surface hidden concerns and separate legitimate threats from overblown worries.

## Instructions

1. **Gather the PRD/plan**: read it thoroughly — product, target market, key assumptions, timeline. Web-search the competitive landscape/market if relevant.
2. **Think step by step**: imagine it launches in 14 days, then imagine it fails (no adoption, missed revenue, reputation hit). What went wrong? What did we miss? What were we overconfident about?
3. **Categorize risks**:
   - **Tigers** — real problems you personally see; evidence-based; require action.
   - **Paper Tigers** — concerns others raise but you don't believe; document to align stakeholders, don't over-invest.
   - **Elephants** — unspoken assumptions nobody is validating; investigate before launch.
4. **Classify Tigers by urgency**: Launch-Blocking (solve before launch) / Fast-Follow (within 30 days) / Track (monitor, solve if it surfaces).
5. **Action plans** for every Launch-Blocking Tiger: risk, concrete mitigation, owner (function/person), decision/completion date.
6. **Output structure**:
   ```
   ## Pre-Mortem Analysis: [Product]
   ### Tigers (Real Risks)
   ### Paper Tigers (Overblown Concerns)
   ### Elephants (Unspoken Worries)
   ### Action Plans for Launch-Blocking Tigers  (Risk / Mitigation / Owner / Due)
   ```
7. **Save** as `PreMortem-[product]-[date].md`.

## Notes

- Be honest and constructive — improve readiness, not assign blame.
- Default to "Tiger" if unsure; address risks early.
- Pull cross-functional perspectives (eng, design, GTM).
- Revisit 2-3 weeks before launch to verify mitigations are on track.
