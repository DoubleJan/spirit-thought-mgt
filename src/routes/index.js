// 匹配路由
const note = require('./note');
const health = require('./health');
const auth = require('./auth');

// 定义一个路由
const routes = { ...note, ...health, ...auth }

// 获得对应的路由
function regexRouter(req) {
  const router = Object.keys(routes).find((v) => req.url.includes(`/api${v}`));
  if (routes[router] && routes[router].method.search(req.method.toUpperCase()) != -1) {
    // 打印出基本请求信息
    console.log(`${req.headers.host} ${req.url} ${req.method}`);
    return routes[router].handler;
  } else {
    return null;
  }
}

// 路由入口
module.exports = (req, res) => {
  const router = regexRouter(req)
  if (typeof router === 'function') {
    router(req, res);
  } else {
    // 如果遇到其他请求或方法， 比如options请求，需要及时关闭连接
    res.end();
  }
}
