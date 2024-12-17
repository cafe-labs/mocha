import { Trash } from 'lucide-solid'
import { Show } from 'solid-js'
import { bookmarks, handleBookmark } from '../lib/bookmarks'
import { useNavigate } from '@solidjs/router'

export default function Bookmarks() {
  const navigate = useNavigate()
  return (
    <div class="flex flex-col items-center gap-4 w-full mt-20 px-4">
      {bookmarks().map((bookmark) => {
        return (
          // biome-ignore lint: Doesn't accept keys for some reason
          <div class="flex justify-between items-center bg-base-200 hover:bg-base-300 duration-200 h-12 w-full sm:w-[40rem] rounded-box px-6 group">
            <div class="flex items-center gap-4">
              <img alt={bookmark.title} src={bookmark.image} class="h-6 w-6 rounded-md" />
              <p
                onMouseDown={() => {
                  navigate(`/route/${btoa(bookmark.url)}`)
                }}
                class="link link-hover font-medium underline-offset-4"
              >
                {bookmark.title}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                handleBookmark(bookmark)
              }}
              class="btn btn-square btn-ghost btn-sm sm:opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
            >
              <Trash class="h-4 w-4 text-red-400" />
            </button>
          </div>
        )
      })}

      <Show when={bookmarks().length < 1}>
        <p class="italic text-center">
          You don't have any bookmarks saved! <br /> Click the bookmark icon while browsing to save it here.
        </p>
      </Show>
    </div>
  )
}
