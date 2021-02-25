'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');


function client_packet_reader(packet){
    let buffer = new Packet(packet);
    let packet_type = buffer.read_uint8();

    if (packet_type == CHAT_MESSAGE){
        let username = buffer.read_string();
        let message = buffer.read_string();
        console.log(username+": "+message);
    }
}
module.exports = {client_packet_reader};