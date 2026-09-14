# Upstream vetting — `slops-animation-render` / Remotion

**Vetted 2026-09-14 · Verdict: ADOPT — we are eligible today, and the eligibility is
headcount-conditional. That condition must be recorded or it will be missed.**

## The upstream

| | |
|---|---|
| Licence | **NOT open source.** Custom dual licence (`NOASSERTION` on the GitHub API) |
| Stars / forks / issues | 59,222 / 4,518 / 163 |
| Created / last push | 2020-06-23 / **2026-09-14** |
| Repo | `remotion-dev/remotion` |

Remotion is mature and very actively maintained. The concern is not quality.

## The finding: this is a paid licence above a headcount threshold

From `LICENSE.md`, read 2026-09-14:

> You are eligible to use Remotion for free if you are: an individual · **a for-profit organization
> with up to 3 employees** · a non-profit · evaluating…
>
> You are required to obtain a Company License to use Remotion if you are not within the group of
> entities eligible for a Free License.

**We are eligible today.** facts-of-record #15: *"Justin Duverge Catalino is the sole owner of record
for every Omen role that requires a named person… He is the only person working on this company."*
One person, well under the three-employee cap, and the use is creating videos — an allowed use case.

**But the trigger is the same trigger #15 already carries.** #15's revisit condition is *"the moment
anyone else works on this company — employee, contractor, co-founder, agency — this fact is void."*
Remotion's licence has a structurally identical condition at four employees. So the moment #15 is
re-derived, **the Remotion licence has to be re-derived with it**, and that connection exists nowhere
in the repo right now.

`upstream: calesthio/OpenMontage (concepts), remotion (runtime)` records no licence at all. A
commercial obligation that activates on hiring, recorded nowhere, is precisely the kind of thing that
surfaces later as a surprise invoice or a compliance problem.

Also flagged in the licence text itself: *"In Remotion 5.0, the license will slightly change."*
Pinning matters more than usual here — a version bump can move the terms.

### Is a paid-above-threshold licence a "paid dependency" under our rule?

The founder rule is no cloud/paid fallbacks. Remotion is **not** a cloud service and **not** a paid
fallback — it renders locally on our own host, and at our size it costs nothing. It is a free-tier
local tool with a commercial ceiling. That is a different category from a SaaS dependency and does
not trip the rule today.

What it does require is an **honest expiry**, which this memo is.

## Against our other constraints

**facts-of-record #17 — nothing about users leaves our infrastructure. PASS.** Remotion renders
React compositions to MP4 locally, on KVM1 per the skill. No user data is involved at all — the
inputs are brand copy and storyboards. No SDK ships into the product.

**Local-first. PASS.** Renders on our own host. Remotion Lambda (their cloud render product) is a
separate thing and is not in scope; the skill already says "no HyperFrames / cloud-only render farm"
and that boundary should now explicitly name Remotion Lambda too.

## Does it earn its place?

**Yes.** The project is real, it renders on our hardware, it costs nothing at our size, and the one
Remotion project in the tree (`Brand/promos/omen-coming-soon/`, pinned `remotion@4.0.487`) already
exists — this is not a speculative adoption, it is one that already happened and was never vetted.

## Install status and a gap in the skill

`node_modules` is absent from `Brand/promos/omen-coming-soon/`, so the checker reports
`NEEDS-INSTALL`. **But the skill specifies rendering on KVM1**, so a workstation install may be
unnecessary — and the skill never names a project root at all. The `from:` path in its `requires:`
block was inferred from being the only Remotion `package.json` in the tree.

**That inference should be confirmed or corrected by the founder before anyone installs**, and the
skill should state where renders actually happen. A render host that exists only in prose is not a
location.

## What we would change

**Upstream:** nothing. The licence is their business model, clearly written and easy to check.

**Local deltas:**

1. **Record the licence and the trigger in `SKILL.md`**, tied explicitly to facts-of-record #15, so
   re-deriving #15 forces a Remotion re-check. This is the important one.
2. Pin `remotion@4.0.487` (the version already in the project) in `upstream:`, and note the
   Remotion 5.0 licence change as a re-read trigger on any major bump.
3. Name the render host and the project root explicitly.
4. Extend the "no cloud render farm" boundary to name **Remotion Lambda** specifically.
