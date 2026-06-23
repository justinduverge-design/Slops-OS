# Slops OS App Template Spec

**Date:** 2026-05-24
**Status:** v1 — established from Omen reference implementation
**Applies to:** All Slops Saloon products (Omen is the first instance)

---

## Purpose

This spec defines the reusable app template that all Slops Saloon products share.
Omen is the reference implementation. Future products inherit this template and override where needed.

When a second Slops Saloon product starts, create a product-specific design system document (like `omen-ux-ui-design-system-v1.md`) that extends this template with product-specific tokens and patterns.

---

## Template Principles

1. **Value before signup.** No product should gate its front-door experience behind authentication.
2. **Trust through transparency.** Always label mock, stub, live, or unavailable data clearly.
3. **Explain the recommendation.** Who, why, risk, confidence — every time.
4. **Mobile-first.** All layouts must work on a 375px wide screen before being considered complete.
5. **Theme-aware.** Light, dark, and system (OS preference) are required — not optional.
6. **State coverage.** Every screen that loads data must handle loading, error, empty, and disconnected states.

---

## Route Architecture Pattern

Every Slops OS product follows this route structure:

```
/                        ← Slops Saloon parent landing (company layer)
/[product]               ← Product landing / entry point (e.g., /omen)
/[product]/app           ← Authenticated app shell (dashboard)
/[product]/[tool]        ← Individual tool pages
/login                   ← Auth entry point (shared across products)
/account                 ← Auth user settings (shared across products)
/api/*                   ← Backend API (never public-facing pages)
```

The product landing (`/[product]`) is always publicly accessible.
The app shell (`/[product]/app`) requires authentication.
Tool pages inherit auth requirement from their parent.

**Free tools** (like Trade Analyzer) live at `/[product]/[tool]` and are accessible without auth.
**Paid tools** gate behind auth check and subscription check, but explain clearly what the user gets before asking them to upgrade.

---

## Page Shell Structure

Every authenticated page in a Slops OS app uses the following shell:

```
┌────────────────────────────────────────────────────┐
│ Header                                              │
│ [Logo] [Product Name]          [Nav] [User] [Menu] │
├─────────────┬──────────────────────────────────────┤
│             │                                       │
│  Sidebar    │  Main Content Area                    │
│  (desktop)  │                                       │
│             │  [Page title]                         │
│  [Nav       │  [State area: loading / content /     │
│  links]     │   error / empty / disconnected]       │
│             │                                       │
│             │  [CTA / action row]                   │
│             │                                       │
├─────────────┴──────────────────────────────────────┤
│ Footer (minimal — legal, version, status)           │
└────────────────────────────────────────────────────┘
```

On mobile:
- Sidebar collapses to a bottom nav bar or hamburger menu
- Main content area takes full width
- No horizontal scroll

---

## Auth Gate Pattern

### Soft gate (preferred for free tools)
- Tool is accessible
- A persistent but non-blocking banner invites sign-in
- Banner explains what more the user gets after signing in
- Sign-in button in top-right nav is always visible

### Hard gate (for paid / personalized tools)
- Tool page is accessible but shows a "Connect to unlock" state
- The locked state explains exactly what the user gets after unlocking
- Clear CTA to sign in or connect
- Never a generic "You must be logged in" message

---

## Component Primitives (required in every product)

These components must exist in every Slops OS product. Product-specific design tokens are applied on top.

| Component | Purpose |
|-----------|---------|
| `AppLayout` | Full-page shell with header, sidebar/nav, content area, footer |
| `Header` | Top bar with logo, product name, user menu, and navigation |
| `Nav` | Sidebar or bottom nav with tool links and active state |
| `ToolCard` | Card linking to a tool from the dashboard |
| `FeaturePanel` | Full content panel for a tool or feature page |
| `StatusBadge` | Platform connection status indicator |
| `LoadingState` | Centered spinner + context message |
| `ErrorState` | Error message + retry or recovery CTA |
| `EmptyState` | Friendly empty message + next-action CTA |
| `DisconnectedState` | Platform not connected message + connect CTA |
| `RecommendationCard` | Displays a move recommendation with who, why, confidence, risk |
| `ConfidenceMeter` | Visual + label display of recommendation confidence (0–100) |
| `RiskBadge` | Low / Medium / High risk indicator |
| `EvidenceList` | List of data signals used in a recommendation |
| `DataSourceLabel` | Inline label: live / stub / mock / unavailable |
| `CTAButton` | Primary action button with loading state |
| `MockBanner` | Banner shown when any data is mock or stub |

---

## State Coverage Requirements

Every screen that fetches data must handle all five states:

| State | Trigger | Required UI |
|-------|---------|-------------|
| Loading | Request in-flight | Spinner + context message (e.g., "Loading your roster…") |
| Success | Data returned, recommendation present | Full content view |
| Empty | Data returned, no recommendation | EmptyState with plain-English explanation and next-action |
| Error | Request failed | ErrorState with retryable CTA |
| Disconnected | Platform not linked | DisconnectedState with connect CTA |

---

## Theme System

All Slops OS products support three theme modes:
- `dark` — dark surfaces, light text (primary default for products with a premium feel)
- `light` — light surfaces, dark text
- `system` — respects the user's OS preference (default on first visit)

Theme is stored in localStorage as `slops-theme`.
Theme toggle appears in the user menu or settings.

CSS custom properties define the token system. Tailwind `dark:` variants are used in components.

### Semantic token names (product-specific values go in product design system)

```css
--color-bg           /* Page background */
--color-surface-1    /* Card / panel background */
--color-surface-2    /* Inset / nested surface */
--color-border       /* Dividers and borders */
--color-text-primary /* Primary body text */
--color-text-secondary /* Labels, meta text */
--color-accent       /* Primary CTA, highlight */
--color-accent-muted /* Soft version of accent */
--color-risk-low
--color-risk-medium
--color-risk-high
--color-data-live    /* Live data indicator */
--color-data-stub    /* Stub data indicator */
--color-data-mock    /* Mock data indicator */
--color-data-unavailable /* Unavailable signal */
```

---

## Typography System

Every Slops OS product uses a two-font system:
- **Serif** for brand identity, display headlines, and product-moment copy
- **Sans-serif** for all UI text: labels, body, nav, buttons

Font choices are product-specific. See each product's design system doc.

### Scale (shared across products)

| Token | Size | Use |
|-------|------|-----|
| `text-xs` | 12px | Meta labels, captions |
| `text-sm` | 14px | Secondary UI text |
| `text-base` | 16px | Body copy, default |
| `text-lg` | 18px | Emphasized body |
| `text-xl` | 20px | Sub-headings |
| `text-2xl` | 24px | Card headlines |
| `text-3xl` | 30px | Page titles |
| `text-4xl` | 36px | Section heroes |
| `text-5xl` | 48px | Product hero moments |

---

## Spacing Grid

Base unit: 4px (0.25rem).
All spacing uses multiples of the base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

---

## Border Radius System

| Token | Value | Use |
|-------|-------|-----|
| `rounded-sm` | 4px | Inline tags, small badges |
| `rounded-md` | 8px | Buttons, inputs |
| `rounded-lg` | 12px | Cards, panels |
| `rounded-xl` | 16px | Feature panels, modals |
| `rounded-full` | 9999px | Pills, avatar rings |

---

## Mobile Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Default | 0px+ | Mobile-first base styles |
| `sm` | 640px | Large phone / small tablet |
| `md` | 768px | Tablet — sidebar becomes visible |
| `lg` | 1024px | Desktop — full layout |
| `xl` | 1280px | Wide desktop |

---

## Data Transparency Rules

These rules apply to every Slops OS product:

1. **Never present mock or stub data as live advice.** If any signal is `stub` or `mock`, the UI must show a `MockBanner` or a `DataSourceLabel`.
2. **Label every data signal.** Each signal in a recommendation view should show: live / stub / mock / unavailable.
3. **Confidence must include a label, not just a score.** `74 / 100` is shown as `74 — Medium-High Confidence`.
4. **Risk must include reasons.** Never show a risk level without at least one plain-English reason.
5. **Empty is not an error.** When the system has no recommendation, say so in plain English and explain why. Do not show an error state.

---

## Handoff Protocol

When a Slops OS product needs a new backend contract:
- Frontend writes the request to `[product]/Blueprints/handoffs/frontend-to-backend.md`
- Backend writes the completed contract to `[product]/Blueprints/handoffs/backend-to-frontend.md`
- Every contract must include: feature name, method, path, request shape, response shape, state handling, mock vs live behavior, known limitations

---

## Future Template Notes

- Team / league theming (personalized color schemes per team) is planned for a future pass
- Content and social publishing workflows are out of scope for v1
- Multi-product navigation (Omen → future product) is a future Slops Saloon shell concern
