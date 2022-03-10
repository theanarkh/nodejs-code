const cp = require('child_process');
const { createTmpFileWithContent } = require('../helper');

const codeExecutedInChildProcess = `
process.on('message', ({ start, end }) => {
    let sum = 0;
    for (let i = start; i < end; i++) {
        sum = sum + i;
    }
    process.send(sum);
    process.exit();
});
`;
const slow = false;
if (slow) {
    let sum1 = 0;
    let sum2 = 0;
    console.time('compute')
    for (let i = 1; i < 1000000000; i ++) {
        sum1 = sum1 + i;
    }
    for (let i = 1; i < 1000000000; i ++) {
        sum2 = sum2 + i;
    }
    console.timeEnd('compute');
    console.log(sum1 + sum2);
} else {
    async function compute() {
        let sum = 0;
        const filepath = `${__dirname}/tmp.js`;
        createTmpFileWithContent(filepath, codeExecutedInChildProcess);
        console.time('compute');
        const childs = [];
        for (let i = 0; i < 2; i++) {
            const child = cp.fork(filepath);
            child.send({start: 1, end: 1000000000});
            const promise = new Promise((resolve) => {
                child.on('message', (result) => {
                    sum = sum + result;
                    resolve();
                });
            });
            childs.push(promise);
        }
        await Promise.all(childs);
        console.timeEnd('compute');
        console.log(sum);
    }
    compute();
}