# Codex Prompt — Week 1 + 1.5 Post-Promotion Cleanup

**Layer:** 0
**Date drafted:** 2026-06-13
**Trigger:** post-`codex-week-1-and-1.5-promotion.md`; the 11 promotion commits landed clean, but 4 follow-up issues need a single cleanup commit before we move on.
**Authority:** Justin's approval already granted in chat. Do not push. Do not touch L2 source.

---

## Goal

One cohesive commit that fixes four leftover issues from the promotion pass. No new behavior, no scope creep.

## In Scope (8 active skill files + 1 doctrine check)

The 8 promoted Week 1 + Week 1.5 skills:

1. `Blueprints/skills/slops-legal-spot-check/SKILL.md`
2. `Blueprints/skills/mobile-first-qa-playbook/SKILL.md`
3. `Blueprints/skills/self-hosted-observability-runbook/SKILL.md`
4. `Blueprints/skills/compliance-by-template/SKILL.md`
5. `Blueprints/skills/demo-mode-pre-empty-state/SKILL.md`
6. `Blueprints/skills/slops-headroom/SKILL.md`
7. `Blueprints/skills/slops-markitdown/SKILL.md`
8. `Blueprints/skills/slops-taste/SKILL.md`

## Issues to Fix

### Issue 1 — Body H1 still says `(PROPOSAL)` on all 8

Frontmatter is `status: active`, but the body header still reads `# Slops Headroom (PROPOSAL)` (and equivalents). Strip the `(PROPOSAL)` suffix from each H1. Title text stays intact.

### Issue 2 — Changelogs missing the promotion entry on all 8

Each skill's `## Changelog` ends at `0.1.0 — initial proposal (2026-06-11)`. Append exactly:

```
- 0.1.1 — promoted to active 2026-06-12 (commits fa0223b...3f421eb).
```

Use the actual commit short-hash for that specific skill from the promotion commits. The mapping:

- slops-legal-spot-check → `fa0223b`
- mobile-first-qa-playbook → `23574dd`
- self-hosted-observability-runbook → `c5b7af5`
- compliance-by-template → `52f10e3`
- demo-mode-pre-empty-state → `8053756`
- slops-headroom → `1221894`
- slops-markitdown → `8f537bc`
- slops-taste → `3f421eb`

Per-skill format: `- 0.1.1 — promoted to active 2026-06-12 (commit <short-hash>).`

### Issue 3 — `slops-taste` has two stale references

In `Blueprints/skills/slops-taste/SKILL.md`:

**3a.** Line 23 (Scope section) points at `slops-saloon/Brand/brand-system.md` for default dials. Verify the file exists:

```bash
ls slops-saloon/Brand/brand-system.md 2>&1
```

- If it EXISTS: leave the reference as-is.
- If it does NOT exist: change the line to `Default Slops Saloon dials live inline in this file under § Default Dials (to be added when the brand-system.md doctrine lands).` and append a `## Default Dials` section with placeholder rows: `VARIANCE: medium | MOTION: low | DENSITY: medium` and a note `# placeholder until slops-saloon/Brand/brand-system.md is authored`.

**3b.** Line 40 names `design-brand-guardian` as "still an active candidate agent." Verify against the agent index:

```bash
grep -c "design-brand-guardian" Blueprints/AGENT_INDEX.md 2>&1
grep -c "design-brand-guardian" Blueprints/agents/_retired/*.md 2>&1
```

- If `design-brand-guardian` is present in `AGENT_INDEX.md` Section 5 (active): leave the line as-is.
- If it has been retired (present in `_retired/` or absent from active index): update the line to `Decide brand identity (that's a separate concern — pending owner once design-brand-guardian status is resolved).` Do not invent a replacement name.

### Issue 4 — `slops-markitdown` precondition gap

In `Blueprints/skills/slops-markitdown/SKILL.md`, the wrapper writes to `References/research/<basename>.md` but the precondition list does not mention creating the directory. Append one bullet to the `## Preconditions` section:

```
- Codex creates `References/research/` if missing (`mkdir -p References/research`) before the first conversion.
```

## Commit Format

ONE commit covering all 4 issues, scoped exclusively to the 8 skill files above:

```
chore(skills): post-promotion cleanup — strip PROPOSAL banners, log promotion, fix slops-taste/markitdown gaps

- Strip "(PROPOSAL)" suffix from H1 in all 8 promoted Week 1 + 1.5 skills.
- Append "0.1.1 — promoted to active 2026-06-12" changelog entry to each.
- slops-taste: verify and tighten brand-system.md and design-brand-guardian references.
- slops-markitdown: add References/research/ mkdir precondition.

Follow-up to commits fa0223b..3f421eb. No behavior change.
```

## Verification

After the commit:

1. `git diff --check HEAD~1`: clean.
2. `grep -rn "(PROPOSAL)" Blueprints/skills/<each-of-the-8>/SKILL.md`: no matches inside the 8 H1s.
3. `grep -c "0.1.1 — promoted to active 2026-06-12" Blueprints/skills/<each-of-the-8>/SKILL.md`: each returns `1`.
4. `npm test` still passes at the prior baseline.
5. Confirm no files outside the 8 listed paths are modified by this commit (`git diff --stat HEAD~1`).
6. Do NOT push.

## Out of Scope (do not address in this commit)

- The `slops-context-markdown` vs `slops-markdown-authoring` near-duplicate — open question, awaiting Justin's call.
- Any other proposal still in `_proposals/`.
- Any L2 / Omen file.
- `SKILL_ROUTING.md` row edits (rows are correct as landed).

## Report Back

A short bullet list:
- Each of the 4 issues marked done with the file paths touched.
- For Issue 3a/3b: state which branch you took (file exists vs missing; agent active vs retired) and the resulting text.
- Verification results (1–5 above).
- Commit hash.
