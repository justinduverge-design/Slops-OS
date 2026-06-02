# ai-app-development-patterns

## Purpose

Capture reusable patterns from the app strategy research and critic review.

This file is reference material. It informs decisions and specs, but it is not the current plan by itself.

## Pattern 1: Prototype Builder, Production Architecture

AI app builders are useful for speed.

Use them for:

- Prototype screens.
- Throwaway proof-of-concepts.
- UX exploration.
- Founder demos.
- Early workflow discovery.

Do not treat them as the production architecture for:

- Auth.
- Payments.
- Crypto.
- Infrastructure.
- User data security.
- Legal or compliance-sensitive features.

Recommended production direction:

- Modular backend.
- Supabase/PostgreSQL data ownership.
- Documented contracts.
- Security-reviewed implementation.

## Pattern 2: Official Data Beats Fragile Scraping

Fantasy sports recommendations need reliable source data.

Official sports APIs are preferred for:

- Scores.
- Injuries.
- Rosters.
- Lineups.
- Schedules.
- Player metadata.
- Decision-critical recommendation inputs.

Scraping may still be useful for:

- Research.
- Prototype exploration.
- Non-critical editorial context.
- Secondary enrichment.

Scraping should not drive production recommendations unless it has validation, fallback behavior, and user-facing uncertainty labels.

## Pattern 3: Delay Public Blockchain Trust Markers

Public blockchain verification adds cost, latency, UX friction, and implementation risk.

For MVP trust, consider simpler backend records first:

- Server-side audit logs.
- Timestamped roster snapshots.
- Signed state hashes.
- Cryptographically chained database rows.

Any trust-marker implementation still needs a security review before build.

## Pattern 4: Compliance Before Paid Mechanics

Paid fantasy mechanics are not just product mechanics.

They can trigger:

- App store policy review.
- Game-of-skill legal analysis.
- Payment compliance.
- Jurisdiction restrictions.
- Geo-compliance requirements.
- Entity and paperwork requirements.

Do not implement paid fantasy mechanics until legal, app store, and geo-compliance review are complete.

## Pattern 5: Draft Assistant Needs Latency Design

Draft rooms create hard time pressure.

Live reasoning must account for:

- Pick clock duration.
- Model response time.
- Network variance.
- Fallback recommendations.
- Cached rankings.
- UI loading states.
- Failure recovery.

Separate deep pre-draft analysis from fast live draft recommendations.

## Pattern 6: Distribution Is an Architecture Decision

PWA vs native is not a packaging detail.

It changes:

- Billing options.
- App store review exposure.
- Device capability access.
- Geo-compliance options.
- Performance constraints.
- Release process.
- Support burden.

Make this decision before StoreKit, Play Billing, native geofencing, or app store implementation work.

## App Strategy Router Pattern

Use this pattern when future research needs to become structured Slops OS output.

Route research into separate artifacts:

```text
Direction/decisions/<topic>-decision.md
Blueprints/specs/<topic>.spec.md
References/patterns/<topic>-patterns.md
Direction/reviews/<topic>-critic-review.md
Blueprints/prompts/<topic>-claude-codex-handoff.md
```

Keep each artifact small:

- Decision: what is accepted, blocked, or deferred.
- Spec: reusable requirements and guardrails.
- Pattern: research-derived reusable lessons.
- Review: critique, gaps, risks, and open questions.
- Prompt: runnable instructions for Claude or Codex.

## Prior-Use Recommendation

The App Strategy Router pattern is useful and should be reused.

Recommended improvements:

- Add a checklist for "SPEC ONLY" versus "BUILD NOW".
- Add a section for compliance blockers.
- Add a latency-budget prompt for real-time products.
- Add a source reliability rubric for API versus scraping decisions.

Do not auto-edit the skill from this recommendation.
