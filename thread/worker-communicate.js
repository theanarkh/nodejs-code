const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  // 接收子线程的消息
  worker.once('message', (message) => {
    console.log('main thread: ', message);
  });
  worker.postMessage('from main thread');
} else {
  // 接收主线程的消息
  parentPort.once('message', (message) => {
    console.log('sub thread: ', message);
    parentPort.postMessage('from sub thread');
  });
}
