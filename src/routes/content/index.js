const note = require('./note');
const article = require('./article');

// 导出路由
module.exports = {
  '/content/note': { handler: note, method: 'POST' },
  '/content/article': { handler: article, method: 'POST' },
}