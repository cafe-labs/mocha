import { A, useParams, useSearchParams } from '@solidjs/router'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight, CircleAlert, FileCode, Home, PanelBottomClose, PanelBottomOpen, RotateCw, SquareArrowOutUpRight, TriangleAlert } from 'lucide-solid'
import { createSignal, onMount } from 'solid-js'
import toast from 'solid-toast'
import store from 'store2'
import { openAbWindow } from '../lib/aboutblank'
import { handlePanicKey } from '../lib/panic'
import { patches } from '../lib/patch'
import { handleTransport } from '../lib/transport'
import { ContentWindow, TransportData } from '../lib/types'
import { encodeXor, formatSearch } from '../lib/utils'

export default function Route() {
  var ref: HTMLIFrameElement
  const [url, setUrl] = createSignal('')
  const [showControls, setShowControls] = createSignal(true)

  const params = useParams()
  const [searchParams] = useSearchParams()

  onMount(() => {
    if (searchParams.hidecontrolbar == 'true') {
      setShowControls(false)
    }

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

    const hostname = contentWindow.__uv$location.hostname
    console.log(hostname)

    const patch = patches.find((x) => hostname.includes(x.hostname))
    if (!patch) return

    if (patch.suggestedTransport && patch.suggestedTransport !== (store('transport') as TransportData).transport) {
      toast.custom((x) => {
        return (
          <div class="toast toast-center toast-top">
            <div class="alert alert-warning">
              <TriangleAlert />
              <span>
                This website might run better with the <span class="font-semibold">{patch.suggestedTransport}</span> transport enabled. <br />{' '}
                <span
                  class="cursor-pointer underline underline-offset-4"
                  onClick={() => {
                    handleTransport(patch.suggestedTransport)
                    toast.dismiss(x.id)
                    contentWindow.location.reload()
                  }}
                >
                  Set Transport
                </span>
              </span>
            </div>
          </div>
        )
      })
    }

    if (patch.works == false) {
      toast.custom(() => {
        return (
          <div class="toast toast-center toast-top">
            <div class="alert alert-error">
              <CircleAlert />
              <span>This website is known not to work correctly.</span>
            </div>
          </div>
        )
      })
    }

    if (patch.execute) {
      patch.execute(contentWindow)
    }
  }
  return (
    <div>
      <iframe class="h-screen w-screen fixed" ref={ref!} onLoad={handleLoad} />

      <div class={clsx('rounded-m join fixed left-1/2 z-40 -translate-x-1/2 bg-base-200 px-2 transition-[bottom] duration-300', showControls() ? 'bottom-2' : '-bottom-16')}>
        <div class="tooltip" data-tip="Go back">
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
        </div>

        <div class="tooltip" data-tip="Reload">
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
        </div>
        <div class="tooltip" data-tip="Go forward">
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
        </div>

        <input
          value={url()}
          type="text"
          class="input join-item w-96 bg-base-200 focus:outline-none "
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            if (!ref || !ref.contentWindow) return

            ref.src = '/~/' + encodeXor(formatSearch(e.currentTarget.value))
            e.currentTarget.blur()
          }}
        />
        <div class="tooltip" data-tip="Return to home screen">
          <A class="btn btn-square join-item bg-base-200" href="/">
            <Home class="h-5 w-5" />
          </A>
        </div>

        <div class="tooltip" data-tip="Toggle devtools">
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
        </div>
        <div class="tooltip" data-tip="Pop-out tab in about:blank">
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
        </div>
        <div class="tooltip" data-tip="Minimize control bar">
          <button
            class="btn btn-square join-item bg-base-200"
            onClick={() => {
              setShowControls(false)
            }}
          >
            <PanelBottomClose class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class={clsx('fixed bottom-2 right-2 transition-opacity duration-300', showControls() ? 'opacity-0 pointer-events-none' : 'opacity-100')}>
        <div class="tooltip tooltip-left" data-tip="Maximize control bar">
          <button class="btn btn-square btn-ghost" onClick={() => setShowControls(true)}>
            <PanelBottomOpen />
          </button>
        </div>
      </div>
    </div>
  )
}
