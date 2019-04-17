const net = require('net');
const HOST = '0.0.0.0';
// const HOST = '47.106.77.210';
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
            // 发送数据给服务端
            // 房子
            setTimeout(() => {
              socket.write('call1-0');
            }, 50);
            setTimeout(() => {
              socket.write('door1-1');
            }, 50 * 2);

            // 厨房
            setTimeout(() => {
              socket.write('LED1-1');
            }, 50 * 3);
            setTimeout(() => {
              socket.write('smoke1-0');
            }, 50 * 4);

            // 客厅
            setTimeout(() => {
              socket.write('LED2-1');
            }, 50 * 5);
            setTimeout(() => {
              socket.write('fan1-2');
            }, 50 * 6);
            setTimeout(() => {
              socket.write('tem1-15');
            }, 50 * 7);
            setTimeout(() => {
              socket.write('tem-hum1-15-20');
            }, 50 * 8);

            // 餐厅
            setTimeout(() => {
              socket.write('LED3-1');
            }, 50 * 9);

            // 阳台
            setTimeout(() => {
              socket.write('LED4-0');
            }, 50 * 10);
            setTimeout(() => {
              socket.write('cur1-0');
            }, 50 * 11);

            // 主卧
            setTimeout(() => {
              socket.write('LED5-1');
            }, 50 * 12);
            setTimeout(() => {
              socket.write('cur2-0');
            }, 50 * 13);

            // 次卧
            setTimeout(() => {
              socket.write('LED6-1');
            }, 50 * 14);

            // 卫生间
            setTimeout(() => {
              socket.write('LED7-1');
            }, 50 * 15);
            break;
          default:
            // 保存状态
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
