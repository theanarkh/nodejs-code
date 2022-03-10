const dgram = require('dgram');  
const udp = dgram.createSocket({type: 'udp4', reuseAddr: true}); 
udp.bind(8080,() => { 
  // 设置多播包的出口地址
  udp.setMulticastInterface('127.0.0.1');
  // 自己也加入对播组，不仅可以收到别人发送的消息，也可以收到自己发送的消息
  udp.addMembership('224.0.0.114', '127.0.0.1'); 
  // 设置自己发送数据时，不给自己发一份
  udp.setMulticastLoopback(false);
}); 
// 给多播组发送数据
udp.send('test', 8080, '224.0.0.114', (err) => {});   
udp.on('message', (msg, rinfo) => {  
  console.log('client', msg.toString('utf-8'), rinfo);
}); 