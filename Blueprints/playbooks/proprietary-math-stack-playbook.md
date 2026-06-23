# Proprietary Math Stack Playbook

**Layer:** 0 — SLOPS OS
**Status:** approved doctrine (2026-06-11, Justin)
**Applies to:** every Slops Saloon product (Omen, future apps)

## The Doctrine

Slops uses a two-layer math stack. The boundary is non-negotiable.

| Layer | Owner | What lives here | Why |
|---|---|---|---|
| **Baseline math** | `nflverse` ecosystem (open source) | PPR scoring, EPA, xPoints, play-by-play, ID mapping | Already canonical, audited by a large community, free, deeply maintained |
| **Opinion layer** | Slops proprietary | ADP-by-league-settings, Omen narrative reasoning, MVP Move lineup edge, Trade Analyzer win-probability delta, breakout detection on top of xPoints | This is what users pay for. This is what we defend as "ours." |

Rule: do not re-implement baseline math. Do not let opinion-layer math leak baseline assumptions (e.g. do not hardcode PPR scoring inside the Omen — pull from `nflreadpy`).

## Canonical Baseline Stack

- **`nflverse/nflreadpy`** — current Python port; replaces deprecated `nfl-data-py`. Use this for all play-by-play, weekly, seasonal, roster, schedule, draft data.
- **`ffverse/ffopportunity`** — xgboost model for Expected Fantasy Points. Use this as the input to the Omen, MVP Move, and Trade Analyzer opinion layers.
- **License check:** both repos are MIT-compatible. Confirm vendoring vs pip install per product.

## Opinion-Layer Patterns (Slops-owned)

Each of these gets its own ADR before code is written:

1. **ADP-by-league-settings** — re-rank ADP per the user's PPR/half/standard + roster size + flex slots. Inputs: nflverse seasonal + xPoints. Output: a re-ranked board the user sees as "your ADP."
2. **Omen (MVP Move)** — a narrative + lineup edge engine. Inputs: ffopportunity xPoints + the user's roster + matchup. Output: a ranked lineup with a one-sentence narrative.
3. **Trade Analyzer win-probability delta** — what does the trade change about your projected wins? Inputs: rest-of-season xPoints, schedule strength, opponent roster. Output: a single delta number + a one-paragraph reasoning.
4. **Breakout detection** — feature engineering on top of ffopportunity. Harvest patterns from `ChinaiArman/Fantasy-Football-Analyzer` (Pandas feature work, 80% accuracy on breakout detection).

## VOR (Value Over Replacement) Source

For draft-time VOR, harvest the formula from `jjti/ff` (MIT). Do not vendor the scraper — Slops uses nflreadpy for projections.

## What This Playbook Forbids

- Re-implementing PPR/half/standard scoring inside Slops code.
- Vendoring deprecated `nfl-data-py`.
- Calling third-party paid projection APIs (FantasyPros, etc.) without explicit Justin approval — sovereignty conflict.
- Letting opinion-layer code reach directly into nflverse internals; always through `nflreadpy`'s public functions.

## What This Playbook Enables

- Codex can write Omen/MVP Move/Trade Analyzer code without re-deriving baseline math.
- "We built it" is defensible: the opinion layer is provably ours; the baseline is canonically nflverse's.
- Future products inherit the boundary for free.

## Verification

- Smoke test for any new opinion-layer code: temporarily change `nflreadpy`'s PPR setting to half — does the Slops opinion shift accordingly? If not, baseline math is leaking.
- Audit: grep the product source for hardcoded PPR multipliers. There should be none.

## Sources

- nflverse/nflreadpy (canonical data layer)
- ffverse/ffopportunity (xPoints model)
- jjti/ff (VOR formula reference)
- ChinaiArman/Fantasy-Football-Analyzer (breakout feature reference)

## Changelog

- 2026-06-11 — initial doctrine approved by Justin.
