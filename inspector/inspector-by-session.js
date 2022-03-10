const fs = require('fs');
const { Session } = require('inspector');
const session = new Session();
session.connect();

const filename = `${process.pid}.heapsnapshot`;
const writeStream = fs.createWriteStream(filename);

session.on('HeapProfiler.addHeapSnapshotChunk', (data) => {
    writeStream.write(data.params.chunk);
});

session.post('HeapProfiler.takeHeapSnapshot', () => {
 //   
});
