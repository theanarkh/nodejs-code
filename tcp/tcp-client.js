const net = require('net');
require('./tcp-server');
// 连接到 8080 端口
const socket = net.connect({ port: 8080, host: '127.0.0.1' });
// 收到数据
socket.on('data', (data) => {
    console.log('客户端收到：', data.toString('utf-8'));
});
// 连接成功后发送数据
socket.on('connect', () => {
    socket.end('hello');
});