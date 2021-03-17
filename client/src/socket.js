'use strict';

const {create_chat_message} = require('../../lib/messages/client/chat');
const {client_packet_reader} = require('../../util/client_packet_reader');
const {create_join_channel_packet} = require('../../lib/messages/client/channel');

    const DEV = true;

    let listeners = {};

    let socket = new WebSocket('ws://' + document.location.host);
    socket.binaryType = "arraybuffer";

    function emit(event,data){
      if (listeners[event]){
      listeners[event].forEach(listener => listener(data));
      }
    };

    socket.onopen = function(){
      if (DEV){
        console.log('connection open');
      };
      emit("open");
    };

    socket.onclose = function(){
      if (DEV){
        console.log('connection closed');
      };
      emit("close");
    };

    socket.onerror = function(error){
      if (DEV){
        console.log(error);
      };
      emit("error",error);
    };

    socket.onmessage = function (message){
        //client_packet_reader(message);
        var packetObj = client_packet_reader(message);
        emit(packetObj.packetType,packetObj);
    };

  export const chat_socket = {
    on: function(event,callback){
      if(!listeners[event]){
        listeners[event] = [];
      }
      listeners[event].push(callback);
    },
    joinChannel: function(channel){
      if (typeof channel !== "string" || !channel){
        throw new Error('Channel is not a string or empty');
      }
      let packet = create_join_channel_packet(channel);
      socket.send(packet.buffer);
    },
    sendUsername: function(username){
      if (typeof username !== "string" || !username){
        throw new Error('Username is not a string or empty');
      }
      let packet = create_auth_response(username);
      socket.send(packet.buffer);
    },
    sendChat: function(username, message){
      if (typeof username !== "string"){
        throw new Error('Username is not a string');
      }
      else if(typeof message !== "string"){
        throw new Error('Message is not a string');
      }
      else{
        let packet = create_chat_message(username, message);
        socket.send(packet.buffer);
      }
    },
    off: function(event,callback){
      if(!listeners[event]){
        return false;
      }
      let index = listeners[event].indexOf(callback);
      if (index !== -1){
          listeners[event].slice(1,index);
          return true;
        }
      return false;
    }
  };

if (DEV)
  window.chat_socket = chat_socket;
