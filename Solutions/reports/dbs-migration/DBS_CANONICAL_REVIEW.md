# DBS Canonical Review

Created: 2026-05-21

## Scope

This is a review-only Phase 3 report.

No files were moved, deleted, archived, deployed, committed, pushed, or overwritten. No `.env` files, secrets, keys, tokens, cookies, credentials, DNS, SSL, Nginx, Docker, GitHub Actions, production config, active app source code, package files, SQL, scripts, tests, or `.git` folders were modified.

Inputs reviewed:

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\DBS_MIGRATION_PLAN.md`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\DBS_PHASE_2_COPY_REPORT.md`
- DBS copies under `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction`
- DBS copies under `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints`
- DBS copies under `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus`

## 1. Root SLOPS Files That Should Become Canonical In Direction

Recommended canonical SLOPS OS Direction files:

| Canonical DBS Path | Original Path | Recommendation | Notes |
| --- | --- | --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction\context.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\context.md` | Make canonical after one transition notice. | This is the active source-of-truth style doc for Corvus/SLOPS context. Keep root original during transition. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction\roadmap.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\roadmap.md` | Make canonical after one transition notice. | Current product roadmap belongs cleanly in Direction. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction\manifesto.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\manifesto.md` | Make canonical after one transition notice. | Durable doctrine belongs in Direction. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction\TODO.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\TODO.md` | Candidate canonical, but review against active sprint docs first. | TODO may overlap with `ssffmvp\current_sprint.md`, `agent_inbox.md`, and handoffs. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Direction\00_FINAL_PLAN.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\00_FINAL_PLAN.md` | Historical direction, not active canonical until reviewed. | The name suggests finality, but current app docs may supersede parts of it. |

Recommended rule: make `Direction` the canonical home for root operating docs only after a small redirect/update pass, not by deleting or moving root files immediately.

## 2. Root Files That Should Remain In Place For Now

These should remain at root because tools, agents, or humans may still expect them there:

| Root Path | Reason To Keep In Place |
| --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\context.md` | Required-read path for agents and current session instructions. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\roadmap.md` | Required-read path for agents and existing workflow memory. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\manifesto.md` | Required-read path for agents and existing workflow memory. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\CLAUDE.md` | Tooling and Claude workflows may look for this exact root path. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\AGENT.md` | Agent instructions may still reference the root file. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\README.md` | Root landing doc should remain in place unless replaced by a redirect-style overview. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\TODO.md` | Humans may expect it at root until the Direction path is adopted. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\00_FINAL_PLAN.md` | Keep until reviewed for superseded decisions. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\runbook_ai_workflow.md` | Keep until workflow references are updated to `Blueprints\playbooks`. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\pre-build-research.skill` | Keep until skill loaders or humans no longer reference root. |

Root files should not be archived until after a redirect/update pass confirms there are no tool or human dependencies.

## 3. Corvus Files That Should Become Canonical In Corvus

Recommended canonical Corvus product-layer files:

| Canonical DBS Path | Original Path | Recommendation | Notes |
| --- | --- | --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Brand\voice.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\brand\brand_voice.md` | Make canonical. | Voice belongs in product brand doctrine. Keep root copy until references are updated. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Blueprints\specs\design.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\design.md` | Make canonical after design review. | Corvus design direction belongs in product blueprints or brand docs. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Blueprints\specs\001-corvus-decision-layer.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\specs\001-corvus-decision-layer\spec.md` | Product canonical candidate. | Keep app spec original as canonical for repo workflows until references are updated. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Blueprints\specs\002-homepage-product-priority.md` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\specs\002-homepage-product-priority\spec.md` | Product canonical candidate. | Keep app spec original as canonical for repo workflows until references are updated. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\logos\Corvus Logo.png` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Corvus Logo.png` | Candidate canonical logo asset. | Needs Justin selection against the other logo variants. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\logos\Corvus Logo2.png` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Corvus Logo2.png` | Candidate canonical logo asset. | Needs Justin selection. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\logos\Corvus Logo 3.png` | `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Corvus Logo 3.png` | Candidate canonical logo asset. | Needs Justin selection. |

Recommended rule: Corvus product/brand doctrine should become canonical inside `ssffmvp\Corvus`, while active app implementation docs and source-driven specs remain canonical in the app repo until workflow references are changed.

## 4. Corvus Reference Copies That Should Not Replace Active App Files

These are useful review/reference copies but should not replace active app files:

| DBS Path | Why It Is Reference Only |
| --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\References\BRAND_STRATEGY.md` | Source remains `ssffmvp\BRAND_STRATEGY.md` until the strategy is cleaned and promoted. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\References\corvus_brand_product_context.original.md` | Explicitly copied as an unchanged original for later split; not yet canonical. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\References\rebrand_notes.md` | Historical/naming doctrine reference until positioning is distilled. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Blueprints\specs\draft_assistant_spec.md` | Root/app draft assistant spec may contain older implementation detail. Review against current app contracts before promotion. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Solutions\website-template\corvus_website_app_template.jsx` | Prototype/template only. It is not active frontend source. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\logos\corvus-apollo-logo-client-copy.png` | Reference copy of implementation asset. Active app copy remains under `client\public`. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\logos\corvus-apollo-logo-frontend-copy.png` | Reference copy of implementation asset. Active app copy remains under `frontend\public`. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\screenshots\landing-desktop.png` | QA/reference screenshot, not source. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\screenshots\landing-mobile.png` | QA/reference screenshot, not source. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\Assets\screenshots\football-route.png` | QA/reference screenshot, not source. |

Do not replace files under `frontend`, `client`, `src`, `sql`, `scripts`, `test`, package files, or deployment config from Corvus DBS reference copies.

## 5. Files To Split Later

### `corvus_brand_product_context.md`

Current copied review path:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\References\corvus_brand_product_context.original.md`

Recommended split:

| Future File | Content To Extract |
| --- | --- |
| `Corvus\Direction\context.md` | Product name, product identity, core user problem, MVP feature, platform targets, success criteria, product rule. |
| `Corvus\Brand\brand.md` | Brand theme, visual direction, product vocabulary, landing copy, product language. |
| `Corvus\Blueprints\specs\omen-of-the-week.md` | Omen requirements, dashboard requirements, AI behavior standard, MVP success flow. |

Needs Justin review before split because the source mixes product doctrine, brand doctrine, feature spec, and landing copy.

### `BRAND_STRATEGY.md`

Current copied review path:

`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Corvus\References\BRAND_STRATEGY.md`

Recommended split:

| Future File | Content To Extract |
| --- | --- |
| `Corvus\Brand\positioning.md` | Name, tagline, tone, brand architecture, production route stance, pricing concept caveats. |
| `Corvus\Brand\brand.md` | Visual identity, voice principles, AAA brand rule. |
| `Corvus\Direction\roadmap.md` | Phase roadmap only after reconciling with current `Direction\roadmap.md` and app roadmap. |
| `Corvus\References\production-cautions.md` | Production cautions and non-negotiables that should remain visible but not mixed into brand copy. |

Needs Justin review before split because it includes active production cautions and older phase plans.

## 6. Duplicates To Review Before Archive

Review these duplicate groups before any archive decision:

| Duplicate Group | Review Needed |
| --- | --- |
| Root `context.md`, `roadmap.md`, `manifesto.md`, `TODO.md`, `00_FINAL_PLAN.md` vs `Direction\*` copies | Confirm Direction becomes canonical, then replace root files with redirect notes or leave both. |
| Root `AGENT.md`, `CLAUDE.md`, `runbook_ai_workflow.md`, `pre-build-research.skill` vs `Blueprints\*` copies | Confirm tools/humans no longer require root paths before archiving originals. |
| Root `brand\brand_voice.md`, `brand\rebrand_notes.md`, `design.md`, `draft_assistant_spec.md` vs Corvus copies | Decide whether root brand folder remains a parent-brand workspace or Corvus-only legacy. |
| `ssffmvp\BRAND_STRATEGY.md` vs `Corvus\References\BRAND_STRATEGY.md` | Keep original canonical until split/promotion. |
| `ssffmvp\specs\001-*` and `002-*` vs Corvus Blueprint copies | Decide whether app specs or product DBS specs are canonical. |
| `ssffmvp\Corvus` flat logo/template/context files vs DBS subfolder copies | Keep flat originals until path adoption is complete. |
| `client\public\corvus-apollo-logo.png`, `frontend\public\corvus-apollo-logo.png`, Corvus asset copies, and archived logo copies | Active implementation copies must stay; review only for brand asset canonicalization. |
| `ssffmvp\.claude\skills\run-ssffmvp\screenshots` vs `ssffmvp\skills\run-ssffmvp\screenshots` vs Corvus screenshot copies | Pick current visual reference set before archiving any screenshot duplicates. |
| Root `handoffs\decisions.md` vs `ssffmvp\handoffs\decisions.md` | App handoff decisions likely canonical for engineering; root decisions may be OS-level historical. |
| `.codex-artifacts\backups` handoff/source copies vs current repo files | Compare by date and relevance before archive. |

## 7. Files That Should Never Be Archived Because Code/Tools May Rely On Them

Never archive these in a DBS cleanup pass:

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\.git`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\.git`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\.env`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\.env.cloud`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\.env.local-backup-20260502`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\oraclepu.key`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\.github`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Dockerfile`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\Dockerfile.cron`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\docker-compose.yml`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\docker-compose.hostinger.yml`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\package.json`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\package-lock.json`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\frontend`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\client`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\src`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\sql`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\scripts`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\test`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\handoffs`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\frontend\public\corvus-apollo-logo.png`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp\client\public\corvus-apollo-logo.png`

Also do not archive root required-read files until tools and humans are explicitly redirected:

- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\context.md`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\roadmap.md`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\manifesto.md`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\CLAUDE.md`
- `C:\Users\JDuve\OneDrive\Desktop\SLOPS\AGENT.md`

## 8. Old/Stale Folders Needing Deeper Comparison Before Archive

| Folder | Observed Shape | Archive Decision |
| --- | --- | --- |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\Projects\ssffmvp` | Exists; large duplicate-looking repo/workspace with thousands of files and its own `.git`. | Needs deep comparison against canonical `SLOPS\ssffmvp`. Do not archive until unique work, branches, remotes, and ignored files are checked. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\_archive\workspaces-2026-05-16\ssffmvp-ghcr-build-migration` | Exists; prior app workspace snapshot with app folders and source-like files. | Needs comparison for unique migration notes or changes before archive consolidation. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\_parked\slops-saloon-homepage` | Exists; small parked homepage package with two files. | Needs product review. It may contain useful Slops Saloon parent landing material. |
| `C:\Users\JDuve\OneDrive\Desktop\SLOPS\.codex-artifacts\backups` | Exists; backup folders for prior Codex edits and handoff/source snapshots. | Needs retention decision by date and recovery value. Do not delete blindly. |

## 9. Recommended Next Safest Phase

Recommended next phase: Phase 4A - canonical redirect and split plan, still review-only.

Do not move or archive yet. The next safest work is to create a proposed transition map that says:

1. Which root docs should get redirect notices later.
2. Which copied Corvus docs should be promoted after splitting.
3. Which app repo docs must remain canonical for tooling.
4. Which stale folders need checksum/diff comparison before any archive decision.

After that, the first write-enabled phase should still be conservative: update README/index docs to point humans to canonical locations, without removing originals.

## Confirmation

This Phase 3 task was review-only. No files were moved, deleted, archived, deployed, committed, pushed, or overwritten. Active app source, secrets, deployment config, package files, SQL, scripts, tests, and `.git` folders were untouched.
