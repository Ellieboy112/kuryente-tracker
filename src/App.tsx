import { useState } from 'react'
import type { Appliance, MeterReading, Settings } from './types'
import { usePersistentData } from './lib/storage'
import { emptyData, sampleData } from './lib/sampleData'
import { projectedMonthlyFromReadings, totalCost, totalKwh } from './lib/calc'
import { RATE_PRESETS } from './lib/presets'
import { formatPeso } from './lib/format'
import { SummaryCard } from './components/SummaryCard'
import { AppliancesTab } from './components/AppliancesTab'
import { MeterTab } from './components/MeterTab'
import { TipsTab } from './components/TipsTab'
import { SettingsTab } from './components/SettingsTab'

type Tab = 'appliances' | 'meter' | 'tips' | 'settings'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'appliances', label: 'Appliances', icon: '🔌' },
  { id: 'meter', label: 'Meter', icon: '📟' },
  { id: 'tips', label: 'Tips', icon: '💡' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

/**
 * App shell: holds all state (saved automatically to localStorage),
 * computes the summary, and shows one tab at a time.
 */
export default function App() {
  const [data, setData] = usePersistentData()
  const [tab, setTab] = useState<Tab>('appliances')
  const [focusBudget, setFocusBudget] = useState(false)
  // Bumped when all data is replaced (sample, restore) so the Settings form reloads its inputs.
  const [dataVersion, setDataVersion] = useState(0)
  const replaceAll = (next: typeof data) => {
    setData(next)
    setDataVersion((v) => v + 1)
  }

  const rate = data.settings.ratePerKwh
  const rateLabel = RATE_PRESETS.find((p) => p.id === data.settings.rateSource)?.label ?? 'Custom rate'

  // Any edit turns the sample household into the user's own data.
  const setAppliances = (appliances: Appliance[]) => setData((d) => ({ ...d, appliances, isSample: false }))
  const setReadings = (readings: MeterReading[]) => setData((d) => ({ ...d, readings, isSample: false }))
  const setSettings = (settings: Settings) => setData((d) => ({ ...d, settings }))

  function goTo(next: Tab) {
    setTab(next)
    setFocusBudget(false)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo" aria-hidden>⚡</span>
          <div>
            <h1>Kuryente Tracker</h1>
            <p className="muted small">Know your electric bill before it arrives</p>
          </div>
        </div>
        <button className="rate-chip" onClick={() => goTo('settings')} title="Change rate">
          {rateLabel} · {formatPeso(rate)}/kWh
        </button>
      </header>

      {data.isSample && (
        <div className="sample-banner" role="status">
          <span>👋 You're viewing a <strong>sample household</strong>. Edit anything to make it yours, or</span>
          <button className="btn btn-small" onClick={() => setData(emptyData(data.settings))}>start fresh</button>
        </div>
      )}

      <SummaryCard
        monthlyCost={totalCost(data.appliances, rate)}
        monthlyKwh={totalKwh(data.appliances)}
        budget={data.settings.monthlyBudget}
        meterProjection={projectedMonthlyFromReadings(data.readings, rate)}
        onSetBudget={() => {
          setTab('settings')
          setFocusBudget(true)
        }}
      />

      <nav className="tabs" aria-label="Sections">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'tab-on' : ''}`} aria-current={tab === t.id ? 'page' : undefined} onClick={() => goTo(t.id)}>
            <span aria-hidden>{t.icon}</span> {t.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'appliances' && <AppliancesTab appliances={data.appliances} rate={rate} onChange={setAppliances} />}
        {tab === 'meter' && <MeterTab readings={data.readings} rate={rate} onChange={setReadings} />}
        {tab === 'tips' && <TipsTab appliances={data.appliances} rate={rate} />}
        {tab === 'settings' && (
          <SettingsTab
            key={dataVersion}
            data={data}
            focusBudget={focusBudget}
            onSettings={setSettings}
            onStartFresh={() => setData(emptyData(data.settings))}
            onLoadSample={() => replaceAll(sampleData())}
            onImport={replaceAll}
          />
        )}
      </main>

      <footer className="footer muted small">
        Made by <a href="https://ellieboy112.github.io" target="_blank" rel="noopener">Ellison Olivo</a> · Data stays on your device · Estimates only
      </footer>
    </div>
  )
}
