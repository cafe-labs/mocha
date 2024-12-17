import store from 'store2'
import type { TransportData } from './types'

import { BareMuxConnection } from '@mercuryworkshop/bare-mux'

export const transports = {
  epoxy: 'EpxMod.EpoxyClient',
  libcurl: 'CurlMod.LibcurlClient'
}

export const wispUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/wisp/`

export async function handleTransport(transport?: keyof typeof transports) {
  const transportData = store('transport') as TransportData
  const connection = new BareMuxConnection('/bare-mux/worker.js')
  await connection.setTransport(transportData.transport, [{ wisp: wispUrl }])

  if (transport) {
    store('transport', {
      transport
    } satisfies TransportData)
  }
}
