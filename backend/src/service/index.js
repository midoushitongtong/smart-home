const smsUtil = require('../util/sms');

const obj = {
  validSocketList: [],
  validWebSocketList: [],
  handlerSocketConnect: (socket) => {
    console.log(`=socket client connect success: ${socket.remoteAddress}`);

    // 处理每个客户端发送的消息
    socket.on('data', (data) => {
      data = data.toString();
      console.log(`=socket client receive data: ${data}`);
      obj.handlerSocketData(socket, data);
    });

    // 客户端正常断开时执行
    socket.on('close', () => {
      // 连接关闭时，将其移出连接池
      obj.validSocketList = obj.validSocketList.filter((validSocket) => {
        if (validSocket.socket === socket) {
          // 关闭对应的小程序客户端
          obj.validWebSocketList = obj.validWebSocketList.filter(validWebSocketItem => {
            if (validWebSocketItem.id === validSocket.id) {
              validWebSocketItem.webSocket.close();
              return false;
            }
            return true;
          });
          return false;
        }
        return true;
      });
      console.log(`=socket client connect close: ${socket.remoteAddress}`);
    });

    // 客户端正异断开时执行
    socket.on('error', () => {
      console.log(`=socket client connect error: ${socket.remoteAddress}`);
    });
  },
  handlerWebSocketConnect: (webSocket, request) => {
    console.log(`==webSocket client connect success: ${request.connection.remoteAddress}`);

    // 处理每个客户端发送的消息
    webSocket.on('message', (data) => {
      console.log(`==webSocket client receiver data: ${data}`);
      obj.handlerWebSocketData(webSocket, data);
    });

    // 客户端正常断开时执行
    webSocket.on('close', () => {
      // 连接关闭时，将其移出连接池
      obj.validWebSocketList = obj.validWebSocketList.filter((validWebSocketItem) => {
        return validWebSocketItem.webSocket !== webSocket;
      });
      console.log(`==webSocket client connect close: ${request.connection.remoteAddress}`);
    });
  },
  handlerSocketData: (socket, str) => {
    if (str.indexOf('id') > -1) {
      // 初始化有效 socket 连接
      const id = str.split('-')[1];
      obj.validSocketList.push({
        id,
        socket
      });
      console.log(`=====valid socket connect success id: ${id}`);
    } else {
      // 发送报警短信
      if (str.indexOf('call1') > -1) {
        const flag = str.split('-')[1];
        if (flag === '1') {
          const params = ['报警', '1'];
          const phoneNumberList = ['13026628310', '14715142455', '13537279739'];
          phoneNumberList.forEach(phone => smsUtil.sendSMSMessage([phone], params));
        }
      }
      if (str.indexOf('smoke1') > -1) {
        const flag = str.split('-')[1];
        if (flag === '1') {
          const params = ['烟雾报警', '1'];
          const phoneNumberList = ['13026628310', '14715142455', '13537279739'];
          phoneNumberList.forEach(phone => smsUtil.sendSMSMessage([phone], params));
        }
      }

      // 获取当前连接的有效 socket
      const validSocket = obj.validSocketList.find(validSocketItem => validSocketItem.socket === socket);

      if (validSocket) {
        // 发送数据给对应 id 的小程序客户端
        obj.validWebSocketList.forEach((validWebSocketItem) => {
          if (validWebSocketItem.id === validSocket.id) {
            validWebSocketItem.webSocket.send(str);
          }
        });
      }
    }
  },
  handlerWebSocketData: (webSocket, str) => {
    if (str.indexOf('id') > -1) {
      // 初始化有效 webSocket 连接
      const id = str.split('-')[1];
      obj.validWebSocketList.push({
        id,
        webSocket
      });
      console.log(`=====valid webSocket connect success id: ${id}`);
    } else {
      // 检测是否存在 socket
      if (str.indexOf('hasSocket') > -1) {
        const socketId = str.split('-')[1];
        const validSocket = obj.validSocketList.find(validSocketItem => validSocketItem.id === socketId);
        if (validSocket) {
          webSocket.send(`hasSocket-yes`);
        } else {
          webSocket.send('hasSocket-no');
        }
        return;
      }

      // 获取当前连接的有效 webSocket
      const validWebSocket = obj.validWebSocketList.find(validWebSocketItem => validWebSocketItem.webSocket === webSocket);

      if (validWebSocket) {
        // 发送数据给对应 id 的硬件客户端
        obj.validSocketList.forEach((validSocketItem) => {
          if (validSocketItem.id === validWebSocket.id) {
            validSocketItem.socket.write(str);
          }
        });
      }
    }
  }
};

module.exports = obj;
