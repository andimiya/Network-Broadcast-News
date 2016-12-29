const net = require('net');

// v--------socket connection to server

var server = net.createConnection(6969, 'localhost',() => {
  console.log('Connected to:');
  process.stdout.write('Enter your username:');
});

server.on('connect', () => {
  process.stdin.pipe(server);

  server.on('data', (serverMessage) => {
    process.stdout.write(serverMessage);

  });
    server.on('data', (adminMessage) => {
    process.stdout.write(adminMessage);

  });
});