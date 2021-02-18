'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');

function packet_reader(buffer, server, client){
  const packet = new Packet(buffer);
  const pId = packet.read_uint8();
  switch (pId) {
    case CHAT_MESSAGE:
      let username = packet.read_string();
      let message = packet.read_string();
      console.log(username + ": " + message);
      server.clients.forEach((item, i) => {
        item.send(packet.buffer)
      });

  }
}

module.exports = {packet_reader};
