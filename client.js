const net = require('net');

// v--------socket connection to server

var server = net.createConnection(6969, 'localhost',() => {
  console.log('Connected to:');
});

server.on('connect', () => {
  process.stdin.pipe(server);

  server.on('data', (serverMessage) => {
    process.stdout.write(serverMessage);
  });
});

