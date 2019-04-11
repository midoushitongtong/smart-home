const net = require('net');
const HOST = '127.0.0.1';
const PORT = 5001;

const client = new net.Socket();
client.connect(PORT, HOST, function () {
  console.log('server client connect success');

  client.write('hello world');

  client.on('data', function (data) {
    console.log(`receiver server data: ${data}`);
  });

  client.on('close', function () {
    console.log('closed');
  });
});
