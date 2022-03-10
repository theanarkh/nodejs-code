let i = 0;  
const net = require('net');  
net.createServer((socket) => {  
    console.log('收到连接个数：', ++i);  
    socket.on('data', (data) => { 
        socket.write(`HTTP/1.1 200 OK\r\ncontent-length:0\r\n\r\n\r\n\r\n`);
     });
}).listen(8080, () => {
    startClient();
});

const http = require('http');  
function startClient() {
    // 创建一个连接池，同 host 和 port 最多只能有一个连接，改成 2 则同时建立两个连接
    const keepAliveAgent = new http.Agent({ keepAlive: true, maxSockets: 1 });  
    const options = { 
        port: 8080, 
        method: 'GET',  
        host: '127.0.0.1', 
        agent: keepAliveAgent,
    };
    // 往同一个 host 和 port 发起两个连接
    for (let i = 0; i < 3; i++) {
        let index = i + 1;
        http.get(options, (res) => {
            // 监听 data 才能触发 end 事件
            res.on('data', () => {});
            res.on('end', () => {
                console.log(`request${index} end`);
            });
        });
    }  
    // 输出等待的请求个数，通过打印 options.agent.requests 可以看到请求对应的 key
    console.log('等待 TCP 连接的请求数: ', options.agent.requests['127.0.0.1:8080:'].length)  
}