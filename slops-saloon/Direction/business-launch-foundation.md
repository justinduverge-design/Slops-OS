# Slops Saloon — Business Launch Foundation (Omen go-live)

Last updated: 2026-06-06
Layer: 1 — Slops Saloon (the entity that commercializes Omen)
Owner: Justin (decides + executes) | Claude (drafts + reviews)
Status: planning — decisions pending

> **Not legal or tax advice.** This is the information and the checklist you need to make decisions and to brief a professional. Where it says "confirm with a CPA/attorney," that is a real recommendation, not a formality. A single consult on entity + sales tax + platform terms is cheap insurance before you take money.

## The one finding that should shape strategy

Research into the three platforms' terms changes the launch question from "which is easiest" to **"which can I legally charge on."**

- **Sleeper** — open, read-only, no login required, generally permissive for third-party apps. This is the platform you can build a paid product on with the least legal risk.
- **Yahoo** — the Yahoo Developer API Terms **prohibit deriving income from the API for direct commercial gain without Yahoo's prior express written permission**, and require the attribution "Fantasy data provided by Yahoo Fantasy." That is a hard constraint for a paid product. You either secure written permission from Yahoo or you do not monetize Yahoo-connected features.
- **ESPN** — there is no official fantasy API. The cookie method (`espn_s2` + `SWID`) is an unofficial interpretation that is fine for personal use but "may violate ESPN's terms" for commercial/public use, and ESPN has broken its endpoints without notice (base-URL move in April 2024). Not safe to build paid reliability on.

**Implication:** launch and charge on **Sleeper first**. Treat Yahoo and ESPN as "connect and view" conveniences at most until their commercial status is cleared — and keep paid features gated to Sleeper until then. This aligns perfectly with the Sleeper-first draft assistant decision already made.

---

## 1. Legal entity + EIN + business bank account

**Why it blocks launch:** Stripe live mode requires a verified legal identity, a tax ID, and a bank account for payouts. You cannot be paid without this.

**What you need:**
- **An entity.** A single-member LLC is the common choice for a solo founder — it separates personal and business liability and gives the business its own bank account and tax ID. Forming in your home state is usually simplest and cheapest; "form in Delaware/Wyoming" advice is often irrelevant for a small SaaS and can add cost/complexity. Confirm the right choice for your situation with an attorney or a formation service.
- **An EIN** (free, directly from the IRS — do not pay a third party for the EIN itself).
- **A business bank account** in the entity's name, opened with the formation documents + EIN.
- **A registered agent** (often bundled with formation).

**Open decisions (need your input / a professional):**
- Your state of residence/formation — this drives entity cost, annual fees, and sales-tax obligations. Tell me your state and I can tailor the rest.
- Whether to use a formation service vs. file directly.

**Definition of done:** entity formed, EIN issued, business bank account open, documents stored securely (not in the repo).

---

## 2. Stripe live mode + Stripe Tax

**Have:** Stripe code is built and tested (webhook handles checkout + subscription lifecycle), but on **test rails**.

**Need:** Live activation + sales-tax handling before real charges.

**Live activation requirements (Stripe, 2026):** full KYC — legal name, address, **tax ID/EIN**, business verification, and a **bank account** for payouts. Submit a few days before launch; verification can take up to a week and Stripe may request more documents. (This is why Section 1 must finish first.)

**Sales tax (Stripe Tax):**
- US sales tax on SaaS/digital subscriptions is **state-by-state** — some states tax digital goods/SaaS, some don't, and you only owe where you have "nexus" (starts with your home state, expands with sales volume per state thresholds).
- Stripe Tax can calculate and collect, but **registrations** (actually registering to remit in a state) require Stripe's **Tax Complete** subscription, and live vs. test registrations are separate — you must add real registrations in live mode.
- Note the 2026 change: from **April 29, 2026**, Stripe processes transactions per your tax settings (previously subscriptions defaulted to tax-excluded).
- **Confirm your nexus and registration obligations with a CPA.** Don't guess this — over- or under-collecting both cause problems.

**Definition of done:** Stripe live activated and paid out a test live transaction to your bank; tax behavior decided (collect now vs. start in home state only) on CPA guidance; webhook re-verified in live mode (this is already on your engineering gate list).

---

## 3. Terms of Service + Privacy Policy (matched to your real flows)

**Have:** Working GDPR/privacy *routes* (`/api/user`, delete flow) — the mechanics exist.

**Need:** Published, public-facing **Terms of Service** and **Privacy Policy** whose promises match what the code actually does, plus the UX to expose them (your sprint notes flag the delete-flow UX copy as still pending).

**What the documents must cover:**
- **Privacy Policy:** what data you collect (account info, connected-league data, platform credentials/cookies), how it's stored (Supabase, Vault), who it's shared with (no resale), how users delete their data (matching your real delete route), and contact for requests. If you have any EU users, GDPR applies; California users trigger CCPA/CPRA.
- **Terms of Service:** subscription terms, billing/refunds, acceptable use, disclaimers (fantasy advice is informational, no guaranteed outcomes), limitation of liability, and the required **platform attributions** (e.g. "Fantasy data provided by Yahoo Fantasy" if Yahoo is ever shown; data attributions for nflverse and any odds provider).
- **Crucial:** do not promise more than the code delivers. If the policy says "delete removes all data," the route must actually do that.

**How to produce them:** a reputable policy generator or a template reviewed by an attorney is the practical path for a solo founder; given you handle third-party credentials and payments, a short attorney review is worth it. I can draft both to match your actual routes and data flows for that review.

**Definition of done:** ToS + Privacy Policy published and linked in-app and at signup; in-app account deletion exposed; promises verified against code.

---

## 4. Platform & data terms — your real legal soft spot

Summarized from Section 0, as a compliance checklist:

- **Sleeper:** safest to monetize; still read and keep a copy of their current developer/ToS terms, attribute appropriately, and respect rate limits.
- **Yahoo:** **do not charge for Yahoo-API-powered features** without Yahoo's prior written permission; include the required attribution if you display Yahoo data at all. Decide: pursue written permission, or keep Yahoo out of paid tiers.
- **ESPN:** keep the cookie method out of the paid critical path; treat as best-effort/personal-style convenience, clearly labeled, until/unless an official route exists. Never log or store raw cookies beyond what's needed (your code already avoids logging them — keep it that way).
- **Data sources:** nflverse is MIT (commercial-safe — attribute). The Odds API free tier — confirm its commercial-use terms and attribute. OpenWeatherMap — check plan terms for commercial display.

**Definition of done:** a one-page "what we're allowed to do per platform/source" record in `Direction/decisions/`, with the monetization line drawn (Sleeper paid; Yahoo/ESPN gated) and attributions listed.

---

## 5. Pricing / tier decision

**Open in your sprint:** the optimizer-vs-Omen tier architecture. Here's a framework to decide against, not a final answer.

**A simple, defensible two-tier model (Sleeper-first):**
- **Free:** connect one Sleeper league, basic start/sit (Omen lite), a limited number of trade analyses per week (math verdict only). Enough to prove value.
- **Pro (paid):** unlimited trade analyses **with the narrated verdict (WS2)**, full Omen of the Week, the **auto-syncing draft assistant** (huge, seasonal), and Omen's own projections (WS3). This bundles your three real differentiators behind the paywall.

**Pricing shape to decide:**
- **Monthly vs. season pass.** Fantasy is seasonal (~Aug–Jan). A monthly sub risks cancellations in February; a **season pass** (one price for the season) or an annual plan can fit user behavior better. Consider offering both.
- **Price point:** anchor against what fantasy tools charge and what a draft-day + in-season assistant is worth for a season; the draft assistant is the strongest single reason someone pays in August.
- **The iOS wrinkle (from the mobile roadmap):** if you sell the subscription *inside* the iOS app, Apple requires In-App Purchase and takes 15–30%. Selling on the web and treating the app as a companion avoids that but constrains in-app upsell. This pricing decision and the WS5-E decision are the same decision — make them together.

**Definition of done:** tiers, feature-to-tier mapping, billing period(s), and price set; web-vs-IAP path chosen; reflected in Stripe products and the app's paywall.

---

## Recommended sequence (depends on Sections 1–2 first)

1. **Entity + EIN + bank** (unblocks everything; start now — it has lead time).
2. **Stripe live + tax decision** (needs #1; CPA consult here).
3. **Platform/data terms record + pricing decision** (no lead time; decide on paper now).
4. **ToS + Privacy Policy drafted and reviewed** (can run in parallel; I can draft against your routes).
5. **Expose deletion UX + attributions in-app**, then flip to live.

All of this can complete during the off-season, so the business is ready the moment the product is (Week 1, early September).

## Decision queue for Justin

- [ ] Your **state** of residence/formation (so I can tailor entity + sales-tax specifics).
- [ ] **Yahoo:** pursue written commercial permission, or keep Yahoo out of paid tiers?
- [ ] **Pricing:** monthly vs. season pass vs. both; target price.
- [ ] **iOS billing:** web-only subscription vs. Apple IAP (ties to mobile WS5-E).
- [ ] Want me to **draft the ToS + Privacy Policy** against your actual routes for attorney review?

## Sources (2026-06-06)

- Stripe go-live + verification: https://docs.stripe.com/get-started/account/set-up , https://support.stripe.com/questions/requirements-for-having-a-us-stripe-account
- Stripe Tax setup + registration: https://docs.stripe.com/tax/set-up , https://docs.stripe.com/tax/use-stripe-to-register
- Yahoo Developer API Terms: https://legal.yahoo.com/us/en/yahoo/terms/product-atos/apiforydn/index.html , https://developer.yahoo.com/fantasysports/guide/
- ESPN unofficial API risk: https://zuplo.com/learning-center/espn-hidden-api-guide
- Sleeper API: https://docs.sleeper.com/

---

## Decisions recorded — 2026-06-06

- **State of formation: Connecticut.** CT taxes SaaS. Consumer (B2C) subscriptions are taxed at the full **6.35%** (the 1% reduced rate is for B2B computer/data-processing services — Omen is consumer, so 6.35% applies). As a CT-based business you will likely need to register with **CT DRS** and collect 6.35% from CT customers **from launch**; other states only create an obligation once you cross economic nexus (**$100,000 AND 200 transactions** in that state). Confirm registration timing with a CPA. Stripe Tax can calculate/collect once you register.
- **Pricing model: monthly subscription + season pass (both).** Create both as Stripe products. Keep all paid features gated to **Sleeper** (see platform terms). A season pass fits fantasy's Aug–Jan rhythm; monthly captures users who join mid-season or want to try before committing.
- **Yahoo / ESPN monetization: confirmed posture.** Do not charge for Yahoo- or ESPN-powered features without proper rights — Yahoo has a written-permission path; ESPN has no clean path. Launch paid features Sleeper-only. Yahoo/ESPN stay free "connect and view" at most.
- **Still open:** iOS billing (web-only vs Apple IAP); whether to draft ToS + Privacy Policy now for attorney review.

## Decisions recorded — 2026-06-06 (cont.)

- **iOS billing: web-only.** Users subscribe on the website (Stripe); the iOS app is a companion that signs them in. This avoids Apple's In-App Purchase cut (15–30%) and keeps billing in one place. Resolves mobile roadmap WS5-E. Note for App Store submission: under the "reader app" model the iOS app generally must not present in-app purchase UI for the subscription; confirm the current Apple external-link/reader rules at submission time, as Apple's policy here has been changing.
- **ToS + Privacy Policy: drafting now** as attorney-review drafts grounded in the real Omen data model. Stored under `slops-saloon/omen/References/docs/legal/`.

## Decisions recorded — 2026-06-06 (final infra + strategy)

- **Hosting — self-managed Hostinger, two boxes:**
  - **KVM1 (new, 1 vCPU / 4GB)** = Omen production only (`omen_api` + `omen_cron`). The critical, must-stay-up box.
  - **KVM2 (existing, 2 vCPU / 8GB)** = the "AI office": narration model(s) for Omen plus local agents and experiments. Non-critical — Omen falls back to math-only if it's unavailable.
  - This **supersedes the earlier DigitalOcean App Platform recommendation.** Tradeoff accepted: lower cost + one provider, in exchange for self-managing the VPS (with Claude/Codex + Hostinger's AI assistant). **WS1 materials must be revised from the DigitalOcean path to the Hostinger KVM1 path (Docker Compose + Nginx + Certbot/SSL + DNS).**
- **Year 1 — Omen is free for everyone, all platforms**, including the draft assistant. Goal is adoption, feedback, and bug-shakeout, not revenue. Don't charge for something still rough.
- **Year 2 — monetize the draft assistant** (Sleeper-first; Yahoo if commercial permission is granted) as the paid anchor, once proven and polished.
- **Year 1 cost coverage** (~$15–30/mo): free service tiers + pursue startup cloud credits (e.g. DigitalOcean Hatch, once the CT LLC + business email exist) + optional non-gating "support Omen" tip jar; self-fund any small remainder as marketing/R&D budget.
- **Second business — local web/app services**, treated as a **future SLOPS Layer-1 division**, built from Omen experience and sequenced **after** Omen gains traction to protect focus. Not started now.
