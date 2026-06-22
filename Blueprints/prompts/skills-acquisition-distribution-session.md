# Skills Acquisition and Distribution Session

> **Executed 2026-06-21.** The baseline below is historical. Results and remaining gaps are in `Direction/reviews/2026-06-21-skill-acquisition-distribution-result.md`. Reuse this prompt only for a future acquisition wave after replacing the baseline with current inventory.

Use this prompt for the next Layer-0 capability session. Claude leads evaluation and doctrine work; Codex performs approved file changes, distribution, and verification.

```text
You are running a SLOPS OS Layer-0 skills acquisition and distribution session.

Objective:
Acquire only high-leverage skills or procedures, normalize them into the SLOPS skill system, distribute every approved active SLOPS skill to both Claude and Codex, and finish with an evidence-backed map of where skills/procedures are actually used and what gaps remain.

Active repository:
- Resolve with `git rev-parse --show-toplevel` at session start.
- Expected for this workspace: C:\Users\JDuve\dev\SLOPS
- Do not treat old C:\Users\JDuve\OneDrive\Desktop\SLOPS references as current authority.

Read first, in order:
- AGENTS.md or CLAUDE.md
- Direction/facts-of-record.md
- Direction/decision_log.md
- Blueprints/RESOURCES_INDEX.md
- Blueprints/skills/SKILL_ROUTING.md
- Blueprints/skills/SLOPS_LIFECYCLE.md
- Direction/reviews/2026-06-21-skill-acquisition-distribution-baseline.md
- Direction/reviews/2026-06-21-github-skill-acquisition-research.md
- Blueprints/skills/slops-skill-author/SKILL.md
- Blueprints/agent-modules/hard-prohibitions.md
- Blueprints/agent-modules/session-handoff.md

Current baseline to verify, not assume:
- 48 canonical SLOPS skill package directories.
- Routing table: 46 active, 1 paired-with, 1 retired.
- Registry mismatch: product-gap-analysis-session exists and declares itself active but is absent from SKILL_ROUTING.md; retired slops-markdown-authoring remains as a routing-only history row.
- Only 14 of 48 canonical skill names currently exist in each agent install; 34 are missing from each.
- Of the 14 present, only 2 SKILL.md files match canonical content exactly; 12 differ.
- Six Layer-0 playbooks exist.
- Existing canonical and installed files contain stale absolute OneDrive paths. Do not bulk-sync stale path assumptions.

Phase 1 — establish authoritative inventory:
1. Confirm Git root, branch, and dirty files. Preserve all unrelated user changes.
2. Inventory canonical skill packages under Blueprints/skills/<name>/.
3. Parse SKILL_ROUTING.md Status values and reconcile them against package directories and SKILL.md frontmatter.
4. Inventory playbooks, runbooks, templates, kickoff modules, done gates, and active prompts separately. Do not misclassify procedures as skills.
5. Inventory both actual install roots:
   - Codex: $HOME/.codex/skills/
   - Claude: $HOME/.claude/skills/
6. Compare every canonical file by relative path and SHA-256. Report extra target-only runtime metadata separately; do not call an install stale only because it has non-conflicting interface metadata.
7. Search live instructions for stale absolute roots. Resolve path authority before copying affected packages.

Phase 2 — evaluate acquisitions:
1. Identify missing capabilities from current product work and lifecycle evidence, not from novelty.
2. For each candidate, score 1-5 on:
   - reusability across Slops products
   - solo-builder leverage
   - sovereignty/self-hosting fit
   - maintenance burden (5 = low burden)
   - overlap penalty (5 = no meaningful overlap)
3. Cite source, license, install/runtime requirements, security implications, network behavior, and whether the candidate is a skill, playbook, template, tool, connector, or reference.
4. Reject candidates that duplicate an active SLOPS workflow or create more maintenance than leverage.
5. Stop for Justin's approval on the candidate list, names, scope, paid dependencies, installs, or external connectors. Do not install or author before approval.

Phase 3 — normalize approved acquisitions:
1. Use slops-skill-author for every new or materially revised SLOPS skill.
2. Write canonical content first at Blueprints/skills/<name>/.
3. In the same pass:
   - set accurate SKILL.md frontmatter and boundaries
   - register status and routing in SKILL_ROUTING.md
   - update SLOPS_LIFECYCLE.md when lifecycle or distribution coverage changes
   - update RESOURCES_INDEX.md only when its facts/counts change
   - record durable decisions in Direction/decision_log.md
4. Keep app-specific procedures in L2 unless Justin explicitly promotes a reusable pattern to L0.
5. Never activate imported agents as skills without the required review/wrapper process.

Phase 4 — distribute approved active SLOPS skills:
1. Reconfirm canonical source and both target directories.
2. Back up only the target skill folders that will change.
3. Copy approved active SLOPS skill packages from canonical to both agent directories.
4. Do not distribute retired, proposed, quarantined, or unresolved-registry packages.
5. Preserve target-only runtime metadata unless it conflicts with canonical behavior; report it.
6. Verify every canonical file by relative-path hash in both targets.
7. Verify each skill is discoverable/loadable in both runtimes where the runtime supports a listing check. Presence alone is not a load test.
8. Report exact synced, drifted, missing, extra, and load-failed counts for each agent.

Phase 5 — map usage, procedures, and gaps:
Produce an adoption audit. A text reference is not proof of use.

For every active or paired skill, record:
- canonical status and default agent
- installed and hash-verified in Claude
- installed and hash-verified in Codex
- L0 routing/entry point
- L1 routing/entry point
- L2 routing/entry point
- strongest actual-use evidence (audit, handoff, test output, decision, done-ledger entry, or generated artifact)
- last evidenced use date
- adoption state: invoked-and-evidenced / wired-not-evidenced / referenced-only / distributed-not-routed / missing
- gap and smallest corrective action

For procedures, map at minimum:
- Frame through Scale lifecycle phases in SLOPS_LIFECYCLE.md
- L0/L1/L2 AGENTS.md and CLAUDE.md wrapper inheritance
- kickoff modules: read-first, pull-task, plan-approval, safety-gates, done-and-close
- Corvus definition-of-done and each done gate
- playbooks/runbooks/templates and their callers
- handoff and decision-log closeout procedure

Classify gaps as:
- registry/status mismatch
- distribution/hash drift
- runtime load/discovery failure
- stale-path or stale-authority guidance
- no L1/L2 entry point
- referenced but never evidenced
- lifecycle/procedure coverage gap
- duplicate or conflicting workflow
- missing tool/runtime dependency
- missing evidence/observability

Required final artifacts:
- Direction/reviews/YYYY-MM-DD-skill-procedure-usage-gap-audit.md
- Blueprints/handoffs/YYYY-MM-DD-skills-acquisition-distribution-handoff.md
- Any approved canonical skill/routing/lifecycle changes
- A concise chat summary with acquisition decisions, distribution verification counts, strongest adoption evidence, top gaps, and the next three corrective actions

Acceptance criteria:
- Every approved active canonical skill is reconciled across canonical, Claude, and Codex.
- No stale absolute-root assumption is silently propagated.
- Every acquisition has source/license/runtime evidence and Justin approval.
- The final audit distinguishes installed, routed, referenced, invoked, and evidenced use.
- Procedure coverage is shown across L0, L1, and L2.
- Gaps are prioritized by impact and smallest safe corrective action.

Do not:
- edit Corvus product source during this Layer-0 session
- edit .env, credentials, cookies, secrets, package files, SQL, migrations, deploy config, or production infrastructure
- install dependencies, connect services, push, merge, deploy, delete, or move cross-layer files without Justin's explicit approval
- use git add -A or git add .
- claim a skill loads or is used without evidence

Completion report:
- files changed
- candidate decisions and sources
- canonical/Claude/Codex reconciliation counts
- load-verification method and failures
- usage-evidence summary by layer
- procedure coverage summary
- prioritized gaps
- commands run
- known limitations
- next recommended action
```
