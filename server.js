const net = require('net');

var clientsCount = 0;
var messageCount = 0;
var sockets = [];

//Start a server
var server = net.createServer((socket) => {  //THIS SOCKET is different for every new client connection

//Might not need this stuff
clientsCount++;

  //Identify the client that just joined
  var socketAddress = socket.remoteAddress;

  //Add the socket to the sockets Array
  sockets.push(socket);

  //Handle incoming messages from sockets
  socket.setEncoding('utf8');

  socket.on('data', (clientMessage) => {
    messageCount++;  //Running count of all messages

    broadcast(clientMessage, socket);  //Broadcast this to all sockets

    process.stdout.write(`the current message count is: ${messageCount}\n`);
    process.stdout.write(`number of clients connected: ${clientsCount}\n`);
    process.stdout.write(`User ${socketAddress} said: ${clientMessage}\n`);
  });

  //If there are 3 sockets open, take the socketID from the client sending the message, and pass the message to the other 2 sockets
  //Loop through all of the sockets and send the message to all of the sockets
  function broadcast(message, sender){
    for (var i = 0; i < sockets.length; i++) {
      if(sockets[i] !== socket) {
        sockets[i].write(`User ${socketAddress} said: ${message}`);
        console.log(socket);
      }
    }
  }
});

server.listen(6969, '0.0.0.0', () => {
  process.stdout.write('opened server on', server.address());
});