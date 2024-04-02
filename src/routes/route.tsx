import { useParams } from '@solidjs/router'
import { ChevronLeft, ChevronRight, FileCode, RotateCw, SquareArrowOutUpRight } from 'lucide-solid'
import { createSignal, onMount } from 'solid-js'
import { openAbWindow } from '../lib/settings/aboutblank'
import { handlePanicKey } from '../lib/settings/panic'
import { ContentWindow } from '../lib/types'
import { encodeXor, formatSearch } from '../lib/utils'

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

    contentWindow.addEventListener('keydown', handlePanicKey)
  }
  return (
    <div>
      <iframe class="h-[calc(100vh-4rem)] w-screen" ref={ref!} onLoad={handleLoad} />

      <div class="rounded-m join absolute bottom-2 left-1/2 z-40 -translate-x-1/2 bg-base-200 px-2">
        <button
          class="btn btn-square join-item bg-base-200"
          onClick={() => {
            if (!ref || !ref.contentWindow) return
            const contentWindow = ref.contentWindow as ContentWindow

            contentWindow.history.back()
          }}
        >
          <ChevronLeft class="h-5 w-5" />
        </button>
        <button
          class="btn btn-square join-item bg-base-200"
          onClick={() => {
            if (!ref || !ref.contentWindow) return
            const contentWindow = ref.contentWindow as ContentWindow

            contentWindow.location.reload()
          }}
        >
          <RotateCw class="h-5 w-5" />
        </button>
        <button
          class="btn btn-square join-item bg-base-200"
          onClick={() => {
            if (!ref || !ref.contentWindow) return
            const contentWindow = ref.contentWindow as ContentWindow

            contentWindow.history.forward()
          }}
        >
          <ChevronRight class="h-5 w-5" />
        </button>
        <input
          value={url()}
          type="text"
          class="input join-item w-80 bg-base-200 focus:outline-none "
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            if (!ref || !ref.contentWindow) return

            ref.src = '/~/' + encodeXor(formatSearch(e.currentTarget.value))
            e.currentTarget.blur()
          }}
        />
        <button
          class="btn btn-square join-item bg-base-200"
          onClick={() => {
            if (!ref || !ref.contentWindow) return
            const contentWindow = ref.contentWindow as ContentWindow

            if (contentWindow.eruda?._isInit) {
              contentWindow.eruda.destroy()
            } else {
              var erudaScript = contentWindow.document.createElement('script')
              erudaScript.src = 'https://cdn.jsdelivr.net/npm/eruda'
              erudaScript.onload = () => {
                if (!contentWindow) return
                contentWindow.eruda.init()
                contentWindow.eruda.show()
              }
              contentWindow.document.body.appendChild(erudaScript)
            }
          }}
        >
          <FileCode class="h-5 w-5" />
        </button>
        <button
          class="btn btn-square join-item bg-base-200"
          onClick={() => {
            if (!ref || !ref.contentWindow) return
            const contentWindow = ref.contentWindow as ContentWindow

            openAbWindow(contentWindow.location.href)
          }}
        >
          <SquareArrowOutUpRight class="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
