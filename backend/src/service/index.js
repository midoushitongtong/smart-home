module.exports = obj = {
  socketList: [],
  webSocketList: [],
  handlerSocket: (socket) => {
    // 将该连接加入连接池
    obj.socketList.push(socket);

    console.log(`=socket client connect success: ${socket.remoteAddress}`);

    // 处理每个客户端发送的消息
    socket.on('data', (data) => {
      console.log(`=socket client receive data: ${data}`);
      obj.handlerSocketData(socket, data);
    });

    // 客户端正常断开时执行
    socket.on('close', () => {
      // 连接关闭时，将其移出连接池
      obj.socketList = obj.socketList.filter((socketItem) => {
        return socketItem !== socket;
      });
      console.log(`=socket client connect close: ${socket.remoteAddress}`);
    });

    // 客户端正异断开时执行
    socket.on('error', () => {
      console.log(`=socket client connect error: ${socket.remoteAddress}`);
    });
  },
  handlerWebSocket: (webSocket, request) => {
    // 将该连接加入连接池
    obj.webSocketList.push(webSocket);

    console.log(`==webSocket client connect success: ${request.connection.remoteAddress}`);

    // 处理每个客户端发送的消息
    webSocket.on('message', (data) => {
      console.log(`==webSocket client receiver data: ${data}`);
      obj.handlerWebSocketData(webSocket, data);
    });

    // 客户端正常断开时执行
    webSocket.on('close', () => {
      // 连接关闭时，将其移出连接池
      obj.webSocketList = obj.webSocketList.filter((webSocketItem) => {
        return webSocketItem !== webSocket;
      });
      console.log(`==webSocket client connect close: ${request.connection.remoteAddress}`);
    });
  },
  handlerSocketData: (socket, JSONStr) => {
    try {
      const JSONObj = JSON.parse(JSONStr);
      switch (JSONObj.actionType) {
        default:
          // 发送数据给小程序客户端
          obj.webSocketList.forEach((webSocketItem) => {
            webSocketItem.send(`${JSONStr}`);
          });
      }
    } catch (e) {
      console.log('==socket client 字符串转对象失败', e);
    }
  },
  handlerWebSocketData: (webSocket, JSONStr) => {
    try {
      const JSONObj = JSON.parse(JSONStr);
      switch (JSONObj.actionType) {
        default:
          // 发送数据给硬件客户端
          obj.socketList.forEach((socketItem) => {
            socketItem.write(`${JSONStr}`);
          });
      }
    } catch (e) {
      console.log('==webSocket client 字符串转对象失败', e);
    }
  }
};
