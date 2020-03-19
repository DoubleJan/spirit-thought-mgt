// 填写健康日报

const Mongodb = require('../../utils/mongodb');
const template = require('../../utils/template');
const Utils = require('./../../utils/httpUtils');

module.exports = (req, res) => {

  Utils.parseBody(req, (data) => {
    Mongodb.connect((db) => {
      const dbo = db.db('stmgt');

      dbo.collection('health').insertOne(data, (err, dbRes) => {
        let result;
        if (err) {
          Mongodb.error(db, err);
          result = template.simpleGet({ code: '500.100', data, msg: '数据库查询失败' });
          return;
        }

        result = template.simpleGet({ data: dbRes.ops });

        res.end(JSON.stringify(result));
      })
    })

  });

}