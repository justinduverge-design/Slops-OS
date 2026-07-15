# Video Drafts

Canonical home for in-progress video projects per `content-strategy.md`'s folder layout — but as of
2026-07-14, **the one real video project stays where it already is** rather than being moved:

```
omen/Brand/promos/omen-coming-soon/
```

That's a live Remotion project (`src/index.jsx`, `renders/*.mp4`, `assets/` with storyboard/post-copy/
sound-credits notes) with real render history and a QC ledger tracking it
(`omen/Blueprints/playbooks/content-usage-ledger.md`). Moving it would break relative paths and lose
no real benefit — it already does most of what this folder is meant to do.

**Convention going forward:** new video projects get their own folder under
`omen/Brand/promos/<project-name>/` (sibling to `omen-coming-soon`), same as the existing one. This
folder (`Solutions/content/video-drafts/`) is for anything that doesn't warrant a full Remotion
project of its own yet — early experiments, non-Remotion drafts, or planning notes that precede a
project folder being created.

If this convention changes (e.g. consolidating all video projects under `Solutions/content/`), update
this README and `Blueprints/specs/content-tool-stack.md` §3 together.
