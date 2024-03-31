import { useNavigate } from '@solidjs/router'
import { Search } from 'lucide-solid'
import { createSignal } from 'solid-js'

export default function Home() {
  const [query, setQuery] = createSignal('')
  const navigate = useNavigate()
  function processInput() {
    navigate(`/route/${btoa(query())}`)
  }
  return (
    <div>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-screen">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-12 w-12">
            <path fill="currentColor" d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z" />
          </svg>
          <h1 class="text-5xl font-semibold">Mocha</h1>
        </div>
        <div class="join w-1/3">
          <input
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return
              processInput()
            }}
            value={query()}
            onInput={(e) => setQuery(e.target.value)}
            placeholder="Enter a search query or URL"
            type="text"
            class="input join-item bg-base-300 w-full rounded-m focus:outline-none"
          />
          <button class="join-item btn bg-base-300 rounded-m" onClick={processInput}>
            <Search class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="absolute bottom-0 w-screen p-4 px-6 text-sm flex items-center justify-between">
        &copy; 2024 proudparrot2
        <div class="flex gap-4">
          <a class="link link-hover">GitHub</a>
          <a class="link link-hover">Discord</a>
        </div>
      </div>
    </div>
  )
}
