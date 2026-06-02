# ux-ui-execution.spec

## Objective

Define practical UX/UI execution guardrails for Slops OS projects using AI-assisted development.

This spec helps agents build usable, resilient, modular interfaces without turning every project into a full design-system effort.

The priority is dynamic data resilience over static mockup polish.

## Scope MVP

Use this spec when planning or building MVP interfaces, app shells, dashboards, tools, forms, feeds, review screens, and AI-assisted user flows.

MVP interfaces should:

- Prefer reusable card, feed, row, state, and panel components over one-off custom UI.
- Support hybrid AI interfaces: command input, structured cards, and review states.
- Represent loading, empty, error, disconnected, unauthorized, paid/locked, partial, stale, and recovery states.
- Make uncertainty visible instead of pretending the AI is certain.
- Preserve user control before consequential actions.
- Add good friction only where it protects user intent, money, privacy, data integrity, or irreversible outcomes.
- Use N-of-1 heuristic review as the default quality pass instead of requiring multiple evaluators.
- Preserve MVP simplicity.

## Out of Scope

This spec does not create:

- Production UI components.
- A full design system.
- A full information architecture system.
- Monolithic UX workflows.
- App code.
- Design linting automation.
- Figma automation.
- New runtime agent folders.
- Research plans requiring multiple evaluators.

Do not build a full IA system unless Justin specifically requests it.

## Dependencies

Before implementation, agents should inspect the relevant project layer for:

- Existing layout, navigation, cards, forms, and shared state components.
- Existing `design.md`, brand, or visual guidance.
- Active product specs and handoffs.
- Backend/API contract shape.
- Auth, subscription, platform, or data availability gates.
- Mobile and desktop viewport requirements.

Future skill candidate:

```text
Blueprints/Skills/ux-ui-execution-review/SKILL.md
```

Until that skill exists, use this spec as guidance only. Do not create or edit the skill automatically from this file.

## Security / Privacy Concerns

Interfaces must not:

- Hide privacy-impacting actions.
- Trick users into sharing more data than needed.
- Present mock, stale, partial, or AI-generated data as verified truth.
- Confirm payments, subscriptions, account linking, data deletion, or league actions without a clear review state.
- Expose tokens, credentials, cookies, private IDs, or raw provider errors.
- Rely on AI-generated auth, payments, crypto, or infrastructure UI without security review.

Use good friction for:

- Account linking.
- Billing and subscription changes.
- Data import/export/delete.
- League or roster actions.
- AI recommendations that may affect user money, privacy, or irreversible decisions.

## UX / Flow Concerns

Design flows around real data behavior, not ideal demos.

Required concerns:

- Dynamic data may be loading, absent, stale, partial, conflicting, unavailable, or provider-blocked.
- AI output may need review, retry, regeneration, or dismissal.
- Users need to understand what data was used and what was not.
- Empty states should explain what the user can do next.
- Error states should include recovery paths where safe.
- Review states should appear before consequential actions.
- Cards and feeds should remain usable when content is longer, shorter, missing, or delayed.
- Mobile layouts must keep actions reachable and text readable.

Avoid:

- Dark patterns.
- Fake AI certainty.
- Decorative complexity that weakens clarity.
- One-off component shapes for the same repeated content pattern.
- Hidden gates that surprise the user only after action.
- Static mockup polish that collapses under real data.

## Build Order

1. Confirm the product goal and user action.
2. Identify the data contract and all expected states.
3. Map the smallest reusable component set.
4. Build the state model before visual polish.
5. Add command input only if it improves the task.
6. Render structured cards or feeds for outputs the user must compare or review.
7. Add review states before high-impact actions.
8. Add empty, error, disconnected, locked, stale, and recovery states.
9. Apply visual guidance from the project `design.md` or brand docs.
10. Run N-of-1 heuristic review.

## Validation

Use N-of-1 heuristic review by default.

One careful reviewer should check:

- Does the interface still work with missing, stale, partial, long, or empty data?
- Can the user tell what is live, mock, AI-generated, uncertain, or unavailable?
- Are repeated surfaces using reusable cards, rows, feeds, panels, or states?
- Does any friction protect user control rather than block progress for no reason?
- Are consequential actions reviewed before commit?
- Are loading, empty, error, disconnected, unauthorized, locked, success, and recovery states represented where relevant?
- Does the UI avoid dark patterns and fake AI certainty?
- Is the MVP still simple?
- Did the work avoid monolithic workflows and unnecessary IA expansion?

Validation passes when the interface can handle real data variation, protects user control, and remains simple enough for the next agent to understand.
