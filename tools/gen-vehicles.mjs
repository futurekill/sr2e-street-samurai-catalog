// Generate Street Samurai Catalog vehicles into packs-src/ssc-vehicles (Actor
// type "vehicle"). Stats from the catalog's vehicle section (pg-042 Aurora,
// pg-043 Viking), verified against the page renders. Descriptions are original
// one-liners — no catalog prose. Re-run, then `npm run build-packs ssc-vehicles`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ssc-vehicles";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ssc-vehicle:" + s).digest("hex").slice(0, 16);

function vehicle(v) {
  const _id = idFor(v.name);
  const img = v.img ?? "icons/svg/explosion.svg";
  return {
    _id, name: v.name, type: "vehicle", img,
    system: {
      vehicleType: v.vtype ?? "ground", skill: v.skill ?? "bike",
      handling: v.handling, speed: v.speed, acceleration: v.accel ?? 0,
      body: v.body, armor: v.armor, signature: v.sig,
      pilot: v.pilot ?? 0, sensor: v.sensor ?? 0,
      cargo: v.cargo ?? 0, load: v.load ?? 0, seating: v.seating ?? "",
      cost: v.cost ?? 0, availability: v.avail ?? "", autonav: v.autonav ?? 0,
      conditionMonitor: { value: 0, max: 10 },
      notes: v.notes ?? ""
    },
    items: [], effects: [], folder: null, sort: 0, flags: {},
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    prototypeToken: {
      name: v.name, displayName: 0, actorLink: false, width: 1, height: 1,
      texture: { src: img, anchorX: 0.5, anchorY: 0.5, scaleX: 1, scaleY: 1, fit: "contain", tint: "#ffffff" },
      disposition: 0, displayBars: 0
    },
    ownership: { default: 0 }, _key: `!actors!${_id}`
  };
}

const VEHICLES = [
  {
    name: "Suzuki Aurora", vtype: "ground", skill: "bike",
    handling: 2, speed: 210, accel: 0, body: 1, armor: 0, sig: 4, pilot: 1,
    seating: "1", cost: 15000,
    notes: "A low, sleek racing bike — the fastest two wheels on the street, built for pure speed and style with advanced ride-stabilization for its handling. Speed 70/210 (cruising/maximum). Cannot mount weapons (accepts no firmpoint or hardpoint). Acceleration not listed in the catalog. SSC (pg-042)."
  },
  {
    name: "Honda Viking", vtype: "ground", skill: "bike",
    handling: 3, speed: 160, accel: 0, body: 4, armor: 1, sig: 3, pilot: 2,
    seating: "2", cost: 17000,
    notes: "A full-size heavy motorcycle with reinforced, high-impact structure — power, presence, and a king-of-the-road silhouette. Speed 50/160 (cruising/maximum). Accepts 2 firmpoints (1,700¥ each) or 1 hardpoint (5,100¥). Acceleration not listed in the catalog. SSC (pg-043)."
  }
];

let n = 0;
for (const v of VEHICLES) {
  const safe = v.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(v.name)}.json`, JSON.stringify(vehicle(v), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} vehicles`);
