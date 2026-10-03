# Changelog

## 0.3.0 — 2026-07-28

### Fixed
Armour and cyberware audited against the core book's Sourcebook Updates (p.280–281):
- **Secure Ultra-Vest:** Ballistic 3 → 4, Impact 2 → 3.
- **All 15 armour items** had no Street Index.
- **Six cyberware items printed as per-Level formulas** shipped as flat numbers and
  now scale with their Level: Select Sound Filter (Level × 10,000¥), Crypto
  Circuit HD and Scramble Breaker HD (banded prices), and the three Skill
  Hardwires (Essence and price both scale; a Rating 9 hardwire is 2.7 Essence /
  4,500,000¥, not 0.3 / 500,000¥). Scramble Breaker HD has no Levels 8–9 because
  the book prints none.

## 0.2.2 — 2026-07-28

### Fixed
Weapons audited against the core book's Sourcebook Updates (p.278), the canonical
SR2 version of this 1st-edition book:
- Centurion Laser Axe: Street Index 2 → .5.
- Seco LD-120: ammo 12 → 22 (c).
- Survival Knife: damage (Str+1)L → (Str+2)L.
- Ranger-X Arrows: Street Index 1 and Concealability 4 were missing.

### Added
- **Ceska vz/120** (light pistol, 500¥, SI .8, 18 (c), SA, 6L), printed but
  never shipped.

## 0.2.1 — 2026-07-27

### Fixed
- **Eight accessories had no Street Index**, so they sold at list price on the
  street. Set from the core book's Sourcebook Updates (p.280): Bow Accessory
  Mount .9, Ultrasound Sight .8, Improved Gyro Mount 1, Deluxe Improved Gyro
  Mount 1, Ultrasound Goggles 1, Flash Grenade 1, Flash-Pak 1, Grenade Link 2.

## 0.2.0 — 2026-07-26

### Added
- Custom art for all 108 documents, replacing Foundry's stock icons: weapons,
  cyberware, armour, gear and ammo as product shots, and top-down tokens for the
  two vehicles.

### Fixed
- Releases no longer package `.DS_Store` files.

## 0.1.3 — 2026-07-16
### Fixed
- **Requires sr2e 0.9.2, not 0.9.0.** Nine gear items (Improved Gas Vent III and
  the other mounts) are functional weapon accessories using `weaponAccessory` /
  `linkedWeaponId`, which the system only added in 0.9.2 — on 0.9.0/0.9.1 they
  would install and silently do nothing when attached.

## 0.1.2

- **Riot shield corrections** (from a physical-book capture): the riot shield has
  no Impact stat (Ballistic only) — the small shield's Impact is now 0, and the
  **Large** riot shield (Ballistic 2, Weight 3, 3,200¥) was added (it was missing).
- Confirmed the Security Armor "+ Body" weight notation is verbatim from the book.
  `docs/NEEDS-CAPTURE.md` is now empty — every flagged value is resolved.

## 0.1.1

- **Vehicles added** (`ssc-vehicles`, 2): the **Suzuki Aurora** racing bike and
  the **Honda Viking** heavy motorcycle, from the catalog's vehicle section
  (pg-042/043). NOTE: an earlier 0.1.1 change had dropped this pack on the wrong
  assumption that the catalog had no vehicles — it has a two-bike section in the
  body that the back-of-book summary tables omit. Pack restored and populated.
- **Enriched item descriptions** across the module — original one-line flavor for
  weapons (46), cyberware (32), and armor (14); stat values unchanged.
- Cyberware audit against the full pg-104 CYBERTECH table (all 32 rows covered):
  fixed the **Select Sound Filter** cost (10,000¥ → 1,000¥; it's Level × 1,000¥),
  renamed the middle **Skill Hardwire** tier to its book range (5–8, not 5–6),
  and corrected the **Crypto Circuit HD** availability to 6/36 hrs.

## 0.1.0

Compendium content for the *Street Samurai Catalog* (FASA 7104a), transcribed
from the catalog's consolidated stat tables (verified against the page renders).
Built batched by category against the `sr2e` system's item types.

### Module
- Scaffolded `sr2e-street-samurai-catalog`: `module.json` requiring the `sr2e`
  system (≥ 0.9.0), packs for weapons / ammo / armor / cyberware / gear, and
  pack-build tooling reused from the system.

### Cyberware (`ssc-cyberware`, 32)
- Headware: vision magnification (optical & electronic), rangefinder, hearing
  amplification, select sound filter, Commlink II/IV/VIII/X, Crypto Circuit HD,
  Scramble Breaker HD.
- Internals: internal voice mask, sense link & video link (+ their transmitters).
- Bodyware: the six cyberguns, skill hardwires, boosted reflexes.

### Weapons (`ssc-weapons`, 18)
- Rifles: Ruger 100, Steyr AUG-CSL (SMG/carbine/AR/LMG), Walther MA-2100
  sniper, Mossberg CMDT & SM-CMDT shotguns, Colt M22A2, H&K G12A3, Sakal vz 88V.
- Light machine guns: Ares MP-LMG, GE Vindicator Minigun.
- Laser: Ares MP Laser. Heavy: FN MAG-5 MMG, Stoner-Ares M107, Panther
  Assault Cannon. Plus the SAM (guided missile). Stats from the pg-103 summary
  table; the Panther/Vindicator costs and the AUG-CSL weights/configs were
  confirmed or corrected against body-entry captures (the Vindicator's cost is
  12,500¥ — the summary scan had dropped the leading digit).

### Gear (`ssc-gear`, 12)
- Weapon accessories: bow accessory mount, weapon-mount rangefinder, grenade
  link, improved gas-vents II–IV, improved & deluxe gyro mounts, ultrasound
  sight. Recoil-comp values are wired to the system's accessory mechanics; mount
  / concealability-modifier / street index are recorded in notes.
- Vision: ultrasound goggles. Explosives: flash grenade, flash-pak.
- (APDS ammo is already shipped in the system's core pack, sourced from the
  same catalog, so it isn't duplicated here.)

### Pistols, SMGs & special weapons (`ssc-weapons` → 46)
- Pistols: Tiffani Self-Defender (hold-out); Ares Light Fire 70, Beretta 200ST,
  Ceska vz120, Seco LD-120 (light); Ares Crusader MP, Ceska Black Scorpion
  (machine); Ares Predator II, Browning Ultra-Power, Colt Manhunter (heavy).
- SMGs: Beretta Model 70, H&K MP-5TX, Ingram Smartgun, Sandler TMP, SCK Model 100.
- Special: Narcoject Pistol & Rifle, Net Gun (Medium/Large). From the pg-102
  pistols/special/SMG summary tables.

### Melee & projectile weapons (`ssc-weapons` → 27; `ssc-ammo`, 1)
- Melee: Ares Monosword, Centurion Laser Axe, Combat Axe, Survival Knife,
  AZ-150 Stun Baton, Forearm Snap Blades, Improved Hand Blades, Shock Glove
  (worn/forearm pieces default to Unarmed Combat; stun weapons do Stun).
- Projectile: Ranger-X Bow (+ Ranger-X Arrows in `ssc-ammo`). From the pg-102
  melee/projectile summary tables.

### Armor (`ssc-armor`, 14)
- Clothing/armor: forearm guards, small riot shield, secure clothing/jacket/
  vest/ultra-vest/long coat.
- Form-fitting body armor L1–3 (layers under other armor).
- Security armor: light/medium/heavy + helmet. From the pg-104 summary table.
- Open captures: riot shield Impact (illegible); security-armor "+ Body" weight
  notation — see `docs/NEEDS-CAPTURE.md`.

### In progress
- The weapon summary tables (pg-100–104) are fully transcribed. Remaining: any
  non-summary gear sections in the catalog body, and the vehicles question
  (the catalog has no vehicle stat section).
