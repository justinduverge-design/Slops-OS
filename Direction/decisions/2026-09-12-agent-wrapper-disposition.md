---
metadata_profile: valor-brain/v1
page_id: slops.os.agents.wrapper-disposition
page_type: architecture-decision
layer: L0
authority: CANONICAL
owner: Justin Duverge
state:
  decision: RATIFIED
  rollout: APPLIED
sources:
  - Blueprints/agents/AGENT_INDEX.md
  - Blueprints/skills/SKILL_ROUTING.md
  - Direction/TODO.md
relationships:
  requires: []
  enables:
    - os1-candidate-status-resolution
    - agent-wrapper-conversion-wave-2
  checks_against:
    - Blueprints/tools/truth-gate/README.md
    - Blueprints/tools/tool-permissions.md
freshness:
  reviewed_on: 2026-09-12
  triggers:
    - a wrapper is converted, deleted, or activated
    - SKILL_ROUTING gains or loses a "Converted from" row
    - the company acquires a sales, paid-media, or localization motion
snapshot:
  repository: justinduverge-design/Slops-OS
  commit: 764580b
  compiled_by: Claude (Cowork)
---

# Decision — disposition of the 36 agent wrappers, and the answer to OS1

## Compiled truth

`OS1` asked whether the `candidate` rows in `AGENT_INDEX.md` are approved current truth. They
are not, and they never were uniformly: **the 36 files are three different things wearing one status.**

**Converted — 7 wrappers, now `superseded` (applied 2026-09-12).** The conversion happened between
2026-06 and 2026-08 and was recorded only on the skill side, in `SKILL_ROUTING.md` "Converted from"
rows. The wrapper files and §5 kept saying `candidate`, and §5 kept asserting "MUST equal disk at
36 of 36" — true about files, false about what was live. Files retained as provenance for how each
skill was derived; not activatable.

| Wrapper | Successor skill |
|---|---|
| `support-legal-compliance-checker` | `slops-legal-spot-check` |
| `design-image-prompt-engineer` | `slops-image-prompt` |
| `support-executive-summary-generator` | `slops-exec-summary` |
| `finance-financial-analyst` | `slops-financial-sketch` |
| `finance-fpa-analyst` | `slops-financial-sketch` |
| `engineering-ai-integration-advisor` | `slops-ai-integration-review` |
| `engineering-data-engineer-advisor` | `slops-data-ingest-plan` |

**Convert next — 6, judged against the company that exists.** Each has live work waiting for it and
no existing skill covering it.

| Wrapper | Why now |
|---|---|
| `design-ux-researcher` | A TestFlight cohort is live. Nothing turns tester reactions into queue items. |
| `support-support-responder` | Pairs with `W1-B` (in-app report and beta feedback pill). |
| `marketing-reddit-community-builder` | Beta recruiting; the only named channel. |
| `marketing-content-creator` | Feeds `slops-explainer-cut` and `slops-animation-render`. |
| `marketing-video-optimization-specialist` | Same content lane, distribution half. |
| `project-management-experiment-tracker` | The closest existing thing to a standing planning owner. |

**Fold in — 5.** Scope already covered; convert nothing, point the reader at the owner instead.
`specialized-compliance-auditor` → `slops-legal-spot-check` + `compliance-by-template`;
`engineering-backend-architect-advisor` → `slops-api-hardening`;
`support-analytics-reporter` → `slops-product-pulse`;
`design-brand-guardian` → `marketing:brand-review`;
`project-manager-senior` / `project-management-project-shepherd` → the existing loop.

**Amended by the founder, 2026-09-12 — the proposed 18-file deletion was wrong about the layer.**

The original recommendation read a commercial capability as dead because *Omen* has no sales motion.
That conflated L2 with L0. Omen is free indefinitely; **Slops OS is a company whose stated purpose is
to generate revenue.** Sales and paid-acquisition capability is L0 company capability held for a
future paid product, not Omen overhead. Deleting it would have discarded the layer distinction the
DBS model exists to preserve.

**Parked — 15, each behind a named gate.** Retained at L0, not activatable, no longer ambiguous:

| Gate | Wrappers | Opens when |
|---|---|---|
| `revenue-motion` | the 7 `sales/` + `marketing-social-media-strategist` | Slops sells something. |
| `paid-acquisition` | the 4 `paid-media/` | Slops runs paid acquisition with a real budget. |
| `localization` | `language-translator` | Slops ships a non-English surface. |
| `developer-audience` | `specialized-developer-advocate` | Slops has an external developer audience. |

`parked` is the honest status. `candidate` said "reviewed, undecided" for months and decided nothing;
a gate names the event that ends the wait.

**Deleted — 3.** The `academic/` lore wrappers — anthropologist, historian, narratologist — and the
empty `academic/` directory. Founder reason: the team-identity system is being rebuilt from scratch
and will not inherit this framing. Recoverable from git if that changes.

**Why the whole class failed.** A wrapper file describes *who someone is*. It carries no input, no
output, and no `Done when:`, so there is nothing to invoke and nothing to check — which is why all
36 sat at `candidate` for months without anyone noticing that 7 had already moved on. The
conversion target is not a better wrapper; it is a skill with a checkable completion criterion.

## Append-only timeline

- **2026-09-12:** Reconciled §5 against `SKILL_ROUTING.md`. 7 wrappers flipped to `superseded` with
  `superseded_by`. Convert/fold/delete verdict recorded. Deletions staged pending a founder call.
- **2026-09-12 (same day, after founder review):** The 18-file deletion was **amended down to 3** on
  layer grounds — see above. 15 wrappers moved to `parked` with four named gates; the 3 `academic/`
  wrappers deleted with their directory. §5 now reads 33 files: 7 superseded, 14 parked, 12 candidate.
  **`OS1` is answered and closed.**
