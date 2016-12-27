const net = require('net');


// v--------socket connection to server

var server = net.createConnection(6969, 'localhost',() => {
  console.log('connected to server');
});

server.on('connect', () => {
  console.log('yes');
  process.stdin.pipe(server);

  server.on('data', (serverMessage) => {
    process.stdout.write(serverMessage);
  });
  // process.stdin.on('data',(clientMessage) => {`
  // });

});

