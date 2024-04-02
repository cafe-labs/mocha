import store from 'store2'
import { PanicData } from '../types'
export function handlePanicKey(e: KeyboardEvent) {
  const panicData = store('panic') as PanicData

  if (!panicData.key) return
  if (e.key !== panicData.key) return

  window.location.replace(panicData.url || 'https://classroom.google.com/h')
}
