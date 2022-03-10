const os = require('os');
const fs = require('fs');
function findLocalIP() {
  for (const [interfaceName, interfaces] of Object.entries(os.networkInterfaces())) {
    for (const [index, { address }] of Object.entries(interfaces)) {
      if (/^192/.test(address)) {
        return address;
      }
    }
  }
}

function createTmpFileWithContent(filepath, content) {
  fs.writeFileSync(filepath, content);
  let deleted = false;
  process.on('exit', () => {
    if (!deleted) {
      fs.unlinkSync(filepath);
      deleted = true;
    }
  });
  process.on('SIGINT', () => {
    if (!deleted) {
      fs.unlinkSync(filepath);
      deleted = true;
      process.exit();
    }
  });
}

exports.findLocalIP = findLocalIP;
exports.createTmpFileWithContent = createTmpFileWithContent;