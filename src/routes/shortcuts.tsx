import { createSignal, onMount } from 'solid-js'
import { ShortcutData } from '../lib/types'

import Shortcut from '../components/shortcut'

export default function Shortcuts() {
  const [data, setData] = createSignal<ShortcutData[]>([])

  onMount(() => {
    fetch('/shortcuts.json')
      .then((res) => res.json())
      .then((res: ShortcutData[]) => {
        res = res.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
        setData(res)
      })
  })

  return (
    <div class="flex flex-wrap justify-center gap-4 px-4 py-8">
      {data().map((shortcut) => {
        return <Shortcut shortcut={shortcut} />
      })}
    </div>
  )
}
