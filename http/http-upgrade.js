const http = require('http');
const { createHash } = require('crypto');

// 创建一个 http server
const httpServer = http.createServer();
// 监听基于 HTTP Server 的协议升级请求
httpServer.on('upgrade', (req, socket, head) => {
    
    // 按照 WebSocket 协议计算返回 header
    const digest = createHash('sha1')
    .update(`${req.headers['sec-websocket-key']}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
    .digest('base64');

    // 设置返回状态码和 headers
    const headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${digest}`
    ];  

    socket.write(headers.concat('\r\n').join('\r\n'));
});
// 监听 8080 端口，作为 HTTP 服务器的对外端口
httpServer.listen(8080, () => {
    startClient();
});

function startClient() {
    const WebSocket = require('ws');
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('open', () => {
        console.log('success')
    });
    ws.on('error', console.error);
}
