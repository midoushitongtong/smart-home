const net = require('net');
const HOST = '127.0.0.1';
// const HOST = '47.106.77.210';
const PORT = 5001;

const currentData = {
  kitchen: {
    switch1: true,
    switch2: false
  }
};

const socket = new net.Socket();
socket.connect(PORT, HOST, function () {
  console.log('socket server connect success');

  socket.on('data', function (JSONStr) {
    console.log(`socket server receiver data: ${JSONStr}`);
    try {
      const JSONObj = JSON.parse(JSONStr);
      switch (JSONObj.actionType) {
        case 'getInitData':
          // 发送数据给服务端
          socket.write(`${JSON.stringify({
            actionType: 'getInitData',
            data: currentData
          })}`);
          break;
        default:
          // 保存状态
          currentData[JSONObj.actionType][JSONObj.actionTypeDetailName] = JSONObj.actionTypeDetailValue;
          // 发送数据给服务端
          socket.write(`${JSONStr}`);
      }
    } catch (e) {
      console.log('==socket server 字符串转对象失败', e);
    }
  });

  socket.on('close', function () {
    console.log('closed');
  });
});
