const fs = require('fs'); 
const filename = 'tmp';
fs.watch(__dirname, (type, file) => {
    console.log(type, file);
    process.exit();
});
// 定时写入，触发 watch
setTimeout(() => {
    fs.writeFileSync(filename, '2');
}, 1000);

process.on('exit', () => {
   fs.unlinkSync(filename);
});