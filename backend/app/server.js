const net = require('net');
const SmartHomeService = require('./service/SmartHome');
const ServerHost = '0.0.0.0';
const ServerPort = 5001;

// 创建一个 TCP 服务器实例
const tcpServer = net.createServer();
// 有客户端连接交给 service 处理
tcpServer.on('connection', (socket) => SmartHomeService.handlerSocket(socket));

tcpServer.on('error', (e) => {
    console.log('tcpServer error', e);
});

tcpServer.on('close', () => {
    console.log('tcpServer close');
});

tcpServer.listen(ServerPort, ServerHost);
