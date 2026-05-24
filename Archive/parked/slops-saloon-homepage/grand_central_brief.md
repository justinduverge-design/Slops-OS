# Grand Central — slopssaloon.com Homepage Design Brief

**Document type:** Design brief for the public-facing Slops Saloon homepage
**Date:** 2026-05-17
**Status:** Active — pre-build reference

---

## What This Is

Grand Central is the public homepage for slopssaloon.com — the Slops Saloon parent brand hub.

It is NOT the Corvus fantasy football product page. It is the front door to a multi-product cultural studio whose first flagship app is Corvus.

The Slops Saloon podcast ran 47 episodes from 2022–2024 in the Society & Culture category. It covered sports, movies, art, and culture with personality and opinions. The Discord community exists. Corvus is the first app product in the ecosystem.

Grand Central should feel like walking into the saloon and seeing everything on offer — a living, curated place with warmth, character, and stakes.

---

## Brand Voice

- Warm, opinionated, and culturally literate. Not academic, not bro-y.
- Saloon as metaphor: a gathering place for people who take their opinions seriously and buy rounds for the table.
- Playful but not childish. Illustrated but not cartoon-cheap. Western-pub energy without the kitsch.
- The Corvus card is the one place where the saloon energy steps aside for something darker and more serious. That contrast is intentional and valuable.

---

## Visual Language

### Palette

| Role | Hex | Usage |
|---|---|---|
| Deep wood brown | `#2C1A0E` | Primary backgrounds, structural elements |
| Brass / gold | `#C9A44C` | Accents, borders, dividers, highlights |
| Cream / aged paper | `#F5ECD7` | Text backgrounds, widget fills, readable surfaces |
| Warm mid-brown | `#6B3F1E` | Secondary text, decorative woodwork |
| Off-white | `#FAF5EB` | Body text on dark, headline contrast |
| Copper rust | `#A0522D` | Hover states, secondary accents |

Corvus card exception: `#050505` background, `#C9A44C` gold accent, white body text. One dark island in a warm sea.

### Typography

- **Headings:** Playfair Display (Google Fonts) — serif, editorial, slightly literary. Evokes a 19th-century broadside or menu board.
- **Body:** Lato or Source Sans 3 (Google Fonts) — readable, neutral, unpretentious.
- **Accent / label text:** uppercase tracked Playfair Display for section titles (e.g., "WHAT'S GOOD THIS WEEK")
- **Corvus card:** Cormorant Garamond headlines (to echo the canonical Corvus brand), Lato body.

### Texture and Atmosphere

- CSS wood-grain simulation on primary surfaces (repeating linear gradients, subtle pattern)
- Aged-paper texture on widget "bulletin board" cards (slight yellowed background, maybe a drop shadow suggesting pin or tape)
- Brass border/divider accents on section transitions
- No heavy drop shadows on the main page — use borders and color contrast instead
- Wanted-poster motif optional for the hero: aged border treatment, big serif text

### Layout

- Max width: 1100px centered
- Single column on mobile, 2-column grid for widgets on desktop
- Hero: full-width, full-bleed background, centered text
- Widget cards: bulletin-board metaphor — cards that look like pinned notes or framed posters
- Corvus card: intentionally dark, full-width or prominent half-width, breaking the warm grid
- Footer: dark wood tone, gold text, minimal

### Motion / Interaction

- Subtle hover lift on cards (transform: translateY(-2px))
- Brass/gold underline sweep on nav links
- No heavy JS animations — the page should load fast and feel print-quality
- Widget facts could rotate via a simple JS interval (every 8 seconds for "This Day In...")

---

## Page Architecture

### 1. Hero / Marquee
- Full-bleed warm brown background
- Large Playfair Display logotype: "SLOPS SALOON"
- Tagline: "A bar worth talking about."
- Sub-line: "Movies. Sports. Art. Culture. And the occasional bad take."
- CTA / invitation: "Come on in."
- Illustration: SVG saloon interior silhouette or CSS-drawn swinging doors

### 2. Corvus App Card
- Dark premium card, visually distinct from everything around it
- Gold "CORVUS" wordmark
- Tagline: "See the winning move."
- Brief one-line description: "Fantasy football intelligence. Built for people who take the W seriously."
- CTA button: "Open Corvus" → links to #corvus / corvus product page
- Subtle crow icon or feather motif in SVG

### 3. "What's Good This Week" Movie Widget
- Bulletin-board card aesthetic (cream background, aged paper feel)
- Header: "WHAT'S GOOD THIS WEEK"
- Two columns: "In Theaters" and "Streaming"
- 3–4 movies each with title, one-line opinion/description
- Hardcoded for mockup; notes that this will pull from TMDB or similar in production

### 4. "This Day In..." Widget
- Same bulletin-board aesthetic
- Header: "THIS DAY IN HISTORY — [DATE]"
- Rotating facts: sports, art, science, culture
- 4–5 facts in the mockup, JS rotation every 8 seconds
- Small category badge on each fact (e.g., "SPORTS" "FILM" "SCIENCE")

### 5. Podcast Section
- Uses actual Apple Podcasts artwork URL
- Section header: "THE SLOPS SALOON PODCAST"
- Podcast art prominently displayed
- Description: "47 episodes of sports, movies, art, and culture. Society & Culture. 2022–2024."
- Latest episode teaser (hardcoded for mockup)
- CTA: "Listen on Apple Podcasts" → links to Apple Podcasts ID id1636572715

### 6. Footer
- Dark wood background
- Slops Saloon logotype in gold
- Links: Discord, Apple Podcasts, (future: Twitter/X, Instagram)
- Tagline: "A bar worth talking about."
- Copyright: "© 2026 Slops Saloon"

---

## What This Is NOT

- Not the Corvus fantasy football app itself
- Not a podcast-only landing page
- Not a generic link-in-bio page
- Not trying to sell anything yet (Corvus handles the product conversion)
- Not overloaded — Grand Central is a hub, not a content feed

---

## Production Notes

- Mockup uses hardcoded dummy data for movie and history widgets
- Podcast section uses real artwork URL from Apple Podcasts CDN
- Corvus card links to `#corvus` anchor in the mockup; production link TBD
- The page must be functional in-browser with no build step required (single HTML file)
- All assets via CDN (Google Fonts only) — no local image dependencies

---

## What Success Looks Like

A first-time visitor lands on slopssaloon.com and immediately understands:
1. This is a cultural hub with personality — movies, sports, art, culture
2. There's a serious fantasy football app called Corvus
3. There's a podcast with 47 episodes they can go listen to
4. There's a Discord community
5. They want to come back

The page should feel like walking into a well-designed bar — warm, curated, and confident.
