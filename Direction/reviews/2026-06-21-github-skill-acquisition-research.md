# GitHub Skill Acquisition Research

**Date:** 2026-06-21
**Layer:** L0 — SLOPS OS
**Decision:** Which supplied GitHub repositories should improve SLOPS skills, Justin's personal learning system, and future community-information products?

## Recommendation

Do not bulk-install any repository. Harvest a small set of methods into SLOPS-owned workflows, preserving upstream attribution and MIT notices where copied substantially.

Priority order:

1. Adapt Matt Pocock's `teach` into a SLOPS-owned personal learning loop.
2. Adapt customer/community research into a public-interest community-needs workflow.
3. Upgrade existing SLOPS skills with `writing-great-skills`, TDD, diagnostic-loop, and Ponytail simplicity principles.
4. Restore the now-present `strategy-red-team` source to the existing PM reference harvest.
5. Keep OpenCut on the tool watchlist; it is application infrastructure, not a skill source.
6. Do not acquire `cybersecurity-skills` as-is until its license artifact and current-standard gaps are resolved.

## Repository decisions

| Repository | Evidence | Recommendation | Main reason |
|---|---|---|---|
| [`mattpocock/skills`](https://github.com/mattpocock/skills) | MIT; latest inspected commit 2026-06-18; composable engineering/productivity skills | **Harvest first** | Highest fit for personal learning and existing SLOPS engineering procedures. |
| [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) | MIT; latest inspected commit 2026-06-17; broad interconnected marketing library | **Cherry-pick concepts** | Strong research and communication methods, but commercial-growth defaults conflict with public-interest and Corvus-free doctrine. |
| [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) | MIT; latest inspected commit 2026-06-21; benchmarked minimal-code ladder; persistent Node hooks | **Harvest ladder; do not install plugin yet** | Valuable anti-overengineering discipline, but always-on hooks and global behavior could conflict with SLOPS gates. |
| [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) | MIT; latest inspected commit 2026-06-06; nine PM plugins | **Reconcile prior harvest only** | SLOPS already harvested five patterns; full installation duplicates existing PM capability. |
| [`coreyhaines31/cybersecurity-skills`](https://github.com/coreyhaines31/cybersecurity-skills) | README declares MIT, but root `LICENSE` fetch returned 404; latest inspected commit 2026-03-13 | **Hold / reference-only** | Useful checklists, but ambiguous license artifact, standards drift, and major overlap with existing SLOPS/Codex security workflows. |
| [`OpenCut-app/OpenCut`](https://github.com/OpenCut-app/OpenCut) | MIT; latest inspected commit 2026-06-21; active ground-up rewrite | **Tool watchlist** | Potential future headless/MCP video infrastructure, not an agent-skill library; current README directs production users to classic. |

## Acquisition candidates

Scores use the session rubric: reusability, solo-builder leverage, sovereignty fit, low maintenance burden, and low overlap, each 1–5.

| Candidate | Source | Score | Route | Decision |
|---|---|---:|---|---|
| Personal learning loop | [`teach`](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md) | 24/25 | New SLOPS skill proposal | **Acquire/adapt after name and scope approval.** Keep mission, trusted resources, short lessons, retrieval practice, learning records, and community wisdom. Make HTML optional rather than mandatory. |
| Skill-author quality rules | [`writing-great-skills`](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-great-skills/SKILL.md) | 22/25 | Merge into `slops-skill-author` | **Harvest.** Add invocation economics, checkable completion criteria, progressive disclosure, no-op pruning, sediment/sprawl checks, and user-vs-model invocation decisions. |
| Vertical-slice TDD | [`tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md) | 22/25 | Build-phase procedure or proposed `slops-tdd` | **Harvest after overlap review.** One red→green behavior slice at a time and public-interface tests fill a real Build-phase gap. |
| Tight diagnostic loop | [`diagnosing-bugs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md) | 20/25 | Upgrade `slops-investigate` | **Harvest.** Require a fast, deterministic, red-capable reproduction command before hypotheses. Do not create a duplicate skill. |
| Simplicity ladder | [`ponytail`](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md) and [`ponytail-review`](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail-review/SKILL.md) | 21/25 | Upgrade `slops-code-review` and build doctrine | **Harvest.** Add YAGNI → standard library → native platform → installed dependency → minimum implementation, without weakening validation, security, accessibility, or data-loss handling. |
| Community-needs research | [`customer-research`](https://github.com/coreyhaines31/marketingskills/blob/main/skills/customer-research/SKILL.md) + [`community-marketing`](https://github.com/coreyhaines31/marketingskills/blob/main/skills/community-marketing/SKILL.md) | 23/25 | New public-interest skill proposal | **Acquire/adapt.** Preserve member-first value, source confidence, bias checks, verbatim needs, rituals, and feedback loops. Replace leads/revenue/evangelist goals with reach, verified help, response time, resource freshness, and harm reporting. |
| Community information publishing | [`content-strategy`](https://github.com/coreyhaines31/marketingskills/blob/main/skills/content-strategy/SKILL.md) | 20/25 | Playbook paired with community-needs research | **Harvest concepts.** Use authoritative-source content pillars, searchable answers, multilingual/accessible formats, expiry dates, and correction workflows. |
| Strategy red-team | [`strategy-red-team`](https://github.com/phuryn/pm-skills/blob/main/pm-execution/skills/strategy-red-team/SKILL.md) | 24/25 | Existing PM reference harvest | **Reconcile.** The upstream file exists now, contradicting the local 2026-06-20 note that it did not. Replace the substitute only after a scoped diff and Justin approval. |
| Intended-vs-implemented review | [`pm-ai-shipping`](https://github.com/phuryn/pm-skills/blob/main/pm-ai-shipping/README.md) | 18/25 | Reference method for review/DoD | **Harvest method only.** Full plugin overlaps `slops-code-review`, `slops-quality-baseline`, Codex Security, and Corvus Done gates. |
| Dependency/security checklists | [`dependency-audit`](https://github.com/coreyhaines31/cybersecurity-skills/blob/main/skills/dependency-audit/SKILL.md), [`owasp-audit`](https://github.com/coreyhaines31/cybersecurity-skills/blob/main/skills/owasp-audit/SKILL.md), [`incident-triage`](https://github.com/coreyhaines31/cybersecurity-skills/blob/main/skills/incident-triage/SKILL.md) | 15/25 | Reference-only until corrected | **Hold.** Useful structure, but current files cite OWASP Top 10:2021 and NIST SP 800-61r2. OWASP Top 10:2025 is current, and NIST SP 800-61r3 supersedes withdrawn r2. |

## Direct improvements to current SLOPS skills

| Current artifact | Improvement to harvest |
|---|---|
| `slops-skill-author` | Invocation economics; model-invoked vs user-invoked choice; completion criteria; progressive disclosure; no-op/sediment/sprawl pruning. |
| `slops-investigate` | A named, already-run, red-capable feedback loop as the Phase-1 completion gate. |
| Build doctrine / lifecycle | Vertical red→green tracer bullets through public interfaces; avoid bulk horizontal test writing. |
| `slops-code-review` | A separate simplicity pass with deletion opportunities and explicit non-negotiable security/accessibility boundaries. |
| `planning-pass` | Optional strategy red-team on load-bearing assumptions before expensive work enters the sprint. |
| Community/content procedures | Source confidence, sample-bias checks, resource freshness, correction path, multilingual/accessibility requirements, and member-first—not engagement-first—metrics. |

## Personal development fit

| Goal | What these repositories provide | Remaining gap |
|---|---|---|
| Programming | TDD, domain modeling, diagnostics, simplicity reviews | Needs a sequenced curriculum and practice projects. |
| AI engineering | Skill authoring, intended-vs-implemented review, security checklists | Needs model evaluation, prompt/version experiments, data governance, cost/latency, and local-model operations. |
| Financial capability | PM strategy and existing `slops-financial-sketch` support business scenarios | No source here is an authoritative personal-finance curriculum. Research must use regulator, tax-authority, fiduciary, and accredited educational sources. |
| Physical health | `teach` provides a learning/practice scaffold | No repository supplies medically authoritative exercise, nutrition, injury, sleep, or accessibility guidance. |
| Emotional and mental health | `teach` supports reflection and spaced learning | No repository supplies clinical authority, crisis handling, safeguarding, or diagnostic boundaries. |
| Community service | Community research, content strategy, and future OpenCut content tooling | Needs public-resource verification, privacy, vulnerable-user safety, offline/SMS access, multilingual support, and correction/escalation procedures. |

Health and financial learning must be educational, source-backed, and clearly separated from diagnosis, treatment, crisis counseling, tax advice, legal advice, or individualized investment recommendations.

## Product direction inferred from the mission

Prefer two products with separate trust boundaries rather than one combined profile:

1. **Private personal learning and stability workspace** — mission, curriculum, practice, retrieval, reflection, progress records, and trusted-resource ledger. Local-first where possible; sensitive wellness notes remain private.
2. **Public community essentials navigator** — verified food, shelter, health access, transportation, benefits, emergency, and local-information resources. Anonymous by default; freshness dates, source provenance, corrections, multilingual output, offline/PWA support, and later SMS/voice access.

They may share publishing and verification components, but they should not share personal wellness/financial profiles. Combining them creates unnecessary privacy and safeguarding risk.

## Evidence ledger

| Claim | Source | Freshness | Confidence | Decision impact |
|---|---|---|---|---|
| `teach` is a stateful, mission-grounded learning system with resources, lessons, records, retrieval practice, and community wisdom | [`teach/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md) | Inspected 2026-06-21 | High | Primary new-skill candidate. |
| Ponytail runs lifecycle hooks at session start and prompt submit | [`plugin.json`](https://github.com/DietrichGebert/ponytail/blob/main/.claude-plugin/plugin.json), [`claude-codex-hooks.json`](https://github.com/DietrichGebert/ponytail/blob/main/hooks/claude-codex-hooks.json) | Inspected 2026-06-21 | High | Do not install globally without hook review. |
| OpenCut is an active rewrite and production users are directed to classic | [`OpenCut README`](https://github.com/OpenCut-app/OpenCut/blob/main/README.md) | Inspected 2026-06-21 | High | Watchlist, not acquisition. |
| SLOPS already harvested PM patterns | `Blueprints/skills/_proposals/pm-skills-harvest-plan.md`, `References/patterns/pm-skills/` | Local 2026-06-20 | High | Avoid full duplicate install. |
| `strategy-red-team` currently exists upstream | [`strategy-red-team/SKILL.md`](https://github.com/phuryn/pm-skills/blob/main/pm-execution/skills/strategy-red-team/SKILL.md) | Inspected 2026-06-21 | High | Local harvest note needs reconciliation. |
| Cybersecurity repo's root license artifact is unresolved | [`cybersecurity-skills README`](https://github.com/coreyhaines31/cybersecurity-skills/blob/main/README.md); root `LICENSE` returned 404 | Inspected 2026-06-21 | High | Do not copy/distribute as MIT until clarified. |
| Cybersecurity baselines lag current standards | [`owasp-audit`](https://github.com/coreyhaines31/cybersecurity-skills/blob/main/skills/owasp-audit/SKILL.md), [`incident-triage`](https://github.com/coreyhaines31/cybersecurity-skills/blob/main/skills/incident-triage/SKILL.md), [OWASP Top 10:2025](https://owasp.org/Top10/2025/), [NIST SP 800-61r3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | Official pages verified 2026-06-21 | High | Hold as reference-only until refreshed. |

## Risks and unknowns

- No upstream package was cloned, installed, or executed; runtime behavior beyond inspected files remains unverified.
- `marketingskills` contains many interconnected assumptions around product-marketing context. Cherry-picked skills require dependency pruning and public-interest reframing.
- Ponytail benchmark claims were not independently reproduced.
- The exact personal-learning skill name and storage location need Justin approval.
- Community resource data providers, update cadence, liability, moderation, and local-government/nonprofit partnerships require a separate research pass.

## Next action

During the acquisition session, approve or reject these three first-wave items:

1. A SLOPS-owned personal learning loop adapted from `teach`.
2. A community-needs research skill adapted from customer/community research.
3. A scoped improvement batch for `slops-skill-author`, `slops-investigate`, Build/TDD doctrine, and `slops-code-review`.

Do not install any upstream plugin before that approval and a package/hook review.
