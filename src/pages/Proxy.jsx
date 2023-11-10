import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'

import Frame from '../components/Frame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as far from '@fortawesome/free-regular-svg-icons'

import config from '../config'
import store from 'store2'
import toast from 'react-hot-toast'
import search from '../scripts/search'
import aboutblank from '../scripts/aboutblank'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Proxy() {
  const [urlInput, setUrlInput] = useState('')
  const params = useQuery()
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)
  const frameRef = useRef()
  const proxy = store('proxy') || 'uv'

  const src = params.get('src')

  useEffect(() => {
    if (!src) navigate('/')
  })

  function handleLoad() {
    // console.log(frameRef.current.contentWindow)
    if (`__${proxy}$location` in frameRef.current.contentWindow) {
      const url = new URL(frameRef.current.contentWindow[`__${proxy}$location`].href)
      setUrlInput(url.toString())

      if (config.compatibility[proxy == 'uv' ? 'dynamic' : 'uv'].includes(url.host)) {
        toast('This might work better on the other proccy')
      }
    }
  }

  return (
    <>
      <Frame src={search(atob(src), 'https://google.com/search?q=%s')} handleLoad={handleLoad} frameRef={frameRef} />

      <div className={`fixed bottom-0 p-2`}>
        {hidden || (
          <>
            <div className="join ml-[50vw] horizCenter">
              <span className="tooltip" data-tip="Back">
                <button
                  className="btn join-item"
                  onClick={() => {
                    frameRef.current.contentWindow.history.back()
                  }}
                >
                  <FontAwesomeIcon icon={fas.faArrowLeft} />
                </button>
              </span>

              <span className="tooltip" data-tip="Reload">
                <button
                  className="btn join-item"
                  onClick={() => {
                    frameRef.current.contentWindow.location.reload()
                  }}
                >
                  <FontAwesomeIcon icon={fas.faRotateRight} />
                </button>
              </span>

              <input type="text" className="input bg-base-200 join-item w-80 focus:outline-none placeholder:opacity-70 outline-none" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />

              {/* <span className="tooltip" data-tip="Add to Favorites">
                <button className="btn join-item">
                  <FontAwesomeIcon icon={far.faStar} />
                </button>
              </span> */}

              <span className="tooltip" data-tip="Open in new tab">
                <button
                  className="btn join-item"
                  onClick={() => {
                    window.open(`/~/${proxy}/${btoa(frameRef.current.contentWindow[`__${proxy}$location`].href)}`)
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
