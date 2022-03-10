const { Worker, isMainThread, workerData } = require('worker_threads');

// 主线程
if (isMainThread) {
  new Worker(__filename, { 
    workerData: { hello: 'world'}
  });
} else { // 子线程
  console.log(workerData)
}


