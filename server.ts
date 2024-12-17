import { consola } from 'consola'
import express from 'express'
import httpProxy from 'http-proxy'
import wisp from 'wisp-server-node'
import http from 'node:http'
import path from 'node:path'
import { build } from 'vite'
import type { Socket } from 'node:net'

const httpServer = http.createServer()
const proxy = httpProxy.createProxyServer()

const app = express()
const port = process.env.PORT || 3003

consola.start('Building frontend')
await build()

app.use(express.static('dist'))

app.use('/cdn', (req, res) => {
  proxy.web(req, res, {
    target: 'https://assets.3kh0.net',
    changeOrigin: true,
    // @ts-ignore
    rewritePath: {
      '^/cdn': ''
    }
  })
})

app.get('*', (_req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'))
})

httpServer.on('request', (req, res) => {
  app(req, res)
})

httpServer.on('upgrade', (req, socket, head) => {
  if (req.url?.startsWith('/wisp/')) {
    wisp.routeRequest(req, socket as Socket, head)
  } else {
    socket.end()
  }
})

httpServer.on('listening', () => {
  consola.info(`Listening on http://localhost:${port}`)
})

httpServer.listen({
  port
})
