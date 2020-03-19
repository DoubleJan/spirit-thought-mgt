// 注册

const Mongodb = require('../../utils/mongodb');
const template = require('../../utils/template');
const Utils = require('./../../utils/httpUtils');
const { getLicences } = require('./licence');
const cryptoPwd = require('./crypto');
const moment = require('moment');


// 加密,之后添加用户权限
function getAuthData(data) {
  const createTime = moment().format();
  // 根据创建时间加盐
  const password = cryptoPwd(data.password, createTime);
  return { ...data, password, auth: 'USER', createTime }
}


module.exports = (req, res) => {

  Utils.parseBody(req, (data) => {
    Mongodb.connect((db) => {
      const dbo = db.db('stmgt');

      // 校验data是否合法
      if (!(data.username && data.password && data.email && data.licence)) {
        res.end(JSON.stringify(template.simpleGet({ code: '101.100', msg: '注册数据缺失' })));
        return;
      }

      // 校验许可号
      const licences = getLicences();
      console.log('Licence: ', JSON.stringify(licences));
      if (!Array.isArray(licences) || 
        !licences.some((el) => el.licence === data.licence && el.username === data.username && el.email === data.email)) {
        res.end(JSON.stringify(template.simpleGet({ code: '101.106', msg: '许可与身份信息认证错误' })));
        return;
      }
      
      // 查询数据库里面是否已经有同名或同邮箱用户
      dbo.collection('user').find({ 
        $or: [{username: data.username}, {email: data.email}] 
      }).toArray((err, dbRes) => {
        let result;
        if (err) {
          Mongodb.error(db, err);
          result = template.simpleGet({ code: '301.101', data, msg: '数据库查询失败' });
          return;
        }

        // 如果查出来，说明用户名已经存在
        if (dbRes.length) {
          let msg;
          if (dbRes[0].username === data.username) {
            msg = '用户名已存在';
          } else if (dbRes[0].email === data.email) {
            msg = '用户邮箱已存在';
          }
          result = template.simpleGet({ code: '101.101', msg: msg || '用户已存在' });
        } else {
          
          // 加密，添加时间戳和用户权限后写入数据库
          dbo.collection('user').insertOne(getAuthData(data), (err, insertRes) => {

            if (err) {
              Mongodb.error(db, err);
              result = template.simpleGet({ code: '301.201', data, msg: '数据库新增失败' });
              return;
            } else {
              // 返回数据前，把保留的许可号对象删除
              const licences = getLicences();
              const index = licences.findIndex((el) => el.username === data.username);
              if (index > -1) {
                licences.splice(index, 1);
              }
              result = template.simpleGet({ data });
            }

            res.end(JSON.stringify(result));
            return;
          });

          return;
        }

        res.end(JSON.stringify(result));
      })

    });

  });

}

