/**
 * Residential electricity rates (₱/kWh) of all 131 distribution utilities in
 * the Philippines: Meralco, private utilities, and electric cooperatives.
 *
 * Source: tipidkuryente.ph/rates (verified Oct 2026), which compiles ICSC's
 * PRESYO-PH tracker and Meralco / Davao Light advisories. Rates change every
 * month, so the app also lets users compute their exact rate from their bill.
 */

export interface Utility {
  id: string
  label: string
  /** Main province(s) served. */
  area: string
  /** All-in residential rate in ₱/kWh. */
  rate: number
  /** Month the rate applies to, e.g. "Oct 2026". */
  asOf: string
}

export const UTILITIES: Utility[] = [
  { id: 'meralco', label: 'Meralco', area: 'Metro Manila, Bulacan, Cavite, Laguna, Rizal', rate: 15.06, asOf: 'Oct 2026' },
  { id: 'veco', label: 'VECO', area: 'Cebu', rate: 15.3, asOf: 'Oct 2026' },
  { id: 'davao-light', label: 'Davao Light', area: 'Davao del Sur', rate: 13.33, asOf: 'Oct 2026' },
  { id: 'more', label: 'MORE', area: 'Iloilo', rate: 14.74, asOf: 'Oct 2026' },
  { id: 'beneco', label: 'BENECO', area: 'Benguet', rate: 11.65, asOf: 'Oct 2026' },
  { id: 'nepc', label: 'NEPC', area: 'Negros Occidental', rate: 14.27, asOf: 'Oct 2026' },
  { id: 'aec', label: 'AEC', area: 'Pampanga', rate: 12.31, asOf: 'Oct 2026' },
  { id: 'sfelapco', label: 'SFELAPCO', area: 'Pampanga', rate: 13.36, asOf: 'Oct 2026' },
  { id: 'batelec-2', label: 'BATELEC 2', area: 'Batangas', rate: 10.53, asOf: 'Oct 2026' },
  { id: 'batelec-1', label: 'BATELEC 1', area: 'Batangas', rate: 11.55, asOf: 'Oct 2026' },
  { id: 'zamcelco', label: 'ZAMCELCO', area: 'Zamboanga del Sur', rate: 12.65, asOf: 'Oct 2026' },
  { id: 'celcor', label: 'CELCOR', area: 'Nueva Ecija', rate: 13.0, asOf: 'Oct 2026' },
  { id: 'ilpi', label: 'ILPI', area: 'Lanao del Norte', rate: 14.19, asOf: 'Oct 2026' },
  { id: 'clpc', label: 'CLPC', area: 'Maguindanao', rate: 12.12, asOf: 'Oct 2026' },
  { id: 'decorp', label: 'DECORP', area: 'Pangasinan', rate: 11.35, asOf: 'Oct 2026' },
  { id: 'tei', label: 'TEI', area: 'Tarlac', rate: 12.72, asOf: 'Oct 2026' },
  { id: 'oedc', label: 'OEDC', area: 'Zambales', rate: 13.01, asOf: 'Oct 2026' },
  { id: 'cenpelco', label: 'CENPELCO', area: 'Pangasinan', rate: 12.33, asOf: 'Oct 2026' },
  { id: 'pelco-2', label: 'PELCO 2', area: 'Pampanga', rate: 11.03, asOf: 'Oct 2026' },
  { id: 'pelco-1', label: 'PELCO 1', area: 'Pampanga', rate: 10.83, asOf: 'Oct 2026' },
  { id: 'pelco-3', label: 'PELCO 3', area: 'Pampanga', rate: 12.91, asOf: 'Oct 2026' },
  { id: 'presco', label: 'PRESCO', area: 'Pampanga', rate: 12.38, asOf: 'Oct 2026' },
  { id: 'blci', label: 'BLCI', area: 'Bohol', rate: 14.1, asOf: 'Oct 2026' },
  { id: 'aleco', label: 'ALECO', area: 'Albay', rate: 11.83, asOf: 'Oct 2026' },
  { id: 'cebeco-1', label: 'CEBECO 1', area: 'Cebu', rate: 15.85, asOf: 'Oct 2026' },
  { id: 'cebeco-2', label: 'CEBECO 2', area: 'Cebu', rate: 15.91, asOf: 'Sep 2026' },
  { id: 'cebeco-3', label: 'CEBECO 3', area: 'Cebu', rate: 14.06, asOf: 'Oct 2026' },
  { id: 'paleco', label: 'PALECO', area: 'Palawan', rate: 12.82, asOf: 'Oct 2026' },
  { id: 'socoteco-2', label: 'SOCOTECO 2', area: 'South Cotabato', rate: 12.64, asOf: 'Oct 2026' },
  { id: 'aneco', label: 'ANECO', area: 'Agusan del Norte', rate: 11.11, asOf: 'Oct 2026' },
  { id: 'cepalco', label: 'CEPALCO', area: 'Misamis Oriental', rate: 14.85, asOf: 'Oct 2026' },
  { id: 'meco', label: 'MECO', area: 'Cebu', rate: 15.72, asOf: 'Oct 2026' },
  { id: 'cedc', label: 'CEDC', area: 'Pampanga', rate: 7.54, asOf: 'Aug 2026' },
  { id: 'banelco', label: 'BANELCO', area: 'Cebu', rate: 11.13, asOf: 'Oct 2026' },
  { id: 'celco', label: 'CELCO', area: 'Cebu', rate: 12.94, asOf: 'Aug 2026' },
  { id: 'fleco', label: 'FLECO', area: 'Laguna', rate: 9.68, asOf: 'Oct 2026' },
  { id: 'noneco', label: 'NONECO', area: 'Negros Occidental', rate: 15.74, asOf: 'Aug 2026' },
  { id: 'noceco', label: 'NOCECO', area: 'Negros Occidental', rate: 16.01, asOf: 'Sep 2026' },
  { id: 'panelco1', label: 'PANELCO 1', area: 'Pangasinan', rate: 11.61, asOf: 'Oct 2026' },
  { id: 'panelco3', label: 'PANELCO 3', area: 'Pangasinan', rate: 13.03, asOf: 'Oct 2026' },
  { id: 'iec', label: 'IEC', area: 'Batangas', rate: 12.42, asOf: 'Oct 2026' },
  { id: 'ileco-1', label: 'ILECO 1', area: 'Iloilo', rate: 16.89, asOf: 'Oct 2026' },
  { id: 'ileco-2', label: 'ILECO 2', area: 'Iloilo', rate: 14.42, asOf: 'Oct 2026' },
  { id: 'ileco-3', label: 'ILECO 3', area: 'Iloilo', rate: 16.03, asOf: 'Oct 2026' },
  { id: 'dasureco', label: 'DASURECO', area: 'Davao del Sur', rate: 12.86, asOf: 'Oct 2026' },
  { id: 'neeco-2-a2', label: 'NEECO 2 - A2', area: 'Nueva Ecija', rate: 14.42, asOf: 'Oct 2026' },
  { id: 'neeco-1', label: 'NEECO 1', area: 'Nueva Ecija', rate: 12.25, asOf: 'Oct 2026' },
  { id: 'sajelco', label: 'SAJELCO', area: 'Nueva Ecija', rate: 12.22, asOf: 'Oct 2026' },
  { id: 'neeco-2-a1', label: 'NEECO 2 - A1', area: 'Nueva Ecija', rate: 10.96, asOf: 'Oct 2026' },
  { id: 'quezelco-2', label: 'QUEZELCO 2', area: 'Quezon', rate: 13.22, asOf: 'Oct 2026' },
  { id: 'quezelco-1', label: 'QUEZELCO 1', area: 'Quezon', rate: 12.24, asOf: 'Oct 2026' },
  { id: 'casureco-1', label: 'CASURECO 1', area: 'Camarines Sur', rate: 12.25, asOf: 'Oct 2026' },
  { id: 'casureco-3', label: 'CASURECO 3', area: 'Camarines Sur', rate: 11.18, asOf: 'Oct 2026' },
  { id: 'casureco-2', label: 'CASURECO 2', area: 'Camarines Sur', rate: 11.17, asOf: 'Oct 2026' },
  { id: 'casureco-4', label: 'CASURECO 4', area: 'Camarines Sur', rate: 12.6, asOf: 'Oct 2026' },
  { id: 'leyeco-5', label: 'LEYECO 5', area: 'Leyte', rate: 16.29, asOf: 'Oct 2026' },
  { id: 'leyeco-4', label: 'LEYECO 4', area: 'Leyte', rate: 17.01, asOf: 'Oct 2026' },
  { id: 'dorelco', label: 'DORELCO', area: 'Leyte', rate: 16.59, asOf: 'Oct 2026' },
  { id: 'leyeco-2', label: 'LEYECO 2', area: 'Leyte', rate: 10.44, asOf: 'Oct 2026' },
  { id: 'leyeco-3', label: 'LEYECO 3', area: 'Leyte', rate: 17.15, asOf: 'Jul 2026' },
  { id: 'zamsureco-2', label: 'ZAMSURECO 2', area: 'Zamboanga del Sur', rate: 16.8, asOf: 'Oct 2026' },
  { id: 'iselco-2', label: 'ISELCO 2', area: 'Isabela', rate: 10.73, asOf: 'Oct 2026' },
  { id: 'iselco-1', label: 'ISELCO 1', area: 'Isabela', rate: 12.37, asOf: 'Oct 2026' },
  { id: 'moresco-2', label: 'MORESCO 2', area: 'Misamis Oriental', rate: 12.72, asOf: 'Oct 2026' },
  { id: 'moresco-1', label: 'MORESCO 1', area: 'Misamis Oriental', rate: 12.8, asOf: 'Aug 2026' },
  { id: 'socoteco-1', label: 'SOCOTECO 1', area: 'South Cotabato', rate: 13.21, asOf: 'Aug 2026' },
  { id: 'fibeco', label: 'FIBECO', area: 'Bukidnon', rate: 13.92, asOf: 'Oct 2026' },
  { id: 'buseco', label: 'BUSECO', area: 'Bukidnon', rate: 10.75, asOf: 'Aug 2026' },
  { id: 'tarelco-2', label: 'TARELCO 2', area: 'Tarlac', rate: 12.34, asOf: 'Oct 2026' },
  { id: 'tarelco-1', label: 'TARELCO 1', area: 'Tarlac', rate: 12.27, asOf: 'Oct 2026' },
  { id: 'cotelco-ppalma', label: 'COTELCO - PPALMA', area: 'Cotabato', rate: 12.96, asOf: 'Oct 2026' },
  { id: 'cotelco', label: 'COTELCO', area: 'Cotabato', rate: 13.69, asOf: 'Oct 2026' },
  { id: 'noreco-1', label: 'NORECO 1', area: 'Negros Oriental', rate: 16.88, asOf: 'Oct 2026' },
  { id: 'noreco-2', label: 'NORECO 2', area: 'Negros Oriental', rate: 14.44, asOf: 'Oct 2026' },
  { id: 'boheco-2', label: 'BOHECO 2', area: 'Bohol', rate: 13.91, asOf: 'Oct 2026' },
  { id: 'boheco-1', label: 'BOHECO 1', area: 'Bohol', rate: 11.9, asOf: 'Oct 2026' },
  { id: 'cagelco-2', label: 'CAGELCO 2', area: 'Cagayan', rate: 11.88, asOf: 'Oct 2026' },
  { id: 'cagelco-1', label: 'CAGELCO 1', area: 'Cagayan', rate: 12.39, asOf: 'Oct 2026' },
  { id: 'biselco', label: 'BISELCO', area: 'Palawan', rate: 12.03, asOf: 'Oct 2026' },
  { id: 'lasureco', label: 'LASURECO', area: 'Lanao del Sur', rate: 5.33, asOf: 'Oct 2026' },
  { id: 'laneco', label: 'LANECO', area: 'Lanao del Norte', rate: 12.09, asOf: 'Oct 2026' },
  { id: 'zaneco', label: 'ZANECO', area: 'Zamboanga del Norte', rate: 14.83, asOf: 'Oct 2026' },
  { id: 'zameco-2', label: 'ZAMECO 2', area: 'Zambales', rate: 12.56, asOf: 'Oct 2026' },
  { id: 'zameco-1', label: 'ZAMECO 1', area: 'Zambales', rate: 12.44, asOf: 'Oct 2026' },
  { id: 'maselco', label: 'MASELCO', area: 'Masbate', rate: 10.62, asOf: 'Oct 2026' },
  { id: 'tiselco', label: 'TISELCO', area: 'Masbate', rate: 12.01, asOf: 'May 2026' },
  { id: 'ormeco', label: 'ORMECO', area: 'Oriental Mindoro', rate: 15.31, asOf: 'Oct 2026' },
  { id: 'sukelco', label: 'SUKELCO', area: 'Sultan Kudarat', rate: 11.85, asOf: 'Oct 2026' },
  { id: 'penelco', label: 'PENELCO', area: 'Bataan', rate: 11.61, asOf: 'Oct 2026' },
  { id: 'soreco-1', label: 'SORECO 1', area: 'Sorsogon', rate: 15.49, asOf: 'Aug 2026' },
  { id: 'soreco-2', label: 'SORECO 2', area: 'Sorsogon', rate: 13.42, asOf: 'Oct 2026' },
  { id: 'luelco', label: 'LUELCO', area: 'La Union', rate: 13.49, asOf: 'Oct 2026' },
  { id: 'lueco', label: 'LUECO', area: 'La Union', rate: 12.22, asOf: 'Oct 2026' },
  { id: 'capelco', label: 'CAPELCO', area: 'Capiz', rate: 15.78, asOf: 'Sep 2026' },
  { id: 'samelco-2', label: 'SAMELCO 2', area: 'Samar', rate: 16.23, asOf: 'Oct 2026' },
  { id: 'samelco-1', label: 'SAMELCO 1', area: 'Samar', rate: 15.85, asOf: 'Oct 2026' },
  { id: 'aselco', label: 'ASELCO', area: 'Agusan del Sur', rate: 12.62, asOf: 'Aug 2026' },
  { id: 'iseco', label: 'ISECO', area: 'Ilocos Sur', rate: 12.37, asOf: 'Oct 2026' },
  { id: 'surseco-2', label: 'SURSECO 2', area: 'Surigao del Sur', rate: 13.03, asOf: 'Oct 2026' },
  { id: 'surseco-1', label: 'SURSECO 1', area: 'Surigao del Sur', rate: 12.7, asOf: 'Oct 2026' },
  { id: 'norsamelco', label: 'NORSAMELCO', area: 'Northern Samar', rate: 16.98, asOf: 'Oct 2026' },
  { id: 'canoreco', label: 'CANORECO', area: 'Camarines Norte', rate: 10.91, asOf: 'Oct 2026' },
  { id: 'moelci-1', label: 'MOELCI 1', area: 'Misamis Occidental', rate: 14.35, asOf: 'Oct 2026' },
  { id: 'moelci-2', label: 'MOELCI 2', area: 'Misamis Occidental', rate: 15.32, asOf: 'Oct 2026' },
  { id: 'akelco', label: 'AKELCO', area: 'Aklan', rate: 15.07, asOf: 'Oct 2026' },
  { id: 'anteco', label: 'ANTECO', area: 'Antique', rate: 15.98, asOf: 'Aug 2026' },
  { id: 'inec', label: 'INEC', area: 'Ilocos Norte', rate: 11.2, asOf: 'Oct 2026' },
  { id: 'doreco', label: 'DORECO', area: 'Davao Oriental', rate: 14.16, asOf: 'Sep 2026' },
  { id: 'baselco', label: 'BASELCO', area: 'Basilan', rate: 13.11, asOf: 'Feb 2026' },
  { id: 'surneco', label: 'SURNECO', area: 'Surigao del Norte', rate: 13.98, asOf: 'Oct 2026' },
  { id: 'siarelco', label: 'SIARELCO', area: 'Surigao del Norte', rate: 10.52, asOf: 'Sep 2026' },
  { id: 'omeco', label: 'OMECO', area: 'Occidental Mindoro', rate: 12.52, asOf: 'Oct 2026' },
  { id: 'nuvelco', label: 'NUVELCO', area: 'Nueva Vizcaya', rate: 12.17, asOf: 'Oct 2026' },
  { id: 'esamelco', label: 'ESAMELCO', area: 'Eastern Samar', rate: 16.37, asOf: 'Oct 2026' },
  { id: 'soleco', label: 'SOLECO', area: 'Southern Leyte', rate: 16.81, asOf: 'Oct 2026' },
  { id: 'tielco', label: 'TIELCO', area: 'Romblon', rate: 11.94, asOf: 'Oct 2026' },
  { id: 'romelco', label: 'ROMELCO', area: 'Romblon', rate: 11.9, asOf: 'Oct 2026' },
  { id: 'ficelco', label: 'FICELCO', area: 'Catanduanes', rate: 18.89, asOf: 'Oct 2026' },
  { id: 'abreco', label: 'ABRECO', area: 'Abra', rate: 12.58, asOf: 'Oct 2026' },
  { id: 'marelco', label: 'MARELCO', area: 'Marinduque', rate: 9.96, asOf: 'Oct 2026' },
  { id: 'aurelco', label: 'AURELCO', area: 'Aurora', rate: 15.51, asOf: 'Oct 2026' },
  { id: 'kaelco', label: 'KAELCO', area: 'Kalinga', rate: 13.46, asOf: 'Oct 2026' },
  { id: 'ifelco', label: 'IFELCO', area: 'Ifugao', rate: 10.19, asOf: 'Oct 2026' },
  { id: 'quirelco', label: 'QUIRELCO', area: 'Quirino', rate: 12.87, asOf: 'Oct 2026' },
  { id: 'guimelco', label: 'GUIMELCO', area: 'Guimaras', rate: 16.55, asOf: 'Oct 2026' },
  { id: 'bileco', label: 'BILECO', area: 'Biliran', rate: 19.36, asOf: 'Oct 2026' },
  { id: 'mopreco', label: 'MOPRECO', area: 'Mountain Province', rate: 12.46, asOf: 'Oct 2026' },
  { id: 'dielco', label: 'DIELCO', area: 'Dinagat Islands', rate: 9.56, asOf: 'Sep 2026' },
  { id: 'prosielco', label: 'PROSIELCO', area: 'Siquijor', rate: 12.88, asOf: 'Oct 2026' },
  { id: 'camelco', label: 'CAMELCO', area: 'Camiguin', rate: 15.79, asOf: 'Oct 2026' },
  { id: 'batanelco', label: 'BATANELCO', area: 'Batanes', rate: 13.18, asOf: 'Oct 2026' },
]

/** Default utility for new users (the app was built in Pangasinan). */
export const DEFAULT_UTILITY = UTILITIES.find((u) => u.id === 'panelco1')!

export function findUtility(id: string): Utility | undefined {
  return UTILITIES.find((u) => u.id === id)
}

/**
 * Search by utility name or province, case-insensitive.
 * "pange" finds PANELCO 1, PANELCO 3, CENPELCO and DECORP; "cebu" finds VECO, MECO, CEBECO…
 */
export function searchUtilities(query: string, limit = 8): Utility[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const nameStarts: Utility[] = []
  const other: Utility[] = []
  for (const u of UTILITIES) {
    const name = u.label.toLowerCase()
    if (name.startsWith(q)) nameStarts.push(u)
    else if (name.includes(q) || u.area.toLowerCase().includes(q)) other.push(u)
  }
  return [...nameStarts, ...other].slice(0, limit)
}

/** Effective rate from a bill: total amount ÷ kWh used. Null if the inputs are not usable. */
export function rateFromBill(totalAmount: number, kwhUsed: number): number | null {
  if (!(totalAmount > 0) || !(kwhUsed > 0)) return null
  return Math.round((totalAmount / kwhUsed) * 100) / 100
}
