<!-- reference-only | source: phuryn/pm-skills (MIT) pm-execution/skills/{prioritization-frameworks,wwas} | harvested 2026-06-20 | combined per Justin 2026-06-20 | distinct from the restored strategy-red-team reference -->

# Prioritization Frameworks + Why-What-Acceptance (WWA)

Two pm-execution patterns combined: how to *decide what to build* (prioritization) and how to *write the work item once decided* (WWA backlog format). Pairs with `product-management:write-spec` and `planning-pass`.

---

## Part 1 — Prioritization Frameworks

**Core principle:** never let customers design solutions. Prioritize **problems (opportunities)**, not features.

### Opportunity Score (Dan Olsen) — recommended for customer problems
Survey customers on **Importance** and **Satisfaction** per need (normalize 0–1):
- Current value = Importance × Satisfaction
- **Opportunity Score = Importance × (1 − Satisfaction)**
- Customer value created = Importance × (S2 − S1)

High Importance + low Satisfaction = best opportunity. Plot Importance vs Satisfaction; upper-left quadrant is the sweet spot.

### ICE — quick prioritization of ideas/initiatives
- I (Impact) = Opportunity Score × # customers affected
- C (Confidence) 1-10 (risk) · E (Ease) 1-10 (economics)
- **Score = I × C × E**

### RICE — ICE at scale (splits Impact into Reach + Impact)
- R = # customers · I = Opportunity Score · C = 0-100% · E = effort (person-months)
- **Score = (R × I × C) / E**

### 9-framework chooser
| Framework | Best for | Key insight |
|---|---|---|
| Eisenhower Matrix | Personal tasks | Urgent vs Important |
| Impact vs Effort | Tasks/initiatives | Quick 2×2 triage, not strategic |
| Risk vs Reward | Initiatives | Impact/Effort + uncertainty |
| **Opportunity Score** | Customer problems | **Recommended.** Importance × (1−Satisfaction) |
| Kano Model | Understanding expectations | Must-be/Performance/Attractive/Indifferent/Reverse |
| Weighted Decision Matrix | Multi-factor decisions | Weighted criteria; good for buy-in |
| **ICE** | Ideas/initiatives | Impact × Confidence × Ease |
| **RICE** | Ideas at scale | (Reach×Impact×Confidence)/Effort |
| MoSCoW | Requirements | Must/Should/Could/Won't (PM-origin; use with care) |

---

## Part 2 — Why-What-Acceptance (WWA) backlog items

Once prioritized, write each item as independent, valuable, testable, with strategic context.

**Process:** define the strategic **Why** → describe the **What** (concise, link designs) → write high-level **Acceptance Criteria** → keep items independent, negotiable, valuable, testable, and sprint-sized.

**Template**
```
Title: [what will be delivered]
Why:   [1-2 sentences connecting to strategy/team objectives]
What:  [short description + design link; reminder of discussion, not full spec]
Acceptance Criteria:
- [observable outcome 1]
- [observable outcome 2]
- [observable outcome 3]
```

Arguments when applying: `$PRODUCT`, `$FEATURE`, `$DESIGN` (link), `$ASSUMPTIONS` (strategic context). Substitute the real SLOPS product (Corvus, Omen, etc.).
