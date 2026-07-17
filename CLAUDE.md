# Street Samurai Catalog Module — Development Notes

A FoundryVTT **V13** content module adding *Street Samurai Catalog* (FASA 7104a)
gear to the **Shadowrun 2nd Edition system** (`sr2e`). Separate package from the
system: own repo, own packs, no shared code. Depends on the system via
`module.json` → `relationships.systems` (sr2e ≥ 0.9.2), so its items use the
system's item data models (`weapon`, `armor`, `cyberware`, `gear`, `ammo`,
`vehicle`/`vehicle_mod`).

The sibling system repo is `../sr2e-foundryvtt`. Read its `CLAUDE.md` for the
SR2E item data-model contract (fields per item type) this content is built
against — match those field names exactly.

## Source material
The catalog PDF is a **scanned image** (109 pages, no text layer). Extraction
lives in `_work/` (git-ignored, never shipped):
- `_work/pages/pg-NN.png` — page renders (`pdftoppm -r 200`)
- `_work/pages/pg-NN.txt` + `_work/ssc-ocr.txt` — OCR (`tesseract`)

OCR mangles stat tables; **read the page render to verify every number** before
transcribing — the same rules-accuracy discipline the system repo uses.

## Authoring conventions
- Content is **stat blocks** (game facts) transcribed into per-item JSON, with
  **original/summarised** descriptions — do not paste long verbatim flavour text.
- Build batched **by category** (weapons → ammo → armor → cyberware → gear →
  vehicles); commit each batch. A generator per category keeps it repeatable.
- Match the system item fields exactly (e.g. weapon `damageCode`, `concealability`,
  `firingModes`, `recoilComp`, `smartgunCompatible`; armor `ballistic`/`impact`;
  cyberware `essenceCost`/`rating`; gear `rating`/`weaponAccessory` etc.).

## Build workflow
`packs-src/` (per-document JSON) is the source of truth and the only tracked
copy; `packs/` is the LevelDB build, **gitignored** (Foundry compacts it every
session). `node tools/gen-<category>.mjs` emits JSON, then `npm run build-packs
[name]`. `tools/build-packs.mjs` / `extract-packs.mjs` are copied from the
system. `.gitignore` re-includes `assets/icons/` (the global macOS `Icon?`
ignore matches the `icons` dir). Releases fire on a `vX.Y.Z` tag push
(`.github/workflows/release.yml` rebuilds packs from packs-src, then publishes
the zip + module.json) — they are **not** created per commit.

## Copyright
*Street Samurai Catalog* / *Shadowrun* are © FASA and rights holders. Personal
table use only, from a PDF the owner has; not for distribution. Keep `_work/`
out of git.
