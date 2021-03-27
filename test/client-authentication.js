const assert = require('chai').assert;
const Packet = require('../lib/packet');
const {create_auth_response} = require('../lib/messages/client/authentication');

describe('create_auth_response', function(){
  it('Returns a packet containing the auth response byte and the nickname desired', function(){
    let packet = create_auth_response('Julian');
    packet.reset();
    assert.equal(packet.read_uint8(), 20);
    assert.equal(packet.read_string(), 'Julian');
  })
})
