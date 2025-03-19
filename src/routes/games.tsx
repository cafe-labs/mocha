import Fuse, { type FuseResult } from 'fuse.js'
import { Show, createSignal, onMount } from 'solid-js'
import Game from '../components/game'
import type { GameData } from '../lib/types'

export default function Games() {
  const [data, setData] = createSignal<GameData[]>([])
  const [results, setResults] = createSignal<FuseResult<GameData>[]>([])

  function handleSearch(text: string) {
    const search = data()
    const fuse = new Fuse(search, {
      keys: ['name']
    })
    setResults(fuse.search(text))
  }

  onMount(() => {
    fetch('/games.json')
      .then((res) => res.json())
      .then((res: GameData[]) => {
        setData(res)
      })
  })

  return (
    <div class="flex flex-col items-center gap-2 py-4">
      <Show when={data()[0]}>
        <input type="text" class="input input-bordered w-1/3" onInput={(e) => handleSearch(e.target.value)} placeholder={`Search ${data().length} games`} />
      </Show>

      <div class="flex flex-wrap justify-center gap-4 px-4 py-8">
        <Show when={!data()[0]}>
          <span class="loading loading-dots loading-lg" />
        </Show>
        {results().length > 0
          ? results().map((result) => {
              // biome-ignore lint: shut up
              return <Game game={result.item} />
            })
          : data().map((game) => {
              // biome-ignore lint: shut up
              return <Game game={game} />
            })}
      </div>
    </div>
  )
}
