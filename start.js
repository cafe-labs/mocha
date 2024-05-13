import http from 'node:http'
import express from 'express'
import wisp from 'wisp-server-node'
import { epoxyPath } from "@mercuryworkshop/epoxy-transport"
import { libcurlPath } from "@mercuryworkshop/libcurl-transport"
import httpProxy from 'http-proxy'
import path from 'node:path'
import { build } from 'vite'
import pico from 'picocolors'
import { consola } from "consola";

const httpServer = http.createServer()
const proxy = httpProxy.createProxyServer();

const app = express()
const PORT = process.env.PORT || 3003

consola.start(pico.gray('Building frontend...'))
await build()

app.use(express.static('dist'))
app.use("/epoxy/", express.static(epoxyPath));
app.use("/libcurl/", express.static(libcurlPath));

app.use('/cdn', (req, res) => {
  proxy.web(req, res, {
    target: 'https://assets.3kh0.net',
    changeOrigin: true,
    pathRewrite: {
      '^/cdn': '',
    },
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

httpServer.on('request', (req, res) => {
  app(req, res)
})

httpServer.on('upgrade', (req, socket, head) => {
  if (req.url.startsWith("/-/")) {
    wisp.routeRequest(req, socket, head)
  } else {
    socket.end()
  }
})

httpServer.on('listening', () => {
  consola.success(pico.green(pico.bold(`Mocha server ready!`)))
  consola.info(pico.gray(`http://localhost:${PORT}`))
})

httpServer.listen({
  port: PORT
})
