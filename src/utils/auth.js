// 公共的加密函数
const crypto = require('crypto');

// 哈希带盐加密字符串
function hashSaltCrypto(str, salt) {
  return crypto.createHash('sha1').update(`${str}${salt}`).digest('hex').toUpperCase();
}

// 密码加密
module.exports = {
  hashSaltCrypto
}

