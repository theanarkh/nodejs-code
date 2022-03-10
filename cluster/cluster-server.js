
// 设置为轮询模式
// process.env.NODE_CLUSTER_SCHED_POLICY = 'rr';
// 设置为共享模式
// process.env.NODE_CLUSTER_SCHED_POLICY = 'none';
const cluster = require('cluster');
const os = require('os');
// 设置为共享模式
cluster.schedulingPolicy = cluster.SCHED_NONE;
// 设置为轮询模式
// cluster.schedulingPolicy = cluster.SCHED_RR;

// 主进程 fork 多个子进程
if (cluster.isMaster) {
  // 通常根据 CPU 核数创建多个进程 os.cpus().length
  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }
} else { // 子进程创建服务器
  const net = require('net');
  const server = net.createServer((socket) => {
    socket.end(`handle by process: ${process.pid}`);
  });
  server.listen(8080);
}