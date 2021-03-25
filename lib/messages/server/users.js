const Packet = require('../../packet');

const USER_LIST = 200;

function create_user_list_packet(users){
  let length = 3;
  for(let i = 0; i < users.length; i++){
    length += Packet.string_length(users[i]);
  }
  let packet = new Packet(length);
  packet.write_uint8(USER_LIST);
  packet.write_uint16(users.length);
  for(let i = 0; i < users.length; i++){
    packet.write_string(users[i]);
  }
  return packet;
}

module.exports = {USER_LIST, create_user_list_packet};
