import { type ParentProps, onCleanup, onMount } from 'solid-js'
import { Toaster } from 'solid-toast'
import Navbar from './components/navbar'

import { handleAboutBlank } from './lib/aboutblank'
import { handleTabCloak } from './lib/cloak'
import { handlePanicKey } from './lib/panic'
import { handleTheme } from './lib/theme'
import { setupProxy } from './lib/proxy'

export default function Layout(props: ParentProps) {
  onMount(async () => {
    handleTabCloak()
    handleTheme()
    handleAboutBlank()
    await setupProxy()
    document.addEventListener('keydown', handlePanicKey)
  })

  onCleanup(() => {
    document.removeEventListener('keydown', handlePanicKey)
  })
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      {props.children}
    </div>
  )
}
