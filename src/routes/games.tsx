import Fuse, { FuseResult } from 'fuse.js'
import { createSignal, onMount } from 'solid-js'
import Game from '../components/game'
import { GameData } from '../lib/types'

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
      <input type="text" class="input input-bordered w-1/3" onInput={(e) => handleSearch(e.target.value)} placeholder={`Search ${data().length} games`} />
      <div class="flex flex-wrap justify-center gap-4 px-4 py-8">
        {results().length > 0 ? results().map((result) => {
          return <Game game={result.item} />
        }) : data().map((game) => {
          return <Game game={game} />
        })}
      </div>
    </div>
  )
}
