import { useState } from 'react'
import store from 'store2'
import { encodeXor } from '../utils'

function Frame({ src, handleLoad, frameRef }: { src: string, handleLoad: () => void, frameRef: React.RefObject<HTMLIFrameElement>}) {
  // const [bareLoaded, setBareLoaded] = useState(false)

  var proxiedSrc = src ? `/~/${store('proxy') || 'uv'}/` + encodeXor(src) : undefined
  const [loading, setLoading] = useState(true)

  function load() {
    handleLoad()
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <div className="loader bg-base-100 flex items-center justify-center flex-col">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : null}
      <iframe ref={frameRef} src={proxiedSrc} className="frame" onLoad={load} />
    </>
  )
}

export default Frame
