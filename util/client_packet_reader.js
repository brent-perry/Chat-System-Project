'use strict';

const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');


function client_packet_reader(Packet){
    let packet_type = Packet.read_uint8;

    if (packet_type == CHAT_MESSAGE){
        let username = Packet.read_string();
        let message = Packet.read_string();
        console.log(username+": "+message);
    }
}
module.exports = {client_packet_reader};