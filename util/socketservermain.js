'use strict';

const WebSocket = require('ws');
const {packet_reader} = require('./packetreader')

function initServer(server){
  var socket_server = new WebSocket.Server({server});

  socket_server.on('connection', ws => {
    console.log('New connection');
    ws.binaryType = "arraybuffer";

    ws.on('message', message => {
      console.log('Recieved message', message);
      packet_reader(message, socket_server, ws);
    });
  });
}

module.exports = {initServer};
