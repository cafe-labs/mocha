import { Patch } from './types'

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

      if (currentLanguage !== 'en') {
        currentUrl.searchParams.set('hl', 'en')
        contentWindow.__uv$location.href = currentUrl.toString()
      }
    }
  }
]
