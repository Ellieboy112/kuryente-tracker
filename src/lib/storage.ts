/**
 * The app's "backend": data is saved in the browser's localStorage, so it
 * works offline, costs nothing to host, and never leaves the user's device.
 *
 * Everything is stored as one JSON object under one key. A version number
 * lets future releases migrate old data safely.
 */
import { useEffect, useState } from 'react'
import type { AppData } from '../types'
import { sampleData } from './sampleData'

const STORAGE_KEY = 'kuryente-tracker:v1'

/** Reads saved data; falls back to the sample household on first visit or if data is corrupt. */
export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleData()
    const parsed = JSON.parse(raw) as Partial<AppData>
    const fallback = sampleData()
    // Merge with defaults so a missing field never crashes the app.
    return {
      appliances: Array.isArray(parsed.appliances) ? parsed.appliances : fallback.appliances,
      readings: Array.isArray(parsed.readings) ? parsed.readings : fallback.readings,
      settings: { ...fallback.settings, ...parsed.settings },
      isSample: parsed.isSample ?? false,
    }
  } catch {
    return sampleData()
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage can be full or blocked (e.g. private mode). The app keeps working in memory.
  }
}

/** React hook: app state that is automatically saved on every change. */
export function usePersistentData() {
  const [data, setData] = useState<AppData>(loadData)
  useEffect(() => saveData(data), [data])
  return [data, setData] as const
}
