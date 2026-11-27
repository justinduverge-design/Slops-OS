# Backend to Frontend Handoff

## Feature: Omen of the Week MVP Backend Contracts

### Status

Mock endpoint ready. Live empty-state shell ready locally.

Deployment status: local dirty worktree only. Not confirmed merged or production-deployed.

These endpoints are intentionally frontend-safe so Claude can build the Omen UI without waiting on real platform roster data. Authenticated live-mode requests now return stable empty states while the roster-backed recommendation engine is still pending.

### Endpoint: Health

`GET /api/health`

Auth required: no

Response:

```json
{
  "status": "ok",
  "service": "ssffmvp-api",
  "uptime": 12.34,
  "timestamp": "2026-05-18T00:00:00.000Z",
  "contract_version": "system-health.v1"
}
```

### Endpoint: Omen of the Week

`GET /api/omen-of-the-week`

Auth behavior:

- No auth: deterministic mock preview data.
- `?preview=mock`: deterministic mock preview data, even when an auth token is present.
- Bearer token present: validated live-mode shell response.

Status:

- Mock preview ready.
- Live empty-state shell ready.
- Live personalized recommendations pending.

Response shape:

```json
{
  "feature": "omen_of_the_week",
  "status": "mock_ready",
  "mode": "mock",
  "is_mock": true,
  "contract_version": "2026-05-18.omen-mock.v1",
  "generated_at": "2026-05-18T00:00:00.000Z",
  "season": 2026,
  "week": 1,
  "recommendation": {
    "id": "mock-omen-lineup-swap-001",
    "move_type": "lineup_swap",
    "priority": "high",
    "headline": "Start the higher-floor flex option",
    "summary": "The mock model prefers the safer flex play because the projected point edge is meaningful and the bench alternative carries more role volatility.",
    "confidence_score": 78,
    "confidence_label": "strong lean",
    "risk_level": "medium",
    "primary_action": {
      "type": "start_sit",
      "roster_slot": "FLEX",
      "start": {
        "player_key": "mock:wr-starter-candidate",
        "name": "Sample WR Starter",
        "position": "WR",
        "team": "EXA",
        "opponent": "OPP",
        "projected_points": 14.2,
        "status": "active"
      },
      "sit": {
        "player_key": "mock:rb-bench-candidate",
        "name": "Sample RB Bench",
        "position": "RB",
        "team": "SAM",
        "opponent": "DEF",
        "projected_points": 10.4,
        "status": "questionable"
      },
      "projected_points_delta": 3.8
    },
    "impact": {
      "projected_points_delta": 3.8,
      "win_probability_delta": 4.2,
      "floor_delta": 2.1,
      "ceiling_delta": -0.6
    },
    "reasoning": [
      "Projection edge favors the starter candidate by 3.8 points.",
      "The bench candidate is tagged questionable, so the floor is lower than the raw projection suggests.",
      "The recommendation is a disciplined weekly edge, not a guaranteed outcome."
    ],
    "evidence": [
      {
        "label": "Projection edge",
        "value": "+3.8 pts",
        "weight": "high"
      }
    ],
    "alternatives": [
      {
        "id": "mock-omen-waiver-001",
        "move_type": "waiver_pickup",
        "headline": "Monitor the top available RB depth add",
        "confidence_score": 61,
        "risk_level": "medium"
      }
    ],
    "disclaimer": "Mock data for frontend integration only. Do not present this as live fantasy advice."
  }
}
```

Frontend guidance:

- Treat `mode: "mock"` and `is_mock: true` as the source of truth for mock labeling.
- Treat `mode: "live"` and `is_mock: false` as the source of truth for live rendering.
- In live mode, `recommendation: null` is valid and should render the existing empty state.
- Use `recommendation.headline`, `summary`, `confidence_score`, `risk_level`, `primary_action`, `impact`, `reasoning`, `evidence`, and `alternatives`.
- Do not show the disclaimer as a scary warning in the main UI. It is a product safety note for integration.

Live empty response examples:

```json
{
  "feature": "omen_of_the_week",
  "status": "needs_platform_connection",
  "mode": "live",
  "is_mock": false,
  "contract_version": "2026-05-18.omen-live.v1",
  "generated_at": "2026-05-18T00:00:00.000Z",
  "season": 2026,
  "week": null,
  "recommendation": null,
  "empty_state": {
    "code": "needs_platform_connection",
    "message": "Connect Yahoo, Sleeper, or ESPN before a personalized Omen can be generated.",
    "connected_platforms": []
  }
}
```

```json
{
  "feature": "omen_of_the_week",
  "status": "connected_platform_pending_live_engine",
  "mode": "live",
  "is_mock": false,
  "contract_version": "2026-05-18.omen-live.v1",
  "generated_at": "2026-05-18T00:00:00.000Z",
  "season": 2026,
  "week": null,
  "recommendation": null,
  "empty_state": {
    "code": "connected_platform_pending_live_engine",
    "message": "A fantasy platform is connected. The roster-backed Omen engine is not promoted yet, so no live recommendation is returned.",
    "connected_platforms": [
      {
        "platform": "sleeper",
        "league_id": "league-1",
        "username": "sleepy"
      }
    ]
  }
}
```

### Endpoint: Platform Status

`GET /api/platform-status`

Auth required: no

Purpose: public backend readiness and dependency status for the app shell.

This is not the user-specific platform connection endpoint. For connected Yahoo/Sleeper/ESPN account state, use the existing authenticated endpoint:

`GET /api/platforms/status`

That authenticated endpoint now returns both the legacy top-level shape and a `connections` wrapper:

```json
{
  "yahoo": {
    "connected": false,
    "platform": "yahoo"
  },
  "sleeper": {
    "connected": true,
    "platform": "sleeper",
    "username": "sleepy"
  },
  "espn": {
    "connected": false,
    "platform": "espn"
  },
  "connections": {
    "yahoo": {
      "connected": false,
      "platform": "yahoo"
    },
    "sleeper": {
      "connected": true,
      "platform": "sleeper",
      "username": "sleepy"
    },
    "espn": {
      "connected": false,
      "platform": "espn"
    }
  }
}
```

Response shape:

```json
{
  "status": "ok",
  "service": "ssffmvp-api",
  "mode": "contract_ready",
  "generated_at": "2026-05-18T00:00:00.000Z",
  "contract_version": "platform-status.v1",
  "endpoints": {
    "health": {
      "method": "GET",
      "path": "/api/health",
      "auth_required": false,
      "status": "ready"
    },
    "omen_of_the_week": {
      "method": "GET",
      "path": "/api/omen-of-the-week",
      "auth_required": false,
      "status": "mock_ready"
    },
    "user_platform_connections": {
      "method": "GET",
      "path": "/api/platforms/status",
      "auth_required": true,
      "status": "ready"
    }
  },
  "platforms": {
    "yahoo": {
      "status": "adapter_ready",
      "auth": "oauth2",
      "normalized_roster": true
    },
    "sleeper": {
      "status": "adapter_ready",
      "auth": "username_lookup",
      "normalized_roster": true
    },
    "espn": {
      "status": "adapter_ready_feature_gated",
      "auth": "vault_encrypted_cookies",
      "normalized_roster": true
    }
  },
  "dependencies": {
    "supabase": {
      "status": "configured",
      "required": true
    },
    "redis": {
      "status": "configured",
      "required": false
    },
    "openweather": {
      "status": "not_configured",
      "required": false
    },
    "llm": {
      "status": "configured_private",
      "model": "gemma3:4b",
      "timeout_ms": 30000,
      "public_url_exposed": false,
      "note": "Ollama must remain private or firewall-restricted; this endpoint never returns LLM_BASE_URL."
    }
  }
}
```

### Environment Notes

No new required environment variables were added for the mock Omen endpoint.

Updated `.env.example` to clarify:

- `LLM_BASE_URL` must point to a private or firewall-restricted Ollama path.
- The public mock Omen endpoint needs no secrets.

### Backend Notes

- The existing authenticated `GET /api/platforms/status` route remains backward-compatible and now also includes `connections`.
- The existing Pro-gated `POST /api/optimizer/mvp-move` route remains unchanged.
- The mock endpoint uses sample player names and must not be treated as live fantasy advice.
- Authenticated live-mode Omen does not return Vault secret IDs, cookies, LLM base URLs, or platform tokens.
- Current verification: `npm test` passes with 120 tests / 0 failures.

---

## Feature: Start/Sit with LLM Reasoning (Enhanced)

### Status

Implemented locally. Existing fields preserved.

The `POST /api/start-sit` endpoint exists and returns `winner`, `pointsDelta`, `recommendation`, `explanation`, and `signals`. The `explanation` field may be `null` when Gemma/Ollama is unavailable, but `signals` are always populated from deterministic math/status context.

### Endpoint: Start/Sit

`POST /api/start-sit`

Auth required: no (free feature, bearer token accepted but not enforced)

Request body:

```json
{
  "playerA": {
    "name": "Player Name",
    "position": "WR",
    "projected_points": 14.2,
    "status": "active"
  },
  "playerB": {
    "name": "Other Player",
    "position": "WR",
    "projected_points": 10.4,
    "status": "questionable"
  }
}
```

Required fields per player: `name` (non-empty string), `position` (non-empty string), `projected_points` (finite number). `status` is optional.

Response (LLM available):

```json
{
  "winner": "A",
  "pointsDelta": 3.8,
  "recommendation": "Start Player Name over Other Player",
  "explanation": "Player Name has a meaningful projection edge of 3.8 points and carries no injury risk. Other Player is listed as questionable, which introduces floor uncertainty that makes the safer play clear for this slot.",
  "signals": [
    {
      "label": "Projection edge",
      "value": "+3.8 pts",
      "weight": "high"
    },
    {
      "label": "Injury status",
      "value": "Other Player questionable",
      "weight": "medium"
    },
    {
      "label": "Matchup context",
      "value": "Derived from position and opponent data where available",
      "weight": "low"
    }
  ]
}
```

Response (LLM timeout or error — graceful fallback):

```json
{
  "winner": "A",
  "pointsDelta": 3.8,
  "recommendation": "Start Player Name over Other Player",
  "explanation": null,
  "signals": [
    {
      "label": "Projection edge",
      "value": "+3.8 pts",
      "weight": "high"
    }
  ]
}
```

Error responses:

- `400` — missing or invalid player fields. Response: `{ "error": "<field> must be a non-empty string" }` (existing validation is already in place)

### Field Definitions

| Field | Type | Notes |
|---|---|---|
| `winner` | `"A"` or `"B"` | Which player to start |
| `pointsDelta` | number | Absolute projected point difference, rounded to 2 decimal places |
| `recommendation` | string | Human-readable action string |
| `explanation` | string or null | LLM-narrated reasoning. `null` only when LLM times out or errors. Never an empty string — either a full sentence or `null`. |
| `signals` | array | Ordered list of factors that influenced the recommendation. Populated even on fallback (use math-derived signals if LLM is unavailable). |

### Signal Object Shape

```json
{
  "label": "string",
  "value": "string",
  "weight": "high | medium | low"
}
```

At minimum, always include the `Projection edge` signal. Injury status signals should appear whenever `status` is not null and not `"active"`. Matchup context is optional and should be omitted if no matchup data is available.

### Implementation Notes for Codex

- LLM timeout is currently hardcoded at `LLM_TIMEOUT_MS = 8000` in `src/routes/startSit.js`. Do not lower this without discussion.
- The `explainSafely()` wrapper handles timeout and clears the timer after fast LLM/null responses.
- `llm.explainStartSit()` remains the explanation integration point.
- `signals` are populated with at minimum the projection edge, derived from `pointsDelta` already computed by `comparePlayers()`.
- Do not expose the Ollama base URL in any response.

### Frontend Notes

- `StartSit.jsx` already calls this endpoint. The `explanation` display is likely already wired but may show nothing when `explanation` is null. Add a graceful fallback: if `explanation` is null, show a short static copy string such as "Reasoning unavailable — recommendation based on projected points."
- Render `signals` as a supporting evidence list beneath the recommendation. Each signal maps to `label`, `value`, and a visual `weight` indicator (high/medium/low badge or icon).
- Do not block the recommendation UI on `explanation`. Show the winner and `recommendation` string immediately; render explanation and signals as a secondary section that can be empty.

---

## Feature: Waiver Wire Optimization

### Status

Contract ready. Endpoint stub exists at `GET /api/optimizer/waivers` (Pro-gated, leagueKey-based). This new contract defines a simpler, platform-aware public-path version for the frontend waiver UI. Codex should wire `getAvailablePlayers()` and VORP delta logic. Mock data is acceptable until the Yahoo projections sub-resource is connected.

### Endpoint: Waiver Wire Optimizer

`GET /api/optimizer/waiver?week={n}&platform={yahoo|sleeper|espn}`

Auth required: yes — bearer token required. Returns `401` if missing or invalid. Returns `402` if user does not have a Pro subscription.

Query parameters:

| Parameter | Type | Required | Notes |
|---|---|---|---|
| `week` | integer 1–18 | no | Defaults to current week if omitted |
| `platform` | `yahoo`, `sleeper`, or `espn` | yes | Determines which platform adapter is used to fetch the available player pool |

Response (success):

```json
{
  "week": 14,
  "platform": "yahoo",
  "pool_size": 50,
  "is_mock": false,
  "recommendations": [
    {
      "name": "Player Name",
      "position": "RB",
      "team": "BUF",
      "projected_points": 12.4,
      "vorp_delta": 4.1,
      "reason": "Fills your weakest roster position by projected VORP. Starting RB2 is on IR.",
      "available": true
    },
    {
      "name": "Second Player",
      "position": "WR",
      "team": "KC",
      "projected_points": 10.8,
      "vorp_delta": 2.9,
      "reason": "Slot receiver with volume upside in a high-total game. Upgrades your WR3.",
      "available": true
    }
  ],
  "generated_at": "2026-05-18T00:00:00.000Z"
}
```

Top 5 players maximum. Ranked by `vorp_delta` descending. All returned players have `available: true`.

Response (mock mode — player availability API not yet wired):

Same shape as above with `"is_mock": true` and a `note` field:

```json
{
  "week": 14,
  "platform": "yahoo",
  "pool_size": 0,
  "is_mock": true,
  "note": "Player availability API not connected. Returning mock waiver candidates for UI integration.",
  "recommendations": [
    {
      "name": "Mock RB Pickup",
      "position": "RB",
      "team": "EXA",
      "projected_points": 11.0,
      "vorp_delta": 3.5,
      "reason": "Mock: high-volume back in a favorable matchup. Addresses your weakest roster spot.",
      "available": true
    }
  ],
  "generated_at": "2026-05-18T00:00:00.000Z"
}
```

Error responses:

- `400` — missing `platform` param or invalid value. Response: `{ "error": "platform must be one of: yahoo, sleeper, espn" }`
- `400` — invalid `week`. Response: `{ "error": "week must be between 1 and 18" }`
- `401` — missing or invalid bearer token. Response: `{ "error": "Unauthorized" }`
- `402` — valid auth but no Pro subscription. Response: `{ "error": "Pro subscription required" }`
- `401` — platform token expired. Response: `{ "error": "Yahoo token expired - re-authenticate" }` (platform name varies)

### Player Object Shape

```json
{
  "name": "string",
  "position": "QB | RB | WR | TE | K | DEF",
  "team": "string (3-letter NFL team abbreviation)",
  "projected_points": "number (null if projection unavailable)",
  "vorp_delta": "number (positive = upgrade over current roster at position)",
  "reason": "string (one sentence explaining why this player was surfaced)",
  "available": true
}
```

`vorp_delta` is computed as: `player.projected_points - roster_baseline_at_position`. The roster baseline is the weakest starter at that position on the user's current roster. VORP v2 logic already exists — use it.

`projected_points` may be `null` when the platform API does not return projections (known Yahoo limitation documented in the existing `/waivers` route). When null, `vorp_delta` should be computed as `0 - roster_baseline`, which will still surface injured/OUT players as upgrade candidates.

### Dependencies

- VORP v2: done (existing `optimizer.findWaiverMoves()`)
- Platform adapters: done (yahoo, sleeper, espn)
- `getAvailablePlayers()` in `src/services/yahooAuth.js` or the Yahoo client: call with `{ count: 50, sort: "AR" }` (existing call pattern in `src/routes/optimizer.js` line 95)
- `rosterSvc.normalizeYahooWaivers()`: done
- Mock data: use when `getAvailablePlayers()` throws or returns empty

### Implementation Notes for Codex

- This endpoint is distinct from the existing `GET /api/optimizer/waivers` (which takes `leagueKey`). This new endpoint is platform-centric and does not require `leagueKey` — the authenticated user's linked platform account determines the league.
- Route path: `GET /api/optimizer/waiver` (singular, no `leagueKey` query param).
- If multiple leagues are linked for a platform, use the first active league or the one most recently accessed.
- Cap results at 5. Do not return more than 5 recommendations regardless of pool size.
- `is_mock: true` must be set whenever mock data is used. Never set `is_mock: false` on mock data.
- The `note` field is only present when `is_mock: true`. Omit it on live responses.
- Apply the same `requireAuth` and `requireSubscription` middleware chain as the existing optimizer routes.

### Frontend Notes

- Display results as a ranked pickup list: rank number, player name, position badge, team, projected points, VORP delta, and reason.
- Show `is_mock: true` as an inline label (e.g., "Preview — mock data") so users understand this is not live. Do not show it as a blocking error.
- If `projected_points` is null for a player, display "—" in the points column rather than 0.
- The waiver UI should be accessible from the dashboard and from the Omen of the Week view as a secondary recommendation path.
- Do not show `available: false` players. The API will not return them, but guard against it defensively.

---

### 6. Live Omen Engine — promote `getLiveOmenForUser()` in omen.js

**File:** `src/services/omen.js` — replace the stub body of `getLiveOmenForUser(userId)`.

**Current behavior:** always falls through to `getOmenLiveEmpty("connected_platform_pending_live_engine")` regardless of platform type. Needs full promotion.

#### Call sequence

```js
const { getAuthenticatedYahooClient } = require("./yahooAuth");
const rosterSvc = require("./roster");
const optimizer = require("./optimizer");
const agents    = require("./agents");
const nflSchedule = require("./nflSchedule"); // getGameInfo only — no getCurrentWeek export
```

Derive `week` from the roster response (`roster.week`), not from `nflSchedule` — `nflSchedule` exports only `getGameInfo(teamAbbr)` and `__clearCache`. Set `week: roster.week ?? null` in the output.

#### Decision tree

```
getLiveOmenForUser(userId)
  ├─ getActivePlatformConnections(userId)           // already exists in omen.js
  │
  ├─ No connections
  │    └─ return getOmenLiveEmpty({ status: "needs_platform_connection", ... })
  │
  ├─ Yahoo connection present
  │    ├─ getAuthenticatedYahooClient(userId)        // yahooAuth.js — returns { client, leagueId }
  │    │     throws "yahoo_token_expired" → bubble as { status: 401, message: "Yahoo token expired" }
  │    ├─ rosterSvc.fetchAndNormalizeRoster(client, leagueId, null, cacheKey)
  │    │     cacheKey: `ssff:omen:${userId}:${leagueId}`
  │    ├─ optimizer.evaluateLineup(roster)           // returns recommendations array
  │    ├─ No recommendation → return getOmenLiveEmpty("connected_platform_pending_live_engine")
  │    └─ Recommendation present → map to full Omen shape (see below)
  │
  └─ Sleeper/ESPN connection present (no Yahoo)
       ├─ No OAuth client for Sleeper — query platform_connections directly for league_id + username
       ├─ Sleeper adapter path: rosterSvc has no Sleeper variant yet — return
       │    getOmenLiveEmpty("connected_platform_pending_live_engine") with sleeper platform summary
       └─ ESPN: same fallback — treat as pending until espnAuth is wired into this path
```

#### Field mapping — optimizer result → Omen recommendation shape

`optimizer.evaluateLineup(roster)` returns an array of swap objects. Take `recommendations[0]` (highest priority).

```js
const swap = recommendations[0]; // { starter, bench, delta, confidence, slot }

recommendation: {
  id:               `live-omen-${userId}-${Date.now()}`,
  move_type:        "lineup_swap",
  priority:         swap.confidence >= 75 ? "high" : swap.confidence >= 50 ? "medium" : "low",
  headline:         `Start ${swap.bench.name} over ${swap.starter.name}`,
  summary:          agents result summary string (see runMVPMove note below),
  confidence_score: swap.confidence,                // already 0–100
  confidence_label: confidenceLabelFromScore(swap.confidence), // map: >=75→"strong lean", >=50→"lean", else→"slight edge"
  risk_level:       swap.starter.status in RISKY ? "medium" : "low",
  primary_action: {
    type:           "start_sit",
    roster_slot:    swap.slot,
    start: {
      player_key:       swap.bench.player_key,
      name:             swap.bench.name,
      position:         swap.bench.position,
      team:             swap.bench.team,
      opponent:         swap.bench.opponent ?? null,
      projected_points: swap.bench.projected_points,
      status:           swap.bench.status ?? "active",
    },
    sit: {
      player_key:       swap.starter.player_key,
      name:             swap.starter.name,
      position:         swap.starter.position,
      team:             swap.starter.team,
      opponent:         swap.starter.opponent ?? null,
      projected_points: swap.starter.projected_points,
      status:           swap.starter.status ?? "active",
    },
    projected_points_delta: swap.delta,
  },
  impact: {
    projected_points_delta: swap.delta,
    win_probability_delta:  null,   // not computed yet — omit or null
    floor_delta:            null,
    ceiling_delta:          null,
  },
  reasoning: [],   // populated by agents.getMVPMove() if called (see below)
  evidence: [
    { label: "Projection edge", value: `+${swap.delta.toFixed(1)} pts`, weight: "high" },
  ],
  alternatives: [], // future: second swap or top waiver from findWaiverMoves()
  disclaimer:    null,
}
```

#### `agents.getMVPMove()` integration

`agents.getMVPMove(players, opts)` is the correct entry point (not `runMVPMove` — that function does not exist at the module boundary; `getMVPMove` is the export at line 415/464 of agents.js).

Call it after `evaluateLineup` to enrich `reasoning` and `summary`:

```js
const players = [...roster.slots.starters, ...roster.slots.bench].filter(Boolean);
const mvp = await agents.getMVPMove(players, { scoringFormat: "ppr", record: null });
// mvp may be null if LLM is unavailable — treat as graceful fallback
if (mvp) {
  recommendation.summary  = mvp.summary ?? recommendation.headline;
  recommendation.reasoning = mvp.reasoning ?? [];
}
```

`agents.getMVPMove()` is non-blocking with internal fallback — it returns `null` on LLM failure. Do not let a `null` result prevent the Omen from returning; use the headline as summary and leave `reasoning: []`.

#### Output contract

Must match `2026-05-18.omen-mock.v1` shape (same top-level keys as mock):

```js
{
  feature:          "omen_of_the_week",
  status:           "live",
  mode:             "live",
  is_mock:          false,                          // NEVER true on this path
  contract_version: "2026-05-18.omen-live.v1",     // LIVE_CONTRACT_VERSION from systemContracts.js
  generated_at:     new Date().toISOString(),
  season:           2026,
  week:             roster.week ?? null,
  recommendation:   { /* mapped shape above */ },
}
```

Do not import `CONTRACT_VERSION` (mock constant) — use `LIVE_CONTRACT_VERSION` from `systemContracts.js`, which is already imported via `getOmenLiveEmpty`.

#### Empty-state sentinels (already implemented — do not change signatures)

```js
getOmenLiveEmpty("needs_platform_connection")               // no platform row
getOmenLiveEmpty("connected_platform_pending_live_engine")  // platform present, no result
```

Both are already wired in `getOmenLiveEmpty()` in `systemContracts.js`. Pass the status string as `{ status: "..." }` per its existing signature.

#### Error handling

- `yahoo_token_expired` thrown by `getAuthenticatedYahooClient` → rethrow with `{ status: 401 }` attached so the route layer can respond `401`.
- Any other error in the fetch/normalize/evaluate chain → log and return `getOmenLiveEmpty("connected_platform_pending_live_engine")` (do not crash the request).

#### Tests

- Existing 120 tests must continue to pass — do not modify `systemContracts.js` or the `getOmenLiveEmpty` signature.
- Add a stub describe block in `test/omen.test.js` (or the existing omen test file):
  - `getLiveOmenForUser returns needs_platform_connection when no rows` — mock `getActivePlatformConnections` to return `[]`
  - `getLiveOmenForUser returns connected_platform_pending_live_engine when evaluateLineup returns empty` — mock roster + optimizer
  - `getLiveOmenForUser returns full recommendation shape when swap exists` — assert `is_mock: false`, `mode: "live"`, `recommendation.move_type === "lineup_swap"`
  - `getLiveOmenForUser falls back gracefully when agents.getMVPMove returns null`

---

### 7. Waiver Wire endpoint — GET /api/optimizer/waiver

**File:** `src/routes/optimizer.js` — add a new route alongside the existing `/lineup` and `/waivers` routes.

#### Route

```
GET /api/optimizer/waiver?week={n}
```

Auth: `requireAuth` + `requireSubscription` — already applied via `router.use()` at line 42. No additional middleware needed.

This route is distinct from `GET /api/optimizer/waivers` (which requires `leagueKey`). The new route is platform-centric: the user's linked Yahoo account determines the league. No `leagueKey` query param.

#### Week validation

Use the existing `parseWeek()` sentinel (defined at line 34 of optimizer.js):

```js
const wk = parseWeek(req.query.week);
// wk === null  → week omitted, use current (roster.week after fetch)
// wk === undefined → invalid integer → return 400
if (wk === undefined) {
  return res.status(400).json({ error: "week must be between 1 and 18" });
}
```

#### Call sequence

```js
// 1. Get Yahoo client (same pattern as /lineup and /waivers routes)
const { client: yahoo, leagueId } = await getAuthenticatedYahooClient(req.user.id);
//   getAuthenticatedYahooClient is already imported in optimizer.js (line 25)

// 2. Fetch and normalize roster (for baseline VORP)
const cacheKey = `ssff:waiver:${req.user.id}:${leagueId}:${wk || "current"}`;
const roster   = await rosterSvc.fetchAndNormalizeRoster(yahoo, leagueId, wk, cacheKey);
//   rosterSvc already imported as require("../services/roster") (line 27)

// 3. Fetch available player pool via Yahoo client method
const rawWaivers = await yahoo.getAvailablePlayers(leagueId, { count: 50, sort: "AR" });
//   yahoo.getAvailablePlayers() exists at yahoo.js line 112
//   Same call pattern as the existing /waivers route (optimizer.js line 95)

// 4. Normalize waiver pool
const waiverPool = rosterSvc.normalizeYahooWaivers(rawWaivers);
//   already used in /waivers route (line 96)

// 5. Rank by VORP delta using vorpForPlayer()
const { vorpForPlayer } = require("../services/vorp");
//   vorpForPlayer(player, opts) exported at vorp.js line 148
//   opts: { scoringFormat: "ppr" } (default to ppr if not in query)

// 6. Compute vorp_delta for each waiver candidate
// roster_baseline_at_position = min adjustedProjection of starters at that position
// vorp_delta = vorpForPlayer(candidate, { scoringFormat }).vorp - baseline_vorp
// Sort descending by vorp_delta, take first 5
```

#### Mock fallback

If `yahoo.getAvailablePlayers()` throws or returns an empty array, return mock data with `is_mock: true`:

```js
{
  week:            roster.week,
  platform:        "yahoo",
  pool_size:       0,
  is_mock:         true,
  note:            "Player availability API not connected. Returning mock waiver candidates for UI integration.",
  recommendations: MOCK_WAIVER_CANDIDATES,  // define as a module-level const — 5 entries
  generated_at:    new Date().toISOString(),
}
```

Live response (`is_mock: false`) omits the `note` field. Never set `is_mock: false` on mock data.

#### Response shape (live)

```js
{
  week:            roster.week,
  platform:        "yahoo",
  pool_size:       waiverPool.length,
  is_mock:         false,
  recommendations: top5,   // array of player objects, max 5, sorted by vorp_delta desc
  generated_at:    new Date().toISOString(),
}
```

Each recommendation object:

```js
{
  name:             player.name,
  position:         player.position,
  team:             player.team,
  projected_points: player.projected_points ?? null,
  vorp_delta:       Number(vorp_delta.toFixed(2)),
  reason:           "<one sentence — position need + VORP edge>",
  available:        true,
}
```

`projected_points` may be `null` — the existing `/waivers` route already documents this Yahoo limitation (line 104–107 of optimizer.js). When null, `vorp_delta = 0 - baseline_vorp` (same existing pattern in `findWaiverMoves`).

#### Error handling

Follow the exact pattern from `/lineup` and `/waivers`:

```js
} catch (e) {
  if (e.message === "yahoo_token_expired") {
    return res.status(401).json({ error: "Yahoo token expired - re-authenticate" });
  }
  next(e);
}
```

#### Error responses

- `400` — invalid week: `{ "error": "week must be between 1 and 18" }` (from `parseWeek` sentinel)
- `401` — missing/invalid bearer token: handled by `requireAuth` middleware
- `402` — no Pro subscription: handled by `requireSubscription` middleware
- `401` — Yahoo token expired: `{ "error": "Yahoo token expired - re-authenticate" }`
