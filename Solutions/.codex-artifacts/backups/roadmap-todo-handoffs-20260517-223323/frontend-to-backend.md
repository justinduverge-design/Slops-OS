# Frontend to Backend Handoff

## Status

Canonical request queue. Updated 2026-05-17 (Session 17 — Omen UI + platform status bar + ADRs).

---

## Completed

### Omen of the Week mock contracts
- `GET /api/health` — ready
- `GET /api/omen-of-the-week` — mock ready (`systemContracts.js`)
- `GET /api/platform-status` — ready

Frontend has consumed all three contracts. `OmenOfTheWeek.jsx` is built and wired to `/api/omen-of-the-week`.

---

## Current Backend Requests

### 1. Live Omen endpoint (post-mock phase)

When roster data is live (Yahoo / Sleeper / ESPN adapters connected), replace the mock with a real engine.

Expected shape: identical to the current mock contract (`2026-05-18.omen-mock.v1`). The frontend will detect `is_mock: false` and remove the preview banner automatically.

Route: `GET /api/omen-of-the-week`
Auth required: yes (user must have a connected platform to get a personalized omen)
Fallback: if no platform connected, return `recommendation: null` — the frontend renders the empty state.

### 2. Move type coverage

The current mock only returns `move_type: "lineup_swap"` with `primary_action.type: "start_sit"`.

The frontend `PrimaryActionCard` conditionally renders on `type === "start_sit"`. When waiver or trade move types become live, add a backend contract note here and I will add the corresponding UI panel.

Pending move types:
- `waiver_pickup` — primary_action shape TBD
- `trade` — primary_action shape TBD

### 3. Week / season context

The mock hardcodes `week: 1, season: 2026`. When the ESPN scoreboard API is wired to the omen engine, make `week` and `season` dynamic so the UI displays the correct game week.

---

### 4. Platform status bar — `/api/platforms/status` response shape

The `PlatformStatusBar` component in Football.jsx (Hall of Records) calls `GET /api/platforms/status` (auth-required, existing endpoint) and expects:

```json
{
  "connections": {
    "yahoo": { "connected": true },
    "sleeper": { "connected": false },
    "espn": { "connected": false }
  }
}
```

The component reads `data.connections` and filters for `connected === true`. If the existing `/api/platforms/status` response already returns this shape, no change is needed — just confirm. If the shape differs, drop a note in `backend-to-frontend.md` with the actual shape and I'll adapt the frontend.

---

## Notes

- Do not change the top-level response shape or rename any fields in the mock contract without coordinating with frontend first — the component destructures the shape directly.
- The `disclaimer` field is intentionally not shown to end users. Do not surface it unless instructed.
- `is_mock: true` is the source of truth for showing the preview banner. Set it to `false` when the omen is live.
