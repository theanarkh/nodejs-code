const fs = require('fs'); 
const filename = 'big_file';
fs.writeFileSync(filename, '0'.repeat(100 * 1024 * 1024));
console.log(`文件大小: ${fs.statSync(filename).size} bytes`);
fs.readFile(filename, (err, data) => {  
    console.log(`内存使用：${process.memoryUsage().rss} bytes`);
});

process.on('exit', () => {
    fs.unlinkSync(filename);
});