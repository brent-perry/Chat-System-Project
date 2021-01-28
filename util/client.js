'use strict';

(function(){

    const DEV = true;

    let socket = new WebSocket('ws://' + document.location.host);

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

})();
