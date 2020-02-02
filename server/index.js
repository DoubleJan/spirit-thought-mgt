// 服务器入口

const http = require('http');
const router = require('./routes');

const server = http.createServer((req, res) => {

  // 跨域
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS, PATCH");

  // utf8解决中文乱码问题
  res.setHeader('Content-type', 'application/json; charset=utf8');

  router(req, res);

});


server.listen(9000, () => console.log('Server start 9000'));

