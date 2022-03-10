const net = require('net');
// 创建 TCP 服务器
const server = net.createServer((socket) => {
    socket.setKeepAlive(true, 10 * 1000);
});
// 启动服务器
server.listen(8080, () => {
    net.connect({ port: 8080, host: '127.0.0.1' });
});