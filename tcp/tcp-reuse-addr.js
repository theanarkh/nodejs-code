
const net = require('net');
const { findLocalIP } = require('../helper');

const typeMap = {
  no_ip: 0,
  one_ip: 1,
  two_ip: 2
};
let ip1;
let ip2;

let ipType = typeMap.two_ip;

if (ipType === typeMap.no_ip) {
  // do nothing
} else if (ipType === typeMap.one_ip) {
  ip1 = '127.0.0.1'
} else if (ipType === typeMap.two_ip){
  ip1 = '127.0.0.1'
  ip2 = findLocalIP();
}

{
  // 创建 TCP 服务器
  const server = net.createServer();
  // 启动服务器
  server.listen(8080, ip1);
}
{
  // 创建 TCP 服务器
  const server = net.createServer();
  // 启动服务器
  server.listen(8080, ip2);
}