# GitHub Skill Research Handoff

> **Resolved 2026-06-21.** Justin approved the recommended bounded adaptations. Implementation and distribution evidence is in `Direction/reviews/2026-06-21-skill-acquisition-distribution-result.md`.

**Date:** 2026-06-21
**Layer:** L0 — SLOPS OS

## Files updated

- `Direction/reviews/2026-06-21-github-skill-acquisition-research.md` — primary-source comparison, acquisition recommendations, personal-development fit, and product-direction inference.
- `Blueprints/prompts/skills-acquisition-distribution-session.md` — added the research memo to the session read-first list.
- `Blueprints/handoffs/2026-06-21-github-skill-research-handoff.md` — this continuation record.

## Files discussed

- `Blueprints/skills/_proposals/pm-skills-harvest-plan.md`
- `References/patterns/pm-skills/`
- Supplied GitHub repositories and selected `SKILL.md`, README, license, plugin manifest, and hook files
- OWASP Top 10:2025 and NIST SP 800-61r3 official pages

## Decisions made

- Research recommendation only; no acquisitions or installs were approved by this pass.
- Bulk installation is rejected as the default. SLOPS should harvest targeted methods into canonical workflows.
- Personal learning and public community-resource products should have separate trust boundaries.

## Unresolved questions

- Resolved: authored `slops-learning-loop` and `slops-community-needs-research`.
- Resolved: added `slops-tdd` and integrated it into Build-phase kickoff procedures.
- Resolved: restored `strategy-red-team` as a reference while retaining prioritization/WWA separately.
- Resolved for this wave: harvested Ponytail's simplicity method only; did not install hooks/plugin.

## Blockers surfaced

- `cybersecurity-skills` declares MIT in README but lacks a root `LICENSE` at the inspected path.
- Its OWASP and NIST baselines are behind current 2025/r3 standards.
- OpenCut's main repository is an active rewrite and is not production-ready according to its own README.

## Last verified result

- Six repositories inspected through GitHub metadata, source files, licenses, and latest commits.
- Official OWASP Top 10:2025 and NIST SP 800-61r3 pages returned HTTP 200.
- No dependency install, clone, external connector mutation, product edit, or production action occurred.

## Next recommended pull

Use the bounded pilots and gap priorities in `Direction/reviews/2026-06-21-skill-acquisition-distribution-result.md`.
