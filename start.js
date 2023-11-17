import http from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';

const httpServer = http.createServer();

const app = express();
const PORT = process.env.PORT || 3003

app.use(express.static('dist'))

const bareServer = createBareServer('/bare/');

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
	console.log('Online!');
});

httpServer.listen({
	port: PORT,
});