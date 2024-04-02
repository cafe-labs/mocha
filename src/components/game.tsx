import { useNavigate } from '@solidjs/router'
import { GameData } from '../lib/types'

export default function Game({ game }: { game: GameData }) {
  const navigate = useNavigate()
  function play() {
    const url = `https://assets.3kh0.net/${game.id}/${game.file}`

    navigate(`/route/${btoa(url)}?hidecontrolbar=true`)
  }

  return (
    <div class="card image-full w-80 aspect-video bg-base-100 shadow-xl">
      <figure>
        <img src={`/cdn/${game.id}/${game.image}`} alt={game.name} class="h-full w-full object-full" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold text-base-content">{game.name}</h2>
        <div class="card-actions absolute bottom-4 right-4 justify-end">
          <button class="btn btn-primary px-8" onClick={play}>
            Play
          </button>
        </div>
      </div>
    </div>
  )
}
