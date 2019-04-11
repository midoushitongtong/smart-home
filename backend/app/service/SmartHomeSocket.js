module.exports = {
  handlerSocket: (socket) => {
    console.log(`client connect success: ${socket.remoteAddress}`);
    // 处理每个客户端发送的消息
    socket.on('data', (data) => {
      console.log(`receive client data: ${data}`);
      socket.write('word hello');
    });

    // 客户端正常断开时执行
    socket.on('close', () => {
      console.log(`client connect close: ${socket.remoteAddress}`);
    });

    // 客户端正异断开时执行
    socket.on('error', () => {
      console.log(`client connect error: ${socket.remoteAddress}`);
    });
  }
};
