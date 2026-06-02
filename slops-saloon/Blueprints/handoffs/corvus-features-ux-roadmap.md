# Corvus — Features & UX Roadmap Handoff
_Last updated: 2026-05-29 (session 4 — hamburger nav, team theme page, HITL feedback card, nflTeams.js)_

---

## Rule: UX Before Build

Before implementing any new feature on the web app, run `/ui-ux-pro-max-skill` on the
target page(s) first. The skill should audit and improve the page design, copy, and
interaction patterns **before** any functional code is written. This applies to:

- The Omen of the Week page (next major feature surface)
- The Account / Platform Connections page
- Any new dashboard or history view

Rationale: we shipped the MVP. The old Claude-chat prototype proved the concept.
Now we build on a polished foundation, not a rough one.

---

## Three Features from the Original Prototype to Build Into Corvus

These exist in `client/App.jsx` (the original SSFFMVP app). They are proven in design.
They need to be rebuilt in the Corvus frontend (`frontend/src/`) with real backend wiring,
not mock data.

### 1. HITL Feedback Loop (Human-in-the-Loop)
**What it does:** After the Omen is delivered, the user is asked:
- "Did you actually follow this move?" (Yes / No toggle)
- Star rating (1–5)
- Optional text note

**Status:** Frontend card (`OmenFeedback.jsx`) is built and wired into `OmenOfTheWeek.jsx`.
Calls `POST /api/omen/feedback`. Backend endpoint is not yet built — treats 404/501 as soft success.
**Gate:** Needs Justin to approve the `moves` table Supabase migration before backend can be built.

**Backend hook:** `POST /api/omen/feedback` writing to the `moves` table.
Fields: `followed (bool)`, `stars (int)`, `note (text)`, `outcome (pending/win/loss)`.

---

### 2. Move History + Effectiveness Tracking
**What it does:** A panel showing all past weekly moves with:
- Week label, move type (Omen / Talon / The Scale / etc.)
- Outcome: Win / Loss / Pending
- Effectiveness % (0–100 from Tuesday cron scoring)
- Whether the user followed it or not
- Progress bar colored by effectiveness (green ≥70, gold ≥40, red <40)
- Summary stat: W–L record and average effectiveness %

**Why it matters:** This is the "receipts" screen. Users see the AI is right more
than it's wrong, which drives retention and upgrades.

**Backend hook:** `GET /api/moves` returning the user's move history from the `moves` table.
Depends on the same migration as HITL.

---

### 3. League Standings Panel
**What it does:** Shows the user's league standings table:
- Rank, team name (with "you" highlighted), record, points
- Fetched from the connected platform (Sleeper, Yahoo, ESPN)

**Why it matters:** Grounds the app in the user's real situation.
The Omen means more when you can see you're 3rd place and need a win.

**Backend hook:** `GET /api/league/standings?platform=...&leagueId=...`
Confirm scaffold status with Codex — the original route was retired with 410 in May 2026.

---

## Implementation Order (when ready)

1. ~~Run `/ui-ux-pro-max-skill` on Omen page~~ — **Done 2026-05-28.** Audit passed. All fixes committed.
2. ~~Build hamburger nav + team theme page + HITL feedback card~~ — **Done 2026-05-29.** Committed `f989522`.
3. **Run `/ui-ux-pro-max-skill` on Account + ConnectLeague pages** — **NEXT.** See checklist below.
4. **Build Trade Analyzer form rework** — position-first layout + autocomplete via `nflPlayers.js` (built) + Trade Room column. No backend dep — can start any time.
5. **Build HITL backend** (`POST /api/omen/feedback`) — gated on Justin approving `moves` table migration.
6. Build Move History panel — depends on HITL backend being live.
7. Build Standings panel — largely independent; confirm scaffold with Codex first.
8. Run `/ui-ux-pro-max-skill` on history/standings view before shipping.

---

## Account + ConnectLeague — Pre-Audit Checklist

Run `/ui-ux-pro-max-skill` on both pages before any new features are added to these surfaces.

**Account page (`frontend/src/pages/Account.jsx`) — known items to audit:**
- Plan picker — was using purple tokens, fixed to `var(--color-accent)`. Verify team theme color flows correctly here.
- Pricing section wired to `GET /api/stripe/prices` — confirm fallback display is clean and legible.
- No destructive account deletion UI yet — do not add until UX copy and Justin explicitly approve.
- Add a link/entry point to `/account/appearance` (Team Theme) so users can discover it.

**ConnectLeague page (`frontend/src/pages/ConnectLeague.jsx`) — known items to audit:**
- Platform connection cards — confirm empty / loading / error states are clear.
- ESPN cookie recovery flow — visual states should be clear, not alarming.
- Focus-visible rings were added in the 2026-05-28 audit sweep — confirm they look correct.
- Form labels, helper text, and button hierarchy.

**After both audits:** apply fixes, commit, then start the Trade Analyzer rework.

---

## Navigation — 2026-05-29

Hamburger nav built and shipped (`f989522`). Sidebar drawer slides from left.

| Section | Items | Auth gate |
| :--- | :--- | :--- |
| Dashboard | Football, Omen of the Week | Signed in |
| Tools | Trade Analyzer, Draft Assistant | Public |
| League | Connect League | Signed in |
| Account | Account, Appearance (team colors) | Signed in |
| Account | Sign In | Guest only |

**Logo slot:** In `Header.jsx` and `NavDrawer`, the `[C]` circle is labeled as a placeholder.
When the SVG logo is ready, replace the circle element with an inline SVG component.
Inline SVG is required so `--color-accent` can tint the logo mark with the user's team color.

---

## Team Theme — 2026-05-29

Full page at `/account/appearance` (ProtectedRoute). Data in `frontend/src/data/nflTeams.js`.

**Color strategy summary:**

| Scheme | Teams | Reasoning |
| :--- | :--- | :--- |
| Color rush | LAC (powder blue), TEN (sky blue), CLE (orange), NE (red), NYJ (Kelly Green) | Fan-beloved alternative to standard uniform |
| Secondary swap | PIT (gold), LV (silver), CHI (orange), HOU (red), SEA (neon green), GB (gold), WAS (gold), NYG (red), LAR (bone gold) | Standard primary too dark for Corvus dark UI |
| Standard | All other 18 teams | Primary color is bright enough; textSafe lifts if needed |

Backend needed: `PATCH /api/account/preferences` + `profiles.favorite_team` column (Justin approval required).
Frontend already calls it optimistically — fails silently until built.

---

## OAuth Status — Session 2026-05-28

All three auth providers are now resolved.

| Provider | Status | How it was fixed |
| :--- | :--- | :--- |
| Google | ✅ Fixed | Added Supabase callback URL to Google Cloud Console; set Supabase Site URL to `https://slopssaloon.com` |
| Discord | ✅ Fixed | Added callback URL to Discord Developer Portal; Discord credentials entered in Supabase dashboard |
| Apple | ✅ Intentionally disabled | Apple Developer account costs money. Button removed from `Login.jsx` |

---

## UX/UI Audit Gaps — Identified 2026-05-28 — ALL FIXED

Surfaced by `/ui-ux-pro-max-skill` across Landing, Login, Account, and Omen pages. All 7 fixed in `7b71a87` + `7b1cbab`.

### Landing.jsx
1. ✅ Focus rings on header links + waitlist button.
2. ✅ `active:scale-[0.97]` press feedback on CTA buttons.
3. ✅ `text-[10px]` story arc steps → `text-xs` (12px).
4. ✅ Waitlist submit: spinner + disabled state already present.

### Login.jsx
5. ✅ `min-h-screen` → `min-h-[100dvh]` on both wrappers.

### Account.jsx
6. ✅ Plan card `purple-*` tokens → `var(--color-accent)` / `var(--color-accent-hover)`.

### OmenPage.jsx
- ✅ "Corvus Pro" label: `text-purple-300` → `text-[var(--color-accent)]`.
- ✅ Back-link: inline-style color → Tailwind CSS-var class; hover + focus-visible ring added.

### All pages
7. ✅ Focus-visible sweep: DraftAssistant, TradeAnalyzer, ConnectLeague, PlatformConnections.
