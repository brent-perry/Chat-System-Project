'use strict';

const auth = require('../lib/messages/server/authentication');
const assert = require('chai').assert;

describe('create_auth_request() function', function(){
  it('Should return a packet with the corresponding uint8 telling what kind of packet it is and an ID that is passed in as a parameter', function(){
    let packet = auth.create_auth_request(1000);
    packet.reset();
    assert.equal(5, packet.length());
    assert.equal(auth.AUTHENTICATE_REQUEST, packet.read_uint8());
    assert.equal(1000, packet.read_uint32());
  });
});

describe('create_auth_fail() function', function(){
  it('Should return a packet with the corresponding uint8 telling what kind of packet it is and another uint8 saying that the request failed', function(){
    let packet = auth.create_auth_fail(auth.AUTHENITCATE_STATUS_FORMAT_ERROR);
    packet.reset();
    assert.equal(3, packet.length());
    assert.equal(auth.AUTHENITCATE_STATUS, packet.read_uint8());
    assert.equal(auth.AUTHENITCATE_STATUS_FAIL, packet.read_uint8());
    assert.equal(auth.AUTHENTICATE_STATUS_FORMAT_ERROR, packet.read_uint8());
  });
});

describe('create_auth_okay() function', function(){
  it('Should return a packet with the corresponding uint8 telling what kind of packet it is and another uint8 saying that the request was okay', function(){
    let packet = auth.create_auth_okay();
    packet.reset();
    assert.equal(2, packet.length());
    assert.equal(auth.AUTHENITCATE_STATUS, packet.read_uint8());
    assert.equal(auth.AUTHENITCATE_STATUS_OKAY, packet.read_uint8());
  });
});
