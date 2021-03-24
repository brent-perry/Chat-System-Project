'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');
const authObj = require('../lib/messages/client/authentication');


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
     return {packetType:0,error:'undefined packet type'}; // error
}
module.exports = {client_packet_reader};
