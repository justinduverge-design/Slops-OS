# Dallas Cowboys — Colorway Detail

**Status:** stub — first-pass drafted in colorway spec §7.2 pending Texan verification.

## Metadata

- **Team:** Dallas Cowboys
- **Abbr:** DAL
- **Division:** NFC East
- **Doctrine version:** fan-experience doctrine v1 (2026-07-03)
- **Colorway spec version:** v1 (2026-07-03)
- **Author:** Claude (first-pass framework)
- **Region-Test verifier:** ⏳ pending Texan / Dallas-region native

## War Room (primary skin)

*Fill from colorway spec §7.2 War Room table.*

## Color Rush (alt skin)

*Fill from colorway spec §7.2 Color Rush table. Regional signature: State Fair Gold `#C89B3A` (first-pass — needs Texan verification per §3 Test 2).*

## Regional identity note

*Fill: State Fair of Texas / Big Tex framing; alternates considered (Reunion Tower ball, boot leather, Texas flag red) and why State Fair Gold provisionally wins on celebration + regional-authenticity.*

**Alternates to test if State Fair Gold fails Test 2:**

- Reunion Tower ball white-gold (too specific?)
- Big Tex bronze
- Deep boot-leather brown
- Rodeo silver

## Chant string(s)

- Primary: `HOW 'BOUT THEM COWBOYS` ✓ (existing convention; use straight quote `'` for universal font compat)
- Alternates: `AMERICA'S TEAM`
- Existing `nflTeams.js` fields: check for existing `cultureTag` / `cry` / `wardRoom` — reconcile if this file introduces conflicting strings.

## Three-test outcomes

- **Test 1 (Team):** ✓ Navy + Silver reads "Cowboys" to a fan within one second. High confidence.
- **Test 2 (Region):** ⏳ State Fair Gold — first-pass claim. Needs Dallas / Texas native to earn the "oh, that's us."
- **Test 3 (Studio):** ⏳ Big Tex framing + graffiti chant + navy wash reads studio-authored — first-pass claim, needs Test 2 pass first.

## Implementation caveats

- No existing colorway conflicts flagged from `nflTeams.js` — verify during authoring pass.
- Watch for overlap with Texans Color Rush if / when that lands (both Texas teams share state signals).

## Verified-by

- **Region:** ⏳ pending
- **Chant:** ⏳ pending (fan / social convention verify)
- **Studio:** ⏳ pending Test 2