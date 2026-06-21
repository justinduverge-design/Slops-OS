# Claude / Codex Handoff: App Strategy Spec Placement

You are working inside Slops OS.

Task:
Create the following files from the provided app strategy research and critic output:

1. Direction/Decisions/app-strategy-decision.md
2. Blueprints/Specs/app-strategy.spec.md
3. References/Patterns/ai-app-development-patterns.md
4. Direction/Reviews/app-strategy-critic-review.md

Layer:
- Decision file belongs in Direction/Decisions.
- Spec file belongs in Blueprints/Specs.
- Research pattern file belongs in References/Patterns.
- Critic review belongs in Direction/Reviews.

Architecture or implementation:
This is architecture/spec work only.
Do not implement app code.
Do not create production infrastructure.
Do not generate database migrations yet.
Do not create a monolithic workflow.

Core decision:
Classify this as SPEC ONLY.

Preserve this reduced strategy:
- AI app builders may be used for prototypes only.
- Production should move toward a modular Supabase/PostgreSQL-backed architecture.
- Official sports data APIs are preferred over fragile scraping.
- Public blockchain roster verification is delayed or archived.
- Paid fantasy mechanics are blocked until legal, app store, and geo-compliance review.
- Draft Assistant reasoning must be designed around strict latency limits.
- PWA vs native distribution must be treated as the next required decision.

MVP guardrails:
- Preserve modularity.
- Keep the spec flexible.
- Do not overbuild.
- Do not create blockchain, Kubernetes, StoreKit, Play Billing, or geofencing implementation tasks yet.
- Do not rely on AI-generated auth, crypto, payments, or infrastructure code without security review.

Prior-use recommendation:
Use the App Strategy Router pattern when future research needs to become a decision, spec, skill, DBS route, and implementation handoff.
Recommend improvements only; do not auto-edit the skill.