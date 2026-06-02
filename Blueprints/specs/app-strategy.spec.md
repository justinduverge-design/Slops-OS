# app-strategy.spec

## Purpose

Define the reduced MVP app strategy for Slops OS and Corvus planning.

This is a flexible architecture spec. It is not an implementation plan, feature spec, production infrastructure plan, database migration plan, or app store submission plan.

## Classification

SPEC ONLY.

## Scope

This spec covers:

- AI-assisted app development boundaries.
- Production architecture direction.
- Sports data source preference.
- Compliance blockers.
- Draft Assistant latency constraints.
- The next required distribution decision.

This spec does not create build tasks.

## Strategy

### AI App Builders

AI app builders may be used for prototypes, throwaway proofs, and rapid UX exploration.

They should not be trusted as the production source for auth, payments, crypto, infrastructure, data security, or compliance-sensitive systems without human engineering and security review.

### Production Architecture

Production should move toward a modular architecture with:

- Supabase/PostgreSQL as the primary data layer unless a later decision replaces it.
- Clear service boundaries for sports data ingestion, recommendation logic, user/session state, billing state, and audit/compliance evidence.
- Backend-owned contracts for auth, platform integrations, data ingestion, AI reasoning, and payments.
- Frontend-owned UX surfaces that consume documented backend contracts.

Avoid locking the product into an opaque all-in-one builder once real user data, paid mechanics, or production fantasy advice are involved.

### Sports Data

Official sports data APIs are preferred for decision-critical systems.

Scraping may be used only for prototype research, secondary context, or non-critical enrichment when validation and fallback rules exist.

Production recommendations must not depend on a brittle scraped source without:

- Source health checks.
- Schema validation.
- Fallback behavior.
- Clear user-facing uncertainty labels.
- Cost and rate-limit planning.

### Blockchain Verification

Public blockchain roster verification is delayed or archived.

For MVP trust markers, prefer simpler backend approaches such as signed audit logs, timestamped server records, or cryptographically chained PostgreSQL records after a separate security review.

No blockchain implementation task should be created from this spec.

### Paid Fantasy Mechanics

Paid fantasy mechanics are blocked until legal, app store, and geo-compliance review.

This includes paid contests, game-of-skill positioning, jurisdiction gating, prize mechanics, app store billing implications, and payment handling.

No StoreKit, Play Billing, geofencing, or paid contest implementation task should be created from this spec.

### Draft Assistant Latency

Draft Assistant reasoning must be designed around strict latency limits.

Live draft UX cannot depend on slow multi-agent reasoning loops unless the system can return useful output inside the draft clock.

Future Draft Assistant specs should include:

- Maximum response time.
- Fallback recommendation behavior.
- Cached ranking strategy.
- Model timeout behavior.
- User-facing loading and recovery states.
- Separation between pre-draft deep reasoning and live-pick fast recommendations.

### Distribution

PWA vs native is the next required decision.

The decision changes:

- App store review exposure.
- Billing approach.
- Geo-compliance options.
- Native device capabilities.
- Mobile performance expectations.
- Release and support workflow.

Do not begin native billing or geo-compliance implementation until this decision is made.

## MVP Guardrails

- Preserve modularity.
- Keep this spec flexible.
- Avoid monolithic workflows.
- Delay infrastructure-heavy work until explicit gates are cleared.
- Require security review for AI-generated auth, crypto, payments, or infrastructure code.
- Treat compliance and distribution decisions as blockers, not implementation details.

## Non-Goals

- Production app code.
- Database migrations.
- Production infrastructure.
- Kubernetes.
- Blockchain.
- StoreKit.
- Play Billing.
- Geofencing.
- Full compliance program.
- New runtime agent folders.
- Skill auto-edits.

## Success Criteria

This spec succeeds if future app strategy work:

- Separates prototype tools from production architecture.
- Routes production data through stable contracts.
- Prefers official sports data for decision-critical recommendations.
- Avoids premature blockchain and native billing work.
- Blocks paid mechanics until compliance review.
- Designs Draft Assistant around latency from the start.
- Forces the PWA vs native decision before distribution-specific work.

## Next Safe Step

Create or run a focused decision prompt for PWA vs native distribution.
