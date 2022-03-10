const { Worker, isMainThread, workerData } = require('worker_threads');

// 主线程
if (isMainThread) {
  // 定义数据
  const uint8Array = new Uint8Array([ 1, 2, 3, 4 ]);
  new Worker(__filename, {
    workerData: {
      uint8Array
    },
    // 指示对数据就行转移，而不是复制，转移会导致主线程的内存大小为 0，注释掉则会复制一份内存到子线程
    transferList: [ uint8Array.buffer ]
  });
  console.log('main', uint8Array);
} else { // 子线程
  console.log('worker', workerData.uint8Array)
}

