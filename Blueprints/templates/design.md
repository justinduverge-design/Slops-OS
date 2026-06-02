# Design

## 1. Purpose

Use this file to define design direction, UX rules, visual system notes, interaction states, voice rules, and handoff boundaries for a SLOPS layer, division, product, feature, or interface.

This file explains design intent. It does not grant permission to edit app source or override product decisions.

## 2. Scope

- **Layer:** `0-OS | 1-division | 2-product | feature`
- **Applies to:** `<project, product, feature, screen, workflow, or brand surface>`
- **Owner:** Justin
- **Primary design agent:** Claude unless Justin assigns otherwise
- **Implementation agent:** Codex only for approved file changes
- **Status:** `draft | active | under-review | archived`

## 3. Design Goal

<One short paragraph explaining what this design should help the user feel, understand, or do.>

## 4. User Experience Principles

- <Principle 1>
- <Principle 2>
- <Principle 3>

## 5. Visual Direction

| Area | Direction |
|---|---|
| Mood | <plain-English mood> |
| Layout | <density, spacing, hierarchy, mobile-first notes> |
| Color | <approved palette or constraints> |
| Typography | <font or type behavior> |
| Iconography | <icon style or restrictions> |
| Motion | <motion rules, if any> |
| Imagery | <image or illustration guidance> |

## 6. Product / Feature Surfaces

| Surface | Purpose | Design Notes | Status |
|---|---|---|---|
| `<surface-name>` | `<what it helps the user do>` | `<layout/state/copy notes>` | `draft | active | blocked` |

## 7. Interaction States

Define these when relevant:

- Default
- Loading
- Empty
- Error
- Disconnected
- Unauthorized
- Paid / locked
- Success
- Recovery

## 8. Copy and Voice Rules

Do:

- Use plain English.
- Explain user value before mechanics.
- Make uncertainty visible when data is incomplete.
- Keep language consistent with the current layer.

Do not:

- Use generic SaaS filler.
- Hide risk, mock data, or unavailable data.
- Over-explain math when a plain-English recommendation is enough.
- Make claims the product cannot support.

## 9. Handoff Boundaries

| Need | Owner | Handoff Path |
|---|---|---|
| Design planning | Claude | `<path>` |
| Backend/API support | Codex | `<path>` |
| Product decision | Justin | `<path>` |
| Final implementation | Approved agent only | `<path>` |

## 10. Constraints

- Do not treat this file as permission to edit production code.
- Do not override `AGENTS.md`, `CLAUDE.md`, `SKILL_ROUTING.md`, or explicit Justin instructions.
- Do not change auth, payments, secrets, database, deployment, or source architecture from this file alone.
- Do not turn inspiration into product doctrine unless Justin approves it.

## 11. Open Questions

- [ ] <question>
- [ ] <question>

## 12. Decision Log

| Date | Decision | Owner | Notes |
|---|---|---|---|
| YYYY-MM-DD | <decision> | Justin | <notes> |

## 13. Next Safe Step

<One concrete next step, usually a review, prompt, or handoff.>
