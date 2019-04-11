const net = require('net');
// const HOST = '127.0.0.1';
const HOST = '47.106.77.210';
const PORT = 5001;

const s = new net.Socket();
s.connect(PORT, HOST, function () {
  console.log('socket server connect success');

  s.write('hello world');

  s.on('data', function (data) {
    console.log(`socket server receiver data: ${data}`);
  });

  s.on('close', function () {
    console.log('closed');
  });
});
