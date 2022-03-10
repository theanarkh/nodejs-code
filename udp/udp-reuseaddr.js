const dgram = require('dgram');    
function startServer() {
  for (let i = 0; i < 2; i++) {   
    let index = i + 1;
    const udp = dgram.createSocket({type: 'udp4', reuseAddr: true});    
    udp.bind(8080);    
    udp.on('message', (msg) => {  
      console.log(`server ${index}`, msg.toString('utf-8'));  
    });  
  }
}

function startClient() {
  const message = Buffer.from('Some bytes');  
  const client = dgram.createSocket('udp4');  
  // 发送数据
  client.send(message, 8080, () => { 
    // 关闭 socket
    client.close();  
  });  
}

startServer();
startClient();