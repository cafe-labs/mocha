import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import store from 'store2'

function Frame({ src, handleChange, frameRef }) {
  const [bareLoaded, setBareLoaded] = useState(false)

  var proxiedSrc = src ? `/~/${store('proxy') || 'uv'}/` + btoa(src) : null
  const [loading, setLoading] = useState(true)

  function handleLoad() {
    handleChange()
    setLoading(false)
    if (src.includes('play.geforcenow.com')) {
      toast(
        (t) => (
          <span>
            This page is known to be unstable on Ultraviolet. Switching to
            Dynamic might fix this - go to the{' '}
            <Link
              to="/settings"
              className="link"
              onClick={() => toast.dismiss(t.id)}
            ></Link>
            to learn more.
          </span>
        ),
        {
          icon: '⚠️'
        }
      )
    }
  }

  return (
    <>
      {loading ? (
        <div className="loader bg-base-100 flex items-center justify-center flex-col">
          <h1 className="text-3xl	font-bold">Loading your content...</h1>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : null}
      <iframe
        ref={frameRef}
        src={proxiedSrc}
        className="frame"
        onLoad={handleLoad}
      />
    </>
  )
}

export default Frame
