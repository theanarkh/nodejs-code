
   
const childProcess = require('child_process');
const net = require('net');
const os = require('os');
const { createTmpFileWithContent } = require('../helper');
const filepath = `${__dirname}/tmp.js`;
createTmpFileWithContent(filepath, `
    process.on('message', (message, client) => {
        client.destroy();
    });
`);

const workers = [];
let index = 0;
const workerNum = os.cpus().length;
for (let i = 0; i < workerNum; i++) {
	workers.push(childProcess.fork(filepath));
}
// 主进程监听端口
const server = net.createServer((client) => {
	// 通过文件描述符传递把连接传递到子进程处理
    console.log(`process ${workers[index].pid} handle this connection`);
    workers[index].send(null, client);
    index = (index + 1) % workerNum;
});
server.listen(8080, () => {
    require('./cluster-client');
});
