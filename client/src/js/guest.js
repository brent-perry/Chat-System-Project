'use strict';
export function guestLogin(){
    let guestButton = document.getElementById("loginGuest");
    let guestContainer = document.getElementById("guestContainer");
    guestButton.addEventListener("click", event =>{
        if (guestContainer.classList.contains("showLogin"))
            guestContainer.classList.remove("showLogin");
        else
            guestContainer.classList.add("showLogin");
    });
};