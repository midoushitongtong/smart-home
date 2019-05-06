const net = require('net');
const webSocket = require('ws');
const smartHomeSocketService = require('../service/index');

module.exports = {
  createSocketServer: () => {
    // 创建一个 TCP 服务器实例
    const tcpServer = net.createServer();

    // 有客户端连接交给 service 处理
    tcpServer.on('connection', (socket) => smartHomeSocketService.handlerSocketConnect(socket));

    tcpServer.on('error', (e) => {
      console.log('tcpServer error', e);
    });

    tcpServer.on('close', () => {
      console.log('tcpServer close');
    });

    tcpServer.listen(5001);
  },
  createWebSocketServer: () => {
    // 创建一个 TCP 服务器实例
    const wss = new webSocket.Server({
      port: 5002
    });

    // 有客户端连接交给 service 处理
    wss.on('connection', (webSocket, request) => smartHomeSocketService.handlerWebSocketConnect(webSocket, request));
  }
};
