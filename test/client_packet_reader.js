const assert = require('chai').assert;
const Packet = require('../lib/packet');
const {client_packet_reader} = require('../util/client_packet_reader');

describe('client_packet_reader', function(){
  it('On CHAT_MESSAGE it returns a json object with the users info', function(){
    let packet_length = 1 + Packet.string_length('Julian') + Packet.string_length('Hi');
    let packet = new Packet(packet_length);
    packet.write_uint8(1);
    packet.write_string('Julian');
    packet.write_string('Hi');
    packet.buffer.data = packet.buffer;
    let expected_object = client_packet_reader(packet.buffer);
    assert.equal(expected_object.packetUsername, 'Julian');
    assert.equal(expected_object.packetMessage, 'Hi');
    assert.equal(expected_object.packetType, 1);
  })
  it('On AUTHENTICATE_STATUS it returns a json object with the authentication status', function(){
    let authPacket = new Packet(2);
    authPacket.write_uint8(21);
    authPacket.write_uint8(1);
    authPacket.buffer.data = authPacket.buffer;
    let expected_object = client_packet_reader(authPacket.buffer);
    assert.equal(expected_object.packetType, 21);
    assert.equal(expected_object.authStatus, 1);
  })
  it('On USER_LIST it returns a list of all users currently connected to a channel', function(){
    let length = 3 + Packet.string_length('Julian');
    let userPacket = new Packet(length);
    userPacket.write_uint8(200);
    userPacket.write_uint16(1);
    userPacket.write_string('Julian');
    userPacket.buffer.data = userPacket.buffer;
    let expected_object = client_packet_reader(userPacket.buffer);
    assert.equal(expected_object.packetType, 200);
    assert.equal(expected_object.users[0], 'Julian');
  })
})

describe('client_packet_reader: AUTHENTICATE_STATUS', function(){

})
