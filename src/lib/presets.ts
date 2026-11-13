/**
 * Built-in reference data: common Filipino household appliances and
 * electricity rates of Pangasinan distribution utilities.
 */

export interface AppliancePreset {
  name: string
  watts: number
  hoursPerDay: number
  icon: string
  note?: string
}

/** Typical wattages. Users should still check the label on their own appliance. */
export const APPLIANCE_PRESETS: AppliancePreset[] = [
  { name: 'Aircon (1.0 HP, non-inverter)', watts: 900, hoursPerDay: 8, icon: '❄️' },
  { name: 'Aircon (1.0 HP, inverter)', watts: 600, hoursPerDay: 8, icon: '❄️', note: 'Average draw once the room is cool' },
  { name: 'Refrigerator', watts: 50, hoursPerDay: 24, icon: '🧊', note: 'Average draw; the compressor cycles on and off' },
  { name: 'Electric fan', watts: 50, hoursPerDay: 10, icon: '🌀' },
  { name: 'LED TV (32")', watts: 50, hoursPerDay: 5, icon: '📺' },
  { name: 'Rice cooker', watts: 600, hoursPerDay: 1, icon: '🍚' },
  { name: 'Electric kettle', watts: 1500, hoursPerDay: 0.25, icon: '☕' },
  { name: 'Flat iron', watts: 1000, hoursPerDay: 0.5, icon: '👕' },
  { name: 'Washing machine', watts: 400, hoursPerDay: 1, icon: '🧺' },
  { name: 'Water dispenser (hot & cold)', watts: 100, hoursPerDay: 24, icon: '🚰', note: 'Average draw' },
  { name: 'Microwave oven', watts: 1000, hoursPerDay: 0.25, icon: '🍲' },
  { name: 'Desktop computer', watts: 200, hoursPerDay: 6, icon: '🖥️' },
  { name: 'Laptop', watts: 60, hoursPerDay: 6, icon: '💻' },
  { name: 'LED bulb', watts: 9, hoursPerDay: 6, icon: '💡' },
  { name: 'Phone charger', watts: 10, hoursPerDay: 3, icon: '🔌' },
  { name: 'Wi-Fi router', watts: 10, hoursPerDay: 24, icon: '📶' },
  { name: 'Hair dryer', watts: 1200, hoursPerDay: 0.2, icon: '💨' },
  { name: 'Water pump', watts: 750, hoursPerDay: 1, icon: '💧' },
]

export interface RatePreset {
  id: string
  label: string
  /** All-in residential rate in ₱/kWh. */
  rate: number
  asOf: string
}

/**
 * Residential rates (₱/kWh) as of October 2026, from tipidkuryente.ph.
 * Rates change every month, so the user can always type the rate from their own bill.
 */
export const RATE_PRESETS: RatePreset[] = [
  { id: 'panelco1', label: 'PANELCO I', rate: 11.61, asOf: 'Oct 2026' },
  { id: 'panelco3', label: 'PANELCO III', rate: 13.03, asOf: 'Oct 2026' },
  { id: 'cenpelco', label: 'CENPELCO', rate: 12.33, asOf: 'Oct 2026' },
  { id: 'decorp', label: 'DECORP (Dagupan)', rate: 11.35, asOf: 'Oct 2026' },
]

export const DEFAULT_RATE = RATE_PRESETS[0]

/** Finds the emoji for an appliance name, falling back to a plug. */
export function iconFor(name: string): string {
  const lower = name.toLowerCase()
  const hit = APPLIANCE_PRESETS.find((p) => lower.includes(p.name.split(' (')[0].toLowerCase()))
  if (hit) return hit.icon
  if (lower.includes('aircon')) return '❄️'
  if (lower.includes('fan')) return '🌀'
  if (lower.includes('light') || lower.includes('bulb')) return '💡'
  return '🔌'
}
