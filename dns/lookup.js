const dns = require('dns');
const domain = 'www.amazon.com';
// 查找第一个 ip
dns.lookup(domain, (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
  // 反向 dns 解析，通过 ip 查域名
  dns.reverse(address, (err, hostnames) => {
    console.log(hostnames);
  });
});

// 查看多个解析记录
dns.resolve(domain, (err, records) => {
    console.log(records);
});



