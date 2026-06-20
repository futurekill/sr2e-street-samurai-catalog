// Generate Street Samurai Catalog ammunition into packs-src/ssc-ammo.
// (Firearm APDS is already in the system's core pack from this same source, so
// it isn't duplicated here.) Re-run, then `npm run build-packs ssc-ammo`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ssc-ammo";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ssc-ammo:" + s).digest("hex").slice(0, 16);

function ammo(a) {
  const _id = idFor(a.name);
  return {
    _id, name: a.name, type: "ammo", img: a.img ?? "icons/svg/target.svg",
    system: {
      ammoType: a.ammoType ?? "", quantity: a.qty ?? 1,
      damageModifier: a.dmgMod ?? 0, armorModifier: a.armMod ?? 0,
      damageType: a.dmgType ?? "", armorCalc: a.armorCalc ?? "",
      cost: a.cost ?? 0, notes: a.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const AMMO = [
  { name: "Ranger-X Arrows", ammoType: "arrow", qty: 1, cost: 18, notes: "Precision-fletched arrows for the Ranger-X Bow — silent, deniable, and recoverable; damage is the bow's. 18¥ each. Street Index 1. SSC (pg-102)." }
];

let n = 0;
for (const a of AMMO) {
  const safe = a.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(a.name)}.json`, JSON.stringify(ammo(a), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} ammo items`);
