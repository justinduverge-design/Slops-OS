<!-- reference-only | adapted from phuryn/pm-skills (MIT) pm-execution/skills/strategy-red-team/SKILL.md | reconciled 2026-06-21 | not an active SLOPS skill -->

# Strategy Red-Team Pattern

Use this reference when a strategy, roadmap, or product bet needs an adversarial pass before commitment. Pair it with the active planning or review skill; do not invoke this file as independent authority.

Source: [`phuryn/pm-skills` strategy-red-team](https://github.com/phuryn/pm-skills/blob/main/pm-execution/skills/strategy-red-team/SKILL.md), MIT licensed. The pattern below is a SLOPS adaptation, not a verbatim copy.

## Method

1. State the strategy and intended outcome in one falsifiable sentence.
2. Identify and rank the load-bearing assumptions. An assumption is load-bearing when the strategy fails if it is false.
3. Steelman the strategy before attacking it: explain why a competent person would choose it and the conditions under which it wins.
4. Attack each top assumption from customer/community evidence, distribution/adoption, economics/resources, execution capacity, timing, dependencies, trust/safety, and competitive response.
5. Write a concrete `fails if` condition for each top assumption.
6. Name evidence that can be collected this week and what result would increase or decrease confidence.
7. Define the kill or pivot criterion before running the test.
8. Choose the cheapest ethical test that can disconfirm the riskiest assumption.

## Output Shape

| Rank | Load-bearing assumption | Steelman | Attack / fails if | Evidence this week | Kill or pivot criterion | Cheapest test |
|---|---|---|---|---|---|---|

End with one of four recommendations: proceed, proceed with guardrails, revise and retest, or stop. Preserve dissent and label inference separately from observed evidence.

## Boundaries

- Do not manufacture certainty or use a red team to justify a decision already made.
- Do not run outreach, spending, production experiments, or collect sensitive data without approval.
- For community-serving products, include harm if wrong and voices likely to be excluded from the easiest research sample.
