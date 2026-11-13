import { budgetStatus } from '../lib/calc'
import { formatKwh, formatPeso, formatPesoWhole } from '../lib/format'

interface Props {
  monthlyCost: number
  monthlyKwh: number
  budget: number
  meterProjection: { kwh: number; cost: number } | null
  onSetBudget: () => void
}

const STATUS_TEXT = {
  ok: 'Within budget',
  warning: 'Close to your budget',
  over: 'Over budget',
  none: '',
} as const

/** The big number at the top: estimated bill, daily cost, and the budget bar/alert. */
export function SummaryCard({ monthlyCost, monthlyKwh, budget, meterProjection, onSetBudget }: Props) {
  const status = budgetStatus(monthlyCost, budget)
  const pct = budget > 0 ? Math.min(100, (monthlyCost / budget) * 100) : 0

  return (
    <section className={`summary status-${status}`} aria-label="Monthly summary">
      <div className="summary-main">
        <p className="eyebrow">Estimated monthly bill</p>
        <p className="big-number">{formatPeso(monthlyCost)}</p>
        <p className="sub">
          {formatKwh(monthlyKwh)} · about {formatPeso(monthlyCost / 30)} per day
        </p>
      </div>

      <div className="summary-side">
        {budget > 0 ? (
          <>
            <div className="budget-row">
              <span>Budget {formatPesoWhole(budget)}</span>
              <span className={`pill pill-${status}`}>{STATUS_TEXT[status]}</span>
            </div>
            <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Budget used">
              <span style={{ width: `${pct}%` }} />
            </div>
            {status === 'over' && (
              <p className="alert" role="alert">
                ⚠️ {formatPeso(monthlyCost - budget)} over your budget. See the Tips tab to cut back.
              </p>
            )}
            {status === 'warning' && <p className="alert alert-soft">You've used {Math.round(pct)}% of your budget.</p>}
          </>
        ) : (
          <button className="btn btn-ghost" onClick={onSetBudget}>+ Set a monthly budget</button>
        )}

        {meterProjection && (
          <p className="meter-proj">
            📟 From your meter: <strong>{formatPeso(meterProjection.cost)}</strong> per 30 days ({formatKwh(meterProjection.kwh)})
          </p>
        )}
      </div>
    </section>
  )
}
