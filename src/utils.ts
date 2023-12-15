export function encodeXor(input: string): string {
  return encodeURIComponent(
    input
      .toString()
      .split('')
      .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(NaN) ^ 2) : char))
      .join('')
  )
}

export function decodeXor(input: string): string {
  if (!input) return input
  let [str, ...search] = input.split('?')

  return (
    decodeURIComponent(str)
      .split('')
      .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(NaN) ^ 2) : char))
      .join('') + (search.length ? '?' + search.join('?') : '')
  )
}
export function formatSearch(input: string): string {
  try {
    return new URL(input).toString()
  } catch (e) {}

  try {
    const url = new URL(`http://${input}`)
    if (url.hostname.includes('.')) return url.toString()
  } catch (e) {}

  return new URL(`https://google.com/search?q=${input}`).toString()
}

export default function aboutblank(src: string) {
  const tab = window.open('about:blank', '_blank')
  if (!tab || tab == undefined) return
  const iframe = tab.document.createElement('iframe')
  const stl = iframe.style
  stl.border = stl.outline = 'none'
  stl.width = '100vw'
  stl.height = '100vh'
  stl.position = 'fixed'
  stl.left = stl.right = stl.top = stl.bottom = '0'
  iframe.src = src
  tab.document.body.appendChild(iframe)

  return tab
}
