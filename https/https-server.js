const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./privkey.pem'),
    cert: fs.readFileSync('./cacert.pem')
};

https.createServer(options,(req,res) => {
    res.end('hello world\n');
}).listen(8080, () => {
    console.log('https://127.0.0.1:8080/');
});

