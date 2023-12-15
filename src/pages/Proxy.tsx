import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'

import Frame from '../components/Frame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fas from '@fortawesome/free-solid-svg-icons'

import config from '../config'
import store from 'store2'
import toast from 'react-hot-toast'
import { decodeXor, encodeXor, formatSearch } from '../utils'
import { ProxyWindow } from '../types'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Proxy() {
  const [urlInput, setUrlInput] = useState('')
  const params = useQuery()
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const proxy = store('proxy') || 'uv'

  const src = params.get('src') || ''

  useEffect(() => {
    if (!src) navigate('/')
  })

  function handleLoad() {
    // console.log(frameRef.current.contentWindow)
    if (`__${proxy}$location` in frameRef.current!.contentWindow!) {
      //@ts-ignore
      const url = new URL(frameRef.current.contentWindow[`__${proxy}$location`].href)
      setUrlInput(url.toString())

      if (config.compatibility[proxy == 'uv' ? 'dynamic' : 'uv'].includes(url.host)) {
        toast('This might work better on the other proccy')
      }
    }
  }

  return (
    <>
      <Frame src={formatSearch(decodeXor(src))} handleLoad={handleLoad} frameRef={frameRef} />
      <div className={`fixed bottom-0 p-2`}>
        {hidden || (
          <>
            <div className="join ml-[50vw] horizCenter">
              <span className="tooltip" data-tip="Back">
                <button
                  className="btn join-item"
                  onClick={() => {
                    if (!frameRef.current) return
                    frameRef.current.contentWindow?.history.back()
                  }}
                >
                  <FontAwesomeIcon icon={fas.faArrowLeft} />
                </button>
              </span>

              <span className="tooltip" data-tip="Reload">
                <button
                  className="btn join-item"
                  onClick={() => {
                    if (!frameRef.current) return
                    frameRef.current.contentWindow?.location.reload()
                  }}
                >
                  <FontAwesomeIcon icon={fas.faRotateRight} />
                </button>
              </span>

              <input
                type="text"
                className="input bg-base-200 join-item w-80 focus:outline-none placeholder:opacity-70 outline-none"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key == 'Enter') navigate(`/view?src=${encodeXor((e.target as HTMLInputElement).value)}`)
                }}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />

              {/* <span className="tooltip" data-tip="Add to Favorites">
                <button className="btn join-item">
                  <FontAwesomeIcon icon={far.faStar} />
                </button>
              </span> */}

              <span className="tooltip" data-tip="Toggle devtools">
                <button
                  className="btn join-item"
                  onClick={() => {
                    if (!frameRef.current) return
                    var contentWindow = frameRef.current.contentWindow as ProxyWindow
                    if (!contentWindow) return
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
                  <FontAwesomeIcon icon={fas.faFileCode} />
                </button>
              </span>

              <span className="tooltip" data-tip="Open in new tab">
                <button
                  className="btn join-item"
                  onClick={() => {
                    // @ts-ignore
                    window.open(`/~/${proxy}/${encodeXor(frameRef.current.contentWindow[`__${proxy}$location`].href)}`)
                  }}
                >
                  <FontAwesomeIcon icon={fas.faArrowUpRightFromSquare} />
                </button>
              </span>

              <span className="tooltip" data-tip="Minimize menu">
                <button
                  className="btn join-item"
                  onClick={() => {
                    setHidden(true)
                  }}
                >
                  <FontAwesomeIcon className="rotate-180" icon={fas.faArrowRightToBracket} />
                </button>
              </span>
            </div>
          </>
        )}

        {hidden && (
          <button
            className="btn btn-ghost"
            onClick={() => {
              setHidden(false)
            }}
          >
            <FontAwesomeIcon icon={fas.faArrowRightToBracket} />
          </button>
        )}
      </div>
    </>
  )
}

export default Proxy
