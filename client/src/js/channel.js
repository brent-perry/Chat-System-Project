"use strict";
import { chat_socket } from '../socket';

export function channelSelector(){
    let channelButtons = document.getElementsByClassName('channel');
    for(let i = 0; i < channelButtons.length; i++){
        channelButtons[i].addEventListener('click', currentChannel);
    }
}

function currentChannel(){
    let currentChannel = this.textContent;
    let channelButtons = document.getElementsByClassName('channel');
    for(let i = 0; i < channelButtons.length; i++){
        channelButtons[i].classList.remove('selectedChannel');
    }
    this.classList.add('selectedChannel');
    // chat_socket.joinChannel(currentChannel);
};

    let channelDrop = document.getElementById("channelTitle");
    let channelContent = document.getElementById("channelContainer");
    channelDrop.addEventListener("click", event =>{
        if(channelContent.classList.contains("show"))
            channelContent.classList.remove("show");
        else
            channelContent.classList.add("show");
    });