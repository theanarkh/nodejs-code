const { Worker, isMainThread, SHARE_ENV } = require('worker_threads');
const shareEnv = false;
if (shareEnv) {
    // 主线程
    if (isMainThread) {
      // SHARE_ENV 使得主线程和子线程共享环境变量，互相影响
      const worker = new Worker(__filename, {env: SHARE_ENV});
      process.env.fromMainThread = 2;
      worker.on('exit', () => {
        // 主线程打印，看是否是子线程设置的值
        console.log('main thread: ', process.env.fromMainThread);
      });
    } else { // 子线程
      setTimeout(() => {
        // 先打印主线程传过来的值
        console.log('sub thread: ', process.env.fromMainThread);
        // 然后修改它
        process.env.fromMainThread = 1;
      },1000);
    }
} else {
    // 主线程
    if (isMainThread) {
      process.env.fromMainThread = 1;
      new Worker(__filename);
      // process.env.fromMainThread = 1;
    } else { // 子线程
      // 默认继承主线程的环境变量 process.env
      console.log(process.env.fromMainThread)
    }
}
