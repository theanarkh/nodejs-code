const { Transform } = require('stream');

class MyTransform extends Transform {
    _transform(chunk, encoding, callback) {
        // 转成 base64 编码后写入
        callback(null, chunk.toString('base64'));
    }
}

const myTransform = new MyTransform();
myTransform.on('data', (data) => {
    console.log(data.toString('utf-8'));
});
myTransform.write('hello');