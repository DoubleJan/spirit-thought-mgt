// http请求相关的工具方法

// 解析post的请求体
function parseBody(req, cb) {
  let dataString = '';

  // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到dataString
  // 设置编码格式以后，接收到的就是字符串
  req.setEncoding('utf8');
  req.on('data', function (d) {
    dataString += d;
  });

  req.on('end', () => {
    const data = JSON.parse(`${dataString}`);
    cb(data);
  });
}

// 解析出来请求url路径上的参数
function parseQuery(url) {
  if (url != null) {
    const arr = url.split('?');
    if (Array.isArray(arr) && arr[0] && arr[1]) {
      const keyValues = arr[1].split('&');
      if (Array.isArray(keyValues)) {
        const params = keyValues.reduce((acc, cur) => {
          const param = cur.split('=');
          if (Array.isArray(param) && param[0]) {
            const obj = {}
            obj[param[0]] = param[1];
            return Array.isArray(param) && { ...acc, ...obj }
          } else {
            return acc;
          }
        }, {});

        return { pathname: arr[0], params }
      }
    }
    return { pathname: arr }
  }
  return null;
}

// 返回路径上最后一节
function getLastRoute(url) {
  return url.split('/').pop();
}


 module.exports = { parseBody, parseQuery, getLastRoute }