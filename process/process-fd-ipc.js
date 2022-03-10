const childProcess = require('child_process');
const path = require('path');
const net = require('net');
const { createTmpFileWithContent } = require('../helper');

const codeExecutedInChildProcess = `
process.on('message', (message, client) => {
	client.end('HTTP/1.1 200 OK\\r\\ncontent-length: 5\\r\\n\\r\\nhello\\r\\n\\r\\n');
});
`;
const filepath = `${__dirname}/tmp.js`;
createTmpFileWithContent(filepath, codeExecutedInChildProcess);

// 创建进程
const worker = childProcess.fork(filepath);
// 启动服务器
const server = net.createServer((client) => {
  // 把 TCP 连接传递给子进程处理
  worker.send(null, client);
});

server.listen(8080, () => {
  startClient();
});

function startClient() {
  const socket = net.connect(8080);
  socket.on('connect', () => {
    console.log('connect');
  });
  socket.on('data', (data) => {
    console.log(data.toString('utf-8'));
  });
}