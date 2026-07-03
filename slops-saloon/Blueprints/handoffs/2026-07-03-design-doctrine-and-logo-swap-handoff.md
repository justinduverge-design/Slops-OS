# Session Handoff — Design Doctrine, Logo Suite Swap, Phase 1.13 Discrete-Fixes Prompt

**Date:** 2026-07-03
**Layer:** L1 (Slops Saloon studio-level doctrine + L2 Omen implementation)
**Owner:** Justin (product + fan authority) / Claude (doctrine, spec, prompt drafting) / Codex (execution)
**Session length:** substantial — one doctrine authored, three specs authored/reconciled, three Codex prompts drafted, one Codex PR completed.

---

## 1. Files updated

### Created (this session)

- `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` — L1 doctrine v1. Look Good — Play Good axiom, two-sided presence (War Room + Color Rush), three-room mapping (Owner Suite = Omen, GM Suite = Trade Analyzer, Locker Room = everything else), chant medium follows skin, regional-identity rule, data-legibility invariant.
- `slops-saloon/Blueprints/specs/team-colorway-system-spec-v1.md` — 32-team colorway framework + priority-tier examples (Eagles / Cowboys / Chiefs); 29 extended-roster teams with regional-candidate seeds, pending fan-verified drafting.
- `slops-saloon/Blueprints/specs/chant-and-fan-copy-spec-v1.md` — chant placement (header eyebrow, wall, celebratory overlay, empty-state inflection), timing, medium per skin (curated art vs. graffiti), copy correctness check, per-team chant candidates.
- `slops-saloon/omen/Blueprints/prompts/codex-logo-suite-swap.md` — drafted; **executed by Codex, PR `frontend/logo-suite-swap` pushed to `origin`** (commits `bab6b1a` implementation + `2e13dd6` closeout). Not merged (Justin's gate).
- `slops-saloon/omen/Blueprints/prompts/codex-phase1-13-discrete-fixes.md` — drafted; **handed to Codex, in flight** at session end.
- `slops-saloon/omen/Blueprints/prompts/codex-transparent-lockup-composite.md` — drafted; ready to hand to Codex when the light-theme lockup P1 gets addressed.

### Substantively updated

- `slops-saloon/omen/Brand/brand-system.md` — line 6 corrected (accurate 13-file asset inventory), new §10a Marketing Pillars (Provisional — brand-board DETECT/ANALYZE/PREDICT/WIN parked pending Justin decision), new §12 Logo Usage (asset inventory, framing rule, wordmark-is-asset, build-serve requirement, inheritance from L1 doctrine), old §12 renumbered to §13.
- `slops-saloon/omen/Blueprints/specs/omen-ux-ui-design-system-v1.md` — reconciled v1 → v2 in place (filename preserved). Palette + typography caught up to `frontend/src/index.css` production state. Phase 1.x subsystems indexed (team-theming, motif overlay, cultural-moment overlay, position chips, platform brand colors, confidence gradient, metallic tiers, demo accent). DM Mono third font acknowledged.
- `slops-saloon/Direction/decisions/slops-saloon-fan-experience-doctrine-v1.md` — Next-Artifacts section checkboxes updated across the same-day passes (3 of 4 downstream specs now ✅).
- `slops-saloon/Direction/decisions/README.md` — new decision record listed.
- `slops-saloon/Direction/decision_log.md` — five dated 2026-07-03 entries covering the doctrine pass, logo usage pass, colorway + chant specs pass, Phase 1.13 discrete-fixes prompt, and Codex logo suite swap completion.
- `slops-saloon/omen/Direction/decision_log.md` — title corrected from "Corvus Decision Log" → "Omen Decision Log" (predated the 2026-06-22 rebrand); added dated entry documenting the design-system v2 reconciliation.

### Codex-produced (this session)

- Branch `frontend/logo-suite-swap`, commits `bab6b1a` + `2e13dd6`. Verification clean (build clean with the known pre-existing Vite chunk-size warning; `npm test` 401/401; `npm audit --audit-level=moderate` 0; `git diff --check` clean; Playwright desktop+mobile sweep passed on load, alt text, drawer rendering, overflow).

---

## 2. Files discussed (read but not changed)

- `slops-saloon/omen/CLAUDE.md`, `Blueprints/agent-modules/*.md` — session-start doctrine reading.
- `slops-saloon/omen/frontend/src/index.css` — CSS truth-source for the v2 reconciliation; ahead of the v1 spec at session start.
- `slops-saloon/omen/frontend/src/components/layout/Header.jsx` — for the logo prompt's slot-level guidance (lines 180 NavDrawer, 329–352 main header).
- `slops-saloon/omen/frontend/src/pages/Landing.jsx`, `OmenLanding.jsx` — same.
- `slops-saloon/omen/frontend/src/data/nflTeams.js` — Phase 1.13 discrete-fixes ground-state check; confirmed the `mode: 'official' | 'special'` two-skin schema already implements War Room / Color Rush; found the `cultureTag: 'Birds Gang'` typo at line 647.
- `slops-saloon/omen/frontend/src/pages/Appearance.jsx` — Phase 1.13 discrete-fixes ground-state check.
- `slops-saloon/omen/logos/*` (13 files) — asset audit; confirmed the full suite exists after an initial stale-filesystem read incorrectly reported it missing. Correction owned in the logo-usage decision-log entry.
- `slops-saloon/Direction/facts-of-record.md`, `Direction/decision_log.md` — L1 doctrine start of session.
- `slops-saloon/omen/Direction/current_sprint.md` — L2 sprint state for context.
- Prior handoffs referenced but not modified: Phase 1.7 platform brand colors, Phase 1.8 confidence gradient, Phase 1.9 metallic tier, Phase 1.13 mobile QA partial + real-Safari sweep.

---

## 3. Decisions made — see decision logs

Five dated 2026-07-03 entries in `slops-saloon/Direction/decision_log.md` capture the durable calls. Highlights:

- **Load-bearing principle:** *Look Good — Play Good.*
- **Two-sided presence:** every team gets War Room + Color Rush.
- **Three rooms are feature tiers, not user tiers:** Omen = Owner Suite, Trade Analyzer = GM Suite, everything else = Locker Room.
- **Chant medium follows skin:** curated art on War Room, graffiti on Color Rush.
- **Shield is its own frame:** no circular wrappers. Ever. The OS-required rounded-square app-icon is the only container the shield sits inside.
- **Wordmark is the designed asset** (`omen-standalone-wordmark.png`), not Alegreya Sans text. Text is fallback for `<title>` / ARIA / meta only.
- **Horizontal lockup is the default identity slot** — Header, NavDrawer, Landing hero, OmenLanding.
- **Data-legibility invariant:** semantic families (risk / confidence / data-source / position chips / platform / demo) own their own colors. Team color runs in surfaces, accents, chip fills, chant frames only.
- **Confirmed:** `BIRD GANG` (singular). `Birds Gang` typo scheduled for the Phase 1.13 discrete-fixes PR.
- **Confirmed:** Chiefs ship `CHIEFS KINGDOM`; the Tomahawk Chop is parked pending cultural-sensitivity review, not shipped.
- **Design system spec v1 → v2 reconciled in place** — filename preserved for reference compatibility; palette + typography caught up to `index.css` production state.
- **Naming reconciliation deferred** — `nflTeams.js` retains `mode: 'official' | 'special'` internally; header comment gets a paragraph mapping to War Room / Color Rush per the doctrine.

---

## 4. Unresolved questions (Justin's calls)

- **Marketing pillars — provisional lock.** The brand-board `DETECT / ANALYZE / PREDICT / WIN` — sticks as final, gets rewritten, or gets replaced entirely? Parked in `brand-system.md` §10a. Task #9.
- **Priority-tier colorway regionals — verify.** Mummers Gold (Eagles) is Justin's call (his region). Cowboys State Fair Gold and Chiefs BBQ Smoke Brown are Claude first-pass drafts flagged as needing Texan / KC-fan verification respectively.
- **Extended-roster colorways + chants (29 teams).** Batched author passes needed. Each batch (4 teams) should be verified with a fan of at least one team in the batch. Sequence and cadence: Justin's call.
- **Chiefs Tomahawk Chop cultural-sensitivity review** — parked. If a formal review lands, chant string may update.
- **`wardRoom` field spelling** in `nflTeams.js` — deliberate "wardroom" (nautical) vs. accidental "warRoom" typo. Preserved this session pending a separate design call.

---

## 5. Blockers surfaced

- **Logo suite swap P1 — light-theme lockup rectangle.** The `omen-horizontal-lockup.png` has a baked black background that shows as a visible rectangle in light-theme app chrome. Codex correctly flagged rather than CSS-hacked (per prompt acceptance criterion 8). Design source file does not exist. Two paths:
  - **Composite approach:** Codex uses existing separate emblem + wordmark PNGs, alpha-keys black backgrounds, composites on transparent canvas. Codex prompt drafted at `slops-saloon/omen/Blueprints/prompts/codex-transparent-lockup-composite.md`. Risk: shield's interior is near-black and needs careful mask.
  - **Human-mask fallback:** Justin opens the emblem PNG in Photopea (free, browser-based, no install), magic-wand-selects the outer black, deletes to transparency, saves. Repeats for wordmark. Then Codex does a clean composite pass. ~15 minutes of Justin's time, highest quality result. Documented in the composite prompt's Fallback Plan section.
- **`omen/logos/omen-favicon-16.png` file-lock.** Windows FS handle preventing deletion. Cosmetic — the working favicon at `frontend/public/omen-favicon-16.png` is a separate file and unaffected. Workarounds documented in-session (close Explorer, restart `explorer.exe`, or reboot).

---

## 6. Last verified build/test result

Codex verification of `frontend/logo-suite-swap` PR (`bab6b1a` implementation + `2e13dd6` closeout):

- `npm --prefix frontend run build` — clean with the pre-existing Vite chunk-size warning.
- `npm test` — 401/401 passed.
- `npm audit --audit-level=moderate` — 0 vulnerabilities.
- `git diff --check` — clean.
- Playwright desktop + mobile sweep — load, alt text, drawer rendering, overflow all passed.

Phase 1.13 discrete-fixes PR was in-flight at session end; Codex's verification results will land in that PR's handoff.

Dev server still running at `http://127.0.0.1:5173/` at session end for visual review.

---

## 7. Next recommended pull

For the next session (whoever pulls first):

1. **Confirm the state of both Codex PRs** — logo-suite-swap merge status, Phase 1.13 discrete-fixes PR status.
2. **Address the transparent-lockup P1** — pick composite vs. human-mask path, hand `codex-transparent-lockup-composite.md` to Codex once decided.
3. **Marketing pillars decision** (Task #9) — 30 seconds to unpark.
4. **Priority-tier fan verifications** — Cowboys (Texan) and Chiefs (KC fan) regional colors need eyes. If Justin has a source, ping them.
5. **Extended-roster author pass, batch 1** — pick 4 teams (suggested: NFC East is largely done via priority tier; try NFC North for range — Bears + Packers + Vikings + Lions, all with strong regional identities in `nflTeams.js` already via Stankonia-style Special palettes). Each team gets a colorway spec entry + chant verification.
6. **Room-mode implementation spec** — the fourth downstream spec from the fan-experience doctrine, parked pending stable colorway drafts. Unblocks the actual Codex work of rendering Owner Suite / GM Suite / Locker Room as distinct token+texture modes.
7. **Do not restart the whole session by re-reading doctrine cold** — the CLAUDE.md read-in-order kickoff covers it. This handoff + the two 2026-07-03 decision-log entries at L1 are the fastest re-anchor.

---

## Task list at session end

| # | Task | Status |
|---|---|---|
| 1 | Extract Slops Saloon design vision doctrine | ✅ |
| 2 | Reconcile design-system-v1 spec against brand-system.md | ✅ |
| 3 | Team colorway system spec (framework + 3 examples) | ✅ |
| 4 | Chant + fan-copy UX spec (framework + priority tier) | ✅ |
| 5 | Phase 1.13 discrete-fixes Codex prompt drafted | ✅ |
| 6 | Session handoff | ✅ (this file) |
| 7 | Logo usage rule + Codex prompt | ✅ |
| 8 | Codex executes logo-suite-swap PR | ✅ (`bab6b1a` + `2e13dd6`) |
| 9 | Marketing pillars provisional decision | ⏳ Justin |
| 10 | Transparent-lockup asset production | ⏳ Codex prompt ready |
| 11 | Codex executes Phase 1.13 discrete-fixes PR | ✅ `d216705` on `frontend/phase1-13-mobile-qa-sweep` — consolidated with 2026-07-02 mobile QA into one Phase 1.13 PR |

**Post-close addendum (session extended past initial wrap):**

- Codex completed Phase 1.13 discrete-fixes on branch `frontend/phase1-13-mobile-qa-sweep` (commit `d216705`), consolidating with the existing 2026-07-02 mobile-QA partial work. Verified: Bird Gang typo fixed, War Room / Color Rush naming-reconciliation paragraph landed, two teams without `mode: 'special'` flagged with TODO comments. Codex's commit message under-sold the diff — worth requiring scoped commit-message subjects in future prompts.
- Justin picked **transparent-background lockup** for Task #10. Composite prompt at `codex-transparent-lockup-composite.md` was handed to Codex.
- Both merged PRs landed clean after Justin resolved markdown conflicts in `omen/Direction/decision_log.md` (accept both, chronological reorder) and `omen/Direction/current_sprint.md` (accept incoming). Conflicts were markdown-only — no code collisions.
- **Codex executed the transparent-lockup composite** on `frontend/transparent-lockup` (stacked on `frontend/logo-suite-swap`, which is now in main so the stack caveat is resolved). New files: `logos/omen-horizontal-lockup-transparent.png` and `frontend/public/omen-horizontal-lockup-transparent.png`; swaps in `Header.jsx` / `Landing.jsx` / `OmenLanding.jsx`. Verification clean (401/401, 0 audit, build clean, screenshots passed light + dark). Full detail in `slops-saloon/omen/Blueprints/handoffs/2026-07-03-transparent-lockup-handoff.md`. Not yet pushed/opened as a PR — Justin's gate.
- Baked-black `omen-horizontal-lockup.png` preserved as fallback pending retirement decision.