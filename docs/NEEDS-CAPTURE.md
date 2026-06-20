# Entries needing a high-res capture

Values I could not read confidently off the scanned PDF and had to leave as a
placeholder (usually `0`) or a best guess. When a physical-book capture is
available, fix these and remove them from the list.

Format: **pack / item — field** — what's wrong, what I used as a placeholder.

## Open

- **ssc-armor / Riot Shield, Small — impact** — pg-104 CLOTHING AND ARMOR row;
  the Impact cell is blank/illegible in the scan (Ballistic reads 1). Placeholder:
  impact `1` (noted in item). Could be 0 or higher.

- **ssc-vehicles / Suzuki Aurora, Honda Viking — acceleration** — the catalog's
  vehicle stat block (pg-042/043) lists Handling, Speed, Body, Armor, Signature,
  Pilot, and Cost, but **no acceleration** column. Stored as `0`. If acceleration
  appears elsewhere in the catalog (or you want to assign it), update both.
  (Also: their token art is a placeholder icon — swap for real vehicle art.)

## To verify (readable but unusual notation)

- **ssc-armor / Light/Medium/Heavy Security Armor — weight** — pg-104 lists the
  weight as "9 + Body" / "11 + Body" / "13 + Body". Stored the base number (9/11/13)
  with the "+ Body" qualifier in notes; confirm that's the intended reading.

## Resolved

- ssc-weapons / Panther Assault Cannon — cost — pg-103 showed only ",200¥";
  confirmed **7,200¥** from the body entry on pg-055.
- ssc-weapons / Steyr AUG-CSL LMG — weight — body-entry capture: **5.5**.
- ssc-weapons / GE Vindicator Minigun — weight — body-entry capture: **15**.
  Same capture also corrected the **cost: 12,500¥** (the pg-103 summary scan had
  dropped the leading "1", reading as 2,500¥ — same failure as the Panther).
- ssc-weapons / Steyr AUG-CSL — the body entry lists a 4th config (**SMG**, 6M,
  conceal 4, 3.5 kg), now added; and gives the **Assault config conceal as 4**
  (the pg-103 summary read 2) — adopted the body-entry value.
