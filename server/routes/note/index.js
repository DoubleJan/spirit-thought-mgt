const directory = require('./directory');
const noteList = require('./list');

// 导出路由
module.exports = {
  '/note/directory': directory,
  '/note/list': noteList,
}