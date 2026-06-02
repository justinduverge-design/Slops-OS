# app-strategy-decision

## Status

Accepted for planning.

## Classification

SPEC ONLY.

This decision creates architecture guidance and research routing. It does not approve app code, infrastructure, database migrations, payments, native app work, blockchain work, or production deployment.

## Decision

Slops OS will reduce the app strategy research into a modular MVP architecture direction:

- AI app builders may be used for prototypes only.
- Production should move toward a modular Supabase/PostgreSQL-backed architecture.
- Official sports data APIs are preferred over fragile scraping for decision-critical product data.
- Public blockchain roster verification is delayed or archived.
- Paid fantasy mechanics are blocked until legal, app store, and geo-compliance review.
- Draft Assistant reasoning must be designed around strict latency limits.
- PWA vs native distribution is the next required decision.

## Why This Is Spec Only

The research is useful, but the critic review found several areas where implementation would be premature:

- AI-generated auth, crypto, payments, and infrastructure code require security review before use.
- Public blockchain verification is too heavy for the current trust problem.
- Scraping is too fragile for production sports decisions unless it is non-critical and has validation/fallbacks.
- Paid fantasy mechanics create legal, app store, and location-compliance risk.
- Native distribution choices alter billing, geofencing, performance, and review requirements.

The safe move is to capture the architecture direction without creating implementation tasks.

## Build Later Gates

Before any implementation begins, Justin must explicitly approve the relevant gate:

- App distribution decision: PWA, native, or hybrid.
- Legal/compliance review for paid fantasy mechanics.
- App store policy review for Apple and Google if native distribution is chosen.
- Geo-compliance approach if paid or restricted features are introduced.
- Sports data vendor selection and budget.
- Security review for auth, payments, crypto, infrastructure, and AI-generated code.
- Latency budget for Draft Assistant live reasoning.

## MVP Guardrails

Preserve modularity.

Keep the spec flexible.

Do not overbuild.

Do not create blockchain, Kubernetes, StoreKit, Play Billing, or geofencing implementation tasks yet.

Do not rely on AI-generated auth, crypto, payments, or infrastructure code without security review.

## Explicitly Excluded

- Production app code.
- Production infrastructure.
- Database migrations.
- Kubernetes implementation.
- Blockchain roster verification.
- StoreKit or Play Billing implementation.
- Geofencing implementation.
- Paid fantasy mechanics.
- Monolithic workflow creation.
- Skill auto-edits.

## Related Files

```text
Blueprints/specs/app-strategy.spec.md
References/patterns/ai-app-development-patterns.md
Direction/reviews/app-strategy-critic-review.md
Blueprints/prompts/app-strategy-claude-codex-handoff.md
```

## Prior-Use Recommendation

Use the App Strategy Router pattern when future research needs to become a decision, spec, skill, DBS route, and implementation handoff.

For now, recommend improvements only. Do not auto-edit the skill.

## Next Required Decision

Decide whether the MVP distribution path is PWA, native mobile, or hybrid.
