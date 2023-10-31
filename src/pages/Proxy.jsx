import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import search from '../scripts/search'

import Frame from '../components/Frame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as far from '@fortawesome/free-regular-svg-icons'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Proxy() {
  const [frameSrc, setFrameSrc] = useState()
  const [urlInput, setUrlInput] = useState('')
  const params = useQuery()
  const navigate = useNavigate()

  const [src, setSrc] = useState(params.get('src'))

  useEffect(() => {
    if (!src) navigate('/')
  })

  var modifiedSrc = atob(src)
  modifiedSrc = search(modifiedSrc, 'https://google.com/search?q=%s')

  if (atob(src).includes('lol')) modifiedSrc = 'weoutfdx'
  const [hidden, setHidden] = useState(false)
  const frameRef = useRef();

  function handleLoad() {
    console.log('loaded')
    console.log(frameRef)
  }

  return (
    <>
      <Frame src={modifiedSrc} handleChange={handleLoad} frameRef={frameRef} />

      <div className={`fixed bottom-0 p-2`}>
        {hidden || (
          <>
            <div className="join ml-[50vw] horizCenter">
              <button className="btn join-item ">
                <FontAwesomeIcon
                  icon={fas.faArrowLeft}
                  onClick={() => {
                    console.log(frameRef.current.src)
                  }}
                />
              </button>
              <button className="btn join-item ">
                <FontAwesomeIcon icon={fas.faRotateRight} />
              </button>
              <input
                type="text"
                className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button className="btn join-item ">
                <FontAwesomeIcon icon={far.faStar} />
              </button>
              <button className="btn join-item ">
                <FontAwesomeIcon icon={fas.faArrowUpRightFromSquare} />
              </button>
              <button
                className="btn join-item "
                onClick={() => {
                  setHidden(true)
                }}
              >
                <FontAwesomeIcon
                  className="rotate-180"
                  icon={fas.faArrowRightToBracket}
                />
              </button>
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
