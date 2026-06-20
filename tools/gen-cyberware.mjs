// Generate Street Samurai Catalog cyberware into packs-src/ssc-cyberware.
// Stats transcribed from the catalog's consolidated CYBERTECH table (verified
// against the page render); descriptions are original one-liners. Re-run after
// edits, then `npm run build-packs ssc-cyberware`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ssc-cyberware";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ssc-cyber:" + s).digest("hex").slice(0, 16);
const ZERO = { body: 0, quickness: 0, strength: 0, charisma: 0, intelligence: 0, willpower: 0, reaction: 0, initiativeDice: 0 };

function cyber(c) {
  const _id = idFor(c.name);
  return {
    _id, name: c.name, type: "cyberware", img: c.img ?? "icons/svg/upgrade.svg",
    system: {
      location: c.location, grade: "standard",
      essenceCost: c.ess ?? 0, rating: c.rating ?? 0,
      cost: c.cost ?? 0, availability: c.avail ?? "", streetIndex: String(c.index ?? ""),
      legality: c.legality ?? "Legal", installed: false, combatTnMod: c.combatTnMod ?? 0, isVcr: false,
      attributeMods: { ...ZERO, ...(c.mods ?? {}) },
      notes: c.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1781600000000, modifiedTime: 1781600000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

// Batch 1 — Headware (eyes/ears/comms), Internals, Bodyware (reflexes/skillwires/cyberguns).
const CYBER = [
  // --- HEADWARE: Eyes — Vision Magnification ---
  { name: "Vision Magnification (Optical 1)", location: "headware", ess: 0.2, cost: 2500, avail: "4/48 hrs", index: 1, notes: "Optical vision magnification, level 1 — telescopic lenses. SSC." },
  { name: "Vision Magnification (Optical 2)", location: "headware", ess: 0.2, cost: 4000, avail: "4/48 hrs", index: 1, notes: "Optical vision magnification, level 2. SSC." },
  { name: "Vision Magnification (Optical 3)", location: "headware", ess: 0.2, cost: 6000, avail: "5/48 hrs", index: 1, notes: "Optical vision magnification, level 3. SSC." },
  { name: "Vision Magnification (Electronic 1)", location: "headware", ess: 0.1, cost: 3500, avail: "5/48 hrs", index: 1, notes: "Electronic (zoom) vision magnification, level 1. SSC." },
  { name: "Vision Magnification (Electronic 2)", location: "headware", ess: 0.1, cost: 7500, avail: "5/48 hrs", index: 1, notes: "Electronic vision magnification, level 2. SSC." },
  { name: "Vision Magnification (Electronic 3)", location: "headware", ess: 0.1, cost: 11000, avail: "8/48 hrs", index: 1, notes: "Electronic vision magnification, level 3. SSC." },
  { name: "Rangefinder", location: "headware", ess: 0.1, cost: 2000, avail: "8/48 hrs", index: 1.5, notes: "Cybereye rangefinder — reads distance to a target. SSC." },
  // --- HEADWARE: Ears ---
  { name: "Hearing Amplification", location: "headware", ess: 0.2, cost: 3500, avail: "4/48 hrs", index: 1.25, notes: "Boosts hearing sensitivity. SSC." },
  { name: "Select Sound Filter", location: "headware", ess: 0.2, rating: 1, cost: 1000, avail: "6/48 hrs", index: 1.25, notes: "Filters out unwanted noise (Levels 1–5); cost = Level × 1,000¥ (Level 1 shown). SSC." },
  // --- HEADWARE: Communications ---
  { name: "Commlink II", location: "headware", ess: 0.3, cost: 8000, avail: "2/48 hrs", index: 1, legality: "Restricted", notes: "Headware radio/comm transceiver, Rating II. SSC." },
  { name: "Commlink IV", location: "headware", ess: 0.3, cost: 18000, avail: "3/48 hrs", index: 1.25, legality: "Restricted", notes: "Headware comm transceiver, Rating IV. SSC." },
  { name: "Commlink VIII", location: "headware", ess: 0.3, cost: 40000, avail: "4/48 hrs", index: 1.5, legality: "Restricted", notes: "High-end headware radio/comm transceiver, Rating VIII. SSC." },
  { name: "Commlink X", location: "headware", ess: 0.3, cost: 60000, avail: "5/48 hrs", index: 1.75, legality: "Restricted", notes: "Top-tier headware comm transceiver, Rating X. SSC." },
  // --- HEADWARE: Crypto / Scramble ---
  { name: "Crypto Circuit HD", location: "headware", ess: 0.1, rating: 1, cost: 10000, avail: "6/36 hrs", index: 1, legality: "Restricted", notes: "Headware encryption circuit (Rating 1–10). Cost = Rating × 10,000¥ (R1–4), × 20,000¥ (R5–7), × 30,000¥ (R8–9), 500,000¥ flat (R10). SSC." },
  { name: "Scramble Breaker HD", location: "headware", ess: 0.2, rating: 1, cost: 20000, avail: "6/48 hrs", index: 1.5, legality: "Forbidden", notes: "Headware decryption (Rating 1–8). Cost = Rating × 20,000¥ (R1–4), × 40,000¥ (R5–7), 800,000¥ flat (R8). SSC." },
  // --- INTERNALS ---
  { name: "Internal Voice Mask", location: "internals", ess: 0.1, cost: 7000, avail: "6/48 hrs", index: 1, notes: "Alters the user's voice to defeat voiceprint identification. SSC." },
  { name: "Sense Link", location: "internals", ess: 2.0, cost: 300000, avail: "2/5 days", index: 1, legality: "Restricted", notes: "Broadcasts or receives full sensory input (simsense link). SSC." },
  { name: "Sense Link Internal Transmitter", location: "internals", ess: 0.6, cost: 80000, avail: "3/5 days", index: 1.5, legality: "Restricted", notes: "Built-in transmitter for the Sense Link. SSC." },
  { name: "Video Link", location: "internals", ess: 0.5, cost: 22000, avail: "4/48 hrs", index: 1, notes: "Records/transmits the user's visual field. SSC." },
  { name: "Video Link Internal Transmitter", location: "internals", ess: 0.4, cost: 4500, avail: "6/48 hrs", index: 1, notes: "Built-in transmitter for the Video Link. SSC." },
  // --- BODYWARE: Cyberguns ---
  { name: "Cybergun (Hold-Out Pistol)", location: "bodyware", ess: 0, cost: 250, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "Implanted hold-out pistol (weapon stats per the gun; essence per the cybergun rules). SSC." },
  { name: "Cybergun (Light Pistol)", location: "bodyware", ess: 0, cost: 650, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "Implanted light pistol. SSC." },
  { name: "Cybergun (Machine Pistol)", location: "bodyware", ess: 0, cost: 900, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "Implanted machine pistol. SSC." },
  { name: "Cybergun (Heavy Pistol)", location: "bodyware", ess: 0, cost: 800, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "Implanted heavy pistol. SSC." },
  { name: "Cybergun (Submachine Gun)", location: "bodyware", ess: 0, cost: 1800, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "Implanted SMG. SSC." },
  { name: "Cybergun (Shotgun)", location: "bodyware", ess: 0, cost: 1200, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "Implanted shotgun. SSC." },
  // --- BODYWARE: Skill Hardwires ---
  { name: "Skill Hardwire (Rating 1–4)", location: "bodyware", ess: 0.2, rating: 1, cost: 5000, avail: "6/10 days", index: 1, legality: "Restricted", notes: "Hardwired active skill (Levels 1–4); Essence = Level × 0.2, cost = Level × 5,000¥ (per-level multiplier shown). SSC." },
  { name: "Skill Hardwire (Rating 5–8)", location: "bodyware", ess: 0.25, rating: 5, cost: 50000, avail: "12/14 days", index: 1.5, legality: "Restricted", notes: "Hardwired skill (Levels 5–8); Essence = Level × 0.25, cost = Level × 50,000¥ (per-level multiplier shown). SSC." },
  { name: "Skill Hardwire (Rating 9–10)", location: "bodyware", ess: 0.3, rating: 9, cost: 500000, avail: "12/14 days", index: 1.5, legality: "Restricted", notes: "Top-tier hardwired skill (Levels 9–10); Essence = Level × 0.3, cost = Level × 500,000¥ (per-level multiplier shown). SSC." },
  // --- BODYWARE: Boosted Reflexes ---
  { name: "Boosted Reflexes 1", location: "bodyware", ess: 0.5, cost: 15000, avail: "3/24 hrs", index: 1, legality: "Restricted", notes: "Reaction/initiative boost, level 1 (a budget alternative to wired reflexes). SSC.", mods: { reaction: 1 } },
  { name: "Boosted Reflexes 2", location: "bodyware", ess: 1.25, cost: 40000, avail: "3/24 hrs", index: 1.25, legality: "Restricted", notes: "Boosted reflexes, level 2. SSC.", mods: { reaction: 2 } },
  { name: "Boosted Reflexes 3", location: "bodyware", ess: 2.8, cost: 90000, avail: "3/24 hrs", index: 1.5, legality: "Restricted", notes: "Boosted reflexes, level 3. SSC.", mods: { reaction: 3 } }
];

let n = 0;
for (const c of CYBER) {
  const safe = c.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(c.name)}.json`, JSON.stringify(cyber(c), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} cyberware items`);
