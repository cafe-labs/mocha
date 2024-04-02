import { createBareServer } from '@tomphttp/bare-server-node'
import httpProxy from 'http-proxy'
import express from 'express'
import http from 'node:http'
import pico from 'picocolors'
import { build } from 'vite'

const httpServer = http.createServer()
const proxy = httpProxy.createProxyServer();
const bareServer = createBareServer('/-/')

const app = express()
const PORT = process.env.PORT || 3003

console.log(pico.cyan(pico.bold('Building frontend...')))
await build()

app.use(express.static('dist'))

app.use('/cdn', (req, res) => {
  proxy.web(req, res, {
    target: 'https://assets.3kh0.net',
    changeOrigin: true,
    pathRewrite: {
      '^/cdn': '', // Rewrite the path removing '/cdn' prefix
    },
  });
});

httpServer.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

httpServer.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

httpServer.on('listening', () => {
  console.log(pico.green(pico.bold(`Mocha server online!`)))
  console.log(pico.gray(`- http://localhost:${PORT}`))
})

httpServer.listen({
  port: PORT
})
