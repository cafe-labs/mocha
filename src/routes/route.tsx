import { A, useParams } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'
import { encodeXor, formatSearch } from '../lib/utils'
import { ChevronLeft, ChevronRight, FileCode, RotateCw, SquareArrowOutUpRight, Home } from 'lucide-solid'
import { handlePanicKey } from '../lib/settings/panic'
import { openAbWindow } from '../lib/settings/aboutblank'
import { ContentWindow } from '../lib/types'

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
      <iframe class="w-screen h-[calc(100vh-4rem)]" ref={ref!} onLoad={handleLoad} />

      <div class="absolute bottom-2 z-40 join left-1/2 bg-base-200 -translate-x-1/2 rounded-m px-2">
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
        <A href="/">
          <button class="btn btn-square join-item bg-base-200">
            <Home class="h-5 w-5" />
          </button>
        </A>
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
        <input value={url()} type="text" class="input join-item w-80 bg-base-200 focus:outline-none " />
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
