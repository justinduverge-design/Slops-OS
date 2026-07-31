# SLOPS OS — Hygiene Pass + First-Kickoff Readiness

**Date:** 2026-07-18 · **Author:** Claude (Cowork, coordination tier)
**Purpose:** get the OS clean, graphify-tracked, and ready for the first parallel-lane kickoff.

---

## 1. Corrected: graphify was never broken

`CLAUDE.md` told every agent, at every session start:

> *"Status: not currently buildable. `References/graphify/graphify-out/graph.json` and repo-root `graphify-out/graph.json` do not exist anywhere in this repo (confirmed absent via repo-wide search, 2026-07-11). `References/graphify/` itself does not exist."*

**All three claims are false.** On disk right now:

| Path | `.graphify_root` | `graph.json` | Built |
|---|---|---|---|
| **`graphify-out/`** *(repo root)* | `C:\Users\JDuve\dev\SLOPS` | **6.9 MB** | 2026-06-26 |
| `References/graphify/graphify-out/` | — | 6.9 MB + `.bak`s | 2026-06-26 |
| `Blueprints/graphify-out/` | `…\SLOPS\Blueprints` | 3.3 MB | 2026-06-25 |

`References/graphify/` also exists, with four dated refresh reports.

**Root cause of the bad claim:** `graphify-out/` is in `.gitignore` (line 14). A repo-wide search over *git-tracked* files returns nothing — which is exactly what a `git grep` / `git ls-files` sweep on 2026-07-11 would have shown. The artifacts were there the whole time, just untracked.

**Fixed** in `CLAUDE.md`. Root `graphify-out/` is now named canonical, with the duplication and the staleness caveat documented.

**Still true:** the graph is **stale**. Built 2026-06-26, so it predates Stripe removal, team-theme removal, the Phase A primitive set, the Phase B migration, and everything in the app-store push. It's a June-accurate map. **Rebuild before the first kickoff** — `pip install graphifyy`, then the `slops-graphify` skill, run from the repo root so it stays whole-OS.

---

## 2. Junk register

### Delete (untracked, gitignored, safe)

| Path | What it is |
|---|---|
| `README-DESKTOP-TMFG46E.md` | Windows machine-name conflict copy (sync collision artifact) |
| `context-DESKTOP-TMFG46E.md` | Same |

Both match `.gitignore` line 18 (`*-DESKTOP-*.md`), so they're already excluded from the repo — they're just clutter in the working directory, and they sit next to the real `README.md` / `context.md` where an agent could read the wrong one. **I couldn't delete these from the sandbox (permission denied on the mount); they need deleting from your side.**

### Consolidate (~20 MB of duplicated graph artifacts)

- Keep **`graphify-out/`** at repo root.
- `References/graphify/graphify-out/graph.json` duplicates it byte-for-byte, plus carries `graph.json.bak` and `graph.json.bak-2026-06-21`. Drop the duplicate + backups; keep the four `REFRESH_REPORT_*.md` files, which are real history.
- `Blueprints/graphify-out/` is a Blueprints-only subset. Redundant once the whole-OS graph is rebuilt — drop it and let root cover it.

All gitignored, so removal is invisible to the repo.

### Leave alone

- `_scratch/` — empty, harmless, and it's the designated scratch location.
- `Archive/` — explicitly reference-only per `known_issues.md`. Not junk, just cold.
- `.rebuild.lock` (Jun 12) — stale but harmless; the rebuild will overwrite it.

### Index files: already lean — no action

7 root-level orientation files total **22 KB**:

```
DBS_INDEX.md              3.8 KB
Blueprints/RESOURCES_INDEX.md  5.8 KB
manifesto.md              5.4 KB
context.md                2.6 KB
CLAUDE.md                 2.3 KB
AGENTS.md                 1.2 KB
README.md                 1.0 KB
```

This is genuinely tight. The `agent-modules/` split (13 files, one concern each) is doing its job — `CLAUDE.md` stays a 30-line router instead of a monolith. **No leaning needed. Don't consolidate these; the modularity is the feature.**

The bloat in this OS is not in the indexes. It's in `Direction/current_sprint.md` (72 KB) and `decision_log.md` (165 KB) — both append-only histories, both legitimately large. Leave them; the fix there is the Lane D reconciliation job, not compaction.

---

## 3. Pre-kickoff checklist

**Blocking — do these before the first lane kickoff:**

- [ ] **Rebuild graphify from repo root** so the graph covers July's work
- [ ] **Delete the two `*-DESKTOP-*` conflict copies**
- [ ] **Run Lane D item D1** — write `Blueprints/specs/ios-espn-relay-app-plan-v1.md`. Lane N is currently queued to build against a spec that doesn't exist
- [ ] **Confirm the missing `Direction/reviews/2026-07-05-app-store-mobile-readiness-sprint-proposal.md`** — recover it or de-cite it from Phase 4.20

**Non-blocking, but do them early:**

- [ ] Consolidate the duplicate graphify trees
- [ ] Lane D items D2 (sprint restructure), D3 (`known_issues.md` refresh)
- [ ] Update `facts-of-record.md` item 3 for the lane mechanic (D5)

---

## 4. First-kickoff sequence

Lanes are seeded at `Direction/lanes/{N,B,F,D}.md`. Doctrine: `Blueprints/agent-modules/parallel-lane-doctrine.md`. Kickoff: `Blueprints/prompts/kickoff-lane-agent.md`.

**Run D alone first.** It writes the Phase 5 spec that Lane N needs and reconciles the sprint. Everything else is cheaper once doctrine is true.

```
Session 1 (solo):     LANE: D    → D1 spec, D2 sprint, D3 known-issues
```

**Then open three lanes in parallel.** N, B, and F have disjoint file territory, so they cannot collide:

```
Session 2 (parallel): LANE: N    → N1 Expo scaffold
                      LANE: B    → B1 push notification service
                      LANE: F    → F1 close out Phase B, then F3 DecisionBrief
```

Note the ordering that matters across lanes: **B1 gates N3** (push client needs the token endpoint), and **F3 gates both F4 and N4** (both render the decision model). Those are recorded as `Blocked-by:` in the lane files, so each agent will skip past a blocked item rather than stall or reach into another lane.

---

## 5. On the LLC — Connecticut vs. elsewhere

You asked whether to file somewhere more favorable than CT even though you live there. **For a single-member LLC operating from Connecticut, filing in Delaware / Wyoming / Nevada usually costs more and gains nothing.**

The mechanism: those states' advantages accrue to the *state of formation*, but you'd still be **doing business in CT**, which generally requires registering there as a **foreign LLC** anyway. Net result is two filings, two annual fees, two registered agents — and your income is still taxed where you live and work. The Delaware advantage is real for venture-backed C-corps optimizing for institutional investors and Chancery Court precedent. It is not built for a solo operator with one product.

**Recommendation: form in CT.** Simpler, cheaper, and it keeps the D-U-N-S → Apple chain clean, since the entity name, D-U-N-S registration, and App Store seller name should all match.

Two things to get right, because Apple is strict here:

1. **It must be a real legal entity.** Apple explicitly rejects DBAs, fictitious business names, trade names, and branches. An LLC clears that bar; "Justin doing business as Slops Saloon" does not.
2. **Lock the exact name before requesting the D-U-N-S.** File as e.g. `Slops Saloon LLC`, then request the D-U-N-S on that exact registered name. A mismatch means re-requesting and re-waiting.

**Critical path, serial:** form the LLC → D-U-N-S (free, allow up to 5 business days) → Apple org enrollment → credentials → first signed build. Lane N can scaffold and run on simulator in parallel, but nothing reaches TestFlight until that chain clears. **This is the longest pole in the Aug 15 plan and the only one no agent can touch.**

*Not legal or tax advice — entity type and state selection have consequences worth an hour with a CT attorney or accountant. The filing itself is typically self-serve.*
