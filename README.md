# Shadowrun 2E: Street Samurai Catalog

A Foundry VTT V13 module bringing *Street Samurai Catalog* (FASA 7104a) to the [Shadowrun 2nd Edition system](https://github.com/futurekill/sr2e-foundryvtt) (`sr2e`). The catalog's weapons, ammunition, armor, cyberware, gear and vehicles.

## Contents

| Pack | Contents |
|---|---|
| SSC Weapons | 47 items |
| SSC Ammunition | 1 items |
| SSC Armor | 15 items |
| SSC Cyberware | 32 items |
| SSC Gear | 12 items |
| SSC Vehicles | 2 actors |

## Notes

- Every value was checked against the source pages. The catalog's Alpha and Beta cyberware grades (p.98) are part of the system.

## Requirements

- Foundry VTT V13
- The `sr2e` system, version 0.9.2 or later

## Installation

In Foundry, **Add-on Modules → Install Module**, and paste this manifest URL:

```
https://github.com/futurekill/sr2e-street-samurai-catalog/releases/latest/download/module.json
```

Then enable it in your world (**Game Settings → Manage Modules**).

## Development

`packs-src/` (one JSON file per document) is the source of truth. `packs/` is built from it, gitignored, and rebuilt by the release workflow.

```bash
npm install
npm run build-packs     # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
npm run extract-packs   # pull edits made in Foundry back to packs-src/
npm run validate        # pre-flight checks on the pack sources
npm run lint
```

To release: add a `## X.Y.Z — date` section to `CHANGELOG.md` (the release notes come from it), bump `module.json`, then tag and push `vX.Y.Z`.

## Copyright

*Street Samurai Catalog* and *Shadowrun* are © FASA and their rights holders. This is a fan-made, non-commercial module for personal table use by owners of the book.
