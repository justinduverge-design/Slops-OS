# Philadelphia Eagles — Colorway Detail

**Status:** stub — fill from `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` §7.1 when next authoring pass runs.

**Priority tier:** ✅ verified Philly-region signature (Mummers Gold).

## Metadata

- **Team:** Philadelphia Eagles
- **Abbr:** PHI
- **Division:** NFC East
- **Doctrine version:** fan-experience doctrine v1 (2026-07-03)
- **Colorway spec version:** v1 (2026-07-03)
- **Author:** Claude (framework draft), Justin (regional verification)
- **Region-Test verifier:** Justin (native)

## War Room (primary skin)

*Fill from colorway spec §7.1 War Room table.*

## Color Rush (alt skin)

*Fill from colorway spec §7.1 Color Rush table. Regional signature: Mummers Gold `#E2B93B`.*

## Regional identity note

*Fill: why Mummers Gold; runners-up SEPTA orange / Wawa red / Liberty Bell bronze and why they lost the tradeoff.*

## Chant string(s)

- Primary: `BIRD GANG` ✓ (verified against fan-authored convention; NOT "Birds Gang")
- Alternates: `E-A-G-L-E-S EAGLES` (spelled-out)
- `Fly Eagles Fly` — existing `cry` field in `nflTeams.js`, retain for celebratory moments
- `No one likes us, we don't care.` — existing `wardRoom` field in `nflTeams.js`, retain as institutional voice

## Three-test outcomes

- **Test 1 (Team):** Midnight Green + Silver reads "Eagles" within one second to a Philly fan. Kelly + Black (Color Rush) reads harder — "this is my team on a REAL game day." Pass.
- **Test 2 (Region):** Mummers Gold to a Philly resident earns "oh, that's us" — New Year's Day parade is universal Philly cultural memory. Pass.
- **Test 3 (Studio):** BIRD GANG as graffiti-spray on Color Rush wall + curated brass plaque on War Room wall — combined with Mummers Gold accent, reads as Slops Saloon, not a jersey knockoff. Pass.

## Implementation caveats

- Existing `nflTeams.js` `palettes` array for PHI includes an official palette + a "Liberty Bell" special palette (Liberty Green + Bell Brass + Independence Cream + Hall Stone). Liberty Bell is a legitimate cultural anchor but it's more solemn than Mummers Gold. Consider: keep Liberty Bell as an *additional* Special (`mode: 'special'`, name: `'Liberty Bell'`) and add Mummers Gold as a *new* Special (`mode: 'special'`, name: `'Mummers'`), giving Eagles fans a two-Color-Rush choice.
- `cultureTag: 'Bird Gang'` corrected 2026-07-03 in `nflTeams.js:656` via Phase 1.13 discrete-fixes PR.

## Verified-by

- **Region:** Justin (native Philadelphian) 2026-07-03.
- **Chant:** Justin.
- **Studio:** Justin.