'use strict';

const { publisher } = require('../lib/redis');
const {bufferToBinaryString,binaryStringToBuffer} = require('./buffer_strings');
const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');
const authObj = require('../lib/messages/client/authentication');

function packet_reader(buffer, server, client){
  const packet = new Packet(buffer);
  const pId = packet.read_uint8();
  switch (pId) {
    case CHAT_MESSAGE:
      let username = packet.read_string();
      let message = packet.read_string();
      console.log(username + ": " + message);
      let binaryString = bufferToBinaryString(packet.buffer);
      publisher.publish('chat',binaryString);
    case authObj.AUTHENTICATE_RESPONSE:
      let username = packet.read_string();
      let usernameTaken = false;
      if (typeof username === 'string' && username.length < 20) {
        server.clients.forEach((item, i) =>{
          if (item.username == username){
            usernameTaken = true;
          }
        });
      }
      else{
        let packet = authObj.create_auth_fail(authObj.AUTHENITCATE_STATUS_FORMAT_ERROR);
        client.send(packet.buffer);
        return;
      }
      if (usernameTaken){
        let packet = authObj.create_auth_fail(authObj.AUTHENITCATE_STATUS_NAME_TAKEN);
        client.send(packet.buffer);
        return;
      }
      let packet = authObj.create_auth_okay();
      client.username = username;
      client.send(packet.buffer);
      return;
  }
}
module.exports = { packet_reader };
