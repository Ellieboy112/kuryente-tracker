import { useState } from 'react'
import type { Appliance } from '../types'
import { breakdown, totalKwh } from '../lib/calc'
import { iconFor } from '../lib/presets'
import { formatKwh, formatNumber, formatPeso } from '../lib/format'
import { ApplianceForm } from './ApplianceForm'
import { DonutChart } from './DonutChart'
import { CHART_COLORS } from '../lib/colors'

interface Props {
  appliances: Appliance[]
  rate: number
  onChange: (next: Appliance[]) => void
}

/** Appliance list with cost breakdown, donut chart, and add/edit form. */
export function AppliancesTab({ appliances, rate, onChange }: Props) {
  const [editing, setEditing] = useState<Appliance | null>(null)
  const items = breakdown(appliances, rate)
  const kwh = totalKwh(appliances)

  // Top 6 get their own slice; the rest are grouped as "Others".
  const top = items.slice(0, 6)
  const others = items.slice(6).reduce((s, x) => s + x.kwh, 0)
  const slices = [
    ...top.map((b, i) => ({ label: b.appliance.name, value: b.kwh, color: CHART_COLORS[i] })),
    ...(others > 0 ? [{ label: 'Others', value: others, color: CHART_COLORS[8] }] : []),
  ]

  function save(a: Appliance) {
    const exists = appliances.some((x) => x.id === a.id)
    onChange(exists ? appliances.map((x) => (x.id === a.id ? a : x)) : [...appliances, a])
    setEditing(null)
  }

  function remove(id: string) {
    onChange(appliances.filter((x) => x.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  return (
    <div className="tab-grid">
      <div className="stack">
        <section className="card">
          <div className="card-head">
            <h3>Where your money goes</h3>
            <span className="muted">{appliances.length} appliance{appliances.length === 1 ? '' : 's'}</span>
          </div>

          {items.length === 0 ? (
            <p className="empty">No appliances yet. Add your first one with the form. Start with the aircon, refrigerator, and electric fans.</p>
          ) : (
            <>
              <div className="chart-row">
                <DonutChart slices={slices} centerTop={formatNumber(kwh)} centerBottom="kWh / month" size={180} />
                <ul className="legend">
                  {slices.map((s) => (
                    <li key={s.label}>
                      <span className="dot" style={{ background: s.color }} />
                      <span className="legend-name">{s.label}</span>
                      <span className="muted">{kwh > 0 ? Math.round((s.value / kwh) * 100) : 0}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="appliance-list">
                {items.map(({ appliance: a, kwh: k, cost, share }, i) => (
                  <li key={a.id} className={editing?.id === a.id ? 'is-editing' : ''}>
                    <span className="a-icon" aria-hidden>{iconFor(a.name)}</span>
                    <div className="a-main">
                      <div className="a-top">
                        <strong>{a.name}{a.quantity > 1 ? ` ×${a.quantity}` : ''}</strong>
                        <strong>{formatPeso(cost)}</strong>
                      </div>
                      <div className="a-sub muted">
                        <span>{a.watts}W · {a.hoursPerDay}h/day · {a.daysPerMonth} days</span>
                        <span>{formatKwh(k)}</span>
                      </div>
                      <div className="mini-bar"><span style={{ width: `${share * 100}%`, background: CHART_COLORS[Math.min(i, 8)] }} /></div>
                    </div>
                    <div className="a-actions">
                      <button className="icon-btn" onClick={() => setEditing(a)} aria-label={`Edit ${a.name}`}>✏️</button>
                      <button className="icon-btn" onClick={() => remove(a.id)} aria-label={`Delete ${a.name}`}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      <ApplianceForm key={editing?.id ?? 'new'} rate={rate} editing={editing} onSave={save} onCancelEdit={() => setEditing(null)} />
    </div>
  )
}
