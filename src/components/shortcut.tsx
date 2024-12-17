import { useNavigate } from '@solidjs/router'
import type { ShortcutData } from '../lib/types'

export default function Shortcut({ shortcut }: { shortcut: ShortcutData }) {
  const navigate = useNavigate()
  function play() {
    navigate(`/route/${btoa(shortcut.url)}`)
  }

  return (
    <div class="card image-full aspect-video w-80 bg-base-100 shadow-xl">
      <figure>
        <img src={shortcut.image} class="object-full h-full w-full" alt="Game" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold text-base-content">{shortcut.name}</h2>
        <div class="card-actions absolute bottom-4 right-4 justify-end">
          <button class="btn btn-primary px-8" type="button" onClick={play}>
            Launch
          </button>
        </div>
      </div>
    </div>
  )
}
