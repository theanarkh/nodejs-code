const fs = require('fs');
const { Session } = require('inspector');
const session = new Session();
session.connect();

function b() {
    for (let i = 0; i < 10000000; i++) {

    } 
}
function a() {
    for (let i = 0; i < 100; i++) {
        b();
    }
}
session.post('Profiler.enable');
session.post('Profiler.start', () => {
    a();
    setTimeout(() => {
        session.post('Profiler.stop', (err, data) => {
            const filename = `1.cpuprofile`;
            fs.writeFileSync(filename, JSON.stringify(data.profile));
        });
    }, 3000);
});
