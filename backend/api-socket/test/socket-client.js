const net = require('net');
const HOST = '0.0.0.0';
const PORT = 5001;

function connect() {
  const socket = new net.Socket();
  socket.connect(PORT, HOST, function () {
    console.log('socket server connect success');
    const data = 'INIT-LED1-0,LED2-1,LED3-0,LED4-0,LED5-0,LED6-0,LED7-0,door1-0,cur1-0,fan1-1,tem2-19,hood1-0,tem-hum1-23-33,call1-1,smoke1-1';

    // 初始化数据
    socket.write(data);

    socket.on('data', function (str) {
      str = str.toString();
      console.log(`socket server receiver data: ${str}`);
      try {
        switch (str) {
          case 'INIT':
            // 初始化数据
            socket.write(data);

            break;
          default:
            // 发送数据给服务端
            socket.write(str);
        }
      } catch (e) {
        console.log('==socket server 字符串转对象失败', e);
      }

      // 1
    });

    socket.on('close', function () {
      connect();
      console.log('socket server connect close');
    });
  });
}

connect();
