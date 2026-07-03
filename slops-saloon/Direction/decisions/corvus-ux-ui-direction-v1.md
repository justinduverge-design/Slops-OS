# Decision: Omen UX/UI Direction v1

**Date:** 2026-05-24
**Updated:** 2026-05-24 (Justin approval pass — open questions resolved)
**Status:** Approved — decisions locked, ready for build
**Owner:** Justin (product) / Claude Code (frontend execution)

---

## What This Document Is

This is the canonical UX/UI direction decision for Omen v1.
It records the decisions made in the May 2026 clean-plate design pass.
All frontend work should align to this before building new screens.

---

## Core UX Principle

**Build trust before asking for anything.**

The product must deliver value before it asks for a signup, a connection, or a dollar.
The Trade Analyzer is free and auth-free. It is the front door.
Omen / Most Valuable Play is the paid centerpiece. It requires auth and a connected league.
The design must make the value ladder feel natural, not coercive.

---

## Product Hierarchy (UI priority order)

| Priority | Feature | Auth Required | Platform Required | Paid |
|----------|---------|---------------|-------------------|------|
| 1 | Trade Analyzer | No | No | No |
| 2 | Draft Assistant | No (free this season) | No | No |
| 3 | Omen / Most Valuable Play | Yes | Yes | Yes |
| 4 | Start/Sit | Yes (inside Omen) | Yes | Yes |
| 5 | Waiver Wire | Yes (inside Omen) | Yes | Yes |

---

## Brand Character

Omen should feel like:
- A sharp, trusted fantasy football analyst — not a chatbot
- Old-school down-south coach energy: direct, confident, a little edge
- Premium sports intelligence, not a neon sports bar
- Funny when the moment is right, never forced
- No profanity, no offensive humor
- No chatty filler — say the thing, explain the why, stop

**The raven/omen aesthetic is the brand anchor.**
The visual should evoke judgment, high vantage point, strategic observation.
Think war-room intelligence, not pop-quiz trivia game.

---

## Visual Direction

**Palette (from BRAND_STRATEGY.md):**
- Raven black and charcoal as the primary dark surfaces
- Bone white as the primary text and light surface
- Antique gold for premium, CTA, and confidence signals
- Deep crimson for risk, warnings, and strong alerts
- Electric violet for AI / intelligence layer moments

**Dark mode is the primary Omen experience.**
Light mode is supported and must be clean, not washed-out.
System mode (respects OS preference) is the default.

**Typography:**
- Cormorant Garamond (serif) for brand headlines, display moments, product identity
- Alegreya Sans (sans-serif) for all UI copy, labels, body text
- Both are already loaded in `frontend/src/index.css`

**No decorative clutter.** Space and contrast carry the premium feel.

---

## Key UX Decisions

### Decision 1: Trade Analyzer is free and auth-free

No login wall before the Trade Analyzer. A user should be able to paste two sides of a trade and get an answer in under 60 seconds without ever creating an account.

Signed-out users see the Trade Analyzer with a soft invite to sign in for more features.

### Decision 2: Sign in gates Omen, not Trade Analyzer

The sign-in prompt appears after the user has received value, not before.
The pattern: use → see the result → get the invite → sign in.

### Decision 3: League connection is post-signin, not pre-signin

Do not ask users to connect ESPN/Yahoo/Sleeper before they've signed in.
The sign-in screen explains what the league connection unlocks.
The connection step is immediately after sign-in, not before.

### Decision 4: Omen requires a connected league — no exceptions

League connection is mandatory for Omen. There is no generic Omen recommendation without a connected league.
A user who skips league connection sees `DisconnectedState` on the Omen screen with a clear CTA to connect.
This is an invitation, not a punishment. The copy should be direct and confidence-building.
Trade Analyzer and Draft Assistant remain available to users who skip league connection.

### Decision 5: Recommendations always include who and why

No recommendation is shown without:
1. The specific player or move
2. The reasoning in plain English
3. The confidence level
4. The risk level

Never show a confidence number without a human-readable label.

### Decision 6: Theme support is required in v1

Light / dark / system — all three must work before shipping.
Team-color personalization is a future backlog item only.

### Decision 7: Mobile is not an afterthought

All screens must be built mobile-first. Fantasy football decisions happen on phones.
No horizontal scroll on any screen. No text that requires pinch-to-zoom.

### Decision 8: Sign In / Connect Your League is the first screen to get right

Before any other screen is polished, this one must be excellent.
It sets the first impression for any paying customer.

---

## Screen Priority for v1

1. Sign In / Connect Your League (first impression for paid users)
2. Trade Analyzer (front door, free)
3. Dashboard / App Shell (navigation home)
4. Omen / Most Valuable Play (paid centerpiece)
5. Draft Assistant (seasonal, free this year)
6. Supporting states (loading, error, empty, disconnected)

---

## What Is Not In Scope for v1

- Content hub, blog, podcast, or media section
- Team-color personalization
- Social sharing or public trade links
- Leaderboards or public rankings
- Any second Slops Saloon product

---

## Decisions Added 2026-05-24 (Justin Approval Pass)

The following were open questions and are now locked:

### Decision 9: Auth providers at launch

All four providers ship at v1:
- Google OAuth
- Apple Sign In
- Discord OAuth
- Email magic link

Button order on the sign-in screen: Google → Apple → Discord → divider → Email input.

### Decision 10: ESPN UX is fully guided, in-product, every time

When a user taps "Connect ESPN," the app walks them through every step of the cookie-extraction process inside the product. This is not a warning to get past — it is a guided onboarding moment. The UX should be honest about the friction and confidence-building about the outcome. ESPN should not feel broken just because it requires extra steps.

### Decision 11: Omen requires a connected league — confirmed, no exceptions

No generic Omen. League connection is mandatory. Skipping means Omen is locked (see Decision 4).

### Decision 12: `/` serves Omen at launch

At actual launch, `/` points to Omen. The Slops Saloon parent-brand page at `/` is a future decision — it is not blocking launch and should not be built now. Future Slops Saloon parent routing can be revisited when a second product is active.

### Decision 13: Provisional final headline

**"Your best call, every time."**

Rationale: Synthesized from three candidate headlines. Captures the trade use case ("every time you get a trade offer") and the Omen weekly cadence ("every time the lineup deadline comes around"). Short, personal, confident. Marked provisional — confirm after seeing it in the UI.

## Decisions Added 2026-05-24 (Data Quality Framework Pass)

### Decision 14: Paid tier placeholder name

"Pro" is the working placeholder for the paid tier. It is not the final brand name.
Do not use "Pro" in any user-facing copy that ships — it is an internal shorthand only.
A formal naming and brand workshop for the paid tier is a future backlog item, to be run before launch or early in paid-tier marketing.

### Decision 15: Omen access framework — three tiers

Omen access depends on the quality and completeness of the league data available. The following framework governs which users can access Omen and at what level.

**Tier 1 — Connected League Omen (full access)**

A platform connection (Sleeper, Yahoo, ESPN) provides enough league, roster, matchup, scoring, and transaction context for Omen to produce a real, honest Omen recommendation.
Full Omen access is granted when a supported platform connection is active and healthy.

**Tier 2 — Manual Omen (conditional access)**

Manual entry may unlock Omen only if the user completes a required data checklist that gives Omen enough information to produce an honest recommendation.

The checklist must include at minimum:
- League scoring format (ppr / half_ppr / standard)
- Starting lineup rules (which positions, how many starters)
- Current roster (player names + positions)
- Current week's matchup opponent (if start/sit decision is requested)
- Waiver wire pool (if waiver recommendation is requested)

Omen must clearly show which checklist items are missing and what each missing item prevents.
Omen must not pretend to know waiver availability, opponent matchup context, scoring rules, or roster constraints if the user has not provided them.
A `DataSourceLabel: manual` must appear on every signal derived from manual data.

The decision of whether Manual Omen is feasible given the data quality ceiling is pending a Codex audit. Codex evaluates; Justin decides.

**Tier 3 — Incomplete Manual (locked Omen)**

Users who have started manual entry but have not completed the required checklist cannot access Omen.
Trade Analyzer remains available to all users regardless of manual entry completeness.
Future non-league-dependent tools also remain available.
The UI should encourage completion of the checklist or platform connection — not punish incomplete setup.

## Remaining Open Decisions

1. **Paid tier name (final):** Pending a brand/naming workshop before launch. "Pro" is placeholder only.
2. **Manual Omen feasibility:** Pending Codex audit of what data Manual entry can collect. Codex reports; Justin decides whether Manual Omen ships, ships with limitations, or is deferred.

## Backend Questions (not product decisions — owned by Codex)

See `omen/Blueprints/handoffs/codex-ux-ui-build-handoff.md` for the full list. Key items:
- Discord OAuth Supabase provider configuration status
- `?next=` preservation strategy through Supabase OAuth redirect
- Sleeper connect endpoint (does not exist — must be built)
- Yahoo OAuth connect end-to-end status
- Platform status endpoint (confirm or build)
- Manual entry data audit — what can the form collect and is it enough for honest Omen?
