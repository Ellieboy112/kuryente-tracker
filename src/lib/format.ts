/** Display helpers so numbers look the same everywhere. */

const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pesoWhole = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })
const num = new Intl.NumberFormat('en-PH', { maximumFractionDigits: 1 })

/** ₱1,234.50 */
export const formatPeso = (n: number) => peso.format(n)
/** ₱1,235 */
export const formatPesoWhole = (n: number) => pesoWhole.format(n)
/** 123.4 kWh */
export const formatKwh = (n: number) => `${num.format(n)} kWh`
export const formatNumber = (n: number) => num.format(n)

/** "Nov 13, 2026" */
export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Today's date as "YYYY-MM-DD" in the user's own time zone. */
export function todayIso(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Short random id for list items. */
export const newId = () => Math.random().toString(36).slice(2, 10)
