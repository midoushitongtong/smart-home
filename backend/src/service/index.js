const smsUtil = require('../util/sms');

const obj = {
  validSocketList: [],
  validWebSocketList: [],
  handlerSocketConnect: (socket) => {
    console.log(`=socket client connect success: ${socket.remoteAddress}`);

    // 保存 socket
    obj.validSocketList.push(socket);

    // 处理每个客户端发送的消息
    socket.on('data', (data) => {
      data = data.toString();
      console.log(`=socket client receive data: ${data}`);
      obj.handlerSocketData(socket, data);
    });

    // 客户端正常断开时执行
    socket.on('close', () => {
      // 连接关闭时，将其移出连接池
      obj.validSocketList = obj.validSocketList.filter((validSocketItem) => {
        if (validSocketItem === socket) {
          // 告诉小程序客户端硬件已经断开链接
          obj.validWebSocketList.forEach(validWebSocketItem => {
            validWebSocketItem.send('CLOSE');
          });
          return false;
        }
        return true;
      });
      console.log(`=socket client connect close: ${socket.remoteAddress}`);
    });

    socket.on('error', () => {
      console.log(`=socket client connect error: ${socket.remoteAddress}`);
    });
  },
  handlerWebSocketConnect: (webSocket, request) => {
    console.log(`==webSocket client connect success: ${request.connection.remoteAddress}`);

    // 保存 webSocket
    obj.validWebSocketList.push(webSocket);

    // 处理每个客户端发送的消息
    webSocket.on('message', (data) => {
      console.log(`==webSocket client receiver data: ${data}`);
      obj.handlerWebSocketData(webSocket, data);
    });

    // 客户端正常断开时执行
    webSocket.on('close', () => {
      // 连接关闭时，将其移出连接池
      obj.validWebSocketList = obj.validWebSocketList.filter((validWebSocketItem) => {
        return validWebSocketItem !== webSocket;
      });
      console.log(`==webSocket client connect close: ${request.connection.remoteAddress}`);
    });
  },
  handlerSocketData: (socket, str) => {
    // 发送警告短信
    if (str.substring(0, 'call1'.length) === 'call1') {
      const flag = str.split('-')[1];
      if (flag === '1') {
        const params = ['报警', '1'];
        const phoneNumberList = ['13026628310', '14715142455', '13537279739'];
        phoneNumberList.forEach(phone => smsUtil.sendSMSMessage([phone], params));
      }
    }
    if (str.substring(0, 'smoke1'.length) === 'smoke1') {
      const flag = str.split('-')[1];
      if (flag === '1') {
        const params = ['烟雾报警', '1'];
        const phoneNumberList = ['13026628310', '14715142455', '13537279739'];
        phoneNumberList.forEach(phone => smsUtil.sendSMSMessage([phone], params));
      }
    }

    // 发送给所有 webSocket 客户端
    obj.validWebSocketList.forEach((validWebSocketItem) => {
      validWebSocketItem.send(str);
    });
  },
  handlerWebSocketData: (webSocket, str) => {
    // 发送给所有 socket 客户端
    obj.validSocketList.forEach((validSocketItem) => {
      validSocketItem.write(str);
    });
  }
};

module.exports = obj;
