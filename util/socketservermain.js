'use strict';

const WebSocket = require('ws');

function initServer(server){
  var socket_server = new WebSocket.Server({server});

  socket_server.on('connection', ws => {
    console.log('New connection');

    ws.on('message', message => {
      console.log('Recieved message', message);
      ws.send(message)
    });
  });
}

module.exports = {initServer};
