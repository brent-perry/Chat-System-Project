'use strict';

const WebSocket = require('ws');
const { packet_reader } = require('./packetreader');
const {subscriber, publisher} = require('../lib/redis');
const {binaryStringToBuffer} = require('./buffer_strings');
const {create_user_list_packet} = require('../lib/messages/server/users');

function initServer(server){
  let socket_server = new WebSocket.Server({ server });


  subscriber.on('message',(channel,message) => {
    if (channel === 'userlist-update'){
      publisher.lrange(`userlist:${message}`, 0, -1, (error, result) =>{
        if (error){
          console.error(error);
        }
        let packet = create_user_list_packet(result);
        socket_server.clients.forEach(client =>{
            if (client.channel === message)
              client.send(packet.buffer);
          });
      })
    }
  });
  subscriber.on('pmessage',(pattern,channel,binaryString) =>{
    if (pattern === 'chat:*'){
      const userChannel = channel.substr(5);
      if (!userChannel){
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

  subscriber.psubscribe('chat:*');
  subscriber.subscribe('userlist-update');

  socket_server.on('connection', ws =>{
    console.log('New connection');
    ws.binaryType = "arraybuffer";

    ws.on('message', message =>{
      console.log('Received message', message);
      packet_reader(message, socket_server, ws);
    });

    ws.on('close', () =>{
      if (ws.channel && ws.username){
        publisher.lrem(`userlist:${ws.channel}`, 1, ws.username);
      }
    })
  });
}

module.exports = { initServer };
