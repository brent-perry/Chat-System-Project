'use strict';

function Packet(length_or_buffer){
	if (typeof length_or_buffer === 'number')
		this.buffer = new ArrayBuffer(length_or_buffer);
	else
		this.buffer = length_or_buffer;
	this.view = new DataView(this.buffer);
	this.current_offset = 0;
};

Packet.string_length = function(str){
  return str.length * 2 + 2; //Multiplies by 2 to account for uint16 per character and then + 2 to account for null byte that signals ned of string
};

Packet.prototype.write_uint8 = function(uint8){
	if (uint8 < 0 || uint8 > 255)
		throw new Error(`Value of ${uint8} out of bounds for uint8.`);
	this.view.setUint8(this.current_offset,uint8);
	this.current_offset++;
	}

Packet.prototype.write_uint16 = function(uint16){
  if(uint16 < 0 || uint16 > 65535)
    throw new Error(`Value of ${uint16} out of bounds for uint16.`)
	this.view.setUint16(this.current_offset,uint16);
	this.current_offset += 2;
	};

Packet.prototype.write_uint32 = function(uint32){
  if (uint32 < 0 || uint32 > 4294967295)
    throw new Error(`Value of ${uint32} out of bounds for uint32.`)
  this.view.setUint32(this.current_offset, uint32);
  this.current_offset += 4;
  };

Packet.prototype.write_string = function(string){
  if (string.length > 60000)
    throw new Error(`String is too long`)
  else if (string.length < 0 || string == "")
    throw new Error(`String is less than 0 characters`)
  for (var i = 0; i < string.length; i++){
    this.view.setUint16(this.current_offset, string.charCodeAt(i));
    this.current_offset += 2;
  };

  this.view.setUint16(this.current_offset, 0);
  this.current_offset += 2;
};

Packet.prototype.read_uint8 = function(){
	let uint8 = this.view.getUint8(this.current_offset);
	this.current_offset++;
	return uint8;
};

Packet.prototype.read_uint16 = function(){
  let uint16 = this.view.getUint16(this.current_offset);
  this.current_offset += 2;
  return uint16;
};

Packet.prototype.read_uint32 = function(){
  let uint32 = this.view.getUint32(this.current_offset);
  this.current_offset += 4;
  return uint32;
};

Packet.prototype.read_string = function(){
  let str = "";
  do{
    var code = 0;
    code = this.view.getUint16(this.current_offset);
    this.current_offset += 2;
    if (code === 0){
      break;
    }
    str += String.fromCharCode(code);
  } while (this.current_offset - 2 < this.view.byteLength);
  return str;
};

Packet.prototype.reset = function(){
  this.current_offset = 0;
}

Packet.prototype.length = function(){
  return this.buffer.byteLength;
}


module.exports = Packet;
