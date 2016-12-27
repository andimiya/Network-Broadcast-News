const net = require('net');

var clientsCount = 0;
var messageCount = 0;
var clientIDs = [];

var server = net.createServer((socket) => {  //THIS SOCKET is different for every new client connection
  clientsCount++;
  socket.name = Math.floor(Math.random() * 1000);
  clientIDs.push(socket.name);

  socket.on('data', (clientMessage) => {
    messageCount++;
    socket.write(clientMessage);
    // socket.write(socket.name);

    console.log(`the current message count is: ${messageCount}`);
    console.log(`number of clients connected: ${clientsCount}`);
    console.log(`list of client IDs: ${clientIDs}`);
    console.log(`User ${socket.name} said: ${clientMessage}`);

  });

  process.stdin.on('data', (cmd) => {
    socket.write(cmd);
  });
});

server.listen(6969, '0.0.0.0', () => {
  console.log('opened server on', server.address());
});