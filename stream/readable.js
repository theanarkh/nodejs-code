const { Readable } = require('stream');
let bytes = 0;

const MyReadable = new Readable({
    // 实现读取数据逻辑
    read(size) {
        // push null表示读结束
        if (bytes > size * 5) {
            this.push(null);
        } else {
            bytes += size;
            this.push('x'.repeat(size));  
        }
    }   
});

// 流式模式，触发 read 函数
MyReadable.on('data', function(data) {
    console.log(data);
});
// push(null) 触发 end
MyReadable.on('end', function() {
    console.log('end');
});