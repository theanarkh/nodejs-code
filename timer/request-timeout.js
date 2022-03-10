const http = require('http');
http.createServer((req, res) => {
    setTimeout(() => {
        res.end('hello');
    }, 5000);
}).listen(8080, () => {
    request();
});

function request() {
    return new Promise((resolve, reject) => {
        let timeout = false;
        // 监听 8080 成功后执行
        const client = http.get('http://localhost:8080/', (res) => {
            if (timeout) {
                return;
            }
            resolve(res);
        });
        // 修改超时时间测试不同情况
        client.setTimeout(10000);
        client.on('timeout', () => {
            timeout = true;
            const error = new Error();
            error.code = 'timeout';
            error.message = 'request timeout';
            reject(error);
        });
        client.on('error', (error) => {
            reject(error);
        });
    })
}

async function test() {
   console.log(await request());
}

test();