"use strict";
import { chat_socket } from '../socket';

export function channelSelector(){
    let channelButtons = document.getElementsByClassName('channel');
    for (let i = 0; i < channelButtons.length; i++){
        channelButtons[i].addEventListener('click', currentChannel);
    }
}

function currentChannel(){
    let currentChannel = this.textContent;
    let channelButtons = document.getElementsByClassName('channel');
    for (let i = 0; i < channelButtons.length; i++){
        channelButtons[i].classList.remove('selectedChannel');
    }
    this.classList.add('selectedChannel');
    chat_socket.joinChannel(currentChannel);
};

export function channelButton(){
let channelButton = document.getElementById("channelButton");
let channelContent = document.getElementById("channels");
channelButton.addEventListener("click", event =>{
    if (channelContent.classList.contains("showChannel"))
        channelContent.classList.remove("showChannel");
    else
        channelContent.classList.add("showChannel");
});
}