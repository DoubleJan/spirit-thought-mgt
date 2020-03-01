// 登录

const Mongodb = require('./../../mongodb');
const template = require('./../../template');
const Utils = require('./../../utils');
const cryptoPwd = require('./crypto');

// 校验密码加密是否正确
function isAuthPwd(data, salt, dtoPwd) {
  const pwd = cryptoPwd(data.password, salt);
  return pwd === dtoPwd;
}

module.exports = (req, res) => {

  Utils.parseBody(req, (data) => {
    Mongodb.connect((db) => {
      const dbo = db.db('stmgt');

      dbo.collection('user').find({
        $or: [{ username: data.identify }, { email: data.identify }]
      }).toArray((err, dbRes) => {
        let result;
        if (err) {
          Mongodb.error(db, err);
          result = template.simpleGet({ code: '104.101', data, msg: '数据库查询失败' });
          return;
        } else {
          // 检查密码是否正确
          if (Array.isArray(dbRes) && dbRes.length && isAuthPwd(data, dbRes[0].createTime, dbRes[0].password)) {
            result = template.simpleGet({ 
              data: { username: dbRes[0].username, email: dbRes[0].email, password: data.password } 
            });
          } else {
            result = template.simpleGet({ code: '101.103', msg: '账号或密码错误' });
          }
        }
        res.end(JSON.stringify(result));
      })
    });
  });

}

