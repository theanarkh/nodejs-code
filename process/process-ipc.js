const cp = require('child_process');
const { createTmpFileWithContent } = require('../helper');
const codeExecutedInChildProcess = `
// 接收来自父进程的消息
process.on('message', (m) => {
    console.log('sub process receive:', m);
});

// 给父进程发送消息
process.send({ hello: 'im sub process' });
`
const filepath = `${__dirname}/tmp.js`;
createTmpFileWithContent(filepath, codeExecutedInChildProcess);
// 创建子进程，并在其中执行 node child.js
const child = cp.fork(filepath);
// 接收子进程的消息
child.on('message', (m) => {
    console.log('main process receive:', m);
});
  
// 给子进程发送消息
child.send({ hello: 'im main process' });

