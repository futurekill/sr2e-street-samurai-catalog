// Generate Street Samurai Catalog gear into packs-src/ssc-gear: the firearm &
// weapon accessories table and the explosives/grenades table (pg-103, verified
// against the page render). Only accessoryRecoilComp / combatTnMod are consumed
// mechanically by the system; mount + concealability-modifier + street index are
// recorded in notes. Re-run, then `npm run build-packs ssc-gear`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ssc-gear";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ssc-gear:" + s).digest("hex").slice(0, 16);

function gear(g) {
  const _id = idFor(g.name);
  return {
    _id, name: g.name, type: "gear", img: g.img ?? "icons/svg/item-bag.svg",
    system: {
      category: g.category ?? "accessories",
      rating: g.rating ?? 0, quantity: 1, weight: g.wt ?? 0,
      cost: g.cost ?? 0, availability: g.avail ?? "", legality: g.legality ?? "Legal",
      equipped: false, concealability: g.conceal ?? 0,
      weaponAccessory: g.accessory ?? false, linkedWeaponId: "",
      combatTnMod: g.tn ?? 0, accessoryRecoilComp: g.rc ?? 0, requiresSmartgun: g.smart ?? false,
      notes: g.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const GEAR = [
  // --- FIREARM & WEAPON ACCESSORIES (weaponAccessory) ---
  { name: "Bow Accessory Mount", accessory: true, wt: 0.1, cost: 100, avail: "2/24 hrs", legality: "Legal", notes: "Mount that lets a bow carry firearm accessories. Concealability −1. Street Index 0.9. SSC." },
  { name: "Rangefinder (Weapon Mount)", accessory: true, wt: 0.1, cost: 150, avail: "2/24 hrs", legality: "Legal", notes: "Under-barrel rangefinder for reading distance to target. Street Index 0.8. SSC." },
  { name: "Grenade Link", accessory: true, rating: 1, wt: 0.1, cost: 750, avail: "6/48 hrs", legality: "Restricted", notes: "Smartlink-style targeting link for grenade launchers (Rating 1). Street Index 2. SSC." },
  { name: "Improved Gas-Vent II", accessory: true, rating: 2, rc: 2, wt: 0.25, cost: 550, avail: "2/24 hrs", legality: "Legal", notes: "Barrel-mounted gas-vent recoil compensator (RC 2). Street Index 0.9. SSC." },
  { name: "Improved Gas-Vent III", accessory: true, rating: 3, rc: 3, wt: 0.5, cost: 800, avail: "2/24 hrs", legality: "Legal", notes: "Barrel gas-vent (RC 3). Concealability −1. Street Index 0.9. SSC." },
  { name: "Improved Gas-Vent IV", accessory: true, rating: 4, rc: 4, wt: 0.75, cost: 1000, avail: "2/24 hrs", legality: "Legal", notes: "Barrel gas-vent (RC 4). Concealability −2. Street Index 1. SSC." },
  { name: "Improved Gyro Mount", accessory: true, rating: 5, rc: 5, wt: 5, cost: 3500, avail: "6/48 hrs", legality: "Legal", notes: "Under-barrel gyro stabilizer (RC 5). Concealability −6. Street Index 1. SSC." },
  { name: "Deluxe Improved Gyro Mount", accessory: true, rating: 7, rc: 7, wt: 7, cost: 7800, avail: "6/48 hrs", legality: "Legal", notes: "Heavy under-barrel gyro stabilizer (RC 7). Concealability −7. Street Index 1. SSC." },
  { name: "Ultrasound Sight", accessory: true, wt: 0.25, cost: 1300, avail: "8/4 days", legality: "Restricted", notes: "Top-mounted ultrasound sight; negates vision-based target modifiers (smoke, darkness) within range. Concealability −2. Street Index 0.8. SSC." },
  // --- VISION GEAR (worn, not a weapon mount) ---
  { name: "Ultrasound Goggles", category: "electronics", wt: 0, cost: 1100, avail: "3/36 hrs", legality: "Restricted", notes: "Goggles giving ultrasound vision; negate vision-based modifiers within range. Street Index 1. SSC." },
  // --- EXPLOSIVES / GRENADES ---
  { name: "Flash Grenade", category: "explosive", conceal: 6, wt: 0.25, cost: 40, avail: "4/48 hrs", legality: "Restricted", notes: "Flash grenade — Special (blinding/disorienting burst, no damage). Street Index 1. SSC." },
  { name: "Flash-Pak", category: "explosive", conceal: 12, wt: 0.2, cost: 250, avail: "3/36 hrs", legality: "Restricted", notes: "Handheld strobe imposing vision penalties on anyone looking at it — Special. Street Index 1. SSC." }
];

let n = 0;
for (const g of GEAR) {
  const safe = g.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(g.name)}.json`, JSON.stringify(gear(g), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} gear items`);
