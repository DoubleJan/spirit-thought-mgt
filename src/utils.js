// 工具类

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

module.exports = { parseBody }