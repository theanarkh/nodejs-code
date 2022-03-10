const { Duplex } = require('stream');

let data = '123456789';
let buffer;
class MyDuplex extends Duplex {
    _read(size) {
        if (data.length) {
            this.push(data.slice(0, size));
            data = data.slice(size);
        } else {
            this.push(null);
        }
    }
    _write(chunk, encoding, callback) {
        buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;
        callback(null);
    }
}

const myDuplex = new MyDuplex({highWaterMark: 1});
myDuplex.on('data', (data) => {
    console.log('read data:', data.toString('utf-8'));
});
myDuplex.write('hello');
console.log('write data:', buffer.toString('utf-8'));