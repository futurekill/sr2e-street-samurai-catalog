# Changelog

## 0.1.1 (in development)

- Dropped the empty `ssc-vehicles` pack (the catalog has no vehicle section).
- Cyberware audit against the full pg-104 CYBERTECH table (all 32 rows covered):
  fixed the **Select Sound Filter** cost (10,000¥ → 1,000¥; it's Level × 1,000¥),
  renamed the middle **Skill Hardwire** tier to its book range (5–8, not 5–6),
  and corrected the **Crypto Circuit HD** availability to 6/36 hrs.

## 0.1.0 (in development)

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
