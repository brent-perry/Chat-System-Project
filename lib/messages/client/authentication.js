'use strict';

const Packet = require('../../packet');

const AUTHENTICATE_RESPONSE = 20;
const AUTHENTICATE_STATUS = 21;
const AUTHENTICATE_STATUS_OKAY = 1;
const AUTHENTICATE_STATUS_FAIL = 2;
const AUTHENTICATE_STATUS_NAME_TAKEN = 3;
const AUTHENTICATE_STATUS_FORMAT_ERROR = 4;

function create_auth_response(nickname){
  let length = 1 + Packet.string_length(nickname);
  let packet = new Packet(length);
  packet.write_uint8(AUTHENTICATE_RESPONSE);
  packet.write_string(nickname);
  return packet;
};

module.exports = {
  AUTHENTICATE_RESPONSE,
  AUTHENTICATE_STATUS,
  AUTHENTICATE_STATUS_OKAY,
  AUTHENTICATE_STATUS_FAIL,
  AUTHENTICATE_STATUS_NAME_TAKEN,
  AUTHENTICATE_STATUS_FORMAT_ERROR,
  create_auth_response};
