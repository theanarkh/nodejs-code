const fs = require('fs');
const path = require('path');
// 待扫描的目录
const dirQueue = ["."];
// 扫描到的文件
const fileQueue = [];
// 队列
let dir;
// 开始收集
while(dir = dirQueue.shift()) {
    // 读取当前目录下的所有文件（目录文件或普通文件）
    const files = fs.readdirSync(dir);
    // 遍历目录下的文件
    files.forEach((filename) => {
        // 计算出绝对路径
        const currentFile = path.resolve(dir + '/' + filename);
        // 获取文件信息
        const stat = fs.statSync(currentFile);
        // 是文件则加到文件队列，是目录则加到目录队列
        if (stat.isFile()) {
          fileQueue.push(currentFile);
        } else if (stat.isDirectory()) {
          dirQueue.push(currentFile);
        }
    })
}
console.log(fileQueue);