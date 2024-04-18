import store from 'store2'
import { TransportData } from '../types'

// @ts-expect-error
import { SetTransport } from '@mercuryworkshop/bare-mux'
import { setShowWarning } from '../../components/warning'

export const transports = {
  epoxy: 'EpxMod.EpoxyClient',
  libcurl: 'CurlMod.LibcurlClient'
}

export const wispUrl = `${window.location.protocol == 'https:' ? 'wss' : 'ws'}://${window.location.host}/-/`
var transportSet = false;

export function handleTransport() {
  const transportData = store('transport') as TransportData
  SetTransport(transports[transportData.transport], { wisp: wispUrl })
  transportSet = true
}

setTimeout(() => {
  const swReady = store('swReady')
  console.log(swReady)
  if (!swReady && !transportSet) {
    setShowWarning(true)
  }
}, 5000)
