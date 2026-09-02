# Screen contract format

One file per screen. The build agent should need nothing else.

---

# Screen contract — <Screen name>

**Artboard:** `design/<canvas>/<Screen>.dc.html`
**Artboard state:** <date last modified, or content hash>
**Target:** iOS SwiftUI | Android Compose | web
**Design authority:** `component-lock-v1.md`, `team-theme-contract-v1.md`
**Version:** v1
**Element count:** <N> — must equal the count enumerated from the artboard

## Screen frame

| Property | Value |
|---|---|
| Navigation entry | <how the user arrives> |
| Navigation exit | <where each exit goes> |
| Safe area | <top/bottom handling> |
| Scroll | <scrolls / fixed / which region> |
| Keyboard | <avoidance behaviour, or N/A> |
| Empty state | <what shows with no data> |
| Loading state | <what shows while loading> |

## Elements

Enumerated top to bottom, left to right. **Every element. No exceptions.**

### E1 — <name>

| Property | Value |
|---|---|
| Component | `<locked component>` — or **UNMAPPED**, which is a finding |
| Container | <parent, and index among siblings> |
| Placement | <alignment, spacing tokens, not bare px> |
| Copy | "<verbatim>" |
| Icon | `<symbol name>`, `<size>`, `<source set>` — or none |
| Tokens | colour `<token>`, type `<scale>`, radius `<token>` |
| States | default / pressed / disabled / loading / empty / error |
| Behaviour | <tap target and destination> |

<Repeat per element.>

## Unmapped components

Elements with no match in the component lock. Each is a founder decision — a missing
component, or an off-system design that should be brought on-system.

| Element | What the artboard shows | Nearest locked component | Recommendation |
|---|---|---|---|

## Unspecified states

States the artboard does not show. **Open questions, never inventions.**

| Element | Missing state | Question for the founder |
|---|---|---|

## Deliberately not contracted

<Animation timing, haptics, anything the artboard cannot express. Named so its absence
is a decision rather than an oversight.>
