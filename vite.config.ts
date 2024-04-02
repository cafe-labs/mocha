import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    proxy: {
      "/cdn": {
        target: "https://assets.3kh0.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
      }
    }
  }
})
