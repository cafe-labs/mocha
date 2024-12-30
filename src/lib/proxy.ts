import store from 'store2'
import type { TransportData } from './types'
import { transports } from './transport'
import { BareMuxConnection } from '@mercuryworkshop/bare-mux'
import { setProxyStatus } from '../routes/route'

export const wispUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/wisp/`

export async function setupProxy() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      for await (const registration of registrations) {
        await registration.unregister()
      }

      navigator.serviceWorker.register('/sw.js').then((registration) => {
        registration.update().then(() => {
          console.log('Service worker registered')
        })
      })

      navigator.serviceWorker.ready.then(async () => {
        console.log('Service worker ready')
      })
    })

    const transportData = store('transport') as TransportData
    console.log('Using', transports[transportData.transport])
    const connection = new BareMuxConnection('/bare-mux/worker.js')
    await connection.setTransport(transports[transportData.transport], [{ wisp: wispUrl }])
    setProxyStatus(true)
  }
}
