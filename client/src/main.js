'use strict';

import {CHAT_MESSAGE} from '../../lib/messages/client/chat';
import {AUTHENTICATE_STATUS,AUTHENTICATE_STATUS_OKAY} from '../../lib/messages/client/authentication';
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
let guestUsername = document.getElementById('guestUsername');
let loginButton = document.getElementById('loginButton');
let guestForm = document.getElementById('guestForm');

function submitChat(event){
  event.preventDefault();
  if (!msgInfo.value.length)
    return;
  chat_socket.sendChat(chat_socket.username, msgInfo.value);
  msgInfo.value = '';
  }

function submitUsername(event){
  event.preventDefault();
  if (guestUsername.value.length < 1) {
    return;
  }
  chat_socket.sendUsername(guestUsername.value);
}

sendMesg.addEventListener('click', submitChat);
chatForm.addEventListener('submit', submitChat);
loginButton.addEventListener('click', submitUsername);
guestForm.addEventListener('submit', submitUsername);

chat_socket.on(AUTHENTICATE_STATUS,packetObj =>{
  if (packetObj.authStatus === AUTHENTICATE_STATUS_OKAY){
    let guestContainer = document.getElementById("guestContainer");
    guestContainer.style.display = 'none';
  }
});

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
