import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import wisp from 'wisp-server-node'

export default defineConfig({
  plugins: [
    solid(),
    viteStaticCopy({
      targets: [
        {
          src: './node_modules/@mercuryworkshop/epoxy-transport/dist/index.js',
          dest: 'epoxy'
        },
        {
          src: './node_modules/@mercuryworkshop/libcurl-transport/dist/index.js',
          dest: 'libcurl'
        }
      ]
    }),
    {
      name: 'Wisp Server',
      configureServer(server) {
        server.httpServer?.on('upgrade', (req, socket, head) => {
          if (req.url?.startsWith('/wisp/')) {
            wisp.routeRequest(req, socket, head)
          }
        })
      }
    }
  ],
  server: {
    proxy: {
      // For development purposes
      '/cdn': {
        target: 'https://assets.3kh0.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, '')
      }
      // '/wisp/': {
      //   target: 'https://wisp.mercurywork.shop/',
      //   changeOrigin: true,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/wisp\//, '')
      // }
    }
  },
  define: {
    __BUILD_DATE__: Date.now(),
    __GIT_COMMIT__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.CF_PAGES_COMMIT_SHA ?? execSync('git rev-parse HEAD').toString().trim())
  }
})
