const { Writable } = require('stream');
let buffer;
const type = 1;
if (type === 1) {
    const myWritable = new Writable({
        highWaterMark: 3, // 写入 3 个字节后就先暂停，消费完再写
        write(chunk, encoding, callback) {
            // 保存数据
            buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;
            // 通知可写流写入成功
            callback(null);
        },
    });
    
    // 写入数据
    const shouldWrite = myWritable.write('hello');
    if (shouldWrite) {
        myWritable.end('world');
    } else {
        const ondrain = () => {
            console.log('continue');
            myWritable.end('world');
            myWritable.removeListener('drain', ondrain);
        };
        myWritable.on('drain', ondrain);
    }
    myWritable.on('finish', () => {
        console.log(buffer.toString('utf-8'));
    });
} else {
    class Consumer extends Writable {
        _write(chunk, encoding, callback) {
            // 保存数据
            buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;
            callback(null);
        }
    }
    const consumer = new Consumer();
    consumer.end('hello');
    consumer.on('finish', () => {
        console.log(buffer.toString('utf-8'));
    });
}