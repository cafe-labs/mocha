importScripts('https://unpkg.com/@mercuryworkshop/epoxy-transport@1.1.0/dist/index.js')
importScripts('https://unpkg.com/@mercuryworkshop/libcurl-transport@1.3.1/dist/index.js')
importScripts('/coffee/bundle.js')
importScripts('/coffee/config.js')
importScripts(__uv$config.sw || '/coffee/sw.js')

const sw = new UVServiceWorker()

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        return await sw.fetch(event)
      }
      return await fetch(event.request)
    })()
  )
})
