import { ParentProps, onCleanup, onMount } from 'solid-js'
import { Toaster } from 'solid-toast'
import Navbar from './components/navbar'
import { handleTabCloak } from './lib/settings/cloak'
import { handlePanicKey } from './lib/settings/panic'
import { handleAboutBlank } from './lib/settings/aboutblank'

export default function Layout(props: ParentProps) {
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/~/'
      })
    }

    handleTabCloak()
    handleAboutBlank()
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
