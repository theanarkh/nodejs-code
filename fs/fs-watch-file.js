const fs = require('fs'); 
const filename = 'tmp';
// 写入一些数据
fs.writeFileSync(filename, '1');
fs.watchFile(filename, () => {
    console.log('file change');
    fs.unwatchFile(filename);
    fs.unlinkSync(filename);
});
// 定时写入，触发 watch
setTimeout(() => {
    fs.writeFileSync(filename, '2');
}, 500);