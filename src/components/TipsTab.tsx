import type { Appliance } from '../types'
import { GENERAL_TIPS, personalTips } from '../lib/tips'
import { formatPeso } from '../lib/format'

interface Props {
  appliances: Appliance[]
  rate: number
}

/** Personalised tips for the biggest consumers, then general advice. */
export function TipsTab({ appliances, rate }: Props) {
  const mine = personalTips(appliances, rate)
  const totalSavings = mine.reduce((s, t) => s + (t.savings ?? 0), 0)

  return (
    <div className="stack">
      <section className="card">
        <div className="card-head">
          <h3>For your household</h3>
          {totalSavings > 0 && <span className="pill pill-ok">Save up to {formatPeso(totalSavings)}/month</span>}
        </div>
        {mine.length === 0 ? (
          <p className="empty">Add your appliances to get tips based on what costs you the most.</p>
        ) : (
          <ul className="tips">
            {mine.map((t, i) => (
              <li key={t.id} className="tip tip-personal">
                <span className="tip-rank">{i + 1}</span>
                <div>
                  <strong>{t.title}</strong>
                  <p>{t.body}</p>
                </div>
                {t.savings !== undefined && (
                  <span className="tip-save">
                    <small>save</small>
                    {formatPeso(t.savings)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h3>Good habits for every home</h3>
        <ul className="tips">
          {GENERAL_TIPS.map((t) => (
            <li key={t.id} className="tip">
              <span className="tip-rank">💡</span>
              <div>
                <strong>{t.title}</strong>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
