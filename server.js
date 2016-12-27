const net = require('net');

var clientsCount = 0;
var messageCount = 0;
var sockets = [];
//sockets array should hold all of the sockets that are open at the moment

//Start a server
var server = net.createServer((socket) => {  //THIS SOCKET is different for every new client connection
server.name = "admin";
console.log(server.name, 'admin');

//Might not need this stuff
clientsCount++;

  //Identify the client that just joined
  socket.id = Math.floor(Math.random() * 1000);

  //Add the socket to the sockets Array
  sockets.push(socket);

  //Handle incoming messages from sockets
  socket.on('data', (clientMessage) => {
    messageCount++;  //Running count of all messages
    broadcast(clientMessage, socket);  //Broadcast this to all sockets

    // console.log(`the current message count is: ${messageCount}`);
    // console.log(`number of clients connected: ${clientsCount}`);
    // console.log(`User ${socket.id} said: ${clientMessage}`);
  });

  //If there are 3 sockets open, take the socketID from the client sending the message, and pass the message to the other 2 sockets
  //Loop through all of the sockets and send the message to all of the sockets
  function broadcast(message, sender){
    sockets.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(`message from ${socket.id}: ${message}`);
    });
    process.stdout.write(`message from ${socket.id}: ${message}`);
  }
});

server.listen(6969, '0.0.0.0', () => {
  console.log('opened server on', server.address());
});




//<----NOTE----->
//When someone connects, add an event listener named data and send the message from the server to this 1 client
  // process.stdin.on('data', (cmd) => {
  //   socket.write(cmd);
  // });