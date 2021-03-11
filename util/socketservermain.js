'use strict';

const WebSocket = require('ws');
const { packet_reader } = require('./packetreader');
const {subscriber} = require('../lib/redis');
const {binaryStringToBuffer} = require('./buffer_strings');

function initServer(server){
  var socket_server = new WebSocket.Server({ server });

  subscriber.on('message',(channel,binaryString) => {
    if (channel === 'chat'){
      const arrayBuffer = binaryStringToBuffer(binaryString);
      socket_server.clients.forEach(client => client.send(arrayBuffer));
    };
  });

  subscriber.subscribe('chat');

  socket_server.on('connection', ws => {
    console.log('New connection');
    ws.binaryType = "arraybuffer";

    ws.on('message', message => {
      console.log('Received message', message);
      packet_reader(message, socket_server, ws);
    });
  });
}

module.exports = { initServer };
