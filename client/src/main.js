'use strict';

import {CHAT_MESSAGE} from '../../lib/messages/client/chat';
import {enableThemes} from './js/theme';
import {channelSelector} from './js/channel';
import {sendChat,chat_socket} from './socket';
import {guestLogin} from './js/guest';

enableThemes();
channelSelector();
guestLogin();

let msgInfo = document.getElementsByClassName('mesgChat')[0];
let sendMesg = document.getElementById('sendText');
let convoBox = document.getElementById("conversationBoxWrapper");
let chatForm = document.querySelector("form.chat");

function submitChat(event){
  event.preventDefault();
  if (!msgInfo.value.length)
    return;
  chat_socket.sendChat(username, msgInfo.value);
  msgInfo.value = '';
  }

sendMesg.addEventListener('click', submitChat);
chatForm.addEventListener('submit', submitChat);

chat_socket.on("error",console.error);

chat_socket.on("open",() => chat_socket.joinChannel('lobby'));

chat_socket.on(CHAT_MESSAGE,function(packetObj){
  let conversationBox = document.createElement("DIV");
  conversationBox.classList.add("conversationBox");
  let usernameSpan = document.createElement("SPAN");
  usernameSpan.classList.add("conversationUser");
  usernameSpan.textContent = packetObj.packetUsername + ": ";
  let messageSpan = document.createElement("SPAN");
  messageSpan.classList.add("conversationText");
  messageSpan.textContent = packetObj.packetMessage;
  conversationBox.appendChild(usernameSpan);
  conversationBox.appendChild(messageSpan);
  convoBox.appendChild(conversationBox);
});
