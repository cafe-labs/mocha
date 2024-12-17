import { Show, createSignal, onMount } from 'solid-js'
import type { ShortcutData } from '../lib/types'

import Shortcut from '../components/shortcut'

export default function Shortcuts() {
  const [data, setData] = createSignal<ShortcutData[]>([])

  onMount(() => {
    fetch('/shortcuts.json')
      .then((res) => res.json())
      .then((res: ShortcutData[]) => {
        const sorted = res.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        setData(sorted)
      })
  })

  return (
    <div class="flex flex-wrap justify-center gap-4 px-4 py-8">
      <Show when={!data()[0]}>
        <span class="loading loading-dots loading-lg" />
      </Show>
      {data().map((shortcut) => {
        // biome-ignore lint: it's fine
        return <Shortcut shortcut={shortcut} />
      })}
    </div>
  )
}
