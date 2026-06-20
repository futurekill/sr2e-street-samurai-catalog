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
  { name: "Vision Magnification (Optical 1)", location: "headware", ess: 0.2, cost: 2500, avail: "4/48 hrs", index: 1, notes: "Telescoping optical lenses that zoom in on distant targets — purely optical, so no scanner can tell they're in use. Level 1. SSC." },
  { name: "Vision Magnification (Optical 2)", location: "headware", ess: 0.2, cost: 4000, avail: "4/48 hrs", index: 1, notes: "Optical (sensor-invisible) telescopic magnification, level 2. SSC." },
  { name: "Vision Magnification (Optical 3)", location: "headware", ess: 0.2, cost: 6000, avail: "5/48 hrs", index: 1, notes: "Optical (sensor-invisible) telescopic magnification, level 3. SSC." },
  { name: "Vision Magnification (Electronic 1)", location: "headware", ess: 0.1, cost: 3500, avail: "5/48 hrs", index: 1, notes: "Electronic zoom for the cybereyes — sharper than optics, but it registers as active gear to a scanner. Level 1. SSC." },
  { name: "Vision Magnification (Electronic 2)", location: "headware", ess: 0.1, cost: 7500, avail: "5/48 hrs", index: 1, notes: "Electronic (detectable) zoom magnification, level 2. SSC." },
  { name: "Vision Magnification (Electronic 3)", location: "headware", ess: 0.1, cost: 11000, avail: "8/48 hrs", index: 1, notes: "Electronic (detectable) zoom magnification, level 3. SSC." },
  { name: "Rangefinder", location: "headware", ess: 0.1, cost: 2000, avail: "8/48 hrs", index: 1.5, notes: "Paints an exact range on whatever the user looks at — invaluable for the careful shooter. SSC." },
  // --- HEADWARE: Ears ---
  { name: "Hearing Amplification", location: "headware", ess: 0.2, cost: 3500, avail: "4/48 hrs", index: 1.25, notes: "Cyberears tuned to pull a whisper out of a noisy room or catch a safe's tumblers falling. SSC." },
  { name: "Select Sound Filter", location: "headware", ess: 0.2, rating: 1, cost: 1000, avail: "6/48 hrs", index: 1.25, notes: "Lets the user mute gunfire, isolate one voice in a crowd, or scrub a noisy room (Levels 1–5); cost = Level × 1,000¥ (Level 1 shown). SSC." },
  // --- HEADWARE: Communications ---
  { name: "Commlink II", location: "headware", ess: 0.3, cost: 8000, avail: "2/48 hrs", index: 1, legality: "Restricted", notes: "An implanted radio transceiver — hands-free, silent, and always on. Rating II. SSC." },
  { name: "Commlink IV", location: "headware", ess: 0.3, cost: 18000, avail: "3/48 hrs", index: 1.25, legality: "Restricted", notes: "An implanted radio transceiver with longer reach and clearer signal. Rating IV. SSC." },
  { name: "Commlink VIII", location: "headware", ess: 0.3, cost: 40000, avail: "4/48 hrs", index: 1.5, legality: "Restricted", notes: "A high-end implanted comm transceiver for serious range and clarity. Rating VIII. SSC." },
  { name: "Commlink X", location: "headware", ess: 0.3, cost: 60000, avail: "5/48 hrs", index: 1.75, legality: "Restricted", notes: "Top-tier headware comms — the transceiver a fixer or team leader carries inside their skull. Rating X. SSC." },
  // --- HEADWARE: Crypto / Scramble ---
  { name: "Crypto Circuit HD", location: "headware", ess: 0.1, rating: 1, cost: 10000, avail: "6/36 hrs", index: 1, legality: "Restricted", notes: "Encrypts the user's headware comms against eavesdroppers (Rating 1–10). Cost = Rating × 10,000¥ (R1–4), × 20,000¥ (R5–7), × 30,000¥ (R8–9), 500,000¥ flat (R10). SSC." },
  { name: "Scramble Breaker HD", location: "headware", ess: 0.2, rating: 1, cost: 20000, avail: "6/48 hrs", index: 1.5, legality: "Forbidden", notes: "Cracks encrypted signals on the fly — strictly black-market headware (Rating 1–8). Cost = Rating × 20,000¥ (R1–4), × 40,000¥ (R5–7), 800,000¥ flat (R8). SSC." },
  // --- INTERNALS ---
  { name: "Internal Voice Mask", location: "internals", ess: 0.1, cost: 7000, avail: "6/48 hrs", index: 1, notes: "Reshapes the user's voice on the fly to defeat voiceprint identification — a different person on every call. SSC." },
  { name: "Sense Link", location: "internals", ess: 2.0, cost: 300000, avail: "2/5 days", index: 1, legality: "Restricted", notes: "A full simsense link that broadcasts or receives the user's complete sensory feed — the ultimate, and ultimately invasive, wire. SSC." },
  { name: "Sense Link Internal Transmitter", location: "internals", ess: 0.6, cost: 80000, avail: "3/5 days", index: 1.5, legality: "Restricted", notes: "A built-in transmitter so the Sense Link can broadcast without any external gear. SSC." },
  { name: "Video Link", location: "internals", ess: 0.5, cost: 22000, avail: "4/48 hrs", index: 1, notes: "Records and transmits everything the user sees — a walking surveillance camera behind a pair of ordinary eyes. SSC." },
  { name: "Video Link Internal Transmitter", location: "internals", ess: 0.4, cost: 4500, avail: "6/48 hrs", index: 1, notes: "A built-in transmitter for the Video Link — no external rig to spot or seize. SSC." },
  // --- BODYWARE: Cyberguns ---
  { name: "Cybergun (Hold-Out Pistol)", location: "bodyware", ess: 0, cost: 250, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "A hold-out pistol built into the body — drawn faster than thought and impossible to frisk or disarm. Weapon stats per the gun; essence per the cybergun rules. SSC." },
  { name: "Cybergun (Light Pistol)", location: "bodyware", ess: 0, cost: 650, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "A light pistol implanted in a limb — a gun you can't be caught carrying because it's part of you. SSC." },
  { name: "Cybergun (Machine Pistol)", location: "bodyware", ess: 0, cost: 900, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "A machine pistol concealed inside the body — burst fire from an empty hand. SSC." },
  { name: "Cybergun (Heavy Pistol)", location: "bodyware", ess: 0, cost: 800, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "A heavy pistol built into a limb — serious stopping power that never shows on a scanner's silhouette. SSC." },
  { name: "Cybergun (Submachine Gun)", location: "bodyware", ess: 0, cost: 1800, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "An implanted submachine gun — the body becomes the weapon, and the surprise. SSC." },
  { name: "Cybergun (Shotgun)", location: "bodyware", ess: 0, cost: 1200, avail: "8/7 days", index: 2, legality: "Forbidden", notes: "An implanted shotgun — devastating at the point-blank ranges where it's deployed. SSC." },
  // --- BODYWARE: Skill Hardwires ---
  { name: "Skill Hardwire (Rating 1–4)", location: "bodyware", ess: 0.2, rating: 1, cost: 5000, avail: "6/10 days", index: 1, legality: "Restricted", notes: "Burns an active skill straight into the nervous system — instant competence, no practice required (Levels 1–4). Essence = Level × 0.2, cost = Level × 5,000¥ (per-level multiplier shown). SSC." },
  { name: "Skill Hardwire (Rating 5–8)", location: "bodyware", ess: 0.25, rating: 5, cost: 50000, avail: "12/14 days", index: 1.5, legality: "Restricted", notes: "Higher-grade hardwired skill, pushing into expert territory (Levels 5–8). Essence = Level × 0.25, cost = Level × 50,000¥ (per-level multiplier shown). SSC." },
  { name: "Skill Hardwire (Rating 9–10)", location: "bodyware", ess: 0.3, rating: 9, cost: 500000, avail: "12/14 days", index: 1.5, legality: "Restricted", notes: "Master-grade hardwired skill — flawless, hard-wired expertise at a staggering price (Levels 9–10). Essence = Level × 0.3, cost = Level × 500,000¥ (per-level multiplier shown). SSC." },
  // --- BODYWARE: Boosted Reflexes ---
  { name: "Boosted Reflexes 1", location: "bodyware", ess: 0.5, cost: 15000, avail: "3/24 hrs", index: 1, legality: "Restricted", notes: "A budget reaction booster — not as smooth as wired reflexes, but a fraction of the price and essence. Level 1. SSC.", mods: { reaction: 1 } },
  { name: "Boosted Reflexes 2", location: "bodyware", ess: 1.25, cost: 40000, avail: "3/24 hrs", index: 1.25, legality: "Restricted", notes: "Reaction-boosting bodyware, level 2 — the wired runner's affordable edge. SSC.", mods: { reaction: 2 } },
  { name: "Boosted Reflexes 3", location: "bodyware", ess: 2.8, cost: 90000, avail: "3/24 hrs", index: 1.5, legality: "Restricted", notes: "Top-grade boosted reflexes, level 3 — fast and cheap, but the essence cost bites hard. SSC.", mods: { reaction: 3 } }
];

let n = 0;
for (const c of CYBER) {
  const safe = c.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(c.name)}.json`, JSON.stringify(cyber(c), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} cyberware items`);
