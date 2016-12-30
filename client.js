const net = require('net');

// v--------socket connection to server

var server = net.createConnection(6969, 'localhost',() => {
  process.stdout.write(`Connected to: ${server.remoteAddress}\n`);
});

server.on('connect', () => {
  process.stdin.pipe(server);

  server.on('data', (serverMessage) => {
  });
});