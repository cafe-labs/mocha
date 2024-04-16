import store from 'store2'
import { TransportData } from '../types'

// @ts-expect-error
import { SetTransport } from '@mercuryworkshop/bare-mux'

export const transports = {
  epoxy: 'EpxMod.EpoxyClient',
  libcurl: 'CurlMod.LibcurlClient'
}

export const wispUrl = `${window.location.protocol == 'https:' ? 'wss' : 'ws'}://${window.location.host}/-/`

export function handleTransport() {
  const transportData = store('transport') as TransportData
  SetTransport(transports[transportData.transport], { wisp: wispUrl })
}
