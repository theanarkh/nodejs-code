const http = require('http');
// 处理 HTTP 请求
require('inspector').open(9229);
function handleHTTPRequest(req, res) {
    console.log(`请求 url: ${req.url}`);
    res.end('hello');
}
// 创建一个 http server
const httpServer = http.createServer(handleHTTPRequest);
// 监听 8080 端口，作为 HTTP 服务器的对外端口
httpServer.listen(8080);
// 执行 node –inspect index.js 或 代码里加上 require('inspector').open(9229) 
