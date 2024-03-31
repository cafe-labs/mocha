import http from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import { build } from 'vite'
import pico from 'picocolors'
import express from 'express';

const httpServer = http.createServer();

const app = express();
const PORT = process.env.PORT || 3003

console.log(pico.cyan(pico.bold("Building frontend...")))
await build()

app.use(express.static('dist'))

const bareServer = createBareServer('/-/');

httpServer.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

httpServer.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

httpServer.on('listening', () => {
  console.log(pico.green(pico.bold(`Mocha server online!`)));
  console.log(pico.gray(`- http://localhost:${PORT}`))
});

httpServer.listen({
  port: PORT,
});