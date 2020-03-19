// 新增，编辑笔记文章
const Mongodb = require('../../utils/mongodb');
const template = require('../../utils/template');
const { Utils } = require('./../../utils/httpUtils');

// 添加文章
const addContent = (data) => {

  Mongodb.connect((db) => {
    const dbo = db.db('stmgt');
    // dbo.collection('user').insertOne({}, (err, insertRes) => {

    // })
  })
}

const Handler = {
  addContent
}

// 导出
module.exports = (req, res) => {

  const handler = Handler[Utils.getLastRoute(req.url)];

  // 解析请求体
  if (handler) {
    Utils.parseBody(req, (data) => {
      handler(data);
    });
  } else {
    res.end(JSON.stringify(template.simpleGet({ code: '210.100', msg: '未查询到此服务' })));
  }
  

}