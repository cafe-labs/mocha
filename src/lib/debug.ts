import store from 'store2'
import { DebugData } from '../types'
export function handleDebug() {
  const debugData = store('debug') as DebugData
  if (!debugData.enabled) {
    window.eruda?.destroy()
    return
  }

  if (window.eruda?._isInit) return

  var erudaScript = document.createElement('script')
  erudaScript.src = 'https://cdn.jsdelivr.net/npm/eruda'
  erudaScript.onload = () => {
    window.eruda.init()
  }

  document.body.appendChild(erudaScript)
}
