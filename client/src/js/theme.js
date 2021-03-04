"use strict";

export function enableThemes(){
    let themeButtons = document.querySelectorAll('#themesContainer .themes');
    themeButtons.forEach(button => button.addEventListener('click', clickThemeButton))
}

let currentTheme = 'default';

function clickThemeButton(){
    let selectedTheme = this.dataset['theme'];
    if (!selectedTheme)
        throw new Error('Theme button does not have data-theme set');
    window.document.body.classList.remove(currentTheme);
    window.document.body.classList.add(selectedTheme);
    currentTheme = selectedTheme;
};

let themesButton = document.getElementById("themesDropdownButton");
let themeContent = document.getElementById("themesContainer");
themesButton.addEventListener("click", event =>{
    if(themeContent.classList.contains("show"))
        themeContent.classList.remove("show");
    else
        themeContent.classList.add("show");
})


