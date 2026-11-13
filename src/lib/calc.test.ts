import { describe, expect, it } from 'vitest'
import type { Appliance, MeterReading } from '../types'
import {
  breakdown,
  budgetStatus,
  daysBetween,
  monthlyCost,
  monthlyKwh,
  projectedMonthlyFromReadings,
  readingPeriods,
  savingsIfReduced,
  totalCost,
} from './calc'
import { personalTips } from './tips'
import { validate } from './applianceForm'

const aircon: Appliance = { id: 'a', name: 'Aircon', watts: 1000, quantity: 1, hoursPerDay: 8, daysPerMonth: 30 }
const fans: Appliance = { id: 'f', name: 'Electric fan', watts: 50, quantity: 2, hoursPerDay: 10, daysPerMonth: 30 }

describe('appliance math', () => {
  it('computes monthly kWh: watts × qty × hours × days ÷ 1000', () => {
    expect(monthlyKwh(aircon)).toBe(240) // 1000 × 8 × 30 / 1000
    expect(monthlyKwh(fans)).toBe(30) // 50 × 2 × 10 × 30 / 1000
  })

  it('computes cost at a given rate', () => {
    expect(monthlyCost(aircon, 10)).toBe(2400)
    expect(totalCost([aircon, fans], 10)).toBe(2700)
  })

  it('sorts the breakdown biggest first with shares that add up to 1', () => {
    const b = breakdown([fans, aircon], 10)
    expect(b[0].appliance.id).toBe('a')
    expect(b[0].share + b[1].share).toBeCloseTo(1)
    expect(b[0].share).toBeCloseTo(240 / 270)
  })

  it('handles an empty list', () => {
    expect(breakdown([], 10)).toEqual([])
    expect(totalCost([], 10)).toBe(0)
  })

  it('computes savings for using an appliance fewer hours, never more than it is used', () => {
    expect(savingsIfReduced(aircon, 1, 10)).toBe(300) // 1 kW × 1 h × 30 days × ₱10
    expect(savingsIfReduced({ ...aircon, hoursPerDay: 0.5 }, 1, 10)).toBe(150)
  })
})

describe('meter readings', () => {
  const readings: MeterReading[] = [
    { id: '2', date: '2026-11-01', reading: 1180 },
    { id: '1', date: '2026-10-01', reading: 1000 },
    { id: '3', date: '2026-11-11', reading: 1240 },
  ]

  it('counts days between dates', () => {
    expect(daysBetween('2026-10-01', '2026-11-01')).toBe(31)
  })

  it('turns readings into periods, sorted by date', () => {
    const p = readingPeriods(readings, 10)
    expect(p).toHaveLength(2)
    expect(p[0]).toMatchObject({ days: 31, kwh: 180, cost: 1800 })
    expect(p[1]).toMatchObject({ days: 10, kwh: 60 })
  })

  it('skips periods where the meter went down (typo or replaced meter)', () => {
    const bad: MeterReading[] = [
      { id: '1', date: '2026-10-01', reading: 1000 },
      { id: '2', date: '2026-10-15', reading: 900 },
    ]
    expect(readingPeriods(bad, 10)).toEqual([])
  })

  it('projects 30 days from the latest daily average', () => {
    const proj = projectedMonthlyFromReadings(readings, 10)
    expect(proj?.kwh).toBeCloseTo(180) // 6 kWh/day × 30
    expect(proj?.cost).toBeCloseTo(1800)
  })

  it('returns null when there are fewer than two readings', () => {
    expect(projectedMonthlyFromReadings([readings[0]], 10)).toBeNull()
  })
})

describe('budget', () => {
  it('classifies spending against the budget', () => {
    expect(budgetStatus(1000, 0)).toBe('none')
    expect(budgetStatus(1000, 2000)).toBe('ok')
    expect(budgetStatus(1800, 2000)).toBe('warning')
    expect(budgetStatus(2100, 2000)).toBe('over')
  })
})

describe('tips', () => {
  it('creates personal tips for the biggest consumers first', () => {
    const tips = personalTips([fans, aircon], 10)
    expect(tips[0].title).toContain('Aircon')
    expect(tips[0].title).toContain('89%')
    expect(tips[0].savings).toBe(300)
  })

  it('suggests a 10% habit saving for always-on appliances instead of fewer hours', () => {
    const fridge: Appliance = { id: 'r', name: 'Refrigerator', watts: 50, quantity: 1, hoursPerDay: 24, daysPerMonth: 30 }
    const [tip] = personalTips([fridge], 10)
    expect(tip.savings).toBeCloseTo(36) // 36 kWh × ₱10 × 10%
    expect(tip.body).not.toContain('1 hour less')
  })
})

describe('appliance form validation', () => {
  const ok = { name: 'Fan', watts: '50', quantity: '1', hoursPerDay: '8', daysPerMonth: '30' }
  it('accepts valid input', () => expect(validate(ok)).toBeNull())
  it('rejects bad values with a helpful message', () => {
    expect(validate({ ...ok, name: ' ' })).toMatch(/name/)
    expect(validate({ ...ok, watts: '0' })).toMatch(/Watts/)
    expect(validate({ ...ok, hoursPerDay: '25' })).toMatch(/Hours/)
    expect(validate({ ...ok, quantity: '1.5' })).toMatch(/Quantity/)
    expect(validate({ ...ok, daysPerMonth: '40' })).toMatch(/Days/)
  })
})
