/** Form helpers for adding/editing an appliance (kept separate so they can be unit tested). */
import type { Appliance } from '../types'

/** Form values are strings so the user can clear an input while typing. */
export interface FormState {
  name: string
  watts: string
  quantity: string
  hoursPerDay: string
  daysPerMonth: string
}

export const EMPTY: FormState = { name: '', watts: '', quantity: '1', hoursPerDay: '', daysPerMonth: '30' }

export function toForm(a: Appliance): FormState {
  return {
    name: a.name,
    watts: String(a.watts),
    quantity: String(a.quantity),
    hoursPerDay: String(a.hoursPerDay),
    daysPerMonth: String(a.daysPerMonth),
  }
}

/** Returns an error message for the first invalid field, or null when valid. */
export function validate(f: FormState): string | null {
  if (!f.name.trim()) return 'Enter a name for the appliance.'
  const watts = Number(f.watts)
  if (!(watts > 0) || watts > 20000) return 'Watts must be between 1 and 20,000.'
  const qty = Number(f.quantity)
  if (!Number.isInteger(qty) || qty < 1 || qty > 100) return 'Quantity must be a whole number from 1 to 100.'
  const hours = Number(f.hoursPerDay)
  if (!(hours >= 0) || hours > 24 || f.hoursPerDay === '') return 'Hours per day must be between 0 and 24.'
  const days = Number(f.daysPerMonth)
  if (!Number.isInteger(days) || days < 0 || days > 31) return 'Days per month must be a whole number from 0 to 31.'
  return null
}

