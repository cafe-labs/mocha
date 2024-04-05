importScripts("/epoxy/index.js");
importScripts('/coffee/bundle.js')
importScripts('/coffee/config.js')
importScripts(__uv$config.sw || '/coffee/sw.js')

const sw = new UVServiceWorker()

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)))
