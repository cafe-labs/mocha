import { createSignal, onMount } from 'solid-js'
import Game from '../components/game'
import { GameData } from '../lib/types'

export default function Games() {
  const [data, setData] = createSignal<GameData[]>([])
  const [search, setSearch] = createSignal('')

  onMount(() => {
    fetch('/games.json')
      .then((res) => res.json())
      .then((res: GameData[]) => {
        setData(res)
      })
  })

  return (
    <div class="flex flex-col items-center gap-2 py-4">
      <input type="text" class="input input-bordered w-1/3" value={search()} onInput={(e) => setSearch(e.target.value)} placeholder={`Search ${data().length} games`} />
      <div class="flex flex-wrap justify-center gap-4 px-4 py-8">
        {data().map((game) => {
          if (game.name.includes(search())) return <Game game={game} />
        })}
      </div>
    </div>
  )
}
