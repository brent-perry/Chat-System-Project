const assert = require('chai').assert;
const Packet = require('../lib/packet');
const {create_user_list_packet} = require('../lib/messages/server/users');

describe('create_user_list_packet', function(){
  it('Returns a packet containing the packet type, length of the list and list of users', function(){
    let packet = create_user_list_packet(['Julian']);
    packet.reset();
    assert.equal(packet.length(), 3 + Packet.string_length('Julian'));
    assert.equal(packet.read_uint8(), 200);
    assert.equal(packet.read_uint16(), 1);
    assert.equal(packet.read_string(), 'Julian');
  })
})
