'use strict'

const Packet = require('../../packet');

const CHAT_MESSAGE = 1;

function create_chat_message(username, message){
  let packet = new Packet(1 + Packet.string_length(username) + Packet.string_length(message));
  packet.write_uint8(CHAT_MESSAGE);
  packet.write_string(username);
  packet.write_string(message);
  return packet;
};

module.exports = {CHAT_MESSAGE, create_chat_message};
