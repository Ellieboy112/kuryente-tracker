/** Shared data shapes for the whole app. Everything here is saved in localStorage. */

/** One appliance (or a group of identical ones) in the household. */
export interface Appliance {
  id: string
  name: string
  /** Power draw in watts while running (check the label on the appliance). */
  watts: number
  /** How many of this appliance the household has. */
  quantity: number
  /** Average hours it is ON per day. */
  hoursPerDay: number
  /** How many days per month it is used. */
  daysPerMonth: number
}

/** One reading of the electric meter (the kWh number on the meter). */
export interface MeterReading {
  id: string
  /** ISO date, e.g. "2026-11-13". */
  date: string
  /** Meter value in kWh. Always goes up over time. */
  reading: number
}

/** User settings. */
export interface Settings {
  /** Electricity rate in pesos per kWh (all-in, from the bill). */
  ratePerKwh: number
  /** Which preset the rate came from, or "custom". */
  rateSource: string
  /** Monthly budget in pesos. 0 means "no budget set". */
  monthlyBudget: number
}

/** Everything the app stores. */
export interface AppData {
  appliances: Appliance[]
  readings: MeterReading[]
  settings: Settings
  /** True while the household is the built-in demo data. */
  isSample: boolean
}
