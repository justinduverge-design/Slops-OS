# Upstream vetting — `slops-taste` / Leonxlnx/taste-skill

**Vetted:** 2026-09-14 · **Verdict: ADOPT, SPLIT.** Installed. The upstream serves web/marketing;
the native half is written by us in `../SKILL.md` §B, because the upstream cannot serve it.

Installed 2026-09-14 at `L0/.claude/skills/{design-taste-frontend,high-end-visual-design,minimalist-ui,imagegen-frontend-web}`;
upstream pinned to `ccbc15639c97`.

---

## 1. What the upstream actually is

Read at `github.com/Leonxlnx/taste-skill`, 2026-09-14. Facts from the GitHub API and raw file reads,
not from the README's self-description.

| | |
|---|---|
| Licence | **MIT**, `LICENSE` present at root |
| Created / last push | 2026-02-19 / **2026-08-24** (3 weeks before vetting) |
| Stars / forks / open issues | 87,113 / 5,935 / 66 |
| Archived or disabled | No |
| Size | ~34 MB (the bulk is `assets/` — README imagery) |

**What it contains.** 13 skill folders under `skills/`, each a single `SKILL.md`. Plus `skill.sh`,
`scripts/`, `assets/`, `examples/`, `research/`, `.claude-plugin/`.

**Executable surface — checked, because the README's "portable markdown" claim needed testing:**

- `skill.sh` (897 B) is a bash associative array mapping skill name → path, and echoing the path.
  No network, no execution, no write.
- `scripts/` is four `.mjs` files that build the project's own README: sponsor badges, a sponsor row,
  and webp conversion of README images. **Maintainer tooling, not part of the skill payload.**
- The skills themselves are prose instruction files. No code is executed on our side.

So the "markdown-only" claim survives inspection, with the correction that the repo does ship
executable files — they are just not the thing you install.

**The installer is a separate dependency and needed its own check.** `npx skills add` runs the npm
package `skills` — **`vercel-labs/skills`, MIT, maintainers `rauchg` + `quuu`**, last published
2026-09-11, with exactly two runtime dependencies (`tar`, `yaml`). It fetches a tarball and extracts
markdown. That is a small, legible, currently-maintained surface, but note it is a **second** upstream
we would be taking on, and the wrapper's `upstream:` field names only the first.

## 2. Against our constraints

**facts-of-record #17 — nothing about users leaves our infrastructure, no third-party SDK.**
**PASS, and it is not close.** The installed artifact is prose. It introduces no SDK, no client, no
telemetry, no runtime, and no network call. Nothing about a user can leave through a file that only
instructs an agent that was already running. The one egress is the install itself — a one-time
founder-executed fetch from GitHub and npm, the same class as `npm install`, carrying no user data.

**No cloud/paid fallbacks. PASS.** Nothing in the skills reaches a paid service. The two image-gen
variants (`imagegen-frontend-web`, `brandkit`) direct the agent to produce images with whatever
image tool the session already has; they add no vendor of their own. Worth stating in the wrapper
so nobody later reads "imagegen" as authorization to wire one up.

**Local-first. PASS.** Post-install it is files on disk.

**Licence. PASS.** MIT permits use and modification with attribution retained.

## 3. Does it earn its place?

**Yes — for web. For native it cannot, and that gap is now filled by us rather than by it.**

**(a) It is a genuinely strong artifact.** 1,206 lines in the v2 skill, specific and opinionated:
banned defaults, viewport-stability rules, a real component-library decision table, motion guidance
tied to a library choice. This is not a listicle. It is the most substantive thing in our wrapper
catalogue that we did not write.

**(b) Its own declared scope excludes our native surface.** Line 8 of the upstream skill:

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.

Omen's native app is multi-step, data-dense product UI. The excluded category *is* the product.

**(c) The stack does not overlap.** Measured across the v2 skill: React 32 mentions, Motion 52,
Tailwind 12, CSS 42. SwiftUI and Compose: **zero guidance**. The single SwiftUI string is a
documentation link to Apple's `Material` page, cited for a glass effect.

This corroborates, from the upstream side, what the 2026-09-14 ledger row found from ours: the skill
was routed at a native canvas and was the wrong tool. That row diagnosed it as *generate vs judge*.
That was right and incomplete — **it is also web vs native.** Even used purely to generate, it has
nothing to say about a SwiftUI screen.

### The founder requirement, and what it forces

Founder, 2026-09-14: *"We're building a native app, a web app, the native mobile app is iOS and
Android. We need to make sure we have the skills like taste to work on both."*

That is a requirement about the **skill**, not about the upstream — and it cannot be met by
installing anything, because the material does not exist upstream to install. So `SKILL.md` now
carries two routes: §A delegates web to the upstream variants, §B is an Omen-native half written
here, routing to the specs that already lock our native visual language (design house, component
lock, team-theme contract, registry Amendment 01, brand system §8/§11).

**§B invents no design doctrine.** Every rule in it is derived from a locked spec or from a defect a
real canvas pass caught — the 1.02:1 crimson fill, the brass-means-action rule, the D11 device floor
at 375×667, colour never being the sole carrier. What was missing was not the doctrine; it was a
generation-time discipline that reaches for it. That is what §B is.

**Cost of adopting:** one-time install, no runtime, no maintenance beyond re-reading upstream at a
pin bump. **Cost of not adopting:** an `active` skill nobody can invoke, and no native anti-slop
route at all.

## 4. What we would change to make it better

Distinguishing what goes upstream from what stays ours:

### Upstream PR candidate — one, and it is small

**Declare the negative scope in the frontmatter `description`, not only in the prose body.**
The scope line ("Not dashboards, not data tables, not multi-step product UI") sits at line 8 of the
body. Agent routing reads the `description`, which promises "landing pages, portfolios, and
redesigns" without ever saying what is excluded. That asymmetry is what lets a routing table point it
at a native screen — which is precisely what happened to us on 2026-09-14. Moving nine words into the
description fixes the same failure for every consumer, not just ours.

This is worth sending. It is a one-line change, it is evidenced by a real misroute, and it makes the
skill harder to misuse without changing what it does. **We should not send it until we have installed
and actually used it** — a scope complaint from someone who has not run the thing is noise.

### Local deltas — ours, documented, not upstream's problem

1. **Fix the Default Dials, and fix them twice over.** Our wrapper says:

   ```text
   VARIANCE: medium | MOTION: low | DENSITY: medium
   # placeholder until slops-saloon/Brand/brand-system.md is authored
   ```

   Both lines are wrong. `Brand/brand-system.md` was authored and is authoritative — the comment has
   been stale since. **And the dial names and type are wrong against upstream v2**, which uses
   `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY` on a **1–10 integer** scale, and whose
   line 78 says explicitly: *"never invent aliases like `LAYOUT_VARIANCE`."* Ours are invented
   aliases carrying word values against an integer scale. Setting `VARIANCE: medium` would bind
   nothing at all. This is worse than the placeholder, because a placeholder announces itself.

   Proposed, derived from `brand-system.md` §8 ("Animation: subtle and functional. 150–250ms…
   never game-like spectacle") and the marketing-site brief rather than from taste:

   ```text
   DESIGN_VARIANCE: 5      # composed, not chaotic — brand personality is restraint
   MOTION_INTENSITY: 3     # §8: motion reveals state change, never spectacle
   VISUAL_DENSITY: 5       # marketing surfaces breathe; the product surfaces do not use this skill
   ```

   These are a **proposal, not a measurement.** Unlike the contrast ratios in the 2026-09-13 pass,
   there is nothing here to measure — they are a taste call, and the founder's to make.

2. **Carry the route split in the `description`, where routing reads.** DONE in 0.2.0. The old
   description said "Anti-slop frontend skill" with no platform qualifier, which is how it reached a
   native task. It now names both routes and says why they differ. This is the same pattern three
   other skills use for their web-only guard (`slops-ui-ux-audit`, `mobile-first-qa-playbook`,
   `slops-mobile-smoke`), and `SKILL_ROUTING.md` § "Reaching the library" already states the
   doctrine: *the description is the guard.* Note the difference from those three — they are
   web-only and say "do not use here." This one is web **and** native and says "use a different
   half." A guard that only ever subtracts would have left native uncovered.

3. **Pin the version.** `upstream: Leonxlnx/taste-skill@latest` violates `Blueprints/skills/_template/SKILL.md`'s own
   rule — *"Pin the version. Record `upstream: <package>@<version>`."* `@latest` means the artifact
   can change under us between runs with no signal. Upstream tags no releases, so the pin has to be a
   commit: record the commit at install time and the date it was read.

4. **Name the second upstream.** `npx skills` is `vercel-labs/skills`. A wrapper that takes on two
   upstreams should say so in one place.

## 5. Status: `active`, not parked — and why that reversed

An earlier draft of this memo recommended `parked: K1 / Phase 4`, reasoning that taste's only valid
surface was the marketing landing page, and `current_sprint.md` § K holds all marketing until F6-F9
pass (*"Nothing public ships until F6-F9 pass"*; K1 is due before beta).

**That reasoning was sound and its premise was wrong.** It assumed web/marketing was the only
surface, which was true of the *upstream* and not of the *skill*. With §B carrying native, the skill
has a live surface today — the native build lane is the most active lane in the repo.

`status: active`. The web route is gated behind K1 by the K lane, not by this skill's status; the
native route is available now.

## 5a. One thing I did not verify

I read the upstream's **scope and dependency surface**, not the quality of its design advice. The
claim "1,206 specific, opinionated lines" is a description of the artifact, not a judgement that
following it produces good UI. Nobody here has run it. That judgement can only come after K1 uses it
on a real page, and it belongs in `notes/prior-use-review.md` then — not now.

## 6. Sequencing note

The two changes that matter most are **not** the install. They are the re-scope (which stops the next
misroute) and the dials (which stop a silent no-op). The install is a prerequisite for using it;
those two are prerequisites for using it *correctly*, and they cost nothing to land first.
