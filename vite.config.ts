import { defineConfig } from 'vite'
import { execSync } from 'child_process'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    proxy: {
      '/cdn': {
        target: 'https://assets.3kh0.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, '')
      }
    }
  },
  define: {
    __BUILD_DATE__: Date.now(),
    __GIT_COMMIT__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.CF_PAGES_COMMIT_SHA ?? execSync('git rev-parse HEAD').toString().trim())
  }
})
