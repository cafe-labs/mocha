import store from 'store2'
import { aboutblankData } from '../types'
export function handleAboutBlank() {
  const aboutblankData = store('aboutblank') as aboutblankData

  if (aboutblankData.enabled && window.self == window.top) {
    openAbWindow(window.location.origin)
  }
}

export function openAbWindow(src: string, redirect = true) {
  const tab = window.open('about:blank', '_blank')
  if (!tab) return
  const iframe = tab.document.createElement('iframe')
  const stl = iframe.style
  stl.border = stl.outline = 'none'
  stl.width = '100vw'
  stl.height = '100vh'
  stl.position = 'fixed'
  stl.left = stl.right = stl.top = stl.bottom = '0'
  iframe.src = src
  tab.document.body.appendChild(iframe)

  if (redirect) window.location.replace('https://classroom.google.com/h')
}
