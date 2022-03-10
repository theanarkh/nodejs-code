const { MessageChannel } = require('worker_threads');
// 创建一个通信通道，得到两个端点
const { port1, port2 } = new MessageChannel();

// port2 监听数据
port2.on('message', (message) => {
  console.log('port2', message);
  // 给 port1 发送数据
  port2.postMessage('world');
});

// port1 监听数据
port1.on('message', (message) => {
  console.log('port1', message);
});
// 给 port2 发送数据
port1.postMessage('hello');