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
  bow:     { short: 10, medium: 30,  long: 60,  extreme: 90 },
  pistolL: { short: 5,  medium: 15,  long: 30,  extreme: 50 },
  pistolH: { short: 5,  medium: 20,  long: 40,  extreme: 60 },
  smg:     { short: 10, medium: 40,  long: 80,  extreme: 150 },
  none:    { short: 0,  medium: 0,   long: 0,   extreme: 0 }
};

// weaponType + default skill by kind.
const KIND = {
  firearm:    { type: "firearm",    skill: "firearms" },
  heavy:      { type: "heavy",      skill: "heavy_weapons" },
  melee:      { type: "melee",      skill: "armed_combat" },
  projectile: { type: "projectile", skill: "projectile_weapons" }
};

function weapon(w) {
  const _id = idFor(w.name);
  const kind = w.kind ?? (w.heavy ? "heavy" : "firearm");
  const k = KIND[kind];
  return {
    _id, name: w.name, type: "weapon", img: w.img ?? "icons/svg/sword.svg",
    system: {
      weaponType: k.type,
      skill: w.skill ?? k.skill,
      damageCode: w.dmg, damageType: w.stun ? "stun" : "physical",
      concealability: w.conceal ?? 99, reach: w.reach ?? 0,
      firingModes: modes(w.mode ?? ""),
      ammo: { current: w.ammo ?? 0, max: w.ammo ?? 0, type: w.ammoType ?? (kind === "projectile" ? "arrow" : "rifle") },
      recoilComp: w.rc ?? 0, smartgunCompatible: w.smart ?? false,
      ranges: RANGE[w.range ?? (kind === "melee" ? "none" : "assault")],
      strengthMin: w.strMin ?? 0, weight: w.wt ?? 0,
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
  { name: "Ruger 100", conceal: 2, ammo: 5, ammoType: "rifle", mode: "SA", dmg: "7S", wt: 3.75, avail: "3/24 hrs", cost: 1300, index: 1, range: "sport", legality: "Legal", notes: "A dependable, fully legal sport hunting rifle — cheap, accurate, and a common first long-arm for runners on a budget. SSC." },
  { name: "Steyr AUG-CSL SMG", conceal: 4, ammo: 40, ammoType: "smg", mode: "SA/BF", dmg: "6M", wt: 3.5, avail: "10/4 days", cost: 4500, index: 3, range: "assault", notes: "The submachine-gun configuration of the modular AUG-CSL bullpup: compact and controllable, swapped over from the same convertible chassis. " + AUG },
  { name: "Steyr AUG-CSL Carbine", conceal: 3, ammo: 40, ammoType: "rifle", mode: "SA/BF", dmg: "7S", wt: 3.75, avail: "10/4 days", cost: 4500, index: 3, range: "sport", notes: "The sporting/carbine setup of the AUG-CSL — a longer barrel and rifle reach in place of full-auto, all on the same modular frame. " + AUG },
  // --- RIFLES (Sniper) ---
  { name: "Walther MA-2100", conceal: 99, ammo: 10, ammoType: "rifle", mode: "SA", dmg: "14S", wt: 4.5, avail: "12/7 days", cost: 6500, index: 4, range: "sniper", notes: "A precision semi-automatic sniper rifle and the marksman's tool of choice for putting a single heavy round on target at long range. SSC." },
  // --- SHOTGUNS ---
  { name: "Mossberg CMDT", conceal: 2, ammo: 8, ammoType: "shotgun", mode: "SA/BF", dmg: "9S", wt: 4.25, avail: "8/8 days", cost: 1400, index: 1, range: "shotgun", notes: "A rugged selective-fire combat shotgun — devastating in close quarters and a reliable door-breaker. SSC." },
  { name: "Mossberg SM-CMDT", conceal: 2, ammo: 8, ammoType: "shotgun", mode: "SA/BF", dmg: "9S", wt: 4.5, avail: "12/8 days", cost: 1900, index: 2, range: "shotgun", notes: "The smartgun-integrated CMDT: the same hard-hitting frame with built-in targeting assistance for tighter patterns under pressure. SSC.", smart: true },
  // --- ASSAULT RIFLES ---
  { name: "Colt M22A2", conceal: 3, ammo: 40, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 4.75, avail: "4/3 days", cost: 1600, index: 2, range: "assault", notes: "A versatile military assault rifle with the full single/burst/full-auto suite — a dependable workhorse for the well-armed runner. SSC." },
  { name: "H&K G12A3", conceal: 2, ammo: 32, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 5.25, avail: "8/4 days", cost: 2200, index: 3, range: "assault", notes: "A caseless-ammunition assault rifle — high capacity, full-auto capable, and built to exacting German tolerances. SSC." },
  { name: "Sakal vz 88V", conceal: 2, ammo: 35, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 5.5, avail: "5/36 hrs", cost: 1800, index: 2, range: "assault", notes: "An Eastern-bloc assault rifle: cheap, rugged, and plentiful on the surplus market — it just keeps running. SSC." },
  { name: "Steyr AUG-CSL Assault Rifle", conceal: 4, ammo: 40, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 4, avail: "10/4 days", cost: 4500, index: 3, range: "assault", notes: "The assault-rifle configuration of the AUG-CSL — the chassis's most aggressive build, with the full single/burst/full-auto suite. " + AUG },
  // --- LIGHT MACHINE GUNS ---
  { name: "Ares MP-LMG", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "BF/FA", dmg: "7S", wt: 7.5, avail: "6/5 days", cost: 2200, index: 2, range: "mg", notes: "A belt-fed light machine gun built to lay down sustained suppressing fire from a bipod or a sling. SSC." },
  { name: "GE Vindicator Minigun", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "FA", dmg: "7S", wt: 15, avail: "24/14 days", cost: 12500, index: 2, range: "mg", notes: "An electric, multi-barrel minigun that vomits a literal wall of lead — a permanent 15-round recoil rate per Complex Action. Weight & cost confirmed from the body entry. SSC." },
  { name: "Steyr AUG-CSL LMG", heavy: true, conceal: 99, ammo: 40, ammoType: "rifle", mode: "SA/BF/FA", dmg: "8M", wt: 5.5, avail: "10/4 days", cost: 4500, index: 3, range: "mg", notes: "The light-machine-gun configuration of the AUG-CSL — the heaviest, longest-barreled build on the modular frame. " + AUG },
  // --- LASER WEAPONS ---
  { name: "Ares MP Laser", heavy: true, conceal: 99, ammo: 20, ammoType: "powerpack", mode: "SA", dmg: "15M", wt: 30, avail: "NA", cost: 2500000, index: 0, range: "mg", legality: "Forbidden", notes: "An experimental man-portable laser fed by a 20-shot power pack — bleeding-edge, heavy, and effectively unobtainable at 2.5 million nuyen. SSC." },
  // --- HEAVY WEAPONS ---
  { name: "FN MAG-5 MMG", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "FA", dmg: "9S", wt: 9.5, avail: "18/14 days", cost: 3200, index: 3, range: "mg", legality: "Forbidden", notes: "A belt-fed medium machine gun — a crew-served weapon meant to be mounted or hauled into a fixed position. SSC." },
  { name: "Stoner-Ares M107", heavy: true, conceal: 99, ammo: 50, ammoType: "belt", mode: "FA", dmg: "10S", wt: 12.5, avail: "18/14 days", cost: 5200, index: 3, range: "mg", legality: "Forbidden", notes: "A belt-fed heavy machine gun delivering brutal, sustained firepower from a tripod or vehicle mount. SSC." },
  { name: "Panther Assault Cannon", heavy: true, conceal: 99, ammo: 22, ammoType: "ac", mode: "SS", dmg: "18D", wt: 18, avail: "16/14 days", cost: 7200, index: 2, range: "cannon", legality: "Forbidden", notes: "A shoulder-fired assault cannon that lobs superplast warheads — the answer to armored vehicles, hardened cover, and angry trolls. SSC (pg-055)." },
  // --- ROCKETS / MISSILES ---
  { name: "Surface-to-Air Missile (SAM)", heavy: true, conceal: 99, ammo: 1, ammoType: "missile", mode: "SS", dmg: "13D", wt: 1.5, avail: "18/21 days", cost: 2500, index: 4, range: "none", legality: "Forbidden", notes: "A shoulder-launched guided surface-to-air missile (Intelligence 4 guidance); resolved with the missile/launcher rules rather than standard range brackets. SSC." },
  // --- MELEE: Edged ---
  { name: "Ares Monosword", kind: "melee", conceal: 3, reach: 1, dmg: "(Str+3)M", wt: 2, avail: "4/24 hrs", cost: 1000, index: 1, legality: "Restricted", notes: "A monofilament-edged blade that shears through armor and flesh alike — the street samurai's signature steel. SSC." },
  { name: "Centurion Laser Axe", kind: "melee", conceal: 2, reach: 1, dmg: "(Str)S", wt: 5.2, avail: "6/48 hrs", cost: 3500, index: 2, legality: "Restricted", notes: "A powered axe with a superheated edge — as much a statement of intimidation as a weapon. SSC." },
  { name: "Combat Axe", kind: "melee", conceal: 2, reach: 2, dmg: "(Str)S", wt: 2, avail: "3/24 hrs", cost: 750, index: 2, legality: "Restricted", notes: "A brutal two-handed combat axe; its reverse thrusting point does (Str+2)L at Reach 0. SSC." },
  { name: "Survival Knife", kind: "melee", conceal: 6, reach: 0, dmg: "(Str+1)L", wt: 0.75, avail: "3/6 hrs", cost: 450, index: 1, legality: "Legal", notes: "A heavy, multipurpose fighting knife — equally at home dressing game or settling an argument in an alley. SSC." },
  // --- MELEE: Clubs / shock ---
  { name: "AZ-150 Stun Baton", kind: "melee", conceal: 5, reach: 1, dmg: "8S", stun: true, wt: 1, avail: "3/36 hrs", cost: 1500, index: 2, legality: "Restricted", notes: "A telescoping baton that delivers an incapacitating electric jolt on contact (8S Stun). SSC." },
  // --- MELEE: Hand/forearm (worn — Unarmed) ---
  { name: "Forearm Snap Blades", kind: "melee", skill: "unarmed_combat", conceal: 7, reach: 0, dmg: "(Str)M", wt: 1.5, avail: "4/48 hrs", cost: 850, index: 2, legality: "Restricted", notes: "Spring-loaded blades concealed along the forearm that snap out at a flick of the wrist. SSC." },
  { name: "Improved Hand Blades", kind: "melee", skill: "unarmed_combat", conceal: 99, reach: 0, dmg: "(Str+2)L", wt: 0, avail: "6/72 hrs", cost: 8500, index: 1, legality: "Forbidden", notes: "Retractable cyber-implant blades that extend from between the knuckles — invisible until they aren't. +8,500¥ implant. SSC." },
  { name: "Shock Glove", kind: "melee", skill: "unarmed_combat", conceal: 9, reach: 0, dmg: "7S", stun: true, wt: 0.5, avail: "5/48 hrs", cost: 950, index: 2, legality: "Restricted", notes: "An armored glove wired to dump a stunning charge into whatever it strikes (7S Stun). SSC." },
  // --- PROJECTILE ---
  { name: "Ranger-X Bow", kind: "projectile", conceal: 2, reach: 0, dmg: "(Str+4)M", wt: 1.5, strMin: 2, avail: "5/36 hrs", cost: 120, index: 2, range: "bow", legality: "Legal", notes: "A silent compound hunting bow — no muzzle flash, no report, no ballistic trail. Minimum Strength 2, +1 Str per extra rating; cost is 120¥ × Strength rating. SSC." },
  // --- PISTOLS: Hold-Out ---
  { name: "Tiffani Self-Defender", conceal: 8, ammo: 4, ammoType: "pistol", mode: "SS", dmg: "4L", wt: 0.5, avail: "2/12 hrs", cost: 450, index: 0.75, range: "pistolL", legality: "Legal", notes: "A tiny hold-out pistol designed to disappear in a palm, a clutch, or a waistband — a last word when everything else has failed. SSC." },
  // --- PISTOLS: Light ---
  { name: "Ares Light Fire 70", conceal: 5, ammo: 16, ammoType: "pistol", mode: "SA", dmg: "6L", wt: 1, avail: "3/12 hrs", cost: 475, index: 0.8, range: "pistolL", legality: "Legal", notes: "A lightweight, easily-concealed light pistol — a popular backup piece and everyday carry. SSC." },
  { name: "Beretta 200ST", conceal: 4, ammo: 26, ammoType: "pistol", mode: "SA/BF", dmg: "6L", wt: 2, avail: "5/24 hrs", cost: 750, index: 1.5, range: "pistolL", legality: "Restricted", notes: "A light pistol with a hidden trick: it can squeeze off one burst per Complex Action despite its size. SSC." },
  { name: "Ceska vz120", conceal: 7, ammo: 18, ammoType: "pistol", mode: "SA", dmg: "6L", wt: 1, avail: "3/12 hrs", cost: 500, index: 0.8, range: "pistolL", legality: "Legal", notes: "An inexpensive, highly concealable light pistol that turns up in coat pockets all over the sprawl. SSC." },
  { name: "Seco LD-120", conceal: 5, ammo: 12, ammoType: "pistol", mode: "SA", dmg: "6L", wt: 1, avail: "3/12 hrs", cost: 400, index: 0.8, range: "pistolL", legality: "Legal", notes: "A cheap, no-frills light pistol — disposable and forgettable, which is exactly the point. SSC." },
  // --- PISTOLS: Machine Pistols ---
  { name: "Ares Crusader MP", conceal: 6, ammo: 40, ammoType: "pistol", mode: "SA/BF", dmg: "6L", wt: 3.25, avail: "5/36 hrs", cost: 950, index: 2, range: "pistolL", legality: "Restricted", notes: "A compact machine pistol pairing burst fire with a generous magazine — a lot of noise from a small package. SSC." },
  { name: "Ceska Black Scorpion", conceal: 5, ammo: 35, ammoType: "pistol", mode: "SA/BF", dmg: "6L", wt: 3, avail: "5/36 hrs", cost: 850, index: 2, range: "pistolL", legality: "Restricted", notes: "A brutal little machine pistol that trades fine control for a sudden wall of lead. SSC." },
  // --- PISTOLS: Heavy ---
  { name: "Ares Predator II", conceal: 4, ammo: 15, ammoType: "pistol", mode: "SA", dmg: "9M", wt: 2.5, avail: "4/24 hrs", cost: 550, index: 0.5, range: "pistolH", legality: "Restricted", notes: "The iconic heavy pistol of the shadows — accurate, hard-hitting, and seemingly in every other holster on the street. SSC." },
  { name: "Browning Ultra-Power", conceal: 6, ammo: 10, ammoType: "pistol", mode: "SA", dmg: "9M", wt: 2.25, avail: "4/24 hrs", cost: 525, index: 1.5, range: "pistolH", legality: "Restricted", notes: "A classic heavy pistol with a reputation for reliability and old-fashioned stopping power. SSC." },
  { name: "Colt Manhunter", conceal: 5, ammo: 16, ammoType: "pistol", mode: "SA", dmg: "9M", wt: 2.5, avail: "4/24 hrs", cost: 425, index: 1, range: "pistolH", legality: "Restricted", notes: "An affordable heavy pistol that punches well above its price tag — a lot of gun for the nuyen. SSC." },
  // --- SPECIAL WEAPONS ---
  { name: "Narcoject Pistol", conceal: 7, ammo: 5, ammoType: "dart", mode: "SA", dmg: "Special", wt: 1.5, avail: "6/2 days", cost: 600, index: 2, range: "pistolL", legality: "Restricted", notes: "A dart pistol that puts a target down without killing them — its effect is whatever toxin is loaded in the darts. SSC." },
  { name: "Narcoject Rifle", conceal: 4, ammo: 10, ammoType: "dart", mode: "SA", dmg: "Special", wt: 3.25, avail: "8/2 days", cost: 1700, index: 2, range: "assault", legality: "Restricted", notes: "The long-range narcoject dart rifle — quiet, non-lethal at the GM's discretion, and dialed to the loaded toxin. SSC." },
  { name: "Net Gun (Medium)", conceal: 4, ammo: 4, ammoType: "net", mode: "SA", dmg: "Special", wt: 4, avail: "8/36 hrs", cost: 750, index: 2, range: "pistolL", legality: "Restricted", notes: "Fires a weighted net to entangle and immobilize a target rather than wound them (medium). SSC." },
  { name: "Net Gun (Large)", conceal: 3, ammo: 4, ammoType: "net", mode: "SA", dmg: "Special", wt: 4.5, avail: "8/36 hrs", cost: 1150, index: 2, range: "pistolL", legality: "Restricted", notes: "The heavier net gun — a larger, stronger net for bigger quarry. SSC." },
  // --- SUBMACHINE GUNS ---
  { name: "Beretta Model 70", conceal: 3, ammo: 35, ammoType: "smg", mode: "BF/FA", dmg: "6M", wt: 3.75, avail: "5/3 days", cost: 900, index: 1, range: "smg", legality: "Restricted", notes: "A controllable submachine gun prized for its handling and deep magazine. SSC." },
  { name: "Heckler & Koch MP-5TX", conceal: 5, ammo: 20, ammoType: "smg", mode: "SA/BF/FA", dmg: "6M", wt: 3.25, avail: "5/36 hrs", cost: 850, index: 1, range: "smg", legality: "Restricted", notes: "A refined, accurate SMG and a corporate-security standby the world over. SSC." },
  { name: "Ingram Smartgun", conceal: 5, ammo: 32, ammoType: "smg", mode: "BF/FA", dmg: "7M", wt: 3, avail: "4/24 hrs", cost: 950, index: 1, range: "smg", legality: "Restricted", smart: true, notes: "A submachine gun with a factory-integral smartgun system — point-and-hit firepower for the wired runner. SSC." },
  { name: "Sandler TMP", conceal: 4, ammo: 20, ammoType: "smg", mode: "BF/FA", dmg: "6M", wt: 3.25, avail: "5/36 hrs", cost: 500, index: 1, range: "smg", legality: "Restricted", notes: "A compact, cheap submachine gun — small enough to tuck away, mean enough to matter. SSC." },
  { name: "SCK Model 100", conceal: 5, ammo: 30, ammoType: "smg", mode: "SA/BF", dmg: "7M", wt: 4.5, avail: "5/36 hrs", cost: 1000, index: 1, range: "smg", legality: "Restricted", notes: "A solid, hard-hitting submachine gun balancing capacity and control. SSC." }
];

let n = 0;
for (const w of WEAPONS) {
  const safe = w.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(w.name)}.json`, JSON.stringify(weapon(w), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} weapons`);
