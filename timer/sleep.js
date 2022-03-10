function sleep(msec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, msec);
    });
}

async function test() {
    await sleep(3000);
    console.log(1);
}
test();