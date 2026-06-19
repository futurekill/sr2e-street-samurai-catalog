// Generate Street Samurai Catalog armor into packs-src/ssc-armor, from the
// CLOTHING AND ARMOR summary table (pg-104, verified against the page render).
// ArmorData has no street-index field, so street index goes in notes. Re-run,
// then `npm run build-packs ssc-armor`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ssc-armor";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ssc-armor:" + s).digest("hex").slice(0, 16);

function armor(a) {
  const _id = idFor(a.name);
  return {
    _id, name: a.name, type: "armor", img: a.img ?? "icons/svg/shield.svg",
    system: {
      ballistic: a.bal ?? 0, impact: a.imp ?? 0,
      concealability: a.conceal ?? 99, weight: a.wt ?? 0,
      cost: a.cost ?? 0, availability: a.avail ?? "", legality: a.legality ?? "Legal",
      equipped: false, isLayered: a.layered ?? false, notes: a.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const ARMOR = [
  // --- CLOTHING AND ARMOR ---
  { name: "Forearm Guards", conceal: 12, bal: 0, imp: 1, wt: 0.2, avail: "5/36 hrs", cost: 250, legality: "Legal", notes: "Forearm armor guards. Street Index 0.75. SSC." },
  { name: "Riot Shield, Small", conceal: 99, bal: 1, imp: 1, wt: 2, avail: "8/14 days", cost: 1500, legality: "Restricted", notes: "Small riot shield. Impact value illegible in the source scan — placeholder 1, pending a physical-book capture. Street Index 2. SSC." },
  { name: "Secure Clothing", conceal: 12, bal: 3, imp: 0, wt: 1.5, avail: "3/36 hrs", cost: 450, legality: "Legal", notes: "Armored streetwear. Street Index 0.9. SSC." },
  { name: "Secure Jacket", conceal: 9, bal: 5, imp: 3, wt: 3, avail: "4/36 hrs", cost: 850, legality: "Legal", notes: "Armored jacket. Street Index 0.8. SSC." },
  { name: "Secure Vest", conceal: 15, bal: 2, imp: 1, wt: 0.75, avail: "3/36 hrs", cost: 175, legality: "Legal", notes: "Concealable armored vest. Street Index 0.9. SSC." },
  { name: "Secure Ultra-Vest", conceal: 14, bal: 3, imp: 2, wt: 2.5, avail: "3/36 hrs", cost: 350, legality: "Legal", notes: "Heavier concealable vest. Street Index 0.9. SSC." },
  { name: "Secure Long Coat", conceal: 10, bal: 4, imp: 2, wt: 2, avail: "3/24 hrs", cost: 650, legality: "Legal", notes: "Armored long coat. Street Index 0.9. SSC." },
  // --- FORM-FITTING BODY ARMOR (worn under other armor) ---
  { name: "Form-Fitting Body Armor (Level 1)", conceal: 99, bal: 2, imp: 0, wt: 0.75, avail: "3/48 hrs", cost: 150, legality: "Legal", layered: true, notes: "Worn under clothing/armor; layers with other armor. Street Index 1. SSC." },
  { name: "Form-Fitting Body Armor (Level 2)", conceal: 15, bal: 3, imp: 1, wt: 1.25, avail: "4/48 hrs", cost: 250, legality: "Legal", layered: true, notes: "Form-fitting body armor, level 2; layers with other armor. Street Index 1. SSC." },
  { name: "Form-Fitting Body Armor (Level 3)", conceal: 12, bal: 4, imp: 1, wt: 1.75, avail: "4/48 hrs", cost: 500, legality: "Legal", layered: true, notes: "Form-fitting body armor, level 3; layers with other armor. Street Index 1. SSC." },
  // --- SECURITY ARMOR (full military-grade; weight listed as "N + Body") ---
  { name: "Light Security Armor", conceal: 99, bal: 6, imp: 4, wt: 9, avail: "12/10 days", cost: 7500, legality: "Restricted", notes: "Kelmar-Tech integrated security armor (light). Catalog weight listed as \"9 + Body\". Street Index 2. SSC." },
  { name: "Medium Security Armor", conceal: 99, bal: 6, imp: 5, wt: 11, avail: "14/10 days", cost: 9000, legality: "Restricted", notes: "Integrated security armor (medium). Catalog weight listed as \"11 + Body\". Street Index 2.5. SSC." },
  { name: "Heavy Security Armor", conceal: 99, bal: 7, imp: 5, wt: 13, avail: "16/14 days", cost: 12000, legality: "Restricted", notes: "Integrated security armor (heavy). Catalog weight listed as \"13 + Body\". Street Index 3. SSC." },
  { name: "Security Helmet", conceal: 99, bal: 1, imp: 2, wt: 0, avail: "12/14 days", cost: 250, legality: "Restricted", notes: "Security armor helmet. Street Index 2. SSC." }
];

let n = 0;
for (const a of ARMOR) {
  const safe = a.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(a.name)}.json`, JSON.stringify(armor(a), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} armor items`);
