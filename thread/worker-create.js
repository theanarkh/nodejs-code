const { Worker, isMainThread } = require('worker_threads');

const createType = 1;

switch(createType) {
  case 1:
      {
        if (isMainThread) {
          // 以当前文件为入口创建线程
          new Worker(__filename);
          console.log('createType: 1', 'im main thread')
        } else {
          console.log('createType: 1', 'im sub thread')
        }        
      }
      break;
  case 2:
    {
      new Worker("console.log('createType: 2', 'im sub thread')", { eval: true });
      console.log('createType: 2', 'im main thread')
    }
    break;
  case 3:
    {
      const { createTmpFileWithContent } = require('../helper');
      const codeExecutedInChildProcess = `console.log('createType: 3', 'im sub thread');`;
      const filepath = `${__dirname}/tmp.js`;
      createTmpFileWithContent(filepath, codeExecutedInChildProcess);
      new Worker(filepath);
      console.log('createType: 3', 'im main thread')
    }
    break;
  default: break;
}