'use strict';

import {CHAT_MESSAGE} from '../../lib/messages/client/chat';
import {enableThemes} from './js/theme';
import {channelSelector} from './js/channel';
import {sendChat,chat_socket} from './socket';

enableThemes();
channelSelector();

var msgInfo = document.getElementsByClassName('mesgChat')[0];
var sendMesg = document.getElementById('sendText');
var convoBox = document.getElementById("conversationBoxWrapper");
var username = 'Julian';

sendMesg.addEventListener('click', function(){
  chat_socket.sendChat(username, msgInfo.value);
  msgInfo.value = '';
});

chat_socket.on("error",console.error);

chat_socket.on(CHAT_MESSAGE,function(packetObj){
  var conversationBox = document.createElement("DIV");
  conversationBox.classList.add("conversationBox");
  var usernameSpan = document.createElement("SPAN");
  usernameSpan.classList.add("conversationUser");
  usernameSpan.textContent = packetObj.packetUsername + ": ";
  var messageSpan = document.createElement("SPAN");
  messageSpan.classList.add("conversationText");
  messageSpan.textContent = packetObj.packetMessage;
  conversationBox.appendChild(usernameSpan);
  conversationBox.appendChild(messageSpan);
  convoBox.appendChild(conversationBox);
});
