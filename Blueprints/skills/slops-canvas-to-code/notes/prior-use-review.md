# Prior-use review — slops-canvas-to-code

No runs yet. `draft` until one screen has gone contract → build → diff.

## The metric that matters

Rebuild attempts per screen. The skill exists because that number was high enough to
exhaust a rate limit. Track it or the skill cannot be judged.

| Date | Screen | Elements | Rebuild attempts | Under-specified class | DRIFT findings |
|---|---|---|---|---|---|

## Authoring notes

- Icons carry a named-symbol requirement because they were named as a dropped class.
  If a later run shows a different class dominating (spacing, states), promote that one
  to the same explicit treatment.
- Stage 3 needs a screenshot. Until `slops-native-sim-drive` exists, native diffs are
  structural only and must say so rather than implying a visual comparison.
- Check `omen/Blueprints/prompts/canvas-m1-screen-contracts.md` before compiling an M1
  screen — some are already contracted, and a second contract for one screen is worse
  than none.
- Open question: contract per screen, or per canvas? Per screen is easier to diff; per
  canvas keeps shared components consistent. Start per screen and watch for duplication.
