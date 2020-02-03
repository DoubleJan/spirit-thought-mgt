const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const MONGODB_URL = "mongodb://ybj:9559@116.62.44.86:27017/stmgt";

// 数据库连接
function connect(callback) {
  MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      console.log('ERROR: ', err);
      return;
    }
    callback(db);
  });
}

// 打印错误日志
function error(db, err) {
  console.log('DATABASE ERROR: ', err);
  db.close();
}



module.exports = { connect, error, ObjectID };

