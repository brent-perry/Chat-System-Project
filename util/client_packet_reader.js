'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');

function client_packet_reader(CHAT_MESSAGE,packet_type,buffer,message){
    if (packet_type == CHAT_MESSAGE){
        buffer = new Packet(buffer);
        packet_type = buffer.read_uint8();
        username = buffer.read_string();
        message = buffer.read_string();
        console.log(username+": "+message);
    }
}
module.exports = {client_packet_reader};