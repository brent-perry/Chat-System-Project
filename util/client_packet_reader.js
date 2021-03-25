'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');
const authObj = require('../lib/messages/client/authentication');
const {USER_LIST} = require('../lib/messages/server/users');


function client_packet_reader(buffer){
    const packet = new Packet(buffer.data);
    const packet_type = packet.read_uint8();
    if (packet_type === CHAT_MESSAGE){
        let username = packet.read_string();
        let message = packet.read_string();
        let packetInfo = {packetUsername: username, packetMessage: message, packetType: packet_type};
        return packetInfo;
     }
     else if (packet_type === authObj.AUTHENTICATE_STATUS){
        let authStatus = packet.read_uint8();
        return {packetType:packet_type,authStatus};
     }

     else if (packet_type === USER_LIST){
       console.log(buffer.data);
       let listLength = packet.read_uint16();
       let nextUser = null;
       let users = [];
       for(let i = 0; i < listLength; i++){
         nextUser = packet.read_string();
         users.push(nextUser);
       }
       let userInfo = {packetType: packet_type, users};
       return userInfo;
     }
     return {packetType:0,error:'undefined packet type'}; // error
}
module.exports = {client_packet_reader};
