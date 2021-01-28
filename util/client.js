'use strict';

(function() {

    const DEV = true;

    let socket = new WebSocket('ws://' + document.location.host);

    socket.onopen = function() {
      if (DEV) {
        console.log('connection open');
      };
    };

    socket.onclose = function() {
      if (DEV) {
        console.log('connection closed');
      };
    };

    socket.onerror = function(error) {
      if (DEV) {
        console.log(error);
      };
    };

    socket.onmessage = function (message) {
      if (DEV) {
        console.log('recieved message', message);
      };
      const obj = JSON.parse(message.data);
      switch(obj.event) {
        case "Joined":
          let newUser = obj.newUser;
          let element = newUser.element = document.createElement('div');
          element.classList.add('user');
          element.style.backgroundColor = newUser.color;
          newUser.element = element;
          document.body.appendChild(element);
          break;
        case "Left":
          
      }
    };

})();
