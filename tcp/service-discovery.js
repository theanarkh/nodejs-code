const net = require('net');
const map = {};
// 创建一个服务发现服务，管理应用和地址信息
net.createServer((socket) => {
    let chunk;
    socket.on('data', (data) => {
        chunk = chunk ? Buffer.concat([chunk, data]) : data;
    });
    socket.on('end', () => {
        const {cmd, name, address} = JSON.parse(chunk.toString('utf-8'));
        if (cmd === 'register') {
            map[name] = address;
            socket.end(JSON.stringify({code: 0}));
        } else if (cmd === 'query'){
            socket.end(JSON.stringify({code: 0, data: map[name]}));
        }
    });
}).listen(8080, () => {
    // 启动业务服务器
    startServer();
});

function startServer() {
    // 启动成功后注册地址信息到服务发现服务器
    net.createServer(() => {})
    .listen(9999, () => {
        const socket = net.connect(8080);
        socket.on('connect', () => {
            socket.end(JSON.stringify({cmd: 'register', name: 'test', address: [{ip: '127.0.0.1', port: 9999}]}));
            let chunk;
            socket.on('data', (data) => {
                chunk = chunk ? Buffer.concat([chunk, data]) : data;
            });
            socket.on('end', (data) => {
                console.log('register result:', chunk.toString('utf-8'));
                // 注册成功后启动客户端
                startClient();
            });
        });
    });
}

function startClient() {
    // 访问服务发现服务器获得真正服务器的地址
    const socket = net.connect(8080);
    socket.on('connect', () => {
        socket.end(JSON.stringify({cmd: 'query', name: 'test'}));
        let chunk;
        socket.on('data', (data) => {
            chunk = chunk ? Buffer.concat([chunk, data]) : data;
        });
        socket.on('end', () => {
            const { data } = JSON.parse(chunk.toString('utf-8'));
            console.log('query result:', data);
            const client = net.connect(data[0].port, data[0].ip);
            client.on('connect', () => {
                console.log('connect success: ', data[0]);
            })
        });
    });
}

