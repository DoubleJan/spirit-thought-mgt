// 公共的加密函数
const crypto = require('crypto');

// 密码加密
module.exports = function (pwd, salt) {
  return crypto.createHash('sha1').update(`${pwd}${salt}`).digest('hex').toUpperCase();
}