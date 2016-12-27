const net = require('net');


// v--------socket connection to server

var server = net.createConnection(6969, 'localhost',() => {
  console.log('connected to server');
});

server.on('connect', () => {

  process.stdin.pipe(server);

  process.stdin.on('data',(clientMessage) => {

  console.log(clientMessage);
  server.write(clientMessage);
  console.log('client Message Console Log');

  });

});

