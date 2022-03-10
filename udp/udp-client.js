const dgram = require('dgram');    
const client = dgram.createSocket('udp4'); 
const message = Buffer.from('Some bytes'); 
// 绑定客户端端口，即源 IP
// client.bind(10000);
// 直接发送数据
client.send(message, 8080, () => { 
  // 关闭 socket
  client.close();  
});  



