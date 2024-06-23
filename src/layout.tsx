import { ParentProps, onCleanup, onMount } from 'solid-js'
import { Toaster } from 'solid-toast'
import Navbar from './components/navbar'

import store from 'store2'
import { handleAboutBlank } from './lib/aboutblank'
import { handleTabCloak } from './lib/cloak'
import { handlePanicKey } from './lib/panic'
import { handleTheme } from './lib/theme'
import { handleTransport } from './lib/transport'

export default function Layout(props: ParentProps) {
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(async (registrations) => {
        for await (let registration of registrations) {
          await registration.unregister()
        }

        navigator.serviceWorker.register('/sw.js').then((registration) => {
          registration.update().then(() => {
            console.log('Service worker registered')
          })
        })

        navigator.serviceWorker.ready.then(async () => {
          console.log('Service worker ready')
          store('swReady', true)
          handleTransport()
        })
      })
    }

    handleTabCloak()
    handleTheme()
    handleAboutBlank()
    handleTransport()
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
