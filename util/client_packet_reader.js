'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');


function client_packet_reader(buffer){
    const packet = new Packet(buffer);
    const packet_type = packet.read_uint8();

    if (packet_type === CHAT_MESSAGE){
        username = buffer.read_string();
        message = buffer.read_string();
        console.log(username+": "+message)
     }
}
module.exports = {client_packet_reader};