const net = require('net');


var server = net.createServer((socket) => {

  socket.on('data', (clientMessage) => {
    console.log(clientMessage);
  });

  process.stdin.on('data', (cmd) => {
    socket.write(cmd);
  });

});

server.listen(6969, '0.0.0.0', () => {
  console.log('opened server on', server.address());
});