const dgram = require('dgram');  
// 创建一个UDP服务器  
const server = dgram.createSocket('udp4'); 
// 绑定端口  
server.bind(8080); 
// 监听UDP数据的到来  
server.on('message', (msg, remoteInfo) => {  
  console.log(`get ${msg} from ${remoteInfo.address}:${remoteInfo.port}`)
});  

