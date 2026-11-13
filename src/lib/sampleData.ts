/**
 * A realistic demo household, shown on the first visit so the app is never
 * empty. One click on "Start fresh" clears it.
 */
import type { AppData } from '../types'
import { DEFAULT_RATE } from './presets'

/** ISO date `daysAgo` days before today. */
function isoDaysAgo(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function sampleData(): AppData {
  return {
    isSample: true,
    settings: { ratePerKwh: DEFAULT_RATE.rate, rateSource: DEFAULT_RATE.id, monthlyBudget: 2500 },
    appliances: [
      { id: 's1', name: 'Aircon (1.0 HP, inverter)', watts: 600, quantity: 1, hoursPerDay: 6, daysPerMonth: 30 },
      { id: 's2', name: 'Refrigerator', watts: 50, quantity: 1, hoursPerDay: 24, daysPerMonth: 30 },
      { id: 's3', name: 'Electric fan', watts: 50, quantity: 3, hoursPerDay: 10, daysPerMonth: 30 },
      { id: 's4', name: 'LED TV (32")', watts: 50, quantity: 1, hoursPerDay: 5, daysPerMonth: 30 },
      { id: 's5', name: 'Rice cooker', watts: 600, quantity: 1, hoursPerDay: 1, daysPerMonth: 30 },
      { id: 's6', name: 'Flat iron', watts: 1000, quantity: 1, hoursPerDay: 0.5, daysPerMonth: 12 },
      { id: 's7', name: 'LED bulb', watts: 9, quantity: 6, hoursPerDay: 6, daysPerMonth: 30 },
      { id: 's8', name: 'Phone charger', watts: 10, quantity: 4, hoursPerDay: 3, daysPerMonth: 30 },
      { id: 's9', name: 'Wi-Fi router', watts: 10, quantity: 1, hoursPerDay: 24, daysPerMonth: 30 },
    ],
    readings: [
      { id: 'r1', date: isoDaysAgo(150), reading: 10240 },
      { id: 'r2', date: isoDaysAgo(120), reading: 10418 },
      { id: 'r3', date: isoDaysAgo(90), reading: 10612 },
      { id: 'r4', date: isoDaysAgo(60), reading: 10821 },
      { id: 'r5', date: isoDaysAgo(30), reading: 11015 },
      { id: 'r6', date: isoDaysAgo(2), reading: 11208 },
    ],
  }
}

/** An empty household with the user's current settings kept. */
export function emptyData(settings: AppData['settings']): AppData {
  return { isSample: false, settings, appliances: [], readings: [] }
}
