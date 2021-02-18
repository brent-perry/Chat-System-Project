'use strict';

const {create_chat_message} = require('../../lib/messages/client/chat');


    const DEV = true;

    let socket = new WebSocket('ws://' + document.location.host);
    socket.binaryType = "arraybuffer";

    socket.onopen = function(){
      if (DEV) {
        console.log('connection open');
      };
    };

    socket.onclose = function(){
      if (DEV) {
        console.log('connection closed');
      };
    };

    socket.onerror = function(error){
      if (DEV) {
        console.log(error);
      };
    };

    socket.onmessage = function (message){
      if (DEV) {
        console.log('recieved message', message);
      };
    };

    export function sendChat(username,message){
      if (typeof username !== "string") {
        throw new Error('Username is not a string');
      }
      else if(typeof message !== "string"){
        throw new Error('Message is not a string');
      }
      else {
        let packet = create_chat_message(username, message);
        socket.send(packet.buffer);
      }
    }
