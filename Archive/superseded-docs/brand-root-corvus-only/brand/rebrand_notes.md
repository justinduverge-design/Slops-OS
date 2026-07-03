# Brand Migration Notes

This file tracks the migration from the former Slops Saloon working name to Omen.

---

## Architecture Clarification — 2026-05-15

**Slops Saloon is not a former name. It is the parent company.**

- **Slops Saloon** = parent ecosystem, mission site, and long-term product studio. Lives at `slopssaloon.com`. Will eventually host multiple products.
- **Omen** = first product inside the Slops Saloon ecosystem. Fantasy football intelligence. Lives at `slopssaloon.com/omen`.

Future Slops Saloon products may include fantasy basketball, fantasy baseball, financial planning tools, and mobile apps. Omen is product #1.

## Status

Omen is the active name for the fantasy football product as of 2026-05-15.

Slops Saloon remains the parent company and domain owner. Do not treat it as a former name or retired brand.

Visible product copy (UI, landing page) can migrate to Omen after Claude reviews the current diff.

Infrastructure names, domains, repositories, packages, environment variables, database objects, and deploy config must not be renamed without a separate approved migration plan.

Justin prefers the visual direction in the local `client/` prototype on `localhost:3000` over the current canonical `frontend/` landing page and the live site. Use that prototype as a style reference for the public front door.

Do not copy prototype claims that are not production-true yet. The look can move faster than the feature claims.

The roadmap does not pause for brand migration.

---

## Naming Doctrine

The future name should feel modern on the surface and meaningful underneath.

The name should be:

- clean
- memorable
- serious
- symbolic
- sports-compatible
- scalable beyond fantasy football
- not obviously an AI product
- not gambling-first
- not generic fantasy software

---

## Preferred Naming Lanes

### Modern name with hidden meaning

Clean surface. Deeper origin. Easy to say.

- Strong enough to scale.

### Mythology / prophecy

Names that suggest foresight, judgment, preparation, or fate.

Avoid names that feel forced, edgy, or childish.

### Ancient history

Names that suggest discipline, battle, strategy, competition, or legacy.

Ancient influence should be felt, not shouted.

### Command / decision-making

Names that suggest a front office, war room, signal, or weekly command center.

### Sports intelligence

Names that suggest better decisions without sounding like a spreadsheet.

---

## Avoid

- forced biblical references
- names that sound like gambling products
- names that sound like crypto projects
- names that sound like generic AI tools
- names that feel childish
- names that feel like a meme
- names that limit the product to fantasy football forever
- names that sound like a chatbot

---

## Current Position

Omen is approved as the product name.

Do not rename production infrastructure yet.

Build the product.

Capture any future naming concerns here without reopening the product-name decision.

Decide later from strength, not restlessness.

---

## Working Questions

- What should the name make users feel?
- Should the name imply wisdom, victory, command, prophecy, or preparation?
- Should the name be obvious or layered?
- Can the name scale beyond fantasy football?
- Can the name support both a serious product and a strong community?
- Does the name still work if Omen eventually hosts leagues?
- Does the name still work if Omen expands beyond football?

---

## Omen Active Direction — 2026-05-15

### Positioning

A mythic fantasy football intelligence platform that watches the league, studies every signal, and delivers the winning move.

Simple explanation:

> Omen is your fantasy football raven: it sees the field, studies the signs, and brings back the move that wins the week.

### Tagline

> Deus pascit corvos.

(Latin: "God feeds the ravens." Mythological resonance, not a marketing slogan. Use in brand/wordmark context.)

### Former Tagline (retired)

~~"See the winning move."~~

### Brand Personality

- dark
- strategic
- observant
- ruthless
- clever
- ancient
- premium

### Product Ecosystem

| Product piece | Candidate name | Meaning |
|---|---|---|
| Main app | Omen | Full fantasy intelligence platform |
| Weekly best move | Omen | Play of the Week / MVP Move |
| Trade analyzer | The Scale | Weighs value like ancient judgment |
| Waiver tool | Talon | Strikes at the best free agent |
| Matchup analyzer | Rookery | The flock studies the field |
| User dashboard | Aerie | High nest / full view |
| AI assistant/internal memory advisor | Munin | Memory-focused advisor |
| Research/data agent | Hugin | Thought/scouting advisor |
| Alerts | Ravencry | Warnings, injuries, reminders |
| Premium tier | Omen Black | Paid-brand name |
| League report | The Prophecy | Weekly fantasy outlook |

### MVP Naming Recommendation

Use the clearest names first:

- Omen
- Omen
- Talon
- The Scale
- Ravencry

Hold `Munin` and `Hugin` for internal agents unless Claude approves user-facing use.

### Visual Identity

| Role | Color |
|---|---|
| Main background | Raven Black `#070707` |
| Secondary background | Charcoal `#161616` |
| Primary accent | Antique Gold `#C9A44C` |
| Secondary accent | Deep Crimson `#6E1E2B` |
| Text | Bone White `#F3EFE3` |
| Data / AI accent | Electric Violet `#7C5CFF` |

Typography direction:

- Logo / wordmark: sharp serif, ancient, carved, premium
- UI: clean sans-serif, modern, readable, sports-tech

### Execution Rule

Omen should move into UI copy and visual design after Claude reviews the scope.

The next visual target is the canonical `frontend/` landing page feeling closer to the stronger local `client/` / `localhost:3000` prototype.

Do not rename infrastructure, routes, packages, database fields, env vars, domains, repos, or deployment config until a migration plan is approved.
