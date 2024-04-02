import { createSignal, onMount } from 'solid-js'
import Game from '../components/game'
import { GameData } from '../lib/types'

export default function Games() {
  const [data, setData] = createSignal<GameData[]>([])

  onMount(() => {
    fetch('/games.json')
      .then((res) => res.json())
      .then((res: GameData[]) => {
        setData(res)
      })
  })

  return (
    <div class="flex flex-wrap justify-center px-4 py-8 gap-4">
      {data().map((game) => {
        return <Game game={game} />
      })}
    </div>
  )
}
