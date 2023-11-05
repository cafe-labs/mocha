import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import search from '../scripts/search'
import aboutblank from '../scripts/aboutblank'

import Frame from '../components/Frame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as far from '@fortawesome/free-regular-svg-icons'
import store from 'store2'
import toast from 'react-hot-toast'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Proxy() {
  const [frameSrc, setFrameSrc] = useState()
  const [urlInput, setUrlInput] = useState('')
  const params = useQuery()
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)
  const frameRef = useRef()
  const proxy = store('proxy')

  const [src, setSrc] = useState(params.get('src'))

  useEffect(() => {
    if (!src) navigate('/')
  })

  var modifiedSrc = atob(src)
  modifiedSrc = search(modifiedSrc, 'https://google.com/search?q=%s')

  function handleLoad() {
    if (frameRef.current.contentWindow == undefined) return
    setUrlInput(frameRef.current.contentWindow[`__${proxy}$location`].href)
  }

  return (
    <>
      <Frame src={modifiedSrc} handleChange={handleLoad} frameRef={frameRef} />

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

              <span className="tooltip" data-tip="Add to Favorites">
                <button className="btn join-item">
                  <FontAwesomeIcon icon={far.faStar} />
                </button>
              </span>

              <span className="tooltip" data-tip="Open in new tab">
                <button
                  className="btn join-item"
                  onClick={() => {
                    aboutblank(`/~/${proxy}/${btoa(frameRef.current.contentWindow[`__${proxy}$location`].href)}`)
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
