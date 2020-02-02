// 匹配路由
const note = require('./note');

// 定义一个
const routes = {
  ...note
}

// 获得对应的路由
function regexRouter(url) {
  const router = Object.keys(routes).find((v) => url.includes(v));
  if (routes[router]) {
    console.log('GET ROUTER: ', router);
    return routes[router];
  } else {
    return null;
  }
  
}

// 路由入口
module.exports = (req, res) => {
  const router = regexRouter(req.url)

  // 打印出基本请求信息
  console.log(`${req.headers.host} ${req.url} ${req.method}`);

  if (router) {
    router(req, res);
  }
}
