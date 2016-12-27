const net = require('net');

var clientsCount = 0;
var messageCount = 0;

var server = net.createServer((socket) => {  //THIS SOCKET is different for every new client connection

  socket.on('data', (clientMessage) => {
    messageCount++;
    socket.write(`the current message count is: ${clientsCount}`);

    console.log(`chunk from client: ${clientMessage}`);
    console.log(`the current message count is: ${messageCount}`);
  });

  process.stdin.on('data', (cmd) => {
    socket.write(cmd);
  });
});

server.listen(6969, '0.0.0.0', () => {
  console.log('opened server on', server.address());
});