'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');


function client_packet_reader(buffer){
    const packet = new Packet(buffer.data);
    const packet_type = packet.read_uint8();
    if (packet_type === CHAT_MESSAGE){
        var username = packet.read_string();
        var message = packet.read_string();
        console.log(username+": "+message);
        let packetInfo = {packetUsername: username, packetMessage: message, packetType: packet_type};
        return packetInfo;
     }

}
module.exports = {client_packet_reader};
