# Codex Execution Prompt: Embed Trade Analyzer into Corvus Landing Page

## Assignee
Codex (Back-End / Full-Stack AI Engineer)

## Repo
`C:\Users\JDuve\OneDrive\Desktop\SLOPS\ssffmvp`

## Target File
`frontend/src/pages/Landing.jsx`

---

## Objective

Embed a fully functional Trade Analyzer tool directly into the Corvus landing page (`Landing.jsx`). This is not a teaser, not a preview, and not behind a login wall. A visitor who has never created an account must be able to run a real trade analysis and get real results.

---

## What the Trade Analyzer Does

The tool answers: **"Is this trade fair or useful for my team?"**

It uses the existing VORP-based backend model. Given two lists of players — the players you are giving up and the players you are receiving — it returns:
- A VORP delta (numeric, e.g. +4.2)
- A letter grade (e.g. "B+")
- A 2–3 sentence LLM narrative explaining whether the trade helps the user's team

---

## Backend Endpoint (Already Exists, No Auth Required)

```
POST /api/trade/analyze
Content-Type: application/json

{
  "giving": ["Player Name A", "Player Name B"],
  "receiving": ["Player Name C"]
}
```

Expected successful response shape:

```json
{
  "vorp_delta": 4.2,
  "grade": "B+",
  "narrative": "This trade slightly favors your side. You absorb a reliable WR2 at the cost of a boom-bust RB. Given your schedule, floor matters more than ceiling right now."
}
```

Error response (non-2xx or network failure): display a user-friendly error message inside the results panel.

Do not modify or rewrite this endpoint. Do not add authentication to it.

---

## Placement in Landing.jsx

Add the Trade Analyzer section **after the closing `</main>` tag and before the closing `</div>` that wraps the full page** (i.e., after line 202 and before the final `</div>` on line 203 in the current file).

The section should be a `<section>` element with its own `id="trade-analyzer"` so it can be deep-linked.

Also add a "Try the Trade Analyzer" anchor `<Button>` in the hero CTA group (after the existing "Preview Omen" button) that scrolls to `#trade-analyzer`.

---

## Visual Treatment

Match the existing Corvus design language exactly:

| Token | Value |
|---|---|
| Page background | `#050505` |
| Card background | `#101010` / `bg-[#101010]/90` |
| Border | `border-[#C9A44C]/25` |
| Gold accent | `#C9A44C` |
| Heading font | `font-serif` (Cormorant Garamond) |
| Body font | default sans (Alegreya Sans) |
| Primary text | `#F4EFE1` |
| Muted text | `#F4EFE1]/65` |
| Shadow | `shadow-2xl shadow-black/60` |

Section heading treatment (match the OmenCard label style):
```
<p className="text-xs uppercase tracking-[0.28em] text-[#C9A44C]">Free Tool</p>
<h2 className="mt-1 font-serif text-4xl md:text-5xl tracking-[0.18em] text-[#F4EFE1]">Trade Analyzer</h2>
<p className="mt-3 text-[#F4EFE1]/65">No account needed. Drop in your trade and get an instant read.</p>
```

The card wrapping the tool must use the same rounded-2xl / border / bg treatment as `OmenCard`.

Do NOT use a different visual language. Do NOT introduce any new color tokens not already present in the file.

---

## UI Components to Build (All in Landing.jsx as local React components)

### 1. `PlayerInput` Component

A panel that accepts a list of player names (strings). The user can:
- Type a player name into a text input and press Enter or click "Add" to append it to the list
- See the list of added players as removable chips/tags
- Click an X on any chip to remove that player

Props: `{ label, players, onAdd, onRemove }`

Styling: dark input with gold focus ring, chips styled with `bg-[#C9A44C]/15 border border-[#C9A44C]/30 text-[#F4EFE1] text-sm rounded-full px-3 py-1`.

No async player search. Plain text entry only. Do not call any search API.

### 2. `TradeAnalyzerSection` Component

Top-level section component. Manages all state. Renders:

**Layout (desktop):** two-column grid for the two `PlayerInput` panels side by side, "Run Analysis" button centered below, results panel below that.

**Layout (mobile):** single column, stacked. Players You Give Up → Players You Receive → Run Analysis → Results.

**State (React `useState` only — no Redux, no Zustand, no Context):**

```js
const [giving, setGiving] = useState([]);      // string[]
const [receiving, setReceiving] = useState([]); // string[]
const [result, setResult] = useState(null);    // { vorp_delta, grade, narrative } | null
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);      // string | null
```

**Run Analysis Button:**
- Label: "Run Analysis"
- Disabled when `giving.length === 0 || receiving.length === 0 || loading`
- Gold background (`bg-[#C9A44C] text-black`) matching existing `Button` component
- On click: clears previous result and error, sets loading true, fires the API call

**API Call Pattern:**

```js
async function runAnalysis() {
  setLoading(true);
  setError(null);
  setResult(null);
  try {
    const res = await fetch('/api/trade/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ giving, receiving }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    setResult(data);
  } catch (err) {
    setError(err.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
}
```

**Loading State:** Replace the results panel area with a centered gold spinner or pulsing text ("Consulting the omen...") while `loading === true`. Use a simple CSS animation or Tailwind `animate-pulse`. Do not block the rest of the page.

**Error State:** Show a red-bordered card (`border-red-500/40 bg-red-900/10`) with the error message and a "Try again" link that calls `runAnalysis()` again.

**Results Panel:** Only render when `result !== null`. Show:
- VORP Delta: display as `+4.2` or `-1.3` with gold text if positive, red-tinted if negative
- Grade: large serif display, gold color
- Narrative: body text, `text-[#F4EFE1]/80`, leading-7

Example results panel layout:
```
┌─────────────────────────────────────────┐
│  VORP Delta     Grade     Narrative      │
│  +4.2           B+        "This trade…"  │
└─────────────────────────────────────────┘
```

On mobile, stack these vertically.

---

## Mobile Layout Requirements

- The two `PlayerInput` panels stack vertically on screens below `md` breakpoint (use Tailwind `md:grid-cols-2`)
- The "Run Analysis" button spans full width on mobile
- The results panel should be readable on 375px viewport with no horizontal overflow
- No fixed widths that break on small screens

---

## What NOT to Do

- Do NOT add a login wall or any auth check to this feature
- Do NOT show placeholder/fake results. If the API is down, show the error state. Do not fabricate a response.
- Do NOT import any new external state management library (no Redux, Zustand, Recoil, etc.)
- Do NOT add a new route for this. It lives on the landing page at `/`.
- Do NOT add a player search autocomplete that calls an external API. Plain text input only.
- Do NOT move or delete the existing `OmenCard`, `Header`, hero section, or any existing component.
- Do NOT change the visual design language (no new fonts, no new primary colors, no Bootstrap, no MUI).
- Do NOT hardcode any secrets or API keys.
- Do NOT modify the backend endpoint at `POST /api/trade/analyze`.

---

## File Structure Impact

All new components (`PlayerInput`, `TradeAnalyzerSection`) should be added as local component functions within `Landing.jsx` itself — the same pattern already used for `Button`, `ChevronRight`, `CorvusLogo`, `OmenCard`, and `Header`. Do not create new files for this feature unless the file exceeds 600 lines and readability becomes a serious concern, in which case split into `TradeAnalyzer.jsx` in the same `pages/` directory and import it.

---

## Definition of Done

Codex should verify the following before marking this task complete:

1. **Visual parity:** The Trade Analyzer section renders on the landing page with dark card, gold accents, and serif headings matching the OmenCard style. No visual regressions to existing sections.
2. **Functional:** A user can type player names, add them to both panels, click "Run Analysis," and see real results returned from `POST /api/trade/analyze`.
3. **No auth gate:** The feature is accessible without any login, cookie, or session token.
4. **Error state works:** If the API returns a non-2xx response or the network fails, an error message is shown and the user can retry.
5. **Loading state works:** While the fetch is in-flight, the results area shows a loading indicator and the "Run Analysis" button is disabled.
6. **Mobile:** Layout is usable and unbroken at 375px viewport width.
7. **Existing page intact:** The hero section, OmenCard, header, and all existing CTAs are unchanged and still functional.
8. **No fake data:** No hardcoded mock results are ever shown to the user.

---

## Tests to Write

At minimum, add the following tests (use whatever test framework is already in the project — likely Vitest or Jest with React Testing Library):

### Test File Location
`frontend/src/pages/__tests__/Landing.test.jsx` (create if it doesn't exist)

### Required Tests

**Test 1: Renders without crashing**
```js
it('renders the Trade Analyzer section without crashing', () => {
  render(<Landing />);
  expect(screen.getByText(/Trade Analyzer/i)).toBeInTheDocument();
  expect(screen.getByText(/Players You Give Up/i)).toBeInTheDocument();
  expect(screen.getByText(/Players You Receive/i)).toBeInTheDocument();
});
```

**Test 2: API call fires on submit**
```js
it('calls POST /api/trade/analyze when Run Analysis is clicked with valid inputs', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      vorp_delta: 2.1,
      grade: 'B',
      narrative: 'Decent trade for your team.',
    }),
  });

  render(<Landing />);

  // Add a player to "giving"
  const givingInput = screen.getAllByPlaceholderText(/player name/i)[0];
  await userEvent.type(givingInput, 'Jaylen Warren');
  await userEvent.keyboard('{Enter}');

  // Add a player to "receiving"
  const receivingInput = screen.getAllByPlaceholderText(/player name/i)[1];
  await userEvent.type(receivingInput, 'Justin Jefferson');
  await userEvent.keyboard('{Enter}');

  const button = screen.getByRole('button', { name: /run analysis/i });
  await userEvent.click(button);

  expect(global.fetch).toHaveBeenCalledWith(
    '/api/trade/analyze',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        giving: ['Jaylen Warren'],
        receiving: ['Justin Jefferson'],
      }),
    })
  );

  // Result renders
  await screen.findByText('B');
  expect(screen.getByText(/Decent trade/i)).toBeInTheDocument();
});
```

**Test 3: Error state shows on bad response**
```js
it('shows an error message when the API returns a non-2xx response', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
  });

  render(<Landing />);

  const givingInput = screen.getAllByPlaceholderText(/player name/i)[0];
  await userEvent.type(givingInput, 'Player A');
  await userEvent.keyboard('{Enter}');

  const receivingInput = screen.getAllByPlaceholderText(/player name/i)[1];
  await userEvent.type(receivingInput, 'Player B');
  await userEvent.keyboard('{Enter}');

  await userEvent.click(screen.getByRole('button', { name: /run analysis/i }));

  expect(await screen.findByText(/Server error: 500/i)).toBeInTheDocument();
});
```

---

## Notes for Codex

- The existing `Button` component in `Landing.jsx` can be reused for "Run Analysis" and "Add" actions.
- The `useEffect` at the top of `Landing` handles hash-based scroll. Add a similar scroll target for `#trade-analyzer` if needed, following the same pattern.
- Keep the section visually separated from the hero/OmenCard area using `py-20 md:py-28` padding on the section and a subtle top border (`border-t border-white/10`).
- The section should be contained in a `max-w-7xl mx-auto px-5` wrapper, matching the hero section's max-width.

---

*This prompt was generated by Claude (Front-End Engineer) on 2026-05-17. Questions? Check `ssffmvp/Blueprints/handoffs/frontend-to-backend.md` or ping Justin.*
