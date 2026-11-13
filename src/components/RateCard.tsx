import { useId, useState } from 'react'
import type { Settings } from '../types'
import { UTILITIES, findUtility, rateFromBill, searchUtilities } from '../lib/utilities'
import type { Utility } from '../lib/utilities'
import { formatPeso } from '../lib/format'

interface Props {
  settings: Settings
  onSettings: (s: Settings) => void
}

/** The most common utilities, shown as one-tap shortcuts. */
const POPULAR = ['meralco', 'veco', 'davao-light', 'panelco1']

/**
 * Three ways to set the electricity rate:
 * 1. Search any of the 131 utilities by name or province.
 * 2. Calculate the exact rate from your own bill (most accurate).
 * 3. Type a rate by hand.
 */
export function RateCard({ settings, onSettings }: Props) {
  const [query, setQuery] = useState('')
  const [rateText, setRateText] = useState(String(settings.ratePerKwh))
  const [billAmount, setBillAmount] = useState('')
  const [billKwh, setBillKwh] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const listId = useId()

  const current = findUtility(settings.rateSource)
  const results = searchUtilities(query)
  const billRate = rateFromBill(Number(billAmount), Number(billKwh))

  function choose(u: Utility) {
    onSettings({ ...settings, ratePerKwh: u.rate, rateSource: u.id })
    setRateText(String(u.rate))
    setQuery('')
    setNotice(`✓ Using ${u.label}: ${formatPeso(u.rate)}/kWh`)
  }

  function applyBillRate() {
    if (billRate === null) return
    onSettings({ ...settings, ratePerKwh: billRate, rateSource: 'bill' })
    setRateText(String(billRate))
    setNotice(`✓ Using your bill's rate: ${formatPeso(billRate)}/kWh`)
  }

  function typeRate(text: string) {
    setRateText(text)
    const rate = Number(text)
    if (rate > 0 && rate < 100) onSettings({ ...settings, ratePerKwh: rate, rateSource: 'custom' })
  }

  const rateInvalid = !(Number(rateText) > 0 && Number(rateText) < 100)

  return (
    <section className="card form">
      <h3>Electricity rate</h3>

      <div className="current-rate">
        <div>
          <p className="eyebrow">Current rate</p>
          <p className="current-rate-value">{formatPeso(settings.ratePerKwh)}<small>/kWh</small></p>
        </div>
        <p className="muted small">
          {current
            ? `${current.label} · ${current.area} · as of ${current.asOf}`
            : settings.rateSource === 'bill'
              ? 'Calculated from your bill'
              : 'Custom rate'}
        </p>
      </div>

      {/* 1. Search all utilities */}
      <label className="field">
        <span>Find your utility ({UTILITIES.length} in the Philippines)</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a name or province, e.g. Meralco, Cebu, Iloilo"
          aria-controls={listId}
          autoComplete="off"
        />
      </label>
      {query.trim() !== '' && (
        <ul className="utility-results" id={listId} role="listbox" aria-label="Matching utilities">
          {results.length === 0 && <li className="muted small no-match">No utility matches "{query}".</li>}
          {results.map((u) => (
            <li key={u.id}>
              <button type="button" role="option" aria-selected={u.id === settings.rateSource} onClick={() => choose(u)}>
                <span>
                  <strong>{u.label}</strong>
                  <small className="muted">{u.area}</small>
                </span>
                <span className="u-rate">
                  {formatPeso(u.rate)}
                  <small className="muted">{u.asOf}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="chips" aria-label="Popular utilities">
        {POPULAR.map((id) => findUtility(id)!).map((u) => (
          <button type="button" key={u.id} className={`chip ${settings.rateSource === u.id ? 'chip-on' : ''}`} onClick={() => choose(u)}>
            {u.label} <small>{formatPeso(u.rate)}</small>
          </button>
        ))}
      </div>

      {/* 2. Calculate from the user's own bill */}
      <details className="bill-calc">
        <summary>🧾 Calculate from my bill (most accurate)</summary>
        <p className="muted small">Copy two numbers from your latest electric bill.</p>
        <div className="grid-2">
          <label className="field">
            <span>Total amount due (₱)</span>
            <input type="number" inputMode="decimal" min={0} value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="e.g. 2450" />
          </label>
          <label className="field">
            <span>kWh used</span>
            <input type="number" inputMode="decimal" min={0} value={billKwh} onChange={(e) => setBillKwh(e.target.value)} placeholder="e.g. 198" />
          </label>
        </div>
        <button type="button" className="btn btn-primary" disabled={billRate === null} onClick={applyBillRate}>
          {billRate === null ? 'Use this rate' : `Use ${formatPeso(billRate)}/kWh`}
        </button>
      </details>

      {/* 3. Type it by hand */}
      <label className="field">
        <span>Or type a rate (₱ per kWh)</span>
        <input type="number" inputMode="decimal" step={0.01} min={0} value={rateText} onChange={(e) => typeRate(e.target.value)} aria-invalid={rateInvalid} />
      </label>
      {rateInvalid && <p className="error">Enter a rate between ₱0.01 and ₱99.99.</p>}
      {notice && <p className="small notice" role="status">{notice}</p>}

      <p className="muted small">
        Utility rates: residential rates compiled by tipidkuryente.ph (ICSC PRESYO-PH and utility advisories). Rates change every month, so check your bill.
      </p>
    </section>
  )
}
