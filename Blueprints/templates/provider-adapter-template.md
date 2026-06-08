# Provider Adapter Template (Slops OS pattern)

DBS layer: `0-OS` (`SLOPS/Blueprints/templates`). Reusable across products.
Use this when a product must ingest data from several interchangeable third-party providers
(fantasy platforms, banks, calendars, CRMs, model hosts, etc.) and feed them into one shared engine.

This template is reference material, not a callable skill. Copy its structure when designing a
multi-provider integration. First live application: Corvus Omen
(`slops-saloon/corvus/Blueprints/specs/live-engine-spec.md`).

## The core idea — one seam

Do not branch your engine per provider. Define **one normalized internal shape** and make each
provider implement a single adapter that produces it. Everything downstream (scoring, ranking,
narration, UI) consumes the normalized shape and never knows which provider it came from.

```text
[Provider A raw] --adapterA--\
[Provider B raw] --adapterB---> [ Normalized Shape ] --> [ shared engine ] --> [ output ]
[Provider C raw] --adapterC--/
```

When this holds, "support a new provider" = "write one adapter to the contract," not "touch the
engine." That is what makes the work templatable and the cost of provider N+1 nearly flat.

## 1. Define the normalized shape (the contract)

Write the internal shape down explicitly, with every field and its type, before writing any adapter.
The first provider's adapter defines the de-facto contract; document it so the rest conform.

- Name the shape and version it (e.g. `roster.v1`).
- List required vs optional fields.
- Define how "missing/unknown" is represented (null vs empty vs an explicit `unavailable` marker).

## 2. Adapter interface

Every provider implements the same function signature:

```text
adapter.fetchAndNormalize(connection, ...context) -> NormalizedShape
```

- Pure transform + fetch; no engine logic, no product decisions inside the adapter.
- Same return shape for every provider; same error/empty conventions.
- Caching, retries, and auth live in or beside the adapter, not in the engine.

## 3. Signal / data honesty rule

If a field can be real, stubbed, or missing, label it — never let a placeholder masquerade as real.
Carry a per-field status (`live` / `stub` / `unavailable`) into the output so the UI can be honest.
A product whose credibility is the point cannot show fabricated inputs as real.

## 4. Truthful degradation

- Connected-but-no-usable-context returns a clear recovery code, not a crash and not a faked result.
- Each provider keeps its own recovery/reauth states; the engine treats them uniformly.

## 5. Readiness bar (definition of done, per provider)

A provider is "live" when:

1. Its adapter produces the normalized shape from a real connection.
2. The shared engine runs **unchanged** on that output.
3. The product's full output envelope is populated (not a placeholder).
4. Signals are real or explicitly labeled.
5. It degrades truthfully.
6. Proven by a recorded-fixture test **plus** one real-account smoke. If a provider can't be hit live
   yet (seasonal/off-hours APIs), split into Stage A (fixture-verified now) and Stage B (live smoke later).

## 6. Sequencing guidance

- Do the provider with the cleanest API and/or the most strategic value first; it sets the contract.
- Providers that can't be verified live right now: build + fixture-test now, schedule the live smoke.
- Cross-cutting work that depends on data existing across providers (scoring, analytics) comes after
  at least two providers are live.

## Routing

- Adapters and the engine are product code → live in the product layer (`slops-saloon/<product>/`).
- The normalized contract + per-provider plan → a product spec in that product's `Blueprints/specs/`.
- This pattern doc stays at `0-OS` and is referenced by each product spec that uses it.
