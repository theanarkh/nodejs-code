const net = require('net');
// 创建 TCP 服务器
const server = net.createServer((socket) => {
    // 收到数据
    socket.on('data', (data) => {
        console.log('服务器收到：',data.toString('utf-8'));
        // 回复
        socket.end('world');
    });
});
// 启动服务器
server.listen(8080);