'use strict';

const Packet = require('../lib/packet');
const assert = require('chai').assert;

describe('Packet(length_or_buffer)', function(){
  it('Should create a packet with a DataView using an arraybuffer as long as a buffer or a number is passed in.', function(){
    let packet = new Packet(1);
    let buffer = new ArrayBuffer(1);
    let packet2 = new Packet(buffer);
    assert.equal(0, packet.current_offset);
    assert.equal(1, packet.buffer.byteLength);

    assert.equal(0, packet2.current_offset);
    assert.equal(buffer, packet2.buffer);
  });
});

describe('Packet.prototype.string_length()', function(){
  it('Should return an integer with the length of the string times 2 plus 2.  See function to see why.', function(){
    let string = "string";
    let packet = new Packet(0 + Packet.string_length(string));
    assert.equal(string.length * 2 + 2, packet.buffer.byteLength);
  });
});

describe('Packet.prototype.write_uint8()', function(){
  it('Should throw an error if the number inputed is outside the bounds of a uint8 (0-255)', function(){
    let packet = new Packet(1);
    assert.throws(() => packet.write_uint8(-1), `Value of -1 out of bounds for uint8.`);
    assert.throws(() => packet.write_uint8(256), `Value of 256 out of bounds for uint8.`);
  });

  it('Writes a uint8 to the buffer', function(){
    let packet = new Packet(1);
    let uint8 = 6;
    packet.write_uint8(uint8);
    let view = new DataView(packet.buffer);
    assert.equal(uint8,view.getUint8(0));
  });

  it('Increments the offset by 1', function(){
    let packet = new Packet(1);
    let uint8 = 6;
    packet.write_uint8(uint8);
    assert.equal(1, packet.current_offset);
  });
});

describe('Packet.prototype.write_uint16()', function(){
  it('Should throw an error if the number inputed is outside the bounds of a uint8 (0-65535)', function(){
    let packet = new Packet(2);
    assert.throws(() => packet.write_uint16(-1), `Value of -1 out of bounds for uint16.`);
    assert.throws(() => packet.write_uint16(65536), `Value of 65536 out of bounds for uint16.`);
  });

  it('Writes a uint16 to the buffer', function(){
    let packet = new Packet(2);
    let uint16 = 1000;
    packet.write_uint16(uint16);
    let view = new DataView(packet.buffer);
    assert.equal(uint16,view.getUint16(0));
  });

  it('Increments the offset by 2', function(){
    let packet = new Packet(2);
    let uint16 = 1000;
    packet.write_uint16(uint16);
    assert.equal(2, packet.current_offset);
  });
});

describe('Packet.prototype.write_uint32()', function(){
  it('Should throw an error if the number inputed is outside the bounds of a uint32 (0-4294967295)', function(){
    let packet = new Packet(4);
    assert.throws(() => packet.write_uint32(-1), `Value of -1 out of bounds for uint32.`);
    assert.throws(() => packet.write_uint32(4294967296), `Value of 4294967296 out of bounds for uint32.`);
  });

  it('Writes a uint32 to the buffer', function(){
    let packet = new Packet(4);
    let uint32 = 10000;
    packet.write_uint32(uint32);
    let view = new DataView(packet.buffer);
    assert.equal(uint32,view.getUint32(0));
  });

  it('Increments the offset by 4', function(){
    let packet = new Packet(4);
    let uint32 = 10000;
    packet.write_uint32(uint32);
    assert.equal(4, packet.current_offset);
  });
});

describe('Packet.prototype.write_string()', function(){
  it('Throws an error if the given string length is greater than 60000 or less than 0 chracters', function(){
    let string = "a string";
    let packet = new Packet(Packet.string_length(string));
    let packet2 = new Packet(Packet.string_length(string));
    assert.doesNotThrow(() => packet.write_string(string));
    while (string.length <= 60000){
      string = string + "1";
    }
    packet = new Packet(Packet.string_length(string));
    assert.throws(() => packet.write_string(string), `String is too long`);
    assert.throws(() => packet2.write_string(""), `String is less than 0 characters`);
  });

  it('Writes the string to the view using Uint16', function(){
    let string = "string";
    let packet = new Packet(Packet.string_length(string));
    packet.write_string(string);
    let view = new DataView(packet.buffer);
    assert.equal(view.getUint16(0),string.charCodeAt(0));
    assert.equal(view.getUint16(2),string.charCodeAt(1));
  });
});

describe('Packet.prototype.read_uint8()', function(){
  it('Returns a number that was in binary as a number again.', function(){
    let packet = new Packet(1);
    packet.write_uint8(11);
    packet.reset();
    assert.equal(packet.read_uint8(), 11);
    assert.equal(packet.current_offset, 1);
  });
});

describe('Packet.prototype.read_uint16()', function(){
  it('Returns a number that was in binary as a number again.', function(){
    let packet = new Packet(2);
    packet.write_uint16(100);
    packet.reset();
    assert.equal(packet.read_uint16(), 100);
    assert.equal(packet.current_offset, 2);
  });
});

describe('Packet.prototype.read_uint32()', function(){
  it('Returns a number that was in binary as a number again.', function(){
    let packet = new Packet(4);
    packet.write_uint32(10000);
    packet.reset();
    assert.equal(packet.read_uint32(), 10000);
    assert.equal(packet.current_offset, 4);
  });
});

describe('Packet.prototype.read_string()', function(){
  it('Returns a string that was in binary as a number again.', function(){
    let string = "string";
    let length = Packet.string_length(string);
    let packet = new Packet(length);
    packet.write_string(string);
    packet.reset();
    assert.equal(packet.read_string(), string);
    assert.equal(packet.current_offset, length);
  });
});

describe('Packet.prototype.reset()', function(){
  it('Sets the current offset of the packet back to 0.', function(){
    let packet = new Packet(2);
    packet.write_uint16(111);
    packet.reset();
    assert.equal(packet.current_offset, 0);
  });
});

describe('Packet.prototype.length()', function(){
  it('Returns the length of the packet buffer', function(){
    let packet = new Packet(4);
    assert.equal(packet.length(), 4);
  })
})
