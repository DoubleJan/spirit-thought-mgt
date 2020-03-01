// 解析get请求的请求参数
module.exports = function (url) {
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