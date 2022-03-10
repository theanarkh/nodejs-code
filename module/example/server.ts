import * as http from 'http';
import test from './test';
http.createServer((req, res) => {
    test(req, res);
}).listen(8888);