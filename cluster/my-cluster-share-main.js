const childProcess = require('child_process');
const os = require('os');
const net = require('net');
const { createTmpFileWithContent } = require('../helper');
const filepath = `${__dirname}/tmp.js`;
createTmpFileWithContent(filepath, `
	const net = require('net');
	process.on('message', (message, handle) => {
		// 监听父进程传过来的 socket
		net.createServer((socket) => {
			socket.end('process ' + String(process.pid) + ' receive connection');
		}).listen({ handle });
	});
`);

// 创建一个 socket，绑定到 8080 端口
const handle = net._createServerHandle('127.0.0.1', 8080, 4);

for (let i = 0; i < os.cpus().length; i++) {
	const worker = childProcess.fork(filepath);
	// 通过文件描述符传递给子进程
	worker.send(null ,handle);
}

setTimeout(() => {
	require('./cluster-client');
}, 1000);