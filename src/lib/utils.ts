import store from 'store2'
import type { ContentWindow, SearchEngineData } from './types'

export function encodeXor(str: string) {
  if (!str) return str
  return encodeURIComponent(
    str
      .toString()
      .split('')
      .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(Number.NaN) ^ 2) : char))
      .join('')
  )
}

export function formatSearch(input: string): string {
  if (input.startsWith('/cdn')) {
    return new URL(input, window.location.href).href
  }

  try {
    return new URL(input).toString()
  } catch (e) {}

  try {
    const url = new URL(`http://${input}`)
    if (url.hostname.includes('.')) return url.toString()
  } catch (e) {}

  const searchEngineData = store('searchEngine') as SearchEngineData

  switch (searchEngineData.engine) {
    case 'google':
      return new URL(`https://google.com/search?q=${input}`).toString()
    case 'ecosia':
      return new URL(`https://www.ecosia.org/search?q=${input}`).toString()
    default:
      return new URL(`https://duckduckgo.com/?q=${input}`).toString()
  }
}

export function getFavicon(contentWindow: ContentWindow): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = `${contentWindow.__uv$location.origin}/favicon.ico`

    image.onload = () => {
      resolve(`${contentWindow.__uv$location.origin}/favicon.ico`)
    }

    image.onerror = () => {
      resolve((contentWindow.document.querySelector("link[rel*='icon']") as HTMLLinkElement)?.href || '/globe.svg')
    }
  })
}
