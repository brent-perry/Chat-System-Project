'use strict';

const { publisher } = require('../lib/redis');
const {bufferToBinaryString,binaryStringToBuffer} = require('./buffer_strings');
const Packet = require('../lib/packet');
const {CHAT_MESSAGE} = require('../lib/messages/client/chat');
const {JOIN_CHANNEL} = require('../lib/messages/client/channel');
const authObj = require('../lib/messages/server/authentication');
const {create_user_list_packet} = require('../lib/messages/server/users');

function packet_reader(buffer, server, client){
  const packet = new Packet(buffer);
  const pId = packet.read_uint8();
  switch (pId){
    case JOIN_CHANNEL:
      let channel = packet.read_string();
      if (channel.length > 20){
        throw new Error('Channel length exceeds 20 characters!');
      }
      channel = channel.toLowerCase();
      console.log(`client joined channel: ${channel}`);
      if (client.channel && client.username) {
        publisher.lrem(`userlist:${client.channel}`, 1, client.username);
      }
      client.channel = channel;
      publisher.lrange(`chat_history:${channel}`,0,-1,(error,messages) =>{
          if (error){
            console.error(error);
          }
          if (messages && messages.length){
            messages.reverse();
            for (let index = 0 ; index < messages.length ; ++index){
              let arrayBuffer = binaryStringToBuffer(messages[index]);
              client.send(arrayBuffer);
            }
          }
        });
        if (client.username) {
          publisher.rpush(`userlist:${client.channel}`, client.username);
        }
        publisher.lrange(`userlist:${client.channel}`, 0, -1, (error, userList) =>{
          if (error) {
            console.error(error);
          }
          else{
            console.log(userList);
            let usersPacket = create_user_list_packet(userList);
            client.send(usersPacket.buffer);
          }
        });
      break;

    case CHAT_MESSAGE:
      if (!client.channel){
        console.log("client tried to send message but has not joined a channel");
        break; // TODO send error that client should join channel first
      }
      if (!client.username){
        console.log("client tried to send message but has no username");
        break; // TODO send error that client should join channel first
      }
      let username = packet.read_string();
      let message = packet.read_string();
      let user_channel = client.channel;
      let binaryString = bufferToBinaryString(packet.buffer);
      publisher.lpush(`chat_history:${user_channel}`,binaryString,() =>{
        publisher.ltrim(`chat_history:${user_channel}`,0,199);
        });
      publisher.publish(`chat:${user_channel}`,binaryString);
      break;

    case authObj.AUTHENTICATE_REQUEST:
      let authUsername = packet.read_string();
      let usernameTaken = false;
      if (typeof authUsername === 'string' && authUsername.length < 20 && authUsername){
        server.clients.forEach((item, i) =>{
          if (item.username == authUsername){
            usernameTaken = true;
          }
        });
      }
      else{
        let outgoingPacket = authObj.create_auth_fail(authObj.AUTHENTICATE_STATUS_FORMAT_ERROR);
        client.send(outgoingPacket.buffer);
        break;
      }
      if (usernameTaken){
        let outgoingPacket = authObj.create_auth_fail(authObj.AUTHENTICATE_STATUS_NAME_TAKEN);
        client.send(outgoingPacket.buffer);
        break;
      }
      let outgoingPacket = authObj.create_auth_okay();
      if (client.username) {
        publisher.lrem(`userlist:${client.channel}`, 1, client.username);
      }
      client.username = authUsername;
      publisher.rpush(`userlist:${client.channel}`, client.username);
      client.send(outgoingPacket.buffer);
      break;
  }
}
module.exports = { packet_reader };
