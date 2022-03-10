const { Worker, isMainThread, workerData } = require('worker_threads');

// 主线程
if (isMainThread) {
  new Worker(__filename, { 
    resourceLimits: {
      // maxYoungGenerationSizeMb: 3,
      maxOldGenerationSizeMb: 3,
      // codeRangeSizeMb: 3,
      // stackSizeMb: 5
    }
  });
} else { // 子线程
  const arr = [];
  setInterval(() => {
    const obj = {};
    for (let i = 0; i < 1000; i++) {
      obj[i] = i;
    }
    arr.push(obj);
  }, 10);
}


