// 大端小端读取
const buffer = Buffer.alloc(4);
buffer[0] = 0x01;
buffer[1] = 0x23;
buffer[2] = 0x45;
buffer[3] = 0x67;
console.log(buffer.readInt32LE(0))
console.log(buffer.readInt32BE(0)) 

// 大端小端写入
const buffer = Buffer.alloc(2);
buffer.writeInt16LE(0x1234, 0);
console.log(buffer); // => 0x34 0x12
buffer.writeInt16BE(0x1234, 0);
console.log(buffer); // => 0x12 0x34

// 数据编码
console.log(Buffer.from('你好', 'utf-8'));
console.log(Buffer.from('你好', 'utf16le'));

// 数据解码
const buffer = Buffer.alloc(3);
buffer[0] = 0xe4;
buffer[1] = 0xb8;
buffer[2] = 0xad;

console.log(buffer.toString('utf-8')); // => 中