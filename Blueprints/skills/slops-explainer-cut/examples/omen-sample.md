# Sample Omen Output (representative — confirm or replace with a real one)

> Drafted 2026-06-20 from the brand system + proprietary-math doctrine (nflverse = baseline, Slops = opinion layer). Swap in a real Omen export when available; the explainer pipeline reads this shape.

```json
{
  "feature": "Omen",
  "type": "start_sit_verdict",
  "player": { "name": "Jaylen Waddle", "pos": "WR", "team": "MIA" },
  "matchup": { "week": 12, "opp": "NYJ", "venue": "home" },
  "baseline": {
    "source": "nflverse",
    "projection_ppr": 12.8,
    "drivers": ["route participation 0.61", "target share 0.23", "aDOT 11.4"]
  },
  "omen": {
    "projection_ppr": 15.2,
    "verdict": "START",
    "confidence_score": 71,
    "confidence_label": "Medium-High Confidence",
    "opinion": "The baseline underweights matchup-specific slot exposure. NYJ slot coverage ranks 28th by EPA/target; Waddle runs 64% of routes from the slot.",
    "almost_missed_edge": "Tyreek's quad designation pulls a safety toward the boundary, opening Waddle's deep-middle window."
  }
}
```

## The one-sentence claim the cut should land

"Omen starts Waddle because the slot matchup the baseline ignores is worth ~2.4 points — and that's the week's margin."
