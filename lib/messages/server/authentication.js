'use strict';

const Packet = require('../../packet');

const AUTHENTICATE_REQUEST = 20
const AUTHENITCATE_STATUS = 21;
const AUTHENITCATE_STATUS_OKAY = 1;
const AUTHENITCATE_STATUS_FAIL = 2;
const AUTHENITCATE_STATUS_NAME_TAKEN = 3;
const AUTHENITCATE_STATUS_FORMAT_ERROR = 4

function create_auth_request(id){
  let packet = new Packet(5);
  packet.write_uint8(AUTHENTICATE_REQUEST);
  packet.write_uint32(id);
  return packet;
};

function create_auth_fail(authFailReason){
  let packet = new Packet(3);
  packet.write_uint8(AUTHENITCATE_STATUS);
  packet.write_uint8(AUTHENITCATE_STATUS_FAIL);
  packet.write_uint8(authFailReason);
  return packet;
};

function create_auth_okay(){
  let packet = new Packet(2);
  packet.write_uint8(AUTHENITCATE_STATUS);
  packet.write_uint8(AUTHENITCATE_STATUS_OKAY);
  return packet;
};

module.exports = {AUTHENITCATE_STATUS, AUTHENTICATE_REQUEST, AUTHENITCATE_STATUS_FAIL, AUTHENITCATE_STATUS_OKAY, create_auth_request, create_auth_okay, create_auth_fail};
