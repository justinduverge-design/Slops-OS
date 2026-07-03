# Slops Saloon Division Decision Log

## Active Decisions

- Slops Saloon is the Layer 1 division under SLOPS OS.
- Omen is the only active product under Slops Saloon.
- The Omen product git repo lives at `omen/`.
- Division context stays in this folder.
- Product context stays in `omen/Direction/`.

## Decisions Added 2026-07-03 (Prod C Still Live + Design.md Skill Reorientation)

- **Prod verified stale.** Live `slopssaloon.com` still renders the pre-swap circle-wrapped emblem (what Justin has been calling "the C"); Ctrl+F for `omen-horizontal-lockup` returns "Phrase not found." PR `frontend/logo-suite-swap` merged to `main` but deployed artifact does not include the swap. Not a code bug — a deploy pipeline or cache issue on the KVM1 self-hosted runner.
- **Two new sprint phase items added under Frontend — Phase 1:**
  - **Phase 1.14 — Deploy verification + prod C/logo audit** — investigate `.github/workflows/deploy.yml` on `omen-deploy` runner, add post-deploy `curl | grep` verification step. **Blocks all further prod visual work.**
  - **Phase 1.15 — Post-deploy visual smoke on prod** — `slops-canary`-driven smoke against `/`, `/about`, `/login` asserting lockup present and no `[C]` visible.
- **Design.md skill reorientation.** Per-team files in `slops-saloon/Blueprints/specs/teams/` are now `[team-slug]-design.md` authored via the `design-md-author` skill (per `Blueprints/skills/design-md-author/SKILL.md`), not `[team-slug]-colorway.md` hand-authored.
- **New "Design docs" lane added to L2 current sprint** with six phased items: priority-tier per-team design.md (Eagles/Cowboys/Chiefs), extended-roster per-team design.md (29 teams / 8 batches), retire the legacy `-colorway.md` stubs after design.md files land, per-Omen-room-mode design.md (Owner Suite / GM Suite / Locker Room — three docs), per-page-family design.md (11 pages), per-cross-team-component design.md (component-level design docs).
- **`slops-saloon/Blueprints/specs/teams/README.md` + `_batch-tracking.md` rewritten** to reference the skill as the canonical entry, name new file convention (`-design.md`), and retire path for the legacy `-colorway.md` stubs.
- **The three existing priority-tier `-colorway.md` stubs (Eagles/Cowboys/Chiefs)** stay as reference material for the skill invocation, retired after the corresponding `-design.md` files land.
- **Doctrine miss owned:** Claude did not reach for the `design-md-author` skill when Justin first said "design.mds for all teams" — flagged for future sessions to check SKILL_ROUTING.md before hand-authoring skill-owned artifact types.

## Decisions Added 2026-07-03 (Folders + Sprint Prep for Later Kickoff)

- **Task #9 (marketing pillars provisional decision) added to L2 current sprint** `omen/Direction/current_sprint.md` Decisions lane. Explicit posture: do not use in public marketing copy until closed. Cost: small (decision + `brand-system.md` §10a status flip).
- **Two related cleanup items added to same Decisions lane:** retire the baked-black `omen-horizontal-lockup.png` fallback (blocked by transparent-lockup PR merge + short prod soak), and audit any external references to the old "Corvus" title on the L2 decision log.
- **Folder `slops-saloon/Blueprints/specs/teams/` prepared** for extended-roster author passes per colorway spec §6. Structure:
  - `README.md` — file naming, per-file structure, author cadence, batch clustering guidance, read-before-authoring list, prohibitions.
  - `_batch-tracking.md` — 8-batch author-pass plan with regional clustering suggestions (NFC North, NFC South, AFC North, etc.); progress metrics slots.
  - `eagles-colorway.md`, `cowboys-colorway.md`, `chiefs-colorway.md` — priority-tier stubs pointing at colorway spec §7 for fill-out; test-verify tracking per team.
- **Folder `slops-saloon/omen/logos/textures/` prepared** for chant graffiti + plaque texture assets per chant spec §5. `README.md` explains: what goes here (masks / overlays / frames), what doesn't (logos, team-specifics, photography), file naming (`chant-[medium]-[surface]-[variant].svg`), authoring rules (black-on-transparent SVG, vector only, even aspect ratio), build-serve requirement, blocked-on items.
- **Extended-roster + chant-render implementation both remain blocked** — the folders are prepared, but the work is queued behind: Justin's regional-verify passes, Codex builds of `teamChant.js` + `<ChantEyebrow>`, and `slops-image-prompt` asset production. Kickoff is later, not now.

## Decisions Added 2026-07-03 (Transparent-Lockup Landed + Logo/Phase 1.13 PRs Merged — Codex + Justin complete)

- **Logo-suite-swap PR merged to main.** Conflicts resolved in the web editor per the guidance in this log — `decision_log.md` accepted both sides with a chronological reorder; `current_sprint.md` accepted incoming.
- **Phase 1.13 mobile-qa-sweep PR merged to main.** Same conflict resolution session as above.
- **Codex generated the transparent-background horizontal lockup** on branch `frontend/transparent-lockup`, stacked on `frontend/logo-suite-swap`. New files: `logos/omen-horizontal-lockup-transparent.png` and `frontend/public/omen-horizontal-lockup-transparent.png`. Reference swaps in `Header.jsx`, `Landing.jsx`, `OmenLanding.jsx`.
- **Verification clean:** frontend build passed (existing Vite warnings unchanged), `npm test` 401/401, `npm audit --audit-level=moderate` 0, `git diff --check` clean, browser screenshots passed on `/trade` (light + dark header, light drawer), `/`, and `/about`.
- **Baked-black `omen-horizontal-lockup.png` preserved as fallback** — retirement decision deferred per the composite prompt.
- **No endpoint / contract / deploy behavior changed.** No commit / push / merge performed by Codex on this branch — Justin's gate.
- **Stacked-branch caveat now resolved** — with `frontend/logo-suite-swap` in main, `frontend/transparent-lockup` can be pushed and opened as a PR without the base-branch caveat. Codex handoff: `slops-saloon/omen/Blueprints/handoffs/2026-07-03-transparent-lockup-handoff.md`.

## Decisions Added 2026-07-03 (Phase 1.13 Discrete-Fixes Landed + Transparent-Lockup Path Chosen — Codex complete)

- **Codex executed Phase 1.13 discrete-fixes prompt.** Commit `d216705`, branch `frontend/phase1-13-mobile-qa-sweep` pushed and synced with `origin`.
- **Codex branch-consolidation call was correct** — rolled both Phase 1.13 partial passes (2026-07-02 mobile QA sweep + today's discrete fixes) into one PR on the existing `frontend/phase1-13-mobile-qa-sweep` branch instead of splitting into two merges. Cleaner phase closeout.
- **Verified fixes spot-landed:** `Bird Gang` typo fixed at `nflTeams.js:656`; War Room / Color Rush naming-reconciliation paragraph added at header comment lines 33–34; two teams without `mode: 'special'` flagged with `TODO(colorway-spec-v1)` comments pointing at the extended-roster author pass. Full four-fix verification pending Justin's real-device pass.
- **Codex commit-message hygiene note:** the commit message `chore(phase1.13): commit worktree updates` under-sold the actual scoped fixes. Not blocking, worth flagging for future prompts to require scoped commit-message subjects.
- **Transparent-lockup path chosen:** transparent background. Approach: Codex composite-prompt at `slops-saloon/omen/Blueprints/prompts/codex-transparent-lockup-composite.md`. Approach B in the prompt (chroma-tolerance alpha-key) is first-attempt; approach A (bounding-mask via edge detection) is fallback; Photopea manual-mask + Codex composite is the human-in-the-loop fallback if algorithmic approaches produce artifacts.

## Decisions Added 2026-07-03 (Logo Suite Swap Landed — Codex complete)

- **Codex executed logo-suite-swap PR from prompt.** Branch `frontend/logo-suite-swap` pushed to `origin`, not merged (Justin's gate).
  - Implementation commit: `bab6b1a`
  - Closeout docs commit: `2e13dd6`
- **Verification results:**
  - Frontend build clean (existing Vite chunk-size warning unchanged).
  - `npm test` 401/401 passed.
  - `npm audit --audit-level=moderate` 0 vulnerabilities.
  - `git diff --check` clean.
  - Playwright desktop + mobile sweep passed on load, alt text, drawer rendering, overflow.
- **One P1 flagged for asset-production follow-up:** the horizontal-lockup PNG has a baked black background that shows as a rectangle in light-theme app chrome. Codex correctly followed the prompt's acceptance-criterion #8 — flagged rather than hacked around with CSS blend modes. Resolution options: (a) re-export from source with transparent background if the design source exists, (b) AI-gen a transparent variant via `slops-image-prompt`, (c) manual mask in an image editor.
- **Dev server left running** at `http://127.0.0.1:5173/` for visual review.

## Decisions Added 2026-07-03 (Phase 1.13 Discrete-Fixes Codex Prompt — same-day follow-up)

- **Codex prompt for Phase 1.13 discrete fixes drafted** at `slops-saloon/omen/Blueprints/prompts/codex-phase1-13-discrete-fixes.md`. Single-PR, scope-locked, `frontend/phase1-13-discrete-fixes` branch. Sequenced *after* the logo-suite-swap PR to avoid `Header.jsx` / `Landing.jsx` collisions.
- **Ground state finding:** the team-theming implementation is ahead of the pre-session assumption. `frontend/src/data/nflTeams.js` already implements a two-skin-per-team model via `palettes[].mode: 'official' | 'special'` — mapping cleanly to War Room / Color Rush. 30 of 32 teams already have a `mode: 'special'` cultural variant (Stankonia, Calle Ocho, Paisley Park, 8 Mile, Mardi Gras, Gasparilla, Liberty Bell, Go-Go Burgundy, etc. — Justin doctrine 2026-06-21, "no Nike/Jordan trademarks, regional/music/food/history"). The Color Rush regional-identity rule was authored in code before it was authored in doctrine.
- **Ground state finding:** Cormorant Garamond fully retired from frontend code — appears only in doc/handoff files (correctly, labeled retired). No font-audit typography bugs of the "wrong face loaded" kind.
- **Ground state finding:** `font-mono` Tailwind class is used in 9 components (Appearance, TradeAnalyzer, Landing, Onboarding, Standings, Account, MoveHistory, OmenFeedback, LeagueStandings). Whether it resolves to DM Mono depends on Tailwind config's `mono` alias — Codex to verify and fix if missing.
- **Ground state finding:** Bird Gang typo pinned to a single line — `frontend/src/data/nflTeams.js:647`. One-line fix.
- **Naming reconciliation deferred to docs-only pass in this PR.** Code retains `mode: 'official' | 'special'` (large-rename risk to every consumer); nflTeams.js header comment gets a paragraph explicitly mapping to War Room / Color Rush and pointing at the doctrine + spec files.
- **`wardRoom` field spelling preserved** — reads as intentional "wardroom" (nautical: officers' quarters) rather than accidental "warRoom" typo. Do not rename in this PR without a separate design call.
- **Duplicate-second-skin repair strategy locked:** for teams with `mode: 'special'`, Codex computes ΔE between official.primary and special.primary; nudges hue 15° or lightness ±10% for pairs under ΔE 15; reports every nudge for Justin review; contrast-safety gate. For 2 teams without `mode: 'special'`, Codex adds TODO comments — does NOT auto-generate regional palettes (regional identity requires fan verification per colorway spec §3).

## Decisions Added 2026-07-03 (Colorway + Chant Specs Pass — same-day follow-up)

- **Team colorway system spec v1 landed** at `Blueprints/specs/team-colorway-system-spec-v1.md`. Framework + priority-tier examples (Eagles / Cowboys / Chiefs) authored. Extended roster of 29 teams listed with regional-candidate seed suggestions; verification and drafting deferred to batched author passes (4 teams per batch, each verified with a fan of at least one team in the batch).
- **Chant + fan-copy UX spec v1 landed** at `Blueprints/specs/chant-and-fan-copy-spec-v1.md`. Three placement families (header eyebrow, wall placement, celebratory overlay), timing rules, medium-per-skin (curated art on War Room, graffiti on Color Rush), per-team copy correctness check, empty-state inflection pattern, anti-patterns, Codex implementation notes for a new `frontend/src/lib/teamChant.js` library.
- **Confirmed:** `BIRD GANG` (singular) is the correct Eagles chant. `Birds Gang` in the current repo is a typo scheduled for fix in the Phase 1.13 discrete-fixes batch (Task #5).
- **Confirmed:** Chiefs ship `CHIEFS KINGDOM`; the Tomahawk Chop is parked pending cultural-sensitivity review, not shipped.
- **Confirmed regional signatures for priority tier:** Mummers Gold (`#E2B93B`) for Philadelphia Eagles Color Rush; State Fair Gold (`#C89B3A`) for Dallas Cowboys Color Rush (Texan verify pending); BBQ Smoke Brown (`#6B4423`) for Kansas City Chiefs Color Rush (KC-fan verify pending).
- **Data-legibility invariant restated once more in each spec** — semantic families (risk, confidence, data-source, position chips, platform colors, demo accent) own their own colors. Team colorway runs surfaces / accents / chip fills / chant frames only. Enforcement is Codex's job at implementation time.
- **New `frontend/src/lib/teamChant.js` library planned** — consumes team + skin + placement, returns chant string + medium + CSS tokens. Ships behind `VITE_FEATURE_TEAM_CHANTS=true` until copy correctness completes across all 32 teams.
- **Font addition planned** — Permanent Marker (Google) as the graffiti face for Color Rush chants; fallback Alegreya Sans Black italic with texture mask. Lazy-loaded on first Color-Rush-skin route entry.

## Decisions Added 2026-07-03 (Logo Usage Pass — same-day follow-up)

- **Logo asset suite exists and is complete.** Canonical location: `slops-saloon/omen/logos/` — 13 files, per `brand-system.md` line 6 (now accurate). Confirmed after an earlier stale-filesystem read incorrectly reported the suite as missing; correction owned in this log.
- **Shield is its own frame — no circular wrappers.** `Header.jsx` + `NavDrawer` `[C]`-in-1px-border-circle placeholder retired. `Landing.jsx` + `OmenLanding.jsx` `rounded-full` + gold-border + gold-glow emblem wrapper retired. In-app UI presents the emblem, standalone wordmark, and horizontal lockup **raw**. The only container the shield ever sits inside is the OS-required rounded-square app-icon badge — nowhere else.
- **Wordmark is the designed asset, not Alegreya Sans text.** `omen-standalone-wordmark.png` is a bespoke serif with carve-marks through the "O" and "M". Alegreya-Sans-rendered `"Omen"` remains only as a *text label* — `<title>`, ARIA, `alt`, inline body copy where the visual mark can't render. Everywhere the identity is expressed visually, the asset is used.
- **Horizontal lockup is the default identity slot.** `omen-horizontal-lockup.png` replaces the `[C]`-plus-text combo (`Header.jsx`, `NavDrawer`) and the circle-framed-emblem-plus-text combo (`Landing.jsx`, `OmenLanding.jsx`). One asset, one identity, one mark.
- **Marketing pillars parked as provisional.** The four brand-board pillars (DETECT THE SIGNAL / ANALYZE THE DATA / PREDICT THE OUTCOME / WIN WITH CONFIDENCE) are recorded in `brand-system.md` §10a as *provisional* — concept is right, phrasing was drafted on the brand board and has not been intentionally locked. Same posture as the tagline provisional-lock (Decision 13 of `corvus-ux-ui-direction-v1.md`). Do not use in public copy until confirmed. **Explicitly distinct from §10 Product Pillars** — the §10 principles are internal engineering; §10a would be external marketing. Do not mix.
- **Doctrine landed at L2 canonical (`omen/Brand/brand-system.md`) as §12 Logo Usage.** Inherits from `Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` load-bearing principle *Look Good — Play Good*. Rules: shield is its own frame; wordmark-is-asset; horizontal-lockup-is-default; canonical-lives-at-`logos/`-build-served-at-`frontend/public/`; presence-of-identity-not-decoration-of-identity.
- **Codex prompt drafted** at `slops-saloon/omen/Blueprints/prompts/codex-logo-suite-swap.md` for the file copies + `.jsx` slot swaps. Single-PR, scope-locked, `frontend/logo-suite-swap` branch. Ready to hand to Codex on approval.

## Decisions Added 2026-07-03 (Fan Experience Doctrine Pass)

- Slops Saloon fan-experience doctrine v1 locked. Full record: `Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md`.
- **Load-bearing principle:** *Look Good — Play Good.* Presentation isn't cosmetic; visual authorship is part of the decision. Data legibility is never traded for team-color depth — they coexist by creative composition.
- **Two-sided presence system.** Every team ships two full colorways: **War Room** (inside — institutional, team-authored, chants as curated art) and **Slops Saloon Color Rush** (outside — city on game day, fan-authored, chants as graffiti, regional identity paired with team colors).
- **Three-room mapping (War Room skin).** Rooms are feature tiers, not user tiers: **Owner Suite = Omen (paid weekly rec)**, **GM Suite = Trade Analyzer**, **Locker Room = every other page**. Team colorway is set once and stays constant; texture / formality / density / materials change room-to-room.
- **Chant medium follows skin.** Curated art (framed, plaqued, team-authored) on War Room; graffiti (painted, marker, fan-authored) on Color Rush. Same chant strings, different medium — this is what activates the currently inert chants.
- **Regional-identity rule for Color Rush.** Every team's Rush must be recognizable as the team, recognizable as the region, and read as Slops Saloon — not a league jersey knockoff. Two Rushes must never feel like the same template with different hex codes.
- **Data-legibility invariant.** Confidence / risk / data-source / mock semantics own their own colors on both skins in every room for every team. Team color runs in surfaces, accents, and chant frames — never in the data layer.
- **Scope note.** This doctrine is L1 (Slops Saloon studio-level). Omen (L2) inherits. `omen/Brand/brand-system.md` §6 and §8 will be updated in a follow-on pass to reference this doctrine as parent. `omen/Blueprints/specs/omen-ux-ui-design-system-v1.md` (stale — still lists Cormorant Garamond / Electric Violet / Antique Gold) must be reconciled against `brand-system.md` and this doctrine before the font audit / colorway spec can proceed.

## Decisions Added 2026-05-24

- The old nested `Omen/` folder inside the repo was folded into the Omen repo root.
- The canonical Omen repo path is `C:\Users\JDuve\dev\SLOPS\slops-saloon\omen`.
- The canonical GitHub repo is `justinduverge-design/omen`.
- The Oracle checkout path is `~/omen`.
- Justin approved a focused Omen backend hardening pass before further feature expansion. The work stays inside `omen/` and should prioritize launch-blocking backend risks: Vault/RLS secret boundaries, broken cron/legacy agent drift, Omen route/tier clarity, schema drift, and CI release gates.
- Codex completed the focused local backend hardening pass for Omen: Vault/RLS boundaries, executable cron/legacy-agent cleanup, cron safety gate, CI quality gate, Probo evidence path cleanup, and backend handoff updates. No deploy was performed.

## Decisions Added 2026-05-24 (UX/UI Planning Pass)

- A clean-plate UX/UI design pass was completed. Decision doc is at `Direction/decisions/omen-ux-ui-direction-v1.md`.
- The Slops OS app template spec was created at `Blueprints/specs/slops-os-app-template-spec.md`. Omen is the reference implementation.
- Omen UX/UI design system v1 is at `omen/Blueprints/specs/omen-ux-ui-design-system-v1.md`.
- Sign In / Connect Your League screen spec is at `omen/Blueprints/specs/sign-in-connect-league-screen-spec.md`. This is P0 — first screen to build.
- Codex UX/UI build handoff is at `omen/Blueprints/handoffs/codex-ux-ui-build-handoff.md`.
- Dark mode is the primary Omen experience. Light and system modes are required.
- Trade Analyzer stays auth-free. Sign-in gates Omen, not Trade Analyzer.
- Sign In / Connect Your League is a two-step flow: auth first, league connection second.
- Sleeper connect endpoint does not yet exist — Codex must build it before the frontend can wire Step 2.

## Decisions Added 2026-05-24 (UX/UI Approval Pass — Justin)

- Auth providers confirmed for v1: Google, Apple, Discord, and email magic link — all four ship at launch.
- Omen requires a connected league — no exceptions. No generic Omen without a connected platform. Skipping league connection locks Omen; Trade Analyzer and Draft Assistant remain available.
- ESPN UX is fully guided and in-product. Every step of cookie-extraction is walked through inside the app. Do not hide or minimize ESPN friction.
- `/` serves Omen at launch. Slops Saloon parent-brand routing at `/` is a future decision, not blocking launch.
- Provisional final sign-in screen headline: **"Your best call, every time."** Marked provisional — confirm after seeing it rendered.
- Manual league entry is a new connection option (Sleeper / Yahoo / ESPN / Manual). Backend contract needed from Codex before it can be built.
- The sign-in and connect-league spec is now v2 (updated). See `omen/Blueprints/specs/sign-in-connect-league-screen-spec.md`.
- The Codex UX/UI build handoff has been fully updated with product guardrails and resolved decisions. See `omen/Blueprints/handoffs/codex-ux-ui-build-handoff.md`.

## Decisions Added 2026-05-24 (Data Quality Framework Pass)

- **Paid tier placeholder:** "Pro" is confirmed as an internal working placeholder only. It is not final brand naming. A paid tier naming/brand workshop is a future backlog item to be completed before launch marketing.
- **Manual Omen framework approved:** Three-tier access model is locked in principle — Connected League (full Omen), Manual Complete (conditional Omen), Manual Incomplete (Omen locked, Trade Analyzer available). Full adoption pending Codex data quality audit.
- **Manual Omen feasibility:** Not approved or rejected. Codex must audit what data manual entry can collect and report whether it is sufficient for honest Omen recommendations. Justin decides after seeing the report. The audit is a required step before the manual entry frontend or API is built.
- Codex handoff section 2.4 updated with audit scope, decision framework, and build gate.
- Sign-in spec manual entry card updated to reflect conditional access and build-gate status.
- Direction doc Decisions 14 and 15 added.

## Open Decisions

- When a second Slops Saloon product starts, decide its folder name before creating any source or DBS files.
- Decide whether Slops Saloon needs division-level brand standards before the second product.
- **Paid tier name (final):** Pending brand/naming workshop before launch. "Pro" is placeholder only — do not use in user-facing copy.
- **Manual Omen feasibility:** Pending Codex audit. Codex evaluates data quality ceiling; Justin decides whether Manual Omen ships, ships with limitations, or is deferred.

## Decisions Added 2026-06-06 (Go-to-market + business pivot)

- Omen is **free for all users on all platforms in Year 1** (adoption/feedback over revenue); the **draft assistant becomes the paid anchor in Year 2**, Sleeper-first.
- **Yahoo/ESPN cannot be charged on** under current API terms (Yahoo needs prior written commercial permission; ESPN is unofficial/fragile). Paid features gate to Sleeper; Yahoo/ESPN stay free "connect and view."
- **Billing is web-only** (Stripe), no Apple IAP — avoids the App Store cut and keeps billing in one place.
- **Entity:** forming a **Connecticut LLC**; CT taxes consumer SaaS at 6.35% (CPA to confirm registration timing).
- **ToS + Privacy Policy** drafted as attorney-review drafts grounded in the real data model: `omen/References/docs/legal/`.
- A **future local web/app services division** is planned at Layer 0, sequenced after Omen traction. Not a Slops Saloon product.
- Full record: `Direction/business-launch-foundation.md`.
