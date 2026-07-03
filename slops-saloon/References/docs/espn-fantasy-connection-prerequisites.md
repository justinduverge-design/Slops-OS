# ESPN Fantasy API — Connection Prerequisites

**Layer:** Slops Saloon division reference
**Applies to:** Any future Slops Saloon product that integrates ESPN Fantasy Football
**Last updated:** 2026-06-05 (derived from Omen live QA session)

---

## The core constraint — no official OAuth

ESPN does not expose an OAuth flow or a public API key system for fantasy football data. The only programmatic access to private league data is through **session cookies copied from a signed-in browser**.

There is no ESPN developer portal for fantasy. The official `developer.espn.com` API covers sports news and scores only — not fantasy leagues, rosters, or standings.

Every third-party ESPN fantasy integration uses the same cookie approach. This is the industry reality.

---

## Required credentials

Two cookies must be obtained from a signed-in ESPN browser session:

| Cookie | Description | Format | Typical size |
|--------|-------------|--------|-------------|
| `espn_s2` | Session authentication token | Long base64-encoded string | ~335 characters |
| `SWID` | Disney account identifier | UUID wrapped in curly braces | `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}` |

Both live in the browser's cookie store at **`https://www.espn.com`** (domain `.espn.com`, not just `fantasy.espn.com`).

### How to obtain them

1. Sign into espn.com in a browser
2. Open DevTools → **Storage/Application tab** → **Cookies** → `https://www.espn.com`
3. Click the `espn_s2` row — copy the full value from the **detail pane**, not the truncated table row
4. Click the `SWID` row — copy the value including `{` and `}`

The `espn_s2` cookie is ~335 characters. If the pasted value is shorter than ~100 characters, it was truncated.

---

## Cookie encoding — critical gotcha

**Firefox** and **Chrome** DevTools URL-encode certain characters when displaying cookie values:
- `+` → `%2B`
- `/` → `%2F`
- `=` → `%3D`

The **actual stored cookie value** uses the literal characters (`+`, `/`, `=`). DevTools is showing the URL-encoded display form.

**What this means for your backend:** When a user pastes the `espn_s2` value copied from DevTools, it will contain percent-encoded characters. You must `decodeURIComponent` the `espn_s2` value before sending it in a Cookie request header to ESPN.

If you send `espn_s2=...%2B...` to ESPN's API, the request will fail. ESPN expects the raw decoded value in the Cookie header.

```js
// Decode before sending
let espn_s2 = rawPastedValue;
if (espn_s2 && /%[0-9A-Fa-f]{2}/.test(espn_s2)) {
  try { espn_s2 = decodeURIComponent(espn_s2); } catch (_) { /* use as-is */ }
}
```

---

## ESPN API endpoint

The v3 fantasy API is:

```
https://fantasy.espn.com/apis/v3/games/ffl/seasons/{season}/segments/0/leagues/{leagueId}?view={viewName}
```

Required request headers:

```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36
Referer: https://fantasy.espn.com/
Accept: application/json
Cookie: espn_s2={value}; SWID={value}
```

The User-Agent header matters. ESPN's API rejects requests with `axios/VERSION` or similar non-browser User-Agents. Use a realistic browser User-Agent string.

Useful `view` params:
- `mTeam` — team data and ownership
- `mRoster` — roster with player details
- `mSettings` — league settings
- `mStandings` — standings (may need `mTeam` first)

---

## Season year detection

The ESPN v3 API is season-specific. The season year must match where the league actually lives.

**Off-season behavior (March–August):** New 2026 season leagues are created months before the season starts. The `activeSeason()` pattern of returning `currentYear - 1` during the off-season will fail for these leagues.

**Required pattern — try both years:**

```js
function seasonCandidates(now = new Date()) {
  const year = now.getFullYear();
  const month = now.getMonth();
  // Jan/Feb: playoffs still happening, try previous year first
  // March+: new season leagues open, try current year first
  return month <= 1 ? [year - 1, year] : [year, year - 1];
}
```

Try the first candidate. If the request fails with a retryable error, try the second.

---

## Off-season API lockout

During the NFL off-season, ESPN's v3 fantasy API may redirect all requests to `https://www.espn.com/fantasy/` and return **HTTP 202** — even with valid credentials.

This happens when:
- Both the current year and previous year season endpoints are inactive
- The league has not yet had its draft or is in a pre-season state

**202 is not a credential failure.** It is ESPN's API lockout behavior for off-season endpoints.

**Recommended handling:** When all season candidates return 202, treat the connection as "off-season deferred" rather than "credentials invalid." Store the credentials and inform the user that live access will be verified when the season opens.

**Do not** surface "cookies rejected" errors to users when the true cause is ESPN's off-season API state.

---

## Retryable error states

When implementing season-candidate retry logic, these ESPN HTTP responses warrant trying the other season year:

| ESPN HTTP status | Meaning | Retry? |
|-----------------|---------|--------|
| `401` / `403` | Auth rejected or session invalid | Yes — might be wrong season endpoint |
| `404` | League not found in this season | Yes — league may exist in another year |
| `202` | Redirect to ESPN homepage (off-season lockout) | Yes — API unavailable for this season |
| `5xx` | ESPN server error | No — not a season problem |

---

## Recovery flow

ESPN credentials expire when the user signs out of ESPN or after extended inactivity. Apps must provide a reconnect path.

The established Omen pattern (reusable):
- Store `espn_s2` and `SWID` in Supabase Vault (encrypted at rest) — never in plaintext columns
- Surface `espn_import_blocked` as the user-facing state when live API access fails
- Route recovery to the Account page for cookie re-entry
- Never log, display, or echo cookie values anywhere in the app

See `Blueprints/playbooks/espn-recovery.md` for full recovery state map and copy.

---

## CORS for local development

ESPN connect requires a POST with a JSON body, which triggers CORS preflight. In production, your backend's CORS allowlist handles this. In local development:

- If your backend runs in a Docker container with `NODE_ENV=production`, the dev localhost origin will not be in the CORS allowlist
- Add `http://localhost:{PORT}` as a default CORS origin in your `docker-compose.yml`:

```yaml
CORS_ORIGINS: ${CORS_ORIGINS:-http://localhost:5173,http://localhost:3000}
```

Simple GET requests will work without this. Only POST/PUT/DELETE to protected routes will fail silently without the correct CORS header.

---

## Libraries to avoid

The npm package `espn-fantasy-football-api` bundles its own axios and sends `User-Agent: axios/VERSION` — ESPN's API rejects this. Use Node's built-in `https` module or `fetch` with a realistic browser User-Agent instead.

---

## Security rules (non-negotiable)

- `espn_s2` and `SWID` must never appear in logs, console output, database plaintext, analytics events, error messages, or API responses
- Store only Vault secret IDs in the database — never the raw values
- Never echo the submitted cookie values back to the frontend
- Mark the request body as skip-log before any body parsing middleware runs
- ESPN cookies can be used to access the user's full ESPN account — treat them with the same care as passwords

---

## Summary checklist for new ESPN integrations

- [ ] Use cookie-based auth — no OAuth alternative exists
- [ ] Require both `espn_s2` and `SWID` from `https://www.espn.com` cookies
- [ ] URL-decode `espn_s2` before sending to ESPN API
- [ ] Send realistic browser User-Agent header
- [ ] Implement season-candidate retry (current year first, fall back)
- [ ] Handle HTTP 202 as off-season lockout, not credential failure
- [ ] Store credentials in encrypted Vault, never plaintext
- [ ] Never log or display cookie values
- [ ] Provide a reconnect path — cookies expire
- [ ] Add localhost to CORS origins for local development
