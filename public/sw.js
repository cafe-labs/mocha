importScripts("/epoxy/index.js");
importScripts("/libcurl/index.js");
importScripts('/coffee/bundle.js')
importScripts('/coffee/config.js')
importScripts(__uv$config.sw || '/coffee/sw.js')

const sw = new UVServiceWorker()

self.addEventListener('fetch', event => {
  event.respondWith(
      (async ()=>{
          if(event.request.url.startsWith(location.origin + __uv$config.prefix)) {
              return await sw.fetch(event);
          }
          return await fetch(event.request);
      })()
  );
});