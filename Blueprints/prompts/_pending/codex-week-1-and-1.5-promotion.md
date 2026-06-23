# Codex Prompt — Week 1 + Week 1.5 Skill Promotion Pass

**Status:** ready to run after Justin reviews
**Created:** 2026-06-12
**Replaces:** the Week-1-only prompt drafted 2026-06-11

Paste the block below into a fresh Codex session in `C:\Users\JDuve\dev\SLOPS\`.

---

```text
You are Codex working in the SLOPS root on branch master at commit fd05018+.

OBJECTIVE
Promote the Week 1 + Week 1.5 skill proposals out of
Blueprints/skills/_proposals/ into flat, active SLOPS skills, and register
each one in SKILL_ROUTING.md.

READ FIRST (in order)
1. Blueprints/handoffs/2026-06-11-skills-acquisition-handoff.md
2. Blueprints/handoffs/2026-06-11-omen-pull-prep-handoff.md (revised 2026-06-12)
3. Blueprints/skills/SKILL_ROUTING.md
4. Blueprints/skills/SLOPS_LIFECYCLE.md
5. Blueprints/skills/_template/SKILL.md
6. Each proposal you are about to promote.

SCOPE — promote these eight, in this order, one at a time:
WEEK 1
1. slops-legal-spot-check
2. mobile-first-qa-playbook
3. self-hosted-observability-runbook
4. compliance-by-template
5. demo-mode-pre-empty-state
WEEK 1.5
6. slops-headroom
7. slops-markitdown
8. slops-taste
ANNOUNCE ONLY (no move)
9. Blueprints/playbooks/proprietary-math-stack-playbook.md — add a routing note.
10. Blueprints/skills/_proposals/STRATEGY-md-pattern.md — promote to
    Blueprints/patterns/STRATEGY-md-pattern.md (NEW folder; create it).
11. Blueprints/skills/_proposals/slops-graphify-v2-smoke-test.md — leave in
    _proposals/ until the smoke test runs; add a routing note flagging it as
    "test plan, not a skill."

PER-SKILL PROCEDURE (for items 1-8)
For each:
  a. `git mv Blueprints/skills/_proposals/<name>/ Blueprints/skills/<name>/`
     so history is preserved.
  b. Open the moved SKILL.md and flip frontmatter `status: draft` →
     `status: active`. Leave version at 0.1.0. Do not edit any other field.
  c. Append a row to SKILL_ROUTING.md § "Current SLOPS Skills" matching the
     existing column shape (Skill | Default Agent | Layer | Purpose). Take the
     values from the moved SKILL.md frontmatter and description.
  d. Update SLOPS_LIFECYCLE.md status entry where the skill clearly completes
     a lifecycle phase or auxiliary axis:
     - mobile-first-qa-playbook → Design QA axis
     - compliance-by-template → new "Legal" auxiliary row
     - self-hosted-observability-runbook → new "Observability" auxiliary row
     - slops-headroom → new "Context discipline" auxiliary row
     - slops-markitdown → new "Ingest" auxiliary row
     - slops-taste → Design QA axis (companion to slops-ui-ux-audit)
     - slops-legal-spot-check, demo-mode-pre-empty-state → add notes only,
       don't claim a phase swap.

FOR ITEM 9 (playbook announcement, no move)
Add a single row to SKILL_ROUTING.md § "Special Routing Rules" pointing at
Blueprints/playbooks/proprietary-math-stack-playbook.md with trigger phrase
"baseline math | nflverse | proprietary math | ADP math | Omen math".

FOR ITEM 10 (STRATEGY.md pattern)
`git mv Blueprints/skills/_proposals/STRATEGY-md-pattern.md
Blueprints/patterns/STRATEGY-md-pattern.md` (create Blueprints/patterns/ if
absent; add a one-line README.md there saying "Reusable patterns referenced
by skills; not themselves skills.").
Add a routing note in SKILL_ROUTING.md § "Special Routing Rules" pointing at
the pattern with trigger phrase "STRATEGY.md | product strategy anchor".

FOR ITEM 11 (graphify v2 smoke-test plan)
Do NOT move. It stays in _proposals/. Add a routing note in
SKILL_ROUTING.md § "Special Routing Rules" pointing at
Blueprints/skills/_proposals/slops-graphify-v2-smoke-test.md with the note
"upstream swap candidate; do not act on without Justin running the side-by-
side smoke test first."

CONSTRAINTS
- Use `git mv`, not delete-then-write. Preserve history.
- Explicit paths only on every `git add`. No `git add -A`.
- One commit per promoted skill, message:
    chore(skills): promote <name> from proposal to active
- The playbook announcement, STRATEGY.md pattern move, and graphify smoke-
  test routing get their own commits:
    chore(skills): register proprietary-math-stack-playbook in routing
    chore(patterns): promote STRATEGY-md-pattern to Blueprints/patterns
    chore(skills): register slops-graphify-v2 smoke-test plan in routing
- Do NOT touch:
    Blueprints/skills/_proposals/* that are NOT in the scope list above
    (slops-image-prompt, slops-exec-summary, slops-ai-integration-review,
    slops-data-ingest-plan, slops-financial-sketch, slops-screenplay-loop,
    slops-design-system-pack, slops-product-pulse, slops-explainer-cut,
    slops-animation-render, slops-lore-review, pm-skills-harvest-plan.md,
    AGENT_INDEX-retirement-diff.md)
    Blueprints/agents/_imported/
    slops-saloon/* or any L2 path
- Do NOT push. Justin's gate.
- Do NOT run `npm install`, `pip install`, `npx skills add`, or any tool
  install for the new wrapper skills (slops-headroom, slops-markitdown,
  slops-taste). Those installs are Justin-side, not Codex. The wrapper SKILL
  .md files describe the install commands; Codex just promotes the files.

VERIFY BEFORE COMMIT, PER SKILL
- `ls Blueprints/skills/<name>/SKILL.md` exists.
- `grep -c "^| \`<name>\`" Blueprints/skills/SKILL_ROUTING.md` returns 1.
- `grep "status: active" Blueprints/skills/<name>/SKILL.md` returns the line.

REPORT (at the end, in your reply)
- Files moved (per skill).
- SKILL_ROUTING.md rows added (paste them).
- SLOPS_LIFECYCLE.md rows touched.
- Blueprints/patterns/ created? STRATEGY-md-pattern moved? confirm.
- Any skill that didn't promote cleanly and why.
- The exact 11 commit hashes (8 skill promotions + 1 playbook announcement
  + 1 pattern promotion + 1 smoke-test routing).

ESCALATE TO CLAUDE IF
- A proposal SKILL.md fails the template's quality checklist on read-back.
- SKILL_ROUTING.md formatting drifts (don't fix silently — flag it).
- A move would clobber an existing same-named folder.
- A wrapper skill's `upstream` field references a package or repo Justin
  hasn't approved (cross-check against memory entries
  project_proprietary_math_doctrine, project_open_agreements_termly_replacement;
  the rest were approved 2026-06-11 in the acquisition session).
```

---

## When to run this

After Justin reviews the eight scaffolds and gives final approval. The proposals have already been approved at the scoping level; this is the implementation pass.

## What this prompt does NOT cover (later passes)

- Week 2 skills (image-prompt, exec-summary, financial-sketch, ai-integration-review, data-ingest-plan, screenplay-loop, design-system-pack, product-pulse).
- The graphify v2 upstream swap (gated on smoke test; not part of promotion).
- The pm-skills harvest (gated on Justin approving the specific 5 patterns + installing pm-ai-shipping plugin).
- Parked stubs (explainer-cut, animation-render, lore-review).
- Any L2 (Omen) pull — that waits for Phase 1.1 to ship, per `2026-06-11-omen-pull-prep-handoff.md`.
