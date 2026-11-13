import { useEffect, useRef, useState } from 'react'
import type { AppData, Settings } from '../types'
import { RateCard } from './RateCard'

interface Props {
  data: AppData
  onSettings: (s: Settings) => void
  onStartFresh: () => void
  onLoadSample: () => void
  onImport: (d: AppData) => void
  focusBudget: boolean
}

/** Electricity rate, monthly budget, and data tools (start fresh, sample, backup). */
export function SettingsTab({ data, onSettings, onStartFresh, onLoadSample, onImport, focusBudget }: Props) {
  const { settings } = data
  const [budgetText, setBudgetText] = useState(settings.monthlyBudget ? String(settings.monthlyBudget) : '')
  const [message, setMessage] = useState<string | null>(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const budgetRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focusBudget) budgetRef.current?.focus()
  }, [focusBudget])


  function saveBudget(text: string) {
    setBudgetText(text)
    const budget = Number(text)
    if (text === '' || (budget >= 0 && budget < 1_000_000)) onSettings({ ...settings, monthlyBudget: text === '' ? 0 : budget })
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'kuryente-tracker-backup.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  async function importData(file: File | undefined) {
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text()) as AppData
      if (!Array.isArray(parsed.appliances) || !Array.isArray(parsed.readings) || !parsed.settings) throw new Error('bad file')
      onImport({ ...parsed, isSample: false })
      setMessage('✓ Backup restored.')
    } catch {
      setMessage('That file is not a Kuryente Tracker backup.')
    }
  }

  return (
    <div className="tab-grid">
      <div className="stack">
        <RateCard settings={settings} onSettings={onSettings} />

        <section className="card form">
          <h3>Monthly budget</h3>
          <p className="muted small">You'll get a warning at 85% of your budget and an alert when the estimate goes over it.</p>
          <label className="field">
            <span>Budget (₱)</span>
            <input ref={budgetRef} type="number" inputMode="numeric" min={0} value={budgetText} onChange={(e) => saveBudget(e.target.value)} placeholder="e.g. 2500" />
          </label>
        </section>
      </div>

      <div className="stack">
        <section className="card form">
          <h3>Your data</h3>
          <p className="muted small">Everything is saved only on this device, in your browser. Nothing is uploaded.</p>
          <div className="row wrap">
            <button className="btn btn-ghost" onClick={exportData}>⬇ Download backup</button>
            <label className="btn btn-ghost">
              ⬆ Restore backup
              <input type="file" accept="application/json" hidden onChange={(e) => importData(e.target.files?.[0])} />
            </label>
          </div>
          {message && <p className="small">{message}</p>}
          <div className="row wrap">
            {confirmClear ? (
              <>
                <button className="btn btn-danger" onClick={() => { onStartFresh(); setConfirmClear(false); setMessage('✓ All appliances and readings cleared.') }}>Yes, delete everything</button>
                <button className="btn btn-ghost" onClick={() => setConfirmClear(false)}>Cancel</button>
              </>
            ) : (
              <button className="btn btn-danger" onClick={() => setConfirmClear(true)}>Start fresh (clear all)</button>
            )}
            <button className="btn btn-ghost" onClick={onLoadSample}>Load sample household</button>
          </div>
        </section>

        <section className="card about">
          <h3>About</h3>
          <p className="small">
            Kuryente Tracker estimates your electric bill from your appliances and tracks your real usage from meter readings.
            Built by <a href="https://ellieboy112.github.io" target="_blank" rel="noopener">Ellison Olivo</a> with React and TypeScript.
          </p>
          <p className="muted small">Estimates only. Your actual bill depends on your utility's monthly rate and charges.</p>
        </section>
      </div>
    </div>
  )
}
