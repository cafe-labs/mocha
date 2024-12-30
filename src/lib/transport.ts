import store from 'store2'
import type { TransportData } from './types'

import { setupProxy } from './proxy'

export const transports = {
  epoxy: '/epoxy/index.mjs',
  libcurl: '/libcurl/index.mjs'
}

export async function handleTransport(transport?: keyof typeof transports) {
  if (transport) {
    store('transport', {
      transport
    } satisfies TransportData)
  }

  await setupProxy()
}
