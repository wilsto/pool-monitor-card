import type { SensorsRegistry } from './ha/types.js';

export const POOL_SENSORS: SensorsRegistry = {
  // --- Essential Water Chemistry ---
  // Water temperature. The delivered scale runs setpoint +/- 2 x step, so 25 to
  // 29 °C.
  //
  //   27 °C - OURS. No standard was opened for this figure. The published page
  //           announced 26 to 28 °C instead, a range this scale never paints
  //           for anyone (#156).
  //    1 °C - OURS. It is what places the scale on 25 to 29 °C.
  temperature: {
    name: 'Temperature',
    unit: '°C',
    setpoint: 27,
    step: 1,
    mode: 'heatflow',
    category: 'water_chemistry',
  },
  // pH. The delivered scale runs setpoint +/- 2 x step, so 6.8 to 7.6.
  //
  //   7.2 pH - OURS. It sits inside the published requirement, but no document
  //            read here puts a target on this particular figure.
  //   0.2 pH - OURS. It is what places the scale on 6.8 to 7.6, which stays
  //            inside the 6.5 to 7.8 that DIN 19643 requires of pool basin
  //            water. That requirement is the published part; the narrower
  //            scale drawn inside it is ours.
  //
  // DIN 19643 parameter table for pool and bathing water, Landesamt fuer
  // Gesundheit und Soziales Mecklenburg-Vorpommern, dated 2024-01-26:
  // https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605
  ph: {
    name: 'pH',
    unit: 'pH',
    setpoint: 7.2,
    step: 0.2,
    mode: 'centric',
    min_limit: 0,
    category: 'water_chemistry',
  },
  // Oxidation reduction potential. The delivered scale runs setpoint +/- 2 x
  // step, so 600 to 800 mV.
  //
  //   700 mV - taken as published: DIN 19643 sets a minimum redox voltage for
  //            pool basin water, given in the official parameter table as 700
  //            mV at the lower end and 770 mV at the upper, the applicable one
  //            depending on pH and on the type of water.
  //    50 mV - OURS. It is what places the scale on 600 to 800 mV, and no
  //            document read here puts a boundary on either end.
  //
  // DIN 19643 parameter table for pool and bathing water, Landesamt fuer
  // Gesundheit und Soziales Mecklenburg-Vorpommern, dated 2024-01-26:
  // https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605
  orp: {
    name: 'ORP',
    unit: 'mV',
    setpoint: 700,
    step: 50,
    mode: 'centric',
    min_limit: 0,
    category: 'water_chemistry',
  },
  // Total dissolved solids, and the one preset here whose UNIT is the trap. The
  // delivered scale runs setpoint +/- 2 x step, so 4 to 6 g/L. 1 g/L is 1000
  // ppm, so that is 4000 to 6000 ppm of the very same water.
  //
  // The card never converts. `unit` is a label printed next to the value
  // (card-base.ts, `newData.unit`), and the band comparison is done on the raw
  // entity state, so a probe reporting 4500 ppm left on this scale is painted
  // Too High while its water sits in the middle of the shipped range.
  //
  //   5 g/L - OURS. Nothing in this repository records where it came from, and
  //           the published page carried "Saltwater pools: 3000-5000 ppm"
  //           underneath it, which is neither this range nor this unit. A
  //           reader who set their card from that sentence was out by a factor
  //           of a thousand (#156).
  //   0.5 g/L - OURS. It is what places the scale on 4 to 6 g/L.
  //
  // The value is left where it is, for the reason the free chlorine decision of
  // 2026-08-24 gives: moving a default moves the scale of everyone who
  // configured nothing. What changed is that the page now says which unit it
  // ships in, and hands a ppm probe the two lines to write (`setpoint: 5000`,
  // `step: 500`). The test executes that recipe rather than trusting it.
  tds: {
    name: 'TDS',
    unit: 'g/L',
    setpoint: 5,
    step: 0.5,
    mode: 'centric',
    min_limit: 0,
    category: 'water_chemistry',
  },
  // Electrical conductivity. The delivered scale runs setpoint +/- 2 x step, so
  // 3600 to 4400 µS/cm.
  //
  //   4000 µS/cm - OURS. No standard was opened for this figure. The published
  //                page announced 3800 to 4200 µS/cm instead, a range this
  //                scale never paints for anyone (#156).
  //    200 µS/cm - OURS. It is what places the scale on 3600 to 4400 µS/cm.
  ec: {
    name: 'Electrical Conductivity',
    unit: 'µS/cm',
    setpoint: 4000,
    step: 200,
    mode: 'centric',
    min_limit: 0,
    category: 'water_chemistry',
  },

  // --- Chemical Balance ---
  // Salinity. The delivered scale runs setpoint +/- 2 x step, so 2000 to 4000
  // ppm.
  //
  //   3000 ppm - OURS. No standard was opened for this figure. The published
  //              page announced 2500 to 3500 ppm instead, a range this scale
  //              never paints for anyone (#156).
  //    500 ppm - OURS. It is what places the scale on 2000 to 4000 ppm.
  salinity: {
    name: 'Salinity',
    unit: 'ppm',
    setpoint: 3000,
    step: 500,
    mode: 'centric',
    min_limit: 0,
    category: 'chemical_balance',
  },
  // Cyanuric acid. The delivered scale runs setpoint +/- 2 x step, so 20 to 60
  // ppm. This preset is not only a value, it is the thing that decides what a
  // chlorine reading means: the US Model Aquatic Health Code doubles its own
  // free chlorine minimum, from 1.0 to 2.0 ppm, as soon as cyanuric acid is
  // present. A chlorine number cannot be judged without knowing whether the
  // pool is stabilised.
  //
  //   40 ppm - OURS. The doubling above is published, this figure is not: no
  //            document read here puts a target on it.
  //   10 ppm - OURS.
  //
  // MAHC 5.7.3.1.1.2.1, venues not using cyanuric acid, minimum 1.0 ppm:
  // https://cmahc.org/mahc_sections/1723
  // MAHC 5.7.3.1.1.2.2, venues using cyanuric acid, minimum 2.0 ppm:
  // https://cmahc.org/mahc_sections/1724
  cya: {
    name: 'Cyanuric Acid',
    unit: 'ppm',
    setpoint: 40,
    step: 10,
    mode: 'centric',
    min_limit: 0,
    category: 'chemical_balance',
  },
  // Calcium hardness. The delivered scale runs setpoint +/- 2 x step, so 100 to
  // 500 ppm.
  //
  //   300 ppm - OURS. No standard was opened for this figure. The published
  //             page announced 200 to 400 ppm instead, a range this scale never
  //             paints for anyone (#156).
  //   100 ppm - OURS. It is what places the scale on 100 to 500 ppm.
  calcium: {
    name: 'Calcium',
    unit: 'ppm',
    setpoint: 300,
    step: 100,
    mode: 'centric',
    min_limit: 0,
    category: 'chemical_balance',
  },
  // Phosphate. The delivered scale runs setpoint +/- 2 x step, so 30 to 70 ppb.
  // It is a band centred on a value, not a ceiling, which is what made the old
  // page sentence unusable rather than merely imprecise.
  //
  //   50 ppb - OURS. No standard was opened for this figure. The published page
  //            said to keep phosphate below 200 to 300 ppb, which is above
  //            everything this scale paints: a reading the sentence calls fine
  //            comes out Too High on the card (#156).
  //   10 ppb - OURS. It is what places the scale on 30 to 70 ppb.
  phosphate: {
    name: 'Phosphate',
    unit: 'ppb',
    setpoint: 50,
    step: 10,
    mode: 'centric',
    min_limit: 0,
    category: 'chemical_balance',
  },
  // Total alkalinity. The delivered scale runs setpoint +/- 2 x step, so 60 to
  // 140 ppm.
  //
  //   100 ppm - OURS. No standard was opened for this figure. The published
  //             page announced 80 to 120 ppm instead, a range this scale never
  //             paints for anyone (#156).
  //    20 ppm - OURS. It is what places the scale on 60 to 140 ppm.
  alkalinity: {
    name: 'Alkalinity',
    unit: 'ppm',
    setpoint: 100,
    step: 20,
    mode: 'centric',
    min_limit: 0,
    category: 'chemical_balance',
  },

  // --- Treatment & Sanitization ---
  // Free chlorine. THIS SETPOINT IS A NATIONAL CONVENTION, NOT A UNIVERSAL
  // TARGET. The delivered scale runs setpoint +/- 2 x step, so 2.0 to 4.0 ppm.
  // 1 ppm is 1 mg/l in dilute aqueous solution, so a German controller reading
  // 0.50 mg/l is on this very axis and not in some other unit: what disagrees
  // is the convention, not the measurement.
  //
  //   3 ppm - OURS. Nothing in this repository records where it came from. It
  //           arrived with the first commit, 19a1b08, with no rationale, and
  //           the published page carried it for eighteen months with no source
  //           next to it, which is how a reader came to assume it had one. It
  //           is at or above every American minimum quoted below, and five to
  //           ten times the German requirement.
  //   0.5 ppm - OURS. It is what places the scale on 2.0 to 4.0 ppm.
  //
  // The two conventions, both quoted rather than summarised:
  //
  //   United States. The Model Aquatic Health Code publishes minimums, not
  //   targets: 1.0 ppm for a venue not using cyanuric acid (5.7.3.1.1.2.1),
  //   2.0 ppm for a venue using it (5.7.3.1.1.2.2), 3.0 ppm for a spa
  //   (5.7.3.1.1.2.3).
  //   https://cmahc.org/mahc_sections/1723
  //   https://cmahc.org/mahc_sections/1724
  //   https://cmahc.org/mahc_sections/1725
  //
  //   Germany. DIN 19643 requires 0.3 to 0.6 mg/l of free chlorine in the pool
  //   basin water, and 0.7 to 1.0 mg/l in a warm bubble pool, capped at 1.2.
  //   https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605
  //   The standard is what German law points at when it requires bathing water
  //   to meet the generally recognised rules of technology:
  //   https://www.bundesgesundheitsministerium.de/service/begriffe-von-a-z/s/schwimm-und-badebeckenwasser
  //
  //   Why they differ is an INFERENCE drawn from those two documents, not a
  //   sentence either of them writes: DIN 19643 water is treated continuously
  //   through a mandated chain before it is chlorinated and its combined
  //   chlorine is held at or below 0.2 mg/l, so a small residual suffices,
  //   while the American minimums cover venues that may be stabilised with
  //   cyanuric acid, which is why the same code doubles its own minimum when it
  //   is present.
  //
  // Reported by @SebastianM, whose German controller reads 0.50 mg/l and is
  // painted Too Low by this scale: https://community.home-assistant.io/t/572179/58
  free_chlorine: {
    name: 'Free Chlorine',
    unit: 'ppm',
    setpoint: 3,
    step: 0.5,
    mode: 'centric',
    min_limit: 0,
    category: 'treatment',
  },
  // Total chlorine, which is free plus combined. It therefore inherits the
  // convention problem of free chlorine above, and adds one of its own: on its
  // own this reading carries no published meaning, because what a standard
  // bounds is the difference between total and free.
  //
  //   3 ppm - OURS, and for the same reason as free chlorine: no source is
  //           recorded for it anywhere in this repository.
  //   0.5 ppm - OURS.
  //
  // What is published is the difference: DIN 19643 requires combined chlorine
  // in the basin water to stay at or below 0.2 mg/l.
  // https://www.lagus.mv-regierung.de/serviceassistent/download?id=1666605
  total_chlorine: {
    name: 'Total Chlorine',
    unit: 'ppm',
    setpoint: 3,
    step: 0.5,
    mode: 'centric',
    min_limit: 0,
    category: 'treatment',
  },
  // Bromine, the sanitiser used instead of chlorine, most often in hot tubs.
  // The delivered scale runs setpoint +/- 2 x step, so 2 to 6 ppm.
  //
  //   4 ppm - OURS. No standard was opened for this figure during the change
  //           that wrote these provenance blocks, so it is a choice and must
  //           not be read as a quotation. Saying so is the point: the failure
  //           this file guards against is a number that looks quoted.
  //   1 ppm - OURS.
  bromine: {
    name: 'Bromine',
    unit: 'ppm',
    setpoint: 4,
    step: 1,
    mode: 'centric',
    min_limit: 0,
    category: 'treatment',
  },
  // Equipment, not water: both numbers are ours (#156). Filter pressure depends
  // on the filter and the plumbing. What matters is the rise above the
  // clean-filter reading, which the page explains.
  //
  //   12 psi - OURS. No document was opened for it.
  //   2 psi - OURS. It sets how far from the setpoint a reading turns.
  pressure: {
    name: 'Filter Pressure',
    unit: 'psi',
    setpoint: 12,
    step: 2,
    mode: 'centric',
    category: 'treatment',
  },
  // Moved by #172 (PO decision, 2026-10-17). The old 1.1 with a step of 0.2
  // painted 0.7 to 1.5 and read fresh water and sea water alike as Ideal.
  //
  //   1.002 sg - taken as published. NaCl at 0.5 % (5 g/L) is 1.0018 g/cm3
  //              against 0.99984 for pure water, a relative density of 1.002
  //              (https://en.wikipedia.org/wiki/Saline_water, table "Properties
  //              of water-NaCl mixtures"). Each g/L of salt adds about 0.0004.
  //   0.001 sg - OURS. It keeps roughly 2.5 to 7.5 g/L Ideal, which holds both
  //              the salinity preset's 3000 ppm (1.0012) and the tds preset's
  //              5 g/L, and puts fresh water at the edge of the scale.
  specific_gravity: {
    name: 'Specific Gravity',
    unit: 'sg',
    setpoint: 1.002,
    step: 0.001,
    mode: 'centric',
    category: 'treatment',
  },
  magnesium: {
    name: 'Magnesium',
    unit: 'ppm',
    setpoint: 1200,
    step: 100,
    mode: 'centric',
    min_limit: 0,
    category: 'treatment',
  },
  // Equipment, not water: both numbers are ours (#156). A salt chlorinator's
  // output share depends on the cell, the pool volume and the season, so the
  // right figure is the one the installation settles on.
  //
  //   50 % - OURS. No document was opened for it.
  //   10 % - OURS. It sets how far from the setpoint a reading turns.
  chlorinator: {
    name: 'Chlorinator',
    unit: '%',
    setpoint: 50,
    step: 10,
    mode: 'heatflow',
    min_limit: 0,
    category: 'treatment',
  },

  // --- Equipment & Maintenance ---
  // Equipment, not water: both numbers are ours (#156). What 100 % means is set
  // by the level sensor's own calibration.
  //
  //   100 % - OURS. No document was opened for it.
  //   10 % - OURS. It sets how far from the setpoint a reading turns.
  water_level: {
    name: 'Water Level',
    unit: '%',
    setpoint: 100,
    step: 10,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },
  // Equipment, not water: both numbers are ours (#156). Flow is a property of
  // the pump and the plumbing, so the right value is the one on the
  // installation's own pump curve.
  //
  //   10 m³/h - OURS. No document was opened for it.
  //   1 m³/h - OURS. It sets how far from the setpoint a reading turns.
  flow_rate: {
    name: 'Flow Rate',
    unit: 'm³/h',
    setpoint: 10,
    step: 1,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },
  // Equipment, not water: both numbers are ours (#156). The useful UV intensity
  // depends on the steriliser model and its lamp; the maker's figure is the one
  // to use.
  //
  //   4 mW/cm² - OURS. No document was opened for it.
  //   1 mW/cm² - OURS. It sets how far from the setpoint a reading turns.
  uv_radiation: {
    name: 'UV Radiation',
    unit: 'mW/cm²',
    setpoint: 4,
    step: 1,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },
  // Equipment, not water: both numbers are ours (#156). The amount left in a
  // dosing container depends on the container the installation uses.
  //
  //   20 L - OURS. No document was opened for it.
  //   5 L - OURS. It sets how far from the setpoint a reading turns.
  product_volume: {
    name: 'Product Volume',
    unit: 'L',
    setpoint: 20,
    step: 5,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },
  // Equipment, not water: both numbers are ours (#156). The amount left in a bag
  // or drum depends on the container the installation uses.
  //
  //   25 kg - OURS. No document was opened for it.
  //   5 kg - OURS. It sets how far from the setpoint a reading turns.
  product_weight: {
    name: 'Product Weight',
    unit: 'kg',
    setpoint: 25,
    step: 5,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },

  // Equipment, not water: both numbers are ours (#156). A variable speed pump is
  // set for the pool it serves; there is no universal speed.
  //
  //   50 % - OURS. No document was opened for it.
  //   10 % - OURS. It sets how far from the setpoint a reading turns.
  pump_speed: {
    name: 'Pump Speed',
    unit: '%',
    setpoint: 50,
    step: 10,
    mode: 'heatflow',
    min_limit: 0,
    category: 'equipment',
  },
  // Equipment, not water: both numbers are ours (#156). Brightness is a
  // preference, with no right or wrong reading.
  //
  //   80 % - OURS. No document was opened for it.
  //   10 % - OURS. It sets how far from the setpoint a reading turns.
  light_brightness: {
    name: 'Light Brightness',
    unit: '%',
    setpoint: 80,
    step: 10,
    mode: 'heatflow',
    min_limit: 0,
    category: 'equipment',
  },
  // Equipment, not water: both numbers are ours (#156). A heat pump setpoint is
  // a comfort choice the owner makes, not a water quality limit.
  //
  //   28 °C - OURS. No document was opened for it.
  //   1 °C - OURS. It sets how far from the setpoint a reading turns.
  heat_pump_setpoint: {
    name: 'Heat Pump Setpoint',
    unit: '°C',
    setpoint: 28,
    step: 1,
    mode: 'centric',
    min_limit: 10,
    category: 'equipment',
  },
  // Indoor pools: humidity drives condensation and structural damage.
  // Requested in pool-monitor-card#87, where the only workaround was to
  // repurpose the water-level sensor.
  // Equipment, not water: both numbers are ours (#156). Indoor pool hall
  // humidity targets vary by design guide and climate; none was opened for this
  // figure.
  //
  //   60 % - OURS. No document was opened for it.
  //   10 % - OURS. It sets how far from the setpoint a reading turns.
  humidity: {
    name: 'Humidity',
    unit: '%',
    // No artwork for this preset: without an explicit icon the card looks
    // for humidity.png and renders a broken image.
    icon: 'mdi:water-percent',
    setpoint: 60,
    step: 10,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },

  // Requested in pool-monitor-card#91: daily filtration runtime and pump energy.
  // Equipment, not water: both numbers are ours (#156). Daily runtime is set by
  // pool volume and pump flow, commonly sized to turn the water over once or
  // twice a day; no single figure fits every pool.
  //
  //   8 h - OURS. No document was opened for it.
  //   2 h - OURS. It sets how far from the setpoint a reading turns.
  filtration_time: {
    name: 'Filtration Time',
    unit: 'h',
    // No artwork for this preset: without an explicit icon the card looks
    // for filtration_time.png and renders a broken image.
    icon: 'mdi:timer-outline',
    setpoint: 8,
    step: 2,
    mode: 'centric',
    min_limit: 0,
    category: 'equipment',
  },

  // Equipment, not water: both numbers are ours (#156). Daily pump energy
  // follows pump size and runtime, so it can only be compared with the
  // installation's own history.
  //
  //   5 kWh - OURS. No document was opened for it.
  //   2 kWh - OURS. It sets how far from the setpoint a reading turns.
  pump_energy: {
    name: 'Pump Energy',
    unit: 'kWh',
    // No artwork for this preset: without an explicit icon the card looks
    // for pump_energy.png and renders a broken image.
    icon: 'mdi:lightning-bolt',
    setpoint: 5,
    step: 2,
    mode: 'heatflow',
    min_limit: 0,
    category: 'equipment',
  },
};
