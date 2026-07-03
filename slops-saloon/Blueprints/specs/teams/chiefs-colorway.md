# Kansas City Chiefs — Colorway Detail

**Status:** stub — first-pass drafted in colorway spec §7.3 pending KC-fan verification.

## Metadata

- **Team:** Kansas City Chiefs
- **Abbr:** KC
- **Division:** AFC West
- **Doctrine version:** fan-experience doctrine v1 (2026-07-03)
- **Colorway spec version:** v1 (2026-07-03)
- **Author:** Claude (first-pass framework)
- **Region-Test verifier:** ⏳ pending KC-fan / Kansas City-region native

## War Room (primary skin)

*Fill from colorway spec §7.3 War Room table.*

## Color Rush (alt skin)

*Fill from colorway spec §7.3 Color Rush table. Regional signature: BBQ Smoke Brown `#6B4423` (first-pass — needs KC-fan verification per §3 Test 2).*

## Regional identity note

*Fill: KC BBQ is a globally-recognized cultural signature; smoke-brown reads as authentic. Alternates considered:*

- Country Club Plaza light gold (too soft?)
- Fountain city cyan (KC = "City of Fountains") — disconnected from game-day energy?
- Missouri River blue (competes with too many other teams)
- Kansas wheat gold (borders on cliché?)

## Chant string(s)

- Primary: `CHIEFS KINGDOM` ✓ (chant spec §6.1 verified)
- Alternates: (none locked)
- Existing `nflTeams.js` fields: check for existing `cultureTag` / `cry` / `wardRoom` — reconcile.

**Do NOT ship:**

- The Tomahawk Chop — parked pending cultural-sensitivity review per chant spec §6.1 and doctrine.
- "Chief Kingdom" (singular) — grammatical variant, not the fan-authored convention.

## Three-test outcomes

- **Test 1 (Team):** ✓ Red + Gold reads "Chiefs" within one second. High confidence.
- **Test 2 (Region):** ⏳ BBQ Smoke Brown — first-pass claim. Needs KC-fan to earn "oh, that's us."
- **Test 3 (Studio):** ⏳ BBQ Smoke framing pending Test 2 pass. **Watch for cultural-sensitivity overlap with ongoing Chiefs/Chop debates** — the regional signature is intentionally NOT team-iconography-adjacent (BBQ is city identity, not Native imagery) but the surrounding framing needs to steer clear of any Native visual references.

## Implementation caveats

- Cultural sensitivity: this team has a live debate about Native imagery. Any Color Rush treatment should stay clear of headdress / feather / arrowhead / drum motifs even if a fan / marketer suggests them. Stick to city-identity signals (BBQ, jazz, fountains, wheat) — never team-iconography-adjacent.
- No `nflTeams.js` colorway conflicts flagged from initial scan — verify during authoring pass.

## Verified-by

- **Region:** ⏳ pending KC-fan
- **Chant:** ✓ Claude research + chant spec (Kingdom convention widely-attested)
- **Studio:** ⏳ pending Test 2 + cultural-sensitivity review