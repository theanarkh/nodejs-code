const https = require('https');
require('./https-server');
https.request('https://localhost:8080/',{rejectUnauthorized: false}, (res) => {
    // 接收响应数据
    res.on('data', (buf) => {
        console.log(buf.toString('utf-8'));
    });
})
.end();