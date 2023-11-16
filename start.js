import { build } from 'vite'

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createBareServer } from '@tomphttp/bare-server-node';
import serveStatic from 'serve-static';

await build()

const httpServer = createServer();

// Run the Bare server in the /bare/ namespace. This will prevent conflicts between the static files and the bare server.
const bareServer = createBareServer('/bare/');

// The static root is usually relative to the main script in projects that use the Bare server.
// ie. if static.js is at /src/static.js, public will be /public/
// ideally, you will point the public directory relative to the current working directory
// serveStatic('./public/')
// This would ignore the relative location of static.js
const serve = serveStatic(
  fileURLToPath(new URL('./dist/', import.meta.url)),
  {
    fallthrough: false,
  }
);

httpServer.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    serve(req, res, (err) => {
      res.writeHead(err?.statusCode || 500, {
        'Content-Type': 'text/plain',
      });
      res.end(err?.stack);
    });
  }
});

httpServer.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const PORT = process.env.PORT || 3003

httpServer.on('listening', () => {
  console.log('Mocha online on port ' + PORT);
});

httpServer.listen({
  port: PORT,
});