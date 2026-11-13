/**
 * Energy-saving tips. Personalised tips are generated from the user's own
 * appliances (biggest consumers first), with peso savings computed by calc.ts.
 */
import type { Appliance } from '../types'
import { breakdown, savingsIfReduced } from './calc'

export interface Tip {
  id: string
  title: string
  body: string
  /** Estimated monthly savings in pesos, when we can compute it. */
  savings?: number
  personal: boolean
}

/** Estimated saving from better habits for appliances that run 24 hours a day. */
const ALWAYS_ON_SAVINGS = 0.1

const has = (a: Appliance, word: string) => a.name.toLowerCase().includes(word)

/** Advice for a specific kind of appliance, if we have any. */
function adviceFor(a: Appliance): string | null {
  if (has(a, 'aircon')) return 'Set it to 25–26°C, clean the filter every 2 weeks, and use a fan with it so you can turn it off sooner.'
  if (has(a, 'refrigerator') || has(a, 'ref')) return 'Keep the door closed, leave space behind it for airflow, and let food cool before putting it inside.'
  if (has(a, 'iron')) return 'Iron clothes in one batch per week instead of daily; reheating the plate wastes the most energy.'
  if (has(a, 'dispenser')) return 'Turn off the hot-water switch at night and when nobody is home.'
  if (has(a, 'water pump')) return 'Fix leaking faucets and fill a storage tank so the pump runs less often.'
  if (has(a, 'computer')) return 'Turn on sleep mode and switch it off completely when not in use.'
  if (has(a, 'tv')) return 'Lower the brightness and unplug it, or switch off the extension cord, at night.'
  if (has(a, 'rice cooker')) return 'Unplug it after cooking; the "keep warm" mode draws power all day.'
  return null
}

/** Tips for the biggest consumers: "X is N% of your bill; 1 hour less a day saves ₱Y". */
export function personalTips(appliances: Appliance[], rate: number, max = 3): Tip[] {
  return breakdown(appliances, rate)
    .filter((b) => b.kwh > 0 && b.appliance.hoursPerDay > 0)
    .slice(0, max)
    .map(({ appliance, share, cost }) => {
      const pct = Math.round(share * 100)
      const advice = adviceFor(appliance)
      const title = `${appliance.name} is ${pct}% of your bill`

      // Always-on appliances (refrigerator, router…) can't run "1 hour less";
      // good habits typically cut their use by about 10% instead.
      if (appliance.hoursPerDay >= 24) {
        return {
          id: `p-${appliance.id}`,
          title,
          body: `It runs all day, so small habits add up: they can cut its use by about 10%.${advice ? ' ' + advice : ''}`,
          savings: cost * ALWAYS_ON_SAVINGS,
          personal: true,
        }
      }

      const cutHours = appliance.hoursPerDay >= 2 ? 1 : appliance.hoursPerDay / 2
      const hoursText = cutHours === 1 ? '1 hour' : `${+(cutHours * 60).toFixed(0)} minutes`
      return {
        id: `p-${appliance.id}`,
        title,
        body: `Using it ${hoursText} less per day saves about this much every month.${advice ? ' ' + advice : ''}`,
        savings: savingsIfReduced(appliance, cutHours, rate),
        personal: true,
      }
    })
}

export const GENERAL_TIPS: Tip[] = [
  { id: 'g1', personal: false, title: 'Unplug "vampire" loads', body: 'Chargers, TVs and set-top boxes still draw power on standby. Use an extension cord with a switch and turn it off at night.' },
  { id: 'g2', personal: false, title: 'Switch to LED bulbs', body: 'A 9W LED gives the same light as a 60W incandescent bulb and lasts up to 15 times longer.' },
  { id: 'g3', personal: false, title: 'Choose inverter appliances', body: 'Inverter aircons and refrigerators can use 30–50% less electricity than non-inverter models.' },
  { id: 'g4', personal: false, title: 'Read your meter weekly', body: 'Logging the meter every week shows you a spike right away, not at the end of the month when the bill arrives.' },
  { id: 'g5', personal: false, title: 'Use natural light and airflow', body: 'Open windows in the morning and late afternoon, when it is cooler, before turning on the aircon.' },
]
