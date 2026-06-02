# Slops Saloon Manifesto

## Mission

Slops Saloon is the SLOPS division for sports, music, and arts products.

Its job is to hold the product-family context without crowding the active Corvus app repo.

## Current Belief

Corvus is the active product.

Future products can exist here later, but they should not leak into Corvus until Justin explicitly starts them.

## Operating Principles

- Division context stays broad.
- Product execution stays inside product repos.
- Shared naming and brand standards belong here when they apply across more than one product.
- Corvus-specific decisions belong in `corvus/Direction/`.
- Active engineering handoffs belong in `corvus/Blueprints/handoffs/`.
- Archive preserves history but does not direct current work.

## Safety Doctrine

Layer 1 can organize division docs and future product context.

It must not mutate Corvus source, secrets, package files, deployment config, SQL, `.git`, `node_modules`, or production infrastructure unless Justin explicitly approves that exact work.
