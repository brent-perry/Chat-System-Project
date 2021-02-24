'use strict';

const Packet = require('../../packet');

const AUTHENTICATE_RESPONSE = 20;

function create_auth_response(nickname){
  let length = 1 + Packet.string_length(str);
  let packet = new Packet(length);
  packet.write_uint8(AUTHENTICATE_RESPONSE);
  packet.write_string(nickname);
  return packet;
};

module.exports = {AUTHENTICATE_RESPONSE, create_auth_response};
