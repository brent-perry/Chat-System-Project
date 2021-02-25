'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');


function client_packet_reader(packet){
    let packet_type = packet.read_uint8;

    if (packet_type == CHAT_MESSAGE){
        let username = packet.read_string();
        let message = packet.read_string();
        console.log(username+": "+message);
    }
}
module.exports = {client_packet_reader};