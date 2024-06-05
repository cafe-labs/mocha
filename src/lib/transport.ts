import store from 'store2'
import { TransportData } from './types'

// @ts-expect-error
import { SetTransport } from '@mercuryworkshop/bare-mux'

export const transports = {
  epoxy: 'EpxMod.EpoxyClient',
  libcurl: 'CurlMod.LibcurlClient'
}

export const wispUrl = `${window.location.protocol == 'https:' ? 'wss' : 'ws'}://${window.location.host}/wisp/`

export function handleTransport(transport?: keyof typeof transports) {
  const transportData = store('transport') as TransportData
  SetTransport(transports[transport || transportData.transport], { wisp: wispUrl })

  if (transport) {
    store('transport', {
      transport
    } satisfies TransportData)
  }
}
