import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Appliance } from '../types'
import { APPLIANCE_PRESETS } from '../lib/presets'
import { monthlyCost, monthlyKwh } from '../lib/calc'
import { formatKwh, formatPeso, newId } from '../lib/format'
import { EMPTY, toForm, validate } from '../lib/applianceForm'
import type { FormState } from '../lib/applianceForm'

interface Props {
  rate: number
  /** When set, the form edits this appliance instead of adding a new one. */
  editing: Appliance | null
  onSave: (a: Appliance) => void
  onCancelEdit: () => void
}

export function ApplianceForm({ rate, editing, onSave, onCancelEdit }: Props) {
  // The parent gives this form a new `key` when "Edit" is clicked, so React
  // re-creates it and this initial state loads the selected appliance.
  const [form, setForm] = useState<FormState>(() => (editing ? toForm(editing) : EMPTY))
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  function applyPreset(name: string) {
    const p = APPLIANCE_PRESETS.find((x) => x.name === name)
    if (p) setForm((f) => ({ ...f, name: p.name, watts: String(p.watts), hoursPerDay: String(p.hoursPerDay) }))
  }

  // Live preview while typing (only when the inputs are valid).
  const valid = validate(form) === null
  const preview: Appliance | null = valid
    ? { id: 'preview', name: form.name, watts: +form.watts, quantity: +form.quantity, hoursPerDay: +form.hoursPerDay, daysPerMonth: +form.daysPerMonth }
    : null

  function submit(e: FormEvent) {
    e.preventDefault()
    const message = validate(form)
    if (message) return setError(message)
    onSave({
      id: editing?.id ?? newId(),
      name: form.name.trim(),
      watts: +form.watts,
      quantity: +form.quantity,
      hoursPerDay: +form.hoursPerDay,
      daysPerMonth: +form.daysPerMonth,
    })
    setForm(EMPTY)
    setError(null)
  }

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h3>{editing ? `Edit ${editing.name}` : 'Add an appliance'}</h3>

      {!editing && (
        <label className="field">
          <span>Quick pick</span>
          <select value="" onChange={(e) => applyPreset(e.target.value)} aria-label="Pick a common appliance">
            <option value="">Choose a common appliance…</option>
            {APPLIANCE_PRESETS.map((p) => (
              <option key={p.name} value={p.name}>
                {p.icon} {p.name} · {p.watts}W
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="field">
        <span>Name</span>
        <input value={form.name} onChange={set('name')} placeholder="e.g. Bedroom aircon" maxLength={60} />
      </label>

      <div className="grid-2">
        <label className="field">
          <span>Watts</span>
          <input type="number" inputMode="decimal" min={1} value={form.watts} onChange={set('watts')} placeholder="from the label" />
        </label>
        <label className="field">
          <span>Quantity</span>
          <input type="number" inputMode="numeric" min={1} value={form.quantity} onChange={set('quantity')} />
        </label>
        <label className="field">
          <span>Hours per day</span>
          <input type="number" inputMode="decimal" min={0} max={24} step={0.25} value={form.hoursPerDay} onChange={set('hoursPerDay')} />
        </label>
        <label className="field">
          <span>Days per month</span>
          <input type="number" inputMode="numeric" min={0} max={31} value={form.daysPerMonth} onChange={set('daysPerMonth')} />
        </label>
      </div>

      {preview && (
        <p className="preview">
          ≈ <strong>{formatPeso(monthlyCost(preview, rate))}</strong> per month · {formatKwh(monthlyKwh(preview))}
        </p>
      )}
      {error && <p className="error" role="alert">{error}</p>}

      <div className="row">
        <button type="submit" className="btn btn-primary">{editing ? 'Save changes' : 'Add appliance'}</button>
        {editing && <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  )
}
