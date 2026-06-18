// Generate Street Samurai Catalog weapons into packs-src/ssc-weapons.
// Stats transcribed from the catalog's consolidated weapons summary table
// (pg-103, verified against the page render; the Panther's cost confirmed from
// its body entry on pg-055). Descriptions are original one-liners. Re-run, then
// `npm run build-packs ssc-weapons`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ssc-weapons";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ssc-weapon:" + s).digest("hex").slice(0, 16);

// Parse "SA/BF/FA" → {ss,sa,bf,fa}.
const modes = (s) => {
  const p = s.split("/");
  return { ss: p.includes("SS"), sa: p.includes("SA"), bf: p.includes("BF"), fa: p.includes("FA") };
};
// Standard SR2 range brackets (upper metre bound per bracket) by category.
const RANGE = {
  sport:   { short: 50, medium: 150, long: 350, extreme: 550 },
  sniper:  { short: 50, medium: 350, long: 800, extreme: 1500 },
  shotgun: { short: 10, medium: 20,  long: 40,  extreme: 60 },
  assault: { short: 25, medium: 100, long: 250, extreme: 500 },
  mg:      { short: 50, medium: 150, long: 350, extreme: 550 },
  cannon:  { short: 50, medium: 150, long: 350, extreme: 550 },
  none:    { short: 0,  medium: 0,   long: 0,   extreme: 0 }
};

function weapon(w) {
  const _id = idFor(w.name);
  return {
    _id, name: w.name, type: "weapon", img: w.img ?? "icons/svg/sword.svg",
    system: {
      weaponType: w.heavy ? "heavy" : "firearm",
      skill: w.heavy ? "heavy_weapons" : "firearms",
      damageCode: w.dmg, damageType: "physical",
      concealability: w.conceal ?? 99, reach: 0,
      firingModes: modes(w.mode),
      ammo: { current: w.ammo ?? 0, max: w.ammo ?? 0, type: w.ammoType ?? "rifle" },
      recoilComp: w.rc ?? 0, smartgunCompatible: w.smart ?? false,
      ranges: RANGE[w.range ?? "assault"],
      strengthMin: 0, weight: w.wt ?? 0,
      cost: w.cost ?? 0, availability: w.avail ?? "", legality: w.legality ?? "Restricted",
      streetIndex: String(w.index ?? ""),
      equipped: false, accessories: [], notes: w.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const AUG = "Part of the modular Steyr AUG-CSL system; the full package with all listed accessories is 4,500¥. SSC.";
const WEAPONS = [
  // --- RIFLES (Sport) ---
  { name: "Ruger 100", conceal: 2, ammo: 5, ammoType: "rifle", mode: "SA", dmg: "7S", wt: 3.75, avail: "3/24 hrs", cost: 1300, index: 1, range: "sport", legality: "Legal", notes: "Sport hunting rifle. SSC." },
  { name: "Steyr AUG-CSL Carbine", conceal: 3, ammo: 40, ammoType: "rifle", mode: "SA/BF", dmg: "7S", wt: 3.75, avail: "10/4 days", cost: 4500, index: 3, range: "sport", notes: "Carbine configuration of the AUG-CSL. " + AUG },
  // --- RIFLES (Sniper) ---
  { name: "Walther MA-2100", conceal: 99, ammo: 10, ammoType: "rifle", mode: "SA", dmg: "14S", wt: 4.5, avail: "12/7 days", cost: 6500, index: 4, range: "sniper", notes: "Semi-automatic sniper rifle. SSC." },
  // --- SHOTGUNS ---
  { name: "Mossberg CMDT", conceal: 2, ammo: 8, ammoType: "shotgun", mode: "SA/BF", dmg: "9S", wt: 4.25, avail: "8/8 days", cost: 1400, index: 1, range: "shotgun", notes: "Combat shotgun. SSC." },
  { name: "Mossberg SM-CMDT", conceal: 2, ammo: 8, ammoType: "shotgun", mode: "SA/BF", dmg: "9S", wt: 4.5, avail: "12/8 days", cost: 1900, index: 2, range: "shotgun", notes: "Smartgun-equipped combat shotgun. SSC.", smart: true },
  // --- ASSAULT RIFLES ---
  { name: "Colt M22A2", conceal: 3, ammo: 40, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 4.75, avail: "4/3 days", cost: 1600, index: 2, range: "assault", notes: "Assault rifle. SSC." },
  { name: "H&K G12A3", conceal: 2, ammo: 32, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 5.25, avail: "8/4 days", cost: 2200, index: 3, range: "assault", notes: "Assault rifle. SSC." },
  { name: "Sakal vz 88V", conceal: 2, ammo: 35, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 5.5, avail: "5/36 hrs", cost: 1800, index: 2, range: "assault", notes: "Assault rifle. SSC." },
  { name: "Steyr AUG-CSL Assault Rifle", conceal: 2, ammo: 40, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 4, avail: "10/4 days", cost: 4500, index: 3, range: "assault", notes: "Assault-rifle configuration of the AUG-CSL. " + AUG },
  // --- LIGHT MACHINE GUNS ---
  { name: "Ares MP-LMG", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "BF/FA", dmg: "7S", wt: 7.5, avail: "6/5 days", cost: 2200, index: 2, range: "mg", notes: "Belt-fed light machine gun. SSC." },
  { name: "GE Vindicator Minigun", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "FA", dmg: "7S", wt: 0, avail: "24/14 days", cost: 2500, index: 2, range: "mg", notes: "Multi-barrel minigun; weight not listed in the catalog table. SSC." },
  { name: "Steyr AUG-CSL LMG", heavy: true, conceal: 99, ammo: 40, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 0, avail: "10/4 days", cost: 4500, index: 3, range: "mg", notes: "Light-machine-gun configuration of the AUG-CSL; weight not listed in the table. " + AUG },
  // --- LASER WEAPONS ---
  { name: "Ares MP Laser", heavy: true, conceal: 99, ammo: 20, ammoType: "powerpack", mode: "SA", dmg: "15M", wt: 30, avail: "NA", cost: 2500000, index: 0, range: "mg", legality: "Forbidden", notes: "Experimental man-portable laser; runs off a 20-shot power pack. Effectively unavailable (2.5 million¥). SSC." },
  // --- HEAVY WEAPONS ---
  { name: "FN MAG-5 MMG", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "FA", dmg: "9S", wt: 9.5, avail: "18/14 days", cost: 3200, index: 3, range: "mg", legality: "Forbidden", notes: "Medium machine gun, belt-fed. SSC." },
  { name: "Stoner-Ares M107", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "FA", dmg: "10S", wt: 12.5, avail: "18/14 days", cost: 5200, index: 3, range: "mg", legality: "Forbidden", notes: "Heavy machine gun, belt-fed. SSC." },
  { name: "Panther Assault Cannon", heavy: true, conceal: 99, ammo: 22, ammoType: "ac", mode: "SS", dmg: "18D", wt: 18, avail: "16/14 days", cost: 7200, index: 2, range: "cannon", legality: "Forbidden", notes: "Man-portable assault cannon firing superplast warheads. SSC (pg-055)." },
  // --- ROCKETS / MISSILES ---
  { name: "Surface-to-Air Missile (SAM)", heavy: true, conceal: 99, ammo: 1, ammoType: "missile", mode: "SS", dmg: "13D", wt: 1.5, avail: "18/21 days", cost: 2500, index: 4, range: "none", legality: "Forbidden", notes: "Guided surface-to-air missile (Intelligence 4 guidance); uses missile/launcher rules rather than standard range brackets. SSC." }
];

let n = 0;
for (const w of WEAPONS) {
  const safe = w.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(w.name)}.json`, JSON.stringify(weapon(w), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} weapons`);
