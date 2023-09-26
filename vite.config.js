
const { defineConfig } = require("vite")
const react = require("@vitejs/plugin-react-swc")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1234
  }
})
