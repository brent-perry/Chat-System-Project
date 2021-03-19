'use strict';

const Packet = require('../../packet');

const JOIN_CHANNEL = 50;

function create_join_channel_packet(channel){
  let packet = new Packet(1 + Packet.string_length(channel));
  packet.write_uint8(JOIN_CHANNEL);
  packet.write_string(channel);
  return packet;
}

module.exports = {JOIN_CHANNEL, create_join_channel_packet};
