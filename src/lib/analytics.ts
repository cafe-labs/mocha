import plausible from 'plausible-tracker'

export const analytics = plausible({
  apiHost: __PRODUCTION__ ? window.location.origin : 'https://analytics.proudparrot2.com',
  domain: 'mochaproxy.com',
  trackLocalhost: true
})
