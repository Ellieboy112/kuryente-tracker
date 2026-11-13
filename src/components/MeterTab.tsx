import { useState } from 'react'
import type { FormEvent } from 'react'
import type { MeterReading } from '../types'
import { projectedMonthlyFromReadings, readingPeriods, sortReadings } from '../lib/calc'
import { formatDate, formatKwh, formatNumber, formatPeso, newId, todayIso } from '../lib/format'

interface Props {
  readings: MeterReading[]
  rate: number
  onChange: (next: MeterReading[]) => void
}

/** Log meter readings and see real usage per period, a chart, and a 30-day projection. */
export function MeterTab({ readings, rate, onChange }: Props) {
  const [date, setDate] = useState(todayIso())
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const sorted = sortReadings(readings)
  const periods = readingPeriods(readings, rate)
  const projection = projectedMonthlyFromReadings(readings, rate)
  const maxDaily = Math.max(1, ...periods.map((p) => p.dailyKwh))

  function add(e: FormEvent) {
    e.preventDefault()
    const reading = Number(value)
    if (!date) return setError('Pick the date of the reading.')
    if (date > todayIso()) return setError('The date cannot be in the future.')
    if (value === '' || !(reading >= 0)) return setError('Enter the kWh number shown on your meter.')
    if (sorted.some((r) => r.date === date)) return setError('You already have a reading for this date. Delete it first to replace it.')
    // A meter only counts up: a newer reading must be higher than every older one.
    const before = sorted.filter((r) => r.date < date).at(-1)
    const after = sorted.find((r) => r.date > date)
    if (before && reading < before.reading) return setError(`This is lower than your ${formatDate(before.date)} reading (${formatNumber(before.reading)}). Meters only go up.`)
    if (after && reading > after.reading) return setError(`This is higher than your later ${formatDate(after.date)} reading (${formatNumber(after.reading)}).`)

    onChange([...readings, { id: newId(), date, reading }])
    setValue('')
    setError(null)
  }

  return (
    <div className="tab-grid">
      <div className="stack">
        <section className="card">
          <div className="card-head">
            <h3>Actual usage from your meter</h3>
            <span className="muted">cost uses {formatPeso(rate)}/kWh</span>
          </div>

          {periods.length === 0 ? (
            <p className="empty">Add at least two readings, e.g. today and again next week, to see how much electricity you really use.</p>
          ) : (
            <>
              {projection && (
                <div className="projection">
                  <div>
                    <p className="eyebrow">Projected for 30 days</p>
                    <p className="mid-number">{formatPeso(projection.cost)}</p>
                  </div>
                  <p className="muted">
                    Based on {formatNumber(projection.basedOn.dailyKwh)} kWh/day between {formatDate(projection.basedOn.from.date)} and{' '}
                    {formatDate(projection.basedOn.to.date)}.
                  </p>
                </div>
              )}

              {/* Bar chart: average kWh per day for each period, so periods of different lengths compare fairly. */}
              <div className="usage-chart" role="img" aria-label="Average daily usage for each period">
                {periods.map((p) => (
                  <div className="uc-col" key={p.to.id}>
                    <span className="uc-val">{formatNumber(p.dailyKwh)}</span>
                    <div className="uc-track">
                      <div className="uc-bar" style={{ height: `${(p.dailyKwh / maxDaily) * 100}%` }} title={`${formatKwh(p.kwh)} in ${p.days} days`} />
                    </div>
                    <span className="uc-label">{formatDate(p.to.date).replace(/, \d{4}$/, '')}</span>
                  </div>
                ))}
              </div>
              <p className="chart-caption muted">Average kWh per day for each period</p>

              <table className="table">
                <thead>
                  <tr><th>Period</th><th>Days</th><th>Used</th><th>Cost</th></tr>
                </thead>
                <tbody>
                  {[...periods].reverse().map((p) => (
                    <tr key={p.to.id}>
                      <td>{formatDate(p.from.date).replace(/, \d{4}$/, '')} – {formatDate(p.to.date)}</td>
                      <td>{p.days}</td>
                      <td>{formatKwh(p.kwh)}</td>
                      <td>{formatPeso(p.cost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </div>

      <div className="stack">
        <form className="card form" onSubmit={add} noValidate>
          <h3>Add a meter reading</h3>
          <p className="muted small">Read the number on your electric meter (in kWh). Weekly readings catch spikes early.</p>
          <label className="field">
            <span>Date</span>
            <input type="date" value={date} max={todayIso()} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="field">
            <span>Meter reading (kWh)</span>
            <input type="number" inputMode="decimal" min={0} value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 11208" />
          </label>
          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn btn-primary" type="submit">Save reading</button>
        </form>

        {sorted.length > 0 && (
          <section className="card">
            <h3>Saved readings</h3>
            <ul className="reading-list">
              {[...sorted].reverse().map((r) => (
                <li key={r.id}>
                  <span>{formatDate(r.date)}</span>
                  <strong>{formatNumber(r.reading)} kWh</strong>
                  <button className="icon-btn" onClick={() => onChange(readings.filter((x) => x.id !== r.id))} aria-label={`Delete reading from ${formatDate(r.date)}`}>🗑️</button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
