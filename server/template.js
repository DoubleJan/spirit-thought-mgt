// 返回消息的模板

// 生成信息

// 普通的get请求，不分页
function simpleGet({ code, data, msg }) {
  if (!code) {
    return {
      code: '000000',
      data,
      msg: 'SUCCESS'
    }
  } else {
    return { code, data: {}, msg }
  }
}

module.exports = {
  simpleGet,

}