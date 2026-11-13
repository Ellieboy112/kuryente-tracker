/**
 * A small dependency-free donut chart drawn with SVG circles.
 * Each slice is a circle stroke with a dash length equal to its share.
 */
export interface Slice {
  label: string
  value: number
  color: string
}

interface Props {
  slices: Slice[]
  centerTop: string
  centerBottom: string
  size?: number
}

export function DonutChart({ slices, centerTop, centerBottom, size = 200 }: Props) {
  const total = slices.reduce((s, x) => s + x.value, 0)
  const r = 70
  const circumference = 2 * Math.PI * r
  // Where each slice starts along the circle = sum of the slices before it.
  const lengths = slices.map((s) => (total > 0 ? (s.value / total) * circumference : 0))
  const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0))

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label="Share of monthly usage per appliance">
      <circle cx="100" cy="100" r={r} fill="none" stroke="var(--track)" strokeWidth="26" />
      {total > 0 &&
        slices.map((s, i) => (
            <circle
              key={s.label}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="26"
              strokeDasharray={`${lengths[i]} ${circumference - lengths[i]}`}
              strokeDashoffset={-starts[i]}
              transform="rotate(-90 100 100)"
            >
              <title>{s.label}</title>
            </circle>
          ))}
      <text x="100" y="96" textAnchor="middle" className="donut-top">{centerTop}</text>
      <text x="100" y="120" textAnchor="middle" className="donut-bottom">{centerBottom}</text>
    </svg>
  )
}
