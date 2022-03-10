const net = require('net');
// 创建 TCP 服务器
const server = net.createServer({ allowHalfOpen: true }, (socket) => {
    socket.on('data', (data) => {
        console.log(data.toString('utf-8'));
    });
});
// 启动服务器
server.listen(8080, () => {
    const socket = net.connect({ port: 8080, host: '127.0.0.1' });
    socket.on('connect', () => {
        socket.end('hello');
    });
    // allowHalfOpen: false 触发 close，为 true 则不会
    socket.on('close', () => {
        console.log('close')
    });
});