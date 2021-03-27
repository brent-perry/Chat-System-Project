const assert = require('chai').assert;
const Packet = require('../lib/packet');
const {create_chat_message} = require('../lib/messages/client/chat');

describe('create_chat_message', function(){
  it('Creates a chat message packet that includes the message and username in binary', function(){
    let packet = create_chat_message('Julian', 'Hi');
    packet.reset();
    assert.equal(packet.read_uint8(), 1);
    assert.equal(packet.read_string(), 'Julian');
    assert.equal(packet.read_string(), 'Hi');
  })
})
