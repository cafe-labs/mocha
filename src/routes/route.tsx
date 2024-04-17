import { useParams, useSearchParams } from '@solidjs/router'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight, FileCode, PanelBottomClose, PanelBottomOpen, RotateCw, SquareArrowOutUpRight } from 'lucide-solid'
import { createSignal, onMount } from 'solid-js'
import { openAbWindow } from '../lib/settings/aboutblank'
import { handlePanicKey } from '../lib/settings/panic'
import { ContentWindow } from '../lib/types'
import { encodeXor, formatSearch } from '../lib/utils'

export default function Route() {
  var ref: HTMLIFrameElement
  const [url, setUrl] = createSignal('')
  const [showControls, setShowControls] = createSignal(true)

  const params = useParams()
  const [searchParams] = useSearchParams()
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

      {searchParams.hidecontrolbar == 'true' ? null : (
        <div class={clsx('rounded-m join fixed bottom-2 left-1/2 z-40 -translate-x-1/2 bg-base-200 px-2 transition-[bottom] duration-300', showControls() ? 'bottom-2' : '-bottom-16')}>
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

              openAbWindow(contentWindow.location.href, false)
            }}
          >
            <SquareArrowOutUpRight class="h-5 w-5" />
          </button>
          <button
            class="btn btn-square join-item bg-base-200"
            onClick={() => {
              setShowControls(false)
            }}
          >
            <PanelBottomClose class="h-5 w-5" />
          </button>
        </div>
      )}

      <div class={clsx('fixed bottom-2 right-2 transition-opacity duration-300', showControls() ? 'opacity-0' : 'opacity-50')}>
        <button class="btn btn-square btn-ghost" onClick={() => setShowControls(true)}>
          <PanelBottomOpen />
        </button>
      </div>
    </div>
  )
}
