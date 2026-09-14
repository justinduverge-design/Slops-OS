# Upstream vetting — `slops-mobile-smoke` / playwright-core

**Vetted 2026-09-14 · Verdict: KEEP AND INSTALL.** An earlier draft of this vetting recommended
considering retirement. **That was wrong and is withdrawn** — see below.

## The upstream

| | |
|---|---|
| Licence | **Apache-2.0** |
| Package | `playwright-core` (Microsoft) |
| Pinned | `1.49.1` (exists on npm; current latest is `1.63.0`) |
| Runtime dependencies | **none** — zero transitive deps |

`playwright-core` is the driver without the bundled browser downloads, which is the right choice
here: browser binaries are fetched on first use rather than on install.

## The correction

The `X5-VetWrappers` entry and my own proposal said this skill's first question was *"should it
exist at all?"*, reasoning that it is web-only and the web app is paused.

**The premise was wrong.** `AGENTS.md`: Omen ships *"(iPhone SwiftUI + Android Kotlin/Compose) with
a secondary web app; native is active authority."* And the founder, 2026-09-14: *"we're building a
native app, a web app, the native mobile app is iOS and Android."*

`frontend/` exists and is maintained. What is paused is **new web page migrations**, not the web app.
A live surface with no new pages still regresses — dependency bumps, shared token changes, and
router changes all reach it, which is exactly the class this skill catches.

**How the error happened, because it is worth not repeating:** "native is active authority" was read
as "web is dead." Authority ranks surfaces; it does not delete them. The same sentence that
de-prioritises the web app confirms it ships.

## Against our constraints

**facts-of-record #17. PASS.** Playwright drives a local browser against a local dev server or our
own deployed URL. No SDK ships into the product — it is a devDependency-class tool. No user data.

**No paid fallbacks. PASS.** Apache-2.0, free, local. No BrowserStack/Sauce Labs cloud grid.

**One real egress to note:** the first run downloads browser binaries from Microsoft's CDN. That is
an install-time fetch like any package download, carries no data of ours, and the skill already
gates it behind an explicit founder-run command rather than auto-downloading.

## Does it earn its place?

**Yes.** It automates the machine-checkable axes of `mobile-first-qa-playbook` — every-route
overflow at 375/390/430, every-input font-size, every-target 44px — which is precisely the work
humans are bad at and browsers are good at. Zero transitive dependencies is unusually clean for a
tool of this reach.

The scope guard added 2026-09-02 is correct and must stay: this **cannot** test the native apps, and
routing it at one returns confident, irrelevant findings. `slops-native-sim-drive` is the native path.

## The real finding was not about adoption

**This skill asserted a dependency it did not have.** Its Preconditions read *"already in
`slops-saloon/omen/node_modules` (vendored). Pinned at the version in `omen/package.json`. No install
required."* All three clauses were false — it is in neither `node_modules` nor `package.json`.

Corrected 2026-09-14 in both the frontmatter and the Preconditions. This was the first thing the new
dependency checker caught, on the day it was written, and `_template` now carries the rule: **never
assert a dependency is satisfied; name where it comes from and let the probe answer.**

## What we would change

**Upstream:** nothing.

**Local deltas:**

1. Install it — this is now cleared:
   `npm --prefix slops-saloon/omen install --save-dev playwright-core@1.49.1`
   **Use `--save-dev`, not `--no-save`.** An unsaved install reproduces the exact bug just fixed:
   present on one machine, absent everywhere else, and silently claimed as vendored. Putting it in
   `package.json` is what makes the claim true.
2. Decide whether `1.49.1` is still the right pin — it is 14 minor versions behind. The pin should be
   a decision, not an accident of when the skill was written.
3. The WebKit binary is a separate first-run download and stays a founder-run step.
