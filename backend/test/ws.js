const WebSocket = require('ws');
var webSocket = new WebSocket("ws://localhost:5002");

webSocket.onopen = function (e) {
  console.log('webSocket server connect success');
  webSocket.send(JSON.stringify({
    actionType: 'openTheDoor'
  }));
};

webSocket.onmessage = function (event) {
  console.log(`receiver server data: ${event.data}`);
};

webSocket.onclose = function (e) {
  console.log('connection aclosed.');
};

