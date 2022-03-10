const dgram = require('dgram');

function startServer() {
  for (let i = 0; i < 2; i++) {
    let index = i + 1;
    const udp = dgram.createSocket({type: 'udp4', reuseAddr: true});    
    udp.bind(8080, () => {   
        // 设置 127.0.0.1 对应的接口加入多播组 224.0.0.114
        // 局域网多播地址（224.0.0.0~224.0.0.255，该范围的多播数据包，路由器不会转发）   
        udp.addMembership('224.0.0.114', '127.0.0.1'); 
    });    
    udp.on('message', (msg, rinfo) => {  
      console.log(`server ${index}`, msg.toString('utf-8'), rinfo);
    });  
  }
}

function startClient() {
  const udp = dgram.createSocket({type: 'udp4'}); 
  // 1234 为客户端地址
  udp.bind(1234,() => {
    // 设置多播包的出口地址，不设置操作系统会默认选一个，如果选的不是 server 加入的 ip，则 server 收不到数据
    udp.setMulticastInterface('127.0.0.1');
  }); 
  // 给多播组发送数据
  udp.send('test', 8080, '224.0.0.114', (err) => {});   
}

startServer();
startClient();