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
  }

  return (
    <>
      {loading ? (
        <div className="loader bg-base-100 flex items-center justify-center flex-col">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : null}
      <iframe ref={frameRef} src={proxiedSrc} className="frame" onLoad={handleLoad} />
    </>
  )
}

export default Frame
