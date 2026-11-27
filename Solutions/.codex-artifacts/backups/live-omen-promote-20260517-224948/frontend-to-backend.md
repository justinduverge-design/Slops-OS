# Frontend to Backend Handoff

## Status

Canonical request queue. Updated 2026-05-18 (Session 17 — Omen UI + platform status bar + backend live shell).

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

Status: partially completed by Codex.

Completed backend behavior:

- No auth -> mock preview response remains available.
- `?preview=mock` -> mock preview response remains available.
- Authenticated request with no connected platform -> `mode: "live"`, `is_mock: false`, `recommendation: null`, `status: "needs_platform_connection"`.
- Authenticated request with at least one active platform connection -> `mode: "live"`, `is_mock: false`, `recommendation: null`, `status: "connected_platform_pending_live_engine"`.
- Invalid bearer token -> `401 Invalid or expired token`.

When roster data is live (Yahoo / Sleeper / ESPN adapters connected), replace the mock with a real engine.

Expected shape: identical to the current mock contract (`2026-05-18.omen-mock.v1`). The frontend will detect `is_mock: false` and remove the preview banner automatically.

Route: `GET /api/omen-of-the-week`
Auth required: yes (user must have a connected platform to get a personalized omen)
Fallback: if no platform connected, return `recommendation: null` — the frontend renders the empty state.

Still pending:

- Fetch the connected roster.
- Map optimizer output into the Omen recommendation shape.
- Set dynamic week/season from live NFL context.

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
  "yahoo":   { "connected": true,  "platform": "yahoo" },
  "sleeper": { "connected": false, "platform": "sleeper", "username": null },
  "espn":    { "connected": false, "platform": "espn" }
}
```

The component reads the top-level platform keys directly. Backend now preserves that shape and also includes a `connections` wrapper for compatibility with any older UI code.

Status: completed by Codex.

---

### 5. Start/Sit signals

Status: completed by Codex.

Backend added deterministic `signals` to `POST /api/start-sit` while preserving existing fields.

Implemented rule: `LLM_BASE_URL` is not exposed; useful deterministic signals return even when Gemma/Ollama is unavailable.

### 6. Waiver Wire endpoint — GET /api/optimizer/waiver

Status: spec complete in `handoffs/backend-to-frontend.md` (Section 7). Frontend `WaiverWire.jsx` is built against the contract. Endpoint is not yet implemented.

Route: `GET /api/optimizer/waiver?week={n}&platform={yahoo|sleeper|espn}`
Auth required: yes — bearer token + Pro subscription
Response shape: defined in `backend-to-frontend.md` section 7

Frontend is ready to consume live responses. Mock fallback (`is_mock: true`) will render correctly. Backend needs to implement the route in `src/routes/optimizer.js`.

---

## Notes

- Do not change the top-level response shape or rename any fields in the mock contract without coordinating with frontend first — the component destructures the shape directly.
- The `disclaimer` field is intentionally not shown to end users. Do not surface it unless instructed.
- `is_mock: true` is the source of truth for showing the preview banner. Set it to `false` when the omen is live.
- Latest backend verification: `npm test` passes with 120 tests / 0 failures.
