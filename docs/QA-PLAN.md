# Street Samurai Catalog — QA Plan

How to verify the `sr2e-street-samurai-catalog` (SSC) content module before
tagging a release. The module ships **data only** (compendium packs of Items and
Actors that use the `sr2e` system's data models), so QA is mostly: *does it load
clean, and does every document open and behave like a normal system document?*

Run with the **SR2E system** active and Foundry **V13**. **SSC's `packs/` is
gitignored** — run `npm run build-packs` before testing (and **close Foundry
first**, LevelDB locks).

---

## 0. Pre-flight (automated, no Foundry)
- [ ] **Build clean:** `npm run build-packs` exits 0 and reports the expected
      document count per pack (see §1 table).
- [ ] **Packs valid:** `npm run validate` is green — valid JSON, required keys
      (`_id`/`_key`/`name`/`type`/`system`), correct `_key` form
      (`!items!…` / `!actors!…`), no duplicate `_id`s, per-pack counts.
- [ ] **NEEDS-CAPTURE current:** every placeholder still in the packs is listed
      in `docs/NEEDS-CAPTURE.md`, and nothing listed there was silently resolved
      without fixing the data.
- [ ] **`module.json`** lists all six packs and requires `sr2e` under
      `relationships.systems`.

## 1. Load & smoke test (in Foundry)
- [ ] Enable the module in an SR2E world: loads with **no console errors** and no
      schema-validation warnings.
- [ ] All six compendiums appear, open, and match counts:

  | Pack | Expected | Type |
  |---|---|---|
  | SSC Weapons (`ssc-weapons`) | 46 | Item (weapon) |
  | SSC Ammunition (`ssc-ammo`) | 1 | Item (ammo) |
  | SSC Armor (`ssc-armor`) | 15 | Item (armor) |
  | SSC Cyberware (`ssc-cyberware`) | 32 | Item (cyberware) |
  | SSC Gear (`ssc-gear`) | 12 | Item (gear) |
  | SSC Vehicles (`ssc-vehicles`) | 2 | Actor (vehicle) |

  *(update counts to match each `tools/gen-*.mjs` `wrote N …` line.)*

- [ ] Every document **opens its sheet** without error.

## 2. Per-pack functional checks
### ssc-weapons
- [ ] Drag a firearm onto a character → correct skill, damage code, firing modes,
      ranges (short/medium/long/extreme), ammo capacity, concealability.
- [ ] The split entries are both present and correct (e.g. **AK-97** SMG/Carbine
      vs Assault Rifle; **Uzi** clip size right — these were prior fixes).
- [ ] A melee weapon shows reach + Strength-based damage.
### ssc-ammo
- [ ] The ammo item drops and a weapon can load it; ammo type carries into damage.
### ssc-armor
- [ ] Drop armor → ballistic/impact ratings apply to the character's armor;
      **Riot Shield** (ballistic-only) and **Security Armor** ("+ Body" weight)
      render the way the book lists them.
### ssc-cyberware
- [ ] Install a piece → Essence decreases; rated items hold the representative
      cost with the per-rating formula in notes.
### ssc-gear
- [ ] Gear drops with weight/cost/availability; weapon-accessory gear (laser
      sight, etc.) links to a weapon and applies its modifier.
### ssc-vehicles
- [ ] **Suzuki Aurora** racing bike and **Honda Viking** heavy motorcycle exist,
      open, and drag to the canvas with correct stats (these were restored after
      an earlier wrongful drop — confirm they're present).

## 3. Cross-checks vs the source
- [ ] For ~5 documents per pack, compare against the cited book page (renders in
      the git-ignored `_work/`); numbers match.
- [ ] No book flavour prose pasted verbatim — descriptions are original/summarised.

## 4. Regression / packaging
- [ ] `npm run extract-packs` round-trips (build → extract → `git diff` of
      `packs-src/` empty except intended edits).
- [ ] Release workflow builds packs and zips without `_work/` or `node_modules`.
- [ ] **Because `packs/` is gitignored**, confirm the release zip actually
      contains the built LevelDB (the workflow builds before packaging).
- [ ] Install the released zip in a clean world and re-run §1.

---

## Sign-off before tagging
- [ ] §0 and §1 green; §2 spot-checks pass for every pack.
- [ ] Open `NEEDS-CAPTURE` items fixed or knowingly accepted (and noted in the
      release notes).
