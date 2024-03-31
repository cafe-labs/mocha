import { A, useParams } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'
import { encodeXor, formatSearch } from '../lib/utils'
import { ChevronLeft, ChevronRight, FileCode, RotateCw, SquareArrowOutUpRight, Home } from 'lucide-solid'

interface ContentWindow extends Window {
  __uv$location: Location
}

export default function Route() {
  var ref: HTMLIFrameElement
  const [url, setUrl] = createSignal('')

  const params = useParams()
  onMount(() => {
    if (!ref || !ref.contentWindow) return
    const query = atob(params.route)

    ref.src = '/~/' + encodeXor(formatSearch(query))
  })

  function handleLoad() {
    if (!ref || !ref.contentWindow) return

    const contentWindow = ref.contentWindow as ContentWindow

    if ('__uv$location' in contentWindow) {
      setUrl(contentWindow.__uv$location.href)
    }
  }
  return (
    <div>
      <iframe class="w-screen h-[calc(100vh-4rem)]" ref={ref!} onLoad={handleLoad} />

      <div class="absolute bottom-2 z-40 join left-1/2 bg-base-200 -translate-x-1/2 rounded-m px-2">
        <button class="btn btn-square join-item bg-base-200">
          <ChevronLeft class="h-5 w-5" />
        </button>
        <button class="btn btn-square join-item bg-base-200">
          <RotateCw class="h-5 w-5" />
        </button>
        <A href="/">
          <button class="btn btn-square join-item bg-base-200">
            <Home class="h-5 w-5" />
          </button>
        </A>
        <button class="btn btn-square join-item bg-base-200">
          <ChevronRight class="h-5 w-5" />
        </button>
        <input value={url()} type="text" class="input join-item w-80 bg-base-200 focus:outline-none " />
        <button class="btn btn-square join-item bg-base-200">
          <FileCode class="h-5 w-5" />
        </button>
        <button class="btn btn-square join-item bg-base-200">
          <SquareArrowOutUpRight class="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
