/**
 * All the electricity math lives here as small pure functions
 * (same input → same output, no side effects), so it is easy to unit test.
 *
 * Core formula:
 *   kWh per month = watts × quantity × hours per day × days per month ÷ 1000
 *   cost          = kWh × rate (₱ per kWh)
 */
import type { Appliance, MeterReading } from '../types'

/** Monthly energy use of one appliance entry, in kWh. */
export function monthlyKwh(a: Appliance): number {
  const kwh = (a.watts * a.quantity * a.hoursPerDay * a.daysPerMonth) / 1000
  return Math.max(0, kwh)
}

/** Monthly cost of one appliance entry, in pesos. */
export function monthlyCost(a: Appliance, rate: number): number {
  return monthlyKwh(a) * rate
}

export interface BreakdownItem {
  appliance: Appliance
  kwh: number
  cost: number
  /** Share of the total bill, 0..1. */
  share: number
}

/** Every appliance with its kWh, cost and share of the total, biggest first. */
export function breakdown(appliances: Appliance[], rate: number): BreakdownItem[] {
  const total = totalKwh(appliances)
  return appliances
    .map((appliance) => {
      const kwh = monthlyKwh(appliance)
      return { appliance, kwh, cost: kwh * rate, share: total > 0 ? kwh / total : 0 }
    })
    .sort((x, y) => y.kwh - x.kwh)
}

export function totalKwh(appliances: Appliance[]): number {
  return appliances.reduce((sum, a) => sum + monthlyKwh(a), 0)
}

export function totalCost(appliances: Appliance[], rate: number): number {
  return totalKwh(appliances) * rate
}

/** How much one appliance saves per month if used `hours` fewer hours per day. */
export function savingsIfReduced(a: Appliance, hours: number, rate: number): number {
  const cut = Math.min(hours, a.hoursPerDay)
  return ((a.watts * a.quantity * cut * a.daysPerMonth) / 1000) * rate
}

/* ------------------------------------------------------------------ */
/* Meter readings                                                      */
/* ------------------------------------------------------------------ */

export interface ReadingPeriod {
  from: MeterReading
  to: MeterReading
  days: number
  kwh: number
  cost: number
  /** kWh per day in this period. */
  dailyKwh: number
}

const DAY_MS = 24 * 60 * 60 * 1000

/** Whole days between two ISO dates. */
export function daysBetween(fromIso: string, toIso: string): number {
  const a = Date.parse(fromIso + 'T00:00:00Z')
  const b = Date.parse(toIso + 'T00:00:00Z')
  return Math.round((b - a) / DAY_MS)
}

/** Readings sorted from oldest to newest. */
export function sortReadings(readings: MeterReading[]): MeterReading[] {
  return [...readings].sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Turns consecutive meter readings into usage periods.
 * Example: 1000 kWh on Oct 1 and 1180 kWh on Nov 1 → 180 kWh used in 31 days.
 * Periods with zero days or a lower reading (typo, meter replaced) are skipped.
 */
export function readingPeriods(readings: MeterReading[], rate: number): ReadingPeriod[] {
  const sorted = sortReadings(readings)
  const periods: ReadingPeriod[] = []
  for (let i = 1; i < sorted.length; i++) {
    const from = sorted[i - 1]
    const to = sorted[i]
    const days = daysBetween(from.date, to.date)
    const kwh = to.reading - from.reading
    if (days <= 0 || kwh < 0) continue
    periods.push({ from, to, days, kwh, cost: kwh * rate, dailyKwh: kwh / days })
  }
  return periods
}

/** Projects a 30-day bill from the most recent period's daily average. */
export function projectedMonthlyFromReadings(readings: MeterReading[], rate: number) {
  const periods = readingPeriods(readings, rate)
  if (periods.length === 0) return null
  const last = periods[periods.length - 1]
  const kwh = last.dailyKwh * 30
  return { kwh, cost: kwh * rate, basedOn: last }
}

/* ------------------------------------------------------------------ */
/* Budget                                                              */
/* ------------------------------------------------------------------ */

export type BudgetStatus = 'none' | 'ok' | 'warning' | 'over'

/** "warning" from 85% of the budget, "over" above 100%. */
export function budgetStatus(cost: number, budget: number): BudgetStatus {
  if (budget <= 0) return 'none'
  const ratio = cost / budget
  if (ratio > 1) return 'over'
  if (ratio >= 0.85) return 'warning'
  return 'ok'
}
