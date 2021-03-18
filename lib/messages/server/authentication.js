'use strict';

const Packet = require('../../packet');

const AUTHENTICATE_REQUEST = 20;
const AUTHENTICATE_STATUS = 21;
const AUTHENTICATE_STATUS_OKAY = 1;
const AUTHENTICATE_STATUS_FAIL = 2;
const AUTHENTICATE_STATUS_NAME_TAKEN = 3;
const AUTHENTICATE_STATUS_FORMAT_ERROR = 4;

function create_auth_request(id){
  let packet = new Packet(5);
  packet.write_uint8(AUTHENTICATE_REQUEST);
  packet.write_uint32(id);
  return packet;
};

function create_auth_fail(authFailReason){
  let packet = new Packet(3);
  packet.write_uint8(AUTHENTICATE_STATUS);
  packet.write_uint8(AUTHENTICATE_STATUS_FAIL);
  packet.write_uint8(authFailReason);
  return packet;
};

function create_auth_okay(){
  let packet = new Packet(2);
  packet.write_uint8(AUTHENTICATE_STATUS);
  packet.write_uint8(AUTHENTICATE_STATUS_OKAY);
  return packet;
};

module.exports = {AUTHENTICATE_STATUS, AUTHENTICATE_REQUEST, AUTHENTICATE_STATUS_FAIL, AUTHENTICATE_STATUS_OKAY, AUTHENTICATE_STATUS_FORMAT_ERROR, AUTHENTICATE_STATUS_NAME_TAKEN, create_auth_request, create_auth_okay, create_auth_fail};
