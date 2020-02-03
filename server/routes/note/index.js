const directory = require('./directory');
const noteList = require('./list');

// 导出路由
module.exports = {
  '/note/directory': { handler: directory, method: 'GET' },
  '/note/list': { handler: noteList, method: 'GET' },
}