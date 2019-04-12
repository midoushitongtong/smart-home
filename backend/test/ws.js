const WebSocket = require('ws');
var webSocket = new WebSocket("ws://127.0.0.1:5002");

webSocket.onopen = function (e) {
  console.log('webSocket server connect success');
  webSocket.send('{"actionType":"kitchen","actionTypeDetailName":"switch1","actionTypeDetailValue":false}');
};

webSocket.onmessage = function (event) {
  console.log(`receiver server data: ${event.data}`);
};

webSocket.onclose = function (e) {
  console.log('connection aclosed.');
};

