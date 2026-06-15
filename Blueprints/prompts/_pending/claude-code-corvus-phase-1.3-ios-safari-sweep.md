# Claude Code Prompt — Corvus Phase 1.3 iOS Safari Mobile QA Sweep

**Layer:** 2 (Corvus)
**Type:** One-shot, four-phase. Delete from `_pending/` after the fix PR lands.
**Date drafted:** 2026-06-13
**Posture:** Single focused PR with all fixes batched. Frontend build must stay green. No backend edits.
**Authority:** Justin's approval already granted. Phase 1 closure depends on this prompt landing cleanly. Production target is live at https://slopssaloon.com — Justin will QA there from his iPhone (no BrowserStack, no Mac Web Inspector, no local dev server access from device assumed).

---

## Goal

Run a full iOS Safari mobile QA sweep across every routed page in the Corvus frontend. Catch and fix: viewport overflows, flex/grid overflows, touch targets <44px, focus rings, safe-area-inset issues, and the long list of iOS Safari–specific quirks below. Ship one PR. Phase 1 closes when this lands.

This sweep is different from the prior Phase 1 prompts because **the testing surface is a real device, not a test suite.** Justin runs the device half (his iPhone, hitting production). You run the code half — auditing patterns that are likely broken, applying pre-emptive fixes that don't need device confirmation, then triaging and shipping fixes for what Justin reports.

Four phases. Stop at each phase boundary for Justin.

## Routed-Page Inventory (already extracted — verify before audit)

From `frontend/src/routes/index.jsx`:

| Path | Component | Layout |
| --- | --- | --- |
| `/` | `Landing` | bare |
| `/corvus` | `CorvusLanding` | bare |
| `/login` | `Login` | bare |
| `/onboarding` | (component) | bare |
| `/account/connect` | `ConnectLeague` | bare |
| `/account` | (component) | AppLayout |
| `/account/appearance` | (component) | AppLayout |
| `/trade` | `TradeAnalyzer` | AppLayout |
| `/draft` | `DraftAssistant` | AppLayout |
| `/football` | (component) | AppLayout |
| `/omen` | (component) | AppLayout |
| `/ledger` | (component) | AppLayout |
| `/standings` | (component) | AppLayout |
| `/dev/omen` | (dev-only) | AppLayout |
| `*` | `NotFound` | bare |

Re-read `frontend/src/routes/index.jsx` to confirm; if the routing has changed since this prompt was drafted, work from the updated set. `/dev/omen` is dev-only — exclude from production QA, include in code audit only.

## Hard Constraints (apply to every phase)

- Frontend (`frontend/src/`) only. **Do not touch backend, services, routes, env, deploy, or Supabase.**
- One PR for all fixes (batch them). No mid-sweep deploy.
- Reuse existing design tokens before introducing new ones. The brand system is in `Blueprints/brand-system.md`.
- **Never log or display ESPN cookie values or any platform credential** anywhere — no debugging console.logs, no scratch fallback text.
- If a "fix" requires backend contract changes, **stop and flag**. Do not freelance backend edits.
- `npm --prefix frontend run build` must stay clean throughout. If it breaks mid-phase, stop and report.
- Mock data must remain clearly labeled.
- iPhone Safari behavior is the target. Don't optimize for Chrome desktop emulation — emulators lie about safe-area-inset, dynamic toolbar, and pinch-zoom behavior.

---

## Phase A — Code-side audit + pre-emptive fixes (you, no device)

Produces a structured audit report at `Blueprints/handoffs/2026-06-13-phase-1.3-ios-safari-audit.md` and a batch of safe code changes that don't need device confirmation. **Stop at the end of Phase A.** Justin reviews the audit before Phase B starts.

### A.1 — Audit scans

Run each of these greps against `frontend/src/` and tabulate findings. For each hit, record file, line, and a one-line risk note.

| Risk | Grep / scan |
| --- | --- |
| Touch targets <44px | `grep -rn "h-[0-9]\|min-h-\[[0-9]" frontend/src/ \| awk values < 44px` — also flag bare `<button>` without `min-h-`/`h-` |
| Input zoom on focus | `grep -rn "type=\"text\"\|type=\"email\"\|type=\"password\"\|<textarea\|<input" frontend/src/` — iOS Safari zooms when input `font-size < 16px`. Flag any `text-xs`, `text-sm` on inputs |
| `100vh` overflow | `grep -rn "h-screen\|100vh\|min-h-screen" frontend/src/` — iOS toolbar collapses dynamically; `100vh` is the wrong unit |
| Safe-area-inset usage | `grep -rn "safe-area-inset\|env(safe-area" frontend/src/` — count occurrences. Should appear on any fixed bottom/top element, modal, and main layout shell |
| Focus rings stripped | `grep -rn "outline-none\|focus:outline-none" frontend/src/` — flag if not paired with `focus-visible:` ring |
| Tap highlight defaults | `grep -rn "tap-highlight\|webkit-tap-highlight" frontend/src/` — default gray flash is ugly; should be set globally |
| Body scroll lock patterns | `grep -rn "overflow-hidden\|overflow:hidden" frontend/src/` on `<body>` or `<html>` — iOS scroll-lock has a known bug; need `position: fixed` companion |
| Fixed-position interactions | `grep -rn "fixed\|sticky" frontend/src/` — flag bottom-fixed elements that may collide with home indicator |
| Long-text overflow | scan for `truncate`, `line-clamp`, `break-words`, `overflow-x-auto` patterns on cards / table rows — flag tables without horizontal scroll wrap |
| `:hover` as primary state | scan for components whose only feedback is `hover:` — iOS doesn't fire hover. Flag CTAs / menu items where hover replaces a press state |
| Pinch-zoom blocked | viewport meta should be `width=device-width, initial-scale=1.0` — but should NOT include `user-scalable=no` or `maximum-scale=1` (accessibility) |
| Datetime native UI | `grep -rn "type=\"date\"\|type=\"time\"\|type=\"datetime" frontend/src/` — iOS native picker is fine, but flag any custom styling that breaks it |

Verify the viewport meta tag at `frontend/index.html` line ~5 — should be `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. **Recommend adding `viewport-fit=cover`** if not present — required for `safe-area-inset-*` to actually return non-zero values on iPhone with notch/Dynamic Island.

### A.2 — Per-page risk pass

For each routed page from the inventory, read the top-level component file and note iOS-Safari-specific concerns. At minimum tag each page as:

- **Layout risk:** does it use `h-screen`, fixed/sticky bars, modals, drawers?
- **Form risk:** any inputs that could trigger auto-zoom?
- **Density risk:** any tables, long lists, or wide cards that could overflow viewport-x?
- **Interaction risk:** any hover-only states? Long-press menus? Drag-to-reorder?

Output as a table in the audit doc. One row per page.

### A.3 — Pre-emptive fixes (safe to apply without device)

Apply only fixes that are **unambiguous violations** of the iOS Safari rules above. Examples of safe pre-emptive fixes:

- Add `viewport-fit=cover` to the viewport meta tag
- Add global `-webkit-tap-highlight-color: transparent` in `index.css`
- Replace `outline-none` with `outline-none focus-visible:ring-2 focus-visible:ring-amber-300` (or equivalent brand-aware ring)
- Bump any input `font-size` <16px to 16px (or use `text-base` minimum)
- Replace `h-screen` / `min-h-screen` with `min-h-[100dvh]` (dynamic viewport unit handles iOS toolbar correctly)
- Add `safe-area-inset-bottom` padding to any fixed-bottom element
- Add `min-h-[44px] min-w-[44px]` to bare interactive elements (icon buttons, close X, link chips) that fall below the threshold

Examples of fixes that are **NOT** safe pre-emptive — wait for Phase C:

- Re-laying out a page that may "look fine" on iPhone despite an audit flag
- Changing table layouts to card stacks (visual design judgment)
- Restructuring modals or drawers (interaction design judgment)
- Anything that touches business logic

### A.4 — Deliverable

Write `Blueprints/handoffs/2026-06-13-phase-1.3-ios-safari-audit.md` with:

1. Routed-page inventory (verified)
2. Audit findings table (every grep result tabulated, one row per finding)
3. Per-page risk pass table
4. Pre-emptive fixes applied (with file:line diffs cited)
5. iPhone QA checklist for Phase B (next section in this prompt — render it as a copy-pasteable single-page doc Justin can open on his iPhone)
6. Open questions for Justin

Commit Phase A changes on a branch (suggested: `claude/phase1-3-ios-sweep`). Don't merge yet — Phase C will add more commits to the same branch and you'll ship one PR.

**Stop. Wait for Justin to review the audit before Phase B.**

---

## Phase B — Justin's iPhone QA (he runs, you watch)

Justin opens the iPhone QA checklist (rendered in the audit doc) on his iPhone and walks each routed page. Production URL is **https://slopssaloon.com** — no local dev server access needed.

The checklist (you generate this in Phase A, but here's the spec):

### B.1 — Per-page check

For each routed page in the inventory (excluding `/dev/omen`), Justin:

1. Opens the page on iPhone Safari
2. Notes whether it loads at all
3. Scrolls top-to-bottom, looking for: content cut off at edges, horizontal scroll where there shouldn't be, content hidden behind the home indicator at bottom, content overlapping the notch/Dynamic Island at top, any element less than thumb-width (~44px) that he can't reliably tap
4. Tests any input field by tapping it. Flags if the page auto-zooms or the keyboard pushes layout broken
5. Tests any modal/drawer/dialog on that page — does it open, close, scroll inside, dismiss correctly?
6. Tests Trade Analyzer search, Draft Assistant interactions, Account connection flows if applicable on that page
7. Takes a screenshot of anything that looks broken and labels it `<page>-<issue>.png`

### B.2 — Cross-cutting checks (run once)

- Pull-to-refresh: does it work? Does it interfere with internal scroll regions?
- Bottom nav (if any): does it collide with the home indicator?
- Header (if fixed): does it collide with the notch/Dynamic Island?
- Status bar appearance: light text on dark background, or unreadable?
- Add to Home Screen: does the PWA install and launch into standalone mode? (Optional check — not a blocker.)
- Rotate landscape on each AppLayout page: does anything break?
- Back/forward gesture (edge swipe): does it conflict with any in-page swipe gesture?

### B.3 — Deliverable from Justin

Justin pastes findings back to Claude Code as a list. Format suggested in the checklist doc: `<page-path> — <one-line description of the issue> — <screenshot filename or "no screenshot">`. He can also say "page X looks fine" if nothing's wrong.

**Wait for Justin's findings before Phase C.**

---

## Phase C — Fix pass (you, on Justin's findings)

For each issue Justin reports:

1. Reproduce in code (read the relevant component and confirm the failure mode)
2. Draft the fix using existing design tokens / patterns
3. Apply the fix
4. If the fix is non-obvious or has trade-offs, note it in the commit message
5. If a fix requires backend changes, **stop and flag** — Phase 1.3 is frontend-only

Group fixes into logical commits on the same branch as Phase A:

- One commit per page if fixes are page-scoped
- Or one commit per failure mode if fixes are cross-cutting (e.g., "fix(ios): safe-area-inset on all AppLayout pages")

Verification after each commit:

- `npm --prefix frontend run build` clean
- `git diff --check` clean
- No new audit warnings introduced

**Stop after Phase C. Wait for Justin to re-verify on device before merging.**

---

## Phase D — Re-verify + ship PR

Justin re-runs the iPhone QA checklist for any pages that were fixed in Phase C. He confirms each issue is resolved or reports new ones.

If new issues: loop back to Phase C.
If clean: open the PR.

PR title: `feat(phase1.3): iOS Safari mobile QA sweep`

PR description should include:

1. Summary of the audit (pre-emptive fixes applied)
2. Justin's findings list (with screenshots if he sent any)
3. Fixes applied in Phase C, grouped logically
4. Confirmation of re-verify on device
5. Build/audit state at HEAD of branch
6. Link to the audit doc

Do NOT merge or push. Justin's gate.

## Verification Gates

After each phase boundary:

- `npm --prefix frontend run build` clean
- `git diff --check` clean
- No new `npm audit` advisories beyond the pre-existing `hono` baseline
- Audit doc updated with the latest state

## Hard Constraints

- Frontend only. Backend/Supabase/env/deploy/secrets are off-limits.
- One PR. All fixes batched.
- No `git push`. Justin's gate.
- No backend contract changes. If you discover a backend dependency that needs to change to fix a frontend issue, **stop and flag** — don't freelance.
- No `user-scalable=no` or `maximum-scale=1` on the viewport meta tag (accessibility violation).
- Touch targets must be ≥44×44px per Apple HIG. Don't compromise this for visual density.
- Test the production URL (https://slopssaloon.com) for device QA. Don't ask Justin to spin up a local dev server unless he volunteers.
- If a "fix" replaces clearly-labeled mock data with unlabeled values, **stop**. Mock data discipline is sacred.
- If you discover an ESPN cookie value or any credential in code while auditing, **STOP IMMEDIATELY** and report — that's a security issue, not a QA issue.
- After firing successfully, delete this prompt from `_pending/` (job done).

## Report Back After Each Phase

Short paragraph at each phase boundary:

- **Phase A:** Audit summary. Number of findings per category. Pre-emptive fixes applied (file count + commit hash). Anything surprising. Yes/no on whether Phase B can start.
- **Phase B:** Just the checklist link + your stand-by note. (Justin will report findings, not you.)
- **Phase C:** Fixes applied per Justin's finding. Commit hashes. Anything that needed backend changes (and was flagged not built). Anything ambiguous you'd like Justin to call.
- **Phase D:** PR title, branch name, file count, commit count, final build/audit state. Open PR or hold pending Justin's re-verify.

## Related

- `_templates/claude-code-pull-next-frontend.md` — the generic version. This prompt overrides it for Phase 1.3 because the device half makes generic auto-pull unworkable.
- `Blueprints/brand-system.md` — token reference for any new utility classes you introduce.
- `frontend/index.html` — viewport meta tag lives here; needs `viewport-fit=cover` audit.
- `frontend/vite.config.js` — `server.host` is not set, so the dev server is localhost-only by default. Don't change this for Phase 1.3 — production URL is the QA target.
- Phase 1.2 backend (`cc14e79`) + Phase 1.2 frontend (`fa35c76`) — already shipped. The `Sentry.ErrorBoundary` fallback in `frontend/src/main.jsx` already meets the ≥44px reload-button discipline; use that pattern as a reference for other touch targets.
