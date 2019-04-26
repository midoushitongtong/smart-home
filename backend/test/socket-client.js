const net = require('net');
const HOST = '0.0.0.0';
const PORT = 5001;

function connect() {
  const socket = new net.Socket();
  socket.connect(PORT, HOST, function () {
    console.log('socket server connect success');

    socket.on('data', function (str) {
      str = str.toString();
      console.log(`socket server receiver data: ${str}`);
      try {
        switch (str) {
          case 'INIT':
            // 发送警告数据
            setTimeout(() => {
              setTimeout(() => {
                socket.write('call1-0');
              }, 50);
              setTimeout(() => {
                socket.write('smoke1-0');
              }, 100);
            }, 3000);

            // 初始化数据
            socket.write('INIT-LED1-0,LED2-1,LED3-0,LED4-0,LED5-0,LED6-0,LED7-0,door1-0,cur1-0,cur2-0,fan1-0,tem-hum1-23-33,tem1-15,hood1-1');
            break;
          default:
            // 发送数据给服务端
            socket.write(str);
        }
      } catch (e) {
        console.log('==socket server 字符串转对象失败', e);
      }
    });

    socket.on('close', function () {
      connect();
      console.log('socket server connect close');
    });
  });
}

connect();
