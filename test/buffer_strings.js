const assert = require('chai').assert;
const Packet = require('../lib/packet');
const {bufferToBinaryString} = require('../util/buffer_strings');
const {binaryStringToBuffer} = require('../util/buffer_strings');

describe('bufferToBinaryString', function(){
  it('Returns a string from an array buffer', function(){
    let packet = new Packet(5);
    packet.write_uint8(104);
    packet.write_uint8(101);
    packet.write_uint8(108);
    packet.write_uint8(108);
    packet.write_uint8(111); //hello
    let expected_string = bufferToBinaryString(packet.buffer);
    assert.equal(expected_string, 'hello');
  })
})

describe('binaryStringToBuffer', function(){
  it('Returns an array buffer from a string', function(){
    let expected_buffer = binaryStringToBuffer('hello');
    assert.equal(expected_buffer[0], 104);
    assert.equal(expected_buffer[1], 101);
    assert.equal(expected_buffer[2], 108);
    assert.equal(expected_buffer[3], 108);
    assert.equal(expected_buffer[4], 111);
  })
})
