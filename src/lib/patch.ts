import type { Patch } from './types'

export const patches: Patch[] = [
  {
    hostname: 'neal.fun',
    suggestedTransport: 'libcurl'
  },
  {
    hostname: 'instagram.com',
    works: false
  },
  {
    hostname: 'google.com',
    execute(contentWindow) {
      const currentUrl = new URL(contentWindow.__uv$location.href)
      const currentLanguage = currentUrl.searchParams.get('hl')
      const currentGeoLocation = currentUrl.searchParams.get('gl')
      let changed = false

      if (currentLanguage !== 'en') {
        currentUrl.searchParams.set('hl', 'en')
        changed = true
      }

      if (currentGeoLocation !== 'us') {
        currentUrl.searchParams.set('gl', 'us')
        changed = true
      }

      if (changed) contentWindow.__uv$location.href = currentUrl.toString()
    }
  }
]
