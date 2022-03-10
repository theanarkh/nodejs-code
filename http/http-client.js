const http = require('http');
require('./http-server');
// 通过 http.request 发起一个请求，返回一个表示请求的对象 clientRequest
const clientRequest = http.request('http://localhost:8080/', { method: "POST", headers: {} }, 
    (res) => { // 收到响应时的回调
        // 接收响应数据
        res.on('data', (buf) => {
            console.log('响应数据：', buf.toString('utf-8'));
        });
        // 响应结束
        res.on('end', () => {
            console.log('响应结束');
            process.exit();
        });
    }
);
// 请求体
clientRequest.write("hello");
// 标记请求结束
clientRequest.end();