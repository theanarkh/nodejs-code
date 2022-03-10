const cp = require('child_process');
const { createTmpFileWithContent } = require('../helper');
const filepath = `${__dirname}/tmp.js`;
createTmpFileWithContent(filepath, 'setInterval(() => {}, 10000);');
cp.fork(filepath);

