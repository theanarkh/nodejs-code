const fs = require('fs');
const { Session } = require('inspector');
const session = new Session();
session.connect();

// 保存到全局变量，导致无法释放内存
global.arr = [];

class MemoryLeak {}

for (let i = 0; i < 100; i++) {
    arr.push(new MemoryLeak());
}

setTimeout(() => {
    const consumer = fs.createWriteStream('1.heapsnapshot')
    session.on('HeapProfiler.addHeapSnapshotChunk', (data) => {
        consumer.write(data.params.chunk);
    });
    session.post('HeapProfiler.takeHeapSnapshot', () => {
        // done
    });
}, 1000);