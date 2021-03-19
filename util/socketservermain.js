'use strict';

const WebSocket = require('ws');
const { packet_reader } = require('./packetreader');
const {subscriber} = require('../lib/redis');
const {binaryStringToBuffer} = require('./buffer_strings');

function initServer(server){
  let socket_server = new WebSocket.Server({ server });

  subscriber.on('pmessage',(pattern,channel,binaryString) =>{
    if (pattern === 'chat:*'){
      const userChannel = channel.substr(5);
      if (!userChannel || !workChannel || !funChannel){
        console.log('Got empty user channel, weird. Discarding message');
        return;
      }
      const arrayBuffer = binaryStringToBuffer(binaryString);
      socket_server.clients.forEach(client =>{
          if (client.channel === userChannel)
            client.send(arrayBuffer);
        });
    }
  });
  subscriber.on('pmessage',(pattern, channel, binaryString) => {
    if (pattern === 'Work*') {
      const workChannel = channel.substr(5);
      if (!userChannel || !workChannel || !funChannel) {
        console.log('Got empty user channel, weird. Discarding message');
        return;
    }
    const arrayBuffer = binaryStringToBuffer(binaryString);
    socket_server.clients.forEach(client => {
      if (client.channel === workChannel)
        client.send(arrayBuffer);
    });
  }
  });

  subscriber.on('pmessage',(pattern, channel, binaryString) => {
    if (pattern === 'Fun*') {
      const funChannel = channel.substr(5);
      if (!userChannel || !workChannel || !funChannel) {
        console.log('Got empty user channel, weird. Discarding message');
        return;
      }
      const arrayBuffer = binaryStringToBuffer(binaryString);
      socket_server.clients.forEach(client => {
        if (client.channel === funChannel)
          client.send(arrayBuffer);
      });
    }
  });

  subscriber.psubscribe('chat:*');
  subscriber.psubscribe('Work*');
  subscriber.psubscribe('Fun*');

  socket_server.on('connection', ws =>{
    console.log('New connection');
    ws.binaryType = "arraybuffer";

    ws.on('message', message =>{
      console.log('Received message', message);
      packet_reader(message, socket_server, ws);
    });
  });
}

module.exports = { initServer };
