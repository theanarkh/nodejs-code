const fs = require('fs'); 
const filename = 'tmp';
// 写入一些数据
fs.writeFileSync(filename, '1');
fs.watch(filename, { persistent: false }, console.log);
// 定时写入，触发 watch
setTimeout(() => {
    fs.writeFileSync(filename, '2');
}, 1000);

process.on('exit', () => {
    fs.unlinkSync(filename);
});