'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');

function packet_reader(buffer, server, client){
  const packet = new Packet(buffer);
  const pId = packet.read_uint8();
  switch (pId){
    case CHAT_MESSAGE:
      let username = packet.read_string();
      let message = packet.read_string();
      console.log(username + ": " + message);
      server.clients.forEach((item, i) =>{
        item.send(packet.buffer)
      });
  }
}
function readChatMessage(buffer){
  const packet = new Packet(buffer);
  const client_pId = packet.read_uint8(buffer);
  switch (client_pId){
    case CHAT_MESSAGE:
      let client_username = packet.read_string(buffer);
      let client_message = packet.read_string(buffer);
      console.log(client_username + ": " + client_message);
  }
}

module.exports = {packet_reader};
