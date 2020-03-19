// /note/directory 查询笔记文件夹

const Mongodb = require('./../../utils/mongodb');
const template = require('./../../utils/template');


// 导出
module.exports = (req, res) => {

  Mongodb.connect((db) => {
    const dbo = db.db('stmgt');

    dbo.collection('note').find({}).toArray((err, data) => {
      let result;
      if (err) {
        Mongodb.error(db, err);
        result = template.simpleGet({ code: '500.100', data, msg: '数据库查询失败' });
        return;
      }

      result = template.simpleGet({ data });
      res.write(JSON.stringify(result));
      res.end(); 
    })
  })
}
