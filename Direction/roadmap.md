# SLOPS OS Roadmap

## Purpose

This roadmap tracks the operating-system layer only.

Product and app work belongs in:

```text
slops-saloon/omen/
```

## Now

- Keep `context.md`, `DBS_INDEX.md`, and `Direction/context.md` aligned with the current three-layer route.
- Keep Slops Saloon division context separate from Omen product context.
- Keep SLOPS-authored skills canonical under `Blueprints/skills/`.
- Keep imported agents reference-only unless Justin approves them through the agent index.
- Treat Omen backend handoff Requests 13-18 as locally advanced as of 2026-05-27; the next blocked item is approval to apply prepared Supabase SQL.

## Next

- Justin rewrites the active agent files using the updated context route.
- Review root agent index status after the rewrite.
- Add prior-use notes to high-use skills after real use.
- Keep root handoffs focused on OS-level coordination.
- Track the Omen launch approval checkpoint without applying database, Stripe, deploy, or infrastructure changes from the OS layer.

## Later

- Promote imported agents only through reviewed, least-privilege wrappers.
- Add new SLOPS skills only when a workflow repeats enough to justify it.
- Keep root OS docs focused on reusable operating doctrine.
- Let each product repo maintain its own code, tests, deployment, and product docs.

## Out Of Scope

- Omen app source edits.
- Secrets or credentials.
- Deployment and infrastructure changes.
- SQL, package files, tests, or Docker config.
- Applying prepared Omen Supabase SQL to staging or production without explicit Justin approval.
- Archive or quarantine cleanup without a separate review.
