const fs = require('fs'); 
const { Writable } = require('stream');
const filename = 'big_file';
fs.writeFileSync(filename, '0'.repeat(100 * 1024 * 1024));
console.log(`文件大小: ${fs.statSync(filename).size} bytes`);

class Consumer extends Writable {
    _write(chunk, encoding, callback) {
        callback(null);
    }
}
fs.createReadStream(filename).pipe(new Consumer())
.on('finish', () => {
    console.log(`内存使用：${process.memoryUsage().rss} bytes`);
    fs.unlinkSync(filename);
});

