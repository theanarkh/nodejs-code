const net = require('net');
let n = 1;
function connect() {
  if (n > 20) {
    return;
  }
  n++;
  const socket = net.connect({ port: 8080, host: '127.0.0.1' });
  socket.on('data', (data) => console.log(data.toString('utf-8')));
  socket.on('end', connect);
};

connect();