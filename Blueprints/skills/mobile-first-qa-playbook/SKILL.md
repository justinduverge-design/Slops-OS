---
name: mobile-first-qa-playbook
description: Phone-first QA sweep — iOS Safari + Android Chrome viewport matrix, touch targets, safe-area insets, keyboard avoidance, scroll lock, share sheet, motion-reduce. Severity-ranked findings. Closes Corvus launch gap #8 (mobile blocker).
status: active
skill_type: simple
layer: 0
default_agent: Claude (audit), Codex (fixes via the loop)
trigger: "mobile QA | iOS Safari sweep | mobile audit | responsive check | pre-launch mobile pass"
version: 0.1.0
owner: Justin
---

# Mobile-First QA Playbook (PROPOSAL)

## When to Use
Before launch, after any layout-touching change, and as a recurring pre-deploy gate for any consumer Slops product. Fantasy sports is phone-first; this audit is non-optional for Slops Saloon products.

## Scope (one paragraph)
Walk a fixed device matrix (iPhone SE / Pro / Pro Max + a mid-tier Android) through every route in the app and check against a phone-specific failure list. The audit produces severity-ranked findings (P0 = launch blocker, P1 = ship with caveat, P2 = polish) that drop into the build loop the same way `slops-ui-ux-audit` findings do.

## Device Matrix (default)
- iPhone SE 3rd gen (iOS Safari, smallest current viewport)
- iPhone 15 Pro (iOS Safari, current mid)
- iPhone 15 Pro Max (iOS Safari, current large)
- Pixel 7 (Android Chrome, mid-tier baseline)

## Checklist Axes
- 44×44px touch targets on every interactive element.
- Safe-area insets respected on notched devices.
- iOS Safari keyboard avoidance (input doesn't get covered).
- Scroll lock on modals (no bleed-through scrolling).
- Share sheet works (or is honestly disabled).
- `prefers-reduced-motion` honored.
- Pinch-zoom not disabled.
- No horizontal scroll at 320px viewport.
- iOS Safari quirks: viewport units, `100vh` keyboard bug, double-tap-to-zoom.
- Add-to-Home-Screen icon + manifest present (if PWA-claiming).
- Mock/live badge legible on small screens (ties into the `demo-mode-pre-empty-state` doctrine).

## Required Inputs
- App URL + sitemap (or explicit route list).
- Brand-system mock/live badge spec.

## Outputs
- `Solutions/reports/<date>-mobile-qa-<product>.md` with P0/P1/P2 findings, each linking to the failing route and the smallest-fix recommendation.

## Does NOT
- Rewrite copy (that's `slops-ux-copy`).
- Do the comprehensive AAA accessibility audit (that's `slops-ui-ux-audit`).
- Execute fixes — audit only.

## Replaces / Complements
- **Complements** `slops-ui-ux-audit` (which is desktop-leaning today) and `slops-verify` (functional QA).
- Net-new for the mobile axis.

## Verification
- Success signal: every route in the sitemap has a check-mark or a finding; no route is silently skipped.
- Escalation: any P0 routes through `slops-investigate` if the cause is unclear.

## Changelog
- 0.1.0 — initial proposal scaffold (2026-06-11).
