import express from "express";
import http from "node:http";
import path from "node:path";
import { createBareServer } from "@tomphttp/bare-server-node";
import chalk from 'chalk';
import open from 'open';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs/promises';
import("./esbuild.prod.js");
const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "./")));
app.use('/dynamic/', express.static(path.join(__dirname, './dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), './index.html'));
});
/*
app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(process.cwd(), './static/404.html'))
});
*/ // 404 page

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Mocha running at port 8080`);
});

server.listen({
  port: 8080,
});