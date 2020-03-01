// 服务器入口

const http = require('http');
const router = require('./routes');
const { notificationServer, sendRegisterLicenceMail, sendUserLicenceMail } = require('./utils/mailer');

const server = http.createServer((req, res) => {

  // 跨域
  res.setHeader("Access-Control-Allow-Origin", '*');

  // 允许的头信息和自定义头信息
  // Content-type: 指定返回的类型为json
  // Cache-Control: 指定允许使用客户端缓存
  // X-Real-IP: 由于后端使用了nginx代理，将这个头由nginx填入真实的请求客户端ip带给node服务端
  // Host: 代理主机名
  // Nginx-Cache: nginx的代理缓存状态
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Cache-Control,X-Real-IP,Host,Nginx-Cache");
  
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS, PATCH");

  // utf8解决中文乱码问题
  res.setHeader('Content-type', 'application/json; charset=utf8');

  router(req, res);

});

// notificationServer();

// sendRegisterLicenceMail({ username: 'DoubleJan', email: 'doublejan@126.com' });

// sendUserLicenceMail({ username: '月饼见', email: '954464727@qq.com', licence: 'LICENCELICEN' });

server.listen(8000, () => console.log(`${process.env.NODE_ENV} Server start 8000`));

