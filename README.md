# Shadowrun 2E: Street Samurai Catalog

A FoundryVTT **content module** that adds the gear from the *Street Samurai
Catalog* (FASA 7104a) — weapons, ammo, armor, cyberware, gear, and vehicles — as
compendia for the [Shadowrun 2nd Edition system](../sr2e-foundryvtt) (`sr2e`).

It **requires** the `sr2e` system (declared in `module.json`) and is enabled
per-world. It is entirely separate from the system: its own repo, its own packs,
no shared code — it just builds content against the system's item types.

## Status
**Released — v0.1.2.** The catalog's gear is transcribed into the `ssc-*` packs:
**108 items across 6 packs** — weapons (46), cyberware (32), armor (15), gear
(12), vehicles (2), and ammo (1). Built batched by category, every value verified
against the source pages.

## Development
`packs-src/` (per-document JSON) is the source of truth; `packs/` is the LevelDB
build. `npm run build-packs [name]` builds; `npm run extract-packs` pulls Foundry
edits back to JSON. Mirrors the system repo's workflow.

## Copyright
*Street Samurai Catalog* and *Shadowrun* are © FASA / their rights holders. This
module is for personal use at the owner's own table from a PDF they own, not for
distribution. The `_work/` directory (OCR + page renders of the source PDF) is
local-only and git-ignored.
