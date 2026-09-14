# Upstream vetting — `compliance-by-template` / open-agreements

**Vetted 2026-09-14 · Verdict: ADOPT WITH A HARD SCOPE LINE — it drafts, it never advises, and the
Apache NOTICE obligation has to be honoured.**

This wrapper was **not on the original list of eight.** The dependency checker found it.

## The upstream

| | |
|---|---|
| Licence | **Apache-2.0** — with a `NOTICE` file |
| Stars / forks / issues | 55 / 9 / 32 |
| Created / last push | 2026-02-09 / **2026-09-14** |
| Repo | `open-agreements/open-agreements` |

*"Open, primary-source-backed U.S. legal content — practice guides, 50-state surveys, reviewer
checklists, and standard agreement templates."* Content, not code. Ships `.claude-plugin/` and
`AGENTS.md`, so it is built to be consumed by agents.

**It is young and small** — seven months old, 55 stars. That is a different risk profile from
markitdown or manim: not abandonment risk so much as *unreviewed-ness*. Legal templates are exactly
the category where "widely used" carries real signal, and this does not have it yet.

## Against our constraints

**facts-of-record #17. PASS.** Templates are markdown/text read locally. No SDK, no telemetry, no
user data involved.

**No paid fallbacks. PASS.** Apache-2.0, and the skill exists specifically to replace Termly (a paid
SaaS) under the sovereignty rule.

**Apache-2.0 carries an obligation MIT does not.** §4 requires retaining attribution and propagating
the `NOTICE` file in derivative distributions. Our documents would be derivative works of the
templates. The wrapper says nothing about attribution. **This needs to be handled before any
generated document goes public** — and this skill's entire output is documents that go public.

**`pandoc` is the second dependency** and is unmet (`brew install pandoc`). GPL-2.0-or-later, but
used as a standalone converter binary, not linked — no licence propagation to our output.

## Does it earn its place?

**Yes, narrowly, and the narrowness is the point.**

The alternative is Termly, which is a paid SaaS that would hold our legal copy — squarely against
the sovereignty rule. A local template library is the right shape.

**But the gap between "a template" and "our Terms of Service" is legal judgement**, and no skill
closes it. `slops-legal-spot-check` already exists for pre-counsel triage and says so. The routing
table's own guidance is right: *"Draft package + Justin/counsel review state."*

The real risk here is not the upstream. It is that a well-formatted DOCX **looks finished**, and a
legal document that looks finished invites being shipped. That risk is worse with a young upstream
whose templates have not been through much adversarial use.

## What we would change

**Upstream:** nothing yet — too early to have standing to ask for anything. Worth revisiting after
actually using a template.

**Local deltas (before first use):**

1. **Record the Apache-2.0 NOTICE obligation in `SKILL.md`** and state how attribution is carried in
   generated documents. This is a legal obligation on a legal-document generator; leaving it
   unstated is the wrong file to be casual in.
2. **Never ship a generated document without counsel or an explicit founder acceptance of risk.**
   The skill says output is "reviewed by Justin and, for paid-tier products, by counsel." Omen is
   free indefinitely (fact #1), which under that wording removes the counsel gate — **for
   publicly-binding documents that is the wrong default.** Free does not mean low-stakes: a Privacy
   Policy binds regardless of price.
3. Record the upstream's age and size honestly, so a future reader weights the templates accordingly.
4. Pin a commit. `open-agreements@latest` on a seven-month-old repo means the text under us can
   change between drafts of the same document.
